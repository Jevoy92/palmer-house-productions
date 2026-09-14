import assert from "node:assert/strict";
import { after, before, test } from "node:test";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { createServer } from "vite";
import react from "@vitejs/plugin-react";

// Uses real React and the production components, with a separate Vite entry and
// local-only service stubs. No app auth, Supabase instance, or AI endpoint loads.
const require = createRequire(import.meta.url);
const { chromium } = require("playwright");
const root = fileURLToPath(new URL("../", import.meta.url));
let server;
let browser;
let origin;
let cacheDir;

const fixture = `
export const fixture = window.studioFixture = {
  membershipError: false, insertError: false, responseError: false, responseDelay: 0,
  ideas: [], uploads: [], directionError: false, assets: [], campaigns: [], assetUpdateError: false, campaignOutput: null,
  delays: {}, inserts: [], recentMessages: [], microphoneCancels: 0, permissionDelay: 0,
  messages: [], conversations: [
    {id:'a', workspace_id:'workspace', title:'Thread A', pal:'Raquel', archived:false, message_count:0},
    {id:'b', workspace_id:'workspace', title:'Thread B', pal:'Kiana', archived:false, message_count:0},
  ],
};
const session = {access_token:'fixture-only', user:{id:'member'}};
class Query {
  constructor(table) {this.table=table;this.filters={};this.operation='read';}
  select(){return this;} eq(key,value){this.filters[key]=value;return this;}
  order(){return this;} limit(){return this;} lt(){return this;}
  maybeSingle(){return this;} single(){return this;}
  insert(value){this.operation='insert';this.value=value;return this;}
  update(value){this.operation='update';this.value=value;return this;}
  async result(){
    const id=this.filters.id;
    if(fixture.delays[id]) await new Promise(resolve=>setTimeout(resolve,fixture.delays[id]));
    if(this.table==='workspace_members') return fixture.membershipError ? {data:null,error:new Error('Membership unavailable')} : {data:{workspace_id:'workspace'},error:null};
    if(this.table==='profiles') return {data:{id:'member',full_name:'Test member'},error:null};
    if(this.table==='workspaces') return {data:{id:'workspace',name:'Isolated fixture'},error:null};
    if(this.table==='brand_profiles') return {data:{workspace_id:'workspace',brand_name:'Fixture'},error:null};
    if(this.table==='workspace_settings') return {data:{workspace_id:'workspace',preferred_pal:'Raquel'},error:null};
    if(this.table==='workspace_subscriptions') return {data:null,error:null};
    if(this.table==='campaigns') {
      if(this.operation==='insert') {const row={id:'campaign-test',...this.value};fixture.campaigns.push(row);return {data:row,error:null};}
      return {data:[...fixture.campaigns],error:null};
    }
    if(this.table==='campaign_assets') {
      if(this.operation==='update') {if(fixture.assetUpdateError)return {data:null,error:new Error('Asset update failed')};const row=fixture.assets.find(row=>row.id===id);Object.assign(row,this.value);return {data:{...row},error:null};}
      return {data:fixture.assets.map(row=>({...row})),error:null};
    }
    if(this.table==='content_ideas') {
      if(this.operation==='insert') {const row={id:crypto.randomUUID(),status:'saved',...this.value};fixture.ideas.push(row);return {data:row,error:null};}
      if(this.operation==='update') {const row=fixture.ideas.find(row=>row.id===id);Object.assign(row,this.value);return {data:{...row},error:null};}
      return {data:[...fixture.ideas],error:null};
    }
    if(this.table==='conversations') {
      if(this.operation==='insert') {const row={id:crypto.randomUUID(),archived:false,message_count:0,...this.value};fixture.conversations.push(row);return {data:row,error:null};}
      if(this.operation==='update') {const row=fixture.conversations.find(row=>row.id===id);Object.assign(row,this.value);return {data:{...row},error:null};}
      return {data:id ? {...fixture.conversations.find(row=>row.id===id)} : [...fixture.conversations],error:null};
    }
    if(this.table==='assistant_messages') {
      if(this.operation==='insert') {
        fixture.inserts.push(this.value);
        if(fixture.insertError) return {data:null,error:new Error('Storage unavailable')};
        const rows=this.value.map(row=>({id:crypto.randomUUID(),user_id:null,...row}));
        fixture.messages.push(...rows);return {data:rows,error:null};
      }
      const rows=fixture.messages.filter(row=>!this.filters.conversation_id || row.conversation_id===this.filters.conversation_id);
      return {data:[...rows].reverse(),error:null};
    }
    return {data:[],error:null};
  }
  then(resolve,reject){return this.result().then(resolve,reject);}
}
export const supabase={from:table=>new Query(table),storage:{from:()=>({upload:async(path,file)=>{fixture.uploads.push({path,name:file.name});return {data:{path},error:null};}})}, auth:{
  getSession:async()=>({data:{session},error:null}),
  onAuthStateChange:()=>({data:{subscription:{unsubscribe(){}}}}),
}};
export const response={reply:'A saved response.',headline:'One useful direction',recommendations:[],memorySuggestions:[],keyPoints:[],followUps:[]};
export async function askStudioPal({data}){
  fixture.recentMessages=data.recentMessages;
  if(fixture.responseDelay) await new Promise(resolve=>setTimeout(resolve,fixture.responseDelay));
  if(fixture.responseError) throw new Error('Response unavailable');
  return {response};
}
export const analyzeStudioContentSource=()=>{}, analyzeStudioWebsite=()=>{};
export async function generateStudioCampaign(){return {ok:true,output:fixture.campaignOutput};}
export async function generateContentDirections(){if(fixture.directionError)throw new Error("Directions unavailable");return {directions:[1,2,3].map(id=>({id:String(id),title:"Direction "+id,angle:"A useful angle",whyItWorks:"The audience needs an answer",lane:"evergreen",flavor:"business"}))};}
export async function startRecording(){
  if(fixture.permissionDelay) await new Promise(resolve=>setTimeout(resolve,fixture.permissionDelay));
  return {cancel(){fixture.microphoneCancels++},level:()=>0,stop:async()=>new Blob(['fixture'])};
}
`;

const entry = `
import React, {useState} from 'react';
import {createRoot} from 'react-dom/client';
import {StudioProvider,useStudio} from '@/components/studio/StudioProvider';
import {ComposerIntake} from '@/components/studio/ComposerIntake';
import {StudioAssistant} from '@/components/studio/StudioAssistant';
import {StudioIdeasBoard} from '@/components/studio/StudioIdeasBoard';
import {createRootRoute,createRoute,createRouter,createMemoryHistory,RouterProvider,Outlet} from '@tanstack/react-router';
const rootRoute=createRootRoute({component:Outlet});
const indexRoute=createRoute({getParentRoute:()=>rootRoute,path:'/studio/conversations',validateSearch:search=>({prompt:search.prompt}),component:()=> <StudioAssistant/>});
const conversationRoute=createRoute({getParentRoute:()=>rootRoute,path:'/studio/conversations/$conversationId',component:()=> <StudioAssistant conversationId={conversationRoute.useParams().conversationId}/>});
const ideasRoute=createRoute({getParentRoute:()=>rootRoute,path:'/studio/ideas',component:StudioIdeasBoard});
const createRouteFixture=createRoute({getParentRoute:()=>rootRoute,path:'/studio/create',validateSearch:search=>({idea:search.idea}),component:()=> <p>Creation workflow</p>});
const router=window.studioRouter=createRouter({routeTree:rootRoute.addChildren([indexRoute,conversationRoute,ideasRoute,createRouteFixture]),history:createMemoryHistory({initialEntries:['/studio/conversations']})});
import {fixture} from 'virtual:fixture';
function Capture(){
  const value=useStudio();
  const [recorderVisible,setRecorderVisible]=useState(false);
  const [assistantVisible,setAssistantVisible]=useState(false);
  const [files,setFiles]=useState([]);
  window.studioApi=value;
  window.showRecorder=setRecorderVisible;
  window.showAssistant=setAssistantVisible;
  return <>{assistantVisible && <RouterProvider router={router}/>}<output>{value.loading ? 'loading' : value.loadError ? 'error' : 'ready'}</output>
    {recorderVisible && <ComposerIntake color='#3d1a66' conversationId={value.activeConversation?.id} attachments={files} onAttachmentsChange={setFiles} onTranscript={()=>{}}/>}
  </>;
}
createRoot(document.getElementById('root')).render(<StudioProvider><Capture/></StudioProvider>);
`;

before(async () => {
  cacheDir = await mkdtemp(join(tmpdir(), "studio-lifecycle-"));
  server = await createServer({
    root,
    configFile: false,
    cacheDir,
    appType: "custom",
    plugins: [
      react(),
      {
        name: "studio-lifecycle-fixture",
        resolveId(id) {
          if (["virtual:fixture", "virtual:lifecycle-entry"].includes(id)) return `\0${id}`;
          if (["@/lib/studio-server", "@/lib/supabase/client", "@/lib/audio-wav"].includes(id))
            return "\0virtual:fixture";
          if (id.startsWith("@/")) {
            const extension = /\.[a-z]+$/i.test(id)
              ? ""
              : id.includes("/components/")
                ? ".tsx"
                : ".ts";
            return `${root}src/${id.slice(2)}${extension}`;
          }
        },
        load(id) {
          if (id === "\0virtual:fixture") return fixture;
          if (id === "\0virtual:lifecycle-entry") return { code: entry, map: null };
        },
        transform(code, id) {
          if (id === "\0virtual:lifecycle-entry")
            return {
              code: require("typescript").transpileModule(code, {
                compilerOptions: { jsx: 4, module: 99, target: 99 },
              }).outputText,
              map: null,
            };
        },
        configureServer(vite) {
          vite.middlewares.use((request, response, next) => {
            if (request.url !== "/") return next();
            response.setHeader("Content-Type", "text/html");
            void vite
              .transformIndexHtml(
                "/",
                '<!doctype html><div id="root"></div><script type="module" src="/@id/__x00__virtual:lifecycle-entry"></script>',
              )
              .then((html) => response.end(html));
          });
        },
      },
    ],
    server: { host: "127.0.0.1", port: 0, watch: null },
    optimizeDeps: {
      include: [
        "react",
        "react-dom/client",
        "sonner",
        "lucide-react",
        "@tanstack/react-router",
        "motion/react",
        "react-markdown",
        "remark-gfm",
        "@radix-ui/react-dialog",
        "clsx",
        "tailwind-merge",
        "zod",
      ],
    },
  });
  await server.listen();
  origin = `http://127.0.0.1:${server.httpServer.address().port}`;
  browser = await chromium.launch({
    headless: true,
    ...(process.env.STUDIO_TEST_BROWSER ? { executablePath: process.env.STUDIO_TEST_BROWSER } : {}),
  });
});
after(async () => {
  await browser?.close();
  await server?.close();
  if (cacheDir) await rm(cacheDir, { recursive: true, force: true });
});

async function pageForTest() {
  const page = await browser.newPage();
  page.setDefaultTimeout(10000);
  page.on("pageerror", (error) => console.error(error.message));
  await page.route("**/*", (route) =>
    new URL(route.request().url()).origin === origin ? route.continue() : route.abort(),
  );
  await page.goto(origin);
  await page.waitForFunction(() => window.studioApi && !window.studioApi.loading);
  return page;
}

test("a membership failure is recoverable and is never mistaken for new-workspace onboarding", async () => {
  const page = await pageForTest();
  await page.evaluate(async () => {
    window.studioFixture.membershipError = true;
    await window.studioApi.retryWorkspace();
  });
  assert.equal(await page.evaluate(() => Boolean(window.studioApi.loadError)), true);
  assert.equal(await page.evaluate(() => window.studioApi.loading), false);
  await page.evaluate(async () => {
    window.studioFixture.membershipError = false;
    await window.studioApi.retryWorkspace();
  });
  await page.waitForFunction(
    () => window.studioApi.loadError === null && window.studioApi.workspace?.id === "workspace",
  );
  await page.close();
});

test("model and storage failures roll back the optimistic row; retry stores one atomic exchange", async () => {
  const page = await pageForTest();
  await page.evaluate(() => window.studioApi.openConversation("a"));
  for (const failure of ["responseError", "insertError"]) {
    await page.evaluate(async (failure) => {
      window.studioFixture[failure] = true;
      try {
        await window.studioApi.askPal("A question for this thread", "Raquel", "a");
      } catch {}
      window.studioFixture[failure] = false;
    }, failure);
    await page.waitForFunction(() => !window.studioApi.busy);
    assert.equal(await page.evaluate(() => window.studioApi.conversationMessages.length), 0);
    assert.equal(await page.evaluate(() => window.studioApi.assistantMessages.length), 0);
    assert.equal(await page.evaluate(() => window.studioFixture.messages.length), 0);
  }
  await page.evaluate(() => window.studioApi.askPal("A question for this thread", "Raquel", "a"));
  await page.waitForFunction(() => window.studioApi.conversationMessages.length === 2);
  assert.deepEqual(
    await page.evaluate(() => window.studioFixture.messages.map((row) => row.role)),
    ["user", "assistant"],
  );
  assert.equal(await page.evaluate(() => window.studioFixture.inserts.at(-1).length), 2);
  await page.close();
});

test("late thread reads cannot replace a newer selection; archiving cannot reopen a thread", async () => {
  const page = await pageForTest();
  await page.evaluate(async () => {
    window.studioFixture.delays.a = 80;
    await Promise.all([
      window.studioApi.openConversation("a"),
      window.studioApi.openConversation("b"),
    ]);
  });
  assert.equal(await page.evaluate(() => window.studioApi.activeConversation.id), "b");
  await page.evaluate(() => window.studioApi.archiveConversation("b"));
  await page.waitForFunction(() => window.studioApi.activeConversation === null);
  assert.equal(await page.evaluate(() => window.studioApi.conversationMessages.length), 0);
  const error = await page.evaluate(async () => {
    try {
      await window.studioApi.openConversation("b");
      return "";
    } catch (error) {
      return error.message;
    }
  });
  assert.match(error, /archived/);
  await page.close();
});

test("a response finishing in another thread never inserts its messages into the visible thread", async () => {
  const page = await pageForTest();
  await page.evaluate(() => window.studioApi.openConversation("a"));
  await page.evaluate(async () => {
    window.studioFixture.responseDelay = 80;
    const reply = window.studioApi.askPal("Keep this in A", "Raquel", "a");
    await window.studioApi.openConversation("b");
    await reply;
  });
  assert.equal(await page.evaluate(() => window.studioApi.activeConversation.id), "b");
  assert.equal(await page.evaluate(() => window.studioApi.conversationMessages.length), 0);
  assert.deepEqual(
    await page.evaluate(() => window.studioFixture.messages.map((row) => row.conversation_id)),
    ["a", "a"],
  );
  await page.close();
});

test("microphone capture is canceled both on leaving and after a late permission result", async () => {
  const page = await pageForTest();
  await page.evaluate(() => window.showRecorder(true));
  await page.getByRole("button", { name: "Record a voice note" }).click();
  await page.getByRole("button", { name: "Stop recording" }).waitFor();
  await page.evaluate(() => window.showRecorder(false));
  await page.waitForFunction(() => window.studioFixture.microphoneCancels === 1);
  await page.evaluate(() => {
    window.studioFixture.permissionDelay = 100;
    window.showRecorder(true);
  });
  await page.getByRole("button", { name: "Record a voice note" }).click();
  await page.evaluate(() => window.showRecorder(false));
  await page.waitForFunction(() => window.studioFixture.microphoneCancels === 2);
  await page.close();
});

test("first send gets a resumable URL and a failed send preserves its draft and attachments across route remount", async () => {
  const page = await pageForTest();
  await page.evaluate(() => {
    window.studioFixture.responseError = true;
    window.showAssistant(true);
  });
  const composer = page.getByRole("textbox");
  await composer.fill("Keep my question ready to retry");
  await page.evaluate(() =>
    window.studioApi.setConversationDrafts((current) => ({
      ...current,
      new: {
        text: "Keep my question ready to retry",
        files: [
          {
            attachment: {
              id: "file-a",
              label: "notes.pdf",
              kind: "document",
              byte_size: 120,
              summary: "Notes",
            },
            text: "My supporting notes.",
          },
        ],
      },
    })),
  );
  await page.getByRole("button", { name: "Send message", exact: true }).click();
  await page.waitForFunction(
    () =>
      window.studioRouter.state.location.pathname !== "/studio/conversations" &&
      !window.studioApi.busy,
  );
  await page.waitForFunction(
    () => document.querySelector("textarea")?.value === "Keep my question ready to retry",
  );
  assert.equal(await page.getByText("notes.pdf", { exact: true }).count(), 1);
  assert.equal(await page.evaluate(() => window.studioApi.conversationMessages.length), 0);
  assert.match(
    await page.evaluate(() => window.studioRouter.state.location.pathname),
    /^\/studio\/conversations\/[a-z0-9-]+$/,
  );
  await page.close();
});

test("new prompts reset conversation identity; archive moves the URL away from the archived thread", async () => {
  const page = await pageForTest();
  await page.evaluate(() => window.showAssistant(true));
  await page.getByRole("textbox").waitFor();
  await page.evaluate(() =>
    window.studioRouter.navigate({
      to: "/studio/conversations/$conversationId",
      params: { conversationId: "a" },
    }),
  );
  await page.waitForFunction(() => window.studioApi.activeConversation?.id === "a");
  await page.getByRole("button", { name: "Archive", exact: true }).click();
  await page.waitForFunction(
    () =>
      window.studioApi.activeConversation === null &&
      window.studioRouter.state.location.pathname === "/studio/conversations",
  );
  assert.equal(
    await page.evaluate(
      () => window.studioFixture.conversations.find((row) => row.id === "a").archived,
    ),
    true,
  );
  await page.evaluate(() =>
    window.studioRouter.navigate({
      to: "/studio/conversations",
      search: { prompt: "Use the new starting prompt" },
    }),
  );
  await page.waitForFunction(
    () => document.querySelector("textarea")?.value === "Use the new starting prompt",
  );
  assert.equal(await page.evaluate(() => window.studioApi.activeConversation), null);
  await page.close();
});

test("standalone idea capture survives direction failure and retries without creating duplicate ideas", async () => {
  const page = await pageForTest();
  await page.evaluate(async () => {
    window.studioFixture.directionError = true;
    window.showAssistant(true);
    await window.studioRouter.navigate({ to: "/studio/ideas" });
  });
  await page
    .getByLabel("Your idea", { exact: true })
    .fill("Answer the questions customers ask before buying.");
  await page.getByRole("button", { name: "Find directions", exact: true }).click();
  await page.getByText("Your idea is saved. Directions aren’t ready yet.").waitFor();
  assert.equal(await page.evaluate(() => window.studioFixture.ideas.length), 1);
  assert.equal(await page.getByLabel("Your idea", { exact: true }).inputValue(), "");
  await page.evaluate(() => (window.studioFixture.directionError = false));
  await page.getByRole("button", { name: "Try directions again" }).click();
  await page.getByRole("link", { name: "Use this direction" }).first().waitFor();
  assert.equal(await page.evaluate(() => window.studioFixture.ideas.length), 1);
  await page.getByRole("link", { name: "Use this direction" }).first().click();
  await page.waitForFunction(
    () => window.studioRouter.state.location.pathname === "/studio/create",
  );
  assert.match(
    await page.evaluate(() => window.studioRouter.state.location.search.idea),
    /Direction 1[\s\S]*customers ask/,
  );
  await page.close();
});

test("standalone link and image capture retain their source metadata and support category changes", async () => {
  const page = await pageForTest();
  await page.evaluate(async () => {
    window.showAssistant(true);
    await window.studioRouter.navigate({ to: "/studio/ideas" });
  });
  await page.getByRole("button", { name: "link", exact: true }).click();
  await page.getByLabel("Source link", { exact: true }).fill("https://example.com/source");
  await page.getByLabel("Your idea", { exact: true }).fill("A source worth saving for later.");
  await page.getByRole("button", { name: "Save source", exact: true }).click();
  await page.waitForFunction(() => window.studioFixture.ideas.length === 1);
  assert.equal(
    await page.evaluate(() => window.studioFixture.ideas[0].source_url),
    "https://example.com/source",
  );
  await page.getByRole("button", { name: "image", exact: true }).click();
  await page.getByLabel("Source image", { exact: true }).setInputFiles({
    name: "reference.png",
    mimeType: "image/png",
    buffer: Buffer.from("fixture image"),
  });
  await page
    .getByLabel("Your idea", { exact: true })
    .fill("Use this reference to explain our process.");
  await page.getByRole("button", { name: "Save source", exact: true }).click();
  await page.waitForFunction(() => window.studioFixture.ideas.length === 2);
  const image = await page.evaluate(() =>
    window.studioFixture.ideas.find((idea) => idea.source_type === "image"),
  );
  assert.match(image.source_media_path, /workspace\/idea-sources\/.*reference.png/);
  await page.getByRole("combobox").first().selectOption("reel");
  await page.waitForFunction(() => window.studioApi.ideas[0].primary_lane === "reel");
  await page.getByRole("button", { name: "reel", exact: true }).click();
  assert.equal(
    await page
      .getByRole("heading", { name: "Use this reference to explain our process.", exact: true })
      .count(),
    1,
  );
  await page.close();
});

test("asset edits keep the persisted platform post and cached campaign synchronized only after success", async () => {
  const page = await pageForTest();
  await page.evaluate(async () => {
    const post = {
      id: "native-post",
      platform: "linkedin",
      format: "document",
      title: "Original title",
      hook: "Keep the hook",
      body: "Original body",
      callToAction: "Keep the CTA",
      hashtags: ["context"],
      nativeFeature: "A useful question",
      publishNotes: "Keep the notes",
      slides: [],
      poll: null,
      quiz: null,
    };
    window.studioFixture.assets = [
      {
        id: "asset-test",
        campaign_id: "campaign-test",
        workspace_id: "workspace",
        kind: "platform_post",
        title: post.title,
        content: post.body,
        metadata: { ...post },
        status: "draft",
        sort_order: 70,
      },
    ];
    window.studioFixture.campaignOutput = {
      platformPosts: [{ ...post }],
      anchor: { script: "Unrelated anchor content" },
    };
    await window.studioApi.createCampaign({
      title: "Test campaign",
      goal: "Test",
      topic: "Test",
      offer: "",
      audience: "",
      anchorFormat: "authority_video",
      depth: "strategic",
    });
  });
  await page.waitForFunction(
    () => window.studioApi.assets.length === 1 && window.studioApi.campaignOutputs["campaign-test"],
  );
  await page.evaluate(async () => {
    window.studioFixture.assetUpdateError = true;
    try {
      await window.studioApi.updateAsset("asset-test", { content: "Failed body" });
    } catch {}
  });
  assert.equal(await page.evaluate(() => window.studioApi.assets[0].content), "Original body");
  assert.equal(
    await page.evaluate(
      () => window.studioApi.campaignOutputs["campaign-test"].platformPosts[0].body,
    ),
    "Original body",
  );
  await page.evaluate(async () => {
    window.studioFixture.assetUpdateError = false;
    await window.studioApi.updateAsset("asset-test", {
      content: "Edited in the library",
      title: "Updated title",
    });
  });
  await page.waitForFunction(
    () =>
      window.studioApi.campaignOutputs["campaign-test"].platformPosts[0].body ===
      "Edited in the library",
  );
  const result = await page.evaluate(() => ({
    saved: window.studioFixture.assets[0],
    cached: window.studioApi.campaignOutputs["campaign-test"],
  }));
  assert.equal(result.saved.content, result.saved.metadata.body);
  assert.equal(result.saved.title, result.saved.metadata.title);
  assert.equal(result.saved.metadata.hook, "Keep the hook");
  assert.equal(result.cached.platformPosts[0].callToAction, "Keep the CTA");
  assert.deepEqual(result.cached.platformPosts[0].hashtags, ["context"]);
  assert.equal(result.cached.anchor.script, "Unrelated anchor content");
  await page.close();
});

test("plain script edits persist an override while retaining structured metadata; rich edits clear the override", async () => {
  const page = await pageForTest();
  await page.evaluate(async () => {
    window.studioFixture.assets = [
      {
        id: "anchor-test",
        campaign_id: "campaign-test",
        workspace_id: "workspace",
        kind: "anchor_script",
        title: "Original anchor",
        content: "Original script",
        metadata: { hook: "Original hook", scenes: [{ beat: "Open", spoken: "Original scene" }] },
        status: "draft",
        sort_order: 0,
      },
    ];
    await window.studioApi.refresh();
  });
  await page.waitForFunction(() => window.studioApi.assets.length === 1);
  await page.evaluate(() =>
    window.studioApi.updateAsset("anchor-test", { content: "The complete edited script." }),
  );
  const saved = await page.evaluate(() => window.studioFixture.assets[0]);
  assert.equal(saved.content, "The complete edited script.");
  assert.equal(saved.metadata.studioTextOverride, true);
  assert.equal(saved.metadata.scenes[0].spoken, "Original scene");
  await page.evaluate(() => window.studioApi.refresh());
  await page.waitForFunction(() => !window.studioApi.loading);
  assert.equal(
    await page.evaluate(() => window.studioApi.assets[0].metadata.studioTextOverride),
    true,
  );
  await page.evaluate(() =>
    window.studioApi.updateAsset("anchor-test", {
      content: "A deliberate rich edit",
      metadata: { hook: "New hook", scenes: [{ beat: "Open", spoken: "New scene" }] },
    }),
  );
  assert.equal(
    await page.evaluate(() => window.studioFixture.assets[0].metadata.studioTextOverride),
    undefined,
  );
  assert.equal(
    await page.evaluate(() => window.studioFixture.assets[0].metadata.scenes[0].spoken),
    "New scene",
  );
  await page.close();
});
