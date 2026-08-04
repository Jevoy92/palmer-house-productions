import type { CampaignOutput } from "./studio-model";

export function buildDemoCampaign(topic: string, business = "Your business"): CampaignOutput {
  const idea = topic.trim() || "Turn repeated customer questions into useful content";
  return {
    title: `${business}: ${idea}`,
    primaryLane: "evergreen",
    strategy: {
      bigIdea: `The strongest content does not add noise. It makes ${idea.toLowerCase()} easier to understand and act on.`,
      audienceInsight:
        "The audience is not waiting for more information. They are waiting for someone to organize the decision.",
      promise:
        "One clear explanation becomes a reusable campaign instead of another forgotten post.",
      messagePillars: [
        "Name the real friction",
        "Make the expertise visible",
        "Give one confident next step",
      ],
      channelPlan: [
        { channel: "YouTube / Website", role: "Anchor explanation and long-term authority" },
        {
          channel: "Instagram / LinkedIn",
          role: "Short proof points that bring people into the main idea",
        },
        { channel: "Email", role: "A direct follow-up that turns attention into action" },
      ],
    },
    anchor: {
      title: idea,
      hook: "Most businesses do not have a content problem. They have an explanation problem.",
      script: `Start with the moment your customer becomes unsure.\n\nThey are not asking for more information. They are trying to understand what matters, what can wait, and what happens if they choose wrong.\n\nThat is where ${business} can be most useful. Instead of listing every feature, organize the decision. Show the problem. Explain what a strong outcome looks like. Give them proof they can recognize.\n\nWhen one clear idea becomes a long-form explanation, short clips, FAQs, and a follow-up email, content stops being a weekly emergency. It becomes infrastructure.`,
      callToAction:
        "Choose the question your customers repeat most often. We will turn it into the first campaign.",
    },
    shorts: [
      {
        title: "The explanation gap",
        hook: "Your customer is not confused because they need more content.",
        script:
          "They are confused because nobody has organized the decision. Name the friction, show the proof, and give one next step.",
        callToAction: "Save this for your next filming day.",
      },
      {
        title: "Content as infrastructure",
        hook: "A good video should keep working after you stop posting it.",
        script:
          "Turn one useful explanation into your website video, three social clips, an FAQ, and an email. That is a system—not a post.",
        callToAction: "Build the campaign from one idea.",
      },
      {
        title: "Start with the repeated question",
        hook: "Want to know what to film next? Listen to your last sales call.",
        script:
          "The question you answered twice this week is already a content brief. Record it once, structure it clearly, and reuse it everywhere.",
        callToAction: "Write down the question before you forget it.",
      },
    ],
    captions: [
      {
        platform: "LinkedIn",
        copy: "Content becomes valuable when it removes a repeated explanation from your week. Start with the question your customers ask before they are ready to buy.",
      },
      {
        platform: "Instagram",
        copy: "One idea. One clear explanation. A complete campaign ready to film. That is the difference between posting and building a content system.",
      },
    ],
    faq: [
      {
        question: "Where should we start?",
        answer:
          "Start with the business question you answer most often and the next action you want the audience to take.",
      },
      {
        question: "Do we need to be good on camera?",
        answer:
          "No. A strong plan reduces the pressure to perform because you know what each section needs to accomplish.",
      },
      {
        question: "How much content comes from one idea?",
        answer:
          "A focused idea can support one anchor video, three to five short clips, written follow-ups, FAQs, and a publishing schedule.",
      },
    ],
    newsletter: {
      subject: "The question hiding your next campaign",
      body: "Think about the last question you answered more than once. That question is already telling you what your audience needs. A clear answer can become the anchor for an entire campaign—and save your team from explaining it again next week.",
    },
    carousel: {
      title: "From repeated question to complete campaign",
      slides: [
        "Start with the repeated question",
        "Name the audience friction",
        "Choose one clear promise",
        "Build the anchor explanation",
        "Pull out three short hooks",
        "Add proof and a CTA",
        "Schedule the campaign",
      ],
    },
    productionPlan: {
      objective: `Make ${idea.toLowerCase()} feel clear, useful, and easy to act on.`,
      estimatedMinutes: 75,
      location: "A quiet, familiar location connected to the work",
      wardrobe: ["Solid brand-aligned colors", "Avoid tight patterns", "Bring one alternate layer"],
      props: ["One real tool or object from the work", "Printed talking points"],
      deliveryNotes: [
        "Speak to one customer, not an audience",
        "Pause after the hook",
        "Use the customer's language before industry language",
      ],
      shots: [
        {
          shot: "Direct-to-camera hook",
          framing: "Medium close-up",
          purpose: "Earn attention immediately",
        },
        {
          shot: "Problem explanation",
          framing: "Medium",
          purpose: "Give the audience a recognizable moment",
        },
        {
          shot: "Proof example",
          framing: "Close-up or screen detail",
          purpose: "Make the claim visible",
        },
        {
          shot: "Final invitation",
          framing: "Medium close-up",
          purpose: "Deliver one calm next step",
        },
      ],
      broll: [
        "Hands doing the actual work",
        "Customer-facing environment",
        "Relevant tools or screens",
        "Team interaction",
        "Finished result",
      ],
      checklist: [
        "Confirm the single audience",
        "Charge camera and audio",
        "Silence notifications",
        "Record ten seconds of room tone",
        "Capture every proof example",
        "Record two CTA options",
      ],
    },
    schedule: [
      { title: "Publish anchor video", channel: "YouTube / Website", dayOffset: 0 },
      { title: "The explanation gap", channel: "LinkedIn", dayOffset: 2 },
      { title: "Content as infrastructure", channel: "Instagram", dayOffset: 5 },
      { title: "The question hiding your campaign", channel: "Email", dayOffset: 7 },
      { title: "Start with the repeated question", channel: "Instagram", dayOffset: 10 },
    ],
  };
}
