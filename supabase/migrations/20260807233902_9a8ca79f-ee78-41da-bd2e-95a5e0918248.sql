ALTER TABLE public.brand_profiles
  ADD COLUMN IF NOT EXISTS personal_interests text[] NOT NULL DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS personal_story text NOT NULL DEFAULT '';