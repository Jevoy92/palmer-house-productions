import chiropractor from "@/assets/work/Chiropractor.webm";
import chiropractorPoster from "@/assets/work/Chiropractor-poster.jpg";
import farmersMarket from "@/assets/work/FarmersMarket.webm";
import farmersMarketPoster from "@/assets/work/FarmersMarket-poster.jpg";
import hrEducation from "@/assets/work/HREducation.webm";
import hrEducationPoster from "@/assets/work/HREducation-poster.jpg";
import musicVideo from "@/assets/work/MusicVideo.webm";
import musicVideoPoster from "@/assets/work/MusicVideo-poster.jpg";
import naturopath from "@/assets/work/Naturopath.webm";
import naturopathPoster from "@/assets/work/Naturopath-poster.jpg";
import nonprofit from "@/assets/work/NonProfit.webm";
import nonprofitPoster from "@/assets/work/NonProfit-poster.jpg";
import politician from "@/assets/work/PoliticianAnnouncement.webm";
import politicianPoster from "@/assets/work/PoliticianAnnouncement-poster.jpg";
import { Marquee } from "./Marquee";

const work: Array<{ src: string; label: string; poster: string }> = [
  { src: chiropractor, label: "Healthcare brand film", poster: chiropractorPoster },
  { src: farmersMarket, label: "Community event story", poster: farmersMarketPoster },
  { src: hrEducation, label: "Internal education video", poster: hrEducationPoster },
  { src: musicVideo, label: "Music performance film", poster: musicVideoPoster },
  { src: naturopath, label: "Founder authority video", poster: naturopathPoster },
  { src: nonprofit, label: "Nonprofit impact story", poster: nonprofitPoster },
  { src: politician, label: "Campaign announcement", poster: politicianPoster },
];

export function CreativesShowcase() {
  return (
    <section id="work" className="scroll-mt-24 overflow-hidden py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-4 text-center">
        <h2 className="text-[clamp(2.7rem,7vw,5.8rem)] font-extrabold leading-[0.96] tracking-[-0.055em]">
          You&apos;ve probably seen our work.
          <span className="block text-muted-foreground">You just didn&apos;t know it was us.</span>
        </h2>
        <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          Real Palmer House productions · Scroll to explore · Play any film
        </p>
      </div>

      <div className="mt-14 overflow-hidden">
        <Marquee>
          {work.map((item, index) => (
            <figure
              key={`${item.label}-${index}`}
              className="group relative h-[22rem] w-[16rem] shrink-0 overflow-hidden rounded-[2rem] bg-ink shadow-soft sm:h-[30rem] sm:w-[22rem]"
            >
              <video
                src={item.src}
                poster={item.poster}
                aria-label={item.label}
                controls
                muted
                playsInline
                preload="none"
                className="size-full object-cover"
              />
              <figcaption className="pointer-events-none absolute inset-x-0 top-0 bg-black/75 px-5 py-4 text-sm font-medium text-white">
                {item.label}
              </figcaption>
            </figure>
          ))}
        </Marquee>
      </div>

      <div className="mx-auto mt-24 max-w-4xl px-4 text-center text-[clamp(1.6rem,3.5vw,2.65rem)] font-semibold leading-[1.22] tracking-[-0.035em]">
        {[
          "We don't just make videos; we solve business problems with them. Maybe your onboarding takes too long. Your message isn't landing. Your brand isn't getting seen where it counts.",
          "Whatever the challenge, we start by understanding what's getting in the way — and then design a video system built to fix it.",
          "From training to visibility to customer education, our process turns complex pain points into clear, measurable solutions.",
          "Because video isn't the goal. It's the tool that gets you there.",
        ].map((paragraph, index) => (
          <p key={paragraph} className={index > 0 ? "mt-7" : undefined}>
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  );
}
