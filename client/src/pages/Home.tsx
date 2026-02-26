'use client';

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LogOut, X, Star, Zap, Shield, Target, Sword } from "lucide-react";
import { getLoginUrl } from "@/const";
import { useState } from 'react';
import { useAuth } from '@/_core/hooks/useAuth';
import DroneChipLab from '@/components/DroneChipLab';
import SquadBuildingGuide from '@/components/SquadBuildingGuide';
import FormationSimulator from '@/components/FormationSimulator';
import SquadAnalyzer from '@/components/SquadAnalyzer';
import ProgressCalculator from '@/components/ProgressCalculator';
import AnalyzerSimulator from '@/components/AnalyzerSimulator';
import HeroAnalyzer from '@/components/HeroAnalyzer';
import HeroCard from '@/components/HeroCard';
import { getHeroImage } from '@/data/heroImages';
import { HEROES, HERO_TYPES } from '@shared/heroes';

export default function Home() {
  const { user, logout } = useAuth();
  const [activeMainTab, setActiveMainTab] = useState('chips');
  const [selectedHeroDetail, setSelectedHeroDetail] = useState<any>(null);

  const calculateMaxPower = (hero: any) => {
    let power = 0;
    
    // Poder base por raridade
    if (hero.rarity === 'UR') power = 100;
    else if (hero.rarity === 'SSR') power = 80;
    else if (hero.rarity === 'SR') power = 60;
    else power = 40;

    // Nível máximo (175)
    power += 175 * 2;

    // Máximo de estrelas (5)
    power += 5 * 5;

    // Equipamentos máximos (6 cada, 4 slots)
    power += (6 * 4) * 2.5;

    // Habilidades máximas (30 cada, 4 habilidades)
    power += (30 * 4) * 1.2;

    // Arma especial máxima (30)
    power += 20 + (30 * 3);

    return Math.round(power);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-900 to-background flex items-center justify-center">
        <Card className="w-full max-w-md bg-card border-border">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl text-orange-400 mb-2">LastWar</CardTitle>
            <CardDescription>Guia Completo para Iniciantes</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <h3 className="font-semibold text-foreground">O que você vai aprender:</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>✓ Produção e uso de Chips de Drone</li>
                <li>✓ Simulador de Esquadrão</li>
                <li>✓ Análise de Heróis</li>
                <li>✓ Dicas e Estratégias</li>
                <li>✓ Galeria de Builds Comunitária</li>
              </ul>
            </div>
            <Button 
              onClick={() => window.location.href = getLoginUrl()}
              className="w-full bg-orange-600 hover:bg-orange-700 text-white"
            >
              Fazer Login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* HEADER */}
      <header className="bg-gradient-to-r from-purple-900 to-purple-800 py-6 border-b border-border">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-white">LastWar</h1>
            <p className="text-orange-300 mt-1">Guia Completo para Iniciantes</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Bem-vindo,</p>
              <p className="font-semibold text-foreground">{user.name || 'Visitante'}</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => logout()}
              className="gap-2"
            >
              <LogOut size={16} />
              Sair
            </Button>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeMainTab} onValueChange={setActiveMainTab} className="w-full">
          {/* MAIN TABS */}
          <TabsList className="grid w-full grid-cols-3 bg-card border border-border mb-8">
            <TabsTrigger value="chips" className="text-base">
              🔧 Chip de Drone
            </TabsTrigger>
            <TabsTrigger value="squad" className="text-base">
              🎯 Esquadrão
            </TabsTrigger>
            <TabsTrigger value="heroes" className="text-base">
              ⚔️ Heróis
            </TabsTrigger>
          </TabsList>

          {/* CHIP DE DRONE TAB */}
          <TabsContent value="chips" className="space-y-6">
            <DroneChipLab />
          </TabsContent>

          {/* ESQUADRÃO TAB */}
          <TabsContent value="squad" className="space-y-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-orange-400">Esquadrão</CardTitle>
                <CardDescription>Aprenda a montar, simular e analisar seu esquadrão</CardDescription>
              </CardHeader>
            </Card>

            <Tabs defaultValue="guide" className="w-full">
              <TabsList className="grid w-full grid-cols-4 bg-card border border-border text-xs md:text-sm">
                <TabsTrigger value="guide">Guia</TabsTrigger>
                <TabsTrigger value="analyzer-simulator">Analisador + Simulador</TabsTrigger>
                <TabsTrigger value="progress">Progresso</TabsTrigger>
              </TabsList>

              <TabsContent value="guide" className="space-y-6 mt-6">
                <SquadBuildingGuide />
              </TabsContent>

              <TabsContent value="analyzer-simulator" className="space-y-6 mt-6">
                <AnalyzerSimulator />
              </TabsContent>

              <TabsContent value="progress" className="space-y-6 mt-6">
                <ProgressCalculator />
              </TabsContent>
            </Tabs>
          </TabsContent>

          {/* HERÓIS TAB */}
          <TabsContent value="heroes" className="space-y-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-orange-400">Heróis</CardTitle>
                <CardDescription>Conheça todos os heróis e analise seu progresso</CardDescription>
              </CardHeader>
            </Card>

            <Tabs defaultValue="list" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-card border border-border">
                <TabsTrigger value="list">Lista</TabsTrigger>
                <TabsTrigger value="analyzer">Analisador</TabsTrigger>
                <TabsTrigger value="tips">Dicas</TabsTrigger>
              </TabsList>

              {/* LISTA DE HERÓIS */}
              <TabsContent value="list" className="space-y-6 mt-6">
                {/* Filtro por Tipo */}
                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle className="text-lg text-orange-400">Heróis por Tipo</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {Object.entries(HERO_TYPES).map(([type, info]) => {
                      const heroesOfType = HEROES.filter(h => h.type === type as any);
                      
                      return (
                        <div key={type} className="space-y-3">
                          <div className="flex items-center gap-2">
                            <h3 className="text-lg font-semibold text-orange-400">{info.label}</h3>
                            <span className="text-sm text-muted-foreground">{info.advantage}</span>
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {heroesOfType.map((hero) => (
                              <div
                                key={hero.id}
                                onClick={() => setSelectedHeroDetail(hero)}
                                className="cursor-pointer"
                              >
                                <HeroCard hero={hero} />
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* ANALISADOR DE HERÓI */}
              <TabsContent value="analyzer" className="space-y-6 mt-6">
                <HeroAnalyzer />
              </TabsContent>

              {/* DICAS ÚTEIS */}
              <TabsContent value="tips" className="space-y-6 mt-6">
                <div className="space-y-4">
                  <Card className="bg-card border-border border-l-4" style={{ borderLeftColor: '#ff6f00' }}>
                    <CardHeader>
                      <CardTitle className="text-orange-400">Dicas Úteis para Heróis</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="p-4 bg-background rounded border border-border">
                        <h4 className="font-semibold text-foreground mb-2">1. Priorize Heróis UR</h4>
                        <p className="text-sm text-muted-foreground">Heróis UR são mais fortes e valem o investimento. Foque em Kimberly, Murphy e Stefmann primeiro.</p>
                      </div>
                      <div className="p-4 bg-background rounded border border-border">
                        <h4 className="font-semibold text-foreground mb-2">2. Balanceie Seus Heróis</h4>
                        <p className="text-sm text-muted-foreground">Tenha um mix de Tanques, Dano e Suporte. Não invista tudo em um único herói.</p>
                      </div>
                      <div className="p-4 bg-background rounded border border-border">
                        <h4 className="font-semibold text-foreground mb-2">3. Atualize Armas Regularmente</h4>
                        <p className="text-sm text-muted-foreground">Armas especiais aumentam significativamente o poder. Priorize evoluir para nível 30.</p>
                      </div>
                      <div className="p-4 bg-background rounded border border-border">
                        <h4 className="font-semibold text-foreground mb-2">4. Equipamentos são Essenciais</h4>
                        <p className="text-sm text-muted-foreground">Heróis de Dano: Priorize Canhão e Chip de Dados. Heróis de Defesa: Priorize Armadura e Radar.</p>
                      </div>
                      <div className="p-4 bg-background rounded border border-border">
                        <h4 className="font-semibold text-foreground mb-2">5. Máximo Potencial</h4>
                        <p className="text-sm text-muted-foreground">Nível 175, 5 Estrelas, Equipamentos Nível 6, Habilidades Nível 30, Arma Especial Nível 30.</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </TabsContent>
        </Tabs>
      </div>

      {/* MODAL DE DETALHES DO HERÓI */}
      {selectedHeroDetail && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl bg-card border-border border-l-4 border-l-orange-400 max-h-[90vh] overflow-y-auto">
            <CardHeader className="flex flex-row items-start justify-between space-y-0">
              <div className="flex-1">
                <CardTitle className="text-3xl text-orange-400">{selectedHeroDetail.name}</CardTitle>
                <CardDescription className="mt-2">{selectedHeroDetail.description}</CardDescription>
              </div>
              <button
                onClick={() => setSelectedHeroDetail(null)}
                className="p-2 hover:bg-background rounded transition-colors"
              >
                <X size={24} />
              </button>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Informações Básicas */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="p-3 bg-background rounded border border-border">
                  <p className="text-xs text-muted-foreground mb-1">Tipo</p>
                  <p className="font-semibold text-foreground">{selectedHeroDetail.type}</p>
                </div>
                <div className="p-3 bg-background rounded border border-border">
                  <p className="text-xs text-muted-foreground mb-1">Papel</p>
                  <p className="font-semibold text-foreground">{selectedHeroDetail.role}</p>
                </div>
                <div className="p-3 bg-background rounded border border-border">
                  <p className="text-xs text-muted-foreground mb-1">Raridade</p>
                  <Badge className="bg-orange-600">{selectedHeroDetail.rarity}</Badge>
                </div>
                <div className="p-3 bg-background rounded border border-border">
                  <p className="text-xs text-muted-foreground mb-1">Tier</p>
                  <p className="font-semibold text-yellow-400">{selectedHeroDetail.tier}</p>
                </div>
              </div>

              {/* Poder Máximo */}
              <div className="p-4 bg-gradient-to-r from-orange-900/20 to-yellow-900/20 rounded border border-orange-600/30">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Poder Máximo (Com Tudo Evoluído)</p>
                    <p className="text-3xl font-bold text-yellow-400">{calculateMaxPower(selectedHeroDetail)}</p>
                  </div>
                  <Zap className="text-yellow-400" size={48} />
                </div>
              </div>

              {/* Estatísticas Base */}
              <div>
                <h3 className="font-semibold text-orange-400 mb-3">Estatísticas Base</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="p-3 bg-background rounded border border-border">
                    <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                      <Sword size={14} /> ATK
                    </p>
                    <p className="font-bold text-red-400">{selectedHeroDetail.stats.atk}</p>
                  </div>
                  <div className="p-3 bg-background rounded border border-border">
                    <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                      <Shield size={14} /> DEF
                    </p>
                    <p className="font-bold text-blue-400">{selectedHeroDetail.stats.def}</p>
                  </div>
                  <div className="p-3 bg-background rounded border border-border">
                    <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                      <Star size={14} /> HP
                    </p>
                    <p className="font-bold text-green-400">{selectedHeroDetail.stats.hp}</p>
                  </div>
                  <div className="p-3 bg-background rounded border border-border">
                    <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                      <Zap size={14} /> SPD
                    </p>
                    <p className="font-bold text-purple-400">{selectedHeroDetail.stats.spd}</p>
                  </div>
                </div>
              </div>

              {/* Habilidades */}
              {selectedHeroDetail.abilities && selectedHeroDetail.abilities.length > 0 && (
                <div>
                  <h3 className="font-semibold text-orange-400 mb-3">Habilidades (4 Totais)</h3>
                  <div className="space-y-2">
                    {selectedHeroDetail.abilities.map((ability: any, idx: number) => (
                      <div key={ability.id} className="p-3 bg-background rounded border border-border">
                        <div className="flex items-start justify-between mb-1">
                          <p className="font-semibold text-foreground">{idx + 1}. {ability.name}</p>
                          <Badge className={
                            ability.type === 'Damage' ? 'bg-red-600' :
                            ability.type === 'Defense' ? 'bg-blue-600' :
                            ability.type === 'Support' ? 'bg-green-600' :
                            'bg-purple-600'
                          }>
                            {ability.type}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{ability.description}</p>
                        <p className="text-xs text-muted-foreground mt-1">Desbloqueada em: ⭐ {ability.unlocksAt}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Recomendações de Desenvolvimento */}
              <div>
                <h3 className="font-semibold text-orange-400 mb-3">Recomendações de Desenvolvimento</h3>
                <div className="space-y-2">
                  <div className="p-3 bg-background rounded border border-border">
                    <p className="text-sm text-foreground">
                      <strong>Nível Máximo:</strong> 175 (com QG 35)
                    </p>
                  </div>
                  <div className="p-3 bg-background rounded border border-border">
                    <p className="text-sm text-foreground">
                      <strong>Máximo de Estrelas:</strong> 5 ⭐
                    </p>
                  </div>
                  <div className="p-3 bg-background rounded border border-border">
                    <p className="text-sm text-foreground">
                      <strong>Equipamentos:</strong> 4 slots, Nível máximo 6
                    </p>
                    {selectedHeroDetail.role === 'Dano' && (
                      <p className="text-xs text-muted-foreground mt-1">→ Priorize: Canhão (Slot 1) e Chip de Dados (Slot 2)</p>
                    )}
                    {selectedHeroDetail.role === 'Defesa' && (
                      <p className="text-xs text-muted-foreground mt-1">→ Priorize: Armadura (Slot 3) e Radar (Slot 4)</p>
                    )}
                  </div>
                  <div className="p-3 bg-background rounded border border-border">
                    <p className="text-sm text-foreground">
                      <strong>Habilidades:</strong> 4 habilidades, Nível máximo 30 cada
                    </p>
                  </div>
                  <div className="p-3 bg-background rounded border border-border">
                    <p className="text-sm text-foreground">
                      <strong>Arma Especial:</strong> Nível máximo 30
                    </p>
                  </div>
                </div>
              </div>

              {/* Botão Fechar */}
              <Button
                onClick={() => setSelectedHeroDetail(null)}
                className="w-full bg-orange-600 hover:bg-orange-700"
              >
                Fechar
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
