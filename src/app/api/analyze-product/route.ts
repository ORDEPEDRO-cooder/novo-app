import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
})

export async function POST(request: NextRequest) {
  try {
    const { image } = await request.json()

    if (!image) {
      return NextResponse.json(
        { error: 'Imagem não fornecida' },
        { status: 400 }
      )
    }

    // Analisar imagem com OpenAI Vision
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: `Você é um especialista em produtos de skincare. Analise esta imagem de produto e forneça as seguintes informações em formato JSON:

{
  "name": "Nome completo do produto",
  "brand": "Marca do produto",
  "type": "Tipo (ex: Sérum, Hidratante, Tônico, Protetor Solar, etc)",
  "description": "Descrição detalhada do que o produto faz (2-3 frases)",
  "usageTime": "Quando usar (ex: Manhã e Noite - Aplicar após limpeza)",
  "ingredients": ["Lista dos principais ativos"],
  "benefits": ["Lista de 3-4 benefícios principais"]
}

Se não conseguir identificar o produto claramente, faça uma análise baseada no que você consegue ver na embalagem.`
            },
            {
              type: 'image_url',
              image_url: {
                url: image,
              },
            },
          ],
        },
      ],
      max_tokens: 1000,
    })

    const content = response.choices[0].message.content
    
    if (!content) {
      throw new Error('Resposta vazia da API')
    }

    // Extrair JSON da resposta
    const jsonMatch = content.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      throw new Error('Formato de resposta inválido')
    }

    const result = JSON.parse(jsonMatch[0])

    return NextResponse.json(result)
  } catch (error) {
    console.error('Erro ao analisar produto:', error)
    return NextResponse.json(
      { error: 'Erro ao analisar produto' },
      { status: 500 }
    )
  }
}
