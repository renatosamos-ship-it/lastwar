# Guia Prático: Chips de Combate LastWar - TODO

## Fase 1: Estrutura Principal
- [x] Estrutura com 3 abas principais (Chip de Drone, Esquadrão, Heróis)
- [x] Sistema de autenticação com Manus OAuth
- [x] Header com nome do usuário e botão de logout

## Fase 2: Aba Chip de Drone
- [x] Componente DroneChipLab completo
- [x] 5 sub-abas: Visão Geral, Tipos, Produção, Equipar, Obtenção
- [x] Tipos expandíveis (Attack, Defense, Movement, Interference)
- [x] Raridades (R, SR, SSR, UR)
- [x] Análise de chips com Gemini LLM

## Fase 3: Aba Esquadrão - Melhorias Implementadas
- [x] Guia de Montagem expandido com estratégias avançadas
  - [x] Princípios fundamentais (Sinergia, Balanceamento, Progressão, Adaptação)
  - [x] 3 estratégias principais (Pura, Híbrida, Ofensiva)
  - [x] Formações competitivas (4 tipos diferentes)
  - [x] 3 estágios de desenvolvimento (Inicial, Intermediário, Avançado)
  - [x] 6 dicas avançadas com prioridades
- [x] FormationSimulator com seleção de heróis
- [x] SquadAnalyzer com upload de imagem e análise por IA
- [x] ProgressCalculator com estimativa de tempo de progresso

## Fase 4: Aba Heróis
- [x] Lista de heróis com raridades
- [x] Analisador de herói (placeholder)
- [x] Dicas úteis para desenvolvimento de heróis

## Fase 5: Integração e Testes
- [x] Testar ProgressCalculator (calculadora de tempo)
- [x] Testar SquadBuildingGuide (estratégias expandidas)
- [x] Testar navegação entre abas
- [x] Testar autenticação
- [x] Testes vitest passando (1 test passed)

## Melhorias Futuras
- [ ] Sistema de favoritos para salvar formações
- [ ] Comparador lado-a-lado de formações
- [ ] Histórico de análises
- [ ] Integração com dados de BlueStacks
- [ ] Tier list de heróis 2025
- [ ] Mais heróis reais na lista


## Correcoes Urgentes
- [x] Atualizar lista de herois com tier list 2025 Season 5
- [x] Corrigir erro no SquadAnalyzer (shortTerm.map is not a function)
- [x] Adicionar novos herois: Venom UR, Fiona, Stetmann, Morrison
- [x] Atualizar FormationSimulator com herois corretos
- [x] Melhorar prompt do Gemini para identificar heróis corretamente
- [x] Adicionar validação de estrutura JSON no servidor


## Melhorias de Identificacao de Herois
- [x] Corrigir confusao entre Kimberly e Monica (suporte)
- [x] Corrigir confusao entre Marshall e Scarlett UR (tanques)
- [x] Adicionar descricoes visuais mais detalhadas no prompt
- [x] Testar analisador com imagem fornecida pelo usuario


## Implementacao de IA Alternativa para Identificacao de Herois
- [x] Criar modulo de validacao visual de herois
- [x] Implementar deteccao de padroes de cores RGB
- [x] Adicionar logica de eliminacao (Monica nao existe em esquadroes validos)
- [x] Criar endpoint alternativo com validacao cruzada
- [x] Testar com imagem fornecida pelo usuario


## Sistema de Matching Fuzzy para Herois
- [x] Criar modulo de descricao visual detalhada
- [x] Implementar algoritmo de matching fuzzy
- [x] Integrar com endpoint de analise
- [x] Testar com multiplas imagens


## Correcao de Erro 500 do LLM
- [x] Remover schema JSON complexo das chamadas LLM
- [x] Simplificar detail de imagem para "low"
- [x] Adicionar tratamento de erro e fallback
- [x] Adicionar validacao de arrays em resposta


## Melhoria do Analisador de Esquadrao
- [x] Criar prompt Gemini otimizado para extrair dados estruturados
- [x] Implementar parsing de niveis (Nv. 175)
- [x] Implementar parsing de raridades (contagem de estrelas)
- [x] Extrair inventario completo de herois do grid
- [x] Testar com imagem de esquadrão fornecida


## Unificacao de Abas Analisador + Simulador
- [x] Criar componente AnalyzerSimulator unificado
- [x] Integrar upload de imagem com analise
- [x] Adicionar simulador interativo na mesma aba
- [x] Implementar comparacao visual antes/depois
- [x] Testar fluxo completo
