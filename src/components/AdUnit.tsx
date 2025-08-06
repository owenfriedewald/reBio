'use client'

import { useEffect } from 'react'

interface AdUnitProps {
  slot: string
  format?: string
  responsive?: boolean
  style?: React.CSSProperties
}

export default function AdUnit({ slot, format = 'auto', responsive = true, style }: AdUnitProps) {
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({})
      }
    } catch (err) {
      console.error('AdSense error:', err)
    }
  }, [])

  return (
    <div className="flex justify-center my-8">
      <ins
        className="adsbygoogle"
        style={{
          display: 'block',
          textAlign: 'center',
          ...style
        }}
        data-ad-client="ca-pub-YOUR_PUBLISHER_ID"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive.toString()}
      />
    </div>
  )
}