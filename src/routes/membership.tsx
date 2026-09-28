import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import {
  Card,
  CardGrid,
  CtaBand,
  FaqList,
  PageHero,
  PageShell,
  Section,
} from "@/components/site/PageShell";
import { PublicPalGuide, StudioExample } from "@/components/site/PublicHome";
import { studioPlans } from "@/lib/studio-model";
import { studioCreditAllowance, studioCreditOperations } from "@/lib/studio-credits";
import { createSeo } from "@/lib/seo";

function MembershipPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Palmer House Studio · AI creative workspace"
        title="Your next idea has"
        highlight="a place to go."
        subtitle="Talk with a creative Pal. Turn what you know about your business into useful campaigns, posts, scripts, images, and documents—with your brand context close at hand."
        visual={<StudioExample />}
        primary={{ label: "Try the Studio", to: "/studio" }}
        secondary={{ label: "See plans & credits", to: "/membership/pricing" }}
      />
      <Section
        eyebrow="From conversation to something useful"
        title="Make it. Refine it. Keep it."
        subtitle="A workspace for your ideas and the work that comes from them. You decide what is ready to share."
        align="left"
      >
        <CardGrid cols={3}>
          <Card
            glyph="chat"
            lane="spotlight"
            title="Start with a conversation"
            body="Give your Pal a brief, reference, or question. Your Brand DNA, recent work, and saved context help the conversation pick up where you left off."
          />
          <Card
            glyph="spark"
            lane="reel"
            title="Shape the next piece"
            body="Develop a campaign, revise a post, write a video script, generate an image, or make a PDF. Review each draft and ask for changes in the same conversation."
          />
          <Card
            glyph="library"
            lane="system"
            title="Keep the work connected"
            body="Save ideas, find finished drafts in your Library, and plan dates in your Calendar. Copy or export what you need for the tools you already use."
          />
        </CardGrid>
      </Section>
      <section className="ph-home-section">
        <PublicPalGuide compact />
      </section>
      <Section
        tone="mist"
        eyebrow="Your work, your pace"
        title="A useful place to start. Room to grow."
        subtitle={`Start with ${studioCreditAllowance.trial} trial credits. Paid plans include monthly credits; you can buy more when you need them. The cost is shown before you generate.`}
        align="left"
      >
        <CardGrid cols={3}>
          <Card
            glyph="bulb"
            lane="reel"
            title={`Studio · $${studioPlans.creator.price}/month`}
            body={`${studioCreditAllowance.creator.toLocaleString()} monthly credits and the creative workspace for people making their own content.`}
            to="/membership/pricing"
          />
          <Card
            glyph="chat"
            lane="spotlight"
            title={`Guided · $${studioPlans.business.price}/month`}
            body="Studio tools plus a monthly private strategy hour with the Palmer House team. Useful when you want another set of eyes on the plan."
            to="/membership/pricing"
          />
          <Card
            glyph="calendar"
            lane="system"
            title={`Partner · $${studioPlans.partner.price.toLocaleString()}/month`}
            body="Studio tools plus a weekly private strategy session. Keep a regular conversation around campaigns, creative decisions, and production."
            to="/membership/pricing"
          />
        </CardGrid>
        <p className="ph-connection-note">
          Filming and finished video production are scoped separately.{" "}
          <Link to="/shop">Explore production packages.</Link>
        </p>
      </Section>
      <Section
        eyebrow="A simple first visit"
        title="Bring one idea. Find your rhythm."
        subtitle="The getting-started checklist inside Studio helps you add your brand, meet a Pal, and make your first useful draft."
        align="left"
      >
        <div className="ph-studio-intro">
          <div>
            <h3 className="text-2xl font-bold tracking-tight">
              Tell us what makes your business yours.
            </h3>
            <p>
              Add your audience, voice, and a few references to Brand DNA. Pick a Pal whose
              personality feels right. Then start with one post, one script, or one question.
            </p>
            <Link to="/membership/sprint" className="ph-inline-link">
              See the first-week guide <ArrowRight size={17} />
            </Link>
          </div>
          <div className="surface-card p-7">
            <p className="ph-kicker">An example use of trial credits</p>
            <h3 className="mt-4 text-2xl font-bold">A few ideas. An image. A useful document.</h3>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              10 Pal replies ({10 * studioCreditOperations.chat.credits} credits), an image (
              {studioCreditOperations.image.credits}), and a PDF (
              {studioCreditOperations.pdf.credits}) use{" "}
              {10 * studioCreditOperations.chat.credits +
                studioCreditOperations.image.credits +
                studioCreditOperations.pdf.credits}{" "}
              credits. A complete campaign uses {studioCreditOperations.campaign.credits} credits on
              its own; chat and image generation use additional credits.
            </p>
            <p className="ph-preview-label">
              These are example actions, not automatic tasks. Your balance and the next action’s
              cost appear in Studio.
            </p>
          </div>
        </div>
      </Section>
      <Section eyebrow="Before you begin" title="A few practical answers." align="left">
        <FaqList
          items={[
            {
              q: "Can the Pals make a finished video?",
              a: "Studio helps with video ideas, scripts, and preparation. It does not generate finished videos. For filming and editing, choose a production package or bring a plan to our team.",
            },
            {
              q: "Does Studio publish to social media for me?",
              a: "You review the work and publish it yourself. Studio helps you create drafts, plan a calendar, and copy or export content for your channels.",
            },
            {
              q: "Will switching Pals lose my work?",
              a: "Your content and brand context belong to your workspace. Pals share that context, while keeping their distinct personalities. You can review and manage saved memory in Studio.",
            },
            {
              q: "What if I only need help planning?",
              a: "You can work directly with the Palmer House team on strategy, scripts, or preparation without booking a full shoot. Visit Planning & preparation for the available support.",
            },
          ]}
        />
      </Section>
      <CtaBand
        title="See what your next idea can become."
        subtitle="Start with a conversation. Keep the work you want to build on."
        primaryLabel="Try the Studio"
        primaryTo="/studio"
        secondaryLabel="Compare plans"
        secondaryTo="/membership/pricing"
        crew={false}
      />
    </PageShell>
  );
}
function MembershipRoute() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  return pathname === "/membership" || pathname === "/membership/" ? (
    <MembershipPage />
  ) : (
    <Outlet />
  );
}
export const Route = createFileRoute("/membership")({
  head: () =>
    createSeo({
      title: "Palmer House Studio — AI Creative Tools for Your Business",
      description:
        "Work with a creative AI Pal on campaigns, posts, scripts, images, and PDFs. Keep your brand context and content together in Palmer House Studio.",
      pathname: "/membership",
    }),
  component: MembershipRoute,
});
