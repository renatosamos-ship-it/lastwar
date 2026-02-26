/**
 * Hero data for LastWar game
 * Based on tier list and hero guide from user document
 */

export type HeroRarity = 'UR' | 'SSR' | 'SR' | 'R';
export type HeroType = 'Tanque' | 'Míssil' | 'Aeronave';
export type HeroRole = 'Dano' | 'Defesa' | 'Suporte';
export type SquadPosition = 'Front Row' | 'Back Row';
export type AbilityType = 'Damage' | 'Defense' | 'Support' | 'Control';

export interface Ability {
  id: string;
  name: string;
  description: string;
  type: AbilityType;
  unlocksAt: number; // Estrela em que desbloqueia (1-5)
  maxLevel: number; // Máximo de níveis (30)
}

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
  abilities: Ability[];
}

const createAbility = (id: string, name: string, desc: string, type: AbilityType, unlocksAt: number = 1): Ability => ({
  id,
  name,
  description: desc,
  type,
  unlocksAt,
  maxLevel: 30,
});

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
    abilities: [
      createAbility('murphy-1', 'Cannon Fire', 'Dispara canhão causando dano físico', 'Damage', 1),
      createAbility('murphy-2', 'Stand Firm', 'Aumenta defesa e sobrevivência', 'Defense', 2),
    ],
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
    abilities: [
      createAbility('marshall-1', 'Triad Harmony', 'Buff de ataque em equipe', 'Support', 1),
      createAbility('marshall-2', 'Rapid Start', 'Aumenta velocidade de recarga de habilidades', 'Support', 2),
    ],
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
    abilities: [
      createAbility('williams-1', 'Stun Bomb', 'Atordoa inimigos', 'Control', 1),
      createAbility('williams-2', 'All-Around Armor', 'Redução de dano massiva para aliados', 'Defense', 2),
    ],
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
    abilities: [
      createAbility('stefmann-1', 'Heavy Artillery', 'Artilharia pesada', 'Damage', 1),
      createAbility('stefmann-2', 'Fortified Position', 'Posição fortificada', 'Defense', 2),
    ],
  },
  {
    id: 'kimberly',
    name: 'Kimberly',
    rarity: 'UR',
    type: 'Tanque',
    role: 'Defesa',
    position: 'Front Row',
    tier: 'S+',
    image: '/heroes/kimberly.png',
    description: 'Tanque com dano de energia AoE',
    abilities: [
      createAbility('kimberly-1', 'Energy Assault', 'Ataque de energia AoE devastador', 'Damage', 1),
      createAbility('kimberly-2', 'Energy Boost', 'Aumenta dano de energia do esquadrão', 'Support', 2),
    ],
  },
  {
    id: 'mcgragor',
    name: 'McGragor',
    rarity: 'UR',
    type: 'Tanque',
    role: 'Defesa',
    position: 'Front Row',
    tier: 'A',
    image: '/heroes/mcgragor.png',
    description: 'Tanque estratégico',
    abilities: [
      createAbility('mcgragor-1', 'Highland Charge', 'Carga ofensiva', 'Damage', 1),
      createAbility('mcgragor-2', 'Defensive Stand', 'Postura defensiva', 'Defense', 2),
    ],
  },
  {
    id: 'farhad',
    name: 'Farhad',
    rarity: 'UR',
    type: 'Tanque',
    role: 'Dano',
    position: 'Back Row',
    tier: 'B',
    image: '/heroes/farhad.png',
    description: 'Tanque com dano',
    abilities: [
      createAbility('farhad-1', 'Desert Storm', 'Tempestade do deserto', 'Damage', 1),
      createAbility('farhad-2', 'Sand Armor', 'Armadura de areia', 'Defense', 2),
    ],
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
    abilities: [
      createAbility('mason-1', 'Quick Reload', 'Recarga rápida', 'Support', 1),
      createAbility('mason-2', 'Zombie Purge', 'Dano especial contra zumbis', 'Damage', 2),
    ],
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
    abilities: [
      createAbility('violet-1', 'Plasma Burst', 'Explosão de plasma', 'Damage', 1),
      createAbility('violet-2', 'Energy Shield', 'Escudo de energia', 'Defense', 2),
    ],
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
    abilities: [
      createAbility('scarlett-1', 'Flame Burst', 'Explosão de chama', 'Damage', 1),
      createAbility('scarlett-2', 'T-5 Armor', 'Redução de dano contra monstros', 'Defense', 2),
    ],
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
    abilities: [
      createAbility('monica-1', 'Medical Supply Drop', 'Suprimentos médicos', 'Support', 1),
      createAbility('monica-2', 'Field Medic Training', 'Treinamento de paramédico', 'Support', 2),
    ],
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
    abilities: [
      createAbility('richard-1', 'Precision Strike', 'Ataque de precisão', 'Damage', 1),
      createAbility('richard-2', 'Tactical Analysis', 'Analisa tática do inimigo', 'Support', 2),
    ],
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
    abilities: [
      createAbility('gump-1', 'Shield Bash', 'Golpe de escudo', 'Damage', 1),
      createAbility('gump-2', 'Defensive Stance', 'Postura defensiva', 'Defense', 2),
    ],
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
    abilities: [
      createAbility('loki-1', 'Trickster Strike', 'Golpe enganoso', 'Damage', 1),
      createAbility('loki-2', 'Illusory Defense', 'Defesa ilusória', 'Defense', 2),
    ],
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
    abilities: [
      createAbility('tesla-1', 'Lightning Chain', 'Corrente de relâmpagos', 'Damage', 1),
      createAbility('tesla-2', 'Electric Power Boost', 'Aumento de dano elétrico', 'Support', 2),
    ],
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
    abilities: [
      createAbility('adam-1', 'Survivor Instinct', 'Instinto de sobrevivência', 'Defense', 1),
      createAbility('adam-2', 'Improvised Weapons', 'Armas improvisadas', 'Damage', 2),
    ],
  },
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
    abilities: [
      createAbility('swift-1', 'Hit and Run', 'Ataque e fuga', 'Damage', 1),
      createAbility('swift-2', 'Speed Boost', 'Aumento de velocidade', 'Support', 2),
    ],
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
    abilities: [
      createAbility('fiona-1', 'Double Trajectory', 'Trajetória dupla - AoE físico devastador', 'Damage', 1),
      createAbility('fiona-2', 'Ballistic Boost', 'Aumento balístico', 'Support', 2),
    ],
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
    abilities: [
      createAbility('venom-1', 'Toxic Injection', 'Injeção tóxica', 'Damage', 1),
      createAbility('venom-2', 'Poison Cloud', 'Nuvem de veneno', 'Control', 2),
    ],
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
    abilities: [
      createAbility('braz-1', 'Inferno Blast', 'Explosão infernal', 'Damage', 1),
      createAbility('braz-2', 'Heat Wave', 'Onda de calor', 'Damage', 2),
    ],
  },
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
    abilities: [
      createAbility('elsa-1', 'Frost Shield', 'Escudo de gelo', 'Defense', 1),
      createAbility('elsa-2', 'Freeze Ray', 'Raio de congelamento', 'Control', 2),
    ],
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
    abilities: [
      createAbility('kane-1', 'Missile Strike', 'Ataque de míssil', 'Damage', 1),
      createAbility('kane-2', 'Research Upgrade', 'Melhora de pesquisa', 'Support', 2),
    ],
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
    abilities: [
      createAbility('dva-1', 'Vortex Missile', 'Dano de explosão em rajada', 'Damage', 1),
      createAbility('dva-2', 'Armament Upgrade', 'Melhora armamento', 'Support', 2),
    ],
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
    abilities: [
      createAbility('lucius-1', 'Dive Bomb', 'Bombardeio em mergulho', 'Damage', 1),
      createAbility('lucius-2', 'Sky Patrol', 'Patrulha aérea', 'Support', 2),
    ],
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
    abilities: [
      createAbility('schuyler-1', 'Precision Strike', 'Ataque de precisão', 'Damage', 1),
      createAbility('schuyler-2', 'Tech Upgrade', 'Melhora tecnológica', 'Support', 2),
    ],
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
    abilities: [
      createAbility('morrison-1', 'Naval Strike', 'Ataque naval', 'Damage', 1),
      createAbility('morrison-2', 'Carrier Landing', 'Pouso em porta-aviões', 'Support', 2),
    ],
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
    abilities: [
      createAbility('carlie-1', 'Dual-string Rocket', 'Foguete duplo', 'Damage', 1),
      createAbility('carlie-2', 'Energy Adaption', 'Redução de dano de energia', 'Defense', 2),
    ],
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
    abilities: [
      createAbility('cage-1', 'Containment Field', 'Campo de contenção', 'Control', 1),
      createAbility('cage-2', 'Reinforced Hull', 'Casco reforçado', 'Defense', 2),
    ],
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
    abilities: [
      createAbility('sara-1', 'Air Reconnaissance', 'Reconhecimento aéreo', 'Support', 1),
      createAbility('sara-2', 'Evasive Flying', 'Voo evasivo', 'Defense', 2),
    ],
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
    abilities: [
      createAbility('maxell-1', 'Electromagnetic Pulse', 'Pulso eletromagnético', 'Damage', 1),
      createAbility('maxell-2', 'System Overload', 'Sobrecarga de sistema', 'Control', 2),
    ],
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
    abilities: [
      createAbility('ambolt-1', 'Lightning Strike', 'Golpe de relâmpago', 'Damage', 1),
      createAbility('ambolt-2', 'Static Charge', 'Carga estática', 'Support', 2),
    ],
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
