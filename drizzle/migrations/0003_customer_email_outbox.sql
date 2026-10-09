CREATE TABLE public.customer_email_outbox (
  idempotency_key text PRIMARY KEY,
  template_name text NOT NULL,
  recipient_email text NOT NULL,
  template_data jsonb NOT NULL DEFAULT '{}'::jsonb,
  status text NOT NULL DEFAULT 'claimed' CHECK (status IN ('claimed','queued','failed','suppressed','abandoned')),
  attempts integer NOT NULL DEFAULT 1,
  last_error text,
  next_attempt_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT ALL ON public.customer_email_outbox TO service_role;
ALTER TABLE public.customer_email_outbox ENABLE ROW LEVEL SECURITY;
CREATE INDEX customer_email_outbox_retry_idx ON public.customer_email_outbox (next_attempt_at) WHERE status IN ('failed','claimed');

-- Atomically claim the right to enqueue one customer email. Only one caller wins per key;
-- failed (or stale, crashed) claims may be re-claimed and always reuse the first stored data.
CREATE OR REPLACE FUNCTION public.claim_customer_email(p_key text, p_template text, p_recipient text, p_data jsonb)
RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE r public.customer_email_outbox;
BEGIN
  INSERT INTO public.customer_email_outbox (idempotency_key, template_name, recipient_email, template_data)
  VALUES (p_key, p_template, lower(trim(p_recipient)), coalesce(p_data,'{}'::jsonb))
  ON CONFLICT (idempotency_key) DO NOTHING
  RETURNING * INTO r;
  IF FOUND THEN
    RETURN jsonb_build_object('claimed', true, 'attempt', r.attempts, 'template', r.template_name, 'recipient', r.recipient_email, 'data', r.template_data);
  END IF;
  UPDATE public.customer_email_outbox
     SET status = 'claimed', attempts = attempts + 1, updated_at = now()
   WHERE idempotency_key = p_key
     AND (status = 'failed' OR (status = 'claimed' AND updated_at < now() - interval '10 minutes'))
  RETURNING * INTO r;
  IF FOUND THEN
    RETURN jsonb_build_object('claimed', true, 'attempt', r.attempts, 'template', r.template_name, 'recipient', r.recipient_email, 'data', r.template_data);
  END IF;
  SELECT * INTO r FROM public.customer_email_outbox WHERE idempotency_key = p_key;
  RETURN jsonb_build_object('claimed', false, 'status', r.status);
END $$;

CREATE OR REPLACE FUNCTION public.finish_customer_email(p_key text, p_status text, p_error text)
RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  UPDATE public.customer_email_outbox
     SET status = CASE WHEN p_status = 'failed' AND attempts >= 10 THEN 'abandoned' ELSE p_status END,
         last_error = p_error,
         next_attempt_at = CASE WHEN p_status = 'failed' THEN now() + least(interval '6 hours', interval '1 minute' * power(2, attempts)) ELSE NULL END,
         updated_at = now()
   WHERE idempotency_key = p_key AND status = 'claimed';
END $$;

REVOKE ALL ON FUNCTION public.claim_customer_email(text,text,text,jsonb) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.finish_customer_email(text,text,text) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.claim_customer_email(text,text,text,jsonb) TO service_role;
GRANT EXECUTE ON FUNCTION public.finish_customer_email(text,text,text) TO service_role;

ALTER TABLE public.filming_benefit_redemptions ADD COLUMN confirmed_at timestamptz;
UPDATE public.filming_benefit_redemptions SET confirmed_at = updated_at WHERE status = 'redeemed' AND confirmed_at IS NULL;