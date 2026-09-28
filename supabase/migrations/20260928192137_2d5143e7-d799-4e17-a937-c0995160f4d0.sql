REVOKE EXECUTE ON FUNCTION public.enqueue_email(text, jsonb), public.read_email_batch(text, integer, integer), public.delete_email(text, bigint), public.move_to_dlq(text, text, bigint, jsonb), public.email_queue_dispatch(), public.email_queue_wake() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.enqueue_email(text, jsonb), public.read_email_batch(text, integer, integer), public.delete_email(text, bigint), public.move_to_dlq(text, text, bigint, jsonb), public.email_queue_dispatch() TO service_role;
ALTER FUNCTION public.enqueue_email(text, jsonb) SET search_path = public, pgmq;
ALTER FUNCTION public.read_email_batch(text, integer, integer) SET search_path = public, pgmq;
ALTER FUNCTION public.delete_email(text, bigint) SET search_path = public, pgmq;
ALTER FUNCTION public.move_to_dlq(text, text, bigint, jsonb) SET search_path = public, pgmq;
DROP POLICY "Anyone can view likes count" ON public.pal_post_likes;
CREATE POLICY "Users can view their own likes" ON public.pal_post_likes FOR SELECT TO authenticated USING (auth.uid() = user_id);