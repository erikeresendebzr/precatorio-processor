import { anthropic } from "@ai-sdk/anthropic"
import { generateObject } from "ai"
import { z } from "zod"

export const maxDuration = 30

const PrecatorioSchema = z.object({
  data_base: z.string().describe("Data base no formato YYYY-MM-DD"),
  principal: z.number().describe("Valor principal em formato decimal"),
  juros: z.number().describe("Valor dos juros em formato decimal"),
  total: z.number().describe("Valor total em formato decimal"),
  iamsp: z.number().nullable().describe("Valor IAMSP ou null se não aplicável"),
  spprev: z.number().nullable().describe("Valor SPPREV ou null se não aplicável"),
  meses_rra: z.number().nullable().describe("Quantidade de meses RRA ou null se não aplicável"),
  desconto_hospitalar: z.number().nullable().describe("Valor do desconto hospitalar ou null se não aplicável"),
  remuneratorio: z.boolean().nullable().describe("Se é remuneratório, não remuneratório ou null se não aplicável"),
})

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return new Response("Nenhum arquivo enviado", { status: 400 })
    }

    // Verificar tipo de arquivo
    const validTypes = ["application/pdf", "image/jpeg", "image/png", "image/jpg"]
    if (!validTypes.includes(file.type)) {
      return new Response("Tipo de arquivo não suportado", { status: 400 })
    }

    const result = await generateObject({
      model: anthropic("claude-3-5-sonnet-latest"),
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `Analise este documento de precatório e extraia os dados conforme os níveis especificados:

NÍVEL 1 - DADOS BÁSICOS:
- data_base (formato YYYY-MM-DD)
- principal (valor decimal)
- juros (valor decimal)  
- total (valor decimal)
- Demais campos: null
- remuneratorio: false (para licença prêmio)

NÍVEL 2 - INCLUI CONTRIBUIÇÕES:
- Todos os dados do Nível 1
- iamsp (valor decimal se presente)
- spprev (valor decimal se presente)
- meses_rra (número inteiro se presente)
- remuneratorio: true
- desconto_hospitalar: null

NÍVEL 3 - DADOS BÁSICOS + REMUNERATÓRIO:
- data_base, principal, juros, total
- remuneratorio: true
- Demais campos: null

NÍVEL 4 - DADOS COMPLETOS:
- Todos os dados básicos
- spprev (valor decimal)
- desconto_hospitalar (valor decimal)
- meses_rra (número inteiro)
- remuneratorio: true
- iamsp: null

NÍVEL BONUS - DADOS ESPECIAIS:
- data_base, principal, juros, total
- meses_rra (número inteiro)
- iamsp: null
- spprev: null
- desconto_hospitalar: null
- remuneratorio: null

INSTRUÇÕES:
1. Identifique automaticamente qual nível se aplica baseado nos dados disponíveis
2. Extraia apenas os valores numéricos (sem símbolos de moeda)
3. Use null para campos não aplicáveis ao nível identificado
4. Formato de data: YYYY-MM-DD
5. Valores monetários: números decimais com 2 casas
6. Se não conseguir identificar um valor, use null

Retorne os dados no formato JSON especificado.`,
            },
            {
              type: "file",
              data: await file.arrayBuffer(),
              mimeType: file.type,
            },
          ],
        },
      ],
      schema: PrecatorioSchema,
    })

    return Response.json(result.object)
  } catch (error) {
    console.error("Erro ao processar documento:", error)
    return new Response("Erro interno do servidor", { status: 500 })
  }
}
