import { Link, useNavigate } from "@tanstack/react-router";
import * as Dialog from "@radix-ui/react-dialog";
import * as MenuPrimitive from "@radix-ui/react-dropdown-menu";
import { motion } from "motion/react";
import { useEffect, useRef, useState, type ReactNode, type FormEvent } from "react";
import {
  MessageCircle,
  Newspaper,
  FolderOpen,
  Lightbulb,
  Images,
  CalendarDays,
  Fingerprint,
  ListVideo,
  Plus,
  Menu,
  X,
  ChevronDown,
  Settings,
  CreditCard,
  ExternalLink,
  LogOut,
  Search,
  History,
  PanelLeftClose,
  CircleHelp,
} from "lucide-react";
import type { StudioView } from "@/lib/studio-model";
import { useStudio } from "./StudioProvider";
import { StudioCreditPill } from "./StudioCredits";
import { StudioNotifications } from "./StudioNotifications";
import { CelebrationLayer } from "./Celebrate";
import { useStudioMotion } from "./studio-motion";
import { useGuide } from "./useGuide";
import { StudioPageTrail } from "./StudioPageTrail";
import { PalAvatar } from "./PalAvatar";
import { StudioStartHere } from "./StudioStartHere";
import { openStudioGuide } from "@/lib/studio-onboarding";

const mainItems = [
  { view: "assistant", label: "Chat", to: "/studio/conversations", icon: MessageCircle },
  { view: "feed", label: "Feed", to: "/studio/feed", icon: Newspaper },
  { view: "ideas", label: "Ideas", to: "/studio/ideas", icon: Lightbulb },
  { view: "campaigns", label: "Campaigns", to: "/studio/campaigns", icon: FolderOpen },
  { view: "library", label: "Library", to: "/studio/library", icon: Images },
] as const;
const businessItems = [
  { view: "calendar", label: "Calendar", to: "/studio/calendar", icon: CalendarDays },
  { view: "brand", label: "Brand DNA", to: "/studio/brand", icon: Fingerprint },
  { view: "roadmap", label: "Video roadmap", to: "/studio/roadmap", icon: ListVideo },
] as const;
function active(view: StudioView, item: string) {
  return (
    view === item ||
    (item === "assistant" && view === "conversations") ||
    (item === "campaigns" && (view === "campaign" || view === "engine" || view === "work"))
  );
}
function Navigation({ view, close }: { view: StudioView; close?: () => void }) {
  const { workspace, conversations, clearConversation } = useStudio();
  const { guide } = useGuide();
  const pal = guide;
  return (
    <>
      <div className="studio-workspace-label">
        <span>{workspace?.name.slice(0, 1)}</span>
        <strong>{workspace?.name}</strong>
        <PanelLeftClose size={15} aria-hidden="true" />
      </div>
      <Link
        to="/studio/conversations"
        className="studio-create-action"
        onClick={() => {
          clearConversation();
          close?.();
        }}
      >
        <Plus size={18} />
        New conversation
      </Link>
      <nav aria-label="Studio navigation">
        <div className="studio-nav-items">
          {mainItems.map((item) => (
            <Link
              key={item.view}
              to={item.to}
              className="studio-nav-item"
              aria-current={active(view, item.view) ? "page" : undefined}
              onClick={close}
            >
              <item.icon size={20} strokeWidth={1.6} />
              {item.label}
            </Link>
          ))}
        </div>
        <p className="studio-nav-group">Your business</p>
        <div className="studio-nav-items">
          {businessItems.map((item) => (
            <Link
              key={item.view}
              to={item.to}
              className="studio-nav-item"
              aria-current={active(view, item.view) ? "page" : undefined}
              onClick={close}
            >
              <item.icon size={19} strokeWidth={1.6} />
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
      <div className="studio-recent-chats">
        <p className="studio-nav-group">Recent chats</p>
        {conversations
          .filter((c) => !c.archived)
          .slice(0, 3)
          .map((c) => (
            <Link
              key={c.id}
              to="/studio/conversations/$conversationId"
              params={{ conversationId: c.id }}
              onClick={close}
            >
              <MessageCircle size={15} />
              <span>{c.title}</span>
            </Link>
          ))}
        <Link to="/studio/conversations" onClick={close}>
          <History size={14} />
          All conversations
        </Link>
      </div>
      <div className="studio-sidebar-footer">
        <button
          type="button"
          className="studio-nav-item"
          onClick={() => {
            close?.();
            window.requestAnimationFrame(openStudioGuide);
          }}
        >
          <CircleHelp size={19} />
          Studio guide
        </button>
        <Link to="/studio/conversations" onClick={close} className="studio-current-pal">
          <PalAvatar pal={pal} size="sm" />
          <span>
            <strong>{pal.name}</strong>
            <small>Your creative Pal</small>
          </span>
        </Link>
        <Link
          to="/studio/settings"
          className="studio-nav-item"
          aria-current={view === "settings" ? "page" : undefined}
          onClick={close}
        >
          <Settings size={19} />
          Settings
        </Link>
      </div>
    </>
  );
}
export function StudioWorkspaceShell({
  view,
  children,
}: {
  view: StudioView;
  children: ReactNode;
}) {
  const { workspace, profile, user, signOut } = useStudio();
  const { guide } = useGuide();
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigationOpener = useRef<HTMLElement | null>(null);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const { enter, transition } = useStudioMotion();
  const chat = view === "assistant" || view === "conversations";
  const member = profile?.full_name || String(user?.user_metadata?.full_name || "Studio member");
  useEffect(() => {
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [view]);
  useEffect(() => {
    const open = () => {
      navigationOpener.current =
        document.activeElement instanceof HTMLElement ? document.activeElement : null;
      setMobileOpen(true);
    };
    window.addEventListener("studio:open-navigation", open);
    return () => window.removeEventListener("studio:open-navigation", open);
  }, []);
  function submitSearch(event: FormEvent) {
    event.preventDefault();
    void navigate({ to: "/studio/library", search: { q: search.trim() } });
  }
  return (
    <div className={`studio-workspace ${chat ? "studio-chat-shell" : ""}`}>
      <CelebrationLayer />
      <a href="#studio-content" className="studio-skip-link">
        Skip to workspace
      </a>
      <header className="studio-topbar">
        <Link to="/studio/conversations" className="studio-wordmark">
          <strong>Palmer House</strong> Studio
        </Link>
        <form className="studio-global-search" onSubmit={submitSearch}>
          <Search size={17} />
          <input
            aria-label="Search your content"
            placeholder="Search your content…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
        <div className="studio-topbar-actions">
          <button
            type="button"
            className="studio-guide-trigger"
            aria-label="Open Studio guide"
            onClick={openStudioGuide}
          >
            <CircleHelp size={16} />
            Guide
          </button>
          <StudioCreditPill />
          <StudioNotifications />
          <MenuPrimitive.Root>
            <MenuPrimitive.Trigger asChild>
              <button aria-label="Account menu" className="studio-account-button">
                <span>
                  {member
                    .split(/\s+/)
                    .map((n) => n[0])
                    .slice(0, 2)
                    .join("")}
                </span>
                <ChevronDown size={14} />
              </button>
            </MenuPrimitive.Trigger>
            <MenuPrimitive.Portal>
              <MenuPrimitive.Content
                className="studio-app studio-account-menu"
                sideOffset={8}
                align="end"
              >
                <MenuPrimitive.Label className="studio-account-label">
                  {member}
                  <small>{workspace?.name}</small>
                </MenuPrimitive.Label>
                <MenuPrimitive.Item asChild>
                  <Link to="/studio/settings" className="studio-menu-item">
                    <Settings size={17} />
                    Profile & settings
                  </Link>
                </MenuPrimitive.Item>
                <MenuPrimitive.Item asChild>
                  <Link to="/studio/billing" className="studio-menu-item">
                    <CreditCard size={17} />
                    Usage & billing
                  </Link>
                </MenuPrimitive.Item>
                <MenuPrimitive.Item asChild>
                  <Link to="/" className="studio-menu-item">
                    <ExternalLink size={17} />
                    Palmer House website
                  </Link>
                </MenuPrimitive.Item>
                <MenuPrimitive.Item
                  onSelect={() => window.requestAnimationFrame(openStudioGuide)}
                  className="studio-menu-item"
                >
                  <CircleHelp size={17} />
                  Studio guide
                </MenuPrimitive.Item>
                <MenuPrimitive.Item onSelect={() => void signOut()} className="studio-menu-item">
                  <LogOut size={17} />
                  Sign out
                </MenuPrimitive.Item>
              </MenuPrimitive.Content>
            </MenuPrimitive.Portal>
          </MenuPrimitive.Root>
        </div>
      </header>
      <aside className="studio-sidebar">
        <Navigation view={view} />
      </aside>
      <Dialog.Root open={mobileOpen} onOpenChange={setMobileOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="studio-app studio-navigation-backdrop" />
          <Dialog.Content
            className="studio-app studio-navigation-drawer"
            onCloseAutoFocus={(event) => {
              event.preventDefault();
              const target = navigationOpener.current?.isConnected
                ? navigationOpener.current
                : document.getElementById("studio-content");
              target?.focus();
            }}
          >
            <div className="studio-drawer-heading">
              <Dialog.Title>Your Studio</Dialog.Title>
              <Dialog.Close asChild>
                <button className="studio-icon-button" aria-label="Close navigation">
                  <X size={20} />
                </button>
              </Dialog.Close>
            </div>
            <Dialog.Description className="sr-only">
              Navigate your conversations, content, and business tools.
            </Dialog.Description>
            <div className="studio-drawer-scroll">
              <Navigation view={view} close={() => setMobileOpen(false)} />
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
      {!chat && (
        <div className="studio-mobile-toolbar">
          <button
            className="studio-icon-button"
            aria-label="Open navigation"
            onClick={(event) => {
              navigationOpener.current = event.currentTarget;
              setMobileOpen(true);
            }}
          >
            <Menu size={21} />
          </button>
          <span>Palmer House Studio</span>
          <Link
            to="/studio/conversations"
            aria-label="Open chat"
            className={view === "library" ? "studio-icon-button" : undefined}
          >
            {view === "library" ? <MessageCircle size={21} /> : <PalAvatar pal={guide} size="sm" />}
          </Link>
        </div>
      )}
      <motion.main
        id="studio-content"
        tabIndex={-1}
        key={view}
        initial={enter}
        animate={{ opacity: 1, transform: "translateY(0px)" }}
        transition={transition}
        className="studio-workspace-content"
      >
        <StudioStartHere />
        {!chat && <StudioPageTrail view={view} />}
        {children}
      </motion.main>
      <nav className="studio-bottom-nav" aria-label="Main navigation">
        {mainItems.map((item) => (
          <Link
            key={item.view}
            to={item.to}
            aria-current={active(view, item.view) ? "page" : undefined}
          >
            <item.icon size={22} strokeWidth={1.65} />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}
