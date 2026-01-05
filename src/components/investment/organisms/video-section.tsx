import React from 'react'
import { Play } from 'lucide-react'

export function VideoSection() {
  return (
    <div className="w-full" style={{ maxWidth: '816px' }}>
      <div
        className="relative bg-gray-200 rounded overflow-hidden w-full"
        style={{
          aspectRatio: '816 / 352',
          minHeight: '200px',
        }}
      >
        {/* Video Placeholder */}
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-300 to-gray-400">
          <div className="flex flex-col items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-black/50 flex items-center justify-center">
              <Play className="w-10 h-10 text-white ml-1" fill="white" />
            </div>
            <span
              className="text-gray-600"
              style={{
                fontFamily: 'var(--font-dm-sans)',
                fontWeight: 400,
                fontSize: '16px',
              }}
            >
              Video Placeholder
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

