import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import silas from "@/assets/pal-headshots/silas.png";
import samira from "@/assets/pal-headshots/samira.png";
import kareem from "@/assets/pal-headshots/kareem.png";
import kiana from "@/assets/pal-headshots/kiana.png";
import clara from "@/assets/pal-headshots/clara.png";
import cyrus from "@/assets/pal-headshots/cyrus.png";
import raquel from "@/assets/pal-headshots/raquel.png";
import ryder from "@/assets/pal-headshots/ryder.png";

const team = [
  { name: "Silas", role: "System Pal", lane: "system", img: silas },
  { name: "Samira", role: "System Pal", lane: "system", img: samira },
  { name: "Kareem", role: "Spotlight Pal", lane: "spotlight", img: kareem },
  { name: "Kiana", role: "Spotlight Pal", lane: "spotlight", img: kiana },
  { name: "Clara", role: "Evergreen Pal", lane: "evergreen", img: clara },
  { name: "Cyrus", role: "Evergreen Pal", lane: "evergreen", img: cyrus },
  { name: "Raquel", role: "Reel Pal", lane: "reel", img: raquel },
  { name: "Ryder", role: "Reel Pal", lane: "reel", img: ryder },
] as const;

export function Team() {
  return (
    <section className="border-y border-border bg-secondary px-4 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="grid items-end gap-6 lg:grid-cols-[1.2fr_1fr] lg:gap-14">
          <div>
            <p className="text-sm font-semibold text-spotlight">Meet your guides</p>
            <h2 className="mt-3 max-w-2xl text-[clamp(2rem,4.5vw,3.2rem)] leading-[1.06]">
              A clear system, with a real team behind it.
            </h2>
          </div>
          <p className="max-w-lg text-lg leading-relaxed text-muted-foreground">
            The Pals are recognizable guides for visibility, trust, education, and operations. They
            help you choose the right path; Palmer House people plan and produce the work.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-7 sm:grid-cols-4 sm:gap-x-6 lg:mt-12">
          {team.map((member) => (
            <figure key={member.name} className="marketing-lane" data-lane={member.lane}>
              <div className="overflow-hidden rounded-2xl bg-[var(--lane-soft)] px-3 pt-3 sm:px-5 sm:pt-5">
                <img
                  src={member.img}
                  alt={`${member.name}, a ${member.role} character`}
                  loading="lazy"
                  width={512}
                  height={512}
                  className="aspect-square w-full object-cover mix-blend-multiply"
                />
              </div>
              <figcaption className="mt-3 flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                <span className="text-xl font-bold">{member.name}</span>
                <span className="text-sm font-semibold text-[var(--lane-ink)]">{member.role}</span>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-10 grid gap-5 border-t border-border pt-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
          <h3 className="max-w-sm text-2xl leading-tight sm:text-3xl">
            Founder-led. Built around the work.
          </h3>
          <div>
            <p className="max-w-2xl leading-relaxed text-muted-foreground">
              Jevoy leads strategy and story. Each project brings together production, camera,
              sound, editing, and specialist support as the scope requires. The plan starts with
              your team, your goals, and where the videos will be used.
            </p>
            <Link
              to="/about-us"
              className="mt-4 inline-flex min-h-11 items-center gap-2 font-bold text-spotlight underline-offset-4 hover:underline"
            >
              Get to know Palmer House <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
