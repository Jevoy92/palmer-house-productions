import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, CardGrid, CtaBand, PageHero, PageShell, Section } from "@/components/site/PageShell";
import { ProcessTimeline } from "@/components/site/PalVisuals";
import { studioCreditAllowance, studioCreditOperations } from "@/lib/studio-credits";
import { createSeo } from "@/lib/seo";

function SprintPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Your first week in Studio"
        title="Start small."
        highlight="Make something useful."
        subtitle={`Your trial starts with ${studioCreditAllowance.trial} credits. Use this guide at your own pace to introduce your business, try a Pal, and leave with work you can build on.`}
        pal="samira"
        primary={{ label: "Open the Studio", to: "/studio" }}
        secondary={{ label: "See plans & credits", to: "/membership/pricing" }}
      />
      <Section
        eyebrow="Four manageable steps"
        title="A first week with a clear next move."
        subtitle="The checklist inside Studio helps you keep track. There is no need to complete everything in one sitting."
        align="left"
      >
        <ProcessTimeline
          steps={[
            {
              title: "Introduce your business",
              body: "Add your audience, voice, and references to Brand DNA. Give your Pal something specific to work with.",
              glyph: "bulb",
              lane: "spotlight",
            },
            {
              title: "Try one useful draft",
              body: "Ask for a post, a script outline, or a few directions. Review the credit cost before generating and choose what helps you most.",
              glyph: "chat",
              lane: "reel",
            },
            {
              title: "Make it sound like you",
              body: "Refine the draft. Check names, facts, and claims. Save what works in your Library, then copy or export it for your own channels.",
              glyph: "edit",
              lane: "system",
            },
            {
              title: "Choose what comes next",
              body: "Plan a date in your Calendar, develop another idea, or bring your script to the Palmer House team for preparation or production help.",
              glyph: "calendar",
              lane: "evergreen",
            },
          ]}
        />
      </Section>
      <Section
        tone="mist"
        eyebrow="Know what you are using"
        title="Your trial has a real credit balance."
        subtitle="Different actions use different amounts. Studio shows the cost before you start, so you can choose how to use your allowance."
        align="left"
      >
        <CardGrid cols={3}>
          <Card
            glyph="chat"
            title={`${studioCreditOperations.chat.credits} credit per Pal reply`}
            body="Explore a thought, ask a question, or refine your message in conversation."
            lane="spotlight"
          />
          <Card
            glyph="spark"
            title={`${studioCreditOperations.image.credits} credits per image`}
            body="Create a visual with a brief that reflects your subject and brand context."
            lane="reel"
          />
          <Card
            glyph="layers"
            title={`${studioCreditOperations.campaign.credits} credits per campaign`}
            body="Generate a set of related written drafts. A campaign uses the full trial allowance; other conversations and generated images use their own credits."
            lane="system"
          />
        </CardGrid>
        <p className="ph-connection-note">
          You can copy or export the drafts you create. A plan or credit purchase is an explicit
          choice, not an automatic next step.{" "}
          <Link to="/membership/pricing">Compare the options.</Link>
        </p>
      </Section>
      <CtaBand
        title="One good starting point is enough."
        subtitle="Your idea does not need to arrive fully formed."
        primaryLabel="Start in Studio"
        primaryTo="/studio"
        secondaryLabel="Explore the workspace"
        secondaryTo="/membership"
        crew={false}
      />
    </PageShell>
  );
}
export const Route = createFileRoute("/membership/sprint")({
  head: () =>
    createSeo({
      title: "Your First Week in Palmer House Studio",
      description:
        "A practical first-week guide to Brand DNA, creative Pals, useful drafts, and your Studio trial credits.",
      pathname: "/membership/sprint",
    }),
  component: SprintPage,
});
