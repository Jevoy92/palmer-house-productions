# Studio credit pool — cost and margin projections (no changes yet)

Nothing gets switched by this plan. It is the projection you asked for, plus the choice of what to do next.

## One correction first

The model now building campaigns, **GPT-6 Luna**, is OpenAI's *low-cost* GPT-6 tier, not the premium one. It worked because the other model rejected our campaign format, not because it's bigger. The step up is **GPT-6 Sol** (mid tier), and the top is **GPT-6 Astra** (most capable). Projections below show both.

## What each action costs you today (measured from real Studio usage)


| Action                                        | Credits charged to member | Your real AI cost now | Your cost per credit |
| --------------------------------------------- | ------------------------- | --------------------- | -------------------- |
| Pal reply                                     | 1                         | ~$0.001               | $0.001               |
| Voice note (per minute)                       | 2                         | ~$0.0012              | $0.0006              |
| Full campaign (24 drafts, 1,000+ word script) | 100                       | ~$0.07                | $0.0007              |
| Generated image (estimate, not yet measured)  | 30                        | ~$0.04                | $0.0013              |
| PDF / directions / website analysis           | 10 / 3 / 5                | similar to replies    | ~$0.001              |


Worst case: about **$0.0013 per credit** (all images). Typical mixed use: about **$0.001 per credit**.

## What each membership can make in a month


| &nbsp;                    | Studio $99                                          | Guided $499                                           | Partner $1,199                                         |
| ------------------------- | --------------------------------------------------- | ----------------------------------------------------- | ------------------------------------------------------ |
| Monthly credits           | 3,500                                               | 7,500                                                 | 15,000                                                 |
| Only Pal replies          | 3,500                                               | 7,500                                                 | 15,000                                                 |
| Only full campaigns       | 35                                                  | 75                                                    | 150                                                    |
| Only images               | ~115                                                | 250                                                   | 500                                                    |
| Only voice minutes        | 1,750                                               | 3,750                                                 | 7,500                                                  |
| **Realistic mixed month** | 10 campaigns, 40 images, 800 replies, 100 voice min | 25 campaigns, 80 images, 2,000 replies, 200 voice min | 50 campaigns, 150 images, 4,500 replies, 500 voice min |


"5,000 images" isn't realistic on any plan at 30 credits each. That would take 150,000 credits.

I would also like the 35 full campaigns, 1115 images, and 1750 voice minutes an a bunch of text included in the base plan. So we need to adjust the monthly credit systema ccordingly. The higher tiers should follow suit. I want people to know roughly what their credits get them so this is a good oprtunity for that. I know it dips into my margins but they are so large already I think that more than ok. 

## Your margin if a member uses every credit


| &nbsp;                                                 | Studio $99  | Guided $499  | Partner $1,199 |
| ------------------------------------------------------ | ----------- | ------------ | -------------- |
| Payment fees (~3% + 30¢)                               | ~$3.20      | ~$15         | ~$36           |
| **AI cost today (Luna mix)**                           | $3.50–$4.60 | $7.50–$10    | $15–$20        |
| AI if text moves to **Sol** (est. 3–4x text cost)      | ~$9–12      | ~$20–25      | ~$40–50        |
| AI if text moves to **Astra** (est. 8–10x text cost)   | ~$25–35     | ~$55–75      | ~$110–150      |
| Software margin at Astra, full use                     | ~$60 (61%)  | ~$410 (82%)* | ~$1,000 (84%)* |
| Expo intro price (Studio $69 booth) at Astra, full use | ~$32 (46%)  | —            | —              |


*Guided/Partner margins exclude your time for the private sessions.

Most members use 30–50% of their credits, so real AI costs are usually half these numbers or less.

**Read:** You can afford Astra-quality output on every plan, even at the $69 booth price. The only thin spot is a heavy Studio member on Astra during the intro months. Using Sol there (or Astra for campaigns only) keeps you above 70%.

## Video stays off

Studio has no video-generation action today, so members can't make AI video on any plan. Nothing to lock down. When it arrives, a short AI clip will likely cost you roughly $0.10–$0.50 in AI costs (to be measured). It should be priced at 150–300 credits and offered on Guided and Partner only.

## Recommended next step (pick one when ready — not done yet)

1. **Best quality, safe margins:** Astra for campaigns and PDFs, Sol for Pal chat, images unchanged.
2. **Max wow:** Astra everywhere. Keep credits as they are and watch real costs for 2 weeks.
3. **Keep as is:** Luna, and measure image costs first.

Whichever you choose, I'll measure real costs on a few test runs before and after, and report back before anything goes live.

## Technical notes

- Figures come from `studio_credit_usage.estimated_cost_usd`: 1 campaign, 6 chats, 1 transcription. The image cost and the Sol/Astra multipliers are estimates until measured.
- The model switch is a single setting per task (chat, campaign core, campaign long-form, PDF). Campaign core is currently pinned to Luna because Gemini rejects its structured format.
- The expo all-tier addendum (10%/20% Guided/Partner offers, Jevoy welcome letter, site QA) is a separate plan I'll write after this decision.