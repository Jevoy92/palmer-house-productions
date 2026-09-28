# Studio AI economics and credit policy

**Decision:** keep the current membership prices; add a shared workspace credit balance and prepaid top-ups. Price each generation before it runs. Separate everyday conversation from substantial writing and image work. The software has room for healthy margins; the human strategy hours in Guided and Partner are the larger cost.

Research checked **September 27, 2026**. USD throughout. These are reproducible planning scenarios, not observed customer bills, a live model-quality benchmark, or net-profit forecasts. No paid generation was performed for this analysis.

## 1. What to sell

| Membership | Monthly / annual price | Credits each month | Human service already promised |
| ---------- | ---------------------: | -----------------: | ------------------------------ |
| Studio     |             $99 / $990 |              1,000 | None                           |
| Guided     |          $499 / $4,990 |              2,500 | One strategy hour per month    |
| Partner    |       $1,199 / $11,990 |              6,000 | One strategy hour per week     |

The existing 2/5/12 campaign quantities should be described as suggested monthly rhythms, not a second hard cap. Credits fund campaigns and the other tools. A trial receives **100 credits once per workspace creator**, not a recurring free allowance; creating additional workspaces does not generate additional free trials. Monthly included credits refresh without accumulating; purchased credits remain a separate balance. Annual members still receive credits monthly, preventing a year's usage being spent immediately.

| Action                         | Credits | Notes                                                 |
| ------------------------------ | ------: | ----------------------------------------------------- |
| Pal reply                      |       1 | Bounded everyday text model                           |
| Three content directions       |       3 | One structured request                                |
| Website or reference analysis  |       5 | Bounded source/context size                           |
| Complete campaign              |     100 | Two substantial writing requests; images are separate |
| Image                          |      30 | One standard image, target 2K maximum                 |
| AI-written PDF                 |      10 | Writing plus deterministic document rendering         |
| Custom Pal portrait            |      20 | One portrait, target 1K maximum                       |
| Requested fresh Pal discussion |       5 | One generated discussion                              |

Opening pages, greetings, reading saved work, editing, copying, downloading an existing file, and rendering existing text as a PDF should not require a paid model call. Background feed updates need their own small owner-funded budget and frequency cap; opening the app must not silently spend a member's purchased credits.

### Replenishments

| One-time purchase     | AI budget if every credit is redeemed | US card fee | Contribution after AI and card fee |
| --------------------- | ------------------------------------: | ----------: | ---------------------------------: |
| 500 credits for $20   |                                 $2.50 |       $0.88 |                          **83.1%** |
| 1,500 credits for $50 |                                 $7.50 |       $1.75 |                          **81.5%** |

Those margins assume an internal AI envelope of **$0.005 per credit**, inclusive of the operational contingency described below. They are targets that depend on enforcing task and model limits. A credit is a Studio product unit, not a token or one Lovable credit. Do not label the balance as dollars or cash. Purchased credits have a future service obligation even when they are not used immediately.

The scenarios use full advertised membership prices. Membership Checkout permits configured Stripe promotion codes; a discount reduces collected revenue without reducing the included credits or promised strategy time. Evaluate each promotion with the discounted price before offering it. Credit top-ups use fixed prices and do not enable promotion codes.

Start with explicit one-time purchases through Stripe Checkout. An auto-replenishment option should only charge after a workspace owner opts in to an amount, a threshold, and a maximum monthly spend. A checkout success URL alone never grants credits; a verified, idempotent payment event does.

US domestic card fees are modeled at **2.9% + $0.30**. Recurring memberships also include **0.7% Stripe Billing**; one-time top-ups do not. International cards, conversion, Tax, disputes, refunds, negotiated contracts, and other products can change fees. [Stripe Payments pricing](https://stripe.com/pricing), [Stripe Billing pricing](https://stripe.com/billing/pricing).

## 2. Model routing

The recommended setup is a candidate configuration to validate with real Palmer House briefs. A model's published capability description does not prove it writes good Palmer House campaigns.

| Work                                                               | Start with                  | Reason and fallback policy                                                                                                                                     |
| ------------------------------------------------------------------ | --------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Conversation, simple revision, directions, compact source analysis | GPT-6 Luna                  | Low unit cost makes one-credit replies practical. Test all Pal voices and grounding. A costlier fallback requires a separate priced route.                     |
| Full campaigns                                                     | Gemini 3.8 Flash            | Keep the existing campaign route and allow enough output for real scripts/articles. Compare GPT-6 Sol and Claude Sonnet 5 on the same briefs before switching. |
| Written PDFs                                                       | GPT-6 Luna + local renderer | The simulation uses bounded everyday writing. Deeper document work should become a separately priced route if evaluation shows it needs a larger model.        |
| Standard contextual images and portraits                           | Gemini 3.1 Flash Image      | Keep the existing image adapter; constrain size and prompt length.                                                                                             |
| Final hero images, precise brand mockups, difficult edits          | Evaluate GPT Image 2 / 2.5  | Separate premium option after actual output-token and quality measurements; do not silently charge standard-image credits for an unrestricted premium request. |
| PDF export/layout                                                  | Local renderer              | A document is text plus a layout engine; a larger model is not required merely to create a valid PDF.                                                          |

Lovable lists these model families as supported and describes gateway usage as based on underlying provider costs. Its temporary grants are **excluded** from the forecast. The exact project gateway IDs for newly selected routes must be smoke-tested: `openai/gpt-6-luna` follows the existing provider-prefix convention but was not confirmed by a live request or an official route-ID example. The existing repository uses `google/gemini-3.8-flash` and `google/gemini-3.1-flash-image`; their existing code presence also does not establish live availability. [Lovable AI documentation](https://docs.lovable.dev/features/ai).

### Price evidence

Standard uncached text rates per million input/output tokens:

| Model                                        | Input | Output |
| -------------------------------------------- | ----: | -----: |
| GPT-6 Luna                                   | $0.10 |  $0.50 |
| GPT-6 Sol                                    | $2.00 | $10.00 |
| Gemini 3.8 Flash, through Dec 31, 2026       | $0.75 |  $3.75 |
| Gemini 3.8 Flash, announced Jan 1, 2027 rate | $1.50 |  $7.50 |
| Gemini 3.1 Flash-Lite                        | $0.25 |  $1.50 |
| Claude Sonnet 5                              | $2.00 | $10.00 |
| Claude Haiku 4.5                             | $1.00 |  $5.00 |

Sources: [OpenAI API pricing](https://developers.openai.com/api/docs/pricing), [Google Gemini pricing](https://ai.google.dev/gemini-api/docs/pricing), [Anthropic pricing](https://platform.claude.com/docs/en/about-claude/pricing). Reasoning tokens count as output. The simulation assumes no cached-input, batch, free-tier, or volume discount.

Gemini 3.1 Flash Image output costs are approximately **$0.067 at 1K, $0.101 at 2K, $0.151 at 4K**, plus text/image input and text/thinking output. The model's text input/output rates are $0.50/$3 per million. [Google image pricing](https://ai.google.dev/gemini-api/docs/pricing#gemini-3.1-flash-image).

OpenAI's published GPT Image 2 rates are $2.50 per million text input tokens and $4/$15 per million image input/output tokens. GPT Image 2.5 Flare and Sunburst list $5 text input and $8/$30 image input/output. Resolution and quality determine output usage; this document deliberately does not invent a universal per-image price. [OpenAI image pricing](https://developers.openai.com/api/docs/pricing#image-generation-models).

## 3. Usage simulations

Baseline uses Luna for everyday text, Flash for campaigns at its announced **post-promotion** price, 2K images, 1K portraits, and a **25% contingency** over calculated provider cost. That contingency is a planning allowance for billed failures, occasional retries, and uncertainty, not a claim about Lovable's markup. Automatic retries must still be bounded; it is not permission to retry indefinitely.

| Monthly behavior                   |     Light |  Moderate |      Heavy |
| ---------------------------------- | --------: | --------: | ---------: |
| Pal replies                        |        40 |       180 |        800 |
| Direction sets / analyses          |     2 / 1 |     8 / 4 |     24 / 8 |
| Full campaigns                     |         1 |         4 |         12 |
| Images                             |         4 |        20 |         80 |
| Written PDFs / portraits           |     1 / 0 |     4 / 1 |     12 / 2 |
| Requested / background discussions |     0 / 6 |    2 / 12 |     6 / 24 |
| **Member credits used**            |   **281** | **1,294** |  **4,702** |
| **AI cost including contingency**  | **$0.89** | **$4.19** | **$15.69** |

Assumed reply: 12,000 input + 1,500 output tokens. A full campaign uses two calls totaling 32,000 input + 18,000 output tokens. Image cost includes 3,000 prompt tokens and 1,000 text/thinking tokens. All task token assumptions are editable in the script; these quantities were not measured against production traffic.

### Studio at $99/month

| Scenario | Required top-up purchases | Cash collected that month | AI + contingency | Contribution after AI, Stripe and unused prepaid-credit AI reserve | After illustrative $5 infrastructure allocation |
| -------- | ------------------------: | ------------------------: | ---------------: | -----------------------------------------------------------------: | ----------------------------------------------: |
| Light    |                        $0 |                       $99 |            $0.89 |                                                              95.2% |                                           90.1% |
| Moderate |                       $20 |                      $119 |            $4.19 |                                                              91.6% |                                           87.4% |
| Heavy    |                      $140 |                      $239 |           $15.69 |                                                              89.0% |                                           86.9% |

Pack purchases are discrete: heavy usage needs two 1,500-credit bundles and two 500-credit boosts. Remaining purchased credits carry a future AI-cost reserve; the table does not assume every dollar of an unused top-up is free margin. This is a cash contribution planning view, not subscription revenue recognition accounting.

Doubling all modeled AI costs drops the heavy Studio result to **82.4% before the $5 allocation, 80.3% after it**. Image and portrait tasks then exceed the desired per-credit envelope: update pricing or routing before a provider-cost increase reaches customers. Keeping full-context Flash for every chat at the same one-credit price also breaks the unit envelope; the heavy result falls to **76.0% / 73.9%**. The low-cost chat route is material, not cosmetic.

### Human service changes the answer

Use **$100/hour delivery labor plus 25% preparation**, even when the founder provides it. Treating founder time as free hides the economic cost. Partner's promise of a weekly session means **52/12 hours per month**, not four; its monthly labor allowance is **$541.67**. Guided is **$125**.

| Scenario | Guided, after illustrative labor + infrastructure | Partner, after illustrative labor + infrastructure |
| -------- | ------------------------------------------------: | -------------------------------------------------: |
| Light    |                                             70.1% |                                              50.7% |
| Moderate |                                             69.4% |                                              50.4% |
| Heavy    |                                             71.3% |                                              49.5% |

The annual discount reduces revenue further while service work continues every month. See the annual rows in the CSV. **Do not promise 80% margins for the service tiers at these labor assumptions.** To aim at 80%, either price strategy time separately, reduce the service commitment for new contracts, or raise those tiers after validating demand. Keep existing customer promises intact.

These percentages still exclude acquisition, general support, owner compensation beyond the modeled strategy labor, insurance, taxes, disputes, and other overhead. They are contribution estimates, not net margins.

## 4. Boundaries that keep the forecast useful

- Reserve credits atomically **before** paid work. Never let two browser tabs both spend the same balance.
- Disable invisible SDK retries. A failed customer result can still cost the business money; release the member's credits as policy allows, but retain incurred provider usage and enforce an operator spend ceiling.
- Keep model IDs and rate cards server-side. Reject unpriced substitutions; changing a model must also update its cost limits and evaluation results.
- Enforce context/output limits, model-specific reasoning limits, image count, resolution, and no unrequested search. Trim a relevant context digest, not the durable shared memory itself.
- Budget the campaign's two calls together. Allow complete long-form output; do not save money by silently clipping scripts into unusable fragments.
- Record request ID, workspace, operation, model, input/output tokens, image size/count, result status, duration, provider-reported cost when available, and estimated cost otherwise. Label estimates; do not report them as settled invoice costs.
- Set owner alerts at 50/75/90% of the configured monthly AI budget. Alert on high failure rate, image retries, unusual per-member volume, and a 20% difference between estimate and provider bills. Reconcile the dashboard with Lovable regularly.
- A full month of zero-credit background feed work has a separate hard allowance. Viewing a page is never a payment authorization.
- Show renewal date, included/purchased balances, pending reservations, fixed action cost, top-up amount, and failed-payment recovery. Keep the user's unsent draft when they run out.
- No video generation is included. Adding it requires a separate priced and bounded operation.

## 5. How to reproduce and adjust

From the repository root, with Node 22.18 or newer:

```sh
node scripts/studio-economics.mjs --write
node scripts/studio-economics.mjs --stress --write
node scripts/studio-economics.mjs --flash-chat --write
node scripts/studio-economics.mjs --current-prices
node --test scripts/studio-economics.test.mjs
```

`scripts/studio-economics.mjs` imports the actual membership and credit catalogs. It writes all three tiers, all three workloads, and monthly/annual variants to `docs/studio-rebuild/economics/`. Baseline JSON includes unit costs, source URLs, assumptions, and tasks that exceed their planning envelope. CSV files open in a spreadsheet. Change token workloads, labor rate, or infrastructure allocation to match observed usage; refresh rates whenever a provider changes pricing.

Before turning on paid generation, run a small live evaluation: eight Pal voices, five real business categories, ten campaigns, twenty contextual images, and document exports. Measure groundedness, completeness, personality, format validity, retries, token usage, visual relevance, and cost per accepted result. A cheap generation that requires three repairs may be more expensive than the stronger model. Keep memory and artifacts in Studio so model changes never erase them.
