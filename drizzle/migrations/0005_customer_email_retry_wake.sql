-- Internal retry-wake marker for customer_email_outbox.
-- A single content-free message in the existing transactional queue keeps the existing,
-- supported dispatcher armed while customer emails still need a retry. The queue processor
-- recognises it before any expiry/send logic and settles it through this routine; it is never
-- sent, rendered or written to the send log. No secrets are read here: arming relies on the
-- existing enqueue trigger.

CREATE OR REPLACE FUNCTION public.arm_customer_email_retry_wake()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO ''
AS $function$
BEGIN
  -- One marker at most: serialize arm/settle on a dedicated lock, then re-check.
  PERFORM pg_catalog.pg_advisory_xact_lock(7700000000000042);
  IF NOT EXISTS (
    SELECT 1 FROM pgmq.q_transactional_emails
     WHERE message->>'internal' = 'customer_email_retry_wake'
  ) THEN
    PERFORM pgmq.send('transactional_emails', jsonb_build_object('internal', 'customer_email_retry_wake', 'v', 1));
  END IF;
END $function$;

CREATE OR REPLACE FUNCTION public.settle_customer_email_retry_wake(p_msg_id bigint)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO ''
AS $function$
DECLARE next_due timestamptz; delay_s integer;
BEGIN
  PERFORM pg_catalog.pg_advisory_xact_lock(7700000000000042);
  IF NOT EXISTS (
    SELECT 1 FROM pgmq.q_transactional_emails
     WHERE msg_id = p_msg_id AND message->>'internal' = 'customer_email_retry_wake'
  ) THEN
    RETURN 'not_marker';
  END IF;
  SELECT min(CASE WHEN status = 'failed' THEN coalesce(next_attempt_at, now())
                  ELSE updated_at + interval '10 minutes' END)
    INTO next_due
    FROM public.customer_email_outbox
   WHERE status IN ('failed', 'claimed');
  IF next_due IS NULL THEN
    PERFORM pgmq.delete('transactional_emails', p_msg_id);
    RETURN 'removed';
  END IF;
  delay_s := greatest(5, least(300, ceil(extract(epoch FROM next_due - now()))::integer));
  PERFORM pgmq.set_vt('transactional_emails', p_msg_id, delay_s);
  RETURN 'kept';
END $function$;

-- Claim and initial wake marker now commit together.
CREATE OR REPLACE FUNCTION public.claim_customer_email(p_key text, p_template text, p_recipient text, p_data jsonb)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE r public.customer_email_outbox;
BEGIN
  INSERT INTO public.customer_email_outbox (idempotency_key, template_name, recipient_email, template_data)
  VALUES (p_key, p_template, lower(trim(p_recipient)), coalesce(p_data,'{}'::jsonb))
  ON CONFLICT (idempotency_key) DO NOTHING
  RETURNING * INTO r;
  IF FOUND THEN
    BEGIN PERFORM public.arm_customer_email_retry_wake();
    EXCEPTION WHEN OTHERS THEN RAISE WARNING 'retry wake not armed (claim kept): %', SQLERRM; END;
    RETURN jsonb_build_object('claimed', true, 'attempt', r.attempts, 'template', r.template_name, 'recipient', r.recipient_email, 'data', r.template_data);
  END IF;
  UPDATE public.customer_email_outbox
     SET status = 'claimed', attempts = attempts + 1, updated_at = now()
   WHERE idempotency_key = p_key
     AND (status = 'failed' OR (status = 'claimed' AND updated_at < now() - interval '10 minutes'))
  RETURNING * INTO r;
  IF FOUND THEN
    BEGIN PERFORM public.arm_customer_email_retry_wake();
    EXCEPTION WHEN OTHERS THEN RAISE WARNING 'retry wake not armed (claim kept): %', SQLERRM; END;
    RETURN jsonb_build_object('claimed', true, 'attempt', r.attempts, 'template', r.template_name, 'recipient', r.recipient_email, 'data', r.template_data);
  END IF;
  SELECT * INTO r FROM public.customer_email_outbox WHERE idempotency_key = p_key;
  RETURN jsonb_build_object('claimed', false, 'status', r.status);
END $function$;

-- Backup: a failed enqueue also (re)arms, so a retry is never left without a wake.
CREATE OR REPLACE FUNCTION public.finish_customer_email(p_key text, p_status text, p_error text)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  UPDATE public.customer_email_outbox
     SET status = CASE WHEN p_status = 'failed' AND attempts >= 10 THEN 'abandoned' ELSE p_status END,
         last_error = p_error,
         next_attempt_at = CASE WHEN p_status = 'failed' THEN now() + least(interval '6 hours', interval '1 minute' * power(2, attempts)) ELSE NULL END,
         updated_at = now()
   WHERE idempotency_key = p_key AND status = 'claimed';
  IF p_status = 'failed' THEN
    BEGIN PERFORM public.arm_customer_email_retry_wake();
    EXCEPTION WHEN OTHERS THEN RAISE WARNING 'retry wake not armed: %', SQLERRM; END;
  END IF;
END $function$;

REVOKE ALL ON FUNCTION public.finish_customer_email(text, text, text) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.finish_customer_email(text, text, text) TO service_role;
REVOKE ALL ON FUNCTION public.arm_customer_email_retry_wake() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.settle_customer_email_retry_wake(bigint) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.claim_customer_email(text, text, text, jsonb) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.arm_customer_email_retry_wake() TO service_role;
GRANT EXECUTE ON FUNCTION public.settle_customer_email_retry_wake(bigint) TO service_role;
GRANT EXECUTE ON FUNCTION public.claim_customer_email(text, text, text, jsonb) TO service_role;
