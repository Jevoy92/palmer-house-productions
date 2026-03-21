import { getApiUrl } from "@/lib/api";

export interface StreamCallbacks {
  onChunk: (content: string) => void;
  onDone: (data: { creditsRemaining?: number; creditsCost: number }) => void;
  onError: (error: string) => void;
}

export async function generateWithTool(
  toolId: string,
  palId: string | null,
  inputs: Record<string, string>,
  userId: number | null,
  isGuest: boolean,
  callbacks: StreamCallbacks,
  signal?: AbortSignal
): Promise<void> {
  const url = getApiUrl("/ai/generate");

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ toolId, palId, inputs, userId, isGuest }),
    signal,
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({ error: "Request failed" }));
    callbacks.onError(err.error || "Request failed");
    return;
  }

  const reader = response.body?.getReader();
  if (!reader) {
    callbacks.onError("No response stream");
    return;
  }

  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop() || "";

    for (const line of lines) {
      if (line.startsWith("data: ")) {
        try {
          const data = JSON.parse(line.slice(6));
          if (data.type === "chunk") {
            callbacks.onChunk(data.content);
          } else if (data.type === "done") {
            callbacks.onDone({
              creditsRemaining: data.creditsRemaining,
              creditsCost: data.creditsCost,
            });
          } else if (data.type === "error") {
            callbacks.onError(data.error);
          }
        } catch {}
      }
    }
  }
}

export async function chatWithPal(
  message: string,
  palId: string | null,
  conversationHistory: Array<{ role: string; content: string }>,
  userId: number | null,
  isGuest: boolean,
  callbacks: StreamCallbacks,
  signal?: AbortSignal
): Promise<void> {
  const url = getApiUrl("/ai/chat");

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, palId, conversationHistory, userId, isGuest }),
    signal,
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({ error: "Request failed" }));
    callbacks.onError(err.error || "Request failed");
    return;
  }

  const reader = response.body?.getReader();
  if (!reader) {
    callbacks.onError("No response stream");
    return;
  }

  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop() || "";

    for (const line of lines) {
      if (line.startsWith("data: ")) {
        try {
          const data = JSON.parse(line.slice(6));
          if (data.type === "chunk") {
            callbacks.onChunk(data.content);
          } else if (data.type === "done") {
            callbacks.onDone({
              creditsRemaining: data.creditsRemaining,
              creditsCost: data.creditsCost,
            });
          } else if (data.type === "error") {
            callbacks.onError(data.error);
          }
        } catch {}
      }
    }
  }
}
