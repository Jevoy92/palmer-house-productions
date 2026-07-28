import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero, Section, FaqList } from "@/components/site/PageShell";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ | Palmer House Productions" },
      {
        name: "description",
        content:
          "Your complete guide to video content systems, pricing, and process at Palmer House Productions. Find exactly what you're looking for.",
      },
      { property: "og:title", content: "Frequently Asked Questions | Palmer House Productions" },
      {
        property: "og:description",
        content: "Every question answered — content systems, pricing, ownership, ROI, and next steps.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: FaqPage,
});

const groups: { category: string; items: { q: string; a: string }[] }[] = [
  {
    category: "Content Systems",
    items: [
      {
        q: "What is a video content system and why does my business need one?",
        a: "A video content system is a coordinated library of videos — social, training, marketing, and proof content — captured efficiently and organized so your business always has content ready to use, instead of scrambling for one-off videos.",
      },
      {
        q: "How does your system approach save me money compared to traditional training or marketing?",
        a: "By capturing multiple videos in a single, well-planned shoot day, you get months of content for a fraction of the cost of hiring separate crews for each individual video.",
      },
      {
        q: "How do you determine which videos my business actually needs?",
        a: "We start with a strategy call to understand your goals, audience, and existing gaps, then map out a content plan built around the problems video can actually solve for you.",
      },
      {
        q: "What kinds of business problems can a video content system solve?",
        a: "Everything from inconsistent onboarding and repetitive training questions to weak social presence, low lead generation, and lack of social proof.",
      },
      {
        q: "How do you ensure the content system stays up to date as our business changes?",
        a: "We build systems with refresh cycles in mind and offer ongoing update packages so your library evolves alongside your team, offers, and brand.",
      },
    ],
  },
  {
    category: "Internal & External Video",
    items: [
      {
        q: "How does video onboarding save time for my managers and HR team?",
        a: "Video onboarding lets new hires learn processes on their own time, freeing managers from repeating the same training sessions over and over.",
      },
      {
        q: "Can you help us reduce training costs and increase retention?",
        a: "Yes — a well-built training library standardizes onboarding, reduces trainer hours, and helps new employees ramp up faster and stay longer.",
      },
      {
        q: "Can you create videos optimized for social media like TikTok, Instagram, and LinkedIn?",
        a: "Absolutely — our short-form content is built hook-first and formatted specifically for every platform your audience uses.",
      },
      {
        q: "What's included in your YouTube Visibility Engine?",
        a: "A long-form content strategy paired with production, optimization, and publishing support designed to build organic search and discovery over time.",
      },
      {
        q: "Will your videos help us generate more leads or awareness?",
        a: "Yes — our brand films, testimonials, and evergreen content are designed to build trust and visibility that translates into real leads.",
      },
    ],
  },
  {
    category: "Packages & Pricing",
    items: [
      {
        q: "How does your production pricing work?",
        a: "Pricing is based on the scope of your content system — number of shoot days, deliverables, and post-production needs. See our pricing page for full package details.",
      },
      {
        q: "Can I customize my video package?",
        a: "Yes — every package can be tailored to fit your specific goals, timeline, and budget.",
      },
      {
        q: "What types of video missions do you offer?",
        a: "We offer missions across social visibility, internal systems, evergreen authority content, and spotlight/brand proof content through our Pal-based framework.",
      },
      {
        q: "Do you offer a starter option for first-timers?",
        a: "Yes — we have entry-level packages designed for businesses new to video production who want to start building a content library affordably.",
      },
      {
        q: "What's included in the Camera-Ready Brand DIY coaching?",
        a: "Coaching and downloadable resources that help you and your team get comfortable and confident producing content on your own between professional shoots.",
      },
    ],
  },
  {
    category: "Ownership & Support",
    items: [
      {
        q: "Do we own the video content?",
        a: "Yes — once your project is paid in full, full ownership of the final video content transfers to you.",
      },
      {
        q: "Can we edit or update videos ourselves in the future?",
        a: "Yes — we deliver final files in formats that allow you or your team to make updates as your business evolves.",
      },
      {
        q: "What support do you offer after delivery?",
        a: "We offer post-delivery support including revisions, refresh packages, and guidance on how to best deploy your content.",
      },
      {
        q: "How do I know if my team is actually using the content?",
        a: "We help you set up simple tracking and hosting solutions so you can see engagement and usage of your video library.",
      },
      {
        q: "How secure is our video library?",
        a: "Your content is stored and delivered through secure, access-controlled platforms so only your team can access sensitive internal videos.",
      },
    ],
  },
  {
    category: "ROI & Results",
    items: [
      {
        q: "How do I measure the ROI of a video content system?",
        a: "We help you track metrics like training time saved, engagement rates, lead generation, and content reuse across the life of your library.",
      },
      {
        q: "Will this actually improve employee engagement?",
        a: "Video content — especially culture and training videos — consistently improves engagement by making information more accessible and human.",
      },
      {
        q: "What about ongoing content needs as our company grows?",
        a: "We offer ongoing production partnerships so your content system keeps pace with your growth, new hires, and new offers.",
      },
      {
        q: "Can we get help updating our system every year or quarter?",
        a: "Yes — we offer quarterly and annual refresh packages to keep your content system current.",
      },
      {
        q: "How long before we see results from our video content system?",
        a: "Many clients see engagement and efficiency gains within the first few weeks of deploying their new content library.",
      },
    ],
  },
  {
    category: "Process & Next Steps",
    items: [
      {
        q: "What's the first step to working with Palmer House Productions?",
        a: "Book a free strategy call — we'll talk through your goals and map out the right content path with no pressure and no jargon.",
      },
      {
        q: "How long does the full content system process take?",
        a: "From strategy call to finished content, most projects are completed in weeks, not months.",
      },
      {
        q: "Can you work with companies outside of Seattle?",
        a: "Yes — beyond Seattle, Bellevue, Tacoma, and Portland, we also support remote-first and distributed teams nationwide.",
      },
      {
        q: "How do I know which package or system is right for my business?",
        a: "That's exactly what your strategy call is for — we'll recommend the right Pal, package, and scope based on your goals.",
      },
      {
        q: "Can you create content for our next product or event launch?",
        a: "Yes — we build launch content including social campaigns, investor content, and announcement videos to maximize impact.",
      },
    ],
  },
];

function FaqPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Frequently Asked Questions"
        title="Every Question"
        highlight="Answered"
        subtitle="Your complete guide to video content systems, pricing, and process. Find exactly what you're looking for."
      />
      {groups.map((group) => (
        <Section key={group.category} eyebrow={group.category} title={group.category}>
          <FaqList items={group.items} />
        </Section>
      ))}
    </PageShell>
  );
}
