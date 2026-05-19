-- =====================================================
-- PHASE 1: DATABASE ARCHITECTURE - SAAS CREDITS SYSTEM
-- =====================================================

-- Step 1: Create Enums
-- =====================================================

CREATE TYPE subscription_tier AS ENUM ('free', 'core', 'guided');
CREATE TYPE transaction_type AS ENUM ('usage', 'refill', 'purchase', 'bonus', 'migration');

-- Step 2: Create Tables
-- =====================================================

-- Subscription plans configuration table
CREATE TABLE subscription_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tier subscription_tier NOT NULL UNIQUE,
  name TEXT NOT NULL,
  monthly_credits INTEGER NOT NULL,
  strategy_sessions_per_month INTEGER NOT NULL,
  features JSONB NOT NULL DEFAULT '{}'::jsonb,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- User subscriptions table
CREATE TABLE user_subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES profiles(id) ON DELETE CASCADE,
  plan_id UUID NOT NULL REFERENCES subscription_plans(id),
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'canceled', 'paused')),
  current_period_start TIMESTAMPTZ NOT NULL DEFAULT now(),
  current_period_end TIMESTAMPTZ NOT NULL,
  cancel_at_period_end BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- User credits balance table
CREATE TABLE user_credits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES profiles(id) ON DELETE CASCADE,
  balance INTEGER NOT NULL DEFAULT 0 CHECK (balance >= 0),
  monthly_allowance INTEGER NOT NULL DEFAULT 0,
  last_refill_date TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Credits transactions/audit log
CREATE TABLE credit_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  amount INTEGER NOT NULL,
  transaction_type transaction_type NOT NULL,
  tool_used TEXT,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- User add-ons table
CREATE TABLE user_addons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  addon_type TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  purchased_at TIMESTAMPTZ DEFAULT now(),
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Tool credit costs configuration
CREATE TABLE tool_costs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tool_name TEXT NOT NULL UNIQUE,
  credit_cost INTEGER NOT NULL CHECK (credit_cost >= 0),
  description TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Step 3: Create Indexes for Performance
-- =====================================================

CREATE INDEX idx_user_subscriptions_user_id ON user_subscriptions(user_id);
CREATE INDEX idx_user_subscriptions_status ON user_subscriptions(status);
CREATE INDEX idx_user_credits_user_id ON user_credits(user_id);
CREATE INDEX idx_credit_transactions_user_id ON credit_transactions(user_id);
CREATE INDEX idx_credit_transactions_created_at ON credit_transactions(created_at DESC);
CREATE INDEX idx_user_addons_user_id ON user_addons(user_id);
CREATE INDEX idx_user_addons_active ON user_addons(user_id, is_active) WHERE is_active = true;

-- Step 4: Enable Row-Level Security
-- =====================================================

ALTER TABLE subscription_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_credits ENABLE ROW LEVEL SECURITY;
ALTER TABLE credit_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_addons ENABLE ROW LEVEL SECURITY;
ALTER TABLE tool_costs ENABLE ROW LEVEL SECURITY;

-- Step 5: Create RLS Policies
-- =====================================================

-- Subscription plans (readable by all authenticated users)
CREATE POLICY "Anyone can view active subscription plans"
  ON subscription_plans FOR SELECT
  TO authenticated
  USING (is_active = true);

-- User subscriptions (users can only view their own)
CREATE POLICY "Users can view their own subscription"
  ON user_subscriptions FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- User credits (users can only view their own)
CREATE POLICY "Users can view their own credits"
  ON user_credits FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Credit transactions (users can view their own, insert via functions only)
CREATE POLICY "Users can view their own transactions"
  ON credit_transactions FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- User add-ons (users can view their own)
CREATE POLICY "Users can view their own addons"
  ON user_addons FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Tool costs (readable by all authenticated users)
CREATE POLICY "Anyone can view active tool costs"
  ON tool_costs FOR SELECT
  TO authenticated
  USING (is_active = true);

-- Step 6: Create Database Functions
-- =====================================================

-- Function to check if user has enough credits
CREATE OR REPLACE FUNCTION check_credits(p_user_id UUID, p_required_credits INTEGER)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT balance >= p_required_credits 
  FROM user_credits 
  WHERE user_id = p_user_id;
$$;

-- Function to consume credits (atomic operation)
CREATE OR REPLACE FUNCTION consume_credits(
  p_user_id UUID, 
  p_amount INTEGER, 
  p_tool_name TEXT,
  p_metadata JSONB DEFAULT '{}'::jsonb
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  current_balance INTEGER;
BEGIN
  -- Get current balance with row lock to prevent race conditions
  SELECT balance INTO current_balance
  FROM user_credits
  WHERE user_id = p_user_id
  FOR UPDATE;
  
  -- Check if user exists
  IF current_balance IS NULL THEN
    RAISE EXCEPTION 'User credits not found';
  END IF;
  
  -- Check if enough credits
  IF current_balance < p_amount THEN
    RETURN FALSE;
  END IF;
  
  -- Deduct credits
  UPDATE user_credits
  SET 
    balance = balance - p_amount,
    updated_at = now()
  WHERE user_id = p_user_id;
  
  -- Log transaction
  INSERT INTO credit_transactions (user_id, amount, transaction_type, tool_used, metadata)
  VALUES (p_user_id, -p_amount, 'usage', p_tool_name, p_metadata);
  
  RETURN TRUE;
END;
$$;

-- Function to add credits (purchases, bonuses, refills)
CREATE OR REPLACE FUNCTION add_credits(
  p_user_id UUID,
  p_amount INTEGER,
  p_transaction_type transaction_type,
  p_metadata JSONB DEFAULT '{}'::jsonb
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Add credits
  UPDATE user_credits
  SET 
    balance = balance + p_amount,
    updated_at = now()
  WHERE user_id = p_user_id;
  
  -- Log transaction
  INSERT INTO credit_transactions (user_id, amount, transaction_type, metadata)
  VALUES (p_user_id, p_amount, p_transaction_type, p_metadata);
  
  RETURN TRUE;
END;
$$;

-- Function to refill monthly credits (run via cron on 1st of month)
CREATE OR REPLACE FUNCTION refill_monthly_credits()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Update credits for users whose last refill was before this month
  UPDATE user_credits
  SET 
    balance = balance + monthly_allowance,
    last_refill_date = now(),
    updated_at = now()
  WHERE last_refill_date < date_trunc('month', now());
  
  -- Log refill transactions
  INSERT INTO credit_transactions (user_id, amount, transaction_type, metadata)
  SELECT 
    user_id, 
    monthly_allowance, 
    'refill',
    jsonb_build_object('refill_date', now())
  FROM user_credits
  WHERE last_refill_date >= date_trunc('month', now());
END;
$$;

-- Step 7: Create Triggers
-- =====================================================

-- Updated_at triggers for all tables
CREATE OR REPLACE FUNCTION trigger_set_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER set_updated_at_subscription_plans
  BEFORE UPDATE ON subscription_plans
  FOR EACH ROW EXECUTE FUNCTION trigger_set_updated_at();

CREATE TRIGGER set_updated_at_user_subscriptions
  BEFORE UPDATE ON user_subscriptions
  FOR EACH ROW EXECUTE FUNCTION trigger_set_updated_at();

CREATE TRIGGER set_updated_at_user_credits
  BEFORE UPDATE ON user_credits
  FOR EACH ROW EXECUTE FUNCTION trigger_set_updated_at();

CREATE TRIGGER set_updated_at_tool_costs
  BEFORE UPDATE ON tool_costs
  FOR EACH ROW EXECUTE FUNCTION trigger_set_updated_at();

-- Step 8: Update handle_new_user Function
-- =====================================================

-- Drop and recreate the function to add credits initialization
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  free_plan_id UUID;
BEGIN
  -- Insert into profiles
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name'
  );
  
  -- Get the Free tier plan ID
  SELECT id INTO free_plan_id 
  FROM subscription_plans 
  WHERE tier = 'free' 
  LIMIT 1;
  
  -- Initialize subscription to Free tier
  INSERT INTO user_subscriptions (user_id, plan_id, current_period_start, current_period_end)
  VALUES (
    NEW.id,
    free_plan_id,
    now(),
    now() + interval '1 year' -- Free tier never expires
  );
  
  -- Initialize credits (10 for free tier)
  INSERT INTO user_credits (user_id, balance, monthly_allowance)
  VALUES (NEW.id, 10, 10);
  
  -- Log initial credit grant
  INSERT INTO credit_transactions (user_id, amount, transaction_type, metadata)
  VALUES (NEW.id, 10, 'bonus', '{"reason": "new_user_welcome"}'::jsonb);
  
  RETURN NEW;
END;
$$;

-- Step 9: Seed Initial Configuration Data
-- =====================================================

-- Insert subscription plans
INSERT INTO subscription_plans (tier, name, monthly_credits, strategy_sessions_per_month, features) VALUES
(
  'free',
  'Free Tier',
  10,
  0,
  '{
    "tagline": "Test the waters",
    "ai_tools": ["video_series_builder"],
    "storage_gb": 1,
    "downloads": false,
    "publishing": false,
    "scheduling": false,
    "system_builders": false,
    "priority_support": false
  }'::jsonb
),
(
  'core',
  'Core Tier',
  100,
  1,
  '{
    "tagline": "Full creative control",
    "ai_tools": ["all"],
    "storage_gb": 50,
    "downloads": true,
    "publishing": true,
    "scheduling": "basic",
    "system_builders": true,
    "priority_support": false
  }'::jsonb
),
(
  'guided',
  'Guided Support',
  250,
  2,
  '{
    "tagline": "Partnership mode",
    "ai_tools": ["all"],
    "storage_gb": 200,
    "downloads": true,
    "publishing": true,
    "scheduling": "advanced",
    "system_builders": true,
    "priority_support": true,
    "exclusive_benefits": true
  }'::jsonb
);

-- Insert tool costs
INSERT INTO tool_costs (tool_name, credit_cost, description) VALUES
('video-series-builder', 5, 'Generate complete multi-platform video series plan'),
('persona-generator', 8, 'Create detailed audience personas and brand voice definition'),
('content-maximizer', 6, 'Repurpose content across multiple platforms'),
('engagement-responder', 3, 'Generate audience engagement response variations'),
('production-assistant', 7, 'Create comprehensive shot lists and production checklists'),
('thumbnail-generator', 2, 'AI-generated video thumbnail'),
('music-generator', 4, 'AI-generated background music track'),
('script-generator', 3, 'Generate video script with hooks and structure'),
('metadata-writer', 2, 'Auto-write optimized YouTube metadata');

-- Step 10: Migrate Existing Users
-- =====================================================

-- This migrates all existing users to Core tier with bonus credits as a "thank you"
DO $$
DECLARE
  core_plan_id UUID;
  existing_user RECORD;
BEGIN
  -- Get Core tier plan ID
  SELECT id INTO core_plan_id 
  FROM subscription_plans 
  WHERE tier = 'core' 
  LIMIT 1;
  
  -- Loop through all existing profiles
  FOR existing_user IN SELECT id FROM profiles
  LOOP
    -- Check if user already has subscription (shouldn't, but safe check)
    IF NOT EXISTS (SELECT 1 FROM user_subscriptions WHERE user_id = existing_user.id) THEN
      -- Create Core tier subscription (3 months free as thank you)
      INSERT INTO user_subscriptions (user_id, plan_id, current_period_start, current_period_end, status)
      VALUES (
        existing_user.id,
        core_plan_id,
        now(),
        now() + interval '3 months',
        'active'
      );
      
      -- Initialize credits with 200 bonus credits + 100 monthly allowance
      INSERT INTO user_credits (user_id, balance, monthly_allowance, last_refill_date)
      VALUES (existing_user.id, 300, 100, now());
      
      -- Log migration bonus
      INSERT INTO credit_transactions (user_id, amount, transaction_type, metadata)
      VALUES (
        existing_user.id,
        300,
        'migration',
        '{"reason": "existing_user_thank_you", "bonus_credits": 200, "monthly_allowance": 100}'::jsonb
      );
    END IF;
  END LOOP;
END $$;

-- Step 11: Grant Execute Permissions
-- =====================================================

GRANT EXECUTE ON FUNCTION check_credits(UUID, INTEGER) TO authenticated;
GRANT EXECUTE ON FUNCTION consume_credits(UUID, INTEGER, TEXT, JSONB) TO authenticated;
GRANT EXECUTE ON FUNCTION add_credits(UUID, INTEGER, transaction_type, JSONB) TO authenticated;

-- =====================================================
-- MIGRATION COMPLETE
-- =====================================================