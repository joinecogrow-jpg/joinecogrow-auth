import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'JoinEcoGrow - Revolutionary Sustainable Living Platform',
  description: '750+ features for eco-growing, tree planting, and sustainable living',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
