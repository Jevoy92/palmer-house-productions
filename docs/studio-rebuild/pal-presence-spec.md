# Pal presence: accepted implementation plan

## Gaps in the current Studio

- Eight distinct model voices already exist, but the welcome repeats a short slogan and appears only in an empty conversation.
- Changing Pals in an existing thread gives a toast, with no new conversational introduction.
- Every working portrait uses the same generic headshot movement.
- Custom portraits are hidden in a disclosure and generated as ordinary Library artifacts.

## Existing artwork inspected

The `pal-scenes` collection contains real, matching Pal illustrations: Kiana waving with a headset (`contact`); Clara writing (`blog`); Silas reviewing (`assessment`); Kareem working at a desk (`postProduction`); Ryder holding a rocket (`startups`); Raquel with a checklist (`checkoutReview`); Cyrus with a calendar (`contentStrategy`); Samira at a help desk (`faqHelp`). These are illustrated poses, not animated footage. Use them as portrait scenes with restrained activity treatment; do not imply the product generates video.

## Intended behavior

1. Opening a chat or explicitly choosing a different Pal immediately presents an authored welcome. The opening is composed locally from known workspace facts, with a distinct voice for each Pal, and does not claim research or model work occurred.
2. New chats give the Pal and opening message visual priority. Existing chats use a compact, dismissible welcome so saved messages and their original authors remain intact. Background data refreshes do not reissue introductions.
3. Follow-up suggestions use actual context: the open thread, a current campaign, upcoming calendar work, saved ideas, or Brand DNA. All Pals offer the same writing, image, PDF, and campaign abilities. Personality changes wording and approach, not available tools.
4. Real message/campaign/image/PDF requests show a matching Pal scene, truthful operation label, and subtle profile movement. There are no timed research phases, fake progress, idle typing loops, or autoplay.
5. Custom Pal creation prominently offers an appearance prompt, actual portrait generation/upload and preview, plus name/personality. Dedicated private avatar generation keeps portraits out of the content Library. Errors preserve all input and allow retry.
6. Preserve route ownership, previous-message authorship, draft recovery, focus restoration, and reduced-motion preferences at desktop and mobile sizes.

## Verification

Check all eight voices and both empty/returning contexts; switch Pals without losing conversation identity or drafts; verify custom portrait success/failure paths; observe real pending and reduced-motion states; retain the existing conversation lifecycle suite and focused UI regression checks.
