-- Create storage bucket for user videos
INSERT INTO storage.buckets (id, name, public)
VALUES ('videos', 'videos', false);

-- Create RLS policies for videos bucket
CREATE POLICY "Users can upload their own videos"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'videos' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can view their own videos"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'videos' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can update their own videos"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'videos' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own videos"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'videos' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Create user_videos table
CREATE TABLE public.user_videos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  pal TEXT NOT NULL CHECK (pal IN ('reel', 'evergreen', 'spotlight', 'system')),
  title TEXT NOT NULL,
  file_path TEXT NOT NULL,
  thumbnail_path TEXT,
  status TEXT NOT NULL DEFAULT 'uploaded' CHECK (status IN ('uploaded', 'processing', 'ready', 'error')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.user_videos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own videos"
ON public.user_videos FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own videos"
ON public.user_videos FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own videos"
ON public.user_videos FOR UPDATE
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own videos"
ON public.user_videos FOR DELETE
TO authenticated
USING (auth.uid() = user_id);

-- Create achievements table
CREATE TABLE public.achievements (
  code TEXT PRIMARY KEY,
  pal TEXT NOT NULL CHECK (pal IN ('reel', 'evergreen', 'spotlight', 'system')),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  points INTEGER NOT NULL DEFAULT 0,
  icon TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view achievements"
ON public.achievements FOR SELECT
TO authenticated
USING (true);

-- Create user_achievements table
CREATE TABLE public.user_achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  achievement_code TEXT NOT NULL REFERENCES public.achievements(code) ON DELETE CASCADE,
  earned_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, achievement_code)
);

ALTER TABLE public.user_achievements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own achievements"
ON public.user_achievements FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own achievements"
ON public.user_achievements FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Seed some initial achievements
INSERT INTO public.achievements (code, pal, name, description, points, icon) VALUES
('reel_first_upload', 'reel', 'First Upload', 'Upload your first video with Reel Pal', 10, '🎬'),
('reel_5_videos', 'reel', 'Content Creator', 'Upload 5 videos with Reel Pal', 50, '🌟'),
('reel_10_videos', 'reel', 'Rising Star', 'Upload 10 videos with Reel Pal', 100, '⭐'),
('evergreen_first_upload', 'evergreen', 'First Upload', 'Upload your first video with Evergreen Pal', 10, '🌲'),
('evergreen_5_videos', 'evergreen', 'Evergreen Creator', 'Upload 5 videos with Evergreen Pal', 50, '🎯'),
('evergreen_10_videos', 'evergreen', 'SEO Master', 'Upload 10 videos with Evergreen Pal', 100, '🏆'),
('spotlight_first_upload', 'spotlight', 'First Upload', 'Upload your first video with Spotlight Pal', 10, '🎥'),
('spotlight_5_videos', 'spotlight', 'Production Pro', 'Upload 5 videos with Spotlight Pal', 50, '🎭'),
('spotlight_10_videos', 'spotlight', 'Cinematographer', 'Upload 10 videos with Spotlight Pal', 100, '🎪'),
('system_first_upload', 'system', 'First Upload', 'Upload your first video with System Pal', 10, '⚙️'),
('system_5_videos', 'system', 'System Builder', 'Upload 5 videos with System Pal', 50, '🔧'),
('system_10_videos', 'system', 'Automation Expert', 'Upload 10 videos with System Pal', 100, '🤖');

-- Add trigger for updated_at on user_videos
CREATE TRIGGER update_user_videos_updated_at
BEFORE UPDATE ON public.user_videos
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();