// Dados completos de heróis com imagens, símbolos e posicionamento
// Baseado no documento SimbulosnoHeroi.docx

export type HeroRole = 'Tanque' | 'Míssil' | 'Aeronave';
export type HeroSymbol = 'Defesa' | 'Ataque' | 'Suporte';
export type HeroPosition = 'Front Row' | 'Back Row';
export type HeroTier = 'S+' | 'S' | 'A+' | 'A' | 'B+' | 'B' | 'D';

export interface HeroComplete {
  id: string;
  name: string;
  role: HeroRole;
  symbol: HeroSymbol;
  position: HeroPosition;
  tier: HeroTier;
  rarity: 'UR' | 'SSR' | 'SR' | 'R';
  image: string;
  description?: string;
}

// URLs das imagens (extraídas do documento)
const HERO_IMAGES = {
  // Tier List e Símbolos (hero_0 a hero_9)
  tierList: 'https://files.manuscdn.com/user_upload_by_module/session_file/310419663028854027/QSLhdoGHavXFPyjS.png',
  symbols: 'https://files.manuscdn.com/user_upload_by_module/session_file/310419663028854027/oOXYkxVDhkrHTpTT.png',
  
  // Tanques (hero_10 a hero_22)
  murphy: 'https://files.manuscdn.com/user_upload_by_module/session_file/310419663028854027/sMBJClYaXEpLudKt.png',
  mason: 'https://files.manuscdn.com/user_upload_by_module/session_file/310419663028854027/iuKRWikuZTdDNdQC.png',
  marshall: 'https://files.manuscdn.com/user_upload_by_module/session_file/310419663028854027/JuEUYuRyeLTBRiwf.png',
  williams: 'https://files.manuscdn.com/user_upload_by_module/session_file/310419663028854027/exzQWpjVRLYdgCrq.png',
  violet: 'https://files.manuscdn.com/user_upload_by_module/session_file/310419663028854027/rrZWrjeUfBZBitSB.png',
  scarlett: 'https://files.manuscdn.com/user_upload_by_module/session_file/310419663028854027/qAjfEECuuIeAQffP.png',
  richard: 'https://files.manuscdn.com/user_upload_by_module/session_file/310419663028854027/IBkpJDPAmBNHXHix.png',
  gump: 'https://files.manuscdn.com/user_upload_by_module/session_file/310419663028854027/yEpmlindtYxXnrTu.png',
  loki: 'https://files.manuscdn.com/user_upload_by_module/session_file/310419663028854027/vDiixteRRBTLBssQ.png',
  kimberly: 'https://files.manuscdn.com/user_upload_by_module/session_file/310419663028854027/euegjpjwydUMOlcC.png',
  monica: 'https://files.manuscdn.com/user_upload_by_module/session_file/310419663028854027/PGaYhApiVKXDWMKb.png',
  farhad: 'https://files.manuscdn.com/user_upload_by_module/session_file/310419663028854027/nuyIFfKQHRbemqwx.png',
  stefmann: 'https://files.manuscdn.com/user_upload_by_module/session_file/310419663028854027/ycqMirrIZNySyiwN.png',
  
  // Mísseis (hero_23 a hero_31)
  tesla: 'https://files.manuscdn.com/user_upload_by_module/session_file/310419663028854027/sMQtDpqQGvtzPbKL.png',
  mcgragor: 'https://files.manuscdn.com/user_upload_by_module/session_file/310419663028854027/TovocweHZPcNjYHz.png',
  adam: 'https://files.manuscdn.com/user_upload_by_module/session_file/310419663028854027/mKnpkjvFUxCgTLcH.png',
  swift: 'https://files.manuscdn.com/user_upload_by_module/session_file/310419663028854027/IJIwsaHOPzmjUbQQ.png',
  fiona: 'https://files.manuscdn.com/user_upload_by_module/session_file/310419663028854027/HhmLeZrUpLPrcIRS.png',
  venom: 'https://files.manuscdn.com/user_upload_by_module/session_file/310419663028854027/qxAtxZBnYmzFDGeE.png',
  elsa: 'https://files.manuscdn.com/user_upload_by_module/session_file/310419663028854027/JLPuFSIMJefDBkam.png',
  braz: 'https://files.manuscdn.com/user_upload_by_module/session_file/310419663028854027/BgnhJsFTzGtSJqJN.png',
  kane: 'https://files.manuscdn.com/user_upload_by_module/session_file/310419663028854027/qYWtBBazroAFMJIE.png',
  
  // Aeronaves (hero_32 a hero_35)
  dva: 'https://files.manuscdn.com/user_upload_by_module/session_file/310419663028854027/hFzrpViSSxDgnuMq.png',
  lucius: 'https://files.manuscdn.com/user_upload_by_module/session_file/310419663028854027/UtBJjlshyceTNxXX.png',
  shuyler: 'https://files.manuscdn.com/user_upload_by_module/session_file/310419663028854027/oDznKSoUyqmWdGyV.png',
  carlie: 'https://files.manuscdn.com/user_upload_by_module/session_file/310419663028854027/UUXvTObpgBxOmbXw.png',
  morrison: 'https://files.manuscdn.com/user_upload_by_module/session_file/310419663028854027/iBJTPvEoltWkgvTu.png',
  sara: 'https://files.manuscdn.com/user_upload_by_module/session_file/310419663028854027/zxSRquxOsGCsXLTp.png',
  cage: 'https://files.manuscdn.com/user_upload_by_module/session_file/310419663028854027/nvJdivQDbuKcxJis.png',
  maxell: 'https://files.manuscdn.com/user_upload_by_module/session_file/310419663028854027/NSgQvkqUqDtJtUIV.png',
  ambolt: 'https://files.manuscdn.com/user_upload_by_module/session_file/310419663028854027/cvVxUDynMcFIATpj.png',
  
  // Hero Guide (hero_36)
  heroGuide: 'https://files.manuscdn.com/user_upload_by_module/session_file/310419663028854027/UxsIcKNGwQLRCTbj.png',
};

export const heroesComplete: HeroComplete[] = [
  // TANQUES - Front Row (Defesa)
  {
    id: 'murphy',
    name: 'Murphy',
    role: 'Tanque',
    symbol: 'Defesa',
    position: 'Front Row',
    tier: 'S+',
    rarity: 'UR',
    image: HERO_IMAGES.murphy,
    description: 'Tanque UR de tier S+. Excelente para front row com alta defesa.',
  },
  {
    id: 'marshall',
    name: 'Marshall',
    role: 'Tanque',
    symbol: 'Defesa',
    position: 'Front Row',
    tier: 'S',
    rarity: 'UR',
    image: HERO_IMAGES.marshall,
    description: 'Tanque UR de tier S. Recomendado para front row.',
  },
  {
    id: 'williams',
    name: 'Williams',
    role: 'Tanque',
    symbol: 'Defesa',
    position: 'Front Row',
    tier: 'S',
    rarity: 'UR',
    image: HERO_IMAGES.williams,
    description: 'Tanque UR de tier S. Forte em defesa.',
  },
  {
    id: 'kimberly',
    name: 'Kimberly',
    role: 'Tanque',
    symbol: 'Defesa',
    position: 'Front Row',
    tier: 'A+',
    rarity: 'SSR',
    image: HERO_IMAGES.kimberly,
    description: 'Tanque SSR de tier A+. Bom para front row.',
  },
  {
    id: 'violet',
    name: 'Violet',
    role: 'Tanque',
    symbol: 'Defesa',
    position: 'Front Row',
    tier: 'A+',
    rarity: 'SSR',
    image: HERO_IMAGES.violet,
    description: 'Tanque SSR de tier A+. Defesa sólida.',
  },
  {
    id: 'monica',
    name: 'Monica',
    role: 'Tanque',
    symbol: 'Defesa',
    position: 'Front Row',
    tier: 'A+',
    rarity: 'SSR',
    image: HERO_IMAGES.monica,
    description: 'Tanque SSR de tier A+. Recomendado para front row.',
  },
  {
    id: 'mason',
    name: 'Mason',
    role: 'Tanque',
    symbol: 'Defesa',
    position: 'Front Row',
    tier: 'A',
    rarity: 'SR',
    image: HERO_IMAGES.mason,
    description: 'Tanque SR de tier A. Bom para iniciantes.',
  },
  {
    id: 'richard',
    name: 'Richard',
    role: 'Tanque',
    symbol: 'Defesa',
    position: 'Front Row',
    tier: 'B+',
    rarity: 'SR',
    image: HERO_IMAGES.richard,
    description: 'Tanque SR de tier B+.',
  },
  {
    id: 'gump',
    name: 'Gump',
    role: 'Tanque',
    symbol: 'Defesa',
    position: 'Front Row',
    tier: 'B',
    rarity: 'R',
    image: HERO_IMAGES.gump,
    description: 'Tanque R de tier B.',
  },
  {
    id: 'loki',
    name: 'Loki',
    role: 'Tanque',
    symbol: 'Defesa',
    position: 'Front Row',
    tier: 'B',
    rarity: 'R',
    image: HERO_IMAGES.loki,
    description: 'Tanque R de tier B.',
  },
  {
    id: 'farhad',
    name: 'Farhad',
    role: 'Tanque',
    symbol: 'Defesa',
    position: 'Front Row',
    tier: 'B+',
    rarity: 'SR',
    image: HERO_IMAGES.farhad,
    description: 'Tanque SR de tier B+.',
  },
  {
    id: 'scarlett',
    name: 'Scarlett',
    role: 'Tanque',
    symbol: 'Defesa',
    position: 'Front Row',
    tier: 'S',
    rarity: 'UR',
    image: HERO_IMAGES.scarlett,
    description: 'Tanque UR de tier S. Excelente para front row.',
  },
  {
    id: 'stefmann',
    name: 'Stefmann',
    role: 'Tanque',
    symbol: 'Defesa',
    position: 'Front Row',
    tier: 'A',
    rarity: 'SR',
    image: HERO_IMAGES.stefmann,
    description: 'Tanque SR de tier A. Recomendado para gear priority.',
  },

  // MÍSSEIS - Back Row (Ataque)
  {
    id: 'tesla',
    name: 'Tesla',
    role: 'Míssil',
    symbol: 'Ataque',
    position: 'Back Row',
    tier: 'S+',
    rarity: 'UR',
    image: HERO_IMAGES.tesla,
    description: 'Míssil UR de tier S+. Excelente dano contra aeronaves.',
  },
  {
    id: 'mcgragor',
    name: 'McGragor',
    role: 'Míssil',
    symbol: 'Ataque',
    position: 'Back Row',
    tier: 'S',
    rarity: 'UR',
    image: HERO_IMAGES.mcgragor,
    description: 'Míssil UR de tier S. Forte em back row.',
  },
  {
    id: 'swift',
    name: 'Swift',
    role: 'Míssil',
    symbol: 'Ataque',
    position: 'Back Row',
    tier: 'A+',
    rarity: 'SSR',
    image: HERO_IMAGES.swift,
    description: 'Míssil SSR de tier A+. Bom para back row.',
  },
  {
    id: 'fiona',
    name: 'Fiona',
    role: 'Míssil',
    symbol: 'Ataque',
    position: 'Back Row',
    tier: 'A+',
    rarity: 'SSR',
    image: HERO_IMAGES.fiona,
    description: 'Míssil SSR de tier A+. Recomendado para gear priority.',
  },
  {
    id: 'adam',
    name: 'Adam',
    role: 'Míssil',
    symbol: 'Ataque',
    position: 'Back Row',
    tier: 'A',
    rarity: 'SR',
    image: HERO_IMAGES.adam,
    description: 'Míssil SR de tier A. Bom para iniciantes.',
  },
  {
    id: 'venom',
    name: 'Venom',
    role: 'Míssil',
    symbol: 'Ataque',
    position: 'Back Row',
    tier: 'B+',
    rarity: 'SR',
    image: HERO_IMAGES.venom,
    description: 'Míssil SR de tier B+.',
  },
  {
    id: 'elsa',
    name: 'Elsa',
    role: 'Míssil',
    symbol: 'Ataque',
    position: 'Back Row',
    tier: 'B',
    rarity: 'R',
    image: HERO_IMAGES.elsa,
    description: 'Míssil R de tier B.',
  },
  {
    id: 'braz',
    name: 'Braz',
    role: 'Míssil',
    symbol: 'Ataque',
    position: 'Back Row',
    tier: 'B',
    rarity: 'R',
    image: HERO_IMAGES.braz,
    description: 'Míssil R de tier B.',
  },
  {
    id: 'kane',
    name: 'Kane',
    role: 'Míssil',
    symbol: 'Ataque',
    position: 'Back Row',
    tier: 'D',
    rarity: 'R',
    image: HERO_IMAGES.kane,
    description: 'Míssil R de tier D.',
  },

  // AERONAVES - Back Row (Suporte)
  {
    id: 'dva',
    name: 'DVA',
    role: 'Aeronave',
    symbol: 'Suporte',
    position: 'Back Row',
    tier: 'S+',
    rarity: 'UR',
    image: HERO_IMAGES.dva,
    description: 'Aeronave UR de tier S+. Excelente suporte contra tanques.',
  },
  {
    id: 'lucius',
    name: 'Lucius',
    role: 'Aeronave',
    symbol: 'Suporte',
    position: 'Back Row',
    tier: 'S',
    rarity: 'UR',
    image: HERO_IMAGES.lucius,
    description: 'Aeronave UR de tier S. Recomendado para gear priority.',
  },
  {
    id: 'shuyler',
    name: 'Shuyler',
    role: 'Aeronave',
    symbol: 'Suporte',
    position: 'Back Row',
    tier: 'A+',
    rarity: 'SSR',
    image: HERO_IMAGES.shuyler,
    description: 'Aeronave SSR de tier A+. Bom para back row.',
  },
  {
    id: 'morrison',
    name: 'Morrison',
    role: 'Aeronave',
    symbol: 'Suporte',
    position: 'Back Row',
    tier: 'A+',
    rarity: 'SSR',
    image: HERO_IMAGES.morrison,
    description: 'Aeronave SSR de tier A+. Recomendado para gear priority.',
  },
  {
    id: 'carlie',
    name: 'Carlie',
    role: 'Aeronave',
    symbol: 'Suporte',
    position: 'Back Row',
    tier: 'A',
    rarity: 'SR',
    image: HERO_IMAGES.carlie,
    description: 'Aeronave SR de tier A. Recomendado para gear priority.',
  },
  {
    id: 'sara',
    name: 'Sara',
    role: 'Aeronave',
    symbol: 'Suporte',
    position: 'Back Row',
    tier: 'B+',
    rarity: 'SR',
    image: HERO_IMAGES.sara,
    description: 'Aeronave SR de tier B+.',
  },
  {
    id: 'cage',
    name: 'Cage',
    role: 'Aeronave',
    symbol: 'Suporte',
    position: 'Back Row',
    tier: 'B',
    rarity: 'R',
    image: HERO_IMAGES.cage,
    description: 'Aeronave R de tier B.',
  },
  {
    id: 'maxell',
    name: 'Maxell',
    role: 'Aeronave',
    symbol: 'Suporte',
    position: 'Back Row',
    tier: 'B',
    rarity: 'R',
    image: HERO_IMAGES.maxell,
    description: 'Aeronave R de tier B.',
  },
  {
    id: 'ambolt',
    name: 'Ambolt',
    role: 'Aeronave',
    symbol: 'Suporte',
    position: 'Back Row',
    tier: 'D',
    rarity: 'R',
    image: HERO_IMAGES.ambolt,
    description: 'Aeronave R de tier D.',
  },
];

// Função auxiliar para obter herói por nome
export function getHeroByName(name: string): HeroComplete | undefined {
  return heroesComplete.find(h => h.name.toLowerCase() === name.toLowerCase());
}

// Função auxiliar para obter heróis por tipo
export function getHeroesByRole(role: HeroRole): HeroComplete[] {
  return heroesComplete.filter(h => h.role === role);
}

// Função auxiliar para obter heróis por posição
export function getHeroesByPosition(position: HeroPosition): HeroComplete[] {
  return heroesComplete.filter(h => h.position === position);
}

// Função auxiliar para obter heróis por tier
export function getHeroesByTier(tier: HeroTier): HeroComplete[] {
  return heroesComplete.filter(h => h.tier === tier);
}

// Função auxiliar para obter imagem do herói
export function getHeroImage(name: string): string {
  const hero = getHeroByName(name);
  return hero?.image || 'https://via.placeholder.com/100?text=No+Image';
}
