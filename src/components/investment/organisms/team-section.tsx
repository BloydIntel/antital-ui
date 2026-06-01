import React from 'react'
import { TeamMember as TeamMemberCard } from '@/components/investment/molecules/team-member'

export interface TeamMemberData {
  name: string
  title: string
  bio: string
  imagePath?: string | null
}

interface TeamSectionProps {
  members: TeamMemberData[]
}

export function TeamSection({ members }: TeamSectionProps) {
  return (
    <div className="flex flex-col items-start w-full" style={{ maxWidth: '816px', gap: '48px' }}>
      <h2
        className="text-foreground"
        style={{
          fontFamily: 'var(--font-rethink-sans)',
          fontWeight: 500,
          fontSize: '36px',
          lineHeight: '43px',
          letterSpacing: '-0.01em',
        }}
      >
        Our Team
      </h2>

      <div className="flex flex-col items-start w-full" style={{ gap: '48px' }}>
        {members.map((member, index) => (
          <TeamMemberCard
            key={`${member.name}-${index}`}
            name={member.name}
            title={member.title}
            bio={member.bio}
            imagePath={member.imagePath ?? '/avatars/default.jpg'}
          />
        ))}
      </div>
    </div>
  )
}
