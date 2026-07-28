import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero, Section, CtaBand } from "@/components/site/PageShell";

export const Route = createFileRoute("/resources/reviews")({
  head: () => ({
    meta: [
      { title: "Client Reviews | Palmer House Productions" },
      {
        name: "description",
        content:
          "Real stories from real clients who've transformed their brands through authentic video storytelling with Palmer House Productions.",
      },
      { property: "og:title", content: "Client Reviews | Palmer House Productions" },
      {
        property: "og:description",
        content: "What our clients say about working with Palmer House Productions.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ReviewsPage,
});

const reviews = [
  {
    time: "2 months ago",
    quote:
      "Jevoy and his team did an amazing job with pictures & videos of our team and stores. Our management was blown away by the quality, professionalism, and speed at which their media was produced. They took the time to understand our goals and delivered exceptional results.",
    initials: "IJ",
    name: "Isabella Johnstun",
    role: "Dick's Restaurant Supply",
  },
  {
    time: "4 months ago",
    quote:
      "Jevoy and the Palmer House Team were fantastic! Getting in front of the camera for photos is one stressor, but jumping in front of the camera to make a video is even more stressful. Jevoy has a gift of helping his clients become grounded and comfortable.",
    initials: "AS",
    name: "Athan Seyler",
    role: "Local Guide",
  },
  {
    time: "2 months ago",
    quote:
      "The Palmer House Productions team is incredibly warm, patient, and skilled! I'm painfully camera-shy, and they made the experience as comfortable as it ever could've been. They encouraged me along the way, tailoring the shoot in some very creative ways to achieve a highly professional video. Highly recommend!",
    initials: "CP",
    name: "Chelsea Power",
  },
  {
    time: "4 months ago",
    quote:
      "Jevoy and his team did video marketing for me and my work. I don't love being in front of camera, and they made it easy, comfortable, seamless, and gave me the pointers and guidance I needed to get it done with hardly any cuts! Highly recommend them for any of your marketing needs!",
    initials: "RD",
    name: "Rachel Delavan",
    role: "Local Guide",
  },
  {
    time: "a year ago",
    quote:
      "Awesome experience from start to finish working with Jevoy. He was in constant communication, detail-oriented and provided exactly what we were looking for in our organization's marketing videos and photos.",
    initials: "SJ",
    name: "Sarah Dylan Jensen",
    role: "Local Guide",
  },
  {
    time: "2 years ago",
    quote:
      "Jevoy is amazing. He's super easy to work with. He made me very comfortable to do a shoot with. I'd highly recommend him to anyone looking for good photos for any event. We used his pics for my website and got all good compliments!",
    initials: "CS",
    name: "Cynthia Scanlon",
  },
  {
    time: "2 months ago",
    quote:
      "It was my first time in a professional environment. Jevoy gave me lots of good tips through the process to make it easier. Professional, patient, and skilled team.",
    initials: "JR",
    name: "James Russell",
    role: "Local Guide",
  },
  {
    time: "11 months ago",
    quote:
      "I have done two photoshoots with Jevoy and the photos from both sessions turned out amazing. I love them. Besides that, he is easy to communicate and work with. I would easily work with Palmer House Productions again.",
    initials: "QT",
    name: "Quenia Tolentino",
  },
  {
    time: "2 years ago",
    quote:
      "Jevoy is an absolute dream to work with! He has a great eye and is very knowledgeable. My photos turned out so amazing I would highly recommend him to anyone looking to book a photographer!!",
    initials: "OC",
    name: "Olivia Colantonio",
  },
];

function ReviewsPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Client Stories"
        title="What Our Clients"
        highlight="Say"
        subtitle="Real stories from real clients who've transformed their brands through authentic video storytelling."
      />
      <Section>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((r) => (
            <div key={r.name + r.time} className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-soft">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{r.time}</p>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">&ldquo;{r.quote}&rdquo;</p>
              <div className="mt-5 flex items-center gap-3">
                <span
                  className="flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold text-white"
                  style={{ backgroundImage: "var(--gradient-brand)" }}
                >
                  {r.initials}
                </span>
                <div>
                  <p className="font-display text-sm font-bold">{r.name}</p>
                  {r.role && <p className="text-xs text-muted-foreground">{r.role}</p>}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <a
            href="https://www.google.com/search?q=Palmer+House+Productions+reviews"
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold shadow-soft"
          >
            View All Google Reviews
          </a>
        </div>
      </Section>
      <CtaBand
        title="Ready to Create Your Success Story?"
        subtitle="Join the growing community of businesses that have transformed their brand presence through authentic video storytelling."
        primaryLabel="Start Your Journey"
      />
    </PageShell>
  );
}
