import { Link } from "@tanstack/react-router";
import { ArrowRight, MapPin } from "lucide-react";

const locations = [
  { name: "Seattle, WA", slug: "seattle-wa" },
  { name: "Bellevue, WA", slug: "bellevue-wa" },
  { name: "Tacoma, WA", slug: "tacoma-wa" },
  { name: "Portland, OR", slug: "portland-or" },
];

const applications = [
  {
    lane: "reel",
    name: "Reel Pal",
    purpose: "Show up on social",
    formats: "Short-form videos for Reels, TikTok, and Shorts.",
    to: "/reel-pal",
  },
  {
    lane: "spotlight",
    name: "Spotlight Pal",
    purpose: "Tell your brand story",
    formats: "Brand films, client stories, and offer explainers.",
    to: "/spotlight-pal",
  },
  {
    lane: "evergreen",
    name: "Evergreen Pal",
    purpose: "Share what you know",
    formats: "Educational series, FAQ videos, and how-it-works guides.",
    to: "/evergreen-pal",
  },
  {
    lane: "system",
    name: "System Pal",
    purpose: "Put the process on video",
    formats: "Onboarding, training, and step-by-step walkthroughs.",
    to: "/system-pal",
  },
] as const;

export function Stats() {
  return (
    <section className="px-4 py-16 sm:py-20">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
        <div className="rounded-3xl bg-spotlight p-7 text-white sm:p-10">
          <p className="flex items-center gap-2 text-sm font-semibold text-white/80">
            <MapPin className="size-4" aria-hidden="true" /> Our home base
          </p>
          <h2 className="mt-5 max-w-md text-[clamp(2rem,4.5vw,3.2rem)] leading-[1.06]">
            Serving the Pacific Northwest.
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-white/80">
            Video production for businesses and organizations across Washington and Oregon, from
            local teams to healthcare systems, manufacturers, and government agencies.
          </p>

          <nav aria-label="Production locations" className="mt-8 border-t border-white/25 pt-4">
            <div className="grid gap-x-5 sm:grid-cols-2">
              {locations.map((location) => (
                <Link
                  key={location.slug}
                  to="/locations/$slug"
                  params={{ slug: location.slug }}
                  className="flex min-h-12 items-center justify-between gap-3 font-semibold underline-offset-4 hover:underline"
                >
                  {location.name}
                  <ArrowRight className="size-4 shrink-0 text-white/70" aria-hidden="true" />
                </Link>
              ))}
            </div>
            <p className="mt-4 text-sm text-white/80">And throughout the Puget Sound region.</p>
          </nav>
        </div>

        <div className="self-center">
          <p className="text-sm font-semibold text-muted-foreground">A purpose for every piece</p>
          <h3 className="mt-3 text-3xl leading-tight">What does your video need to do?</h3>
          <ul className="mt-5 divide-y divide-border">
            {applications.map((application) => (
              <li key={application.lane}>
                <Link
                  to={application.to}
                  data-lane={application.lane}
                  className="marketing-lane group flex items-center gap-5 rounded-sm py-5 hover:underline"
                >
                  <span
                    className="h-12 w-1.5 shrink-0 rounded-full bg-[var(--lane)]"
                    aria-hidden="true"
                  />
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-semibold text-[var(--lane-ink)]">
                      {application.name}
                    </span>
                    <span className="mt-1 block text-xl font-bold leading-tight">
                      {application.purpose}
                    </span>
                    <span className="mt-2 block text-sm leading-relaxed text-muted-foreground">
                      {application.formats}
                    </span>
                  </span>
                  <ArrowRight
                    className="size-5 shrink-0 text-[var(--lane-ink)]"
                    aria-hidden="true"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
