import { useState, useCallback, useRef } from "react";
import { streamAiGenerate, type AiGenerateParams, type AiStreamEvent } from "./api";
import { useAuth } from "@/contexts/AuthContext";

interface UseAiGenerateReturn {
  output: string;
  isGenerating: boolean;
  error: string | null;
  resultId: number | null;
  generate: (params: Omit<AiGenerateParams, "token">) => Promise<void>;
  reset: () => void;
}

export function useAiGenerate(): UseAiGenerateReturn {
  const { sessionToken } = useAuth();
  const [output, setOutput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resultId, setResultId] = useState<number | null>(null);
  const abortRef = useRef(false);

  const generate = useCallback(async (params: Omit<AiGenerateParams, "token">) => {
    setOutput("");
    setError(null);
    setResultId(null);
    setIsGenerating(true);
    abortRef.current = false;

    try {
      await streamAiGenerate(
        {
          ...params,
          token: sessionToken || undefined,
        },
        (event: AiStreamEvent) => {
          if (abortRef.current) return;
          if (event.error) {
            setError(event.error);
          } else if (event.content) {
            setOutput((prev) => prev + event.content);
          }
          if (event.done) {
            setResultId(event.resultId ?? null);
          }
        },
      );
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Generation failed. Please try again.";
      setError(message);
    } finally {
      setIsGenerating(false);
    }
  }, [sessionToken]);

  const reset = useCallback(() => {
    abortRef.current = true;
    setOutput("");
    setError(null);
    setResultId(null);
    setIsGenerating(false);
  }, []);

  return { output, isGenerating, error, resultId, generate, reset };
}
