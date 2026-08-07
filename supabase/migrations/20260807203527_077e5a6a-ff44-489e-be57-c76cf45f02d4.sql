-- 1. Lock down SECURITY DEFINER functions in the exposed public schema.
DO $$
DECLARE
  fn record;
BEGIN
  FOR fn IN
    SELECT p.oid::regprocedure AS sig
    FROM pg_proc p
    JOIN pg_namespace n ON n.oid = p.pronamespace
    WHERE n.nspname = 'public'
      AND p.prosecdef
  LOOP
    EXECUTE format('REVOKE ALL ON FUNCTION %s FROM PUBLIC, anon, authenticated;', fn.sig);
  END LOOP;
END
$$;

-- Re-grant only the routines the Studio actually calls, to signed-in users only.
GRANT EXECUTE ON FUNCTION public.reserve_campaign_usage(uuid, uuid, text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.finish_campaign_usage(uuid, text) TO authenticated;

-- 2. compass_results: prevent spoofed email / user association.
DROP POLICY IF EXISTS "Validated compass result inserts" ON public.compass_results;

CREATE POLICY "Anonymous compass results stay anonymous"
  ON public.compass_results
  FOR INSERT
  TO anon
  WITH CHECK (
    user_id IS NULL
    AND email IS NULL
    AND inputs IS NOT NULL
    AND results IS NOT NULL
    AND jsonb_typeof(inputs) = 'object'
    AND jsonb_typeof(results) = 'object'
  );

CREATE POLICY "Members save their own compass results"
  ON public.compass_results
  FOR INSERT
  TO authenticated
  WITH CHECK (
    user_id = auth.uid()
    AND (
      email IS NULL
      OR lower(email) = lower(coalesce(auth.jwt() ->> 'email', ''))
    )
    AND inputs IS NOT NULL
    AND results IS NOT NULL
    AND jsonb_typeof(inputs) = 'object'
    AND jsonb_typeof(results) = 'object'
  );

-- 3. video_system_assessments: validate anonymous lead submissions.
DROP POLICY IF EXISTS "Allow public inserts" ON public.video_system_assessments;

CREATE POLICY "Validated assessment submissions"
  ON public.video_system_assessments
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    email IS NOT NULL
    AND length(email) BETWEEN 6 AND 254
    AND email ~ '^[^@\s]+@[^@\s.]+\.[^@\s]+$'
    AND (name IS NULL OR length(name) <= 120)
    AND (company IS NULL OR length(company) <= 160)
    AND (source IS NULL OR length(source) <= 80)
    AND (level IS NULL OR length(level) <= 60)
    AND answers IS NOT NULL
    AND jsonb_typeof(answers) = 'object'
    AND length(answers::text) <= 20000
    AND (recommendations IS NULL OR length(recommendations::text) <= 20000)
    AND score BETWEEN 0 AND 1000
  );