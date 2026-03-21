const BASE_URL = `https://${process.env.EXPO_PUBLIC_DOMAIN}/api`;

export function getApiUrl(path: string): string {
  return `${BASE_URL}${path}`;
}

export interface AiGenerateParams {
  toolId: string;
  palId?: string;
  inputs: Record<string, string>;
  token?: string;
}

export interface AiStreamEvent {
  content?: string;
  done?: boolean;
  error?: string;
  resultId?: number;
  creditsRemaining?: number | null;
}

export async function streamAiGenerate(
  params: AiGenerateParams,
  onChunk: (event: AiStreamEvent) => void,
): Promise<void> {
  const { token, ...body } = params;
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const response = await fetch(getApiUrl("/ai/generate"), {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({ error: "Request failed" })) as { error?: string };
    throw new Error(errorBody.error || `HTTP ${response.status}`);
  }

  const reader = response.body?.getReader();
  if (!reader) throw new Error("No response stream available");

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
          const event: AiStreamEvent = JSON.parse(line.slice(6));
          onChunk(event);
        } catch {
          // ignore malformed SSE lines
        }
      }
    }
  }
}

export interface GeneratePdfParams {
  title: string;
  sections: Array<{ heading?: string; content: string; type?: string }>;
  toolId?: string;
}

export async function generatePdf(params: GeneratePdfParams): Promise<{ html: string; title: string; generatedAt: string }> {
  const response = await fetch(getApiUrl("/ai/generate-pdf"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({ error: "Request failed" })) as { error?: string };
    throw new Error(errorBody.error || `HTTP ${response.status}`);
  }

  return response.json() as Promise<{ html: string; title: string; generatedAt: string }>;
}

export interface ToolResult {
  id: number;
  userId: number | null;
  toolId: string;
  palId: string | null;
  inputs: Record<string, string>;
  output: string;
  createdAt: string;
}

export async function fetchToolResults(params: {
  token: string;
  toolId?: string;
  limit?: number;
}): Promise<ToolResult[]> {
  const response = await fetch(getApiUrl("/ai/tool-results/list"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${params.token}`,
    },
    body: JSON.stringify({
      toolId: params.toolId,
      limit: params.limit,
    }),
  });

  if (!response.ok) throw new Error("Failed to fetch results");
  return response.json() as Promise<ToolResult[]>;
}
