// Optional offline SQL verification. Install @electric-sql/pglite in a temporary
// directory and point STUDIO_PGLITE_MODULE to its dist/index.js. No live DB URLs.
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";
const modulePath = process.env.STUDIO_PGLITE_MODULE;
if (!modulePath)
  throw new Error("Set STUDIO_PGLITE_MODULE to a temporary PGlite installation's dist/index.js.");
const { PGlite } = await import(pathToFileURL(modulePath).href);
const db = new PGlite();
const a = "11111111-1111-4111-8111-111111111111";
const b = "22222222-2222-4222-8222-222222222222";
const userA = "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa";
const userB = "bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb";
const userC = "cccccccc-cccc-4ccc-8ccc-cccccccccccc";
let checks = 0;
const check = (label, condition) => {
  assert.ok(condition, label);
  checks++;
  console.log(`PASS ${label}`);
};
const rejected = async (label, fn) => {
  await assert.rejects(fn);
  checks++;
  console.log(`PASS ${label}`);
};
try {
  await db.exec(`
    create role authenticated; create role anon;
    create schema auth; create schema private;
    grant usage on schema public,auth,private to authenticated;
    alter default privileges in schema public grant all on tables to authenticated,anon;
    create table auth.users(id uuid primary key);
    create function auth.uid() returns uuid language sql stable as $$ select nullif(current_setting('request.jwt.claim.sub',true),'')::uuid $$;
    create table public.workspaces(id uuid primary key);
    create table public.workspace_members(workspace_id uuid,user_id uuid);
    create function private.is_workspace_member(target_workspace_id uuid) returns boolean
      language sql security definer stable set search_path=public as $$ select exists(select 1 from workspace_members where workspace_id=target_workspace_id and user_id=auth.uid()) $$;
    grant execute on function private.is_workspace_member(uuid) to authenticated;
    create table public.workspace_settings(workspace_id uuid primary key references workspaces(id));
    create table public.campaigns(id uuid primary key,workspace_id uuid references workspaces(id));
    create table public.campaign_assets(id uuid primary key default gen_random_uuid(),workspace_id uuid not null references workspaces(id),campaign_id uuid not null references campaigns(id),kind text not null,title text not null default '',metadata jsonb not null default '{}',updated_at timestamptz not null default now(),
      constraint campaign_assets_kind_check check(kind in('anchor_script','short_script','caption','linkedin','newsletter','faq','carousel','thumbnail','cta','production_note','platform_post','article')));
    create table public.assistant_messages(id uuid primary key default gen_random_uuid(),conversation_id uuid,role text,metadata jsonb not null default '{}');
    insert into auth.users values('${userA}'),('${userB}'),('${userC}');
    insert into workspaces values('${a}'),('${b}');
    insert into workspace_members values('${a}','${userA}'),('${b}','${userA}'),('${b}','${userB}'),('${a}','${userC}');
    insert into workspace_settings values('${a}'),('${b}');
  `);
  const migration = await readFile(
    new URL("../supabase/migrations/20260927180000_studio_recovery.sql", import.meta.url),
    "utf8",
  );
  await db.exec(migration);
  await db.exec(
    await readFile(
      new URL("../supabase/migrations/20260928010000_studio_proactive_media.sql", import.meta.url),
      "utf8",
    ),
  );
  check("proactive/media migration applies on recovery schema", true);
  const asUser = async (id) => {
    await db.exec("set role authenticated");
    await db.query("select set_config('request.jwt.claim.sub',$1,false)", [id]);
  };
  const claim = async (workspace, hash = "a".repeat(64), mode = "automatic") =>
    (
      await db.query("select reserve_studio_feed_generation($1,$2,$3) as value", [
        workspace,
        hash,
        mode,
      ])
    ).rows[0].value;
  const author = { kind: "pal", name: "Kiana", pal: "kiana" };
  const post = {
    title: "A real next step",
    body: "Use this workspace's saved campaign to find a concrete next step.",
    lane: "reel",
    author,
    sources: [],
  };
  const replies = [
    { body: "Start with the current customer question.", author },
    {
      body: "Keep the first experiment small.",
      author: { kind: "pal", name: "Ryder", pal: "ryder" },
    },
  ];
  const finish = (token, body = post, thread = replies, hash = "b".repeat(64)) =>
    db.query("select complete_studio_feed_generation($1,$2,$3,$4,$5) as id", [
      a,
      token,
      JSON.stringify(body),
      JSON.stringify(thread),
      hash,
    ]);
  await asUser(userA);
  const parallel = await Promise.all([claim(a), claim(a)]);
  const reservation = parallel.find((row) => row.status === "claimed");
  check(
    "two simultaneous visits reserve only one generation",
    parallel.filter((row) => row.status === "claimed").length === 1 &&
      parallel.filter((row) => row.status === "deferred").length === 1,
  );
  await rejected("generation bookkeeping cannot be mutated directly", () =>
    db.query("update studio_feed_generation_state set lease_until=null"),
  );
  await rejected("invalid reply rolls back discussion completion", () =>
    finish(reservation.token, post, [replies[0], { ...replies[1], body: "" }]),
  );
  check(
    "failed completion leaves no partial feed post",
    (await db.query("select count(*)::int as n from studio_feed_posts")).rows[0].n === 0,
  );
  await asUser(userC);
  await rejected("another member cannot complete someone else's request token", () =>
    finish(reservation.token),
  );
  await asUser(userA);
  const finished = await finish(reservation.token);
  check(
    "complete discussion saves one post and all replies",
    Boolean(finished.rows[0].id) &&
      (await db.query("select count(*)::int as n from studio_feed_comments")).rows[0].n === 2,
  );
  await rejected("replayed completion cannot duplicate the discussion", () =>
    finish(reservation.token),
  );
  check("unchanged workspace visit is deferred for a day", (await claim(a)).status === "deferred");
  check(
    "changed workspace still observes the automatic cooldown",
    (await claim(a, "c".repeat(64))).status === "deferred",
  );
  check(
    "manual requests also observe minimum spacing",
    (await claim(a, "c".repeat(64), "manual")).status === "deferred",
  );
  await db.exec("reset role");
  await db.query(
    "update studio_feed_generation_state set last_generated_at=now()-interval '7 hours',retry_after=now()-interval '1 minute' where workspace_id=$1",
    [a],
  );
  await asUser(userA);
  check(
    "unchanged workspace remains deferred after seven hours",
    (await claim(a)).status === "deferred",
  );
  const newContext = await claim(a, "c".repeat(64));
  check("new workspace context may generate after six hours", newContext.status === "claimed");
  await rejected("identical output fingerprint cannot publish twice", () =>
    finish(newContext.token),
  );
  await db.query("select release_studio_feed_generation($1,$2)", [a, newContext.token]);
  check(
    "failure release prevents a retry storm",
    (await claim(a, "d".repeat(64), "manual")).status === "deferred",
  );
  await asUser(userB);
  await rejected("nonmember cannot reserve another workspace's AI work", () => claim(a));
  await rejected("invalid fingerprint cannot claim a generation", () => claim(b, "invalid"));
  await db.exec("reset role");
  const source = (
    await db.query(
      'insert into campaign_assets(workspace_id,campaign_id,kind,title,metadata) values($1,null,\'article\',\'Exact article\',\'{"storagePath":"keep-document.pdf","thumbnailUrl":"old-cover.png"}\') returning *',
      [a],
    )
  ).rows[0];
  const image = (
    await db.query(
      "insert into campaign_assets(workspace_id,campaign_id,kind,title,metadata) values($1,null,'image','Specific cover',$2) returning *",
      [
        a,
        JSON.stringify({
          targetAssetId: source.id,
          storagePath: `${a}/generated/image.png`,
          mimeType: "image/png",
          imageAlt: "A concrete subject",
          imageBrief: { title: "Exact article" },
        }),
      ],
    )
  ).rows[0];
  const wrongImage = (
    await db.query(
      "insert into campaign_assets(workspace_id,campaign_id,kind,metadata) values($1,null,'image',$2) returning *",
      [
        a,
        JSON.stringify({
          targetAssetId: "55555555-5555-4555-8555-555555555555",
          storagePath: `${a}/generated/wrong.png`,
          mimeType: "image/png",
        }),
      ],
    )
  ).rows[0];
  const otherImage = (
    await db.query(
      "insert into campaign_assets(workspace_id,campaign_id,kind,metadata) values($1,null,'image',$2) returning *",
      [
        b,
        JSON.stringify({
          targetAssetId: source.id,
          storagePath: `${b}/generated/wrong.png`,
          mimeType: "image/png",
        }),
      ],
    )
  ).rows[0];
  await asUser(userA);
  const associate = (id, time = source.updated_at) =>
    db.query("select associate_studio_asset_image($1,$2,$3,$4)", [a, source.id, id, time]);
  await rejected("image for another output cannot become a campaign-wide fallback", () =>
    associate(wrongImage.id),
  );
  await rejected("cross-workspace image association is rejected even for a member of both", () =>
    associate(otherImage.id),
  );
  await associate(image.id);
  const updated = (await db.query("select * from campaign_assets where id=$1", [source.id]))
    .rows[0];
  check(
    "association keeps exact media ID and removes previous cover URL",
    updated.metadata.mediaAssetId === image.id &&
      !updated.metadata.thumbnailUrl &&
      updated.metadata.imageAlt === "A concrete subject",
  );
  check(
    "document download path survives an image-cover association",
    updated.metadata.storagePath === "keep-document.pdf",
  );
  await rejected("stale image generation cannot overwrite an edited source", () =>
    associate(image.id, source.updated_at),
  );
  await asUser(userB);
  await rejected("nonmember cannot associate another workspace's images", () =>
    associate(image.id, updated.updated_at),
  );
  await db.exec("set role anon");
  await rejected("anonymous callers cannot reserve AI work", () => claim(a));
  console.log(
    `${checks} offline PostgreSQL proactive/media checks passed. No live database was used.`,
  );
} finally {
  await db.close();
}
