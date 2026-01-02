import { Rethink_Sans, DM_Sans } from 'next/font/google'

// Configure Rethink Sans font for Antital headings
export const rethinkSans = Rethink_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-rethink-sans',
  weight: ['400', '500', '600', '700', '800'],
})

// Configure DM Sans font for Antital body text
export const dmSans = DM_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-dm-sans',
  weight: ['400', '500', '600', '700'],
})
