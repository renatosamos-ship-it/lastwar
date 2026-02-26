// Parser para extrair dados estruturados de análise de esquadrão

export interface SquadHero {
  position: number;
  name: string;
  level: number;
  rarity: number; // 1-5 stars
  role: 'Tank' | 'Aircraft' | 'Missile' | 'Support' | 'Unknown';
  confidence?: number;
}

export interface InventoryHero {
  name: string;
  level: number;
  rarity: number;
  copies: number;
}

export interface SquadComposition {
  tanks: number;
  aircraft: number;
  missile: number;
  support: number;
}

export interface SquadAnalysisData {
  squad: {
    heroes: SquadHero[];
    composition: SquadComposition;
  };
  inventory: {
    totalHeroes: number;
    heroes: InventoryHero[];
  };
  analysis: {
    squadType: string;
    powerLevel?: number;
    strengths: string[];
    weaknesses: string[];
    recommendations: Array<{ title: string; description: string; priority: 'high' | 'medium' | 'low' }> | string[];
    nextSteps: {
      shortTerm: string[];
      mediumTerm: string[];
      longTerm: string[];
    };
  };
}

// Função para extrair nível de texto (ex: "Nv. 175" ou "Lv.175")
export function extractLevel(text: string): number {
  const match = text.match(/(?:Nv\.|Lv\.)\s*(\d+)/i);
  return match ? parseInt(match[1], 10) : 0;
}

// Função para contar estrelas em texto
export function countStars(text: string): number {
  const starCount = (text.match(/★|⭐/g) || []).length;
  return starCount > 0 ? starCount : 0;
}

// Função para extrair número de cópias
export function extractCopies(text: string): number {
  const match = text.match(/(\d+)\s*(?:cópias|copies|x)?/i);
  return match ? parseInt(match[1], 10) : 1;
}

// Função para validar e limpar dados de análise
export function validateSquadAnalysis(data: any): SquadAnalysisData {
  const validated: SquadAnalysisData = {
    squad: {
      heroes: [],
      composition: {
        tanks: 0,
        aircraft: 0,
        missile: 0,
        support: 0
      }
    },
    inventory: {
      totalHeroes: 0,
      heroes: []
    },
    analysis: {
      squadType: 'Unknown',
      strengths: [],
      weaknesses: [],
      recommendations: [],
      nextSteps: {
        shortTerm: [],
        mediumTerm: [],
        longTerm: []
      }
    }
  };

  // Validar heróis do esquadrão
  if (data.squad?.heroes && Array.isArray(data.squad.heroes)) {
    validated.squad.heroes = data.squad.heroes
      .filter((h: any) => h && h.name)
      .map((h: any) => ({
        position: h.position || 0,
        name: String(h.name).trim(),
        level: Number(h.level) || 0,
        rarity: Number(h.rarity) || 0,
        role: ['Tank', 'Aircraft', 'Missile', 'Support'].includes(h.role) ? h.role : 'Unknown',
        confidence: Number(h.confidence) || 0.5
      }));

    // Recalcular composição baseado em heróis
    validated.squad.composition = {
      tanks: validated.squad.heroes.filter(h => h.role === 'Tank').length,
      aircraft: validated.squad.heroes.filter(h => h.role === 'Aircraft').length,
      missile: validated.squad.heroes.filter(h => h.role === 'Missile').length,
      support: validated.squad.heroes.filter(h => h.role === 'Support').length
    };
  }

  // Validar inventário
  if (data.inventory?.heroes && Array.isArray(data.inventory.heroes)) {
    validated.inventory.heroes = data.inventory.heroes
      .filter((h: any) => h && h.name)
      .map((h: any) => ({
        name: String(h.name).trim(),
        level: Number(h.level) || 0,
        rarity: Number(h.rarity) || 0,
        copies: Number(h.copies) || 1
      }));
    
    validated.inventory.totalHeroes = validated.inventory.heroes.length;
  }

  // Validar análise
  if (data.analysis) {
    validated.analysis.squadType = String(data.analysis.squadType || 'Unknown');
    validated.analysis.powerLevel = Number(data.analysis.powerLevel) || undefined;
    
    validated.analysis.strengths = Array.isArray(data.analysis.strengths)
      ? data.analysis.strengths.filter((s: any) => typeof s === 'string' && s.length > 0)
      : [];
    
    validated.analysis.weaknesses = Array.isArray(data.analysis.weaknesses)
      ? data.analysis.weaknesses.filter((w: any) => typeof w === 'string' && w.length > 0)
      : [];
    
    validated.analysis.recommendations = Array.isArray(data.analysis.recommendations)
      ? data.analysis.recommendations.filter((r: any) => typeof r === 'string' && r.length > 0)
      : [];

    if (data.analysis.nextSteps) {
      validated.analysis.nextSteps.shortTerm = Array.isArray(data.analysis.nextSteps.shortTerm)
        ? data.analysis.nextSteps.shortTerm.filter((s: any) => typeof s === 'string' && s.length > 0)
        : [];
      
      validated.analysis.nextSteps.mediumTerm = Array.isArray(data.analysis.nextSteps.mediumTerm)
        ? data.analysis.nextSteps.mediumTerm.filter((m: any) => typeof m === 'string' && m.length > 0)
        : [];
      
      validated.analysis.nextSteps.longTerm = Array.isArray(data.analysis.nextSteps.longTerm)
        ? data.analysis.nextSteps.longTerm.filter((l: any) => typeof l === 'string' && l.length > 0)
        : [];
    }
  }

  return validated;
}

// Função para extrair dados de texto não-estruturado
export function parseUnstructuredSquadData(text: string): Partial<SquadAnalysisData> {
  const result: Partial<SquadAnalysisData> = {
    squad: { heroes: [], composition: { tanks: 0, aircraft: 0, missile: 0, support: 0 } },
    inventory: { totalHeroes: 0, heroes: [] },
    analysis: { squadType: 'Unknown', strengths: [], weaknesses: [], recommendations: [], nextSteps: { shortTerm: [], mediumTerm: [], longTerm: [] } }
  };

  // Procura por seções de heróis
  const heroSectionMatch = text.match(/(?:heróis|heroes|squad)[:\s]+([\s\S]*?)(?=(?:análise|analysis|pontos|strengths|weaknesses|inventory|inventário)|$)/i);
  if (heroSectionMatch) {
    const heroLines = heroSectionMatch[1].split(/[\n•\-*]/);
    let position = 1;
    for (const line of heroLines) {
      if (line.trim().length > 0) {
        const level = extractLevel(line);
        const rarity = countStars(line);
        if (level > 0 || rarity > 0) {
          result.squad!.heroes!.push({
            position: position++,
            name: line.replace(/(?:Nv\.|Lv\.)\s*\d+/i, '').replace(/★|⭐/g, '').trim(),
            level,
            rarity,
            role: 'Unknown'
          });
        }
      }
    }
  }

  // Procura por pontos fortes
  const strengthsMatch = text.match(/(?:pontos\s+fortes|strengths)[:\s]+([\s\S]*?)(?=(?:pontos\s+fracos|weaknesses|recomendações|recommendations)|$)/i);
  if (strengthsMatch) {
    result.analysis!.strengths = strengthsMatch[1]
      .split(/[\n•\-*]/)
      .map(s => s.trim())
      .filter(s => s.length > 0);
  }

  // Procura por pontos fracos
  const weaknessesMatch = text.match(/(?:pontos\s+fracos|weaknesses)[:\s]+([\s\S]*?)(?=(?:recomendações|recommendations|próximos|next)|$)/i);
  if (weaknessesMatch) {
    result.analysis!.weaknesses = weaknessesMatch[1]
      .split(/[\n•\-*]/)
      .map(w => w.trim())
      .filter(w => w.length > 0);
  }

  // Procura por recomendações
  const recommendationsMatch = text.match(/(?:recomendações|recommendations)[:\s]+([\s\S]*?)(?=(?:próximos|next|análise|analysis)|$)/i);
  if (recommendationsMatch) {
    result.analysis!.recommendations = recommendationsMatch[1]
      .split(/[\n•\-*]/)
      .map(r => r.trim())
      .filter(r => r.length > 0);
  }

  return result;
}
