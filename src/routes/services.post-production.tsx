import { createFileRoute } from "@tanstack/react-router";
import { Card, CardGrid, CtaBand, PageHero, PageShell, Section } from "@/components/site/PageShell";
import { ProcessTimeline, Scene } from "@/components/site/PalVisuals";
import { createServiceSeo } from "@/lib/seo";

const services = [
  {
    title: "Story and editing",
    body: "Find the useful takes, shape the story, and get the pacing right. We can work from your footage or continue a Palmer House production.",
    lane: "spotlight",
    glyph: "edit",
  },
  {
    title: "Color and sound",
    body: "Match the shots, balance dialogue, and refine the overall look and sound. We assess the source material before promising what can be restored.",
    lane: "evergreen",
    glyph: "mic",
  },
  {
    title: "Titles and graphics",
    body: "Use names, titles, diagrams, or motion graphics where they make the video easier to follow. The complexity is agreed in scope.",
    lane: "system",
    glyph: "layers",
  },
  {
    title: "Versions for your channels",
    body: "Plan the aspect ratios, captions, and additional edits you need for your website, social channels, or internal tools.",
    lane: "reel",
    glyph: "publish",
  },
] as const;

function PostProductionPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Editing and post-production"
        title="You have the footage."
        highlight="Let’s find the film in it."
        subtitle="Bring us what you’ve shot and what you need it to do. Our editors help shape the story, refine the picture and sound, and prepare the versions you’ll use."
        primary={{
          label: "Discuss an editing project",
          to: "/contact",
          search: { intent: "editing" },
        }}
        secondary={{ label: "See our work", to: "/work" }}
        visual={
          <Scene name="postProduction" priority tags={["Story", "Color + sound", "Final files"]} />
        }
      />
      <Section
        eyebrow="What we can help with"
        title="Choose what the footage needs."
        subtitle="Editing can stand alone. Send us the brief and details of your footage so we can confirm what’s possible, the scope, and the price."
      >
        <CardGrid cols={2}>
          {services.map((service) => (
            <Card
              key={service.title}
              title={service.title}
              body={service.body}
              lane={service.lane}
              glyph={service.glyph}
            />
          ))}
        </CardGrid>
      </Section>
      <Section
        tone="mist"
        eyebrow="The editing process"
        title="A clear handoff. Room for your feedback."
      >
        <ProcessTimeline
          steps={[
            {
              title: "Review the material",
              body: "Tell us what you filmed, the source formats, and the result you want. We assess the files and agree the brief.",
              glyph: "search",
              lane: "evergreen",
            },
            {
              title: "Agree the scope",
              body: "Confirm the finished videos, lengths, formats, revision rounds, delivery timing, and quote before work starts.",
              glyph: "script",
              lane: "system",
            },
            {
              title: "Review the edit",
              body: "Our editors build the cut. You share consolidated feedback at the agreed review points.",
              glyph: "edit",
              lane: "spotlight",
            },
            {
              title: "Receive the files",
              body: "Get the agreed final versions, organized for your team to publish, share, or add to your own library.",
              glyph: "publish",
              lane: "reel",
            },
          ]}
        />
      </Section>
      <Section
        eyebrow="A useful starting brief"
        title="Tell us what you have, and where it’s going."
        subtitle="You don’t need to upload every take with your first inquiry."
      >
        <div className="surface-card mx-auto max-w-3xl p-6 sm:p-9">
          <ul className="divide-y divide-border text-base">
            {[
              "What the video should say and who will watch it.",
              "How much footage you have, and how it was filmed.",
              "Any existing script, selects, brand guide, or reference edit.",
              "The number of finished videos and where you’ll use them.",
              "Your deadline, review process, and any caption or accessibility needs.",
            ].map((line) => (
              <li key={line} className="py-4 first:pt-0 last:pb-0">
                {line}
              </li>
            ))}
          </ul>
        </div>
      </Section>
      <Section
        tone="mist"
        eyebrow="Need a different starting point?"
        title="The pieces can work together."
      >
        <CardGrid cols={3}>
          <Card
            lane="spotlight"
            glyph="camera"
            title="Need filming too?"
            body="Our production packages bring planning, filming, and editing together."
            to="/shop"
          />
          <Card
            lane="evergreen"
            glyph="script"
            title="Still shaping the idea?"
            body="Get human help with a concept, script, and preparation before you shoot."
            to="/content-strategy"
          />
          <Card
            lane="system"
            glyph="chat"
            title="Develop your own materials"
            body="Use Studio’s AI Pals for scripts, campaign drafts, images, and PDFs. Video editing remains a human service."
            to="/membership"
          />
        </CardGrid>
      </Section>
      <CtaBand
        title="Put your footage to work."
        subtitle="Tell us about the material and the finish you have in mind. We’ll follow up to confirm the editing scope and next steps."
        primaryLabel="Discuss an editing project"
        primaryTo="/contact"
        primarySearch={{ intent: "editing" }}
        secondaryLabel="See our work"
        secondaryTo="/work"
      />
    </PageShell>
  );
}
export const Route = createFileRoute("/services/post-production")({
  head: () => ({
    ...createServiceSeo({
      title: "Video Editing & Post-Production | Palmer House",
      description:
        "Video editing, color, sound, motion graphics, and delivery formats for your footage. Discuss a scoped editing project with Palmer House Productions.",
      pathname: "/services/post-production",
      serviceName: "Post-production services",
      serviceType: "Video editing and post-production",
    }),
  }),
  component: PostProductionPage,
});
