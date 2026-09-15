import type { Session, User } from "@supabase/supabase-js";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type Dispatch,
  type SetStateAction,
} from "react";
import { toast } from "sonner";
import {
  analyzeStudioContentSource,
  analyzeStudioWebsite,
  askStudioPal,
  generateContentDirections,
  generateStudioCampaign,
} from "@/lib/studio-server";
import { classifyLane } from "@/lib/studio-intelligence";
import type { WebsiteBrandProfile } from "@/lib/studio-server";

import { PlatformPostSchema } from "@/lib/studio-model";
import type {
  AssistantResponse,
  CampaignOutput,
  ContentDirection,
  ContentSourceAnalysis,
  PalName,
  StudioLane,
} from "@/lib/studio-model";
import { supabase } from "@/lib/supabase/client";
import type { Tables } from "@/lib/supabase/database.types";

type Profile = Tables<"profiles">;
type Workspace = Tables<"workspaces">;
type Subscription = Tables<"workspace_subscriptions">;
type Brand = Tables<"brand_profiles">;
type BrandReference = Tables<"brand_references">;
type Campaign = Tables<"campaigns">;
type Asset = Tables<"campaign_assets">;
type CalendarItem = Tables<"calendar_items">;
type Settings = Tables<"workspace_settings">;
type Idea = Tables<"content_ideas">;
type AssistantMessage = Tables<"assistant_messages">;
type Conversation = Tables<"conversations">;

/** A voice note, document, image or recording a member added to a conversation. */
export type ConversationIntake = {
  attachment: {
    id: string;
    kind: string;
    label: string;
    summary: string;
    byte_size: number;
  };
  /** Readable text we pulled out of it, already length-bounded. */
  text: string;
};

export type ConversationDraft = { text: string; files: ConversationIntake[] };

/** How many messages load at once when opening or scrolling back a thread. */
const MESSAGE_PAGE = 30;

function titleFromMessage(question: string) {
  const clean = question.replace(/\s+/g, " ").trim();
  if (clean.length <= 58) return clean || "New conversation";
  return `${clean.slice(0, 58).trimEnd()}…`;
}
type VideoProgress = Tables<"workspace_video_items">;
type ServiceRequest = Tables<"service_requests">;

export type StudioContextValue = {
  loading: boolean;
  loadError: string | null;
  retryWorkspace: () => Promise<void>;
  busy: boolean;
  session: Session | null;
  user: User | null;
  profile: Profile | null;
  workspace: Workspace | null;
  subscription: Subscription | null;
  brand: Brand | null;
  brandReferences: BrandReference[];
  settings: Settings | null;
  campaigns: Campaign[];
  assets: Asset[];
  calendar: CalendarItem[];
  ideas: Idea[];
  assistantMessages: AssistantMessage[];
  conversations: Conversation[];
  activeConversation: Conversation | null;
  conversationMessages: AssistantMessage[];
  conversationDrafts: Record<string, ConversationDraft>;
  setConversationDrafts: Dispatch<SetStateAction<Record<string, ConversationDraft>>>;
  conversationLoading: boolean;
  hasOlderMessages: boolean;
  videoProgress: VideoProgress[];
  serviceRequests: ServiceRequest[];
  campaignOutputs: Record<string, CampaignOutput>;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (fullName: string, email: string, password: string) => Promise<string>;
  sendMagicLink: (email: string) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  signOut: () => Promise<void>;
  createWorkspace: (
    name: string,
    profile?: {
      creatorType: string;
      primaryGoal: string;
      initialProblem: string;
      industry?: string;
      website?: string;
      description?: string;
      personalInterests?: string[];
      personalStory?: string;
    },
  ) => Promise<void>;
  saveProfile: (values: Partial<Profile>) => Promise<void>;
  saveBrand: (values: Partial<Brand>) => Promise<void>;
  saveSettings: (values: Partial<Settings>) => Promise<void>;
  createIdea: (values: {
    body: string;
    sourceType: "text" | "link" | "image" | "chat" | "recommended";
    sourceUrl?: string;
    sourceMediaPath?: string;
    lane: StudioLane;
    businessProblem: string;
  }) => Promise<string>;
  updateIdea: (id: string, values: Partial<Idea>) => Promise<void>;
  uploadIdeaSource: (file: File) => Promise<string>;
  uploadConversationFile: (
    file: File,
    options?: { conversationId?: string; kind?: "voice" | "file" },
  ) => Promise<ConversationIntake>;
  askPal: (question: string, pal: PalName, conversationId?: string) => Promise<AssistantResponse>;
  startConversation: (pal: PalName, title?: string) => Promise<string>;
  openConversation: (id: string) => Promise<void>;
  clearConversation: () => void;
  loadOlderMessages: () => Promise<void>;
  renameConversation: (id: string, title: string) => Promise<void>;
  archiveConversation: (id: string, archived?: boolean) => Promise<void>;
  setConversationPal: (id: string, pal: PalName) => Promise<void>;
  updateVideoProgress: (itemKey: string, status: string, campaignId?: string) => Promise<void>;
  createCampaign: (values: {
    title: string;
    goal: string;
    topic: string;
    offer: string;
    audience: string;
    anchorFormat: string;
    depth: "quick" | "strategic" | "deep";
  }) => Promise<string>;
  suggestDirections: (values: {
    idea: string;
    goal: string;
    audience: string;
  }) => Promise<ContentDirection[]>;
  analyzeSource: (values: {
    sourceType: "link" | "image";
    sourceUrl?: string;
    sourceDataUrl?: string;
    context: string;
  }) => Promise<ContentSourceAnalysis>;
  updateAsset: (id: string, values: Partial<Asset>) => Promise<void>;
  updateCalendarItem: (id: string, values: Partial<CalendarItem>) => Promise<void>;
  createCalendarItem: (values: {
    campaignId?: string;
    assetId?: string;
    title: string;
    channel: string;
    publishAt: string;
    notes?: string;
  }) => Promise<string>;
  requestService: (requestType: string, notes: string, campaignId?: string) => Promise<void>;
  uploadBrandAsset: (file: File, kind?: string) => Promise<void>;
  addBrandReference: (kind: string, label: string, sourceUrl: string) => Promise<void>;
  deleteCampaign: (id: string) => Promise<void>;
  analyzeWebsite: (website: string) => Promise<WebsiteBrandProfile>;
  refresh: () => Promise<void>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const StudioContext = createContext<StudioContextValue | null>(null);

function slugify(value: string) {
  return `${value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")}-${crypto.randomUUID().slice(0, 6)}`;
}

export function StudioProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const loadRequest = useRef(0);
  const conversationRequest = useRef(0);
  const sending = useRef(false);
  const [busy, setBusy] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [workspace, setWorkspace] = useState<Workspace | null>(null);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [brand, setBrand] = useState<Brand | null>(null);
  const [brandReferences, setBrandReferences] = useState<BrandReference[]>([]);
  const [settings, setSettings] = useState<Settings | null>(null);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [assets, setAssets] = useState<Asset[]>([]);
  const [calendar, setCalendar] = useState<CalendarItem[]>([]);
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [assistantMessages, setAssistantMessages] = useState<AssistantMessage[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(null);
  const [conversationMessages, setConversationMessages] = useState<AssistantMessage[]>([]);
  const [conversationDrafts, setConversationDrafts] = useState<Record<string, ConversationDraft>>(
    {},
  );
  const [conversationLoading, setConversationLoading] = useState(false);
  const [hasOlderMessages, setHasOlderMessages] = useState(false);
  const [videoProgress, setVideoProgress] = useState<VideoProgress[]>([]);
  const [serviceRequests, setServiceRequests] = useState<ServiceRequest[]>([]);
  const [campaignOutputs, setCampaignOutputs] = useState<Record<string, CampaignOutput>>({});

  const sessionUserRef = useRef(session?.user.id);
  sessionUserRef.current = session?.user.id;
  const activeConversationRef = useRef(activeConversation);
  const messagesRef = useRef(conversationMessages);
  activeConversationRef.current = activeConversation;
  messagesRef.current = conversationMessages;

  const clearConversation = useCallback(() => {
    conversationRequest.current += 1;
    activeConversationRef.current = null;
    messagesRef.current = [];
    setActiveConversation(null);
    setConversationMessages([]);
    setConversationLoading(false);
    setHasOlderMessages(false);
  }, []);

  const loadWorkspace = useCallback(
    async (activeSession: Session | null) => {
      const request = ++loadRequest.current;
      setLoadError(null);
      if (!activeSession) {
        setProfile(null);
        setWorkspace(null);
        setSubscription(null);
        setBrand(null);
        setBrandReferences([]);
        setSettings(null);
        setCampaigns([]);
        setAssets([]);
        setCalendar([]);
        setIdeas([]);
        setAssistantMessages([]);
        setConversations([]);
        clearConversation();
        setConversationDrafts({});
        setCampaignOutputs({});
        setVideoProgress([]);
        setServiceRequests([]);
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const userId = activeSession.user.id;
        const [profileResult, membershipResult] = await Promise.all([
          supabase.from("profiles").select("*").eq("id", userId).maybeSingle(),
          supabase
            .from("workspace_members")
            .select("workspace_id, role")
            .eq("user_id", userId)
            .order("created_at")
            .limit(1)
            .maybeSingle(),
        ]);
        if (profileResult.error) throw profileResult.error;
        if (membershipResult.error) throw membershipResult.error;
        if (request !== loadRequest.current) return;
        setProfile(profileResult.data);
        const workspaceId = membershipResult.data?.workspace_id;
        if (!workspaceId) {
          setWorkspace(null);
          setLoading(false);
          return;
        }
        const [
          workspaceResult,
          subscriptionResult,
          brandResult,
          brandReferencesResult,
          settingsResult,
          campaignsResult,
          assetsResult,
          calendarResult,
          ideasResult,
          assistantResult,
          conversationsResult,
          videoProgressResult,
          serviceRequestsResult,
        ] = await Promise.all([
          supabase.from("workspaces").select("*").eq("id", workspaceId).single(),
          supabase
            .from("workspace_subscriptions")
            .select("*")
            .eq("workspace_id", workspaceId)
            .maybeSingle(),
          supabase.from("brand_profiles").select("*").eq("workspace_id", workspaceId).maybeSingle(),
          supabase
            .from("brand_references")
            .select("*")
            .eq("workspace_id", workspaceId)
            .order("created_at", { ascending: false }),
          supabase
            .from("workspace_settings")
            .select("*")
            .eq("workspace_id", workspaceId)
            .maybeSingle(),
          supabase
            .from("campaigns")
            .select("*")
            .eq("workspace_id", workspaceId)
            .order("created_at", { ascending: false }),
          supabase
            .from("campaign_assets")
            .select("*")
            .eq("workspace_id", workspaceId)
            .order("sort_order"),
          supabase
            .from("calendar_items")
            .select("*")
            .eq("workspace_id", workspaceId)
            .order("publish_at"),
          supabase
            .from("content_ideas")
            .select("*")
            .eq("workspace_id", workspaceId)
            .order("created_at", { ascending: false }),
          supabase
            .from("assistant_messages")
            .select("*")
            .eq("workspace_id", workspaceId)
            .order("created_at", { ascending: true })
            .limit(80),
          supabase
            .from("conversations")
            .select("*")
            .eq("workspace_id", workspaceId)
            .order("last_message_at", { ascending: false, nullsFirst: false })
            .order("created_at", { ascending: false })
            .limit(50),
          supabase.from("workspace_video_items").select("*").eq("workspace_id", workspaceId),
          supabase
            .from("service_requests")
            .select("*")
            .eq("workspace_id", workspaceId)
            .order("created_at", { ascending: false }),
        ]);
        const failed = [
          workspaceResult,
          subscriptionResult,
          brandResult,
          brandReferencesResult,
          settingsResult,
          campaignsResult,
          assetsResult,
          calendarResult,
          ideasResult,
          assistantResult,
          conversationsResult,
          videoProgressResult,
          serviceRequestsResult,
        ].find((result) => result.error);
        if (failed?.error) throw failed.error;
        if (request !== loadRequest.current) return;
        setWorkspace(workspaceResult.data);
        setSubscription(subscriptionResult.data);
        setBrand(brandResult.data);
        setBrandReferences(brandReferencesResult.data || []);
        setSettings(settingsResult.data);
        setCampaigns(campaignsResult.data || []);
        setAssets(assetsResult.data || []);
        setCalendar(calendarResult.data || []);
        setIdeas(ideasResult.data || []);
        setAssistantMessages(assistantResult.data || []);
        setConversations(conversationsResult.data || []);
        setVideoProgress(videoProgressResult.data || []);
        setServiceRequests(serviceRequestsResult.data || []);
      } catch {
        if (request === loadRequest.current) {
          setLoadError(
            "We could not load your workspace. Your saved work is still there. Please try again.",
          );
        }
      } finally {
        if (request === loadRequest.current) setLoading(false);
      }
    },
    [clearConversation],
  );

  useEffect(() => {
    let mounted = true;
    supabase.auth
      .getSession()
      .then(({ data, error }) => {
        if (!mounted) return;
        if (error) throw error;
        setSession(data.session);
        void loadWorkspace(data.session);
      })
      .catch(() => {
        if (!mounted) return;
        setLoadError("We could not restore your session. Please try again.");
        setLoading(false);
      });
    const { data } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      void loadWorkspace(nextSession);
    });
    return () => {
      mounted = false;
      loadRequest.current += 1;
      data.subscription.unsubscribe();
    };
  }, [loadWorkspace]);

  const refresh = useCallback(async () => loadWorkspace(session), [loadWorkspace, session]);
  const retryWorkspace = useCallback(async () => {
    setLoading(true);
    setLoadError(null);
    try {
      const { data, error } = await supabase.auth.getSession();
      if (error) throw error;
      setSession(data.session);
      await loadWorkspace(data.session);
    } catch {
      setLoadError("We could not restore your session. Please try again.");
      setLoading(false);
    }
  }, [loadWorkspace]);
  async function signIn(email: string, password: string) {
    setBusy(true);
    const result = await supabase.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (result.error) throw result.error;
  }
  async function signUp(fullName: string, email: string, password: string) {
    setBusy(true);
    const result = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
        emailRedirectTo: `${window.location.origin}/studio`,
      },
    });
    setBusy(false);
    if (result.error) throw result.error;
    return result.data.session
      ? "Your account is ready."
      : "Check your email to confirm your account, then return here to sign in.";
  }
  async function sendMagicLink(email: string) {
    setBusy(true);
    const result = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/studio` },
    });
    setBusy(false);
    if (result.error) throw result.error;
  }
  async function resetPassword(email: string) {
    setBusy(true);
    const result = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setBusy(false);
    if (result.error) throw result.error;
  }
  async function signOut() {
    await supabase.auth.signOut();
  }
  async function createWorkspace(
    name: string,
    brandProfile?: {
      creatorType: string;
      primaryGoal: string;
      initialProblem: string;
      industry?: string;
      website?: string;
      description?: string;
      personalInterests?: string[];
      personalStory?: string;
    },
  ) {
    if (!session) throw new Error("Sign in first.");
    setBusy(true);
    let workspaceCreated = false;
    const slug = `${slugify(name)}-${session.user.id.slice(0, 8)}`;
    try {
      // No `.select()` here: the row is only readable once the membership row
      // exists, which the after-insert trigger creates at end of statement.
      const result = await supabase.from("workspaces").insert({
        name,
        slug,
        created_by: session.user.id,
      });
      if (result.error) throw new Error(result.error.message);
      workspaceCreated = true;
      const created = await supabase.from("workspaces").select("id").eq("slug", slug).single();
      if (created.error) throw new Error(created.error.message);
      if (brandProfile) {
        const brandUpdate = await supabase
          .from("brand_profiles")
          .update({
            business_name: name,
            creator_type: brandProfile.creatorType,
            primary_goal: brandProfile.primaryGoal,
            industry: brandProfile.industry || "",
            website: brandProfile.website || "",
            description: brandProfile.description || "",
            personal_interests: brandProfile.personalInterests || [],
            personal_story: brandProfile.personalStory || "",
            brand_details: { initial_problem: brandProfile.initialProblem },
          })
          .eq("workspace_id", created.data.id);
        if (brandUpdate.error) throw new Error(brandUpdate.error.message);
      }
      const profileUpdate = await supabase
        .from("profiles")
        .update({ onboarding_completed: true })
        .eq("id", session.user.id);
      if (profileUpdate.error) throw profileUpdate.error;
      await refresh();
    } catch (error) {
      if (workspaceCreated) await refresh();
      throw error;
    } finally {
      setBusy(false);
    }
  }
  async function saveProfile(values: Partial<Profile>) {
    if (!session) throw new Error("Sign in first.");
    const result = await supabase
      .from("profiles")
      .update(values)
      .eq("id", session.user.id)
      .select()
      .single();
    if (result.error) throw result.error;
    setProfile(result.data);
  }
  async function saveBrand(values: Partial<Brand>) {
    if (!workspace) throw new Error("Create a workspace first.");
    const result = await supabase
      .from("brand_profiles")
      .update(values)
      .eq("workspace_id", workspace.id)
      .select()
      .single();
    if (result.error) throw result.error;
    setBrand(result.data);
  }
  async function saveSettings(values: Partial<Settings>) {
    if (!workspace) throw new Error("Create a workspace first.");
    const result = await supabase
      .from("workspace_settings")
      .update(values)
      .eq("workspace_id", workspace.id)
      .select()
      .single();
    if (result.error) throw result.error;
    setSettings(result.data);
  }
  async function createIdea(values: {
    body: string;
    sourceType: "text" | "link" | "image" | "chat" | "recommended";
    sourceUrl?: string;
    sourceMediaPath?: string;
    lane?: StudioLane;
    businessProblem: string;
  }) {
    if (!workspace) throw new Error("Create a workspace first.");
    if (!session) throw new Error("Sign in first.");
    const lane = values.lane || classifyLane(`${values.body} ${values.businessProblem}`);
    const result = await supabase
      .from("content_ideas")
      .insert({
        workspace_id: workspace.id,
        created_by: session.user.id,
        body: values.body,
        source_type: values.sourceType,
        source_url: values.sourceUrl || null,
        source_media_path: values.sourceMediaPath || null,
        primary_lane: lane,
        business_problem: values.businessProblem,
      })

      .select()
      .single();
    if (result.error) throw result.error;
    setIdeas((current) => [result.data, ...current]);
    return result.data.id;
  }
  async function updateIdea(id: string, values: Partial<Idea>) {
    const result = await supabase
      .from("content_ideas")
      .update(values)
      .eq("id", id)
      .select()
      .single();
    if (result.error) throw result.error;
    setIdeas((current) => current.map((item) => (item.id === id ? result.data : item)));
  }
  async function uploadIdeaSource(file: File) {
    if (!workspace) throw new Error("Create a workspace first.");
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "-");
    const path = `${workspace.id}/idea-sources/${crypto.randomUUID()}-${safeName}`;
    const result = await supabase.storage
      .from("campaign-assets")
      .upload(path, file, { upsert: false });
    if (result.error) throw result.error;
    return result.data.path;
  }
  async function uploadConversationFile(
    file: File,
    options?: { conversationId?: string; kind?: "voice" | "file" },
  ): Promise<ConversationIntake> {
    if (!workspace) throw new Error("Create a workspace first.");
    if (!session) throw new Error("Sign in first.");
    const form = new FormData();
    form.append("file", file);
    form.append("workspaceId", workspace.id);
    if (options?.conversationId) form.append("conversationId", options.conversationId);
    if (options?.kind) form.append("kind", options.kind);
    const response = await fetch("/api/studio/intake", {
      method: "POST",
      headers: { Authorization: `Bearer ${session.access_token}` },
      body: form,
    });
    const payload = (await response.json().catch(() => ({}))) as {
      error?: string;
      attachment?: ConversationIntake["attachment"];
      text?: string;
    };
    if (!response.ok || !payload.attachment)
      throw new Error(payload.error || "We could not read that file.");
    return { attachment: payload.attachment, text: payload.text || "" };
  }
  async function startConversation(pal: PalName, title?: string) {
    if (!workspace) throw new Error("Create a workspace first.");
    if (!session) throw new Error("Sign in first.");
    const request = ++conversationRequest.current;
    const result = await supabase
      .from("conversations")
      .insert({
        workspace_id: workspace.id,
        created_by: session.user.id,
        title: title || "New conversation",
        pal,
      })
      .select()
      .single();
    if (result.error) throw result.error;
    setConversations((current) => [result.data, ...current]);
    if (request === conversationRequest.current) {
      activeConversationRef.current = result.data;
      messagesRef.current = [];
      setActiveConversation(result.data);
      setConversationMessages([]);
      setHasOlderMessages(false);
    }
    return result.data.id;
  }

  const openConversation = useCallback(
    async (id: string) => {
      if (!workspace) throw new Error("Create a workspace first.");
      const request = ++conversationRequest.current;
      activeConversationRef.current = null;
      messagesRef.current = [];
      setActiveConversation(null);
      setConversationMessages([]);
      setHasOlderMessages(false);
      setConversationLoading(true);
      try {
        const [conversation, messages] = await Promise.all([
          supabase
            .from("conversations")
            .select("*")
            .eq("id", id)
            .eq("workspace_id", workspace.id)
            .maybeSingle(),
          // Newest first so the page we load is the part the member wants to see;
          // reversed below for display.
          supabase
            .from("assistant_messages")
            .select("*")
            .eq("conversation_id", id)
            .order("created_at", { ascending: false })
            .limit(MESSAGE_PAGE + 1),
        ]);
        if (conversation.error) throw conversation.error;
        if (messages.error) throw messages.error;
        if (!conversation.data || conversation.data.archived)
          throw new Error("This conversation is unavailable or archived.");
        if (request !== conversationRequest.current) return;
        const rows = messages.data || [];
        const page = rows.slice(0, MESSAGE_PAGE).reverse();
        activeConversationRef.current = conversation.data;
        messagesRef.current = page;
        setActiveConversation(conversation.data);
        setConversationMessages(page);
        setHasOlderMessages(rows.length > MESSAGE_PAGE);
      } finally {
        if (request === conversationRequest.current) setConversationLoading(false);
      }
    },
    [workspace],
  );

  async function loadOlderMessages() {
    if (!activeConversation || !conversationMessages.length) return;
    if (conversationLoading) return;
    const request = conversationRequest.current;
    const oldest = conversationMessages[0];
    setConversationLoading(true);
    try {
      const result = await supabase
        .from("assistant_messages")
        .select("*")
        .eq("conversation_id", activeConversation.id)
        .lt("created_at", oldest.created_at)
        .order("created_at", { ascending: false })
        .limit(MESSAGE_PAGE + 1);
      if (result.error) throw result.error;
      if (request !== conversationRequest.current) return;
      const rows = result.data || [];
      const page = rows.slice(0, MESSAGE_PAGE).reverse();
      setConversationMessages((current) => [...page, ...current]);
      setHasOlderMessages(rows.length > MESSAGE_PAGE);
    } finally {
      if (request === conversationRequest.current) setConversationLoading(false);
    }
  }

  function applyConversation(next: Conversation) {
    setConversations((current) => current.map((item) => (item.id === next.id ? next : item)));
    setActiveConversation((current) => (current?.id === next.id ? next : current));
  }

  async function patchConversation(id: string, values: Partial<Conversation>) {
    const result = await supabase
      .from("conversations")
      .update(values)
      .eq("id", id)
      .select()
      .single();
    if (result.error) throw result.error;
    applyConversation(result.data);
  }

  async function renameConversation(id: string, title: string) {
    await patchConversation(id, { title: title.trim() || "Untitled conversation" });
  }

  async function archiveConversation(id: string, archived = true) {
    await patchConversation(id, { archived });
    if (archived && activeConversationRef.current?.id === id) clearConversation();
  }

  /**
   * Changing Pal keeps the thread and every previous message intact — earlier
   * replies stay attributed to whoever actually said them.
   */
  async function setConversationPal(id: string, pal: PalName) {
    await patchConversation(id, { pal });
  }

  async function askPal(question: string, pal: PalName, conversationId?: string) {
    if (!workspace || !brand) throw new Error("Finish Brand DNA before asking for guidance.");
    if (!session) throw new Error("Sign in first.");
    if (sending.current)
      throw new Error("Wait for the current reply before sending another message.");

    sending.current = true;
    setBusy(true);
    let optimisticId: string | null = null;
    try {
      const threadId =
        conversationId ||
        activeConversationRef.current?.id ||
        (await startConversation(pal, titleFromMessage(question)));
      const userMessage: AssistantMessage = {
        id: crypto.randomUUID(),
        workspace_id: workspace.id,
        conversation_id: threadId,
        user_id: session.user.id,
        role: "user",
        pal,
        body: question,
        metadata: {},
        created_at: new Date().toISOString(),
      };
      optimisticId = userMessage.id;
      const history = [
        ...messagesRef.current.filter((item) => item.conversation_id === threadId),
        userMessage,
      ]
        .slice(-11)
        .map((message) => ({ role: message.role as "user" | "assistant", body: message.body }));
      setAssistantMessages((current) => [...current, userMessage]);
      if (activeConversationRef.current?.id === threadId) {
        setConversationMessages((current) => [...current, userMessage]);
      }
      const generated = await askStudioPal({
        data: {
          workspaceId: workspace.id,
          accessToken: session.access_token,
          question,
          pal,
          recentMessages: history,
        },
      });
      const response: AssistantResponse = generated.response;
      if (sessionUserRef.current !== session.user.id)
        throw new Error("Sign in again to continue this conversation.");
      // One insert saves the exchange atomically. A failed assistant write must
      // never leave a saved user row that gets duplicated when the member retries.
      const saved = await supabase
        .from("assistant_messages")
        .insert([
          userMessage,
          {
            workspace_id: workspace.id,
            conversation_id: threadId,
            role: "assistant",
            pal,
            body: response.reply,
            metadata: response,
            created_at: new Date().toISOString(),
          },
        ])
        .select();
      if (saved.error) throw saved.error;
      const stored = saved.data || [];
      const mergeExchange = (current: AssistantMessage[]) => [
        ...current.filter((item) => item.id !== userMessage.id),
        ...stored.filter(
          (item) =>
            !current.some((existing) => existing.id === item.id && existing.id !== userMessage.id),
        ),
      ];
      if (activeConversationRef.current?.id === threadId) setConversationMessages(mergeExchange);
      setAssistantMessages(mergeExchange);
      optimisticId = null;

      const existing =
        conversations.find((item) => item.id === threadId) ||
        (activeConversationRef.current?.id === threadId ? activeConversationRef.current : null);
      // Message storage succeeded; failure to refresh the title must not invite
      // another send of an already saved exchange.
      try {
        const updated = await supabase
          .from("conversations")
          .update({
            pal,
            last_message_at:
              stored.find((item) => item.role === "assistant")?.created_at ||
              new Date().toISOString(),
            message_count: (existing?.message_count || 0) + 2,
            ...(!existing?.message_count ? { title: titleFromMessage(question) } : {}),
          })
          .eq("id", threadId)
          .select()
          .single();
        if (updated.error) throw updated.error;
        if (updated.data) applyConversation(updated.data);
      } catch {
        toast.info("Your reply was saved. The conversation title will refresh when you reopen it.");
      }
      return response;
    } catch (error) {
      if (optimisticId) {
        setConversationMessages((current) => current.filter((item) => item.id !== optimisticId));
        setAssistantMessages((current) => current.filter((item) => item.id !== optimisticId));
      }
      throw error;
    } finally {
      sending.current = false;
      setBusy(false);
    }
  }
  async function updateVideoProgress(itemKey: string, status: string, campaignId?: string) {
    if (!workspace) throw new Error("Create a workspace first.");
    const next: VideoProgress = {
      workspace_id: workspace.id,
      item_key: itemKey,
      status,
      campaign_id: campaignId || null,
      notes: "",
      updated_at: new Date().toISOString(),
    };
    const result = await supabase.from("workspace_video_items").upsert(next).select().single();
    if (result.error) throw result.error;
    setVideoProgress((current) => [
      result.data,
      ...current.filter((item) => item.item_key !== itemKey),
    ]);
  }
  async function createCampaign(values: {
    title: string;
    goal: string;
    topic: string;
    offer: string;
    audience: string;
    anchorFormat: string;
    depth: "quick" | "strategic" | "deep";
  }) {
    if (!workspace || !brand) throw new Error("Finish your workspace and brand profile first.");
    setBusy(true);
    try {
      if (!session) throw new Error("Sign in first.");
      const inserted = await supabase
        .from("campaigns")
        .insert({
          workspace_id: workspace.id,
          created_by: session.user.id,
          title: values.title,
          goal: values.goal,
          topic: values.topic,
          offer: values.offer,
          audience: values.audience,
          anchor_format: values.anchorFormat,
          depth: values.depth,
          status: "generating",
        })
        .select()
        .single();
      if (inserted.error) throw inserted.error;
      const generated = await generateStudioCampaign({
        data: {
          workspaceId: workspace.id,
          campaignId: inserted.data.id,
          accessToken: session.access_token,
          goal: values.goal,
          topic: values.topic,
          offer: values.offer,
          audience: values.audience,
          anchorFormat: values.anchorFormat,
          depth: values.depth,
          brand: {
            businessName: brand.business_name,
            creatorType: brand.creator_type,
            primaryGoal: brand.primary_goal,
            description: brand.description,
            industry: brand.industry || "",
            primaryAudience: brand.primary_audience || "",
            offers: (Array.isArray(brand.offers) ? brand.offers : []).filter(
              (item): item is string => typeof item === "string",
            ),
            platforms: brand.platforms || [],
            voice: brand.voice_traits,
            proof: brand.proof_points,
            callsToAction: brand.calls_to_action,
            avoidLanguage: brand.avoid_language,
            personalInterests: brand.personal_interests || [],
            personalStory: brand.personal_story || "",
          },
        },
      });
      if (generated.ok)
        setCampaignOutputs((current) => ({ ...current, [inserted.data.id]: generated.output }));
      await refresh();
      return inserted.data.id;
    } finally {
      setBusy(false);
    }
  }
  async function suggestDirections(values: { idea: string; goal: string; audience: string }) {
    if (!workspace || !brand) throw new Error("Finish your workspace and brand profile first.");
    setBusy(true);
    try {
      if (!session) throw new Error("Sign in first.");
      const result = await generateContentDirections({
        data: {
          workspaceId: workspace.id,
          accessToken: session.access_token,
          idea: values.idea,
          goal: values.goal,
          audience: values.audience,
          brand: {
            businessName: brand.business_name,
            creatorType: brand.creator_type,
            primaryGoal: brand.primary_goal,
            description: brand.description,
            industry: brand.industry || "",
            primaryAudience: brand.primary_audience || "",
            offers: (Array.isArray(brand.offers) ? brand.offers : []).filter(
              (item): item is string => typeof item === "string",
            ),
            platforms: brand.platforms || [],
            voice: brand.voice_traits,
            proof: brand.proof_points,
            callsToAction: brand.calls_to_action,
            avoidLanguage: brand.avoid_language,
            personalInterests: brand.personal_interests || [],
            personalStory: brand.personal_story || "",
          },
        },
      });
      return result.directions;
    } finally {
      setBusy(false);
    }
  }
  async function analyzeSource(values: {
    sourceType: "link" | "image";
    sourceUrl?: string;
    sourceDataUrl?: string;
    context: string;
  }) {
    if (!workspace || !brand) throw new Error("Finish your workspace and Brand DNA first.");
    setBusy(true);
    try {
      if (!session) throw new Error("Sign in first.");
      const result = await analyzeStudioContentSource({
        data: {
          workspaceId: workspace.id,
          accessToken: session.access_token,
          sourceType: values.sourceType,
          sourceUrl: values.sourceUrl,
          sourceDataUrl: values.sourceDataUrl,
          context: values.context,
          brand: {
            businessName: brand.business_name,
            description: brand.description,
            audience: brand.primary_audience,
            offers: (Array.isArray(brand.offers) ? brand.offers : []).filter(
              (item): item is string => typeof item === "string",
            ),
            proof: brand.proof_points,
          },
        },
      });
      return result.analysis;
    } finally {
      setBusy(false);
    }
  }
  async function updateAsset(id: string, values: Partial<Asset>) {
    const previous = assets.find((asset) => asset.id === id);
    let patch = values;
    const previousMetadata =
      previous?.metadata &&
      typeof previous.metadata === "object" &&
      !Array.isArray(previous.metadata)
        ? previous.metadata
        : {};
    if (
      previous &&
      previous.kind !== "platform_post" &&
      values.content !== undefined &&
      values.content !== previous.content &&
      values.metadata === undefined
    ) {
      // Plain editing cannot safely reconstruct scenes, slides, or article
      // sections. Retain those structures and mark the saved text as the
      // display authority, including after a fresh workspace load.
      patch = { ...values, metadata: { ...previousMetadata, studioTextOverride: true } };
    } else if (
      values.content !== undefined &&
      values.metadata &&
      typeof values.metadata === "object" &&
      !Array.isArray(values.metadata)
    ) {
      const structured = { ...values.metadata };
      delete structured.studioTextOverride;
      patch = { ...values, metadata: structured };
    }
    if (previous?.kind === "platform_post") {
      const metadata = patch.metadata ?? previous.metadata;
      if (metadata && typeof metadata === "object" && !Array.isArray(metadata)) {
        // The plain-text editor and platform editor share one saved post. Keep
        // their two representations aligned without dropping native features.
        patch = {
          ...patch,
          metadata: {
            ...previousMetadata,
            ...metadata,
            ...(values.content !== undefined ? { body: values.content } : {}),
            ...(values.title !== undefined ? { title: values.title } : {}),
          },
        };
      }
    }
    const result = await supabase
      .from("campaign_assets")
      .update(patch)
      .eq("id", id)
      .select()
      .single();
    if (result.error) throw result.error;
    const saved = result.data;
    setAssets((items) => items.map((item) => (item.id === id ? saved : item)));
    if (saved.kind === "platform_post") {
      const metadata = saved.metadata;
      if (metadata && typeof metadata === "object" && !Array.isArray(metadata)) {
        const parsed = PlatformPostSchema.safeParse({
          ...metadata,
          body: saved.content,
          title: saved.title,
        });
        if (parsed.success) {
          setCampaignOutputs((current) => {
            const output = current[saved.campaign_id];
            if (!output) return current;
            return {
              ...current,
              [saved.campaign_id]: {
                ...output,
                platformPosts: output.platformPosts.map((post) =>
                  post.id === parsed.data.id ? parsed.data : post,
                ),
              },
            };
          });
        }
      }
    }
  }
  async function updateCalendarItem(id: string, values: Partial<CalendarItem>) {
    const result = await supabase
      .from("calendar_items")
      .update(values)
      .eq("id", id)
      .select()
      .single();
    if (result.error) throw result.error;
    setCalendar((items) => items.map((item) => (item.id === id ? result.data : item)));
  }
  async function createCalendarItem(values: {
    campaignId?: string;
    assetId?: string;
    title: string;
    channel: string;
    publishAt: string;
    notes?: string;
  }) {
    if (!workspace) throw new Error("Create a workspace first.");
    const result = await supabase
      .from("calendar_items")
      .insert({
        workspace_id: workspace.id,
        campaign_id: values.campaignId || null,
        asset_id: values.assetId || null,
        title: values.title,
        channel: values.channel,
        publish_at: values.publishAt,
        notes: values.notes || "",
      })
      .select()
      .single();
    if (result.error) throw result.error;
    setCalendar((items) =>
      [...items, result.data].sort((a, b) => a.publish_at.localeCompare(b.publish_at)),
    );
    return result.data.id;
  }
  async function requestService(requestType: string, notes: string, campaignId?: string) {
    if (!session || !workspace) throw new Error("Sign in first.");
    const result = await supabase.from("service_requests").insert({
      workspace_id: workspace.id,
      user_id: session.user.id,
      campaign_id: campaignId || null,
      request_type: requestType,
      notes,
    });
    if (result.error) throw result.error;
    await refresh();
    toast.success("Request sent to Palmer House.");
  }
  async function uploadBrandAsset(file: File, kind = "file") {
    if (!workspace) throw new Error("Create a workspace first.");
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "-");
    const result = await supabase.storage
      .from("brand-assets")
      .upload(`${workspace.id}/${crypto.randomUUID()}-${safeName}`, file, { upsert: false });
    if (result.error) throw result.error;
    const reference = await supabase
      .from("brand_references")
      .insert({
        workspace_id: workspace.id,
        kind,
        label: file.name,
        storage_path: result.data.path,
        metadata: { size: file.size, type: file.type },
      })
      .select()
      .single();
    if (reference.error) throw reference.error;
    setBrandReferences((current) => [reference.data, ...current]);
    toast.success("Brand file uploaded securely.");
  }
  async function addBrandReference(kind: string, label: string, sourceUrl: string) {
    if (!workspace) throw new Error("Create a workspace first.");
    const result = await supabase
      .from("brand_references")
      .insert({ workspace_id: workspace.id, kind, label, source_url: sourceUrl })
      .select()
      .single();
    if (result.error) throw result.error;
    setBrandReferences((current) => [result.data, ...current]);
    toast.success("Reference added to Brand DNA.");
  }
  async function deleteCampaign(id: string) {
    const result = await supabase.from("campaigns").delete().eq("id", id);
    if (result.error) throw result.error;
    setCampaigns((items) => items.filter((item) => item.id !== id));
    setAssets((items) => items.filter((item) => item.campaign_id !== id));
    setCalendar((items) => items.filter((item) => item.campaign_id !== id));
    setCampaignOutputs((current) => {
      const next = { ...current };
      delete next[id];
      return next;
    });
    toast.success("Campaign deleted.");
  }
  async function analyzeWebsite(website: string) {
    if (!workspace) throw new Error("Create a workspace first.");
    if (!session) throw new Error("Sign in first.");
    const result = await analyzeStudioWebsite({
      data: { workspaceId: workspace.id, accessToken: session.access_token, website },
    });
    return result.profile;
  }

  const value: StudioContextValue = {
    loading,
    loadError,
    retryWorkspace,
    busy,
    session,
    user: session?.user || null,
    profile,
    workspace,
    subscription,
    brand,
    brandReferences,
    settings,
    campaigns,
    assets,
    calendar,
    ideas,
    assistantMessages,
    conversations,
    activeConversation,
    conversationMessages,
    conversationDrafts,
    setConversationDrafts,
    conversationLoading,
    hasOlderMessages,
    videoProgress,
    serviceRequests,
    campaignOutputs,
    signIn,
    signUp,
    sendMagicLink,
    resetPassword,
    signOut,
    createWorkspace,
    saveProfile,
    saveBrand,
    saveSettings,
    createIdea,
    updateIdea,
    uploadIdeaSource,
    uploadConversationFile,
    askPal,
    startConversation,
    openConversation,
    clearConversation,
    loadOlderMessages,
    renameConversation,
    archiveConversation,
    setConversationPal,
    updateVideoProgress,
    createCampaign,
    suggestDirections,
    analyzeSource,
    updateAsset,
    updateCalendarItem,
    createCalendarItem,
    requestService,
    uploadBrandAsset,
    addBrandReference,
    deleteCampaign,
    analyzeWebsite,
    refresh,
  };
  return <StudioContext.Provider value={value}>{children}</StudioContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useStudio() {
  const context = useContext(StudioContext);
  if (!context) throw new Error("useStudio must be used inside StudioProvider.");
  return context;
}
