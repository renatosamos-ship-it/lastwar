'use client';

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
  const [equipmentLevels, setEquipmentLevels] = useState({ slot1: 0, slot2: 0, slot3: 0, slot4: 0, slot5: 0 });
  const [abilityLevels, setAbilityLevels] = useState<Record<string, number>>({});
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

    // Adicionar poder por equipamentos
    const totalEquipmentLevel = Object.values(equipmentLevels).reduce((a, b) => a + b, 0);
    basePower += totalEquipmentLevel * 2;

    // Adicionar poder por habilidades
    const totalAbilityLevel = Object.values(abilityLevels).reduce((a, b) => a + b, 0);
    basePower += totalAbilityLevel * 1.2;

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
      recs.push('Invista em armas e equipamentos de raridade alta');
      recs.push('Objetivo: Atingir nível máximo (175) e 5 estrelas');
    } else if (hero.rarity === 'SSR') {
      recs.push('Excelente herói - Vale muito a pena desenvolver');
      recs.push('Considere como segundo ou terceiro herói principal');
      recs.push('Objetivo: Atingir nível 150-175 e 5 estrelas');
    } else if (hero.rarity === 'SR') {
      recs.push('Bom herói para iniciantes');
      recs.push('Útil para preencher formações enquanto desenvolve UR/SSR');
      recs.push('Objetivo: Atingir nível 100 e 3-4 estrelas');
    }

    if (hero.role === 'Defesa') {
      recs.push('Equipar com Equipamentos de Defesa nível 4 em todos os slots');
      recs.push('Priorize aumentar HP e Defesa');
      recs.push('Posicionar na primeira linha do esquadrão');
    } else if (hero.role === 'Dano') {
      recs.push('Equipar com Equipamentos de Ataque nível 4 em todos os slots');
      recs.push('Priorize aumentar ATK e Velocidade');
      recs.push('Posicionar na segunda linha para máximo dano');
    } else if (hero.role === 'Suporte') {
      recs.push('Equipar com Equipamentos de Suporte nível 3-4');
      recs.push('Priorize aumentar Efeito e Precisão');
      recs.push('Posicionar estrategicamente para apoiar o esquadrão');
    }

    if (hasSpecialWeapon) {
      recs.push(`Arma Especial nível ${specialWeaponLevel} - Continue evoluindo até nível máximo`);
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
      'Aumentar nível do herói para máximo (175)',
      'Evoluir para 5 estrelas',
      'Equipar com equipamentos nível 4',
      'Treinar habilidades especiais para nível 30',
      'Obter e evoluir Arma Especial',
      'Fazer parcerias com heróis complementares',
    ];
  };

  const getDevelopmentTips = (hero: any) => {
    const tips = [];

    if (heroLevel < 100) {
      tips.push('Seu herói ainda está em desenvolvimento inicial. Aumente o nível para 100+');
    } else if (heroLevel < 150) {
      tips.push('Bom progresso! Continue aumentando o nível para 150+');
    } else if (heroLevel < 175) {
      tips.push('Excelente! Seu herói está bem desenvolvido');
    } else {
      tips.push('✅ Nível máximo atingido!');
    }

    if (heroStars < 3) {
      tips.push('Aumente as estrelas - cada estrela aumenta significativamente o poder');
    } else if (heroStars < 5) {
      tips.push('Continue evoluindo as estrelas para máximo potencial (5 estrelas)');
    } else {
      tips.push('✅ Máximo de estrelas atingido!');
    }

    const avgEquipmentLevel = Object.values(equipmentLevels).reduce((a, b) => a + b, 0) / 5;
    if (avgEquipmentLevel < 2) {
      tips.push('Seus equipamentos estão baixos. Priorize evoluir para nível 3-4');
    } else if (avgEquipmentLevel < 4) {
      tips.push('Equipamentos em bom nível. Continue evoluindo para nível 4 (máximo)');
    } else {
      tips.push('✅ Equipamentos no nível máximo!');
    }

    if (!hasSpecialWeapon) {
      tips.push('⚠️ IMPORTANTE: Você não tem a Arma Especial! Isso reduz muito o poder do herói');
    } else if (specialWeaponLevel < 5) {
      tips.push('Sua Arma Especial está baixa. Evolua para nível máximo');
    }

    return tips;
  };

  const getBuildSuggestions = (hero: any) => {
    const suggestions = [];

    if (hero.role === 'Defesa') {
      suggestions.push({
        title: 'Build Defensivo',
        equipment: 'Equipamentos de Defesa nível 4 em todos os slots',
        weapon: 'Arma Especial com bônus de Defesa',
        stats: 'Maximize HP e Defesa',
      });
    } else if (hero.role === 'Dano') {
      suggestions.push({
        title: 'Build Ofensivo',
        equipment: 'Equipamentos de Ataque nível 4 em todos os slots',
        weapon: 'Arma Especial com bônus de ATK',
        stats: 'Maximize ATK e Velocidade',
      });
    } else if (hero.role === 'Suporte') {
      suggestions.push({
        title: 'Build de Suporte',
        equipment: 'Equipamentos de Suporte nível 3-4',
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
    setEquipmentLevels({ slot1: 0, slot2: 0, slot3: 0, slot4: 0, slot5: 0 });
    setAbilityLevels({});
    setHasSpecialWeapon(false);
    setSpecialWeaponLevel(0);
  };

  const updateAbilityLevel = (abilityId: string, level: number) => {
    setAbilityLevels(prev => ({
      ...prev,
      [abilityId]: level
    }));
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
                    <Label htmlFor="level" className="text-foreground">Nível do Herói: {heroLevel} / 175</Label>
                    <Input
                      id="level"
                      type="range"
                      min="1"
                      max="175"
                      value={heroLevel}
                      onChange={(e) => setHeroLevel(Number(e.target.value))}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>1</span>
                      <span>175</span>
                    </div>
                  </div>

                  {/* Estrelas */}
                  <div className="space-y-2">
                    <Label className="text-foreground">Estrelas: {heroStars} / 5</Label>
                    <div className="flex gap-2">
                      {[0, 1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          onClick={() => setHeroStars(star)}
                          className={`p-2 rounded transition-colors ${
                            heroStars >= star
                              ? 'bg-yellow-500 text-white'
                              : 'bg-background border border-border text-muted-foreground'
                          }`}
                        >
                          <Star size={20} />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Equipamentos */}
                  <div className="space-y-3 pt-2">
                    <Label className="text-foreground font-semibold">Equipamentos (Máximo Nível 4)</Label>
                    {[1, 2, 3, 4, 5].map((slot) => (
                      <div key={slot} className="space-y-1">
                        <div className="flex justify-between">
                          <Label className="text-sm">Slot {slot}: {equipmentLevels[`slot${slot}` as keyof typeof equipmentLevels]}</Label>
                          {equipmentLevels[`slot${slot}` as keyof typeof equipmentLevels] === 4 && (
                            <Badge className="bg-red-600">MÁXIMO</Badge>
                          )}
                        </div>
                        <Input
                          type="range"
                          min="0"
                          max="4"
                          value={equipmentLevels[`slot${slot}` as keyof typeof equipmentLevels]}
                          onChange={(e) => setEquipmentLevels(prev => ({
                            ...prev,
                            [`slot${slot}`]: Number(e.target.value)
                          }))}
                          className="w-full"
                        />
                      </div>
                    ))}
                  </div>

                  {/* Habilidades */}
                  {selectedHero.abilities && selectedHero.abilities.length > 0 && (
                    <div className="space-y-3 pt-2">
                      <Label className="text-foreground font-semibold">Habilidades (Máximo Nível 30)</Label>
                      {selectedHero.abilities.map((ability: any) => (
                        <div key={ability.id} className="space-y-1">
                          <div className="flex justify-between">
                            <Label className="text-sm">{ability.name}: {abilityLevels[ability.id] || 0}</Label>
                            {(abilityLevels[ability.id] || 0) === 30 && (
                              <Badge className="bg-red-600">MÁXIMO</Badge>
                            )}
                          </div>
                          <Input
                            type="range"
                            min="0"
                            max="30"
                            value={abilityLevels[ability.id] || 0}
                            onChange={(e) => updateAbilityLevel(ability.id, Number(e.target.value))}
                            className="w-full"
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Arma Especial */}
                  <div className="space-y-2 pt-2 border-t border-border">
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="weapon"
                        checked={hasSpecialWeapon}
                        onCheckedChange={(checked) => {
                          setHasSpecialWeapon(checked as boolean);
                          if (!checked) setSpecialWeaponLevel(0);
                        }}
                      />
                      <Label htmlFor="weapon" className="text-foreground">Possui Arma Especial</Label>
                    </div>

                    {hasSpecialWeapon && (
                      <div className="space-y-2 pl-6">
                        <div className="flex justify-between">
                          <Label className="text-sm">Nível da Arma: {specialWeaponLevel}</Label>
                        </div>
                        <Input
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
                <CardTitle className="text-orange-400">Vantagens</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {analysis.advantages.map((adv: string, idx: number) => (
                    <div key={idx} className="flex items-start gap-2">
                      <Zap className="text-yellow-400 mt-1 flex-shrink-0" size={18} />
                      <span className="text-foreground">{adv}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-orange-400">Recomendações</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {analysis.recommendations.map((rec: string, idx: number) => (
                    <div key={idx} className="flex items-start gap-2">
                      <Target className="text-cyan-400 mt-1 flex-shrink-0" size={18} />
                      <span className="text-foreground">{rec}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Build */}
          <TabsContent value="build" className="space-y-4 mt-4">
            {analysis.buildSuggestions.map((build: any, idx: number) => (
              <Card key={idx} className="bg-card border-border border-l-4 border-l-cyan-400">
                <CardHeader>
                  <CardTitle className="text-cyan-400">{build.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Equipamentos</p>
                    <p className="text-foreground">{build.equipment}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Arma Especial</p>
                    <p className="text-foreground">{build.weapon}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Estatísticas Prioritárias</p>
                    <p className="text-foreground">{build.stats}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Dicas */}
          <TabsContent value="tips" className="space-y-4 mt-4">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-orange-400">Dicas de Desenvolvimento</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {analysis.developmentTips.map((tip: string, idx: number) => (
                    <div key={idx} className="flex items-start gap-2">
                      <Lightbulb className="text-yellow-400 mt-1 flex-shrink-0" size={18} />
                      <span className="text-foreground">{tip}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-orange-400">Melhorias Sugeridas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {analysis.improvements.map((imp: string, idx: number) => (
                    <div key={idx} className="flex items-start gap-2">
                      <TrendingUp className="text-green-400 mt-1 flex-shrink-0" size={18} />
                      <span className="text-foreground">{imp}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}
