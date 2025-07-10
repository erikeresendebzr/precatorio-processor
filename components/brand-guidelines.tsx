import { Logo, LogoCompact } from "./logo"
import { BrandPalette } from "./brand-colors"

export function BrandGuidelines() {
  return (
    <div className="max-w-6xl mx-auto p-8 space-y-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Manual da Marca PrecatoIA</h1>
        <p className="text-xl text-gray-600">Diretrizes de identidade visual e uso da marca</p>
      </div>

      {/* Logo Showcase */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-gray-900">Logotipo</h2>

        <div className="grid gap-8">
          <div className="bg-white p-8 rounded-lg border">
            <h3 className="text-lg font-semibold mb-4">Versão Principal</h3>
            <Logo size="large" />
          </div>

          <div className="bg-white p-8 rounded-lg border">
            <h3 className="text-lg font-semibold mb-4">Versão Compacta</h3>
            <LogoCompact />
          </div>

          <div className="bg-gray-900 p-8 rounded-lg">
            <h3 className="text-lg font-semibold mb-4 text-white">Sobre Fundo Escuro</h3>
            <div className="filter brightness-110">
              <Logo size="medium" />
            </div>
          </div>
        </div>
      </section>

      {/* Brand Colors */}
      <section>
        <BrandPalette />
      </section>

      {/* Typography */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-gray-900">Tipografia</h2>

        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Fonte Principal: Inter</h3>
            <div className="space-y-2">
              <p className="text-4xl font-bold">PrecatoIA</p>
              <p className="text-2xl font-semibold">Inteligência Artificial Jurídica</p>
              <p className="text-lg font-medium">Análise automatizada de documentos</p>
              <p className="text-base font-normal">Processamento inteligente de precatórios com tecnologia de ponta</p>
            </div>
          </div>
        </div>
      </section>

      {/* Usage Guidelines */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-gray-900">Diretrizes de Uso</h2>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 bg-green-50 border border-green-200 rounded-lg">
            <h3 className="text-lg font-semibold text-green-800 mb-3">✅ Permitido</h3>
            <ul className="space-y-2 text-green-700">
              <li>• Usar as cores oficiais da marca</li>
              <li>• Manter proporções originais</li>
              <li>• Usar sobre fundos neutros</li>
              <li>• Versão compacta em espaços pequenos</li>
            </ul>
          </div>

          <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
            <h3 className="text-lg font-semibold text-red-800 mb-3">❌ Não Permitido</h3>
            <ul className="space-y-2 text-red-700">
              <li>• Alterar cores ou proporções</li>
              <li>• Usar sobre fundos com baixo contraste</li>
              <li>• Distorcer ou inclinar o logo</li>
              <li>• Separar elementos do logotipo</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Brand Values */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-gray-900">Valores da Marca</h2>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-blue-50 rounded-lg">
            <div className="w-12 h-12 bg-blue-600 rounded-lg mx-auto mb-4 flex items-center justify-center">
              <span className="text-white text-xl">🎯</span>
            </div>
            <h3 className="text-lg font-semibold text-blue-900 mb-2">Precisão</h3>
            <p className="text-blue-700">Análise precisa e confiável de documentos jurídicos</p>
          </div>

          <div className="text-center p-6 bg-amber-50 rounded-lg">
            <div className="w-12 h-12 bg-amber-600 rounded-lg mx-auto mb-4 flex items-center justify-center">
              <span className="text-white text-xl">⚡</span>
            </div>
            <h3 className="text-lg font-semibold text-amber-900 mb-2">Agilidade</h3>
            <p className="text-amber-700">Processamento rápido e eficiente</p>
          </div>

          <div className="text-center p-6 bg-gray-50 rounded-lg">
            <div className="w-12 h-12 bg-gray-600 rounded-lg mx-auto mb-4 flex items-center justify-center">
              <span className="text-white text-xl">🔒</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Segurança</h3>
            <p className="text-gray-700">Proteção total dos dados e documentos</p>
          </div>
        </div>
      </section>
    </div>
  )
}
