import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { AlertCircle, Zap, Shield, Sword, Radio, TrendingUp, Lightbulb, Loader2 } from 'lucide-react';
import { trpc } from '@/lib/trpc';

export default function DroneChipLab() {
  const [expandedChip, setExpandedChip] = useState<string | null>(null);
  const [selectedChipForAnalysis, setSelectedChipForAnalysis] = useState<any>(null);
  // const analyzeChipMutation = trpc.squad.analyzeChip.useMutation(); // Not implemented yet

  const chipTypes = [
    {
      id: 'attack',
      name: 'Attack Chips',
      icon: Sword,
      color: '#ff6f00',
      description: 'Aumentam o dano de combate',
      effect: 'Amplifica dano de todas as habilidades',
      bestFor: 'Tropas ofensivas (Foguetes, Aviões)',
      bonus: '+30% Ataque',
    },
    {
      id: 'defense',
      name: 'Defense Chips',
      icon: Shield,
      color: '#ffd700',
      description: 'Aumentam resistência e sobrevivência',
      effect: 'Reduz dano recebido pela tropa',
      bestFor: 'Tropas defensivas (Tanques)',
      bonus: '+40% Defesa, +35% HP',
    },
    {
      id: 'movement',
      name: 'Movement Chips',
      icon: Radio,
      color: '#00d9ff',
      description: 'Aumentam velocidade e mobilidade',
      effect: 'Reduz tempo de recarga de habilidades',
      bestFor: 'Todas as tropas (velocidade)',
      bonus: '+25% Velocidade',
    },
    {
      id: 'interference',
      name: 'Fault Chips (Interferência)',
      icon: Zap,
      color: '#9c27b0',
      description: 'Enfraquecem efeitos inimigos',
      effect: 'Reduz buffs do inimigo e efeitos negativos',
      bestFor: 'Defesa contra status negativo',
      bonus: '+15% Ataque, +10% Defesa',
    },
  ];

  const rarities = [
    { name: 'R', label: 'Uncommon', color: '#808080', stars: 1 },
    { name: 'SR', label: 'Rare', color: '#00d9ff', stars: 2 },
    { name: 'SSR', label: 'Epic', color: '#9c27b0', stars: 3 },
    { name: 'UR', label: 'Legendary', color: '#ffd700', stars: 4 },
  ];
  const handleAnalyzeChip = (chipType: string, rarity: string) => {
    setSelectedChipForAnalysis({ chipType, rarity, loading: false });
    // Analysis feature not yet implemented
    console.log('Analyzing chip:', chipType, rarity);
  };

  return (
    <div className="space-y-6">
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-orange-400">Chip Lab: Produção e Uso de Chips</CardTitle>
          <CardDescription>Guia Completo sobre Chips de Habilidade do Drone Tático</CardDescription>
        </CardHeader>
      </Card>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-5 bg-card border border-border">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="types">Tipos</TabsTrigger>
          <TabsTrigger value="rarities">Raridades</TabsTrigger>
          <TabsTrigger value="production">Produção</TabsTrigger>
          <TabsTrigger value="equip">Equipar</TabsTrigger>
        </TabsList>

        {/* VISÃO GERAL */}
        <TabsContent value="overview" className="space-y-6 mt-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-orange-400">O que é o Chip Lab?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-foreground leading-relaxed">
                O Chip Lab é uma das áreas mais importantes para fortalecer permanentemente seus drones no Last War Survival. Aqui você pode produzir e melhorar chips especiais de habilidade que fornecem bônus significativos em combate.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <Card className="bg-background border-border">
                  <CardHeader>
                    <CardTitle className="text-lg text-yellow-400">📍 Localização</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">Desbloqueado no dia 80 do jogo (Introductory Game)</p>
                  </CardContent>
                </Card>
                <Card className="bg-background border-border">
                  <CardHeader>
                    <CardTitle className="text-lg text-yellow-400">⬆️ Nível Máximo</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">Nível 20 (desbloqueia todos os chips UR)</p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-cyan-400">Níveis de Progresso de Combate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { troop: 'Tropa 1', level: 10, slots: 1 },
                  { troop: 'Tropa 2', level: 150, slots: 2 },
                  { troop: 'Tropa 3', level: 300, slots: 3 },
                  { troop: 'Tropa 4', level: 450, slots: 4 },
                  { troop: 'Tropa 5', level: 600, slots: 5 },
                ].map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center p-3 bg-background rounded border border-border">
                    <span className="font-semibold text-foreground">{item.troop}</span>
                    <div className="flex gap-3">
                      <Badge className="bg-purple-600 text-white">Level {item.level}</Badge>
                      <Badge className="bg-cyan-600 text-white">{item.slots} Slot{item.slots > 1 ? 's' : ''}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* TIPOS DE CHIPS */}
        <TabsContent value="types" className="space-y-6 mt-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-orange-400">Tipos de Chips de Habilidade</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {chipTypes.map((chip) => {
                  const Icon = chip.icon;
                  const isExpanded = expandedChip === chip.id;

                  return (
                    <div
                      key={chip.id}
                      className="p-4 bg-background rounded border border-border cursor-pointer hover:border-orange-400 transition"
                      onClick={() => setExpandedChip(isExpanded ? null : chip.id)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex gap-3 flex-1">
                          <Icon size={24} style={{ color: chip.color }} className="mt-1" />
                          <div>
                            <h4 className="font-bold text-lg text-foreground">{chip.name}</h4>
                            <p className="text-sm text-muted-foreground">{chip.description}</p>
                          </div>
                        </div>
                        <Badge style={{ backgroundColor: chip.color }} className="text-white whitespace-nowrap">
                          {chip.bonus}
                        </Badge>
                      </div>

                      {isExpanded && (
                        <div className="mt-4 pt-4 border-t border-border space-y-3">
                          <div>
                            <p className="text-sm font-semibold text-cyan-400">Efeito:</p>
                            <p className="text-sm text-foreground">{chip.effect}</p>
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-green-400">Melhor Para:</p>
                            <p className="text-sm text-foreground">{chip.bestFor}</p>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            {rarities.map((rarity) => (
                              <Button
                                key={rarity.name}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleAnalyzeChip(chip.name, rarity.name);
                                }}
                                variant="outline"
                                size="sm"
                                disabled={false}
                                className="text-xs"
                              >
                                {false ? (
                                  <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                                ) : null}
                                Analisar {rarity.name}
                              </Button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {selectedChipForAnalysis && !selectedChipForAnalysis.loading && (
            <Card className="bg-card border-border border-l-4" style={{ borderLeftColor: '#ff6f00' }}>
              <CardHeader>
                <CardTitle className="text-orange-400">{selectedChipForAnalysis.chipName}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-semibold text-cyan-400 mb-2">Descrição:</p>
                  <p className="text-sm text-foreground">{selectedChipForAnalysis.description}</p>
                </div>
                {selectedChipForAnalysis.benefits && selectedChipForAnalysis.benefits.length > 0 && (
                  <div>
                    <p className="text-sm font-semibold text-green-400 mb-2">Benefícios:</p>
                    <ul className="space-y-1">
                      {selectedChipForAnalysis.benefits.map((benefit: string, idx: number) => (
                        <li key={idx} className="text-sm text-foreground">✓ {benefit}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {selectedChipForAnalysis.synergies && selectedChipForAnalysis.synergies.length > 0 && (
                  <div>
                    <p className="text-sm font-semibold text-purple-400 mb-2">Sinergias:</p>
                    <ul className="space-y-1">
                      {selectedChipForAnalysis.synergies.map((synergy: string, idx: number) => (
                        <li key={idx} className="text-sm text-foreground">⚡ {synergy}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* RARIDADES */}
        <TabsContent value="rarities" className="space-y-6 mt-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-orange-400">Níveis de Raridade</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {rarities.map((rarity, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded border-2"
                    style={{
                      borderColor: rarity.color,
                      backgroundColor: rarity.color + '10',
                    }}
                  >
                    <h4 className="font-bold text-lg" style={{ color: rarity.color }}>
                      {rarity.name} - {rarity.label}
                    </h4>
                    <p className="text-sm text-muted-foreground mt-2">
                      {'⭐'.repeat(rarity.stars)} Raridade {rarity.stars}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* PRODUÇÃO */}
        <TabsContent value="production" className="space-y-6 mt-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-orange-400">Custos de Produção</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 bg-background rounded border border-border">
                  <span className="font-semibold">SSR Chips</span>
                  <p className="text-sm text-yellow-400">400 Base Chip Material</p>
                  <p className="text-xs text-muted-foreground mt-1">Tempo: ~8 horas</p>
                </div>
                <div className="p-3 bg-background rounded border border-border">
                  <span className="font-semibold">UR Chips</span>
                  <p className="text-sm text-yellow-400">800 Premium Chip Material</p>
                  <p className="text-xs text-muted-foreground mt-1">Tempo: ~16 horas</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* EQUIPAR DRONE TÁTICO */}
        <TabsContent value="equip" className="space-y-6 mt-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-cyan-400">Como Equipar no Drone Tático</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="p-4 bg-background rounded border border-border">
                  <h4 className="font-semibold text-foreground mb-2">1️⃣ Acesse o Drone Center</h4>
                  <p className="text-sm text-muted-foreground">Abra o menu principal e procure por "Drone Center" ou "Centro de Drones"</p>
                </div>
                <div className="p-4 bg-background rounded border border-border">
                  <h4 className="font-semibold text-foreground mb-2">2️⃣ Selecione o Drone Tático</h4>
                  <p className="text-sm text-muted-foreground">Escolha o drone que deseja equipar chips. Cada drone tem slots específicos.</p>
                </div>
                <div className="p-4 bg-background rounded border border-border">
                  <h4 className="font-semibold text-foreground mb-2">3️⃣ Clique em "Equipar Chips"</h4>
                  <p className="text-sm text-muted-foreground">Selecione os chips que deseja instalar nos slots disponíveis</p>
                </div>
                <div className="p-4 bg-background rounded border border-border">
                  <h4 className="font-semibold text-foreground mb-2">4️⃣ Confirme a Equipação</h4>
                  <p className="text-sm text-muted-foreground">Revise os bônus totais e confirme para aplicar os chips</p>
                </div>
              </div>

              <Card className="bg-background border-border border-l-4" style={{ borderLeftColor: '#00d9ff' }}>
                <CardHeader>
                  <CardTitle className="text-cyan-400 text-base">💡 Dica Importante</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-foreground">
                    Cada drone pode ter múltiplos slots de chips. Quanto maior o nível do Chip Lab, mais slots você desbloqueia. Combine chips de tipos diferentes para maximizar os bônus!
                  </p>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
