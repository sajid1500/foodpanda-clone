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
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      addon_groups: {
        Row: {
          id: string
          is_required: boolean
          name: string
        }
        Insert: {
          id?: string
          is_required: boolean
          name: string
        }
        Update: {
          id?: string
          is_required?: boolean
          name?: string
        }
        Relationships: []
      }
      addons: {
        Row: {
          addon_group_id: string
          id: number
          name: string
          price: number
        }
        Insert: {
          addon_group_id?: string
          id?: number
          name: string
          price: number
        }
        Update: {
          addon_group_id?: string
          id?: number
          name?: string
          price?: number
        }
        Relationships: [
          {
            foreignKeyName: "addons_addon_group_id_fkey"
            columns: ["addon_group_id"]
            isOneToOne: false
            referencedRelation: "addon_groups"
            referencedColumns: ["id"]
          },
        ]
      }
      categories: {
        Row: {
          id: string
          name: string
        }
        Insert: {
          id?: string
          name?: string
        }
        Update: {
          id?: string
          name?: string
        }
        Relationships: []
      }
      menu_items: {
        Row: {
          category_id: string
          created_at: string
          description: string
          id: string
          image_path: string
          is_available: boolean
          name: string
          price: number
          restaurant_id: string
        }
        Insert: {
          category_id?: string
          created_at?: string
          description?: string
          id?: string
          image_path?: string
          is_available?: boolean
          name?: string
          price: number
          restaurant_id: string
        }
        Update: {
          category_id?: string
          created_at?: string
          description?: string
          id?: string
          image_path?: string
          is_available?: boolean
          name?: string
          price?: number
          restaurant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "menu_items_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "menu_items_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "menu_items_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants_display"
            referencedColumns: ["id"]
          },
        ]
      }
      order_items: {
        Row: {
          created_at: string
          id: string
          menu_item_id: string
          name: string
          notes: string
          order_id: string
          quantity: number
          unit_price: number
        }
        Insert: {
          created_at?: string
          id?: string
          menu_item_id: string
          name: string
          notes?: string
          order_id: string
          quantity: number
          unit_price: number
        }
        Update: {
          created_at?: string
          id?: string
          menu_item_id?: string
          name?: string
          notes?: string
          order_id?: string
          quantity?: number
          unit_price?: number
        }
        Relationships: [
          {
            foreignKeyName: "order_items_menu_item_id_fkey"
            columns: ["menu_item_id"]
            isOneToOne: false
            referencedRelation: "menu_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          created_at: string
          delivery_address: Json
          delivery_discount: number
          delivery_fee: number
          id: string
          is_pro: boolean
          restaurant_address: Json
          restaurant_id: string
          status: string
          subtotal: number
          subtotal_discount: number
          total: number
          user_id: string
        }
        Insert: {
          created_at?: string
          delivery_address: Json
          delivery_discount?: number
          delivery_fee?: number
          id?: string
          is_pro?: boolean
          restaurant_address: Json
          restaurant_id: string
          status?: string
          subtotal?: number
          subtotal_discount?: number
          total: number
          user_id?: string
        }
        Update: {
          created_at?: string
          delivery_address?: Json
          delivery_discount?: number
          delivery_fee?: number
          id?: string
          is_pro?: boolean
          restaurant_address?: Json
          restaurant_id?: string
          status?: string
          subtotal?: number
          subtotal_discount?: number
          total?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "orders_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants_display"
            referencedColumns: ["id"]
          },
        ]
      }
      payments: {
        Row: {
          amount: number
          created_at: string
          id: string
          order_id: string
          payment_method: string
          status: string
          stripe_payment_id: string
        }
        Insert: {
          amount: number
          created_at?: string
          id?: string
          order_id?: string
          payment_method?: string
          status: string
          stripe_payment_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          id?: string
          order_id?: string
          payment_method?: string
          status?: string
          stripe_payment_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "payments_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      restaurants: {
        Row: {
          average_rating: number
          banner_path: string
          created_at: string
          id: string
          location: unknown
          logo_path: string
          name: string
          slug: string
        }
        Insert: {
          average_rating: number
          banner_path?: string
          created_at?: string
          id?: string
          location: unknown
          logo_path?: string
          name?: string
          slug: string
        }
        Update: {
          average_rating?: number
          banner_path?: string
          created_at?: string
          id?: string
          location?: unknown
          logo_path?: string
          name?: string
          slug?: string
        }
        Relationships: []
      }
      reviews: {
        Row: {
          comment: string | null
          created_at: string
          id: string
          rating: number
          restaurant_id: string | null
          user_name: string
        }
        Insert: {
          comment?: string | null
          created_at?: string
          id?: string
          rating: number
          restaurant_id?: string | null
          user_name: string
        }
        Update: {
          comment?: string | null
          created_at?: string
          id?: string
          rating?: number
          restaurant_id?: string | null
          user_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "reviews_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants_display"
            referencedColumns: ["id"]
          },
        ]
      }
      user_addresses: {
        Row: {
          address_line_1: string
          address_line_2: string
          city: string
          created_at: string
          house: string
          id: string
          is_default: boolean
          label: string
          location: unknown
          note: string
          place_id: string
          street: string
          user_id: string | null
        }
        Insert: {
          address_line_1?: string
          address_line_2?: string
          city?: string
          created_at?: string
          house?: string
          id?: string
          is_default?: boolean
          label?: string
          location: unknown
          note?: string
          place_id: string
          street?: string
          user_id?: string | null
        }
        Update: {
          address_line_1?: string
          address_line_2?: string
          city?: string
          created_at?: string
          house?: string
          id?: string
          is_default?: boolean
          label?: string
          location?: unknown
          note?: string
          place_id?: string
          street?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "addresses_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          created_at: string
          first_name: string | null
          id: string
          last_name: string | null
          phone: string | null
          roles: string[] | null
          stripe_id: string | null
        }
        Insert: {
          created_at?: string
          first_name?: string | null
          id: string
          last_name?: string | null
          phone?: string | null
          roles?: string[] | null
          stripe_id?: string | null
        }
        Update: {
          created_at?: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          phone?: string | null
          roles?: string[] | null
          stripe_id?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      restaurants_display: {
        Row: {
          average_rating: number | null
          banner_path: string | null
          coordinates: Json | null
          created_at: string | null
          id: string | null
          location: unknown
          logo_path: string | null
          name: string | null
          slug: string | null
        }
        Insert: {
          average_rating?: number | null
          banner_path?: string | null
          coordinates?: never
          created_at?: string | null
          id?: string | null
          location?: unknown
          logo_path?: string | null
          name?: string | null
          slug?: string | null
        }
        Update: {
          average_rating?: number | null
          banner_path?: string | null
          coordinates?: never
          created_at?: string | null
          id?: string | null
          location?: unknown
          logo_path?: string | null
          name?: string | null
          slug?: string | null
        }
        Relationships: []
      }
      user_addresses_display: {
        Row: {
          address_line_1: string | null
          address_line_2: string | null
          city: string | null
          coordinates: Json | null
          created_at: string | null
          house: string | null
          id: string | null
          is_default: boolean | null
          label: string | null
          location: unknown
          note: string | null
          place_id: string | null
          street: string | null
          user_id: string | null
        }
        Insert: {
          address_line_1?: string | null
          address_line_2?: string | null
          city?: string | null
          coordinates?: never
          created_at?: string | null
          house?: string | null
          id?: string | null
          is_default?: boolean | null
          label?: string | null
          location?: unknown
          note?: string | null
          place_id?: string | null
          street?: string | null
          user_id?: string | null
        }
        Update: {
          address_line_1?: string | null
          address_line_2?: string | null
          city?: string | null
          coordinates?: never
          created_at?: string | null
          house?: string | null
          id?: string | null
          is_default?: boolean | null
          label?: string | null
          location?: unknown
          note?: string | null
          place_id?: string | null
          street?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "addresses_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      cancel_expired_orders: { Args: never; Returns: undefined }
      generate_random_suffix: {
        Args: { max_len?: number; min_len?: number }
        Returns: string
      }
      generate_unique_restaurant_slug: {
        Args: { p_name: string }
        Returns: string
      }
      nearby_restaurants: {
        Args: { lat: number; lng: number; radius_meters?: number }
        Returns: {
          averageRating: number
          bannerPath: string
          createdAt: string
          distanceMeters: number
          id: string
          logoPath: string
          name: string
          slug: string
        }[]
      }
      place_order: {
        Args: {
          p_delivery_address: Json
          p_delivery_fee?: number
          p_items: Json
          p_payment_method?: string
          p_restaurant_address: Json
          p_restaurant_id: string
          p_stripe_payment_id: string
        }
        Returns: {
          delivery_fee: number
          order_id: string
          subtotal: number
          total: number
        }[]
      }
      place_team_order: {
        Args: {
          p_delivery_address: string
          p_delivery_fee: number
          p_items: Json
          p_restaurant_id: string
          p_total_amount: number
        }
        Returns: string
      }
      slugify: { Args: { name: string }; Returns: string }
    }
    Enums: {
      [_ in never]: never
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
    Enums: {},
  },
} as const
