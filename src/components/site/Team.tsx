import silas from "@/assets/pal-headshots/silas.png";
import samira from "@/assets/pal-headshots/samira.png";
import kareem from "@/assets/pal-headshots/kareem.png";
import kiana from "@/assets/pal-headshots/kiana.png";
import clara from "@/assets/pal-headshots/clara.png";
import cyrus from "@/assets/pal-headshots/cyrus.png";
import raquel from "@/assets/pal-headshots/raquel.png";
import ryder from "@/assets/pal-headshots/ryder.png";

const team = [
  { name: "Silas", role: "System Pal", img: silas },
  { name: "Samira", role: "System Pal", img: samira },
  { name: "Kareem", role: "Spotlight Pal", img: kareem },
  { name: "Kiana", role: "Spotlight Pal", img: kiana },
  { name: "Clara", role: "Evergreen Pal", img: clara },
  { name: "Cyrus", role: "Evergreen Pal", img: cyrus },
  { name: "Raquel", role: "Reel Pal", img: raquel },
  { name: "Ryder", role: "Reel Pal", img: ryder },
];

export function Team() {
  return (
    <section className="px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="surface-card p-8 sm:p-12">
          <h2 className="max-w-3xl text-[clamp(1.9rem,4.5vw,3rem)]">
            A clear system, with a real team behind it.
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            The Pals are recognizable guides for visibility, trust, education, and operations. They
            help you choose the right path; Palmer House people plan and produce the work.
          </p>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-4">
            {team.map((m) => (
              <div key={m.name} className="surface-card p-4 text-center">
                <div className="grid aspect-square place-items-center overflow-hidden rounded-2xl border border-border bg-white">
                  <img
                    src={m.img}
                    alt={`${m.name}, ${m.role} at Palmer House Productions`}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </div>
                <p className="mt-4 text-sm font-semibold">{m.name}</p>
                <p className="text-xs text-muted-foreground">{m.role}</p>
              </div>
            ))}
          </div>

          <div>
            <h3 className="text-2xl">A founder-led company. Never a one-person production.</h3>
            <div className="mt-4 space-y-3 leading-relaxed text-muted-foreground">
              <p>
                Jevoy leads strategy and story. Each project is staffed around the work—with
                production, camera, sound, editing, and specialist support brought together as the
                scope requires.
              </p>
              <p>
                Every project is tailored to your team, your goals, and your bottom line — so you
                get more than beautiful footage. You get content that performs, scales, and delivers
                real ROI.
              </p>
              <p>Because video isn't the goal. It's the tool that gets you there.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
