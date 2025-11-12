import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Simulação de dados para o MVP
export const mockProducts = [
  {
    id: '1',
    name: 'Sérum Ácido Hialurônico',
    brand: 'The Ordinary',
    type: 'serum' as const,
    activeIngredients: ['Ácido Hialurônico', 'Vitamina B5'],
    description: 'Hidratação intensa para todos os tipos de pele',
    usage: 'Aplique após a limpeza, antes do hidratante',
    priceRange: 'medio' as const,
    imageUrl: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=400&fit=crop'
  },
  {
    id: '2',
    name: 'Protetor Solar FPS 60',
    brand: 'La Roche-Posay',
    type: 'protetor' as const,
    activeIngredients: ['Óxido de Zinco', 'Dióxido de Titânio'],
    description: 'Proteção solar de amplo espectro',
    usage: 'Aplique pela manhã como último passo da rotina',
    priceRange: 'premium' as const,
    imageUrl: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=400&h=400&fit=crop'
  }
]

export const mockUser = {
  id: '1',
  name: 'Maria Silva',
  email: 'maria@email.com',
  skinType: 'mista' as const,
  concerns: ['Oleosidade na zona T', 'Poros dilatados'],
  level: 'intermediario' as const,
  plan: 'free' as const,
  createdAt: new Date()
}

// Função para simular análise de IA
export function analyzeProduct(productName: string) {
  return {
    name: productName,
    brand: 'Marca Detectada',
    type: 'serum',
    activeIngredients: ['Ingrediente Principal'],
    description: 'Este produto foi identificado pela IA. Ideal para hidratação e cuidados diários.',
    usage: 'Aplique após a limpeza, seguindo sua rotina habitual.',
    alternatives: {
      barato: 'Alternativa econômica similar',
      similar: 'Produto com composição parecida',
      premium: 'Versão premium com ingredientes adicionais'
    }
  }
}

// Função para simular chat com IA
export function getChatResponse(message: string) {
  const responses = [
    'Com base no seu tipo de pele e produtos cadastrados, recomendo...',
    'Essa combinação é segura! Você pode usar esses produtos juntos.',
    'Cuidado com essa mistura. Recomendo usar em dias alternados.',
    'Para sua pele mista, sugiro focar na hidratação da zona seca.'
  ]
  
  return responses[Math.floor(Math.random() * responses.length)]
}