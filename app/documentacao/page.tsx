"use client"

import type React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, FileText, Calculator, Calendar, DollarSign, Scale, AlertTriangle, CheckCircle, Info } from "lucide-react"
import { Logo } from "@/components/logo"
import Link from "next/link"

export default function DocumentacaoPage() {
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
        {/* Header */}
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-4 mb-8">
            <Link href="/">
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Voltar
              </Button>
            </Link>
            <div className="flex items-center gap-3">
              <Logo />
            </div>
          </div>

          <div className="max-w-6xl mx-auto space-y-8">
            {/* Título Principal */}
            <div className="text-center">
              <h1 className="text-4xl font-bold text-slate-800 mb-4">Documentação Técnica</h1>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Entenda como o PRECABOT analisa e extrai informações de documentos de precatórios usando inteligência artificial avançada
              </p>
            </div>

            {/* Visão Geral */}
            <Card className="bg-white/90 backdrop-blur-sm border border-slate-200 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <FileText className="h-6 w-6 text-blue-600" />
                  Objetivo do Projeto
                </CardTitle>
              </CardHeader>
              <CardContent className="prose prose-slate max-w-none">
                <p className="text-lg text-slate-700 leading-relaxed">
                  O objetivo é extrair informações centrais de um documento jurídico relacionado a um <strong>precatório</strong>. 
                  Esse documento contém <strong>dados do processo</strong> e também <strong>informações financeiras</strong>, 
                  como <strong>valores principais, descontos e valor Total</strong>.
                </p>
                <p className="text-slate-600">
                  A tarefa do agente é identificar e organizar essas informações de forma estruturada, incluindo a 
                  <strong> Data Base</strong> usada no cálculo.
                </p>
              </CardContent>
            </Card>

            {/* Data Base */}
            <Card className="bg-white/90 backdrop-blur-sm border border-slate-200 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <Calendar className="h-6 w-6 text-green-600" />
                  Data Base
                </CardTitle>
                <CardDescription>
                  Momento de referência para cálculo dos valores do precatório
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-green-800 font-medium mb-2">Definição:</p>
                  <p className="text-green-700">
                    A <strong>Data Base</strong> é o momento de referência utilizado para realizar o cálculo dos valores do precatório, 
                    e costuma ser definida após o início do processo.
                  </p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold text-slate-800">Pode aparecer como:</h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">Data de Cálculo</Badge>
                      <Badge variant="outline">Data de Número de Cálculo</Badge>
                      <Badge variant="outline">Data Base</Badge>
                      <Badge variant="outline">Atualização</Badge>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-semibold text-slate-800">Formato:</h4>
                    <p className="text-slate-600">
                      <code className="bg-slate-100 px-2 py-1 rounded">AAAA/MM/DD</code>
                    </p>
                    <p className="text-sm text-slate-500">
                      Quando não houver dia especificado, considera-se o último dia do mês.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Valor Principal */}
            <Card className="bg-white/90 backdrop-blur-sm border border-slate-200 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <DollarSign className="h-6 w-6 text-blue-600" />
                  Valor Principal
                </CardTitle>
                <CardDescription>
                  Montante da condenação atualizado com correção monetária até a Data Base
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-blue-800 font-medium mb-2">Fórmula:</p>
                  <code className="text-blue-700 bg-blue-100 px-3 py-2 rounded block">
                    Valor Principal = [Valor da causa] + [Correção monetária até a data base]
                  </code>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="flex items-center gap-2 font-semibold text-green-700 mb-3">
                        <CheckCircle className="h-4 w-4" />
                        O que considerar
                      </h4>
                      <div className="space-y-2">
                        {[
                          'Valor Principal',
                          'Principal Atualizado',
                          'Principal Líquido',
                          'Valor Corrigido',
                          'Valor Total Corrigido',
                          'Montante Corrigido'
                        ].map((item, index) => (
                          <Badge key={index} variant="secondary" className="mr-2 mb-2">
                            {item}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="flex items-center gap-2 font-semibold text-red-700 mb-3">
                        <AlertTriangle className="h-4 w-4" />
                        O que NÃO considerar
                      </h4>
                      <div className="space-y-2">
                        {[
                          'Diferença Total',
                          'Diferença Apurada',
                          'Valor Total Apurado',
                          'Subtotais sem correção'
                        ].map((item, index) => (
                          <Badge key={index} variant="destructive" className="mr-2 mb-2">
                            {item}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h4 className="flex items-center gap-2 font-semibold text-yellow-800 mb-2">
                    <Info className="h-4 w-4" />
                    Regra Importante
                  </h4>
                  <p className="text-yellow-700">
                    Se houver um valor denominado <strong>"Valor Total Corrigido"</strong>, e ele vier antes dos juros, 
                    então esse é o Valor Principal.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Juros */}
            <Card className="bg-white/90 backdrop-blur-sm border border-slate-200 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <Calculator className="h-6 w-6 text-orange-600" />
                  Juros de Mora
                </CardTitle>
                <CardDescription>
                  Juros aplicados ao valor do precatório, separados da correção monetária
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-slate-800 mb-3">Pode aparecer como:</h4>
                    <div className="space-y-2">
                      <Badge variant="outline">Juros</Badge>
                      <Badge variant="outline">Juros de Mora</Badge>
                    </div>
                  </div>
                  
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                    <h4 className="font-semibold text-orange-800 mb-2">⚠️ Importante:</h4>
                    <p className="text-orange-700 text-sm">
                      <strong>Não confundir os Juros com a Correção Monetária.</strong><br/>
                      A correção monetária já está considerada dentro do Valor Principal.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Descontos Legais */}
            <Card className="bg-white/90 backdrop-blur-sm border border-slate-200 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <Scale className="h-6 w-6 text-purple-600" />
                  Descontos Legais
                </CardTitle>
                <CardDescription>
                  Identificação e extração de descontos aplicados no precatório
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <h4 className="font-semibold text-purple-800 mb-2">🔍 O que são Descontos Legais?</h4>
                  <p className="text-purple-700 text-sm">
                    São valores retidos diretamente sobre o montante bruto do precatório, normalmente destinados a 
                    órgãos como Previdência ou assistência médica estadual. O agente deve considerar tanto os 
                    <strong> valores totais</strong> quanto os <strong>valores mensais distribuídos em tabelas</strong>.
                  </p>
                </div>

                {/* Tipos de Descontos */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-slate-800">Tipos de Descontos que devem ser extraídos:</h4>
                  
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                      <h5 className="font-semibold text-slate-800 mb-2">1. Descontos Previdenciários</h5>
                      <div className="space-y-1">
                        <Badge variant="outline" className="text-xs">Previdência</Badge>
                        <Badge variant="outline" className="text-xs">SPPREV</Badge>
                        <Badge variant="outline" className="text-xs">PREVIDENCIÁRIOS</Badge>
                        <Badge variant="outline" className="text-xs">Previdenciários 11%</Badge>
                      </div>
                    </div>

                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                      <h5 className="font-semibold text-slate-800 mb-2">2. Desconto IAMSP</h5>
                      <div className="space-y-1">
                        <Badge variant="outline" className="text-xs">IAMSP</Badge>
                        <Badge variant="outline" className="text-xs">Descontos IAMSP</Badge>
                        <Badge variant="outline" className="text-xs">Instituto de Assistência Médica</Badge>
                      </div>
                    </div>

                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                      <h5 className="font-semibold text-slate-800 mb-2">3. Desconto Hospitalar</h5>
                      <div className="space-y-1">
                        <Badge variant="outline" className="text-xs">Desconto Hospitalar</Badge>
                        <Badge variant="outline" className="text-xs">Desconto Médico</Badge>
                        <Badge variant="outline" className="text-xs">Assistência Médica</Badge>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Como identificar */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">🧠 Como identificar os valores:</h4>
                  <p className="text-blue-700 text-sm">
                    O Agente deve buscar por colunas ou campos com <strong>nomes similares aos termos acima</strong> e 
                    extrair os valores correspondentes.
                  </p>
                </div>

                {/* Formatos */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-slate-800">📌 Existem dois formatos possíveis:</h4>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Formato Resumido */}
                    <div className="space-y-3">
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <h5 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
                          <span className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">1</span>
                          Formato Resumido
                        </h5>
                        <p className="text-green-700 text-sm mb-3">
                          Os descontos aparecem como <strong>valores totais</strong> dentro de um quadro de resumo.
                        </p>
                        
                        <div className="bg-green-100 border border-green-300 rounded p-3 font-mono text-xs">
                          <div>Descontos Previdenciários: R$ XXXX</div>
                          <div>Descontos (IAMSP): R$ XXX</div>
                          <div>Desconto Hospitalar: R$ XXX</div>
                        </div>
                        
                        <div className="mt-2 flex items-center gap-2 text-green-700">
                          <CheckCircle className="h-4 w-4" />
                          <span className="text-sm">O agente deve extrair cada valor e indicar seu tipo.</span>
                        </div>
                      </div>
                    </div>

                    {/* Formato Tabelado */}
                    <div className="space-y-3">
                      <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                        <h5 className="font-semibold text-orange-800 mb-2 flex items-center gap-2">
                          <span className="bg-orange-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">2</span>
                          Formato Tabelado
                        </h5>
                        <p className="text-orange-700 text-sm mb-3">
                          Os descontos aparecem em <strong>colunas específicas</strong>, dentro de uma tabela mensal.
                        </p>
                        
                        <div className="bg-orange-100 border border-orange-300 rounded p-3">
                          <div className="text-xs font-mono mb-2">Exemplos de cabeçalhos:</div>
                          <div className="grid grid-cols-3 gap-1 text-xs">
                            <Badge variant="secondary" className="text-xs">Previdência</Badge>
                            <Badge variant="secondary" className="text-xs">IAMSP</Badge>
                            <Badge variant="secondary" className="text-xs">Desc. Hospitalar</Badge>
                          </div>
                        </div>
                        
                        <div className="mt-2 flex items-center gap-2 text-orange-700">
                          <CheckCircle className="h-4 w-4" />
                          <span className="text-sm">O agente deve <strong>somar todos os valores da coluna</strong> e informar o total por tipo.</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Observação importante */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-start gap-2">
                    <Info className="h-5 w-5 text-yellow-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-yellow-800 mb-1">Observação Importante:</h4>
                      <p className="text-yellow-700 text-sm">
                        O sistema deve ser capaz de identificar descontos mesmo quando aparecem com nomenclaturas 
                        ligeiramente diferentes, priorizando a extração correta dos valores independentemente do formato.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Total */}
            <Card className="bg-white/90 backdrop-blur-sm border border-slate-200 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <DollarSign className="h-6 w-6 text-green-600" />
                  Valor Total
                </CardTitle>
                <CardDescription>
                  Valor final do precatório após todos os cálculos
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-green-800 font-medium mb-2">Fórmula:</p>
                  <code className="text-green-700 bg-green-100 px-3 py-2 rounded block">
                    Total = Valor Principal + Juros de Mora (se houver)
                  </code>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-slate-800 mb-3">Pode aparecer como:</h4>
                    <div className="space-y-2">
                      <Badge variant="outline">Valor Total</Badge>
                      <Badge variant="outline">Total Geral</Badge>
                      <Badge variant="outline">Montante Final</Badge>
                      <Badge variant="outline">Total Devido</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Classificação Remuneratório vs Indenizatório */}
            <Card className="bg-white/90 backdrop-blur-sm border border-slate-200 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <Scale className="h-6 w-6 text-indigo-600" />
                  Classificação: Remuneratório vs Indenizatório
                </CardTitle>
                <CardDescription>
                  Critérios para classificar corretamente o tipo de precatório
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Remuneratório */}
                  <div className="space-y-4">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <h3 className="font-bold text-green-800 mb-3 flex items-center gap-2">
                        <CheckCircle className="h-5 w-5" />
                        🟩 REMUNERATÓRIO
                      </h3>
                      <p className="text-green-700 text-sm mb-3">
                        Verbas de natureza salarial, trabalhista ou de vencimentos recebidos acumuladamente.
                      </p>
                      
                      <h4 className="font-semibold text-green-800 mb-2">Indícios (2 ou mais):</h4>
                      <ul className="text-sm text-green-700 space-y-1">
                        <li>• Vínculo trabalhista/funcional</li>
                        <li>• Tabela por competência mensal</li>
                        <li>• Período bem definido</li>
                        <li>• RRA maior que zero</li>
                        <li>• Reflexos de folha de pagamento</li>
                      </ul>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-semibold text-green-800">Palavras-chave:</h4>
                      <div className="flex flex-wrap gap-1">
                        {['salário', 'vencimentos', 'proventos', '1/3 férias', 'quinquênio', '13º salário'].map((item, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {item}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Indenizatório */}
                  <div className="space-y-4">
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <h3 className="font-bold text-yellow-800 mb-3 flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5" />
                        🟨 INDENIZATÓRIO
                      </h3>
                      <p className="text-yellow-700 text-sm mb-3">
                        Obrigações pontuais, sem vínculo mensal ou salarial.
                      </p>
                      
                      <h4 className="font-semibold text-yellow-800 mb-2">Características:</h4>
                      <ul className="text-sm text-yellow-700 space-y-1">
                        <li>• Ausência de vínculo trabalhista</li>
                        <li>• Cálculo em linha única</li>
                        <li>• Data base única</li>
                        <li>• RRA igual a zero</li>
                      </ul>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-semibold text-yellow-800">Palavras-chave:</h4>
                      <div className="flex flex-wrap gap-1">
                        {['indenização', 'licença prêmio', 'danos morais', 'honorários'].map((item, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {item}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* RRA */}
                <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
                  <h4 className="font-semibold text-indigo-800 mb-2">📆 RRA (Rendimentos Recebidos Acumuladamente)</h4>
                  <div className="grid md:grid-cols-2 gap-4 text-sm text-indigo-700">
                    <div>
                      <strong>Como calcular:</strong>
                      <ul className="mt-1 space-y-1">
                        <li>• Identifique primeiro e último mês/ano</li>
                        <li>• Calcule o intervalo de tempo</li>
                        <li>• RRA = total do período acumulado</li>
                      </ul>
                    </div>
                    <div>
                      <strong>Relevância:</strong>
                      <ul className="mt-1 space-y-1">
                        <li>• <strong>RRA &gt; 0</strong> → Remuneratório</li>
                        <li>• <strong>RRA = 0</strong> → Reforça Indenizatório</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Conclusão */}
            <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 shadow-xl">
              <CardContent className="pt-6">
                <div className="text-center space-y-4">
                  <h3 className="text-2xl font-bold text-blue-800">
                    Sistema Inteligente de Análise
                  </h3>
                  <p className="text-blue-700 max-w-3xl mx-auto">
                    O PRECABOT utiliza esses critérios para analisar documentos de forma precisa e consistente, 
                    extraindo informações estruturadas que facilitam o processamento de precatórios.
                  </p>
                  <div className="flex justify-center pt-4">
                    <Link href="/">
                      <Button className="bg-blue-600 hover:bg-blue-700">
                        Testar o Sistema
                      </Button>
                    </Link>
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