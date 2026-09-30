import type { DemoCampaign, GuestBrief } from "./expo-demo-types";

/** Prepared fictional campaigns. Brief facts are example assumptions, not researched claims. */
export const communityExamples = [
  {
    key: "restaurant",
    label: "Restaurant",
    match: /restaurant|bistro|dinner|dining|cater|chef|pizza|taco/i,
    brief: {
      businessName: "Sunday Table (example)",
      offer: "Neighborhood restaurant serving a rotating family-style supper menu",
      location: "Long Beach, CA",
      audience: "Local friends who keep saying they should get dinner together",
      goal: "Encourage groups of four to request a Tuesday or Wednesday dinner reservation",
      voice: "Generous, conversational, lightly teasing",
      facts: [
        {
          text: "Fictional restaurant; all menu and service details are prepared example assumptions",
          source: "assumed",
        },
        { text: "Family-style supper is served Tuesday and Wednesday evenings", source: "assumed" },
        {
          text: "The menu rotates; staff confirm current dishes, dietary questions and availability before booking",
          source: "assumed",
        },
        {
          text: "The campaign targets groups of four and requests reservations rather than promising open tables",
          source: "assumed",
        },
      ],
    },
    campaign: {
      headline: "The group chat deserves a table.",
      centralIdea:
        "Turn an endlessly postponed dinner into one small decision: choose a night and bring the people.",
      audience: "Long Beach friends whose plans never make it out of the group chat.",
      goal: "Prompt Tuesday and Wednesday reservation inquiries for four people.",
      artifacts: [
        {
          id: "ig",
          type: "instagram",
          stage: "stop",
          title: "Someone has to send the invite",
          caption:
            "‘We should get dinner soon’ is now old enough to order its own dinner. Send the date. Pick four chairs. We'll bring the food to the middle of the table. Tuesday and Wednesday supper at Sunday Table is made for passing plates, stealing the last bite and finally hearing the story that was too long to type. Long Beach friends: this is your nudge.",
          cta: "Send this to the group, then ask us for a table for four.",
          strategy:
            "A recognizable social frustration makes the restaurant a reason to reconnect, with a specific booking action.",
        },
        {
          id: "reel",
          type: "reel",
          stage: "stop",
          title: "From typing… to passing plates",
          hook: "Your group chat has discussed dinner for 47 business days.",
          beats: [
            {
              visual: "0–3s: Overhead phone shot with a staged group message: ‘Dinner soon?’",
              voice: "The plan has been in development for a while.",
              onScreen: "Dinner soon?",
            },
            {
              visual: "3–6s: Three staged replies arrive: ‘Yes!’ ‘Definitely.’ ‘Soon!’",
              voice: "Strong interest. No actual dinner.",
              onScreen: "Enthusiasm: 100%. Reservations: 0.",
            },
            {
              visual: "6–9s: A hand types ‘Wednesday. Four of us. Sunday Table?’",
              voice: "It only takes one person to pick a night.",
              onScreen: "Wednesday. Four chairs.",
            },
            {
              visual: "9–13s: A server places two sharing dishes between four place settings",
              voice: "We'll handle the middle of the table.",
              onScreen: "Pass the plates.",
            },
            {
              visual: "13–17s: Hands pass bread; cut to a friend laughing, with permission",
              voice: "You handle the story that needs the whole table.",
              onScreen: "Finish that story.",
            },
            {
              visual: "17–21s: Hold a clean menu card beside the final shared bite",
              voice: "Sunday Table. Tuesday and Wednesday supper in Long Beach.",
              onScreen: "Ask for your table for four.",
            },
          ],
          caption: "The dinner plan is allowed to become dinner. Send the invitation.",
          cta: "Ask about this week's supper menu and reservation availability.",
          strategy:
            "Moves from familiar phone behavior to an appetizing shared moment; the joke sets up a real next step.",
        },
        {
          id: "carousel",
          type: "carousel",
          stage: "matter",
          title: "How to get four people to dinner",
          slides: [
            {
              heading: "Make ‘soon’ a date",
              body: "A tiny guide to getting the group chat out of the group chat.",
            },
            {
              heading: "Offer two nights",
              body: "‘Tuesday or Wednesday?’ is easier to answer than ‘When is everyone free?’",
            },
            {
              heading: "Count the chairs",
              body: "Get a real head count before requesting the reservation. Start with the four who can make it.",
            },
            {
              heading: "Ask the food question early",
              body: "Share dietary needs with the restaurant before booking. The supper menu changes.",
            },
            {
              heading: "Send one clear plan",
              body: "Restaurant, confirmed date, time and who's coming. Then stop negotiating dinner.",
            },
            {
              heading: "Leave the best story for the table",
              body: "Sunday Table • Long Beach. Ask about Tuesday and Wednesday supper.",
            },
          ],
          caption: "Save this. You are now the friend who actually makes the plan.",
          cta: "Share the guide and choose your two possible nights.",
          strategy:
            "A useful planning tool lowers the coordination cost that keeps a group from booking.",
        },
        {
          id: "linkedin",
          type: "linkedin",
          stage: "matter",
          title: "The meeting with no agenda",
          body: "A calendar can be full and a week can still feel short on actual conversation.\n\nThat is the thought behind Tuesday and Wednesday supper at Sunday Table: a meal served in the middle, four chairs and enough room for a conversation to go somewhere.\n\nNo networking prompt. No ‘quick catch-up’ that turns into another meeting. Just the colleague who became a friend, the neighbor you keep meaning to invite, or the people who have watched you build something and deserve more than a thumbs-up reaction.\n\nPick a night before another week fills itself. We'll help with the food. You bring the people.",
          caption: "",
          cta: "Ask about a midweek table for four in Long Beach.",
          strategy:
            "Connects hospitality to the lived experience of busy professionals without pretending to have customer results.",
        },
        {
          id: "youtube",
          type: "youtube",
          stage: "invite",
          title: "What makes a meal feel like a night out?",
          thumbnailText: "FOUR CHAIRS. ONE PLAN.",
          body: "0:00 — Open on four empty chairs: ‘A good dinner starts before the food arrives.’ 0:08 — Show a staged message choosing Wednesday, then the reservation being confirmed. 0:20 — The chef plates that week's sharing dishes and explains why they belong in the center. 0:45 — Cut between serving spoons, passing plates and water being poured; leave space for natural sound. 1:05 — Show the last bite and four used napkins: ‘The best part was what happened around the food.’ 1:15 — End with Tuesday and Wednesday supper, Long Beach, and a reservation inquiry invitation. Film only the current menu; get permission from anyone identifiable.",
          caption: "A small film about making room for dinner together.",
          cta: "Ask for the current supper menu and a table for four.",
          strategy:
            "Shows the experience in sequence so prospective guests can picture their own evening.",
        },
        {
          id: "extra",
          type: "extra",
          stage: "invite",
          title: "Copy-and-send dinner invitation",
          body: "THE GROUP-CHAT INVITATION\n\n‘Can we turn “soon” into Wednesday? I'm thinking dinner for four at Sunday Table in Long Beach. They do family-style supper on Tuesdays and Wednesdays. Who's in? Send me any dietary needs before I ask about the menu and a table.’\n\nOnce the restaurant confirms, send:\n\n‘Booked: [confirmed date], [confirmed time], Sunday Table. [Names] are coming. Reservation is under [name]. See you at the table.’\n\nConfirm the booking before sending the second message.",
          caption: "",
          cta: "Copy the first message. Dinner needs a first mover.",
          strategy:
            "Gives the organizer the exact words needed to turn interest into a reservation request.",
        },
      ],
    },
  },
  {
    key: "retail",
    label: "Independent retail",
    match: /retail|shop|store|gift|ceramic|boutique|product|ecommerce|e-commerce/i,
    brief: {
      businessName: "Shelf Life Goods (example)",
      offer: "Independent shop selling functional ceramics and everyday home goods",
      location: "Silver Lake, Los Angeles",
      audience: "Locals seeking a thoughtful host gift they can choose in person",
      goal: "Bring shoppers into the store to build a practical host-gift pairing",
      voice: "Design-minded, observant, gently funny",
      facts: [
        {
          text: "Fictional shop; inventory and store details are prepared example assumptions",
          source: "assumed",
        },
        {
          text: "Example inventory includes ceramic mugs, small bowls and linen napkins; availability varies",
          source: "assumed",
        },
        {
          text: "Customers can ask staff to help pair a useful object with the recipient's daily routine",
          source: "assumed",
        },
        {
          text: "Care requirements vary by maker and must be checked on the individual product",
          source: "assumed",
        },
      ],
    },
    campaign: {
      headline: "For their actual life. Not their gift shelf.",
      centralIdea:
        "Choose a gift by the small ritual it will join, not how impressive it looks in the bag.",
      audience: "Silver Lake neighbors looking for a considered host gift.",
      goal: "Increase in-store visits for practical, personal gift pairings.",
      artifacts: [
        {
          id: "ig",
          type: "instagram",
          stage: "stop",
          title: "The mug they'll reach for on Tuesday",
          caption:
            "They don't need another thing to find a place for. They need the bowl that lives beside the stove. The napkin that turns toast into breakfast. The mug they reach for on a thoroughly ordinary Tuesday. At Shelf Life Goods, start with the person, then find the object. What do they make time for when nobody's coming over? That's your clue.",
          cta: "Bring us one detail about your host. We'll help you look.",
          strategy: "Reframes gifting around daily use instead of price or novelty.",
        },
        {
          id: "reel",
          type: "reel",
          stage: "stop",
          title: "A better question than ‘What do they like?’",
          hook: "Buy for their Tuesday, not their imaginary dinner party.",
          beats: [
            {
              visual: "0–3s: Gift bag sits untouched on a shelf; camera moves past it",
              voice: "Some gifts become shelf residents.",
              onScreen: "Nice. But where does it go?",
            },
            {
              visual: "3–6s: Hands make toast and unfold a linen napkin",
              voice: "Try asking what their morning looks like.",
              onScreen: "The slow breakfast person",
            },
            {
              visual: "6–9s: A small ceramic bowl catches keys by a doorway",
              voice: "Or what they can never find.",
              onScreen: "The ‘where are my keys?’ person",
            },
            {
              visual: "9–13s: Close-up of two differently shaped mug handles",
              voice: "Or how they hold that first cup of coffee.",
              onScreen: "The particular-about-mugs person",
            },
            {
              visual: "13–17s: Staff set two potential gifts side by side on a shop counter",
              voice: "One real detail makes a better starting point.",
              onScreen: "Tell us about their Tuesday.",
            },
            {
              visual: "17–21s: Tissue closes around a single chosen object",
              voice: "Shelf Life Goods. Gifts with somewhere to go.",
              onScreen: "Find us in Silver Lake.",
            },
          ],
          caption: "A thoughtful gift has a job in someone's day.",
          cta: "Visit with one detail about the person you're buying for.",
          strategy:
            "Demonstrates a gift-selection method through specific product uses rather than a product parade.",
        },
        {
          id: "carousel",
          type: "carousel",
          stage: "matter",
          title: "The useful host-gift test",
          slides: [
            {
              heading: "Will it earn its place?",
              body: "Five questions before you buy the host gift.",
            },
            {
              heading: "What do they actually do?",
              body: "Cook? Read? Make careful coffee? Choose a ritual you know exists.",
            },
            {
              heading: "Does it fit how they live?",
              body: "A tiny kitchen might prefer one good bowl to an oversized serving set.",
            },
            {
              heading: "Will the care suit them?",
              body: "Check the maker's care instructions. A beautiful gift should not become surprise homework.",
            },
            {
              heading: "Can you explain why you chose it?",
              body: "‘For your Sunday coffee’ is more personal than ‘It looked expensive.’",
            },
            {
              heading: "One thoughtful object is enough",
              body: "Shelf Life Goods • Silver Lake. Ask us to help you choose from what's in store.",
            },
          ],
          caption: "A little attention is the part that makes it a gift.",
          cta: "Save this before your next ‘What should I bring?’ moment.",
          strategy:
            "Makes the retailer useful before a purchase while keeping product care claims specific to each item.",
        },
        {
          id: "linkedin",
          type: "linkedin",
          stage: "matter",
          title: "A client gift should recognize a person",
          body: "The most interesting detail in a client conversation often isn't about work.\n\nThey make coffee slowly. They cook for friends. They finally found an apartment with a little outdoor table.\n\nThose details are useful when it is time to say thank you. A practical object chosen for someone's actual routine can feel more considered than another item with your logo on it.\n\nAt Shelf Life Goods, our gift conversation starts there: tell us one thing about the person. Then we'll look at what's in the shop and what might fit.\n\nThe goal is not to make your brand the centerpiece of their kitchen. It is to show that you were listening.",
          caption: "",
          cta: "Stop by in Silver Lake to choose a personal thank-you.",
          strategy:
            "Connects a local retail visit to a professional need without exaggerating impact or availability.",
        },
        {
          id: "youtube",
          type: "youtube",
          stage: "invite",
          title: "How to choose a host gift they'll actually use",
          thumbnailText: "BUY FOR THEIR TUESDAY",
          body: "Open with three objects on a counter: a mug, a small bowl, a linen napkin. ‘None of these is the right gift for everyone.’ Introduce three fictional recipients: the slow-coffee friend, the friend always hunting for keys, and the breakfast-on-the-balcony friend. For each, show one matching object in use, explain size and feel, and read its actual care label on camera. Close by writing a one-line note explaining the choice. End: ‘Bring us a detail about your person. We'll start there.’ Use items currently stocked; do not imply that every example is always available.",
          caption: "A practical way to make a small gift personal.",
          cta: "Visit Shelf Life Goods and tell us who you're shopping for.",
          strategy: "Lets viewers experience the shop's selection approach before entering.",
        },
        {
          id: "extra",
          type: "extra",
          stage: "invite",
          title: "A gift note that doesn't sound like a gift note",
          body: "WRITE THE REASON, NOT THE OCCASION\n\nFor the careful coffee maker:\n‘For the ten minutes you refuse to rush. Hope this joins your morning.’\n\nFor the friend who cooks:\n‘For the small things that make dinner taste like your house.’\n\nFor the new place:\n‘One useful little thing for the life you're making here.’\n\nFinish with your name. If the piece needs special care, tuck the maker's instructions in separately. Your note should explain why you thought of them, not how much you spent.",
          caption: "",
          cta: "Choose a line and make it sound like you.",
          strategy: "Extends the shopping experience with something customers can use immediately.",
        },
      ],
    },
  },
  {
    key: "nonprofit",
    label: "Nonprofit",
    match: /nonprofit|non-profit|charit|volunteer|community garden|donat|foundation/i,
    brief: {
      businessName: "Common Ground Pantry (example)",
      offer: "Community pantry inviting new volunteers to a supervised Saturday sorting shift",
      location: "East Los Angeles, CA",
      audience: "Local adults who want to volunteer but don't know what a first shift involves",
      goal: "Get inquiries for a first Saturday volunteer shift",
      voice: "Neighborly, clear, dignified and welcoming",
      facts: [
        {
          text: "Fictional nonprofit; shift details are prepared example assumptions, not a real event listing",
          source: "assumed",
        },
        {
          text: "The example first shift is a two-hour Saturday sorting session with a volunteer lead",
          source: "assumed",
        },
        {
          text: "Volunteers ask the coordinator about available roles, access needs and current guidelines before signing up",
          source: "assumed",
        },
        {
          text: "The campaign does not use client portraits, invented impact totals or tax-deductibility claims",
          source: "assumed",
        },
      ],
    },
    campaign: {
      headline: "You don't have to know the ropes. Just ask for a shift.",
      centralIdea:
        "Make a first volunteer visit concrete enough that a willing neighbor can picture arriving.",
      audience:
        "East Los Angeles neighbors who want to help but hesitate at an unfamiliar first step.",
      goal: "Turn local goodwill into confirmed first-shift inquiries.",
      artifacts: [
        {
          id: "ig",
          type: "instagram",
          stage: "stop",
          title: "There's a first shift for everyone",
          caption:
            "You can care about your neighborhood and still feel awkward walking into a room where everyone seems to know what to do. Your first shift is allowed to be your first shift. At Common Ground Pantry, the Saturday sorting session starts with a volunteer lead, a clear task and a chance to ask questions. Bring your willingness. Ask us about the next available shift and what you'll need before you come.",
          cta: "Message ‘FIRST SHIFT’ to ask the volunteer coordinator for details.",
          strategy: "Names the social hesitation that keeps willing volunteers from taking action.",
        },
        {
          id: "reel",
          type: "reel",
          stage: "stop",
          title: "Your first five minutes",
          hook: "You don't need to arrive knowing what to do.",
          beats: [
            {
              visual:
                "0–3s: Volunteer pauses outside the entrance; film only with their permission",
              voice: "The first step can be the awkward one.",
              onScreen: "First time?",
            },
            {
              visual: "3–6s: Lead points to a welcome sign and offers a name label",
              voice: "Start by finding your volunteer lead.",
              onScreen: "1. Say hello.",
            },
            {
              visual: "6–10s: Close-up of task card and sorted cans; no client information visible",
              voice: "They'll walk through the task and the guidelines.",
              onScreen: "2. See how the station works.",
            },
            {
              visual: "10–14s: Volunteer asks a question and lead demonstrates sorting",
              voice: "Questions belong here.",
              onScreen: "3. Ask the question.",
            },
            {
              visual: "14–18s: Two sets of hands work side by side",
              voice: "Then you begin, alongside someone else.",
              onScreen: "4. Take the next small step.",
            },
            {
              visual: "18–22s: Hold on the volunteer inquiry information",
              voice: "Ask Common Ground Pantry about a first Saturday shift.",
              onScreen: "East Los Angeles • Inquire before arriving",
            },
          ],
          caption: "A first shift starts with a welcome, not a test.",
          cta: "Ask about available Saturday roles and current volunteer guidelines.",
          strategy:
            "A walkthrough reduces uncertainty without using beneficiaries as promotional imagery.",
        },
        {
          id: "carousel",
          type: "carousel",
          stage: "matter",
          title: "Before your first pantry shift",
          slides: [
            {
              heading: "New to volunteering? Start here.",
              body: "A few questions that make a first shift easier to plan.",
            },
            {
              heading: "Confirm your place",
              body: "Ask which Saturday shifts are available. Wait for confirmation before arriving.",
            },
            {
              heading: "Ask what the role involves",
              body: "Sorting, packing and other tasks can have different physical requirements. Find a role that fits.",
            },
            {
              heading: "Share what you need",
              body: "Ask about accessibility, breaks and adjustments with the coordinator in advance.",
            },
            {
              heading: "Check the practical details",
              body: "Arrival point, clothing, parking or transit, and who to ask for when you get there.",
            },
            {
              heading: "Bring curiosity, not a camera plan",
              body: "Follow the pantry's privacy and photography guidelines. Neighbors deserve dignity.",
            },
          ],
          caption: "You are allowed to ask questions before you commit your time.",
          cta: "Save this, then contact the volunteer coordinator.",
          strategy:
            "Provides useful preparation while respecting different access needs and client privacy.",
        },
        {
          id: "linkedin",
          type: "linkedin",
          stage: "matter",
          title: "Make team volunteering easy to understand first",
          body: "‘We should volunteer together’ is a good intention. It isn't yet a plan.\n\nBefore choosing a date, ask the organization what help is useful, how many people it can welcome and which roles fit your team's needs. A small group in a well-matched shift is more useful than a large group arriving without a conversation.\n\nCommon Ground Pantry's first-shift invitation begins with that conversation. The example Saturday sorting session has a volunteer lead and a defined two-hour window. The coordinator confirms spaces, tasks and practical details.\n\nIf your team wants to help locally, start with the organization's needs. Then make the calendar invitation.",
          caption: "",
          cta: "Ask the coordinator whether an upcoming shift can accommodate your group.",
          strategy:
            "Addresses organizers without claiming unverified capacity or presenting volunteering as a team photo opportunity.",
        },
        {
          id: "youtube",
          type: "youtube",
          stage: "invite",
          title: "What a first volunteer shift can look like",
          thumbnailText: "YOUR FIRST SHIFT, EXPLAINED",
          body: "Film a consented demonstration with volunteers, without showing pantry clients or their records. 0:00: A new volunteer reaches the entrance. 0:12: The lead explains where to check in and how the two-hour shift is structured. 0:35: Demonstrate a sorting task using the pantry's current guidelines. 1:00: Show where a volunteer can ask for help or an adjustment. 1:20: End with check-out and the coordinator's invitation to ask about available shifts. Keep current arrival details in the description so the film remains useful when schedules change.",
          caption: "Know what to ask before you arrive.",
          cta: "Contact Common Ground Pantry for confirmed shift details.",
          strategy:
            "A clear orientation resource supports recruitment and the volunteer experience.",
        },
        {
          id: "extra",
          type: "extra",
          stage: "invite",
          title: "First-shift inquiry template",
          body: "TO THE VOLUNTEER COORDINATOR\n\nHi, I'd like to ask about a first Saturday shift with Common Ground Pantry.\n\nMy name: [name]\nDates I could attend: [dates]\nComing individually or with a group: [details]\nQuestions about the role or access: [anything you'd like to discuss]\n\nCould you tell me which shifts are available, what the role involves and what I should know before arriving?\n\nI'll wait for confirmation before making plans. Thank you for helping me get started.",
          caption: "",
          cta: "Use this to start your volunteer conversation.",
          strategy: "Turns goodwill into an informative inquiry the coordinator can act on.",
        },
      ],
    },
  },
  {
    key: "petcare",
    label: "Pet care",
    match: /pet|dog|cat|groom|animal|boarding|dogwalk/i,
    brief: {
      businessName: "Good Company Dog Walks (example)",
      offer: "Scheduled neighborhood dog walks with a meet-and-greet before a first booking",
      location: "Culver City, CA",
      audience: "Dog owners whose workdays make the midday walk difficult",
      goal: "Book introductory meet-and-greet inquiries for weekday dog walking",
      voice: "Affectionate, attentive, practical and never babyish",
      facts: [
        {
          text: "Fictional pet-care business; service details are prepared example assumptions",
          source: "assumed",
        },
        {
          text: "A meet-and-greet happens before a first walk to discuss routine, equipment and fit",
          source: "assumed",
        },
        {
          text: "The campaign is for scheduled weekday walks in Culver City, subject to availability",
          source: "assumed",
        },
        {
          text: "The owner supplies care instructions; the campaign promises no training, medical or behavior outcomes",
          source: "assumed",
        },
      ],
    },
    campaign: {
      headline: "Their midday plans shouldn't depend on your meeting.",
      centralIdea:
        "A good dog walk starts with understanding the ordinary details of that dog's day.",
      audience: "Culver City dog owners juggling work and a dependable midday routine.",
      goal: "Invite thoughtful meet-and-greet inquiries before weekday walks.",
      artifacts: [
        {
          id: "ig",
          type: "instagram",
          stage: "stop",
          title: "The calendar invite your dog didn't accept",
          caption:
            "Your 12:30 meeting moved to 12. Then it became a working lunch. Your dog did not approve this agenda. Good Company Dog Walks starts with a meet-and-greet so we can talk about the important details: the familiar route, the harness, the sniff-heavy corner and what you want us to know. A weekday routine deserves more than ‘grab the leash.’ Culver City, let's plan the walk before the calendar changes again.",
          cta: "Ask about a meet-and-greet and weekday availability.",
          strategy:
            "Uses a recognizable scheduling conflict while showing attentive care instead of promising a generic service.",
        },
        {
          id: "reel",
          type: "reel",
          stage: "stop",
          title: "A walk is not just a route",
          hook: "Your dog has a neighborhood agenda.",
          beats: [
            {
              visual: "0–3s: Leashed dog pauses at a familiar tree with owner's permission",
              voice: "First, the very important tree.",
              onScreen: "Agenda item 1: this tree",
            },
            {
              visual: "3–6s: Owner points out a quiet turn on a simple street map",
              voice: "Then the quieter side street.",
              onScreen: "The route you know",
            },
            {
              visual: "6–10s: Owner demonstrates their dog's harness to the walker",
              voice: "And the details you shouldn't have to explain twice.",
              onScreen: "Harness. Routine. Preferences.",
            },
            {
              visual: "10–14s: Meet-and-greet conversation shown without addresses or door codes",
              voice: "We start by meeting you both.",
              onScreen: "Meet before the first walk",
            },
            {
              visual: "14–18s: Dog and walker set off at an unhurried pace",
              voice: "Because the routine belongs to your dog.",
              onScreen: "A walk with context",
            },
            {
              visual: "18–22s: Title card with a lead hanging by a door",
              voice: "Good Company. Ask about weekday walks in Culver City.",
              onScreen: "Start with a meet-and-greet",
            },
          ],
          caption: "The sniff-heavy corner belongs in the handover notes.",
          cta: "Tell us about your dog's normal weekday.",
          strategy:
            "Specific details communicate attentiveness without invented credentials or behavior guarantees.",
        },
        {
          id: "carousel",
          type: "carousel",
          stage: "matter",
          title: "What your dog walker should know",
          slides: [
            {
              heading: "More than a leash handoff",
              body: "Six things to cover before a first walk.",
            },
            {
              heading: "The normal routine",
              body: "Usual walk time, length and the route your dog knows. Explain what a good day looks like.",
            },
            {
              heading: "The equipment",
              body: "Demonstrate the harness and leash setup you use. Don't assume every buckle is obvious.",
            },
            {
              heading: "The watch-outs",
              body: "Share triggers, handling preferences and situations you want the walker to avoid.",
            },
            {
              heading: "The care instructions",
              body: "Discuss relevant needs and who to contact with a concern. Keep private entry details off public messages.",
            },
            {
              heading: "The communication plan",
              body: "Agree how updates and schedule changes will work before confirming the first booking.",
            },
          ],
          caption: "A thoughtful handover makes the first conversation more useful.",
          cta: "Save this for your meet-and-greet.",
          strategy: "Gives owners a practical checklist that naturally leads to a service inquiry.",
        },
        {
          id: "linkedin",
          type: "linkedin",
          stage: "matter",
          title: "A midday routine needs a real handover",
          body: "Working from home does not always mean being available at home.\n\nYou can be ten feet from the front door and still stuck between a client call and a deadline when your dog's usual walk time arrives. The answer isn't necessarily another reminder on your phone. Sometimes it is a routine you can hand over properly.\n\nAt Good Company Dog Walks, the conversation starts before the first walk: the familiar route, equipment, preferences and how you want updates handled.\n\nIf your workday keeps colliding with the midday walk, tell us what a normal week looks like. We'll talk about availability and whether the service is a fit.",
          caption: "",
          cta: "Ask about a weekday meet-and-greet in Culver City.",
          strategy:
            "Addresses remote professionals directly while preserving a fit-first booking process.",
        },
        {
          id: "youtube",
          type: "youtube",
          stage: "invite",
          title: "What happens at a dog-walking meet-and-greet?",
          thumbnailText: "BEFORE THE FIRST WALK",
          body: "Open at a neutral meeting point, with owner and dog participating willingly. ‘Before we pick up a leash, we want to understand the routine.’ Show the owner demonstrating equipment, pointing out a preferred route and discussing communication. Use a staged care sheet with no real addresses, access codes or medical details. Explain that availability and suitability are discussed before a booking is confirmed. End with the pair taking a short, owner-agreed familiarization walk. Keep handling instructions specific to the owner and dog shown; this is a service walkthrough, not a training tutorial.",
          caption: "A first conversation about the details that matter.",
          cta: "Ask Good Company about a meet-and-greet.",
          strategy:
            "Makes an unfamiliar first appointment easier to picture without promising a result.",
        },
        {
          id: "extra",
          type: "extra",
          stage: "invite",
          title: "Your dog's weekday handover card",
          body: "MY DOG'S ORDINARY TUESDAY\n\nName and the cue they respond to:\nUsual walk window and duration:\nHarness and leash setup to demonstrate:\nPreferred route and places to avoid:\nRelevant care instructions to discuss privately:\nHow I'd like to receive updates:\nWho to contact if something needs attention:\n\nBring this to the meet-and-greet. Do not post your address, entry code or personal contact details publicly. Confirm the agreed plan with the walker before booking.",
          caption: "",
          cta: "Complete the prompts before your first conversation.",
          strategy:
            "A reusable customer resource makes the care conversation more specific and organized.",
        },
      ],
    },
  },
  {
    key: "photography",
    label: "Photographer",
    match: /photograph|portrait|headshot|camera|photo studio/i,
    brief: {
      businessName: "True North Portraits (example)",
      offer: "Guided brand portrait sessions for independent business owners",
      location: "Pasadena, CA",
      audience: "Founders who need current website photos but feel awkward in front of a camera",
      goal: "Get inquiries for a brand-portrait planning call",
      voice: "Observant, calm, lightly witty and specific",
      facts: [
        {
          text: "Fictional photography business; session details are prepared example assumptions",
          source: "assumed",
        },
        {
          text: "A planning call establishes where the images will be used before deciding a shot list",
          source: "assumed",
        },
        {
          text: "Sessions include direction; the client does not need to arrive with poses memorized",
          source: "assumed",
        },
        {
          text: "The photographer confirms deliverables, usage rights, timing and pricing in the proposal",
          source: "assumed",
        },
      ],
    },
    campaign: {
      headline: "You run the business. We'll help with the hands.",
      centralIdea:
        "Replace the pressure to perform for a camera with a useful plan for what the photographs need to do.",
      audience: "Pasadena founders whose current headshot no longer fits their work.",
      goal: "Start brand-portrait planning conversations.",
      artifacts: [
        {
          id: "ig",
          type: "instagram",
          stage: "stop",
          title: "What do I do with my hands?",
          caption:
            "You can explain your business, lead a meeting and handle a difficult client. Put a camera in front of you and suddenly your hands are a new and baffling concept. That's normal. A True North portrait session starts with where the photos will live and what they need to say. Then we work through the light, the movement and, yes, the hands. Your job is to bring yourself and a business worth knowing.",
          cta: "Ask about a portrait planning call in Pasadena.",
          strategy:
            "Uses a precise, relatable anxiety to introduce the photographer's direction and planning process.",
        },
        {
          id: "reel",
          type: "reel",
          stage: "stop",
          title: "The hands problem, solved by a plan",
          hook: "Nobody needs a founder doing twelve mysterious hand poses.",
          beats: [
            {
              visual: "0–3s: Consenting model hesitates, hands moving awkwardly",
              voice: "The camera comes out. The hands become a problem.",
              onScreen: "What do I do with these?",
            },
            {
              visual: "3–6s: Photographer points to a website hero layout on a laptop",
              voice: "So we start somewhere else: where will this image go?",
              onScreen: "Website hero? About page?",
            },
            {
              visual: "6–10s: Founder settles at their actual worktable",
              voice: "Then we give you something real to do.",
              onScreen: "Start with your work.",
            },
            {
              visual: "10–14s: Photographer offers one calm direction; model adjusts slightly",
              voice: "One direction at a time.",
              onScreen: "No pose homework.",
            },
            {
              visual:
                "14–18s: Show a contact sheet from this staged session, with model permission",
              voice: "We're making useful photographs, not testing your modeling career.",
              onScreen: "Photos with a job to do",
            },
            {
              visual: "18–22s: Close on the planning notebook and camera",
              voice: "True North Portraits. Let's start with the plan.",
              onScreen: "Pasadena • Ask about a planning call",
            },
          ],
          caption: "You can be good at your business and new to being photographed.",
          cta: "Tell us where your next portrait needs to work.",
          strategy:
            "Shows direction in action while keeping any displayed portfolio clearly tied to a permitted session.",
        },
        {
          id: "carousel",
          type: "carousel",
          stage: "matter",
          title: "Plan the crop before the outfit",
          slides: [
            {
              heading: "What does your photo need to do?",
              body: "Start here before buying a new shirt.",
            },
            {
              heading: "Name the placement",
              body: "Website hero, bio page, LinkedIn or speaker profile? Each needs a different amount of room.",
            },
            {
              heading: "Leave space for the words",
              body: "A wide website image may need clear space beside you for a headline.",
            },
            {
              heading: "Think beyond one headshot",
              body: "Working details and a wider environmental portrait can explain what you do.",
            },
            {
              heading: "Choose clothes you recognize yourself in",
              body: "Bring options that fit your work and feel like you. Discuss the background and color palette first.",
            },
            {
              heading: "Ask what you're receiving",
              body: "Confirm image count, formats, usage rights, retouching and delivery timing in the proposal.",
            },
          ],
          caption: "A useful portrait is designed for where it will live.",
          cta: "Save this for your brand-portrait planning call.",
          strategy: "Offers practical art-direction guidance that makes a planning call valuable.",
        },
        {
          id: "linkedin",
          type: "linkedin",
          stage: "matter",
          title: "Your headshot has a job description",
          body: "A portrait for a speaker bio has a different job from an image beside your website headline.\n\nOne needs to read clearly in a small circle. The other might need room for a sentence, a sense of place and enough context to show what you do.\n\nThat is why a brand portrait session should start with placements, not poses. Show the photographer the pages, platforms and materials you are updating. Explain who will see them and what you want those people to understand.\n\nAt True North Portraits, that planning conversation comes first. The camera is a tool for the brief. It isn't the brief itself.",
          caption: "",
          cta: "Bring your website and next use case to a planning call.",
          strategy:
            "Gives founders a clear reason to choose intentional photography over an undirected headshot session.",
        },
        {
          id: "youtube",
          type: "youtube",
          stage: "invite",
          title: "One founder, three useful portrait crops",
          thumbnailText: "YOUR PHOTO HAS A JOB",
          body: "Start with a staged website hero, a bio page and a circular profile frame. ‘One portrait cannot always do three different jobs.’ Film a consenting model in one environment, first leaving side space for the website headline, then making a closer editorial portrait, then checking a tight profile crop. Put each permitted image into its actual layout on screen. Explain how the crop changed the composition; do not claim a conversion improvement. Close with a simple planning prompt: ‘Show us where the photo needs to live before we decide how to make it.’",
          caption: "A practical look at planning portraits for real placements.",
          cta: "Ask about a brand-portrait planning call with True North.",
          strategy:
            "Demonstrates the value of planning with concrete, visual before-and-after crops rather than unsupported business results.",
        },
        {
          id: "extra",
          type: "extra",
          stage: "invite",
          title: "The five-minute portrait brief",
          body: "BRING THIS TO YOUR PLANNING CALL\n\n1. Where will the photographs appear? List the actual pages or platforms.\n2. Who should recognize themselves as your customer when they see them?\n3. What three words should the images communicate?\n4. What is no longer right about your current photographs?\n5. What part of your work could we show instead of only describing?\n\nAdd two visual references you like and one you don't. Explain why. Then ask the photographer to confirm deliverables, rights, timing and pricing before booking.",
          caption: "",
          cta: "Fill in the prompts and bring your current website.",
          strategy:
            "Turns an interested founder into a better-prepared inquiry without requiring them to become an art director.",
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
