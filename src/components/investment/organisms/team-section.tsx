import React from 'react'
import { TeamMember } from '@/components/investment/molecules/team-member'

export function TeamSection() {
  // Hardcoded team data for now
  const teamMembers = [
    {
      name: 'Dr. Eleanor Vance',
      title: 'CEO & Co-founder',
      bio: '20 years in global logistics and supply chain optimization. Former VP of Operations at TransGlobal Freight, where she managed a ₦750B annual budget and spearheaded the adoption of AI modeling. Ph.D. in Operations Research from MIT.',
      imagePath: '/avatars/dr_eleanor.jpg',
    },
    {
      name: 'Alex Chen',
      title: 'CTO & Co-founder',
      bio: '15 years in developing scalable machine learning platforms. Lead engineer at DataSolve Corp., where he built predictive models used by three Fortune 500 companies. Architect of the Quantum-Sync Engine. M.S. in Computer Science.',
      imagePath: '/avatars/alex_chen.jpg',
    },
  ]

  return (
    <div
      className="flex flex-col items-start w-full"
      style={{
        maxWidth: '816px',
        gap: '48px',
      }}
    >
      {/* Section Heading */}
      <h2
        style={{
          fontFamily: 'var(--font-rethink-sans)',
          fontWeight: 500,
          fontSize: '36px',
          lineHeight: '43px',
          letterSpacing: '-0.01em',
          color: '#2C2C2C',
        }}
      >
        Our Team
      </h2>

      {/* Team Members List */}
      <div
        className="flex flex-col items-start w-full"
        style={{
          gap: '48px',
        }}
      >
        {teamMembers.map((member, index) => (
          <TeamMember
            key={index}
            name={member.name}
            title={member.title}
            bio={member.bio}
            imagePath={member.imagePath}
          />
        ))}
      </div>
    </div>
  )
}

