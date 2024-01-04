import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Track Definitions',
  description: 'Track Definition Tool',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark:bg-slate-900 dark:text-white">
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <body className={inter.className}>{children}</body>
    </html>
  )
}
