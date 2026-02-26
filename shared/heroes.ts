/**
 * Hero data for LastWar game
 * Based on Last War Handbook database with real skills and stats
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
  unlocksAt: number;
  maxLevel: number;
}

export interface HeroStats {
  atk: number;
  def: number;
  hp: number;
  spd: number;
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
  stats: HeroStats;
}

const createAbility = (id: string, name: string, desc: string, type: AbilityType, unlocksAt: number = 1): Ability => ({
  id,
  name,
  description: desc,
  type,
  unlocksAt,
  maxLevel: 30,
});

const createStats = (atk: number, def: number, hp: number, spd: number): HeroStats => ({
  atk,
  def,
  hp,
  spd,
});

export const HEROES: Hero[] = [
  // ===== TANQUE (Tipo do herói) =====
  {
    id: 'murphy',
    name: 'Murphy',
    rarity: 'UR',
    type: 'Tanque',
    role: 'Defesa',
    position: 'Front Row',
    tier: 'A',
    image: '/heroes/murphy.png',
    description: 'Free tutorial Tank hero. Excellent survivability and front-row protection.',
    abilities: [
      createAbility('murphy-1', 'Cannon Fire', 'Dispara canhão causando dano físico', 'Damage', 1),
      createAbility('murphy-2', 'Stand Firm', 'Aumenta defesa e sobrevivência', 'Defense', 2),
    ],
    stats: createStats(2400, 2800, 26000, 85),
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
    description: 'S-tier Support Tank. Provides team-wide attack buff and cooldown speed boost.',
    abilities: [
      createAbility('marshall-1', 'Triad Harmony', 'Buff de ataque em equipe', 'Support', 1),
      createAbility('marshall-2', 'Rapid Start', 'Aumenta velocidade de recarga de habilidades', 'Support', 2),
    ],
    stats: createStats(2800, 3400, 30000, 80),
  },
  {
    id: 'williams',
    name: 'Williams',
    rarity: 'UR',
    type: 'Tanque',
    role: 'Defesa',
    position: 'Front Row',
    tier: 'S',
    image: '/heroes/williams.png',
    description: 'S-tier defensive Tank. Provides massive damage reduction to frontline allies.',
    abilities: [
      createAbility('williams-1', 'Stun Bomb', 'Atordoa inimigos', 'Control', 1),
      createAbility('williams-2', 'All-Around Armor', 'Redução de dano massiva para aliados', 'Defense', 2),
    ],
    stats: createStats(3200, 2200, 20000, 95),
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
    description: 'Tanque especializado em defesa com artilharia pesada.',
    abilities: [
      createAbility('stefmann-1', 'Heavy Artillery', 'Artilharia pesada', 'Damage', 1),
      createAbility('stefmann-2', 'Fortified Position', 'Posição fortificada', 'Defense', 2),
    ],
    stats: createStats(2600, 3000, 28000, 75),
  },
  {
    id: 'kimberly',
    name: 'Kimberly',
    rarity: 'UR',
    type: 'Tanque',
    role: 'Dano',
    position: 'Front Row',
    tier: 'S',
    image: '/heroes/kimberly.png',
    description: 'Top-tier Tank hero with devastating AoE energy damage. Essential for tank formations.',
    abilities: [
      createAbility('kimberly-1', 'Energy Assault', 'Ataque de energia AoE devastador', 'Damage', 1),
      createAbility('kimberly-2', 'Energy Boost', 'Aumenta dano de energia do esquadrão', 'Support', 2),
    ],
    stats: createStats(2200, 3200, 28000, 85),
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
    description: 'Highland tank warrior with strong defensive capabilities and team leadership.',
    abilities: [
      createAbility('mcgragor-1', 'Highland Charge', 'Carga ofensiva', 'Damage', 1),
      createAbility('mcgragor-2', 'Defensive Stand', 'Postura defensiva', 'Defense', 2),
    ],
    stats: createStats(2600, 3000, 28000, 75),
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
    description: 'Tanque com dano de especialista.',
    abilities: [
      createAbility('farhad-1', 'Desert Storm', 'Tempestade do deserto', 'Damage', 1),
      createAbility('farhad-2', 'Sand Armor', 'Armadura de areia', 'Defense', 2),
    ],
    stats: createStats(2400, 2600, 24000, 80),
  },
  {
    id: 'mason',
    name: 'Mason',
    rarity: 'SSR',
    type: 'Tanque',
    role: 'Dano',
    position: 'Back Row',
    tier: 'A',
    image: '/heroes/mason.png',
    description: 'Top SSR Tank that can be upgraded to UR. Excellent PvE damage with Zombie Purge.',
    abilities: [
      createAbility('mason-1', 'Quick Reload', 'Recarga rápida', 'Support', 1),
      createAbility('mason-2', 'Zombie Purge', 'Dano especial contra zumbis', 'Damage', 2),
    ],
    stats: createStats(1500, 2600, 22000, 75),
  },
  {
    id: 'violet',
    name: 'Violet',
    rarity: 'SSR',
    type: 'Tanque',
    role: 'Defesa',
    position: 'Back Row',
    tier: 'A',
    image: '/heroes/violet.png',
    description: 'Strong missile vehicle that can be upgraded to UR. Excellent for area damage.',
    abilities: [
      createAbility('violet-1', 'Plasma Burst', 'Explosão de plasma', 'Damage', 1),
      createAbility('violet-2', 'Energy Shield', 'Escudo de energia', 'Defense', 2),
    ],
    stats: createStats(2800, 1400, 14000, 92),
  },
  {
    id: 'scarlett',
    name: 'Scarlett',
    rarity: 'SSR',
    type: 'Tanque',
    role: 'Defesa',
    position: 'Back Row',
    tier: 'A',
    image: '/heroes/scarlett.png',
    description: 'SSR Tank that can be upgraded to UR. Provides damage reduction against monsters.',
    abilities: [
      createAbility('scarlett-1', 'Flame Burst', 'Explosão de chama', 'Damage', 1),
      createAbility('scarlett-2', 'T-5 Armor', 'Redução de dano contra monstros', 'Defense', 2),
    ],
    stats: createStats(1600, 1800, 16000, 90),
  },
  {
    id: 'monica',
    name: 'Monica',
    rarity: 'SSR',
    type: 'Tanque',
    role: 'Suporte',
    position: 'Back Row',
    tier: 'B',
    image: '/heroes/monica.png',
    description: 'Suporte SSR com habilidades de cura.',
    abilities: [
      createAbility('monica-1', 'Medical Supply Drop', 'Suprimentos médicos', 'Support', 1),
      createAbility('monica-2', 'Field Medic Training', 'Treinamento de paramédico', 'Support', 2),
    ],
    stats: createStats(1200, 1600, 14000, 85),
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
    description: 'Tanque SSR com capacidade de dano.',
    abilities: [
      createAbility('richard-1', 'Precision Strike', 'Ataque de precisão', 'Damage', 1),
      createAbility('richard-2', 'Tactical Analysis', 'Analisa tática do inimigo', 'Support', 2),
    ],
    stats: createStats(1800, 2000, 18000, 80),
  },
  {
    id: 'gump',
    name: 'Gump',
    rarity: 'SR',
    type: 'Tanque',
    role: 'Defesa',
    position: 'Front Row',
    tier: 'B',
    image: '/heroes/gump.png',
    description: 'Tanque iniciante com boas defesas.',
    abilities: [
      createAbility('gump-1', 'Shield Bash', 'Golpe de escudo', 'Damage', 1),
      createAbility('gump-2', 'Defensive Stance', 'Postura defensiva', 'Defense', 2),
    ],
    stats: createStats(1200, 2000, 15000, 70),
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
    description: 'Defesa SR com habilidades enganosas.',
    abilities: [
      createAbility('loki-1', 'Trickster Strike', 'Golpe enganoso', 'Damage', 1),
      createAbility('loki-2', 'Illusory Defense', 'Defesa ilusória', 'Defense', 2),
    ],
    stats: createStats(1100, 1700, 12000, 75),
  },

  // ===== MÍSSIL (Tipo do herói) =====
  {
    id: 'tesla',
    name: 'Tesla',
    rarity: 'UR',
    type: 'Míssil',
    role: 'Dano',
    position: 'Back Row',
    tier: 'S',
    image: '/heroes/tesla.png',
    description: 'Top DPS Missile Vehicle hero. Incredible energy damage with Inductive Current stacking.',
    abilities: [
      createAbility('tesla-1', 'Lightning Chain', 'Corrente de relâmpagos', 'Damage', 1),
      createAbility('tesla-2', 'Electric Power Boost', 'Aumento de dano elétrico', 'Support', 2),
    ],
    stats: createStats(3800, 1600, 16000, 110),
  },
  {
    id: 'adam',
    name: 'Adam',
    rarity: 'UR',
    type: 'Míssil',
    role: 'Defesa',
    position: 'Front Row',
    tier: 'A',
    image: '/heroes/adam.png',
    description: 'Survivor missile specialist with improvised weapons and adaptability.',
    abilities: [
      createAbility('adam-1', 'Rocket Launcher', 'Lançador de foguetes', 'Damage', 1),
      createAbility('adam-2', 'Makeshift Armor', 'Armadura improvisada', 'Defense', 2),
    ],
    stats: createStats(3600, 1600, 17000, 95),
  },
  {
    id: 'swift',
    name: 'Swift',
    rarity: 'UR',
    type: 'Míssil',
    role: 'Dano',
    position: 'Back Row',
    tier: 'A',
    image: '/heroes/swift.png',
    description: 'Ultra-fast missile vehicle specializing in hit-and-run tactics.',
    abilities: [
      createAbility('swift-1', 'Hit and Run', 'Ataque e fuga', 'Damage', 1),
      createAbility('swift-2', 'Speed Boost', 'Aumento de velocidade', 'Support', 2),
    ],
    stats: createStats(3700, 1500, 16000, 130),
  },
  {
    id: 'fiona',
    name: 'Fiona',
    rarity: 'UR',
    type: 'Míssil',
    role: 'Dano',
    position: 'Back Row',
    tier: 'S+',
    image: '/heroes/fiona.png',
    description: 'SS-tier Missile Vehicle nuker. Devastating AoE physical damage dealer. HIGHEST DPS.',
    abilities: [
      createAbility('fiona-1', 'Double Trajectory', 'Trajetória dupla - AoE físico devastador', 'Damage', 1),
      createAbility('fiona-2', 'Ballistic Boost', 'Aumento balístico', 'Support', 2),
    ],
    stats: createStats(4200, 1400, 15000, 90),
  },
  {
    id: 'venom',
    name: 'Venom',
    rarity: 'SSR',
    type: 'Míssil',
    role: 'Dano',
    position: 'Back Row',
    tier: 'A',
    image: '/heroes/venom.png',
    description: 'Dano SSR confiável com efeitos de controle.',
    abilities: [
      createAbility('venom-1', 'Toxic Injection', 'Injeção tóxica', 'Damage', 1),
      createAbility('venom-2', 'Poison Cloud', 'Nuvem de veneno', 'Control', 2),
    ],
    stats: createStats(2600, 1200, 13000, 88),
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
    description: 'Dano SSR com especialidade em fogo.',
    abilities: [
      createAbility('braz-1', 'Inferno Blast', 'Explosão infernal', 'Damage', 1),
      createAbility('braz-2', 'Heat Wave', 'Onda de calor', 'Damage', 2),
    ],
    stats: createStats(2800, 1100, 12000, 85),
  },
  {
    id: 'elsa',
    name: 'Elsa',
    rarity: 'SSR',
    type: 'Míssil',
    role: 'Suporte',
    position: 'Back Row',
    tier: 'B',
    image: '/heroes/elsa.png',
    description: 'Suporte SSR com habilidades de controle.',
    abilities: [
      createAbility('elsa-1', 'Frost Shield', 'Escudo de gelo', 'Defense', 1),
      createAbility('elsa-2', 'Freeze Ray', 'Raio de congelamento', 'Control', 2),
    ],
    stats: createStats(1800, 1400, 11000, 82),
  },
  {
    id: 'kane',
    name: 'Kane',
    rarity: 'SR',
    type: 'Míssil',
    role: 'Dano',
    position: 'Back Row',
    tier: 'B',
    image: '/heroes/kane.png',
    description: 'Dano SR com ataque de míssil.',
    abilities: [
      createAbility('kane-1', 'Missile Strike', 'Ataque de míssil', 'Damage', 1),
      createAbility('kane-2', 'Research Upgrade', 'Melhora de pesquisa', 'Support', 2),
    ],
    stats: createStats(1400, 1000, 8000, 85),
  },

  // ===== AERONAVE (Tipo do herói) =====
  {
    id: 'dva',
    name: 'DVA',
    rarity: 'UR',
    type: 'Aeronave',
    role: 'Dano',
    position: 'Back Row',
    tier: 'S',
    image: '/heroes/dva.png',
    description: 'S-tier Aircraft damage dealer with exceptional burst damage. Core of any Aircraft team.',
    abilities: [
      createAbility('dva-1', 'Vortex Missile', 'Dano de explosão em rajada', 'Damage', 1),
      createAbility('dva-2', 'Armament Upgrade', 'Melhora armamento', 'Support', 2),
    ],
    stats: createStats(2000, 3500, 32000, 75),
  },
  {
    id: 'lucius',
    name: 'Lucius',
    rarity: 'UR',
    type: 'Aeronave',
    role: 'Dano',
    position: 'Back Row',
    tier: 'A',
    image: '/heroes/lucius.png',
    description: 'Elite aircraft pilot with superior aerial combat skills and team coordination.',
    abilities: [
      createAbility('lucius-1', 'Dive Bomb', 'Bombardeio em mergulho', 'Damage', 1),
      createAbility('lucius-2', 'Sky Patrol', 'Patrulha aérea', 'Support', 2),
    ],
    stats: createStats(3500, 1900, 18000, 125),
  },
  {
    id: 'schuyler',
    name: 'Schuyler',
    rarity: 'UR',
    type: 'Aeronave',
    role: 'Dano',
    position: 'Back Row',
    tier: 'A',
    image: '/heroes/schuyler.png',
    description: 'A-tier tech aircraft with precision strikes and system enhancements.',
    abilities: [
      createAbility('schuyler-1', 'Precision Strike', 'Ataque de precisão', 'Damage', 1),
      createAbility('schuyler-2', 'Tech Upgrade', 'Melhora tecnológica', 'Support', 2),
    ],
    stats: createStats(3400, 2000, 19000, 115),
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
    description: 'Naval aviation specialist with versatile combat capabilities.',
    abilities: [
      createAbility('morrison-1', 'Naval Strike', 'Ataque naval', 'Damage', 1),
      createAbility('morrison-2', 'Carrier Landing', 'Pouso em porta-aviões', 'Support', 2),
    ],
    stats: createStats(3300, 2100, 19000, 110),
  },
  {
    id: 'carlie',
    name: 'Carlie',
    rarity: 'UR',
    type: 'Aeronave',
    role: 'Defesa',
    position: 'Front Row',
    tier: 'A',
    image: '/heroes/carlie.png',
    description: 'A-tier Aircraft Tank. Excellent energy damage reduction for the team.',
    abilities: [
      createAbility('carlie-1', 'Dual-string Rocket', 'Foguete duplo', 'Damage', 1),
      createAbility('carlie-2', 'Energy Adaption', 'Redução de dano de energia', 'Defense', 2),
    ],
    stats: createStats(3600, 1800, 18000, 120),
  },
  {
    id: 'cage',
    name: 'Cage',
    rarity: 'SSR',
    type: 'Aeronave',
    role: 'Defesa',
    position: 'Front Row',
    tier: 'B',
    image: '/heroes/cage.png',
    description: 'Defesa Aeronave com campo de contenção.',
    abilities: [
      createAbility('cage-1', 'Containment Field', 'Campo de contenção', 'Control', 1),
      createAbility('cage-2', 'Reinforced Hull', 'Casco reforçado', 'Defense', 2),
    ],
    stats: createStats(2200, 2400, 17000, 95),
  },
  {
    id: 'sara',
    name: 'Sara',
    rarity: 'SSR',
    type: 'Aeronave',
    role: 'Suporte',
    position: 'Back Row',
    tier: 'A',
    image: '/heroes/sara.png',
    description: 'Suporte Aeronave com reconhecimento aéreo.',
    abilities: [
      createAbility('sara-1', 'Air Reconnaissance', 'Reconhecimento aéreo', 'Support', 1),
      createAbility('sara-2', 'Evasive Flying', 'Voo evasivo', 'Defense', 2),
    ],
    stats: createStats(1600, 1800, 13000, 105),
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
    description: 'Dano Aeronave com pulso eletromagnético.',
    abilities: [
      createAbility('maxell-1', 'Electromagnetic Pulse', 'Pulso eletromagnético', 'Damage', 1),
      createAbility('maxell-2', 'System Overload', 'Sobrecarga de sistema', 'Control', 2),
    ],
    stats: createStats(2400, 1600, 14000, 100),
  },
  {
    id: 'ambolt',
    name: 'Ambolt',
    rarity: 'SR',
    type: 'Aeronave',
    role: 'Dano',
    position: 'Back Row',
    tier: 'B',
    image: '/heroes/ambolt.png',
    description: 'Dano Aeronave com ataque de relâmpago.',
    abilities: [
      createAbility('ambolt-1', 'Lightning Strike', 'Golpe de relâmpago', 'Damage', 1),
      createAbility('ambolt-2', 'Static Charge', 'Carga estática', 'Support', 2),
    ],
    stats: createStats(1300, 900, 7000, 100),
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
  Tanque: ['Murphy', 'Marshall', 'Stefmann', 'Williams', 'Kimberly'],
  Aeronave: ['DVA', 'Schuyler', 'Morrison', 'Lucius', 'Carlie'],
  Míssil: ['Tesla', 'McGragor', 'Adam', 'Fiona', 'Swift'],
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
