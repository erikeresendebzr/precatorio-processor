import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "PRECABOT - Inteligência Jurídica",
  description: "Análise automatizada de documentos de precatórios com inteligência artificial avançada",
  keywords: "precatório, bot, inteligência artificial, jurídico, análise de documentos",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
