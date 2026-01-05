import React from 'react'
import { UpdateItem } from '@/components/investment/molecules/update-item'

export function UpdatesSection() {
  // Hardcoded updates data for now
  const updates = [
    {
      date: 'Today',
      title: '🎉 75% Goal Reached! Only $625K left 🎉',
      body: "Thank you to our 310 investors who have joined us! We are on track to close early. We're hosting a Founder AMA this Friday to answer all final questions before the final push.",
      likeCount: 45,
    },
    {
      date: '04 Oct 2025',
      title: 'Quantum-Sync Engine V3.0 is Live',
      body: "Introducing 'Predictive Rerouting.' This new feature automatically detects major supply chain anomalies (e.g., port closures, extreme weather) and reroutes cargo up to 48 hours in advance, reducing client delay costs by an average of 18%.",
      likeCount: 90,
    },
    {
      date: '27 Sept 2025',
      title: 'Major Client Acquisition: Signed "Agri-West Produce"',
      body: "We've secured a 3-year contract with Agri-West, a key player in West African fresh produce distribution. This validates our expansion into the cold chain logistics sector. ARR impact: +$80,000.",
      likeCount: 2,
    },
    {
      date: '19 Sept 2025',
      title: 'A Note on Global Expansion Plans.',
      body: 'From Dr. Vance, CEO) Our vision isn\'t limited to our current markets. The capital from this round will be used to secure our first dedicated sales hires in two new key markets: Kenya and South Africa. See the Details tab for updated financial projections.',
      likeCount: 32,
    },
  ]

  return (
    <div
      className="flex flex-col items-start w-full relative"
      style={{
        maxWidth: '816px',
        gap: '32px',
        paddingLeft: '120px',
      }}
    >
      {/* Continuous Vertical Line */}
      <div
        className="absolute left-[120px] top-0 bottom-0"
        style={{
          width: '1px',
          backgroundColor: '#EAEAEA',
        }}
      />

      {updates.map((update, index) => (
        <div key={index} className="w-full relative">
          <UpdateItem
            date={update.date}
            title={update.title}
            body={update.body}
            likeCount={update.likeCount}
          />
        </div>
      ))}
    </div>
  )
}

