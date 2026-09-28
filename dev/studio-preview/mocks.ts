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
