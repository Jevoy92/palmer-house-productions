import chiropractor from "@/assets/work/Chiropractor.webm";
import farmersMarket from "@/assets/work/FarmersMarket.webm";
import hrEducation from "@/assets/work/HREducation.webm";
import musicVideo from "@/assets/work/MusicVideo.webm";
import naturopath from "@/assets/work/Naturopath.webm";
import nonprofit from "@/assets/work/NonProfit.webm";
import politician from "@/assets/work/PoliticianAnnouncement.webm";
import { Marquee } from "./Marquee";
import { ScrollHighlightText } from "./ScrollHighlightText";

const work = [
  { src: chiropractor, label: "Healthcare brand film" },
  { src: farmersMarket, label: "Community event story" },
  { src: hrEducation, label: "Internal education video" },
  { src: musicVideo, label: "Music performance film" },
  { src: naturopath, label: "Founder authority video" },
  { src: nonprofit, label: "Nonprofit impact story" },
  { src: politician, label: "Campaign announcement" },
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
          Real Palmer House productions · Hover to pause
        </p>
      </div>

      <div className="mt-14 [mask-image:linear-gradient(to_right,transparent,black_7%,black_93%,transparent)]">
        <Marquee duration="52s">
          {work.concat(work).map((item, index) => (
            <figure
              key={`${item.label}-${index}`}
              className="group relative h-[22rem] w-[16rem] shrink-0 overflow-hidden rounded-[2rem] bg-ink shadow-soft sm:h-[30rem] sm:w-[22rem]"
            >
              <video
                src={item.src}
                aria-label={item.label}
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                className="size-full object-cover transition-transform duration-700 group-hover:scale-[1.035]"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-5 pb-5 pt-16 text-sm font-medium text-white">
                {item.label}
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
    </section>
  );
}
