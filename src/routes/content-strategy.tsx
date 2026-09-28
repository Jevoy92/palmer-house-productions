import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { PageHero, PageShell, Section } from "@/components/site/PageShell";
import { PalCallout, Scene } from "@/components/site/PalVisuals";
import { studioConsultingOffer } from "@/lib/studio-model";
import { createServiceSeo } from "@/lib/seo";

const support = [
  {
    title: "A direction worth filming",
    body: "Work through your audience, message and concepts. Choose what the video needs to do before choosing how it looks.",
    image: "/packages/lanes/evergreen.png",
    items: ["Strategy and priorities", "Concepts and talking points"],
  },
  {
    title: "Words that sound like you",
    body: "Turn what you know into a useful script or outline. We agree the amount of writing and review your project needs.",
    image: "/packages/lanes/spotlight.png",
    items: ["Script development and review", "A structure you can deliver naturally"],
  },
  {
    title: "Confidence on shoot day",
    body: "Prepare the practical details around the person and the camera, whether you film yourself or bring a crew.",
    image: "/packages/lanes/system.png",
    items: ["Wardrobe and filming environment", "On-camera preparation and delivery"],
  },
];
function ContentStrategyPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Planning & shoot preparation"
        title="An idea is a start."
        highlight="Let’s get it ready to shoot."
        subtitle="Get human help with strategy, concepts, scripts and preparation. You can work with us before hiring a crew—or take the plan and film it yourself."
        lane="evergreen"
        primary={{
          label: "Tell us what you need",
          to: "/contact",
          search: { intent: "preparation" },
        }}
        secondary={{ label: "Free shoot-day guide", to: "/production-guide" }}
        visual={
          <Scene
            name="contentStrategy"
            priority
            tags={["A clear idea", "A usable script", "Camera-ready"]}
          />
        }
      />
      <Section
        eyebrow="Support where it helps"
        title="Bring the part you’re stuck on."
        subtitle="We agree the deliverables and scope with you. A focused conversation and a complete script-development project are different kinds of help."
      >
        <div className="grid gap-5 lg:grid-cols-3">
          {support.map((item) => (
            <article key={item.title} className="surface-card p-6 sm:p-8">
              <img src={item.image} width={72} height={72} alt="" />
              <h3 className="mt-5 text-2xl font-bold">{item.title}</h3>
              <p className="mt-4 leading-relaxed text-muted-foreground">{item.body}</p>
              <ul className="mt-6 space-y-3">
                {item.items.map((text) => (
                  <li key={text} className="flex gap-2 text-sm">
                    <Check className="mt-0.5 size-4 shrink-0" />
                    {text}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Section>
      <Section
        eyebrow="One focused working session"
        title={studioConsultingOffer.name}
        subtitle="A practical place to resolve a campaign, filming-space, offer or content decision."
      >
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div className="surface-card p-7 sm:p-10">
            <p className="text-5xl font-extrabold">
              ${studioConsultingOffer.price}
              <span className="ml-3 text-base font-medium text-muted-foreground">
                {studioConsultingOffer.duration} minutes
              </span>
            </p>
            <p className="mt-5 text-muted-foreground">
              Includes {studioConsultingOffer.includedDays} days of Studio access. Our team confirms
              availability, the focus of your session and access details before booking.
            </p>
            <p className="mt-4 text-sm text-muted-foreground">
              Need a written strategy, several scripts or more preparation time? Tell us what you
              need and we’ll scope it separately.
            </p>
            <Link to="/contact" search={{ intent: "intensive" }} className="primary-action mt-7">
              Request the intensive <ArrowRight className="size-4" />
            </Link>
          </div>
          <PalCallout
            pal="clara"
            quote="Bring the question you keep circling. We’ll make the next decision together, then give it somewhere useful to go."
          />
        </div>
      </Section>
      <Section
        eyebrow="Your next move"
        title="Take the plan where you want it."
        subtitle="Preparation can stand on its own. When it is part of a production package, pre-shoot planning, script help and wardrobe guidance are already included."
      >
        <div className="flex flex-wrap gap-3">
          <Link to="/shop" className="primary-action">
            Explore full production <ArrowRight className="size-4" />
          </Link>
          <Link to="/membership" className="secondary-action">
            Build with Studio
          </Link>
          <Link to="/production-guide" className="secondary-action">
            Read the free preparation guide
          </Link>
        </div>
      </Section>
    </PageShell>
  );
}
export const Route = createFileRoute("/content-strategy")({
  head: () =>
    createServiceSeo({
      title: "Planning & Shoot Preparation | Palmer House Productions",
      description:
        "Human support for video strategy, concepts, scripts, wardrobe and on-camera preparation. Start with a Clarity Intensive or request a scoped project.",
      pathname: "/content-strategy",
      serviceName: "Video planning and shoot preparation",
      serviceType: "Video strategy consulting",
    }),
  component: ContentStrategyPage,
});
