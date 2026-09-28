import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { createRequire } from "node:module";
import ts from "typescript";
import { inspectStudioVoiceWav, studioVoiceQuote } from "../src/lib/studio-transcription.ts";
const require = createRequire(import.meta.url),
  root = path.resolve(import.meta.dirname, "..");
function loadModule(entry, { overrides = {}, env = {}, globals = {} } = {}) {
  const cache = new Map();
  function load(file) {
    file = path.resolve(root, file.endsWith(".ts") ? file : file + ".ts");
    if (cache.has(file)) return cache.get(file).exports;
    const module = { exports: {} };
    cache.set(file, module);
    vm.runInNewContext(
      ts.transpileModule(fs.readFileSync(file, "utf8"), {
        compilerOptions: {
          module: ts.ModuleKind.CommonJS,
          target: ts.ScriptTarget.ES2022,
          esModuleInterop: true,
        },
      }).outputText,
      {
        module,
        exports: module.exports,
        process: { env },
        console,
        crypto: globalThis.crypto,
        TextDecoder,
        TextEncoder,
        Uint8Array,
        ArrayBuffer,
        DataView,
        Blob,
        File,
        FormData,
        Response,
        Request,
        AbortSignal,
        Buffer,
        ...globals,
        require(name) {
          if (name in overrides) return overrides[name];
          if (name.startsWith("./")) return load(path.resolve(path.dirname(file), name));
          return require(name);
        },
      },
      { filename: file },
    );
    return module.exports;
  }
  return load(entry);
}
function wav(seconds = 3) {
  const bytes = new Uint8Array(44 + Math.floor(seconds * 32000));
  const v = new DataView(bytes.buffer);
  const tag = (i, s) => bytes.set(new TextEncoder().encode(s), i);
  tag(0, "RIFF");
  v.setUint32(4, bytes.length - 8, true);
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
  v.setUint32(40, bytes.length - 44, true);
  return bytes;
}
test("server derives started-minute credits from PCM frames, including boundaries", () => {
  for (const [seconds, credits] of [
    [1, 2],
    [60, 2],
    [60.01, 4],
    [120, 4],
    [300, 10],
  ]) {
    const q = inspectStudioVoiceWav(wav(seconds));
    assert.equal(q.credits, credits);
    assert.equal(q.seconds, seconds);
  }
});
test("duration pricing rejects invalid and out-of-bounds duration", () => {
  for (const seconds of [0, -1, Infinity, NaN, 301]) assert.throws(() => studioVoiceQuote(seconds));
  assert.throws(() => inspectStudioVoiceWav(wav(0.5)), /at least/);
  assert.throws(() => inspectStudioVoiceWav(wav(301)), /five minutes/);
});
test("forged length/rate/channels or trailing hidden media cannot bypass duration pricing", () => {
  for (const [at, value] of [
    [4, 100],
    [22, 2],
    [24, 8000],
    [28, 16000],
    [34, 24],
    [40, 32000],
  ]) {
    const b = wav();
    new DataView(b.buffer).setUint32(at, value, true);
    assert.throws(() => inspectStudioVoiceWav(b));
  }
  const b = new Uint8Array(wav().length + 20);
  b.set(wav());
  assert.throws(() => inspectStudioVoiceWav(b));
  assert.throws(() => inspectStudioVoiceWav(new Uint8Array(5000)));
});
const env = {
  STUDIO_TRANSCRIPTION_ENABLED: "true",
  STUDIO_TRANSCRIPTION_API_KEY: "fake-test-key",
  SUPABASE_SECRET_KEY: "fake",
};
function provider(options = {}) {
  const calls = [],
    reserved = [];
  const api = loadModule("src/lib/studio-transcription.server", {
    env: options.env ?? env,
    overrides: {
      "./studio-credit-runtime.server": {
        beginStudioTranscriptionCall: (...args) => reserved.push(args),
      },
    },
    globals: {
      fetch: async (url, init) => {
        calls.push({ url, init });
        return options.response ?? Response.json({ text: "A useful plan for our next campaign." });
      },
    },
  });
  return { ...api, calls, reserved };
}
test("transcription has a fixed endpoint, no redirects, one request, bounded timeout and canonical model", async () => {
  const api = provider();
  const result = await api.transcribeStudioVoice(wav(61));
  assert.equal(result.credits, 4);
  assert.equal(api.calls.length, 1);
  assert.equal(api.calls[0].url, "https://api.openai.com/v1/audio/transcriptions");
  assert.equal(api.calls[0].init.redirect, "error");
  assert.ok(api.calls[0].init.signal instanceof AbortSignal);
  assert.equal(api.calls[0].init.body.get("model"), "gpt-transcribe");
  assert.deepEqual(api.reserved[0], ["gpt-transcribe", 61]);
});
test("missing configuration and unpriced model fail before a provider request", async () => {
  for (const e of [{}, { ...env, STUDIO_TRANSCRIPTION_MODEL: "unpriced-model" }]) {
    const api = provider({ env: e });
    await assert.rejects(api.transcribeStudioVoice(wav()), /not connected/);
    assert.equal(api.calls.length, 0);
  }
});
test("malformed audio does not reserve a provider call", async () => {
  const api = provider();
  await assert.rejects(api.transcribeStudioVoice(new Uint8Array(44)));
  assert.equal(api.calls.length, 0);
  assert.equal(api.reserved.length, 0);
});
test("provider errors and empty/oversized output are retryable and never auto-retried", async () => {
  for (const response of [
    new Response("", { status: 429 }),
    new Response("", { status: 500 }),
    Response.json({ text: "" }),
    Response.json({ text: "a".repeat(40001) }),
    new Response("x".repeat(256001)),
  ]) {
    const api = provider({ response });
    await assert.rejects(api.transcribeStudioVoice(wav()));
    assert.equal(api.calls.length, 1);
  }
});
function runtime(reject = false, releaseError = false) {
  const events = [];
  const admin = {
    from: () => ({
      select: () => ({
        eq: () => ({
          single: async () => ({
            data: { plan: "creator", paid_plan: "creator", status: "active" },
          }),
        }),
      }),
    }),
    rpc: async (name, args) => {
      events.push({ name, args });
      if (name === "finish_studio_credits" && args.outcome === "released" && releaseError)
        return { error: { message: "network timeout" } };
      return name === "reserve_studio_credits"
        ? reject
          ? { error: { message: "Not enough Studio credits" } }
          : { data: "usage-1" }
        : { data: null };
    },
  };
  const api = loadModule("src/lib/studio-credit-runtime.server", {
    env,
    overrides: {
      "@supabase/supabase-js": { createClient: () => admin },
      "./supabase/client": { SUPABASE_URL: "https://test.invalid" },
      "./studio-auth.server": { authorizedStudioClient: async () => ({ user: { id: "user" } }) },
    },
  });
  return { api, events };
}
const auth = { accessToken: "fake", workspaceId: "workspace" };
test("voice reserves dynamic credits and reports duration-based provider cost with contingency", async () => {
  const { api, events } = runtime();
  await api.withStudioCredits(
    auth,
    "transcription",
    async () => api.beginStudioTranscriptionCall("gpt-transcribe", 61),
    { audioSeconds: 61 },
  );
  assert.equal(events[0].args.credit_count, 4);
  assert.equal(events[0].args.cost_ceiling, 0.02);
  assert.equal(events[1].args.outcome, "completed");
  assert.equal(events[1].args.provider_calls[0].audioSeconds, 61);
  assert.equal(events[1].args.provider_calls[0].costBasis, "validated_audio_duration");
  assert.ok(Math.abs(events[1].args.provider_cost - (61 / 60) * 0.0045 * 1.25) < 1e-10);
});
test("voice insufficient credits rejects before provider; failure refunds and retains provider cost", async () => {
  const blocked = runtime(true);
  let invoked = false;
  await assert.rejects(
    blocked.api.withStudioCredits(
      auth,
      "transcription",
      async () => {
        invoked = true;
      },
      { audioSeconds: 3 },
    ),
    /Not enough/,
  );
  assert.equal(invoked, false);
  const { api, events } = runtime();
  await assert.rejects(
    api.withStudioCredits(
      auth,
      "transcription",
      async () => {
        api.beginStudioTranscriptionCall("gpt-transcribe", 3);
        throw new Error("storage failed");
      },
      { audioSeconds: 3 },
    ),
    /storage failed/,
  );
  assert.equal(events[1].args.outcome, "released");
  assert.ok(events[1].args.provider_cost > 0);
});
test("a second voice provider call is rejected, and uncertain saved output stays reserved", async () => {
  const { api, events } = runtime();
  await assert.rejects(
    api.withStudioCredits(
      auth,
      "transcription",
      async () => {
        api.beginStudioTranscriptionCall("gpt-transcribe", 3);
        api.beginStudioTranscriptionCall("gpt-transcribe", 3);
      },
      { audioSeconds: 3 },
    ),
    /one|limit/i,
  );
  const other = runtime();
  await assert.rejects(
    other.api.withStudioCredits(
      auth,
      "transcription",
      async () => {
        throw new other.api.StudioCreditReconciliationError("confirming save");
      },
      { audioSeconds: 3 },
    ),
  );
  assert.equal(other.events.length, 1);
});
function intakeFixture(mode = "success") {
  const events = [];
  class Reconciliation extends Error {}
  let row = { status: "pending", attachment_id: null };
  const client = {
    storage: {
      from: () => ({
        upload: async () => {
          events.push("upload");
          return mode === "storage-fail" ? { error: true } : { data: { path: "saved" } };
        },
        remove: async () => {
          events.push("remove");
          return {};
        },
      }),
    },
  };
  const admin = {
    rpc: async (name, args) => {
      events.push(name);
      if (name === "claim_studio_voice")
        return {
          data:
            mode === "completed"
              ? { status: "completed", attachmentId: "saved-id" }
              : mode === "pending"
                ? { status: "pending", claimed: false }
                : { status: "pending", claimed: true, token: "token" },
        };
      if (name === "complete_studio_voice") {
        if (mode === "uncertain") return { error: true };
        if (mode === "conversation-deleted")
          return { error: { code: "P0001", message: "Conversation unavailable" } };
        row = { status: "completed", attachment_id: "saved-id" };
        return { data: "saved-id" };
      }
      return { data: null };
    },
    from(table) {
      const chain = {
        select: () => chain,
        eq: () => chain,
        single: async () => ({
          data:
            table === "studio_voice_requests"
              ? row
              : {
                  id: "saved-id",
                  kind: "voice",
                  label: "voice.wav",
                  summary: "Voice note",
                  byte_size: 96044,
                  extracted_text: "Saved transcript.",
                },
        }),
      };
      return chain;
    },
  };
  const api = loadModule("src/lib/studio-voice-intake.server", {
    overrides: {
      "./studio-auth.server": {
        authorizedStudioClient: async () => {
          if (mode === "unauthorized") throw new Error("no access");
          return { client, user: { id: "member" } };
        },
      },
      "./studio-credit-runtime.server": {
        studioBillingAdmin: () => admin,
        currentStudioUsageId: () => "usage-id",
        StudioCreditReconciliationError: Reconciliation,
        withStudioCredits: async (_auth, _op, work, meter) => {
          events.push(["reserve", meter]);
          try {
            const result = await work();
            events.push("charge");
            return result;
          } catch (error) {
            events.push(error instanceof Reconciliation ? "hold" : "refund");
            throw error;
          }
        },
      },
      "./studio-transcription.server": {
        studioTranscriptionConfigured: () => mode !== "unconfigured",
        transcribeStudioVoice: async () => {
          events.push("provider");
          if (mode === "provider-fail") throw new Error("provider failed");
          return { text: "Saved transcript.", model: "gpt-transcribe" };
        },
      },
    },
  });
  return {
    events,
    run: () =>
      api.intakeStudioVoice({
        ...auth,
        conversationId: null,
        requestId: "request",
        name: "voice.wav",
        bytes: wav(),
      }),
  };
}
test("voice persistence binds credit reservation before provider, uploads then atomically saves before charging", async () => {
  const f = intakeFixture();
  const result = await f.run();
  assert.equal(result.text, "Saved transcript.");
  assert.deepEqual(
    f.events.map((e) => (Array.isArray(e) ? e[0] : e)),
    [
      "claim_studio_voice",
      "reserve",
      "bind_studio_voice_usage",
      "provider",
      "upload",
      "complete_studio_voice",
      "charge",
    ],
  );
});
test("completed retry reopens saved transcript without another credit reservation or paid call", async () => {
  const f = intakeFixture("completed");
  assert.equal((await f.run()).text, "Saved transcript.");
  assert.deepEqual(f.events, ["claim_studio_voice"]);
});
test("parallel request while pending cannot invoke the provider", async () => {
  const f = intakeFixture("pending");
  await assert.rejects(f.run(), /still processing/);
  assert.deepEqual(f.events, ["claim_studio_voice"]);
});
test("provider and storage failure release credits and allow explicit retry", async () => {
  for (const mode of ["provider-fail", "storage-fail"]) {
    const f = intakeFixture(mode);
    await assert.rejects(f.run());
    assert.ok(f.events.includes("refund"));
    assert.ok(f.events.includes("fail_studio_voice"));
    assert.ok(!f.events.includes("charge"));
  }
});
test("uncertain persistence retains reservation and recording for reconciliation, never refunds or reruns", async () => {
  const f = intakeFixture("uncertain");
  await assert.rejects(f.run(), /still being confirmed/);
  assert.ok(f.events.includes("hold"));
  assert.ok(!f.events.includes("refund"));
  assert.ok(!f.events.includes("remove"));
  assert.ok(!f.events.includes("fail_studio_voice"));
});
test("authorization and setup failures never reserve credits or contact provider", async () => {
  for (const mode of ["unauthorized", "unconfigured"]) {
    const f = intakeFixture(mode);
    await assert.rejects(f.run());
    assert.ok(!f.events.some((e) => Array.isArray(e) && e[0] === "reserve"));
    assert.ok(!f.events.includes("provider"));
  }
});
test("multipart body limits reject dishonest or missing Content-Length before parsing", async () => {
  const { readBoundedIntakeForm } = loadModule("src/lib/studio-intake-body.server");
  await assert.rejects(
    readBoundedIntakeForm(
      new Request("https://example.invalid", {
        method: "POST",
        headers: { "content-length": "50000000" },
        body: "x",
      }),
    ),
    /under 25 MB/,
  );
  let canceled = false;
  const body = new ReadableStream({
    start(c) {
      c.enqueue(new Uint8Array(26 * 1024 * 1024));
    },
    cancel() {
      canceled = true;
    },
  });
  await assert.rejects(
    readBoundedIntakeForm(
      new Request("https://example.invalid", { method: "POST", body, duplex: "half" }),
    ),
    /too large/,
  );
  assert.equal(canceled, true);
});

test("confirmed deleted conversation rolls back save and refunds while preserving incurred provider estimate", async () => {
  const f = intakeFixture("conversation-deleted");
  await assert.rejects(f.run(), /no longer available/);
  assert.ok(f.events.includes("refund"));
  assert.ok(f.events.includes("remove"));
  assert.ok(f.events.includes("fail_studio_voice"));
  assert.ok(!f.events.includes("charge"));
});

test("failed release stays reserved and blocks a duplicate retry until reconciliation", async () => {
  const { api, events } = runtime(false, true);
  await assert.rejects(
    api.withStudioCredits(
      auth,
      "transcription",
      async () => {
        api.beginStudioTranscriptionCall("gpt-transcribe", 3);
        throw new Error("provider failed");
      },
      { audioSeconds: 3 },
    ),
    api.StudioCreditReconciliationError,
  );
  assert.equal(events.length, 2);
  assert.equal(events[1].args.outcome, "released");
  assert.ok(events[1].args.provider_cost > 0);
});
test("microphone capture enforces its sample-frame limit and stops tracks before review", async () => {
  let processor,
    stops = 0,
    limit = 0,
    context;
  class AudioContextMock {
    constructor() {
      context = this;
      this.sampleRate = 16000;
      this.state = "running";
      this.destination = {};
    }
    createMediaStreamSource() {
      return { connect() {}, disconnect() {} };
    }
    createAnalyser() {
      return {
        frequencyBinCount: 256,
        connect() {},
        disconnect() {},
        getByteTimeDomainData(values) {
          values.fill(128);
        },
      };
    }
    createScriptProcessor() {
      processor = { connect() {}, disconnect() {}, onaudioprocess: null };
      return processor;
    }
    async close() {
      this.state = "closed";
    }
  }
  const api = loadModule("src/lib/audio-wav", {
    globals: {
      AudioContext: AudioContextMock,
      navigator: {
        mediaDevices: {
          getUserMedia: async () => ({
            getTracks: () => [
              {
                stop() {
                  stops++;
                },
              },
            ],
          }),
        },
      },
    },
  });
  const recording = await api.startRecording({ onLimit: () => limit++ });
  processor.onaudioprocess({
    inputBuffer: { getChannelData: () => new Float32Array(16000 * 300 + 64) },
  });
  assert.equal(recording.duration(), 300);
  assert.equal(limit, 1);
  assert.equal(stops, 1);
  assert.equal(processor.onaudioprocess, null);
  const blob = await recording.stop();
  assert.equal(inspectStudioVoiceWav(new Uint8Array(await blob.arrayBuffer())).seconds, 300);
  assert.equal(context.state, "closed");
  assert.equal(await recording.stop(), blob);
  assert.equal(stops, 1);
});
test("AudioContext creation failure releases the microphone", async () => {
  let stops = 0;
  const api = loadModule("src/lib/audio-wav", {
    globals: {
      AudioContext: class {
        constructor() {
          throw new Error("unavailable");
        }
      },
      navigator: {
        mediaDevices: {
          getUserMedia: async () => ({
            getTracks: () => [
              {
                stop() {
                  stops++;
                },
              },
            ],
          }),
        },
      },
    },
  });
  await assert.rejects(api.startRecording(), /unavailable/);
  assert.equal(stops, 1);
});
test("browser conversion rejects oversized, undecodable, and overlong source audio", async () => {
  let duration = 301,
    closed = 0;
  const api = loadModule("src/lib/audio-wav", {
    globals: {
      AudioContext: class {
        async close() {
          closed++;
        }
        async decodeAudioData() {
          if (duration === -1) throw new Error("decode");
          return { duration };
        }
      },
    },
  });
  await assert.rejects(api.prepareStudioVoiceFile({ size: 26 * 1024 * 1024 }), /under 25 MB/);
  const file = new File([new Uint8Array(10)], "test.mp3", { type: "audio/mpeg" });
  await assert.rejects(api.prepareStudioVoiceFile(file), /five minutes/);
  duration = -1;
  await assert.rejects(api.prepareStudioVoiceFile(file), /browser could not read/);
  assert.equal(closed, 2);
});
