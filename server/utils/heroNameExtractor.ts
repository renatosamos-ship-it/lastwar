// Lista de todos os heróis conhecidos (deve estar sincronizada com client/src/data/heroes.ts)
const KNOWN_HEROES = [
  // TANK CLASS
  'Scarlett UR', 'Scarlett', 'Williams', 'Kimberly', 'Murphy', 'Marshall',
  'Morrison', 'Stetmann', 'Fiona', 'Venom UR', 'Venom', 'Raynor', 'Kerrigan',
  'Artanis', 'Zagara', 'Abathur', 'Tyrael', 'Illidan', 'Thrall', 'Uther',
  
  // AIRCRAFT CLASS
  'Nova', 'Medivac', 'Baneling', 'Hydralisk', 'Mutalisk', 'Zergling',
  'Roach', 'Infestor', 'Broodlord', 'Ultralisk', 'Defiler', 'Guardian',
  
  // MISSILE CLASS
  'Siege Tank', 'Battlecruiser', 'Goliath', 'Wraith', 'Valkyrie', 'Dropship',
  'Scourge', 'Devourer', 'Corsair', 'Carrier', 'Interceptor', 'Arbiter',
  
  // SUPPORT CLASS
  'Medic', 'Scientist', 'Engineer', 'Probe', 'Observer', 'Shuttle',
  'Queen', 'Overlord', 'Overseer', 'Nydus', 'Creep', 'Hatchery',
];

// Função para calcular distância de Levenshtein (similaridade de strings)
function levenshteinDistance(str1: string, str2: string): number {
  const len1 = str1.length;
  const len2 = str2.length;
  const matrix: number[][] = [];

  for (let i = 0; i <= len2; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= len1; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= len2; i++) {
    for (let j = 1; j <= len1; j++) {
      if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }

  return matrix[len2][len1];
}

// Função para encontrar melhor match de herói
function findBestHeroMatch(text: string, threshold = 2): string | null {
  const cleanText = text.trim().toLowerCase();
  
  // Busca exata (case-insensitive)
  for (const hero of KNOWN_HEROES) {
    if (hero.toLowerCase() === cleanText) {
      return hero;
    }
  }

  // Busca com Levenshtein distance
  let bestMatch: string | null = null;
  let bestDistance = threshold;

  for (const hero of KNOWN_HEROES) {
    const distance = levenshteinDistance(cleanText, hero.toLowerCase());
    if (distance < bestDistance) {
      bestDistance = distance;
      bestMatch = hero;
    }
  }

  return bestMatch;
}

// Função para extrair nomes de heróis do texto
export function extractHeroNames(text: string): string[] {
  const heroNames: string[] = [];
  const seen = new Set<string>();

  // Padrão 1: Procura por nomes de heróis conhecidos (case-insensitive)
  for (const hero of KNOWN_HEROES) {
    const regex = new RegExp(`\\b${hero}\\b`, 'gi');
    const matches = text.match(regex);
    if (matches) {
      for (const match of matches) {
        const bestMatch = findBestHeroMatch(match);
        if (bestMatch && !seen.has(bestMatch.toLowerCase())) {
          heroNames.push(bestMatch);
          seen.add(bestMatch.toLowerCase());
        }
      }
    }
  }

  // Padrão 2: Procura por padrões como "- Hero Name" ou "* Hero Name"
  const bulletPattern = /^[\s\-\*•]+([A-Z][a-zA-Z\s\(\)]+)$/gm;
  let match;
  while ((match = bulletPattern.exec(text)) !== null) {
    const heroName = match[1].trim();
    const bestMatch = findBestHeroMatch(heroName);
    if (bestMatch && !seen.has(bestMatch.toLowerCase())) {
      heroNames.push(bestMatch);
      seen.add(bestMatch.toLowerCase());
    }
  }

  // Padrão 3: Procura por padrões como "Hero Name (role)" ou "Hero Name - role"
  const rolePattern = /([A-Z][a-zA-Z\s\(\)]+?)\s*(?:\(|\-)\s*(Tank|Aircraft|Missile|Support)/gi;
  while ((match = rolePattern.exec(text)) !== null) {
    const heroName = match[1].trim();
    const bestMatch = findBestHeroMatch(heroName);
    if (bestMatch && !seen.has(bestMatch.toLowerCase())) {
      heroNames.push(bestMatch);
      seen.add(bestMatch.toLowerCase());
    }
  }

  // Padrão 4: Procura por "detected: Hero Name" ou "found: Hero Name"
  const detectionPattern = /(?:detected|found|identified|hero):\s*([A-Z][a-zA-Z\s\(\)]+?)(?:\n|,|$)/gi;
  while ((match = detectionPattern.exec(text)) !== null) {
    const heroName = match[1].trim();
    const bestMatch = findBestHeroMatch(heroName);
    if (bestMatch && !seen.has(bestMatch.toLowerCase())) {
      heroNames.push(bestMatch);
      seen.add(bestMatch.toLowerCase());
    }
  }

  return heroNames;
}

// Função para extrair markup/estrutura da resposta
export function extractMarkup(text: string): Record<string, any> {
  const result: Record<string, any> = {};

  // Procura por seções principais
  const sections = ['strengths', 'weaknesses', 'recommendations', 'analysis', 'squadType', 'composition'];
  
  for (const section of sections) {
    const regex = new RegExp(`${section}[:\\s]+([^\\n]*(?:\\n(?!\\w+:)[^\\n]*)*)`, 'gi');
    const match = regex.exec(text);
    if (match) {
      const content = match[1].trim();
      
      // Se é um array (tem múltiplas linhas ou bullets)
      if (content.includes('\n') || content.includes('-') || content.includes('•')) {
        result[section] = content
          .split(/[\n•\-*]/)
          .map((item: string) => item.trim())
          .filter((item: string) => item.length > 0);
      } else {
        result[section] = content;
      }
    }
  }

  // Procura por nextSteps com subseções
  const nextStepsMatch = text.match(/nextSteps[:\s]+([\s\S]*?)(?=\w+:|$)/i);
  if (nextStepsMatch) {
    const nextStepsText = nextStepsMatch[1];
    result.nextSteps = {
      shortTerm: extractArrayFromText(nextStepsText, 'short'),
      mediumTerm: extractArrayFromText(nextStepsText, 'medium'),
      longTerm: extractArrayFromText(nextStepsText, 'long'),
    };
  }

  // Procura por composition com números
  const compositionMatch = text.match(/composition[:\s]+([\s\S]*?)(?=\w+:|$)/i);
  if (compositionMatch) {
    const compText = compositionMatch[1];
    result.composition = {
      tanks: parseInt(compText.match(/tanks?[:\s]*(\d+)/i)?.[1] || '0'),
      aircraft: parseInt(compText.match(/aircraft[:\s]*(\d+)/i)?.[1] || '0'),
      missile: parseInt(compText.match(/missiles?[:\s]*(\d+)/i)?.[1] || '0'),
      support: parseInt(compText.match(/support[:\s]*(\d+)/i)?.[1] || '0'),
    };
  }

  return result;
}

// Função auxiliar para extrair arrays de texto
function extractArrayFromText(text: string, keyword: string): string[] {
  const regex = new RegExp(`${keyword}[^\\n]*[:\\s]+([^\\n]*(?:\\n(?!\\w+:)[^\\n]*)*)`, 'i');
  const match = regex.exec(text);
  
  if (match) {
    return match[1]
      .split(/[\n•\-*]/)
      .map((item: string) => item.trim())
      .filter((item: string) => item.length > 0);
  }
  
  return [];
}

// Função para validar e limpar dados extraídos
export function validateAndCleanData(data: Record<string, any>): Record<string, any> {
  const cleaned: Record<string, any> = { ...data };

  // Validar arrays
  const arrayFields = ['strengths', 'weaknesses', 'recommendations'];
  for (const field of arrayFields) {
    if (!Array.isArray(cleaned[field])) {
      cleaned[field] = [];
    } else {
      cleaned[field] = cleaned[field].filter((item: any) => typeof item === 'string' && item.length > 0);
    }
  }

  // Validar nextSteps
  if (!cleaned.nextSteps) {
    cleaned.nextSteps = { shortTerm: [], mediumTerm: [], longTerm: [] };
  } else {
    if (!Array.isArray(cleaned.nextSteps.shortTerm)) cleaned.nextSteps.shortTerm = [];
    if (!Array.isArray(cleaned.nextSteps.mediumTerm)) cleaned.nextSteps.mediumTerm = [];
    if (!Array.isArray(cleaned.nextSteps.longTerm)) cleaned.nextSteps.longTerm = [];
  }

  // Validar composition
  if (!cleaned.composition) {
    cleaned.composition = { tanks: 0, aircraft: 0, missile: 0, support: 0 };
  }

  return cleaned;
}
