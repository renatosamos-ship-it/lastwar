import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, Zap, Gift } from 'lucide-react';

const events = [
  {
    name: 'Zombie Invasion',
    icon: Zap,
    frequency: 'Semanal (Terça)',
    duration: '2 horas',
    rewards: ['Material Premium', 'Cofres de Chips', 'Ouro'],
    difficulty: 'Moderado',
    tips: 'Foco em dano AOE. Use Interference Chips para controlar ondas.',
    color: '#ff6f00',
  },
  {
    name: 'Ghost Ops',
    icon: AlertCircle,
    frequency: 'Semanal (Quinta)',
    duration: '3 horas',
    rewards: ['Material Premium', 'Cofres Raros', 'Experiencia'],
    difficulty: 'Dificil',
    tips: 'Requer estrategia. Defense Chips essenciais para sobreviver.',
    color: '#9c27b0',
  },
  {
    name: 'Alliance Duel',
    icon: Gift,
    frequency: 'Diario',
    duration: 'Sem limite',
    rewards: ['Material Premium por pontos', 'Ranking Rewards'],
    difficulty: 'PvP',
    tips: 'Pontos altos oferecem material premium. Compete com aliados.',
    color: '#00d9ff',
  },
  {
    name: 'Chip Challenge',
    icon: Zap,
    frequency: 'Mensal',
    duration: '1 semana',
    rewards: ['Cofres Lendarios', 'Material Raro', 'Insignias'],
    difficulty: 'Muito Dificil',
    tips: 'Evento competitivo. Prepare seus melhores chips.',
    color: '#ffd700',
  },
];

export default function EventsGuide() {
  return (
    <div className="space-y-6">
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-2xl text-orange-400">Guia de Eventos Especiais</CardTitle>
          <CardDescription>Eventos que oferecem material premium e cofres de chips</CardDescription>
        </CardHeader>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        {events.map((event, idx) => {
          const Icon = event.icon;
          return (
            <Card key={idx} className="bg-card border-border border-l-4" style={{ borderLeftColor: event.color }}>
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Icon size={24} style={{ color: event.color }} />
                  <CardTitle className="text-lg" style={{ color: event.color }}>
                    {event.name}
                  </CardTitle>
                </div>
                <div className="flex gap-2 flex-wrap">
                  <Badge className="bg-purple-600 text-white text-xs">{event.frequency}</Badge>
                  <Badge className="bg-orange-600 text-white text-xs">{event.duration}</Badge>
                  <Badge className="bg-red-600 text-white text-xs">{event.difficulty}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Recompensas</h4>
                  <ul className="space-y-1">
                    {event.rewards.map((reward, i) => (
                      <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                        <span className="text-yellow-400">•</span>
                        {reward}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-3 bg-background rounded border border-border">
                  <h4 className="font-semibold text-foreground mb-2 text-sm">Dica Estrategica</h4>
                  <p className="text-xs text-muted-foreground">{event.tips}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-orange-400">Calendario de Eventos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="p-3 bg-background rounded border border-border">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-foreground">Segunda</span>
                <Badge className="bg-gray-600 text-white">Descanso</Badge>
              </div>
              <p className="text-sm text-muted-foreground">Dia livre para coleta e preparacao</p>
            </div>
            <div className="p-3 bg-background rounded border border-border">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-foreground">Terca</span>
                <Badge className="bg-orange-600 text-white">Zombie Invasion</Badge>
              </div>
              <p className="text-sm text-muted-foreground">Evento de dano AOE - 2 horas</p>
            </div>
            <div className="p-3 bg-background rounded border border-border">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-foreground">Quarta</span>
                <Badge className="bg-blue-600 text-white">Alliance Duel</Badge>
              </div>
              <p className="text-sm text-muted-foreground">Competicao PvP - Sem limite</p>
            </div>
            <div className="p-3 bg-background rounded border border-border">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-foreground">Quinta</span>
                <Badge className="bg-purple-600 text-white">Ghost Ops</Badge>
              </div>
              <p className="text-sm text-muted-foreground">Evento dificil - 3 horas</p>
            </div>
            <div className="p-3 bg-background rounded border border-border">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-foreground">Sexta a Domingo</span>
                <Badge className="bg-cyan-600 text-white">Chip Challenge</Badge>
              </div>
              <p className="text-sm text-muted-foreground">Evento mensal - 1 semana</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card border-border border-l-4" style={{ borderLeftColor: '#ffd700' }}>
        <CardHeader>
          <CardTitle className="text-yellow-400">Dicas para Maximizar Recompensas</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm">
            <li className="flex gap-3">
              <span className="font-bold text-orange-400">1.</span>
              <span className="text-muted-foreground">Participe de todos os eventos semanais para acumular material premium</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-orange-400">2.</span>
              <span className="text-muted-foreground">Prepare chips especificos para cada tipo de evento</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-orange-400">3.</span>
              <span className="text-muted-foreground">No Alliance Duel, foque em pontos altos para material premium</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-orange-400">4.</span>
              <span className="text-muted-foreground">Guarde material para cofres especiais durante eventos mensais</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-orange-400">5.</span>
              <span className="text-muted-foreground">Comunique com sua alianca para estrategias coordenadas</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
