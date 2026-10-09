<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->
- Expo guest demo (/expo/demo) is stateless on the client and metered only by the server-only expo_demo_usage table; it never touches member credits or saves guest content — keeps booth guests isolated and the bill capped.
- Customer booking emails go through `queueCustomerEmail`, which atomically claims a deterministic key in `customer_email_outbox` and is retried by the queue processor on failure; it never throws — payment fulfillment must not depend on email delivery, and newsletter preferences never block service emails.
- Booking CTAs link to Google appointment pages in `src/lib/booking-links.ts`; clicking never marks a call scheduled, and paid-only CTAs gate on `isActivePaidMember`.
