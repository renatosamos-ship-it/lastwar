import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertCircle, Zap, Shield, Target, TrendingUp, Lightbulb, Star, Sword } from 'lucide-react';
import { HEROES, HERO_TYPES } from '@shared/heroes';
import HeroCard from '@/components/HeroCard';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

export default function HeroAnalyzer() {
  const [selectedHero, setSelectedHero] = useState<any>(null);
  const [heroLevel, setHeroLevel] = useState(1);
  const [heroStars, setHeroStars] = useState(0);
  const [chipLevels, setChipLevels] = useState({ attack: 0, defense: 0, movement: 0, interference: 0 });
  const [hasSpecialWeapon, setHasSpecialWeapon] = useState(false);
  const [specialWeaponLevel, setSpecialWeaponLevel] = useState(0);

  const getDetailedAnalysis = (hero: any) => {
    const power = calculatePower(hero);
    return {
      name: hero.name,
      rarity: hero.rarity,
      type: hero.type,
      role: hero.role,
      position: hero.position,
      power,
      recommendations: getDetailedRecommendations(hero),
      advantages: getAdvantages(hero),
      improvements: getImprovements(hero),
      developmentTips: getDevelopmentTips(hero),
      buildSuggestions: getBuildSuggestions(hero),
    };
  };

  const calculatePower = (hero: any) => {
    let basePower = 0;
    
    // Poder base por raridade
    if (hero.rarity === 'UR') basePower = 100;
    else if (hero.rarity === 'SSR') basePower = 80;
    else if (hero.rarity === 'SR') basePower = 60;
    else basePower = 40;

    // Adicionar poder por nível
    basePower += heroLevel * 2;

    // Adicionar poder por estrelas
    basePower += heroStars * 5;

    // Adicionar poder por chips
    const totalChipLevel = Object.values(chipLevels).reduce((a, b) => a + b, 0);
    basePower += totalChipLevel * 1.5;

    // Adicionar poder por arma especial
    if (hasSpecialWeapon) {
      basePower += 20 + (specialWeaponLevel * 3);
    }

    return Math.round(basePower);
  };

  const getDetailedRecommendations = (hero: any) => {
    const recs = [];
    
    if (hero.rarity === 'UR') {
      recs.push('Herói de elite - Priorize o desenvolvimento ao máximo');
      recs.push('Invista em armas e chips de raridade alta');
      recs.push('Objetivo: Atingir nível máximo (200) e 6 estrelas');
    } else if (hero.rarity === 'SSR') {
      recs.push('Excelente herói - Vale muito a pena desenvolver');
      recs.push('Considere como segundo ou terceiro herói principal');
      recs.push('Objetivo: Atingir nível 150-180 e 4-5 estrelas');
    } else if (hero.rarity === 'SR') {
      recs.push('Bom herói para iniciantes');
      recs.push('Útil para preencher formações enquanto desenvolve UR/SSR');
      recs.push('Objetivo: Atingir nível 100 e 3 estrelas');
    }

    if (hero.role === 'Defesa') {
      recs.push('Equipar com Defense Chips nível 8+');
      recs.push('Priorize aumentar HP e Defesa');
      recs.push('Posicionar na primeira linha do esquadrão');
    } else if (hero.role === 'Dano') {
      recs.push('Equipar com Attack Chips nível 8+');
      recs.push('Priorize aumentar ATK e Velocidade');
      recs.push('Posicionar na segunda linha para máximo dano');
    } else if (hero.role === 'Suporte') {
      recs.push('Equipar com Support Chips nível 6+');
      recs.push('Priorize aumentar Efeito e Precisão');
      recs.push('Posicionar estrategicamente para apoiar o esquadrão');
    }

    if (hasSpecialWeapon) {
      recs.push(`Arma Especial nível ${specialWeaponLevel} - Continue evoluindo até nível 10`);
    } else {
      recs.push('Prioridade: Obter e evoluir a Arma Especial deste herói');
    }

    return recs;
  };

  const getAdvantages = (hero: any) => {
    const advantages = [];
    
    if (hero.rarity === 'UR') {
      advantages.push('Potencial máximo de poder');
      advantages.push('Habilidades especiais muito fortes');
    } else if (hero.rarity === 'SSR') {
      advantages.push('Alto potencial de poder');
      advantages.push('Boas habilidades especiais');
    }
    
    if (hero.type === 'Tanque') {
      advantages.push('Excelente para absorver dano');
      advantages.push('Defesa superior contra ataques');
    } else if (hero.type === 'Aeronave') {
      advantages.push('Mobilidade superior');
      advantages.push('Ataque rápido e preciso');
    } else if (hero.type === 'Míssil') {
      advantages.push('Dano de longo alcance');
      advantages.push('Especialista em controle de campo');
    }

    if (hero.role === 'Defesa') {
      advantages.push('Protetor do esquadrão');
    } else if (hero.role === 'Dano') {
      advantages.push('Gerador de dano consistente');
    } else if (hero.role === 'Suporte') {
      advantages.push('Amplificador de aliados');
    }

    return advantages;
  };

  const getImprovements = (hero: any) => {
    return [
      'Aumentar nível do herói para máximo',
      'Equipar com armas de raridade alta',
      'Treinar habilidades especiais',
      'Aplicar chips de drone apropriados',
      'Participar de eventos para ganhar recursos',
      'Fazer parcerias com heróis complementares',
    ];
  };

  const getDevelopmentTips = (hero: any) => {
    const tips = [];

    if (heroLevel < 100) {
      tips.push('Seu herói ainda está em desenvolvimento inicial. Aumente o nível para 100+');
    } else if (heroLevel < 150) {
      tips.push('Bom progresso! Continue aumentando o nível para 150+');
    } else if (heroLevel < 200) {
      tips.push('Excelente! Seu herói está bem desenvolvido');
    }

    if (heroStars < 3) {
      tips.push('Aumente as estrelas - cada estrela aumenta significativamente o poder');
    } else if (heroStars < 5) {
      tips.push('Continue evoluindo as estrelas para máximo potencial');
    }

    const avgChipLevel = Object.values(chipLevels).reduce((a, b) => a + b, 0) / 4;
    if (avgChipLevel < 5) {
      tips.push('Seus chips estão baixos. Priorize evoluir chips para nível 8+');
    } else if (avgChipLevel < 8) {
      tips.push('Chips em bom nível. Continue evoluindo para nível 10');
    }

    if (!hasSpecialWeapon) {
      tips.push('⚠️ IMPORTANTE: Você não tem a Arma Especial! Isso reduz muito o poder do herói');
    } else if (specialWeaponLevel < 5) {
      tips.push('Sua Arma Especial está baixa. Evolua para nível 8+');
    }

    return tips;
  };

  const getBuildSuggestions = (hero: any) => {
    const suggestions = [];

    if (hero.role === 'Defesa') {
      suggestions.push({
        title: 'Build Defensivo',
        chips: 'Defense Chips nível 8+ em todos os slots',
        weapon: 'Arma Especial com bônus de Defesa',
        stats: 'Maximize HP e Defesa',
      });
    } else if (hero.role === 'Dano') {
      suggestions.push({
        title: 'Build Ofensivo',
        chips: 'Attack Chips nível 8+ em todos os slots',
        weapon: 'Arma Especial com bônus de ATK',
        stats: 'Maximize ATK e Velocidade',
      });
    } else if (hero.role === 'Suporte') {
      suggestions.push({
        title: 'Build de Suporte',
        chips: 'Support Chips nível 6+ em todos os slots',
        weapon: 'Arma Especial com bônus de Efeito',
        stats: 'Maximize Efeito e Precisão',
      });
    }

    return suggestions;
  };

  const analysis = selectedHero ? getDetailedAnalysis(selectedHero) : null;

  const handleHeroSelect = (hero: any) => {
    setSelectedHero(hero);
    // Reset campos quando seleciona novo herói
    setHeroLevel(1);
    setHeroStars(0);
    setChipLevels({ attack: 0, defense: 0, movement: 0, interference: 0 });
    setHasSpecialWeapon(false);
    setSpecialWeaponLevel(0);
  };

  return (
    <div className="space-y-6">
      {/* Seletor de Heróis */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-orange-400">Analisar Herói</CardTitle>
          <CardDescription>Selecione um herói para ver análise detalhada e recomendações</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {HEROES.map((hero) => (
              <div
                key={hero.id}
                onClick={() => handleHeroSelect(hero)}
              >
                <HeroCard hero={hero} isSelected={selectedHero?.id === hero.id} />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Análise Detalhada */}
      {selectedHero && analysis && (
        <Tabs defaultValue="stats" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-card border border-border">
            <TabsTrigger value="stats">Estatísticas</TabsTrigger>
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="build">Build</TabsTrigger>
            <TabsTrigger value="tips">Dicas</TabsTrigger>
          </TabsList>

          {/* Estatísticas e Configuração */}
          <TabsContent value="stats" className="space-y-4 mt-4">
            <Card className="bg-card border-border border-l-4 border-l-orange-400">
              <CardHeader>
                <CardTitle className="text-2xl text-orange-400">{selectedHero.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Informações Básicas */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-background rounded border border-border">
                    <p className="text-xs text-muted-foreground mb-1">Tipo</p>
                    <p className="font-semibold text-foreground text-lg">{selectedHero.type}</p>
                  </div>
                  <div className="p-4 bg-background rounded border border-border">
                    <p className="text-xs text-muted-foreground mb-1">Papel</p>
                    <p className="font-semibold text-foreground text-lg">{selectedHero.role}</p>
                  </div>
                  <div className="p-4 bg-background rounded border border-border">
                    <p className="text-xs text-muted-foreground mb-1">Raridade</p>
                    <p className="font-semibold text-orange-400 text-lg">{selectedHero.rarity}</p>
                  </div>
                  <div className="p-4 bg-background rounded border border-border">
                    <p className="text-xs text-muted-foreground mb-1">Poder Total</p>
                    <p className="font-bold text-yellow-400 text-2xl">{analysis.power}</p>
                  </div>
                </div>

                {/* Campos de Entrada */}
                <div className="space-y-4 p-4 bg-background rounded border border-border">
                  <h3 className="font-semibold text-orange-400 mb-4">Configuração do Herói</h3>

                  {/* Nível */}
                  <div className="space-y-2">
                    <Label htmlFor="level" className="text-foreground">Nível do Herói: {heroLevel}</Label>
                    <Input
                      id="level"
                      type="range"
                      min="1"
                      max="200"
                      value={heroLevel}
                      onChange={(e) => setHeroLevel(Number(e.target.value))}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>1</span>
                      <span>200</span>
                    </div>
                  </div>

                  {/* Estrelas */}
                  <div className="space-y-2">
                    <Label className="text-foreground">Estrelas: {heroStars}⭐</Label>
                    <div className="flex gap-2">
                      {[0, 1, 2, 3, 4, 5, 6].map((star) => (
                        <button
                          key={star}
                          onClick={() => setHeroStars(star)}
                          className={`p-2 rounded border-2 transition-all ${
                            heroStars >= star
                              ? 'border-yellow-400 bg-yellow-400/10'
                              : 'border-border hover:border-yellow-400'
                          }`}
                        >
                          <Star size={20} className={heroStars >= star ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground'} />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Chips */}
                  <div className="space-y-3 pt-2 border-t border-border">
                    <p className="font-semibold text-orange-400">Níveis dos Chips</p>
                    {Object.entries(chipLevels).map(([chipType, level]) => (
                      <div key={chipType} className="space-y-1">
                        <Label htmlFor={`chip-${chipType}`} className="text-foreground capitalize">
                          {chipType === 'attack' && '⚔️ Attack'} 
                          {chipType === 'defense' && '🛡️ Defense'} 
                          {chipType === 'movement' && '💨 Movement'} 
                          {chipType === 'interference' && '⚡ Interference'}: {level}
                        </Label>
                        <Input
                          id={`chip-${chipType}`}
                          type="range"
                          min="0"
                          max="10"
                          value={level}
                          onChange={(e) => setChipLevels({
                            ...chipLevels,
                            [chipType]: Number(e.target.value)
                          })}
                          className="w-full"
                        />
                      </div>
                    ))}
                  </div>

                  {/* Arma Especial */}
                  <div className="space-y-3 pt-2 border-t border-border">
                    <div className="flex items-center gap-3">
                      <Checkbox
                        id="special-weapon"
                        checked={hasSpecialWeapon}
                        onCheckedChange={(checked) => setHasSpecialWeapon(checked as boolean)}
                      />
                      <Label htmlFor="special-weapon" className="text-foreground cursor-pointer">
                        <Sword size={16} className="inline mr-2" />
                        Tem Arma Especial?
                      </Label>
                    </div>

                    {hasSpecialWeapon && (
                      <div className="space-y-1 pl-6">
                        <Label htmlFor="weapon-level" className="text-foreground">
                          Nível da Arma: {specialWeaponLevel}
                        </Label>
                        <Input
                          id="weapon-level"
                          type="range"
                          min="0"
                          max="10"
                          value={specialWeaponLevel}
                          onChange={(e) => setSpecialWeaponLevel(Number(e.target.value))}
                          className="w-full"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Visão Geral */}
          <TabsContent value="overview" className="space-y-4 mt-4">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-orange-400 flex items-center gap-2">
                  <Zap size={20} /> Vantagens
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {getAdvantages(selectedHero).map((advantage, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-gradient-to-r from-green-600/10 to-green-600/5 rounded border border-green-600/30 border-l-4 border-l-green-400 flex items-start gap-3"
                  >
                    <span className="text-green-400 font-bold text-xl mt-0.5">✓</span>
                    <span className="text-foreground text-sm">{advantage}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-orange-400 flex items-center gap-2">
                  <Target size={20} /> Recomendações
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {getDetailedRecommendations(selectedHero).map((rec, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-gradient-to-r from-blue-600/10 to-blue-600/5 rounded border border-blue-600/30 border-l-4 border-l-blue-400 flex items-start gap-3"
                  >
                    <span className="text-blue-400 font-bold text-xl mt-0.5">→</span>
                    <span className="text-foreground text-sm">{rec}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Build */}
          <TabsContent value="build" className="space-y-4 mt-4">
            {getBuildSuggestions(selectedHero).map((build, idx) => (
              <Card key={idx} className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-orange-400 flex items-center gap-2">
                    <Sword size={20} /> {build.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-background rounded border border-border">
                    <p className="text-xs text-muted-foreground mb-1">Chips Recomendados</p>
                    <p className="text-foreground font-semibold">{build.chips}</p>
                  </div>
                  <div className="p-4 bg-background rounded border border-border">
                    <p className="text-xs text-muted-foreground mb-1">Arma Especial</p>
                    <p className="text-foreground font-semibold">{build.weapon}</p>
                  </div>
                  <div className="p-4 bg-background rounded border border-border">
                    <p className="text-xs text-muted-foreground mb-1">Estatísticas Prioritárias</p>
                    <p className="text-foreground font-semibold">{build.stats}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Dicas */}
          <TabsContent value="tips" className="space-y-4 mt-4">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-orange-400 flex items-center gap-2">
                  <Lightbulb size={20} /> Dicas de Desenvolvimento
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {getDevelopmentTips(selectedHero).map((tip, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-gradient-to-r from-purple-600/10 to-purple-600/5 rounded border border-purple-600/30 border-l-4 border-l-purple-400 flex items-start gap-3"
                  >
                    <span className="text-purple-400 font-bold text-xl mt-0.5">💡</span>
                    <span className="text-foreground text-sm">{tip}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-orange-400 flex items-center gap-2">
                  <Shield size={20} /> Melhorias Sugeridas
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {getImprovements(selectedHero).map((improvement, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-gradient-to-r from-cyan-600/10 to-cyan-600/5 rounded border border-cyan-600/30 border-l-4 border-l-cyan-400 flex items-start gap-3"
                  >
                    <span className="text-cyan-400 font-bold text-xl mt-0.5">⬆</span>
                    <span className="text-foreground text-sm">{improvement}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}

      {/* Mensagem quando nenhum herói é selecionado */}
      {!selectedHero && (
        <Card className="bg-card border-border">
          <CardContent className="pt-8 pb-8">
            <div className="text-center">
              <AlertCircle className="mx-auto mb-4 text-muted-foreground" size={40} />
              <p className="text-muted-foreground text-lg">Selecione um herói acima para ver análise detalhada</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
