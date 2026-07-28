import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { PageShell, PageHero, Section, Card, CardGrid, FaqList, CtaBand } from "@/components/site/PageShell";
import { industries, industryList } from "@/data/industries";

export const Route = createFileRoute("/industries/$slug")({
  head: ({ params }) => {
    const industry = industries[params.slug];
    if (!industry) {
      return { meta: [{ title: "Industry Not Found — Palmer House Productions" }] };
    }
    return {
      meta: [
        { title: `${industry.name} Video Production — Palmer House Productions` },
        { name: "description", content: industry.subtitle },
        { property: "og:title", content: industry.title },
        { property: "og:description", content: industry.subtitle },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: IndustryPage,
});

function IndustryPage() {
  const { slug } = Route.useParams();
  const industry = industries[slug];
  if (!industry) throw notFound();

  const others = industryList.filter((i) => i.slug !== slug);

  return (
    <PageShell>
      <PageHero eyebrow={industry.eyebrow} title={industry.title} subtitle={industry.subtitle} />

      <Section title="Understanding the Challenges" subtitle="What we solve for organizations like yours">
        <CardGrid cols={2}>
          {industry.painPoints.map((p, i) => (
            <Card key={p} index={i + 1} title={p} />
          ))}
        </CardGrid>
      </Section>

      <Section muted title="Our Approach" subtitle={industry.intro[0]}>
        <p className="mx-auto max-w-3xl text-center text-muted-foreground">{industry.intro[1]}</p>
      </Section>

      <Section
        title={`Our ${industry.name} Video Services`}
        subtitle="Comprehensive video production solutions designed for your organization"
      >
        <CardGrid cols={3}>
          {industry.solutions.map((s) => (
            <Card key={s.title} title={s.title} body={s.body} />
          ))}
        </CardGrid>
      </Section>

      <Section muted title="Who We Serve" subtitle={`${industry.name} specialties across the Pacific Northwest`}>
        <CardGrid cols={2}>
          {industry.useCases.map((u) => (
            <Card key={u} title={u} />
          ))}
        </CardGrid>
      </Section>

      <Section title="Outcomes That Matter" subtitle="Real results our video systems deliver">
        <CardGrid cols={4}>
          {industry.outcomes.map((o) => (
            <div key={o.label} className="rounded-2xl border border-border bg-card p-6 text-center shadow-soft">
              <div className="text-gradient-brand font-display text-2xl font-extrabold">{o.stat}</div>
              <h3 className="mt-2 font-display text-sm font-bold">{o.label}</h3>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{o.body}</p>
            </div>
          ))}
        </CardGrid>
      </Section>

      <Section muted title="Frequently Asked Questions">
        <FaqList items={industry.faqs} />
      </Section>

      <Section title="Explore Other Industries">
        <CardGrid cols={3}>
          {others.map((i) => (
            <Link
              key={i.slug}
              to="/industries/$slug"
              params={{ slug: i.slug }}
              className="block rounded-2xl border border-border bg-card p-6 shadow-soft transition-shadow hover:shadow-glow"
            >
              <h3 className="font-display text-lg font-bold">{i.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{i.subtitle}</p>
            </Link>
          ))}
        </CardGrid>
      </Section>

      <CtaBand
        title={`Ready to Elevate ${industry.name}?`}
        subtitle={`Let's discuss how video can help your ${industry.name.toLowerCase()} organization achieve its goals.`}
      />
    </PageShell>
  );
}
