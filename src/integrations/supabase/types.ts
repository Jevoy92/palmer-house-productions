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
    PostgrestVersion: "13.0.5"
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
          campaign_id: string
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
          campaign_id: string
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
          campaign_id?: string
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
            foreignKeyName: "content_ideas_workspace_id_fkey"
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
      workspace_settings: {
        Row: {
          ai_memory: Json
          default_depth: string
          email_campaign_ready: boolean
          email_palmer_support: boolean
          email_usage_alerts: boolean
          last_briefing_at: string | null
          preferred_pal: string
          updated_at: string
          week_starts_on: number
          workspace_id: string
        }
        Insert: {
          ai_memory?: Json
          default_depth?: string
          email_campaign_ready?: boolean
          email_palmer_support?: boolean
          email_usage_alerts?: boolean
          last_briefing_at?: string | null
          preferred_pal?: string
          updated_at?: string
          week_starts_on?: number
          workspace_id: string
        }
        Update: {
          ai_memory?: Json
          default_depth?: string
          email_campaign_ready?: boolean
          email_palmer_support?: boolean
          email_usage_alerts?: boolean
          last_briefing_at?: string | null
          preferred_pal?: string
          updated_at?: string
          week_starts_on?: number
          workspace_id?: string
        }
        Relationships: [
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
          billing_interval: string
          campaign_allowance: number
          cancel_at_period_end: boolean
          current_period_end: string
          current_period_start: string
          plan: string
          status: string
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          trial_ends_at: string
          updated_at: string
          workspace_id: string
        }
        Insert: {
          billing_interval?: string
          campaign_allowance?: number
          cancel_at_period_end?: boolean
          current_period_end?: string
          current_period_start?: string
          plan?: string
          status?: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          trial_ends_at?: string
          updated_at?: string
          workspace_id: string
        }
        Update: {
          billing_interval?: string
          campaign_allowance?: number
          cancel_at_period_end?: boolean
          current_period_end?: string
          current_period_start?: string
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
      check_credits: {
        Args: { p_required_credits: number; p_user_id: string }
        Returns: boolean
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
      decrement_pal_spot: { Args: { p_pal_id: string }; Returns: boolean }
      finish_campaign_usage: {
        Args: { outcome: string; target_event_id: string }
        Returns: undefined
      }
      get_total_system_completion: {
        Args: { p_user_id: string }
        Returns: number
      }
      increment_pal_spot: { Args: { p_pal_id: string }; Returns: undefined }
      refill_monthly_credits: { Args: never; Returns: undefined }
      reserve_campaign_usage: {
        Args: {
          request_key: string
          target_campaign_id: string
          target_workspace_id: string
        }
        Returns: string
      }
    }
    Enums: {
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
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
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
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
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
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
