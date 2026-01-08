import React from 'react'
import Image from 'next/image'

interface TeamMemberProps {
  name: string
  title: string
  bio: string
  imagePath: string
}

export function TeamMember({ name, title, bio, imagePath }: TeamMemberProps) {
  return (
    <div
      className="flex flex-row items-start w-full"
      style={{
        gap: '16px',
      }}
    >
      {/* Profile Image */}
      <div
        className="flex-shrink-0"
        style={{
          width: '80px',
          height: '80px',
          borderRadius: '4px',
          overflow: 'hidden',
        }}
      >
        <Image
          src={imagePath}
          alt={name}
          width={80}
          height={80}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Text Content - Name, Title, and Biography */}
      <div
        className="flex flex-col items-start flex-1"
        style={{
          gap: '8px',
        }}
      >
        {/* Name and Title */}
        <div
          className="flex flex-row items-center flex-wrap"
          style={{
            gap: '8px',
          }}
        >
          {/* Name */}
          <span
            className="text-foreground"
            style={{
              fontFamily: 'var(--font-dm-sans)',
              fontWeight: 700,
              fontSize: '20px',
              lineHeight: '24px',
              letterSpacing: '-0.01em',
            }}
          >
            {name}
          </span>

          {/* Title */}
          <span
            className="text-muted-foreground"
            style={{
              fontFamily: 'var(--font-dm-sans)',
              fontWeight: 400,
              fontSize: '16px',
              lineHeight: '21px',
              letterSpacing: '-0.01em',
            }}
          >
            {title}
          </span>
        </div>

        {/* Biography */}
        <p
          className="w-full text-muted-foreground"
          style={{
            fontFamily: 'var(--font-dm-sans)',
            fontWeight: 400,
            fontSize: '16px',
            lineHeight: '21px',
            letterSpacing: '0.01em',
          }}
        >
          {bio}
        </p>
      </div>
    </div>
  )
}

