import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertCircle, CheckCircle, TrendingUp, Target, Zap, Plus, Trash2, Shield, Sword } from 'lucide-react';
import { HEROES, Hero, SquadPosition } from '@shared/heroes';
import { getHeroImage } from '@/data/heroImages';
import HeroCard from '@/components/HeroCard';

interface SquadMember extends Hero {
  squadPosition: SquadPosition;
}

export default function AnalyzerSimulator() {
  const [selectedHeroes, setSelectedHeroes] = useState<SquadMember[]>([]);
  const [squadName, setSquadName] = useState('Meu Esquadrão');
  const [heroToPlace, setHeroToPlace] = useState<Hero | null>(null);

  const frontRowCount = selectedHeroes.filter(h => h.squadPosition === 'Front Row').length;
  const backRowCount = selectedHeroes.filter(h => h.squadPosition === 'Back Row').length;
  const canAddFrontRow = frontRowCount < 2;
  const canAddBackRow = backRowCount < 3;

  const addHeroWithPosition = (hero: Hero, position: SquadPosition) => {
    if (selectedHeroes.length < 5) {
      setSelectedHeroes([
        ...selectedHeroes,
        {
          ...hero,
          squadPosition: position,
        },
      ]);
      setHeroToPlace(null);
    }
  };

  const removeHeroFromSquad = (index: number) => {
    setSelectedHeroes(selectedHeroes.filter((_, i) => i !== index));
  };

  const getSquadAnalysis = () => {
    if (selectedHeroes.length === 0) return null;

    const typeCount = {
      Tanque: selectedHeroes.filter(h => h.type === 'Tanque').length,
      Aeronave: selectedHeroes.filter(h => h.type === 'Aeronave').length,
      Míssil: selectedHeroes.filter(h => h.type === 'Míssil').length,
    };

    const roleCount = {
      Defesa: selectedHeroes.filter(h => h.role === 'Defesa').length,
      Dano: selectedHeroes.filter(h => h.role === 'Dano').length,
      Suporte: selectedHeroes.filter(h => h.role === 'Suporte').length,
    };

    const rarityCount = {
      UR: selectedHeroes.filter(h => h.rarity === 'UR').length,
      SSR: selectedHeroes.filter(h => h.rarity === 'SSR').length,
      SR: selectedHeroes.filter(h => h.rarity === 'SR').length,
    };

    const strengths = [];
    const weaknesses = [];
    const recommendations = [];

    // Análise de tipos
    if (typeCount.Tanque > 0 && typeCount.Aeronave > 0 && typeCount.Míssil > 0) {
      strengths.push('✓ Composição balanceada com todos os tipos');
    } else {
      if (typeCount.Tanque === 0) weaknesses.push('✕ Faltam heróis Tanque para defesa');
      if (typeCount.Aeronave === 0) weaknesses.push('✕ Faltam heróis Aeronave para atacar Tanques');
      if (typeCount.Míssil === 0) weaknesses.push('✕ Faltam heróis Míssil para atacar Aeronaves');
    }

    // Análise de papéis
    if (roleCount.Defesa > 0) strengths.push('✓ Tem defesa para absorver dano');
    if (roleCount.Dano > 1) strengths.push('✓ Bom poder de fogo com múltiplos DPS');
    if (roleCount.Suporte > 0) strengths.push('✓ Tem suporte para amplificar heróis');

    if (roleCount.Suporte === 0) weaknesses.push('✕ Sem suporte - considere adicionar');
    if (roleCount.Dano === 0) weaknesses.push('✕ Sem dano - esquadrão muito defensivo');

    // Análise de raridade
    if (rarityCount.UR > 0) strengths.push(`✓ ${rarityCount.UR} herói(s) UR de elite`);
    if (rarityCount.SSR > 0) strengths.push(`✓ ${rarityCount.SSR} herói(s) SSR de qualidade`);

    // Análise de posicionamento
    if (frontRowCount > 0 && backRowCount > 0) {
      strengths.push('✓ Bom equilíbrio entre primeira e segunda linha');
    }

    // Recomendações
    if (selectedHeroes.length < 5) {
      recommendations.push(`Adicione ${5 - selectedHeroes.length} herói(s) para completar o esquadrão`);
    }

    if (frontRowCount < 2) {
      recommendations.push(`Adicione ${2 - frontRowCount} herói(s) na primeira linha`);
    }

    if (backRowCount < 3) {
      recommendations.push(`Adicione ${3 - backRowCount} herói(s) na segunda linha`);
    }

    if (typeCount.Tanque > 2) {
      recommendations.push('Muitos tanques - considere remover um para mais dano');
    }

    if (roleCount.Suporte === 0 && selectedHeroes.length >= 4) {
      recommendations.push('Adicione um herói de suporte para amplificar seu esquadrão');
    }

    // Calcular poder baseado em raridade
    const powerScore = selectedHeroes.reduce((total, hero) => {
      let basePower = 20;
      if (hero.rarity === 'UR') basePower = 30;
      else if (hero.rarity === 'SSR') basePower = 25;
      else if (hero.rarity === 'SR') basePower = 15;
      return total + basePower;
    }, 0);

    return {
      typeCount,
      roleCount,
      rarityCount,
      strengths,
      weaknesses,
      recommendations,
      powerScore,
    };
  };

  const analysis = getSquadAnalysis();

  return (
    <div className="space-y-6">
      {/* Modal de Seleção de Posição */}
      {heroToPlace && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="bg-card border-border w-full max-w-md">
            <CardHeader>
              <CardTitle className="text-orange-400">Selecione a Posição</CardTitle>
              <CardDescription>Onde você deseja colocar {heroToPlace.name}?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-3 mb-4">
                <div className="w-16 h-16 bg-gradient-to-b from-purple-600 to-purple-900 rounded flex items-center justify-center overflow-hidden">
                  <img
                    src={getHeroImage(heroToPlace.name)}
                    alt={heroToPlace.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://via.placeholder.com/64x64?text=${heroToPlace.name}`;
                    }}
                  />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground">{heroToPlace.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {heroToPlace.type} • {heroToPlace.role}
                  </p>
                  <Badge className={`text-xs mt-1 ${
                    heroToPlace.rarity === 'UR' ? 'bg-yellow-600' :
                    heroToPlace.rarity === 'SSR' ? 'bg-purple-600' :
                    heroToPlace.rarity === 'SR' ? 'bg-blue-600' :
                    'bg-gray-600'
                  }`}>
                    {heroToPlace.rarity}
                  </Badge>
                </div>
              </div>

              <div className="space-y-3">
                <Button
                  onClick={() => addHeroWithPosition(heroToPlace, 'Front Row')}
                  disabled={!canAddFrontRow}
                  className={`w-full ${canAddFrontRow ? 'bg-blue-600 hover:bg-blue-700' : 'opacity-50 cursor-not-allowed'}`}
                >
                  <Shield className="mr-2" size={18} />
                  Primeira Linha (Defesa) - {frontRowCount}/2
                </Button>

                <Button
                  onClick={() => addHeroWithPosition(heroToPlace, 'Back Row')}
                  disabled={!canAddBackRow}
                  className={`w-full ${canAddBackRow ? 'bg-orange-600 hover:bg-orange-700' : 'opacity-50 cursor-not-allowed'}`}
                >
                  <Sword className="mr-2" size={18} />
                  Segunda Linha (Ataque) - {backRowCount}/3
                </Button>

                <Button
                  onClick={() => setHeroToPlace(null)}
                  variant="outline"
                  className="w-full"
                >
                  Cancelar
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Seletor de Heróis */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-orange-400">Construtor de Esquadrão</CardTitle>
          <CardDescription>Selecione até 5 heróis (2 na frente + 3 atrás) para montar seu esquadrão ideal</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 max-h-96 overflow-y-auto">
            {HEROES.map((hero) => {
              const isSelected = selectedHeroes.some(h => h.id === hero.id);
              const isDisabled = selectedHeroes.length >= 5 && !isSelected;

              return (
                <div
                  key={hero.id}
                  onClick={() => !isSelected && !isDisabled && setHeroToPlace(hero)}
                  className={`opacity-${isDisabled ? '50' : '100'} ${isDisabled ? 'cursor-not-allowed' : ''}`}
                >
                  <HeroCard hero={hero} isSelected={isSelected} />
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Esquadrão Selecionado */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-orange-400">Seu Esquadrão ({selectedHeroes.length}/5)</CardTitle>
          <div className="mt-2">
            <input
              type="text"
              value={squadName}
              onChange={(e) => setSquadName(e.target.value)}
              className="w-full px-3 py-2 bg-background border border-border rounded text-foreground"
              placeholder="Nome do esquadrão"
            />
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {selectedHeroes.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <AlertCircle className="mx-auto mb-2" size={32} />
              <p>Selecione heróis acima para montar seu esquadrão</p>
            </div>
          ) : (
            <>
              {/* Primeira Linha */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Shield className="text-blue-400" size={20} />
                  <h3 className="text-lg font-semibold text-blue-400">Primeira Linha (Defesa) - {frontRowCount}/2</h3>
                </div>
                <div className="space-y-2">
                  {selectedHeroes
                    .filter(h => h.squadPosition === 'Front Row')
                    .map((hero, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3 p-3 bg-background rounded border border-blue-600/30"
                      >
                        <div className="w-12 h-12 bg-gradient-to-b from-purple-600 to-purple-900 rounded flex items-center justify-center overflow-hidden flex-shrink-0">
                          <img
                            src={getHeroImage(hero.name)}
                            alt={hero.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = `https://via.placeholder.com/50x50?text=${hero.name}`;
                            }}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-foreground">{hero.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {hero.type} • {hero.role} • {hero.rarity}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeHeroFromSquad(selectedHeroes.indexOf(hero))}
                          className="text-red-400 hover:text-red-500"
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    ))}
                  {frontRowCount === 0 && (
                    <div className="text-center py-4 text-muted-foreground border border-dashed border-blue-600/30 rounded">
                      Nenhum herói na primeira linha
                    </div>
                  )}
                </div>
              </div>

              {/* Segunda Linha */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Sword className="text-orange-400" size={20} />
                  <h3 className="text-lg font-semibold text-orange-400">Segunda Linha (Ataque) - {backRowCount}/3</h3>
                </div>
                <div className="space-y-2">
                  {selectedHeroes
                    .filter(h => h.squadPosition === 'Back Row')
                    .map((hero, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3 p-3 bg-background rounded border border-orange-600/30"
                      >
                        <div className="w-12 h-12 bg-gradient-to-b from-purple-600 to-purple-900 rounded flex items-center justify-center overflow-hidden flex-shrink-0">
                          <img
                            src={getHeroImage(hero.name)}
                            alt={hero.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = `https://via.placeholder.com/50x50?text=${hero.name}`;
                            }}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-foreground">{hero.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {hero.type} • {hero.role} • {hero.rarity}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeHeroFromSquad(selectedHeroes.indexOf(hero))}
                          className="text-red-400 hover:text-red-500"
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    ))}
                  {backRowCount === 0 && (
                    <div className="text-center py-4 text-muted-foreground border border-dashed border-orange-600/30 rounded">
                      Nenhum herói na segunda linha
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Análise do Esquadrão */}
      {analysis && (
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-card border border-border">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="composition">Composição</TabsTrigger>
            <TabsTrigger value="recommendations">Recomendações</TabsTrigger>
          </TabsList>

          {/* Visão Geral */}
          <TabsContent value="overview" className="space-y-4 mt-4">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-orange-400 flex items-center gap-2">
                  <TrendingUp size={20} /> Poder do Esquadrão
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-orange-400 mb-2">{analysis.powerScore}</div>
                <div className="w-full bg-background rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-orange-400 h-full transition-all"
                    style={{ width: `${Math.min((analysis.powerScore / 150) * 100, 100)}%` }}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Forças */}
            {analysis.strengths.length > 0 && (
              <Card className="bg-card border-border border-l-4 border-l-green-500">
                <CardHeader>
                  <CardTitle className="text-green-400 flex items-center gap-2">
                    <CheckCircle size={20} /> Forças
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {analysis.strengths.map((strength, idx) => (
                    <div key={idx} className="text-foreground">{strength}</div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Fraquezas */}
            {analysis.weaknesses.length > 0 && (
              <Card className="bg-card border-border border-l-4 border-l-red-500">
                <CardHeader>
                  <CardTitle className="text-red-400 flex items-center gap-2">
                    <AlertCircle size={20} /> Fraquezas
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {analysis.weaknesses.map((weakness, idx) => (
                    <div key={idx} className="text-foreground">{weakness}</div>
                  ))}
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Composição */}
          <TabsContent value="composition" className="space-y-4 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Tipos */}
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-orange-400 text-sm">Distribuição por Tipo</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-foreground">Tanque:</span>
                    <Badge variant="outline">{analysis.typeCount.Tanque}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground">Aeronave:</span>
                    <Badge variant="outline">{analysis.typeCount.Aeronave}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground">Míssil:</span>
                    <Badge variant="outline">{analysis.typeCount.Míssil}</Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Papéis */}
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-orange-400 text-sm">Distribuição por Papel</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-foreground">Defesa:</span>
                    <Badge variant="outline">{analysis.roleCount.Defesa}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground">Dano:</span>
                    <Badge variant="outline">{analysis.roleCount.Dano}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground">Suporte:</span>
                    <Badge variant="outline">{analysis.roleCount.Suporte}</Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Raridade */}
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-orange-400 text-sm">Distribuição por Raridade</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-foreground">UR:</span>
                    <Badge className="bg-yellow-600">{analysis.rarityCount.UR}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground">SSR:</span>
                    <Badge className="bg-purple-600">{analysis.rarityCount.SSR}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground">SR:</span>
                    <Badge className="bg-blue-600">{analysis.rarityCount.SR}</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Recomendações */}
          <TabsContent value="recommendations" className="space-y-4 mt-4">
            {analysis.recommendations.length > 0 ? (
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-orange-400 flex items-center gap-2">
                    <Zap size={20} /> Recomendações
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {analysis.recommendations.map((rec, idx) => (
                    <div key={idx} className="flex gap-3">
                      <span className="text-orange-400 mt-1">→</span>
                      <span className="text-foreground">{rec}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ) : (
              <Card className="bg-card border-border">
                <CardContent className="py-8 text-center text-muted-foreground">
                  <CheckCircle className="mx-auto mb-2 text-green-400" size={32} />
                  <p>Seu esquadrão está bem equilibrado!</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}
