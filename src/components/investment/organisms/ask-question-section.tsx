'use client'

import React, { useState } from 'react'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { AnsweredQuestionsSection } from '@/components/investment/organisms/answered-questions-section'

export function AskQuestionSection() {
  const [question, setQuestion] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Question submitted:', question)
  }

  return (
    <div
      className="flex flex-col items-start w-full"
      style={{
        maxWidth: '816px',
        gap: '24px',
      }}
    >
      {/* Section Heading */}
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
        Ask a Question
      </h2>

      {/* Explanatory Paragraph */}
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
        Use the form below to ask the NEXUS AI team a direct question. We aim to post answers to all unique, relevant questions within 48 hours.
      </p>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-end w-full"
        style={{
          gap: '16px',
        }}
      >
        {/* Textarea */}
        <Textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Submit your question"
          className="w-full min-h-[200px] resize-none bg-white dark:bg-white border border-[#EAEAEA] dark:border-[#404040] text-[#2C2C2C] dark:text-[#2C2C2C] placeholder:text-[#858585] dark:placeholder:text-[#858585]"
          style={{
            fontFamily: 'var(--font-dm-sans)',
            fontWeight: 400,
            fontSize: '16px',
            lineHeight: '21px',
            letterSpacing: '0.01em',
            borderRadius: '4px',
            padding: '16px',
          }}
        />

        {/* Submit Button */}
        <Button
          type="submit"
          className="bg-white dark:bg-white border border-[#A8A8A8] dark:border-[#404040] text-[#2C2C2C] dark:text-[#2C2C2C] hover:bg-[#A7B832] hover:text-[#11110F] hover:border-[#A7B832] dark:hover:bg-[#A7B832] dark:hover:text-[#11110F] dark:hover:border-[#A7B832] rounded transition-colors"
          style={{
            fontFamily: 'var(--font-dm-sans)',
            fontWeight: 500,
            fontSize: '16px',
            lineHeight: '21px',
            letterSpacing: '0.01em',
            padding: '8px 16px',
            minWidth: 'fit-content',
          }}
        >
          Submit
        </Button>
      </form>

      {/* Answered Questions Section */}
      <div style={{ marginTop: '64px', width: '100%' }}>
        <AnsweredQuestionsSection />
      </div>
    </div>
  )
}

