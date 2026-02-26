import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Clock, TrendingUp, Target } from 'lucide-react';

interface Milestone {
  level: number;
  name: string;
  description: string;
  requiredDays: number;
  rewards: string[];
}

const milestones: Milestone[] = [
  {
    level: 1,
    name: 'Iniciante',
    description: 'Primeiro esquadrão montado',
    requiredDays: 0,
    rewards: ['Acesso ao Chip Lab', 'Primeiros chips básicos'],
  },
  {
    level: 2,
    name: 'Aprendiz',
    description: 'Esquadrão com 3 heróis SR',
    requiredDays: 7,
    rewards: ['Chips SSR desbloqueados', 'Bônus de experiência'],
  },
  {
    level: 3,
    name: 'Veterano',
    description: 'Esquadrão com 5 heróis SSR',
    requiredDays: 30,
    rewards: ['Chips UR desbloqueados', 'Acesso a eventos especiais'],
  },
  {
    level: 4,
    name: 'Mestre',
    description: 'Esquadrão com 3 heróis UR',
    requiredDays: 90,
    rewards: ['Chips lendários', 'Bônus permanente de poder'],
  },
  {
    level: 5,
    name: 'Lendário',
    description: 'Esquadrão totalmente otimizado',
    requiredDays: 180,
    rewards: ['Acesso a modo PvP elite', 'Recompensas exclusivas'],
  },
];

export default function ProgressCalculator() {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [targetLevel, setTargetLevel] = useState(3);
  const [hoursPerDay, setHoursPerDay] = useState(4);

  const currentMilestone = milestones[currentLevel - 1];
  const targetMilestone = milestones[targetLevel - 1];
  const requiredDays = targetMilestone.requiredDays - currentMilestone.requiredDays;
  const estimatedDays = Math.ceil(requiredDays / (hoursPerDay / 24));

  const getProgressColor = (level: number) => {
    if (level <= 1) return 'bg-gray-600';
    if (level <= 2) return 'bg-cyan-600';
    if (level <= 3) return 'bg-purple-600';
    if (level <= 4) return 'bg-yellow-600';
    return 'bg-orange-600';
  };

  return (
    <div className="space-y-6">
      {/* Configuração */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-orange-400 flex items-center gap-2">
            <Clock size={20} /> Calculadora de Progresso
          </CardTitle>
          <CardDescription>Estime quanto tempo levará para atingir seu objetivo</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Nível Atual */}
          <div>
            <label className="text-sm font-semibold text-foreground mb-3 block">
              Nível Atual: <span className="text-cyan-400">{currentLevel}</span>
            </label>
            <Slider
              value={[currentLevel]}
              onValueChange={(value) => {
                setCurrentLevel(value[0]);
                if (value[0] >= targetLevel) {
                  setTargetLevel(value[0] + 1);
                }
              }}
              min={1}
              max={5}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-2">
              <span>1</span>
              <span>2</span>
              <span>3</span>
              <span>4</span>
              <span>5</span>
            </div>
          </div>

          {/* Nível Alvo */}
          <div>
            <label className="text-sm font-semibold text-foreground mb-3 block">
              Nível Alvo: <span className="text-purple-400">{targetLevel}</span>
            </label>
            <Slider
              value={[targetLevel]}
              onValueChange={(value) => {
                if (value[0] > currentLevel) {
                  setTargetLevel(value[0]);
                }
              }}
              min={currentLevel + 1}
              max={5}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-2">
              <span>1</span>
              <span>2</span>
              <span>3</span>
              <span>4</span>
              <span>5</span>
            </div>
          </div>

          {/* Horas por Dia */}
          <div>
            <label className="text-sm font-semibold text-foreground mb-3 block">
              Horas de Jogo por Dia: <span className="text-yellow-400">{hoursPerDay}h</span>
            </label>
            <Slider
              value={[hoursPerDay]}
              onValueChange={(value) => setHoursPerDay(value[0])}
              min={1}
              max={24}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-2">
              <span>1h</span>
              <span>6h</span>
              <span>12h</span>
              <span>18h</span>
              <span>24h</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Resultado */}
      <Card className="bg-card border-border border-l-4" style={{ borderLeftColor: '#ff6f00' }}>
        <CardHeader>
          <CardTitle className="text-orange-400">📊 Estimativa de Tempo</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="p-4 bg-background rounded border border-border text-center">
              <p className="text-xs text-muted-foreground">Dias Necessários</p>
              <p className="text-2xl font-bold text-orange-400 mt-2">{estimatedDays}</p>
            </div>
            <div className="p-4 bg-background rounded border border-border text-center">
              <p className="text-xs text-muted-foreground">Semanas</p>
              <p className="text-2xl font-bold text-cyan-400 mt-2">{Math.ceil(estimatedDays / 7)}</p>
            </div>
            <div className="p-4 bg-background rounded border border-border text-center">
              <p className="text-xs text-muted-foreground">Meses</p>
              <p className="text-2xl font-bold text-purple-400 mt-2">{Math.ceil(estimatedDays / 30)}</p>
            </div>
          </div>

          <div className="p-4 bg-background rounded border border-border">
            <p className="text-sm text-foreground">
              Jogando <span className="font-bold text-yellow-400">{hoursPerDay} horas por dia</span>, você atingirá{' '}
              <span className="font-bold text-purple-400">{targetMilestone.name}</span> em aproximadamente{' '}
              <span className="font-bold text-orange-400">{estimatedDays} dias</span>.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Marcos de Progresso */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-cyan-400 flex items-center gap-2">
            <TrendingUp size={20} /> Marcos de Progresso
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {milestones.map((milestone, idx) => {
              const isReached = milestone.level <= currentLevel;
              const isTarget = milestone.level === targetLevel;
              const isBetween = milestone.level > currentLevel && milestone.level <= targetLevel;

              return (
                <div
                  key={idx}
                  className={`p-4 rounded border-2 transition ${
                    isReached
                      ? 'bg-background border-green-600'
                      : isTarget
                      ? 'bg-background border-purple-600'
                      : isBetween
                      ? 'bg-background border-yellow-600'
                      : 'bg-background border-border'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-semibold text-foreground">{milestone.name}</p>
                      <p className="text-xs text-muted-foreground">{milestone.description}</p>
                    </div>
                    <div className="text-right">
                      {isReached && <Badge className="bg-green-600 text-white">✓ Alcançado</Badge>}
                      {isTarget && <Badge className="bg-purple-600 text-white">🎯 Alvo</Badge>}
                      {isBetween && <Badge className="bg-yellow-600 text-white">→ Próximo</Badge>}
                    </div>
                  </div>

                  {milestone.rewards.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-border">
                      <p className="text-xs text-muted-foreground mb-2">Recompensas:</p>
                      <div className="flex flex-wrap gap-2">
                        {milestone.rewards.map((reward, ridx) => (
                          <Badge key={ridx} variant="outline" className="text-xs">
                            {reward}
                          </Badge>
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

      {/* Dicas */}
      <Card className="bg-card border-border border-l-4" style={{ borderLeftColor: '#ffd700' }}>
        <CardHeader>
          <CardTitle className="text-yellow-400">💡 Dicas para Acelerar Progresso</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            <li className="text-sm text-foreground flex gap-2">
              <span className="text-yellow-400">→</span> Participe de eventos especiais para ganhar material extra
            </li>
            <li className="text-sm text-foreground flex gap-2">
              <span className="text-yellow-400">→</span> Invista em heróis com melhor relação custo-benefício
            </li>
            <li className="text-sm text-foreground flex gap-2">
              <span className="text-yellow-400">→</span> Junte-se a uma aliança ativa para bônus diários
            </li>
            <li className="text-sm text-foreground flex gap-2">
              <span className="text-yellow-400">→</span> Priorize chips de raridade maior para poder rápido
            </li>
            <li className="text-sm text-foreground flex gap-2">
              <span className="text-yellow-400">→</span> Faça login diário para não perder recompensas
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
