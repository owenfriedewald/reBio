import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    const { originalBio, platforms } = await request.json()

    if (!originalBio || !platforms || platforms.length === 0) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const results: Record<string, string> = {}

    for (const platform of platforms) {
      const prompt = `Transform this bio for ${platform.name}:

Original bio: "${originalBio}"

Platform: ${platform.name} (${platform.description})
Tone: ${platform.tone}
Style: ${platform.style}
${platform.charLimit ? `Character limit: ${platform.charLimit}` : ''}

Instructions:
- Adapt the tone and style for this specific platform
- Keep the core message and personality intact
- ${platform.charLimit ? `Stay within ${platform.charLimit} characters` : 'No strict length limit, but keep it appropriate for the platform'}
- Make it engaging and platform-appropriate
- Don't use quotes around the response
- Return only the bio text, no additional commentary

Bio:`

      const completion = await openai.chat.completions.create({
        model: 'gpt-4.1-nano',
        messages: [
          {
            role: 'system',
            content: 'You are a professional copywriter specializing in social media and professional bio optimization. Create engaging, platform-specific bios that maintain the person\'s core identity while adapting to each platform\'s unique style and audience expectations.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 300,
        temperature: 0.7,
      })

      const generatedBio = completion.choices[0]?.message?.content?.trim()
      if (generatedBio) {
        results[platform.id] = generatedBio
      }
    }

    return NextResponse.json(results)
  } catch (error) {
    console.error('Error generating bios:', error)
    return NextResponse.json({ error: 'Failed to generate bios' }, { status: 500 })
  }
}