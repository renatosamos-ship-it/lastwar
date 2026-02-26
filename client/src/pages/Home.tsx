import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LogOut } from "lucide-react";
import { getLoginUrl } from "@/const";
import { useState } from 'react';
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

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-900 to-background flex items-center justify-center">
        <Card className="w-full max-w-md bg-card border-border">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl text-orange-400 mb-2">Chips de Combate LastWar</CardTitle>
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
            <h1 className="text-4xl font-bold text-white">Chips de Combate LastWar</h1>
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
                              <HeroCard key={hero.id} hero={hero} />
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
                        <p className="text-sm text-muted-foreground">Heróis UR são mais fortes e valem o investimento. Foque em Kim, Murphy e Stetmann primeiro.</p>
                      </div>
                      <div className="p-4 bg-background rounded border border-border">
                        <h4 className="font-semibold text-foreground mb-2">2. Balanceie Seus Heróis</h4>
                        <p className="text-sm text-muted-foreground">Tenha um mix de Tanques, Dano e Suporte. Não invista tudo em um único herói.</p>
                      </div>
                      <div className="p-4 bg-background rounded border border-border">
                        <h4 className="font-semibold text-foreground mb-2">3. Atualize Armas Regularmente</h4>
                        <p className="text-sm text-muted-foreground">Armas SSR e UR fazem diferença significativa. Priorize atualizar armas de seus heróis principais.</p>
                      </div>
                      <div className="p-4 bg-background rounded border border-border">
                        <h4 className="font-semibold text-foreground mb-2">4. Treine Habilidades</h4>
                        <p className="text-sm text-muted-foreground">Não esqueça de treinar as habilidades especiais dos heróis. Elas aumentam muito o poder de combate.</p>
                      </div>
                      <div className="p-4 bg-background rounded border border-border">
                        <h4 className="font-semibold text-foreground mb-2">5. Use Chips Apropriados</h4>
                        <p className="text-sm text-muted-foreground">Aplique chips de drone que complementam o tipo de herói. Tanques precisam de Defense Chips.</p>
                      </div>
                      <div className="p-4 bg-background rounded border border-border">
                        <h4 className="font-semibold text-foreground mb-2">6. Participe de Eventos</h4>
                        <p className="text-sm text-muted-foreground">Eventos como Zombie Invasion e Alliance Duel oferecem recompensas valiosas para heróis.</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
