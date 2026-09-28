// Optional offline PostgreSQL verification; no live database or credentials.
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";
if (!process.env.STUDIO_PGLITE_MODULE)
  throw new Error("Set STUDIO_PGLITE_MODULE to a temporary PGlite installation.");
const { PGlite } = await import(pathToFileURL(process.env.STUDIO_PGLITE_MODULE).href);
const db = new PGlite();
const a = "11111111-1111-4111-8111-111111111111",
  b = "22222222-2222-4222-8222-222222222222";
const userA = "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa",
  userB = "bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb",
  userC = "cccccccc-cccc-4ccc-8ccc-cccccccccccc";
let checks = 0;
function check(label, value) {
  assert.ok(value, label);
  checks++;
  console.log(`PASS ${label}`);
}
async function rejected(label, action) {
  await assert.rejects(action);
  checks++;
  console.log(`PASS ${label}`);
}
async function asUser(user) {
  await db.exec("set role authenticated");
  await db.query("select set_config('request.jwt.claim.sub',$1,false)", [user]);
}
async function save(workspace, id, title, content, revision) {
  return (
    await db.query("select save_workspace_memory($1,$2,$3,$4,$5) as entry", [
      workspace,
      id,
      title,
      content,
      revision,
    ])
  ).rows[0].entry;
}
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
    create function private.is_workspace_member(target_workspace_id uuid) returns boolean language sql security definer stable set search_path=public as $$ select exists(select 1 from workspace_members where workspace_id=target_workspace_id and user_id=auth.uid()) $$;
    create table public.workspace_settings(workspace_id uuid primary key references workspaces(id),ai_memory jsonb not null default '{}', ui_preferences jsonb not null default '{"theme":"dark"}');
    insert into auth.users values('${userA}'),('${userB}'),('${userC}');
    insert into workspaces values('${a}'),('${b}');
    insert into workspace_members values('${a}','${userA}'),('${b}','${userB}'),('${a}','${userC}');
    insert into workspace_settings(workspace_id,ai_memory) values('${a}','{"old":"unreviewed note"}'),('${b}','{}');
  `);
  await db.exec(
    await readFile(
      new URL("../supabase/migrations/20260927210000_studio_shared_memory.sql", import.meta.url),
      "utf8",
    ),
  );
  check(
    "migration applies without rewriting or approving legacy notes",
    (await db.query("select count(*)::int as n from workspace_memories")).rows[0].n === 0 &&
      (await db.query("select ai_memory from workspace_settings where workspace_id=$1", [a]))
        .rows[0].ai_memory.old === "unreviewed note",
  );
  await asUser(userA);
  const first = await save(a, null, "Audience", "Early commuters.", null);
  check(
    "authenticated member saves canonical memory with real creator",
    first.created_by === userA && first.revision === 1,
  );
  await rejected("direct writes cannot bypass revision checks or budgets", () =>
    db.query(
      "insert into workspace_memories(workspace_id,title,content,created_by) values($1,'Bypass','Bad',$2)",
      [a, userA],
    ),
  );
  await rejected("direct update cannot change ownership", () =>
    db.query("update workspace_memories set workspace_id=$1 where id=$2", [b, first.id]),
  );
  // PGlite serializes queries on one connection; two requests with the same
  // observed revision still exercise the database's loser/stale-write behavior.
  const parallel = await Promise.allSettled([
    save(a, first.id, "Audience", "Updated by editor A.", 1),
    save(a, first.id, "Audience", "Updated by editor B.", 1),
  ]);
  check(
    "two saves from one revision produce one winner and one explicit conflict",
    parallel.filter((x) => x.status === "fulfilled").length === 1 &&
      parallel.filter((x) => x.status === "rejected").length === 1,
  );
  await asUser(userC);
  const next = await save(a, null, "Preference", "Keep offers brief.", null);
  check(
    "a second member adds independently without overwriting shared memory",
    (await db.query("select count(*)::int as n from workspace_memories")).rows[0].n === 2 &&
      next.created_by === userC,
  );
  await rejected("stale forget cannot delete a newer revision", () =>
    db.query("select forget_workspace_memory($1,$2,1)", [a, first.id]),
  );
  await db.query("select forget_workspace_memory($1,$2,2)", [a, first.id]);
  check(
    "forget removes canonical content without a tombstone containing the secret",
    (await db.query("select * from workspace_memories where id=$1", [first.id])).rows.length === 0,
  );
  await rejected("forgotten ID cannot be revived by an old edit", () =>
    save(a, first.id, "Audience", "Old copy", 2),
  );
  await asUser(userB);
  check(
    "RLS hides another workspace's memories",
    (await db.query("select * from workspace_memories")).rows.length === 0,
  );
  await rejected("non-member cannot save another workspace's memory", () =>
    save(a, null, "Cross", "No", null),
  );
  await rejected("non-member cannot forget another workspace's memory", () =>
    db.query("select forget_workspace_memory($1,$2,1)", [a, next.id]),
  );
  await rejected("non-member cannot clear another workspace's legacy notes", () =>
    db.query("select forget_workspace_legacy_memory($1,$2)", [
      a,
      JSON.stringify({ old: "unreviewed note" }),
    ]),
  );
  await asUser(userA);
  await rejected("stale legacy clear preserves changed source notes", () =>
    db.query("select forget_workspace_legacy_memory($1,'{}')", [a]),
  );
  await db.query("select forget_workspace_legacy_memory($1,$2)", [
    a,
    JSON.stringify({ old: "unreviewed note" }),
  ]);
  await db.exec("reset role");
  const settings = (await db.query("select * from workspace_settings where workspace_id=$1", [a]))
    .rows[0];
  check(
    "forget legacy clears only notes and preserves UI preferences",
    Object.keys(settings.ai_memory).length === 0 && settings.ui_preferences.theme === "dark",
  );
  await asUser(userA);
  await rejected("individual memory limit is enforced by PostgreSQL", () =>
    save(a, null, "Too long", "x".repeat(2001), null),
  );
  for (let i = 0; i < 14; i++) await save(a, null, `Long ${i}`, "x".repeat(2000), null);
  await rejected("total prompt budget is enforced before persistent growth", () =>
    save(a, null, "Over budget", "x".repeat(2000), null),
  );
  await asUser(userB);
  for (let i = 0; i < 50; i++) await save(b, null, `Small ${i}`, "Fact", null);
  await rejected("entry count limit is enforced independently", () =>
    save(b, null, "Extra", "Fact", null),
  );
  await db.exec("set role anon");
  await rejected("anonymous users cannot read memory", () =>
    db.query("select * from workspace_memories"),
  );
  await rejected("anonymous users cannot execute memory mutations", () =>
    save(b, null, "Anon", "No", null),
  );
  console.log(`${checks} offline PostgreSQL memory checks passed. No live database was used.`);
} finally {
  await db.close();
}
