import type { Session, User } from "@supabase/supabase-js";
import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { toast } from "sonner";
import {
  analyzeStudioContentSource,
  askStudioPal,
  generateContentDirections,
  generateStudioCampaign,
} from "@/lib/studio-server";
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
type VideoProgress = Tables<"workspace_video_items">;
type ServiceRequest = Tables<"service_requests">;

type StudioContextValue = {
  loading: boolean;
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
  videoProgress: VideoProgress[];
  serviceRequests: ServiceRequest[];
  campaignOutputs: Record<string, CampaignOutput>;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (fullName: string, email: string, password: string) => Promise<string>;
  sendMagicLink: (email: string) => Promise<void>;
  signOut: () => Promise<void>;
  createWorkspace: (
    name: string,
    profile?: { creatorType: string; primaryGoal: string; initialProblem: string },
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
  askPal: (question: string, pal: PalName) => Promise<AssistantResponse>;
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
  refresh: () => Promise<void>;
};

const StudioContext = createContext<StudioContextValue | null>(null);

function slugify(value: string) {
  return `${value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")}-${crypto.randomUUID().slice(0, 6)}`;
}

export function StudioProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);
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
  const [videoProgress, setVideoProgress] = useState<VideoProgress[]>([]);
  const [serviceRequests, setServiceRequests] = useState<ServiceRequest[]>([]);
  const [campaignOutputs, setCampaignOutputs] = useState<Record<string, CampaignOutput>>({});

  const loadWorkspace = useCallback(async (activeSession: Session | null) => {
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
      setVideoProgress([]);
      setServiceRequests([]);
      setLoading(false);
      return;
    }
    setLoading(true);
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
    if (profileResult.data) setProfile(profileResult.data);
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
      videoProgressResult,
      serviceRequestsResult,
    ] = await Promise.all([
      supabase.from("workspaces").select("*").eq("id", workspaceId).single(),
      supabase.from("workspace_subscriptions").select("*").eq("workspace_id", workspaceId).single(),
      supabase.from("brand_profiles").select("*").eq("workspace_id", workspaceId).single(),
      supabase
        .from("brand_references")
        .select("*")
        .eq("workspace_id", workspaceId)
        .order("created_at", { ascending: false }),
      supabase.from("workspace_settings").select("*").eq("workspace_id", workspaceId).single(),
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
      supabase.from("workspace_video_items").select("*").eq("workspace_id", workspaceId),
      supabase
        .from("service_requests")
        .select("*")
        .eq("workspace_id", workspaceId)
        .order("created_at", { ascending: false }),
    ]);
    if (workspaceResult.data) setWorkspace(workspaceResult.data);
    if (subscriptionResult.data) setSubscription(subscriptionResult.data);
    if (brandResult.data) setBrand(brandResult.data);
    setBrandReferences(brandReferencesResult.data || []);
    if (settingsResult.data) setSettings(settingsResult.data);
    setCampaigns(campaignsResult.data || []);
    setAssets(assetsResult.data || []);
    setCalendar(calendarResult.data || []);
    setIdeas(ideasResult.data || []);
    setAssistantMessages(assistantResult.data || []);
    setVideoProgress(videoProgressResult.data || []);
    setServiceRequests(serviceRequestsResult.data || []);
    setLoading(false);
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      void loadWorkspace(data.session);
    });
    const { data } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      void loadWorkspace(nextSession);
    });
    return () => data.subscription.unsubscribe();
  }, [loadWorkspace]);

  const refresh = useCallback(async () => loadWorkspace(session), [loadWorkspace, session]);
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
  async function signOut() {
    await supabase.auth.signOut();
  }
  async function createWorkspace(
    name: string,
    brandProfile?: { creatorType: string; primaryGoal: string; initialProblem: string },
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
      const created = await supabase
        .from("workspaces")
        .select("id")
        .eq("slug", slug)
        .single();
      if (created.error) throw new Error(created.error.message);
      if (brandProfile) {
        const brandUpdate = await supabase
          .from("brand_profiles")
          .update({
            business_name: name,
            creator_type: brandProfile.creatorType,
            primary_goal: brandProfile.primaryGoal,
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
    lane: StudioLane;
    businessProblem: string;
  }) {
    if (!workspace) throw new Error("Create a workspace first.");
    if (!session) throw new Error("Sign in first.");
    const result = await supabase
      .from("content_ideas")
      .insert({
        workspace_id: workspace.id,
        created_by: session.user.id,
        body: values.body,
        source_type: values.sourceType,
        source_url: values.sourceUrl || null,
        source_media_path: values.sourceMediaPath || null,
        primary_lane: values.lane,
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
  async function askPal(question: string, pal: PalName) {
    if (!workspace || !brand) throw new Error("Finish Brand DNA before asking for guidance.");
    const now = new Date().toISOString();
    const userMessage: AssistantMessage = {
      id: crypto.randomUUID(),
      workspace_id: workspace.id,
      user_id: session?.user.id || null,
      role: "user",
      pal,
      body: question,
      metadata: {},
      created_at: now,
    };
    setAssistantMessages((current) => [...current, userMessage]);
    setBusy(true);
    try {
      if (!session) throw new Error("Sign in first.");
      const recentMessages = assistantMessages.slice(-11).map((message) => ({
        role: message.role as "user" | "assistant",
        body: message.body,
      }));
      const generated = await askStudioPal({
        data: {
          workspaceId: workspace.id,
          accessToken: session.access_token,
          question,
          pal,
          recentMessages,
        },
      });
      const response: AssistantResponse = generated.response;
      const savedUser = await supabase.from("assistant_messages").insert({
        workspace_id: workspace.id,
        user_id: session.user.id,
        role: "user",
        pal,
        body: question,
      });
      if (savedUser.error) throw savedUser.error;
      const assistantMessage: AssistantMessage = {
        id: crypto.randomUUID(),
        workspace_id: workspace.id,
        user_id: null,
        role: "assistant",
        pal,
        body: response.reply,
        metadata: response,
        created_at: new Date().toISOString(),
      };
      const saved = await supabase.from("assistant_messages").insert({
        workspace_id: workspace.id,
        role: "assistant",
        pal,
        body: response.reply,
        metadata: response,
      });
      if (saved.error) throw saved.error;
      setAssistantMessages((current) => [...current, assistantMessage]);
      return response;
    } finally {
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
            voice: brand.voice_traits,
            proof: brand.proof_points,
            callsToAction: brand.calls_to_action,
            avoidLanguage: brand.avoid_language,
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
            voice: brand.voice_traits,
            proof: brand.proof_points,
            callsToAction: brand.calls_to_action,
            avoidLanguage: brand.avoid_language,
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
    const result = await supabase
      .from("campaign_assets")
      .update(values)
      .eq("id", id)
      .select()
      .single();
    if (result.error) throw result.error;
    setAssets((items) => items.map((item) => (item.id === id ? result.data : item)));
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

  const value: StudioContextValue = {
    loading,
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
    videoProgress,
    serviceRequests,
    campaignOutputs,
    signIn,
    signUp,
    sendMagicLink,
    signOut,
    createWorkspace,
    saveProfile,
    saveBrand,
    saveSettings,
    createIdea,
    updateIdea,
    uploadIdeaSource,
    askPal,
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
