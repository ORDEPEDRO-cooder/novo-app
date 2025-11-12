'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { User, Mail, Sparkles, DollarSign } from 'lucide-react'
import { supabase } from '@/lib/supabase'

interface UserSetupProps {
  onComplete: (userData: any) => void
}

export default function UserSetup({ onComplete }: UserSetupProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    skinType: '',
    concerns: [] as string[],
    level: '',
    budget: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const skinTypes = [
    { value: 'oleosa', label: 'Oleosa' },
    { value: 'seca', label: 'Seca' },
    { value: 'mista', label: 'Mista' },
    { value: 'sensivel', label: 'Sensível' },
    { value: 'normal', label: 'Normal' }
  ]

  const commonConcerns = [
    'Acne e espinhas',
    'Oleosidade excessiva',
    'Ressecamento',
    'Manchas e hiperpigmentação',
    'Rugas e linhas de expressão',
    'Poros dilatados',
    'Sensibilidade e irritação',
    'Falta de luminosidade'
  ]

  const levels = [
    { value: 'iniciante', label: 'Iniciante - Estou começando agora' },
    { value: 'intermediario', label: 'Intermediário - Já tenho alguma experiência' },
    { value: 'avancado', label: 'Avançado - Conheço bem sobre skincare' }
  ]

  const budgets = [
    { value: 'ate-100', label: 'Até R$100' },
    { value: '100-300', label: 'De R$100 a R$300' },
    { value: '300-600', label: 'De R$300 a R$600' },
    { value: 'acima-600', label: 'Acima de R$600' }
  ]

  const handleConcernChange = (concern: string, checked: boolean) => {
    if (checked) {
      setFormData(prev => ({
        ...prev,
        concerns: [...prev.concerns, concern]
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        concerns: prev.concerns.filter(c => c !== concern)
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Salvar no Supabase
      const { data, error } = await supabase
        .from('user_profiles')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            skin_type: formData.skinType,
            concerns: formData.concerns,
            level: formData.level,
            budget: formData.budget
          }
        ])
        .select()
        .single()

      if (error) {
        console.error('Erro ao salvar perfil:', error)
        // Continuar mesmo com erro (modo offline)
      }

      // Salvar no localStorage para persistência
      localStorage.setItem('userProfile', JSON.stringify({
        ...formData,
        id: data?.id || Date.now().toString()
      }))

      onComplete(formData)
    } catch (error) {
      console.error('Erro:', error)
      // Salvar localmente mesmo se falhar
      localStorage.setItem('userProfile', JSON.stringify({
        ...formData,
        id: Date.now().toString()
      }))
      onComplete(formData)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF5F5] via-white to-[#F0F8FF] flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl mx-auto shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader className="text-center pb-6">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-gradient-to-r from-[#B85450] to-[#D4A574] rounded-full">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-[#B85450] to-[#D4A574] bg-clip-text text-transparent">
            Vamos personalizar sua experiência
          </CardTitle>
          <p className="text-gray-600 mt-2">
            Conte-nos sobre você para criarmos a rotina perfeita
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Informações Básicas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center gap-2 text-gray-700">
                  <User className="w-4 h-4" />
                  Nome
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Seu nome"
                  className="border-gray-200 focus:border-[#B85450] focus:ring-[#B85450]"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2 text-gray-700">
                  <Mail className="w-4 h-4" />
                  E-mail
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="seu@email.com"
                  className="border-gray-200 focus:border-[#B85450] focus:ring-[#B85450]"
                  required
                />
              </div>
            </div>

            {/* Tipo de Pele */}
            <div className="space-y-2">
              <Label className="text-gray-700 font-medium">Qual é o seu tipo de pele?</Label>
              <Select value={formData.skinType} onValueChange={(value) => setFormData(prev => ({ ...prev, skinType: value }))}>
                <SelectTrigger className="border-gray-200 focus:border-[#B85450] focus:ring-[#B85450]">
                  <SelectValue placeholder="Selecione seu tipo de pele" />
                </SelectTrigger>
                <SelectContent>
                  {skinTypes.map(type => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Preocupações */}
            <div className="space-y-3">
              <Label className="text-gray-700 font-medium">Quais são suas principais preocupações? (selecione até 3)</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {commonConcerns.map(concern => (
                  <div key={concern} className="flex items-center space-x-2">
                    <Checkbox
                      id={concern}
                      checked={formData.concerns.includes(concern)}
                      onCheckedChange={(checked) => handleConcernChange(concern, checked as boolean)}
                      disabled={formData.concerns.length >= 3 && !formData.concerns.includes(concern)}
                      className="border-gray-300 data-[state=checked]:bg-[#B85450] data-[state=checked]:border-[#B85450]"
                    />
                    <Label htmlFor={concern} className="text-sm text-gray-600 cursor-pointer">
                      {concern}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Nível de Conhecimento */}
            <div className="space-y-2">
              <Label className="text-gray-700 font-medium">Qual é o seu nível de conhecimento em skincare?</Label>
              <Select value={formData.level} onValueChange={(value) => setFormData(prev => ({ ...prev, level: value }))}>
                <SelectTrigger className="border-gray-200 focus:border-[#B85450] focus:ring-[#B85450]">
                  <SelectValue placeholder="Selecione seu nível" />
                </SelectTrigger>
                <SelectContent>
                  {levels.map(level => (
                    <SelectItem key={level.value} value={level.value}>
                      {level.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Campo de Orçamento - NOVO */}
            <div className="space-y-2">
              <Label className="text-gray-700 font-medium flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                Qual é o seu orçamento mensal para skincare?
              </Label>
              <Select value={formData.budget} onValueChange={(value) => setFormData(prev => ({ ...prev, budget: value }))}>
                <SelectTrigger className="border-gray-200 focus:border-[#B85450] focus:ring-[#B85450]">
                  <SelectValue placeholder="Selecione seu orçamento" />
                </SelectTrigger>
                <SelectContent>
                  {budgets.map(budget => (
                    <SelectItem key={budget.value} value={budget.value}>
                      {budget.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Submit Button */}
            <Button 
              type="submit"
              className="w-full bg-gradient-to-r from-[#B85450] to-[#D4A574] hover:from-[#A04A46] hover:to-[#C19660] text-white font-medium py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 mt-8"
              disabled={!formData.name || !formData.email || !formData.skinType || !formData.level || !formData.budget || isSubmitting}
            >
              {isSubmitting ? 'Salvando...' : 'Criar meu perfil'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
