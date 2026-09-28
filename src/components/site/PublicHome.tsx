import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { InView } from "./PageShell";
import { PAL_HEADSHOTS } from "@/lib/pal-lanes";
import { palPersonas } from "@/lib/pal-personas";
import { getPackageById, computePackagePrice, getPackageScope } from "@/lib/pricing-catalog";
import { packagePreviews } from "@/lib/package-previews";
import type { PalName } from "@/lib/studio-model";
import productionIcon from "@/assets/hero/icon-production.webp";
import storyIcon from "@/assets/hero/icon-story.webp";
import libraryIcon from "@/assets/hero/icon-library.webp";
import "./public-home.css";

const avenues = [
  {
    id: "production",
    title: "Full production",
    lead: "Make it with our team.",
    body: "We help you plan, shoot, and edit. Choose a video package and adjust the scope around your business.",
    detail: "Human crew · filming · finished videos",
    to: "/shop",
    action: "Explore video packages",
    icon: productionIcon,
    lane: "reel",
  },
  {
    id: "studio",
    title: "Studio & software",
    lead: "Move your own ideas forward.",
    body: "Work with an AI Pal on campaigns, scripts, posts, images, and PDFs. Keep your brand context and work in one place.",
    detail: "AI creative tools · your own workspace",
    to: "/membership",
    action: "Explore the Studio",
    icon: libraryIcon,
    lane: "system",
  },
  {
    id: "planning",
    title: "Planning & preparation",
    lead: "Get ready before the camera.",
    body: "Work through strategy, concepts, scripts, wardrobe, and on-camera preparation with the Palmer House team.",
    detail: "Human guidance · a clearer shoot plan",
    to: "/content-strategy",
    action: "Get planning support",
    icon: storyIcon,
    lane: "evergreen",
  },
] as const;

export function WaysToWork() {
  return (
    <section id="ways-to-work" className="ph-home-section ph-ways" aria-labelledby="ways-title">
      <div className="ph-section-heading">
        <div>
          <p className="ph-kicker">Choose your starting point</p>
          <h2 id="ways-title">Your idea. Your level of help.</h2>
        </div>
        <p>Start with the part you need. The rest can come later.</p>
      </div>
      <div className="ph-avenues">
        {avenues.map((item) => (
          <Link key={item.id} to={item.to} className="ph-avenue" data-lane={item.lane}>
            <div className="ph-avenue-top">
              <span className="ph-kicker">{item.title}</span>
              <img src={item.icon} width={90} height={90} alt="" />
            </div>
            <h3>{item.lead}</h3>
            <p>{item.body}</p>
            <small>{item.detail}</small>
            <span className="ph-link-label">
              {item.action} <ArrowRight size={18} />
            </span>
          </Link>
        ))}
      </div>
      <p className="ph-connection-note">
        Already have a plan or footage?{" "}
        <Link to="/services/post-production">We can help with the edit.</Link> You can also bring
        your Studio drafts into a conversation with our team.
      </p>
    </section>
  );
}

export function HomePackages() {
  return (
    <section className="ph-home-section" aria-labelledby="home-packages-title">
      <div className="ph-section-heading">
        <div>
          <p className="ph-kicker">Full production</p>
          <h2 id="home-packages-title">A useful video starts with a clear job.</h2>
        </div>
        <Link to="/shop" className="ph-inline-link">
          All 10 packages <ArrowUpRight size={18} />
        </Link>
      </div>
      <div className="ph-package-picks">
        {["social-content", "customer-stories", "onboarding"].map((id) => {
          const item = getPackageById(id)!;
          return (
            <Link
              key={id}
              className="ph-package-pick"
              to="/packages/$packageId"
              params={{ packageId: id }}
            >
              <div className="ph-package-picture">
                <img
                  src={packagePreviews[id].poster}
                  alt={`Fictional ${item.name.toLowerCase()} video example`}
                  width={960}
                  height={540}
                  loading="lazy"
                />
                <span>AI concept example</span>
              </div>
              <div className="ph-package-info">
                <div>
                  <img src={item.icon} width={44} height={44} alt="" />
                  <h3>{item.name}</h3>
                </div>
                <p>{item.description}</p>
                <strong>${computePackagePrice(item).toLocaleString()}</strong>
                <small>{getPackageScope(item)}</small>
                <span className="ph-link-label">
                  View example & scope <ArrowRight size={17} />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
      <div className="ph-scope-note">
        <p>
          Planning, filming, and editing are part of your production scope. We confirm the details,
          tax, and travel before payment.
        </p>
        <Link to="/production-pricing">
          How pricing works <ArrowRight size={17} />
        </Link>
      </div>
    </section>
  );
}

const voices: { key: PalName; name: string; manner: string }[] = [
  { key: "kiana", name: "Kiana", manner: "Warm. Curious. Story first." },
  { key: "ryder", name: "Ryder", manner: "Quick, direct, ready to make a start." },
  { key: "clara", name: "Clara", manner: "Patient. Clear. One step at a time." },
  { key: "silas", name: "Silas", manner: "Practical, precise, quietly dry." },
  { key: "raquel", name: "Raquel", manner: "Observant. Conversational. People first." },
  { key: "kareem", name: "Kareem", manner: "Calm. Exacting. An eye for the craft." },
  { key: "cyrus", name: "Cyrus", manner: "Thoughtful, strategic, looking ahead." },
  { key: "samira", name: "Samira", manner: "Steady, organized, encouraging." },
];
export function PublicPalGuide({ compact = false }: { compact?: boolean }) {
  const [selected, setSelected] = useState<PalName>("kiana");
  const pal = voices.find((item) => item.key === selected)!;
  return (
    <section
      className={`ph-pal-guide${compact ? " ph-pal-guide-compact" : ""}`}
      aria-labelledby="pal-guide-title"
    >
      <div className="ph-pal-copy">
        <p className="ph-kicker">Meet your creative Pals</p>
        <h2 id="pal-guide-title">
          Different personalities.
          <br />
          The same possibilities.
        </h2>
        <p>
          Choose the voice you like working with. Every Pal can help with the same Studio tools,
          using your shared brand context. On a production project, real Palmer House people do the
          planning, filming, and editing.
        </p>
        <Link to="/meet-the-pals" className="ph-inline-link">
          Meet all eight Pals <ArrowUpRight size={18} />
        </Link>
      </div>
      <div className="ph-pal-preview">
        <div className="ph-pal-options" role="group" aria-label="Preview a Pal personality">
          {voices.map((voice) => (
            <button
              key={voice.key}
              aria-pressed={selected === voice.key}
              onClick={() => setSelected(voice.key)}
            >
              <img src={PAL_HEADSHOTS[voice.key]} width={56} height={56} alt="" loading="lazy" />
              <span>{voice.name}</span>
            </button>
          ))}
        </div>
        <div className="ph-pal-quote" aria-live="polite" aria-atomic="true">
          <img key={pal.key} src={PAL_HEADSHOTS[pal.key]} width={80} height={80} alt="" />
          <div>
            <span>
              {pal.name} <small>AI creative Pal</small>
            </span>
            <blockquote>“{palPersonas[pal.key].firstQuestion}”</blockquote>
            <p>{pal.manner}</p>
          </div>
        </div>
        <p className="ph-preview-label">
          A taste of each Pal’s voice. Your live conversation happens in Studio.
        </p>
      </div>
    </section>
  );
}

const examples = {
  Script: {
    title: "Before the doors open",
    content:
      "OPEN: Flour on the counter. The first batch coming out of the oven.\n\nVOICE: “Before the town wakes up, our day has already started.”\n\nCLOSE: The door opens. “Made from scratch. Every morning.”",
  },
  Post: {
    title: "A little earlier than everyone else",
    content:
      "Your morning starts here. Ours starts a little earlier.\n\nFresh bread, made from scratch, and a familiar face behind the counter. Come by for your morning loaf.",
  },
  Plan: {
    title: "One morning. Three useful shots.",
    content:
      "1. Film the first batch leaving the oven.\n2. Ask the baker what makes this loaf different.\n3. Capture the first customer walking in.\n\nKeep the background quiet. Film near the window.",
  },
};
export function StudioExample() {
  const [active, setActive] = useState<keyof typeof examples>("Script");
  return (
    <div className="ph-studio-example">
      <div className="ph-example-top">
        <img src={PAL_HEADSHOTS.kiana} width={40} height={40} alt="" />
        <div>
          <strong>Kiana</strong>
          <span>Your creative Pal</span>
        </div>
        <span className="ph-example-badge">Example</span>
      </div>
      <p className="ph-example-request">
        We filmed the bakery this morning. What can we make from it?
      </p>
      <p className="ph-example-reply">Let’s make that early-morning care the story.</p>
      <div className="ph-example-artifact">
        <strong>Made before sunrise</strong>
        <div className="ph-example-tabs" role="group" aria-label="Choose a sample draft">
          {(Object.keys(examples) as (keyof typeof examples)[]).map((name) => (
            <button key={name} aria-pressed={name === active} onClick={() => setActive(name)}>
              {name}
            </button>
          ))}
        </div>
        <div aria-live="polite">
          <h3>{examples[active].title}</h3>
          <p>{examples[active].content}</p>
        </div>
        <span className="ph-draft-state">
          <Check size={14} /> Draft for your review
        </span>
      </div>
      <p className="ph-preview-label">Illustrative Studio drafts · fictional bakery</p>
    </div>
  );
}
export function HomeStudio() {
  return (
    <section className="ph-home-section ph-studio-intro" aria-labelledby="home-studio-title">
      <InView>
        <StudioExample />
      </InView>
      <div>
        <p className="ph-kicker">Palmer House Studio</p>
        <h2 id="home-studio-title">
          A place for the ideas
          <br />
          you’re ready to make.
        </h2>
        <p>
          Talk it through with a Pal. Shape a campaign, write the script, make an image, and keep
          everything ready to use. Your brand context travels with the work.
        </p>
        <ul>
          {[
            "Distinct Pals with shared workspace memory",
            "Drafts, images, and PDFs in your Library",
            "Clear AI credits, shown before you generate",
          ].map((text) => (
            <li key={text}>
              <Check size={17} />
              {text}
            </li>
          ))}
        </ul>
        <div className="ph-actions">
          <Link to="/membership" className="primary-action">
            Explore the Studio <ArrowRight size={17} />
          </Link>
          <Link to="/membership/pricing" className="secondary-action">
            Compare Studio plans
          </Link>
        </div>
        <p className="ph-preview-label">
          You review and publish. Studio creates video scripts, not finished video.
        </p>
      </div>
    </section>
  );
}
