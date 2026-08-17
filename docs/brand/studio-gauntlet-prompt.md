# Palmer House Studio — Gauntlet Loop Prompt

Technique credit: gauntlet loop by Matt Shumer; skill packaging by RoboNuggets.
Paste the prompt below into a **fresh** agent session (not the one that wrote it).

## Step 1 — pick your bar (choose ONE, replace `<BAR>`)

| Bar | Fetch it | Why it fits |
| --- | --- | --- |
| **A. Linear** — app.linear.app marketing + product shots | Screenshot linear.app/homepage, /method, and Mobbin's Linear web flows | Executive restraint, type hierarchy, zero decoration, dense but calm |
| **B. Attio** — attio.com product surfaces | Screenshot attio.com + Mobbin "Attio" web set | Premium SaaS workspace with warm neutrals and real data density |
| **C. Arc / Notion Calendar** — onboarding + empty states | Mobbin mobile/web flow sets | Best-in-class first-run and empty-state craft, which is our weakest surface |

Recommended for the Studio: **A for the dashboard/results shell, C for onboarding and empty states.**

## Step 2 — the prompt

```text
Build the Palmer House Studio customer experience to the level of <BAR>.

Bar: <BAR>. Fetch it before you judge anything — screenshot it at 1440px and 390px
via Mobbin MCP flow sets and direct page capture. If you cannot fetch it, stop and say so.

Scope, one piece at a time, in this order:
1) Auth + first-run onboarding  2) Studio dashboard shell and nav
3) Content Engine generation + progress  4) Campaign results pages
5) Brand DNA builder  6) Settings, profile, notifications  7) Empty, loading, error states

Constraints you may not break: light theme only, no gradients, no rounded-full pills
(uppercase labels with · separators), Pal color tokens only (system/spotlight/evergreen/reel)
via semantic tokens, rounded studio-card surfaces, Palmer House "we/our team" voice.

For each piece run two separate agents:
- BUILDER: implement it in the real codebase, then screenshot the running localhost route.
- CRITIC: fresh context, no knowledge of the builder's effort. Open both screenshots with
  labels stripped. Answer one question: which is the more premium, executive product?
  Then name the three specific things that lost it — spacing, type scale, hierarchy,
  motion, copy, or state coverage. No scores.

Loop each piece until the critic picks ours blind. Do not stop at a round count.
Do not move to the next piece until the current one wins.
```

## Step 3 — what breaks it

- A vague bar ("make it premium") — the critic invents a comparison and approves everything.
- The builder grading itself.
- Score-out-of-10 critics — they drift upward. Force a binary pick.
