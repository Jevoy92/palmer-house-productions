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

/** More prepared, clearly labeled examples; Example mode picks the closest match to what the guest typed. */
export const exampleLibrary: Array<{ key: string; label: string; match: RegExp; brief: GuestBrief; campaign: DemoCampaign }> = [
  { key: "coffee", label: "Café", match: /coffee|caf[eé]|bakery|restaurant|food|pastr/i, brief: exampleBrief, campaign: exampleCampaign },
  { key: "plumbing", label: "Plumbing", match: /plumb|roof|hvac|electric|contractor|repair|home service|clean|landscap/i, brief: {"businessName": "Northline Plumbing (example)", "offer": "Home plumbing help for dripping faucets, slow drains and everyday repairs", "location": "Glendale, CA", "audience": "Glendale homeowners with a plumbing problem they've been meaning to address", "goal": "Turn put-off plumbing repairs into weekday appointment requests", "voice": "Warm, practical, reassuring, with a little everyday humor", "facts": [{"text": "Fictional example business used for demonstration", "source": "assumed"}]}, campaign: {"headline": "One less thing dripping at you.", "centralIdea": "Northline helps Glendale homeowners move everyday plumbing problems off the mental to-do list and into a clear next step.", "audience": "Glendale homeowners tired of working around dripping faucets, slow drains and small plumbing frustrations.", "goal": "Make requesting a weekday plumbing appointment feel simple and approachable.", "artifacts": [{"id": "ig", "type": "instagram", "stage": "stop", "title": "The faucet you hear after bedtime", "caption": "The dishes are done. The kitchen light is off. And there it is: drip. Drip. That faucet has had a spot on your to-do list long enough. Tell Northline Plumbing (example) what's happening, which fixture it's coming from and when you first noticed it. Let's start with the problem, not a plumbing vocabulary test.", "cta": "Ask about a weekday appointment in Glendale.", "strategy": "Opens with a familiar household moment and makes asking for help feel low-pressure."}, {"id": "reel", "type": "reel", "stage": "stop", "title": "The household soundtrack, in 20 seconds", "hook": "Your Glendale kitchen doesn't need a percussion section.", "beats": [{"visual": "Quiet kitchen, then a close-up of a dripping faucet", "voice": "The house finally gets quiet.", "onScreen": "Finally. Quiet."}, {"visual": "A droplet lands in the sink with an exaggerated plink", "voice": "Except for the faucet.", "onScreen": "Drip. Drip."}, {"visual": "Hand adds 'kitchen faucet' to a phone note", "voice": "You don't need to know the part name.", "onScreen": "Start with what you notice"}, {"visual": "Homeowner takes a photo of the faucet without taking it apart", "voice": "A description and a photo are a useful start.", "onScreen": "Which fixture? Since when?"}, {"visual": "Northline Plumbing (example) title card over a Glendale kitchen scene", "voice": "Northline Plumbing. Let's talk about that drip.", "onScreen": "Glendale \u2022 Ask about an appointment"}], "caption": "For the faucet that's been interrupting your quiet kitchen.", "cta": "Send a note about the plumbing problem you've been putting off.", "strategy": "Uses gentle humor and a recognizable sound to turn an overlooked annoyance into a simple inquiry."}, {"id": "carousel", "type": "carousel", "stage": "matter", "title": "What to tell a plumber when you don't speak plumbing", "slides": [{"heading": "You don't need the technical term", "body": "'The bathroom sink drains slowly' is a perfectly good place to start."}, {"heading": "Name the spot", "body": "Kitchen sink, upstairs shower, hallway toilet: tell us which fixture needs attention."}, {"heading": "Describe what happens", "body": "Does it drip all the time, drain slowly or make a noise after use? Plain words work."}, {"heading": "Share when it started", "body": "This morning or several weeks ago? Mention any changes you've noticed and anything you've already tried."}, {"heading": "Ask for the next step", "body": "For a routine repair, ask about appointment availability and what to expect from the visit. Active leaks need prompt attention."}], "caption": "A little context helps start the conversation. No plumbing dictionary required.", "cta": "Save this for your next plumbing appointment request.", "strategy": "Offers practical preparation that reduces uncertainty and makes Northline an approachable next step."}, {"id": "linkedin", "type": "linkedin", "stage": "matter", "title": "A plumbing appointment shouldn't start with homework", "body": "You shouldn't have to identify a faucet cartridge before asking someone to look at a drip.\n\nBetween work, school pickup and getting dinner on the table, even describing a home repair can feel like another task. 'The kitchen tap keeps dripping after I turn it off' should be enough to begin.\n\nThat's the approach behind Northline Plumbing (example): start with what the homeowner notices, keep the conversation in plain language and make the next step clear.\n\nFor Glendale homeowners planning a routine repair, a useful first message is short: where the problem is, what's happening and when it started. Technical vocabulary optional.", "caption": "", "cta": "Tell us what's happening and ask about a weekday appointment.", "strategy": "Connects with busy local professionals through a practical service philosophy without inventing a company history."}, {"id": "youtube", "type": "youtube", "stage": "invite", "title": "What to say when you call about a dripping faucet", "thumbnailText": "NO PLUMBING VOCABULARY NEEDED", "body": "Open on a kitchen faucet dripping into an otherwise quiet sink. 'You know the sound. You might not know the part causing it. That's okay.' Cut to a homeowner writing three notes: kitchen faucet, drips after shutoff, noticed last week. 'Here's a simple way to explain a routine plumbing problem without diagnosing it yourself.' Show a photo being taken from beside the sink. Close on a Northline Plumbing (example) title card: 'In Glendale? Tell us what you've noticed and ask about the next available appointment.'", "caption": "", "cta": "Contact Northline about your routine plumbing repair.", "strategy": "Walks through a realistic first inquiry to build familiarity and reduce hesitation before contacting a plumber."}, {"id": "extra", "type": "extra", "stage": "invite", "title": "Welcome email: let's start with the drip", "body": "Subject: No need to learn the name of that part\n\nThanks for reaching out to Northline Plumbing (example).\n\nIf you've got a routine plumbing repair on your list, reply with a few details: which fixture needs attention, what it's doing and when you first noticed it. A photo can help explain what you're seeing, too.\n\nLet us know you're in Glendale and which weekdays generally work for you. We can start the conversation about availability and next steps; your appointment isn't booked until it's confirmed.\n\nOne less thing to keep on the mental list.", "caption": "", "cta": "Reply with the problem and your preferred weekdays.", "strategy": "Turns initial interest into a clear appointment inquiry without promising unconfirmed availability or offering an invented discount."}]} },
  { key: "dentist", label: "Dentist", match: /dent|clinic|health|medical|chiro|therap|doctor|spa|salon/i, brief: {"businessName": "Bright Harbor Dental (example)", "offer": "Family dentistry with a warm, practical approach to everyday dental care", "location": "Burbank, CA", "audience": "Burbank families balancing busy schedules, dental questions, and first-visit nerves", "goal": "Encourage local families to ask questions and schedule a first dental visit", "voice": "Warm, clear, reassuring without making promises", "facts": [{"text": "Fictional example business used for demonstration", "source": "assumed"}]}, campaign: {"headline": "Bring your questions. Even the little ones.", "centralIdea": "Bright Harbor Dental makes asking the first question feel like a natural place to begin family dental care.", "audience": "Burbank parents and neighbors who want a family dentist they can feel comfortable talking to.", "goal": "Turn first-visit uncertainty into conversations and appointment requests.", "artifacts": [{"id": "ig", "type": "instagram", "stage": "stop", "title": "The question in your phone", "caption": "Somewhere between the grocery list and the school reminder, there's a note in your phone: \u201cAsk the dentist about this.\u201d Maybe it's a brushing battle. Maybe it's your own tooth that's been bothering you. At Bright Harbor Dental (example) in Burbank, that's a good place to start. You don't need the right dental words. Bring the question as it is.", "cta": "Reach out with your first-visit questions.", "strategy": "Uses a familiar family-life detail to make reaching out feel approachable."}, {"id": "reel", "type": "reel", "stage": "stop", "title": "Your first question, in 20 seconds", "hook": "You don't need to practice what to say to the dentist.", "beats": [{"visual": "Phone notes app opens to a list titled \u201cDentist questions\u201d", "voice": "Start with whatever you've written down.", "onScreen": "Bring your questions"}, {"visual": "Two toothbrushes sit beside a tiny bathroom timer", "voice": "Even the bedtime brushing question.", "onScreen": "\u201cHow do we make this easier?\u201d"}, {"visual": "Adult pauses over a calendar, then adds \u201cCall dentist\u201d", "voice": "Even if it's been a while.", "onScreen": "\u201cWhere do I start?\u201d"}, {"visual": "Hand adds \u201cFeeling nervous\u201d beneath the other notes", "voice": "And yes, nerves belong on the list.", "onScreen": "\u201cI'm a little nervous.\u201d"}, {"visual": "Bright Harbor Dental (example) title card over a warm illustration of Burbank", "voice": "Bright Harbor Dental. Bring the question as it is.", "onScreen": "Family dentistry \u2022 Burbank, CA"}], "caption": "The question doesn't have to sound polished. It just has to be yours.", "cta": "Save this for when you're ready to make the call.", "strategy": "Removes the pressure to know dental terminology before asking for help."}, {"id": "carousel", "type": "carousel", "stage": "matter", "title": "A little prep for a first dental visit", "slides": [{"heading": "Start with one question", "body": "What's the thing you most want to ask? Put it in your phone before you forget."}, {"heading": "Note what you've noticed", "body": "If something feels different, jot down when it happens and how long it's been going on."}, {"heading": "Make room for nerves", "body": "Yours or your child's. \u201cWe're feeling nervous\u201d is useful information to share."}, {"heading": "Ask about the practical stuff", "body": "Check what to bring, how much time to allow, and how costs and coverage are handled."}, {"heading": "Leave room for answers", "body": "Before you go, ask what the next step is. It's okay to ask for an explanation again."}], "caption": "A first visit doesn't need a perfect checklist. These five prompts can help you decide what to ask.", "cta": "Share with someone planning a family dental visit.", "strategy": "Offers useful preparation without promising a particular treatment or outcome."}, {"id": "linkedin", "type": "linkedin", "stage": "matter", "title": "A dental appointment starts before the calendar invite", "body": "Booking a family dental visit can mean opening three calendars, checking a school pickup time, and remembering a question you meant to ask last month.\n\nThat's the everyday context behind this fictional Bright Harbor Dental campaign in Burbank. The invitation isn't to become an expert in dental care before calling. It's to bring the question you already have.\n\n\u201cHow long should we set aside?\u201d \u201cWhat should we bring?\u201d \u201cCan I tell you what made the last visit difficult?\u201d\n\nFor busy families and local professionals, clear next steps matter. A good place to begin is making those practical questions part of the conversation\u2014not something people feel they should already know.", "caption": "", "cta": "Start with your scheduling and first-visit questions.", "strategy": "Connects with local professionals through the practical work of coordinating family care."}, {"id": "youtube", "type": "youtube", "stage": "invite", "title": "What to ask before your family's first dental visit", "thumbnailText": "START WITH ONE QUESTION", "body": "Open on a kitchen counter: a school calendar, a water bottle, and a phone with one unfinished note. \u201cYou've remembered everyone else's appointments. Now you're thinking about the dentist.\u201d Cut to someone typing: \u201cWhat should we bring?\u201d \u201cHow long should we allow?\u201d \u201cWhat if my child feels nervous?\u201d Show each question on screen with a pause to read it. \u201cYou don't need to have this all figured out before you call.\u201d Close on a Bright Harbor Dental (example) title card: \u201cFamily dentistry in Burbank. Bring your questions. Even the little ones.\u201d", "caption": "", "cta": "Contact Bright Harbor Dental (example) to ask about a first visit.", "strategy": "Uses a familiar home setting and practical prompts to make the first conversation easier to picture."}, {"id": "extra", "type": "extra", "stage": "invite", "title": "Welcome email: bring your questions", "body": "Subject: That question in your phone? Bring it along.\n\nThanks for reaching out to Bright Harbor Dental (example) in Burbank.\n\nWhether you're looking for a family dentist, planning a child's first visit, or returning to dental care yourself, you can start with what's on your mind.\n\nBefore scheduling, ask about appointment length, what to bring, and costs or coverage. If you're feeling nervous, you're welcome to say that, too.\n\nNo need to find the perfect words. \u201cI'd like to plan a first visit\u201d is plenty to get the conversation started.", "caption": "", "cta": "Reply to ask about scheduling your first visit.", "strategy": "Gives an interested family a simple next step without discounts, pressure, or treatment promises."}]} },
];
export function pickExample(text: string) {
  return exampleLibrary.find((e) => e.match.test(text)) ?? exampleLibrary[0];
}
