'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  Sun, 
  Moon, 
  Calendar, 
  Camera, 
  MessageCircle, 
  Sparkles, 
  CheckCircle,
  Clock,
  TrendingUp,
  Star,
  Zap,
  Upload,
  Image as ImageIcon,
  List,
  Home,
  X,
  Plus
} from 'lucide-react'

interface DashboardProps {
  user: any
  onNavigate: (section: string) => void
}

interface SavedProduct {
  id: string
  name: string
  brand: string
  type: string
  imageUrl: string
  dateAdded: Date
  inRoutine: boolean
}

export default function Dashboard({ user, onNavigate }: DashboardProps) {
  const [activeTab, setActiveTab] = useState<'home' | 'products' | 'routine'>('home')
  const [completedRoutines, setCompletedRoutines] = useState({
    morning: false,
    evening: false
  })
  const [savedProducts, setSavedProducts] = useState<SavedProduct[]>([
    {
      id: '1',
      name: 'Sérum Hidratante',
      brand: 'The Ordinary',
      type: 'Sérum',
      imageUrl: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop',
      dateAdded: new Date(),
      inRoutine: true
    },
    {
      id: '2',
      name: 'Protetor Solar',
      brand: 'La Roche Posay',
      type: 'Protetor',
      imageUrl: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=400&fit=crop',
      dateAdded: new Date(),
      inRoutine: true
    }
  ])

  const toggleRoutine = (type: 'morning' | 'evening') => {
    setCompletedRoutines(prev => ({
      ...prev,
      [type]: !prev[type]
    }))
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const newProduct: SavedProduct = {
          id: Date.now().toString(),
          name: 'Produto Analisado',
          brand: 'Marca Identificada',
          type: 'Analisando...',
          imageUrl: e.target?.result as string,
          dateAdded: new Date(),
          inRoutine: false
        }
        setSavedProducts(prev => [newProduct, ...prev])
      }
      reader.readAsDataURL(file)
    }
  }

  const toggleProductInRoutine = (productId: string) => {
    setSavedProducts(prev => 
      prev.map(product => 
        product.id === productId 
          ? { ...product, inRoutine: !product.inRoutine }
          : product
      )
    )
  }

  const removeProduct = (productId: string) => {
    setSavedProducts(prev => prev.filter(product => product.id !== productId))
  }

  const progressPercentage = 65

  const TabButton = ({ tab, icon: Icon, label, isActive }: { 
    tab: 'home' | 'products' | 'routine', 
    icon: any, 
    label: string, 
    isActive: boolean 
  }) => (
    <Button
      onClick={() => setActiveTab(tab)}
      variant={isActive ? "default" : "ghost"}
      className={`flex-1 flex items-center gap-2 ${
        isActive 
          ? 'bg-gradient-to-r from-[#B85450] to-[#D4A574] text-white' 
          : 'text-gray-600 hover:text-[#B85450]'
      }`}
    >
      <Icon className="w-4 h-4" />
      <span className="hidden sm:inline">{label}</span>
    </Button>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF5F5] via-white to-[#F0F8FF]">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-[#B85450] to-[#D4A574] bg-clip-text text-transparent">
                SkinGuide IA
              </h1>
              <p className="text-gray-600 text-sm">Olá, {user.name}! ✨</p>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="bg-[#FFF5F5] border-[#B85450] text-[#B85450]">
                {user.plan === 'premium' ? '👑 Premium' : '🆓 Gratuito'}
              </Badge>
              <Button
                onClick={() => onNavigate('chat')}
                size="sm"
                className="bg-gradient-to-r from-[#87CEEB] to-[#B0E0E6] hover:from-[#7BB8D1] hover:to-[#9DD3D9] text-white"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Chat IA
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex gap-2 bg-white/60 backdrop-blur-sm rounded-lg p-2 border border-gray-200">
          <TabButton 
            tab="home" 
            icon={Home} 
            label="Dashboard" 
            isActive={activeTab === 'home'} 
          />
          <TabButton 
            tab="products" 
            icon={Camera} 
            label="Meus Produtos" 
            isActive={activeTab === 'products'} 
          />
          <TabButton 
            tab="routine" 
            icon={List} 
            label="Minha Rotina" 
            isActive={activeTab === 'routine'} 
          />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 pb-6">
        {/* Tab Content */}
        {activeTab === 'home' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Coluna Principal */}
            <div className="lg:col-span-2 space-y-6">
              {/* Rotina de Hoje */}
              <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-gray-800">
                    <Clock className="w-5 h-5 text-[#B85450]" />
                    Rotina de Hoje
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Rotina Manhã */}
                  <div className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                    completedRoutines.morning 
                      ? 'bg-green-50 border-green-200' 
                      : 'bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200'
                  }`}>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Sun className="w-5 h-5 text-yellow-600" />
                        <h3 className="font-semibold text-gray-800">Rotina da Manhã</h3>
                      </div>
                      <Button
                        onClick={() => toggleRoutine('morning')}
                        size="sm"
                        variant={completedRoutines.morning ? "default" : "outline"}
                        className={completedRoutines.morning 
                          ? "bg-green-500 hover:bg-green-600" 
                          : "border-yellow-400 text-yellow-700 hover:bg-yellow-50"
                        }
                      >
                        {completedRoutines.morning ? (
                          <>
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Concluída
                          </>
                        ) : (
                          'Marcar como feita'
                        )}
                      </Button>
                    </div>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-[#B85450] rounded-full"></div>
                        Limpeza facial suave
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-[#D4A574] rounded-full"></div>
                        Sérum hidratante
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-[#87CEEB] rounded-full"></div>
                        Protetor solar FPS 60
                      </div>
                    </div>
                  </div>

                  {/* Rotina Noite */}
                  <div className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                    completedRoutines.evening 
                      ? 'bg-green-50 border-green-200' 
                      : 'bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200'
                  }`}>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Moon className="w-5 h-5 text-purple-600" />
                        <h3 className="font-semibold text-gray-800">Rotina da Noite</h3>
                      </div>
                      <Button
                        onClick={() => toggleRoutine('evening')}
                        size="sm"
                        variant={completedRoutines.evening ? "default" : "outline"}
                        className={completedRoutines.evening 
                          ? "bg-green-500 hover:bg-green-600" 
                          : "border-purple-400 text-purple-700 hover:bg-purple-50"
                        }
                      >
                        {completedRoutines.evening ? (
                          <>
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Concluída
                          </>
                        ) : (
                          'Marcar como feita'
                        )}
                      </Button>
                    </div>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-[#B85450] rounded-full"></div>
                        Demaquilante e limpeza
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-[#D4A574] rounded-full"></div>
                        Tônico hidratante
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-[#87CEEB] rounded-full"></div>
                        Hidratante noturno
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* SkinMatch - Reconhecimento de Produtos */}
              <Card className="shadow-lg border-0 bg-gradient-to-r from-[#B85450] to-[#D4A574] text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                        <Sparkles className="w-6 h-6" />
                        SkinMatch IA
                      </h3>
                      <p className="text-white/90 mb-4">
                        Fotografe seus produtos e descubra tudo sobre eles
                      </p>
                      <div className="flex gap-2">
                        <Button
                          onClick={() => onNavigate('skinmatch')}
                          className="bg-white text-[#B85450] hover:bg-gray-100 font-medium"
                        >
                          <Camera className="w-4 h-4 mr-2" />
                          Escanear Produto
                        </Button>
                        <Button
                          onClick={() => setActiveTab('products')}
                          variant="outline"
                          className="border-white text-white hover:bg-white hover:text-[#B85450]"
                        >
                          Ver Produtos
                        </Button>
                      </div>
                    </div>
                    <div className="hidden md:block">
                      <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
                        <Camera className="w-12 h-12 text-white" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Progresso da Pele */}
              <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-gray-800">
                    <TrendingUp className="w-5 h-5 text-[#87CEEB]" />
                    Minha Evolução
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">Progresso geral</span>
                      <span className="font-semibold text-[#B85450]">{progressPercentage}%</span>
                    </div>
                    <Progress value={progressPercentage} className="h-2" />
                  </div>
                  
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-gray-600">Rotina estabelecida</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-gray-600">{savedProducts.length} produtos salvos</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-yellow-500" />
                      <span className="text-gray-600">Primeira foto em 2 dias</span>
                    </div>
                  </div>

                  <Button
                    onClick={() => onNavigate('progress')}
                    variant="outline"
                    className="w-full border-[#87CEEB] text-[#87CEEB] hover:bg-[#87CEEB] hover:text-white"
                  >
                    <Camera className="w-4 h-4 mr-2" />
                    Registrar Foto
                  </Button>
                </CardContent>
              </Card>

              {/* Sugestões da IA */}
              <Card className="shadow-lg border-0 bg-gradient-to-br from-[#87CEEB] to-[#B0E0E6] text-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="w-5 h-5" />
                    Dica do Dia
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-white/90 mb-4">
                    Para sua pele {user.skinType}, recomendamos usar o sérum hidratante pela manhã e à noite. 
                    Lembre-se: consistência é a chave!
                  </p>
                  <Button
                    onClick={() => onNavigate('chat')}
                    size="sm"
                    className="bg-white text-[#87CEEB] hover:bg-gray-100"
                  >
                    Perguntar à IA
                  </Button>
                </CardContent>
              </Card>

              {/* Nível de Conhecimento */}
              <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-gray-800">
                    <Star className="w-5 h-5 text-[#D4A574]" />
                    Seu Nível
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <Badge className="bg-[#D4A574] text-white mb-3">
                      {user.level.charAt(0).toUpperCase() + user.level.slice(1)}
                    </Badge>
                    <p className="text-sm text-gray-600 mb-4">
                      Continue seguindo sua rotina para evoluir para o próximo nível!
                    </p>
                    <Button
                      onClick={() => onNavigate('learn')}
                      variant="outline"
                      size="sm"
                      className="w-full border-[#D4A574] text-[#D4A574] hover:bg-[#D4A574] hover:text-white"
                    >
                      Aprender Mais
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Aba Meus Produtos */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            {/* Header da aba */}
            <Card className="shadow-lg border-0 bg-gradient-to-r from-[#B85450] to-[#D4A574] text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
                      <ImageIcon className="w-6 h-6" />
                      Meus Produtos Salvos
                    </h2>
                    <p className="text-white/90">
                      {savedProducts.length} produtos analisados • {savedProducts.filter(p => p.inRoutine).length} na rotina
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="product-upload"
                    />
                    <label htmlFor="product-upload">
                      <Button
                        as="span"
                        className="bg-white text-[#B85450] hover:bg-gray-100 cursor-pointer"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Adicionar Foto
                      </Button>
                    </label>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Grid de produtos */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedProducts.map((product) => (
                <Card key={product.id} className="shadow-lg border-0 bg-white/90 backdrop-blur-sm overflow-hidden">
                  <div className="relative">
                    <img 
                      src={product.imageUrl} 
                      alt={product.name}
                      className="w-full h-48 object-cover"
                    />
                    <Button
                      onClick={() => removeProduct(product.id)}
                      size="sm"
                      variant="destructive"
                      className="absolute top-2 right-2 w-8 h-8 p-0"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                    {product.inRoutine && (
                      <Badge className="absolute top-2 left-2 bg-green-500">
                        Na Rotina
                      </Badge>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-gray-800 mb-1">{product.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{product.brand}</p>
                    <Badge variant="outline" className="mb-3">
                      {product.type}
                    </Badge>
                    <p className="text-xs text-gray-500 mb-3">
                      Adicionado em {product.dateAdded.toLocaleDateString()}
                    </p>
                    <Button
                      onClick={() => toggleProductInRoutine(product.id)}
                      size="sm"
                      variant={product.inRoutine ? "outline" : "default"}
                      className={`w-full ${
                        product.inRoutine 
                          ? 'border-red-400 text-red-600 hover:bg-red-50' 
                          : 'bg-gradient-to-r from-[#B85450] to-[#D4A574] text-white'
                      }`}
                    >
                      {product.inRoutine ? 'Remover da Rotina' : 'Adicionar à Rotina'}
                    </Button>
                  </CardContent>
                </Card>
              ))}
              
              {savedProducts.length === 0 && (
                <div className="col-span-full text-center py-12">
                  <ImageIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">
                    Nenhum produto salvo ainda
                  </h3>
                  <p className="text-gray-500 mb-4">
                    Adicione fotos dos seus produtos para começar a análise
                  </p>
                  <label htmlFor="product-upload">
                    <Button className="bg-gradient-to-r from-[#B85450] to-[#D4A574] text-white cursor-pointer">
                      <Plus className="w-4 h-4 mr-2" />
                      Adicionar Primeira Foto
                    </Button>
                  </label>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Aba Minha Rotina */}
        {activeTab === 'routine' && (
          <div className="space-y-6">
            {/* Header da aba */}
            <Card className="shadow-lg border-0 bg-gradient-to-r from-[#87CEEB] to-[#B0E0E6] text-white">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
                  <List className="w-6 h-6" />
                  Minha Rotina Completa
                </h2>
                <p className="text-white/90">
                  Produtos organizados por período • {savedProducts.filter(p => p.inRoutine).length} produtos ativos
                </p>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Rotina Manhã Detalhada */}
              <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
                <CardHeader className="bg-gradient-to-r from-yellow-50 to-orange-50">
                  <CardTitle className="flex items-center gap-2 text-gray-800">
                    <Sun className="w-5 h-5 text-yellow-600" />
                    Rotina da Manhã
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 space-y-4">
                  {savedProducts.filter(p => p.inRoutine).slice(0, 3).map((product, index) => (
                    <div key={product.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-[#B85450] to-[#D4A574] text-white rounded-full flex items-center justify-center text-sm font-semibold">
                        {index + 1}
                      </div>
                      <img 
                        src={product.imageUrl} 
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-800">{product.name}</h4>
                        <p className="text-sm text-gray-600">{product.brand}</p>
                      </div>
                    </div>
                  ))}
                  
                  {savedProducts.filter(p => p.inRoutine).length === 0 && (
                    <div className="text-center py-8">
                      <Sun className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                      <p className="text-gray-500">Nenhum produto na rotina da manhã</p>
                      <Button 
                        onClick={() => setActiveTab('products')}
                        size="sm" 
                        className="mt-2 bg-gradient-to-r from-[#B85450] to-[#D4A574] text-white"
                      >
                        Adicionar Produtos
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Rotina Noite Detalhada */}
              <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
                <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50">
                  <CardTitle className="flex items-center gap-2 text-gray-800">
                    <Moon className="w-5 h-5 text-purple-600" />
                    Rotina da Noite
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 space-y-4">
                  {savedProducts.filter(p => p.inRoutine).slice(0, 4).map((product, index) => (
                    <div key={product.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                        {index + 1}
                      </div>
                      <img 
                        src={product.imageUrl} 
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-800">{product.name}</h4>
                        <p className="text-sm text-gray-600">{product.brand}</p>
                      </div>
                    </div>
                  ))}
                  
                  {savedProducts.filter(p => p.inRoutine).length === 0 && (
                    <div className="text-center py-8">
                      <Moon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                      <p className="text-gray-500">Nenhum produto na rotina da noite</p>
                      <Button 
                        onClick={() => setActiveTab('products')}
                        size="sm" 
                        className="mt-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white"
                      >
                        Adicionar Produtos
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Dicas da Rotina */}
            <Card className="shadow-lg border-0 bg-gradient-to-r from-[#D4A574] to-[#B85450] text-white">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Sparkles className="w-6 h-6" />
                  Dicas para sua Rotina
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="bg-white/20 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">🌅 Manhã</h4>
                    <p className="text-white/90">
                      Sempre finalize com protetor solar. A ordem correta é: limpeza → sérum → hidratante → protetor.
                    </p>
                  </div>
                  <div className="bg-white/20 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">🌙 Noite</h4>
                    <p className="text-white/90">
                      É o momento ideal para ativos mais potentes. Lembre-se de remover toda maquiagem antes.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}