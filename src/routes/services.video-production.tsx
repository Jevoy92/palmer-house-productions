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
import { ProcessTimeline } from "@/components/site/PalVisuals";
import { HomePackages } from "@/components/site/PublicHome";
import {
  BASE_INCLUDED,
  EVERGREEN_LENGTH_PRICE,
  FINISHED_VIDEO_PRICE,
  SESSION_PRICE,
} from "@/lib/pricing-catalog";
import { createServiceSeo } from "@/lib/seo";
import production from "@/assets/work/PoliticianAnnouncement-poster.jpg";

function VideoProductionPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Full production · Pacific Northwest"
        title="You bring the business."
        highlight="We help tell the story."
        subtitle="A human team to plan, film, and edit your videos. From a customer story to training your next hire, start with what the video needs to do."
        visual={
          <Link to="/work" className="ph-production-visual">
            <img
              src={production}
              alt="An on-camera speaker in a Palmer House portfolio film"
              width={960}
              height={540}
            />
            <span>
              See our work <ArrowRight size={17} />
            </span>
          </Link>
        }
        primary={{ label: "Explore video packages", to: "/shop" }}
        secondary={{ label: "Help me choose", to: "/find-your-pal" }}
      />
      <HomePackages />
      <Section
        tone="mist"
        eyebrow="How we work together"
        title="Clear before the camera rolls."
        subtitle="Your package starts the conversation. We confirm the scope, timing, and final quote with you before payment."
        align="left"
      >
        <ProcessTimeline
          steps={[
            {
              title: "Choose a starting point",
              body: "Pick the kind of video you need and adjust the amount of work. Your plan keeps the package and working estimate together.",
              glyph: "bulb",
              lane: "spotlight",
            },
            {
              title: "Prepare the shoot",
              body: "We confirm the audience, message, scripts, location, and deliverables. Planning includes wardrobe guidance and getting comfortable on camera.",
              glyph: "script",
              lane: "evergreen",
            },
            {
              title: "Film with our team",
              body: "Standard package sessions are two hours on location, with professional lighting, sound, and direction. Educational episodes have their own scope; we confirm the time needed in your quote.",
              glyph: "camera",
              lane: "reel",
            },
            {
              title: "Review the finished work",
              body: "We edit, color, and mix the sound, then deliver the agreed formats. Your quote confirms the review process and delivery schedule.",
              glyph: "edit",
              lane: "system",
            },
          ]}
        />
      </Section>
      <Section
        eyebrow="Understand the estimate"
        title="Know what goes into the price."
        align="left"
      >
        <div className="ph-production-prices">
          <div>
            <span className="ph-kicker">Short-form & training packages</span>
            <strong>
              ${SESSION_PRICE} <span>+ ${FINISHED_VIDEO_PRICE}</span>
            </strong>
            <p>
              Per filming session + per finished video. One session and six videos is $
              {(SESSION_PRICE + FINISHED_VIDEO_PRICE * 6).toLocaleString()}.
            </p>
          </div>
          <div>
            <span className="ph-kicker">Educational episodes · Evergreen</span>
            <strong>${EVERGREEN_LENGTH_PRICE[5].toLocaleString()}</strong>
            <p>
              For a five-minute episode, with its own production scope. Add $
              {EVERGREEN_LENGTH_PRICE[10] - EVERGREEN_LENGTH_PRICE[5]} per extra five minutes.
            </p>
          </div>
        </div>
        <p className="ph-connection-note">
          These are working estimates. Final scope, filming capacity, tax, and travel are confirmed
          in your quote. <Link to="/production-pricing">Build your estimate.</Link>
        </p>
        <div className="mt-10">
          <IncludedPanel
            title="The production essentials are included."
            items={BASE_INCLUDED}
            lane="system"
            glyph="camera"
          />
        </div>
      </Section>
      <Section
        tone="mist"
        eyebrow="Start where you are"
        title="Need a different level of help?"
        align="left"
      >
        <CardGrid cols={3}>
          <Card
            glyph="script"
            lane="evergreen"
            title="Help before the shoot"
            body="Work through strategy, scripts, wardrobe, or on-camera preparation with our team."
            to="/content-strategy"
          />
          <Card
            glyph="edit"
            lane="spotlight"
            title="Your footage, our edit"
            body="Already filmed it? Bring your footage and a clear brief for editing support."
            to="/services/post-production"
          />
          <Card
            glyph="library"
            lane="system"
            title="Make the plan yourself"
            body="Use Studio’s AI Pals and tools to develop your own campaign, drafts, and scripts."
            to="/membership"
          />
        </CardGrid>
      </Section>
      <CtaBand
        title="Let’s find the video your business needs."
        subtitle="Choose a package or tell the team what you have in mind."
        primaryLabel="Browse packages"
        primaryTo="/shop"
        secondaryLabel="Talk to the team"
        secondaryTo="/contact"
        crew={false}
      />
    </PageShell>
  );
}
export const Route = createFileRoute("/services/video-production")({
  head: () =>
    createServiceSeo({
      title: "Video Production — Planning, Filming & Editing | Palmer House",
      description:
        "A Pacific Northwest production team for business videos, customer stories, commercials, onboarding, and training. Choose a package and see your working estimate.",
      pathname: "/services/video-production",
      serviceName: "Video production services",
      serviceType: "Commercial video production",
    }),
  component: VideoProductionPage,
});
