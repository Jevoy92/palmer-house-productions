/* eslint-disable react-refresh/only-export-components -- Related collection screens share these static lane labels. */
import { Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { buildReceiptLines, cartSubtotal, useCart } from "@/lib/cart-store";
import {
  PAL_GROUPS,
  computePackagePrice,
  getPackageById,
  type PackageItem,
  type PalAccent,
} from "@/lib/pricing-catalog";
import { CollectionShell } from "./CollectionShell";
import { PreviewMedia } from "./PreviewMedia";
import { money } from "./controls";
import { packageEstimate } from "./package-estimate";

export const collectionLanes: Record<
  PalAccent,
  { name: string; goal: string; description: string }
> = {
  reel: {
    name: "Reel Pal",
    goal: "Get seen more often",
    description: "Short-form content for your business.",
  },
  spotlight: {
    name: "Spotlight Pal",
    goal: "Help buyers trust you",
    description: "Commercials, demos, customer stories and team highlights.",
  },
  system: {
    name: "System Pal",
    goal: "Stop repeating yourself",
    description: "Onboarding, safety, sales and step-by-step training.",
  },
  evergreen: {
    name: "Evergreen Pal",
    goal: "Share your expertise",
    description: "Useful topics explained in depth.",
  },
};

function ProductCard({
  item,
  featured = false,
  priority = false,
}: {
  item: PackageItem;
  featured?: boolean;
  priority?: boolean;
}) {
  const cart = useCart();
  const added = !!cart.selected[item.id];
  const estimate = packageEstimate(cart, item);
  return (
    <article
      className={`pc-product-card${featured ? " pc-featured-card" : ""}`}
      data-lane={item.lane}
    >
      <PreviewMedia id={item.id} name={item.name} priority={priority} />
      <div className="pc-card-body">
        <div className="pc-card-kicker">
          <span className="pc-pal-label">
            <i />
            {collectionLanes[item.lane].name}
          </span>
          {priority && <span>Featured package</span>}
        </div>
        <div className="pc-card-title">
          <img src={item.icon} width="60" height="60" alt="" />
          <h2>
            <Link to="/packages/$packageId" params={{ packageId: item.id }}>
              {item.name}
            </Link>
          </h2>
        </div>
        {featured && <p>{item.description}</p>}
        <div className="pc-card-buy">
          <div>
            <strong>{money(estimate.total)}</strong>
            <small>{estimate.scope.replace("filming ", "").replace("finished ", "")}</small>
          </div>
          {featured && (
            <Link
              to="/packages/$packageId"
              params={{ packageId: item.id }}
              className="pc-lane-button"
            >
              {added ? "Edit package" : "View package"}
              <ArrowRight size={17} />
            </Link>
          )}
        </div>
        {added && (
          <span className="pc-added">
            <Check size={14} /> In your plan
          </span>
        )}
      </div>
    </article>
  );
}

export function CollectionPage({ lane, q = "" }: { lane?: PalAccent | "all"; q?: string }) {
  const cart = useCart();
  const lines = buildReceiptLines(cart);
  const selected = lane && lane !== "all" ? collectionLanes[lane] : undefined;
  const filtered = !!lane || !!q.trim();
  const packages = PAL_GROUPS.flatMap((group) => group.items)
    .map((item) => getPackageById(item.id))
    .filter((item): item is PackageItem => !!item);
  const visible = packages.filter(
    (item) =>
      (!selected || item.lane === lane) &&
      (!q.trim() ||
        `${item.name} ${item.description} ${item.learn.join(" ")}`
          .toLowerCase()
          .includes(q.trim().toLowerCase())),
  );
  const featured = getPackageById("social-content");
  const footer = lines.length ? (
    <div className="pc-plan-dock">
      <div>
        <span>Your plan · {lines.length}</span>
        <strong>{money(cartSubtotal(lines))}</strong>
      </div>
      <Link to="/checkout" className="pc-primary">
        Review plan <ArrowRight size={18} />
      </Link>
    </div>
  ) : undefined;
  return (
    <CollectionShell active="products" footer={footer}>
      {!filtered ? (
        <>
          <section className="pc-store-hero">
            <div className="pc-store-intro">
              <div className="pc-eyebrow">The video collection</div>
              <h1>
                Good work.
                <br />
                Ready to be seen.
              </h1>
              <p>Find the right video for your next move.</p>
              <Link to="/find-your-pal" className="pc-desktop-intro-link">
                Find your starting point <ArrowUpRight size={18} />
              </Link>
            </div>
            {featured && <ProductCard item={featured} featured priority />}
          </section>
          <section className="pc-collection-intro">
            <h2>A Pal for every purpose.</h2>
            <p>Ten clear packages. Four ways to put video to work.</p>
          </section>
          {PAL_GROUPS.map((group) => {
            const items = group.items
              .map((item) => getPackageById(item.id))
              .filter((item): item is PackageItem => !!item);
            const text = collectionLanes[group.id];
            return (
              <section
                className="pc-shelf"
                key={group.id}
                data-lane={group.id}
                aria-labelledby={`lane-${group.id}`}
              >
                <div className="pc-shelf-heading">
                  <div>
                    <span className="pc-pal-label">
                      <i />
                      {text.name}
                    </span>
                    <h2 id={`lane-${group.id}`}>{text.goal}</h2>
                    <p>
                      {items.length} {items.length === 1 ? "package" : "packages"} · From{" "}
                      {money(Math.min(...items.map((item) => computePackagePrice(item))))}
                    </p>
                  </div>
                  <Link
                    to="/shop"
                    search={{ lane: group.id }}
                    className="pc-see-all"
                    aria-label={`Explore ${text.name} packages`}
                  >
                    {items.length === 1 ? "Explore" : "See all"}
                    <ArrowUpRight size={16} />
                  </Link>
                </div>
                <div
                  className={`pc-shelf-track${items.length === 1 ? " pc-single-package" : ""}`}
                  role="region"
                  aria-label={`${text.name} packages`}
                  tabIndex={items.length > 1 ? 0 : undefined}
                >
                  {items.map((item) => (
                    <ProductCard item={item} key={item.id} />
                  ))}
                </div>
              </section>
            );
          })}
          <p className="pc-portfolio-note">
            AI concepts are fictional examples of the deliverables. Package scope is confirmed with
            your quote.
          </p>
          <Link to="/shop" search={{ lane: "all" }} className="pc-section-link">
            Browse all 10 packages <ArrowRight size={18} />
          </Link>
        </>
      ) : (
        <section className="pc-listing">
          <div className="pc-eyebrow">{selected?.name ?? "10 production packages"}</div>
          <h1>
            {selected ? (
              `${selected.goal}.`
            ) : (
              <>
                Find your next
                <br />
                video project.
              </>
            )}
          </h1>
          <p>
            {selected?.description ?? "Choose a category to narrow the list."} Prices below are
            working estimates.
          </p>
          <nav className="pc-category-nav" aria-label="Product categories">
            <Link
              to="/shop"
              search={{ lane: "all", q }}
              aria-current={!selected ? "page" : undefined}
            >
              All
            </Link>
            {Object.entries(collectionLanes).map(([id, value]) => (
              <Link
                key={id}
                to="/shop"
                search={{ lane: id as PalAccent, q }}
                data-lane={id}
                aria-current={lane === id ? "page" : undefined}
              >
                {value.name.replace(" Pal", "")}
              </Link>
            ))}
          </nav>
          {q && (
            <p>
              Results for “{q}”{" "}
              <Link to="/shop" search={{ lane }}>
                Clear search
              </Link>
            </p>
          )}
          <div className="pc-product-grid">
            {visible.map((item) => (
              <ProductCard key={item.id} item={item} featured />
            ))}
          </div>
          {!visible.length && (
            <div className="pc-empty">
              <h2>No packages found.</h2>
              <p>Try a different category or browse the full collection.</p>
              <Link to="/shop" search={{ lane: "all" }} className="pc-outline">
                Browse all packages
              </Link>
            </div>
          )}
        </section>
      )}
    </CollectionShell>
  );
}
