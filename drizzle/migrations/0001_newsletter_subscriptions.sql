CREATE TABLE public.newsletter_subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL UNIQUE CHECK (email = lower(email) AND length(email) <= 254),
  user_id uuid UNIQUE,
  first_name text,
  monthly boolean NOT NULL DEFAULT false,
  weekly boolean NOT NULL DEFAULT false,
  unsubscribed_all boolean NOT NULL DEFAULT false,
  paid_eligible boolean NOT NULL DEFAULT false,
  resend_contact_id text,
  sync_state text NOT NULL DEFAULT 'pending' CHECK (sync_state IN ('pending','synced','error')),
  sync_attempts integer NOT NULL DEFAULT 0,
  sync_error text,
  last_synced_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.newsletter_subscribers TO authenticated;
GRANT ALL ON public.newsletter_subscribers TO service_role;
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Members read own newsletter row" ON public.newsletter_subscribers
  FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE INDEX newsletter_subscribers_sync_idx ON public.newsletter_subscribers (sync_state, updated_at);

CREATE TABLE public.newsletter_consent_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  subscriber_id uuid NOT NULL REFERENCES public.newsletter_subscribers(id) ON DELETE CASCADE,
  email text NOT NULL,
  user_id uuid,
  topic text NOT NULL CHECK (topic IN ('monthly','weekly','all')),
  action text NOT NULL CHECK (action IN ('opt_in','opt_out','unsubscribe_all','resubscribe_all')),
  source text NOT NULL CHECK (source IN ('website','signup','settings','resend')),
  consent_text text,
  ip_hash text,
  user_agent text,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.newsletter_consent_events TO authenticated;
GRANT ALL ON public.newsletter_consent_events TO service_role;
ALTER TABLE public.newsletter_consent_events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Members read own consent history" ON public.newsletter_consent_events
  FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE INDEX newsletter_consent_ip_idx ON public.newsletter_consent_events (ip_hash, created_at);
CREATE INDEX newsletter_consent_email_idx ON public.newsletter_consent_events (email, created_at);

CREATE TABLE public.newsletter_webhook_events (
  svix_id text PRIMARY KEY,
  event_type text NOT NULL,
  received_at timestamptz NOT NULL DEFAULT now()
);
GRANT ALL ON public.newsletter_webhook_events TO service_role;
ALTER TABLE public.newsletter_webhook_events ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.newsletter_config (
  key text PRIMARY KEY,
  value text NOT NULL,
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT ALL ON public.newsletter_config TO service_role;
ALTER TABLE public.newsletter_config ENABLE ROW LEVEL SECURITY;