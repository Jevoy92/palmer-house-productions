import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { SiteNav } from "./SiteNav";
import { SiteFooter } from "./SiteFooter";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <SiteNav />
      <main>{children}</main>
      <SiteFooter />
    </div>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-block rounded-full border border-border bg-card px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
      {children}
    </span>
  );
}

export function PageHero({
  eyebrow,
  title,
  highlight,
  subtitle,
  ctas = true,
}: {
  eyebrow?: string;
  title: string;
  highlight?: string;
  subtitle?: string;
  ctas?: boolean;
}) {
  return (
    <section className="relative overflow-hidden px-4 pb-14 pt-16 sm:pt-20">
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ backgroundImage: "var(--gradient-soft)" }}
        aria-hidden
      />
      <div className="mx-auto max-w-3xl text-center">
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
          {title}
          {highlight && (
            <>
              {" "}
              <span className="text-gradient-brand">{highlight}</span>
            </>
          )}
        </h1>
        {subtitle && (
          <p className="mx-auto mt-5 max-w-2xl text-base text-muted-foreground sm:text-lg">{subtitle}</p>
        )}
        {ctas && (
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/contact"
              className="rounded-full px-6 py-3 text-sm font-semibold text-white shadow-glow"
              style={{ backgroundImage: "var(--gradient-brand)" }}
            >
              Book a Discovery Call
            </Link>
            <Link
              to="/production-pricing"
              className="rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold shadow-soft"
            >
              See Pricing
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

export function Section({
  eyebrow,
  title,
  subtitle,
  children,
  muted = false,
}: {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  children?: ReactNode;
  muted?: boolean;
}) {
  return (
    <section className={muted ? "bg-secondary/50 px-4 py-16" : "px-4 py-16"}>
      <div className="mx-auto max-w-6xl">
        {(eyebrow || title || subtitle) && (
          <div className="mx-auto mb-10 max-w-2xl text-center">
            {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
            {title && (
              <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">{title}</h2>
            )}
            {subtitle && <p className="mt-3 text-muted-foreground">{subtitle}</p>}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}

export function Card({
  title,
  body,
  index,
}: {
  title: string;
  body?: string;
  index?: number | string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
      {index !== undefined && (
        <span className="text-gradient-brand font-display text-2xl font-extrabold">{index}</span>
      )}
      <h3 className="mt-2 font-display text-lg font-bold">{title}</h3>
      {body && <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>}
    </div>
  );
}

export function CardGrid({ children, cols = 3 }: { children: ReactNode; cols?: 2 | 3 | 4 }) {
  const cls =
    cols === 2
      ? "sm:grid-cols-2"
      : cols === 4
        ? "sm:grid-cols-2 lg:grid-cols-4"
        : "sm:grid-cols-2 lg:grid-cols-3";
  return <div className={`grid gap-5 ${cls}`}>{children}</div>;
}

export function FaqList({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="mx-auto max-w-3xl space-y-3">
      {items.map((it) => (
        <details key={it.q} className="group rounded-2xl border border-border bg-card p-5 shadow-soft">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-base font-bold">
            {it.q}
            <span className="text-muted-foreground transition-transform group-open:rotate-45">+</span>
          </summary>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{it.a}</p>
        </details>
      ))}
    </div>
  );
}

export function CtaBand({
  title,
  subtitle,
  primaryLabel = "Book a Discovery Call",
}: {
  title: string;
  subtitle?: string;
  primaryLabel?: string;
}) {
  return (
    <section className="px-4 py-16">
      <div
        className="mx-auto max-w-5xl rounded-3xl px-6 py-14 text-center text-white shadow-glow"
        style={{ backgroundImage: "var(--gradient-brand)" }}
      >
        <h2 className="font-display text-3xl font-extrabold sm:text-4xl">{title}</h2>
        {subtitle && <p className="mx-auto mt-3 max-w-xl text-white/90">{subtitle}</p>}
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Link to="/contact" className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-foreground">
            {primaryLabel}
          </Link>
          <Link
            to="/pals"
            className="rounded-full border border-white/60 px-6 py-3 text-sm font-semibold text-white"
          >
            Explore the Pals
          </Link>
        </div>
      </div>
    </section>
  );
}
