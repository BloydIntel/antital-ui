"use client"

import React from 'react'
import { Navbar } from '@/components/landing/organisms/navbar'
import { Footer } from '@/components/landing/organisms/footer'

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main className="relative">
        {children}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
