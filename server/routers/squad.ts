import { z } from "zod";
import { publicProcedure, router } from "../_core/trpc";
import { invokeLLM } from "../_core/llm";
import { storagePut } from "../storage";
import { nanoid } from "nanoid";
import { filterValidHeroes, validateSquadComposition, correctCommonMisidentifications } from "../utils/heroValidation";
import { identifyHeroesFromDescriptions, VisualDescription } from "../utils/heroMatcher";
import { extractHeroNames, extractMarkup, validateAndCleanData } from "../utils/heroNameExtractor";
import { SQUAD_ANALYSIS_PROMPT } from "../utils/squadAnalysisPrompt";
import { validateSquadAnalysis, parseUnstructuredSquadData } from "../utils/squadDataParser";

const uploadImageInputSchema = z.object({
  imageBase64: z.string().min(1, "Imagem não pode estar vazia"),
  fileName: z.string().optional(),
});

const analyzeSquadInputSchema = z.object({
  imageBase64: z.string().min(1, "Imagem não pode estar vazia"),
  fileName: z.string().optional(),
  squadName: z.string().optional(),
});

const analyzeChipsInputSchema = z.object({
  chipType: z.string().describe('Tipo de chip: Movement, Attack, Interference, Defense'),
  rarity: z.string().describe('Raridade: R, SR, SSR, UR'),
  currentLevel: z.number().optional().describe('Nível atual do chip'),
  droneType: z.string().optional().describe('Tipo de drone: Tanque, Missil, Aereo'),
});

// Função auxiliar para extrair JSON de texto com regex
function extractJsonFromText(text: string): Record<string, any> | null {
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (jsonMatch) {
    try {
      return JSON.parse(jsonMatch[0]);
    } catch {
      return null;
    }
  }
  return null;
}

export const squadRouter = router({
  analyzeSquad: publicProcedure
    .input(analyzeSquadInputSchema)
    .mutation(async ({ input }) => {
      try {
        // Upload da imagem para S3
        const imageKey = `squad-analysis/${nanoid()}.png`;
        const { url: imageUrl } = await storagePut(
          imageKey,
          Buffer.from(input.imageBase64.split(',')[1], 'base64'),
          'image/png'
        );

        // Chamar Gemini com prompt otimizado
        const response = await invokeLLM({
          messages: [
            {
              role: "user",
              content: [
                {
                  type: "text",
                  text: SQUAD_ANALYSIS_PROMPT,
                },
                {
                  type: "image_url",
                  image_url: {
                    url: imageUrl,
                    detail: "low",
                  },
                },
              ],
            },
          ],
        });

        const content = response.choices[0]?.message.content;
        if (!content || typeof content !== "string") {
          throw new Error("Resposta inválida do LLM");
        }

        console.log("Resposta bruta (squad):", content.substring(0, 500));

        // Tentar extrair JSON
        let analysis: any = extractJsonFromText(content);
        if (!analysis) {
          // Fallback: extrair dados do texto bruto
          analysis = parseUnstructuredSquadData(content);
        }

        // Validar dados
        analysis = validateSquadAnalysis(analysis);

        // Extrair nomes de heróis com fuzzy matching
        const heroDescriptions: VisualDescription[] = [];
        if (analysis.analysis?.detectedHeroes) {
          for (const hero of analysis.analysis.detectedHeroes) {
            heroDescriptions.push({
              position: hero.position || "unknown",
              colors: hero.colors || [],
              characteristics: [hero.name || ""],
              role: hero.role || "Unknown",
              confidence: hero.confidence || 0.5,
            });
          }
        }

        // Usar fuzzy matching para identificar heróis
        const identifiedHeroes = identifyHeroesFromDescriptions(heroDescriptions);
        const validatedHeroes = filterValidHeroes(identifiedHeroes as any) as any;
        const correctedHeroes = correctCommonMisidentifications(validatedHeroes);

        // Validar composição do esquadrão
        const squadComposition = validateSquadComposition(correctedHeroes);

        // Converter recomendações para estrutura correta
        const recommendations = analysis.analysis.recommendations || [];
        if (Array.isArray(recommendations) && recommendations.length > 0 && typeof recommendations[0] === 'string') {
          const structuredRecommendations = (recommendations as string[]).map((rec: string, idx: number) => ({
            title: (rec as any).split(':')[0] || 'Recomendação',
            description: rec.split(':')[1] || rec,
            priority: idx === 0 ? 'high' : idx === 1 ? 'medium' : 'low' as 'high' | 'medium' | 'low'
          }));
          (analysis.analysis.recommendations as any) = structuredRecommendations;
        }

        return {
          success: true,
          analysis,
          detectedHeroes: identifiedHeroes.map((h: any) => ({ name: h.name || h.heroName || 'Unknown', confidence: h.confidence || 0.5, role: h.role || 'Unknown' })),
          timestamp: new Date().toISOString(),
          identificationMethod: "fuzzy_matching",
          visualDescriptions: heroDescriptions,
        };
      } catch (error) {
        console.error("Erro ao analisar esquadrão:", error);
        throw new Error(
          `Falha ao analisar esquadrão: ${error instanceof Error ? error.message : "Erro desconhecido"}`
        );
      }
    }),

  analyzeHero: publicProcedure
    .input(uploadImageInputSchema)
    .mutation(async ({ input }) => {
      try {
        const imageKey = `hero-analysis/${nanoid()}.png`;
        const { url: imageUrl } = await storagePut(
          imageKey,
          Buffer.from(input.imageBase64.split(',')[1], 'base64'),
          'image/png'
        );

        const heroAnalysisPrompt = `Analise esta imagem de um heroi individual e extraia em JSON:
{
  "heroName": "nome do heroi",
  "level": numero,
  "rarity": "R/SR/SSR/UR",
  "stats": {"atk": numero, "def": numero, "hp": numero},
  "equippedChips": [{"name": "chip", "type": "tipo", "level": numero}],
  "recommendations": ["recomendacao 1", "recomendacao 2"],
  "improvements": ["melhoria 1", "melhoria 2"]
}`;

        const response = await invokeLLM({
          messages: [
            {
              role: "user",
              content: [
                { type: "text", text: heroAnalysisPrompt },
                { type: "image_url", image_url: { url: imageUrl, detail: "high" } },
              ],
            },
          ],
        });

        const content = response.choices[0]?.message.content;
        let heroData: any = {};
        
        if (content && typeof content === "string") {
          const jsonMatch = content.match(/\{[\s\S]*\}/);
          if (jsonMatch) {
            try {
              heroData = JSON.parse(jsonMatch[0]);
            } catch {
              heroData = {
                heroName: "Heroi Desconhecido",
                level: 0,
                rarity: "R",
                stats: {},
                equippedChips: [],
                recommendations: [],
                improvements: [],
              };
            }
          }
        }

        return {
          success: true,
          heroName: heroData.heroName || "Heroi Desconhecido",
          level: heroData.level || 0,
          rarity: heroData.rarity || "R",
          stats: heroData.stats || {},
          equippedChips: heroData.equippedChips || [],
          recommendations: heroData.recommendations || [],
          improvements: heroData.improvements || [],
          timestamp: new Date().toISOString(),
        };
      } catch (error) {
        console.error("Erro ao analisar heroi:", error);
        throw new Error(
          `Falha ao analisar heroi: ${error instanceof Error ? error.message : "Erro desconhecido"}`
        );
      }
    }),
});
