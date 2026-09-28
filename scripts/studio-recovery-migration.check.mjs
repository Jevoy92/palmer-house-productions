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
    create table public.campaign_assets(id uuid primary key default gen_random_uuid(),workspace_id uuid not null references workspaces(id),campaign_id uuid not null references campaigns(id),kind text not null,
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
  check("migration applies successfully to prior Studio table shape", true);
  const asUser = async (id) => {
    await db.exec("set role authenticated");
    await db.query("select set_config('request.jwt.claim.sub',$1,false)", [id]);
  };
  await asUser(userA);
  const pal = (
    await db.query(
      "insert into studio_pal_profiles(workspace_id,created_by,name,base_pal,personality) values($1,$2,'Nova','kiana','Warm and precise') returning id",
      [a, userA],
    )
  ).rows[0].id;
  check("workspace member can save a custom Pal", Boolean(pal));
  await db.query("update studio_pal_profiles set name='Nova revised' where id=$1", [pal]);
  check(
    "editable profile columns remain writable",
    (await db.query("select name from studio_pal_profiles where id=$1", [pal])).rows[0].name ===
      "Nova revised",
  );
  await rejected("default Supabase grants do not allow moving a Pal's workspace", () =>
    db.query("update studio_pal_profiles set workspace_id=$1 where id=$2", [b, pal]),
  );
  await rejected("created_by remains immutable", () =>
    db.query("update studio_pal_profiles set created_by=$1 where id=$2", [userC, pal]),
  );
  await rejected("active Pal cannot reference another workspace", () =>
    db.query("update workspace_settings set active_pal_profile_id=$1 where workspace_id=$2", [
      pal,
      b,
    ]),
  );
  await rejected("avatar paths cannot cross workspaces", () =>
    db.query("update studio_pal_profiles set avatar_path=$1 where id=$2", [
      `${b}/pals/avatar.png`,
      pal,
    ]),
  );
  const author = { kind: "pal", name: "Kiana", pal: "kiana" };
  const postValue = {
    title: "Actual next step",
    body: "A useful idea from saved context.",
    lane: "reel",
    author,
    sources: [],
  };
  const replies = [
    { body: "Start with the customer decision.", author },
    {
      body: "Then keep the first draft short.",
      author: { kind: "pal", name: "Ryder", pal: "ryder" },
    },
  ];
  const post = (
    await db.query("select create_studio_feed_discussion($1,$2,$3) as id", [
      a,
      JSON.stringify(postValue),
      JSON.stringify(replies),
    ])
  ).rows[0].id;
  check(
    "generated discussion saves all replies",
    (
      await db.query("select count(*)::int as count from studio_feed_comments where post_id=$1", [
        post,
      ])
    ).rows[0].count === 2,
  );
  const before = (await db.query("select count(*)::int as count from studio_feed_posts")).rows[0]
    .count;
  await rejected("invalid reply rejects the whole generated discussion", () =>
    db.query("select create_studio_feed_discussion($1,$2,$3)", [
      a,
      JSON.stringify(postValue),
      JSON.stringify([replies[0], { ...replies[1], body: "" }]),
    ]),
  );
  check(
    "failed discussion leaves no partial opener",
    (await db.query("select count(*)::int as count from studio_feed_posts")).rows[0].count ===
      before,
  );
  await rejected("empty discussion rejects before persistence", () =>
    db.query("select create_studio_feed_discussion($1,$2,$3)", [
      a,
      JSON.stringify(postValue),
      "[]",
    ]),
  );
  await db.query(
    "insert into studio_feed_reactions(workspace_id,post_id,user_id,reaction) values($1,$2,$3,'love') on conflict do nothing",
    [a, post, userA],
  );
  await db.query(
    "insert into studio_feed_reactions(workspace_id,post_id,user_id,reaction) values($1,$2,$3,'love') on conflict do nothing",
    [a, post, userA],
  );
  check(
    "repeated reactions remain unique",
    (await db.query("select count(*)::int as count from studio_feed_reactions")).rows[0].count ===
      1,
  );
  await asUser(userC);
  await db.query(
    "insert into studio_feed_reactions(workspace_id,post_id,user_id,reaction) values($1,$2,$3,'love')",
    [a, post, userC],
  );
  check(
    "two members keep independent reactions",
    (await db.query("select count(*)::int as count from studio_feed_reactions")).rows[0].count ===
      2,
  );
  await db.query("delete from studio_feed_reactions where user_id=$1", [userA]);
  check(
    "a member cannot delete someone else's reaction",
    (await db.query("select count(*)::int as count from studio_feed_reactions")).rows[0].count ===
      2,
  );
  await asUser(userB);
  check(
    "RLS hides other workspace profiles",
    (await db.query("select * from studio_pal_profiles")).rows.length === 0,
  );
  check(
    "RLS hides other workspace posts/comments/reactions",
    (await db.query("select * from studio_feed_posts")).rows.length === 0 &&
      (await db.query("select * from studio_feed_comments")).rows.length === 0 &&
      (await db.query("select * from studio_feed_reactions")).rows.length === 0,
  );
  await rejected("non-member cannot generate into another workspace", () =>
    db.query("select create_studio_feed_discussion($1,$2,$3)", [
      a,
      JSON.stringify(postValue),
      JSON.stringify(replies),
    ]),
  );
  await rejected("a comment cannot attach to a foreign workspace post", () =>
    db.query(
      "insert into studio_feed_comments(workspace_id,post_id,created_by,body,author) values($1,$2,$3,'Cross-workspace attempt',$4)",
      [b, post, userB, JSON.stringify({ kind: "member", name: "Member B", userId: userB })],
    ),
  );
  await db.exec("reset role");
  const file = (
    await db.query(
      "insert into campaign_assets(workspace_id,campaign_id,kind) values($1,null,'document') returning id",
      [a],
    )
  ).rows[0].id;
  check("standalone PDF library items need no fake campaign", Boolean(file));
  await asUser(userB);
  await rejected("feed cannot attach another workspace's asset", () =>
    db.query(
      "insert into studio_feed_posts(workspace_id,created_by,body,author,asset_id) values($1,$2,'Wrong file',$3,$4)",
      [b, userB, JSON.stringify({ kind: "member", name: "Member B" }), file],
    ),
  );
  await db.exec("set role anon");
  await rejected("anonymous users cannot read the new tables", () =>
    db.query("select * from studio_pal_profiles"),
  );
  console.log(`${checks} offline PostgreSQL checks passed. No live database was used.`);
} finally {
  await db.close();
}
