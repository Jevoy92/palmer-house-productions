import { useState, useRef, useCallback } from "react";
import { generateWithTool, chatWithPal } from "@/services/ai";
import { useAuth } from "@/contexts/AuthContext";
import { useUsage } from "@/contexts/UsageContext";

interface UseAIGenerationReturn {
  output: string;
  isGenerating: boolean;
  error: string | null;
  creditsUsed: number | null;
  creditsRemaining: number | null;
  generate: (toolId: string, palId: string | null, inputs: Record<string, string>) => Promise<void>;
  chat: (message: string, palId: string | null, history: Array<{ role: string; content: string }>) => Promise<void>;
  reset: () => void;
  cancel: () => void;
}

export function useAIGeneration(): UseAIGenerationReturn {
  const [output, setOutput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [creditsUsed, setCreditsUsed] = useState<number | null>(null);
  const [creditsRemaining, setCreditsRemaining] = useState<number | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const { user, updateCredits } = useAuth();
  const { recordUsage } = useUsage();

  const generate = useCallback(
    async (toolId: string, palId: string | null, inputs: Record<string, string>) => {
      setOutput("");
      setIsGenerating(true);
      setError(null);
      setCreditsUsed(null);
      setCreditsRemaining(null);

      const controller = new AbortController();
      abortControllerRef.current = controller;

      try {
        await generateWithTool(
          toolId,
          palId,
          inputs,
          user?.id ?? null,
          !user,
          {
            onChunk: (content) => {
              setOutput((prev) => prev + content);
            },
            onDone: (data) => {
              setIsGenerating(false);
              setCreditsUsed(data.creditsCost);
              if (data.creditsRemaining !== undefined) {
                setCreditsRemaining(data.creditsRemaining);
                updateCredits(data.creditsRemaining);
              }
              if (data.creditsCost > 0) {
                recordUsage(toolId, data.creditsCost);
              }
            },
            onError: (err) => {
              setError(err);
              setIsGenerating(false);
            },
          },
          controller.signal
        );
      } catch (err: any) {
        if (err.name !== "AbortError") {
          setError(err.message || "Generation failed");
          setIsGenerating(false);
        }
      }
    },
    [user, updateCredits, recordUsage]
  );

  const chat = useCallback(
    async (message: string, palId: string | null, history: Array<{ role: string; content: string }>) => {
      setOutput("");
      setIsGenerating(true);
      setError(null);

      const controller = new AbortController();
      abortControllerRef.current = controller;

      try {
        await chatWithPal(
          message,
          palId,
          history,
          user?.id ?? null,
          !user,
          {
            onChunk: (content) => {
              setOutput((prev) => prev + content);
            },
            onDone: (data) => {
              setIsGenerating(false);
              if (data.creditsRemaining !== undefined) {
                updateCredits(data.creditsRemaining);
              }
            },
            onError: (err) => {
              setError(err);
              setIsGenerating(false);
            },
          },
          controller.signal
        );
      } catch (err: any) {
        if (err.name !== "AbortError") {
          setError(err.message || "Chat failed");
          setIsGenerating(false);
        }
      }
    },
    [user, updateCredits]
  );

  const reset = useCallback(() => {
    setOutput("");
    setError(null);
    setCreditsUsed(null);
    setCreditsRemaining(null);
    setIsGenerating(false);
  }, []);

  const cancel = useCallback(() => {
    abortControllerRef.current?.abort();
    setIsGenerating(false);
  }, []);

  return {
    output,
    isGenerating,
    error,
    creditsUsed,
    creditsRemaining,
    generate,
    chat,
    reset,
    cancel,
  };
}
