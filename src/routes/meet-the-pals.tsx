import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Card, CardGrid, CtaBand, PageHero, PageShell, Section } from "@/components/site/PageShell";
import { PalCrew } from "@/components/site/PalVisuals";
import { palList } from "@/lib/pal-directory";
import { PAL_PORTRAITS, laneVar } from "@/lib/pal-lanes";
import { createSeo } from "@/lib/seo";

function MeetThePals() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Meet the Pals"
        title="Your ideas."
        highlight="Your kind of company."
        subtitle="Find the voice you like working with. The Pals are our creative guides and your AI assistants in Studio. Our human team handles your filming and editing."
        lane="spotlight"
        primary={{ label: "Explore Studio", to: "/membership" }}
        secondary={{ label: "Browse video packages", to: "/shop" }}
        visual={<PalCrew className="w-full" />}
      />

      <Section
        eyebrow="Choose your creative company"
        title="Who brings out your best ideas?"
        subtitle="Every Pal can help with writing, planning, campaigns, images, and PDFs. Their perspective changes the conversation; your project stays yours."
      >
        <div className="grid gap-5 md:grid-cols-2">
          {palList.map((pal) => (
            <article
              key={pal.key}
              className="surface-card grid overflow-hidden sm:grid-cols-[9rem_1fr]"
            >
              <div className="flex h-48 items-end justify-center overflow-hidden bg-muted/40 sm:h-full">
                <img
                  src={PAL_PORTRAITS[pal.key]}
                  alt={`${pal.name}, Palmer House AI creative assistant`}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-contain object-bottom"
                />
              </div>
              <div className="p-6 sm:p-7">
                <p className="text-xs font-semibold" style={{ color: laneVar(pal.lane, "-text") }}>
                  {pal.role}
                </p>
                <h2 className="mt-2 text-3xl font-extrabold tracking-tight">{pal.name}</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{pal.intro}</p>
                <blockquote className="mt-5 border-t border-border pt-5 text-lg font-semibold leading-snug">
                  “{pal.persona.firstQuestion}”
                </blockquote>
              </div>
            </article>
          ))}
        </div>
        <p className="mt-5 text-sm text-muted-foreground">
          These introductions show each Pal’s style. Choose or create your own Pal inside Studio.
        </p>
      </Section>

      <Section eyebrow="One workspace" title="Change your Pal. Keep your project." tone="mist">
        <CardGrid cols={3}>
          <Card
            lane="spotlight"
            glyph="chat"
            title="A voice that suits you"
            body="Warm and curious, quick and direct, or calm and methodical. Switch Pals when you want another perspective."
          />
          <Card
            lane="system"
            glyph="library"
            title="The same shared context"
            body="Pals use your workspace’s Brand DNA, saved ideas, and project context. You can review and edit the shared memory."
          />
          <Card
            lane="evergreen"
            glyph="script"
            title="Useful work you can keep"
            body="Create drafts, images, PDFs, and campaign materials. Review the results, save them to your Library, and publish through your own channels."
          />
        </CardGrid>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-5 text-sm">
          <Link
            to="/ai-pov"
            className="inline-flex min-h-11 items-center gap-2 font-semibold underline underline-offset-4"
          >
            How we use AI <ArrowRight className="size-4" />
          </Link>
          <Link
            to="/pals"
            className="inline-flex min-h-11 items-center gap-2 font-semibold underline underline-offset-4"
          >
            How Pals relate to video packages <ArrowRight className="size-4" />
          </Link>
        </div>
      </Section>

      <CtaBand
        title="Bring an idea. Find your favorite Pal."
        subtitle="Work independently in Studio, ask our team to help you prepare, or have us produce the video. You choose the amount of support."
        primaryLabel="Explore Studio"
        primaryTo="/membership"
        secondaryLabel="Planning and preparation"
        secondaryTo="/content-strategy"
      />
    </PageShell>
  );
}

export const Route = createFileRoute("/meet-the-pals")({
  head: () => ({
    ...createSeo({
      title: "Meet Your AI Creative Pals | Palmer House",
      description:
        "Meet eight distinct AI creative assistants in Palmer House Studio. Choose a voice you enjoy for writing, planning, campaigns, images, and PDFs.",
      pathname: "/meet-the-pals",
    }),
  }),
  component: MeetThePals,
});
