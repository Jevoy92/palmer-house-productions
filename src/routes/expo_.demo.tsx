import { createFileRoute, Link } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { useServerFn } from "@tanstack/react-start";
import {
  ArrowUp,
  ArrowRight,
  Check,
  Copy,
  ImagePlus,
  LayoutGrid,
  Maximize2,
  MessageCircle,
  RotateCcw,
  UserRound,
  X,
} from "lucide-react";
import { palList, palDirectory } from "@/lib/pal-directory";
import type { PalName } from "@/lib/studio-model";
import { expoDemoCampaign, expoDemoChat, expoDemoImage } from "@/lib/expo-demo.functions";
import {
  emptyBrief,
  artifactMeta,
  type Artifact,
  type DemoCampaign,
  type GuestBrief,
} from "@/lib/expo-demo-types";
import { exampleLibrary, expoGreetings, getExample, pickExample } from "@/lib/expo-demo-example";
import { ArtifactPreview, artifactText } from "@/components/expo/DemoArtifacts";
import { CampaignBoard } from "@/components/expo/CampaignBoard";
import "@/components/expo/expo-reference-layout.css";

export const Route = createFileRoute("/expo_/demo")({
  head: () => ({
    meta: [
      { title: "Try Palmer House Studio with your business — Expo demo" },
      {
        name: "description",
        content:
          "Pick a Pal, describe your business, and watch Palmer House Studio build a real campaign in minutes. No account needed.",
      },
      { property: "og:title", content: "Try Palmer House Studio with your business" },
      {
        property: "og:description",
        content: "Pick a Pal and get a campaign built for your business in minutes.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ExpoDemo,
});

type Msg = { id: string; role: "guest" | "pal"; text: string; pal?: PalName };
type Mode = "live" | "example";
type View = "chat" | "gallery" | "horizontal";
type ImageSlot = "square" | "wide";
type ImageStatus = "idle" | "loading" | "ready" | "error";

const newSession = () => crypto.randomUUID();
const urlPattern = /\b((?:https?:\/\/)?(?:[a-z0-9-]+\.)+[a-z]{2,}(?:\/[^\s]*)?)/i;
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
  const [campaignOrigin, setCampaignOrigin] = useState<Mode | null>(null);
  const [exampleKey, setExampleKey] = useState("coffee");
  const [images, setImages] = useState<{ square?: string; wide?: string }>({});
  const [imageStatus, setImageStatus] = useState<Record<ImageSlot, ImageStatus>>({
    square: "idle",
    wide: "idle",
  });
  const [photo, setPhoto] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<Mode>("live");
  const [view, setView] = useState<View>("chat");
  const [open, setOpen] = useState<string | null>(null);
  const [staff, setStaff] = useState(false);
  const [showAllPals, setShowAllPals] = useState(false);
  const [draft, setDraft] = useState("");
  const [sources, setSources] = useState<Array<{ url: string; title: string }>>([]);
  const gen = useRef(0);
  const imageRequests = useRef({ square: 0, wide: 0 });
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
    setCampaignOrigin(null);
    setImages({});
    setImageStatus({ square: "idle", wide: "idle" });
    setPhoto(null);
    setError(null);
    setView("chat");
    setOpen(null);
    setDraft("");
    setSources([]);
  }, [photo]);

  const changeMode = (nextMode: Mode) => {
    if (nextMode === mode) return;
    const selectedPal = pal;
    nextGuest(); // Clears the previous brief and invalidates in-flight responses.
    setMode(nextMode);
    setStaff(false);
    setPal(selectedPal);
    if (selectedPal)
      setMessages([
        {
          id: crypto.randomUUID(),
          role: "pal",
          pal: selectedPal,
          text:
            nextMode === "example"
              ? "Pick a business below and explore a finished campaign. These are prepared examples for fictional businesses."
              : expoGreetings[selectedPal],
        },
      ]);
  };

  const openExample = (key: string) => {
    const ex = getExample(key);
    if (!ex || !pal) return;
    gen.current += 1;
    if (photo) URL.revokeObjectURL(photo);
    setPhoto(null);
    setError(null);
    setThinking(false);
    setBuilding(null);
    setSources([]);
    setOpen(null);
    setDraft("");
    setMode("example");
    setExampleKey(ex.key);
    setBrief(ex.brief);
    setCampaign(ex.campaign);
    setCampaignOrigin("example");
    setImages(ex.images ?? {});
    setImageStatus({ square: "ready", wide: "ready" });
    setReady(true);
    setMessages([
      {
        id: crypto.randomUUID(),
        role: "pal",
        pal,
        text: `Here's ${ex.brief.businessName.replace(" (example)", "")} — a fictional ${ex.label.toLowerCase()} business. “${ex.campaign.headline}” connects ${ex.campaign.artifacts.length} finished pieces. Choose another business any time.`,
      },
    ]);
  };

  const choosePal = (key: PalName) => {
    if (key === pal) return;
    const hadWork = messages.length > 0;
    setPal(key);
    const name = palDirectory[key].name;
    const text = hadWork
      ? `${name} here. I have ${brief.businessName || "what you've told me so far"}${brief.goal ? ` and the goal — ${brief.goal.toLowerCase()}` : ""}. Let's keep going.`
      : expoGreetings[key];
    setMessages((m) => [...m, { id: crypto.randomUUID(), role: "pal", text, pal: key }]);
  };

  const requestImage = async (slot: ImageSlot, prompt: string, attempt = 0): Promise<void> => {
    const token = gen.current;
    const request = attempt ? imageRequests.current[slot] : ++imageRequests.current[slot];
    const current = () => token === gen.current && request === imageRequests.current[slot];
    setImageStatus((s) => ({ ...s, [slot]: "loading" }));
    try {
      const result = await image({
        data: { sessionId, prompt, aspect: slot === "square" ? "4:5" : "16:9" },
      });
      if (!current()) return;
      if (!result.url) throw new Error("No image returned");
      setImages((v) => ({ ...v, [slot]: result.url }));
      setImageStatus((s) => ({ ...s, [slot]: "ready" }));
    } catch {
      if (!current()) return;
      if (attempt < 1) return requestImage(slot, prompt, attempt + 1);
      setImageStatus((s) => ({ ...s, [slot]: "error" }));
    }
  };

  const campaignImagePrompt = (c: DemoCampaign, b: GuestBrief) =>
    c.artifacts.find((a) => a.type === "instagram")?.imagePrompt ||
    `${b.businessName}: ${b.offer}, ${b.location}`;

  const runBuild = async (b: GuestBrief) => {
    if (!pal || building || thinking) return;
    const token = gen.current;
    setError(null);
    if (mode === "example") {
      const ex = pickExample([b.businessName, b.offer, ...messages.map((m) => m.text)].join(" "));
      openExample(ex.key);
      return;
    }
    setBuilding("Planning the campaign");
    try {
      const c = await build({ data: { sessionId, pal, brief: b } });
      if (token !== gen.current) return;
      setCampaign(c);
      setCampaignOrigin("live");
      setBuilding(null);
      setMessages((m) => [
        ...m,
        {
          id: crypto.randomUUID(),
          role: "pal",
          pal,
          text: `Here it is — “${c.headline}” ${c.artifacts.length} pieces, one idea. Tap any piece to see it full size.`,
        },
      ]);
      if (photo) {
        setImages({ square: photo, wide: photo });
        setImageStatus({ square: "ready", wide: "ready" });
        return;
      }
      const prompt = campaignImagePrompt(c, b);
      void requestImage("square", prompt);
      void requestImage("wide", prompt);
    } catch (e) {
      if (token !== gen.current) return;
      setBuilding(null);
      setError(e instanceof Error ? e.message : "The campaign could not be built. Try again.");
    }
  };

  const send = async (text: string) => {
    if (!pal || !text.trim() || thinking || building) return;
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
    imageRequests.current.square += 1;
    imageRequests.current.wide += 1;
    const url = URL.createObjectURL(file);
    setPhoto(url);
    if (campaign) {
      setImages({ square: url, wide: url });
      setImageStatus({ square: "ready", wide: "ready" });
    }
  };

  const brand = brief.businessName || "Your business";
  const openArtifact = campaign?.artifacts.find((a) => a.id === open) ?? null;

  if (!pal) return <PalPicker onPick={choosePal} onNext={nextGuest} />;

  let palTurn = 0;
  const conversation = (
    <aside className="xd-chat" aria-label="Conversation">
      <header className="xd-chat-head">
        <div className="xd-pal-heading">
          <strong>Your Pal</strong>
          <button type="button" onClick={() => setShowAllPals(!showAllPals)}>
            {showAllPals ? "Show less" : "See all 8"}
            <ArrowRight size={14} />
          </button>
        </div>
        <div className="xd-pal-roster">
          {(showAllPals
            ? palList
            : [palDirectory.kiana, palDirectory.ryder, palDirectory.clara, palDirectory.cyrus].some(
                  (p) => p.key === pal,
                )
              ? [palDirectory.kiana, palDirectory.ryder, palDirectory.clara, palDirectory.cyrus]
              : [
                  palDirectory[pal],
                  ...[palDirectory.kiana, palDirectory.ryder, palDirectory.clara].filter(
                    (p) => p.key !== pal,
                  ),
                ]
          ).map((p) => (
            <button
              key={p.key}
              type="button"
              onClick={() => choosePal(p.key)}
              aria-pressed={pal === p.key}
              aria-label={`Talk with ${p.name}`}
            >
              <img src={p.headshot} alt="" />
              <span>{p.name}</span>
            </button>
          ))}
        </div>
      </header>
      {mode === "example" ? (
        <div className="xd-example-picker">
          <label htmlFor="expo-example-business">
            Explore {exampleLibrary.length} example campaigns
          </label>
          <select
            id="expo-example-business"
            value={exampleKey}
            onChange={(e) => openExample(e.target.value)}
          >
            {exampleLibrary.map((ex) => (
              <option key={ex.key} value={ex.key}>
                {ex.label}
              </option>
            ))}
          </select>
          <div className="xd-example-picker-actions">
            <button type="button" onClick={() => openExample(exampleKey)}>
              Load example
            </button>
            <button
              type="button"
              onClick={() => {
                const index = exampleLibrary.findIndex((ex) => ex.key === exampleKey);
                openExample(exampleLibrary[(index + 1) % exampleLibrary.length].key);
              }}
            >
              Next example →
            </button>
          </div>
        </div>
      ) : null}
      <div className="xd-messages" aria-live="polite">
        {messages.map((m) => {
          const side = m.role === "guest" || palTurn++ % 2 === 1 ? "right" : "left";
          const author = m.role === "pal" ? palDirectory[m.pal ?? pal] : null;
          return (
            <div key={m.id} className={`xd-message-row side-${side}`}>
              {author ? (
                <img className="xd-message-avatar" src={author.headshot} alt="" />
              ) : (
                <span className="xd-message-avatar xd-guest-avatar" aria-hidden="true">
                  <UserRound size={17} />
                </span>
              )}
              <div className={`xd-msg ${m.role}`}>
                <span className="xd-message-author">{author?.name ?? "You"}</span>
                {m.text}
              </div>
            </div>
          );
        })}
        {campaign ? (
          <CompactCampaign
            c={campaign}
            images={images}
            brand={brand}
            location={brief.location}
            onOpen={setOpen}
            onExpand={() => setView("gallery")}
            imagesPending={Object.values(imageStatus).includes("loading")}
          />
        ) : null}
        {thinking ? <div className="xd-msg pal xd-typing">…</div> : null}
        {campaign &&
        campaignOrigin === "live" &&
        (Object.values(imageStatus).includes("loading") ||
          Object.values(imageStatus).includes("error")) ? (
          <div className="xd-image-status" role="status">
            {Object.values(imageStatus).includes("loading") ? (
              <p>Your campaign is ready. Creating the photos…</p>
            ) : null}
            {Object.values(imageStatus).includes("error") ? (
              <>
                <p>A photo could not be created. Your campaign text is ready to explore.</p>
                <button
                  type="button"
                  onClick={() => {
                    const prompt = campaignImagePrompt(campaign, brief);
                    for (const slot of ["square", "wide"] as const)
                      if (imageStatus[slot] === "error") void requestImage(slot, prompt);
                  }}
                >
                  Retry missing photos
                </button>
              </>
            ) : null}
          </div>
        ) : null}
        {building ? (
          <div className="xd-building">
            <span className="xd-pulse" /> {building}
          </div>
        ) : null}
        {error ? (
          <div className="xd-error" role="alert">
            {error}
            {mode === "live" ? (
              <button type="button" onClick={() => changeMode("example")}>
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
      {brief.businessName ? (
        <details className="xd-brief" open={view !== "chat"}>
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
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => onPhoto(e.target.files?.[0])}
          />
        </label>
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder={messages.length > 1 ? "Reply…" : "Tell your Pal about your business…"}
          aria-label="Message"
          maxLength={2000}
        />
        <button
          type="submit"
          className="xd-send"
          aria-label="Send"
          disabled={!draft.trim() || thinking || !!building}
        >
          <ArrowUp size={18} />
        </button>
      </form>
      {photo ? (
        <p className="xd-photo-note">
          Your photo will be used in the campaign. It stays on this laptop.
        </p>
      ) : null}
    </aside>
  );

  return (
    <div
      className={`xd-root xd-reference ${view === "chat" || !campaign ? "xd-chat-mode" : "xd-board-mode"}`}
    >
      <TopBar
        mode={mode}
        staff={staff}
        setStaff={setStaff}
        setMode={changeMode}
        onNext={nextGuest}
        view={campaign ? view : null}
        setView={setView}
      />
      {campaign && view !== "chat" ? (
        <div className="xd-reference-results">
          {conversation}
          <main className="xd-canvas">
            <CampaignBoard
              business={brand}
              headline={campaign.headline}
              statusLabel={
                Object.values(imageStatus).includes("loading")
                  ? "Photos building"
                  : "Ready to review"
              }
              layout={view === "horizontal" ? "horizontal" : "vertical"}
              onLayoutChange={(layout) =>
                setView(layout === "horizontal" ? "horizontal" : "gallery")
              }
              onBack={() => setView("chat")}
              items={campaign.artifacts.map((a) => ({
                id: a.id,
                kind: a.type,
                label: a.type === "reel" ? "Reel storyboard" : artifactMeta[a.type].label,
                aspect: artifactMeta[a.type].aspect,
                onOpen: () => setOpen(a.id),
                preview: (
                  <ArtifactPreview
                    a={a}
                    images={images}
                    brand={brand}
                    headline={campaign.headline}
                    location={brief.location}
                    compact={a.type === "instagram" || a.type === "youtube"}
                  />
                ),
              }))}
            />
            {campaignOrigin === "example" ? (
              <p className="xd-reference-disclosure">
                Fictional business · Prepared example · Illustrative photography
              </p>
            ) : null}
          </main>
        </div>
      ) : (
        <div className="xd-reference-chat">
          <nav className="xd-rail" aria-label="Demo workspace">
            <button type="button" aria-current="page" onClick={() => setView("chat")}>
              <MessageCircle size={23} />
              <span>Chat</span>
            </button>
            <button type="button" disabled={!campaign} onClick={() => setView("gallery")}>
              <LayoutGrid size={23} />
              <span>Campaign</span>
            </button>
          </nav>
          {conversation}
        </div>
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
        <strong>PALMER HOUSE</strong>
        <span>STUDIO / EXPO DEMO</span>
      </Link>
      {view ? (
        <nav className="xd-views" aria-label="Campaign view">
          {(["chat", "gallery"] as const).map((v) => (
            <button key={v} type="button" aria-pressed={view === v} onClick={() => setView(v)}>
              {v === "chat" ? "Chat" : "View campaign"}
            </button>
          ))}
        </nav>
      ) : (
        <span />
      )}
      <div className="xd-top-right">
        <button
          type="button"
          className="xd-mode"
          onClick={() => setStaff(!staff)}
          aria-expanded={staff}
        >
          <span className={`xd-dot ${mode}`} /> {mode === "live" ? "Live" : "Example"}
        </button>
        {staff ? (
          <div className="xd-staff" role="dialog" aria-label="Demo mode">
            <p className="xd-staff-title">Demo mode · staff</p>
            <p className="xd-mode-note">Switching modes starts a fresh demo.</p>
            <button
              type="button"
              aria-pressed={mode === "live"}
              onClick={() => {
                setMode("live");
                setStaff(false);
              }}
            >
              Live — real AI and website reading
            </button>
            <button type="button" disabled title="Needs a local model installed on this laptop">
              Offline AI — not prepared on this laptop
            </button>
            <button
              type="button"
              aria-pressed={mode === "example"}
              onClick={() => {
                setMode("example");
                setStaff(false);
              }}
            >
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
          <strong>PALMER HOUSE</strong>
          <span>STUDIO / EXPO DEMO</span>
        </Link>
        <span />
        <button type="button" className="xd-next" onClick={onNext}>
          <RotateCcw size={15} /> Next guest
        </button>
      </header>
      <div className="xd-picker-body">
        <p className="xd-eyebrow">Try Studio with your business</p>
        <h1>Pick a Pal. Tell them about your business.</h1>
        <p className="xd-sub">
          In a few minutes you'll have a campaign built for you. No account, nothing saved.
        </p>
        <div className="xd-pal-grid">
          {palList.map((p) => (
            <button
              key={p.key}
              type="button"
              className="xd-pal"
              onClick={() => onPick(p.key)}
              style={{ ["--lane" as string]: p.color }}
            >
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
  imageLabel?: string;
};

function CompactCampaign({
  c,
  images,
  brand,
  location,
  onOpen,
  onExpand,
  imagesPending,
}: ViewProps & { location?: string; onExpand: () => void; imagesPending: boolean }) {
  const types = ["instagram", "carousel", "reel"] as const;
  const featured = types
    .map((type) => c.artifacts.find((a) => a.type === type))
    .filter((a): a is Artifact => !!a);
  const rest = c.artifacts.filter((a) => !types.some((type) => a.type === type));
  return (
    <section className="xd-campaign-summary" aria-label="Your campaign">
      <header>
        <div>
          <h2>{c.headline}</h2>
          <p>
            {brand.replace(/\s*\(example\)/gi, "")}
            {location ? ` · ${location}` : ""}
          </p>
        </div>
        <span className="xd-campaign-ready">
          {imagesPending ? "Photos building" : `${c.artifacts.length} pieces ready`}
          <span className="xd-ready-track">
            <span style={{ width: imagesPending ? "65%" : "100%" }} />
          </span>
        </span>
      </header>
      <div className="xd-campaign-featured">
        {featured.map((a) => (
          <div key={a.id}>
            <button
              type="button"
              className={`xd-campaign-thumb xd-thumb-${a.type}`}
              onClick={() => onOpen(a.id)}
              aria-label={`Open ${artifactMeta[a.type].label}`}
            >
              <span className="xd-thumb-expand">
                <Maximize2 size={14} />
              </span>
              {a.type === "instagram" ? (
                <ArtifactPreview
                  a={a}
                  images={images}
                  brand={brand}
                  headline={c.headline}
                  compact
                />
              ) : a.type === "carousel" ? (
                <div className="xd-slide-stack">
                  {a.slides?.slice(0, 3).map((slide, i) => (
                    <div key={i} className={`xd-stack-sheet sheet-${i}`}>
                      {images.square ? <img src={images.square} alt="" /> : null}
                      <strong>{slide.heading}</strong>
                      <small>{brand.replace(/\s*\(example\)/gi, "")}</small>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="xd-script-sheet">
                  <small>{brand.replace(/\s*\(example\)/gi, "")}</small>
                  <h3>{a.hook || a.title}</h3>
                  <dl>
                    <div>
                      <dt>HOOK</dt>
                      <dd>{a.hook}</dd>
                    </div>
                    <div>
                      <dt>VISUAL</dt>
                      <dd>{a.beats?.[0]?.visual}</dd>
                    </div>
                    <div>
                      <dt>CTA</dt>
                      <dd>{a.cta}</dd>
                    </div>
                  </dl>
                </div>
              )}
            </button>
            <p>
              {artifactMeta[a.type].label} ·{" "}
              {a.type === "carousel"
                ? `${a.slides?.length || 0} slides`
                : artifactMeta[a.type].aspect}
            </p>
          </div>
        ))}
      </div>
      <div className="xd-campaign-other">
        {rest.map((a) => (
          <button key={a.id} type="button" onClick={() => onOpen(a.id)}>
            <span className={`xd-platform-symbol p-${a.type}`}>
              {a.type === "linkedin" ? "in" : a.type === "youtube" ? "▶" : "▤"}
            </span>
            <span>{artifactMeta[a.type].label}</span>
            <small>
              <Check size={10} />
              Ready
            </small>
            <Maximize2 size={12} />
          </button>
        ))}
      </div>
      <footer>
        <button type="button" className="xd-open-campaign" onClick={onExpand}>
          Open campaign
          <ArrowRight size={16} />
        </button>
        <button type="button" onClick={onExpand}>
          View all {c.artifacts.length}
        </button>
      </footer>
    </section>
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
  const [copyError, setCopyError] = useState(false);
  const opener = useRef(
    typeof document === "undefined" ? null : (document.activeElement as HTMLElement | null),
  );
  useEffect(() => {
    setCopied(false);
    setCopyError(false);
  }, [a.id]);
  return (
    <Dialog.Root
      open
      onOpenChange={(isOpen) => {
        if (!isOpen) onClose();
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="xd-screen-backdrop" />
        <Dialog.Content
          className="xd-screen"
          aria-describedby={undefined}
          onCloseAutoFocus={(event) => {
            event.preventDefault();
            opener.current?.focus();
          }}
        >
          <Dialog.Title className="sr-only">{a.title}</Dialog.Title>
          <button type="button" className="xd-close" onClick={onClose} aria-label="Close">
            <X size={20} />
          </button>
          <div className="xd-screen-main">
            <div className={`xd-screen-stage t-${a.type}`}>
              <ArtifactPreview a={a} images={images} brand={brand} headline={c.headline} large />
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
              {a.body && a.type !== "linkedin" && a.type !== "extra" ? (
                <p className="xd-body">{a.body}</p>
              ) : null}
              {a.caption && a.type !== "instagram" ? <p className="xd-body">{a.caption}</p> : null}
              <p className="xd-cta">{a.cta}</p>
              <p className="xd-why">
                <span>Why it works</span>
                {a.strategy}
              </p>
              <button
                type="button"
                className="xd-copy"
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(artifactText(a));
                    setCopied(true);
                    setCopyError(false);
                  } catch {
                    setCopyError(true);
                  }
                }}
              >
                <Copy size={14} /> {copied ? "Copied" : "Copy text"}
              </button>
              {copyError ? (
                <p role="status">Copy is unavailable here. Select the text to copy it manually.</p>
              ) : null}
            </aside>
          </div>
          <nav className="xd-strip" aria-label="All pieces">
            {c.artifacts.map((x) => (
              <button
                key={x.id}
                type="button"
                aria-current={x.id === a.id}
                onClick={() => onOpen(x.id)}
              >
                {artifactMeta[x.type].label}
              </button>
            ))}
          </nav>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
