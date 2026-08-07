ALTER TABLE public.workspace_settings DROP CONSTRAINT IF EXISTS workspace_settings_preferred_pal_check;
ALTER TABLE public.workspace_settings ADD CONSTRAINT workspace_settings_preferred_pal_check CHECK (preferred_pal IN ('none','kareem','kiana','ryder','raquel','cyrus','clara','silas','samira'));
ALTER TABLE public.workspace_settings ALTER COLUMN preferred_pal SET DEFAULT 'none';
UPDATE public.workspace_settings SET preferred_pal = 'none' WHERE preferred_pal NOT IN ('kareem','kiana','ryder','raquel','cyrus','clara','silas','samira');