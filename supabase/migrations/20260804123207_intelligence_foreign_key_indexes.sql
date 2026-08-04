create index if not exists assistant_messages_user_idx
  on public.assistant_messages(user_id);

create index if not exists content_ideas_created_by_idx
  on public.content_ideas(created_by);

create index if not exists workspace_video_items_campaign_idx
  on public.workspace_video_items(campaign_id);
