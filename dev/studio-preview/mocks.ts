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
// Synthetic recording only: no microphone, AI service, or credit transaction.
function previewVoiceFile() {
  const buffer = new ArrayBuffer(44 + 32000 * 3),
    v = new DataView(buffer);
  const tag = (at: number, text: string) => {
    for (let i = 0; i < text.length; i++) v.setUint8(at + i, text.charCodeAt(i));
  };
  tag(0, "RIFF");
  v.setUint32(4, buffer.byteLength - 8, true);
  tag(8, "WAVE");
  tag(12, "fmt ");
  v.setUint32(16, 16, true);
  v.setUint16(20, 1, true);
  v.setUint16(22, 1, true);
  v.setUint32(24, 16000, true);
  v.setUint32(28, 32000, true);
  v.setUint16(32, 2, true);
  v.setUint16(34, 16, true);
  tag(36, "data");
  v.setUint32(40, buffer.byteLength - 44, true);
  return new File([buffer], "voice-note.wav", { type: "audio/wav" });
}
export const startRecording = async () => ({
  level: () => 0.35,
  duration: () => 3,
  cancel() {},
  stop: async () => previewVoiceFile(),
});
export const prepareStudioVoiceFile = async () => ({
  file: previewVoiceFile(),
  durationSeconds: 3,
});
export const getStudioTranscriptionStatus = async () =>
  new URLSearchParams(location.search).get("voice") === "ready"
    ? { enabled: true, reason: "" }
    : {
        enabled: false,
        reason:
          "Voice transcription is not connected yet. Paste text or attach a document for now.",
      };

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
