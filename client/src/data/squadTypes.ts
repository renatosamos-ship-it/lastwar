export interface SquadTypeRecommendation {
  name: string;
  description: string;
  recommendedHeroes: string[];
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
  chipStrategy: string;
}

export const squadTypes: Record<string, SquadTypeRecommendation> = {
  aerial: {
    name: 'Esquadrão Aéreo',
    description: 'Focado em dano rápido e mobilidade com heróis aéreos',
    recommendedHeroes: ['williams', 'ava', 'phoenix', 'striker'],
    strengths: [
      '✓ Alta mobilidade e velocidade de ataque',
      '✓ Dano rápido e em área',
      '✓ Capacidade de contorno de defesas',
      '✓ Excelente contra esquadrões lentos',
    ],
    weaknesses: [
      '✗ Baixa resistência defensiva',
      '✗ Vulnerável a contra-ataques',
      '✗ Requer timing perfeito',
      '✗ Difícil de controlar em combate prolongado',
    ],
    recommendations: [
      'Adicione 1 tanque para absorver dano inicial',
      'Use chips de movimento para aumentar velocidade',
      'Priorize heróis com habilidades de grupo',
      'Invista em armas de dano rápido',
      'Treine sincronização de ataques',
    ],
    chipStrategy: 'Chips de Movimento + Attack para maximizar dano rápido',
  },
  tank: {
    name: 'Esquadrão Tanque',
    description: 'Focado em defesa e resistência com heróis tanques',
    recommendedHeroes: ['murphy', 'mason', 'guardian', 'hector'],
    strengths: [
      '✓ Defesa extremamente alta',
      '✓ Resistência prolongada em combate',
      '✓ Proteção de aliados',
      '✓ Excelente contra dano em área',
    ],
    weaknesses: [
      '✗ Dano baixo e lento',
      '✗ Vulnerável a heróis de dano crítico',
      '✗ Fácil de cercar',
      '✗ Combate prolongado desfavorável',
    ],
    recommendations: [
      'Adicione 1-2 DPS para aumentar dano',
      'Use chips de defesa para maximizar resistência',
      'Combine com suporte para cura',
      'Invista em armas defensivas',
      'Posicione tanques na frente',
    ],
    chipStrategy: 'Chips de Defesa + Interference para controlar combate',
  },
  missile: {
    name: 'Esquadrão Míssil',
    description: 'Focado em dano explosivo e em área com heróis de mísseis',
    recommendedHeroes: ['marshall', 'viola', 'phoenix', 'striker'],
    strengths: [
      '✓ Dano explosivo massivo',
      '✓ Dano em área grande',
      '✓ Eliminação rápida de grupos',
      '✓ Excelente contra aglomerações',
    ],
    weaknesses: [
      '✗ Tempo de recarga longo',
      '✗ Vulnerável durante recarga',
      '✗ Baixa defesa individual',
      '✗ Ineficaz contra alvos únicos rápidos',
    ],
    recommendations: [
      'Adicione tanques para proteção durante recarga',
      'Use chips de ataque para aumentar dano',
      'Combine com suporte para sustain',
      'Invista em redução de tempo de recarga',
      'Posicione atrás de tanques',
    ],
    chipStrategy: 'Chips de Ataque + Defesa para dano com proteção',
  },
  mixed: {
    name: 'Esquadrão Misto',
    description: 'Balanceado com combinação de tanques, DPS e suporte',
    recommendedHeroes: ['murphy', 'marshall', 'kimberly', 'williams', 'jericho'],
    strengths: [
      '✓ Flexibilidade tática',
      '✓ Adaptável a diferentes inimigos',
      '✓ Equilíbrio entre ofensa e defesa',
      '✓ Suporte contínuo em combate',
    ],
    weaknesses: [
      '✗ Sem especialização forte',
      '✗ Menos eficaz contra especializados',
      '✗ Requer melhor coordenação',
      '✗ Poder geral moderado',
    ],
    recommendations: [
      'Mantenha 2 tanques, 2 DPS, 1 suporte',
      'Use chips variados para flexibilidade',
      'Invista em sinergia entre heróis',
      'Treine rotações de combate',
      'Adapte formação conforme necessário',
    ],
    chipStrategy: 'Chips Balanceados (Movimento + Ataque + Defesa)',
  },
};

export function getSquadTypeRecommendation(type: string): SquadTypeRecommendation {
  return squadTypes[type] || squadTypes.mixed;
}
