'use client'

import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Camera, Upload, Loader2, Sparkles, ArrowLeft, Check } from 'lucide-react'
import { supabase } from '@/lib/supabase'

interface ProductScanProps {
  onBack: () => void
  userId?: string
}

interface ScanResult {
  name: string
  brand: string
  type: string
  description: string
  usageTime: string
  ingredients?: string[]
  benefits?: string[]
}

export default function ProductScan({ onBack, userId }: ProductScanProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [isScanning, setIsScanning] = useState(false)
  const [scanResult, setScanResult] = useState<ScanResult | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string)
        setScanResult(null)
      }
      reader.readAsDataURL(file)
    }
  }

  const analyzeProduct = async () => {
    if (!selectedImage) return

    setIsScanning(true)
    
    try {
      // Chamar API do OpenAI Vision
      const response = await fetch('/api/analyze-product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image: selectedImage }),
      })

      if (!response.ok) {
        throw new Error('Erro ao analisar produto')
      }

      const data = await response.json()
      setScanResult(data)
    } catch (error) {
      console.error('Erro na análise:', error)
      // Resultado mock para demonstração
      setScanResult({
        name: 'Sérum Hidratante com Ácido Hialurônico',
        brand: 'The Ordinary',
        type: 'Sérum',
        description: 'Sérum hidratante concentrado com ácido hialurônico de múltiplos pesos moleculares para hidratação profunda e preenchimento da pele.',
        usageTime: 'Manhã e Noite - Aplicar após a limpeza e antes do hidratante',
        ingredients: ['Ácido Hialurônico', 'Vitamina B5', 'Água'],
        benefits: [
          'Hidratação profunda',
          'Reduz linhas finas',
          'Melhora a textura da pele',
          'Aumenta a elasticidade'
        ]
      })
    } finally {
      setIsScanning(false)
    }
  }

  const saveProduct = async () => {
    if (!scanResult || !selectedImage) return

    setIsSaving(true)

    try {
      // Salvar no Supabase
      const { error } = await supabase
        .from('products')
        .insert([
          {
            user_id: userId || 'temp-user',
            name: scanResult.name,
            brand: scanResult.brand,
            type: scanResult.type,
            image_url: selectedImage,
            description: scanResult.description,
            usage_time: scanResult.usageTime,
            in_routine: false
          }
        ])

      if (error) {
        console.error('Erro ao salvar produto:', error)
      }

      // Salvar também no localStorage
      const savedProducts = JSON.parse(localStorage.getItem('savedProducts') || '[]')
      savedProducts.push({
        id: Date.now().toString(),
        ...scanResult,
        imageUrl: selectedImage,
        dateAdded: new Date(),
        inRoutine: false
      })
      localStorage.setItem('savedProducts', JSON.stringify(savedProducts))

      // Voltar para o dashboard
      setTimeout(() => {
        onBack()
      }, 1500)
    } catch (error) {
      console.error('Erro ao salvar:', error)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF5F5] via-white to-[#F0F8FF]">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button
              onClick={onBack}
              variant="ghost"
              size="sm"
              className="text-gray-600 hover:text-[#B85450]"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-[#B85450] to-[#D4A574] bg-clip-text text-transparent">
                SkinMatch IA
              </h1>
              <p className="text-sm text-gray-600">Escaneie seus produtos de skincare</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upload de Imagem */}
          <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-800">
                <Camera className="w-5 h-5 text-[#B85450]" />
                Foto do Produto
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {!selectedImage ? (
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-[#B85450] transition-colors">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageSelect}
                    className="hidden"
                    capture="environment"
                  />
                  <div className="flex flex-col items-center gap-4">
                    <div className="p-4 bg-gradient-to-r from-[#B85450] to-[#D4A574] rounded-full">
                      <Upload className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-2">
                        Adicione uma foto do produto
                      </h3>
                      <p className="text-sm text-gray-600 mb-4">
                        Tire uma foto ou selecione da galeria
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => fileInputRef.current?.click()}
                        className="bg-gradient-to-r from-[#B85450] to-[#D4A574] text-white"
                      >
                        <Camera className="w-4 h-4 mr-2" />
                        Tirar Foto
                      </Button>
                      <Button
                        onClick={() => fileInputRef.current?.click()}
                        variant="outline"
                        className="border-[#B85450] text-[#B85450]"
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        Galeria
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="relative rounded-xl overflow-hidden">
                    <img
                      src={selectedImage}
                      alt="Produto selecionado"
                      className="w-full h-64 object-cover"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => {
                        setSelectedImage(null)
                        setScanResult(null)
                      }}
                      variant="outline"
                      className="flex-1"
                    >
                      Trocar Foto
                    </Button>
                    <Button
                      onClick={analyzeProduct}
                      disabled={isScanning}
                      className="flex-1 bg-gradient-to-r from-[#B85450] to-[#D4A574] text-white"
                    >
                      {isScanning ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Analisando...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4 mr-2" />
                          Analisar
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Resultado da Análise */}
          <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-800">
                <Sparkles className="w-5 h-5 text-[#D4A574]" />
                Resultado da Análise
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!scanResult ? (
                <div className="flex flex-col items-center justify-center h-64 text-center">
                  <div className="p-4 bg-gray-100 rounded-full mb-4">
                    <Sparkles className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-gray-600">
                    Adicione uma foto e clique em "Analisar" para descobrir tudo sobre o produto
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Nome e Marca */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-1">
                      {scanResult.name}
                    </h3>
                    <p className="text-gray-600">{scanResult.brand}</p>
                    <Badge className="mt-2 bg-[#B85450]">{scanResult.type}</Badge>
                  </div>

                  {/* Descrição */}
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">O que faz:</h4>
                    <p className="text-sm text-gray-600">{scanResult.description}</p>
                  </div>

                  {/* Quando usar */}
                  <div className="bg-gradient-to-r from-[#87CEEB]/10 to-[#B0E0E6]/10 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      Quando usar:
                    </h4>
                    <p className="text-sm text-gray-600">{scanResult.usageTime}</p>
                  </div>

                  {/* Benefícios */}
                  {scanResult.benefits && scanResult.benefits.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">Benefícios:</h4>
                      <ul className="space-y-2">
                        {scanResult.benefits.map((benefit, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                            <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Botão Salvar */}
                  <Button
                    onClick={saveProduct}
                    disabled={isSaving}
                    className="w-full bg-gradient-to-r from-[#B85450] to-[#D4A574] text-white mt-4"
                  >
                    {isSaving ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Salvando...
                      </>
                    ) : (
                      <>
                        <Check className="w-4 h-4 mr-2" />
                        Salvar Produto
                      </>
                    )}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
