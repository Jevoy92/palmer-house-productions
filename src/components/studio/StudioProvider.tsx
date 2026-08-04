import type { Session, User } from "@supabase/supabase-js";
import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { toast } from "sonner";
import { buildDemoCampaign } from "@/lib/studio-demo";
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

const demoWorkspace: Workspace = {
  id: "00000000-0000-4000-8000-000000000001",
  name: "Palmer House Productions",
  slug: "palmer-house-owner-preview",
  created_by: "owner-preview",
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};
const demoBrand: Brand = {
  id: "00000000-0000-4000-8000-000000000002",
  workspace_id: demoWorkspace.id,
  business_name: "Palmer House Productions",
  website: "https://www.palmerhouseproductions.com",
  industry: "Strategic video production",
  creator_type: "Business",
  primary_goal: "Sell services",
  description:
    "A video strategy and production company that turns invisible expertise, repeated explanations, and scattered ideas into clear business systems.",
  primary_audience:
    "Business owners and teams who need video to create clarity, proof, reach, or repeatability.",
  offers: ["Strategy call", "Campaign production", "Content systems"],
  voice_traits: ["Direct", "Warm", "Specific"],
  preferred_language: "Use plain language and concrete examples.",
  avoid_language: ["game-changing", "revolutionary"],
  locations: ["Pacific Northwest"],
  platforms: ["LinkedIn", "Instagram", "YouTube", "Email"],
  calls_to_action: ["Book a conversation", "See how the system works"],
  proof_points: ["One production day can create weeks of connected content"],
  content_examples: [],
  colors: { spotlight: "#3D1A66", reel: "#E8720C", evergreen: "#5B8A2D", system: "#0A9B8F" },
  fonts: { primary: "Satoshi", detail: "Satoshi Mono" },
  social_links: [
    { label: "Instagram", url: "https://instagram.com/palmerhouseproductions" },
    { label: "YouTube", url: "https://youtube.com/@palmerhouseproductions" },
  ],
  brand_details: {
    mission: "Make useful video feel clear, connected, and possible.",
    values: "Clarity, usefulness, humanity, and repeatability.",
    taglines: "Build your video library, one shoot at a time.",
    photography: "Warm real environments, capable people, and visible production craft.",
    imageStyle: "Paper-white dimensional scenes using one Palmer House lane per asset.",
    competitors: "Traditional production companies and generic AI content tools.",
    customers: "People and teams who use video as leverage.",
    videoExamples: "Brand films, proof stories, explainers, short-form series, and training.",
  },
  visual_style: "Palmer Clay 3D",
  completion: 86,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};
const demoSubscription: Subscription = {
  workspace_id: demoWorkspace.id,
  plan: "partner",
  billing_interval: "month",
  status: "active",
  campaign_allowance: 12,
  trial_ends_at: new Date(Date.now() + 6 * 86_400_000).toISOString(),
  current_period_start: new Date().toISOString(),
  current_period_end: new Date(Date.now() + 30 * 86_400_000).toISOString(),
  stripe_customer_id: null,
  stripe_subscription_id: null,
  cancel_at_period_end: false,
  updated_at: new Date().toISOString(),
};

const demoBrandReferences: BrandReference[] = [
  {
    id: "demo-brand-reference-1",
    workspace_id: demoWorkspace.id,
    kind: "website",
    label: "Palmer House website",
    source_url: demoBrand.website,
    storage_path: null,
    metadata: { status: "analyzed" },
    created_at: new Date().toISOString(),
  },
  {
    id: "demo-brand-reference-2",
    workspace_id: demoWorkspace.id,
    kind: "guide",
    label: "Palmer House Brand Guide v2",
    source_url: null,
    storage_path: "owner-preview/palmer-house-brand-guide-v2.pdf",
    metadata: { status: "ready" },
    created_at: new Date().toISOString(),
  },
];

const demoSettings: Settings = {
  workspace_id: demoWorkspace.id,
  default_depth: "strategic",
  email_campaign_ready: true,
  email_usage_alerts: true,
  email_palmer_support: true,
  week_starts_on: 1,
  preferred_pal: "kiana",
  ai_memory: {},
  last_briefing_at: null,
  updated_at: new Date().toISOString(),
};

const previewProfile: Profile = {
  id: "owner-preview",
  avatar_url: null,
  full_name: "Jevoy Palmer",
  job_title: "Founder & Creative Director",
  onboarding_completed: true,
  phone: "",
  timezone: "America/Los_Angeles",
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

type StudioContextValue = {
  loading: boolean;
  busy: boolean;
  demo: boolean;
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
  enterDemo: () => void;
  leaveDemo: () => void;
  createWorkspace: (
    name: string,
    profile?: { creatorType: string; primaryGoal: string },
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

function outputToDemoAssets(output: CampaignOutput, campaignId: string): Asset[] {
  const now = new Date().toISOString();
  const base = (kind: string, title: string, content: string, index: number): Asset => ({
    id: `${campaignId}-${index}`,
    campaign_id: campaignId,
    workspace_id: demoWorkspace.id,
    kind,
    title,
    content,
    metadata: {},
    sort_order: index,
    status: "draft",
    created_at: now,
    updated_at: now,
  });
  return [
    base(
      "anchor_script",
      output.anchor.title,
      `${output.anchor.hook}\n\n${output.anchor.script}\n\nCTA: ${output.anchor.callToAction}`,
      0,
    ),
    ...output.shorts.map((item, index) =>
      base(
        "short_script",
        item.title,
        `${item.hook}\n\n${item.script}\n\nCTA: ${item.callToAction}`,
        index + 1,
      ),
    ),
    ...output.captions.map((item, index) =>
      base("caption", `${item.platform} caption`, item.copy, index + 10),
    ),
    base("newsletter", output.newsletter.subject, output.newsletter.body, 20),
    base("carousel", output.carousel.title, output.carousel.slides.join("\n\n"), 21),
    ...output.platformPosts.map((item, index) => ({
      ...base("platform_post", item.title, item.body, index + 40),
      metadata: item,
    })),
    ...output.faq.map((item, index) => base("faq", item.question, item.answer, index + 30)),
  ];
}

function buildDemoWorkspaceSeed() {
  const now = new Date();
  const definitions = [
    {
      id: "demo-campaign-proof",
      topic:
        "Customers understand our service after the call, but the website does not make the difference visible.",
      goal: "Promote an offer",
      lane: "spotlight",
      daysAgo: 2,
    },
    {
      id: "demo-campaign-faq",
      topic:
        "Turn the five questions every new client asks into an evergreen video and social series.",
      goal: "Document FAQs",
      lane: "evergreen",
      daysAgo: 8,
    },
  ];
  const outputs: Record<string, CampaignOutput> = {};
  const campaigns: Campaign[] = [];
  const assets: Asset[] = [];
  const calendar: CalendarItem[] = [];
  definitions.forEach((definition, campaignIndex) => {
    const output = buildDemoCampaign(definition.topic, demoBrand.business_name || "Your business");
    output.primaryLane = definition.lane as CampaignOutput["primaryLane"];
    outputs[definition.id] = output;
    const created = new Date(now.getTime() - definition.daysAgo * 86_400_000).toISOString();
    campaigns.push({
      id: definition.id,
      workspace_id: demoWorkspace.id,
      created_by: "demo",
      title: output.title,
      status: campaignIndex === 0 ? "ready" : "review",
      goal: definition.goal,
      topic: definition.topic,
      offer: "Book a strategy call",
      audience: demoBrand.primary_audience,
      anchor_format: "authority_video",
      depth: "strategic",
      primary_lane: output.primaryLane,
      strategy: output.strategy,
      production_plan: output.productionPlan,
      scheduled_at: null,
      created_at: created,
      updated_at: created,
    });
    assets.push(
      ...outputToDemoAssets(output, definition.id).map((asset, index) => ({
        ...asset,
        status: index < 3 ? "approved" : index < 7 ? "review" : "draft",
      })),
    );
    calendar.push(
      ...output.schedule.slice(0, 4).map((item, index) => ({
        id: `${definition.id}-seed-calendar-${index}`,
        workspace_id: demoWorkspace.id,
        campaign_id: definition.id,
        asset_id: null,
        title: item.title,
        channel: item.channel,
        publish_at: new Date(
          now.getTime() + (index + campaignIndex * 2 + 1) * 86_400_000,
        ).toISOString(),
        assignee_id: null,
        status: index === 0 ? "scripted" : "planned",
        notes: "Publishing draft for the owner preview workspace.",
        created_at: created,
        updated_at: created,
      })),
    );
  });
  return { campaigns, assets, calendar, outputs };
}

function buildDemoDirections(idea: string): ContentDirection[] {
  const firstLine = idea.trim().split("\n")[0] || "the idea";
  const subject = firstLine.length > 180 ? `${firstLine.slice(0, 177).trim()}…` : firstLine;
  return [
    {
      id: "proof",
      title: "Make the value visible",
      angle: `Anchor this direction in the before-and-after decision your customer is trying to make: ${subject}.`,
      whyItWorks: "Specific proof reduces uncertainty and gives the campaign a trustworthy spine.",
      lane: "spotlight",
    },
    {
      id: "teach",
      title: "Teach the decision once",
      angle: `Turn the idea into a clear explanation your audience can save, share, and return to: ${subject}.`,
      whyItWorks:
        "A durable answer becomes the anchor for video, search, social, and sales follow-up.",
      lane: "evergreen",
    },
    {
      id: "momentum",
      title: "Invite the audience in",
      angle: `Use the idea as a platform-native question, poll, and short-form conversation: ${subject}.`,
      whyItWorks:
        "Participation reveals what people need next while giving the current idea more reach.",
      lane: "reel",
    },
  ];
}

function demoQuestionToCampaignSubject(question: string, businessName: string) {
  const normalized = question.trim().toLowerCase();
  if (normalized.includes("what video") && normalized.includes("next")) {
    return `Show how one ${businessName} shoot turns a repeated customer question into a month of clear, reusable content`;
  }
  if (normalized.includes("customer question") && normalized.includes("campaign")) {
    return "Turn the five questions customers ask before booking into one anchor video and five short answers";
  }
  if (normalized.includes("gap") && normalized.includes("sales")) {
    return "Explain the difference between buying one finished video and building a connected video content system";
  }
  if (normalized.includes("realistic content rhythm") || normalized.includes("this month")) {
    return "Build a four-week rhythm around one anchor explanation, two proof moments, and weekly short-form questions";
  }
  return question;
}

export function StudioProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [demo, setDemo] = useState(false);
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
      const previewActive =
        window.sessionStorage.getItem("ph.studio.preview") === "active" ||
        window.sessionStorage.getItem("ph.studio.demo") === "active";
      if (!data.session && previewActive) {
        const seed = buildDemoWorkspaceSeed();
        setDemo(true);
        setWorkspace(demoWorkspace);
        setBrand(demoBrand);
        setBrandReferences(demoBrandReferences);
        setSubscription(demoSubscription);
        setSettings(demoSettings);
        setCampaigns(seed.campaigns);
        setAssets(seed.assets);
        setCalendar(seed.calendar);
        setCampaignOutputs(seed.outputs);
        window.sessionStorage.setItem("ph.studio.preview", "active");
        window.sessionStorage.removeItem("ph.studio.demo");
        setProfile(previewProfile);
        setLoading(false);
      } else {
        void loadWorkspace(data.session);
      }
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
    window.sessionStorage.removeItem("ph.studio.demo");
    window.sessionStorage.removeItem("ph.studio.preview");
    setDemo(false);
    await supabase.auth.signOut();
  }
  function enterDemo() {
    const seed = buildDemoWorkspaceSeed();
    window.sessionStorage.setItem("ph.studio.preview", "active");
    setDemo(true);
    setWorkspace(demoWorkspace);
    setBrand(demoBrand);
    setBrandReferences(demoBrandReferences);
    setSubscription(demoSubscription);
    setSettings(demoSettings);
    setCampaigns(seed.campaigns);
    setAssets(seed.assets);
    setCalendar(seed.calendar);
    setCampaignOutputs(seed.outputs);
    setProfile(previewProfile);
  }
  function leaveDemo() {
    window.sessionStorage.removeItem("ph.studio.demo");
    window.sessionStorage.removeItem("ph.studio.preview");
    setDemo(false);
    void loadWorkspace(session);
  }
  async function createWorkspace(
    name: string,
    brandProfile?: { creatorType: string; primaryGoal: string },
  ) {
    if (!session) throw new Error("Sign in first.");
    setBusy(true);
    const result = await supabase
      .from("workspaces")
      .insert({ name, slug: slugify(name), created_by: session.user.id })
      .select()
      .single();
    setBusy(false);
    if (result.error) throw result.error;
    if (brandProfile) {
      const brandUpdate = await supabase
        .from("brand_profiles")
        .update({
          business_name: name,
          creator_type: brandProfile.creatorType,
          primary_goal: brandProfile.primaryGoal,
        })
        .eq("workspace_id", result.data.id);
      if (brandUpdate.error) throw brandUpdate.error;
    }
    await supabase
      .from("profiles")
      .update({ onboarding_completed: true })
      .eq("id", session.user.id);
    await refresh();
  }
  async function saveProfile(values: Partial<Profile>) {
    if (demo) {
      setProfile((current) => ({ ...(current || ({ id: "demo" } as Profile)), ...values }));
      toast.success("Profile updated in the owner preview.");
      return;
    }
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
    if (demo) {
      setBrand((current) => (current ? { ...current, ...values } : current));
      toast.success("Brand memory updated in the owner preview.");
      return;
    }
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
    if (demo) {
      setSettings((current) => ({ ...(current || demoSettings), ...values }));
      return;
    }
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
    if (demo) {
      const id = crypto.randomUUID();
      const now = new Date().toISOString();
      const idea: Idea = {
        id,
        workspace_id: workspace.id,
        created_by: "owner-preview",
        body: values.body,
        source_type: values.sourceType,
        source_url: values.sourceUrl || null,
        source_media_path: values.sourceMediaPath || null,
        source_metadata: {},
        primary_lane: values.lane,
        business_problem: values.businessProblem,
        status: "saved",
        created_at: now,
        updated_at: now,
      };
      setIdeas((current) => [idea, ...current]);
      return id;
    }
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
    if (demo) {
      setIdeas((current) =>
        current.map((item) => (item.id === id ? { ...item, ...values } : item)),
      );
      return;
    }
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
    if (demo) return `owner-preview/${crypto.randomUUID()}-${file.name}`;
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
      let response: AssistantResponse;
      if (demo) {
        await new Promise((resolve) => window.setTimeout(resolve, 550));
        const directions = buildDemoDirections(
          demoQuestionToCampaignSubject(question, brand.business_name),
        );
        const best = directions[0];
        response = {
          reply: best
            ? `${best.title}. ${best.angle}`
            : "Name the exact decision you need the audience to make. That gives the content a real job.",
          lane: (best?.lane || "evergreen") as StudioLane,
          problem:
            "The useful business idea is present, but it has not been turned into a repeatable asset yet.",
          recommendations: directions.slice(0, 2).map((direction) => ({
            title: direction.title,
            reason: direction.whyItWorks,
            nextStep: direction.angle,
          })),
          memorySuggestions: [],
        };
      } else {
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
        response = generated.response;
        const savedUser = await supabase.from("assistant_messages").insert({
          workspace_id: workspace.id,
          user_id: session.user.id,
          role: "user",
          pal,
          body: question,
        });
        if (savedUser.error) throw savedUser.error;
      }
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
      if (!demo) {
        const saved = await supabase.from("assistant_messages").insert({
          workspace_id: workspace.id,
          role: "assistant",
          pal,
          body: response.reply,
          metadata: response,
        });
        if (saved.error) throw saved.error;
      }
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
    if (demo) {
      setVideoProgress((current) => [next, ...current.filter((item) => item.item_key !== itemKey)]);
      return;
    }
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
      if (demo) {
        await new Promise((resolve) => window.setTimeout(resolve, 900));
        const id = crypto.randomUUID();
        const output = buildDemoCampaign(values.topic, brand.business_name || "Your business");
        const campaign: Campaign = {
          id,
          workspace_id: workspace.id,
          created_by: "demo",
          title: output.title,
          status: "ready",
          goal: values.goal,
          topic: values.topic,
          offer: values.offer,
          audience: values.audience,
          anchor_format: values.anchorFormat,
          depth: values.depth,
          primary_lane: output.primaryLane,
          strategy: output.strategy,
          production_plan: output.productionPlan,
          scheduled_at: null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
        setCampaigns((current) => [campaign, ...current]);
        setAssets((current) => [...outputToDemoAssets(output, id), ...current]);
        setCampaignOutputs((current) => ({ ...current, [id]: output }));
        setCalendar((current) => [
          ...current,
          ...output.schedule.map((item, index) => ({
            id: `${id}-calendar-${index}`,
            workspace_id: workspace.id,
            campaign_id: id,
            asset_id: null,
            title: item.title,
            channel: item.channel,
            publish_at: new Date(Date.now() + item.dayOffset * 86_400_000).toISOString(),
            assignee_id: null,
            status: "planned",
            notes: "",
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          })),
        ]);
        return id;
      }
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
      if (demo) {
        await new Promise((resolve) => window.setTimeout(resolve, 550));
        return buildDemoDirections(values.idea);
      }
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
      if (demo) {
        await new Promise((resolve) => window.setTimeout(resolve, 650));
        const context = values.context.trim();
        const sourceLabel =
          values.sourceType === "link"
            ? `the useful idea behind ${new URL(values.sourceUrl || "https://example.com").hostname}`
            : "the visible moment in this image";
        const normalizedContext = context
          ? `${context.slice(0, 1).toLowerCase()}${context.slice(1).replace(/[.]$/, "")}`
          : "";
        return {
          suggestedIdea: normalizedContext
            ? `Use this source to show how ${normalizedContext}.`
            : `Use ${sourceLabel} to explain what changed and why it matters.`,
          businessProblem:
            "The source has useful evidence, but the customer still needs help understanding the decision it supports.",
          audienceDecision:
            "Help the audience see whether this approach fits the problem they are trying to solve.",
          observedEvidence: [
            values.sourceType === "link"
              ? "A specific source is available to turn into an owned explanation."
              : "A real visual moment is available to anchor the story.",
            context || "Add one sentence of context before making a result claim.",
          ],
          lane: "spotlight",
        } satisfies ContentSourceAnalysis;
      }
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
            offers: brand.offers.filter((item): item is string => typeof item === "string"),
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
    if (demo) {
      setAssets((items) => items.map((item) => (item.id === id ? { ...item, ...values } : item)));
      return;
    }
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
    if (demo) {
      setCalendar((items) => items.map((item) => (item.id === id ? { ...item, ...values } : item)));
      return;
    }
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
    if (demo) {
      const id = crypto.randomUUID();
      const item: CalendarItem = {
        id,
        workspace_id: workspace.id,
        campaign_id: values.campaignId || null,
        asset_id: values.assetId || null,
        title: values.title,
        channel: values.channel,
        publish_at: values.publishAt,
        assignee_id: null,
        status: "planned",
        notes: values.notes || "",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      setCalendar((items) =>
        [...items, item].sort((a, b) => a.publish_at.localeCompare(b.publish_at)),
      );
      return id;
    }
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
    if (demo) {
      const now = new Date().toISOString();
      setServiceRequests((current) => [
        {
          id: crypto.randomUUID(),
          workspace_id: workspace?.id || demoWorkspace.id,
          user_id: "owner-preview",
          campaign_id: campaignId || null,
          request_type: requestType,
          status: "requested",
          notes,
          created_at: now,
          updated_at: now,
        },
        ...current,
      ]);
      toast.success("Preview request captured. Customer workspaces send this to Palmer House.");
      return;
    }
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
    if (demo) {
      setBrandReferences((current) => [
        {
          id: crypto.randomUUID(),
          workspace_id: workspace.id,
          kind,
          label: file.name,
          source_url: null,
          storage_path: `owner-preview/${file.name}`,
          metadata: { size: file.size, type: file.type },
          created_at: new Date().toISOString(),
        },
        ...current,
      ]);
      toast.success(`${file.name} added to the owner preview brand kit.`);
      return;
    }
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
    const next: BrandReference = {
      id: crypto.randomUUID(),
      workspace_id: workspace.id,
      kind,
      label,
      source_url: sourceUrl,
      storage_path: null,
      metadata: { status: "ready" },
      created_at: new Date().toISOString(),
    };
    if (demo) {
      setBrandReferences((current) => [next, ...current]);
      toast.success("Reference added to the owner preview.");
      return;
    }
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
    demo,
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
    enterDemo,
    leaveDemo,
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
