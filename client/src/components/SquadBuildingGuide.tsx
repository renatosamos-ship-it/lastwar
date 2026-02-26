import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertCircle, Shield, Sword, Radio, TrendingUp, Lightbulb, Zap } from 'lucide-react';

export default function SquadBuildingGuide() {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const basicPrinciples = [
    {
      title: 'Sinergia de Tipos',
      description: 'Agrupar heróis do mesmo tipo oferece bônus significativos',
      bonus: '+20% HP, ATK, DEF com 5 heróis do mesmo tipo',
      icon: '🔗',
    },
    {
      title: 'Balanceamento',
      description: 'Combine defesa, ataque e suporte para esquadrão robusto',
      bonus: 'Melhor desempenho contra múltiplos tipos de inimigos',
      icon: '⚖️',
    },
    {
      title: 'Progressão',
      description: 'Desenvolva heróis gradualmente, priorizando raridade',
      bonus: 'Evolução constante do poder do esquadrão',
      icon: '📈',
    },
    {
      title: 'Adaptação',
      description: 'Ajuste formação conforme enfrenta diferentes inimigos',
      bonus: 'Maior taxa de vitória em combates variados',
      icon: '🎯',
    },
  ];

  const advancedStrategies = [
    {
      name: 'Estratégia Pura (Recomendada)',
      composition: '5 heróis do mesmo tipo',
      bonus: '+20% HP, ATK, DEF',
      pros: ['Máximo bônus de sinergia', 'Mais fácil de gerenciar', 'Melhor para iniciantes'],
      cons: ['Menos flexível', 'Vulnerável a counter-picks'],
      bestFor: 'Jogadores F2P e iniciantes',
      example: '5 Tanques UR = Defesa máxima',
    },
    {
      name: 'Estratégia Híbrida (Avançada)',
      composition: '3 + 2 heróis de tipos diferentes',
      bonus: '+10% HP, ATK, DEF + Flexibilidade',
      pros: ['Mais flexível', 'Melhor contra múltiplos tipos', 'Adaptável'],
      cons: ['Bônus menor', 'Mais complexo de gerenciar'],
      bestFor: 'Jogadores experientes',
      example: '3 Tanques + 2 Aviões = Defesa + Dano',
    },
    {
      name: 'Estratégia Ofensiva (Agressiva)',
      composition: '4 Aviões + 1 Suporte',
      bonus: 'Dano máximo + Proteção',
      pros: ['Dano devastador', 'Combates rápidos', 'Ótimo para PvP'],
      cons: ['Defesa baixa', 'Requer timing perfeito'],
      bestFor: 'Jogadores agressivos',
      example: 'Kimberly + DVA + 3 Aviões UR',
    },
  ];

  const formationBonus = [
    { heroes: '3 do mesmo tipo', bonus: '+5% HP, ATK, DEF' },
    { heroes: '3 + 2 de outro tipo', bonus: '+10% HP, ATK, DEF' },
    { heroes: '4 do mesmo tipo', bonus: '+15% HP, ATK, DEF' },
    { heroes: '5 do mesmo tipo', bonus: '+20% HP, ATK, DEF' },
  ];

  const troopTypes = [
    {
      id: 'tanks',
      name: 'Tanques',
      emoji: '🛡️',
      description: 'Heróis de defesa na linha de frente',
      advantages: ['Absorvem dano', 'Protegem retaguarda', 'Resistência alta'],
      counter: 'Aviões',
      beats: 'Mísseis',
      timeline: 'Dia 57 - 5 UR disponíveis',
      bestHeroes: ['Murphy', 'Viola', 'Guardian'],
    },
    {
      id: 'missiles',
      name: 'Mísseis',
      emoji: '🚀',
      description: 'Heróis de ataque/suporte nos lados',
      advantages: ['Dano equilibrado', 'Suporte', 'Versatilidade'],
      counter: 'Tanques',
      beats: 'Aviões',
      timeline: 'Dia 99 - 5 UR disponíveis',
      bestHeroes: ['Mason', 'Schuyler', 'Hector'],
    },
    {
      id: 'aircraft',
      name: 'Aviões',
      emoji: '✈️',
      description: 'Heróis de ataque rápido na retaguarda',
      advantages: ['Velocidade alta', 'Dano aéreo', 'Mobilidade'],
      counter: 'Mísseis',
      beats: 'Tanques',
      timeline: 'Dia 71 - 5 UR disponíveis',
      bestHeroes: ['Kimberly', 'DVA', 'Phoenix'],
    },
  ];

  const developmentStages = [
    {
      stage: 'Estágio Inicial (Dia 1-56)',
      focus: 'Formação de Tanques',
      priority: 'Desenvolver 1 esquadrão principal de tanques',
      tips: [
        'Foque em Murphy, Viola e outros tanques UR',
        'Invista em armas defensivas',
        'Treine habilidades de proteção',
      ],
      goals: ['Atingir 10k HP total', 'Desbloquear Chip Lab', 'Primeira vitória em Arena'],
    },
    {
      stage: 'Estágio Intermediário (Dia 57-98)',
      focus: 'Formação de Aviões',
      priority: 'Começar a desenvolver segundo esquadrão',
      tips: [
        'Aproveite que aviões têm vantagem contra tanques',
        'Invista em heróis rápidos',
        'Combine com suporte',
      ],
      goals: ['Atingir 15k ATK total', 'Participar de eventos', 'Subir na Arena'],
    },
    {
      stage: 'Estágio Avançado (Dia 99+)',
      focus: 'Formação de Mísseis + Otimização',
      priority: 'Completar terceiro esquadrão e otimizar chips',
      tips: [
        'Mísseis têm vantagem contra aviões',
        'Comece a otimizar chips',
        'Estude meta-game competitivo',
      ],
      goals: ['Atingir 20k DEF total', 'Dominar Arena', 'Participar de Guerras de Aliança'],
    },
  ];

  const competitiveFormations = [
    {
      name: 'Defesa Inabalável',
      composition: '5 Tanques UR',
      stats: 'HP: 20k | DEF: 8k | ATK: 5k',
      pros: 'Sobrevive a qualquer ataque inicial',
      cons: 'Dano baixo, combates longos',
      counters: 'Aviões rápidos',
      chipStrategy: 'Defense + Movement',
    },
    {
      name: 'Ataque Devastador',
      composition: '4 Aviões + 1 Suporte UR',
      stats: 'HP: 12k | DEF: 4k | ATK: 15k',
      pros: 'Mata inimigos rapidamente',
      cons: 'Morre fácil se não mata rápido',
      counters: 'Tanques defensivos',
      chipStrategy: 'Attack + Interference',
    },
    {
      name: 'Balanceado Versátil',
      composition: '3 Tanques + 2 Aviões UR',
      stats: 'HP: 16k | DEF: 6k | ATK: 10k',
      pros: 'Adaptável a múltiplos cenários',
      cons: 'Não é o melhor em nada',
      counters: 'Estratégias puras especializadas',
      chipStrategy: 'Balanced Mix',
    },
    {
      name: 'Suporte Ofensivo',
      composition: '3 Aviões + 2 Suporte UR',
      stats: 'HP: 14k | DEF: 5k | ATK: 12k',
      pros: 'Dano + Proteção contínua',
      cons: 'Requer boa sinergia',
      counters: 'Aviões puros',
      chipStrategy: 'Attack + Support',
    },
  ];

  const advancedTips = [
    {
      title: 'Sinergia de Heróis',
      description: 'Alguns heróis têm sinergias especiais quando juntos',
      example: 'Kimberly + DVA = +15% ATK para ambos',
      priority: 'Alta',
    },
    {
      title: 'Otimização de Chips',
      description: 'Escolha chips que complementam o tipo de esquadrão',
      example: 'Tanques: Defense + Movement; Aviões: Attack + Interference',
      priority: 'Alta',
    },
    {
      title: 'Posicionamento Estratégico',
      description: 'A posição dos heróis afeta o resultado do combate',
      example: 'Coloque tanques na frente, aviões na retaguarda',
      priority: 'Média',
    },
    {
      title: 'Armas Complementares',
      description: 'Escolha armas que potencializam habilidades do herói',
      example: 'Kimberly com arma de ATK rápido = dano máximo',
      priority: 'Média',
    },
    {
      title: 'Timing de Habilidades',
      description: 'Coordene habilidades para combos devastadores',
      example: 'Use defesa antes do ataque inimigo',
      priority: 'Média',
    },
    {
      title: 'Análise de Inimigos',
      description: 'Estude formações inimigas e adapte sua estratégia',
      example: 'Vendo tanques? Use aviões. Vendo aviões? Use mísseis.',
      priority: 'Alta',
    },
  ];

  return (
    <div className="space-y-6">
      <Tabs defaultValue="basics" className="w-full">
        <TabsList className="grid w-full grid-cols-5 bg-card border border-border text-xs md:text-sm">
          <TabsTrigger value="basics">Básico</TabsTrigger>
          <TabsTrigger value="strategies">Estratégias</TabsTrigger>
          <TabsTrigger value="formations">Formações</TabsTrigger>
          <TabsTrigger value="development">Desenvolvimento</TabsTrigger>
          <TabsTrigger value="advanced">Avançado</TabsTrigger>
        </TabsList>

        {/* BÁSICO */}
        <TabsContent value="basics" className="space-y-6 mt-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-orange-400">🎯 Princípios Fundamentais</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {basicPrinciples.map((principle, idx) => (
                  <Card key={idx} className="bg-background border-border">
                    <CardContent className="pt-4">
                      <p className="text-2xl mb-2">{principle.icon}</p>
                      <p className="font-semibold text-foreground">{principle.title}</p>
                      <p className="text-xs text-muted-foreground mt-2">{principle.description}</p>
                      <Badge variant="outline" className="mt-3 text-xs">
                        {principle.bonus}
                      </Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Bônus de Formação */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-cyan-400">💪 Bônus de Formação</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {formationBonus.map((bonus, idx) => (
                  <div key={idx} className="flex justify-between items-center p-3 bg-background rounded border border-border">
                    <span className="text-foreground">{bonus.heroes}</span>
                    <Badge className="bg-purple-600 text-white">{bonus.bonus}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ESTRATÉGIAS */}
        <TabsContent value="strategies" className="space-y-6 mt-6">
          {advancedStrategies.map((strategy, idx) => (
            <Card key={idx} className="bg-card border-border">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-orange-400">{strategy.name}</CardTitle>
                    <CardDescription>{strategy.composition}</CardDescription>
                  </div>
                  <Badge className="bg-purple-600 text-white">{strategy.bonus}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="font-semibold text-green-400 mb-2">✅ Vantagens</p>
                    <ul className="space-y-1">
                      {strategy.pros.map((pro, pidx) => (
                        <li key={pidx} className="text-sm text-foreground flex gap-2">
                          <span className="text-green-400">•</span> {pro}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold text-red-400 mb-2">❌ Desvantagens</p>
                    <ul className="space-y-1">
                      {strategy.cons.map((con, cidx) => (
                        <li key={cidx} className="text-sm text-foreground flex gap-2">
                          <span className="text-red-400">•</span> {con}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="p-3 bg-background rounded border border-border">
                  <p className="text-xs text-muted-foreground">Melhor para</p>
                  <p className="text-sm font-semibold text-cyan-400 mt-1">{strategy.bestFor}</p>
                </div>
                <div className="p-3 bg-background rounded border border-border">
                  <p className="text-xs text-muted-foreground">Exemplo</p>
                  <p className="text-sm text-foreground mt-1">{strategy.example}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* FORMAÇÕES */}
        <TabsContent value="formations" className="space-y-6 mt-6">
          {competitiveFormations.map((formation, idx) => (
            <Card key={idx} className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-yellow-400">{formation.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-3">
                  <div className="p-3 bg-background rounded border border-border text-center">
                    <p className="text-xs text-muted-foreground">Composição</p>
                    <p className="text-sm font-semibold text-foreground mt-1">{formation.composition}</p>
                  </div>
                  <div className="p-3 bg-background rounded border border-border text-center">
                    <p className="text-xs text-muted-foreground">Stats</p>
                    <p className="text-xs font-semibold text-cyan-400 mt-1">{formation.stats}</p>
                  </div>
                  <div className="p-3 bg-background rounded border border-border text-center">
                    <p className="text-xs text-muted-foreground">Chips</p>
                    <p className="text-xs font-semibold text-purple-400 mt-1">{formation.chipStrategy}</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-3 bg-green-600/10 rounded border border-green-600">
                    <p className="text-xs font-semibold text-green-400 mb-1">Força</p>
                    <p className="text-sm text-foreground">{formation.pros}</p>
                  </div>
                  <div className="p-3 bg-red-600/10 rounded border border-red-600">
                    <p className="text-xs font-semibold text-red-400 mb-1">Fraqueza</p>
                    <p className="text-sm text-foreground">{formation.cons}</p>
                  </div>
                </div>

                <div className="p-3 bg-background rounded border border-border">
                  <p className="text-xs text-muted-foreground">Counter</p>
                  <p className="text-sm text-orange-400 font-semibold mt-1">{formation.counters}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* DESENVOLVIMENTO */}
        <TabsContent value="development" className="space-y-6 mt-6">
          {developmentStages.map((stage, idx) => (
            <Card key={idx} className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-cyan-400">{stage.stage}</CardTitle>
                <CardDescription>Foco: {stage.focus}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-background rounded border border-border">
                  <p className="font-semibold text-foreground mb-2">🎯 Prioridade</p>
                  <p className="text-sm text-muted-foreground">{stage.priority}</p>
                </div>

                <div>
                  <p className="font-semibold text-yellow-400 mb-2">💡 Dicas</p>
                  <ul className="space-y-1">
                    {stage.tips.map((tip, tidx) => (
                      <li key={tidx} className="text-sm text-foreground flex gap-2">
                        <span className="text-yellow-400">→</span> {tip}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="font-semibold text-purple-400 mb-2">🏆 Objetivos</p>
                  <ul className="space-y-1">
                    {stage.goals.map((goal, gidx) => (
                      <li key={gidx} className="text-sm text-foreground flex gap-2">
                        <span className="text-purple-400">✓</span> {goal}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* AVANÇADO */}
        <TabsContent value="advanced" className="space-y-6 mt-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-purple-400 flex items-center gap-2">
                <Zap size={20} /> Dicas Avançadas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {advancedTips.map((tip, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-background rounded border border-border cursor-pointer hover:border-orange-400 transition"
                    onClick={() => setExpandedSection(expandedSection === idx.toString() ? null : idx.toString())}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold text-foreground">{tip.title}</p>
                        <p className="text-xs text-muted-foreground mt-1">{tip.description}</p>
                      </div>
                      <Badge
                        className={
                          tip.priority === 'Alta'
                            ? 'bg-red-600 text-white'
                            : 'bg-yellow-600 text-white'
                        }
                      >
                        {tip.priority}
                      </Badge>
                    </div>
                    {expandedSection === idx.toString() && (
                      <div className="mt-3 pt-3 border-t border-border">
                        <p className="text-xs text-muted-foreground mb-1">Exemplo:</p>
                        <p className="text-sm text-cyan-400">{tip.example}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
