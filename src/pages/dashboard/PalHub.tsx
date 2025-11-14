import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { MetaTags } from '@/components/seo/MetaTags';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Upload, Play, Trash2, Award, Sparkles, ArrowRight, Trophy } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const PAL_CONFIG = {
  reel: {
    name: 'Reel Pal',
    description: 'Master short-form content and social media',
    color: 'from-pink-500 to-purple-500',
    actions: [
      { label: 'Write 5 Hooks', icon: Sparkles },
      { label: 'Plan 10 Shorts', icon: Play },
      { label: 'Engagement Starters', icon: ArrowRight }
    ],
    tips: [
      'Hook viewers in the first 3 seconds',
      'Use trending audio to boost visibility',
      'Post consistently at peak times',
      'Engage with comments within 30 minutes'
    ]
  },
  evergreen: {
    name: 'Evergreen Pal',
    description: 'Create lasting, SEO-optimized content',
    color: 'from-green-500 to-teal-500',
    actions: [
      { label: 'Evergreen Outline', icon: Sparkles },
      { label: 'YouTube Script', icon: Play },
      { label: 'SEO Title & Description', icon: ArrowRight }
    ],
    tips: [
      'Focus on timeless topics that won\'t age',
      'Optimize for search intent and keywords',
      'Create comprehensive pillar content',
      'Update older content to keep it relevant'
    ]
  },
  spotlight: {
    name: 'Spotlight Pal',
    description: 'Professional production quality',
    color: 'from-yellow-500 to-orange-500',
    actions: [
      { label: 'Interview Questions', icon: Sparkles },
      { label: 'Lighting Checklist', icon: Play },
      { label: 'Audio Setup Guide', icon: ArrowRight }
    ],
    tips: [
      'Three-point lighting creates depth',
      'Test audio levels before recording',
      'Frame subjects using rule of thirds',
      'Always have backup equipment ready'
    ]
  },
  system: {
    name: 'System Pal',
    description: 'Automate and scale operations',
    color: 'from-blue-500 to-cyan-500',
    actions: [
      { label: 'Training Outline', icon: Sparkles },
      { label: 'Process Steps', icon: Play },
      { label: 'Knowledge Article', icon: ArrowRight }
    ],
    tips: [
      'Document processes as you create them',
      'Build reusable templates and workflows',
      'Automate repetitive tasks first',
      'Create a centralized knowledge base'
    ]
  }
};

export default function PalHub() {
  const { palId } = useParams<{ palId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [videos, setVideos] = useState<any[]>([]);
  const [achievements, setAchievements] = useState<any[]>([]);
  const [userAchievements, setUserAchievements] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [currentTip, setCurrentTip] = useState(0);

  const pal = palId && PAL_CONFIG[palId as keyof typeof PAL_CONFIG];

  useEffect(() => {
    if (!pal) {
      navigate('/dashboard');
      return;
    }
    fetchVideos();
    fetchAchievements();
    
    // Rotate tips every 5 seconds
    const interval = setInterval(() => {
      setCurrentTip(prev => (prev + 1) % pal.tips.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [palId, pal, navigate]);

  const fetchVideos = async () => {
    if (!user || !palId) return;
    
    const { data, error } = await supabase
      .from('user_videos' as any)
      .select('*')
      .eq('user_id', user.id)
      .eq('pal', palId)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching videos:', error);
    } else {
      setVideos(data || []);
    }
  };

  const fetchAchievements = async () => {
    if (!user || !palId) return;
    
    const { data: allAchievements } = await supabase
      .from('achievements' as any)
      .select('*')
      .eq('pal', palId)
      .order('points', { ascending: true });
    
    const { data: earned } = await supabase
      .from('user_achievements' as any)
      .select('achievement_code')
      .eq('user_id', user.id);
    
    setAchievements(allAchievements || []);
    setUserAchievements(earned?.map((e: any) => e.achievement_code) || []);
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || !event.target.files[0] || !user || !palId) return;
    
    const file = event.target.files[0];
    setUploading(true);
    
    try {
      const fileName = `${user.id}/${palId}/${Date.now()}_${file.name}`;
      
      const { error: uploadError } = await supabase.storage
        .from('videos')
        .upload(fileName, file);
      
      if (uploadError) throw uploadError;
      
      const { error: dbError } = await supabase
        .from('user_videos' as any)
        .insert({
          user_id: user.id,
          pal: palId,
          title: file.name,
          file_path: fileName,
          status: 'uploaded'
        });
      
      if (dbError) throw dbError;
      
      // Check for first upload achievement
      if (videos.length === 0) {
        await supabase
          .from('user_achievements' as any)
          .insert({
            user_id: user.id,
            achievement_code: `${palId}_first_upload`
          });
        toast.success('🎉 Achievement Unlocked: First Upload!');
      }
      
      toast.success('Video uploaded successfully!');
      fetchVideos();
      fetchAchievements();
    } catch (error: any) {
      console.error('Upload error:', error);
      toast.error('Failed to upload video');
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteVideo = async (videoId: string) => {
    if (!user) return;
    
    try {
      const { error } = await supabase
        .from('user_videos' as any)
        .delete()
        .eq('id', videoId)
        .eq('user_id', user.id);
      
      if (error) throw error;
      
      toast.success('Video deleted');
      fetchVideos();
    } catch (error) {
      console.error('Delete error:', error);
      toast.error('Failed to delete video');
    }
  };

  if (!pal) return null;

  const totalPoints = userAchievements.reduce((sum, code) => {
    const achievement = achievements.find((a: any) => a.code === code);
    return sum + (achievement?.points || 0);
  }, 0);

  return (
    <>
      <MetaTags
        title={`${pal.name} Hub | Palmer House Productions`}
        description={pal.description}
        canonicalUrl={`https://www.palmerhouseproductions.com/dashboard/pals/${palId}`}
      />
      
      <DashboardLayout>
        <div className="max-w-7xl mx-auto p-3 md:p-4 space-y-4">
          {/* Header */}
          <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${pal.color} p-6 text-white`}>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">{pal.name}</h1>
            <p className="text-white/90 mb-4">{pal.description}</p>
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="bg-white/20 text-white border-0">
                <Trophy className="w-3 h-3 mr-1" />
                {totalPoints} Points
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-0">
                {videos.length} Videos
              </Badge>
            </div>
          </div>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
              <CardDescription>Start creating with {pal.name}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {pal.actions.map((action, idx) => (
                  <Button
                    key={idx}
                    variant="outline"
                    className="h-auto py-4 justify-start"
                    onClick={() => toast.info('Coming soon!')}
                  >
                    <action.icon className="w-4 h-4 mr-2" />
                    {action.label}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Tip of the Moment */}
          <Card className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20 border-purple-200 dark:border-purple-800">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Pro Tip
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{pal.tips[currentTip]}</p>
            </CardContent>
          </Card>

          {/* My Library */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">My Library</CardTitle>
                  <CardDescription>{videos.length} videos uploaded</CardDescription>
                </div>
                <div>
                  <Input
                    type="file"
                    accept="video/*"
                    onChange={handleFileUpload}
                    disabled={uploading}
                    className="hidden"
                    id="video-upload"
                  />
                  <Button
                    onClick={() => document.getElementById('video-upload')?.click()}
                    disabled={uploading}
                    size="sm"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    {uploading ? 'Uploading...' : 'Upload Video'}
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {videos.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Upload className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>No videos yet. Upload your first video to get started!</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {videos.map((video) => (
                    <Card key={video.id} className="overflow-hidden">
                      <CardContent className="p-4">
                        <div className="aspect-video bg-muted rounded-lg mb-3 flex items-center justify-center">
                          <Play className="w-8 h-8 text-muted-foreground" />
                        </div>
                        <p className="font-medium text-sm mb-2 truncate">{video.title}</p>
                        <div className="flex items-center justify-between">
                          <Badge variant="secondary" className="text-xs">{video.status}</Badge>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteVideo(video.id)}
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Award className="w-5 h-5" />
                Achievements
              </CardTitle>
              <CardDescription>Unlock badges as you create more content</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {achievements.map((achievement: any) => {
                  const isEarned = userAchievements.includes(achievement.code);
                  return (
                    <div
                      key={achievement.code}
                      className={`flex items-center gap-4 p-3 rounded-lg border ${
                        isEarned ? 'bg-primary/5 border-primary/20' : 'bg-muted/30'
                      }`}
                    >
                      <div className="text-2xl">{achievement.icon}</div>
                      <div className="flex-1">
                        <div className="font-medium text-sm">{achievement.name}</div>
                        <div className="text-xs text-muted-foreground">{achievement.description}</div>
                      </div>
                      <Badge variant={isEarned ? 'default' : 'secondary'} className="text-xs">
                        {achievement.points} pts
                      </Badge>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    </>
  );
}
