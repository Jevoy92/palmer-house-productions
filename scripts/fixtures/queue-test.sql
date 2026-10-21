-- Test doubles for hosted pgmq/cron only. Application outbox/wake functions are loaded unchanged.
CREATE SCHEMA pgmq;
CREATE SCHEMA cron;
CREATE TABLE cron.job (jobname text PRIMARY KEY);
CREATE TABLE pgmq.q_transactional_emails (msg_id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY, vt timestamptz DEFAULT now(), message jsonb NOT NULL);
CREATE FUNCTION pgmq.send(q text, payload jsonb) RETURNS bigint LANGUAGE plpgsql AS $$
DECLARE result bigint;
BEGIN
  IF q <> 'transactional_emails' THEN RAISE EXCEPTION 'Unexpected test queue'; END IF;
  INSERT INTO pgmq.q_transactional_emails(message) VALUES(payload) RETURNING msg_id INTO result;
  INSERT INTO cron.job VALUES('process-email-queue') ON CONFLICT DO NOTHING;
  RETURN result;
END $$;
CREATE FUNCTION pgmq.delete(q text, id bigint) RETURNS boolean LANGUAGE plpgsql AS $$
BEGIN DELETE FROM pgmq.q_transactional_emails WHERE msg_id=id; RETURN FOUND; END $$;
CREATE FUNCTION pgmq.set_vt(q text,id bigint,seconds integer) RETURNS void LANGUAGE sql AS $$
UPDATE pgmq.q_transactional_emails SET vt=now()+make_interval(secs=>seconds) WHERE msg_id=id;
$$;
CREATE FUNCTION pgmq.read(q text, seconds integer, n integer) RETURNS SETOF pgmq.q_transactional_emails LANGUAGE sql AS $$
UPDATE pgmq.q_transactional_emails SET vt=now()+make_interval(secs=>seconds)
WHERE msg_id IN (SELECT msg_id FROM pgmq.q_transactional_emails WHERE vt <= now() ORDER BY msg_id LIMIT n FOR UPDATE SKIP LOCKED) RETURNING *;
$$;
CREATE FUNCTION public.email_queue_dispatch() RETURNS void LANGUAGE plpgsql AS $$
BEGIN
IF EXISTS(SELECT 1 FROM pgmq.q_transactional_emails) THEN
 INSERT INTO cron.job VALUES('process-email-queue') ON CONFLICT DO NOTHING;
ELSE DELETE FROM cron.job WHERE jobname='process-email-queue'; END IF;
END $$;
CREATE TABLE public.filming_benefit_redemptions(status text, updated_at timestamptz);
