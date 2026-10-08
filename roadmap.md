# Roadmap

## In progress
- [x] OpenAI Ads pixel on every page (debug on; switch off once Ads Manager sees visits)
- [ ] Social posting via bundle.social: 20 free posts/month for every member, $19/month add-on raises it to 100. Waiting on: bundle.social API key.

## Parked (waiting on Jevoy)
- [ ] Google Drive / Docs import for Studio members — on hold. Needs a Palmer House
      Google Cloud OAuth client first (Drive API + Docs API enabled, redirect URI
      https://connector-gateway.lovable.dev/api/v1/app-users/oauth2/callback), and
      because Studio is for outside customers, Google will require a verification
      review for Drive access.
- [ ] Google Business Profile, YouTube, Search Console — same verification requirement.

## Done recently
- Voice notes, documents, images, audio/video intake in conversations
- Moved Studio off the retired AI model
- [x] Social posting (bundle.social): connect IG/FB, post/schedule/cancel, 20 free/mo, $19/mo add-on → 100. Staff-only until STUDIO_SOCIAL_POSTING_ENABLED=true.
- [ ] Social posting: staff test with a real IG/FB account + Stripe test-mode add-on purchase (needs Jevoy's accounts)
- [ ] Ads pixel: confirm events in Ads Manager, then turn debug off
- [ ] Monthly Palmer House newsletter (listed as membership benefit; not built)
- [x] Membership filming benefits at checkout (needs Stripe test-mode run per tier)
