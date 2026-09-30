import { createFileRoute, Link } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { ArrowUp, Copy, ImagePlus, RotateCcw, X } from "lucide-react";
import { palList, palDirectory } from "@/lib/pal-directory";
import type { PalName } from "@/lib/studio-model";
import { expoDemoCampaign, expoDemoChat, expoDemoImage } from "@/lib/expo-demo.functions";
import { emptyBrief, artifactMeta, type Artifact, type DemoCampaign, type GuestBrief } from "@/lib/expo-demo-types";
import { exampleBrief, exampleCampaign, expoGreetings } from "@/lib/expo-demo-example";
import { ArtifactPreview, artifactText } from "@/components/expo/DemoArtifacts";

export const Route = createFileRoute("/expo_/demo")({
  head: () => ({
    meta: [
      { title: "Try Palmer House Studio with your business — Expo demo" },
      {
        name: "description",
        content: "Pick a Pal, describe your business, and watch Palmer House Studio build a real campaign in minutes. No account needed.",
      },
      { property: "og:title", content: "Try Palmer House Studio with your business" },
      { property: "og:description", content: "Pick a Pal and get a campaign built for your business in minutes." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ExpoDemo,
});

type Msg = { id: string; role: "guest" | "pal"; text: string; pal?: PalName };
type Mode = "live" | "example";
type View = "editorial" | "gallery" | "journey";

const newSession = () => crypto.randomUUID();
const urlPattern = /\b((?:https?:\/\/)?(?:[a-z0-9-]+\.)+[a-z]{2,}(?:\/[^\s]*)?)/i;
const stageLabel = { stop: "Stop the scroll", matter: "Make it matter", invite: "Invite them in" } as const;

function ExpoDemo() {
  const chat = useServerFn(expoDemoChat);
  const build = useServerFn(expoDemoCampaign);
  const image = useServerFn(expoDemoImage);

  const [sessionId, setSessionId] = useState(newSession);
  const [pal, setPal] = useState<PalName | null>(null);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [brief, setBrief] = useState<GuestBrief>(emptyBrief);
  const [ready, setReady] = useState(false);
  const [thinking, setThinking] = useState(false);
  const [building, setBuilding] = useState<string | null>(null);
  const [campaign, setCampaign] = useState<DemoCampaign | null>(null);
  const [images, setImages] = useState<{ square?: string; wide?: string }>({});
  const [photo, setPhoto] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<Mode>("live");
  const [view, setView] = useState<View>("editorial");
  const [open, setOpen] = useState<string | null>(null);
  const [staff, setStaff] = useState(false);
  const [draft, setDraft] = useState("");
  const [sources, setSources] = useState<Array<{ url: string; title: string }>>([]);
  const gen = useRef(0);
  const chatEnd = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEnd.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, thinking, building]);

  const nextGuest = useCallback(() => {
    gen.current += 1; // invalidates every late response from the previous guest
    if (photo) URL.revokeObjectURL(photo);
    setSessionId(newSession());
    setPal(null);
    setMessages([]);
    setBrief(emptyBrief);
    setReady(false);
    setThinking(false);
    setBuilding(null);
    setCampaign(null);
    setImages({});
    setPhoto(null);
    setError(null);
    setView("editorial");
    setOpen(null);
    setDraft("");
    setSources([]);
  }, [photo]);

  const choosePal = (key: PalName) => {
    const hadWork = messages.length > 0;
    setPal(key);
    const name = palDirectory[key].name;
    const text = hadWork
      ? `${name} here. I have ${brief.businessName || "what you've told me so far"}${brief.goal ? ` and the goal — ${brief.goal.toLowerCase()}` : ""}. Let's keep going.`
      : expoGreetings[key];
    setMessages((m) => [...m, { id: crypto.randomUUID(), role: "pal", text, pal: key }]);
  };

  const runBuild = async (b: GuestBrief) => {
    if (!pal) return;
    const token = gen.current;
    setError(null);
    if (mode === "example") {
      setBuilding("Opening the prepared example");
      setTimeout(() => {
        if (token !== gen.current) return;
        setBrief(exampleBrief);
        setCampaign(exampleCampaign);
        setBuilding(null);
      }, 600);
      return;
    }
    setBuilding("Planning the campaign");
    try {
      const c = await build({ data: { sessionId, pal, brief: b } });
      if (token !== gen.current) return;
      setCampaign(c);
      setBuilding(null);
      setMessages((m) => [
        ...m,
        {
          id: crypto.randomUUID(),
          role: "pal",
          pal,
          text: `Here it is — “${c.headline}” Six pieces, one idea. Tap any piece to see it full size.`,
        },
      ]);
      if (photo) {
        setImages({ square: photo, wide: photo });
        return;
      }
      const ig = c.artifacts.find((a) => a.type === "instagram");
      const prompt = ig?.imagePrompt || `${b.businessName}: ${b.offer}, ${b.location}`;
      image({ data: { sessionId, prompt, aspect: "4:5" } })
        .then((r) => token === gen.current && setImages((v) => ({ ...v, square: r.url })))
        .catch(() => {});
      image({ data: { sessionId, prompt, aspect: "16:9" } })
        .then((r) => token === gen.current && setImages((v) => ({ ...v, wide: r.url })))
        .catch(() => {});
    } catch (e) {
      if (token !== gen.current) return;
      setBuilding(null);
      setError(e instanceof Error ? e.message : "The campaign could not be built. Try again.");
    }
  };

  const send = async (text: string) => {
    if (!pal || !text.trim() || thinking) return;
    const token = gen.current;
    const guest: Msg = { id: crypto.randomUUID(), role: "guest", text: text.trim() };
    const next = [...messages, guest];
    setMessages(next);
    setDraft("");
    setError(null);
    if (mode === "example") {
      setMessages((m) => [
        ...m,
        {
          id: crypto.randomUUID(),
          role: "pal",
          pal,
          text: "We're in Example mode, so I can't write for your business right now. I can show you a prepared example campaign.",
        },
      ]);
      setReady(true);
      return;
    }
    setThinking(true);
    const website = text.match(urlPattern)?.[1];
    try {
      const r = await chat({
        data: {
          sessionId,
          pal,
          brief,
          website,
          messages: next.slice(-20).map((m) => ({ role: m.role, text: m.text.slice(0, 2000) })),
        },
      });
      if (token !== gen.current) return;
      setBrief(r.brief);
      setReady(r.readyToBuild);
      if (r.source) setSources((s) => [...s, r.source!]);
      setMessages((m) => [...m, { id: crypto.randomUUID(), role: "pal", pal, text: r.reply }]);
    } catch (e) {
      if (token !== gen.current) return;
      const offline = typeof navigator !== "undefined" && !navigator.onLine;
      setError(
        offline
          ? "The connection dropped. Your brief is kept — switch to Example mode or try again when Wi-Fi is back."
          : e instanceof Error
            ? e.message
            : "Something went wrong. Try again.",
      );
    } finally {
      if (token === gen.current) setThinking(false);
    }
  };

  const onPhoto = (file?: File) => {
    if (!file || !file.type.startsWith("image/") || file.size > 10 * 1024 * 1024) return;
    if (photo) URL.revokeObjectURL(photo);
    const url = URL.createObjectURL(file);
    setPhoto(url);
    if (campaign) setImages({ square: url, wide: url });
  };

  const brand = brief.businessName || "Your business";
  const openArtifact = campaign?.artifacts.find((a) => a.id === open) ?? null;

  if (!pal) return <PalPicker onPick={choosePal} onNext={nextGuest} />;

  const conversation = (
    <aside className="xd-chat" aria-label="Conversation">
      <header className="xd-chat-head">
        <img src={palDirectory[pal].headshot} alt="" />
        <div>
          <strong>{palDirectory[pal].name}</strong>
          <span>{palDirectory[pal].role}</span>
        </div>
        <details className="xd-switch">
          <summary>Switch Pal</summary>
          <div>
            {palList.map((p) => (
              <button key={p.key} type="button" onClick={() => choosePal(p.key)} aria-label={p.name}>
                <img src={p.headshot} alt="" />
              </button>
            ))}
          </div>
        </details>
      </header>
      <div className="xd-messages" aria-live="polite">
        {messages.map((m) => (
          <div key={m.id} className={`xd-msg ${m.role}`}>
            {m.text}
          </div>
        ))}
        {thinking ? <div className="xd-msg pal xd-typing">…</div> : null}
        {building ? (
          <div className="xd-building">
            <span className="xd-pulse" /> {building}
          </div>
        ) : null}
        {error ? (
          <div className="xd-error" role="alert">
            {error}
            {mode === "live" ? (
              <button type="button" onClick={() => setMode("example")}>
                Use Example mode
              </button>
            ) : null}
          </div>
        ) : null}
        {ready && !campaign && !building ? (
          <button type="button" className="xd-build" onClick={() => runBuild(brief)}>
            {mode === "example" ? "Show the example campaign" : "Build my campaign"}
          </button>
        ) : null}
        <div ref={chatEnd} />
      </div>
      {brief.businessName && mode === "live" ? (
        <details className="xd-brief">
          <summary>From your brief</summary>
          <dl>
            {(["businessName", "offer", "location", "audience", "goal"] as const).map((k) =>
              brief[k] ? (
                <div key={k}>
                  <dt>{k === "businessName" ? "Business" : k}</dt>
                  <dd>{brief[k]}</dd>
                </div>
              ) : null,
            )}
          </dl>
          {sources.length ? (
            <p className="xd-sources">Read: {sources.map((s) => s.title).join(", ")}</p>
          ) : null}
        </details>
      ) : null}
      <form
        className="xd-composer"
        onSubmit={(e) => {
          e.preventDefault();
          send(draft);
        }}
      >
        <label className="xd-icon" aria-label="Add a photo">
          <ImagePlus size={18} />
          <input type="file" accept="image/*" hidden onChange={(e) => onPhoto(e.target.files?.[0])} />
        </label>
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder={messages.length > 1 ? "Reply…" : "Your business, website, or what you need"}
          aria-label="Message"
          maxLength={2000}
        />
        <button type="submit" className="xd-send" aria-label="Send" disabled={!draft.trim() || thinking}>
          <ArrowUp size={18} />
        </button>
      </form>
      {photo ? <p className="xd-photo-note">Your photo will be used in the campaign. It stays on this laptop.</p> : null}
    </aside>
  );

  return (
    <div className="xd-root">
      <TopBar
        mode={mode}
        staff={staff}
        setStaff={setStaff}
        setMode={setMode}
        onNext={nextGuest}
        view={campaign ? view : null}
        setView={setView}
      />
      {campaign ? (
        <div className={`xd-results xd-${view}`}>
          <main className="xd-canvas">
            {mode === "example" ? (
              <p className="xd-example-flag">Example campaign for a fictional café — not generated for your business.</p>
            ) : null}
            {view === "editorial" ? (
              <Editorial c={campaign} images={images} brand={brand} onOpen={setOpen} />
            ) : view === "gallery" ? (
              <Gallery c={campaign} images={images} brand={brand} onOpen={setOpen} />
            ) : (
              <Journey c={campaign} images={images} brand={brand} onOpen={setOpen} />
            )}
          </main>
          {conversation}
        </div>
      ) : (
        <div className="xd-solo">{conversation}</div>
      )}
      {openArtifact && campaign ? (
        <Screening
          c={campaign}
          a={openArtifact}
          images={images}
          brand={brand}
          onClose={() => setOpen(null)}
          onOpen={setOpen}
        />
      ) : null}
    </div>
  );
}

function TopBar({
  mode,
  setMode,
  staff,
  setStaff,
  onNext,
  view,
  setView,
}: {
  mode: Mode;
  setMode: (m: Mode) => void;
  staff: boolean;
  setStaff: (v: boolean) => void;
  onNext: () => void;
  view: View | null;
  setView: (v: View) => void;
}) {
  return (
    <header className="xd-top">
      <Link to="/expo" className="xd-logo">
        Palmer House <span>Studio</span>
      </Link>
      {view ? (
        <nav className="xd-views" aria-label="Campaign view">
          {(["editorial", "gallery", "journey"] as const).map((v) => (
            <button key={v} type="button" aria-pressed={view === v} onClick={() => setView(v)}>
              {v}
            </button>
          ))}
        </nav>
      ) : (
        <span />
      )}
      <div className="xd-top-right">
        <button type="button" className="xd-mode" onClick={() => setStaff(!staff)} aria-expanded={staff}>
          <span className={`xd-dot ${mode}`} /> {mode === "live" ? "Live" : "Example"}
        </button>
        {staff ? (
          <div className="xd-staff" role="dialog" aria-label="Demo mode">
            <p className="xd-staff-title">Demo mode · staff</p>
            <button type="button" aria-pressed={mode === "live"} onClick={() => setMode("live")}>
              Live — real AI and website reading
            </button>
            <button type="button" disabled title="Needs a local model installed on this laptop">
              Offline AI — not prepared on this laptop
            </button>
            <button type="button" aria-pressed={mode === "example"} onClick={() => setMode("example")}>
              Example — prepared, clearly labeled
            </button>
          </div>
        ) : null}
        <button type="button" className="xd-next" onClick={onNext}>
          <RotateCcw size={15} /> Next guest
        </button>
      </div>
    </header>
  );
}

function PalPicker({ onPick, onNext }: { onPick: (k: PalName) => void; onNext: () => void }) {
  return (
    <div className="xd-root xd-picker">
      <header className="xd-top">
        <Link to="/expo" className="xd-logo">
          Palmer House <span>Studio</span>
        </Link>
        <span />
        <button type="button" className="xd-next" onClick={onNext}>
          <RotateCcw size={15} /> Next guest
        </button>
      </header>
      <div className="xd-picker-body">
        <p className="xd-eyebrow">Try Studio with your business</p>
        <h1>Pick a Pal. Tell them about your business.</h1>
        <p className="xd-sub">In a few minutes you'll have a campaign built for you. No account, nothing saved.</p>
        <div className="xd-pal-grid">
          {palList.map((p) => (
            <button key={p.key} type="button" className="xd-pal" onClick={() => onPick(p.key)} style={{ ["--lane" as string]: p.color }}>
              <img src={p.headshot} alt="" />
              <strong>{p.name}</strong>
              <span>{p.role}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

type ViewProps = {
  c: DemoCampaign;
  images: { square?: string; wide?: string };
  brand: string;
  onOpen: (id: string) => void;
};

function Tile({ a, images, brand, onOpen }: { a: Artifact } & Omit<ViewProps, "c">) {
  return (
    <div className="xd-tile" role="button" tabIndex={0} onClick={() => onOpen(a.id)} onKeyDown={(e) => e.key === "Enter" && onOpen(a.id)}>
      <ArtifactPreview a={a} images={images} brand={brand} />
      <span className="xd-tile-label">{artifactMeta[a.type].label}</span>
    </div>
  );
}

function Editorial({ c, images, brand, onOpen }: ViewProps) {
  const [hero, ...rest] = c.artifacts;
  return (
    <div className="xd-editorial-wrap">
      <div className="xd-ed-top">
        <div className="xd-ed-copy">
          <p className="xd-eyebrow">{brand} · campaign</p>
          <h2>{c.headline}</h2>
          <p>{c.centralIdea}</p>
          <dl>
            <div>
              <dt>For</dt>
              <dd>{c.audience}</dd>
            </div>
            <div>
              <dt>Goal</dt>
              <dd>{c.goal}</dd>
            </div>
          </dl>
        </div>
        <div className="xd-ed-hero" role="button" tabIndex={0} onClick={() => onOpen(hero.id)}>
          {images.square ? <img src={images.square} alt="" /> : <span className="xd-visual-empty">Photo on its way…</span>}
        </div>
      </div>
      <div className="xd-ed-row">
        {[hero, ...rest].map((a) => (
          <Tile key={a.id} a={a} images={images} brand={brand} onOpen={onOpen} />
        ))}
      </div>
    </div>
  );
}

function Gallery({ c, images, brand, onOpen }: ViewProps) {
  return (
    <div className="xd-gallery-wrap">
      <h2>
        Your business. <em>A whole campaign.</em>
      </h2>
      <div className="xd-masonry">
        {c.artifacts.map((a) => (
          <Tile key={a.id} a={a} images={images} brand={brand} onOpen={onOpen} />
        ))}
      </div>
    </div>
  );
}

function Journey({ c, images, brand, onOpen }: ViewProps) {
  return (
    <div className="xd-journey-wrap">
      <h2>One story. Every place it needs to go.</h2>
      <div className="xd-journey">
        {(["stop", "matter", "invite"] as const).map((s, i) => (
          <section key={s}>
            <p className="xd-eyebrow">
              0{i + 1} · {stageLabel[s]}
            </p>
            {c.artifacts
              .filter((a) => a.stage === s)
              .map((a) => (
                <Tile key={a.id} a={a} images={images} brand={brand} onOpen={onOpen} />
              ))}
          </section>
        ))}
      </div>
    </div>
  );
}

function Screening({
  c,
  a,
  images,
  brand,
  onClose,
  onOpen,
}: ViewProps & { a: Artifact; onClose: () => void }) {
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    const k = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [onClose]);
  return (
    <div className="xd-screen" role="dialog" aria-modal="true" aria-label={a.title}>
      <button type="button" className="xd-close" onClick={onClose} aria-label="Close">
        <X size={20} />
      </button>
      <div className="xd-screen-main">
        <div className={`xd-screen-stage t-${a.type}`}>
          <ArtifactPreview a={a} images={images} brand={brand} large />
        </div>
        <aside className="xd-side">
          <p className="xd-eyebrow">{artifactMeta[a.type].label}</p>
          <h3>{a.title}</h3>
          {a.hook ? <p className="xd-hook">“{a.hook}”</p> : null}
          {a.beats ? (
            <ol className="xd-beats">
              {a.beats.map((b, i) => (
                <li key={i}>
                  <strong>{b.onScreen}</strong>
                  <span>{b.visual}</span>
                  <em>{b.voice}</em>
                </li>
              ))}
            </ol>
          ) : null}
          {a.slides ? (
            <ol className="xd-beats">
              {a.slides.map((s, i) => (
                <li key={i}>
                  <strong>{s.heading}</strong>
                  <span>{s.body}</span>
                </li>
              ))}
            </ol>
          ) : null}
          {a.body && a.type !== "linkedin" && a.type !== "extra" ? <p className="xd-body">{a.body}</p> : null}
          {a.caption && a.type !== "instagram" ? <p className="xd-body">{a.caption}</p> : null}
          <p className="xd-cta">{a.cta}</p>
          <p className="xd-why">
            <span>Why it works</span>
            {a.strategy}
          </p>
          <button
            type="button"
            className="xd-copy"
            onClick={() => {
              navigator.clipboard?.writeText(artifactText(a)).then(() => setCopied(true));
              setTimeout(() => setCopied(false), 1500);
            }}
          >
            <Copy size={14} /> {copied ? "Copied" : "Copy text"}
          </button>
        </aside>
      </div>
      <nav className="xd-strip" aria-label="All pieces">
        {c.artifacts.map((x) => (
          <button key={x.id} type="button" aria-current={x.id === a.id} onClick={() => onOpen(x.id)}>
            {artifactMeta[x.type].label}
          </button>
        ))}
      </nav>
    </div>
  );
}
