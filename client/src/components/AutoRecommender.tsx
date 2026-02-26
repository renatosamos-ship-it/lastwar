import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Lightbulb, CheckCircle } from 'lucide-react';

const enemyTypes = [
  { id: 'tank', name: 'Formacao Tanque Defensiva', weakness: 'Dano Alto', strength: 'Resistencia' },
  { id: 'offensive', name: 'Formacao Ofensiva Agressiva', weakness: 'Controle', strength: 'Dano' },
  { id: 'balanced', name: 'Formacao Balanceada', weakness: 'Especializacao', strength: 'Versatilidade' },
  { id: 'control', name: 'Formacao Controle Tático', weakness: 'Defesa Pura', strength: 'Atordoamento' },
];

const recommendations: Record<string, any> = {
  tank: {
    name: 'Recomendacao: Formacao Ofensiva Agressiva',
    description: 'Maximize dano para quebrar a defesa do inimigo',
    chips: ['Attack', 'Attack', 'Interference'],
    stats: { damage: '★★★★★', control: '★★★☆☆', defense: '★★☆☆☆' },
    reasoning: 'Tanques tem alta defesa mas dano baixo. Use dano maximo para vencer antes de perder.',
    tips: [
      'Mantenha pressao constante',
      'Nao deixe inimigo se recuperar',
      'Foque em dano puro',
    ],
    winRate: '72%',
  },
  offensive: {
    name: 'Recomendacao: Formacao Controle Tático',
    description: 'Domine o campo de batalha com controle',
    chips: ['Interference', 'Interference', 'Attack'],
    stats: { damage: '★★★★☆', control: '★★★★★', defense: '★★☆☆☆' },
    reasoning: 'Formacoes ofensivas atacam rapido. Use controle para impedir seus ataques.',
    tips: [
      'Atordoe inimigos chave',
      'Elimine um por um',
      'Mantenha controle constante',
    ],
    winRate: '78%',
  },
  balanced: {
    name: 'Recomendacao: Formacao Balanceada Versatil',
    description: 'Equilibrio perfeito entre dano e defesa',
    chips: ['Attack', 'Defense', 'Movement'],
    stats: { damage: '★★★★☆', control: '★★★☆☆', defense: '★★★★☆' },
    reasoning: 'Formacoes balanceadas nao tem fraquezas claras. Use versatilidade.',
    tips: [
      'Adapte sua estrategia',
      'Teste diferentes abordagens',
      'Mantenha flexibilidade',
    ],
    winRate: '65%',
  },
  control: {
    name: 'Recomendacao: Formacao Defensiva Tanque',
    description: 'Resista ao controle com defesa pura',
    chips: ['Defense', 'Defense', 'Movement'],
    stats: { damage: '★★★☆☆', control: '★★☆☆☆', defense: '★★★★★' },
    reasoning: 'Formacoes de controle usam atordoamento. Use defesa para resistir.',
    tips: [
      'Aumente sua resistencia',
      'Espere o controle passar',
      'Use movimento para escapar',
    ],
    winRate: '68%',
  },
};

export default function AutoRecommender() {
  const [selectedEnemy, setSelectedEnemy] = useState<string>('tank');

  const enemy = enemyTypes.find(e => e.id === selectedEnemy);
  const recommendation = recommendations[selectedEnemy];

  return (
    <div className="space-y-6">
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-2xl text-orange-400">Sistema de Recomendacoes Automaticas</CardTitle>
          <CardDescription>Receba recomendacoes personalizadas baseado no tipo de inimigo</CardDescription>
        </CardHeader>
      </Card>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Qual tipo de inimigo voce vai enfrentar?</CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={selectedEnemy} onValueChange={setSelectedEnemy}>
            <SelectTrigger className="bg-background border-border">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-background border-border">
              {enemyTypes.map(type => (
                <SelectItem key={type.id} value={type.id}>
                  {type.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {enemy && recommendation && (
        <>
          <Card className="bg-card border-border">
            <CardHeader>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <CardTitle className="text-orange-400">{recommendation.name}</CardTitle>
                  <CardDescription>{recommendation.description}</CardDescription>
                </div>
                <Badge className="bg-green-600 text-white text-lg px-4 py-2">
                  {recommendation.winRate} Taxa Vitoria
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-semibold text-foreground mb-3">Chips Recomendados</h4>
                <div className="flex flex-wrap gap-3">
                  {recommendation.chips.map((chip: string, idx: number) => (
                    <Badge
                      key={idx}
                      className="text-lg px-4 py-2 bg-orange-600 text-white"
                    >
                      {chip}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-3 bg-background rounded border border-border">
                  <h4 className="font-semibold text-red-400 text-sm mb-2">Dano</h4>
                  <p className="text-lg">{recommendation.stats.damage}</p>
                </div>
                <div className="p-3 bg-background rounded border border-border">
                  <h4 className="font-semibold text-purple-400 text-sm mb-2">Controle</h4>
                  <p className="text-lg">{recommendation.stats.control}</p>
                </div>
                <div className="p-3 bg-background rounded border border-border">
                  <h4 className="font-semibold text-cyan-400 text-sm mb-2">Defesa</h4>
                  <p className="text-lg">{recommendation.stats.defense}</p>
                </div>
              </div>

              <div className="p-4 bg-background rounded border border-border border-l-4" style={{ borderLeftColor: '#ffd700' }}>
                <h4 className="font-semibold text-yellow-400 mb-2 flex items-center gap-2">
                  <Lightbulb size={18} />
                  Por que esta recomendacao?
                </h4>
                <p className="text-sm text-muted-foreground">{recommendation.reasoning}</p>
              </div>

              <div>
                <h4 className="font-semibold text-foreground mb-3">Dicas Estrategicas</h4>
                <div className="space-y-2">
                  {recommendation.tips.map((tip: string, idx: number) => (
                    <div key={idx} className="flex gap-3 p-2 bg-background rounded border border-border">
                      <CheckCircle size={18} className="text-green-400 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-muted-foreground">{tip}</p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-orange-400">Analise do Inimigo</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-background rounded border border-border border-l-4" style={{ borderLeftColor: '#ff6f00' }}>
                  <h4 className="font-semibold text-orange-400 mb-2">Fraqueza Principal</h4>
                  <p className="text-foreground font-bold text-lg">{enemy.weakness}</p>
                  <p className="text-xs text-muted-foreground mt-1">Explore esta fraqueza para vencer</p>
                </div>
                <div className="p-4 bg-background rounded border border-border border-l-4" style={{ borderLeftColor: '#00d9ff' }}>
                  <h4 className="font-semibold text-cyan-400 mb-2">Forca Principal</h4>
                  <p className="text-foreground font-bold text-lg">{enemy.strength}</p>
                  <p className="text-xs text-muted-foreground mt-1">Cuidado com esta forca</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border border-l-4" style={{ borderLeftColor: '#9c27b0' }}>
            <CardHeader>
              <CardTitle className="text-purple-400">Dica Extra</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Lembre-se que o nivel do seu Chip Lab e a raridade dos seus chips tambem sao importantes. Se voce nao conseguir vencer, considere aumentar o nivel do Chip Lab ou coletar mais material para chips de raridade mais alta.
              </p>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
