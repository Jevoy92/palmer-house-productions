import { useState, useCallback } from "react";
import { streamDemo } from "../../lib/streamDemo";
import StreamingMarkdown from "./StreamingMarkdown";

export default function ContentEngineTool() {
  const [activity, setActivity] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generate = useCallback(() => {
    if (!activity.trim()) return;
    setLoading(true);
    setResult("");
    setError("");
    let accumulated = "";

    streamDemo({
      toolId: "content-engine",
      inputs: { activity, additionalNotes },
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
  }, [activity, additionalNotes]);

  return (
    <div>
      <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 mb-6">
        <h2 className="text-xl font-bold mb-1">⚙️ Content Engine Pipeline</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Type one sentence about something that happened at Dick's. Get a complete content package: blog, YouTube script, reel, social post, and filming plan.
        </p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              What happened? <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={activity}
              onChange={(e) => setActivity(e.target.value)}
              placeholder="e.g. We installed new fryers at X restaurant"
              className="w-full bg-muted border border-border rounded-lg px-4 py-2.5 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Anything else to include? <span className="text-muted-foreground">(optional)</span>
            </label>
            <textarea
              value={additionalNotes}
              onChange={(e) => setAdditionalNotes(e.target.value)}
              placeholder="e.g. The owner was thrilled, they upgraded from 20-year-old equipment"
              rows={2}
              className="w-full bg-muted border border-border rounded-lg px-4 py-2.5 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/50 resize-none"
            />
          </div>
          <button
            onClick={generate}
            disabled={loading || !activity.trim()}
            className="w-full sm:w-auto px-8 py-3 rounded-full bg-accent text-accent-foreground font-semibold hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? "Generating..." : "Generate Full Content Package"}
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
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-foreground">Your Content Package</h3>
            <button
              onClick={() => navigator.clipboard.writeText(result)}
              className="text-xs px-3 py-1.5 rounded-full bg-muted text-muted-foreground hover:text-foreground transition"
            >
              📋 Copy All
            </button>
          </div>
          <StreamingMarkdown content={result} />
          {loading && <span className="inline-block w-2 h-5 bg-accent animate-pulse ml-1 align-middle" />}
        </div>
      )}
    </div>
  );
}
