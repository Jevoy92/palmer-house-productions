# Launch readiness: publish, security review, live payments, test credits, first-run guidance

## About "notify.palmerhouseproductions.com"
This isn't an inbox. It's a sending address set up for you earlier in this project. Studio sends sign-in links, password resets and team notices from an address like `no-reply@notify.palmerhouseproductions.com`, so they come from your brand and don't land in spam. Your normal email and website aren't affected, and replies still go to info@palmerhouseproductions.com.

## 1. Publish
- Publish the current version so the live site matches the updated database.
- After publishing, switch email confirmation back on for new sign-ups and send myself a test sign-in email to confirm it arrives.

## 2. Review the 25 older security warnings
- Run a new security scan and go through every warning.
- Fix the real risks, like tables that are too open or database actions anyone can call. Nothing members use should break.
- Warnings that are intentional, like your public pages and forms, get marked with a short reason instead of being changed.
- You'll get a plain-language list: what I fixed, what's fine as it is, and anything that needs you.

## 3. Test with live payments (real money, refunded)
- Stripe stays in live mode. No test key is needed.
- Turn on credit top-ups so members can buy credits.
- You make one real purchase of the cheapest top-up. I confirm the credits arrive in Studio and the receipt looks right, then refund it through Stripe.
- I also check the plan and video deposit checkout pages load correctly, but won't charge them.

## 4. Test credits for your workspace
- Add a one-time grant of 15,000 credits (the Partner allowance) to JP Enterprises, marked as an internal test grant so it stays out of revenue numbers.
- Then run the full test: a conversation, the Pal building a campaign, images, a PDF, the Feed, Brand DNA, approvals and settings. I'll check the right number of credits comes off at each step.
- You record one voice note so I can check it's charged 2 credits per started minute.

## 5. Every new member gets a guided start, and the Pal acts first
Check a brand-new account from the first screen, then fill any gaps so:
- **Welcome flow:** it always runs once. Pick your Pal, then your business basics (industry, what you do, website, what you love outside work), then the first campaign is built for you automatically. Every step can be skipped but is clearly offered, and continue buttons light up when ready.
- **The Pal starts the conversation:** a new chat always opens with a message from the Pal built on your Brand DNA. It includes 3 ready-made ideas (business, personal, playful) you can start with one tap. You never land on an empty box.
- **The Pal keeps things moving:** each reply ends with a clear next step (build it, make an image, schedule it). Home always shows one "do this next" suggestion from your actual work: an unfinished draft, a missing brand detail, or a quiet week on the calendar.
- **Missing details:** the Pal asks for them in the chat, one question at a time, instead of showing a form.

## Technical notes
- Credits: a service-side grant into `studio_credit_grants` (kind `bonus`, `source_key` `internal-test-2026-09-28`), never exposed to clients.
- Refund: Stripe refund API on the test payment intent; `reverse_studio_topup` will pull back those top-up credits, and the test grant is unaffected.
- Auth: set auto-confirm off after publishing; auth email templates stay on the verified notify subdomain.
- Security: triage `security--get_scan_results`; migrations tighten grants/RLS. Security-definer functions stay executable only by the roles that need them.
- First-run: reuse the existing onboarding and guide selection. Add a Pal opener that runs on conversation creation (charged like normal chat, or free for the first message) and a Home "next best action" drawn from real workspace data.
