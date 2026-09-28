import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import {
  Card,
  CardGrid,
  CtaBand,
  IncludedPanel,
  PageHero,
  PageShell,
  Section,
} from "@/components/site/PageShell";
import { ProcessTimeline, Scene } from "@/components/site/PalVisuals";
import { createSeo } from "@/lib/seo";

const steps = [
  {
    title: "Tell us what you need",
    body: "Share your audience, the idea, and where the video will live. Browse a package or start with a conversation.",
    pal: "kiana",
    lane: "spotlight",
  },
  {
    title: "Agree the plan",
    body: "We confirm the topics, finished videos, filming sessions, delivery timing, and quote before payment. Planning includes script and on-camera preparation.",
    pal: "clara",
    lane: "evergreen",
  },
  {
    title: "Film with our crew",
    body: "Our people handle cameras, lighting, audio, and direction. We help you feel prepared and keep the shoot focused.",
    pal: "kareem",
    lane: "spotlight",
  },
  {
    title: "Review and receive",
    body: "Review the edits and share feedback within the agreed scope. Receive finished files in the agreed formats for your team to publish or share.",
    pal: "silas",
    lane: "system",
  },
] as const;

function ProcessPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="How production works"
        title="From the first idea"
        highlight="to the finished video."
        subtitle="A clear plan, a supported shoot, and an edit you can review. You know what’s being made and what happens next."
        primary={{ label: "Browse video packages", to: "/shop" }}
        secondary={{
          label: "Talk through an idea",
          to: "/contact",
          search: { intent: "production" },
        }}
        visual={
          <Scene
            name="processPlanning"
            priority
            tags={["Plan", "Film", "Edit"]}
            caption="Our creative guides illustrate the process; our crew does the production."
          />
        }
      />
      <Section
        eyebrow="Four steps"
        title="A little preparation goes a long way."
        subtitle="You stay involved in the creative decisions. Our team handles the production details."
      >
        <ProcessTimeline steps={[...steps]} />
      </Section>
      <Section tone="mist" eyebrow="Before you commit" title="Make the important details clear.">
        <IncludedPanel
          title="We agree these together."
          items={[
            "What each video needs to say and who it is for.",
            "The number of videos, their lengths, and delivery formats.",
            "Filming sessions, location, access, and who will be on camera.",
            "Scripts, talking points, wardrobe guidance, and preparation.",
            "Editing scope, feedback, and delivery timing.",
            "The final quote, including any travel, tax, and agreed extras.",
          ]}
          lane="system"
          glyph="script"
        />
        <div className="mt-7 text-center">
          <Link
            to="/production-guide"
            className="inline-flex min-h-11 items-center gap-2 font-semibold underline underline-offset-4"
          >
            Read the production guide <ArrowRight className="size-4" />
          </Link>
        </div>
      </Section>
      <Section
        eyebrow="Choose your starting point"
        title="You can start before you’re ready to film."
      >
        <CardGrid cols={3}>
          <Card
            lane="evergreen"
            glyph="script"
            title="Help with preparation"
            body="Work with us on concepts, scripts, and getting comfortable on camera. Preparation can stand alone or lead into a shoot."
            to="/content-strategy"
          />
          <Card
            lane="system"
            glyph="chat"
            title="Develop it in Studio"
            body="Use the Pals and software to draft ideas, plan campaigns, and organize your material. Bring that work into a production conversation when you’re ready."
            to="/membership"
          />
          <Card
            lane="spotlight"
            glyph="camera"
            title="Ready for production"
            body="See the video packages, choose a starting scope, and request your plan. Our team confirms the details with you."
            to="/shop"
          />
        </CardGrid>
      </Section>
      <CtaBand
        title="Bring the idea you keep coming back to."
        subtitle="We’ll help you decide what it needs and what you can do next."
        primaryLabel="Talk to the team"
        primaryTo="/contact"
        primarySearch={{ intent: "call" }}
        secondaryLabel="See production pricing"
        secondaryTo="/production-pricing"
      />
    </PageShell>
  );
}
export const Route = createFileRoute("/process")({
  head: () => ({
    ...createSeo({
      title: "How Video Production Works | Palmer House",
      description:
        "See the steps from planning and preparation to filming, editing, review, and delivery with Palmer House Productions.",
      pathname: "/process",
    }),
  }),
  component: ProcessPage,
});
