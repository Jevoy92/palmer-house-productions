import { useEffect, useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { MetaTags } from '@/components/seo/MetaTags';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

// Pal definitions and default checklist items
const PALS = ['reel', 'evergreen', 'spotlight', 'system'] as const;
type PalId = typeof PALS[number];

type ChecklistItem = { id: string; title: string; description: string };

const DEFAULT_ITEMS: Record<PalId, ChecklistItem[]> = {
  reel: [
    { id: 'hook', title: 'Craft a 3-sec hook', description: 'Start with pattern interrupt + value promise.' },
    { id: 'promise', title: 'State the payoff', description: 'Make the outcome explicit and desirable.' },
    { id: 'deliver', title: 'Deliver 1-2 insights', description: 'Share concrete steps or examples.' },
    { id: 'cta', title: 'Add a clear CTA', description: 'One action: comment, save, DM, or follow.' },
    { id: 'caption', title: 'Platform-native caption', description: 'Hashtags and formatting optimized per platform.' },
    { id: 'thumb', title: 'High-contrast thumbnail', description: 'Readable text and expressive face when applicable.' },
  ],
  evergreen: [
    { id: 'outline', title: 'Create a value outline', description: 'Intro, 3-5 chapters, summary.' },
    { id: 'evidence', title: 'Add proof', description: 'Stats, case studies, screenshots or demos.' },
    { id: 'search', title: 'SEO-first structure', description: 'Keywords in H1, H2, file names, alt text.' },
    { id: 'broll', title: 'Plan B-roll and visuals', description: 'Support each chapter with relevant visuals.' },
    { id: 'repurpose', title: 'Repurpose plan', description: 'Clips, carousel, newsletter, thread.' },
    { id: 'cta', title: 'Primary CTA', description: 'Lead magnet or product/service next step.' },
  ],
  spotlight: [
    { id: 'script', title: 'Finalize script', description: 'Story beats, transitions, and VO timing.' },
    { id: 'audio', title: 'Audio chain ready', description: 'Mic placement, levels, room treatment.' },
    { id: 'lighting', title: 'Lighting check', description: 'Key-fill-rim balance, color temp, practicals.' },
    { id: 'framing', title: 'Framing & movement', description: 'Rule of thirds, headroom, motivated moves.' },
    { id: 'color', title: 'Color profile + LUT', description: 'Consistent look across angles.' },
    { id: 'export', title: 'Master export settings', description: 'Bitrate, codec, and platform-specific presets.' },
  ],
  system: [
    { id: 'calendar', title: 'Publishing calendar', description: 'Cadence aligned to goals and capacity.' },
    { id: 'templates', title: 'Template library', description: 'Hook bank, scripts, caption starters.' },
    { id: 'workflow', title: 'Workflow checklist', description: 'Shoot → Edit → Review → Publish → Measure.' },
    { id: 'roles', title: 'Roles & ownership', description: 'Clear DRI for each step to avoid stalls.' },
    { id: 'automation', title: 'Automations', description: 'Auto captions, transcodes, posting, backups.' },
    { id: 'metrics', title: 'Metrics dashboard', description: 'Track retention, saves, leads, revenue.' },
  ],
};

export default function PalHub() {
  const navigate = useNavigate();
  const params = useParams();
  const palParam = (params.palId || 'reel').toLowerCase();
  const pal: PalId = (PALS as readonly string[]).includes(palParam) ? (palParam as PalId) : 'reel';

  const [completed, setCompleted] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);

  const items = useMemo(() => DEFAULT_ITEMS[pal], [pal]);
  const progress = useMemo(() => {
    const total = items.length;
    const done = items.filter(i => completed[i.id]).length;
    return Math.round((done / total) * 100);
  }, [items, completed]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;
        const { data, error } = await supabase
          .from('user_video_checklist')
          .select('video_id, completed')
          .eq('pal', pal);
        if (error) throw error;
        if (!mounted) return;
        const map: Record<string, boolean> = {};
        data?.forEach(row => { map[row.video_id as string] = !!row.completed; });
        setCompleted(map);
      } catch (e) {
        console.error(e);
        toast.error('Could not load your checklist');
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [pal]);

  const handleToggle = async (itemId: string) => {
    setCompleted(prev => ({ ...prev, [itemId]: !prev[itemId] }));
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      // Check if row exists
      const { data: existing, error: selErr } = await supabase
        .from('user_video_checklist')
        .select('id, completed')
        .eq('video_id', itemId)
        .eq('pal', pal)
        .limit(1)
        .maybeSingle();
      if (selErr && selErr.code !== 'PGRST116') throw selErr;

      const isCompleted = !completed[itemId];

      if (existing?.id) {
        const { error } = await supabase
          .from('user_video_checklist')
          .update({ completed: isCompleted, completed_at: isCompleted ? new Date().toISOString() : null })
          .eq('id', existing.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('user_video_checklist')
          .insert({ user_id: user.id, pal, video_id: itemId, completed: isCompleted, completed_at: isCompleted ? new Date().toISOString() : null });
        if (error) throw error;
      }
    } catch (e) {
      console.error(e);
      toast.error('Could not update item');
      setCompleted(prev => ({ ...prev, [itemId]: !prev[itemId] }));
    }
  };

  const goToPal = (next: PalId) => navigate(`/dashboard/pals/${next}`);

  return (
    <>
      <MetaTags title={`${pal.charAt(0).toUpperCase() + pal.slice(1)} Pal Hub | Content OS`} description={`Work through your ${pal} checklist and track progress.`} />
      <DashboardLayout>
        <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
          <div className="flex items-center justify-between gap-4">
            <h1 className="text-3xl font-bold">
              {pal.charAt(0).toUpperCase() + pal.slice(1)} Pal
            </h1>
            <div className="flex flex-wrap gap-2">
              {PALS.map(p => (
                <Button key={p} variant={p === pal ? 'default' : 'outline'} onClick={() => goToPal(p)}>
                  {p.charAt(0).toUpperCase() + p.slice(1)}
                </Button>
              ))}
            </div>
          </div>

          <Card>
            <CardHeader className="flex flex-col gap-2">
              <CardTitle>Checklist</CardTitle>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <Progress value={progress} />
                </div>
                <span className="text-sm text-muted-foreground">{progress}% complete</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {items.map((item) => (
                  <label key={item.id} className="flex items-start gap-3 p-3 rounded-lg border border-border hover:bg-muted/50 transition">
                    <Checkbox checked={!!completed[item.id]} onCheckedChange={() => handleToggle(item.id)} />
                    <div>
                      <div className="font-medium">{item.title}</div>
                      <div className="text-sm text-muted-foreground">{item.description}</div>
                    </div>
                  </label>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    </>
  );
}
