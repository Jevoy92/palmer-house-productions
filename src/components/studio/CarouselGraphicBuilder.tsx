import { motion, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight, Download, Images, Palette } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { studioVisualStyles, type CampaignOutput, type StudioLane } from "@/lib/studio-model";

const lanes: Record<StudioLane, { color: string; name: string; job: string }> = {
  spotlight: { color: "#3D1A66", name: "Spotlight", job: "Build trust" },
  reel: { color: "#E8720C", name: "Reel", job: "Earn attention" },
  evergreen: { color: "#5B8A2D", name: "Evergreen", job: "Teach clearly" },
  system: { color: "#0A9B8F", name: "System", job: "Create clarity" },
};

function escapeXml(value: string) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

function wrap(value: string, limit = 24) {
  const words = value.trim().split(/\s+/);
  const lines: string[] = [];
  words.forEach((word) => {
    const current = lines.at(-1) || "";
    if (!current || `${current} ${word}`.length > limit) lines.push(word);
    else lines[lines.length - 1] = `${current} ${word}`;
  });
  return lines.slice(0, 7);
}

function visualMark(style: string, color: string) {
  if (style === "premium-editorial")
    return `<circle cx="890" cy="260" r="128" fill="${color}"/><rect x="780" y="386" width="220" height="16" rx="8" fill="${color}"/>`;
  if (style === "minimal-swiss")
    return `<rect x="790" y="135" width="190" height="190" rx="8" fill="${color}"/><circle cx="885" cy="230" r="40" fill="#F4F1EA"/>`;
  if (style === "bold-type")
    return `<rect x="740" y="80" width="340" height="520" fill="${color}"/><text x="785" y="440" fill="#F4F1EA" font-size="300" font-weight="900">+</text>`;
  if (style === "soft-illustration")
    return `<circle cx="890" cy="220" r="90" fill="${color}" opacity=".18"/><path d="M730 440 Q820 285 900 410 Q965 310 1080 460 L1080 610 L730 610Z" fill="${color}"/><circle cx="955" cy="225" r="44" fill="#F4F1EA" stroke="${color}" stroke-width="12"/>`;
  return `<g filter="url(#shadow)"><rect x="742" y="120" width="292" height="292" rx="72" fill="#fff"/><circle cx="840" cy="230" r="70" fill="${color}"/><rect x="842" y="300" width="130" height="68" rx="34" fill="${color}" opacity=".68"/><circle cx="980" cy="120" r="34" fill="${color}" opacity=".32"/></g>`;
}

function slideSvg({
  business,
  copy,
  index,
  total,
  lane,
  style,
}: {
  business: string;
  copy: string;
  index: number;
  total: number;
  lane: StudioLane;
  style: string;
}) {
  const meta = lanes[lane];
  const lines = wrap(copy);
  const text = lines
    .map(
      (line, lineIndex) =>
        `<text x="92" y="${565 + lineIndex * 96}" fill="#202126" font-family="Arial, Helvetica, sans-serif" font-size="74" font-weight="800" letter-spacing="-2">${escapeXml(line)}</text>`,
    )
    .join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1350" viewBox="0 0 1080 1350"><defs><filter id="shadow" x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="0" dy="24" stdDeviation="20" flood-color="#202126" flood-opacity=".14"/></filter></defs><rect width="1080" height="1350" fill="#F4F1EA"/><rect x="0" y="0" width="18" height="1350" fill="${meta.color}"/>${visualMark(style, meta.color)}<text x="92" y="110" fill="${meta.color}" font-family="ui-monospace, monospace" font-size="20" font-weight="700" letter-spacing="4">${escapeXml(meta.name.toUpperCase())} · ${escapeXml(meta.job.toUpperCase())}</text><text x="92" y="182" fill="#202126" font-family="Arial, Helvetica, sans-serif" font-size="27" font-weight="700">${escapeXml(business)}</text>${text}<line x1="92" y1="1215" x2="988" y2="1215" stroke="#D9D5CD" stroke-width="2"/><text x="92" y="1270" fill="#202126" font-family="ui-monospace, monospace" font-size="22" font-weight="700" letter-spacing="3">PALMER HOUSE STUDIO</text><text x="988" y="1270" text-anchor="end" fill="${meta.color}" font-family="ui-monospace, monospace" font-size="22" font-weight="700">${String(index + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}</text></svg>`;
}

function download(name: string, content: string, type: string) {
  const url = URL.createObjectURL(new Blob([content], { type }));
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = name;
  anchor.click();
  URL.revokeObjectURL(url);
}

export function CarouselGraphicBuilder({
  output,
  business,
  defaultStyle,
}: {
  output: CampaignOutput;
  business: string;
  defaultStyle?: string;
}) {
  const reduce = useReducedMotion();
  const initialStyle =
    studioVisualStyles.find((style) => style.name === defaultStyle)?.id || "palmer-clay";
  const [style, setStyle] = useState(initialStyle);
  const [slide, setSlide] = useState(0);
  const slides = output.carousel.slides;
  const svgs = useMemo(
    () =>
      slides.map((copy, index) =>
        slideSvg({ business, copy, index, total: slides.length, lane: output.primaryLane, style }),
      ),
    [business, output.primaryLane, slides, style],
  );
  const preview = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgs[slide])}`;

  function downloadSet() {
    const pages = svgs
      .map(
        (svg) =>
          `<figure>${svg}<figcaption>Palmer House Studio campaign graphic</figcaption></figure>`,
      )
      .join("");
    const html = `<!doctype html><html><head><meta charset="utf-8"><title>${escapeXml(output.carousel.title)}</title><style>body{margin:0;background:#F4F1EA;font-family:Arial,sans-serif}figure{width:1080px;margin:0 auto;page-break-after:always}figure svg{display:block;width:1080px;height:1350px}figcaption{display:none}@media print{figure{margin:0}}</style></head><body>${pages}</body></html>`;
    download(
      `${output.title.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}-carousel.html`,
      html,
      "text/html",
    );
    toast.success("Graphic set downloaded. Open it to print or save the full carousel as PDF.");
  }

  return (
    <section className="mt-8 border-t border-border pt-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="studio-eyebrow text-system">Carousel → graphics</p>
          <h3 className="mt-3 text-3xl font-black tracking-[-.045em]">
            Give the idea a visual system.
          </h3>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            These graphics exist only because this campaign exists. Choose one design language,
            preview every slide, then export the set.
          </p>
        </div>
        <button onClick={downloadSet} className="primary-action bg-system">
          <Download className="size-4" /> Download graphic set
        </button>
      </div>
      <div className="mt-6 grid gap-6 lg:grid-cols-[20rem_minmax(0,1fr)]">
        <div>
          <p className="flex items-center gap-2 text-sm font-black">
            <Palette className="size-4 text-system" /> Design language
          </p>
          <div className="mt-3 space-y-2">
            {studioVisualStyles.map((item) => (
              <button
                key={item.id}
                onClick={() => setStyle(item.id)}
                className={`min-h-20 w-full rounded-[1rem] border p-4 text-left ${style === item.id ? "border-system bg-system-soft" : "border-border bg-white"}`}
              >
                <span className="block text-sm font-black">{item.name}</span>
                <span className="mt-1 block text-[11px] leading-relaxed text-muted-foreground">
                  {item.detail}
                </span>
              </button>
            ))}
          </div>
        </div>
        <div className="min-w-0">
          <motion.div
            key={`${style}-${slide}`}
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto max-w-[28rem] overflow-hidden rounded-[1.5rem] border border-border bg-cream shadow-soft"
          >
            <img
              src={preview}
              alt={`Carousel slide ${slide + 1}: ${slides[slide]}`}
              className="aspect-[4/5] w-full"
            />
          </motion.div>
          <div className="mx-auto mt-4 flex max-w-[28rem] items-center justify-between gap-3">
            <button
              onClick={() => setSlide((current) => (current - 1 + slides.length) % slides.length)}
              className="secondary-action px-3"
              aria-label="Previous slide"
            >
              <ArrowLeft className="size-4" />
            </button>
            <span className="font-mono text-xs font-bold">
              {slide + 1} / {slides.length}
            </span>
            <button
              onClick={() => setSlide((current) => (current + 1) % slides.length)}
              className="secondary-action px-3"
              aria-label="Next slide"
            >
              <ArrowRight className="size-4" />
            </button>
          </div>
          <div className="mx-auto mt-3 grid max-w-[28rem] gap-2 sm:grid-cols-2">
            <button
              onClick={() =>
                download(
                  `slide-${String(slide + 1).padStart(2, "0")}.svg`,
                  svgs[slide],
                  "image/svg+xml",
                )
              }
              className="secondary-action w-full"
            >
              <Images className="size-4" /> Download this SVG
            </button>
            <p className="flex min-h-11 items-center text-[10px] leading-relaxed text-muted-foreground">
              1080 × 1350 · editable vector · no gradients
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
