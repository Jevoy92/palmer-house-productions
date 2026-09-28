import { Link } from "@tanstack/react-router";
import * as Menu from "@radix-ui/react-dropdown-menu";
import { ArrowLeft, ArrowUpRight, ChevronDown } from "lucide-react";
import type { StudioView } from "@/lib/studio-model";
import "./studio-page-trail.css";

const destinations = {
  assistant: { label: "Chat", to: "/studio/conversations" },
  feed: { label: "For you", to: "/studio/feed" },
  ideas: { label: "Saved ideas", to: "/studio/ideas" },
  campaigns: { label: "Campaigns", to: "/studio/campaigns" },
  library: { label: "Library", to: "/studio/library" },
  calendar: { label: "Calendar", to: "/studio/calendar" },
  brand: { label: "Brand DNA", to: "/studio/brand" },
  roadmap: { label: "Video roadmap", to: "/studio/roadmap" },
  settings: { label: "Settings & memory", to: "/studio/settings" },
} as const;
type Destination = keyof typeof destinations;
const paths: Partial<Record<StudioView, { parent: Destination; next: Destination[] }>> = {
  feed: { parent: "assistant", next: ["ideas", "campaigns"] },
  ideas: { parent: "feed", next: ["campaigns", "library"] },
  campaigns: { parent: "ideas", next: ["library", "calendar"] },
  campaign: { parent: "campaigns", next: ["library", "calendar"] },
  engine: { parent: "campaigns", next: ["ideas", "brand"] },
  library: { parent: "campaigns", next: ["calendar", "assistant"] },
  calendar: { parent: "library", next: ["campaigns", "assistant"] },
  brand: { parent: "assistant", next: ["roadmap", "campaigns"] },
  roadmap: { parent: "brand", next: ["ideas", "campaigns"] },
  settings: { parent: "assistant", next: ["brand", "library"] },
};

/** Related work is reachable from the page itself, including on narrow screens. */
export function StudioPageTrail({ view }: { view: StudioView }) {
  const path = paths[view] ?? { parent: "assistant", next: ["library", "calendar"] };
  const parent = destinations[path.parent];
  return (
    <nav className="studio-page-trail" aria-label="Related Studio pages">
      <Link to={parent.to} className="studio-page-parent">
        <ArrowLeft size={15} /> {parent.label}
      </Link>
      <div className="studio-page-next">
        {path.next.map((key) => (
          <Link key={key} to={destinations[key].to}>
            {destinations[key].label} <ArrowUpRight size={13} />
          </Link>
        ))}
        <Menu.Root>
          <Menu.Trigger className="studio-tools-trigger">
            Studio tools <ChevronDown size={13} />
          </Menu.Trigger>
          <Menu.Portal>
            <Menu.Content align="end" sideOffset={8} className="studio-app studio-account-menu">
              <Menu.Label className="studio-account-label">Plan your business</Menu.Label>
              {(["calendar", "brand", "roadmap", "settings"] as const).map((key) => (
                <Menu.Item key={key} asChild>
                  <Link
                    to={destinations[key].to}
                    className="studio-menu-item"
                    aria-current={view === key ? "page" : undefined}
                  >
                    {destinations[key].label}
                  </Link>
                </Menu.Item>
              ))}
            </Menu.Content>
          </Menu.Portal>
        </Menu.Root>
      </div>
    </nav>
  );
}
