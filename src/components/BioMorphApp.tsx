'use client'

import { useState } from 'react'
import { Copy, Wand2, Loader2, Check, Sparkles, Zap, Stars, Rocket } from 'lucide-react'
import { platforms } from '@/lib/platforms'
import { generateBios } from '@/lib/api'
import AdUnit from './AdUnit'

export default function BioMorphApp() {
  const [originalBio, setOriginalBio] = useState('')
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['linkedin', 'twitter'])
  const [generatedBios, setGeneratedBios] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [copiedPlatform, setCopiedPlatform] = useState<string | null>(null)

  const handlePlatformToggle = (platformId: string) => {
    setSelectedPlatforms(prev => 
      prev.includes(platformId) 
        ? prev.filter(id => id !== platformId)
        : [...prev, platformId]
    )
  }

  const handleGenerate = async () => {
    if (!originalBio.trim() || selectedPlatforms.length === 0) return
    
    setIsLoading(true)
    try {
      const bios = await generateBios(originalBio, selectedPlatforms)
      setGeneratedBios(bios)
    } catch (error) {
      console.error('Error generating bios:', error)
      alert('Failed to generate bios. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const copyToClipboard = async (text: string, platformId: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedPlatform(platformId)
      setTimeout(() => setCopiedPlatform(null), 2000)
    } catch (err) {
      console.error('Failed to copy text:', err)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white relative overflow-hidden">
      {/* Epic animated background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-20 blur-3xl animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full opacity-20 blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full opacity-20 blur-3xl animate-blob animation-delay-4000"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_70%)]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        {/* Stunning Header */}
        <div className="text-center mb-20">
          <div className="flex items-center justify-center mb-12 animate-float">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl blur-xl opacity-75 animate-glow"></div>
              <div className="relative p-6 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl shadow-2xl">
                <Sparkles className="w-12 h-12 text-white" />
              </div>
            </div>
          </div>
          
          <h1 className="text-8xl md:text-9xl font-black mb-8 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent leading-none tracking-tight">
            BioMorph
          </h1>
          
          <div className="max-w-4xl mx-auto mb-12">
            <p className="text-3xl md:text-4xl font-light text-slate-300 mb-6 leading-relaxed">
              Create <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent font-semibold">SEO-optimized bios</span> for maximum visibility
            </p>
            <p className="text-xl text-slate-400 font-light">
              Generate custom-tailored, platform-specific bios that get you discovered
            </p>
          </div>

          <div className="flex items-center justify-center gap-8 text-slate-400">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-400" />
              <span>AI-Powered</span>
            </div>
            <div className="flex items-center gap-2">
              <Rocket className="w-5 h-5 text-blue-400" />
              <span>SEO Optimized</span>
            </div>
            <div className="flex items-center gap-2">
              <Stars className="w-5 h-5 text-purple-400" />
              <span>8 Platforms</span>
            </div>
          </div>
        </div>

        {/* Bio Input - Glass Morphism */}
        <div className="glass rounded-3xl p-10 mb-12 shadow-2xl hover:shadow-purple-500/10 transition-all duration-500 group">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-2 h-12 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>
            <h2 className="text-3xl font-bold text-white group-hover:text-purple-200 transition-colors">
              Share Your Story
            </h2>
          </div>
          
          <div className="relative">
            <textarea
              value={originalBio}
              onChange={(e) => setOriginalBio(e.target.value)}
              placeholder="Tell us about yourself... your achievements, passions, expertise, and what makes you unique. The more detail you provide, the better we can tailor your bio for each platform."
              className="w-full h-48 p-8 bg-black/30 border-2 border-white/10 rounded-2xl text-white placeholder-slate-400 resize-none focus:outline-none focus:border-purple-500/50 focus:bg-black/40 transition-all duration-300 text-lg leading-relaxed font-light"
            />
            <div className="absolute bottom-6 right-6 px-4 py-2 bg-white/10 rounded-full text-sm text-slate-400 backdrop-blur-sm">
              {originalBio.length} characters
            </div>
          </div>
        </div>

        {/* Platform Selection - Premium Cards */}
        <div className="glass rounded-3xl p-10 mb-16 shadow-2xl">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-2 h-12 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>
            <h2 className="text-3xl font-bold text-white">Choose Your Platforms</h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {platforms.map((platform, index) => (
              <div
                key={platform.id}
                onClick={() => handlePlatformToggle(platform.id)}
                className={`relative cursor-pointer group p-8 rounded-2xl border-2 transition-all duration-500 hover:scale-110 hover:-translate-y-2 ${
                  selectedPlatforms.includes(platform.id)
                    ? 'bg-gradient-to-br from-purple-500/30 to-pink-500/30 border-purple-400/60 shadow-2xl shadow-purple-500/25'
                    : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Selection indicator */}
                {selectedPlatforms.includes(platform.id) && (
                  <div className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                )}
                
                {/* Platform icon */}
                <div className="text-4xl mb-4 group-hover:scale-125 transition-transform duration-300">
                  {platform.icon}
                </div>
                
                {/* Platform name */}
                <h3 className="font-bold text-lg text-white mb-2 group-hover:text-purple-200 transition-colors">
                  {platform.name}
                </h3>
                
                {/* Platform description */}
                <p className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors leading-relaxed">
                  {platform.description}
                </p>
                
                {/* Character limit badge */}
                {platform.charLimit && (
                  <div className="absolute top-3 right-3 px-2 py-1 bg-black/40 rounded-full text-xs text-slate-400 backdrop-blur-sm">
                    {platform.charLimit}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Top Ad - After input sections */}
        <AdUnit slot="1234567890" />

        {/* Generate Button - Epic */}
        <div className="text-center mb-16">
          <button
            onClick={handleGenerate}
            disabled={!originalBio.trim() || selectedPlatforms.length === 0 || isLoading}
            className="group relative px-16 py-6 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 text-white font-bold text-2xl rounded-2xl transition-all duration-500 hover:scale-110 hover:shadow-2xl hover:shadow-purple-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 inline-flex items-center gap-4"
          >
            {/* Button glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
            
            <div className="relative z-10 flex items-center gap-4">
              {isLoading ? (
                <>
                  <Loader2 className="w-8 h-8 animate-spin" />
                  Generating Magic...
                </>
              ) : (
                <>
                  <Wand2 className="w-8 h-8 group-hover:rotate-12 transition-transform duration-300" />
                  Generate Bios
                  <Sparkles className="w-6 h-6 group-hover:scale-125 transition-transform duration-300" />
                </>
              )}
            </div>
          </button>
        </div>

        {/* Results - Premium Layout */}
        {Object.keys(generatedBios).length > 0 && (
          <div className="space-y-12">
            <div className="text-center">
              <h2 className="text-5xl md:text-6xl font-black text-white mb-6 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                Your SEO-Optimized Bios
              </h2>
              <p className="text-lg text-slate-400 mb-8">Search-engine friendly content tailored for each platform</p>
              <div className="w-24 h-2 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full shadow-lg shadow-purple-500/50"></div>
            </div>
            
            <div className="grid gap-8 md:grid-cols-2">
              {selectedPlatforms.map((platformId, index) => {
                const platform = platforms.find(p => p.id === platformId)
                const bio = generatedBios[platformId]
                
                if (!platform || !bio) return null

                return (
                  <div 
                    key={platformId} 
                    className="glass rounded-3xl p-8 shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 hover:scale-105 group"
                    style={{ animationDelay: `${index * 200}ms` }}
                  >
                    {/* Platform header */}
                    <div className="flex items-center justify-between mb-8">
                      <div className="flex items-center gap-5">
                        <div className="text-4xl group-hover:scale-125 transition-transform duration-300">
                          {platform.icon}
                        </div>
                        <div>
                          <h3 className="font-bold text-2xl text-white group-hover:text-purple-200 transition-colors">
                            {platform.name}
                          </h3>
                          <p className="text-slate-400 text-sm font-light">{platform.description}</p>
                        </div>
                      </div>
                      
                      {/* Copy button */}
                      <button
                        onClick={() => copyToClipboard(bio, platformId)}
                        className="p-4 hover:bg-white/10 rounded-2xl transition-all duration-300 hover:scale-110 group/copy"
                        title="Copy to clipboard"
                      >
                        {copiedPlatform === platformId ? (
                          <Check className="w-6 h-6 text-green-400" />
                        ) : (
                          <Copy className="w-6 h-6 text-slate-400 group-hover/copy:text-white" />
                        )}
                      </button>
                    </div>
                    
                    {/* Bio content */}
                    <div className="bg-black/40 rounded-2xl p-8 border border-white/10 backdrop-blur-sm">
                      <p className="text-slate-200 leading-loose text-lg font-light">{bio}</p>
                    </div>
                    
                    {/* Stats */}
                    <div className="flex justify-between items-center mt-6 text-sm">
                      <div className="flex items-center gap-3">
                        <span className="text-slate-500">{bio.length} characters</span>
                        <div className="w-1 h-4 bg-slate-600 rounded-full"></div>
                        <span className="text-slate-500">{bio.split(' ').length} words</span>
                      </div>
                      {platform.charLimit && (
                        <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                          bio.length > platform.charLimit 
                            ? 'bg-red-500/20 text-red-400 border border-red-500/30' 
                            : 'bg-green-500/20 text-green-400 border border-green-500/30'
                        }`}>
                          Limit: {platform.charLimit}
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Bottom Ad - After results */}
            <AdUnit slot="0987654321" style={{ marginTop: '3rem', marginBottom: '2rem' }} />
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-24">
          <p className="text-slate-500 text-xl font-light mb-4">
            Professional SEO-optimized bios for creators worldwide ✨
          </p>
          <p className="text-sm text-slate-600">
            Boost your online presence with search-engine friendly bio content
          </p>
        </div>
      </div>
    </div>
  )
}