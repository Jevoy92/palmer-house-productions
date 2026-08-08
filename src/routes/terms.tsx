import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero, Section } from "@/components/site/PageShell";

const LAST_UPDATED = "August 7, 2026";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service | Palmer House Productions" },
      {
        name: "description",
        content:
          "The terms that govern Palmer House Productions video production services, digital downloads, and the Palmer House Studio membership app.",
      },
      { property: "og:title", content: "Terms of Service | Palmer House Productions" },
      {
        property: "og:description",
        content:
          "The terms that govern Palmer House Productions video production services, digital downloads, and the Palmer House Studio membership app.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "index, follow" },
    ],
    links: [{ rel: "canonical", href: "https://www.palmerhouseproductions.com/terms" }],
  }),
  component: TermsPage,
});

const sections: { title: string; body: string[] }[] = [
  {
    title: "Agreement",
    body: [
      "These terms govern your use of the Palmer House Productions website, the Palmer House Studio application, our digital downloads, and our video production and post-production services. By using any of them you agree to these terms.",
      "If you have signed a separate production agreement, statement of work, or proposal with us, that document controls where it conflicts with these terms.",
    ],
  },
  {
    title: "What We Provide",
    body: [
      "Production services: filming, direction, editing, and delivery of video, scoped in a written proposal or production agreement.",
      "Palmer House Studio: a subscription web application where members build a brand profile, generate campaign strategy and content with AI assistance, and organize ideas, assets, and a content calendar.",
      "Digital downloads and guides: one-time purchases delivered electronically.",
      "We may improve, change, or retire features of Studio over time. If we retire a feature that is central to your paid plan, we will give you notice and a prorated refund or credit for the unused portion.",
    ],
  },
  {
    title: "Studio Accounts",
    body: [
      "You must be at least 18 years old and provide accurate information to create an account. You are responsible for keeping your sign-in credentials secure and for activity that happens under your account. Tell us right away if you suspect unauthorized access.",
      "Each membership is for one business or organization. Do not share a single login across separate companies, resell access, or use automated means to scrape or overload the service.",
      "We may suspend or close an account that violates these terms, abuses the service, or fails to pay. You can close your account at any time from Studio settings or by emailing us.",
    ],
  },
  {
    title: "Acceptable Use of the AI Tools",
    body: [
      "Studio's AI tools generate drafts — scripts, posts, articles, and plans — based on what you provide. Output is a starting point, not professional advice, and it may contain errors. You are responsible for reviewing, fact-checking, and approving anything before you publish it.",
      "Do not use the tools to create unlawful, defamatory, deceptive, harassing, or infringing content, to impersonate another person or business, or to make claims you cannot substantiate. Do not submit confidential third-party information, personal health information, government identifiers, or payment card data into prompts.",
      "AI output is not guaranteed to be unique. Similar prompts may produce similar results for other members, and we cannot promise that generated text is free of resemblance to existing material.",
    ],
  },
  {
    title: "Fees, Billing, and Refunds",
    body: [
      "Payments are processed by Stripe. By purchasing, you authorize the charges shown at checkout, plus any applicable taxes.",
      "Memberships: subscriptions renew automatically each billing period at the then-current rate until cancelled. You can cancel at any time from your billing settings; cancellation takes effect at the end of the current period and you keep access until then. We do not prorate partial periods, and membership fees are non-refundable except where required by law or where we retire a core feature as described above.",
      "Credits: Studio plans include a monthly allowance of tool credits. Credits refresh with each billing period, do not roll over, and have no cash value. Add-on credit packs are non-refundable once used.",
      "Production work: deposits, milestones, and balances are set in your production agreement. Deposits reserve your shoot dates and are non-refundable once we hold those dates, and final deliverables are released after the balance is paid.",
      "Digital downloads are non-refundable once the file has been delivered.",
      "Fees may change. For subscriptions, we will give at least 30 days' notice before a price change affects your renewal.",
    ],
  },
  {
    title: "Scheduling, Rescheduling, and Client Cooperation",
    body: [
      "Shoot dates are confirmed in writing. Reschedules requested at least 14 days ahead are accommodated where our calendar allows; later changes may incur a fee covering crew and equipment already committed.",
      "Timely delivery depends on you: locations and participants ready as scheduled, and feedback and approvals returned within the windows set in your agreement. Delays on your side move the delivery schedule accordingly.",
      "Each project includes the revision rounds stated in its agreement. Additional revisions or changes in scope are quoted separately.",
    ],
  },
  {
    title: "Ownership and Licenses",
    body: [
      "Your content: you keep ownership of everything you supply — brand materials, logos, footage you provide, and the text you enter into Studio. You grant us the limited license we need to host it, process it, and deliver the services you requested. You confirm you have the rights to what you submit.",
      "AI output: as between you and us, the drafts Studio generates for your workspace are yours to use, subject to your compliance with these terms and payment of applicable fees.",
      "Commissioned video: on final payment, you receive the ownership or license set out in your production agreement. Until final payment, all deliverables remain our property and may not be published. Project files, raw footage, and editing projects stay ours unless your agreement says otherwise.",
      "Our materials: the Palmer House Productions name, logos, the Pals characters, the Studio interface, our frameworks, templates, and site content are our intellectual property. Purchasing a download or membership gives you the right to use it in your own business, not to resell, redistribute, or republish it as your own product.",
      "Portfolio: we may show completed work in our portfolio and marketing unless your agreement restricts it or you ask us in writing to remove it.",
    ],
  },
  {
    title: "Third-Party Services",
    body: [
      "The services rely on providers including Stripe, Google, HoneyBook, and our hosting and AI vendors. Their availability and terms are outside our control, and an outage on their side may interrupt parts of the service. Your use of a linked third-party service is governed by that provider's own terms.",
    ],
  },
  {
    title: "Availability and Disclaimers",
    body: [
      "We work to keep Studio available, but we do not guarantee uninterrupted or error-free service, and maintenance windows may occur. Studio and our digital products are provided \"as is\" without warranties of any kind, express or implied.",
      "We do not guarantee any particular business result — views, leads, followers, rankings, or revenue — from our services or from content produced with them.",
    ],
  },
  {
    title: "Limitation of Liability",
    body: [
      "To the fullest extent permitted by law, Palmer House Productions is not liable for indirect, incidental, special, consequential, or punitive damages, or for lost profits, lost revenue, or lost data.",
      "Our total liability for any claim relating to the services is limited to the amount you paid us for the specific service giving rise to the claim in the 12 months before the claim.",
      "You agree to indemnify us against claims arising from content you supply or publish, or from your misuse of the services.",
    ],
  },
  {
    title: "Governing Law and Disputes",
    body: [
      "These terms are governed by the laws of the State of Washington, without regard to its conflict of law rules. Disputes will be brought in the state or federal courts located in King County, Washington.",
      "Before filing anything, contact us — most issues are resolved with a phone call.",
    ],
  },
  {
    title: "Changes to These Terms",
    body: [
      "We may update these terms as our services evolve. The revision date at the top of this page reflects the current version, and material changes will be announced in Studio or by email. Continuing to use the services after a change means you accept the updated terms.",
    ],
  },
  {
    title: "Contact",
    body: [
      "Palmer House Productions — Pacific Northwest. Email info@palmerhouseproductions.com or call (425) 533-9060.",
    ],
  },
];

function TermsPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Legal"
        title="Terms of"
        highlight="Service"
        subtitle="The terms covering our production work, digital products, and the Palmer House Studio membership."
        ctas={false}
      />
      <Section>
        <div className="mx-auto max-w-3xl">
          <p className="font-mono text-xs uppercase tracking-[.16em] text-muted-foreground">
            Last updated · {LAST_UPDATED}
          </p>
          <div className="mt-10 space-y-10">
            {sections.map((s) => (
              <div key={s.title}>
                <h2 className="font-display text-xl font-bold">{s.title}</h2>
                <div className="mt-3 space-y-3">
                  {s.body.map((paragraph) => (
                    <p key={paragraph} className="text-sm leading-relaxed text-muted-foreground">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </PageShell>
  );
}
