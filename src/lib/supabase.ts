import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Tipos para o banco de dados
export interface UserProfile {
  id: string
  name: string
  email: string
  skin_type: string
  concerns: string[]
  level: string
  budget: string
  created_at: string
  updated_at: string
}

export interface Product {
  id: string
  user_id: string
  name: string
  brand: string
  type: string
  image_url: string
  description?: string
  usage_time?: string
  in_routine: boolean
  created_at: string
}

export interface SkinProgress {
  id: string
  user_id: string
  image_url: string
  notes?: string
  created_at: string
}
