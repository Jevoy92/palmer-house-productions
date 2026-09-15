import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { footerColumns, locations, socials, contactInfo } from "@/data/nav";
import { PAL_HEADSHOTS, laneVar } from "@/lib/pal-lanes";
import type { PalName } from "@/lib/studio-model";
import type { PalAccent } from "@/lib/pricing-catalog";

const quickLinks: Array<{
  label: string;
  hint: string;
  to: string;
  lane: PalAccent;
  pal: PalName;
}> = [
  {
    label: "Find your Pal",
    hint: "Problem-first match",
    to: "/find-your-pal",
    lane: "spotlight",
    pal: "kiana",
  },
  {
    label: "Build a package",
    hint: "Sessions, cadence, add-ons",
    to: "/shop",
    lane: "reel",
    pal: "ryder",
  },
  {
    label: "Watch the proof",
    hint: "Real film, real businesses",
    to: "/work",
    lane: "evergreen",
    pal: "clara",
  },
  {
    label: "Open the Studio",
    hint: "Your content system",
    to: "/studio",
    lane: "system",
    pal: "silas",
  },
];

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border bg-card">
      <div className="mx-auto grid max-w-7xl gap-4 px-4 pt-10 sm:grid-cols-2 lg:grid-cols-4">
        {quickLinks.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className="group relative flex min-h-44 flex-col justify-end overflow-hidden rounded-[1.75rem] border border-white/80 p-5 shadow-soft transition-transform hover:-translate-y-1 motion-reduce:transition-none"
            style={{ background: laneVar(item.lane, "-soft") }}
          >
            <span
              aria-hidden
              className="absolute -right-8 -top-10 size-40 rounded-full"
              style={{ background: `color-mix(in srgb, ${laneVar(item.lane)} 14%, white)` }}
            />
            <img
              src={PAL_HEADSHOTS[item.pal]}
              alt=""
              loading="lazy"
              decoding="async"
              className="pointer-events-none absolute -top-1 right-3 size-28 rounded-full mix-blend-multiply transition-transform duration-500 ease-out group-hover:-translate-y-1 group-hover:scale-105 motion-reduce:transition-none"
            />
            <span className="relative z-10 max-w-[60%]">
              <span
                className="block font-mono text-[10px] font-bold uppercase tracking-[0.16em]"
                style={{ color: laneVar(item.lane, "-text") }}
              >
                {item.hint}
              </span>
              <span className="mt-1 flex items-center gap-2 text-lg font-bold leading-tight">
                {item.label}
                <ArrowRight className="size-4 shrink-0 transition-transform group-hover:translate-x-1" />
              </span>
            </span>
          </Link>
        ))}
      </div>
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-2 lg:grid-cols-[2fr_repeat(5,minmax(0,1fr))]">
        <div className="md:col-span-2 lg:col-span-1">
          <p className="font-display text-lg font-bold">Palmer House Productions</p>
          <p className="mt-3 max-w-sm text-sm text-muted-foreground">
            We turn invisible expertise into visible proof, repeated explanations into reusable
            assets, and scattered ideas into a video system.
          </p>
          <p className="mt-4 text-sm font-medium">
            Serving Seattle, Bellevue, Tacoma, Portland &amp; beyond
          </p>
          <div className="mt-3 text-sm">
            <a
              className="flex min-h-11 items-center text-muted-foreground hover:text-foreground"
              href={`mailto:${contactInfo.email}`}
            >
              {contactInfo.email}
            </a>
            <a
              className="flex min-h-11 items-center text-muted-foreground hover:text-foreground"
              href={contactInfo.phoneHref}
            >
              {contactInfo.phone}
            </a>
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-border px-3 text-xs text-muted-foreground transition-colors hover:border-ink hover:text-foreground"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>

        {footerColumns.map((col) => (
          <div key={col.label}>
            <p className="mb-3 text-sm font-bold">{col.label}</p>
            <ul className="space-y-2">
              {col.links.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="inline-flex min-h-11 min-w-11 items-center text-sm text-muted-foreground hover:text-foreground"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <p className="mb-3 text-sm font-bold">
            <Link
              to="/locations"
              className="-my-3 inline-flex min-h-11 items-center hover:underline"
            >
              Locations
            </Link>
          </p>
          <ul className="space-y-2">
            {locations.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="inline-flex min-h-11 min-w-11 items-center text-sm text-muted-foreground hover:text-foreground"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            to="/contact"
            className="mt-5 inline-flex min-h-11 items-center rounded-full bg-spotlight px-4 text-xs font-semibold text-white"
          >
            Get Started
          </Link>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-5 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Palmer House Productions. All rights reserved.</p>
          <div className="flex gap-4">
            <Link
              to="/privacy"
              className="inline-flex min-h-11 min-w-11 items-center hover:text-foreground"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="inline-flex min-h-11 min-w-11 items-center hover:text-foreground"
            >
              Terms of Service
            </Link>
            <a
              href="/sitemap.xml"
              className="inline-flex min-h-11 min-w-11 items-center hover:text-foreground"
            >
              Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
