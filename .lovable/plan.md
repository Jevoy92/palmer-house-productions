# Install the OpenAI Ads tracking pixel

## What changes
- The OpenAI Ads Manager tracking script (Pixel ID Nw2z7d44jrvrEMCiiYbJG5) goes into the site's page header, once, so it loads on every public page and in Studio.
- Debug mode stays on as you pasted it, so Ads Manager can confirm the setup. Once the event stream shows visits arriving, I'll switch debug off.
- I'll leave the Expo demo pages alone for now. Conversion events, such as a membership purchase, can be added after you create them in Ads Manager (step 2 in Ads Manager).

## Check after it's done
- Open the live site and confirm the script loads once per page with no errors.
- In Ads Manager, "View event stream" should show a page visit after you publish.

## Technical details
- Add the loader as an inline `scripts` entry in the root route `head()` (src/routes/__root.tsx), placed early, with a guard against loading twice (the snippet's own `w.oaiq` check).
- No changes to the backend or anything sensitive. The pixel ID is public.
