export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      achievements: {
        Row: {
          code: string
          created_at: string
          description: string
          icon: string
          name: string
          pal: string
          points: number
        }
        Insert: {
          code: string
          created_at?: string
          description: string
          icon: string
          name: string
          pal: string
          points?: number
        }
        Update: {
          code?: string
          created_at?: string
          description?: string
          icon?: string
          name?: string
          pal?: string
          points?: number
        }
        Relationships: []
      }
      assistant_messages: {
        Row: {
          body: string
          conversation_id: string | null
          created_at: string
          id: string
          metadata: Json
          pal: string
          role: string
          user_id: string | null
          workspace_id: string
        }
        Insert: {
          body: string
          conversation_id?: string | null
          created_at?: string
          id?: string
          metadata?: Json
          pal: string
          role: string
          user_id?: string | null
          workspace_id: string
        }
        Update: {
          body?: string
          conversation_id?: string | null
          created_at?: string
          id?: string
          metadata?: Json
          pal?: string
          role?: string
          user_id?: string | null
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "assistant_messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assistant_messages_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      brand_profiles: {
        Row: {
          avoid_language: string[]
          brand_details: Json
          business_name: string
          calls_to_action: string[]
          colors: Json
          completion: number
          content_examples: string[]
          created_at: string
          creator_type: string
          description: string
          fonts: Json
          id: string
          industry: string
          locations: string[]
          offers: Json
          personal_interests: string[]
          personal_story: string
          platforms: string[]
          preferred_language: string
          primary_audience: string
          primary_goal: string
          proof_points: string[]
          social_links: Json
          updated_at: string
          visual_style: string
          voice_traits: string[]
          website: string
          workspace_id: string
        }
        Insert: {
          avoid_language?: string[]
          brand_details?: Json
          business_name?: string
          calls_to_action?: string[]
          colors?: Json
          completion?: number
          content_examples?: string[]
          created_at?: string
          creator_type?: string
          description?: string
          fonts?: Json
          id?: string
          industry?: string
          locations?: string[]
          offers?: Json
          personal_interests?: string[]
          personal_story?: string
          platforms?: string[]
          preferred_language?: string
          primary_audience?: string
          primary_goal?: string
          proof_points?: string[]
          social_links?: Json
          updated_at?: string
          visual_style?: string
          voice_traits?: string[]
          website?: string
          workspace_id: string
        }
        Update: {
          avoid_language?: string[]
          brand_details?: Json
          business_name?: string
          calls_to_action?: string[]
          colors?: Json
          completion?: number
          content_examples?: string[]
          created_at?: string
          creator_type?: string
          description?: string
          fonts?: Json
          id?: string
          industry?: string
          locations?: string[]
          offers?: Json
          personal_interests?: string[]
          personal_story?: string
          platforms?: string[]
          preferred_language?: string
          primary_audience?: string
          primary_goal?: string
          proof_points?: string[]
          social_links?: Json
          updated_at?: string
          visual_style?: string
          voice_traits?: string[]
          website?: string
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "brand_profiles_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: true
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      brand_references: {
        Row: {
          created_at: string
          id: string
          kind: string
          label: string
          metadata: Json
          source_url: string | null
          storage_path: string | null
          workspace_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          kind?: string
          label: string
          metadata?: Json
          source_url?: string | null
          storage_path?: string | null
          workspace_id: string
        }
        Update: {
          created_at?: string
          id?: string
          kind?: string
          label?: string
          metadata?: Json
          source_url?: string | null
          storage_path?: string | null
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "brand_references_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      calendar_items: {
        Row: {
          asset_id: string | null
          assignee_id: string | null
          campaign_id: string | null
          channel: string
          created_at: string
          id: string
          notes: string
          publish_at: string
          status: string
          title: string
          updated_at: string
          workspace_id: string
        }
        Insert: {
          asset_id?: string | null
          assignee_id?: string | null
          campaign_id?: string | null
          channel?: string
          created_at?: string
          id?: string
          notes?: string
          publish_at: string
          status?: string
          title: string
          updated_at?: string
          workspace_id: string
        }
        Update: {
          asset_id?: string | null
          assignee_id?: string | null
          campaign_id?: string | null
          channel?: string
          created_at?: string
          id?: string
          notes?: string
          publish_at?: string
          status?: string
          title?: string
          updated_at?: string
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "calendar_items_asset_id_fkey"
            columns: ["asset_id"]
            isOneToOne: false
            referencedRelation: "campaign_assets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "calendar_items_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaigns"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "calendar_items_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      campaign_assets: {
        Row: {
          campaign_id: string | null
          content: string
          created_at: string
          id: string
          kind: string
          metadata: Json
          sort_order: number
          status: string
          title: string
          updated_at: string
          workspace_id: string
        }
        Insert: {
          campaign_id?: string | null
          content?: string
          created_at?: string
          id?: string
          kind: string
          metadata?: Json
          sort_order?: number
          status?: string
          title: string
          updated_at?: string
          workspace_id: string
        }
        Update: {
          campaign_id?: string | null
          content?: string
          created_at?: string
          id?: string
          kind?: string
          metadata?: Json
          sort_order?: number
          status?: string
          title?: string
          updated_at?: string
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "campaign_assets_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaigns"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaign_assets_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      campaigns: {
        Row: {
          anchor_format: string
          audience: string
          conversation_id: string | null
          created_at: string
          created_by: string
          depth: string
          goal: string
          id: string
          offer: string
          primary_lane: string
          production_plan: Json
          scheduled_at: string | null
          status: string
          strategy: Json
          title: string
          topic: string
          updated_at: string
          workspace_id: string
        }
        Insert: {
          anchor_format?: string
          audience?: string
          conversation_id?: string | null
          created_at?: string
          created_by: string
          depth?: string
          goal: string
          id?: string
          offer?: string
          primary_lane?: string
          production_plan?: Json
          scheduled_at?: string | null
          status?: string
          strategy?: Json
          title: string
          topic: string
          updated_at?: string
          workspace_id: string
        }
        Update: {
          anchor_format?: string
          audience?: string
          conversation_id?: string | null
          created_at?: string
          created_by?: string
          depth?: string
          goal?: string
          id?: string
          offer?: string
          primary_lane?: string
          production_plan?: Json
          scheduled_at?: string | null
          status?: string
          strategy?: Json
          title?: string
          topic?: string
          updated_at?: string
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "campaigns_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaigns_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      compass_results: {
        Row: {
          created_at: string
          email: string | null
          id: string
          inputs: Json
          results: Json
          user_id: string | null
        }
        Insert: {
          created_at?: string
          email?: string | null
          id?: string
          inputs: Json
          results: Json
          user_id?: string | null
        }
        Update: {
          created_at?: string
          email?: string | null
          id?: string
          inputs?: Json
          results?: Json
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "compass_results_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      content_ideas: {
        Row: {
          body: string
          business_problem: string
          conversation_id: string | null
          created_at: string
          created_by: string
          id: string
          primary_lane: string
          source_media_path: string | null
          source_metadata: Json
          source_type: string
          source_url: string | null
          status: string
          updated_at: string
          workspace_id: string
        }
        Insert: {
          body: string
          business_problem?: string
          conversation_id?: string | null
          created_at?: string
          created_by: string
          id?: string
          primary_lane?: string
          source_media_path?: string | null
          source_metadata?: Json
          source_type?: string
          source_url?: string | null
          status?: string
          updated_at?: string
          workspace_id: string
        }
        Update: {
          body?: string
          business_problem?: string
          conversation_id?: string | null
          created_at?: string
          created_by?: string
          id?: string
          primary_lane?: string
          source_media_path?: string | null
          source_metadata?: Json
          source_type?: string
          source_url?: string | null
          status?: string
          updated_at?: string
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "content_ideas_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "content_ideas_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      conversation_attachments: {
        Row: {
          byte_size: number
          conversation_id: string | null
          created_at: string
          created_by: string
          extracted_text: string
          id: string
          kind: string
          label: string
          metadata: Json
          mime_type: string
          storage_path: string | null
          summary: string
          updated_at: string
          workspace_id: string
        }
        Insert: {
          byte_size?: number
          conversation_id?: string | null
          created_at?: string
          created_by: string
          extracted_text?: string
          id?: string
          kind: string
          label?: string
          metadata?: Json
          mime_type?: string
          storage_path?: string | null
          summary?: string
          updated_at?: string
          workspace_id: string
        }
        Update: {
          byte_size?: number
          conversation_id?: string | null
          created_at?: string
          created_by?: string
          extracted_text?: string
          id?: string
          kind?: string
          label?: string
          metadata?: Json
          mime_type?: string
          storage_path?: string | null
          summary?: string
          updated_at?: string
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "conversation_attachments_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "conversation_attachments_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      conversations: {
        Row: {
          archived: boolean
          created_at: string
          created_by: string | null
          id: string
          is_legacy: boolean
          last_message_at: string
          message_count: number
          pal: string
          title: string
          updated_at: string
          workspace_id: string
        }
        Insert: {
          archived?: boolean
          created_at?: string
          created_by?: string | null
          id?: string
          is_legacy?: boolean
          last_message_at?: string
          message_count?: number
          pal?: string
          title?: string
          updated_at?: string
          workspace_id: string
        }
        Update: {
          archived?: boolean
          created_at?: string
          created_by?: string | null
          id?: string
          is_legacy?: boolean
          last_message_at?: string
          message_count?: number
          pal?: string
          title?: string
          updated_at?: string
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "conversations_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      credit_transactions: {
        Row: {
          amount: number
          created_at: string | null
          id: string
          metadata: Json | null
          tool_used: string | null
          transaction_type: Database["public"]["Enums"]["transaction_type"]
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string | null
          id?: string
          metadata?: Json | null
          tool_used?: string | null
          transaction_type: Database["public"]["Enums"]["transaction_type"]
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string | null
          id?: string
          metadata?: Json | null
          tool_used?: string | null
          transaction_type?: Database["public"]["Enums"]["transaction_type"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "credit_transactions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      email_send_log: {
        Row: {
          created_at: string
          error_message: string | null
          id: string
          message_id: string | null
          metadata: Json | null
          recipient_email: string
          status: string
          template_name: string
        }
        Insert: {
          created_at?: string
          error_message?: string | null
          id?: string
          message_id?: string | null
          metadata?: Json | null
          recipient_email: string
          status: string
          template_name: string
        }
        Update: {
          created_at?: string
          error_message?: string | null
          id?: string
          message_id?: string | null
          metadata?: Json | null
          recipient_email?: string
          status?: string
          template_name?: string
        }
        Relationships: []
      }
      email_send_state: {
        Row: {
          auth_email_ttl_minutes: number
          batch_size: number
          id: number
          retry_after_until: string | null
          send_delay_ms: number
          transactional_email_ttl_minutes: number
          updated_at: string
        }
        Insert: {
          auth_email_ttl_minutes?: number
          batch_size?: number
          id?: number
          retry_after_until?: string | null
          send_delay_ms?: number
          transactional_email_ttl_minutes?: number
          updated_at?: string
        }
        Update: {
          auth_email_ttl_minutes?: number
          batch_size?: number
          id?: number
          retry_after_until?: string | null
          send_delay_ms?: number
          transactional_email_ttl_minutes?: number
          updated_at?: string
        }
        Relationships: []
      }
      email_unsubscribe_tokens: {
        Row: {
          created_at: string
          email: string
          id: string
          token: string
          used_at: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          token: string
          used_at?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          token?: string
          used_at?: string | null
        }
        Relationships: []
      }
      expo_contact_events: {
        Row: {
          contact_id: string
          created_at: string
          dedupe_key: string | null
          detail: string | null
          id: string
          kind: string
        }
        Insert: {
          contact_id: string
          created_at?: string
          dedupe_key?: string | null
          detail?: string | null
          id?: string
          kind: string
        }
        Update: {
          contact_id?: string
          created_at?: string
          dedupe_key?: string | null
          detail?: string | null
          id?: string
          kind?: string
        }
        Relationships: [
          {
            foreignKeyName: "expo_contact_events_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "expo_contacts"
            referencedColumns: ["id"]
          },
        ]
      }
      expo_contacts: {
        Row: {
          campaign_id: string
          company: string | null
          created_at: string
          email: string
          follow_up_date: string
          follow_up_sent_at: string | null
          follow_up_state: string
          id: string
          interest: string | null
          name: string | null
          notes: string | null
          offer: string | null
          phone: string | null
          purchased: string | null
          source: string
          status: string
          stripe_customer_id: string | null
          updated_at: string
          wants_to_create: string | null
          workspace_id: string | null
        }
        Insert: {
          campaign_id: string
          company?: string | null
          created_at?: string
          email: string
          follow_up_date?: string
          follow_up_sent_at?: string | null
          follow_up_state?: string
          id?: string
          interest?: string | null
          name?: string | null
          notes?: string | null
          offer?: string | null
          phone?: string | null
          purchased?: string | null
          source?: string
          status?: string
          stripe_customer_id?: string | null
          updated_at?: string
          wants_to_create?: string | null
          workspace_id?: string | null
        }
        Update: {
          campaign_id?: string
          company?: string | null
          created_at?: string
          email?: string
          follow_up_date?: string
          follow_up_sent_at?: string | null
          follow_up_state?: string
          id?: string
          interest?: string | null
          name?: string | null
          notes?: string | null
          offer?: string | null
          phone?: string | null
          purchased?: string | null
          source?: string
          status?: string
          stripe_customer_id?: string | null
          updated_at?: string
          wants_to_create?: string | null
          workspace_id?: string | null
        }
        Relationships: []
      }
      expo_demo_usage: {
        Row: {
          created_at: string
          id: string
          kind: string
          session_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          kind: string
          session_id: string
        }
        Update: {
          created_at?: string
          id?: string
          kind?: string
          session_id?: string
        }
        Relationships: []
      }
      pal_availability: {
        Row: {
          id: string
          max_spots: number
          pal_id: string
          period_end: string
          period_start: string
          spots_remaining: number
          updated_at: string
        }
        Insert: {
          id?: string
          max_spots?: number
          pal_id: string
          period_end?: string
          period_start?: string
          spots_remaining?: number
          updated_at?: string
        }
        Update: {
          id?: string
          max_spots?: number
          pal_id?: string
          period_end?: string
          period_start?: string
          spots_remaining?: number
          updated_at?: string
        }
        Relationships: []
      }
      pal_characters: {
        Row: {
          color_var: string
          core_obsession: string
          created_at: string
          flaws: Json | null
          id: string
          lane: string
          name: string
          origin_story: string
          origin_wound: string
          quiet_fear: string
          recurring_details: Json | null
          role_in_group: string
          season_arc: string
          signature_move: string | null
          speaking_style: string
          strengths: Json | null
          style_cues: string | null
          updated_at: string
        }
        Insert: {
          color_var: string
          core_obsession: string
          created_at?: string
          flaws?: Json | null
          id?: string
          lane: string
          name: string
          origin_story: string
          origin_wound: string
          quiet_fear: string
          recurring_details?: Json | null
          role_in_group: string
          season_arc: string
          signature_move?: string | null
          speaking_style: string
          strengths?: Json | null
          style_cues?: string | null
          updated_at?: string
        }
        Update: {
          color_var?: string
          core_obsession?: string
          created_at?: string
          flaws?: Json | null
          id?: string
          lane?: string
          name?: string
          origin_story?: string
          origin_wound?: string
          quiet_fear?: string
          recurring_details?: Json | null
          role_in_group?: string
          season_arc?: string
          signature_move?: string | null
          speaking_style?: string
          strengths?: Json | null
          style_cues?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      pal_post_comments: {
        Row: {
          content: string
          created_at: string
          id: string
          is_approved: boolean | null
          post_id: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          is_approved?: boolean | null
          post_id: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          is_approved?: boolean | null
          post_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "pal_post_comments_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "pal_posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pal_post_comments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      pal_post_likes: {
        Row: {
          created_at: string
          id: string
          post_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          post_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          post_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "pal_post_likes_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "pal_posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pal_post_likes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      pal_posts: {
        Row: {
          content: string
          created_at: string
          engagement_count: number | null
          id: string
          image_url: string | null
          is_featured: boolean | null
          pal_name: string
          post_type: string
          title: string
        }
        Insert: {
          content: string
          created_at?: string
          engagement_count?: number | null
          id?: string
          image_url?: string | null
          is_featured?: boolean | null
          pal_name: string
          post_type: string
          title: string
        }
        Update: {
          content?: string
          created_at?: string
          engagement_count?: number | null
          id?: string
          image_url?: string | null
          is_featured?: boolean | null
          pal_name?: string
          post_type?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "pal_posts_pal_name_fkey"
            columns: ["pal_name"]
            isOneToOne: false
            referencedRelation: "pal_characters"
            referencedColumns: ["name"]
          },
        ]
      }
      pal_relationships: {
        Row: {
          created_at: string
          dynamic_description: string
          id: string
          pal_1: string
          pal_2: string
          recurring_bit: string | null
          relationship_type: string
        }
        Insert: {
          created_at?: string
          dynamic_description: string
          id?: string
          pal_1: string
          pal_2: string
          recurring_bit?: string | null
          relationship_type: string
        }
        Update: {
          created_at?: string
          dynamic_description?: string
          id?: string
          pal_1?: string
          pal_2?: string
          recurring_bit?: string | null
          relationship_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "pal_relationships_pal_1_fkey"
            columns: ["pal_1"]
            isOneToOne: false
            referencedRelation: "pal_characters"
            referencedColumns: ["name"]
          },
          {
            foreignKeyName: "pal_relationships_pal_2_fkey"
            columns: ["pal_2"]
            isOneToOne: false
            referencedRelation: "pal_characters"
            referencedColumns: ["name"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string
          favorite_pal: string | null
          full_name: string | null
          id: string
          industry: Database["public"]["Enums"]["business_industry"] | null
          job_title: string
          onboarding_completed: boolean
          phone: string
          timezone: string
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email: string
          favorite_pal?: string | null
          full_name?: string | null
          id: string
          industry?: Database["public"]["Enums"]["business_industry"] | null
          job_title?: string
          onboarding_completed?: boolean
          phone?: string
          timezone?: string
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string
          favorite_pal?: string | null
          full_name?: string | null
          id?: string
          industry?: Database["public"]["Enums"]["business_industry"] | null
          job_title?: string
          onboarding_completed?: boolean
          phone?: string
          timezone?: string
          updated_at?: string
        }
        Relationships: []
      }
      service_requests: {
        Row: {
          campaign_id: string | null
          created_at: string
          id: string
          notes: string
          request_type: string
          status: string
          updated_at: string
          user_id: string
          workspace_id: string
        }
        Insert: {
          campaign_id?: string | null
          created_at?: string
          id?: string
          notes?: string
          request_type: string
          status?: string
          updated_at?: string
          user_id: string
          workspace_id: string
        }
        Update: {
          campaign_id?: string | null
          created_at?: string
          id?: string
          notes?: string
          request_type?: string
          status?: string
          updated_at?: string
          user_id?: string
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "service_requests_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaigns"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "service_requests_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      studio_billing_events: {
        Row: {
          created_at: string
          event_created: number
          event_id: string
          kind: string
          workspace_id: string | null
        }
        Insert: {
          created_at?: string
          event_created: number
          event_id: string
          kind: string
          workspace_id?: string | null
        }
        Update: {
          created_at?: string
          event_created?: number
          event_id?: string
          kind?: string
          workspace_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "studio_billing_events_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      studio_credit_debts: {
        Row: {
          credits: number
          workspace_id: string
        }
        Insert: {
          credits?: number
          workspace_id: string
        }
        Update: {
          credits?: number
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "studio_credit_debts_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: true
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      studio_credit_grants: {
        Row: {
          amount_paid_cents: number | null
          created_at: string
          credits: number
          debt_credits: number
          expires_at: string | null
          id: string
          kind: string
          payment_intent_id: string | null
          remaining: number
          reversed_credits: number
          source_key: string
          workspace_id: string
        }
        Insert: {
          amount_paid_cents?: number | null
          created_at?: string
          credits: number
          debt_credits?: number
          expires_at?: string | null
          id?: string
          kind: string
          payment_intent_id?: string | null
          remaining: number
          reversed_credits?: number
          source_key: string
          workspace_id: string
        }
        Update: {
          amount_paid_cents?: number | null
          created_at?: string
          credits?: number
          debt_credits?: number
          expires_at?: string | null
          id?: string
          kind?: string
          payment_intent_id?: string | null
          remaining?: number
          reversed_credits?: number
          source_key?: string
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "studio_credit_grants_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      studio_credit_usage: {
        Row: {
          allocations: Json
          completed_at: string | null
          cost_ceiling_usd: number
          created_at: string
          credits: number
          estimated_cost_usd: number
          id: string
          operation: string
          provider_usage: Json
          status: string
          user_id: string
          workspace_id: string
        }
        Insert: {
          allocations?: Json
          completed_at?: string | null
          cost_ceiling_usd: number
          created_at?: string
          credits: number
          estimated_cost_usd?: number
          id?: string
          operation: string
          provider_usage?: Json
          status?: string
          user_id: string
          workspace_id: string
        }
        Update: {
          allocations?: Json
          completed_at?: string | null
          cost_ceiling_usd?: number
          created_at?: string
          credits?: number
          estimated_cost_usd?: number
          id?: string
          operation?: string
          provider_usage?: Json
          status?: string
          user_id?: string
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "studio_credit_usage_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      studio_feed_comments: {
        Row: {
          author: Json
          body: string
          created_at: string
          created_by: string
          id: string
          post_id: string
          workspace_id: string
        }
        Insert: {
          author: Json
          body: string
          created_at?: string
          created_by: string
          id?: string
          post_id: string
          workspace_id: string
        }
        Update: {
          author?: Json
          body?: string
          created_at?: string
          created_by?: string
          id?: string
          post_id?: string
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "studio_feed_comments_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "studio_feed_comments_workspace_id_post_id_fkey"
            columns: ["workspace_id", "post_id"]
            isOneToOne: false
            referencedRelation: "studio_feed_posts"
            referencedColumns: ["workspace_id", "id"]
          },
        ]
      }
      studio_feed_generation_state: {
        Row: {
          last_fingerprint: string | null
          last_generated_at: string | null
          last_output_fingerprint: string | null
          lease_until: string | null
          pending_fingerprint: string | null
          request_token: string | null
          requested_by: string | null
          retry_after: string | null
          updated_at: string
          workspace_id: string
        }
        Insert: {
          last_fingerprint?: string | null
          last_generated_at?: string | null
          last_output_fingerprint?: string | null
          lease_until?: string | null
          pending_fingerprint?: string | null
          request_token?: string | null
          requested_by?: string | null
          retry_after?: string | null
          updated_at?: string
          workspace_id: string
        }
        Update: {
          last_fingerprint?: string | null
          last_generated_at?: string | null
          last_output_fingerprint?: string | null
          lease_until?: string | null
          pending_fingerprint?: string | null
          request_token?: string | null
          requested_by?: string | null
          retry_after?: string | null
          updated_at?: string
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "studio_feed_generation_state_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: true
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      studio_feed_posts: {
        Row: {
          asset_id: string | null
          author: Json
          body: string
          created_at: string
          created_by: string
          generated: boolean
          id: string
          lane: string
          sources: Json
          title: string
          workspace_id: string
        }
        Insert: {
          asset_id?: string | null
          author: Json
          body: string
          created_at?: string
          created_by: string
          generated?: boolean
          id?: string
          lane?: string
          sources?: Json
          title?: string
          workspace_id: string
        }
        Update: {
          asset_id?: string | null
          author?: Json
          body?: string
          created_at?: string
          created_by?: string
          generated?: boolean
          id?: string
          lane?: string
          sources?: Json
          title?: string
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "studio_feed_posts_workspace_id_asset_id_fkey"
            columns: ["workspace_id", "asset_id"]
            isOneToOne: false
            referencedRelation: "campaign_assets"
            referencedColumns: ["workspace_id", "id"]
          },
          {
            foreignKeyName: "studio_feed_posts_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      studio_feed_reactions: {
        Row: {
          created_at: string
          post_id: string
          reaction: string
          user_id: string
          workspace_id: string
        }
        Insert: {
          created_at?: string
          post_id: string
          reaction: string
          user_id: string
          workspace_id: string
        }
        Update: {
          created_at?: string
          post_id?: string
          reaction?: string
          user_id?: string
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "studio_feed_reactions_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "studio_feed_reactions_workspace_id_post_id_fkey"
            columns: ["workspace_id", "post_id"]
            isOneToOne: false
            referencedRelation: "studio_feed_posts"
            referencedColumns: ["workspace_id", "id"]
          },
        ]
      }
      studio_membership_checkouts: {
        Row: {
          attempt_id: string
          created_at: string
          interval_name: string
          lease_token: string | null
          lease_until: string | null
          plan: string
          session_id: string | null
          workspace_id: string
        }
        Insert: {
          attempt_id?: string
          created_at?: string
          interval_name: string
          lease_token?: string | null
          lease_until?: string | null
          plan: string
          session_id?: string | null
          workspace_id: string
        }
        Update: {
          attempt_id?: string
          created_at?: string
          interval_name?: string
          lease_token?: string | null
          lease_until?: string | null
          plan?: string
          session_id?: string | null
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "studio_membership_checkouts_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: true
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      studio_pal_profiles: {
        Row: {
          avatar_path: string | null
          base_pal: string
          created_at: string
          created_by: string
          id: string
          name: string
          personality: string
          updated_at: string
          workspace_id: string
        }
        Insert: {
          avatar_path?: string | null
          base_pal: string
          created_at?: string
          created_by: string
          id?: string
          name: string
          personality: string
          updated_at?: string
          workspace_id: string
        }
        Update: {
          avatar_path?: string | null
          base_pal?: string
          created_at?: string
          created_by?: string
          id?: string
          name?: string
          personality?: string
          updated_at?: string
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "studio_pal_profiles_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      studio_trial_claims: {
        Row: {
          created_at: string
          user_id: string
          workspace_id: string
        }
        Insert: {
          created_at?: string
          user_id: string
          workspace_id: string
        }
        Update: {
          created_at?: string
          user_id?: string
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "studio_trial_claims_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: true
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      studio_voice_requests: {
        Row: {
          actor_id: string
          attachment_id: string | null
          attempt_token: string
          content_sha256: string
          conversation_id: string | null
          created_at: string
          request_key: string
          status: string
          updated_at: string
          usage_id: string | null
          workspace_id: string
        }
        Insert: {
          actor_id: string
          attachment_id?: string | null
          attempt_token?: string
          content_sha256: string
          conversation_id?: string | null
          created_at?: string
          request_key: string
          status?: string
          updated_at?: string
          usage_id?: string | null
          workspace_id: string
        }
        Update: {
          actor_id?: string
          attachment_id?: string | null
          attempt_token?: string
          content_sha256?: string
          conversation_id?: string | null
          created_at?: string
          request_key?: string
          status?: string
          updated_at?: string
          usage_id?: string | null
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "studio_voice_requests_attachment_id_fkey"
            columns: ["attachment_id"]
            isOneToOne: false
            referencedRelation: "conversation_attachments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "studio_voice_requests_usage_id_fkey"
            columns: ["usage_id"]
            isOneToOne: false
            referencedRelation: "studio_credit_usage"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "studio_voice_requests_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      subscription_plans: {
        Row: {
          created_at: string | null
          features: Json
          id: string
          is_active: boolean | null
          monthly_credits: number
          name: string
          strategy_sessions_per_month: number
          tier: Database["public"]["Enums"]["subscription_tier"]
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          features?: Json
          id?: string
          is_active?: boolean | null
          monthly_credits: number
          name: string
          strategy_sessions_per_month: number
          tier: Database["public"]["Enums"]["subscription_tier"]
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          features?: Json
          id?: string
          is_active?: boolean | null
          monthly_credits?: number
          name?: string
          strategy_sessions_per_month?: number
          tier?: Database["public"]["Enums"]["subscription_tier"]
          updated_at?: string | null
        }
        Relationships: []
      }
      suppressed_emails: {
        Row: {
          created_at: string
          email: string
          id: string
          metadata: Json | null
          reason: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          metadata?: Json | null
          reason: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          metadata?: Json | null
          reason?: string
        }
        Relationships: []
      }
      tool_costs: {
        Row: {
          created_at: string | null
          credit_cost: number
          description: string | null
          id: string
          is_active: boolean | null
          tool_name: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          credit_cost: number
          description?: string | null
          id?: string
          is_active?: boolean | null
          tool_name: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          credit_cost?: number
          description?: string | null
          id?: string
          is_active?: boolean | null
          tool_name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      usage_events: {
        Row: {
          action: string
          campaign_id: string | null
          completed_at: string | null
          created_at: string
          id: string
          idempotency_key: string
          metadata: Json
          provider_cost_cents: number | null
          status: string
          units: number
          user_id: string
          workspace_id: string
        }
        Insert: {
          action: string
          campaign_id?: string | null
          completed_at?: string | null
          created_at?: string
          id?: string
          idempotency_key: string
          metadata?: Json
          provider_cost_cents?: number | null
          status?: string
          units: number
          user_id: string
          workspace_id: string
        }
        Update: {
          action?: string
          campaign_id?: string | null
          completed_at?: string | null
          created_at?: string
          id?: string
          idempotency_key?: string
          metadata?: Json
          provider_cost_cents?: number | null
          status?: string
          units?: number
          user_id?: string
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "usage_events_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaigns"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "usage_events_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      user_achievements: {
        Row: {
          achievement_code: string
          earned_at: string
          id: string
          user_id: string
        }
        Insert: {
          achievement_code: string
          earned_at?: string
          id?: string
          user_id: string
        }
        Update: {
          achievement_code?: string
          earned_at?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_achievements_achievement_code_fkey"
            columns: ["achievement_code"]
            isOneToOne: false
            referencedRelation: "achievements"
            referencedColumns: ["code"]
          },
        ]
      }
      user_addons: {
        Row: {
          addon_type: string
          created_at: string | null
          expires_at: string | null
          id: string
          is_active: boolean | null
          purchased_at: string | null
          user_id: string
        }
        Insert: {
          addon_type: string
          created_at?: string | null
          expires_at?: string | null
          id?: string
          is_active?: boolean | null
          purchased_at?: string | null
          user_id: string
        }
        Update: {
          addon_type?: string
          created_at?: string | null
          expires_at?: string | null
          id?: string
          is_active?: boolean | null
          purchased_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_addons_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_credits: {
        Row: {
          balance: number
          created_at: string | null
          id: string
          last_refill_date: string | null
          monthly_allowance: number
          updated_at: string | null
          user_id: string
        }
        Insert: {
          balance?: number
          created_at?: string | null
          id?: string
          last_refill_date?: string | null
          monthly_allowance?: number
          updated_at?: string | null
          user_id: string
        }
        Update: {
          balance?: number
          created_at?: string | null
          id?: string
          last_refill_date?: string | null
          monthly_allowance?: number
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_credits_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_pal_follows: {
        Row: {
          followed_at: string
          id: string
          pal_name: string
          user_id: string
        }
        Insert: {
          followed_at?: string
          id?: string
          pal_name: string
          user_id: string
        }
        Update: {
          followed_at?: string
          id?: string
          pal_name?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_pal_follows_pal_name_fkey"
            columns: ["pal_name"]
            isOneToOne: false
            referencedRelation: "pal_characters"
            referencedColumns: ["name"]
          },
          {
            foreignKeyName: "user_pal_follows_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      user_subscriptions: {
        Row: {
          cancel_at_period_end: boolean | null
          created_at: string | null
          current_period_end: string
          current_period_start: string
          id: string
          plan_id: string
          status: string
          stripe_subscription_id: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          cancel_at_period_end?: boolean | null
          created_at?: string | null
          current_period_end: string
          current_period_start?: string
          id?: string
          plan_id: string
          status?: string
          stripe_subscription_id?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          cancel_at_period_end?: boolean | null
          created_at?: string | null
          current_period_end?: string
          current_period_start?: string
          id?: string
          plan_id?: string
          status?: string
          stripe_subscription_id?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_subscriptions_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "subscription_plans"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_subscriptions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_video_checklist: {
        Row: {
          completed: boolean
          completed_at: string | null
          created_at: string
          id: string
          pal: string
          updated_at: string
          user_id: string
          video_id: string
        }
        Insert: {
          completed?: boolean
          completed_at?: string | null
          created_at?: string
          id?: string
          pal: string
          updated_at?: string
          user_id: string
          video_id: string
        }
        Update: {
          completed?: boolean
          completed_at?: string | null
          created_at?: string
          id?: string
          pal?: string
          updated_at?: string
          user_id?: string
          video_id?: string
        }
        Relationships: []
      }
      user_videos: {
        Row: {
          created_at: string
          file_path: string
          id: string
          pal: string
          status: string
          thumbnail_path: string | null
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          file_path: string
          id?: string
          pal: string
          status?: string
          thumbnail_path?: string | null
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          file_path?: string
          id?: string
          pal?: string
          status?: string
          thumbnail_path?: string | null
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      video_system_assessments: {
        Row: {
          answers: Json
          company: string | null
          created_at: string | null
          email: string
          id: string
          level: string
          name: string | null
          recommendations: Json | null
          score: number
          source: string | null
        }
        Insert: {
          answers: Json
          company?: string | null
          created_at?: string | null
          email: string
          id?: string
          level: string
          name?: string | null
          recommendations?: Json | null
          score: number
          source?: string | null
        }
        Update: {
          answers?: Json
          company?: string | null
          created_at?: string | null
          email?: string
          id?: string
          level?: string
          name?: string | null
          recommendations?: Json | null
          score?: number
          source?: string | null
        }
        Relationships: []
      }
      waitlist_entries: {
        Row: {
          created_at: string
          email: string
          id: string
          name: string
          notified: boolean
          pal_id: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          name: string
          notified?: boolean
          pal_id: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          name?: string
          notified?: boolean
          pal_id?: string
        }
        Relationships: []
      }
      workspace_invites: {
        Row: {
          accepted_at: string | null
          created_at: string
          email: string
          expires_at: string
          id: string
          invited_by: string
          role: string
          token_hash: string
          workspace_id: string
        }
        Insert: {
          accepted_at?: string | null
          created_at?: string
          email: string
          expires_at?: string
          id?: string
          invited_by: string
          role?: string
          token_hash: string
          workspace_id: string
        }
        Update: {
          accepted_at?: string | null
          created_at?: string
          email?: string
          expires_at?: string
          id?: string
          invited_by?: string
          role?: string
          token_hash?: string
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "workspace_invites_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      workspace_members: {
        Row: {
          created_at: string
          role: string
          user_id: string
          workspace_id: string
        }
        Insert: {
          created_at?: string
          role?: string
          user_id: string
          workspace_id: string
        }
        Update: {
          created_at?: string
          role?: string
          user_id?: string
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "workspace_members_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      workspace_memories: {
        Row: {
          content: string
          created_at: string
          created_by: string
          id: string
          revision: number
          title: string
          updated_at: string
          workspace_id: string
        }
        Insert: {
          content: string
          created_at?: string
          created_by: string
          id?: string
          revision?: number
          title: string
          updated_at?: string
          workspace_id: string
        }
        Update: {
          content?: string
          created_at?: string
          created_by?: string
          id?: string
          revision?: number
          title?: string
          updated_at?: string
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "workspace_memories_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      workspace_settings: {
        Row: {
          active_pal_profile_id: string | null
          ai_memory: Json
          default_depth: string
          email_campaign_ready: boolean
          email_palmer_support: boolean
          email_usage_alerts: boolean
          inapp_alerts: boolean
          last_briefing_at: string | null
          preferred_pal: string
          updated_at: string
          week_starts_on: number
          workspace_id: string
        }
        Insert: {
          active_pal_profile_id?: string | null
          ai_memory?: Json
          default_depth?: string
          email_campaign_ready?: boolean
          email_palmer_support?: boolean
          email_usage_alerts?: boolean
          inapp_alerts?: boolean
          last_briefing_at?: string | null
          preferred_pal?: string
          updated_at?: string
          week_starts_on?: number
          workspace_id: string
        }
        Update: {
          active_pal_profile_id?: string | null
          ai_memory?: Json
          default_depth?: string
          email_campaign_ready?: boolean
          email_palmer_support?: boolean
          email_usage_alerts?: boolean
          inapp_alerts?: boolean
          last_briefing_at?: string | null
          preferred_pal?: string
          updated_at?: string
          week_starts_on?: number
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "workspace_active_pal_fk"
            columns: ["workspace_id", "active_pal_profile_id"]
            isOneToOne: false
            referencedRelation: "studio_pal_profiles"
            referencedColumns: ["workspace_id", "id"]
          },
          {
            foreignKeyName: "workspace_settings_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: true
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      workspace_subscriptions: {
        Row: {
          billing_event_created: number
          billing_hold: boolean
          billing_interval: string
          campaign_allowance: number
          cancel_at_period_end: boolean
          current_period_end: string
          current_period_start: string
          paid_billing_interval: string | null
          paid_credit_allowance: number | null
          paid_event_created: number
          paid_period_end: string | null
          paid_period_start: string | null
          paid_plan: string | null
          plan: string
          status: string
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          trial_ends_at: string
          updated_at: string
          workspace_id: string
        }
        Insert: {
          billing_event_created?: number
          billing_hold?: boolean
          billing_interval?: string
          campaign_allowance?: number
          cancel_at_period_end?: boolean
          current_period_end?: string
          current_period_start?: string
          paid_billing_interval?: string | null
          paid_credit_allowance?: number | null
          paid_event_created?: number
          paid_period_end?: string | null
          paid_period_start?: string | null
          paid_plan?: string | null
          plan?: string
          status?: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          trial_ends_at?: string
          updated_at?: string
          workspace_id: string
        }
        Update: {
          billing_event_created?: number
          billing_hold?: boolean
          billing_interval?: string
          campaign_allowance?: number
          cancel_at_period_end?: boolean
          current_period_end?: string
          current_period_start?: string
          paid_billing_interval?: string | null
          paid_credit_allowance?: number | null
          paid_event_created?: number
          paid_period_end?: string | null
          paid_period_start?: string | null
          paid_plan?: string | null
          plan?: string
          status?: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          trial_ends_at?: string
          updated_at?: string
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "workspace_subscriptions_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: true
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      workspace_video_items: {
        Row: {
          campaign_id: string | null
          item_key: string
          notes: string
          status: string
          updated_at: string
          workspace_id: string
        }
        Insert: {
          campaign_id?: string | null
          item_key: string
          notes?: string
          status?: string
          updated_at?: string
          workspace_id: string
        }
        Update: {
          campaign_id?: string | null
          item_key?: string
          notes?: string
          status?: string
          updated_at?: string
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "workspace_video_items_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaigns"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workspace_video_items_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      workspaces: {
        Row: {
          created_at: string
          created_by: string
          id: string
          name: string
          slug: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by: string
          id?: string
          name: string
          slug: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string
          id?: string
          name?: string
          slug?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      add_credits: {
        Args: {
          p_amount: number
          p_metadata?: Json
          p_transaction_type: Database["public"]["Enums"]["transaction_type"]
          p_user_id: string
        }
        Returns: boolean
      }
      associate_studio_asset_image: {
        Args: {
          expected_source_updated_at: string
          image_asset_id: string
          source_asset_id: string
          target_workspace_id: string
        }
        Returns: undefined
      }
      bind_studio_voice_usage: {
        Args: {
          actor: string
          request_id: string
          target_workspace_id: string
          token: string
          usage: string
        }
        Returns: undefined
      }
      check_credits: {
        Args: { p_required_credits: number; p_user_id: string }
        Returns: boolean
      }
      claim_studio_membership_checkout: {
        Args: {
          interval_key: string
          plan_key: string
          target_workspace_id: string
        }
        Returns: Json
      }
      claim_studio_voice: {
        Args: {
          actor: string
          content_hash: string
          conversation?: string
          request_id: string
          target_workspace_id: string
        }
        Returns: Json
      }
      complete_studio_feed_generation: {
        Args: {
          output_fingerprint: string
          post_value: Json
          replies_value: Json
          request_token: string
          target_workspace_id: string
        }
        Returns: string
      }
      complete_studio_voice: {
        Args: {
          actor: string
          details: Json
          file_bytes: number
          file_label: string
          request_id: string
          saved_path: string
          target_workspace_id: string
          token: string
          transcript: string
        }
        Returns: string
      }
      consume_credits: {
        Args: {
          p_amount: number
          p_metadata?: Json
          p_tool_name: string
          p_user_id: string
        }
        Returns: boolean
      }
      create_studio_feed_discussion: {
        Args: {
          post_value: Json
          replies_value: Json
          target_workspace_id: string
        }
        Returns: string
      }
      decrement_pal_spot: { Args: { p_pal_id: string }; Returns: boolean }
      delete_email: {
        Args: { message_id: number; queue_name: string }
        Returns: boolean
      }
      email_queue_dispatch: { Args: never; Returns: undefined }
      enqueue_email: {
        Args: { payload: Json; queue_name: string }
        Returns: number
      }
      fail_studio_voice: {
        Args: {
          actor: string
          request_id: string
          target_workspace_id: string
          token: string
        }
        Returns: undefined
      }
      finish_campaign_usage: {
        Args: { outcome: string; target_event_id: string }
        Returns: undefined
      }
      finish_studio_credits: {
        Args: {
          outcome: string
          provider_calls: Json
          provider_cost: number
          usage_id: string
        }
        Returns: undefined
      }
      finish_studio_membership_checkout: {
        Args: {
          clear_attempt: boolean
          request_token: string
          stripe_session_id: string
          target_workspace_id: string
        }
        Returns: undefined
      }
      forget_workspace_legacy_memory: {
        Args: { expected_value: Json; target_workspace_id: string }
        Returns: undefined
      }
      forget_workspace_memory: {
        Args: {
          expected_revision: number
          memory_id: string
          target_workspace_id: string
        }
        Returns: undefined
      }
      get_total_system_completion: {
        Args: { p_user_id: string }
        Returns: number
      }
      grant_studio_topup: {
        Args: {
          credit_count: number
          event_key: string
          event_time: number
          paid_cents: number
          payment_id: string
          session_id: string
          target_workspace_id: string
        }
        Returns: boolean
      }
      hold_studio_billing: {
        Args: {
          event_key: string
          event_time: number
          subscription_id: string
          target_workspace_id: string
        }
        Returns: undefined
      }
      increment_pal_spot: { Args: { p_pal_id: string }; Returns: undefined }
      move_to_dlq: {
        Args: {
          dlq_name: string
          message_id: number
          payload: Json
          source_queue: string
        }
        Returns: number
      }
      read_email_batch: {
        Args: { batch_size: number; queue_name: string; vt: number }
        Returns: {
          message: Json
          msg_id: number
          read_ct: number
        }[]
      }
      refill_monthly_credits: { Args: never; Returns: undefined }
      refresh_studio_credits: {
        Args: { allowance: number; target_workspace_id: string }
        Returns: Json
      }
      release_studio_feed_generation: {
        Args: { request_token: string; target_workspace_id: string }
        Returns: undefined
      }
      reserve_campaign_usage: {
        Args: {
          request_key: string
          target_campaign_id: string
          target_workspace_id: string
        }
        Returns: string
      }
      reserve_studio_credits: {
        Args: {
          actor_id: string
          allowance: number
          automatic_monthly_budget: number
          cost_ceiling: number
          credit_count: number
          global_monthly_budget: number
          operation_name: string
          target_workspace_id: string
          workspace_monthly_budget: number
        }
        Returns: string
      }
      reserve_studio_feed_generation: {
        Args: {
          context_fingerprint: string
          request_mode: string
          target_workspace_id: string
        }
        Returns: Json
      }
      reverse_studio_topup: {
        Args: {
          disputed: boolean
          event_key: string
          event_time: number
          payment_id: string
          refunded_cents: number
        }
        Returns: boolean
      }
      save_workspace_memory: {
        Args: {
          expected_revision: number
          memory_content: string
          memory_id: string
          memory_title: string
          target_workspace_id: string
        }
        Returns: Json
      }
      studio_credit_cost_snapshot: { Args: never; Returns: Json }
      studio_credit_snapshot: {
        Args: { period_start: string; target_workspace_id: string }
        Returns: Json
      }
      sync_studio_subscription: {
        Args: {
          event_key: string
          event_time: number
          paid_invoice: boolean
          subscription_data: Json
          target_workspace_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
      business_industry:
        | "healthcare"
        | "fitness"
        | "manufacturing"
        | "technology"
        | "professional_services"
        | "real_estate"
        | "education"
        | "retail"
        | "hospitality"
        | "construction"
        | "financial_services"
        | "nonprofit"
        | "creative_agency"
        | "other"
      subscription_tier: "free" | "core" | "guided"
      transaction_type: "usage" | "refill" | "purchase" | "bonus" | "migration"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user"],
      business_industry: [
        "healthcare",
        "fitness",
        "manufacturing",
        "technology",
        "professional_services",
        "real_estate",
        "education",
        "retail",
        "hospitality",
        "construction",
        "financial_services",
        "nonprofit",
        "creative_agency",
        "other",
      ],
      subscription_tier: ["free", "core", "guided"],
      transaction_type: ["usage", "refill", "purchase", "bonus", "migration"],
    },
  },
} as const
