CREATE SCHEMA IF NOT EXISTS private;
GRANT USAGE ON SCHEMA private TO authenticated;
CREATE OR REPLACE FUNCTION private.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  select exists (select 1 from public.user_roles where user_id = _user_id and role = _role)
$$;
REVOKE ALL ON FUNCTION private.has_role(uuid, public.app_role) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION private.has_role(uuid, public.app_role) TO authenticated;
DROP POLICY IF EXISTS "Staff manage expo contacts" ON public.expo_contacts;
DROP POLICY IF EXISTS "Staff manage expo events" ON public.expo_contact_events;
DROP FUNCTION IF EXISTS public.has_role(uuid, public.app_role);
CREATE POLICY "Staff manage expo contacts" ON public.expo_contacts FOR ALL TO authenticated
  USING (private.has_role(auth.uid(), 'admin')) WITH CHECK (private.has_role(auth.uid(), 'admin'));
CREATE POLICY "Staff manage expo events" ON public.expo_contact_events FOR ALL TO authenticated
  USING (private.has_role(auth.uid(), 'admin')) WITH CHECK (private.has_role(auth.uid(), 'admin'));
UPDATE public.workspace_subscriptions SET status='active' WHERE workspace_id='9c9fa0dc-655e-4635-83b3-d0c4fc30c21b';