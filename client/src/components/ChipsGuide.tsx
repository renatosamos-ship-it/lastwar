import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertCircle, Zap, Shield, Sword, Radio, Star, Coins, Target } from 'lucide-react';

const chipTypes = [
  {
    id: 'movement',
    name: 'Movement',
    icon: Radio,
    color: '#00d9ff',
    description: 'Aumenta a velocidade de ataque',
    bonus: '+25% Velocidade',
    benefit: 'Reduz tempo de recarga de habilidades',
    troopTypes: ['Aircraft', 'Missile'],
  },
  {
    id: 'attack',
    name: 'Attack',
    icon: Sword,
    color: '#ff6f00',
    description: 'Aumenta o ataque',
    bonus: '+30% Ataque',
    benefit: 'Amplifica dano de todas as habilidades',
    troopTypes: ['Missile', 'Aircraft'],
  },
  {
    id: 'interference',
    name: 'Interference',
    icon: Zap,
    color: '#9c27b0',
    description: 'Aumenta ataque e defesa',
    bonus: '+15% ATK, +10% DEF',
    benefit: 'Reduz efeitos negativos recebidos',
    troopTypes: ['Tank', 'Missile'],
  },
  {
    id: 'defense',
    name: 'Defense',
    icon: Shield,
    color: '#ffd700',
    description: 'Aumenta HP e defesa',
    bonus: '+35% HP, +40% DEF',
    benefit: 'Reduz dano recebido em combate',
    troopTypes: ['Tank'],
  },
];

const rarities = [
  {
    name: 'R',
    label: 'Comum',
    color: '#808080',
    stars: 1,
    description: 'Chips básicos com bônus moderados',
    dropRate: 'Muito Alto',
  },
  {
    name: 'SR',
    label: 'Raro',
    color: '#00d9ff',
    stars: 2,
    description: 'Chips com bônus significativos',
    dropRate: 'Alto',
  },
  {
    name: 'SSR',
    label: 'Épico',
    color: '#9c27b0',
    stars: 3,
    description: 'Chips poderosos com bônus elevados',
    dropRate: 'Médio',
  },
  {
    name: 'UR',
    label: 'Lendário',
    color: '#ffd700',
    stars: 4,
    description: 'Chips supremos com máximo poder',
    dropRate: 'Baixo',
  },
];

const productionCosts = [
  {
    rarity: 'SSR',
    material: 'Base Chip Material',
    quantity: 400,
    time: '4 horas',
    level: 'Chip Lab Nível 1+',
  },
  {
    rarity: 'UR',
    material: 'Premium Chip Material',
    quantity: 800,
    time: '8 horas',
    level: 'Chip Lab Nível 10+',
  },
];

const sources = [
  {
    name: 'Alliance Shop',
    frequency: 'Semanal',
    limit: 'Até 5 Rare Chests',
    reward: 'R, SR Chips',
    cost: 'Alliance Credits',
  },
  {
    name: 'Campaign Shop',
    frequency: 'Semanal',
    limit: '1 Epic Chest',
    reward: 'SR, SSR Chips',
    cost: 'Campaign Points',
  },
  {
    name: 'Alliance Duel',
    frequency: 'Contínuo',
    limit: 'Ilimitado',
    reward: 'SSR, UR Material',
    cost: 'Duel Points',
  },
  {
    name: 'Zombie Invasion',
    frequency: 'Evento',
    limit: 'Por evento',
    reward: 'Premium Material',
    cost: 'Participação',
  },
  {
    name: 'Ghost Ops',
    frequency: 'Evento',
    limit: 'Por evento',
    reward: 'Rare Material',
    cost: 'Operações',
  },
  {
    name: 'Chip Challenge',
    frequency: 'Diário',
    limit: '3x por dia',
    reward: 'R, SR Chips',
    cost: 'Energia',
  },
];

export default function ChipsGuide() {
  const [activeTab, setActiveTab] = useState('types');

  return (
    <div className="space-y-6">
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-2xl text-orange-400">Guia Completo de Chips</CardTitle>
          <CardDescription>Tipos, Raridades, Produção e Fontes de Obtenção</CardDescription>
        </CardHeader>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-card border border-border">
          <TabsTrigger value="types">Tipos</TabsTrigger>
          <TabsTrigger value="rarities">Raridades</TabsTrigger>
          <TabsTrigger value="production">Produção</TabsTrigger>
          <TabsTrigger value="sources">Obtenção</TabsTrigger>
        </TabsList>

        {/* TIPOS */}
        <TabsContent value="types" className="space-y-6 mt-6">
          <div className="grid md:grid-cols-2 gap-6">
            {chipTypes.map(chip => {
              const Icon = chip.icon;
              return (
                <Card key={chip.id} className="bg-card border-border border-l-4" style={{ borderLeftColor: chip.color }}>
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <Icon size={24} style={{ color: chip.color }} />
                      <CardTitle className="text-lg" style={{ color: chip.color }}>
                        {chip.name}
                      </CardTitle>
                    </div>
                    <CardDescription>{chip.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="p-3 bg-background rounded border border-border">
                      <p className="text-xs text-muted-foreground mb-1">BÔNUS</p>
                      <p className="font-bold text-foreground">{chip.bonus}</p>
                    </div>
                    <div className="p-3 bg-background rounded border border-border">
                      <p className="text-xs text-muted-foreground mb-1">EFEITO</p>
                      <p className="text-sm text-foreground">{chip.benefit}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-2">MELHOR PARA</p>
                      <div className="flex flex-wrap gap-1">
                        {chip.troopTypes.map(type => (
                          <Badge key={type} className="bg-background border border-border text-foreground text-xs">
                            {type}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        {/* RARIDADES */}
        <TabsContent value="rarities" className="space-y-6 mt-6">
          <div className="grid md:grid-cols-2 gap-6">
            {rarities.map((rarity, idx) => (
              <Card
                key={idx}
                className="bg-card border-border"
                style={{ borderColor: rarity.color }}
              >
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <CardTitle className="text-lg" style={{ color: rarity.color }}>
                      {rarity.name} - {rarity.label}
                    </CardTitle>
                    <div className="flex gap-0.5">
                      {Array.from({ length: rarity.stars }).map((_, i) => (
                        <Star key={i} size={16} fill={rarity.color} color={rarity.color} />
                      ))}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">DESCRIÇÃO</p>
                    <p className="text-sm text-foreground">{rarity.description}</p>
                  </div>
                  <div className="p-3 bg-background rounded border border-border">
                    <p className="text-xs text-muted-foreground mb-1">TAXA DE DROP</p>
                    <p className="font-semibold text-foreground">{rarity.dropRate}</p>
                  </div>
                  <div className="p-3 bg-background rounded border border-border">
                    <p className="text-xs text-muted-foreground mb-1">PODER RELATIVO</p>
                    <div className="w-full bg-background rounded h-2 border border-border">
                      <div
                        className="h-full rounded"
                        style={{
                          width: `${rarity.stars * 25}%`,
                          backgroundColor: rarity.color,
                        }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* PRODUÇÃO */}
        <TabsContent value="production" className="space-y-6 mt-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-orange-400">Custos de Produção</CardTitle>
              <CardDescription>Requisitos para produzir chips no Chip Lab</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {productionCosts.map((cost, idx) => (
                  <div key={idx} className="p-4 bg-background rounded border border-border">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-bold text-lg text-foreground">{cost.rarity} Chips</h3>
                      <Badge className="bg-orange-600 text-white">{cost.time}</Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">MATERIAL</p>
                        <p className="font-semibold text-foreground">{cost.material}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">QUANTIDADE</p>
                        <p className="font-semibold text-yellow-400 text-lg">{cost.quantity}</p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-xs text-muted-foreground mb-1">REQUISITO</p>
                        <p className="text-sm text-foreground">{cost.level}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border border-l-4" style={{ borderLeftColor: '#ff6f00' }}>
            <CardHeader>
              <CardTitle className="text-orange-400">Dica de Otimização</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-foreground">
                Priorize aumentar o nível do Chip Lab para desbloquear produção de chips UR. Cada nível aumenta a velocidade de produção e reduz custos.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* OBTENÇÃO */}
        <TabsContent value="sources" className="space-y-6 mt-6">
          <div className="grid gap-4">
            {sources.map((source, idx) => (
              <Card key={idx} className="bg-card border-border">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg text-orange-400">{source.name}</CardTitle>
                    <Badge className="bg-purple-600 text-white">{source.frequency}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">LIMITE</p>
                      <p className="text-sm font-semibold text-foreground">{source.limit}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">RECOMPENSA</p>
                      <p className="text-sm font-semibold text-yellow-400">{source.reward}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">CUSTO</p>
                      <p className="text-sm font-semibold text-foreground">{source.cost}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">EFICIÊNCIA</p>
                      <p className="text-sm font-semibold text-green-400">★★★★★</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="bg-background border-border border-l-4" style={{ borderLeftColor: '#ffd700' }}>
            <CardHeader>
              <CardTitle className="text-yellow-400">Estratégia de Coleta Semanal</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm text-foreground">
                <strong>Segunda a Sexta:</strong> Participe de Alliance Duel para acumular pontos
              </p>
              <p className="text-sm text-foreground">
                <strong>Fim de Semana:</strong> Resgate chips da Alliance Shop e Campaign Shop
              </p>
              <p className="text-sm text-foreground">
                <strong>Durante Eventos:</strong> Priorize Zombie Invasion para material premium
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
