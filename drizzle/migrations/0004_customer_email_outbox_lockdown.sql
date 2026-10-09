REVOKE ALL ON public.customer_email_outbox FROM PUBLIC, anon, authenticated;
GRANT ALL ON public.customer_email_outbox TO service_role;