import React from 'react'

interface AnsweredQuestionProps {
  question: string
  answeredBy: string
  answer: string
}

export function AnsweredQuestion({ question, answeredBy, answer }: AnsweredQuestionProps) {
  return (
    <div
      className="flex flex-col items-start w-full"
      style={{
        gap: '12px',
      }}
    >
      {/* Question */}
      <div
        className="w-full text-foreground"
        style={{
          fontFamily: 'var(--font-dm-sans)',
          fontWeight: 700,
          fontSize: '16px',
          lineHeight: '21px',
          letterSpacing: '0.01em',
        }}
      >
        <span style={{ fontWeight: 700 }}>Q:</span> {question}
      </div>

      {/* Answered By */}
      <div
        className="w-full text-muted-foreground"
        style={{
          fontFamily: 'var(--font-dm-sans)',
          fontWeight: 400,
          fontSize: '14px',
          lineHeight: '17px',
          letterSpacing: '-0.01em',
        }}
      >
        Answered by: {answeredBy}
      </div>

      {/* Answer */}
      <div
        className="w-full text-foreground"
        style={{
          fontFamily: 'var(--font-dm-sans)',
          fontWeight: 400,
          fontSize: '16px',
          lineHeight: '21px',
          letterSpacing: '0.01em',
        }}
      >
        <span style={{ fontWeight: 500 }}>Ans:</span> {answer}
      </div>
    </div>
  )
}

