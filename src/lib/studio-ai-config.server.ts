/** Runtime configuration only. Workspace knowledge never lives in a provider session. */
export function studioAIConfig(env: Record<string, string | undefined> = process.env) {
  return {
    baseURL: env.AI_GATEWAY_URL || "https://ai.gateway.lovable.dev/v1",
    chatModel: env.STUDIO_CHAT_MODEL || env.STUDIO_AI_MODEL || "openai/gpt-6-luna",
    buildModel: env.STUDIO_BUILD_MODEL || env.STUDIO_AI_MODEL || "google/gemini-3.8-flash",
    imageModel: env.STUDIO_IMAGE_MODEL || "google/gemini-3.1-flash-image",
  };
}
