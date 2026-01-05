import React from 'react'
import { AnsweredQuestion } from '@/components/investment/molecules/answered-question'

export function AnsweredQuestionsSection() {
  // Hardcoded answered questions for now
  const questions = [
    {
      question: 'What is your plan for protecting the Quantum-Sync Engine from being reverse-engineered by competitors?',
      answeredBy: 'Alex Chen, CTO',
      answer: 'We have filed for two foundational patents covering the core methodology and have a dedicated internal team focused on data encryption. Furthermore, the true value is in our proprietary, clean dataset, which is impossible for competitors to replicate quickly.',
    },
    {
      question: 'Your valuation cap seems high. What justifies the $25M?',
      answeredBy: 'Dr. Eleanor Vance, CEO',
      answer: 'The cap is justified by our 150% YoY growth and exceptionally strong LTV:CAC ratio. We are not a concept; we are a proven, high-margin, scalable SaaS business entering its accelerated growth phase. Our metrics compare favourably to platforms that raised at higher valuations in the last 18 months.',
    },
    {
      question: 'How will new currency volatility affect your projections?',
      answeredBy: 'Head of Finance',
      answer: 'Our revenue model is predominantly structured in USD/EUR for global clients and Naira for local clients, with natural hedging built in through our operational cost base. Our financial model (see the Details tab) accounts for a 15% annual currency depreciation stress test.',
    },
  ]

  return (
    <div
      className="flex flex-col items-start w-full"
      style={{
        maxWidth: '816px',
        gap: '32px',
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
        Some answered questions
      </h2>

      {/* Answered Questions List */}
      <div
        className="flex flex-col items-start w-full"
        style={{
          gap: '48px',
        }}
      >
        {questions.map((q, index) => (
          <AnsweredQuestion
            key={index}
            question={q.question}
            answeredBy={q.answeredBy}
            answer={q.answer}
          />
        ))}
      </div>
    </div>
  )
}

