import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Progress } from '@/components/ui/progress';

const progressMilestones = [
  { level: 1, unlocks: 'Producao Basica', productionTime: '4 horas', reward: 'Acesso ao Chip Lab' },
  { level: 5, unlocks: 'SSR Chips', productionTime: '2 horas', reward: '500 Ouro' },
  { level: 10, unlocks: 'Producao Rapida', productionTime: '1.2 horas', reward: 'Coffe de Chips Raro' },
  { level: 15, unlocks: 'UR Chips', productionTime: '30 min', reward: 'Coffe de Chips Epico' },
  { level: 20, unlocks: 'Producao Maxima', productionTime: '15 min', reward: 'Coffe de Chips Lendario' },
];

export default function ProgressTracker() {
  const [currentLevel, setCurrentLevel] = useState(10);

  const nextMilestone = progressMilestones.find(m => m.level > currentLevel) || progressMilestones[progressMilestones.length - 1];
  const previousMilestone = progressMilestones.filter(m => m.level <= currentLevel).pop() || progressMilestones[0];

  const progressPercentage = ((currentLevel - previousMilestone.level) / (nextMilestone.level - previousMilestone.level)) * 100;
  const levelToNext = nextMilestone.level - currentLevel;

  const estimatedDaysToMax = (20 - currentLevel) * 2; // Estimativa: 2 dias por nivel

  return (
    <div className="space-y-6">
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-2xl text-orange-400">Rastreador de Progresso</CardTitle>
          <CardDescription>Acompanhe seu progresso no Chip Lab e veja o que desbloqueia em cada nivel</CardDescription>
        </CardHeader>
      </Card>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Seu Nivel Atual</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <div className="text-6xl font-bold text-orange-400 mb-2">{currentLevel}</div>
            <p className="text-muted-foreground">de 20 niveis</p>
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-semibold text-foreground">Ajuste seu nivel</span>
              <span className="text-sm text-muted-foreground">{currentLevel}/20</span>
            </div>
            <Slider
              value={[currentLevel]}
              onValueChange={(value) => setCurrentLevel(value[0])}
              min={1}
              max={20}
              step={1}
              className="w-full"
            />
          </div>

          <div className="p-4 bg-background rounded border border-border">
            <div className="flex justify-between items-center mb-3">
              <span className="font-semibold text-foreground">Progresso para Proximo Nivel</span>
              <Badge className="bg-orange-600 text-white">{levelToNext} niveis</Badge>
            </div>
            <Progress value={progressPercentage} className="h-3" />
            <p className="text-xs text-muted-foreground mt-2">
              Tempo estimado: ~{levelToNext * 2} dias
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-orange-400">Roadmap de Desbloqueios</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {progressMilestones.map((milestone, idx) => {
              const isCompleted = currentLevel >= milestone.level;
              const isCurrent = currentLevel >= milestone.level && currentLevel < (progressMilestones[idx + 1]?.level || 21);

              return (
                <div
                  key={idx}
                  className={`p-4 rounded border-2 transition-all ${
                    isCompleted
                      ? 'bg-background border-green-500 border-opacity-50'
                      : 'bg-background border-border'
                  } ${isCurrent ? 'border-orange-500' : ''}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                          isCompleted
                            ? 'bg-green-500 text-white'
                            : isCurrent
                            ? 'bg-orange-500 text-white'
                            : 'bg-border text-muted-foreground'
                        }`}
                      >
                        {milestone.level}
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">{milestone.unlocks}</h4>
                        <p className="text-xs text-muted-foreground">Producao: {milestone.productionTime}</p>
                      </div>
                    </div>
                    {isCompleted && <Badge className="bg-green-600 text-white">Desbloqueado</Badge>}
                    {isCurrent && <Badge className="bg-orange-600 text-white">Proximo</Badge>}
                  </div>
                  <div className="ml-13">
                    <p className="text-sm text-muted-foreground">Recompensa: {milestone.reward}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-orange-400">Resumo de Progresso</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-3 bg-background rounded border border-border">
              <p className="text-xs text-muted-foreground mb-1">Niveis Completos</p>
              <p className="text-2xl font-bold text-green-400">{currentLevel}</p>
            </div>
            <div className="p-3 bg-background rounded border border-border">
              <p className="text-xs text-muted-foreground mb-1">Niveis Restantes</p>
              <p className="text-2xl font-bold text-orange-400">{20 - currentLevel}</p>
            </div>
            <div className="p-3 bg-background rounded border border-border">
              <p className="text-xs text-muted-foreground mb-1">Progresso Geral</p>
              <p className="text-2xl font-bold text-purple-400">{Math.round((currentLevel / 20) * 100)}%</p>
            </div>
            <div className="p-3 bg-background rounded border border-border">
              <p className="text-xs text-muted-foreground mb-1">Tempo Estimado</p>
              <p className="text-2xl font-bold text-cyan-400">~{estimatedDaysToMax} dias</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card border-border border-l-4" style={{ borderLeftColor: '#ffd700' }}>
        <CardHeader>
          <CardTitle className="text-yellow-400">Dicas para Acelerar Progresso</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm">
            <li className="flex gap-3">
              <span className="font-bold text-orange-400">1.</span>
              <span className="text-muted-foreground">Participe de eventos semanais para material premium</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-orange-400">2.</span>
              <span className="text-muted-foreground">Coleta diaria nas lojas de alianca e campanha</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-orange-400">3.</span>
              <span className="text-muted-foreground">Invista em pesquisa de Chip Lab quando disponivel</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-orange-400">4.</span>
              <span className="text-muted-foreground">Use bonus de producao durante eventos especiais</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
