import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { navGroups } from "@/data/nav";

export function SiteNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/85 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3">
        <Link to="/" className="flex shrink-0 items-center gap-2">
          <span
            className="flex size-9 items-center justify-center rounded-full text-xs font-bold text-white"
            style={{ backgroundColor: "var(--spotlight)" }}
          >
            PH
          </span>
          <span className="font-display text-sm font-bold leading-tight sm:text-base">
            Palmer House
            <span className="block text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Productions
            </span>
          </span>
        </Link>

        <div className="ml-auto hidden items-center gap-1 lg:flex">
          {navGroups.map((group) => (
            <div key={group.label} className="group relative">
              <button className="flex items-center gap-1 rounded-full px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">
                {group.label}
                <svg viewBox="0 0 24 24" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>
              <div className="invisible absolute left-0 top-full z-50 w-60 translate-y-1 rounded-xl border border-border bg-card p-2 opacity-0 shadow-soft transition-all group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                {group.links.map((l) => (
                  <Link
                    key={l.to}
                    to={l.to}
                    className="block rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                    activeProps={{ className: "block rounded-lg px-3 py-2 text-sm font-semibold text-foreground bg-secondary" }}
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
          <Link
            to="/contact"
            className="ml-2 rounded-full p-[1.5px] shadow-soft"
            style={{ backgroundColor: "var(--spotlight)" }}
          >
            <span className="block rounded-full bg-card px-5 py-2 text-sm font-semibold">Contact</span>
          </Link>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
          className="ml-auto rounded-lg border border-border p-2 lg:hidden"
        >
          <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? <path d="M18 6 6 18M6 6l12 12" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </nav>

      {open && (
        <div className="max-h-[75vh] overflow-y-auto border-t border-border bg-card px-4 py-4 lg:hidden">
          {navGroups.map((group) => (
            <div key={group.label} className="mb-4">
              <p className="mb-1 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                {group.label}
              </p>
              {group.links.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-2.5 text-sm text-foreground/80 hover:bg-secondary"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          ))}
          <Link
            to="/contact"
            onClick={() => setOpen(false)}
            className="block rounded-full px-5 py-3 text-center text-sm font-semibold text-white"
            style={{ backgroundColor: "var(--spotlight)" }}
          >
            Contact
          </Link>
        </div>
      )}
    </header>
  );
}
