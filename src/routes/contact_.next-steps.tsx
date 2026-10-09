import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail } from "lucide-react";
import { PageShell, Section } from "@/components/site/PageShell";
import { PaidClientNote, QuickChatCard } from "@/components/site/QuickChatCard";
import { contactInfo } from "@/data/nav";
import { createSeo } from "@/lib/seo";

export const Route = createFileRoute("/contact_/next-steps")({
  head: () => ({
    ...createSeo({
      title: "Next steps | Palmer House Productions",
      description: "What happens after you contact Palmer House Productions, plus an optional free Friday quick chat.",
      pathname: "/contact/next-steps",
      noIndex: true,
    }),
  }),
  component: NextSteps,
});

function NextSteps() {
  return (
    <PageShell>
      <Section
        eyebrow="Next steps"
        title="Thanks for reaching out."
        subtitle="Our team reads every message and usually replies within one business day. Nothing else is required from you."
        lane="spotlight"
      >
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2 md:items-start">
          <QuickChatCard />
          <div className="space-y-6">
            <div className="rounded-[2rem] border border-border bg-evergreen-soft p-6">
              <span className="grid size-12 place-items-center rounded-2xl bg-evergreen text-white">
                <Mail className="size-6" aria-hidden="true" />
              </span>
              <h3 className="mt-4 text-xl font-extrabold">Prefer email?</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Add anything you forgot, or send files, by writing to us directly.
              </p>
              <a
                href={`mailto:${contactInfo.email}`}
                className="mt-4 inline-flex min-h-11 items-center font-semibold underline underline-offset-4"
              >
                {contactInfo.email}
              </a>
            </div>
            <PaidClientNote />
          </div>
        </div>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link to="/" className="secondary-action">Back to home</Link>
          <Link to="/process" className="secondary-action">See how we work</Link>
        </div>
      </Section>
    </PageShell>
  );
}
