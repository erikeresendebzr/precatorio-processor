"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Upload, FileText, ImageIcon, Loader2, Sparkles, X, CheckCircle, AlertCircle, Download } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Logo } from "@/components/logo"
import { Progress } from "@/components/ui/progress"

interface PrecatorioData {
  data_base: string
  principal: number
  juros: number
  total: number
  iamsp: number | null
  spprev: number | null
  meses_rra: number | null
  desconto_hospitalar: number | null
  remuneratorio: boolean | null
}

interface FileProcessingResult {
  file: File
  status: 'pending' | 'processing' | 'completed' | 'error'
  result?: PrecatorioData
  error?: string
}

// Loading Component
const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete()
    }, 3000)
    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-32 h-32 bg-blue-100 rounded-full animate-pulse opacity-20"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-blue-200 rounded-full animate-pulse opacity-30" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-10 w-16 h-16 bg-blue-150 rounded-full animate-pulse opacity-25" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Loading Bot */}
      <div className="relative z-10 text-center">
        <div className="mb-8 transform animate-bounce">
          <svg width="120" height="120" viewBox="0 0 120 120" fill="none" className="mx-auto">
            {/* Bot head */}
            <rect x="30" y="35" width="60" height="50" rx="10" fill="#3b82f6" className="animate-pulse" />
            
            {/* Bot eyes - with winking animation */}
            <circle cx="45" cy="55" r="5" fill="white" />
            <circle cx="75" cy="55" r="5" fill="white" className="animate-ping" />
            
            {/* Eye pupils */}
            <circle cx="45" cy="55" r="3" fill="#1e40af" />
            <circle cx="75" cy="55" r="3" fill="#1e40af" className="animate-pulse" />
            
            {/* Winking effect on right eye */}
            <rect x="70" y="53" width="10" height="4" fill="#3b82f6" className="animate-pulse" style={{ animationDelay: '0.5s' }} />
            
            {/* Bot mouth */}
            <rect x="50" y="70" width="20" height="6" rx="3" fill="white" />
            
            {/* Bot antenna */}
            <line x1="60" y1="35" x2="60" y2="20" stroke="#3b82f6" strokeWidth="4" />
            <circle cx="60" cy="20" r="4" fill="#3b82f6" className="animate-ping" />
          </svg>
        </div>
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-blue-600 mb-2">PRECABOT</h2>
          <p className="text-slate-600">Inicializando sistema...</p>
        </div>
        {/* Loading dots */}
        <div className="flex justify-center space-x-2 mt-6">
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  )
}

export default function PrecatorioProcessor() {
  const [files, setFiles] = useState<FileProcessingResult[]>([])
  const [processing, setProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isInitialLoading, setIsInitialLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  const MAX_FILES = 15

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || [])
    
    if (selectedFiles.length === 0) return

    if (files.length + selectedFiles.length > MAX_FILES) {
      setError(`Máximo de ${MAX_FILES} arquivos permitidos`)
      return
    }

    const validTypes = ["application/pdf", "image/jpeg", "image/png", "image/jpg"]
    const invalidFiles = selectedFiles.filter(file => !validTypes.includes(file.type))
    
    if (invalidFiles.length > 0) {
      setError("Por favor, selecione apenas arquivos PDF ou imagens (JPEG, PNG)")
      return
    }

    const newFiles: FileProcessingResult[] = selectedFiles.map(file => ({
      file,
      status: 'pending'
    }))

    setFiles(prev => [...prev, ...newFiles])
    setError(null)
  }

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index))
  }

  const processFile = async (fileResult: FileProcessingResult): Promise<FileProcessingResult> => {
    try {
      const formData = new FormData()
      formData.append("file", fileResult.file)

      const response = await fetch("/api/process-precatorio", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Erro ao processar o documento")
      }

      const data = await response.json()
      return {
        ...fileResult,
        status: 'completed',
        result: data
      }
    } catch (err) {
      return {
        ...fileResult,
        status: 'error',
        error: err instanceof Error ? err.message : "Erro desconhecido"
      }
    }
  }

  const handleProcessAll = async () => {
    if (files.length === 0) {
      setError("Por favor, selecione pelo menos um arquivo")
      return
    }

    setProcessing(true)
    setError(null)
    setProgress(0)

    // Marcar todos como processing
    setFiles(prev => prev.map(file => ({ ...file, status: 'processing' as const })))

    try {
      const promises = files.map(fileResult => processFile(fileResult))
      
      // Processar com atualizações de progresso
      const results: FileProcessingResult[] = []
      for (let i = 0; i < promises.length; i++) {
        const result = await promises[i]
        results.push(result)
        setProgress(((i + 1) / promises.length) * 100)
        
        // Atualizar o estado individual do arquivo
        setFiles(prev => prev.map((file, index) => 
          index === i ? result : file
        ))
      }

    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido")
    } finally {
      setProcessing(false)
    }
  }

  const getFileIcon = (fileType: string) => {
    if (fileType === "application/pdf") {
      return <FileText className="h-5 w-5 text-red-500" />
    }
    return <ImageIcon className="h-5 w-5 text-blue-500" />
  }

  const getStatusIcon = (status: FileProcessingResult['status']) => {
    switch (status) {
      case 'pending':
        return <div className="w-4 h-4 bg-slate-300 rounded-full" />
      case 'processing':
        return <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-500" />
    }
  }

  const exportResults = () => {
    const completedResults = files.filter(f => f.status === 'completed' && f.result)
    const data = completedResults.map((f, index) => ({
      arquivo: f.file.name,
      ...f.result
    }))
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `precatorios_processados_${new Date().toISOString().split('T')[0]}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const completedCount = files.filter(f => f.status === 'completed').length
  const errorCount = files.filter(f => f.status === 'error').length

  if (isInitialLoading) {
    return <LoadingScreen onComplete={() => setIsInitialLoading(false)} />
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Modern Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
        {/* Floating geometric shapes */}
        <div className="absolute top-20 left-20 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-slate-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute -bottom-8 left-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-25 animate-pulse" style={{ animationDelay: '4s' }}></div>
        
        {/* Circuit pattern overlay */}
        <div className="absolute inset-0 opacity-5">
          <svg width="100%" height="100%" className="absolute inset-0">
            <defs>
              <pattern id="circuit" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                <path d="M10 10h80v80h-80z" fill="none" stroke="#3b82f6" strokeWidth="0.5"/>
                <circle cx="20" cy="20" r="2" fill="#3b82f6"/>
                <circle cx="80" cy="80" r="2" fill="#3b82f6"/>
                <path d="M20 20h60v60" fill="none" stroke="#3b82f6" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#circuit)"/>
          </svg>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <div className="relative">
          <div className="container mx-auto px-4 py-16">
            <div className="text-center mb-12">
              <div className="flex justify-center mb-8 overflow-visible">
                <Logo />
              </div>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
                Processe até <span className="font-semibold text-blue-600">{MAX_FILES} documentos</span> de precatórios simultaneamente com nossa{" "}
                <span className="font-semibold text-blue-600">
                  inteligência artificial avançada
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 pb-16">
          <div className="max-w-7xl mx-auto space-y-8">
            
            {/* Upload Section */}
            <Card className="bg-white/90 backdrop-blur-sm border border-slate-200 shadow-xl">
              <CardHeader className="pb-6">
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                    <Upload className="h-5 w-5 text-white" />
                  </div>
                  Upload de Documentos
                  <span className="text-sm font-normal text-slate-500">
                    ({files.length}/{MAX_FILES})
                  </span>
                </CardTitle>
                <CardDescription className="text-base text-slate-600">
                  Selecione até {MAX_FILES} arquivos PDF ou imagens contendo os dados dos precatórios
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <Label htmlFor="files" className="text-sm font-medium text-slate-700">
                    Arquivos dos Documentos
                  </Label>
                  <div className="relative">
                    <Input
                      id="files"
                      type="file"
                      multiple
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={handleFileChange}
                      disabled={files.length >= MAX_FILES}
                      className="h-12 border-2 border-dashed border-slate-300 hover:border-blue-400 transition-colors duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                  </div>
                </div>

                {/* Files List */}
                {files.length > 0 && (
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {files.map((fileResult, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200">
                        {getFileIcon(fileResult.file.type)}
                        <div className="flex-1">
                          <p className="font-medium text-slate-800 text-sm">{fileResult.file.name}</p>
                          <p className="text-xs text-slate-500">{(fileResult.file.size / 1024 / 1024).toFixed(2)} MB</p>
                        </div>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(fileResult.status)}
                          {fileResult.status === 'error' && fileResult.error && (
                            <span className="text-xs text-red-500 max-w-32 truncate" title={fileResult.error}>
                              {fileResult.error}
                            </span>
                          )}
                          {!processing && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFile(index)}
                              className="h-6 w-6 p-0 hover:bg-red-100"
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {error && (
                  <Alert variant="destructive" className="border-red-200 bg-red-50">
                    <AlertDescription className="text-red-700">{error}</AlertDescription>
                  </Alert>
                )}

                {processing && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Processando arquivos...</span>
                      <span>{Math.round(progress)}%</span>
                    </div>
                    <Progress value={progress} className="w-full" />
                  </div>
                )}

                <div className="flex gap-3">
                  <Button
                    onClick={handleProcessAll}
                    disabled={files.length === 0 || processing}
                    className="flex-1 h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {processing ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Processando {files.length} arquivo{files.length !== 1 ? 's' : ''}...
                      </>
                    ) : (
                      <>
                        <Sparkles className="mr-2 h-5 w-5" />
                        Processar {files.length} Documento{files.length !== 1 ? 's' : ''}
                      </>
                    )}
                  </Button>
                  
                  {completedCount > 0 && (
                    <Button
                      onClick={exportResults}
                      variant="outline"
                      className="h-12 px-6 border-blue-200 text-blue-600 hover:bg-blue-50"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Exportar JSON
                    </Button>
                  )}
                </div>

                {/* Status Summary */}
                {files.length > 0 && (
                  <div className="flex gap-4 text-sm text-slate-600">
                    <span>✅ Concluídos: {completedCount}</span>
                    <span>❌ Erros: {errorCount}</span>
                    <span>⏳ Pendentes: {files.length - completedCount - errorCount}</span>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Results Section */}
            {files.some(f => f.status === 'completed') && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-slate-800">Resultados da Análise</h2>
                
                <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
                  {files.filter(f => f.status === 'completed').map((fileResult, index) => (
                    <Card key={index} className="bg-white/90 backdrop-blur-sm border border-slate-200 shadow-xl">
                      <CardHeader className="pb-4">
                        <CardTitle className="flex items-center gap-2 text-lg">
                          {getFileIcon(fileResult.file.type)}
                          <span className="truncate">{fileResult.file.name}</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        {fileResult.result && (
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-3">
                              {[
                                { label: "Data Base", value: fileResult.result.data_base, icon: "📅" },
                                { label: "Principal", value: `R$ ${fileResult.result.principal.toFixed(2)}`, icon: "💰" },
                                { label: "Juros", value: `R$ ${fileResult.result.juros.toFixed(2)}`, icon: "📈" },
                                { label: "Total", value: `R$ ${fileResult.result.total.toFixed(2)}`, icon: "🎯", highlight: true },
                              ].map((item, idx) => (
                                <div
                                  key={idx}
                                  className={`p-3 rounded-lg border text-center ${
                                    item.highlight
                                      ? "bg-blue-50 border-blue-200"
                                      : "bg-slate-50 border-slate-200"
                                  }`}
                                >
                                  <div className="text-lg mb-1">{item.icon}</div>
                                  <Label className="text-xs font-medium text-slate-600 block">{item.label}</Label>
                                  <p className={`font-mono text-sm ${item.highlight ? "font-bold text-blue-700" : "text-slate-800"}`}>
                                    {item.value}
                                  </p>
                                </div>
                              ))}
                            </div>
                            
                            <div className="text-center">
                              <Label className="text-xs font-medium text-slate-600">Remuneratório</Label>
                              <p className="text-sm font-medium">
                                {fileResult.result.remuneratorio === null ? "N/A" : fileResult.result.remuneratorio ? "✅ Sim" : "❌ Não"}
                              </p>
                            </div>

                            <details className="group">
                              <summary className="cursor-pointer text-sm text-blue-600 hover:text-blue-800 font-medium">
                                Ver dados completos
                              </summary>
                              <div className="mt-2 p-3 bg-slate-900 rounded-lg">
                                <pre className="text-xs text-green-400 overflow-x-auto">
                                  {JSON.stringify(fileResult.result, null, 2)}
                                </pre>
                              </div>
                            </details>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
