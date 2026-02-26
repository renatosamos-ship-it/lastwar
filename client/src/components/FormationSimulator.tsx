import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Trash2, Heart, Star, Zap, Shield } from 'lucide-react';
import { heroes, Hero } from '@/data/heroes';
import { squadTypes } from '@/data/squadTypes';

const getRarityColor = (rarity: string) => {
  switch (rarity) {
    case 'UR':
      return 'bg-yellow-600 text-white';
    case 'SSR':
      return 'bg-purple-600 text-white';
    case 'SR':
      return 'bg-cyan-600 text-white';
    case 'R':
      return 'bg-gray-600 text-white';
    default:
      return 'bg-gray-600 text-white';
  }
};

const getTypeColor = (type: string) => {
  switch (type) {
    case 'Tank':
      return 'text-green-400';
    case 'DPS':
      return 'text-red-400';
    case 'Support':
      return 'text-blue-400';
    case 'Balanced':
      return 'text-yellow-400';
    default:
      return 'text-gray-400';
  }
};

// Sinergias entre heróis
const heroSynergies: { [key: string]: { hero: string; bonus: string; effect: string }[] } = {
  'Kimberly': [
    { hero: 'DVA', bonus: '+15% ATK', effect: 'Ambas são atacantes fortes' },
    { hero: 'Williams', bonus: '+10% DEF', effect: 'Defesa em equipe' },
  ],
  'DVA': [
    { hero: 'Kimberly', bonus: '+15% ATK', effect: 'Duplo ataque devastador' },
    { hero: 'Tesla', bonus: '+12% DMG', effect: 'Dano acumulativo' },
  ],
  'Tesla': [
    { hero: 'DVA', bonus: '+12% DMG', effect: 'Dano de energia combinado' },
    { hero: 'Fiona', bonus: '+10% ATK', effect: 'Ataque em área' },
  ],
  'Williams': [
    { hero: 'Kimberly', bonus: '+10% DEF', effect: 'Defesa potencializada' },
    { hero: 'Murphy', bonus: '+15% HP', effect: 'Tanques fortes' },
  ],
  'Murphy': [
    { hero: 'Williams', bonus: '+15% HP', effect: 'Dupla defensiva' },
    { hero: 'Schuyler', bonus: '+8% SPD', effect: 'Velocidade de reação' },
  ],
};

export default function FormationSimulator() {
  const [squadTypeMode, setSquadTypeMode] = useState<string | null>(null);
  const [selectedHeroes, setSelectedHeroes] = useState<Hero[]>([]);
  const [analysis, setAnalysis] = useState<any>(null);
  const [favorites, setFavorites] = useState<Hero[]>([]);

  const addHero = (hero: Hero) => {
    if (selectedHeroes.length < 5) {
      const updated = [...selectedHeroes, hero];
      setSelectedHeroes(updated);
      analyzeFormation(updated);
    }
  };

  const removeHero = (index: number) => {
    const updated = selectedHeroes.filter((_, i) => i !== index);
    setSelectedHeroes(updated);
    if (updated.length > 0) {
      analyzeFormation(updated);
    } else {
      setAnalysis(null);
    }
  };

  const toggleFavorite = (hero: Hero) => {
    if (favorites.find(f => f.name === hero.name)) {
      setFavorites(favorites.filter(f => f.name !== hero.name));
    } else {
      setFavorites([...favorites, hero]);
    }
  };

  const analyzeFormation = (squad: Hero[]) => {
    const totalHP = squad.reduce((sum, h) => sum + h.baseStats.hp, 0);
    const totalATK = squad.reduce((sum, h) => sum + h.baseStats.attack, 0);
    const totalDEF = squad.reduce((sum, h) => sum + h.baseStats.defense, 0);
    const totalSPD = squad.reduce((sum, h) => sum + h.baseStats.speed, 0);

    const tankCount = squad.filter(h => h.type === 'Tank').length;
    const aircraftCount = squad.filter(h => h.type === 'Aircraft').length;
    const missileCount = squad.filter(h => h.type === 'Missile').length;
    const supportCount = squad.filter(h => h.type === 'Support').length;

    let squadType = 'Balanceado';
    if (tankCount >= 2) squadType = 'Defensivo';
    if (aircraftCount >= 2 || missileCount >= 2) squadType = 'Ofensivo';

    const powerScore = Math.min(100, Math.round((totalATK + totalDEF) / 10));

    // Calcular sinergias
    let synergyBonus = 0;
    const activeSynergies = [];
    for (let i = 0; i < squad.length; i++) {
      for (let j = i + 1; j < squad.length; j++) {
        const hero1 = squad[i];
        const hero2 = squad[j];
        const synergies = heroSynergies[hero1.name] || [];
        const synergy = synergies.find(s => s.hero === hero2.name);
        if (synergy) {
          activeSynergies.push(`${hero1.name} + ${hero2.name}: ${synergy.bonus}`);
          synergyBonus += 5;
        }
      }
    }

    const strengths = [];
    const weaknesses = [];
    const recommendations = [];

    if (tankCount >= 2) {
      strengths.push('Defesa forte - Resistência elevada em combate');
    } else if (tankCount === 0) {
      weaknesses.push('Sem tanques - Falta de linha de frente defensiva');
      recommendations.push('Adicione um herói tanque como Williams ou Murphy');
    }

    if (aircraftCount >= 2 || missileCount >= 2) {
      strengths.push('Dano alto - Potencial ofensivo significativo');
    } else if (aircraftCount === 0 && missileCount === 0) {
      weaknesses.push('Dano baixo - Falta de poder ofensivo');
      recommendations.push('Adicione um herói Aircraft ou Missile como DVA ou Tesla');
    }

    if (supportCount >= 1) {
      strengths.push('Suporte ativo - Bônus e proteção em combate');
    }

    if (totalSPD < 100) {
      weaknesses.push('Velocidade baixa - Reação lenta em combate');
      recommendations.push('Considere adicionar heróis com velocidade maior');
    }

    if (activeSynergies.length > 0) {
      strengths.push(`Sinergias ativas (${activeSynergies.length}) - Bônus combinados`);
    }

    setAnalysis({
      totalHP,
      totalATK,
      totalDEF,
      totalSPD,
      squadType,
      powerScore: Math.min(100, powerScore + synergyBonus),
      strengths,
      weaknesses,
      recommendations,
      activeSynergies,
      composition: {
        tanks: tankCount,
        aircraft: aircraftCount,
        missile: missileCount,
        support: supportCount,
      },
    });
  };

  const getRecommendedHeroes = () => {
    if (!squadTypeMode) return [];
    const recommendation = squadTypes[squadTypeMode as keyof typeof squadTypes];
    if (!recommendation) return [];
    return heroes.filter(h => recommendation.recommendedHeroes.some(name => name.toLowerCase() === h.name.toLowerCase()));
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="build" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-card border border-border">
          <TabsTrigger value="build">Construtor</TabsTrigger>
          <TabsTrigger value="analysis">Análise</TabsTrigger>
          <TabsTrigger value="favorites">⭐ Favoritos</TabsTrigger>
        </TabsList>

        {/* CONSTRUTOR */}
        <TabsContent value="build" className="space-y-6 mt-6">
          {/* Seletor de Tipo */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-orange-400">Selecione o Tipo de Esquadrão</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {Object.entries(squadTypes).map(([id, type]) => (
                  <Button
                    key={id}
                    onClick={() => setSquadTypeMode(id)}
                    variant={squadTypeMode === id ? 'default' : 'outline'}
                    className="flex flex-col items-center gap-2 h-auto py-4"
                  >
                    <span className="text-2xl">{id === 'aerial' ? '✈️' : id === 'tank' ? '🛡️' : id === 'missile' ? '🚀' : '⚔️'}</span>
                    <span className="text-xs font-semibold">{type.name}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Heróis Recomendados */}
          {squadTypeMode && (
            <Card className="bg-card border-border border-l-4" style={{ borderLeftColor: '#ff6f00' }}>
              <CardHeader>
                <CardTitle className="text-orange-400">Heróis Recomendados para {squadTypeMode}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {getRecommendedHeroes().map((hero) => (
                    <Button
                      key={hero.name}
                      onClick={() => addHero(hero)}
                      disabled={selectedHeroes.length >= 5 || !!selectedHeroes.find(h => h.name === hero.name)}
                      variant="outline"
                      className="flex flex-col items-center gap-2 h-auto py-3 text-xs"
                    >
                      <span className="font-semibold">{hero.name}</span>
                      <Badge className={getRarityColor(hero.rarity)}>{hero.rarity}</Badge>
                      <span className={`text-xs ${getTypeColor(hero.type)}`}>{hero.type}</span>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Esquadrão Selecionado */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-cyan-400">Seu Esquadrão ({selectedHeroes.length}/5)</CardTitle>
            </CardHeader>
            <CardContent>
              {selectedHeroes.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">Selecione heróis para montar seu esquadrão</p>
              ) : (
                <div className="space-y-3">
                  {selectedHeroes.map((hero, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-background rounded border border-border">
                      <div className="flex-1">
                        <p className="font-semibold text-foreground">{hero.name}</p>
                        <div className="flex gap-2 mt-1">
                          <Badge className={getRarityColor(hero.rarity)}>{hero.rarity}</Badge>
                          <Badge variant="outline" className={getTypeColor(hero.type)}>{hero.type}</Badge>
                        </div>
                      </div>
                      <Button
                        onClick={() => removeHero(idx)}
                        variant="ghost"
                        size="sm"
                        className="text-red-400 hover:text-red-500"
                      >
                        <Trash2 size={18} />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* ANÁLISE */}
        <TabsContent value="analysis" className="space-y-6 mt-6">
          {analysis ? (
            <>
              {/* Resumo */}
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-orange-400">Análise do Esquadrão</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="p-3 bg-background rounded border border-border text-center">
                      <p className="text-xs text-muted-foreground">Poder Total</p>
                      <p className="text-2xl font-bold text-orange-400">{analysis.powerScore}</p>
                    </div>
                    <div className="p-3 bg-background rounded border border-border text-center">
                      <p className="text-xs text-muted-foreground">Tipo</p>
                      <p className="text-lg font-bold text-cyan-400">{analysis.squadType}</p>
                    </div>
                    <div className="p-3 bg-background rounded border border-border text-center">
                      <p className="text-xs text-muted-foreground">Composição</p>
                      <p className="text-sm font-semibold text-foreground">
                        T:{analysis.composition.tanks} D:{analysis.composition.dps} S:{analysis.composition.support}
                      </p>
                    </div>
                    <div className="p-3 bg-background rounded border border-border text-center">
                      <p className="text-xs text-muted-foreground">Sinergias</p>
                      <p className="text-2xl font-bold text-purple-400">{analysis.activeSynergies.length}</p>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-red-400">❤️ HP Total</span>
                        <span className="font-semibold">{analysis.totalHP}</span>
                      </div>
                      <div className="w-full bg-background rounded h-2 border border-border">
                        <div
                          className="bg-red-500 h-full rounded"
                          style={{ width: `${Math.min(100, (analysis.totalHP / 1000) * 100)}%` }}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-yellow-400">⚔️ ATK Total</span>
                        <span className="font-semibold">{analysis.totalATK}</span>
                      </div>
                      <div className="w-full bg-background rounded h-2 border border-border">
                        <div
                          className="bg-yellow-500 h-full rounded"
                          style={{ width: `${Math.min(100, (analysis.totalATK / 500) * 100)}%` }}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-green-400">🛡️ DEF Total</span>
                        <span className="font-semibold">{analysis.totalDEF}</span>
                      </div>
                      <div className="w-full bg-background rounded h-2 border border-border">
                        <div
                          className="bg-green-500 h-full rounded"
                          style={{ width: `${Math.min(100, (analysis.totalDEF / 500) * 100)}%` }}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-cyan-400">💨 SPD Total</span>
                        <span className="font-semibold">{analysis.totalSPD}</span>
                      </div>
                      <div className="w-full bg-background rounded h-2 border border-border">
                        <div
                          className="bg-cyan-500 h-full rounded"
                          style={{ width: `${Math.min(100, (analysis.totalSPD / 300) * 100)}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Sinergias Ativas */}
              {analysis.activeSynergies.length > 0 && (
                <Card className="bg-card border-border border-l-4" style={{ borderLeftColor: '#9c27b0' }}>
                  <CardHeader>
                    <CardTitle className="text-purple-400">⚡ Sinergias Ativas</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {analysis.activeSynergies.map((synergy: string, idx: number) => (
                        <div key={idx} className="p-2 bg-background rounded border border-border text-sm">
                          {synergy}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Pontos Fortes */}
              {analysis.strengths.length > 0 && (
                <Card className="bg-card border-border border-l-4" style={{ borderLeftColor: '#00d9ff' }}>
                  <CardHeader>
                    <CardTitle className="text-cyan-400">✅ Pontos Fortes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {analysis.strengths.map((strength: string, idx: number) => (
                        <li key={idx} className="text-sm text-foreground flex gap-2">
                          <span className="text-green-400">✓</span> {strength}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {/* Pontos Fracos */}
              {analysis.weaknesses.length > 0 && (
                <Card className="bg-card border-border border-l-4" style={{ borderLeftColor: '#ff6f00' }}>
                  <CardHeader>
                    <CardTitle className="text-orange-400">⚠️ Pontos Fracos</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {analysis.weaknesses.map((weakness: string, idx: number) => (
                        <li key={idx} className="text-sm text-foreground flex gap-2">
                          <span className="text-red-400">✗</span> {weakness}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {/* Recomendações */}
              {analysis.recommendations.length > 0 && (
                <Card className="bg-card border-border border-l-4" style={{ borderLeftColor: '#ffd700' }}>
                  <CardHeader>
                    <CardTitle className="text-yellow-400">💡 Recomendações</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {analysis.recommendations.map((rec: string, idx: number) => (
                        <li key={idx} className="text-sm text-foreground flex gap-2">
                          <span className="text-yellow-400">→</span> {rec}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}
            </>
          ) : (
            <Card className="bg-card border-border">
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">Selecione heróis para ver a análise do esquadrão</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* FAVORITOS */}
        <TabsContent value="favorites" className="space-y-6 mt-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-yellow-400">⭐ Heróis Favoritos ({favorites.length})</CardTitle>
            </CardHeader>
            <CardContent>
              {favorites.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">Nenhum herói favoritado ainda</p>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {favorites.map((hero) => (
                    <Card key={hero.name} className="bg-background border-border">
                      <CardContent className="pt-4">
                        <p className="font-semibold text-foreground text-sm">{hero.name}</p>
                        <Badge className={`${getRarityColor(hero.rarity)} text-xs mt-2`}>{hero.rarity}</Badge>
                        <p className={`text-xs mt-2 ${getTypeColor(hero.type)}`}>{hero.type}</p>
                        <Button
                          onClick={() => toggleFavorite(hero)}
                          variant="ghost"
                          size="sm"
                          className="w-full mt-2 text-yellow-400"
                        >
                          <Star size={16} className="mr-1 fill-yellow-400" /> Remover
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
