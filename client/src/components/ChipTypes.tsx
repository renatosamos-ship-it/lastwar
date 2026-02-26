import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, Sword, Radio, ChevronDown } from 'lucide-react';

const chipTypesData = [
  {
    id: 'movement',
    name: 'Movement Chip',
    icon: Shield,
    color: '#00d9ff',
    description: 'Aumenta velocidade e mobilidade das tropas',
    benefits: [
      'Velocidade de movimento +20%',
      'Tempo de recarga reduzido',
      'Melhor posicionamento em batalha',
      'Ideal para tropas aereas'
    ],
    bestFor: ['Avioes', 'Helicopteros'],
    statBoost: '+25% Velocidade'
  },
  {
    id: 'attack',
    name: 'Attack Chip',
    icon: Sword,
    color: '#ff6f00',
    description: 'Aumenta dano e poder de fogo',
    benefits: [
      'Dano +30%',
      'Critico +15%',
      'Penetracao de armadura',
      'Excelente para ofensiva'
    ],
    bestFor: ['Foguetes', 'Tanques'],
    statBoost: '+30% Dano'
  },
  {
    id: 'interference',
    name: 'Interference Chip',
    icon: Radio,
    color: '#9c27b0',
    description: 'Controla e desativa inimigos',
    benefits: [
      'Chance de atordoamento +25%',
      'Reduz velocidade inimiga',
      'Desativa habilidades especiais',
      'Controle de campo'
    ],
    bestFor: ['Foguetes', 'Defesa'],
    statBoost: '+25% Controle'
  },
  {
    id: 'defense',
    name: 'Defense Chip',
    icon: Shield,
    color: '#ffd700',
    description: 'Aumenta resistencia e defesa',
    benefits: [
      'Armadura +40%',
      'Vida +35%',
      'Reducao de dano',
      'Essencial para tanques'
    ],
    bestFor: ['Tanques', 'Tropas Pesadas'],
    statBoost: '+40% Defesa'
  },
];

export default function ChipTypes() {
  const [expandedChip, setExpandedChip] = useState<string | null>('attack');

  return (
    <div className="space-y-6">
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-2xl text-orange-400">Tipos de Chips de Combate</CardTitle>
          <CardDescription>Clique em um chip para ver detalhes completos</CardDescription>
        </CardHeader>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        {chipTypesData.map((chip) => {
          const Icon = chip.icon;
          const isExpanded = expandedChip === chip.id;

          return (
            <Card
              key={chip.id}
              className="bg-card border-border cursor-pointer hover:border-orange-500 transition-all"
              onClick={() => setExpandedChip(isExpanded ? null : chip.id)}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Icon size={28} style={{ color: chip.color }} />
                    <div>
                      <CardTitle style={{ color: chip.color }}>{chip.name}</CardTitle>
                      <CardDescription className="text-xs mt-1">{chip.description}</CardDescription>
                    </div>
                  </div>
                  <ChevronDown
                    size={20}
                    style={{ color: chip.color }}
                    className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                  />
                </div>
              </CardHeader>

              {isExpanded && (
                <CardContent className="space-y-4 border-t border-border pt-4">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Boost Principal</h4>
                    <Badge className="text-lg px-3 py-1" style={{ backgroundColor: chip.color + '30', color: chip.color }}>
                      {chip.statBoost}
                    </Badge>
                  </div>

                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Beneficios</h4>
                    <ul className="space-y-2">
                      {chip.benefits.map((benefit, idx) => (
                        <li key={idx} className="text-sm text-muted-foreground flex items-center gap-2">
                          <span style={{ color: chip.color }} className="font-bold">✓</span>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Melhor Para</h4>
                    <div className="flex flex-wrap gap-2">
                      {chip.bestFor.map((troop, idx) => (
                        <Badge key={idx} className="bg-background text-foreground border border-border">
                          {troop}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="p-3 bg-background rounded border border-border border-l-4" style={{ borderLeftColor: chip.color }}>
                    <p className="text-xs text-muted-foreground">
                      Este chip eh especializado em {chip.description.toLowerCase()}. Use em combinacao com outros chips para maximizar efetividade.
                    </p>
                  </div>
                </CardContent>
              )}
            </Card>
          );
        })}
      </div>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-orange-400">Dicas de Combinacao</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="p-3 bg-background rounded border border-border">
            <h4 className="font-semibold text-foreground mb-1">Formacao Ofensiva</h4>
            <p className="text-sm text-muted-foreground">Attack + Interference para dano maximo com controle</p>
          </div>
          <div className="p-3 bg-background rounded border border-border">
            <h4 className="font-semibold text-foreground mb-1">Formacao Defensiva</h4>
            <p className="text-sm text-muted-foreground">Defense + Movement para resistencia e mobilidade</p>
          </div>
          <div className="p-3 bg-background rounded border border-border">
            <h4 className="font-semibold text-foreground mb-1">Formacao Balanceada</h4>
            <p className="text-sm text-muted-foreground">Todos os tipos combinados para versatilidade maxima</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
