import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";
const { PGlite } = await import(pathToFileURL(process.env.STUDIO_PGLITE_MODULE).href);
const db = new PGlite();
let count = 0;
const a = "11111111-1111-4111-8111-111111111111",
  b = "22222222-2222-4222-8222-222222222222",
  user = "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa",
  other = "bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb",
  conversation = "cccccccc-cccc-4ccc-8ccc-cccccccccccc",
  foreign = "dddddddd-dddd-4ddd-8ddd-dddddddddddd";
const check = (label, condition) => {
  assert.ok(condition, label);
  console.log(`PASS ${++count}: ${label}`);
};
const value = async (sql, args = []) => (await db.query(sql, args)).rows[0].value;
const claim = (key, hash = "a".repeat(64), conv = conversation, actor = user) =>
  value("select claim_studio_voice($1,$2,$3,$4,$5) as value", [a, actor, key, hash, conv]);
const reserve = () =>
  value("select reserve_studio_credits($1,$2,'transcription',2,0.01,100,5,0.1,100) as value", [
    a,
    user,
  ]);
const bind = (key, token, usage) =>
  value("select bind_studio_voice_usage($1,$2,$3,$4,$5) as value", [a, user, key, token, usage]);
const complete = (key, token, path = `${a}/conversation/test.wav`) =>
  value("select complete_studio_voice($1,$2,$3,$4,$5,$6,$7,$8,$9) as value", [
    a,
    user,
    key,
    token,
    path,
    "voice.wav",
    96044,
    "Our business needs useful creative work.",
    JSON.stringify({ durationSeconds: 3 }),
  ]);
const fail = (key, token) =>
  value("select fail_studio_voice($1,$2,$3,$4) as value", [a, user, key, token]);
const reject = async (label, fn) => {
  await assert.rejects(fn);
  check(label, true);
};
try {
  await db.exec(
    `create role authenticated;create role anon;create role service_role;create schema auth;create table auth.users(id uuid primary key);create table workspaces(id uuid primary key,created_by uuid);create table workspace_members(workspace_id uuid,user_id uuid);create table workspace_subscriptions(workspace_id uuid primary key,plan text default 'trial',status text default 'trialing',campaign_allowance integer default 1,trial_ends_at timestamptz default now()+interval '7 days',current_period_start timestamptz default now(),current_period_end timestamptz default now()+interval '1 month',stripe_customer_id text,stripe_subscription_id text,cancel_at_period_end boolean default false,billing_interval text default 'month');create table conversations(id uuid primary key,workspace_id uuid);create table conversation_attachments(id uuid primary key default gen_random_uuid(),workspace_id uuid,conversation_id uuid references conversations(id),created_by uuid,kind text,label text,mime_type text,byte_size int,storage_path text,extracted_text text,summary text,metadata jsonb);insert into auth.users values('${user}'),('${other}');insert into workspaces values('${a}','${user}'),('${b}','${other}');insert into workspace_members values('${a}','${user}');insert into workspace_subscriptions(workspace_id) values('${a}');insert into conversations values('${conversation}','${a}'),('${foreign}','${b}');`,
  );
  for (const name of [
    "20260928020000_studio_credit_ledger.sql",
    "20260928030000_studio_voice_usage.sql",
  ])
    await db.exec(
      await readFile(new URL(`../supabase/migrations/${name}`, import.meta.url), "utf8"),
    );
  check("voice migration applies after the existing credit migration", true);
  const key = crypto.randomUUID();
  await reject("a nonmember cannot claim a voice request", () =>
    claim(key, undefined, conversation, other),
  );
  await reject("a conversation from another workspace cannot be used", () =>
    claim(key, undefined, foreign),
  );
  const concurrent = await Promise.all([claim(key), claim(key)]);
  check(
    "concurrent attempts claim exactly one paid request",
    concurrent.filter((x) => x.claimed).length === 1,
  );
  const first = concurrent.find((x) => x.claimed);
  await reject("same request key cannot change the recording", () => claim(key, "b".repeat(64)));
  await reject("same request key cannot move conversations", () => claim(key, undefined, null));
  await reject("no reservation means no saved artifact", () => complete(key, first.token));
  const usage = await reserve();
  await bind(key, first.token, usage);
  await reject("duplicate binding cannot run a second paid call", () =>
    bind(key, first.token, usage),
  );
  await reject("another workspace storage path is rejected", () =>
    complete(key, first.token, `${b}/conversation/test.wav`),
  );
  const attachment = await complete(key, first.token);
  const again = await complete(key, first.token);
  check(
    "completion inserts exactly one attachment and is idempotent",
    attachment === again &&
      (await value("select count(*)::int as value from conversation_attachments")) === 1,
  );
  check(
    "metadata records the exact usage reservation",
    (await value(
      "select metadata->>'usageReservationId' as value from conversation_attachments where id=$1",
      [attachment],
    )) === usage,
  );
  await fail(key, first.token);
  const retry = await claim(key);
  check(
    "late failures cannot reset a completed request",
    retry.status === "completed" && !retry.claimed && retry.attachmentId === attachment,
  );
  const failedKey = crypto.randomUUID(),
    failed = await claim(failedKey);
  await fail(failedKey, failed.token);
  const next = await claim(failedKey);
  check(
    "an explicit retry after failure gets a new token",
    next.claimed && next.token !== failed.token,
  );
  await fail(failedKey, failed.token);
  check(
    "an old failure cannot cancel a new attempt",
    (await claim(failedKey)).status === "pending",
  );
  // Use a separate conversation to prove deletion is not converted into an unrelated attachment.
  const deleted = crypto.randomUUID();
  await db.query("insert into conversations values($1,$2)", [deleted, a]);
  const deletedKey = crypto.randomUUID(),
    pending = await claim(deletedKey, undefined, deleted);
  const deletedUsage = await reserve();
  await bind(deletedKey, pending.token, deletedUsage);
  await db.query("delete from conversations where id=$1", [deleted]);
  await reject(
    "conversation deleted during provider work cannot save into another conversation",
    () => complete(deletedKey, pending.token),
  );
  check(
    "failed save inserts no orphan attachment",
    (await value("select count(*)::int as value from conversation_attachments")) === 1,
  );
  const privateTables = await value(
    "select not has_table_privilege('authenticated','studio_voice_requests','SELECT') as value",
  );
  check("customer clients cannot read voice request internals", privateTables);
  check(
    "customer clients cannot claim server credit requests",
    await value(
      "select not has_function_privilege('authenticated','claim_studio_voice(uuid,uuid,uuid,text,uuid)','EXECUTE') as value",
    ),
  );
  console.log(`${count} voice SQL checks passed.`);
} finally {
  await db.close();
}
