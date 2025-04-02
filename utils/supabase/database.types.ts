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
      [_ in never]: never
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

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
