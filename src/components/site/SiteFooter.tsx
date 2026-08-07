import { Link } from "@tanstack/react-router";
import { footerColumns, locations, socials, contactInfo } from "@/data/nav";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border bg-card">
      <div className="grid border-b border-border sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Find your Pal", to: "/find-your-pal", color: "var(--spotlight-soft)" },
          { label: "Build a package", to: "/shop", color: "var(--reel-soft)" },
          { label: "Watch the proof", to: "/work", color: "var(--evergreen-soft)" },
          { label: "Open the Studio", to: "/studio", color: "var(--system-soft)" },
        ].map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className="group flex min-h-28 items-end justify-between border-b border-border p-5 text-lg font-bold sm:border-r lg:border-b-0"
            style={{ background: item.color }}
          >
            {item.label}
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        ))}
      </div>
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-2 lg:grid-cols-6">
        <div className="lg:col-span-2">
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
                className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-border px-3 text-xs text-muted-foreground transition-colors hover:text-foreground"
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
          <p className="mb-3 text-sm font-bold">Locations</p>
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
            className="mt-5 inline-flex min-h-11 items-center rounded-full px-4 text-xs font-semibold text-white"
            style={{ backgroundColor: "var(--spotlight)" }}
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
