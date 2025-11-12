'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  Camera, 
  Upload, 
  Sparkles, 
  ArrowLeft, 
  Search,
  DollarSign,
  Gem,
  Crown,
  Plus,
  Heart,
  History
} from 'lucide-react'
import { analyzeProduct } from '@/lib/utils'

interface SkinMatchProps {
  onBack: () => void
}

export default function SkinMatch({ onBack }: SkinMatchProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [productName, setProductName] = useState('')
  const [analysisResult, setAnalysisResult] = useState<any>(null)
  const [activeTab, setActiveTab] = useState<'scan' | 'history'>('scan')

  const handleAnalyze = async () => {
    if (!productName.trim()) return
    
    setIsAnalyzing(true)
    
    // Simular análise da IA
    setTimeout(() => {
      const result = analyzeProduct(productName)
      setAnalysisResult(result)
      setIsAnalyzing(false)
    }, 2000)
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setIsAnalyzing(true)
      // Simular análise de imagem
      setTimeout(() => {
        const result = analyzeProduct("Produto identificado na imagem")
        setAnalysisResult(result)
        setIsAnalyzing(false)
      }, 3000)
    }
  }

  const mockHistory = [
    { name: 'Sérum Vitamina C', brand: 'Skinceuticals', date: '2 dias atrás', saved: true },
    { name: 'Protetor Solar', brand: 'La Roche-Posay', date: '1 semana atrás', saved: false },
    { name: 'Ácido Hialurônico', brand: 'The Ordinary', date: '2 semanas atrás', saved: true }
  ]

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
              className="text-gray-600 hover:text-gray-800"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-[#B85450] to-[#D4A574] bg-clip-text text-transparent">
                SkinMatch IA
              </h1>
              <p className="text-gray-600 text-sm">Reconhecimento inteligente de produtos</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Tabs */}
        <div className="flex gap-4 mb-6">
          <Button
            onClick={() => setActiveTab('scan')}
            variant={activeTab === 'scan' ? 'default' : 'outline'}
            className={activeTab === 'scan' 
              ? 'bg-gradient-to-r from-[#B85450] to-[#D4A574] text-white' 
              : 'border-gray-300 text-gray-600'
            }
          >
            <Camera className="w-4 h-4 mr-2" />
            Escanear
          </Button>
          <Button
            onClick={() => setActiveTab('history')}
            variant={activeTab === 'history' ? 'default' : 'outline'}
            className={activeTab === 'history' 
              ? 'bg-gradient-to-r from-[#B85450] to-[#D4A574] text-white' 
              : 'border-gray-300 text-gray-600'
            }
          >
            <History className="w-4 h-4 mr-2" />
            Histórico
          </Button>
        </div>

        {activeTab === 'scan' ? (
          <div className="space-y-6">
            {/* Área de Scan */}
            <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-800">
                  <Sparkles className="w-5 h-5 text-[#B85450]" />
                  Identifique seu produto
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Upload de Imagem */}
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-[#B85450] transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <label htmlFor="image-upload" className="cursor-pointer">
                    <div className="space-y-4">
                      <div className="flex justify-center">
                        <div className="p-4 bg-gradient-to-r from-[#B85450] to-[#D4A574] rounded-full">
                          <Camera className="w-8 h-8 text-white" />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800 mb-2">Fotografe seu produto</h3>
                        <p className="text-gray-600 text-sm">
                          Tire uma foto clara do rótulo do produto para análise automática
                        </p>
                      </div>
                      <Button className="bg-gradient-to-r from-[#B85450] to-[#D4A574] hover:from-[#A04A46] hover:to-[#C19660] text-white">
                        <Upload className="w-4 h-4 mr-2" />
                        Escolher Foto
                      </Button>
                    </div>
                  </label>
                </div>

                {/* Ou digite o nome */}
                <div className="text-center">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex-1 h-px bg-gray-300"></div>
                    <span className="text-gray-500 text-sm">ou</span>
                    <div className="flex-1 h-px bg-gray-300"></div>
                  </div>

                  <div className="flex gap-2 max-w-md mx-auto">
                    <Input
                      placeholder="Digite o nome do produto..."
                      value={productName}
                      onChange={(e) => setProductName(e.target.value)}
                      className="border-gray-200 focus:border-[#B85450] focus:ring-[#B85450]"
                      onKeyPress={(e) => e.key === 'Enter' && handleAnalyze()}
                    />
                    <Button
                      onClick={handleAnalyze}
                      disabled={!productName.trim() || isAnalyzing}
                      className="bg-gradient-to-r from-[#87CEEB] to-[#B0E0E6] hover:from-[#7BB8D1] hover:to-[#9DD3D9] text-white"
                    >
                      <Search className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Loading */}
            {isAnalyzing && (
              <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
                <CardContent className="p-8 text-center">
                  <div className="space-y-4">
                    <div className="flex justify-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#B85450] border-t-transparent"></div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-2">Analisando produto...</h3>
                      <p className="text-gray-600 text-sm">
                        Nossa IA está identificando ingredientes e características
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Resultado da Análise */}
            {analysisResult && !isAnalyzing && (
              <div className="space-y-6">
                {/* Produto Identificado */}
                <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-gray-800">
                      <Sparkles className="w-5 h-5 text-green-500" />
                      Produto Identificado
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 bg-gradient-to-r from-[#B85450] to-[#D4A574] rounded-lg flex items-center justify-center">
                        <Sparkles className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg text-gray-800">{analysisResult.name}</h3>
                        <p className="text-[#B85450] font-medium">{analysisResult.brand}</p>
                        <Badge className="mt-2 bg-[#87CEEB] text-white">
                          {analysisResult.type}
                        </Badge>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-red-200 text-red-600 hover:bg-red-50"
                      >
                        <Heart className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-800 mb-2">Como usar:</h4>
                      <p className="text-gray-600 text-sm">{analysisResult.usage}</p>
                    </div>

                    <div className="bg-blue-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-800 mb-2">Descrição:</h4>
                      <p className="text-gray-600 text-sm">{analysisResult.description}</p>
                    </div>

                    <Button className="w-full bg-gradient-to-r from-[#B85450] to-[#D4A574] hover:from-[#A04A46] hover:to-[#C19660] text-white">
                      <Plus className="w-4 h-4 mr-2" />
                      Adicionar à Minha Rotina
                    </Button>
                  </CardContent>
                </Card>

                {/* Alternativas */}
                <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-gray-800">Produtos Similares</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* Barato */}
                      <div className="p-4 border border-green-200 rounded-lg bg-green-50">
                        <div className="flex items-center gap-2 mb-2">
                          <DollarSign className="w-4 h-4 text-green-600" />
                          <span className="font-semibold text-green-800">Econômico</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{analysisResult.alternatives.barato}</p>
                        <Button size="sm" variant="outline" className="w-full border-green-300 text-green-700 hover:bg-green-100">
                          Ver Detalhes
                        </Button>
                      </div>

                      {/* Similar */}
                      <div className="p-4 border border-blue-200 rounded-lg bg-blue-50">
                        <div className="flex items-center gap-2 mb-2">
                          <Gem className="w-4 h-4 text-blue-600" />
                          <span className="font-semibold text-blue-800">Similar</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{analysisResult.alternatives.similar}</p>
                        <Button size="sm" variant="outline" className="w-full border-blue-300 text-blue-700 hover:bg-blue-100">
                          Ver Detalhes
                        </Button>
                      </div>

                      {/* Premium */}
                      <div className="p-4 border border-purple-200 rounded-lg bg-purple-50">
                        <div className="flex items-center gap-2 mb-2">
                          <Crown className="w-4 h-4 text-purple-600" />
                          <span className="font-semibold text-purple-800">Premium</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{analysisResult.alternatives.premium}</p>
                        <Button size="sm" variant="outline" className="w-full border-purple-300 text-purple-700 hover:bg-purple-100">
                          Ver Detalhes
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        ) : (
          /* Histórico */
          <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-gray-800">Produtos Analisados</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockHistory.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-[#B85450] to-[#D4A574] rounded-lg flex items-center justify-center">
                        <Sparkles className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">{item.name}</h3>
                        <p className="text-sm text-gray-600">{item.brand} • {item.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {item.saved && (
                        <Badge className="bg-green-100 text-green-800">
                          Salvo
                        </Badge>
                      )}
                      <Button size="sm" variant="outline">
                        Ver Análise
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}