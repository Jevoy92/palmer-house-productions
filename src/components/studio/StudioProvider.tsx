import type { Session, User } from "@supabase/supabase-js";
import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { toast } from "sonner";
import { buildDemoCampaign } from "@/lib/studio-demo";
import { generateContentDirections, generateStudioCampaign } from "@/lib/studio-server";
import type { CampaignOutput, ContentDirection } from "@/lib/studio-model";
import { supabase } from "@/lib/supabase/client";
import type { Tables } from "@/lib/supabase/database.types";

type Profile = Tables<"profiles">;
type Workspace = Tables<"workspaces">;
type Subscription = Tables<"workspace_subscriptions">;
type Brand = Tables<"brand_profiles">;
type Campaign = Tables<"campaigns">;
type Asset = Tables<"campaign_assets">;
type CalendarItem = Tables<"calendar_items">;
type Settings = Tables<"workspace_settings">;

const demoWorkspace: Workspace = {
  id: "00000000-0000-4000-8000-000000000001",
  name: "Palmer House Demo",
  slug: "palmer-house-demo",
  created_by: "demo",
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};
const demoBrand: Brand = {
  id: "00000000-0000-4000-8000-000000000002",
  workspace_id: demoWorkspace.id,
  business_name: "Palmer House Demo",
  website: "",
  industry: "Professional services",
  description:
    "A growing business that wants one clear content system instead of a weekly scramble.",
  primary_audience: "Busy business owners who value expertise but need the message organized.",
  offers: ["Core service", "Strategy session"],
  voice_traits: ["Direct", "Warm", "Specific"],
  preferred_language: "Use plain language and concrete examples.",
  avoid_language: ["game-changing", "revolutionary"],
  locations: ["Pacific Northwest"],
  platforms: ["LinkedIn", "Instagram", "YouTube", "Email"],
  calls_to_action: ["Book a conversation", "See how the system works"],
  proof_points: ["Add verified customer outcomes here"],
  content_examples: [],
  colors: { spotlight: "#3D1A66", reel: "#E8720C", evergreen: "#5B8A2D", system: "#0A9B8F" },
  fonts: { primary: "Inter", detail: "JetBrains Mono" },
  completion: 78,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};
const demoSubscription: Subscription = {
  workspace_id: demoWorkspace.id,
  plan: "business",
  status: "trialing",
  campaign_allowance: 5,
  trial_ends_at: new Date(Date.now() + 6 * 86_400_000).toISOString(),
  current_period_start: new Date().toISOString(),
  current_period_end: new Date(Date.now() + 30 * 86_400_000).toISOString(),
  stripe_customer_id: null,
  stripe_subscription_id: null,
  cancel_at_period_end: false,
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
  settings: Settings | null;
  campaigns: Campaign[];
  assets: Asset[];
  calendar: CalendarItem[];
  campaignOutputs: Record<string, CampaignOutput>;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (fullName: string, email: string, password: string) => Promise<string>;
  sendMagicLink: (email: string) => Promise<void>;
  signOut: () => Promise<void>;
  enterDemo: () => void;
  leaveDemo: () => void;
  createWorkspace: (name: string) => Promise<void>;
  saveProfile: (values: Partial<Profile>) => Promise<void>;
  saveBrand: (values: Partial<Brand>) => Promise<void>;
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
  uploadBrandAsset: (file: File) => Promise<void>;
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
        notes: "Demo schedule item",
        created_at: created,
        updated_at: created,
      })),
    );
  });
  return { campaigns, assets, calendar, outputs };
}

function buildDemoDirections(idea: string): ContentDirection[] {
  const subject = idea.trim() || "the idea";
  return [
    {
      id: "proof",
      title: "Make the value visible",
      angle: `Make “${subject}” visible through the before-and-after decision your customer is trying to make.`,
      whyItWorks: "Specific proof reduces uncertainty and gives the campaign a trustworthy spine.",
      lane: "spotlight",
    },
    {
      id: "teach",
      title: "Teach the decision once",
      angle: `Build “${subject}” into a clear explanation your audience can save, share, and return to.`,
      whyItWorks:
        "A durable answer becomes the anchor for video, search, social, and sales follow-up.",
      lane: "evergreen",
    },
    {
      id: "momentum",
      title: "Invite the audience in",
      angle: `Frame “${subject}” as a platform-native question, poll, and short-form conversation.`,
      whyItWorks:
        "Participation reveals what people need next while giving the current idea more reach.",
      lane: "reel",
    },
  ];
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
  const [settings, setSettings] = useState<Settings | null>(null);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [assets, setAssets] = useState<Asset[]>([]);
  const [calendar, setCalendar] = useState<CalendarItem[]>([]);
  const [campaignOutputs, setCampaignOutputs] = useState<Record<string, CampaignOutput>>({});

  const loadWorkspace = useCallback(async (activeSession: Session | null) => {
    if (!activeSession) {
      setProfile(null);
      setWorkspace(null);
      setSubscription(null);
      setBrand(null);
      setSettings(null);
      setCampaigns([]);
      setAssets([]);
      setCalendar([]);
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
      settingsResult,
      campaignsResult,
      assetsResult,
      calendarResult,
    ] = await Promise.all([
      supabase.from("workspaces").select("*").eq("id", workspaceId).single(),
      supabase.from("workspace_subscriptions").select("*").eq("workspace_id", workspaceId).single(),
      supabase.from("brand_profiles").select("*").eq("workspace_id", workspaceId).single(),
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
    ]);
    if (workspaceResult.data) setWorkspace(workspaceResult.data);
    if (subscriptionResult.data) setSubscription(subscriptionResult.data);
    if (brandResult.data) setBrand(brandResult.data);
    if (settingsResult.data) setSettings(settingsResult.data);
    setCampaigns(campaignsResult.data || []);
    setAssets(assetsResult.data || []);
    setCalendar(calendarResult.data || []);
    setLoading(false);
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      if (!data.session && window.sessionStorage.getItem("ph.studio.demo") === "active") {
        const seed = buildDemoWorkspaceSeed();
        setDemo(true);
        setWorkspace(demoWorkspace);
        setBrand(demoBrand);
        setSubscription(demoSubscription);
        setSettings(null);
        setCampaigns(seed.campaigns);
        setAssets(seed.assets);
        setCalendar(seed.calendar);
        setCampaignOutputs(seed.outputs);
        setProfile(null);
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
    setDemo(false);
    await supabase.auth.signOut();
  }
  function enterDemo() {
    const seed = buildDemoWorkspaceSeed();
    window.sessionStorage.setItem("ph.studio.demo", "active");
    setDemo(true);
    setWorkspace(demoWorkspace);
    setBrand(demoBrand);
    setSubscription(demoSubscription);
    setSettings(null);
    setCampaigns(seed.campaigns);
    setAssets(seed.assets);
    setCalendar(seed.calendar);
    setCampaignOutputs(seed.outputs);
    setProfile(null);
  }
  function leaveDemo() {
    window.sessionStorage.removeItem("ph.studio.demo");
    setDemo(false);
    void loadWorkspace(session);
  }
  async function createWorkspace(name: string) {
    if (!session) throw new Error("Sign in first.");
    setBusy(true);
    const result = await supabase
      .from("workspaces")
      .insert({ name, slug: slugify(name), created_by: session.user.id })
      .select()
      .single();
    setBusy(false);
    if (result.error) throw result.error;
    await supabase
      .from("profiles")
      .update({ onboarding_completed: true })
      .eq("id", session.user.id);
    await refresh();
  }
  async function saveProfile(values: Partial<Profile>) {
    if (demo) {
      setProfile((current) => ({ ...(current || ({ id: "demo" } as Profile)), ...values }));
      toast.success("Profile saved in this demo session.");
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
      toast.success("Brand memory saved in this demo session.");
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
      toast.success("Demo request received. Live accounts send this to the Palmer House team.");
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
    toast.success("Request sent to Palmer House.");
  }
  async function uploadBrandAsset(file: File) {
    if (!workspace) throw new Error("Create a workspace first.");
    if (demo) {
      toast.success(`${file.name} added to the demo brand kit.`);
      return;
    }
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "-");
    const result = await supabase.storage
      .from("brand-assets")
      .upload(`${workspace.id}/${crypto.randomUUID()}-${safeName}`, file, { upsert: false });
    if (result.error) throw result.error;
    toast.success("Brand file uploaded securely.");
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
    settings,
    campaigns,
    assets,
    calendar,
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
    createCampaign,
    suggestDirections,
    updateAsset,
    updateCalendarItem,
    createCalendarItem,
    requestService,
    uploadBrandAsset,
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
