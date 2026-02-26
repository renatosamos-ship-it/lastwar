import { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertCircle, Zap, Shield, Target } from 'lucide-react';
import { HEROES, HERO_TYPES } from '@shared/heroes';
import { getHeroImage } from '@/data/heroImages';

export default function HeroAnalyzer() {
  const [selectedHero, setSelectedHero] = useState<any>(null);

  const getHeroAnalysis = (hero: any) => {
    return {
      name: hero.name,
      rarity: hero.rarity,
      type: hero.type,
      role: hero.role,
      tier: hero.tier,
      position: hero.position,
      recommendations: getRecommendations(hero),
      advantages: getAdvantages(hero),
      improvements: getImprovements(hero),
    };
  };

  const getRecommendations = (hero: any) => {
    const recs = [];
    
    if (hero.rarity === 'UR') {
      recs.push('Herói de elite - Priorize o desenvolvimento');
      recs.push('Invista em armas SSR/UR para maximizar potencial');
    } else if (hero.rarity === 'SSR') {
      recs.push('Excelente herói - Vale muito a pena desenvolver');
      recs.push('Considere como segundo ou terceiro herói principal');
    } else if (hero.rarity === 'SR') {
      recs.push('Bom herói para iniciantes');
      recs.push('Útil para preencher formações enquanto desenvolve UR/SSR');
    } else {
      recs.push('Herói iniciante - Use para aprender mecânicas');
      recs.push('Considere evoluir para raridades maiores');
    }

    if (hero.type === 'Tank') {
      recs.push('Equipar com Defense Chips para maximizar defesa');
      recs.push('Posicionar na primeira linha do esquadrão');
    } else if (hero.type === 'Air') {
      recs.push('Equipar com Attack Chips para aumentar dano');
      recs.push('Excelente contra heróis Tank');
    } else if (hero.type === 'Missile') {
      recs.push('Equipar com Interference Chips');
      recs.push('Especialista contra heróis Air');
    }

    return recs;
  };

  const getAdvantages = (hero: any) => {
    const advantages = [];
    
    if (hero.rarity === 'UR' || hero.rarity === 'SSR') {
      advantages.push('Alto potencial de dano');
    }
    
    if (hero.type === 'Tank') {
      advantages.push('+20% DMG vs Missile');
      advantages.push('Excelente para absorver dano');
    } else if (hero.type === 'Air') {
      advantages.push('+20% DMG vs Tank');
      advantages.push('Mobilidade superior');
    } else if (hero.type === 'Missile') {
      advantages.push('+20% DMG vs Air');
      advantages.push('Dano de longo alcance');
    }

    if (hero.tier === 'S+' || hero.tier === 'S') {
      advantages.push('Herói meta - Muito forte no jogo');
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
    ];
  };

  return (
    <div className="space-y-6">
      {/* Seletor de Herói */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-orange-400">Analisar Herói</CardTitle>
          <CardDescription>Selecione um herói para ver análise detalhada</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {HEROES.map((hero) => (
              <div
                key={hero.id}
                onClick={() => setSelectedHero(hero)}
                className={`p-3 rounded border-2 cursor-pointer transition-all ${
                  selectedHero?.id === hero.id
                    ? 'border-orange-400 bg-orange-400/10'
                    : 'border-border hover:border-orange-400'
                }`}
              >
                <div className="w-full h-20 bg-gradient-to-b from-purple-600 to-purple-900 rounded mb-2 flex items-center justify-center overflow-hidden">
                  <img
                    src={getHeroImage(hero.name)}
                    alt={hero.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://via.placeholder.com/100x100?text=${hero.name}`;
                    }}
                  />
                </div>
                <h4 className="text-sm font-semibold text-foreground truncate">{hero.name}</h4>
                <Badge className={`text-xs mt-1 ${
                  hero.rarity === 'UR' ? 'bg-yellow-600' :
                  hero.rarity === 'SSR' ? 'bg-purple-600' :
                  hero.rarity === 'SR' ? 'bg-blue-600' :
                  'bg-gray-600'
                }`}>
                  {hero.rarity}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Análise Detalhada */}
      {selectedHero && (
        <Card className="bg-card border-border border-l-4" style={{ borderLeftColor: '#ff6f00' }}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 bg-gradient-to-b from-purple-600 to-purple-900 rounded flex items-center justify-center overflow-hidden">
                  <img
                    src={getHeroImage(selectedHero.name)}
                    alt={selectedHero.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://via.placeholder.com/100x100?text=${selectedHero.name}`;
                    }}
                  />
                </div>
                <div>
                  <CardTitle className="text-2xl text-orange-400">{selectedHero.name}</CardTitle>
                  <div className="flex gap-2 mt-2">
                    <Badge className={`${
                      selectedHero.rarity === 'UR' ? 'bg-yellow-600' :
                      selectedHero.rarity === 'SSR' ? 'bg-purple-600' :
                      selectedHero.rarity === 'SR' ? 'bg-blue-600' :
                      'bg-gray-600'
                    }`}>
                      {selectedHero.rarity}
                    </Badge>
                    <Badge variant="outline">{selectedHero.type}</Badge>
                    <Badge variant="outline">{selectedHero.role}</Badge>
                    <Badge variant="outline">Tier {selectedHero.tier}</Badge>
                  </div>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Informações Básicas */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 bg-background rounded border border-border">
                <p className="text-xs text-muted-foreground mb-1">Tipo</p>
                <p className="font-semibold text-foreground">{selectedHero.type}</p>
              </div>
              <div className="p-4 bg-background rounded border border-border">
                <p className="text-xs text-muted-foreground mb-1">Papel</p>
                <p className="font-semibold text-foreground">{selectedHero.role}</p>
              </div>
              <div className="p-4 bg-background rounded border border-border">
                <p className="text-xs text-muted-foreground mb-1">Posição</p>
                <p className="font-semibold text-foreground">{selectedHero.position}</p>
              </div>
              <div className="p-4 bg-background rounded border border-border">
                <p className="text-xs text-muted-foreground mb-1">Tier</p>
                <p className="font-semibold text-orange-400 text-lg">{selectedHero.tier}</p>
              </div>
            </div>

            {/* Vantagens */}
            <div>
              <h3 className="text-lg font-semibold text-orange-400 mb-3 flex items-center gap-2">
                <Zap size={20} /> Vantagens
              </h3>
              <div className="space-y-2">
                {getAdvantages(selectedHero).map((advantage, idx) => (
                  <div key={idx} className="p-3 bg-background rounded border border-border flex items-start gap-2">
                    <span className="text-orange-400 mt-1">✓</span>
                    <span className="text-foreground">{advantage}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recomendações */}
            <div>
              <h3 className="text-lg font-semibold text-orange-400 mb-3 flex items-center gap-2">
                <Target size={20} /> Recomendações
              </h3>
              <div className="space-y-2">
                {getRecommendations(selectedHero).map((rec, idx) => (
                  <div key={idx} className="p-3 bg-background rounded border border-border flex items-start gap-2">
                    <span className="text-blue-400 mt-1">→</span>
                    <span className="text-foreground">{rec}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Melhorias */}
            <div>
              <h3 className="text-lg font-semibold text-orange-400 mb-3 flex items-center gap-2">
                <Shield size={20} /> Melhorias Sugeridas
              </h3>
              <div className="space-y-2">
                {getImprovements(selectedHero).map((improvement, idx) => (
                  <div key={idx} className="p-3 bg-background rounded border border-border flex items-start gap-2">
                    <span className="text-green-400 mt-1">⬆</span>
                    <span className="text-foreground">{improvement}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tipo do Herói - Vantagem */}
            <div className="p-4 bg-background rounded border border-border border-l-4" style={{ borderLeftColor: HERO_TYPES[selectedHero.type as keyof typeof HERO_TYPES]?.color || '#ff6f00' }}>
              <h4 className="font-semibold text-foreground mb-2">Vantagem do Tipo</h4>
              <p className="text-foreground">
                {HERO_TYPES[selectedHero.type as keyof typeof HERO_TYPES]?.advantage || 'N/A'}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Mensagem quando nenhum herói é selecionado */}
      {!selectedHero && (
        <Card className="bg-card border-border">
          <CardContent className="pt-6">
            <div className="text-center py-8">
              <AlertCircle className="mx-auto mb-4 text-muted-foreground" size={32} />
              <p className="text-muted-foreground">Selecione um herói acima para ver análise detalhada</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
