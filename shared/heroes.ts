/**
 * Hero data for LastWar game
 * Based on tier list and hero guide from user document
 */

export type HeroRarity = 'UR' | 'SSR' | 'SR' | 'R';
export type HeroType = 'Tanque' | 'Míssil' | 'Aeronave';
export type HeroRole = 'Dano' | 'Defesa' | 'Suporte';
export type SquadPosition = 'Front Row' | 'Back Row';

export interface Hero {
  id: string;
  name: string;
  rarity: HeroRarity;
  type: HeroType;
  role: HeroRole;
  position: SquadPosition;
  tier: 'S+' | 'S' | 'A+' | 'A' | 'B+' | 'B' | 'D';
  image: string;
  description?: string;
}

export const HEROES: Hero[] = [
  // ===== TANQUE (Tipo do herói) =====
  // UR Raridade
  {
    id: 'murphy',
    name: 'Murphy',
    rarity: 'UR',
    type: 'Tanque',
    role: 'Defesa',
    position: 'Front Row',
    tier: 'S+',
    image: '/heroes/murphy.png',
    description: 'Tanque supremo com defesa excepcional',
  },
  {
    id: 'marshall',
    name: 'Marshall',
    rarity: 'UR',
    type: 'Tanque',
    role: 'Suporte',
    position: 'Front Row',
    tier: 'S',
    image: '/heroes/marshall.png',
    description: 'Tanque versátil com bom dano',
  },
  {
    id: 'williams',
    name: 'Williams',
    rarity: 'UR',
    type: 'Tanque',
    role: 'Defesa',
    position: 'Back Row',
    tier: 'S',
    image: '/heroes/williams.png',
    description: 'Defesa de elite',
  },
  {
    id: 'stefmann',
    name: 'Stefmann',
    rarity: 'UR',
    type: 'Tanque',
    role: 'Defesa',
    position: 'Front Row',
    tier: 'S',
    image: '/heroes/stefmann.png',
    description: 'Tanque especializado em defesa',
  },

  // SSR Raridade
  {
    id: 'mason',
    name: 'Mason',
    rarity: 'SSR',
    type: 'Tanque',
    role: 'Dano',
    position: 'Back Row',
    tier: 'A+',
    image: '/heroes/mason.png',
    description: 'Guerreiro com bom equilíbrio',
  },
  {
    id: 'violet',
    name: 'Violet',
    rarity: 'SSR',
    type: 'Tanque',
    role: 'Defesa',
    position: 'Back Row',
    tier: 'A+',
    image: '/heroes/violet.png',
    description: 'Defesa especializada',
  },
  {
    id: 'scarlett',
    name: 'Scarlett',
    rarity: 'SSR',
    type: 'Tanque',
    role: 'Defesa',
    position: 'Back Row',
    tier: 'A+',
    image: '/heroes/scarlett.png',
    description: 'Guerreira defensiva',
  },
  {
    id: 'monica',
    name: 'Monica',
    rarity: 'SSR',
    type: 'Tanque',
    role: 'Suporte',
    position: 'Back Row',
    tier: 'B+',
    image: '/heroes/monica.png',
    description: 'Suporte SSR',
  },
  {
    id: 'farhad',
    name: 'Farhad',
    rarity: 'SSR',
    type: 'Tanque',
    role: 'Dano',
    position: 'Back Row',
    tier: 'B',
    image: '/heroes/farhad.png',
    description: 'Dano SSR',
  },
  {
    id: 'richard',
    name: 'Richard',
    rarity: 'SSR',
    type: 'Tanque',
    role: 'Dano',
    position: 'Front Row',
    tier: 'B',
    image: '/heroes/richard.png',
    description: 'Tanque SSR',
  },

  // SR Raridade
  {
    id: 'gump',
    name: 'Gump',
    rarity: 'SR',
    type: 'Tanque',
    role: 'Defesa',
    position: 'Front Row',
    tier: 'B',
    image: '/heroes/gump.png',
    description: 'Tanque iniciante',
  },
  {
    id: 'loki',
    name: 'Loki',
    rarity: 'SR',
    type: 'Tanque',
    role: 'Defesa',
    position: 'Back Row',
    tier: 'B',
    image: '/heroes/loki.png',
    description: 'Defesa SR',
  },

  // ===== MÍSSIL (Tipo do herói) =====
  // UR Raridade
  {
    id: 'tesla',
    name: 'Tesla',
    rarity: 'UR',
    type: 'Míssil',
    role: 'Dano',
    position: 'Back Row',
    tier: 'A+',
    image: '/heroes/tesla.png',
    description: 'Míssil técnico',
  },
  {
    id: 'mcgragor',
    name: 'McGragor',
    rarity: 'UR',
    type: 'Míssil',
    role: 'Defesa',
    position: 'Back Row',
    tier: 'A',
    image: '/heroes/mcgragor.png',
    description: 'Míssil estratégico',
  },
  {
    id: 'adam',
    name: 'Adam',
    rarity: 'UR',
    type: 'Míssil',
    role: 'Defesa',
    position: 'Back Row',
    tier: 'B',
    image: '/heroes/adam.png',
    description: 'Defesa Míssil',
  },
  {
    id: 'fiona',
    name: 'Fiona',
    rarity: 'UR',
    type: 'Míssil',
    role: 'Dano',
    position: 'Back Row',
    tier: 'A',
    image: '/heroes/fiona.png',
    description: 'Dano Míssil',
  },

  // UR Raridade (continuação)
  {
    id: 'swift',
    name: 'Swift',
    rarity: 'UR',
    type: 'Míssil',
    role: 'Dano',
    position: 'Back Row',
    tier: 'B+',
    image: '/heroes/swift.png',
    description: 'Míssil rápido',
  },

  // SSR Raridade
  {
    id: 'venom',
    name: 'Venom',
    rarity: 'SSR',
    type: 'Míssil',
    role: 'Dano',
    position: 'Back Row',
    tier: 'A',
    image: '/heroes/venom.png',
    description: 'Dano SSR confiável',
  },
  {
    id: 'braz',
    name: 'Braz',
    rarity: 'SSR',
    type: 'Míssil',
    role: 'Dano',
    position: 'Back Row',
    tier: 'B',
    image: '/heroes/braz.png',
    description: 'Dano SSR',
  },

  // SSR Raridade (continuação)
  {
    id: 'elsa',
    name: 'Elsa',
    rarity: 'SSR',
    type: 'Míssil',
    role: 'Defesa',
    position: 'Back Row',
    tier: 'B+',
    image: '/heroes/elsa.png',
    description: 'Defesa SSR',
  },

  // SR Raridade
  {
    id: 'kane',
    name: 'Kane',
    rarity: 'SR',
    type: 'Míssil',
    role: 'Dano',
    position: 'Back Row',
    tier: 'B',
    image: '/heroes/kane.png',
    description: 'Dano SR',
  },

  // ===== AERONAVE (Tipo do herói) =====
  // UR Raridade
  {
    id: 'dva',
    name: 'DVA',
    rarity: 'UR',
    type: 'Aeronave',
    role: 'Dano',
    position: 'Front Row',
    tier: 'S',
    image: '/heroes/dva.png',
    description: 'Herói Aeronave de primeira linha',
  },
  {
    id: 'lucius',
    name: 'Lucius',
    rarity: 'UR',
    type: 'Aeronave',
    role: 'Defesa',
    position: 'Back Row',
    tier: 'A+',
    image: '/heroes/lucius.png',
    description: 'Defesa Aeronave de qualidade',
  },
  {
    id: 'schuyler',
    name: 'Schuyler',
    rarity: 'UR',
    type: 'Aeronave',
    role: 'Dano',
    position: 'Back Row',
    tier: 'A+',
    image: '/heroes/schuyler.png',
    description: 'Especialista em Aeronave',
  },
  {
    id: 'morrison',
    name: 'Morrison',
    rarity: 'UR',
    type: 'Aeronave',
    role: 'Dano',
    position: 'Back Row',
    tier: 'A',
    image: '/heroes/morrison.png',
    description: 'Dano Aeronave versátil',
  },

  // SSR Raridade
  {
    id: 'carlie',
    name: 'Carlie',
    rarity: 'SSR',
    type: 'Aeronave',
    role: 'Defesa',
    position: 'Back Row',
    tier: 'B+',
    image: '/heroes/carlie.png',
    description: 'Defesa Aeronave',
  },
  {
    id: 'cage',
    name: 'Cage',
    rarity: 'SSR',
    type: 'Aeronave',
    role: 'Defesa',
    position: 'Back Row',
    tier: 'B+',
    image: '/heroes/cage.png',
    description: 'Defesa Aeronave',
  },
  {
    id: 'sara',
    name: 'Sara',
    rarity: 'SSR',
    type: 'Aeronave',
    role: 'Suporte',
    position: 'Back Row',
    tier: 'A+',
    image: '/heroes/sara.png',
    description: 'Suporte Aeronave',
  },
  {
    id: 'maxell',
    name: 'Maxell',
    rarity: 'SSR',
    type: 'Aeronave',
    role: 'Dano',
    position: 'Back Row',
    tier: 'B',
    image: '/heroes/maxell.png',
    description: 'Dano Aeronave',
  },

  // SR Raridade
  {
    id: 'ambolt',
    name: 'Ambolt',
    rarity: 'SR',
    type: 'Aeronave',
    role: 'Dano',
    position: 'Back Row',
    tier: 'B',
    image: '/heroes/ambolt.png',
    description: 'Dano Aeronave',
  },
];

export const HERO_TYPES = {
  Tanque: {
    label: 'Tanque',
    advantage: '+20% DMG vs Míssil',
    color: 'bg-blue-600',
    icon: '🛡️',
  },
  Aeronave: {
    label: 'Aeronave',
    advantage: '+20% DMG vs Tanque',
    color: 'bg-cyan-600',
    icon: '✈️',
  },
  Míssil: {
    label: 'Míssil',
    advantage: '+20% DMG vs Aeronave',
    color: 'bg-orange-600',
    icon: '🚀',
  },
};

export const SQUAD_POSITIONS = {
  'Front Row': {
    label: 'Primeira Linha (Defesa)',
    description: 'Heróis tanques que absorvem dano',
    icon: '🛡️',
  },
  'Back Row': {
    label: 'Segunda Linha (Ataque & Suporte)',
    description: 'Heróis de dano e suporte',
    icon: '⚔️',
  },
};

export const HERO_PRIORITIES = {
  Tanque: ['Murphy', 'Marshall', 'Stefmann', 'Williams', 'DVA'],
  Aeronave: ['DVA', 'Schuyler', 'Morrison', 'Lucius', 'Carlie'],
  Míssil: ['Tesla', 'McGragor', 'Adam', 'Fiona', 'Swift'],
};

export const GEAR_PRIORITY = {
  'Front Row': ['Armor', 'Radar'],
  'Back Row': ['Railgun', 'Chip'],
};

export function getHeroById(id: string): Hero | undefined {
  return HEROES.find((hero) => hero.id === id);
}

export function getHeroesByType(type: string): Hero[] {
  return HEROES.filter((hero) => hero.type === type);
}

export function getHeroesByPosition(position: SquadPosition): Hero[] {
  return HEROES.filter((hero) => hero.position === position);
}

export function getHeroesByTier(tier: Hero['tier']): Hero[] {
  return HEROES.filter((hero) => hero.tier === tier);
}

export function getHeroesByRarity(rarity: HeroRarity): Hero[] {
  return HEROES.filter((hero) => hero.rarity === rarity);
}

export function getHeroesByRole(role: HeroRole): Hero[] {
  return HEROES.filter((hero) => hero.role === role);
}
