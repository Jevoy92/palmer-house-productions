-- Add Stripe subscription ID to user_subscriptions
ALTER TABLE user_subscriptions 
ADD COLUMN IF NOT EXISTS stripe_subscription_id TEXT UNIQUE;

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_user_subscriptions_stripe_id 
ON user_subscriptions(stripe_subscription_id);