import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell, PageHero, Section, Card, CardGrid, CtaBand } from "@/components/site/PageShell";

const services = [
  { title: "Video Editing & Assembly", body: "Expert editing that transforms raw footage into polished, engaging content. We craft narratives that capture attention and maintain viewer interest from start to finish.", tags: ["Multi-cam Editing", "Narrative Flow", "Pacing Optimization", "Transitions & Effects"] },
  { title: "Color Grading & Correction", body: "Professional color grading that establishes mood, ensures brand consistency, and creates a cinematic look that elevates your content above standard video.", tags: ["Color Matching", "Mood Creation", "Brand Consistency", "Cinematic Grading"] },
  { title: "Audio Engineering & Sound Design", body: "Crystal-clear audio mixing, sound effects, and music integration that enhances emotional impact and ensures professional broadcast-quality sound.", tags: ["Audio Mixing", "Noise Reduction", "Sound Effects", "Music Licensing"] },
  { title: "Motion Graphics & Animation", body: "Eye-catching motion graphics, lower thirds, title animations, and visual effects that reinforce your brand and explain complex concepts clearly.", tags: ["Animated Titles", "Infographics", "Logo Animation", "Visual Effects"] },
  { title: "Format Optimization & Delivery", body: "Multi-platform optimization ensuring your video looks perfect whether it's on YouTube, LinkedIn, Instagram, or your website—formatted for maximum engagement.", tags: ["Platform-Specific Edits", "Aspect Ratio Variants", "Compression Optimization", "Subtitle Integration"] },
  { title: "Revision & Refinement", body: "Collaborative revision process that ensures the final product perfectly aligns with your vision, brand standards, and business objectives.", tags: ["Structured Feedback", "Unlimited Revisions", "Version Control", "Final Delivery"] },
];

const steps = [
  { title: "Review & Assessment", body: "We review all raw footage, identify the best takes, and create a detailed editing plan aligned with your goals." },
  { title: "First Cut Assembly", body: "Rough cut assembly establishing narrative flow, pacing, and structure for your approval before detail work begins." },
  { title: "Refinement & Polish", body: "Color grading, audio mixing, motion graphics, and visual effects are added to create a professional, polished product." },
  { title: "Final Delivery", body: "Optimized final files delivered in all required formats for seamless deployment across your chosen platforms." },
];

const capabilities = [
  { title: "Advanced Color Grading", body: "Create stunning visual consistency and mood with professional-grade color correction and grading techniques." },
  { title: "Audio Restoration", body: "Remove background noise, echo, and imperfections to ensure broadcast-quality audio clarity." },
  { title: "Motion Graphics", body: "Custom animated elements that reinforce your brand identity and explain complex information visually." },
  { title: "Multi-Format Optimization", body: "Deliver platform-specific versions optimized for Instagram, YouTube, LinkedIn, Facebook, and web — 9:16, 16:9, and 1:1." },
  { title: "Subtitle & Caption Creation", body: "Professional subtitle and closed caption services for accessibility and engagement across silent-viewing platforms." },
  { title: "Archive & Asset Management", body: "Organized project files and raw assets archived for future edits, repurposing, and version updates." },
];

const related = [
  { title: "Video Production", body: "Professional filming services for all your video content needs.", to: "/services/video-production" },
  { title: "Consulting & Strategy", body: "Strategic planning to maximize your video content ROI.", to: "/content-strategy" },
  { title: "DIY Tools & Downloads", body: "Templates and resources for self-service video creation.", to: "/services/diy-downloads" },
];

function PostProductionPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Professional Post-Production"
        title="Post-Production"
        highlight="That Elevates Every Frame"
        subtitle="Transform raw footage into captivating content with professional editing, color grading, audio engineering, and motion graphics that elevate your brand."
      />

      <Section eyebrow="Services" title="Complete Post-Production Services" subtitle="Every detail matters. Our comprehensive post-production services ensure your video looks and sounds exceptional across all platforms.">
        <CardGrid cols={3}>
          {services.map((s) => (
            <div key={s.title} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <h3 className="font-display text-lg font-bold">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {s.tags.map((t) => (
                  <span key={t} className="rounded-full border border-border px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">{t}</span>
                ))}
              </div>
            </div>
          ))}
        </CardGrid>
      </Section>

      <Section muted eyebrow="Workflow" title="Our Editing Workflow" subtitle="A streamlined process that delivers exceptional results while keeping you involved and informed at every stage.">
        <CardGrid cols={4}>
          {steps.map((s, i) => (
            <Card key={s.title} index={i + 1} title={s.title} body={s.body} />
          ))}
        </CardGrid>
      </Section>

      <Section eyebrow="Capabilities" title="Advanced Capabilities" subtitle="Cutting-edge tools and techniques to bring your vision to life.">
        <CardGrid cols={3}>
          {capabilities.map((c) => (
            <Card key={c.title} title={c.title} body={c.body} />
          ))}
        </CardGrid>
      </Section>

      <Section muted eyebrow="Meet Your Editor" title="Spotlight Pal, Your Post-Production Expert">
        <div className="mx-auto max-w-2xl rounded-2xl border border-border bg-card p-8 text-center shadow-soft">
          <p className="text-muted-foreground">
            Spotlight Pal specializes in transforming raw footage into polished, professional content. With expertise in editing, color grading, and audio post-production, Spotlight ensures every frame tells your story perfectly.
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-1.5">
            {["Expert Editing", "Color Grading", "Audio Mixing", "Motion Graphics"].map((t) => (
              <span key={t} className="rounded-full border border-border px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">{t}</span>
            ))}
          </div>
          <Link to="/spotlight-pal" className="mt-5 inline-block text-sm font-semibold text-gradient-brand">Learn More About Spotlight Pal →</Link>
        </div>
      </Section>

      <Section eyebrow="Related" title="Related Video Services">
        <CardGrid cols={3}>
          {related.map((r) => (
            <div key={r.title} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <h3 className="font-display text-lg font-bold">{r.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{r.body}</p>
              <Link to={r.to} className="mt-3 inline-block text-sm font-semibold text-gradient-brand">Learn More →</Link>
            </div>
          ))}
        </CardGrid>
      </Section>

      <CtaBand
        title="Ready to Transform Your Raw Footage?"
        subtitle="Let's discuss how professional post-production can elevate your video content and maximize its impact across all platforms."
        primaryLabel="Get Started Today"
      />
    </PageShell>
  );
}

export const Route = createFileRoute("/services/post-production")({
  head: () => ({
    meta: [
      { title: "Post-Production Services | Palmer House Productions" },
      { name: "description", content: "Professional editing, color grading, audio engineering, and motion graphics that elevate raw footage into captivating brand content." },
      { property: "og:title", content: "Post-Production Services | Palmer House Productions" },
      { property: "og:description", content: "Transform raw footage into polished, professional video content." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PostProductionPage,
});
