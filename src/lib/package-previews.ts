export type PackagePreview = {
  title: string;
  duration: number;
  kind: string;
  hasAudio: boolean;
  transcript: string;
  exampleType: string;
  status: string;
  videoSrc: string;
  poster: string;
  captions: string;
};

export const packagePreviews: Record<string, PackagePreview> = {
  "social-content": {
    title: "Hot take: diagnose before you upgrade",
    duration: 30.05,
    kind: "generated",
    hasAudio: true,
    transcript:
      "Stop buying a new bike because yours squeaks. First, find out what's making the noise. A loose rack and a worn chain are different problems, with different fixes. Bring the bike in. We'll check the source, explain the repair, and give you a quote before we start. Get an answer before you buy an upgrade.",
    exampleType: "A spoken hot take for social media",
    status: "reviewed",
    videoSrc:
      "https://d8j0ntlcm91z4.cloudfront.net/user_34QcHN7DEcL4LqzBAWt72kiEuVS/hf_20260915_205607_dd353d02-95a7-4196-9ecd-c68211ebcb7c.mp4",
    poster:
      "https://d2ol7oe51mr4n9.cloudfront.net/user_34QcHN7DEcL4LqzBAWt72kiEuVS/bd75072e-1727-4ef3-af64-fb6ec6a164bb.jpg",
    captions: "/packages/captions/social-content.vtt",
  },
  "sales-training": {
    title: "Sales role-play: respond to a price objection",
    duration: 30.05,
    kind: "generated",
    hasAudio: true,
    transcript:
      "This is how we handle a price objection. Customer: Your IT support costs more than our other quote. Representative: Does that quote include onsite visits, or remote support only? Customer: Remote only. Representative: Then let's compare our remote plan first. If you need someone onsite, I'll explain exactly when visits are included. Clarify the need before defending the price.",
    exampleType: "Sales training: price-objection role-play",
    status: "reviewed",
    videoSrc:
      "https://d8j0ntlcm91z4.cloudfront.net/user_34QcHN7DEcL4LqzBAWt72kiEuVS/hf_20260915_205607_2869fe1a-3e38-433d-abc7-ed94df097afe.mp4",
    poster:
      "https://d2ol7oe51mr4n9.cloudfront.net/user_34QcHN7DEcL4LqzBAWt72kiEuVS/40838540-b3b7-471d-98e4-45667ee50c9d.jpg",
    captions: "/packages/captions/sales-training.vtt",
  },
  commercials: {
    title: "Commercial: laundry off your weekend",
    duration: 30.05,
    kind: "generated",
    hasAudio: true,
    transcript:
      "Your weekend has better things to do than laundry. Leave your everyday clothes at the door, and we'll collect them, wash them, and fold them for you. Choose your pickup day. We bring everything back neatly folded, ready for your drawer. One less chore between you and your weekend. Book your first pickup today.",
    exampleType: "30-second commercial example",
    status: "reviewed",
    videoSrc:
      "https://d8j0ntlcm91z4.cloudfront.net/user_34QcHN7DEcL4LqzBAWt72kiEuVS/hf_20260915_210707_256a075d-c55e-44e2-8d17-3ca790956cdf.mp4",
    poster:
      "https://d2ol7oe51mr4n9.cloudfront.net/user_34QcHN7DEcL4LqzBAWt72kiEuVS/2d069e46-c987-4c59-a25d-dcba0987a5eb.jpg",
    captions: "/packages/captions/commercials.vtt",
  },
  "product-demos": {
    title: "Product demo: open, pack, close",
    duration: 30.05,
    kind: "generated",
    hasAudio: true,
    transcript:
      "Here's how this lunchbox comes apart. Flip both side clips down, then lift the lid. The small tray lifts straight out, so you can pack each section separately. Put the tray back, line up the lid, and press both clips closed. That's the whole routine: open, pack, close. Tomorrow, lift the tray out and start again.",
    exampleType: "30-second product demonstration",
    status: "reviewed",
    videoSrc:
      "https://d8j0ntlcm91z4.cloudfront.net/user_34QcHN7DEcL4LqzBAWt72kiEuVS/hf_20260915_210707_6b1ae15a-74d4-4593-aa60-fbe078f21917.mp4",
    poster:
      "https://d2ol7oe51mr4n9.cloudfront.net/user_34QcHN7DEcL4LqzBAWt72kiEuVS/4fc2d6d4-8984-42d4-90ba-e138726a7a2f.jpg",
    captions: "/packages/captions/product-demos.vtt",
  },
  "customer-stories": {
    title: "Customer story: a studio ready for Monday",
    duration: 30.05,
    kind: "generated",
    hasAudio: true,
    transcript:
      "I manage this studio. Monday mornings used to start with dirty mugs and a meeting room that needed clearing. We wanted the team to arrive ready to work. Our cleaner now takes care of the kitchen and meeting room after we close. I walk in, turn on the lights, and start the day. That's the difference.",
    exampleType: "Fictional customer-story example",
    status: "reviewed",
    videoSrc:
      "https://d2ol7oe51mr4n9.cloudfront.net/user_34QcHN7DEcL4LqzBAWt72kiEuVS/f28eb84c-c1c2-4a93-8af9-1958c5bcd247.mp4",
    poster:
      "https://d2ol7oe51mr4n9.cloudfront.net/user_34QcHN7DEcL4LqzBAWt72kiEuVS/495587ba-05c5-45c9-be00-5e565a8381df.jpg",
    captions: "/packages/captions/customer-stories.vtt",
  },
  "employee-spotlights": {
    title: "Employee spotlight: meet the morning lead",
    duration: 30.05,
    kind: "generated",
    hasAudio: true,
    transcript:
      "I'm Maya, the morning lead here. Before we open, I check today's pickups with the kitchen. My job is making sure nobody's order gets lost between the two teams. My favorite moment is handing someone the cake they've been looking forward to. I check the details, ask how they're carrying it, and make sure they're ready to go.",
    exampleType: "30-second employee spotlight example",
    status: "reviewed",
    videoSrc:
      "https://d8j0ntlcm91z4.cloudfront.net/user_34QcHN7DEcL4LqzBAWt72kiEuVS/hf_20260915_210707_0baf267f-4fc7-4a7e-8925-ea1b0704cd06.mp4",
    poster:
      "https://d2ol7oe51mr4n9.cloudfront.net/user_34QcHN7DEcL4LqzBAWt72kiEuVS/39b3ed3c-3906-4e38-b092-b7f25e280cd6.jpg",
    captions: "/packages/captions/employee-spotlights.vtt",
  },
  onboarding: {
    title: "Onboarding excerpt: your first day",
    duration: 30.05,
    kind: "generated",
    hasAudio: true,
    transcript:
      "Welcome to your first day. I'm Jordan, your point person. Start here at the team table: we'll meet your buddy, walk the studio, and get your workstation ready. You won't handle a client request alone today. Watch your buddy first, then try one together. If you're unsure, stop and ask. We'll check in again after lunch.",
    exampleType: "Onboarding preview excerpt",
    status: "reviewed",
    videoSrc:
      "https://d8j0ntlcm91z4.cloudfront.net/user_34QcHN7DEcL4LqzBAWt72kiEuVS/hf_20260915_210707_56e53623-2a9d-4aea-b125-68c3c7246639.mp4",
    poster:
      "https://d2ol7oe51mr4n9.cloudfront.net/user_34QcHN7DEcL4LqzBAWt72kiEuVS/51dda46d-dca6-4193-89be-a543903879da.jpg",
    captions: "/packages/captions/onboarding.vtt",
  },
  "safety-training": {
    title: "Safety training excerpt: stop at the spill",
    duration: 30.05,
    kind: "generated",
    hasAudio: true,
    transcript:
      "See a spill in the walkway? Stop and keep people away. Tell your supervisor, then follow your workplace procedure to block off the area before anyone walks through. Use a clear alternative route. Don't step over the spill or move the barrier. Keep the area closed until the hazard is corrected and the walkway is safe.",
    exampleType: "Safety training preview excerpt",
    status: "reviewed",
    videoSrc:
      "https://d8j0ntlcm91z4.cloudfront.net/user_34QcHN7DEcL4LqzBAWt72kiEuVS/hf_20260915_210708_30c50ce9-4efa-46de-92a3-d380b192cecf.mp4",
    poster:
      "https://d2ol7oe51mr4n9.cloudfront.net/user_34QcHN7DEcL4LqzBAWt72kiEuVS/8f5c7a7e-850c-4a70-839a-1fc3b3ae9115.jpg",
    captions: "/packages/captions/safety-training.vtt",
  },
  "video-sops": {
    title: "Video SOP: reset a shared whiteboard",
    duration: 30.05,
    kind: "generated",
    hasAudio: true,
    transcript:
      "Before erasing a shared whiteboard, ask the meeting owner whether the notes need saving. Once they confirm, erase the board from top to bottom using the felt eraser. Put the eraser and markers back in the tray. Then check the whole board from the doorway. Leave a clear surface, ready for the next meeting.",
    exampleType: "Video SOP preview excerpt",
    status: "reviewed",
    videoSrc:
      "https://d8j0ntlcm91z4.cloudfront.net/user_34QcHN7DEcL4LqzBAWt72kiEuVS/hf_20260915_212105_8178e558-35b7-45d5-ab23-c6e47e4dc050.mp4",
    poster:
      "https://d2ol7oe51mr4n9.cloudfront.net/user_34QcHN7DEcL4LqzBAWt72kiEuVS/00c94751-e380-4754-9efe-668fe8a8af23.jpg",
    captions: "/packages/captions/video-sops.vtt",
  },
  "educational-videos": {
    title: "Educational excerpt: fix your video-call lighting",
    duration: 30.05,
    kind: "generated",
    hasAudio: true,
    transcript:
      "Here's why you look dark on video calls. When a bright window sits behind you, your camera may expose for the window instead of your face. Watch this. Turn so the window faces you, then put the camera in front. Now the light reaches your face. Same camera, better position. Try that before buying a new webcam.",
    exampleType: "Educational video preview excerpt",
    status: "reviewed",
    videoSrc:
      "https://d8j0ntlcm91z4.cloudfront.net/user_34QcHN7DEcL4LqzBAWt72kiEuVS/hf_20260915_210713_7126c250-3dc7-4e28-8bc9-31401dc5e9fd.mp4",
    poster:
      "https://d2ol7oe51mr4n9.cloudfront.net/user_34QcHN7DEcL4LqzBAWt72kiEuVS/0ad885fb-c3a2-455f-b020-37ba1bd27835.jpg",
    captions: "/packages/captions/educational-videos.vtt",
  },
};
