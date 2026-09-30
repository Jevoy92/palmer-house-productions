CREATE TABLE public.expo_demo_usage (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id text NOT NULL,
  kind text NOT NULL CHECK (kind IN ('chat','research','campaign','image')),
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX expo_demo_usage_created_idx ON public.expo_demo_usage (created_at);
CREATE INDEX expo_demo_usage_session_idx ON public.expo_demo_usage (session_id, kind);
GRANT ALL ON public.expo_demo_usage TO service_role;
ALTER TABLE public.expo_demo_usage ENABLE ROW LEVEL SECURITY;