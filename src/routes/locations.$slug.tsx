import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { PageShell, PageHero, Section, Card, CardGrid, FaqList, CtaBand, Eyebrow } from "@/components/site/PageShell";
import { locations, locationList, type Location } from "@/data/locations";

export const Route = createFileRoute("/locations/$slug")({
  loader: ({ params }) => {
    const location = locations[params.slug];
    if (!location) throw notFound();
    return location;
  },
  head: ({ params }) => {
    const location = locations[params.slug];
    if (!location) return {};
    return {
      meta: [
        { title: `${location.title} | Palmer House Productions` },
        { name: "description", content: location.subtitle },
        { property: "og:title", content: location.title },
        { property: "og:description", content: location.subtitle },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: `Palmer House Productions - ${location.city}, ${location.state}`,
            areaServed: location.serviceAreas,
            address: {
              "@type": "PostalAddress",
              addressLocality: location.city,
              addressRegion: location.state,
              addressCountry: "US",
            },
            telephone: "+14255339060",
            email: "info@palmerhouseproductions.com",
          }),
        },
      ],
    };
  },
  component: LocationPage,
  notFoundComponent: () => (
    <PageShell>
      <Section title="Location not found" subtitle="We don't have a page for that location yet.">
        <div className="text-center">
          <Link to="/locations/$slug" params={{ slug: "seattle-wa" }} className="font-semibold text-gradient-brand">
            View Seattle, WA →
          </Link>
        </div>
      </Section>
    </PageShell>
  ),
});

function LocationPage() {
  const location = Route.useLoaderData() as Location;
  const otherLocations = locationList.filter((l) => l.slug !== location.slug);

  return (
    <PageShell>
      <PageHero eyebrow={location.heroEyebrow} title={location.title} subtitle={location.subtitle} />

      <Section title="Services" subtitle={location.intro}>
        <CardGrid cols={4}>
          {location.services.map((s, i) => (
            <Card key={s.title} title={s.title} body={s.body} index={i + 1} />
          ))}
        </CardGrid>
      </Section>

      <Section
        muted
        title={`Why ${location.city} Businesses Choose Palmer House`}
        subtitle="A nimble, local team that understands the hustle of small business."
      >
        <CardGrid cols={4}>
          {location.whyLocal.map((w) => (
            <Card key={w.title} title={w.title} body={w.body} />
          ))}
        </CardGrid>
        <div className="mx-auto mt-10 grid max-w-3xl grid-cols-3 gap-4 text-center">
          {location.stats.map((stat) => (
            <div key={stat.label}>
              <div className="font-display text-2xl font-extrabold text-gradient-brand sm:text-3xl">{stat.value}</div>
              <div className="mt-1 text-xs text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section title={location.serviceAreasTitle}>
        <div className="mx-auto flex max-w-4xl flex-wrap justify-center gap-3">
          {location.serviceAreas.map((area) => (
            <span
              key={area}
              className="rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold shadow-soft"
            >
              {area}
            </span>
          ))}
        </div>
      </Section>

      <Section muted eyebrow="Client Stories" title="What Local Clients Say">
        <CardGrid cols={2}>
          {location.testimonials.map((t) => (
            <div key={t.name} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <p className="text-sm leading-relaxed text-muted-foreground">&ldquo;{t.quote}&rdquo;</p>
              <p className="mt-4 font-display text-sm font-bold">
                {t.name}
                {t.role && <span className="font-normal text-muted-foreground"> — {t.role}</span>}
              </p>
            </div>
          ))}
        </CardGrid>
      </Section>

      <Section eyebrow="FAQ" title={`${location.city} Questions, Answered`}>
        <FaqList items={location.faqs} />
      </Section>

      <Section title="We Also Serve">
        <div className="flex flex-wrap justify-center gap-3">
          {otherLocations.map((l) => (
            <Link
              key={l.slug}
              to="/locations/$slug"
              params={{ slug: l.slug }}
              className="rounded-full border border-border bg-card px-5 py-2 text-sm font-semibold shadow-soft"
            >
              {l.city}, {l.state} →
            </Link>
          ))}
        </div>
      </Section>

      <CtaBand title={location.ctaTitle} subtitle={location.ctaSubtitle} />
    </PageShell>
  );
}
