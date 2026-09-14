# Studio workspace references

Inspected on September 14, 2026. Read `docs/brand/studio-gauntlet-prompt.md` first. These notes describe images actually returned and visually inspected through Mobbin, not inferred search metadata. Three searches returned five images; the four strongest references are below.

Mobbin identifies each as a web screen but does not supply its capture date or original viewport dimensions. The delivered previews are about 768 pixels wide and include Mobbin's footer. They do not verify a 1440px or 390px reference capture. The calendar connection result belongs to **Notion**, not the standalone Notion Calendar app.

## 1. Linear: backlog list

[Open the inspected screen](https://mobbin.com/screens/fd1b4d88-f021-49a3-98af-4cd3a87e1d29)

Observed: a narrow light-gray navigation rail; one workspace header; a compact All issues / Active / Backlog view selector; and four horizontal issue rows under a single Backlog heading. Status, ID, title, assignee, and date remain aligned. The largely empty canvas remains open rather than being filled with decorative panels. Selected navigation has a quiet gray background.

Apply to Studio: use a steady, compact rail; give recent conversations and saved work readable rows; align secondary information; keep a single local heading and control strip. Do not turn every conversation or result into a tall card. Use Pal color to identify the selected guide or meaningful state rather than paint every border.

## 2. Linear: project board

[Open the inspected screen](https://mobbin.com/screens/fc208a44-dbf9-4f79-b9b0-db57f9840964)

Observed: the same navigation shell persists. The header contains a project breadcrumb and Overview / Updates / Issues tabs. Work is grouped under Todo, In Progress, and Done headings with counts; lightly bounded cards put the issue title before supporting metadata. Unused groups appear in a separate Hidden columns area. A compact issue preview appears close to the hovered item.

Apply to Studio: preserve the shell as users move from conversation to campaign results. Keep result tabs close to the work. Group assets by a useful content type or status, with compact counts, and reserve an adjacent panel for the selected item's actual content. Avoid unrelated dashboard statistics above the deliverables. Use secondary detail on demand.

## 3. Attio: empty Notes within a record

[Open the inspected screen](https://mobbin.com/screens/f6750bef-6bce-435c-8460-3c55f32f1254)

Observed: the surrounding company record, left navigation, local tabs, and right-hand record details remain visible. Only the empty Notes region presents a centered “No notes” message, one short instruction, and a blue Create note action. A faint small line illustration appears above the message. The same create action is also available in the local toolbar.

Apply to Studio: keep the selected Pal, workspace, and any useful saved context visible when a conversation or work category is empty. Put one explicit next action in the empty region, supported by a short example. The explanatory message and action do the useful work; Studio does not need the illustration or an oversized empty-state card. Do not show misleading empty counts or invented examples as saved work.

## 4. Notion: calendar connection during setup

[Open the inspected screen](https://mobbin.com/screens/ffe6cfb5-227d-4cfd-9d20-9d8da267b935)

Observed: a small centered modal dims an otherwise visible welcome workspace. The modal identifies the task, explains the benefit in a short paragraph, and offers two clearly labeled provider actions. The underlying welcome page retains a short setup checklist.

Apply to Studio: ask for one setup decision at a time and explain why it improves the user's work. Use small focused fields or panels for choosing a Pal and adding business context. Keep progress legible and allow returning users to resume their workspace. Avoid a large questionnaire or a persistent character-selection gallery that competes with the main task.

## Implementation boundaries

- Keep the Studio's light theme, Satoshi, semantic Pal colors, and existing rounded studio-card surfaces.
- Transfer hierarchy and behavior, not the tiny typography of compressed preview images or another product's brand color.
- Reference screenshots show static layouts; these images do not establish animation timing, easing, or interaction behavior beyond what is visible.
- No mobile reference was returned, so responsive behavior still needs direct 390px Studio validation.
- No ranking or numeric quality score was assigned.
