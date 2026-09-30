import { createFileRoute } from "@tanstack/react-router";
import { Card, CardGrid, CtaBand, PageHero, PageShell, Section } from "@/components/site/PageShell";
import { PalCallout, Scene } from "@/components/site/PalVisuals";
import { createSeo } from "@/lib/seo";

function AiPovPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Our approach to AI"
        title="More room for ideas."
        highlight="Your judgment stays central."
        subtitle="Studio helps you get from a rough thought to something you can work with. The Pals bring different voices, the tools handle drafting, and you decide what’s right for your business."
        primary={{ label: "Explore Studio", to: "/membership" }}
        secondary={{ label: "Meet the Pals", to: "/meet-the-pals" }}
        visual={
          <Scene
            name="contentStrategy"
            priority
            tags={["Your context", "Creative options", "Your decision"]}
          />
        }
      />
      <Section
        eyebrow="What you can do"
        title="Useful drafts. A place to keep them."
        subtitle="Every Pal shares the same capabilities. Pick a voice you enjoy, then ask for the work you need."
      >
        <CardGrid cols={3}>
          <Card
            lane="spotlight"
            glyph="chat"
            title="Think it through"
            body="Develop ideas, organize a campaign, and work on the message. Your Brand DNA and shared workspace context help keep the conversation specific."
          />
          <Card
            lane="reel"
            glyph="script"
            title="Make the materials"
            body="Draft posts, articles, newsletters, and video scripts. Generate images and PDFs, then review what you want to keep."
          />
          <Card
            lane="system"
            glyph="library"
            title="Build on your work"
            body="Save drafts and generated files to your Library. Organize your plan in the calendar, copy or export the results, and publish through your own channels."
          />
        </CardGrid>
        <p className="mx-auto mt-8 max-w-3xl text-center text-sm leading-relaxed text-muted-foreground">
          Studio helps plan and script video; it doesn’t generate finished footage. The calendar is
          for planning, with publishing handled by you. Credits and action costs are shown in
          Studio.
        </p>
      </Section>
      <Section tone="mist" eyebrow="How we work" title="Keep the material honest.">
        <CardGrid cols={3}>
          <Card
            lane="evergreen"
            glyph="bulb"
            title="Start with something real"
            body="Your knowledge, customer questions, and examples are the source material. Review facts, claims, and generated visuals before you use them."
          />
          <Card
            lane="spotlight"
            glyph="camera"
            title="Show what is an example"
            body="Package previews are animated graphics that explain a format. Our portfolio shows only real production work."
          />
          <Card
            lane="system"
            glyph="shield"
            title="Keep control of the project"
            body="You can review and edit shared memory. Saved work belongs to the workspace, so changing a Pal or the underlying model doesn’t require starting over."
          />
        </CardGrid>
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <PalCallout
            pal="clara"
            quote="Walk me through it in order — what happens first?"
            action={{ label: "Meet Clara and the Pals", to: "/meet-the-pals" }}
          />
          <PalCallout
            pal="kiana"
            quote="What actually happened? That is the part people will remember."
            action={{ label: "See human production work", to: "/work" }}
          />
        </div>
      </Section>
      <CtaBand
        title="Choose where you want the help."
        subtitle="Work independently in Studio, plan with our team, or have us produce the video. You can bring your ideas and drafts from one step to the next."
        primaryLabel="Explore Studio"
        primaryTo="/membership"
        secondaryLabel="Planning and preparation"
        secondaryTo="/content-strategy"
      />
    </PageShell>
  );
}
export const Route = createFileRoute("/ai-pov")({
  head: () => ({
    ...createSeo({
      title: "Our Approach to AI | Palmer House",
      description:
        "How Palmer House Studio uses AI for ideas, campaigns, writing, images, and PDFs while keeping your judgment, context, and creative choices central.",
      pathname: "/ai-pov",
    }),
  }),
  component: AiPovPage,
});
