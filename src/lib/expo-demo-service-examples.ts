import type { DemoCampaign, GuestBrief } from "./expo-demo-types";

/** Prepared fictional campaigns. Their brief assumptions are not researched business facts. */
export const serviceExamples = [
  {
    key: "fitness",
    label: "Fitness studio",
    match: /fitness|gym|strength|pilates|yoga|workout|personal train/i,
    brief: {
      businessName: "Common Ground Strength (example)",
      offer: "Small-group strength classes with a coach-led introductory visit",
      location: "Long Beach, CA",
      audience: "Adults returning to exercise who want to understand a class before joining",
      goal: "Start conversations about an introductory visit",
      voice: "Encouraging, specific, quietly funny; no transformation promises",
      facts: [
        {
          text: "Fictional example business; no real customer stories or measured results.",
          source: "assumed",
        },
        {
          text: "Brief assumption: the studio operates in Long Beach and offers small-group strength classes.",
          source: "assumed",
        },
        {
          text: "Brief assumption: an introductory visit includes meeting a coach and seeing the room before participating.",
          source: "assumed",
        },
        {
          text: "Brief assumption: the audience is returning to exercise and values knowing what to expect.",
          source: "assumed",
        },
        {
          text: "Brief assumption: guests can ask about class pace and movement options before booking; availability is confirmed individually.",
          source: "assumed",
        },
      ],
    },
    campaign: {
      headline: "Your first rep is walking through the door.",
      centralIdea:
        "Show the ordinary details of a first visit so an unfamiliar room feels easier to enter.",
      audience: "Long Beach adults thinking about returning to a strength class.",
      goal: "Encourage a low-pressure conversation about an introductory visit.",
      artifacts: [
        {
          id: "fitness-instagram",
          type: "instagram",
          stage: "stop",
          title: "You don't have to arrive knowing the room",
          caption:
            "Which door? Where does the bag go? Is that machine meant to look like that? Your first questions probably aren't about personal records. At Common Ground Strength, an introductory visit starts with a coach, a look around and a conversation about what you're looking for. Bring your questions. The extremely elaborate workout playlist can wait.",
          cta: "Ask us what an introductory visit looks like.",
          strategy:
            "Names the small uncertainties that keep a curious first-time guest from taking the next step.",
        },
        {
          id: "fitness-reel",
          type: "reel",
          stage: "stop",
          title: "The first 30 seconds, before the first rep",
          hook: "Here's the part of joining a gym that the workout videos skip.",
          beats: [
            {
              visual:
                "0–4s: locked-off shot outside the entrance; a hand reaches for the handle, then pauses. Keep street sound audible.",
              voice: "The first rep? Sometimes it's opening the door.",
              onScreen: "Your first visit, before the workout",
            },
            {
              visual:
                "4–8s: follow from shoulder height as a coach waves hello. Leave space for captions above the handshake.",
              voice: "First, you meet an actual person.",
              onScreen: "Meet your coach",
            },
            {
              visual:
                "8–12s: close-up of a bag placed in a cubby, then pan to the water station. No rapid cuts.",
              voice: "Then, the important tour: bag here. Water there.",
              onScreen: "The little details count",
            },
            {
              visual:
                "12–17s: medium two-shot at the edge of an empty training area; coach listens while guest gestures.",
              voice: "Tell us what brings you in, and what you'd like to ask.",
              onScreen: "Questions welcome",
            },
            {
              visual:
                "17–23s: coach demonstrates setting down a light dumbbell; guest watches. Film the explanation, not an exertion montage.",
              voice: "We can talk through the class and the options before you decide.",
              onScreen: "Understand the class first",
            },
            {
              visual:
                "23–28s: wide shot of the entrance from inside, ending on a clean brand card. Hold the final frame for two seconds.",
              voice: "Common Ground Strength, Long Beach. Start with a visit.",
              onScreen: "Ask about an introductory visit",
            },
          ],
          caption: "A first visit should come with directions, not a confidence test.",
          cta: "Send us the question you've been hesitating to ask.",
          strategy:
            "Makes the experience visible in sequence and gives the audience a specific, approachable next action.",
        },
        {
          id: "fitness-carousel",
          type: "carousel",
          stage: "matter",
          title: "Five questions to ask before your first class",
          slides: [
            {
              heading: "Before the workout, ask this",
              body: "You can learn about a class before deciding whether it's your class.",
            },
            {
              heading: "What happens when I arrive?",
              body: "Ask where to check in, what to bring and whether you should arrive early.",
            },
            {
              heading: "How is the class organized?",
              body: "Find out how long it lasts, how instructions are given and how the coach supports the group.",
            },
            {
              heading: "Can we discuss movement options?",
              body: "Share relevant questions with the coach ahead of time. A class description can't answer every individual concern.",
            },
            {
              heading: "What does a first visit cost?",
              body: "Ask for the current price, booking terms and what is included before making a commitment.",
            },
            {
              heading: "Can I see the space first?",
              body: "At Common Ground, ask about a coach-led introductory visit. We'll confirm the details with you.",
            },
          ],
          caption:
            "Save these questions for the next class you're curious about. Being new isn't a problem to solve before you arrive.",
          cta: "Ask about a first visit in Long Beach.",
          strategy:
            "Offers a practical decision checklist instead of promising a physical outcome.",
        },
        {
          id: "fitness-linkedin",
          type: "linkedin",
          stage: "matter",
          title: "The onboarding starts at the front door",
          body: "A first fitness class has an onboarding problem before it has a workout problem.\n\nA new guest is trying to decode the room: where to put a bag, when to ask a question, whether everyone else already knows the routine. A highlight reel of confident regulars doesn't answer any of that.\n\nFor Common Ground Strength, the invitation is deliberately practical: meet a coach, see the space and talk through what a class involves. The small details belong in the welcome, not in an unwritten rulebook.\n\nIf you're considering a return to exercise in Long Beach, start with the questions that would help you decide. You don't need to perform confidence to ask them.",
          caption: "",
          cta: "Ask what to expect from an introductory visit.",
          strategy:
            "Connects the service to an onboarding challenge professionals recognize, without inventing customer results.",
        },
        {
          id: "fitness-youtube",
          type: "youtube",
          stage: "invite",
          title: "Tour your first visit before you book it",
          thumbnailText: "BEFORE YOUR FIRST REP",
          body: "Film a two-minute walk-through at a relaxed walking pace. Open outside: 'Let's take the mystery out of your first visit.' Follow the actual guest path from entrance to check-in, cubbies and training floor. Pause at each location long enough to explain its purpose. Have the coach answer three questions on camera: what to bring, how the class is organized and how to ask about movement options. End with the booking process and a reminder that visit details are confirmed individually. Use captions and clear room sound; skip the intense music montage.",
          caption: "Get familiar with the room before you step into it.",
          cta: "Ask about an introductory visit at Common Ground Strength.",
          strategy:
            "Provides a longer preview for someone who is interested but wants practical reassurance before booking.",
        },
        {
          id: "fitness-extra",
          type: "extra",
          stage: "invite",
          title: "First-visit checklist card",
          body: "YOUR FIRST VISIT\n\nBefore you leave home, confirm your visit time and ask what to bring. Save the studio's arrival instructions. Write down one question about the class and one thing you'd like the coach to know.\n\nWhen you arrive, start at check-in. We'll show you where to put your things and talk through the room. You can ask about the class before deciding on your next step.\n\nCommon Ground Strength · Long Beach",
          caption: "A practical card to send with a confirmed introductory visit.",
          cta: "Reply with any arrival questions before your visit.",
          strategy: "Turns interest into a prepared first visit with a useful, reusable handout.",
        },
      ],
    },
  },
  {
    key: "realestate",
    label: "Real estate",
    match: /real\s?estate|realtor|realty|property|home buy|home sell|listing/i,
    brief: {
      businessName: "Frame & Field Real Estate (example)",
      offer: "Buyer consultations and guided home tours",
      location: "Pasadena, CA",
      audience: "Prospective buyers who want a clearer way to evaluate homes",
      goal: "Book an initial buyer conversation about priorities and next steps",
      voice: "Observant, grounded and helpful; no urgency theater",
      facts: [
        {
          text: "Fictional example business; no actual listings, client testimonials or market-performance claims.",
          source: "assumed",
        },
        {
          text: "Brief assumption: the business serves prospective home buyers in Pasadena.",
          source: "assumed",
        },
        {
          text: "Brief assumption: its introductory buyer conversation organizes needs, questions and the touring process.",
          source: "assumed",
        },
        {
          text: "Brief assumption: guided tours include time for buyers to record observations and follow-up questions.",
          source: "assumed",
        },
        {
          text: "Brief assumption: the campaign uses a staged interior, with permission, rather than advertising a property for sale.",
          source: "assumed",
        },
      ],
    },
    campaign: {
      headline: "Tour the Tuesday, not just the kitchen.",
      centralIdea:
        "Help buyers picture their everyday routines and capture useful questions beyond a home's most photogenic room.",
      audience: "Prospective buyers preparing for home tours in Pasadena.",
      goal: "Start a buyer conversation built around practical priorities.",
      artifacts: [
        {
          id: "realestate-instagram",
          type: "instagram",
          stage: "stop",
          title: "The kitchen is beautiful. Where do the shoes go?",
          caption:
            "A beautiful kitchen gets your attention. An ordinary Tuesday asks different questions. Where do you put the groceries? Can your desk fit where you need it? What would you want to measure before coming back? On your next tour, take one photo that explains the room and one note that captures a question. Frame & Field helps you turn the walk-through into a useful conversation.",
          cta: "Ask about a buyer conversation before your next tour.",
          strategy:
            "Pairs an arresting contrast with practical observations, without making claims about any actual property.",
        },
        {
          id: "realestate-reel",
          type: "reel",
          stage: "stop",
          title: "Tour a normal Tuesday in 30 seconds",
          hook: "The listing photos don't show where you'll drop your keys.",
          beats: [
            {
              visual:
                "0–4s: tight shot of a staged kitchen island; pull focus from a vase to a grocery bag entering frame.",
              voice: "The kitchen photographs beautifully. Now bring Tuesday into the picture.",
              onScreen: "Tour the Tuesday",
            },
            {
              visual:
                "4–8s: handheld eye-level approach through the entrance; actor sets keys on a small table.",
              voice: "Where would the keys, shoes and everyday things go?",
              onScreen: "1. Arrival",
            },
            {
              visual:
                "8–13s: wide doorway shot as actor carries two grocery bags toward the kitchen; show the route without implying a defect.",
              voice: "Walk the route you would actually use.",
              onScreen: "2. Everyday routes",
            },
            {
              visual:
                "13–18s: overhead close-up of a tape measure beside a notebook marked 'desk dimensions.'",
              voice: "Measure what matters to you. Don't let a wide-angle lens decide.",
              onScreen: "3. Your measurements",
            },
            {
              visual:
                "18–23s: close-up of three written notes: 'liked,' 'question,' 'check later.' Hold each in focus.",
              voice: "Separate what you noticed from what still needs an answer.",
              onScreen: "4. Capture questions",
            },
            {
              visual:
                "23–28s: agent and buyer at a plain table reviewing the notes; end on a brand card labelled 'illustrative tour.'",
              voice: "Frame & Field, Pasadena. Let's plan a more useful tour.",
              onScreen: "Start with a buyer conversation",
            },
          ],
          caption:
            "An illustrative tour, with practical questions you can take to your next showing.",
          cta: "Save this before your next home tour.",
          strategy:
            "Makes evaluation concrete and creates a repeatable lens for subsequent property visits.",
        },
        {
          id: "realestate-carousel",
          type: "carousel",
          stage: "matter",
          title: "The five-line home tour note",
          slides: [
            {
              heading: "A better note than 'loved it'",
              body: "Use the same five prompts after each tour so the details don't blur together.",
            },
            {
              heading: "One thing that fits my routine",
              body: "Name the practical reason, not just the feature. Example: an entry spot for the things you carry each day.",
            },
            {
              heading: "One measurement to confirm",
              body: "Capture the dimension you need to check against your furniture or planned use.",
            },
            {
              heading: "One unanswered question",
              body: "Write the question clearly and ask who can provide a reliable answer. Don't turn an impression into a fact.",
            },
            {
              heading: "One trade-off to discuss",
              body: "What would you be accepting, and how important is it relative to your priorities?",
            },
            {
              heading: "One next step",
              body: "Review the notes, request more information or arrange another visit. Ask Frame & Field to help organize the conversation.",
            },
          ],
          caption:
            "The best tour note is the one you can still understand after the fourth front door.",
          cta: "Save these prompts for your next showing.",
          strategy:
            "Gives buyers a neutral comparison tool and a natural reason to speak with an agent.",
        },
        {
          id: "realestate-linkedin",
          type: "linkedin",
          stage: "matter",
          title: "A home tour is an information-gathering meeting",
          body: "The most photogenic room can dominate the memory of a home tour. The practical questions often surface later, somewhere between the drive home and putting the groceries away.\n\nThat is why Frame & Field's starting point is the buyer's ordinary routine: what needs a place, what needs measuring and which questions need a reliable answer.\n\nA useful tour note separates three things: what you observed, what you liked and what you still need to verify. That distinction keeps an impression from becoming an assumption.\n\nIf you're preparing to tour homes in Pasadena, write down your priorities before opening another listing. Bring those notes to a buyer conversation. They give the next visit a much clearer purpose.",
          caption: "",
          cta: "Start a conversation about your priorities for a home tour.",
          strategy:
            "Shows a thoughtful process for making a consequential choice, without forecasts or invented success stories.",
        },
        {
          id: "realestate-youtube",
          type: "youtube",
          stage: "invite",
          title: "How to remember what matters after a home tour",
          thumbnailText: "TOUR THE TUESDAY",
          body: "Create a three-minute demonstration in a staged interior, clearly labelled 'illustrative tour.' Open with two nearly identical phone photos and ask: 'What would help you remember which room actually worked for you?' Walk through the five-line note: routine, measurement, unanswered question, trade-off and next step. Show a close-up of each note being written. Explain that visual impressions are not a substitute for verifying property information with the appropriate professionals. End at a table with the completed notes and invite viewers to bring their own priorities to an initial buyer conversation.",
          caption: "A practical way to leave a showing with better notes.",
          cta: "Ask Frame & Field about a buyer consultation.",
          strategy:
            "Demonstrates the agent's process while keeping the example separate from a live property advertisement.",
        },
        {
          id: "realestate-extra",
          type: "extra",
          stage: "invite",
          title: "Pocket home-tour worksheet",
          body: "AFTER THE FRONT DOOR\n\nProperty or visit reference: __________\nOne detail that fits my routine: __________\nOne measurement to confirm: __________\nOne question that still needs an answer: __________\nOne trade-off to discuss: __________\nMy next step: __________\n\nComplete this before the next showing, while the rooms are still distinct in your mind. Keep observations separate from assumptions, and bring unanswered questions to your agent.\n\nFrame & Field Real Estate · Pasadena",
          caption: "A take-along worksheet for each showing.",
          cta: "Bring your completed notes to a buyer conversation.",
          strategy:
            "Leaves the buyer with a useful tool that reinforces the campaign's central idea at the moment it matters.",
        },
      ],
    },
  },
  {
    key: "consulting",
    label: "Consulting",
    match: /consult|coach|business advis|operation|strategy|fractional/i,
    brief: {
      businessName: "Clear Current Operations (example)",
      offer: "Workflow-mapping workshops for small service businesses",
      location: "Los Angeles, CA",
      audience: "Owners whose client handoffs rely on reminders and scattered messages",
      goal: "Invite owners to discuss one recurring handoff that needs clarity",
      voice: "Direct, thoughtful and lightly wry; practical before polished",
      facts: [
        {
          text: "Fictional example business; no real client stories, testimonials or quantified productivity claims.",
          source: "assumed",
        },
        {
          text: "Brief assumption: the consultant supports small service businesses in Los Angeles.",
          source: "assumed",
        },
        {
          text: "Brief assumption: the workshop maps one process using its trigger, owner, next step and completion signal.",
          source: "assumed",
        },
        {
          text: "Brief assumption: prospects can discuss a recurring handoff before deciding whether to book a workshop.",
          source: "assumed",
        },
        {
          text: "Brief assumption: workshop examples use invented records and never expose client information.",
          source: "assumed",
        },
      ],
    },
    campaign: {
      headline: "If the process is 'ask Alex,' let's draw it.",
      centralIdea:
        "Make an invisible handoff visible before reaching for another tool or automation.",
      audience: "Small service-business owners coordinating client work across people and tools.",
      goal: "Start a specific conversation about one process worth mapping.",
      artifacts: [
        {
          id: "consulting-instagram",
          type: "instagram",
          stage: "stop",
          title: "Alex is not a workflow",
          caption:
            "'Ask Alex' is a helpful answer until Alex is on a call, on vacation or asking you. Pick one recurring handoff: a signed proposal, a new inquiry, a project ready for review. Write down what starts it, who owns the next step and how everyone knows it's done. Clear Current helps small teams draw the process they've been carrying in their heads.",
          cta: "Tell us which handoff keeps needing a reminder.",
          strategy:
            "Uses a recognizable operational joke to introduce a concrete, small-scope service.",
        },
        {
          id: "consulting-reel",
          type: "reel",
          stage: "stop",
          title: "Your process, in four sticky notes",
          hook: "Before you buy another app, try four sticky notes.",
          beats: [
            {
              visual:
                "0–4s: overhead shot of a laptop beside a blank notebook; hand closes a screen full of generic, fabricated tabs.",
              voice: "Another app won't tell your team who goes next.",
              onScreen: "Start with the handoff",
            },
            {
              visual:
                "4–8s: hand places a yellow note reading 'Proposal signed' on a clean desk. Keep the camera overhead.",
              voice: "First: what starts the process?",
              onScreen: "1. Trigger",
            },
            {
              visual:
                "8–12s: a blue note marked 'Project coordinator' is placed beside it; draw a simple arrow.",
              voice: "Second: who owns the next step? Name the role.",
              onScreen: "2. Owner",
            },
            {
              visual:
                "12–17s: pink note reads 'Send kickoff choices'; finger points to the verb. Pause for readability.",
              voice: "Third: what do they actually do? Make it an action.",
              onScreen: "3. Next action",
            },
            {
              visual:
                "17–22s: green note reads 'Kickoff confirmed in project record'; widen to reveal the whole sequence.",
              voice: "Fourth: how can the team tell it's done?",
              onScreen: "4. Completion signal",
            },
            {
              visual:
                "22–28s: medium shot of consultant beside the four-note map; end with a still brand card.",
              voice: "Clear Current Operations. Bring us the handoff that keeps coming back.",
              onScreen: "One process. A clearer next step.",
            },
          ],
          caption: "A fictional client handoff, mapped without a software shopping trip.",
          cta: "Try this with one recurring task, then tell us where it gets unclear.",
          strategy:
            "Demonstrates the method on screen so the expertise is visible rather than merely claimed.",
        },
        {
          id: "consulting-carousel",
          type: "carousel",
          stage: "matter",
          title: "Map the handoff before you automate it",
          slides: [
            {
              heading: "Which handoff keeps returning?",
              body: "Pick one recurring moment. 'Our whole operation' is too large for the first map.",
            },
            {
              heading: "Name the trigger",
              body: "What exactly starts the work? Example: a signed proposal, not 'when the client is ready.'",
            },
            {
              heading: "Name the owner",
              body: "Choose a role responsible for the next action. A group chat is a location, not an owner.",
            },
            {
              heading: "Make the action observable",
              body: "'Prepare for kickoff' is vague. 'Send the client three kickoff times' can be checked.",
            },
            {
              heading: "Define done",
              body: "Where is completion recorded, and who needs to see it? Agree on the signal before adding automation.",
            },
            {
              heading: "Walk one example through",
              body: "Use an invented client record. Notice missing decisions and exceptions. Bring those questions to a mapping workshop.",
            },
          ],
          caption: "Automation needs a clear handoff to automate. Start with these six prompts.",
          cta: "Save this for your next operations conversation.",
          strategy:
            "Creates a useful mini-workshop and lets the reader identify the gap that the service can help address.",
        },
        {
          id: "consulting-linkedin",
          type: "linkedin",
          stage: "matter",
          title: "A group chat is not an owner",
          body: "A task can be visible to six people and owned by nobody.\n\nThat is the gap worth examining when a client handoff keeps generating reminders. The question isn't immediately which software to buy. It is what starts the work, who owns the next action and what tells everyone else the action is complete.\n\nAt Clear Current Operations, a workflow-mapping conversation starts with one recurring moment. A signed proposal. A review request. A project ready to close. We draw the steps and make the unanswered decisions visible.\n\nBefore your next operations meeting, choose the handoff that keeps coming back to you. Bring a fictionalized example, with client details removed. A specific starting point gives the conversation somewhere useful to go.",
          caption: "",
          cta: "Tell us which recurring handoff your team would like to map.",
          strategy:
            "Demonstrates a diagnostic perspective and invites a concrete inquiry instead of a vague discovery call.",
        },
        {
          id: "consulting-youtube",
          type: "youtube",
          stage: "invite",
          title: "Map a client kickoff without opening another app",
          thumbnailText: "WHO GOES NEXT?",
          body: "Film a four-minute desk demonstration with an overhead camera and a second medium-angle shot. Use a clearly fictional signed-proposal example. Build the four-note map in real time: trigger, owner, next action, completion signal. Then add an exception: the client doesn't respond. Ask who notices and what happens next; show why that decision belongs on the map. End by walking the invented project through from start to finish. Invite viewers to choose one handoff for a conversation with Clear Current. Do not claim the exercise saves a measured amount of time.",
          caption: "One practical process, drawn where everyone can see it.",
          cta: "Ask about a workflow-mapping workshop.",
          strategy:
            "Shows enough of the service to help a prospect recognize whether their problem fits.",
        },
        {
          id: "consulting-extra",
          type: "extra",
          stage: "invite",
          title: "One-handoff meeting worksheet",
          body: "BRING ONE HANDOFF\n\nThe recurring moment: __________\nWhat starts it: __________\nWho owns the next action: __________\nThe action, written as a verb: __________\nWhere completion is recorded: __________\nWhat happens if the next step stalls: __________\n\nUse a fictionalized example with client details removed. Walk it through together before discussing tools. Circle any answer the team interprets differently; that is a useful place to begin.\n\nClear Current Operations · Los Angeles",
          caption: "A printable worksheet for the next team meeting.",
          cta: "Bring your marked-up worksheet to a mapping conversation.",
          strategy:
            "Makes the service tangible and gives the prospect a useful artifact before any purchase decision.",
        },
      ],
    },
  },
  {
    key: "bookkeeping",
    label: "Bookkeeping",
    match: /bookkeep|accountan|accounting|tax|finance|payroll/i,
    brief: {
      businessName: "Cedar Ledger Bookkeeping (example)",
      offer:
        "Monthly bookkeeping support and document-organization conversations for small service businesses",
      location: "Burbank, CA",
      audience: "Owners collecting business records across inboxes, apps and paper piles",
      goal: "Encourage an initial conversation about the owner's current bookkeeping process",
      voice: "Calm, precise and approachable; no judgment or financial promises",
      facts: [
        {
          text: "Fictional example business; no real client records, testimonials or financial results.",
          source: "assumed",
        },
        {
          text: "Brief assumption: the business offers monthly bookkeeping support to service businesses in Burbank.",
          source: "assumed",
        },
        {
          text: "Brief assumption: initial conversations identify where records live and which process questions need attention.",
          source: "assumed",
        },
        {
          text: "Brief assumption: any document exchange follows a separately agreed secure process; social messages are for scheduling only.",
          source: "assumed",
        },
        {
          text: "Brief assumption: the campaign gives organizational prompts, not tax, investment or accounting determinations.",
          source: "assumed",
        },
      ],
    },
    campaign: {
      headline: "Your receipts need a home. Not another pile.",
      centralIdea:
        "Start with where business records live, so the first bookkeeping conversation has a clear and manageable purpose.",
      audience:
        "Small service-business owners in Burbank with records spread across everyday tools.",
      goal: "Start an initial conversation about record organization and monthly bookkeeping support.",
      artifacts: [
        {
          id: "bookkeeping-instagram",
          type: "instagram",
          stage: "stop",
          title: "Three inboxes and the passenger seat",
          caption:
            "Your business records may currently live in an email folder, an app and the passenger seat. Let's start with the map, not the guilt. Write down where statements, invoices and receipts arrive. Then note what you can find easily and what keeps going missing. Cedar Ledger helps service-business owners begin a clearer conversation about their monthly bookkeeping process.",
          cta: "Ask about an introductory bookkeeping conversation.",
          strategy:
            "Recognizes a common organizational problem without shaming the owner or promising a financial result.",
        },
        {
          id: "bookkeeping-reel",
          type: "reel",
          stage: "stop",
          title: "Where did that receipt go?",
          hook: "Your records don't need a treasure hunt.",
          beats: [
            {
              visual:
                "0–4s: close-up of a hand lifting a coffee cup to reveal a fictional receipt marked 'DEMO.' Keep all numbers invented.",
              voice: "If finding a receipt involves moving furniture, start here.",
              onScreen: "Start with where records live",
            },
            {
              visual:
                "4–8s: overhead shot of three cards labelled 'Inbox,' 'App,' and 'Paper.' Place them in a row.",
              voice: "List the places your business records arrive.",
              onScreen: "1. List the locations",
            },
            {
              visual:
                "8–13s: place sample cards reading 'Statements,' 'Invoices,' and 'Receipts' beneath those locations.",
              voice: "Note which kinds of records are in each place.",
              onScreen: "2. Name the records",
            },
            {
              visual:
                "13–18s: hand writes a question mark beside one blank card. No real financial screens visible.",
              voice: "Mark the gap you're not sure how to handle. It's a question, not a verdict.",
              onScreen: "3. Capture the questions",
            },
            {
              visual:
                "18–23s: close notebook before opening a simple scheduling screen with no personal data.",
              voice: "Use your first message to arrange a conversation, not send account details.",
              onScreen: "Scheduling first. Documents later.",
            },
            {
              visual:
                "23–28s: tidy tabletop with the three cards; hold a Cedar Ledger title card for the final two seconds.",
              voice: "Cedar Ledger, Burbank. Let's start with the map.",
              onScreen: "Ask about monthly bookkeeping support",
            },
          ],
          caption:
            "A record-location exercise using fictional documents. Start small and ask the next useful question.",
          cta: "Save this for your next admin hour.",
          strategy:
            "Gives a manageable first action while keeping sensitive information out of a public-channel response.",
        },
        {
          id: "bookkeeping-carousel",
          type: "carousel",
          stage: "matter",
          title: "Make your first bookkeeping conversation useful",
          slides: [
            {
              heading: "Start with the map",
              body: "Before gathering every file, write down where your business records currently live.",
            },
            {
              heading: "List the tools",
              body: "Which invoicing tools, record folders and business-account portals do you use? Note names without sharing login details.",
            },
            {
              heading: "Name the recurring snag",
              body: "Is it finding documents, knowing what was paid or understanding the monthly process? Describe the question in plain words.",
            },
            {
              heading: "Note the last completed period",
              body: "If you know which month was last reviewed, bring that context. If you don't, write 'not sure.'",
            },
            {
              heading: "Agree on document sharing",
              body: "Ask what is needed and how to share it securely. Keep account details and documents out of social messages.",
            },
            {
              heading: "Choose the next conversation",
              body: "Cedar Ledger can discuss your current process and whether monthly bookkeeping support fits your needs.",
            },
          ],
          caption:
            "Useful preparation doesn't require having everything perfectly organized already.",
          cta: "Save the prompts, then ask about an introductory conversation.",
          strategy:
            "Clarifies the service-entry process and avoids turning general content into individualized financial advice.",
        },
        {
          id: "bookkeeping-linkedin",
          type: "linkedin",
          stage: "matter",
          title: "The first question is often 'where is it?'",
          body: "For a small service business, bookkeeping preparation can begin with a very ordinary question: where do the records live?\n\nAn invoice may be in one app, its payment confirmation in an inbox and a supporting receipt in a paper folder. Before the next conversation, a simple list of those locations can be more useful than another hour of searching without a plan.\n\nCedar Ledger's starting point is to understand the current process: the tools you use, the period you're working on and the recurring questions that slow you down.\n\nYou don't need to send financial documents in a social message. Start by arranging a conversation. Then agree on what information is needed and a secure way to share it.",
          caption: "",
          cta: "Ask about monthly bookkeeping support for your service business.",
          strategy:
            "Explains a clear first step for busy owners without implying unverified savings, compliance or financial outcomes.",
        },
        {
          id: "bookkeeping-youtube",
          type: "youtube",
          stage: "invite",
          title: "Build a record-location map before your bookkeeping call",
          thumbnailText: "WHERE DO YOUR RECORDS LIVE?",
          body: "Make a three-minute overhead desk tutorial with invented sample documents labelled 'DEMO.' Draw three columns: record type, current location and question. Add statements, invoices and receipts as examples without advising on retention or tax treatment. Demonstrate how 'not sure where this is' becomes a useful question for the first conversation. Cut to the presenter to explain what the introductory call covers and how document-sharing instructions are agreed separately. Close on the finished map and invite the viewer to make one for their own business.",
          caption:
            "A small organizational exercise with a clear purpose for your next conversation.",
          cta: "Arrange an introductory conversation with Cedar Ledger.",
          strategy:
            "Shows the preparation method in context, creating a concrete bridge from education to inquiry.",
        },
        {
          id: "bookkeeping-extra",
          type: "extra",
          stage: "invite",
          title: "Before-your-call preparation card",
          body: "BRING THE MAP, NOT THE PASSWORDS\n\nWrite down the tools you use for invoices and business records. Note where statements and receipts arrive. Add the month you last reviewed, if you know it, and one recurring question you'd like to discuss.\n\nUse your first message to arrange a conversation. We'll agree on which documents are needed and how to share them securely. Keep login details and account information out of social messages.\n\nCedar Ledger Bookkeeping · Burbank",
          caption: "A preparation card to include with an introductory call confirmation.",
          cta: "Bring your notes to the conversation.",
          strategy:
            "Helps a prospect arrive prepared and gives a useful boundary for sharing sensitive records.",
        },
      ],
    },
  },
] satisfies Array<{
  key: string;
  label: string;
  match: RegExp;
  brief: GuestBrief;
  campaign: DemoCampaign;
}>;
