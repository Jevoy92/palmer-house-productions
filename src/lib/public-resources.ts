export type ResourceRequestResult =
  | { status: "accepted" }
  | { status: "draft" }
  | { status: "error"; message: string };
/** A contact endpoint accepts an interest request; it cannot confirm an event booking. */
export async function submitWebinarInterest(
  data: { name: string; email: string; company: string },
  options: { endpoint: string; fetcher?: typeof fetch; timeoutMs?: number },
): Promise<ResourceRequestResult> {
  if (!options.endpoint.trim()) return { status: "draft" };
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), options.timeoutMs ?? 20000);
  try {
    const response = await (options.fetcher ?? fetch)(options.endpoint, {
      method: "POST",
      headers: { "content-type": "application/json" },
      signal: controller.signal,
      body: JSON.stringify({
        ...data,
        projectType: "Webinar interest",
        message:
          "I'd like information about the next Palmer House video workshop. Please confirm the date, availability, and replay details.",
        source: "palmerhouseproductions.com/webinar",
      }),
    });
    return response.ok
      ? { status: "accepted" }
      : {
          status: "error",
          message:
            "We couldn’t confirm receipt. Your details are still here. You can send the email request below.",
        };
  } catch {
    return {
      status: "error",
      message:
        "We couldn’t confirm receipt. Your details are still here. You can send the email request below.",
    };
  } finally {
    clearTimeout(timeout);
  }
}
export type AssessmentAnswers = {
  businessType: string;
  teamSize: string;
  videoHabits: string;
  goal: string;
  bottleneck: string;
};
export function assessmentRecommendation(answers: AssessmentAnswers) {
  const lane = answers.goal.includes("visibility")
    ? "reel"
    : answers.goal.includes("trust")
      ? "spotlight"
      : answers.goal.includes("expertise")
        ? "evergreen"
        : "system";
  const labels = {
    reel: "Social content",
    spotlight: "Commercials, demos & customer stories",
    system: "Onboarding, training & Video SOPs",
    evergreen: "Educational videos",
  };
  const intent =
    answers.bottleneck.includes("confidence") || answers.bottleneck.includes("say")
      ? "preparation"
      : answers.bottleneck.includes("organize")
        ? "studio"
        : "production";
  const paths = { preparation: "/content-strategy", studio: "/membership", production: "/shop" };
  const titles = {
    preparation: "Get ready before you shoot.",
    studio: "Give your ideas a working home.",
    production: "Bring in a production team.",
  };
  const bodies = {
    preparation:
      "Human help with your message, script or on-camera preparation is a useful first step. You can film yourself or involve a crew afterward.",
    studio:
      "Studio helps you develop drafts, keep brand context and organize your library and calendar. You review and publish the work yourself.",
    production:
      "Start with a team to help plan, film and edit. A package gives you a working scope and estimate; the team confirms the details before payment.",
  };
  return {
    lane: lane as "reel" | "spotlight" | "system" | "evergreen",
    category: labels[lane],
    intent: intent as "preparation" | "studio" | "production",
    path: paths[intent],
    title: titles[intent],
    body: bodies[intent],
  };
}
export function assessmentBrief(answers: AssessmentAnswers): string {
  return [
    `Business: ${answers.businessType}`,
    `Team: ${answers.teamSize}`,
    `Current video use: ${answers.videoHabits}`,
    `Goal: ${answers.goal}`,
    `Main obstacle: ${answers.bottleneck}`,
  ].join("\n");
}
