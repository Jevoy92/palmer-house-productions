import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero, Section } from "@/components/site/PageShell";

const LAST_UPDATED = "August 7, 2026";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy | Palmer House Productions" },
      {
        name: "description",
        content:
          "How Palmer House Productions collects, uses, and protects information across our video production services and the Palmer House Studio app.",
      },
      { property: "og:title", content: "Privacy Policy | Palmer House Productions" },
      {
        property: "og:description",
        content:
          "How Palmer House Productions collects, uses, and protects information across our video production services and the Palmer House Studio app.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "index, follow" },
    ],
    links: [{ rel: "canonical", href: "https://www.palmerhouseproductions.com/privacy" }],
  }),
  component: PrivacyPage,
});

const sections: { title: string; body: string[] }[] = [
  {
    title: "Who We Are",
    body: [
      "Palmer House Productions is a video production company based in the Pacific Northwest. We produce video for businesses and organizations, and we operate Palmer House Studio — a web application at palmerhouseproductions.com/studio where members plan, generate, and organize their video and content programs.",
      "This policy covers our website, our production and post-production services, and Palmer House Studio. If you are a client under a signed production agreement, that agreement controls where it conflicts with this policy.",
    ],
  },
  {
    title: "Information You Give Us",
    body: [
      "Inquiries and bookings: when you contact us, request a quote, book a discovery call, or fill out a form, we collect your name, email address, phone number, company, and whatever details you choose to share about your project. Our contact and booking forms are powered by HoneyBook, which processes that submission on our behalf.",
      "Studio accounts: when you create a Palmer House Studio account we collect your name and email address. If you sign in with Google, Google shares your name, email address, and profile picture with us — we do not receive your Google password, and we do not access your Gmail, Drive, Calendar, contacts, or any other Google data.",
      "Workspace content: anything you enter into Studio — your brand profile, industry, website, personal interests and story, ideas, campaigns, calendar items, uploaded images and video, and chat messages with our AI assistants — is stored in your private workspace.",
      "Payment details: when you buy a production package, a digital download, or a Studio membership, payment is processed by Stripe. Stripe collects and stores your card details directly; we never see or store full card numbers. We receive the transaction result, the last four digits, and your billing email.",
    ],
  },
  {
    title: "Information Collected Automatically",
    body: [
      "Like most websites, our servers log basic technical information when you visit: IP address, browser type, device type, pages viewed, and referring page. We use this to keep the site secure and understand which pages are useful.",
      "We use essential cookies and local browser storage to keep you signed in to Studio and to remember interface preferences such as which walkthrough steps you have completed. We do not run third-party advertising or cross-site tracking cookies.",
    ],
  },
  {
    title: "How We Use Your Information",
    body: [
      "To respond to inquiries, prepare quotes, schedule shoots, and deliver production and post-production work.",
      "To create and operate your Studio account, generate content with our AI tools, save your work, and show your progress.",
      "To process payments, manage memberships and credits, and send receipts and account notices.",
      "To send service email — sign-in links, password resets, account confirmations, and notices about your projects. Marketing email is only sent if you opt in, and every marketing message includes an unsubscribe link.",
      "To improve our services, troubleshoot errors, prevent abuse, and meet our legal and accounting obligations.",
      "We do not sell your personal information, and we do not share it with advertisers.",
    ],
  },
  {
    title: "AI Processing in Palmer House Studio",
    body: [
      "Studio's tools — the Content Engine, campaign builder, and the Ask a Pal assistant — send the prompt you write plus relevant details from your workspace (such as your brand profile, industry, and audience) to a third-party AI model provider so it can generate strategy, scripts, and posts back to you.",
      "That content is transmitted for the purpose of fulfilling your request. We do not use your workspace content to train our own models, and we do not authorize our AI providers to train their models on it. Generated output belongs to you.",
      "Please do not paste confidential third-party information, personal health information, government identifiers, or payment card data into Studio prompts.",
    ],
  },
  {
    title: "Service Providers We Share Information With",
    body: [
      "We share only what is necessary with the vendors that run our business: Supabase and Lovable Cloud (application hosting, database, authentication, and file storage), Stripe (payments and subscriptions), HoneyBook (contact forms, proposals, and client management), Google (optional sign-in), and our AI model provider (content generation described above). Email is delivered from notify.palmerhouseproductions.com through our email infrastructure provider.",
      "We may also disclose information when required by law, to enforce our agreements, or to protect the rights and safety of our clients, our team, or the public. If our business is ever sold or merged, information may transfer as part of that transaction; we will notify you if that happens.",
    ],
  },
  {
    title: "Footage, Photos, and Client Materials",
    body: [
      "Production footage, photos, and finished deliverables are handled under your production agreement. We keep project files as part of our working archive so we can re-cut or re-deliver work later.",
      "We only use client footage in our portfolio, on social media, or in marketing when your agreement permits it or you give us permission. If you would like existing work removed from our marketing, email us and we will take it down.",
      "Anyone appearing on camera during a shoot signs or is covered by a release; if you appeared in our footage and want to discuss its use, contact us directly.",
    ],
  },
  {
    title: "Data Retention",
    body: [
      "Studio workspace content is retained while your account is active. If you delete a campaign, idea, or asset, it is removed from your workspace. If you close your account, we delete your workspace content within 60 days, except where we must keep records longer for tax, accounting, or legal reasons.",
      "Production files and project records are kept for the term set in your production agreement, and business and financial records are kept as long as the law requires.",
    ],
  },
  {
    title: "Security",
    body: [
      "Studio runs over encrypted connections, workspace data is protected by row-level access rules so members can only reach their own workspace, and payment card data never touches our servers. Access to production systems is limited to team members who need it.",
      "No system is perfectly secure. If we become aware of a breach affecting your personal information, we will notify you and any required authorities as the law directs.",
    ],
  },
  {
    title: "Your Choices and Rights",
    body: [
      "You can review and update most of your information directly in Studio settings, and you can sign out or request account deletion at any time.",
      "Depending on where you live, you may have the right to request a copy of the personal information we hold, correct it, delete it, or object to certain processing. Email info@palmerhouseproductions.com and we will respond within 30 days. We will not deny you service for exercising these rights.",
      "You can unsubscribe from marketing email using the link in any marketing message. Service and account email related to an active account or project will continue.",
    ],
  },
  {
    title: "Children's Privacy",
    body: [
      "Our services are intended for businesses and adults. We do not knowingly collect personal information from children under 13. If a child under 13 has given us information, contact us and we will delete it. When minors appear in commissioned footage, we obtain consent from a parent or guardian.",
    ],
  },
  {
    title: "Changes to This Policy",
    body: [
      "We may update this policy as our services change. The revision date at the top of this page always reflects the current version, and material changes will be announced in Studio or by email.",
    ],
  },
  {
    title: "Contact Us",
    body: [
      "Palmer House Productions — Pacific Northwest. Email info@palmerhouseproductions.com or call (425) 533-9060 with any question about this policy or your information.",
    ],
  },
];

function PrivacyPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Legal"
        title="Privacy"
        highlight="Policy"
        subtitle="How Palmer House Productions handles your information across our production work and the Palmer House Studio app."
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
