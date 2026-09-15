import { useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useInView, usePageInView } from "motion/react";
import chiropractor from "@/assets/work/Chiropractor-optimized.webm";
import chiropractorPoster from "@/assets/work/Chiropractor-poster.jpg";
import farmersMarket from "@/assets/work/FarmersMarket-optimized.webm";
import farmersMarketPoster from "@/assets/work/FarmersMarket-poster.jpg";
import hrEducation from "@/assets/work/HREducation-optimized.webm";
import hrEducationPoster from "@/assets/work/HREducation-poster.jpg";
import musicVideo from "@/assets/work/MusicVideo-optimized.webm";
import musicVideoPoster from "@/assets/work/MusicVideo-poster.jpg";
import naturopath from "@/assets/work/Naturopath-optimized.webm";
import naturopathPoster from "@/assets/work/Naturopath-poster.jpg";
import nonprofit from "@/assets/work/NonProfit-optimized.webm";
import nonprofitPoster from "@/assets/work/NonProfit-poster.jpg";
import politician from "@/assets/work/PoliticianAnnouncement-optimized.webm";
import politicianPoster from "@/assets/work/PoliticianAnnouncement-poster.jpg";
import { ContentLibraryDesk } from "./ContentLibraryDesk";
import { Marquee } from "./Marquee";
import { PalBookingStrip } from "./PalBookingStrip";
import { ScrollHighlightText } from "./ScrollHighlightText";
import { useHydratedReducedMotion } from "@/hooks/use-hydrated-reduced-motion";

const work = [
  {
    src: chiropractor,
    poster: chiropractorPoster,
    label: "Healthcare brand film",
    accent: "bg-system",
    portrait: true,
  },
  {
    src: farmersMarket,
    poster: farmersMarketPoster,
    label: "Community event story",
    accent: "bg-reel",
    portrait: true,
  },
  {
    src: hrEducation,
    poster: hrEducationPoster,
    label: "Internal education video",
    accent: "bg-evergreen",
    portrait: true,
  },
  {
    src: musicVideo,
    poster: musicVideoPoster,
    label: "Music performance film",
    accent: "bg-spotlight",
    portrait: false,
  },
  {
    src: naturopath,
    poster: naturopathPoster,
    label: "Founder authority video",
    accent: "bg-system",
    portrait: true,
  },
  {
    src: nonprofit,
    poster: nonprofitPoster,
    label: "Nonprofit impact story",
    accent: "bg-evergreen",
    portrait: true,
  },
  {
    src: politician,
    poster: politicianPoster,
    label: "Campaign announcement",
    accent: "bg-reel",
    portrait: false,
  },
];

function ShowcaseVideo({
  src,
  poster,
  label,
  portrait,
}: {
  src: string;
  poster: string;
  label: string;
  portrait: boolean;
}) {
  return (
    <video
      data-showcase-src={src}
      poster={poster}
      aria-label={label}
      loop
      muted
      playsInline
      preload="none"
      className={`size-full object-cover transition-transform duration-500 ease-out motion-reduce:transition-none ${
        portrait ? "group-hover:scale-[1.03]" : "scale-[1.32] group-hover:scale-[1.36]"
      }`}
    />
  );
}

export function CreativesShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { margin: "280px 0px" });
  const isPageInView = usePageInView();
  const reduce = useHydratedReducedMotion();
  const active = isInView && isPageInView && !reduce;

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const videos = [...section.querySelectorAll<HTMLVideoElement>("video[data-showcase-src]")];
    const stop = (video: HTMLVideoElement) => {
      video.pause();
      if (!video.hasAttribute("src")) return;
      video.removeAttribute("src");
      video.load();
    };

    if (!active) {
      videos.forEach(stop);
      return;
    }

    const ratios = new Map<HTMLVideoElement, number>();
    const syncPlayback = () => {
      if (document.visibilityState === "hidden") {
        videos.forEach(stop);
        return;
      }
      const selected = new Set(
        [...ratios.entries()]
          .filter(([, ratio]) => ratio > 0.15)
          .sort((a, b) => b[1] - a[1])
          .slice(0, window.matchMedia("(max-width: 767px)").matches ? 1 : 2)
          .map(([video]) => video),
      );
      videos.forEach((video) => {
        if (!selected.has(video)) {
          stop(video);
          return;
        }

        const source = video.dataset.showcaseSrc;
        if (!source) return;
        if (!video.hasAttribute("src")) {
          video.setAttribute("src", source);
          video.load();
        }
        if (video.paused) {
          void video.play().catch(() => {
            // Muted inline playback can still be delayed while decoding starts.
          });
        }
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          ratios.set(entry.target as HTMLVideoElement, entry.intersectionRatio);
        });
        syncPlayback();
      },
      { threshold: [0, 0.15, 0.35, 0.6, 0.85] },
    );
    videos.forEach((video) => observer.observe(video));
    document.addEventListener("visibilitychange", syncPlayback);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", syncPlayback);
      videos.forEach(stop);
    };
  }, [active]);

  return (
    <section
      ref={sectionRef}
      id="work"
      className="scroll-mt-24 overflow-hidden pb-24 pt-12 sm:pb-32 sm:pt-16"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 sm:flex-row sm:items-end sm:justify-between sm:px-6">
        <div>
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-reel">
            Featured work
          </p>
          <h2 className="mt-3 text-[clamp(2.2rem,5vw,4.2rem)] font-extrabold leading-[0.95] tracking-[-0.05em]">
            Recent work that connects.
          </h2>
          <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            Real Palmer House productions · Playback pauses off-screen
          </p>
        </div>
        <Link
          to="/work"
          className="inline-flex min-h-11 items-center gap-2 self-start rounded-full border border-border bg-white px-5 text-sm font-semibold shadow-soft transition-transform hover:scale-[1.03] sm:self-auto"
        >
          View all work <ArrowRight className="size-4" />
        </Link>
      </div>

      <div className="mt-14 overflow-hidden">
        <Marquee duration="52s" label="Selected productions">
          {work.map((item) => (
            <figure
              key={item.label}
              className="group relative h-[22rem] w-[16rem] shrink-0 overflow-hidden rounded-[2rem] sm:h-[30rem] sm:w-[22rem]"
            >
              <ShowcaseVideo
                src={item.src}
                poster={item.poster}
                label={item.label}
                portrait={item.portrait}
              />
              <figcaption className="absolute inset-x-4 bottom-4 flex">
                <span className="inline-flex max-w-full items-center gap-2 rounded-full border border-white/70 bg-white/95 px-3.5 py-2 text-[0.72rem] font-semibold leading-none tracking-[-0.01em] text-ink shadow-[0_10px_28px_-12px_rgb(0_0_0_/_0.65)] transition-transform duration-300 group-hover:-translate-y-0.5 sm:px-4 sm:py-2.5 sm:text-xs">
                  <span className={`size-2 shrink-0 rounded-full ${item.accent}`} aria-hidden />
                  <span className="truncate">{item.label}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </Marquee>
      </div>

      <div className="mx-auto mt-24 max-w-4xl px-4 text-center text-[clamp(1.6rem,3.5vw,2.65rem)] font-semibold leading-[1.22] tracking-[-0.035em]">
        <ScrollHighlightText
          paragraphClassName="mt-7"
          paragraphs={[
            "We don't just make videos; we solve business problems with them. Maybe your onboarding takes too long. Your message isn't landing. Your brand isn't getting seen where it counts.",
            "Whatever the challenge, we start by understanding what's getting in the way — and then design a video system built to fix it.",
            "From training to visibility to customer education, our process turns complex pain points into clear, measurable solutions.",
            "Because video isn't the goal. It's the tool that gets you there.",
          ]}
        />
      </div>

      <ContentLibraryDesk />
      <PalBookingStrip />
    </section>
  );
}
