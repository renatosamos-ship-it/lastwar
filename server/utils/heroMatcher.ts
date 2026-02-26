/**
 * Sistema de correspondência fuzzy para identificação de heróis
 * Compara descrições visuais com padrões conhecidos
 */

export type VisualDescription = {
  position: string; // "top-left", "top-center", "top-right", "middle-left", etc
  colors: string[]; // cores detectadas
  characteristics: string[]; // características visuais
  role: string; // "Tank", "Aircraft", "Missile", "Support"
  confidence: number; // 0-1
};

export type HeroMatch = {
  heroName: string;
  matchScore: number; // 0-1
  matchedCharacteristics: string[];
  unmatchedCharacteristics: string[];
};

/**
 * Dicionário de características visuais por herói
 */
const heroCharacteristics: Record<string, {
  colors: string[];
  keywords: string[];
  role: string;
  antiKeywords: string[]; // palavras que indicam que NÃO é este herói
}> = {
  "Scarlett UR": {
    colors: ["roxo", "ouro", "dourado", "purple", "gold"],
    keywords: ["armadura roxa", "crista dourada", "feminino", "elegante", "ouro"],
    role: "Tank",
    antiKeywords: ["laranja", "vermelho brilhante", "arma explosiva"],
  },
  "Williams": {
    colors: ["amarelo", "branco", "yellow", "white"],
    keywords: ["uniforme amarelo", "capacete militar", "claro", "amarelo"],
    role: "Tank",
    antiKeywords: ["roxo", "ouro", "laranja", "vermelho"],
  },
  "Kimberly": {
    colors: ["rosa", "roxo", "pink", "purple"],
    keywords: ["aura rosa", "feminino", "brilho rosa", "cabelo rosa", "efeito de cura"],
    role: "Tank",
    antiKeywords: ["azul", "ciano", "laranja", "vermelho"],
  },
  "Monica": {
    colors: ["azul", "ciano", "blue", "cyan"],
    keywords: ["aura azul", "feminino", "brilho azul", "efeito de suporte", "ciano"],
    role: "Support",
    antiKeywords: ["rosa", "roxo", "laranja", "vermelho"],
  },
  "Marshall": {
    colors: ["laranja", "vermelho", "orange", "red"],
    keywords: ["armadura laranja", "arma explosiva", "cores quentes", "laranja", "vermelho brilhante"],
    role: "Tank",
    antiKeywords: ["roxo", "ouro", "amarelo", "azul"],
  },
  "Murphy": {
    colors: ["verde", "cinza", "green", "gray"],
    keywords: ["armadura verde", "capacete verde", "arma pesada", "verde", "cinza"],
    role: "Tank",
    antiKeywords: ["roxo", "laranja", "amarelo", "azul"],
  },
  "DVA": {
    colors: ["roxo", "azul", "purple", "blue"],
    keywords: ["traje futurista", "capacete roxo", "design moderno", "elegante"],
    role: "Aircraft",
    antiKeywords: ["verde", "laranja", "amarelo"],
  },
  "Morrison": {
    colors: ["vermelho", "ouro", "red", "gold"],
    keywords: ["design moderno", "season 5", "aviador"],
    role: "Aircraft",
    antiKeywords: ["verde", "azul", "amarelo"],
  },
  "McGregor": {
    colors: ["cinza", "preto", "gray", "black"],
    keywords: ["arma explosiva", "cores escuras", "cinza", "preto"],
    role: "Missile",
    antiKeywords: ["rosa", "azul", "amarelo"],
  },
  "Tesla": {
    colors: ["ouro", "vermelho", "gold", "red"],
    keywords: ["ataque em cadeia", "design futurista", "ouro"],
    role: "Missile",
    antiKeywords: ["verde", "azul", "cinza"],
  },
  "Fiona": {
    colors: ["rosa", "ouro", "pink", "gold"],
    keywords: ["arma exclusiva", "season 5", "rosa", "ouro"],
    role: "Missile",
    antiKeywords: ["verde", "azul", "cinza"],
  },
  "Adam": {
    colors: ["azul", "blue"],
    keywords: ["design equilibrado", "azul"],
    role: "Missile",
    antiKeywords: ["rosa", "verde", "laranja"],
  },
  "Carlie": {
    colors: ["rosa", "ouro", "pink", "gold"],
    keywords: ["design específico", "season 5", "aviadora"],
    role: "Aircraft",
    antiKeywords: ["verde", "cinza", "laranja"],
  },
  "Richard": {
    colors: ["azul", "blue"],
    keywords: ["suporte", "azul"],
    role: "Support",
    antiKeywords: ["rosa", "verde", "laranja"],
  },
  "Lucius": {
    colors: ["ouro", "vermelho", "gold", "red"],
    keywords: ["suporte", "ouro"],
    role: "Support",
    antiKeywords: ["azul", "verde", "cinza"],
  },
  "Schuyler": {
    colors: ["ciano", "azul", "cyan", "blue"],
    keywords: ["suporte", "ciano"],
    role: "Support",
    antiKeywords: ["rosa", "verde", "laranja"],
  },
  "Sarah": {
    colors: ["rosa", "ouro", "pink", "gold"],
    keywords: ["suporte", "rosa"],
    role: "Support",
    antiKeywords: ["azul", "verde", "cinza"],
  },
};

/**
 * Calcula similaridade entre duas strings (Levenshtein distance)
 */
function stringSimilarity(str1: string, str2: string): number {
  const longer = str1.length > str2.length ? str1 : str2;
  const shorter = str1.length > str2.length ? str2 : str1;
  
  if (longer.length === 0) return 1.0;
  
  const editDistance = getEditDistance(longer, shorter);
  return (longer.length - editDistance) / longer.length;
}

/**
 * Calcula distância de edição entre duas strings
 */
function getEditDistance(s1: string, s2: string): number {
  const costs: number[] = [];
  
  for (let i = 0; i <= s1.length; i++) {
    let lastValue = i;
    for (let j = 0; j <= s2.length; j++) {
      if (i === 0) {
        costs[j] = j;
      } else if (j > 0) {
        let newValue = costs[j - 1];
        if (s1.charAt(i - 1) !== s2.charAt(j - 1)) {
          newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
        }
        costs[j - 1] = lastValue;
        lastValue = newValue;
      }
    }
    if (i > 0) costs[s2.length] = lastValue;
  }
  
  return costs[s2.length];
}

/**
 * Encontra correspondências de heróis baseado em descrição visual
 */
export function matchHeroByDescription(description: VisualDescription): HeroMatch[] {
  const matches: HeroMatch[] = [];
  
  const descriptionText = [
    ...description.colors,
    ...description.characteristics,
    description.role,
  ]
    .join(" ")
    .toLowerCase();
  
  for (const [heroName, characteristics] of Object.entries(heroCharacteristics)) {
    // Verificar role
    if (characteristics.role !== description.role && description.role !== "Unknown") {
      continue; // Pular se o role não corresponde
    }
    
    // Verificar anti-keywords (palavras que indicam que NÃO é este herói)
    const hasAntiKeyword = characteristics.antiKeywords.some(keyword =>
      descriptionText.includes(keyword.toLowerCase())
    );
    
    if (hasAntiKeyword) {
      continue; // Pular se encontrou anti-keyword
    }
    
    // Contar keywords correspondidas
    const matchedKeywords = characteristics.keywords.filter(keyword =>
      descriptionText.includes(keyword.toLowerCase())
    );
    
    // Contar cores correspondidas
    const matchedColors = characteristics.colors.filter(color =>
      descriptionText.includes(color.toLowerCase())
    );
    
    // Calcular score
    const keywordScore = matchedKeywords.length / characteristics.keywords.length;
    const colorScore = matchedColors.length / characteristics.colors.length;
    const totalScore = (keywordScore * 0.6 + colorScore * 0.4);
    
    if (totalScore > 0.3) { // Threshold mínimo
      matches.push({
        heroName,
        matchScore: totalScore,
        matchedCharacteristics: [...matchedKeywords, ...matchedColors],
        unmatchedCharacteristics: [
          ...characteristics.keywords.filter(k => !matchedKeywords.includes(k)),
          ...characteristics.colors.filter(c => !matchedColors.includes(c)),
        ],
      });
    }
  }
  
  // Ordenar por score descendente
  return matches.sort((a, b) => b.matchScore - a.matchScore);
}

/**
 * Encontra o melhor match para um herói
 */
export function findBestHeroMatch(description: VisualDescription): HeroMatch | null {
  const matches = matchHeroByDescription(description);
  
  if (matches.length === 0) return null;
  
  // Se o melhor match tem score muito alto, retornar
  if (matches[0].matchScore > 0.7) {
    return matches[0];
  }
  
  // Se há múltiplos matches com scores similares, tentar desempate
  if (matches.length > 1 && matches[0].matchScore - matches[1].matchScore < 0.1) {
    // Desempate: preferir suportes para cores azuis/cianas
    if (description.colors.some(c => ["azul", "ciano", "blue", "cyan"].includes(c.toLowerCase()))) {
      const supportMatch = matches.find(m => heroCharacteristics[m.heroName].role === "Support");
      if (supportMatch) return supportMatch;
    }
    
    // Desempate: preferir tanques para cores quentes (laranja, vermelho)
    if (description.colors.some(c => ["laranja", "vermelho", "orange", "red"].includes(c.toLowerCase()))) {
      const tankMatch = matches.find(m => heroCharacteristics[m.heroName].role === "Tank");
      if (tankMatch) return tankMatch;
    }
  }
  
  return matches[0];
}

/**
 * Processa múltiplas descrições visuais e retorna heróis identificados
 */
export function identifyHeroesFromDescriptions(
  descriptions: VisualDescription[]
): Array<{ heroName: string; confidence: number; role: string }> {
  const identified: Array<{ heroName: string; confidence: number; role: string }> = [];
  const usedHeroes = new Set<string>();
  
  for (const desc of descriptions) {
    const match = findBestHeroMatch(desc);
    
    if (match && !usedHeroes.has(match.heroName)) {
      identified.push({
        heroName: match.heroName,
        confidence: match.matchScore,
        role: heroCharacteristics[match.heroName].role,
      });
      usedHeroes.add(match.heroName);
    }
  }
  
  return identified;
}

/**
 * Valida se um herói identificado é válido
 */
export function isValidIdentification(heroName: string, expectedRole?: string): boolean {
  const characteristics = heroCharacteristics[heroName];
  
  if (!characteristics) return false;
  
  if (expectedRole && characteristics.role !== expectedRole) {
    return false;
  }
  
  return true;
}
