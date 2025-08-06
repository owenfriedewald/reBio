import { platforms } from './platforms'

export async function generateBios(originalBio: string, selectedPlatformIds: string[]): Promise<Record<string, string>> {
  const response = await fetch('/api/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      originalBio,
      platforms: selectedPlatformIds.map(id => platforms.find(p => p.id === id)).filter(Boolean)
    }),
  })

  if (!response.ok) {
    throw new Error('Failed to generate bios')
  }

  return response.json()
}