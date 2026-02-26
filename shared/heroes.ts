/**
 * Hero data for LastWar game
 * Based on Last War Handbook database with real skills and stats
 * Each hero has 4 abilities: Normal, Passive, Special, Ultimate
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
      createAbility('murphy-1', 'Cannon Fire', 'Dispara canhao causando dano fisico', 'Damage', 1),
      createAbility('murphy-2', 'Stand Firm', 'Passiva: Aumenta defesa permanentemente', 'Defense', 1),
      createAbility('murphy-3', 'Iron Skin', 'Reduz dano recebido por 25% por 8 segundos', 'Defense', 2),
      createAbility('murphy-4', 'Last Stand', 'Ultimate: Absorve dano para aliados proximos', 'Support', 3),
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
      createAbility('marshall-1', 'Triad Harmony', 'Buff de ataque em equipe +30%', 'Support', 1),
      createAbility('marshall-2', 'Rapid Start', 'Passiva: Aumenta velocidade de recarga de habilidades', 'Support', 1),
      createAbility('marshall-3', 'Coordinated Strike', 'Aumenta dano critico de aliados por 15%', 'Support', 2),
      createAbility('marshall-4', 'Perfect Synergy', 'Ultimate: Sincroniza ataques do esquadrao', 'Support', 3),
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
      createAbility('williams-1', 'Stun Bomb', 'Fire a stun bomb dealing explosive damage', 'Control', 1),
      createAbility('williams-2', 'All-Around Armor', 'Passiva: Reduce all Damage taken by 30%', 'Defense', 1),
      createAbility('williams-3', 'Iron Will', 'Boosts defense of front 2 units by 50%', 'Support', 2),
      createAbility('williams-4', 'Super Sensing', 'Ultimate: Self HP, Attack, Defense +20%', 'Support', 3),
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
      createAbility('stefmann-1', 'Heavy Artillery', 'Artilharia pesada causando dano massivo', 'Damage', 1),
      createAbility('stefmann-2', 'Fortified Position', 'Passiva: Posicao fortificada aumenta defesa', 'Defense', 1),
      createAbility('stefmann-3', 'Reinforced Walls', 'Cria paredes que absorvem dano', 'Defense', 2),
      createAbility('stefmann-4', 'Fortress', 'Ultimate: Defesa impenetravel por 12 segundos', 'Defense', 3),
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
      createAbility('kimberly-2', 'Energy Boost', 'Passiva: Aumenta dano de energia do esquadrao', 'Support', 1),
      createAbility('kimberly-3', 'Energy Pulse', 'Pulso de energia danificando inimigos proximos', 'Damage', 2),
      createAbility('kimberly-4', 'Energy Overload', 'Ultimate: Sobrecarga de energia em area', 'Damage', 3),
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
      createAbility('mcgragor-1', 'Highland Charge', 'Carga ofensiva com dano aumentado', 'Damage', 1),
      createAbility('mcgragor-2', 'Defensive Stand', 'Passiva: Postura defensiva aumenta defesa', 'Defense', 1),
      createAbility('mcgragor-3', 'Highland Shield', 'Escudo que protege aliados proximos', 'Defense', 2),
      createAbility('mcgragor-4', 'Mountain King', 'Ultimate: Lideranca que fortalece o esquadrao', 'Support', 3),
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
      createAbility('farhad-1', 'Desert Storm', 'Tempestade do deserto causando dano', 'Damage', 1),
      createAbility('farhad-2', 'Sand Armor', 'Passiva: Armadura de areia reduz dano', 'Defense', 1),
      createAbility('farhad-3', 'Sandstorm', 'Cria tempestade que cega inimigos', 'Control', 2),
      createAbility('farhad-4', 'Desert Fury', 'Ultimate: Furia do deserto causando dano massivo', 'Damage', 3),
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
      createAbility('mason-1', 'Quick Reload', 'Recarga rapida aumentando velocidade', 'Support', 1),
      createAbility('mason-2', 'Zombie Purge', 'Passiva: Dano especial contra zumbis', 'Damage', 1),
      createAbility('mason-3', 'Rapid Fire', 'Dispara multiplos tiros rapidamente', 'Damage', 2),
      createAbility('mason-4', 'Annihilation', 'Ultimate: Aniquilacao de inimigos', 'Damage', 3),
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
      createAbility('violet-1', 'Plasma Burst', 'Explosao de plasma causando dano', 'Damage', 1),
      createAbility('violet-2', 'Energy Shield', 'Passiva: Escudo de energia reduz dano', 'Defense', 1),
      createAbility('violet-3', 'Plasma Wave', 'Onda de plasma em area', 'Damage', 2),
      createAbility('violet-4', 'Plasma Inferno', 'Ultimate: Inferno de plasma', 'Damage', 3),
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
      createAbility('scarlett-1', 'Flame Burst', 'Explosao de chama causando dano', 'Damage', 1),
      createAbility('scarlett-2', 'T-5 Armor', 'Passiva: Reducao de dano contra monstros', 'Defense', 1),
      createAbility('scarlett-3', 'Inferno', 'Cria inferno que danifica inimigos', 'Damage', 2),
      createAbility('scarlett-4', 'Blaze', 'Ultimate: Chama eterna causando dano continuo', 'Damage', 3),
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
      createAbility('monica-1', 'Medical Supply Drop', 'Suprimentos medicos curando aliados', 'Support', 1),
      createAbility('monica-2', 'Field Medic Training', 'Passiva: Treinamento de paramedico', 'Support', 1),
      createAbility('monica-3', 'Emergency Heal', 'Cura de emergencia para aliados', 'Support', 2),
      createAbility('monica-4', 'Lifeline', 'Ultimate: Salva aliado critico de morte', 'Support', 3),
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
      createAbility('richard-1', 'Precision Strike', 'Ataque de precisao causando dano', 'Damage', 1),
      createAbility('richard-2', 'Tactical Analysis', 'Passiva: Analisa tatica do inimigo', 'Support', 1),
      createAbility('richard-3', 'Calculated Shot', 'Tiro calculado com dano aumentado', 'Damage', 2),
      createAbility('richard-4', 'Masterpiece', 'Ultimate: Obra prima de precisao', 'Damage', 3),
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
      createAbility('gump-1', 'Shield Bash', 'Golpe de escudo causando dano', 'Damage', 1),
      createAbility('gump-2', 'Defensive Stance', 'Passiva: Postura defensiva', 'Defense', 1),
      createAbility('gump-3', 'Shield Wall', 'Parede de escudo protegendo', 'Defense', 2),
      createAbility('gump-4', 'Guardian', 'Ultimate: Guardiao protetor', 'Defense', 3),
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
      createAbility('loki-1', 'Trickster Strike', 'Golpe enganoso causando dano', 'Damage', 1),
      createAbility('loki-2', 'Illusory Defense', 'Passiva: Defesa ilusoria', 'Defense', 1),
      createAbility('loki-3', 'Mirage', 'Cria miragem confundindo inimigos', 'Control', 2),
      createAbility('loki-4', 'Phantom', 'Ultimate: Fantasma enganoso', 'Control', 3),
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
      createAbility('tesla-1', 'Lightning Chain', 'Corrente de relampagos danificando', 'Damage', 1),
      createAbility('tesla-2', 'Electric Power Boost', 'Passiva: Aumento de dano eletrico', 'Support', 1),
      createAbility('tesla-3', 'Overcharge', 'Sobrecarga eletrica aumentando dano', 'Damage', 2),
      createAbility('tesla-4', 'Electromagnetic Storm', 'Ultimate: Tempestade eletromagnetica', 'Damage', 3),
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
      createAbility('adam-1', 'Rocket Launcher', 'Lancador de foguetes causando dano', 'Damage', 1),
      createAbility('adam-2', 'Makeshift Armor', 'Passiva: Armadura improvisada', 'Defense', 1),
      createAbility('adam-3', 'Explosive Barrage', 'Barrage explosiva de foguetes', 'Damage', 2),
      createAbility('adam-4', 'Survivor Instinct', 'Ultimate: Instinto de sobrevivencia', 'Support', 3),
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
      createAbility('swift-1', 'Hit and Run', 'Ataque e fuga rapida', 'Damage', 1),
      createAbility('swift-2', 'Speed Boost', 'Passiva: Aumento de velocidade', 'Support', 1),
      createAbility('swift-3', 'Blitz Attack', 'Ataque relampago com velocidade', 'Damage', 2),
      createAbility('swift-4', 'Sonic Boom', 'Ultimate: Explosao sonica', 'Damage', 3),
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
      createAbility('fiona-1', 'Double Trajectory', 'Trajetoria dupla AoE fisico devastador', 'Damage', 1),
      createAbility('fiona-2', 'Ballistic Boost', 'Passiva: Aumento balistico', 'Support', 1),
      createAbility('fiona-3', 'Missile Barrage', 'Barrage de misseis em area', 'Damage', 2),
      createAbility('fiona-4', 'Apocalypse', 'Ultimate: Apocalipse de misseis', 'Damage', 3),
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
    description: 'Dano SSR confiavel com efeitos de controle.',
    abilities: [
      createAbility('venom-1', 'Toxic Injection', 'Injecao toxica causando dano', 'Damage', 1),
      createAbility('venom-2', 'Poison Cloud', 'Passiva: Nuvem de veneno', 'Control', 1),
      createAbility('venom-3', 'Venom Spray', 'Spray de veneno em area', 'Damage', 2),
      createAbility('venom-4', 'Toxic Swamp', 'Ultimate: Pântano toxico', 'Control', 3),
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
      createAbility('braz-1', 'Inferno Blast', 'Explosao infernal causando dano', 'Damage', 1),
      createAbility('braz-2', 'Heat Wave', 'Passiva: Onda de calor', 'Damage', 1),
      createAbility('braz-3', 'Flame Burst', 'Explosao de chama em area', 'Damage', 2),
      createAbility('braz-4', 'Inferno Fury', 'Ultimate: Furia infernal', 'Damage', 3),
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
      createAbility('elsa-1', 'Frost Shield', 'Escudo de gelo protegendo', 'Defense', 1),
      createAbility('elsa-2', 'Freeze Ray', 'Passiva: Raio de congelamento', 'Control', 1),
      createAbility('elsa-3', 'Blizzard', 'Blizzard congelando inimigos', 'Control', 2),
      createAbility('elsa-4', 'Eternal Winter', 'Ultimate: Inverno eterno', 'Control', 3),
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
    description: 'Dano SR com ataque de missil.',
    abilities: [
      createAbility('kane-1', 'Missile Strike', 'Ataque de missil causando dano', 'Damage', 1),
      createAbility('kane-2', 'Research Upgrade', 'Passiva: Melhora de pesquisa', 'Support', 1),
      createAbility('kane-3', 'Guided Missile', 'Missil guiado com precisao', 'Damage', 2),
      createAbility('kane-4', 'Payload', 'Ultimate: Carga util explosiva', 'Damage', 3),
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
      createAbility('dva-1', 'Vortex Missile', 'Dano de explosao em rajada', 'Damage', 1),
      createAbility('dva-2', 'Armament Upgrade', 'Passiva: Melhora armamento', 'Support', 1),
      createAbility('dva-3', 'Missile Barrage', 'Barrage de misseis', 'Damage', 2),
      createAbility('dva-4', 'Annihilation Protocol', 'Ultimate: Protocolo de aniquilacao', 'Damage', 3),
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
      createAbility('lucius-2', 'Sky Patrol', 'Passiva: Patrulha aerea', 'Support', 1),
      createAbility('lucius-3', 'Aerial Superiority', 'Superioridade aerea em combate', 'Damage', 2),
      createAbility('lucius-4', 'Sky King', 'Ultimate: Rei do ceu', 'Support', 3),
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
      createAbility('schuyler-1', 'Precision Strike', 'Ataque de precisao', 'Damage', 1),
      createAbility('schuyler-2', 'Tech Upgrade', 'Passiva: Melhora tecnologica', 'Support', 1),
      createAbility('schuyler-3', 'System Hack', 'Invade sistema do inimigo', 'Control', 2),
      createAbility('schuyler-4', 'Cyber Warfare', 'Ultimate: Guerra cibernetica', 'Control', 3),
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
      createAbility('morrison-2', 'Carrier Landing', 'Passiva: Pouso em porta-avioes', 'Support', 1),
      createAbility('morrison-3', 'Torpedo Run', 'Ataque de torpedo', 'Damage', 2),
      createAbility('morrison-4', 'Naval Supremacy', 'Ultimate: Supremacia naval', 'Support', 3),
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
      createAbility('carlie-1', 'Dual-string Rocket', 'Foguete duplo causando dano', 'Damage', 1),
      createAbility('carlie-2', 'Energy Adaption', 'Passiva: Reducao de dano de energia', 'Defense', 1),
      createAbility('carlie-3', 'Energy Barrier', 'Barreira de energia protegendo', 'Defense', 2),
      createAbility('carlie-4', 'Energy Fortress', 'Ultimate: Fortaleza de energia', 'Defense', 3),
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
    description: 'Defesa Aeronave com campo de contencao.',
    abilities: [
      createAbility('cage-1', 'Containment Field', 'Campo de contencao', 'Control', 1),
      createAbility('cage-2', 'Reinforced Hull', 'Passiva: Casco reforçado', 'Defense', 1),
      createAbility('cage-3', 'Lockdown', 'Bloqueia movimento de inimigos', 'Control', 2),
      createAbility('cage-4', 'Absolute Prison', 'Ultimate: Prisao absoluta', 'Control', 3),
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
    description: 'Suporte Aeronave com reconhecimento aereo.',
    abilities: [
      createAbility('sara-1', 'Air Reconnaissance', 'Reconhecimento aereo', 'Support', 1),
      createAbility('sara-2', 'Evasive Flying', 'Passiva: Voo evasivo', 'Defense', 1),
      createAbility('sara-3', 'Scout Report', 'Relatorio de reconhecimento', 'Support', 2),
      createAbility('sara-4', 'Eye in the Sky', 'Ultimate: Olho no ceu', 'Support', 3),
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
    description: 'Dano Aeronave com pulso eletromagnetico.',
    abilities: [
      createAbility('maxell-1', 'Electromagnetic Pulse', 'Pulso eletromagnetico', 'Damage', 1),
      createAbility('maxell-2', 'System Overload', 'Passiva: Sobrecarga de sistema', 'Control', 1),
      createAbility('maxell-3', 'EMP Burst', 'Explosao eletromagnetica', 'Damage', 2),
      createAbility('maxell-4', 'Total Blackout', 'Ultimate: Apagao total', 'Control', 3),
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
    description: 'Dano Aeronave com ataque de relampago.',
    abilities: [
      createAbility('ambolt-1', 'Lightning Strike', 'Golpe de relampago', 'Damage', 1),
      createAbility('ambolt-2', 'Static Charge', 'Passiva: Carga estatica', 'Support', 1),
      createAbility('ambolt-3', 'Thunder Bolt', 'Raio trovejante', 'Damage', 2),
      createAbility('ambolt-4', 'Storm Fury', 'Ultimate: Furia da tempestade', 'Damage', 3),
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
