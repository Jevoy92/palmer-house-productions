/** Used only by the separate preview Vite config. Never imported by the app. */
const unavailable = async () => {
  throw new Error(
    "This is a synthetic local preview. No account, API, upload, or payment request was sent.",
  );
};

export const analyzeStudioContentSource = unavailable;
export const analyzeStudioWebsite = unavailable;
export const askStudioPal = unavailable;
export const generateContentDirections = unavailable;
export const generateStudioCampaign = unavailable;
export const createStudioBillingPortal = unavailable;
export const createStudioSubscriptionCheckout = unavailable;
export const SUPABASE_URL = "http://127.0.0.1/synthetic-preview";
export const SUPABASE_PUBLISHABLE_KEY = "synthetic-preview-no-access";
export const supabase = {
  auth: {
    getSession: async () => ({ data: { session: null }, error: null }),
    getUser: async () => ({ data: { user: null }, error: null }),
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe() {} } } }),
    signOut: unavailable,
    setSession: unavailable,
    signInWithPassword: unavailable,
    signInWithOtp: unavailable,
    signUp: unavailable,
    resetPasswordForEmail: unavailable,
  },
  from() {
    throw new Error("Database access is disabled in the synthetic preview.");
  },
  rpc: unavailable,
  storage: { from: () => ({ upload: unavailable, createSignedUrl: unavailable }) },
};
export const createUserScopedSupabase = () => supabase;
export const lovable = { auth: { signInWithOAuth: unavailable } };
export const startRecording = async () => ({
  level: () => 0.35,
  cancel() {},
  stop: async () => new Blob([new Uint8Array(5000)], { type: "audio/wav" }),
});

export const loadStudioRecovery = unavailable;
export const saveStudioPalProfile = unavailable;
export const selectStudioPalProfile = unavailable;
export const uploadStudioPalAvatar = unavailable;
export const resolveStudioPalAvatar = unavailable;
export const generateStudioArtifact = unavailable;
export const getStudioArtifactUrl = unavailable;
export const createStudioFeedPost = unavailable;
export const commentOnStudioFeed = unavailable;
export const reactToStudioFeed = unavailable;
export const refreshStudioPalFeed = unavailable;
export const updateStudioArtifact = unavailable;
export const linkStudioCampaignToConversation = unavailable;
export const reviseStudioDocument = unavailable;

export const loadStudioMemory = unavailable;
export const saveStudioMemory = unavailable;
export const forgetStudioMemory = unavailable;
export const forgetStudioLegacyMemory = unavailable;
export const exportStudioMemory = unavailable;

export const generateStudioPalAvatar = unavailable;
export const getStudioAssetImageUrl = unavailable;

export async function getStudioCreditSummary() {
  const params = new URLSearchParams(window.location.search);
  if (params.get("credits") === "error")
    throw new Error("Preview: balance service unavailable. Your work is safe.");
  const available =
    params.get("credits") === "empty" ? 0 : params.get("credits") === "low" ? 20 : 720;
  return {
    enforcement: "ready" as const,
    available,
    includedRemaining: available,
    includedAllowance: 1000,
    topUpRemaining: 0,
    usedThisPeriod: 1000 - available,
    reserved: 0,
    renewsAt: "2026-10-01T00:00:00Z",
    status: "active" as const,
    recent: [
      {
        id: "credit-sample-1",
        operation: "campaign" as const,
        credits: 100,
        status: "completed" as const,
        createdAt: "2026-09-27T16:00:00Z",
      },
      {
        id: "credit-sample-2",
        operation: "image" as const,
        credits: 30,
        status: "released" as const,
        createdAt: "2026-09-27T17:00:00Z",
      },
    ],
    canManageBilling: params.get("billingRole") !== "member",
    topUpsEnabled: true,
  };
}
export async function createStudioCreditCheckout() {
  throw new Error("Preview only: secure checkout is connected in the app. No payment was taken.");
}
