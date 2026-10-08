# Post to Instagram and Facebook from Studio

## What members get
- **Settings → Connected accounts:** a "Connect Instagram & Facebook" button. The member signs in to their own Meta account through the posting service, and Studio shows which accounts are linked, with a Disconnect option.
- **Post from any finished piece:** campaign pieces, images and captions get a **Post now** or **Schedule** button. A confirmation screen shows the exact caption, the photo, and which accounts it will post to before anything goes out.
- **Calendar:** posts you schedule show up on the Studio Calendar with their status (Scheduled, Posted, or Failed with the reason). Members can cancel a post before it goes out.
- **Alerts:** the bell shows "Posted to Instagram" or "Post failed: here's why".
- **Limits:** no automatic posting without a member's confirmation, and no video posting until video ships. Posting costs no credits to start; we can revisit that later.
- The Expo demo stays as it is. Guests can't connect accounts.

## What you need to do (one-time)
1. Sign up for the posting service (Ayrshare's Business plan, which lets each member link their own accounts) and copy its API key. I'll open a secure form for it.
2. That's it. The service handles Meta's app review.

## Order of work
1. Store the service key and add a switch to turn posting on or off, so it stays off until it's tested.
2. Connected accounts in Settings, with each member's link saved privately to their workspace.
3. Post now / Schedule with the confirmation screen on campaign pieces and the Library.
4. Calendar status, status updates from the service, and alerts.
5. Test with your own Instagram/Facebook on a test post, then delete the post.

## Technical details
- New table `social_connections` (workspace_id, provider profile key, linked platforms, status), with RLS limited to workspace members. New table `social_posts` (asset id, platforms, caption, media path, scheduled_at, status, provider post id, error), with RLS the same way.
- Server functions use requireSupabaseAuth and call the service API with the secret, read inside the handler. Media goes out through short-lived signed URLs from the private bucket.
- A status webhook at /api/public/social/webhook checks the service's signature before it updates any posts.
- Feature flag `STUDIO_SOCIAL_POSTING_ENABLED`. Video assets are blocked on the server.
