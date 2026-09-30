DO $$ BEGIN CREATE TYPE public.app_role AS ENUM ('admin','moderator','user'); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
CREATE TABLE IF NOT EXISTS public.user_roles (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL, role public.app_role NOT NULL, UNIQUE (user_id, role));
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can view own roles" ON public.user_roles;
CREATE POLICY "Users can view own roles" ON public.user_roles FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role) RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$ SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role) $$;
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM anon, public;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated, service_role;
INSERT INTO public.user_roles (user_id, role) VALUES ('6c514515-a337-4eb3-87f1-5aa4fca6f884','admin') ON CONFLICT DO NOTHING;

CREATE TABLE public.expo_contacts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id text NOT NULL,
  email text NOT NULL,
  name text,
  company text,
  phone text,
  wants_to_create text,
  interest text CHECK (interest IN ('studio','production','planning')),
  source text NOT NULL DEFAULT 'form',
  status text NOT NULL DEFAULT 'lead' CHECK (status IN ('lead','account','paid')),
  purchased text,
  offer text CHECK (offer IN ('public','booth')),
  workspace_id uuid,
  stripe_customer_id text,
  follow_up_date date NOT NULL DEFAULT '2026-10-02',
  follow_up_state text NOT NULL DEFAULT 'due' CHECK (follow_up_state IN ('due','sent','replied','skipped')),
  follow_up_sent_at timestamptz,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (campaign_id, email)
);
CREATE TABLE public.expo_contact_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  contact_id uuid NOT NULL REFERENCES public.expo_contacts(id) ON DELETE CASCADE,
  kind text NOT NULL,
  detail text,
  dedupe_key text UNIQUE,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.expo_contacts, public.expo_contact_events TO authenticated;
GRANT ALL ON public.expo_contacts, public.expo_contact_events TO service_role;
ALTER TABLE public.expo_contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.expo_contact_events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Staff manage expo contacts" ON public.expo_contacts FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE POLICY "Staff manage expo events" ON public.expo_contact_events FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));