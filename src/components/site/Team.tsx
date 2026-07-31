import silas from "@/assets/pals-optimized/silas.webp";
import samira from "@/assets/pals-optimized/samira.webp";
import kareem from "@/assets/pals-optimized/kareem.webp";
import kiana from "@/assets/pals-optimized/kiana.webp";
import clara from "@/assets/pals-optimized/clara.webp";
import cyrus from "@/assets/pals-optimized/cyrus.webp";
import raquel from "@/assets/pals-optimized/raquel.webp";
import ryder from "@/assets/pals-optimized/ryder.webp";

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
            The <span className="text-gradient-brand">Creators</span>.
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            Meet the Palmer House Pals. Each Pal owns a piece of your video system — from the
            systems that train your team to the reels that get you seen.
          </p>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-4">
            {team.map((m) => (
              <div key={m.name} className="surface-card p-4 text-center">
                <div className="grid h-40 place-items-end overflow-hidden rounded-2xl bg-secondary/40">
                  <img
                    src={m.img}
                    alt={`${m.name}, ${m.role} at Palmer House Productions`}
                    loading="lazy"
                    className="h-full w-full object-contain object-bottom"
                  />
                </div>
                <p className="mt-4 text-sm font-semibold">{m.name}</p>
                <p className="text-xs text-muted-foreground">{m.role}</p>
              </div>
            ))}
          </div>

          <div>
            <h3 className="text-2xl">Hi! We're the team behind Palmer House Productions.</h3>
            <div className="mt-4 space-y-3 leading-relaxed text-muted-foreground">
              <p>
                From training to visibility to customer education, our process turns complex pain
                points into clear, measurable solutions.
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
