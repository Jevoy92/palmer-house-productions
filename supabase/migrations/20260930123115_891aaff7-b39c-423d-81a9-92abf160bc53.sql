update public.campaigns c set conversation_id = m.conversation_id
from public.assistant_messages m
where c.conversation_id is null and m.conversation_id is not null
  and (m.metadata->>'studioCampaignLink')::boolean is true
  and m.metadata->>'campaignId' = c.id::text
  and m.workspace_id = c.workspace_id;