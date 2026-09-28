import { createFileRoute } from "@tanstack/react-router";
import {
  Card,
  CardGrid,
  CtaBand,
  InView,
  PageHero,
  PageShell,
  Section,
} from "@/components/site/PageShell";
import { PalCallout, Scene } from "@/components/site/PalVisuals";
import { createSeo } from "@/lib/seo";

function AboutUsPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Palmer House Productions"
        title="Good work deserves"
        highlight="to be understood."
        subtitle="We help businesses turn what they know and do into useful video. Bring us an idea, a question, or a story. We’ll help you decide what to make and how to make it."
        primary={{ label: "See our work", to: "/work" }}
        secondary={{ label: "Talk to the team", to: "/contact", search: { intent: "call" } }}
        visual={
          <Scene
            name="aboutCrew"
            priority
            tags={["Ideas", "People", "Craft"]}
            caption="The Palmer House Pals, our creative guides"
          />
        }
      />

      <Section
        eyebrow="How we help"
        title="The right amount of support."
        subtitle="A full crew, tools to work independently, or help getting ready. These are different ways to work with one creative company."
      >
        <CardGrid cols={3}>
          <Card
            lane="spotlight"
            glyph="camera"
            title="We produce it with you"
            body="Our human crew helps plan, film, and edit your videos. Choose a starting package and we’ll confirm the scope together."
            to="/shop"
          />
          <Card
            lane="system"
            glyph="chat"
            title="You create in Studio"
            body="Work with AI Pals on ideas, campaigns, writing, images, and PDFs. Keep your drafts and brand context in one workspace."
            to="/membership"
          />
          <Card
            lane="evergreen"
            glyph="script"
            title="We help you prepare"
            body="Get human support with strategy, concepts, scripts, wardrobe, and on-camera preparation before you shoot."
            to="/content-strategy"
          />
        </CardGrid>
      </Section>

      <section className="bg-ink px-4 py-16 text-white sm:py-24">
        <InView className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.2fr_.8fr] lg:items-center">
          <blockquote className="text-[clamp(2rem,4.5vw,4rem)] font-extrabold leading-[1.08] tracking-[-0.04em]">
            “I grew up knowing that stories could change lives — but only if told with truth,
            courage, and soul.”
          </blockquote>
          <div className="border-l border-white/20 pl-6">
            <p className="text-xl font-bold">Jevoy Palmer</p>
            <p className="mt-2 text-sm text-white/70">Founder &amp; Lead Creative Guide</p>
            <p className="mt-5 leading-relaxed text-white/80">
              A filmmaker, strategist, and storyteller helping people explain their work and feel
              more at home on camera.
            </p>
          </div>
        </InView>
      </section>

      <Section eyebrow="What matters to us" title="Curiosity first. Care in the details.">
        <CardGrid cols={3}>
          <Card
            lane="spotlight"
            glyph="chat"
            title="Your point of view"
            body="We ask about your customers, your work, and what you want to say. The strongest material usually starts with something that actually happened."
          />
          <Card
            lane="evergreen"
            glyph="bulb"
            title="Clear choices"
            body="You should understand the scope, the price, and what happens next. We agree on those details before production and payment."
          />
          <Card
            lane="system"
            glyph="library"
            title="Work you can use"
            body="A customer story, an explanation, or a training video needs a place to live. We plan for the people who will watch it and the team that will use it."
          />
        </CardGrid>
      </Section>

      <Section
        tone="mist"
        eyebrow="Meet your creative guides"
        title="Our Pals bring a little personality."
        subtitle="The Pals are illustrated guides on this website and AI assistants inside Studio. Our people are behind the camera. You can choose a Pal’s voice without limiting the kinds of work you can make."
      >
        <div className="grid gap-6 lg:grid-cols-2">
          <PalCallout
            pal="kiana"
            quote="Tell me about one customer this actually happened to."
            action={{ label: "Meet the eight Pals", to: "/meet-the-pals" }}
          />
          <PalCallout
            pal="kareem"
            quote="What is the first thing a stranger sees of you?"
            action={{ label: "See the production work", to: "/work" }}
          />
        </div>
      </Section>
      <CtaBand
        title="What are you ready to make?"
        subtitle="You don’t have to arrive with a script. Tell us what you’re working toward, and we’ll help you find a useful place to start."
        primaryLabel="Talk to the team"
        primaryTo="/contact"
        primarySearch={{ intent: "call" }}
        secondaryLabel="Compare ways to work with us"
        secondaryTo="/pricing"
      />
    </PageShell>
  );
}

export const Route = createFileRoute("/about-us")({
  head: () => ({
    ...createSeo({
      title: "About Palmer House Productions",
      description:
        "Meet Palmer House: video production, planning and preparation support, and Studio tools for businesses ready to turn their expertise into useful content.",
      pathname: "/about-us",
    }),
  }),
  component: AboutUsPage,
});
