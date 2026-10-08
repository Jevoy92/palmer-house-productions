import { useCallback, useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { toast } from "sonner";
import type { Tables } from "@/integrations/supabase/types";
import { Button } from "@/components/ui/button";
import { useStudio } from "./StudioProvider";
import {
  cancelStudioSocialPost,
  connectStudioSocial,
  disconnectStudioSocial,
  getStudioSocial,
  publishStudioSocial,
  startSocialAddonCheckout,
} from "@/lib/studio-social-server";

type Social = Awaited<ReturnType<typeof getStudioSocial>>;
type Ready = Extract<Social, { enabled: true }>;
const label: Record<string, string> = { INSTAGRAM: "Instagram", FACEBOOK: "Facebook" };
const statusText: Record<string, string> = {
  reserved: "Sending",
  scheduled: "Scheduled",
  posted: "Posted",
  failed: "Failed",
  canceled: "Cancelled",
};

function useSocial() {
  const { session, workspace } = useStudio();
  const auth = session && workspace ? { accessToken: session.access_token, workspaceId: workspace.id } : null;
  const [state, setState] = useState<Social | null>(null);
  const refresh = useCallback(async () => {
    if (!auth) return;
    try {
      setState(await getStudioSocial({ data: auth }));
    } catch (e) {
      console.error(e);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth?.accessToken, auth?.workspaceId]);
  useEffect(() => {
    void refresh();
  }, [refresh]);
  return { auth, state, refresh };
}

export function StudioSocialSettings() {
  const { auth, state, refresh } = useSocial();
  const [busy, setBusy] = useState(false);
  useEffect(() => {
    const p = new URLSearchParams(window.location.search).get("social");
    if (p === "connected") toast.success("Accounts connected.");
    if (p === "added") toast.success("Social Publishing added. You now have 100 posts a month.");
  }, []);
  if (!auth || !state || !state.enabled) return null;
  const s = state as Ready;
  const run = async (fn: () => Promise<unknown>) => {
    setBusy(true);
    try {
      await fn();
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setBusy(false);
    }
  };
  const pct = Math.min(100, Math.round((s.used / s.allowance) * 100));
  return (
    <section className="studio-card mb-7" aria-label="Connected accounts">
      <p className="studio-eyebrow text-muted-foreground">Connected accounts</p>
      <h3 className="mt-2 text-lg font-bold">Post to Instagram & Facebook</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        {s.addonActive ? "Social Publishing · 100 posts a month." : "20 free posts every month."} One post to one account counts as 1.
      </p>
      <div className="mt-4 h-2 overflow-hidden rounded-sm bg-muted" aria-hidden="true">
        <div className="h-full bg-primary transition-all" style={{ width: `${pct}%` }} />
      </div>
      <p className="mt-2 text-sm">
        {s.used} of {s.allowance} posts used this month
        {pct >= 80 && !s.addonActive ? " · Running low" : ""}
      </p>
      <ul className="mt-4 space-y-2">
        {s.accounts.length === 0 && <li className="text-sm text-muted-foreground">No accounts connected yet.</li>}
        {s.accounts.map((a) => (
          <li key={a.type} className="flex items-center justify-between gap-3 text-sm">
            <span>
              <strong>{label[a.type]}</strong> · {a.name}
            </span>
            <Button
              size="sm"
              variant="outline"
              disabled={busy}
              onClick={() => run(async () => { await disconnectStudioSocial({ data: { ...auth, type: a.type } }); await refresh(); })}
            >
              Disconnect
            </Button>
          </li>
        ))}
      </ul>
      <div className="mt-5 flex flex-wrap gap-3">
        <Button
          variant="spotlight"
          disabled={busy}
          onClick={() => run(async () => { const r = await connectStudioSocial({ data: auth }); window.location.href = r.url; })}
        >
          {s.accounts.length ? "Connect another account" : "Connect Instagram & Facebook"}
        </Button>
        {!s.addonActive && s.canManageBilling && (
          <Button
            variant="outline"
            disabled={busy}
            onClick={() => run(async () => { const r = await startSocialAddonCheckout({ data: auth }); window.location.href = r.url; })}
          >
            Get 100 posts · $19/mo
          </Button>
        )}
      </div>
      {s.posts.length > 0 && (
        <div className="mt-6">
          <p className="studio-eyebrow text-muted-foreground">Recent posts</p>
          <ul className="mt-2 divide-y divide-border">
            {s.posts.slice(0, 8).map((p) => (
              <li key={p.id} className="flex items-start justify-between gap-3 py-2 text-sm">
                <span className="min-w-0">
                  <span className="block truncate">{p.caption}</span>
                  <span className="text-xs text-muted-foreground">
                    {p.platforms.map((x) => label[x]).join(" + ")} · {statusText[p.status] ?? p.status} ·{" "}
                    {new Date(p.scheduledAt).toLocaleString()}
                    {p.error ? ` · ${p.error}` : ""}
                  </span>
                </span>
                {p.status === "scheduled" && new Date(p.scheduledAt) > new Date() && (
                  <Button
                    size="sm"
                    variant="outline"
                    disabled={busy}
                    onClick={() => run(async () => { await cancelStudioSocialPost({ data: { ...auth, postId: p.id } }); await refresh(); })}
                  >
                    Cancel
                  </Button>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}

export function StudioPostButton({ asset }: { asset: Tables<"campaign_assets"> }) {
  const { getAssetImageUrl } = useStudio();
  const { auth, state, refresh } = useSocial();
  const [open, setOpen] = useState(false);
  const [caption, setCaption] = useState(asset.content.slice(0, 2200));
  const [picked, setPicked] = useState<string[]>([]);
  const [when, setWhen] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const meta = (asset.metadata || {}) as Record<string, unknown>;
  const mediaId = asset.kind === "image" ? asset.id : typeof meta.mediaAssetId === "string" ? meta.mediaAssetId : null;
  useEffect(() => {
    if (open && mediaId && !image) getAssetImageUrl(mediaId).then(setImage).catch(() => setImage(null));
  }, [open, mediaId, image, getAssetImageUrl]);
  if (!auth || !state || !state.enabled) return null;
  const s = state as Ready;
  const accounts = s.accounts.map((a) => a.type);
  const left = s.allowance - s.used;
  async function send() {
    if (!auth) return;
    setBusy(true);
    try {
      const r = await publishStudioSocial({
        data: {
          ...auth,
          platforms: picked as ("INSTAGRAM" | "FACEBOOK")[],
          caption,
          imageUrl: image ?? undefined,
          assetId: asset.id,
          scheduledAt: when ? new Date(when).toISOString() : undefined,
        },
      });
      if (!r.ok) toast.error(`That needs ${picked.length} posts and you have ${r.allowance - r.used} left this month.`);
      else {
        toast.success(when ? "Post scheduled." : "Post sent.");
        setOpen(false);
      }
      await refresh();
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <Dialog.Root open={open} onOpenChange={(v) => { setOpen(v); if (v) setPicked(accounts); }}>
      <Dialog.Trigger asChild>
        <Button size="sm" variant="outline">Post</Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-foreground/40" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[min(92vw,520px)] -translate-x-1/2 -translate-y-1/2 rounded-xl bg-background p-6 shadow-xl">
          <Dialog.Title className="text-xl font-bold">Post this piece</Dialog.Title>
          {accounts.length === 0 ? (
            <p className="mt-3 text-sm text-muted-foreground">
              Connect Instagram or Facebook in Settings → Account first.
            </p>
          ) : (
            <>
              {image && <img src={image} alt="" className="mt-4 max-h-56 w-full rounded-lg object-cover" />}
              <textarea
                className="mt-4 h-32 w-full rounded-lg border border-input bg-background p-3 text-sm"
                value={caption}
                maxLength={2200}
                onChange={(e) => setCaption(e.target.value)}
                aria-label="Caption"
              />
              <div className="mt-3 flex gap-4 text-sm">
                {accounts.map((a) => (
                  <label key={a} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={picked.includes(a)}
                      onChange={(e) => setPicked(e.target.checked ? [...picked, a] : picked.filter((x) => x !== a))}
                    />
                    {label[a]}
                  </label>
                ))}
              </div>
              <label className="mt-3 block text-sm">
                Schedule for later (optional)
                <input
                  type="datetime-local"
                  className="mt-1 block w-full rounded-lg border border-input bg-background p-2"
                  value={when}
                  onChange={(e) => setWhen(e.target.value)}
                />
              </label>
              <p className="mt-3 text-sm text-muted-foreground">
                Uses {picked.length} of your {left} remaining posts this month.
                {picked.includes("INSTAGRAM") && !image ? " Instagram needs a photo." : ""}
              </p>
              <div className="mt-5 flex justify-end gap-3">
                <Dialog.Close asChild>
                  <Button variant="outline">Cancel</Button>
                </Dialog.Close>
                <Button
                  variant="spotlight"
                  disabled={busy || picked.length === 0 || !caption.trim() || (picked.includes("INSTAGRAM") && !image)}
                  onClick={send}
                >
                  {busy ? "Sending…" : when ? "Schedule" : "Post now"}
                </Button>
              </div>
            </>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
