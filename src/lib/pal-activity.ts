import type { PalName } from "./studio-model";
export type PalTask = "reply" | "campaign" | "image" | "pdf";
const voice: Record<PalName, Record<PalTask, string>> = {
  kiana: {
    reply: "Finding the story in your idea.",
    campaign: "Giving your story room to grow.",
    image: "Making the story visible.",
    pdf: "Putting your ideas into good company.",
  },
  kareem: {
    reply: "Working through the useful details.",
    campaign: "Getting the pieces to work together.",
    image: "Working on the look and the details.",
    pdf: "Making every page earn its place.",
  },
  ryder: {
    reply: "A little creative mischief, coming up.",
    campaign: "Giving this idea a few good outfits.",
    image: "Adding a little visual personality.",
    pdf: "Making a document worth opening.",
  },
  raquel: {
    reply: "Let’s get you something you can use.",
    campaign: "Turning the idea into a plan with purpose.",
    image: "Giving the message a clear visual.",
    pdf: "Making the next steps easy to follow.",
  },
  cyrus: {
    reply: "Connecting this to the bigger picture.",
    campaign: "Building a story that works across channels.",
    image: "Finding a visual with a longer shelf life.",
    pdf: "Organizing the story from start to finish.",
  },
  clara: {
    reply: "Finding a thoughtful way to say it.",
    campaign: "Giving each draft its own voice.",
    image: "Making room for a telling detail.",
    pdf: "Bringing a little clarity to the page.",
  },
  silas: {
    reply: "Working through what matters here.",
    campaign: "Getting the structure into shape.",
    image: "Keeping the visual focused on the brief.",
    pdf: "Putting the useful information in order.",
  },
  samira: {
    reply: "Let’s make this a little easier.",
    campaign: "Gathering the pieces for you.",
    image: "Giving your idea a welcoming face.",
    pdf: "Making something easy to pick up and use.",
  },
};
export function palActivityCopy(pal: PalName, task: PalTask) {
  const tasks = {
    reply: {
      label: "Writing a reply",
      detail: "Using this conversation and your shared workspace context.",
      next: "Your reply appears here when it’s ready.",
      shape: "conversation",
    },
    campaign: {
      label: "Building a campaign",
      detail: "Creating coordinated drafts from your brief and Brand DNA.",
      next: "Next: your drafts save to Campaigns and Library.",
      shape: "campaign",
    },
    image: {
      label: "Creating an image",
      detail: "Working from your image brief and the context you supplied.",
      next: "Next: your image saves to Library for review.",
      shape: "image",
    },
    pdf: {
      label: "Making a PDF",
      detail: "Turning your brief into a document you can download.",
      next: "Next: your PDF saves to Library.",
      shape: "document",
    },
  } as const;
  return { ...tasks[task], voice: (voice[pal] || voice.kiana)[task] };
}
