import { Link } from "@tanstack/react-router";
import * as Dialog from "@radix-ui/react-dialog";
import * as MenuPrimitive from "@radix-ui/react-dropdown-menu";
import { motion } from "motion/react";
import { useEffect, useState, type ReactNode } from "react";
import {
  Home,
  MessageSquareText,
  FolderOpen,
  Lightbulb,
  Images,
  CheckSquare2,
  CalendarDays,
  Gauge,
  ListTodo,
  HandHeart,
  Plus,
  Menu,
  X,
  ChevronDown,
  Settings,
  CreditCard,
  ExternalLink,
  LogOut,
} from "lucide-react";
import type { StudioView } from "@/lib/studio-model";
import { useStudio } from "./StudioProvider";
import { StudioMark } from "./StudioVisuals";
import { StudioNotifications } from "./StudioNotifications";
import { StudioStartHere } from "./StudioStartHere";
import { CelebrationLayer } from "./Celebrate";
import { useStudioMotion } from "./studio-motion";

const groups = [
  {
    label: "Workspace",
    items: [
      { view: "home", label: "Home", to: "/studio/dashboard", icon: Home },
      {
        view: "conversations",
        label: "Conversations",
        to: "/studio/conversations",
        icon: MessageSquareText,
      },
    ],
  },
  {
    label: "Production",
    items: [
      { view: "campaigns", label: "Campaigns", to: "/studio/campaigns", icon: FolderOpen },
      { view: "ideas", label: "Ideas", to: "/studio/ideas", icon: Lightbulb },
      { view: "library", label: "Library", to: "/studio/library", icon: Images },
      { view: "approvals", label: "Approvals", to: "/studio/approvals", icon: CheckSquare2 },
      { view: "calendar", label: "Calendar", to: "/studio/calendar", icon: CalendarDays },
    ],
  },
  {
    label: "Your business",
    items: [
      { view: "brand", label: "Brand DNA", to: "/studio/brand", icon: Gauge },
      { view: "roadmap", label: "Video roadmap", to: "/studio/roadmap", icon: ListTodo },
      { view: "success", label: "Member support", to: "/studio/success", icon: HandHeart },
    ],
  },
] as const;

function isActive(view: StudioView, item: string) {
  return (
    view === item ||
    (item === "campaigns" && (view === "campaign" || view === "work")) ||
    (item === "conversations" && view === "assistant")
  );
}

function StudioNavigation({
  close,
  view,
  reviewCount,
}: {
  close?: () => void;
  view: StudioView;
  reviewCount: number;
}) {
  return (
    <>
      <Link
        to="/studio/create"
        onClick={close}
        className="studio-create-action"
        aria-current={view === "engine" ? "page" : undefined}
      >
        <Plus className="size-4" aria-hidden="true" /> Create a campaign
      </Link>
      <nav aria-label="Studio navigation" className="space-y-6">
        {groups.map((group) => (
          <div key={group.label}>
            <p className="studio-nav-group">{group.label}</p>
            <div className="mt-2 space-y-0.5">
              {group.items.map((item) => (
                <Link
                  key={item.view}
                  to={item.to}
                  onClick={close}
                  aria-current={isActive(view, item.view) ? "page" : undefined}
                  className="studio-nav-item"
                >
                  <item.icon
                    className="size-[18px] shrink-0"
                    strokeWidth={1.65}
                    aria-hidden="true"
                  />
                  <span>{item.label}</span>
                  {item.view === "approvals" && reviewCount > 0 ? (
                    <span className="studio-count ml-auto">{reviewCount}</span>
                  ) : null}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </nav>
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
  const { workspace, profile, user, subscription, assets, signOut } = useStudio();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { enter, transition } = useStudioMotion();
  const memberName =
    profile?.full_name || (user?.user_metadata?.full_name as string) || "Studio member";
  const reviewCount = assets.filter((asset) => asset.status === "review").length;
  const pageLabel =
    groups.flatMap((group) => [...group.items]).find((item) => isActive(view, item.view))?.label ||
    (
      { engine: "Create a campaign", settings: "Settings", billing: "Usage & billing" } as Record<
        string,
        string
      >
    )[view] ||
    "Studio";
  useEffect(() => {
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [view]);

  return (
    <div className="studio-workspace min-h-dvh">
      <CelebrationLayer />
      <a href="#studio-content" className="studio-skip-link">
        Skip to workspace
      </a>
      <aside className="studio-sidebar fixed inset-y-0 left-0 z-40 hidden w-60 flex-col border-r px-4 py-5 lg:flex">
        <Link
          to="/studio/dashboard"
          aria-label="Palmer House Studio home"
          className="mb-6 block rounded-lg px-2 py-1"
        >
          <StudioMark />
        </Link>
        <div className="min-h-0 flex-1 overflow-y-auto pb-4">
          <StudioNavigation view={view} reviewCount={reviewCount} />
        </div>
        <div className="border-t border-border px-2 pt-4">
          <p className="truncate text-[13px] font-bold">{workspace?.name}</p>
          <Link
            to="/studio/billing"
            className="mt-1 inline-flex min-h-8 items-center gap-2 text-xs text-muted-foreground"
          >
            {subscription?.plan || "Member"} plan <ChevronDown className="size-3 -rotate-90" />
          </Link>
        </div>
      </aside>

      <header className="studio-topbar sticky top-0 z-30 flex h-16 items-center gap-3 border-b px-4 sm:px-6 lg:ml-60 lg:px-8">
        <Dialog.Root open={mobileOpen} onOpenChange={setMobileOpen}>
          <Dialog.Trigger asChild>
            <button aria-label="Open navigation" className="studio-icon-button lg:hidden">
              <Menu className="size-5" />
            </button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="studio-app studio-navigation-backdrop" />
            <Dialog.Content className="studio-app studio-navigation-drawer">
              <div className="flex items-center justify-between border-b border-border pb-5">
                <Dialog.Title className="text-base font-bold">Your Studio</Dialog.Title>
                <Dialog.Close asChild>
                  <button className="studio-icon-button" aria-label="Close navigation">
                    <X className="size-5" />
                  </button>
                </Dialog.Close>
              </div>
              <Dialog.Description className="sr-only">
                Navigate your conversations, production work, and business tools.
              </Dialog.Description>
              <div className="min-h-0 flex-1 overflow-y-auto py-5">
                <StudioNavigation
                  view={view}
                  reviewCount={reviewCount}
                  close={() => setMobileOpen(false)}
                />
              </div>
              <Link
                to="/studio/settings"
                onClick={() => setMobileOpen(false)}
                className="studio-nav-item border-t border-border"
              >
                <Settings className="size-4" /> Settings
              </Link>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
        <p className="min-w-0 truncate text-sm font-semibold">
          {pageLabel}
          <span className="mx-3 hidden font-normal text-border sm:inline">/</span>
          <span className="hidden font-normal text-muted-foreground sm:inline">
            {workspace?.name}
          </span>
        </p>
        <div className="ml-auto flex shrink-0 items-center gap-2">
          <StudioStartHere />
          <StudioNotifications />
          <MenuPrimitive.Root>
            <MenuPrimitive.Trigger asChild>
              <button aria-label="Account menu" className="studio-account-button">
                <span className="grid size-8 place-items-center rounded-lg bg-spotlight-soft text-xs font-bold text-spotlight">
                  {memberName.slice(0, 1).toUpperCase()}
                </span>
                <ChevronDown className="size-3.5" />
              </button>
            </MenuPrimitive.Trigger>
            <MenuPrimitive.Portal>
              <MenuPrimitive.Content
                sideOffset={8}
                align="end"
                className="studio-app studio-account-menu"
              >
                <MenuPrimitive.Label className="block border-b border-border px-3 pb-3 pt-2 text-sm font-semibold">
                  {memberName}
                  <span className="mt-1 block text-xs font-normal text-muted-foreground">
                    {workspace?.name}
                  </span>
                </MenuPrimitive.Label>
                <MenuPrimitive.Item asChild>
                  <Link to="/studio/settings" className="studio-menu-item">
                    <Settings className="size-4" /> Profile & settings
                  </Link>
                </MenuPrimitive.Item>
                <MenuPrimitive.Item asChild>
                  <Link to="/studio/billing" className="studio-menu-item">
                    <CreditCard className="size-4" /> Usage & billing
                  </Link>
                </MenuPrimitive.Item>
                <MenuPrimitive.Item asChild>
                  <Link to="/" className="studio-menu-item">
                    <ExternalLink className="size-4" /> Palmer House website
                  </Link>
                </MenuPrimitive.Item>
                <MenuPrimitive.Separator className="my-1 border-t border-border" />
                <MenuPrimitive.Item onSelect={() => void signOut()} className="studio-menu-item">
                  <LogOut className="size-4" /> Sign out
                </MenuPrimitive.Item>
              </MenuPrimitive.Content>
            </MenuPrimitive.Portal>
          </MenuPrimitive.Root>
        </div>
      </header>
      <motion.main
        id="studio-content"
        tabIndex={-1}
        key={view}
        initial={enter}
        animate={{ opacity: 1, transform: "translateY(0px)" }}
        transition={transition}
        className="studio-workspace-content min-h-[calc(100dvh-4rem)] px-4 py-6 sm:px-6 lg:ml-60 lg:px-8 lg:py-8"
      >
        {children}
      </motion.main>
    </div>
  );
}
