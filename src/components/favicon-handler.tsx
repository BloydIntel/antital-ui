'use client'

import { useEffect } from 'react'

export function FaviconHandler() {
  useEffect(() => {
    // Remove any existing favicon links
    const existingLinks = document.querySelectorAll('link[rel="icon"]')
    existingLinks.forEach((link) => link.remove())

    // Add light mode favicon
    const lightLink = document.createElement('link')
    lightLink.rel = 'icon'
    lightLink.href = '/favicon.ico'
    lightLink.media = '(prefers-color-scheme: light)'
    document.head.appendChild(lightLink)

    // Add dark mode favicon
    const darkLink = document.createElement('link')
    darkLink.rel = 'icon'
    darkLink.href = '/favicon-dark.ico'
    darkLink.media = '(prefers-color-scheme: dark)'
    document.head.appendChild(darkLink)

    // Add default favicon as fallback
    const defaultLink = document.createElement('link')
    defaultLink.rel = 'icon'
    defaultLink.href = '/favicon.ico'
    document.head.appendChild(defaultLink)
  }, [])

  return null
}

