-- Enable realtime for user_credits table so dashboard updates live
ALTER PUBLICATION supabase_realtime ADD TABLE public.user_credits;