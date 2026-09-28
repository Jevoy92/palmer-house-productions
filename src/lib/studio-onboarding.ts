/** Setup progress comes from saved workspace records, never from clicking a checklist. */
export type StudioSetupFacts = {
  brand?: { description?: string | null; primary_audience?: string | null } | null;
  references: number;
  assets: number;
  campaigns: number;
  calendar: number;
};
export function studioSetupSteps(facts: StudioSetupFacts) {
  return [
    {
      key: "brand",
      title: "Give your Pals the big picture",
      detail: "Add what your business does and who you want to reach in Brand DNA.",
      to: "/studio/brand",
      graphic: "brand",
      done: Boolean(facts.brand?.description?.trim() && facts.brand?.primary_audience?.trim()),
    },
    {
      key: "references",
      title: "Show them your style",
      detail:
        "Add a photo, logo, or visual reference. It gives your work a recognizable direction.",
      to: "/studio/brand",
      graphic: "image",
      done: facts.references > 0,
    },
    {
      key: "create",
      title: "Make something worth sharing",
      detail: "Ask a Pal for a post, image, or PDF—or build a whole campaign.",
      to: "/studio/conversations",
      graphic: "chat",
      done: facts.assets > 0 || facts.campaigns > 0,
    },
    {
      key: "calendar",
      title: "Give your next post a date",
      detail: "Choose a draft and plan when to share it. You stay in charge of publishing.",
      to: "/studio/calendar",
      graphic: "calendar",
      done: facts.calendar > 0,
    },
  ] as const;
}
export function hasEstablishedStudio(facts: StudioSetupFacts) {
  return facts.assets > 0 || facts.campaigns > 0 || facts.calendar > 0;
}
export const STUDIO_GUIDE_VERSION = 2;
export type StudioGuidePreference = {
  version: number;
  dismissedWelcome: boolean;
  viewedTour: boolean;
};
export function studioGuideStorageKey(workspaceId: string, userId: string) {
  return `phs.studio-guide.v${STUDIO_GUIDE_VERSION}.${workspaceId}.${userId}`;
}
export function parseStudioGuidePreference(raw: string | null): StudioGuidePreference {
  try {
    const value = JSON.parse(raw || "null");
    if (value?.version === STUDIO_GUIDE_VERSION)
      return {
        version: STUDIO_GUIDE_VERSION,
        dismissedWelcome: value.dismissedWelcome === true,
        viewedTour: value.viewedTour === true,
      };
  } catch {
    /* Invalid or old preferences should not break the workspace. */
  }
  return { version: STUDIO_GUIDE_VERSION, dismissedWelcome: false, viewedTour: false };
}

export function openStudioGuide() {
  window.dispatchEvent(new Event("studio:open-guide"));
}
