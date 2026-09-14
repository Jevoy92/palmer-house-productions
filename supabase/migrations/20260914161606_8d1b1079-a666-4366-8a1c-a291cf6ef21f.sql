CREATE TABLE public.conversations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
  created_by uuid REFERENCES auth.users(id),
  title text NOT NULL DEFAULT 'New conversation',
  pal text NOT NULL DEFAULT 'kiana',
  archived boolean NOT NULL DEFAULT false,
  is_legacy boolean NOT NULL DEFAULT false,
  message_count integer NOT NULL DEFAULT 0,
  last_message_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.conversations TO authenticated;
GRANT ALL ON public.conversations TO service_role;

ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;

CREATE POLICY conversations_all ON public.conversations FOR ALL TO authenticated
  USING (private.is_workspace_member(workspace_id))
  WITH CHECK (private.is_workspace_member(workspace_id));

CREATE TRIGGER conversations_touch BEFORE UPDATE ON public.conversations
  FOR EACH ROW EXECUTE FUNCTION private.touch_updated_at();

CREATE INDEX conversations_workspace_idx ON public.conversations (workspace_id, last_message_at DESC);

ALTER TABLE public.assistant_messages
  ADD COLUMN conversation_id uuid REFERENCES public.conversations(id) ON DELETE CASCADE;

CREATE INDEX assistant_messages_conversation_idx
  ON public.assistant_messages (conversation_id, created_at DESC);

ALTER TABLE public.campaigns ADD COLUMN conversation_id uuid REFERENCES public.conversations(id) ON DELETE SET NULL;
ALTER TABLE public.content_ideas ADD COLUMN conversation_id uuid REFERENCES public.conversations(id) ON DELETE SET NULL;

INSERT INTO public.conversations (workspace_id, title, pal, is_legacy, message_count, last_message_at, created_at)
SELECT m.workspace_id,
       'Earlier conversations',
       COALESCE((SELECT m2.pal FROM public.assistant_messages m2 WHERE m2.workspace_id = m.workspace_id ORDER BY m2.created_at DESC LIMIT 1), 'kiana'),
       true,
       count(*)::int,
       max(m.created_at),
       min(m.created_at)
FROM public.assistant_messages m
GROUP BY m.workspace_id;

UPDATE public.assistant_messages m
SET conversation_id = c.id
FROM public.conversations c
WHERE c.workspace_id = m.workspace_id AND c.is_legacy = true AND m.conversation_id IS NULL;