"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Download, Palette, Image, FileImage } from "lucide-react"
import { Logo, LogoCompact } from "@/components/logo"
import Link from "next/link"

// Componente para logo apenas com o robô
const RobotOnly = ({ size = 120 }: { size?: number }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="botGradientOnly" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1e40af" />
          <stop offset="25%" stopColor="#3b82f6" />
          <stop offset="50%" stopColor="#60a5fa" />
          <stop offset="75%" stopColor="#93c5fd" />
          <stop offset="100%" stopColor="#dbeafe" />
        </linearGradient>
      </defs>

      {/* Main bot head shape */}
      <rect
        x="15"
        y="20"
        width="50"
        height="45"
        rx="8"
        fill="url(#botGradientOnly)"
      />

      {/* Bot eyes */}
      <circle cx="27" cy="37" r="4" fill="#ffffff" />
      <circle cx="53" cy="37" r="4" fill="#ffffff" />

      {/* Bot eye pupils */}
      <circle cx="27" cy="37" r="2" fill="#1e40af" />
      <circle cx="53" cy="37" r="2" fill="#1e40af" />

      {/* Bot mouth/display */}
      <rect
        x="30"
        y="47"
        width="20"
        height="8"
        rx="2"
        fill="#ffffff"
      />

      {/* Bot antenna */}
      <line 
        x1="40" 
        y1="20" 
        x2="40" 
        y2="10" 
        stroke="url(#botGradientOnly)" 
        strokeWidth="3"
      />
      <circle cx="40" cy="10" r="3" fill="url(#botGradientOnly)" />

      {/* Bot status indicators */}
      <circle cx="20" cy="30" r="2" fill="#10b981" />
      <circle cx="60" cy="30" r="2" fill="#3b82f6" />
    </svg>
  )
}

// Componente para logo com texto PRECABOT
const LogoWithText = ({ size = 300 }: { size?: number }) => {
  const scale = size / 300
  
  return (
    <svg
      width={size}
      height={size * 0.4}
      viewBox="0 0 300 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="primaryGradientDownload" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1e40af" />
          <stop offset="50%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#60a5fa" />
        </linearGradient>
        <linearGradient id="botGradientDownload" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1e40af" />
          <stop offset="25%" stopColor="#3b82f6" />
          <stop offset="50%" stopColor="#60a5fa" />
          <stop offset="75%" stopColor="#93c5fd" />
          <stop offset="100%" stopColor="#dbeafe" />
        </linearGradient>
      </defs>

      {/* Robot */}
      <g transform="translate(10, 25)">
        <rect x="15" y="10" width="40" height="35" rx="6" fill="url(#botGradientDownload)" />
        <circle cx="25" cy="22" r="3" fill="#ffffff" />
        <circle cx="45" cy="22" r="3" fill="#ffffff" />
        <circle cx="25" cy="22" r="1.5" fill="#1e40af" />
        <circle cx="45" cy="22" r="1.5" fill="#1e40af" />
        <rect x="27" y="30" width="16" height="6" rx="1.5" fill="#ffffff" />
        <line x1="35" y1="10" x2="35" y2="3" stroke="url(#botGradientDownload)" strokeWidth="2.5" />
        <circle cx="35" cy="3" r="2.5" fill="url(#botGradientDownload)" />
        <circle cx="18" cy="18" r="1.5" fill="#10b981" />
        <circle cx="52" cy="18" r="1.5" fill="#3b82f6" />
      </g>

      {/* Text */}
      <g transform="translate(80, 35)">
        <text
          x="0"
          y="25"
          fontFamily="Inter, system-ui, sans-serif"
          fontSize="32"
          fontWeight="900"
          fill="url(#primaryGradientDownload)"
          letterSpacing="-1px"
        >
          PRECABOT
        </text>
        <text
          x="0"
          y="45"
          fontFamily="Inter, system-ui, sans-serif"
          fontSize="10"
          fontWeight="600"
          fill="#374151"
          letterSpacing="2px"
        >
          INTELIGÊNCIA JURÍDICA
        </text>
      </g>
    </svg>
  )
}

export default function LogoDownloadPage() {
  const [selectedOption, setSelectedOption] = useState<'robot' | 'full'>('robot')
  const [selectedSize, setSelectedSize] = useState(256)

  const downloadSVG = (element: SVGSVGElement, filename: string) => {
    const svgData = new XMLSerializer().serializeToString(element)
    const blob = new Blob([svgData], { type: 'image/svg+xml' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${filename}.svg`
    link.click()
    URL.revokeObjectURL(url)
  }

  const downloadPNG = async (svgElement: SVGSVGElement, filename: string, size: number) => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const img = new window.Image()
    
    canvas.width = size
    canvas.height = selectedOption === 'robot' ? size : size * 0.4
    
    const svgData = new XMLSerializer().serializeToString(svgElement)
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' })
    const url = URL.createObjectURL(svgBlob)
    
    img.onload = () => {
      if (ctx) {
        ctx.fillStyle = 'transparent'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
        
        canvas.toBlob((blob) => {
          if (blob) {
            const pngUrl = URL.createObjectURL(blob)
            const link = document.createElement('a')
            link.href = pngUrl
            link.download = `${filename}_${size}px.png`
            link.click()
            URL.revokeObjectURL(pngUrl)
          }
        }, 'image/png')
      }
      URL.revokeObjectURL(url)
    }
    
    img.src = url
  }

  const handleDownload = (format: 'svg' | 'png') => {
    const svgElement = document.getElementById('download-logo') as unknown as SVGSVGElement
    if (!svgElement) return

    const filename = selectedOption === 'robot' ? 'precabot-robot' : 'precabot-logo'
    
    if (format === 'svg') {
      downloadSVG(svgElement, filename)
    } else {
      downloadPNG(svgElement, filename, selectedSize)
    }
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Modern Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
        <div className="absolute top-20 left-20 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-slate-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute -bottom-8 left-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-25 animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Link href="/">
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Voltar
              </Button>
            </Link>
            <div className="flex items-center gap-3">
              <LogoCompact />
            </div>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            {/* Título */}
            <div className="text-center">
              <h1 className="text-4xl font-bold text-slate-800 mb-4">Download do Logo</h1>
              <p className="text-xl text-slate-600">
                Baixe o logo do PRECABOT em diferentes formatos e tamanhos
              </p>
            </div>

            {/* Opções de Logo */}
            <Card className="bg-white/90 backdrop-blur-sm border border-slate-200 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <Palette className="h-6 w-6 text-blue-600" />
                  Escolha o Tipo de Logo
                </CardTitle>
                <CardDescription>
                  Selecione se deseja apenas o robô ou o logo completo com texto
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Apenas Robô */}
                  <div 
                    className={`p-6 rounded-lg border-2 cursor-pointer transition-all ${
                      selectedOption === 'robot' 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-slate-200 bg-white hover:border-blue-300'
                    }`}
                    onClick={() => setSelectedOption('robot')}
                  >
                    <div className="text-center space-y-4">
                      <div className="flex justify-center">
                        <RobotOnly size={80} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-800">Apenas Robô</h3>
                        <p className="text-sm text-slate-600">Logo do robô sem texto</p>
                        <Badge variant={selectedOption === 'robot' ? 'default' : 'outline'} className="mt-2">
                          Formato quadrado
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Logo Completo */}
                  <div 
                    className={`p-6 rounded-lg border-2 cursor-pointer transition-all ${
                      selectedOption === 'full' 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-slate-200 bg-white hover:border-blue-300'
                    }`}
                    onClick={() => setSelectedOption('full')}
                  >
                    <div className="text-center space-y-4">
                      <div className="flex justify-center">
                        <LogoWithText size={200} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-800">Logo Completo</h3>
                        <p className="text-sm text-slate-600">Robô + texto PRECABOT</p>
                        <Badge variant={selectedOption === 'full' ? 'default' : 'outline'} className="mt-2">
                          Formato retangular
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Preview e Download */}
            <Card className="bg-white/90 backdrop-blur-sm border border-slate-200 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <Image className="h-6 w-6 text-green-600" />
                  Preview e Download
                </CardTitle>
                <CardDescription>
                  Visualize e baixe o logo no formato desejado
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Tamanhos para PNG */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-slate-800">Tamanho para PNG:</h4>
                  <div className="flex flex-wrap gap-2">
                    {[64, 128, 256, 512, 1024].map((size) => (
                      <Button
                        key={size}
                        variant={selectedSize === size ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedSize(size)}
                      >
                        {size}px
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Preview */}
                <div className="bg-gray-100 rounded-lg p-8 flex justify-center items-center min-h-[200px]">
                  <div className="bg-white rounded-lg p-6 shadow-lg">
                    {selectedOption === 'robot' ? (
                      <RobotOnly size={120} />
                    ) : (
                      <LogoWithText size={300} />
                    )}
                  </div>
                </div>

                {/* Logo oculto para download */}
                <div className="hidden">
                  {selectedOption === 'robot' ? (
                    <RobotOnly size={selectedSize} />
                  ) : (
                    <LogoWithText size={selectedSize} />
                  )}
                </div>

                {/* Renderizar logo para download */}
                <div className="hidden">
                  {selectedOption === 'robot' ? (
                    <svg
                      id="download-logo"
                      width={selectedSize}
                      height={selectedSize}
                      viewBox="0 0 80 80"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <defs>
                        <linearGradient id="botGradientDownloadHidden" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#1e40af" />
                          <stop offset="25%" stopColor="#3b82f6" />
                          <stop offset="50%" stopColor="#60a5fa" />
                          <stop offset="75%" stopColor="#93c5fd" />
                          <stop offset="100%" stopColor="#dbeafe" />
                        </linearGradient>
                      </defs>
                      <rect x="15" y="20" width="50" height="45" rx="8" fill="url(#botGradientDownloadHidden)" />
                      <circle cx="27" cy="37" r="4" fill="#ffffff" />
                      <circle cx="53" cy="37" r="4" fill="#ffffff" />
                      <circle cx="27" cy="37" r="2" fill="#1e40af" />
                      <circle cx="53" cy="37" r="2" fill="#1e40af" />
                      <rect x="30" y="47" width="20" height="8" rx="2" fill="#ffffff" />
                      <line x1="40" y1="20" x2="40" y2="10" stroke="url(#botGradientDownloadHidden)" strokeWidth="3" />
                      <circle cx="40" cy="10" r="3" fill="url(#botGradientDownloadHidden)" />
                      <circle cx="20" cy="30" r="2" fill="#10b981" />
                      <circle cx="60" cy="30" r="2" fill="#3b82f6" />
                    </svg>
                  ) : (
                    <svg
                      id="download-logo"
                      width={selectedSize}
                      height={selectedSize * 0.4}
                      viewBox="0 0 300 120"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <defs>
                        <linearGradient id="primaryGradientDownloadHidden" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#1e40af" />
                          <stop offset="50%" stopColor="#3b82f6" />
                          <stop offset="100%" stopColor="#60a5fa" />
                        </linearGradient>
                        <linearGradient id="botGradientDownloadHidden2" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#1e40af" />
                          <stop offset="25%" stopColor="#3b82f6" />
                          <stop offset="50%" stopColor="#60a5fa" />
                          <stop offset="75%" stopColor="#93c5fd" />
                          <stop offset="100%" stopColor="#dbeafe" />
                        </linearGradient>
                      </defs>
                      <g transform="translate(10, 25)">
                        <rect x="15" y="10" width="40" height="35" rx="6" fill="url(#botGradientDownloadHidden2)" />
                        <circle cx="25" cy="22" r="3" fill="#ffffff" />
                        <circle cx="45" cy="22" r="3" fill="#ffffff" />
                        <circle cx="25" cy="22" r="1.5" fill="#1e40af" />
                        <circle cx="45" cy="22" r="1.5" fill="#1e40af" />
                        <rect x="27" y="30" width="16" height="6" rx="1.5" fill="#ffffff" />
                        <line x1="35" y1="10" x2="35" y2="3" stroke="url(#botGradientDownloadHidden2)" strokeWidth="2.5" />
                        <circle cx="35" cy="3" r="2.5" fill="url(#botGradientDownloadHidden2)" />
                        <circle cx="18" cy="18" r="1.5" fill="#10b981" />
                        <circle cx="52" cy="18" r="1.5" fill="#3b82f6" />
                      </g>
                      <g transform="translate(80, 35)">
                        <text x="0" y="25" fontFamily="Inter, system-ui, sans-serif" fontSize="32" fontWeight="900" fill="url(#primaryGradientDownloadHidden)" letterSpacing="-1px">PRECABOT</text>
                        <text x="0" y="45" fontFamily="Inter, system-ui, sans-serif" fontSize="10" fontWeight="600" fill="#374151" letterSpacing="2px">INTELIGÊNCIA JURÍDICA</text>
                      </g>
                    </svg>
                  )}
                </div>

                {/* Botões de Download */}
                <div className="flex flex-wrap gap-4 justify-center">
                  <Button
                    onClick={() => handleDownload('svg')}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
                  >
                    <Download className="h-4 w-4" />
                    Download SVG
                  </Button>
                  <Button
                    onClick={() => handleDownload('png')}
                    variant="outline"
                    className="flex items-center gap-2 border-blue-200 text-blue-600 hover:bg-blue-50"
                  >
                    <FileImage className="h-4 w-4" />
                    Download PNG ({selectedSize}px)
                  </Button>
                </div>

                {/* Informações */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">ℹ️ Informações dos Formatos:</h4>
                  <div className="text-sm text-blue-700 space-y-1">
                    <p><strong>SVG:</strong> Formato vetorial, escalável sem perda de qualidade</p>
                    <p><strong>PNG:</strong> Formato bitmap com fundo transparente, ideal para web e impressão</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
} 