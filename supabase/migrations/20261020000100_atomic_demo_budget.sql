-- Anonymous accounting only: never store guest prompts, pages, or generated content.
ALTER TABLE public.expo_demo_usage ADD COLUMN IF NOT EXISTS network_hash text;
ALTER TABLE public.expo_demo_usage ADD COLUMN IF NOT EXISTS reserved_cents integer NOT NULL DEFAULT 50 CHECK (reserved_cents > 0);
CREATE INDEX IF NOT EXISTS expo_demo_usage_network_idx ON public.expo_demo_usage (network_hash, created_at);

CREATE OR REPLACE FUNCTION public.reserve_expo_demo(
  p_session_id text, p_network_hash text, p_kind text,
  p_session_cap integer, p_daily_cap integer, p_network_cap integer,
  p_budget_cents integer, p_cost_cents integer
) RETURNS uuid LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, pg_temp AS $$
DECLARE v_id uuid; v_since timestamptz := clock_timestamp() - interval '24 hours';
BEGIN
  IF p_kind NOT IN ('chat','research','campaign','image') OR length(p_session_id) <> 36
     OR length(p_network_hash) <> 64 OR p_session_cap NOT BETWEEN 1 AND 40
     OR p_daily_cap NOT BETWEEN 1 AND 10000 OR p_network_cap NOT BETWEEN 1 AND 1000
     OR p_budget_cents NOT BETWEEN 1 AND 100000 OR p_cost_cents NOT BETWEEN 1 AND 10000
     OR p_session_id IS NULL OR p_network_hash IS NULL OR p_kind IS NULL
     OR p_session_cap IS NULL OR p_daily_cap IS NULL OR p_network_cap IS NULL
     OR p_budget_cents IS NULL OR p_cost_cents IS NULL THEN
    RAISE EXCEPTION 'Invalid demo budget configuration';
  END IF;
  -- One global lock covers every check and insert, including different sessions/networks.
  PERFORM pg_advisory_xact_lock(hashtextextended('palmer-expo-demo-budget-v1', 0));
  IF (SELECT count(*) FROM expo_demo_usage WHERE created_at >= v_since) >= p_daily_cap
     OR (SELECT coalesce(sum(reserved_cents),0) FROM expo_demo_usage WHERE created_at >= v_since) + p_cost_cents > p_budget_cents THEN
    RAISE EXCEPTION 'The free demo has reached today''s allowance. Please try again tomorrow.';
  END IF;
  IF (SELECT count(*) FROM expo_demo_usage WHERE network_hash = p_network_hash AND created_at >= v_since) >= p_network_cap
     OR (SELECT count(*) FROM expo_demo_usage WHERE session_id = p_session_id AND kind = p_kind AND created_at >= v_since) >= p_session_cap THEN
    RAISE EXCEPTION 'This demo has reached its allowance. Explore the prepared examples or return tomorrow.';
  END IF;
  INSERT INTO expo_demo_usage(session_id,network_hash,kind,reserved_cents)
    VALUES(p_session_id,p_network_hash,p_kind,p_cost_cents) RETURNING id INTO v_id;
  RETURN v_id;
END $$;
REVOKE ALL ON FUNCTION public.reserve_expo_demo(text,text,text,integer,integer,integer,integer,integer) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.reserve_expo_demo(text,text,text,integer,integer,integer,integer,integer) TO service_role;
