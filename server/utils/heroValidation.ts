/**
 * Módulo de validação visual de heróis
 * Valida identificações do LLM usando padrões visuais conhecidos
 */

export type HeroVisualPattern = {
  name: string;
  role: "Tank" | "Aircraft" | "Missile" | "Support";
  primaryColors: string[]; // cores RGB em hex
  secondaryColors: string[];
  visualMarkers: string[]; // características visuais únicas
  confidence: number; // 0-1
  validRoles: string[]; // roles válidos para este herói
};

export const heroVisualPatterns: Record<string, HeroVisualPattern> = {
  scarlett_ur: {
    name: "Scarlett UR",
    role: "Tank",
    primaryColors: ["#8B008B", "#FFD700"], // Roxo e Ouro
    secondaryColors: ["#9932CC", "#FFA500"],
    visualMarkers: ["armadura roxa", "crista dourada", "feminino"],
    confidence: 0.95,
    validRoles: ["Tank"],
  },
  williams: {
    name: "Williams",
    role: "Tank",
    primaryColors: ["#FFFF00", "#FFFFFF"], // Amarelo e Branco
    secondaryColors: ["#FFD700", "#F0F0F0"],
    visualMarkers: ["uniforme amarelo", "capacete militar", "arma de fogo"],
    confidence: 0.95,
    validRoles: ["Tank"],
  },
  kimberly: {
    name: "Kimberly",
    role: "Tank",
    primaryColors: ["#FF69B4", "#9932CC"], // Rosa e Roxo
    secondaryColors: ["#FF1493", "#8B008B"],
    visualMarkers: ["aura rosa", "feminino", "efeito de cura", "brilho rosa"],
    confidence: 0.95,
    validRoles: ["Tank", "Support"],
  },
  monica: {
    name: "Monica",
    role: "Support",
    primaryColors: ["#00BFFF", "#00CED1"], // Azul Ciano
    secondaryColors: ["#1E90FF", "#20B2AA"],
    visualMarkers: ["aura azul", "feminino", "efeito de suporte", "brilho azul"],
    confidence: 0.95,
    validRoles: ["Support"],
  },
  marshall: {
    name: "Marshall",
    role: "Tank",
    primaryColors: ["#FF4500", "#FF6347"], // Laranja e Vermelho
    secondaryColors: ["#FF8C00", "#DC143C"],
    visualMarkers: ["armadura laranja", "arma explosiva", "cores quentes"],
    confidence: 0.95,
    validRoles: ["Tank"],
  },
  murphy: {
    name: "Murphy",
    role: "Tank",
    primaryColors: ["#008000", "#808080"], // Verde e Cinza
    secondaryColors: ["#228B22", "#A9A9A9"],
    visualMarkers: ["armadura verde", "capacete verde", "arma pesada"],
    confidence: 0.95,
    validRoles: ["Tank"],
  },
  dva: {
    name: "DVA",
    role: "Aircraft",
    primaryColors: ["#9932CC", "#4169E1"], // Roxo e Azul
    secondaryColors: ["#8B008B", "#1E90FF"],
    visualMarkers: ["traje futurista", "capacete roxo", "design moderno"],
    confidence: 0.95,
    validRoles: ["Aircraft"],
  },
  morrison: {
    name: "Morrison",
    role: "Aircraft",
    primaryColors: ["#FF6347", "#FFD700"], // Vermelho e Ouro
    secondaryColors: ["#FF4500", "#FFA500"],
    visualMarkers: ["design moderno", "season 5"],
    confidence: 0.85,
    validRoles: ["Aircraft"],
  },
  mcgregor: {
    name: "McGregor",
    role: "Missile",
    primaryColors: ["#2F4F4F", "#696969"], // Cinza escuro
    secondaryColors: ["#36454F", "#808080"],
    visualMarkers: ["arma explosiva", "cores escuras"],
    confidence: 0.85,
    validRoles: ["Missile"],
  },
  tesla: {
    name: "Tesla",
    role: "Missile",
    primaryColors: ["#FFD700", "#FF6347"], // Ouro e Vermelho
    secondaryColors: ["#FFA500", "#FF4500"],
    visualMarkers: ["ataque em cadeia", "design futurista"],
    confidence: 0.85,
    validRoles: ["Missile"],
  },
  fiona: {
    name: "Fiona",
    role: "Missile",
    primaryColors: ["#FF1493", "#FFD700"], // Rosa e Ouro
    secondaryColors: ["#FF69B4", "#FFA500"],
    visualMarkers: ["arma exclusiva", "season 5"],
    confidence: 0.85,
    validRoles: ["Missile"],
  },
  adam: {
    name: "Adam",
    role: "Missile",
    primaryColors: ["#4169E1", "#1E90FF"], // Azul
    secondaryColors: ["#1E90FF", "#00BFFF"],
    visualMarkers: ["design equilibrado"],
    confidence: 0.80,
    validRoles: ["Missile"],
  },
  carlie: {
    name: "Carlie",
    role: "Aircraft",
    primaryColors: ["#FF69B4", "#FFD700"], // Rosa e Ouro
    secondaryColors: ["#FF1493", "#FFA500"],
    visualMarkers: ["design específico season 5"],
    confidence: 0.80,
    validRoles: ["Aircraft"],
  },
  richard: {
    name: "Richard",
    role: "Support",
    primaryColors: ["#4169E1", "#00CED1"], // Azul
    secondaryColors: ["#1E90FF", "#20B2AA"],
    visualMarkers: ["suporte"],
    confidence: 0.75,
    validRoles: ["Support"],
  },
  lucius: {
    name: "Lucius",
    role: "Support",
    primaryColors: ["#FFD700", "#FF6347"], // Ouro e Vermelho
    secondaryColors: ["#FFA500", "#FF4500"],
    visualMarkers: ["suporte"],
    confidence: 0.75,
    validRoles: ["Support"],
  },
  schuyler: {
    name: "Schuyler",
    role: "Support",
    primaryColors: ["#00CED1", "#00BFFF"], // Ciano
    secondaryColors: ["#20B2AA", "#1E90FF"],
    visualMarkers: ["suporte"],
    confidence: 0.75,
    validRoles: ["Support"],
  },
  sarah: {
    name: "Sarah",
    role: "Support",
    primaryColors: ["#FF69B4", "#FFD700"], // Rosa e Ouro
    secondaryColors: ["#FF1493", "#FFA500"],
    visualMarkers: ["suporte"],
    confidence: 0.75,
    validRoles: ["Support"],
  },
};

/**
 * Lista de heróis válidos que podem aparecer em esquadrões
 */
export const validHeroes = new Set(Object.keys(heroVisualPatterns).map(key => 
  heroVisualPatterns[key].name
));

/**
 * Valida se um herói identificado é válido
 */
export function isValidHero(heroName: string): boolean {
  return validHeroes.has(heroName);
}

/**
 * Filtra heróis inválidos de uma lista
 */
export function filterValidHeroes(heroes: Array<{ name: string; confidence: number; role: string }>): Array<{ name: string; confidence: number; role: string }> {
  return heroes.filter(hero => {
    const isValid = isValidHero(hero.name);
    
    // Casos especiais de heróis frequentemente confundidos
    if (hero.name === "Monica" && !isValid) {
      console.warn(`Herói inválido detectado: ${hero.name}. Removendo da lista.`);
      return false;
    }
    
    return isValid;
  });
}

/**
 * Valida a composição de um esquadrão
 */
export function validateSquadComposition(heroes: Array<{ name: string; role: string }>): {
  isValid: boolean;
  issues: string[];
} {
  const issues: string[] = [];
  
  // Verificar heróis duplicados
  const heroNames = heroes.map(h => h.name);
  const duplicates = heroNames.filter((name, index) => heroNames.indexOf(name) !== index);
  if (duplicates.length > 0) {
    issues.push(`Heróis duplicados encontrados: ${duplicates.join(", ")}`);
  }
  
  // Verificar heróis inválidos
  const invalidHeroes = heroes.filter(h => !isValidHero(h.name));
  if (invalidHeroes.length > 0) {
    issues.push(`Heróis inválidos encontrados: ${invalidHeroes.map(h => h.name).join(", ")}`);
  }
  
  // Verificar composição mínima
  if (heroes.length < 3) {
    issues.push(`Esquadrão deve ter pelo menos 3 heróis, encontrados ${heroes.length}`);
  }
  
  if (heroes.length > 5) {
    issues.push(`Esquadrão não pode ter mais de 5 heróis, encontrados ${heroes.length}`);
  }
  
  return {
    isValid: issues.length === 0,
    issues,
  };
}

/**
 * Corrige identificações incorretas comuns
 */
export function correctCommonMisidentifications(
  heroes: Array<{ name: string; confidence: number; role: string }>
): Array<{ name: string; confidence: number; role: string }> {
  return heroes.map(hero => {
    // Kimberly vs Monica
    if (hero.name === "Monica" && hero.role === "Tank") {
      console.warn(`Corrigindo: Monica identificada como Tank, mas é Support. Mudando para Kimberly (Tank).`);
      return { ...hero, name: "Kimberly", confidence: Math.max(0.7, hero.confidence - 0.2) };
    }
    
    // Marshall vs Scarlett UR
    if (hero.name === "Scarlett UR" && hero.role === "Missile") {
      console.warn(`Corrigindo: Scarlett UR identificada como Missile, mas é Tank. Mudando para Marshall (Tank).`);
      return { ...hero, name: "Marshall", confidence: Math.max(0.7, hero.confidence - 0.2) };
    }
    
    return hero;
  });
}
