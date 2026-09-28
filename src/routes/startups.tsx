import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Card, CardGrid, CtaBand, PageHero, PageShell, Section } from "@/components/site/PageShell";
import { PalCallout, Scene } from "@/components/site/PalVisuals";
import { createServiceSeo } from "@/lib/seo";

function StartupsPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Video for Pacific Northwest startups"
        title="Show the thing"
        highlight="you’re building."
        subtitle="Make your product easier to understand and your team easier to know. We help Seattle and Pacific Northwest startups plan, film, and edit demos, founder stories, and customer-facing video."
        primary={{ label: "Browse video packages", to: "/shop" }}
        secondary={{
          label: "Talk through your project",
          to: "/contact",
          search: { intent: "production" },
        }}
        visual={
          <Scene
            name="startups"
            priority
            tags={["Product demos", "Founder stories", "Social content"]}
          />
        }
      />
      <Section
        eyebrow="Start with the next conversation"
        title="What does someone need to understand?"
      >
        <CardGrid cols={2}>
          <Card
            lane="spotlight"
            glyph="play"
            title="How the product works"
            body="Show a real use case, the workflow, and what someone can do next. Start with a Product Demos package."
            to="/spotlight-pal"
          />
          <Card
            lane="spotlight"
            glyph="chat"
            title="Why you’re building it"
            body="Put the founder and the problem at the center. Discuss a story for your site, a pitch, or a launch."
            to="/services/video-production"
          />
          <Card
            lane="reel"
            glyph="reel"
            title="What’s new this week"
            body="Introduce a feature, answer a customer question, or take people behind the scenes with short social videos."
            to="/reel-pal"
          />
          <Card
            lane="system"
            glyph="workflow"
            title="What the team needs to know"
            body="Turn a repeated explanation into onboarding, sales training, or a clear video SOP."
            to="/system-pal"
          />
        </CardGrid>
      </Section>
      <Section
        tone="mist"
        eyebrow="Choose how to make it"
        title="Match the support to your stage."
        subtitle="You can develop the idea yourself, work on the preparation together, or have our team handle the production."
      >
        <CardGrid cols={3}>
          <Card
            lane="system"
            glyph="chat"
            title="Develop it in Studio"
            body="Use AI Pals for ideas, scripts, campaign drafts, images, and PDFs. Review and refine the work in your own workspace."
            to="/membership"
          />
          <Card
            lane="evergreen"
            glyph="script"
            title="Get ready with our team"
            body="Work through the message, structure a script, and prepare to present on camera before arranging a shoot."
            to="/content-strategy"
          />
          <Card
            lane="spotlight"
            glyph="camera"
            title="Bring in the crew"
            body="Choose a package and adjust its scope. We confirm the filming plan, timing, and final quote before payment."
            to="/shop"
          />
        </CardGrid>
      </Section>
      <Section eyebrow="A place to start" title="Use one real example.">
        <div className="grid gap-6 lg:grid-cols-2">
          <PalCallout
            pal="kiana"
            quote="Tell me about one customer this actually happened to."
            action={{ label: "Meet your AI creative guides", to: "/meet-the-pals" }}
          />
          <PalCallout
            pal="ryder"
            quote="What could you film in the next hour?"
            action={{ label: "Explore social video packages", to: "/reel-pal" }}
          />
        </div>
        <p className="mx-auto mt-8 max-w-2xl text-center leading-relaxed text-muted-foreground">
          These are the Pals’ creative starting points. Palmer House’s human crew films and edits
          your production. We agree the intended use, claims, and final scope with your team.
        </p>
        <div className="mt-5 text-center">
          <Link
            to="/process"
            className="inline-flex min-h-11 items-center gap-2 font-semibold underline underline-offset-4"
          >
            See how production works <ArrowRight className="size-4" />
          </Link>
        </div>
      </Section>
      <CtaBand
        title="Make the next conversation clearer."
        subtitle="Show us what you’re building, who it’s for, and when you need it. We’ll help you choose a useful first video."
        primaryLabel="Talk to the team"
        primaryTo="/contact"
        primarySearch={{ intent: "production" }}
        secondaryLabel="See production pricing"
        secondaryTo="/production-pricing"
      />
    </PageShell>
  );
}
export const Route = createFileRoute("/startups")({
  head: () => ({
    ...createServiceSeo({
      title: "Startup Video Production Seattle | Palmer House",
      description:
        "Product demos, founder stories, social content, and training videos for Seattle and Pacific Northwest startups. Plan, film, and edit with Palmer House.",
      pathname: "/startups",
      serviceName: "Startup video production",
      serviceType: "Startup pitch, product demo, and brand video production",
    }),
  }),
  component: StartupsPage,
});
