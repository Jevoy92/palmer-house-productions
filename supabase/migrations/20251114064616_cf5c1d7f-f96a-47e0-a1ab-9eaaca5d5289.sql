-- Create table for tracking user video checklist progress
CREATE TABLE public.user_video_checklist (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  pal TEXT NOT NULL CHECK (pal IN ('reel', 'evergreen', 'spotlight', 'system')),
  video_id TEXT NOT NULL,
  completed BOOLEAN NOT NULL DEFAULT false,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, pal, video_id)
);

-- Enable RLS
ALTER TABLE public.user_video_checklist ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view their own checklist items"
  ON public.user_video_checklist
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own checklist items"
  ON public.user_video_checklist
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own checklist items"
  ON public.user_video_checklist
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own checklist items"
  ON public.user_video_checklist
  FOR DELETE
  USING (auth.uid() = user_id);

-- Add trigger for updated_at
CREATE TRIGGER update_user_video_checklist_updated_at
  BEFORE UPDATE ON public.user_video_checklist
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create index for faster queries
CREATE INDEX idx_user_video_checklist_user_pal ON public.user_video_checklist(user_id, pal);