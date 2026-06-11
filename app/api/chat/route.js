import { getChatbotReply, getChatbotSystemPrompt } from '@/lib/chatbotEngine'

export const runtime = 'nodejs'

async function getOpenAIReply(messages, apiKey) {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
      temperature: 0.4,
      max_tokens: 500,
      messages: [
        { role: 'system', content: getChatbotSystemPrompt() },
        ...messages.slice(-12).map((m) => ({
          role: m.role === 'assistant' ? 'assistant' : 'user',
          content: m.content,
        })),
      ],
    }),
  })

  if (!response.ok) {
    const err = await response.text()
    throw new Error(err || `OpenAI error ${response.status}`)
  }

  const data = await response.json()
  const text = data.choices?.[0]?.message?.content?.trim()
  if (!text) throw new Error('Empty OpenAI response')
  return { text, links: [{ label: 'Get a quote', href: '/quote' }] }
}

export async function POST(request) {
  try {
    const body = await request.json()
    const messages = Array.isArray(body.messages) ? body.messages : []
    const lastUser = [...messages].reverse().find((m) => m.role === 'user' && m.content?.trim())

    if (!lastUser) {
      return Response.json({ error: 'Message required' }, { status: 400 })
    }

    const apiKey = process.env.OPENAI_API_KEY
    if (apiKey) {
      try {
        const reply = await getOpenAIReply(messages, apiKey)
        return Response.json({ reply, source: 'openai' })
      } catch (err) {
        console.error('[chat] OpenAI fallback:', err.message)
      }
    }

    const reply = getChatbotReply(lastUser.content)
    return Response.json({ reply, source: 'local' })
  } catch (err) {
    console.error('[chat]', err)
    return Response.json({ error: 'Chat failed' }, { status: 500 })
  }
}
