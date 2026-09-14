/* eslint-disable react-refresh/only-export-components -- Standalone development preview entry. */
import React, { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { createRoot } from "react-dom/client";
import {
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
  RouterProvider,
  useRouterState,
} from "@tanstack/react-router";
import { Toaster, toast } from "sonner";
import type { Session } from "@supabase/supabase-js";
import type { StudioView } from "@/lib/studio-model";
import { StudioPage } from "@/components/studio/StudioApp";
import { StudioContext, useStudio } from "@/components/studio/StudioProvider";
import "@/styles.css";
import "./preview.css";
import * as f from "./fixtures";

type ContextValue = ReturnType<typeof useStudio>;
type FixtureState =
  | "populated"
  | "empty"
  | "loading"
  | "error"
  | "onboarding"
  | "signed-out"
  | "conversation-loading";
type Outcome = "success" | "pending" | "error";
const params = new URLSearchParams(window.location.search);
const initialState = (params.get("state") || "populated") as FixtureState;
const screens: Array<{ view: StudioView; label: string; path: string }> = [
  { view: "home", label: "Dashboard", path: "/studio/dashboard" },
  { view: "conversations", label: "Conversations", path: "/studio/conversations" },
  { view: "assistant", label: "Chat", path: `/studio/conversations/${f.conversationId}` },
  { view: "engine", label: "Create", path: "/studio/create" },
  { view: "ideas", label: "Ideas", path: "/studio/ideas" },
  { view: "campaigns", label: "Campaigns", path: "/studio/campaigns" },
  { view: "campaign", label: "Campaign detail", path: `/studio/campaigns/${f.campaignId}` },
  { view: "library", label: "Library", path: "/studio/library" },
  { view: "approvals", label: "Approvals", path: "/studio/approvals" },
  { view: "calendar", label: "Calendar", path: "/studio/calendar" },
  { view: "roadmap", label: "Video roadmap", path: "/studio/roadmap" },
  { view: "brand", label: "Brand", path: "/studio/brand" },
  { view: "settings", label: "Settings", path: "/studio/settings" },
  { view: "billing", label: "Billing", path: "/studio/billing" },
  { view: "work", label: "All work", path: "/studio/work" },
  { view: "success", label: "Member support", path: "/studio/success" },
];
const initialScreen = screens.find((screen) => screen.view === params.get("view")) || screens[0];
const history = createMemoryHistory({
  initialEntries: [params.get("route") || initialScreen.path],
});
const sampleUser = {
  id: f.userId,
  email: f.profile.email,
  aud: "authenticated",
  role: "authenticated",
  created_at: f.now,
  app_metadata: {},
  user_metadata: { full_name: f.profile.full_name },
};
const sampleSession = {
  access_token: "synthetic-preview-no-access",
  refresh_token: "synthetic-preview-no-access",
  token_type: "bearer",
  expires_in: 3600,
  user: sampleUser,
} as Session;

function FixtureScreen() {
  const location = useRouterState({ select: (state) => state.location });
  const match = screens.find((screen) => screen.path === location.pathname);
  const campaign = /^\/studio\/campaigns?\/([^/]+)$/.exec(location.pathname)?.[1];
  const conversation = /^\/studio\/conversations\/([^/]+)$/.exec(location.pathname)?.[1];
  const view = campaign ? "campaign" : conversation ? "assistant" : match?.view || "home";
  const workTab = (
    location.search as {
      tab?: "ideas" | "campaigns" | "library" | "approvals" | "calendar" | "roadmap";
    }
  ).tab;
  return (
    <StudioPage view={view} campaignId={campaign} conversationId={conversation} workTab={workTab} />
  );
}

function PreviewFrame() {
  const [state, setState] = useState<FixtureState>(initialState);
  const [reset, setReset] = useState(0);
  const [outcome, setOutcome] = useState<Outcome>((params.get("outcome") as Outcome) || "success");
  const location = useRouterState({ select: (router) => router.location });
  const resolver = useRef<(() => void) | null>(null);
  return (
    <>
      <FixtureProvider
        key={`${state}:${reset}`}
        state={state}
        outcome={outcome}
        resolver={resolver}
        onState={setState}
      >
        <Outlet />
        <Toaster position="top-right" richColors />
      </FixtureProvider>
      {params.get("controls") === "0" ? (
        <div className="preview-badge">Synthetic preview · {state}</div>
      ) : (
        <details className="preview-controls" aria-label="Synthetic preview controls">
          <summary>Local fixtures</summary>
          <div className="preview-control-fields">
            <label>
              Page{" "}
              <select
                aria-label="Preview page"
                value={screens.find((s) => s.path === location.pathname)?.path || ""}
                onChange={(event) => history.push(event.target.value)}
              >
                {screens.map((screen) => (
                  <option key={screen.view} value={screen.path}>
                    {screen.label}
                  </option>
                ))}
              </select>
            </label>
            <label>
              State{" "}
              <select
                aria-label="Fixture state"
                value={state}
                onChange={(event) => setState(event.target.value as FixtureState)}
              >
                {[
                  "populated",
                  "empty",
                  "loading",
                  "error",
                  "onboarding",
                  "signed-out",
                  "conversation-loading",
                ].map((value) => (
                  <option key={value}>{value}</option>
                ))}
              </select>
            </label>
            <label>
              Requests{" "}
              <select
                aria-label="Mock request outcome"
                value={outcome}
                onChange={(event) => setOutcome(event.target.value as Outcome)}
              >
                {["success", "pending", "error"].map((value) => (
                  <option key={value}>{value}</option>
                ))}
              </select>
            </label>
            <button
              onClick={() => {
                resolver.current?.();
                resolver.current = null;
              }}
            >
              Resolve pending
            </button>
            <button onClick={() => setReset((value) => value + 1)}>Reset fixture</button>
            <span>No real accounts or network actions</span>
          </div>
        </details>
      )}
    </>
  );
}

function FixtureProvider({
  children,
  state,
  outcome,
  resolver,
  onState,
}: {
  children: ReactNode;
  state: FixtureState;
  outcome: Outcome;
  resolver: React.MutableRefObject<(() => void) | null>;
  onState: (state: FixtureState) => void;
}) {
  const empty = state === "empty";
  const [busy, setBusy] = useState(false);
  const [brand, setBrand] = useState(f.brand);
  const [profile, setProfile] = useState(f.profile);
  const [settings, setSettings] = useState(f.settings);
  const [campaigns, setCampaigns] = useState(empty ? [] : f.campaigns);
  const [assets, setAssets] = useState(empty ? [] : f.assets);
  const [calendar, setCalendar] = useState(empty ? [] : f.calendar);
  const [ideas, setIdeas] = useState(empty ? [] : f.ideas);
  const [conversations, setConversations] = useState(empty ? [] : f.conversations);
  const [messages, setMessages] = useState(empty ? [] : f.messages);
  const [conversationDrafts, setConversationDrafts] = useState<ContextValue["conversationDrafts"]>(
    {},
  );
  const [activeId, setActiveId] = useState<string | null>(null);
  const [hasOlderMessages, setHasOlderMessages] = useState(!empty);
  const [serviceRequests, setServiceRequests] = useState<ContextValue["serviceRequests"]>([]);
  const stamp = () => new Date().toISOString();
  const localId = () => `synthetic-${crypto.randomUUID()}`;
  const complete = useCallback(async () => {
    setBusy(true);
    try {
      if (outcome === "pending")
        await new Promise<void>((resolve) => {
          resolver.current = resolve;
        });
      else await new Promise((resolve) => setTimeout(resolve, 500));
      if (outcome === "error")
        throw new Error("Preview request failed. Your draft is still available; try again.");
    } finally {
      setBusy(false);
    }
  }, [outcome, resolver]);
  const openConversation = useCallback(async (id: string) => setActiveId(id), []);
  const clearConversation = useCallback(() => setActiveId(null), []);
  useEffect(
    () => () => {
      resolver.current?.();
      resolver.current = null;
    },
    [resolver],
  );

  const value: ContextValue = {
    loading: state === "loading",
    loadError:
      state === "error"
        ? "We could not load your studio. Your saved work is safe. Please try again."
        : null,
    retryWorkspace: async () => {
      await complete();
      onState("populated");
    },
    busy,
    session: state === "signed-out" ? null : sampleSession,
    user: state === "signed-out" ? null : sampleUser,
    workspace: state === "onboarding" ? null : f.workspace,
    profile,
    brand,
    settings,
    subscription: f.subscription,
    brandReferences: [],
    campaigns,
    assets,
    calendar,
    ideas,
    assistantMessages: messages,
    conversations,
    activeConversation: conversations.find((item) => item.id === activeId) || null,
    conversationMessages: messages.filter((item) => item.conversation_id === activeId),
    conversationLoading: state === "conversation-loading",
    conversationDrafts,
    setConversationDrafts,
    hasOlderMessages,
    videoProgress: [],
    serviceRequests,
    campaignOutputs: { [f.campaignId]: f.output },
    signIn: async () => {
      await complete();
      onState("populated");
    },
    signUp: async () => {
      await complete();
      onState("onboarding");
      return "Synthetic account created locally.";
    },
    sendMagicLink: async () => {
      await complete();
      toast.info("Preview only: no email was sent.");
    },
    resetPassword: async () => {
      await complete();
      toast.info("Preview only: no email was sent.");
    },
    signOut: async () => onState("signed-out"),
    createWorkspace: async () => {
      await complete();
      onState("populated");
    },
    saveProfile: async (update) => {
      await complete();
      setProfile((current) => ({ ...current, ...update }));
    },
    saveBrand: async (update) => {
      await complete();
      setBrand((current) => ({ ...current, ...update }));
    },
    saveSettings: async (update) => {
      await complete();
      setSettings((current) => ({ ...current, ...update }));
    },
    createIdea: async (input) => {
      await complete();
      const id = localId();
      setIdeas((current) => [
        {
          ...f.ideas[0],
          id,
          body: input.body,
          primary_lane: input.lane,
          business_problem: input.businessProblem,
          source_type: input.sourceType,
          source_url: input.sourceUrl || null,
          source_media_path: input.sourceMediaPath || null,
          created_at: stamp(),
          conversation_id: activeId,
        },
        ...current,
      ]);
      return id;
    },
    updateIdea: async (id, update) => {
      await complete();
      setIdeas((current) =>
        current.map((item) => (item.id === id ? { ...item, ...update } : item)),
      );
    },
    uploadIdeaSource: async () => {
      await complete();
      return "synthetic/no-upload";
    },
    uploadConversationFile: async (file) => {
      await complete();
      return {
        attachment: {
          id: localId(),
          kind: "file",
          label: file.name,
          summary: "Synthetic attachment preview. File contents were not uploaded or read.",
          byte_size: file.size,
        },
        text: "Sample attachment context for local visual testing.",
      };
    },
    askPal: async (question, pal, id) => {
      const conversation = id || activeId;
      setMessages((current) => [
        ...current,
        {
          ...f.messages[0],
          id: localId(),
          conversation_id: conversation,
          body: question,
          pal,
          created_at: stamp(),
        },
      ]);
      await complete();
      setMessages((current) => [
        ...current,
        {
          ...f.messages[1],
          id: localId(),
          conversation_id: conversation,
          pal,
          created_at: stamp(),
        },
      ]);
      setConversations((current) =>
        current.map((item) =>
          item.id === conversation
            ? { ...item, last_message_at: stamp(), message_count: item.message_count + 2 }
            : item,
        ),
      );
      return f.reply;
    },
    startConversation: async (pal, title) => {
      const id = localId();
      setConversations((current) => [
        { ...f.conversations[0], id, title: title || "New conversation", pal, message_count: 0 },
        ...current,
      ]);
      setActiveId(id);
      return id;
    },
    openConversation,
    clearConversation,
    loadOlderMessages: async () => {
      await complete();
      setHasOlderMessages(false);
      setMessages((current) => [
        {
          ...f.messages[0],
          id: localId(),
          conversation_id: activeId,
          body: "Earlier sample note: help customers prepare before their first visit.",
          created_at: "2026-09-12T16:00:00Z",
        },
        ...current,
      ]);
    },
    renameConversation: async (id, title) =>
      setConversations((current) =>
        current.map((item) => (item.id === id ? { ...item, title } : item)),
      ),
    archiveConversation: async (id, archived = true) =>
      setConversations((current) =>
        current.map((item) => (item.id === id ? { ...item, archived } : item)),
      ),
    setConversationPal: async (id, pal) =>
      setConversations((current) =>
        current.map((item) => (item.id === id ? { ...item, pal } : item)),
      ),
    updateVideoProgress: async () => {
      await complete();
      toast.success("Preview progress updated locally.");
    },
    createCampaign: async (input) => {
      await complete();
      const id = localId();
      setCampaigns((current) => [
        { ...f.campaigns[0], ...input, id, anchor_format: input.anchorFormat, created_at: stamp() },
        ...current,
      ]);
      return id;
    },
    suggestDirections: async () => {
      await complete();
      return ["business", "personal", "playful"].map((flavor, index) => ({
        id: `sample-direction-${index}`,
        title: ["Start with the room", "A day at the workbench", "The chair-space test"][index],
        angle: "Show one useful decision with a real example from the workshop.",
        whyItWorks: "It helps customers arrive with a concrete question.",
        lane: "spotlight" as const,
        flavor: flavor as "business" | "personal" | "playful",
      }));
    },
    analyzeSource: async () => {
      await complete();
      return {
        suggestedIdea: "Explain one visible step from the workshop.",
        businessProblem: "Customers need a clear example.",
        audienceDecision: "Prepare a useful question.",
        observedEvidence: ["Synthetic preview source"],
        lane: "spotlight",
      };
    },
    updateAsset: async (id, update) => {
      await complete();
      setAssets((current) =>
        current.map((item) => (item.id === id ? { ...item, ...update } : item)),
      );
    },
    updateCalendarItem: async (id, update) => {
      await complete();
      setCalendar((current) =>
        current.map((item) => (item.id === id ? { ...item, ...update } : item)),
      );
    },
    createCalendarItem: async (input) => {
      await complete();
      const id = localId();
      setCalendar((current) => [
        ...current,
        {
          ...f.calendar[0],
          id,
          title: input.title,
          channel: input.channel,
          publish_at: input.publishAt,
          notes: input.notes || "",
          asset_id: input.assetId || null,
          campaign_id: input.campaignId || null,
        },
      ]);
      return id;
    },
    requestService: async (requestType, notes, campaignId) => {
      await complete();
      setServiceRequests((current) => [
        {
          id: localId(),
          request_type: requestType,
          notes,
          campaign_id: campaignId || null,
          workspace_id: f.workspace.id,
          user_id: sampleUser.id,
          status: "requested",
          created_at: stamp(),
          updated_at: stamp(),
        },
        ...current,
      ]);
      toast.success("Preview only: request saved locally, not sent.");
    },
    uploadBrandAsset: async () => {
      await complete();
      toast.info("Preview only: no file uploaded.");
    },
    addBrandReference: async () => {
      await complete();
      toast.info("Preview reference saved locally.");
    },
    deleteCampaign: async (id) => {
      await complete();
      setCampaigns((current) => current.filter((item) => item.id !== id));
    },
    analyzeWebsite: async () => {
      await complete();
      throw new Error("Website analysis is disabled in this offline fixture.");
    },
    refresh: async () => {
      await complete();
    },
  };
  return <StudioContext.Provider value={value}>{children}</StudioContext.Provider>;
}

const rootRoute = createRootRoute({ component: PreviewFrame });
const fixtureRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "$",
  component: FixtureScreen,
});
const router = createRouter({ routeTree: rootRoute.addChildren([fixtureRoute]), history });
createRoot(document.getElementById("root")!).render(<RouterProvider router={router} />);
