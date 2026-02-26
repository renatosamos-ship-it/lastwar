import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const strategies = [
  {
    name: 'Formacao Ofensiva Agressiva',
    difficulty: 'Intermediario',
    color: '#ff6f00',
    description: 'Maximize dano com sinergia de chips',
    chips: ['Attack', 'Attack', 'Interference'],
    pros: ['Dano maximo', 'Rapido para derrotar inimigos'],
    cons: ['Pouca defesa', 'Risco alto'],
    bestAgainst: ['Formacoes defensivas', 'Tropas lentas'],
    worstAgainst: ['Formacoes balanceadas', 'Controle'],
  },
  {
    name: 'Formacao Defensiva Tanque',
    difficulty: 'Basico',
    color: '#ffd700',
    description: 'Maximize durabilidade e resistencia',
    chips: ['Defense', 'Defense', 'Movement'],
    pros: ['Alta resistencia', 'Duracao prolongada'],
    cons: ['Dano reduzido', 'Lento'],
    bestAgainst: ['Formacoes ofensivas', 'Dano continuo'],
    worstAgainst: ['Controle', 'Atordoamento'],
  },
  {
    name: 'Formacao Balanceada Versatil',
    difficulty: 'Intermediario',
    color: '#00d9ff',
    description: 'Equilibrio entre dano e defesa',
    chips: ['Attack', 'Defense', 'Movement'],
    pros: ['Versatil', 'Equilibrado'],
    cons: ['Nenhuma especializacao', 'Menos efetivo'],
    bestAgainst: ['Formacoes desconhecidas', 'Multiplos inimigos'],
    worstAgainst: ['Especializacoes extremas'],
  },
  {
    name: 'Formacao de Controle Tático',
    difficulty: 'Avancado',
    color: '#9c27b0',
    description: 'Domine o campo de batalha',
    chips: ['Interference', 'Interference', 'Attack'],
    pros: ['Controle total', 'Impede acoes inimigas'],
    cons: ['Requer timing', 'Complexo'],
    bestAgainst: ['Formacoes ofensivas', 'Tropas rapidas'],
    worstAgainst: ['Resistencia a controle', 'Defesa pura'],
  },
];

const synergies = [
  {
    combo: 'Attack + Interference',
    effect: 'Dano com Controle',
    bonus: '+15% Efetividade',
    description: 'Combine dano alto com atordoamento para controlar o ritmo da batalha',
  },
  {
    combo: 'Defense + Movement',
    effect: 'Resistencia com Mobilidade',
    bonus: '+20% Duracao',
    description: 'Tanques moveis que nao podem ser facilmente isolados',
  },
  {
    combo: 'Movement + Attack',
    effect: 'Dano Rapido',
    bonus: '+25% Velocidade de Ataque',
    description: 'Tropas rapidas que atacam antes do inimigo reagir',
  },
  {
    combo: 'Defense + Defense',
    effect: 'Defesa Extrema',
    bonus: '+40% Armadura',
    description: 'Defesa maxima para tropas tanque em primeira linha',
  },
];

const matchups = [
  {
    yourFormation: 'Ofensiva Agressiva',
    enemyFormation: 'Defensiva Tanque',
    advantage: 'Vantagem',
    reason: 'Seu dano alto quebra a defesa inimiga',
    tip: 'Mantenha pressao constante e nao deixe inimigo se recuperar',
  },
  {
    yourFormation: 'Defensiva Tanque',
    enemyFormation: 'Ofensiva Agressiva',
    advantage: 'Desvantagem',
    reason: 'Seu dano baixo nao consegue vencer antes de perder',
    tip: 'Espere apoio ou use controle para ganhar tempo',
  },
  {
    yourFormation: 'Balanceada Versatil',
    enemyFormation: 'Controle Tático',
    advantage: 'Equilibrio',
    reason: 'Ambas as formacoes tem forcas e fraquezas',
    tip: 'Adapte sua estrategia baseado no que o inimigo faz',
  },
  {
    yourFormation: 'Controle Tático',
    enemyFormation: 'Ofensiva Agressiva',
    advantage: 'Vantagem',
    reason: 'Seu controle impede que inimigo ataque efetivamente',
    tip: 'Atordoe inimigos chave e elimine um por um',
  },
];

export default function AdvancedStrategies() {
  return (
    <div className="space-y-6">
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-2xl text-orange-400">Guia de Estrategias Avancadas</CardTitle>
          <CardDescription>Domine as estrategias avancadas e venca seus inimigos</CardDescription>
        </CardHeader>
      </Card>

      <Tabs defaultValue="builds" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-card border border-border">
          <TabsTrigger value="builds">Builds Recomendadas</TabsTrigger>
          <TabsTrigger value="synergies">Sinergias</TabsTrigger>
          <TabsTrigger value="matchups">Matchups</TabsTrigger>
        </TabsList>

        <TabsContent value="builds" className="space-y-6 mt-6">
          <div className="grid md:grid-cols-2 gap-6">
            {strategies.map((strategy, idx) => (
              <Card key={idx} className="bg-card border-border">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <CardTitle style={{ color: strategy.color }}>{strategy.name}</CardTitle>
                    <Badge className="text-xs">{strategy.difficulty}</Badge>
                  </div>
                  <CardDescription>{strategy.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2 text-sm">Chips Recomendados</h4>
                    <div className="flex flex-wrap gap-2">
                      {strategy.chips.map((chip, i) => (
                        <Badge key={i} className="bg-background text-foreground border border-border">
                          {chip}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-3">
                    <div>
                      <h4 className="font-semibold text-green-400 text-sm mb-2">Vantagens</h4>
                      <ul className="space-y-1">
                        {strategy.pros.map((pro, i) => (
                          <li key={i} className="text-xs text-muted-foreground flex gap-2">
                            <span className="text-green-400">+</span>
                            {pro}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-red-400 text-sm mb-2">Desvantagens</h4>
                      <ul className="space-y-1">
                        {strategy.cons.map((con, i) => (
                          <li key={i} className="text-xs text-muted-foreground flex gap-2">
                            <span className="text-red-400">-</span>
                            {con}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-3 p-3 bg-background rounded border border-border">
                    <div>
                      <h4 className="font-semibold text-cyan-400 text-xs mb-1">Efetivo Contra</h4>
                      <p className="text-xs text-muted-foreground">{strategy.bestAgainst.join(', ')}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-orange-400 text-xs mb-1">Fraco Contra</h4>
                      <p className="text-xs text-muted-foreground">{strategy.worstAgainst.join(', ')}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="synergies" className="space-y-6 mt-6">
          <div className="grid md:grid-cols-2 gap-6">
            {synergies.map((synergy, idx) => (
              <Card key={idx} className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-lg text-orange-400">{synergy.combo}</CardTitle>
                  <CardDescription>{synergy.effect}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <Badge className="bg-green-600 text-white mb-2">{synergy.bonus}</Badge>
                    <p className="text-sm text-muted-foreground">{synergy.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="bg-card border-border border-l-4" style={{ borderLeftColor: '#ffd700' }}>
            <CardHeader>
              <CardTitle className="text-yellow-400">Dica de Sinergia</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                As melhores formacoes nao usam apenas um tipo de chip. Combine chips diferentes para criar sinergias que amplificam seus efeitos. Experimente diferentes combinacoes para encontrar a que melhor se adapta ao seu estilo de jogo!
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="matchups" className="space-y-6 mt-6">
          <div className="space-y-4">
            {matchups.map((matchup, idx) => (
              <Card key={idx} className="bg-card border-border">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-foreground">{matchup.yourFormation}</h4>
                      <p className="text-xs text-muted-foreground">vs {matchup.enemyFormation}</p>
                    </div>
                    <Badge
                      className={
                        matchup.advantage === 'Vantagem'
                          ? 'bg-green-600 text-white'
                          : matchup.advantage === 'Desvantagem'
                          ? 'bg-red-600 text-white'
                          : 'bg-blue-600 text-white'
                      }
                    >
                      {matchup.advantage}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-foreground text-sm mb-1">Por que?</h4>
                    <p className="text-sm text-muted-foreground">{matchup.reason}</p>
                  </div>
                  <div className="p-3 bg-background rounded border border-border border-l-4" style={{ borderLeftColor: '#ff6f00' }}>
                    <h4 className="font-semibold text-orange-400 text-sm mb-1">Estrategia</h4>
                    <p className="text-xs text-muted-foreground">{matchup.tip}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-orange-400">Dicas Gerais de Estrategia</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm">
            <li className="flex gap-3">
              <span className="font-bold text-orange-400">1.</span>
              <span className="text-muted-foreground">Conheca suas formacoes e seus matchups</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-orange-400">2.</span>
              <span className="text-muted-foreground">Adapte sua estrategia baseado no inimigo</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-orange-400">3.</span>
              <span className="text-muted-foreground">Teste diferentes combinacoes de chips</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-orange-400">4.</span>
              <span className="text-muted-foreground">Mantenha seu Chip Lab atualizado</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-orange-400">5.</span>
              <span className="text-muted-foreground">Comunique com sua alianca para estrategias coordenadas</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
