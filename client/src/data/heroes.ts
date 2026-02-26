export interface Hero {
  id: string;
  name: string;
  rarity: 'R' | 'SR' | 'SSR' | 'UR';
  type: 'Tank' | 'Aircraft' | 'Missile' | 'Support';
  tier: 'S+' | 'S' | 'A+' | 'A' | 'B+' | 'B' | 'C+' | 'C' | 'D+' | 'D' | '?';
  description: string;
  baseStats: {
    hp: number;
    attack: number;
    defense: number;
    speed: number;
  };
}

export const heroes: Hero[] = [
  // TANK CLASS - S+ TIER
  {
    id: 'scarlett-ur',
    name: 'Scarlett (UR)',
    rarity: 'UR',
    type: 'Tank',
    tier: 'S+',
    description: 'Tanque lendário com defesa máxima',
    baseStats: { hp: 580, attack: 320, defense: 420, speed: 160 },
  },
  {
    id: 'williams',
    name: 'Williams',
    rarity: 'UR',
    type: 'Tank',
    tier: 'S+',
    description: 'Tanque versátil com ótima defesa',
    baseStats: { hp: 560, attack: 340, defense: 400, speed: 170 },
  },
  {
    id: 'kimberly',
    name: 'Kimberly',
    rarity: 'UR',
    type: 'Tank',
    tier: 'S+',
    description: 'Tanque com habilidades de suporte',
    baseStats: { hp: 540, attack: 360, defense: 380, speed: 180 },
  },
  {
    id: 'murphy',
    name: 'Murphy',
    rarity: 'UR',
    type: 'Tank',
    tier: 'S+',
    description: 'Tanque clássico com alta resistência',
    baseStats: { hp: 600, attack: 300, defense: 440, speed: 150 },
  },

  // TANK CLASS - S TIER
  {
    id: 'marshall',
    name: 'Marshall',
    rarity: 'UR',
    type: 'Tank',
    tier: 'S',
    description: 'Tanque ofensivo com bom dano',
    baseStats: { hp: 520, attack: 400, defense: 360, speed: 190 },
  },

  // TANK CLASS - A+ TIER
  {
    id: 'mason-ur',
    name: 'Mason (UR)',
    rarity: 'UR',
    type: 'Tank',
    tier: 'A+',
    description: 'Tanque com proteção de aliados',
    baseStats: { hp: 550, attack: 320, defense: 400, speed: 170 },
  },
  {
    id: 'stetmann',
    name: 'Stetmann',
    rarity: 'UR',
    type: 'Tank',
    tier: 'A+',
    description: 'Novo herói Season 5 com defesa sólida',
    baseStats: { hp: 530, attack: 340, defense: 390, speed: 175 },
  },

  // TANK CLASS - A TIER
  {
    id: 'violet-ur',
    name: 'Violet (UR)',
    rarity: 'UR',
    type: 'Tank',
    tier: 'A',
    description: 'Tanque com dano crítico',
    baseStats: { hp: 510, attack: 380, defense: 370, speed: 185 },
  },
  {
    id: 'mason',
    name: 'Mason',
    rarity: 'SSR',
    type: 'Tank',
    tier: 'A',
    description: 'Tanque versátil SSR',
    baseStats: { hp: 480, attack: 300, defense: 360, speed: 165 },
  },

  // AIRCRAFT CLASS - S+ TIER
  {
    id: 'dva',
    name: 'DVA',
    rarity: 'UR',
    type: 'Aircraft',
    tier: 'S+',
    description: 'Avião lendário com velocidade máxima',
    baseStats: { hp: 480, attack: 420, defense: 300, speed: 260 },
  },
  {
    id: 'morrison',
    name: 'Morrison',
    rarity: 'UR',
    type: 'Aircraft',
    tier: 'S+',
    description: 'Novo herói Season 5 com ataque aéreo',
    baseStats: { hp: 460, attack: 440, defense: 280, speed: 270 },
  },

  // AIRCRAFT CLASS - S TIER
  {
    id: 'carlie',
    name: 'Carlie',
    rarity: 'SSR',
    type: 'Aircraft',
    tier: 'S',
    description: 'Avião rápido com dano consistente',
    baseStats: { hp: 420, attack: 400, defense: 260, speed: 250 },
  },

  // AIRCRAFT CLASS - A+ TIER
  {
    id: 'sarah-ur',
    name: 'Sarah (UR)',
    rarity: 'UR',
    type: 'Aircraft',
    tier: 'A+',
    description: 'Avião lendário com suporte',
    baseStats: { hp: 450, attack: 380, defense: 280, speed: 240 },
  },
  {
    id: 'lucius',
    name: 'Lucius',
    rarity: 'SSR',
    type: 'Aircraft',
    tier: 'A+',
    description: 'Avião com habilidades de controle',
    baseStats: { hp: 430, attack: 390, defense: 270, speed: 245 },
  },
  {
    id: 'schuyler',
    name: 'Schuyler',
    rarity: 'SSR',
    type: 'Aircraft',
    tier: 'A+',
    description: 'Avião versátil com bom equilíbrio',
    baseStats: { hp: 440, attack: 400, defense: 280, speed: 250 },
  },

  // MISSILE CLASS - S+ TIER
  {
    id: 'mcgregor',
    name: 'McGregor',
    rarity: 'UR',
    type: 'Missile',
    tier: 'S+',
    description: 'Míssil lendário com dano explosivo',
    baseStats: { hp: 500, attack: 450, defense: 320, speed: 200 },
  },
  {
    id: 'tesla',
    name: 'Tesla',
    rarity: 'UR',
    type: 'Missile',
    tier: 'S+',
    description: 'Míssil com ataque em cadeia',
    baseStats: { hp: 490, attack: 460, defense: 310, speed: 210 },
  },

  // MISSILE CLASS - S TIER
  {
    id: 'adam',
    name: 'Adam',
    rarity: 'SSR',
    type: 'Missile',
    tier: 'S',
    description: 'Míssil com dano equilibrado',
    baseStats: { hp: 460, attack: 420, defense: 300, speed: 200 },
  },
  {
    id: 'fiona',
    name: 'Fiona',
    rarity: 'UR',
    type: 'Missile',
    tier: 'S',
    description: 'Novo herói Season 5 com arma exclusiva',
    baseStats: { hp: 480, attack: 440, defense: 310, speed: 205 },
  },

  // MISSILE CLASS - A+ TIER
  {
    id: 'venom-ur',
    name: 'Venom (UR)',
    rarity: 'UR',
    type: 'Missile',
    tier: 'A+',
    description: 'Novo herói Season 5 com upgrade UR',
    baseStats: { hp: 470, attack: 430, defense: 300, speed: 215 },
  },
  {
    id: 'swift',
    name: 'Swift',
    rarity: 'SSR',
    type: 'Missile',
    tier: 'A+',
    description: 'Míssil rápido com ataque direto',
    baseStats: { hp: 450, attack: 410, defense: 290, speed: 220 },
  },

  // SUPPORT HEROES
  {
    id: 'violet',
    name: 'Violet',
    rarity: 'SSR',
    type: 'Support',
    tier: 'B+',
    description: 'Suporte com buff de ataque',
    baseStats: { hp: 420, attack: 340, defense: 280, speed: 210 },
  },
  {
    id: 'scarlett',
    name: 'Scarlett',
    rarity: 'SSR',
    type: 'Tank',
    tier: 'B+',
    description: 'Tanque versátil SSR',
    baseStats: { hp: 500, attack: 300, defense: 380, speed: 170 },
  },
  {
    id: 'monica',
    name: 'Monica',
    rarity: 'SSR',
    type: 'Support',
    tier: 'B',
    description: 'Suporte com cura em área',
    baseStats: { hp: 440, attack: 280, defense: 300, speed: 190 },
  },
  {
    id: 'richard',
    name: 'Richard',
    rarity: 'SSR',
    type: 'Support',
    tier: 'C+',
    description: 'Suporte com controle',
    baseStats: { hp: 430, attack: 270, defense: 290, speed: 185 },
  },
  {
    id: 'sarah',
    name: 'Sarah',
    rarity: 'SSR',
    type: 'Aircraft',
    tier: 'B+',
    description: 'Avião com suporte',
    baseStats: { hp: 420, attack: 360, defense: 260, speed: 240 },
  },
  {
    id: 'cage',
    name: 'Cage',
    rarity: 'SSR',
    type: 'Aircraft',
    tier: 'B',
    description: 'Avião com controle',
    baseStats: { hp: 410, attack: 350, defense: 250, speed: 235 },
  },
  {
    id: 'elsa',
    name: 'Elsa',
    rarity: 'SSR',
    type: 'Missile',
    tier: 'B',
    description: 'Míssil com controle de campo',
    baseStats: { hp: 450, attack: 380, defense: 280, speed: 200 },
  },
  {
    id: 'venom',
    name: 'Venom',
    rarity: 'SSR',
    type: 'Missile',
    tier: 'C',
    description: 'Míssil com efeito de veneno',
    baseStats: { hp: 440, attack: 370, defense: 270, speed: 205 },
  },
  {
    id: 'blaz',
    name: 'Blaz',
    rarity: 'SR',
    type: 'Missile',
    tier: 'C',
    description: 'Míssil com ataque em chamas',
    baseStats: { hp: 400, attack: 350, defense: 240, speed: 190 },
  },

  // OUTROS
  {
    id: 'colossus',
    name: 'Colossus',
    rarity: 'UR',
    type: 'Tank',
    tier: '?',
    description: 'Herói misterioso com grande potencial',
    baseStats: { hp: 620, attack: 280, defense: 460, speed: 140 },
  },
  {
    id: 'maxwell',
    name: 'Maxwell',
    rarity: 'SSR',
    type: 'Aircraft',
    tier: 'C',
    description: 'Avião com ataque especial',
    baseStats: { hp: 400, attack: 340, defense: 240, speed: 230 },
  },
  {
    id: 'ambolt',
    name: 'Ambolt',
    rarity: 'SR',
    type: 'Aircraft',
    tier: 'D',
    description: 'Avião iniciante',
    baseStats: { hp: 380, attack: 320, defense: 220, speed: 220 },
  },
  {
    id: 'farhad',
    name: 'Farhad',
    rarity: 'SR',
    type: 'Tank',
    tier: 'D+',
    description: 'Tanque iniciante',
    baseStats: { hp: 420, attack: 260, defense: 300, speed: 150 },
  },
  {
    id: 'gump',
    name: 'Gump',
    rarity: 'SR',
    type: 'Tank',
    tier: 'D',
    description: 'Tanque fraco',
    baseStats: { hp: 400, attack: 240, defense: 280, speed: 140 },
  },
  {
    id: 'loki',
    name: 'Loki',
    rarity: 'SR',
    type: 'Support',
    tier: 'D',
    description: 'Suporte fraco',
    baseStats: { hp: 380, attack: 280, defense: 260, speed: 200 },
  },
  {
    id: 'kane',
    name: 'Kane',
    rarity: 'SR',
    type: 'Missile',
    tier: 'D',
    description: 'Míssil fraco',
    baseStats: { hp: 420, attack: 340, defense: 260, speed: 190 },
  },
];

export function getHeroById(id: string): Hero | undefined {
  return heroes.find(h => h.id === id);
}

export function getHeroesByRarity(rarity: string): Hero[] {
  return heroes.filter(h => h.rarity === rarity);
}

export function getHeroesByType(type: string): Hero[] {
  return heroes.filter(h => h.type === type);
}

export function getHeroesByTier(tier: string): Hero[] {
  return heroes.filter(h => h.tier === tier);
}

export function getTopHeroes(limit: number = 10): Hero[] {
  const tierOrder = ['S+', 'S', 'A+', 'A', 'B+', 'B', 'C+', 'C', 'D+', 'D', '?'];
  return heroes
    .sort((a, b) => tierOrder.indexOf(a.tier) - tierOrder.indexOf(b.tier))
    .slice(0, limit);
}
