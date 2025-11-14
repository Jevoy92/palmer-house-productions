-- Add favorite_pal field to profiles table
ALTER TABLE public.profiles 
ADD COLUMN favorite_pal TEXT DEFAULT 'reel' CHECK (favorite_pal IN ('reel', 'evergreen', 'spotlight', 'system'));