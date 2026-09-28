/** Shared upload limits and customer-facing pricing. Duration is rechecked on the server. */
export const STUDIO_VOICE_MAX_SECONDS = 300;
export const STUDIO_VOICE_SAMPLE_RATE = 16000;
export const STUDIO_VOICE_MAX_BYTES = 44 + STUDIO_VOICE_MAX_SECONDS * STUDIO_VOICE_SAMPLE_RATE * 2;
export const STUDIO_VOICE_SOURCE_MAX_BYTES = 25 * 1024 * 1024;
export const STUDIO_VOICE_CREDITS_PER_MINUTE = 2;
export function studioVoiceQuote(seconds: number) {
  if (!Number.isFinite(seconds) || seconds <= 0 || seconds > STUDIO_VOICE_MAX_SECONDS) {
    throw new Error("Choose a recording between one second and five minutes.");
  }
  const minutes = Math.max(1, Math.ceil(seconds / 60));
  return {
    seconds,
    minutes,
    credits: minutes * STUDIO_VOICE_CREDITS_PER_MINUTE,
    costCeilingUsd: minutes * 0.01,
  };
}

/** Accept one canonical PCM stream. No trusted browser duration or file extension. */
export function inspectStudioVoiceWav(bytes: Uint8Array) {
  if (bytes.byteLength < 44 || bytes.byteLength > STUDIO_VOICE_MAX_BYTES)
    throw new Error("Voice recordings must be five minutes or less.");
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  const text = (at: number, count: number) =>
    String.fromCharCode(...bytes.subarray(at, at + count));
  if (
    text(0, 4) !== "RIFF" ||
    text(8, 4) !== "WAVE" ||
    text(12, 4) !== "fmt " ||
    text(36, 4) !== "data" ||
    view.getUint32(4, true) !== bytes.byteLength - 8 ||
    view.getUint32(16, true) !== 16 ||
    view.getUint16(20, true) !== 1 ||
    view.getUint16(22, true) !== 1 ||
    view.getUint32(24, true) !== STUDIO_VOICE_SAMPLE_RATE ||
    view.getUint32(28, true) !== STUDIO_VOICE_SAMPLE_RATE * 2 ||
    view.getUint16(32, true) !== 2 ||
    view.getUint16(34, true) !== 16 ||
    view.getUint32(40, true) !== bytes.byteLength - 44 ||
    (bytes.byteLength - 44) % 2
  ) {
    throw new Error(
      "This recording is not a complete 16 kHz mono WAV. Attach it through Studio to convert it, or record a new voice note.",
    );
  }
  const seconds = (bytes.byteLength - 44) / (STUDIO_VOICE_SAMPLE_RATE * 2);
  if (seconds < 1) throw new Error("Record at least one second before transcribing.");
  return studioVoiceQuote(seconds);
}
