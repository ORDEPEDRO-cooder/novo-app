'use client'

import { useState, useEffect } from 'react'
import Onboarding from '@/components/custom/onboarding'
import UserSetup from '@/components/custom/user-setup'
import Dashboard from '@/components/custom/dashboard'
import SkinMatch from '@/components/custom/skinmatch'
import ProductScan from '@/components/custom/product-scan'
import ChatAI from '@/components/custom/chat-ai'
import { mockUser } from '@/lib/utils'

type AppState = 'onboarding' | 'setup' | 'dashboard' | 'skinmatch' | 'product-scan' | 'chat' | 'progress' | 'learn'

export default function SkinGuideApp() {
  const [currentState, setCurrentState] = useState<AppState>('onboarding')
  const [user, setUser] = useState(mockUser)

  // Verificar se usuário já está logado (autenticação persistente)
  useEffect(() => {
    const savedProfile = localStorage.getItem('userProfile')
    if (savedProfile) {
      try {
        const profile = JSON.parse(savedProfile)
        setUser(prev => ({ ...prev, ...profile }))
        setCurrentState('dashboard')
      } catch (error) {
        console.error('Erro ao carregar perfil:', error)
      }
    }
  }, [])

  const handleOnboardingComplete = () => {
    setCurrentState('setup')
  }

  const handleUserSetupComplete = (userData: any) => {
    setUser(prev => ({ ...prev, ...userData }))
    setCurrentState('dashboard')
  }

  const handleNavigation = (section: string) => {
    setCurrentState(section as AppState)
  }

  const handleBackToDashboard = () => {
    setCurrentState('dashboard')
  }

  // Renderização condicional baseada no estado atual
  switch (currentState) {
    case 'onboarding':
      return <Onboarding onComplete={handleOnboardingComplete} />
    
    case 'setup':
      return <UserSetup onComplete={handleUserSetupComplete} />
    
    case 'dashboard':
      return <Dashboard user={user} onNavigate={handleNavigation} />
    
    case 'skinmatch':
      return <SkinMatch onBack={handleBackToDashboard} />
    
    case 'product-scan':
      return <ProductScan onBack={handleBackToDashboard} userId={user.id} />
    
    case 'chat':
      return <ChatAI onBack={handleBackToDashboard} user={user} />
    
    case 'progress':
      return (
        <div className="min-h-screen bg-gradient-to-br from-[#FFF5F5] via-white to-[#F0F8FF] flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Acompanhamento de Progresso</h2>
            <p className="text-gray-600 mb-6">Funcionalidade em desenvolvimento</p>
            <button
              onClick={handleBackToDashboard}
              className="bg-gradient-to-r from-[#B85450] to-[#D4A574] text-white px-6 py-2 rounded-lg hover:opacity-90 transition-opacity"
            >
              Voltar ao Dashboard
            </button>
          </div>
        </div>
      )
    
    case 'learn':
      return (
        <div className="min-h-screen bg-gradient-to-br from-[#FFF5F5] via-white to-[#F0F8FF] flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Biblioteca Educativa</h2>
            <p className="text-gray-600 mb-6">Conteúdo educativo em desenvolvimento</p>
            <button
              onClick={handleBackToDashboard}
              className="bg-gradient-to-r from-[#B85450] to-[#D4A574] text-white px-6 py-2 rounded-lg hover:opacity-90 transition-opacity"
            >
              Voltar ao Dashboard
            </button>
          </div>
        </div>
      )
    
    default:
      return <Dashboard user={user} onNavigate={handleNavigation} />
  }
}
