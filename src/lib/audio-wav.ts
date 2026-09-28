/**
 * Browser microphone capture encoded to a complete 16 kHz mono WAV file.
 *
 * We avoid MediaRecorder on purpose: its timesliced chunks are headerless after
 * the first one, and iOS Safari produces fragmented MP4 that transcription
 * models reject. A plain WAV works everywhere.
 */

import {
  STUDIO_VOICE_SAMPLE_RATE,
  STUDIO_VOICE_MAX_SECONDS,
  STUDIO_VOICE_SOURCE_MAX_BYTES,
  inspectStudioVoiceWav,
} from "./studio-transcription";
const TARGET_RATE = STUDIO_VOICE_SAMPLE_RATE;

export type Recorder = {
  stop: () => Promise<Blob>;
  cancel: () => void;
  /** 0-1 input level, for the live meter. */
  level: () => number;
  duration: () => number;
};

function downsample(input: Float32Array, from: number, to: number) {
  if (to === from) return input;
  if (to > from) {
    const output = new Float32Array(Math.floor((input.length * to) / from));
    for (let i = 0; i < output.length; i++)
      output[i] = input[Math.min(input.length - 1, Math.floor((i * from) / to))];
    return output;
  }
  const ratio = from / to;
  const length = Math.floor(input.length / ratio);
  const output = new Float32Array(length);
  for (let index = 0; index < length; index += 1) {
    const start = Math.floor(index * ratio);
    const end = Math.min(Math.floor((index + 1) * ratio), input.length);
    let sum = 0;
    for (let cursor = start; cursor < end; cursor += 1) sum += input[cursor];
    output[index] = sum / Math.max(1, end - start);
  }
  return output;
}

function encodeWav(chunks: Float32Array[], sampleRate: number) {
  const total = chunks.reduce((sum, chunk) => sum + chunk.length, 0);
  const merged = new Float32Array(total);
  let offset = 0;
  for (const chunk of chunks) {
    merged.set(chunk, offset);
    offset += chunk.length;
  }
  const samples = downsample(merged, sampleRate, TARGET_RATE);

  const buffer = new ArrayBuffer(44 + samples.length * 2);
  const view = new DataView(buffer);
  const writeString = (position: number, value: string) => {
    for (let index = 0; index < value.length; index += 1)
      view.setUint8(position + index, value.charCodeAt(index));
  };

  writeString(0, "RIFF");
  view.setUint32(4, 36 + samples.length * 2, true);
  writeString(8, "WAVE");
  writeString(12, "fmt ");
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, 1, true);
  view.setUint32(24, TARGET_RATE, true);
  view.setUint32(28, TARGET_RATE * 2, true);
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true);
  writeString(36, "data");
  view.setUint32(40, samples.length * 2, true);

  let position = 44;
  for (const sample of samples) {
    const clamped = Math.max(-1, Math.min(1, sample));
    view.setInt16(position, clamped < 0 ? clamped * 0x8000 : clamped * 0x7fff, true);
    position += 2;
  }

  return new Blob([buffer], { type: "audio/wav" });
}

/** Convert supported audio locally; the server independently inspects the resulting PCM. */
export async function prepareStudioVoiceFile(file: File) {
  if (file.size > STUDIO_VOICE_SOURCE_MAX_BYTES)
    throw new Error("Audio uploads must be under 25 MB and five minutes.");
  const context = new AudioContext();
  try {
    let audio: AudioBuffer;
    try {
      audio = await context.decodeAudioData(await file.arrayBuffer());
    } catch {
      throw new Error(
        "Your browser could not read this audio. Try a WAV or MP3 file, or record a voice note.",
      );
    }
    if (
      !Number.isFinite(audio.duration) ||
      audio.duration < 1 ||
      audio.duration > STUDIO_VOICE_MAX_SECONDS
    )
      throw new Error("Choose audio between one second and five minutes.");
    const mono = new Float32Array(audio.length);
    for (let channel = 0; channel < audio.numberOfChannels; channel++) {
      const samples = audio.getChannelData(channel);
      for (let i = 0; i < mono.length; i++) mono[i] += samples[i] / audio.numberOfChannels;
    }
    const blob = encodeWav([mono], audio.sampleRate);
    const quote = inspectStudioVoiceWav(new Uint8Array(await blob.arrayBuffer()));
    return {
      file: new File([blob], file.name.replace(/\.[^.]*$/, "") + ".wav", { type: "audio/wav" }),
      durationSeconds: quote.seconds,
    };
  } finally {
    await context.close();
  }
}

export async function startRecording(options?: { onLimit?: () => void }): Promise<Recorder> {
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: { echoCancellation: true, noiseSuppression: true },
  });
  let context: AudioContext;
  try {
    context = new AudioContext();
  } catch (error) {
    stream.getTracks().forEach((track) => track.stop());
    throw error;
  }
  const source = context.createMediaStreamSource(stream);
  const analyser = context.createAnalyser();
  analyser.fftSize = 512;
  const processor = context.createScriptProcessor(4096, 1, 1);
  const chunks: Float32Array[] = [];
  const meter = new Uint8Array(analyser.frequencyBinCount);
  const maxFrames = Math.floor(STUDIO_VOICE_MAX_SECONDS * context.sampleRate);
  let frames = 0,
    stopped = false;
  let result: Promise<Blob> | undefined;
  const teardown = () => {
    if (stopped) return;
    stopped = true;
    processor.onaudioprocess = null;
    processor.disconnect();
    analyser.disconnect();
    source.disconnect();
    stream.getTracks().forEach((track) => track.stop());
  };
  processor.onaudioprocess = (event) => {
    if (stopped) return;
    const chunk = event.inputBuffer.getChannelData(0).slice(0, maxFrames - frames);
    chunks.push(chunk);
    frames += chunk.length;
    if (frames >= maxFrames) {
      teardown();
      options?.onLimit?.();
    }
  };
  source.connect(analyser);
  source.connect(processor);
  processor.connect(context.destination);
  return {
    duration: () => frames / context.sampleRate,
    level: () => {
      if (stopped) return 0;
      analyser.getByteTimeDomainData(meter);
      let peak = 0;
      for (const value of meter) peak = Math.max(peak, Math.abs(value - 128) / 128);
      return peak;
    },
    cancel: () => {
      teardown();
      chunks.length = 0;
      if (context.state !== "closed") void context.close();
    },
    stop: () =>
      (result ??= (async () => {
        const rate = context.sampleRate;
        teardown();
        if (context.state !== "closed") await context.close();
        return encodeWav(chunks, rate);
      })()),
  };
}
