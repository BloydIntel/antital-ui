import React from 'react'
import Image from 'next/image'

interface ImagePlaceholderProps {
  width?: string
  height?: string
  className?: string
  imageUrl?: string
}

export function ImagePlaceholder({
  width = '816px',
  height = '352px',
  className = '',
  imageUrl,
}: ImagePlaceholderProps) {
  const widthNum = parseInt(width.replace('px', ''))
  const heightNum = parseInt(height.replace('px', ''))
  const aspectRatio = widthNum / heightNum

  return (
    <div
      className={`w-full relative overflow-hidden rounded ${className}`}
      style={{
        maxWidth: width,
        aspectRatio: `${aspectRatio}`,
        minHeight: '200px',
        background: imageUrl ? undefined : '#D9D9D9',
      }}
    >
      {imageUrl && (
        <Image
          src={imageUrl}
          alt=""
          fill
          className="object-cover"
          sizes="816px"
        />
      )}
    </div>
  )
}
