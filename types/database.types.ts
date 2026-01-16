export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1";
  };
  public: {
    Tables: {
      polar_customers: {
        Row: {
          id: string;
          polar_customer_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          polar_customer_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          polar_customer_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "polar_customers_id_fkey";
            columns: ["id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      polar_products: {
        Row: {
          id: string;
          active: boolean;
          name: string;
          description: string | null;
          image: string | null;
          metadata: Json;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          active?: boolean;
          name: string;
          description?: string | null;
          image?: string | null;
          metadata?: Json;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          active?: boolean;
          name?: string;
          description?: string | null;
          image?: string | null;
          metadata?: Json;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      polar_prices: {
        Row: {
          id: string;
          product_id: string | null;
          active: boolean;
          unit_amount: number | null;
          currency: string;
          type: Database["public"]["Enums"]["pricing_type"] | null;
          recurring_interval:
            | Database["public"]["Enums"]["pricing_interval"]
            | null;
          recurring_interval_count: number;
          metadata: Json;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          product_id?: string | null;
          active?: boolean;
          unit_amount?: number | null;
          currency?: string;
          type?: Database["public"]["Enums"]["pricing_type"] | null;
          recurring_interval?:
            | Database["public"]["Enums"]["pricing_interval"]
            | null;
          recurring_interval_count?: number;
          metadata?: Json;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          product_id?: string | null;
          active?: boolean;
          unit_amount?: number | null;
          currency?: string;
          type?: Database["public"]["Enums"]["pricing_type"] | null;
          recurring_interval?:
            | Database["public"]["Enums"]["pricing_interval"]
            | null;
          recurring_interval_count?: number;
          metadata?: Json;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "polar_prices_product_id_fkey";
            columns: ["product_id"];
            referencedRelation: "polar_products";
            referencedColumns: ["id"];
          },
        ];
      };
      polar_subscriptions: {
        Row: {
          id: string;
          user_id: string;
          polar_customer_id: string | null;
          status: Database["public"]["Enums"]["subscription_status"];
          price_id: string | null;
          product_id: string | null;
          cancel_at_period_end: boolean;
          canceled_at: string | null;
          current_period_start: string;
          current_period_end: string | null;
          created_at: string;
          ended_at: string | null;
          metadata: Json;
          updated_at: string;
        };
        Insert: {
          id: string;
          user_id: string;
          polar_customer_id?: string | null;
          status: Database["public"]["Enums"]["subscription_status"];
          price_id?: string | null;
          product_id?: string | null;
          cancel_at_period_end?: boolean;
          canceled_at?: string | null;
          current_period_start: string;
          current_period_end?: string | null;
          created_at?: string;
          ended_at?: string | null;
          metadata?: Json;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          polar_customer_id?: string | null;
          status?: Database["public"]["Enums"]["subscription_status"];
          price_id?: string | null;
          product_id?: string | null;
          cancel_at_period_end?: boolean;
          canceled_at?: string | null;
          current_period_start?: string;
          current_period_end?: string | null;
          created_at?: string;
          ended_at?: string | null;
          metadata?: Json;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "polar_subscriptions_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "polar_subscriptions_price_id_fkey";
            columns: ["price_id"];
            referencedRelation: "polar_prices";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "polar_subscriptions_product_id_fkey";
            columns: ["product_id"];
            referencedRelation: "polar_products";
            referencedColumns: ["id"];
          },
        ];
      };
      profiles: {
        Row: {
          created_at: string;
          id: string;
          name: string | null;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          name?: string | null;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          name?: string | null;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [];
      };
      saved_menus: {
        Row: {
          created_at: string;
          entradas: string[];
          id: string;
          last_used_at: string | null;
          name: string;
          platos: string[];
          use_count: number;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          entradas?: string[];
          id?: string;
          last_used_at?: string | null;
          name: string;
          platos?: string[];
          use_count?: number;
          user_id: string;
        };
        Update: {
          created_at?: string;
          entradas?: string[];
          id?: string;
          last_used_at?: string | null;
          name?: string;
          platos?: string[];
          use_count?: number;
          user_id?: string;
        };
        Relationships: [];
      };
      user_preferences: {
        Row: {
          created_at: string;
          hydration_enabled: boolean | null;
          hydration_frequency: string | null;
          id: string;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          hydration_enabled?: boolean | null;
          hydration_frequency?: string | null;
          id?: string;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          hydration_enabled?: boolean | null;
          hydration_frequency?: string | null;
          id?: string;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [];
      };
      subscriptions: {
        Row: {
          id: string;
          user_id: string | null;
          polar_customer_id: string | null;
          polar_subscription_id: string | null;
          status: string | null;
          plan: string | null;
          current_period_start: string | null;
          current_period_end: string | null;
          created_at: string | null;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          polar_customer_id?: string | null;
          polar_subscription_id?: string | null;
          status?: string | null;
          plan?: string | null;
          current_period_start?: string | null;
          current_period_end?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          polar_customer_id?: string | null;
          polar_subscription_id?: string | null;
          status?: string | null;
          plan?: string | null;
          current_period_start?: string | null;
          current_period_end?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "subscriptions_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      user_credits: {
        Row: {
          user_id: string;
          credits_remaining: number;
          last_reset_date: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          user_id: string;
          credits_remaining?: number;
          last_reset_date?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          user_id?: string;
          credits_remaining?: number;
          last_reset_date?: string;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "user_credits_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      pricing_type: "one_time" | "recurring";
      pricing_interval: "day" | "week" | "month" | "year";
      subscription_status:
        | "incomplete"
        | "incomplete_expired"
        | "trialing"
        | "active"
        | "past_due"
        | "canceled"
        | "unpaid";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<
  keyof Database,
  "public"
>];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
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
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
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
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  public: {
    Enums: {
      pricing_type: ["one_time", "recurring"],
      pricing_interval: ["day", "week", "month", "year"],
      subscription_status: [
        "incomplete",
        "incomplete_expired",
        "trialing",
        "active",
        "past_due",
        "canceled",
        "unpaid",
      ],
    },
  },
} as const;
