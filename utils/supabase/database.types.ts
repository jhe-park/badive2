export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      bye: {
        Row: {
          created_at: string
          email: string | null
          id: number
          SNS: boolean | null
          uuid: string | null
        }
        Insert: {
          created_at?: string
          email?: string | null
          id?: number
          SNS?: boolean | null
          uuid?: string | null
        }
        Update: {
          created_at?: string
          email?: string | null
          id?: number
          SNS?: boolean | null
          uuid?: string | null
        }
        Relationships: []
      }
      faq: {
        Row: {
          answer: string | null
          created_at: string
          id: number
          question: string | null
        }
        Insert: {
          answer?: string | null
          created_at?: string
          id?: number
          question?: string | null
        }
        Update: {
          answer?: string | null
          created_at?: string
          id?: number
          question?: string | null
        }
        Relationships: []
      }
      instructor: {
        Row: {
          available: boolean | null
          birth: string | null
          certifications: string | null
          created_at: string
          email: string | null
          etc: string | null
          experience: boolean | null
          freediving: boolean | null
          gender: string | null
          id: number
          license: Json | null
          mermaid: boolean | null
          name: string | null
          no_license: number | null
          no_tour: number | null
          phone: string | null
          profile_image: string | null
          region: string | null
          role: Database["public"]["Enums"]["instructor_role"] | null
          scuba: boolean | null
          underwater: boolean | null
        }
        Insert: {
          available?: boolean | null
          birth?: string | null
          certifications?: string | null
          created_at?: string
          email?: string | null
          etc?: string | null
          experience?: boolean | null
          freediving?: boolean | null
          gender?: string | null
          id?: number
          license?: Json | null
          mermaid?: boolean | null
          name?: string | null
          no_license?: number | null
          no_tour?: number | null
          phone?: string | null
          profile_image?: string | null
          region?: string | null
          role?: Database["public"]["Enums"]["instructor_role"] | null
          scuba?: boolean | null
          underwater?: boolean | null
        }
        Update: {
          available?: boolean | null
          birth?: string | null
          certifications?: string | null
          created_at?: string
          email?: string | null
          etc?: string | null
          experience?: boolean | null
          freediving?: boolean | null
          gender?: string | null
          id?: number
          license?: Json | null
          mermaid?: boolean | null
          name?: string | null
          no_license?: number | null
          no_tour?: number | null
          phone?: string | null
          profile_image?: string | null
          region?: string | null
          role?: Database["public"]["Enums"]["instructor_role"] | null
          scuba?: boolean | null
          underwater?: boolean | null
        }
        Relationships: []
      }
      notification: {
        Row: {
          created_at: string
          description: string | null
          id: number
          pinned: string | null
          title: string | null
          writer: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: number
          pinned?: string | null
          title?: string | null
          writer?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: number
          pinned?: string | null
          title?: string | null
          writer?: string | null
        }
        Relationships: []
      }
      order: {
        Row: {
          created_at: string
          id: number
          instructor_id: number | null
          name: string | null
          participants: number | null
          price: number | null
          program_id: number | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          instructor_id?: number | null
          name?: string | null
          participants?: number | null
          price?: number | null
          program_id?: number | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          instructor_id?: number | null
          name?: string | null
          participants?: number | null
          price?: number | null
          program_id?: number | null
          user_id?: string | null
        }
        Relationships: []
      }
      pending_sessions: {
        Row: {
          created_at: string
          id: number
          profile: Json | null
          selected_data: Json | null
          user_data: Json | null
          uuid: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          profile?: Json | null
          selected_data?: Json | null
          user_data?: Json | null
          uuid?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          profile?: Json | null
          selected_data?: Json | null
          user_data?: Json | null
          uuid?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          birth: string | null
          bye: boolean | null
          classWant1: string | null
          classWant2: string | null
          classWant3: string | null
          created_at: string | null
          email: string | null
          etc: string | null
          failCount: number | null
          firstAddress: string | null
          full_name: string | null
          gender: string | null
          id: string
          image: string | null
          license: string | null
          marketingAgreement: boolean | null
          marketingEmail: boolean | null
          marketingSms: boolean | null
          name: string | null
          naverLogin: boolean | null
          phone: string | null
          point: number | null
          postCode: string | null
          role: string | null
          secondAddress: string | null
          snsRegister: boolean | null
          updated_at: string | null
          username: string | null
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          birth?: string | null
          bye?: boolean | null
          classWant1?: string | null
          classWant2?: string | null
          classWant3?: string | null
          created_at?: string | null
          email?: string | null
          etc?: string | null
          failCount?: number | null
          firstAddress?: string | null
          full_name?: string | null
          gender?: string | null
          id: string
          image?: string | null
          license?: string | null
          marketingAgreement?: boolean | null
          marketingEmail?: boolean | null
          marketingSms?: boolean | null
          name?: string | null
          naverLogin?: boolean | null
          phone?: string | null
          point?: number | null
          postCode?: string | null
          role?: string | null
          secondAddress?: string | null
          snsRegister?: boolean | null
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          birth?: string | null
          bye?: boolean | null
          classWant1?: string | null
          classWant2?: string | null
          classWant3?: string | null
          created_at?: string | null
          email?: string | null
          etc?: string | null
          failCount?: number | null
          firstAddress?: string | null
          full_name?: string | null
          gender?: string | null
          id?: string
          image?: string | null
          license?: string | null
          marketingAgreement?: boolean | null
          marketingEmail?: boolean | null
          marketingSms?: boolean | null
          name?: string | null
          naverLogin?: boolean | null
          phone?: string | null
          point?: number | null
          postCode?: string | null
          role?: string | null
          secondAddress?: string | null
          snsRegister?: boolean | null
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Relationships: []
      }
      program: {
        Row: {
          available: boolean | null
          category: string | null
          created_at: string
          id: number
          images: string | null
          instructor_id: number | null
          participants: number | null
          price: number | null
          region: string | null
          title: string | null
        }
        Insert: {
          available?: boolean | null
          category?: string | null
          created_at?: string
          id?: number
          images?: string | null
          instructor_id?: number | null
          participants?: number | null
          price?: number | null
          region?: string | null
          title?: string | null
        }
        Update: {
          available?: boolean | null
          category?: string | null
          created_at?: string
          id?: number
          images?: string | null
          instructor_id?: number | null
          participants?: number | null
          price?: number | null
          region?: string | null
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "program_instructor_id_fkey"
            columns: ["instructor_id"]
            isOneToOne: false
            referencedRelation: "instructor"
            referencedColumns: ["id"]
          },
        ]
      }
      request: {
        Row: {
          birth: string | null
          callTime: string | null
          created_at: string
          email: string | null
          gender: string | null
          id: number
          is_end: string | null
          license: string | null
          name: string | null
          phone: string | null
          region: string | null
          status: string | null
          tour_id: number | null
          user_id: string | null
        }
        Insert: {
          birth?: string | null
          callTime?: string | null
          created_at?: string
          email?: string | null
          gender?: string | null
          id?: number
          is_end?: string | null
          license?: string | null
          name?: string | null
          phone?: string | null
          region?: string | null
          status?: string | null
          tour_id?: number | null
          user_id?: string | null
        }
        Update: {
          birth?: string | null
          callTime?: string | null
          created_at?: string
          email?: string | null
          gender?: string | null
          id?: number
          is_end?: string | null
          license?: string | null
          name?: string | null
          phone?: string | null
          region?: string | null
          status?: string | null
          tour_id?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "request_tour_id_fkey"
            columns: ["tour_id"]
            isOneToOne: false
            referencedRelation: "tour"
            referencedColumns: ["id"]
          },
        ]
      }
      requestInstructor: {
        Row: {
          birth: string | null
          callTime: string | null
          created_at: string
          email: string | null
          gender: string | null
          id: number
          license: string | null
          name: string | null
          phone: string | null
          program: string | null
          region: string | null
        }
        Insert: {
          birth?: string | null
          callTime?: string | null
          created_at?: string
          email?: string | null
          gender?: string | null
          id?: number
          license?: string | null
          name?: string | null
          phone?: string | null
          program?: string | null
          region?: string | null
        }
        Update: {
          birth?: string | null
          callTime?: string | null
          created_at?: string
          email?: string | null
          gender?: string | null
          id?: number
          license?: string | null
          name?: string | null
          phone?: string | null
          program?: string | null
          region?: string | null
        }
        Relationships: []
      }
      reservation: {
        Row: {
          amount: number | null
          created_at: string
          id: number
          instructor_id: number | null
          order_id: string | null
          participants: number | null
          pay_type: string | null
          payment_key: string | null
          program_price: number | null
          status: string | null
          time_slot_id: number | null
          user_id: string | null
        }
        Insert: {
          amount?: number | null
          created_at?: string
          id?: number
          instructor_id?: number | null
          order_id?: string | null
          participants?: number | null
          pay_type?: string | null
          payment_key?: string | null
          program_price?: number | null
          status?: string | null
          time_slot_id?: number | null
          user_id?: string | null
        }
        Update: {
          amount?: number | null
          created_at?: string
          id?: number
          instructor_id?: number | null
          order_id?: string | null
          participants?: number | null
          pay_type?: string | null
          payment_key?: string | null
          program_price?: number | null
          status?: string | null
          time_slot_id?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reservation_instructor_id_fkey"
            columns: ["instructor_id"]
            isOneToOne: false
            referencedRelation: "instructor"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reservation_time_slot_id_fkey"
            columns: ["time_slot_id"]
            isOneToOne: false
            referencedRelation: "timeslot"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reservation_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      resort: {
        Row: {
          ceo: string | null
          created_at: string
          date: string | null
          etc: string | null
          id: number
          image: string | null
          region: string | null
          title: string | null
          url: string | null
        }
        Insert: {
          ceo?: string | null
          created_at?: string
          date?: string | null
          etc?: string | null
          id?: number
          image?: string | null
          region?: string | null
          title?: string | null
          url?: string | null
        }
        Update: {
          ceo?: string | null
          created_at?: string
          date?: string | null
          etc?: string | null
          id?: number
          image?: string | null
          region?: string | null
          title?: string | null
          url?: string | null
        }
        Relationships: []
      }
      timeslot: {
        Row: {
          available: boolean | null
          created_at: string
          current_participants: number | null
          date: string | null
          end_time: string | null
          id: number
          instructor_id: number | null
          max_participants: number | null
          program_id: number | null
          start_time: string | null
          unique_id: string | null
        }
        Insert: {
          available?: boolean | null
          created_at?: string
          current_participants?: number | null
          date?: string | null
          end_time?: string | null
          id?: number
          instructor_id?: number | null
          max_participants?: number | null
          program_id?: number | null
          start_time?: string | null
          unique_id?: string | null
        }
        Update: {
          available?: boolean | null
          created_at?: string
          current_participants?: number | null
          date?: string | null
          end_time?: string | null
          id?: number
          instructor_id?: number | null
          max_participants?: number | null
          program_id?: number | null
          start_time?: string | null
          unique_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "timeslot_instructor_id_fkey"
            columns: ["instructor_id"]
            isOneToOne: false
            referencedRelation: "instructor"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "timeslot_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "program"
            referencedColumns: ["id"]
          },
        ]
      }
      tour: {
        Row: {
          avilable: boolean | null
          ceo: string | null
          created_at: string
          current_participants: number | null
          date: string | null
          description: string | null
          etc: string | null
          id: number
          image: string | null
          max_participants: number | null
          price: number | null
          region: string | null
          status: string | null
          subtitle: string | null
          title: string | null
          view_count: number | null
        }
        Insert: {
          avilable?: boolean | null
          ceo?: string | null
          created_at?: string
          current_participants?: number | null
          date?: string | null
          description?: string | null
          etc?: string | null
          id?: number
          image?: string | null
          max_participants?: number | null
          price?: number | null
          region?: string | null
          status?: string | null
          subtitle?: string | null
          title?: string | null
          view_count?: number | null
        }
        Update: {
          avilable?: boolean | null
          ceo?: string | null
          created_at?: string
          current_participants?: number | null
          date?: string | null
          description?: string | null
          etc?: string | null
          id?: number
          image?: string | null
          max_participants?: number | null
          price?: number | null
          region?: string | null
          status?: string | null
          subtitle?: string | null
          title?: string | null
          view_count?: number | null
        }
        Relationships: []
      }
      tour_input: {
        Row: {
          amount: number | null
          created_at: string
          date: string | null
          id: number
        }
        Insert: {
          amount?: number | null
          created_at?: string
          date?: string | null
          id?: number
        }
        Update: {
          amount?: number | null
          created_at?: string
          date?: string | null
          id?: number
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      cancel_reservation: {
        Args: {
          reservation_id: number
          time_slot_id: number
          participants_count: number
        }
        Returns: number
      }
      create_reservation_transaction: {
        Args: {
          p_order_id: string
          p_time_slot_id: number
          p_user_id: string
          p_payment_key: string
          p_instructor_id: number
          p_amount: number
          p_pay_type: string
          p_payment_status: string
          p_number_of_participants_for_checkout: number
          p_program_price: number
        }
        Returns: Json
      }
      get_user_id_by_email: {
        Args: { email: string }
        Returns: {
          id: string
        }[]
      }
    }
    Enums: {
      gender: "male" | "female"
      instructor_role: "bdn" | "partner"
      order_status: "예약확정" | "확인중" | "예약취소"
      region: "서울" | "경기" | "인천" | "대전" | "대구" | "부산" | "경남"
      request_status: "확인중" | "예약완료" | "취소중" | "취소완료"
      role: "master" | "client" | "expert"
      tag_name: "마감임박" | "투어종료" | "투어중" | "마감"
      tour_status: "모집중" | "예약마감" | "투어종료"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      gender: ["male", "female"],
      instructor_role: ["bdn", "partner"],
      order_status: ["예약확정", "확인중", "예약취소"],
      region: ["서울", "경기", "인천", "대전", "대구", "부산", "경남"],
      request_status: ["확인중", "예약완료", "취소중", "취소완료"],
      role: ["master", "client", "expert"],
      tag_name: ["마감임박", "투어종료", "투어중", "마감"],
      tour_status: ["모집중", "예약마감", "투어종료"],
    },
  },
} as const
