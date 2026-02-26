// Prompts otimizados para análise de esquadrão com extração de dados estruturados

export const SQUAD_ANALYSIS_PROMPT = `Você é um especialista em análise de esquadrões do Last War Survival.

TAREFA: Analisar a imagem do esquadrão e extrair TODAS as informações visíveis:

1. HERÓIS NA FORMAÇÃO (5 slots):
   - Identifique cada herói pela sua aparência visual
   - Extraia o nível (Nv. XXX)
   - Conte as estrelas de raridade (1-5 estrelas)
   - Identifique o tipo (Tank, Aircraft, Missile, Support)

2. INVENTÁRIO DE HERÓIS (grid abaixo):
   - Liste todos os heróis disponíveis
   - Extraia nível de cada um (Lv.XXX)
   - Conte as estrelas de raridade
   - Identifique quantas cópias possui (número no canto)

3. ANÁLISE DO ESQUADRÃO:
   - Tipo de composição (Balanced, Offensive, Defensive, etc)
   - Pontos fortes (sinergia, cobertura de roles, etc)
   - Pontos fracos (falta de roles, baixo nível, etc)
   - Recomendações de melhoria

FORMATO DE RESPOSTA (JSON estruturado):
{
  "squad": {
    "heroes": [
      {
        "position": 1,
        "name": "Nome do Herói",
        "level": 175,
        "rarity": 5,
        "role": "Tank"
      }
    ],
    "composition": {
      "tanks": 1,
      "aircraft": 1,
      "missile": 1,
      "support": 2
    }
  },
  "inventory": {
    "totalHeroes": 20,
    "heroes": [
      {
        "name": "Nome",
        "level": 175,
        "rarity": 5,
        "copies": 1
      }
    ]
  },
  "analysis": {
    "squadType": "Balanced",
    "powerLevel": 48.4,
    "strengths": [
      "Boa cobertura de roles",
      "Heróis bem nivelados"
    ],
    "weaknesses": [
      "Falta de sinergias específicas",
      "Alguns heróis baixo nível"
    ],
    "recommendations": [
      "Aumentar nível dos heróis",
      "Adicionar heróis com sinergia"
    ],
    "nextSteps": {
      "shortTerm": ["Treinar heróis para nível 180", "Coletar chips"],
      "mediumTerm": ["Adicionar novo herói UR", "Melhorar sinergias"],
      "longTerm": ["Atingir poder 50M", "Completar formação ideal"]
    }
  }
}

INSTRUÇÕES CRÍTICAS:
- Seja preciso na identificação de heróis (use cores, forma, ícone como referência)
- Se não conseguir identificar um herói, use "Unknown" como nome
- Conte as estrelas com precisão (cada estrela = 1 ponto de raridade)
- Extraia números exatos (níveis, poder, cópias)
- Retorne APENAS JSON válido, sem explicações adicionais`;

export const SQUAD_INVENTORY_EXTRACTION_PROMPT = `Você é um especialista em análise visual de jogos.

TAREFA: Extrair informações do grid de heróis na imagem.

Para cada herói no grid, extraia:
1. Nome/Ícone do herói
2. Nível (Lv.XXX)
3. Raridade (contando estrelas: 1-5)
4. Número de cópias (se houver número no canto)

FORMATO DE RESPOSTA (JSON):
{
  "heroesInGrid": [
    {
      "gridPosition": "row1-col1",
      "name": "Nome do Herói",
      "level": 175,
      "rarity": 5,
      "copies": 1
    }
  ],
  "gridSize": "5x4",
  "totalHeroes": 20
}

Retorne APENAS JSON válido.`;

export const HERO_IDENTIFICATION_PROMPT = `Você é um especialista no jogo Last War Survival.

TAREFA: Identificar os 5 heróis na formação principal da imagem.

Para cada herói, retorne:
- Nome exato
- Posição na formação (1-5)
- Nível (Nv. XXX)
- Raridade (contando estrelas)
- Tipo/Classe (Tank, Aircraft, Missile, Support)

LISTA DE HERÓIS CONHECIDOS (2025 Season 5):
Tanks: Scarlett UR, Williams, Kimberly, Murphy, Marshall, Morrison, Stetmann, Fiona
Aircraft: Nova, Medivac, Baneling, Hydralisk, Mutalisk, Zergling
Missile: Siege Tank, Battlecruiser, Goliath, Wraith, Valkyrie
Support: Medic, Scientist, Engineer, Probe, Observer, Queen

FORMATO DE RESPOSTA (JSON):
{
  "squadHeroes": [
    {
      "position": 1,
      "name": "Nome Exato do Herói",
      "level": 175,
      "rarity": 5,
      "role": "Tank",
      "confidence": 0.95
    }
  ]
}

Retorne APENAS JSON válido.`;
