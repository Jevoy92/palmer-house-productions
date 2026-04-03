import { useState, useCallback } from "react";
import { streamDemo } from "../../lib/streamDemo";
import StreamingMarkdown from "./StreamingMarkdown";

export default function WhatToPostTool() {
  const [context, setContext] = useState("");
  const [recentActivity, setRecentActivity] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generate = useCallback(() => {
    setLoading(true);
    setResult("");
    setError("");
    let accumulated = "";

    streamDemo({
      toolId: "what-to-post",
      inputs: { context, recentActivity },
      onDelta: (text) => {
        accumulated += text;
        setResult(accumulated);
      },
      onDone: () => setLoading(false),
      onError: (msg) => {
        setError(msg);
        setLoading(false);
      },
    });
  }, [context, recentActivity]);

  return (
    <div>
      <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 mb-6">
        <h2 className="text-xl font-bold mb-1">🎯 What Should Dick's Post Right Now?</h2>
        <p className="text-sm text-muted-foreground mb-6">
          AI analyzes the current time, day, season, and your context to suggest 3 high-impact posts.
        </p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              What's happening at Dick's today? <span className="text-muted-foreground">(optional)</span>
            </label>
            <input
              type="text"
              value={context}
              onChange={(e) => setContext(e.target.value)}
              placeholder="e.g. Big shipment of Vulcan fryers just arrived"
              className="w-full bg-muted border border-border rounded-lg px-4 py-2.5 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Any recent wins or activity? <span className="text-muted-foreground">(optional)</span>
            </label>
            <input
              type="text"
              value={recentActivity}
              onChange={(e) => setRecentActivity(e.target.value)}
              placeholder="e.g. Just finished installing a walk-in cooler for a new Thai restaurant"
              className="w-full bg-muted border border-border rounded-lg px-4 py-2.5 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/50"
            />
          </div>
          <button
            onClick={generate}
            disabled={loading}
            className="w-full sm:w-auto px-8 py-3 rounded-full bg-accent text-accent-foreground font-semibold hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? "Analyzing..." : "Tell Me What to Post"}
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-900/30 border border-red-700 rounded-xl p-4 mb-6 text-red-300 text-sm">
          {error}
        </div>
      )}

      {result && (
        <div className="bg-card border border-border rounded-2xl p-6 sm:p-8">
          <StreamingMarkdown content={result} />
          {loading && <span className="inline-block w-2 h-5 bg-accent animate-pulse ml-1 align-middle" />}
        </div>
      )}
    </div>
  );
}
