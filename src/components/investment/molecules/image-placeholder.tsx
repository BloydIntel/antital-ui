import React from 'react'

interface ImagePlaceholderProps {
  width?: string
  height?: string
  className?: string
}

export function ImagePlaceholder({ 
  width = '816px', 
  height = '352px',
  className = ''
}: ImagePlaceholderProps) {
  // Calculate aspect ratio from width and height
  const widthNum = parseInt(width.replace('px', ''))
  const heightNum = parseInt(height.replace('px', ''))
  const aspectRatio = widthNum / heightNum
  
  return (
    <div
      className={`w-full ${className}`}
      style={{
        maxWidth: width,
        aspectRatio: `${aspectRatio}`,
        minHeight: '200px',
        background: '#D9D9D9',
      }}
    />
  )
}

