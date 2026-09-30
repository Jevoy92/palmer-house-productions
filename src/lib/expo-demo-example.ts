import type { DemoCampaign, GuestBrief } from "./expo-demo-types";
import type { PalName } from "./studio-model";

/** Bundled first lines so the Pal greets instantly, before any network request. */
export const expoGreetings: Record<PalName, string> = {
  kiana: "Your business has a story. Let's find the part people lean in for. Glad you're at the Expo — what brings you here today?",
  ryder: "Let's make something people don't scroll past on the way to a dog video. What brings you to the Expo?",
  clara: "We'll give that idea a plan. No spreadsheet ambush. What would you like your content to do?",
  silas: "You run a business. Your content shouldn't need a second full-time employee. What are we working on today?",
  raquel: "Getting attention is lovely. Giving people a reason to stay is better. Who would you like to connect with?",
  kareem: "Your business deserves better than ‘we'll fix it in the edit.’ What would you like people to notice?",
  cyrus: "Let's make something that outlives the tote bag. What brings you to the Expo?",
  samira: "If you've explained it twelve times, I suspect there's content hiding in there. What do customers keep asking you?",
};

/** Example mode only: a clearly labeled, prepared campaign — never presented as generated for a guest. */
export const exampleBrief: GuestBrief = {
  businessName: "Juniper Coffee (example)",
  offer: "Neighborhood café with slow afternoons, pour-overs and house pastries",
  location: "Pasadena, CA",
  audience: "Remote workers and neighbors looking for a calm afternoon spot",
  goal: "Fill the quiet 2–5 PM window on weekdays",
  voice: "Warm, unhurried, a little wry",
  facts: [
    { text: "Fictional example business used for demonstration", source: "assumed" },
  ],
};

export const exampleCampaign: DemoCampaign = {
  headline: "A better kind of afternoon.",
  centralIdea: "Juniper is where the afternoon slows down enough to get something good done.",
  audience: "Remote workers and neighbors who want a calm place between 2 and 5.",
  goal: "Turn the quiet weekday afternoon into Juniper's most loved hours.",
  artifacts: [
    {
      id: "ig",
      type: "instagram",
      stage: "stop",
      title: "The 3 PM table",
      caption:
        "There's a table by the window that gets the good light around three. It's usually open. Bring the laptop, the book, or nothing at all — we'll bring a pour-over and something from the pastry case. Weekday afternoons at Juniper are for finishing one good thing.",
      cta: "Come find the window table this week.",
      strategy: "Leads with a specific, sensory moment instead of a discount.",
    },
    {
      id: "reel",
      type: "reel",
      stage: "stop",
      title: "Afternoon, in 20 seconds",
      hook: "The best-kept secret in Pasadena is 3 PM.",
      beats: [
        { visual: "Clock on the wall ticks to 2:59", voice: "Most cafés peak at eight.", onScreen: "8 AM: chaos" },
        { visual: "Slow pour-over, steam in window light", voice: "We peak at three.", onScreen: "3 PM: this" },
        { visual: "Guest closes laptop, smiles at a finished page", voice: "Room to think. Room to finish.", onScreen: "Room to finish" },
        { visual: "Pastry case, hand picks the last scone", voice: "And yes, there's still a scone.", onScreen: "Still a scone" },
        { visual: "Exterior sign, afternoon sun", voice: "Juniper. Afternoons, done properly.", onScreen: "Weekdays 2–5" },
      ],
      caption: "Afternoons, done properly. Weekdays 2–5.",
      cta: "Save this for your next slump.",
      strategy: "Contrast hook reframes a quiet window as the best time to visit.",
    },
    {
      id: "carousel",
      type: "carousel",
      stage: "matter",
      title: "How to take a real afternoon",
      slides: [
        { heading: "Take a real afternoon", body: "Not a coffee run. A proper pause." },
        { heading: "Pick one thing", body: "One page, one plan, one email you've been avoiding." },
        { heading: "Choose a window seat", body: "The light is best between 2 and 4." },
        { heading: "Order slow", body: "A pour-over takes four minutes. That's the point." },
        { heading: "Finish, then leave", body: "Walk out lighter than you walked in." },
      ],
      caption: "A five-step guide to the most underrated hours of your week.",
      cta: "Share with the friend who needs a real afternoon.",
      strategy: "Useful guidance people save and share, with Juniper as the natural setting.",
    },
    {
      id: "linkedin",
      type: "linkedin",
      stage: "matter",
      title: "Why we redesigned our afternoons",
      body:
        "Our busiest hour is 8 AM. Our best hour is 3 PM.\n\nFor a year we treated weekday afternoons as dead time. Then we noticed who was actually there: people finishing proposals, tutors with students, a novelist on chapter nine.\n\nSo we stopped trying to make afternoons busier and started making them better — more outlets, quieter music, and a pour-over menu that rewards staying.\n\nIf your team needs a place to think without an office, we saved you a table.",
      caption: "",
      cta: "Bring your team for a working afternoon.",
      strategy: "Speaks to local professionals with a real operating insight.",
    },
    {
      id: "youtube",
      type: "youtube",
      stage: "invite",
      title: "What a café looks like when nobody's rushing",
      thumbnailText: "3 PM IS THE BEST HOUR",
      body:
        "Open on an empty chair in window light. 'Everyone knows what a café looks like at 8 AM. This is Juniper at 3.' Cut to the barista starting a pour-over. 'Here's what happens when a coffee shop decides afternoons matter.'",
      caption: "",
      cta: "Subscribe for more slow afternoons.",
      strategy: "A longer story that builds familiarity before a first visit.",
    },
    {
      id: "extra",
      type: "extra",
      stage: "invite",
      title: "Welcome email: your first afternoon",
      body:
        "Subject: Your table's by the window\n\nThanks for stopping by Juniper. If you liked the morning, you'll love the afternoon: weekdays from 2 to 5 we keep the music low, the outlets open, and the pour-overs slow.\n\nShow this email for a pastry on us with any afternoon coffee this week.\n\nSee you around three.",
      caption: "",
      cta: "Show this email for a pastry on us.",
      strategy: "Turns a first visit into a second, at the hour that needs it.",
    },
  ],
};
