export interface Platform {
  id: string
  name: string
  icon: string
  description: string
  charLimit?: number
  tone: string
  style: string
}

export const platforms: Platform[] = [
  {
    id: 'linkedin',
    name: 'LinkedIn',
    icon: '💼',
    description: 'Professional networking',
    charLimit: 2000,
    tone: 'professional',
    style: 'achievement-focused with industry keywords'
  },
  {
    id: 'twitter',
    name: 'X/Twitter',
    icon: '🐦',
    description: 'Micro-blogging',
    charLimit: 160,
    tone: 'casual',
    style: 'concise and engaging with personality'
  },
  {
    id: 'instagram',
    name: 'Instagram',
    icon: '📸',
    description: 'Visual storytelling',
    charLimit: 150,
    tone: 'casual',
    style: 'creative and personal with emojis'
  },
  {
    id: 'website',
    name: 'Website',
    icon: '🌐',
    description: 'Personal/company site',
    tone: 'professional',
    style: 'comprehensive and SEO-friendly'
  },
  {
    id: 'youtube',
    name: 'YouTube',
    icon: '📹',
    description: 'Video content',
    charLimit: 1000,
    tone: 'engaging',
    style: 'enthusiastic and video-focused'
  },
  {
    id: 'resume',
    name: 'Resume',
    icon: '📄',
    description: 'Professional summary',
    charLimit: 500,
    tone: 'formal',
    style: 'achievement-focused and quantified'
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    icon: '🎵',
    description: 'Short-form video',
    charLimit: 80,
    tone: 'playful',
    style: 'fun and trendy with energy'
  },
  {
    id: 'github',
    name: 'GitHub',
    icon: '💻',
    description: 'Code repository',
    tone: 'technical',
    style: 'skill-focused and project-oriented'
  }
]