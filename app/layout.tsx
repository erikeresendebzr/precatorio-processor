import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "PRECABOT - Inteligência Jurídica Para Precatórios",
  description: "Análise automatizada de documentos de precatórios com inteligência artificial avançada",
  keywords: "precatório, bot, inteligência artificial, jurídico, análise de documentos",
  generator: 'v0.dev',
  icons: {
    icon: '/precabot.ico',
    shortcut: '/precabot.ico',
    apple: '/precabot.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="icon" href="/precabot.ico" sizes="any" />
        <link rel="icon" href="/precabot.ico" type="image/x-icon" />
        <link rel="shortcut icon" href="/precabot.ico" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
