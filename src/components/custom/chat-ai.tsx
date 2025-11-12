'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'
import { 
  ArrowLeft, 
  Send, 
  Bot, 
  User, 
  Sparkles,
  MessageCircle,
  Zap,
  Clock
} from 'lucide-react'
import { getChatResponse } from '@/lib/utils'

interface ChatAIProps {
  onBack: () => void
  user: any
}

interface Message {
  id: string
  type: 'user' | 'ai'
  content: string
  timestamp: Date
}

export default function ChatAI({ onBack, user }: ChatAIProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: `Olá, ${user.name}! 👋 Sou sua consultora de skincare com IA. Posso te ajudar com dúvidas sobre produtos, rotinas e cuidados específicos para sua pele ${user.skinType}. Como posso te ajudar hoje?`,
      timestamp: new Date()
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  const quickQuestions = [
    "Posso usar vitamina C com ácido hialurônico?",
    "Qual a ordem correta dos produtos?",
    "Como tratar oleosidade na zona T?",
    "Quando devo usar protetor solar?",
    "Ácidos podem ser usados todos os dias?"
  ]

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsTyping(true)

    // Simular resposta da IA
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: getChatResponse(inputMessage),
        timestamp: new Date()
      }
      setMessages(prev => [...prev, aiResponse])
      setIsTyping(false)
    }, 1500)
  }

  const handleQuickQuestion = (question: string) => {
    setInputMessage(question)
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('pt-BR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF5F5] via-white to-[#F0F8FF] flex flex-col">
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
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-[#B85450] to-[#D4A574] rounded-full">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">Consultora IA</h1>
                <p className="text-sm text-gray-600">Especialista em skincare</p>
              </div>
            </div>
            <div className="ml-auto">
              <Badge className="bg-green-100 text-green-800">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                Online
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 max-w-4xl mx-auto w-full px-4 py-6 flex flex-col">
        {/* Perguntas Rápidas */}
        {messages.length === 1 && (
          <Card className="mb-6 shadow-lg border-0 bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-800">
                <Zap className="w-5 h-5 text-[#87CEEB]" />
                Perguntas Frequentes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {quickQuestions.map((question, index) => (
                  <Button
                    key={index}
                    onClick={() => handleQuickQuestion(question)}
                    variant="outline"
                    className="text-left justify-start h-auto p-3 border-gray-200 hover:border-[#B85450] hover:bg-[#FFF5F5] text-gray-700"
                  >
                    <MessageCircle className="w-4 h-4 mr-2 text-[#B85450] flex-shrink-0" />
                    <span className="text-sm">{question}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Chat Messages */}
        <Card className="flex-1 shadow-lg border-0 bg-white/90 backdrop-blur-sm flex flex-col">
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${
                    message.type === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {message.type === 'ai' && (
                    <div className="p-2 bg-gradient-to-r from-[#B85450] to-[#D4A574] rounded-full flex-shrink-0">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                  )}
                  
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                      message.type === 'user'
                        ? 'bg-gradient-to-r from-[#87CEEB] to-[#B0E0E6] text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.content}</p>
                    <div className={`flex items-center gap-1 mt-2 text-xs ${
                      message.type === 'user' ? 'text-white/80' : 'text-gray-500'
                    }`}>
                      <Clock className="w-3 h-3" />
                      {formatTime(message.timestamp)}
                    </div>
                  </div>

                  {message.type === 'user' && (
                    <div className="p-2 bg-[#87CEEB] rounded-full flex-shrink-0">
                      <User className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex gap-3 justify-start">
                  <div className="p-2 bg-gradient-to-r from-[#B85450] to-[#D4A574] rounded-full flex-shrink-0">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-gray-100 rounded-2xl px-4 py-3">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Input Area */}
          <div className="border-t border-gray-200 p-4">
            <div className="flex gap-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Digite sua pergunta sobre skincare..."
                className="flex-1 border-gray-200 focus:border-[#B85450] focus:ring-[#B85450]"
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                disabled={isTyping}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isTyping}
                className="bg-gradient-to-r from-[#B85450] to-[#D4A574] hover:from-[#A04A46] hover:to-[#C19660] text-white px-6"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            
            {/* Limite para plano gratuito */}
            {user.plan === 'free' && (
              <div className="mt-3 text-center">
                <p className="text-xs text-gray-500">
                  Plano Gratuito: 2 perguntas restantes esta semana
                </p>
                <Button
                  size="sm"
                  variant="outline"
                  className="mt-2 border-[#D4A574] text-[#D4A574] hover:bg-[#D4A574] hover:text-white"
                >
                  <Sparkles className="w-3 h-3 mr-1" />
                  Upgrade para Premium
                </Button>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  )
}