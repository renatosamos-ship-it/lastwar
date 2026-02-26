import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertCircle, Zap, Shield, Target, TrendingUp, Lightbulb } from 'lucide-react';
import { HEROES, HERO_TYPES } from '@shared/heroes';
import HeroCard from '@/components/HeroCard';

export default function HeroAnalyzer() {
  const [selectedHero, setSelectedHero] = useState<any>(null);

  const getHeroAnalysis = (hero: any) => {
    return {
      name: hero.name,
      rarity: hero.rarity,
      type: hero.type,
      role: hero.role,
      position: hero.position,
      recommendations: getRecommendations(hero),
      advantages: getAdvantages(hero),
      improvements: getImprovements(hero),
    };
  };

  const getRecommendations = (hero: any) => {
    const recs = [];
    
    if (hero.rarity === 'UR') {
      recs.push('Herói de elite - Priorize o desenvolvimento ao máximo');
      recs.push('Invista em armas e chips de raridade alta');
    } else if (hero.rarity === 'SSR') {
      recs.push('Excelente herói - Vale muito a pena desenvolver');
      recs.push('Considere como segundo ou terceiro herói principal');
    } else if (hero.rarity === 'SR') {
      recs.push('Bom herói para iniciantes');
      recs.push('Útil para preencher formações enquanto desenvolve UR/SSR');
    }

    if (hero.role === 'Defesa') {
      recs.push('Equipar com Defense Chips para maximizar defesa');
      recs.push('Posicionar na primeira linha do esquadrão');
    } else if (hero.role === 'Dano') {
      recs.push('Equipar com Attack Chips para aumentar dano');
      recs.push('Posicionar na segunda linha para máximo dano');
    } else if (hero.role === 'Suporte') {
      recs.push('Equipar com Support Chips para amplificar aliados');
      recs.push('Posicionar estrategicamente para apoiar o esquadrão');
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

  const analysis = selectedHero ? getHeroAnalysis(selectedHero) : null;

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
                onClick={() => setSelectedHero(hero)}
              >
                <HeroCard hero={hero} isSelected={selectedHero?.id === hero.id} />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Análise Detalhada */}
      {selectedHero && analysis && (
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-card border border-border">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="advantages">Vantagens</TabsTrigger>
            <TabsTrigger value="recommendations">Recomendações</TabsTrigger>
          </TabsList>

          {/* Visão Geral */}
          <TabsContent value="overview" className="space-y-4 mt-4">
            {/* Card do Herói Selecionado */}
            <Card className="bg-card border-border border-l-4 border-l-orange-400">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-3xl text-orange-400 mb-2">{selectedHero.name}</CardTitle>
                    <div className="flex gap-2 flex-wrap">
                      <Badge className={`text-sm font-bold ${
                        selectedHero.rarity === 'UR' ? 'bg-yellow-600 text-yellow-950' :
                        selectedHero.rarity === 'SSR' ? 'bg-purple-600 text-purple-950' :
                        selectedHero.rarity === 'SR' ? 'bg-blue-600 text-blue-950' :
                        'bg-gray-600 text-gray-950'
                      }`}>
                        {selectedHero.rarity}
                      </Badge>
                      <Badge variant="outline" className="text-sm">{selectedHero.type}</Badge>
                      <Badge variant="outline" className="text-sm">{selectedHero.role}</Badge>
                      <Badge variant="outline" className="text-sm">{selectedHero.position}</Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Informações em Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-background rounded border border-border">
                    <p className="text-xs text-muted-foreground mb-1 flex items-center gap-2">
                      <Shield size={14} /> Tipo
                    </p>
                    <p className="font-semibold text-foreground text-lg">{selectedHero.type}</p>
                  </div>
                  <div className="p-4 bg-background rounded border border-border">
                    <p className="text-xs text-muted-foreground mb-1 flex items-center gap-2">
                      <Target size={14} /> Papel
                    </p>
                    <p className="font-semibold text-foreground text-lg">{selectedHero.role}</p>
                  </div>
                  <div className="p-4 bg-background rounded border border-border">
                    <p className="text-xs text-muted-foreground mb-1 flex items-center gap-2">
                      <TrendingUp size={14} /> Raridade
                    </p>
                    <p className="font-semibold text-orange-400 text-lg">{selectedHero.rarity}</p>
                  </div>
                  <div className="p-4 bg-background rounded border border-border">
                    <p className="text-xs text-muted-foreground mb-1 flex items-center gap-2">
                      <Zap size={14} /> Posição
                    </p>
                    <p className="font-semibold text-foreground text-lg">{selectedHero.position}</p>
                  </div>
                </div>

                {/* Vantagem do Tipo */}
                <div className="p-4 bg-gradient-to-r from-orange-600/10 to-orange-600/5 rounded border border-orange-600/30 border-l-4 border-l-orange-400">
                  <h4 className="font-semibold text-orange-400 mb-2 flex items-center gap-2">
                    <Lightbulb size={18} /> Vantagem do Tipo
                  </h4>
                  <p className="text-foreground">
                    {HERO_TYPES[selectedHero.type as keyof typeof HERO_TYPES]?.advantage || 'N/A'}
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Vantagens */}
          <TabsContent value="advantages" className="space-y-4 mt-4">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-orange-400 flex items-center gap-2">
                  <Zap size={20} /> Vantagens do Herói
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
          </TabsContent>

          {/* Recomendações */}
          <TabsContent value="recommendations" className="space-y-4 mt-4">
            <div className="space-y-4">
              {/* Recomendações */}
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-orange-400 flex items-center gap-2">
                    <Target size={20} /> Recomendações
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {getRecommendations(selectedHero).map((rec, idx) => (
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

              {/* Melhorias Sugeridas */}
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
                      className="p-4 bg-gradient-to-r from-purple-600/10 to-purple-600/5 rounded border border-purple-600/30 border-l-4 border-l-purple-400 flex items-start gap-3"
                    >
                      <span className="text-purple-400 font-bold text-xl mt-0.5">⬆</span>
                      <span className="text-foreground text-sm">{improvement}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
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
