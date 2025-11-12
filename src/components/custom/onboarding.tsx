'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ChevronRight, Sparkles, Camera, TrendingUp } from 'lucide-react'

interface OnboardingProps {
  onComplete: () => void
}

export default function Onboarding({ onComplete }: OnboardingProps) {
  const [currentStep, setCurrentStep] = useState(0)

  const steps = [
    {
      icon: <Sparkles className="w-16 h-16 text-[#D4A574]" />,
      title: "Monte sua rotina ideal de skincare",
      description: "Receba recomendações personalizadas baseadas no seu tipo de pele e necessidades específicas"
    },
    {
      icon: <Camera className="w-16 h-16 text-[#B85450]" />,
      title: "Fotografe seus produtos e o app explica",
      description: "Nossa IA identifica produtos, explica ingredientes e sugere alternativas em diferentes faixas de preço"
    },
    {
      icon: <TrendingUp className="w-16 h-16 text-[#87CEEB]" />,
      title: "Acompanhe a evolução da sua pele",
      description: "Registre fotos, monitore progresso e receba insights personalizados sobre sua jornada de skincare"
    }
  ]

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      onComplete()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF5F5] via-white to-[#F0F8FF] flex items-center justify-center p-4">
      <Card className="w-full max-w-md mx-auto shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
        <CardContent className="p-8 text-center">
          {/* Logo */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-[#B85450] to-[#D4A574] bg-clip-text text-transparent">
              SkinGuide IA
            </h1>
            <p className="text-sm text-gray-500 mt-1">Sua consultora de skincare</p>
          </div>

          {/* Step Indicator */}
          <div className="flex justify-center mb-8 space-x-2">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentStep 
                    ? 'bg-[#B85450] w-8' 
                    : index < currentStep 
                      ? 'bg-[#D4A574]' 
                      : 'bg-gray-200'
                }`}
              />
            ))}
          </div>

          {/* Content */}
          <div className="mb-8 space-y-6">
            <div className="flex justify-center">
              {steps[currentStep].icon}
            </div>
            
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800 leading-tight">
                {steps[currentStep].title}
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                {steps[currentStep].description}
              </p>
            </div>
          </div>

          {/* Action Button */}
          <Button 
            onClick={nextStep}
            className="w-full bg-gradient-to-r from-[#B85450] to-[#D4A574] hover:from-[#A04A46] hover:to-[#C19660] text-white font-medium py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            {currentStep === steps.length - 1 ? 'Começar' : 'Continuar'}
            <ChevronRight className="ml-2 w-4 h-4" />
          </Button>

          {/* Skip Option */}
          {currentStep < steps.length - 1 && (
            <button 
              onClick={onComplete}
              className="mt-4 text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              Pular apresentação
            </button>
          )}
        </CardContent>
      </Card>
    </div>
  )
}