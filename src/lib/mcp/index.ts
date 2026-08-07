import { auth, defineMcp } from "@lovable.dev/mcp-js";
import listWorkspaces from "./tools/list-workspaces";
import getBrandProfile from "./tools/get-brand-profile";
import listCampaigns from "./tools/list-campaigns";
import getCampaign from "./tools/get-campaign";
import listContentIdeas from "./tools/list-content-ideas";
import createContentIdea from "./tools/create-content-idea";
import listCalendarItems from "./tools/list-calendar-items";

// Must be the direct Supabase host; the published SUPABASE_URL is a proxy form
// that fails RFC 8414 issuer matching. Vite inlines this literal at build time.
const projectRef = import.meta.env['VITE_SUPABASE_PROJECT_ID'] ?? "project-ref-unset";

export default defineMcp({
  name: "palmer-house-productions",
  title: "palmer-house-productions",
  version: "0.1.0",
  instructions:
    "Tools for Palmer House Studio. Start with `list_workspaces` to get a workspace id, then read the brand profile, campaigns and content calendar, or capture new content ideas. Lanes are spotlight (trust/proof), reel (attention), evergreen (education) and system (repeatability).",
  auth: auth.oauth.issuer({
    issuer: `https://${projectRef}.supabase.co/auth/v1`,
    acceptedAudiences: "authenticated",
  }),
  tools: [
    listWorkspaces,
    getBrandProfile,
    listCampaigns,
    getCampaign,
    listContentIdeas,
    createContentIdea,
    listCalendarItems,
  ],
});
