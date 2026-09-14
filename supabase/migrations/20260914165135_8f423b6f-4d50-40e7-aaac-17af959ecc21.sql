CREATE TABLE public.conversation_attachments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
  conversation_id uuid REFERENCES public.conversations(id) ON DELETE CASCADE,
  created_by uuid NOT NULL REFERENCES auth.users(id),
  kind text NOT NULL,
  label text NOT NULL DEFAULT '',
  mime_type text NOT NULL DEFAULT '',
  byte_size integer NOT NULL DEFAULT 0,
  storage_path text,
  extracted_text text NOT NULL DEFAULT '',
  summary text NOT NULL DEFAULT '',
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.conversation_attachments TO authenticated;
GRANT ALL ON public.conversation_attachments TO service_role;

ALTER TABLE public.conversation_attachments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Workspace members manage conversation attachments"
  ON public.conversation_attachments FOR ALL
  TO authenticated
  USING (private.is_workspace_member(workspace_id))
  WITH CHECK (private.is_workspace_member(workspace_id));

CREATE INDEX conversation_attachments_conversation_idx
  ON public.conversation_attachments (conversation_id, created_at DESC);
CREATE INDEX conversation_attachments_workspace_idx
  ON public.conversation_attachments (workspace_id, created_at DESC);

CREATE TRIGGER conversation_attachments_touch
  BEFORE UPDATE ON public.conversation_attachments
  FOR EACH ROW EXECUTE FUNCTION private.touch_updated_at();