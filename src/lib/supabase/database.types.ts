export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.15";
  };
  public: {
    Tables: {
      brand_profiles: {
        Row: {
          avoid_language: string[];
          business_name: string;
          calls_to_action: string[];
          colors: Json;
          completion: number;
          content_examples: string[];
          created_at: string;
          description: string;
          fonts: Json;
          id: string;
          industry: string;
          locations: string[];
          offers: Json;
          platforms: string[];
          preferred_language: string;
          primary_audience: string;
          proof_points: string[];
          updated_at: string;
          voice_traits: string[];
          website: string;
          workspace_id: string;
        };
        Insert: {
          avoid_language?: string[];
          business_name?: string;
          calls_to_action?: string[];
          colors?: Json;
          completion?: number;
          content_examples?: string[];
          created_at?: string;
          description?: string;
          fonts?: Json;
          id?: string;
          industry?: string;
          locations?: string[];
          offers?: Json;
          platforms?: string[];
          preferred_language?: string;
          primary_audience?: string;
          proof_points?: string[];
          updated_at?: string;
          voice_traits?: string[];
          website?: string;
          workspace_id: string;
        };
        Update: {
          avoid_language?: string[];
          business_name?: string;
          calls_to_action?: string[];
          colors?: Json;
          completion?: number;
          content_examples?: string[];
          created_at?: string;
          description?: string;
          fonts?: Json;
          id?: string;
          industry?: string;
          locations?: string[];
          offers?: Json;
          platforms?: string[];
          preferred_language?: string;
          primary_audience?: string;
          proof_points?: string[];
          updated_at?: string;
          voice_traits?: string[];
          website?: string;
          workspace_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "brand_profiles_workspace_id_fkey";
            columns: ["workspace_id"];
            isOneToOne: true;
            referencedRelation: "workspaces";
            referencedColumns: ["id"];
          },
        ];
      };
      calendar_items: {
        Row: {
          asset_id: string | null;
          assignee_id: string | null;
          campaign_id: string | null;
          channel: string;
          created_at: string;
          id: string;
          notes: string;
          publish_at: string;
          status: string;
          title: string;
          updated_at: string;
          workspace_id: string;
        };
        Insert: {
          asset_id?: string | null;
          assignee_id?: string | null;
          campaign_id?: string | null;
          channel?: string;
          created_at?: string;
          id?: string;
          notes?: string;
          publish_at: string;
          status?: string;
          title: string;
          updated_at?: string;
          workspace_id: string;
        };
        Update: {
          asset_id?: string | null;
          assignee_id?: string | null;
          campaign_id?: string | null;
          channel?: string;
          created_at?: string;
          id?: string;
          notes?: string;
          publish_at?: string;
          status?: string;
          title?: string;
          updated_at?: string;
          workspace_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "calendar_items_asset_id_fkey";
            columns: ["asset_id"];
            isOneToOne: false;
            referencedRelation: "campaign_assets";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "calendar_items_campaign_id_fkey";
            columns: ["campaign_id"];
            isOneToOne: false;
            referencedRelation: "campaigns";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "calendar_items_workspace_id_fkey";
            columns: ["workspace_id"];
            isOneToOne: false;
            referencedRelation: "workspaces";
            referencedColumns: ["id"];
          },
        ];
      };
      campaign_assets: {
        Row: {
          campaign_id: string;
          content: string;
          created_at: string;
          id: string;
          kind: string;
          metadata: Json;
          sort_order: number;
          status: string;
          title: string;
          updated_at: string;
          workspace_id: string;
        };
        Insert: {
          campaign_id: string;
          content?: string;
          created_at?: string;
          id?: string;
          kind: string;
          metadata?: Json;
          sort_order?: number;
          status?: string;
          title: string;
          updated_at?: string;
          workspace_id: string;
        };
        Update: {
          campaign_id?: string;
          content?: string;
          created_at?: string;
          id?: string;
          kind?: string;
          metadata?: Json;
          sort_order?: number;
          status?: string;
          title?: string;
          updated_at?: string;
          workspace_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "campaign_assets_campaign_id_fkey";
            columns: ["campaign_id"];
            isOneToOne: false;
            referencedRelation: "campaigns";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "campaign_assets_workspace_id_fkey";
            columns: ["workspace_id"];
            isOneToOne: false;
            referencedRelation: "workspaces";
            referencedColumns: ["id"];
          },
        ];
      };
      campaigns: {
        Row: {
          anchor_format: string;
          audience: string;
          created_at: string;
          created_by: string;
          depth: string;
          goal: string;
          id: string;
          offer: string;
          primary_lane: string;
          production_plan: Json;
          scheduled_at: string | null;
          status: string;
          strategy: Json;
          title: string;
          topic: string;
          updated_at: string;
          workspace_id: string;
        };
        Insert: {
          anchor_format?: string;
          audience?: string;
          created_at?: string;
          created_by: string;
          depth?: string;
          goal: string;
          id?: string;
          offer?: string;
          primary_lane?: string;
          production_plan?: Json;
          scheduled_at?: string | null;
          status?: string;
          strategy?: Json;
          title: string;
          topic: string;
          updated_at?: string;
          workspace_id: string;
        };
        Update: {
          anchor_format?: string;
          audience?: string;
          created_at?: string;
          created_by?: string;
          depth?: string;
          goal?: string;
          id?: string;
          offer?: string;
          primary_lane?: string;
          production_plan?: Json;
          scheduled_at?: string | null;
          status?: string;
          strategy?: Json;
          title?: string;
          topic?: string;
          updated_at?: string;
          workspace_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "campaigns_workspace_id_fkey";
            columns: ["workspace_id"];
            isOneToOne: false;
            referencedRelation: "workspaces";
            referencedColumns: ["id"];
          },
        ];
      };
      assistant_messages: {
        Row: {
          body: string;
          created_at: string;
          id: string;
          metadata: Json;
          pal: string;
          role: string;
          user_id: string | null;
          workspace_id: string;
        };
        Insert: {
          body: string;
          created_at?: string;
          id?: string;
          metadata?: Json;
          pal: string;
          role: string;
          user_id?: string | null;
          workspace_id: string;
        };
        Update: {
          body?: string;
          created_at?: string;
          id?: string;
          metadata?: Json;
          pal?: string;
          role?: string;
          user_id?: string | null;
          workspace_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "assistant_messages_workspace_id_fkey";
            columns: ["workspace_id"];
            isOneToOne: false;
            referencedRelation: "workspaces";
            referencedColumns: ["id"];
          },
        ];
      };
      content_ideas: {
        Row: {
          body: string;
          business_problem: string;
          created_at: string;
          created_by: string;
          id: string;
          primary_lane: string;
          source_media_path: string | null;
          source_metadata: Json;
          source_type: string;
          source_url: string | null;
          status: string;
          updated_at: string;
          workspace_id: string;
        };
        Insert: {
          body: string;
          business_problem?: string;
          created_at?: string;
          created_by: string;
          id?: string;
          primary_lane?: string;
          source_media_path?: string | null;
          source_metadata?: Json;
          source_type?: string;
          source_url?: string | null;
          status?: string;
          updated_at?: string;
          workspace_id: string;
        };
        Update: {
          body?: string;
          business_problem?: string;
          created_at?: string;
          created_by?: string;
          id?: string;
          primary_lane?: string;
          source_media_path?: string | null;
          source_metadata?: Json;
          source_type?: string;
          source_url?: string | null;
          status?: string;
          updated_at?: string;
          workspace_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "content_ideas_workspace_id_fkey";
            columns: ["workspace_id"];
            isOneToOne: false;
            referencedRelation: "workspaces";
            referencedColumns: ["id"];
          },
        ];
      };
      profiles: {
        Row: {
          avatar_url: string | null;
          created_at: string;
          full_name: string;
          id: string;
          job_title: string;
          onboarding_completed: boolean;
          phone: string;
          timezone: string;
          updated_at: string;
        };
        Insert: {
          avatar_url?: string | null;
          created_at?: string;
          full_name?: string;
          id: string;
          job_title?: string;
          onboarding_completed?: boolean;
          phone?: string;
          timezone?: string;
          updated_at?: string;
        };
        Update: {
          avatar_url?: string | null;
          created_at?: string;
          full_name?: string;
          id?: string;
          job_title?: string;
          onboarding_completed?: boolean;
          phone?: string;
          timezone?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      service_requests: {
        Row: {
          campaign_id: string | null;
          created_at: string;
          id: string;
          notes: string;
          request_type: string;
          status: string;
          updated_at: string;
          user_id: string;
          workspace_id: string;
        };
        Insert: {
          campaign_id?: string | null;
          created_at?: string;
          id?: string;
          notes?: string;
          request_type: string;
          status?: string;
          updated_at?: string;
          user_id: string;
          workspace_id: string;
        };
        Update: {
          campaign_id?: string | null;
          created_at?: string;
          id?: string;
          notes?: string;
          request_type?: string;
          status?: string;
          updated_at?: string;
          user_id?: string;
          workspace_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "service_requests_campaign_id_fkey";
            columns: ["campaign_id"];
            isOneToOne: false;
            referencedRelation: "campaigns";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "service_requests_workspace_id_fkey";
            columns: ["workspace_id"];
            isOneToOne: false;
            referencedRelation: "workspaces";
            referencedColumns: ["id"];
          },
        ];
      };
      usage_events: {
        Row: {
          action: string;
          campaign_id: string | null;
          completed_at: string | null;
          created_at: string;
          id: string;
          idempotency_key: string;
          metadata: Json;
          provider_cost_cents: number | null;
          status: string;
          units: number;
          user_id: string;
          workspace_id: string;
        };
        Insert: {
          action: string;
          campaign_id?: string | null;
          completed_at?: string | null;
          created_at?: string;
          id?: string;
          idempotency_key: string;
          metadata?: Json;
          provider_cost_cents?: number | null;
          status?: string;
          units: number;
          user_id: string;
          workspace_id: string;
        };
        Update: {
          action?: string;
          campaign_id?: string | null;
          completed_at?: string | null;
          created_at?: string;
          id?: string;
          idempotency_key?: string;
          metadata?: Json;
          provider_cost_cents?: number | null;
          status?: string;
          units?: number;
          user_id?: string;
          workspace_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "usage_events_campaign_id_fkey";
            columns: ["campaign_id"];
            isOneToOne: false;
            referencedRelation: "campaigns";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "usage_events_workspace_id_fkey";
            columns: ["workspace_id"];
            isOneToOne: false;
            referencedRelation: "workspaces";
            referencedColumns: ["id"];
          },
        ];
      };
      workspace_invites: {
        Row: {
          accepted_at: string | null;
          created_at: string;
          email: string;
          expires_at: string;
          id: string;
          invited_by: string;
          role: string;
          token_hash: string;
          workspace_id: string;
        };
        Insert: {
          accepted_at?: string | null;
          created_at?: string;
          email: string;
          expires_at?: string;
          id?: string;
          invited_by: string;
          role?: string;
          token_hash: string;
          workspace_id: string;
        };
        Update: {
          accepted_at?: string | null;
          created_at?: string;
          email?: string;
          expires_at?: string;
          id?: string;
          invited_by?: string;
          role?: string;
          token_hash?: string;
          workspace_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "workspace_invites_workspace_id_fkey";
            columns: ["workspace_id"];
            isOneToOne: false;
            referencedRelation: "workspaces";
            referencedColumns: ["id"];
          },
        ];
      };
      workspace_members: {
        Row: {
          created_at: string;
          role: string;
          user_id: string;
          workspace_id: string;
        };
        Insert: {
          created_at?: string;
          role?: string;
          user_id: string;
          workspace_id: string;
        };
        Update: {
          created_at?: string;
          role?: string;
          user_id?: string;
          workspace_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "workspace_members_workspace_id_fkey";
            columns: ["workspace_id"];
            isOneToOne: false;
            referencedRelation: "workspaces";
            referencedColumns: ["id"];
          },
        ];
      };
      workspace_settings: {
        Row: {
          ai_memory: Json;
          default_depth: string;
          email_campaign_ready: boolean;
          email_palmer_support: boolean;
          email_usage_alerts: boolean;
          last_briefing_at: string | null;
          preferred_pal: string;
          updated_at: string;
          week_starts_on: number;
          workspace_id: string;
        };
        Insert: {
          ai_memory?: Json;
          default_depth?: string;
          email_campaign_ready?: boolean;
          email_palmer_support?: boolean;
          email_usage_alerts?: boolean;
          last_briefing_at?: string | null;
          preferred_pal?: string;
          updated_at?: string;
          week_starts_on?: number;
          workspace_id: string;
        };
        Update: {
          ai_memory?: Json;
          default_depth?: string;
          email_campaign_ready?: boolean;
          email_palmer_support?: boolean;
          email_usage_alerts?: boolean;
          last_briefing_at?: string | null;
          preferred_pal?: string;
          updated_at?: string;
          week_starts_on?: number;
          workspace_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "workspace_settings_workspace_id_fkey";
            columns: ["workspace_id"];
            isOneToOne: true;
            referencedRelation: "workspaces";
            referencedColumns: ["id"];
          },
        ];
      };
      workspace_video_items: {
        Row: {
          campaign_id: string | null;
          item_key: string;
          notes: string;
          status: string;
          updated_at: string;
          workspace_id: string;
        };
        Insert: {
          campaign_id?: string | null;
          item_key: string;
          notes?: string;
          status?: string;
          updated_at?: string;
          workspace_id: string;
        };
        Update: {
          campaign_id?: string | null;
          item_key?: string;
          notes?: string;
          status?: string;
          updated_at?: string;
          workspace_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "workspace_video_items_campaign_id_fkey";
            columns: ["campaign_id"];
            isOneToOne: false;
            referencedRelation: "campaigns";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "workspace_video_items_workspace_id_fkey";
            columns: ["workspace_id"];
            isOneToOne: false;
            referencedRelation: "workspaces";
            referencedColumns: ["id"];
          },
        ];
      };
      workspace_subscriptions: {
        Row: {
          billing_interval: string;
          campaign_allowance: number;
          cancel_at_period_end: boolean;
          current_period_end: string;
          current_period_start: string;
          plan: string;
          status: string;
          stripe_customer_id: string | null;
          stripe_subscription_id: string | null;
          trial_ends_at: string;
          updated_at: string;
          workspace_id: string;
        };
        Insert: {
          billing_interval?: string;
          campaign_allowance?: number;
          cancel_at_period_end?: boolean;
          current_period_end?: string;
          current_period_start?: string;
          plan?: string;
          status?: string;
          stripe_customer_id?: string | null;
          stripe_subscription_id?: string | null;
          trial_ends_at?: string;
          updated_at?: string;
          workspace_id: string;
        };
        Update: {
          billing_interval?: string;
          campaign_allowance?: number;
          cancel_at_period_end?: boolean;
          current_period_end?: string;
          current_period_start?: string;
          plan?: string;
          status?: string;
          stripe_customer_id?: string | null;
          stripe_subscription_id?: string | null;
          trial_ends_at?: string;
          updated_at?: string;
          workspace_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "workspace_subscriptions_workspace_id_fkey";
            columns: ["workspace_id"];
            isOneToOne: true;
            referencedRelation: "workspaces";
            referencedColumns: ["id"];
          },
        ];
      };
      workspaces: {
        Row: {
          created_at: string;
          created_by: string;
          id: string;
          name: string;
          slug: string;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          created_by: string;
          id?: string;
          name: string;
          slug: string;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          created_by?: string;
          id?: string;
          name?: string;
          slug?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      finish_campaign_usage: {
        Args: { outcome: string; target_event_id: string };
        Returns: undefined;
      };
      reserve_campaign_usage: {
        Args: {
          request_key: string;
          target_campaign_id: string;
          target_workspace_id: string;
        };
        Returns: string;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] & DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    keyof DefaultSchema["Tables"] | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    keyof DefaultSchema["Tables"] | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    keyof DefaultSchema["Enums"] | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    keyof DefaultSchema["CompositeTypes"] | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  public: {
    Enums: {},
  },
} as const;
