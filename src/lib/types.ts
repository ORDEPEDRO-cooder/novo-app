// Tipos para o SkinGuide IA
export interface User {
  id: string
  name: string
  email: string
  skinType: 'oleosa' | 'seca' | 'mista' | 'sensivel' | 'normal'
  concerns: string[]
  level: 'iniciante' | 'intermediario' | 'avancado'
  plan: 'free' | 'premium'
  createdAt: Date
}

export interface Product {
  id: string
  name: string
  brand: string
  type: 'serum' | 'tonico' | 'hidratante' | 'protetor' | 'acido' | 'mascara' | 'limpeza'
  activeIngredients: string[]
  description: string
  usage: string
  priceRange: 'barato' | 'medio' | 'premium'
  imageUrl?: string
}

export interface SkinAnalysis {
  id: string
  userId: string
  photoUrl: string
  date: Date
  aiAnalysis: {
    skinType: string
    concerns: string[]
    recommendations: string[]
    score: number
  }
}

export interface Routine {
  id: string
  userId: string
  morning: Product[]
  evening: Product[]
  weekly: Product[]
  createdAt: Date
  updatedAt: Date
}

export interface AIChat {
  id: string
  userId: string
  message: string
  response: string
  timestamp: Date
}

export interface Subscription {
  id: string
  userId: string
  plan: 'free' | 'premium'
  status: 'active' | 'cancelled' | 'expired'
  expiresAt?: Date
  paymentMethod?: string
}