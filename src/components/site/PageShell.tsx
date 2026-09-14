import { Link, type LinkProps } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { SiteNav } from "./SiteNav";
import { SiteFooter } from "./SiteFooter";
import "./marketing.css";

export type MarketingLane = "spotlight" | "reel" | "evergreen" | "system";

export function PageShell({
  children,
  lane = "spotlight",
}: {
  children: ReactNode;
  lane?: MarketingLane;
}) {
  return (
    <div className="marketing-site marketing-lane min-h-screen bg-background" data-lane={lane}>
      <SiteNav />
      <main>{children}</main>
      <SiteFooter />
    </div>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return <span className="marketing-eyebrow">{children}</span>;
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
    <section className="marketing-page-hero px-5 py-14 sm:py-20">
      <div className="mx-auto max-w-3xl text-center">
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
          {title}
          {highlight && (
            <>
              {" "}
              <span className="marketing-lane-text">{highlight}</span>
            </>
          )}
        </h1>
        {subtitle && (
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-ink-soft sm:text-lg">
            {subtitle}
          </p>
        )}
        {ctas && (
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/contact" className="marketing-action">
              Book a Discovery Call
            </Link>
            <Link to="/production-pricing" className="marketing-action marketing-action-secondary">
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
    <section
      className={`marketing-section px-5 py-14 sm:py-16${muted ? " marketing-section-muted" : ""}`}
    >
      <div className="mx-auto max-w-6xl">
        {(eyebrow || title || subtitle) && (
          <div className="mx-auto mb-10 max-w-2xl text-center">
            {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
            {title && (
              <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
                {title}
              </h2>
            )}
            {subtitle && <p className="mt-3 leading-relaxed text-muted-foreground">{subtitle}</p>}
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
    <article className="marketing-card p-6 sm:p-7">
      {index !== undefined && (
        <span className="marketing-card-index font-display text-2xl font-extrabold">{index}</span>
      )}
      <h3 className={`${index !== undefined ? "mt-5 " : ""}font-display text-xl font-bold`}>
        {title}
      </h3>
      {body && <p className="mt-3 text-sm leading-relaxed text-ink-soft">{body}</p>}
    </article>
  );
}

export function CardGrid({ children, cols = 3 }: { children: ReactNode; cols?: 2 | 3 | 4 }) {
  const cls =
    cols === 2
      ? "sm:grid-cols-2"
      : cols === 4
        ? "sm:grid-cols-2 lg:grid-cols-4"
        : "sm:grid-cols-2 lg:grid-cols-3";
  return <div className={`marketing-card-grid grid gap-4 sm:gap-5 ${cls}`}>{children}</div>;
}

export function FaqList({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="marketing-faq mx-auto max-w-3xl">
      {items.map((it) => (
        <details key={it.q} className="marketing-faq-item group py-5 sm:py-6">
          <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-5 font-display text-base font-bold sm:text-lg">
            {it.q}
            <span className="marketing-faq-toggle" aria-hidden="true">
              +
            </span>
          </summary>
          <p className="mt-3 max-w-2xl pr-9 text-sm leading-relaxed text-ink-soft sm:text-base">
            {it.a}
          </p>
        </details>
      ))}
    </div>
  );
}

export function CtaBand({
  title,
  subtitle,
  primaryLabel = "Book a Discovery Call",
  primaryTo = "/contact",
}: {
  title: string;
  subtitle?: string;
  primaryLabel?: string;
  primaryTo?: LinkProps["to"];
}) {
  return (
    <section className="px-5 py-12 sm:py-16">
      <div className="marketing-cta mx-auto grid max-w-6xl items-center gap-7 rounded-2xl p-7 sm:p-10 lg:grid-cols-[minmax(0,1fr)_auto]">
        <div>
          <h2 className="max-w-2xl font-display text-3xl font-extrabold leading-tight sm:text-4xl">
            {title}
          </h2>
          {subtitle && <p className="mt-4 max-w-xl leading-relaxed text-ink-soft">{subtitle}</p>}
        </div>
        <div className="flex flex-wrap gap-3 lg:max-w-64 lg:flex-col">
          <Link to={primaryTo} className="marketing-action">
            {primaryLabel}
          </Link>
          <Link to="/pals" className="marketing-action marketing-action-secondary">
            Explore the Pals
          </Link>
        </div>
      </div>
    </section>
  );
}
