import type { CampaignOutput } from "./studio-model";

function buildGenericDemoCampaign(topic: string, business = "Your business"): CampaignOutput {
  const idea = (
    topic.split("\n\nStrategic direction:")[0]?.trim() ||
    "Turn repeated customer questions into useful content"
  ).replace(/[.!?]+$/, "");
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
      scenes: [
        {
          beat: "Open on the friction",
          visual: "Medium close-up, looking directly into camera in the real work environment.",
          spoken:
            "Most businesses do not have a content problem. They have an explanation problem.",
          onScreenText: "The explanation gap",
          broll: ["A customer question arriving", "The team preparing a clear answer"],
        },
        {
          beat: "Organize the decision",
          visual: "Stay on camera, then cut to the proof, tool, or process being discussed.",
          spoken: `Your customer is trying to understand what matters, what can wait, and what happens if they choose wrong. That is where ${business} can be most useful: name the friction, show the proof, and give one clear next step.`,
          onScreenText: "Friction → proof → next step",
          broll: ["Hands doing the real work", "A visible proof point", "The finished outcome"],
        },
        {
          beat: "Invite the next move",
          visual: "Return to a clean medium close-up and leave a full beat after the final line.",
          spoken:
            "Choose the question your customers repeat most often. We will turn it into the first campaign.",
          onScreenText: "Start with the repeated question",
          broll: ["A simple written next step"],
        },
      ],
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
    platformPosts: [
      {
        id: "youtube-anchor",
        platform: "youtube",
        format: "video",
        title: `${idea}: the decision your customer is trying to make`,
        hook: "Most businesses do not have a content problem. They have an explanation problem.",
        body: `Your customer is not waiting for more information. They are trying to understand what matters, what can wait, and what happens if they choose wrong.\n\nIn this video, ${business} organizes that decision: the friction, the proof, and the next step.`,
        callToAction: "Choose the question your customers repeat most often and build from there.",
        hashtags: [],
        nativeFeature: "Premiere with a pinned question in live chat",
        publishNotes:
          "Use the long-form video as the campaign anchor and link every short back to it.",
        slides: [],
        poll: null,
        quiz: null,
      },
      {
        id: "youtube-poll",
        platform: "youtube",
        format: "poll",
        title: "Choose the next explanation",
        hook: "Which question should we answer next?",
        body: "Let the audience choose the next useful video before you script it.",
        callToAction: "Vote and add your version of the question in the comments.",
        hashtags: [],
        nativeFeature: "YouTube Community poll",
        publishNotes: "Publish 48 hours after the anchor video to collect the next brief.",
        slides: [],
        poll: {
          question: "What makes content hardest to maintain?",
          options: [
            "Knowing what to say",
            "Finding time",
            "Feeling natural",
            "Publishing consistently",
          ],
        },
        quiz: null,
      },
      {
        id: "instagram-reel",
        platform: "instagram",
        format: "reel",
        title: "The explanation gap",
        hook: "Your customer does not need more content.",
        body: "They need the decision organized. Name the friction. Show one piece of proof. Give one confident next step.",
        callToAction: "Save this before your next filming day.",
        hashtags: ["#ContentStrategy", "#SmallBusinessVideo", "#VideoMarketing"],
        nativeFeature: "Reel with caption-safe text and remix enabled",
        publishNotes:
          "Keep the hook on screen for the first two seconds and add captions natively.",
        slides: [],
        poll: null,
        quiz: null,
      },
      {
        id: "instagram-carousel",
        platform: "instagram",
        format: "carousel",
        title: "One question becomes a campaign",
        hook: "Stop starting from a blank page.",
        body: "A swipeable explanation of how one repeated customer question becomes a complete campaign.",
        callToAction: "Save the framework and send it to the person planning your next shoot.",
        hashtags: ["#ContentSystem", "#BusinessClarity"],
        nativeFeature: "Carousel with a save-forward final slide",
        publishNotes: "Use seven slides and keep each slide to one decision.",
        slides: [
          "Start with the repeated question",
          "Name the real friction",
          "Choose one clear promise",
          "Build the anchor explanation",
          "Pull three short hooks",
          "Add proof and a CTA",
          "Schedule the system",
        ],
        poll: null,
        quiz: null,
      },
      {
        id: "tiktok-short",
        platform: "tiktok",
        format: "short",
        title: "Listen to your last sales call",
        hook: "Want to know what to film next?",
        body: "The question you answered twice this week is already a content brief. Record it once, structure it clearly, and reuse it everywhere.",
        callToAction: "Comment the question you keep hearing.",
        hashtags: ["#SmallBusinessTok", "#ContentIdeas", "#VideoTips"],
        nativeFeature: "Q&A reply prompt with searchable spoken keywords",
        publishNotes: "Record as a direct reply and leave a clean pause before the answer begins.",
        slides: [],
        poll: null,
        quiz: null,
      },
      {
        id: "linkedin-document",
        platform: "linkedin",
        format: "document",
        title: "Content is clarity infrastructure",
        hook: "A useful video should remove a repeated explanation from your week.",
        body: "The strongest content does not add noise. It organizes the decision your customer or team already needs to make. One explanation can become your authority video, social proof, FAQ, email, and internal reference.",
        callToAction: "What explanation does your team repeat every week?",
        hashtags: ["#ContentOperations", "#Leadership", "#VideoStrategy"],
        nativeFeature: "LinkedIn document post with a conversation-first final page",
        publishNotes: "Lead with the operating insight, not the production service.",
        slides: [
          "The repeated explanation",
          "The cost of starting over",
          "The anchor",
          "The reuse system",
          "The next step",
        ],
        poll: null,
        quiz: null,
      },
      {
        id: "linkedin-poll",
        platform: "linkedin",
        format: "poll",
        title: "What slows the system down?",
        hook: "Where does your content process break first?",
        body: "Use the responses to choose the next practical post and invite examples in the comments.",
        callToAction: "Vote, then tell us what the missing option should be.",
        hashtags: ["#ContentWorkflow"],
        nativeFeature: "LinkedIn poll plus a first-comment prompt",
        publishNotes: "Keep the poll open for one week and respond to every detailed comment.",
        slides: [],
        poll: {
          question: "Where does content stall?",
          options: ["Ideas", "Approval", "Production", "Publishing"],
        },
        quiz: null,
      },
      {
        id: "facebook-story",
        platform: "facebook",
        format: "story",
        title: "Behind the next useful answer",
        hook: "Today we are filming the question customers ask most.",
        body: "Show the simple setup, the real work, and the one answer the audience can use today.",
        callToAction: "Reply with the question you want answered next.",
        hashtags: [],
        nativeFeature: "Story question sticker followed by a native video reply",
        publishNotes: "Use three frames: setup, answer, question sticker.",
        slides: ["The repeated question", "The clear answer", "What should we answer next?"],
        poll: null,
        quiz: null,
      },
      {
        id: "threads-thread",
        platform: "threads",
        format: "thread",
        title: "The content system in five thoughts",
        hook: "A content calendar cannot fix an explanation problem.",
        body: "1/ Start with the repeated question.\n\n2/ Organize the decision.\n\n3/ Record one useful anchor.\n\n4/ Pull platform-native pieces from the anchor.\n\n5/ Publish the sequence, not isolated posts.",
        callToAction: "Which step is missing from your current system?",
        hashtags: [],
        nativeFeature: "Five-post thread with a question-led final reply",
        publishNotes:
          "Post the first two replies immediately, then finish the thread within ten minutes.",
        slides: [],
        poll: null,
        quiz: null,
      },
    ],
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

function buildNatureWorksCampaign(topic: string): CampaignOutput {
  const output = buildGenericDemoCampaign(topic, "Nature Works");
  const topicLower = topic.toLowerCase();
  const isConsultation = topicLower.includes("consult") || topicLower.includes("first visit");
  const title = isConsultation
    ? "What a complimentary landscape consultation should solve before design begins"
    : "The muddy side yard is telling you where the water has nowhere to go";
  const problem = isConsultation
    ? "Homeowners often know the yard is not working, but they do not yet know whether the real issue is drainage, irrigation, privacy, grade, circulation, or a combination."
    : "A muddy side yard is rarely just a cosmetic problem. It is visible evidence that water, grade, soil, and circulation are not working together.";
  const promise = isConsultation
    ? "A useful first visit turns a vague wish list into a clear, site-specific path forward."
    : "Read the site before choosing the surface, then build a durable solution that belongs in the Pacific Northwest.";

  output.title = `Nature Works: ${title}`;
  output.primaryLane = "evergreen";
  output.strategy = {
    bigIdea: title,
    audienceInsight: problem,
    promise,
    messagePillars: [
      "Read what the site is already showing you",
      "Solve water, grade, and use as one system",
      "Make the finished landscape feel natural to the home",
    ],
    channelPlan: [
      { channel: "YouTube / Website", role: "Teach the complete site-reading process" },
      { channel: "Instagram", role: "Show the evidence, process, and transformation visually" },
      { channel: "Facebook", role: "Answer local homeowner questions and invite consultation" },
      { channel: "Email", role: "Help an interested homeowner prepare for the first visit" },
    ],
  };
  output.anchor = {
    title,
    hook: isConsultation
      ? "A good landscape consultation should do more than collect a wish list. It should explain what the site is already telling us."
      : "If this part of your yard stays muddy, do not start by choosing pavers. Start by asking where the water was supposed to go.",
    script: isConsultation
      ? `Most homeowners do not arrive with a finished landscape plan. They arrive with clues: a soggy corner, a slope nobody uses, a patio that feels disconnected, a view they want to protect, or a space that simply never feels inviting.\n\nDuring a complimentary Nature Works consultation, we begin by listening to how you want to use the property. Then we read the site itself—sun, grade, drainage, irrigation, access, existing plants, and the relationship between the home and the garden.\n\nThat matters because the best solution is rarely one isolated feature. A retaining wall may create usable space, but it also changes drainage. A new planting plan may add beauty, but it must match the light and water already available. A path should feel natural while moving people comfortably through the property.\n\nThe goal of the first visit is clarity. You should understand the real constraints, the strongest opportunities, and the next practical step before anyone starts building.`
      : `A muddy side yard is not just an eyesore. It is evidence. Water may be collecting because of grade, compacted soil, roof runoff, irrigation, or a path that was never designed to move water and people together.\n\nBefore we recommend a surface, Nature Works reads the entire area: where water enters, where it slows down, how people move through the space, and what the surrounding plants and soil can support.\n\nFrom there, the solution may combine drainage, grading, a permeable path, stone, planting, and irrigation adjustments. The point is not to hide the symptom. It is to make the whole space function naturally and look like it belongs with the home.\n\nWhen the planning is right, the finished path stays useful through Pacific Northwest weather and the once-forgotten side yard becomes a comfortable connection between the spaces you actually use.`,
    callToAction:
      "Schedule a complimentary landscape consultation and show us the part of your yard that is not working yet.",
    scenes: [
      {
        beat: "Start with the evidence",
        visual:
          "Howard stands at the problem area; open on a wide shot, then move to a medium close-up.",
        spoken: isConsultation
          ? "A good landscape consultation should do more than collect a wish list. It should explain what the site is already telling us."
          : "If this part of your yard stays muddy, do not start by choosing pavers. Start by asking where the water was supposed to go.",
        onScreenText: isConsultation ? "Read the site first" : "Mud is evidence",
        broll: ["Standing water or compacted soil", "Roof runoff", "The walking route"],
      },
      {
        beat: "Show how Nature Works reads the site",
        visual:
          "Voiceover over close details of grade, drainage, sunlight, plants, and measurements.",
        spoken:
          "We look at where water enters, where it slows down, how people use the space, and what the soil and existing landscape can support.",
        onScreenText: "Water · grade · use · soil",
        broll: [
          "Checking slope",
          "Looking at irrigation",
          "Sketching the site",
          "Examining plants",
        ],
      },
      {
        beat: "Connect the parts",
        visual: "Move from the rough condition into process footage and a finished detail.",
        spoken:
          "The strongest solution connects drainage, circulation, materials, planting, and maintenance instead of treating each one as a separate project.",
        onScreenText: "One connected landscape",
        broll: ["Base preparation", "Natural stone detail", "Planting", "Finished path"],
      },
      {
        beat: "Offer one calm next step",
        visual:
          "Return to camera in the finished space and hold for two seconds after the final line.",
        spoken:
          "Schedule a complimentary landscape consultation and show us the part of your yard that is not working yet.",
        onScreenText: "Complimentary consultation · gonatureworks.com",
        broll: ["Finished wide shot"],
      },
    ],
  };
  output.shorts = [
    {
      title: "Mud is evidence",
      hook: "That muddy side yard is trying to tell you something.",
      script:
        "Before choosing stone or pavers, trace where the water enters, where it slows down, and how the grade moves it. Solve the cause before covering the symptom.",
      callToAction: "Save this and take one photo after the next hard rain.",
    },
    {
      title: "What we notice first",
      hook: "Here are four things we read before designing a landscape.",
      script:
        "Water. Grade. Sun. Use. Those four clues tell us more than a catalog of features ever could—and help the finished landscape thrive in the Pacific Northwest.",
      callToAction: "Which one is creating the biggest problem in your yard?",
    },
    {
      title: "A path is part of a system",
      hook: "A walkway should move more than people.",
      script:
        "It affects drainage, planting, access, and how the home connects to the garden. Plan all four together and the path feels like it has always belonged there.",
      callToAction: "Schedule a complimentary consultation at gonatureworks.com.",
    },
  ];
  output.newsletter = {
    subject: "What your yard is already telling you",
    body: `A soggy corner, unused slope, exposed view, or disconnected patio is not a failed design brief. It is the beginning of one. Nature Works starts by reading the site—water, grade, light, circulation, existing plants, and the way you want to live outside. That first layer of clarity helps every later decision work together. If one part of your landscape is not working, schedule a complimentary consultation and show us what you are seeing.`,
  };
  output.carousel = {
    title: "Read the site before choosing the solution",
    slides: [
      "The yard is already giving you clues",
      "Where does water enter?",
      "Where does the grade send it?",
      "How do people move through the space?",
      "What can the light and soil support?",
      "Connect drainage, paths, plants, and irrigation",
      "Then design the finished landscape",
    ],
  };
  output.platformPosts = output.platformPosts.map((post) => {
    if (post.platform === "instagram" && post.format === "reel") {
      return {
        ...post,
        title: "Mud is evidence",
        hook: "That muddy side yard is trying to tell you something.",
        body: "Before choosing stone or pavers, trace where the water enters, where it slows down, and how the grade moves it. The best landscape solution fixes the cause, supports the way you use the space, and feels natural to the home.",
        callToAction:
          "Save this for the next hard rain, then schedule a complimentary consultation.",
        hashtags: ["#PortlandLandscaping", "#LandscapeDesign", "#PNWGardens"],
        nativeFeature: "Reel with location tag, native captions, and a question sticker follow-up",
        publishNotes:
          "Open on the muddy condition, reveal the water path, then end on a finished detail.",
      };
    }
    if (post.platform === "instagram" && post.format === "carousel") {
      return {
        ...post,
        title: "Read the site before choosing the solution",
        hook: "The yard is already giving you clues.",
        body: "A practical seven-slide guide to water, grade, movement, light, soil, and a connected landscape plan.",
        callToAction: "Save this before your first landscape consultation.",
        hashtags: ["#SherwoodOregon", "#PortlandLandscaping", "#GardenDesign"],
        slides: output.carousel.slides,
        nativeFeature: "Seven-slide educational carousel with a save-forward final card",
      };
    }
    if (post.platform === "youtube" && post.format === "video") {
      return {
        ...post,
        title,
        hook: output.anchor.hook,
        body: "Nature Works explains how water, grade, circulation, soil, plants, and irrigation shape a durable Pacific Northwest landscape solution.",
        callToAction: output.anchor.callToAction,
        nativeFeature: "Chapters for evidence, site reading, connected solution, and consultation",
        publishNotes:
          "Use the finished project as the thumbnail; keep the problem visible in the first ten seconds.",
      };
    }
    return {
      ...post,
      body: post.body.replaceAll("content", "landscape guidance"),
      callToAction: "Schedule a complimentary landscape consultation at gonatureworks.com.",
    };
  });
  output.productionPlan = {
    objective:
      "Show homeowners how Nature Works reads a problem area before recommending a landscape solution.",
    estimatedMinutes: 90,
    location:
      "One real client property with a visible problem area and a finished Nature Works project",
    wardrobe: ["Solid earth tone", "Nature Works logo layer if available", "Weather-ready shoes"],
    props: ["Site sketch", "Measuring tape", "Soil probe", "Drainage or irrigation example"],
    deliveryNotes: [
      "Speak to one homeowner standing beside the problem",
      "Use the words customers use before technical terms",
      "Do not promise a solution until the site has been assessed",
      "Leave a clean pause after each key line for editing",
    ],
    shots: [
      {
        shot: "Problem-area establishing shot",
        framing: "Wide",
        purpose: "Make the condition immediately recognizable",
      },
      {
        shot: "Direct-to-camera hook",
        framing: "Medium close-up",
        purpose: "Explain why the visible symptom matters",
      },
      {
        shot: "Follow the water path",
        framing: "Moving detail sequence",
        purpose: "Show how the site is read",
      },
      {
        shot: "Site sketch and measurement",
        framing: "Overhead close-up",
        purpose: "Make the planning process visible",
      },
      {
        shot: "Work in progress",
        framing: "Wide plus hands",
        purpose: "Connect the plan to real craft",
      },
      {
        shot: "Finished landscape reveal",
        framing: "Slow wide move",
        purpose: "Show the functional and visual outcome",
      },
      {
        shot: "Consultation invitation",
        framing: "Medium close-up",
        purpose: "Give one calm next step",
      },
    ],
    broll: [
      "Water moving across the site",
      "Existing grade and drainage clues",
      "Measuring and sketching",
      "Irrigation detail",
      "Natural stone and soil texture",
      "Planting suited to the location",
      "Finished path and outdoor living area",
    ],
    checklist: [
      "Confirm permission for both properties",
      "Film the problem before any work begins",
      "Capture ten seconds of every detail",
      "Record clean natural sound",
      "Verify every claim against the actual site",
      "Record two versions of the consultation CTA",
    ],
  };
  output.schedule = [
    { title: title, channel: "YouTube / Website", dayOffset: 0 },
    { title: "Mud is evidence", channel: "Instagram Reel", dayOffset: 2 },
    {
      title: "Read the site before choosing the solution",
      channel: "Instagram Carousel",
      dayOffset: 5,
    },
    { title: "What your yard is already telling you", channel: "Email", dayOffset: 7 },
    { title: "What should we look at first?", channel: "Facebook", dayOffset: 10 },
  ];
  return output;
}

export function buildDemoCampaign(topic: string, business = "Your business"): CampaignOutput {
  return business.toLowerCase().includes("nature works")
    ? buildNatureWorksCampaign(topic)
    : buildGenericDemoCampaign(topic, business);
}
