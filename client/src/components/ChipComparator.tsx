import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const chipStats = {
  R: { name: 'R (Uncommon)', color: '#808080', statBoost: 5, production: 'Basico', cost: 'Baixo' },
  SR: { name: 'SR (Rare)', color: '#00d9ff', statBoost: 15, production: 'Intermediario', cost: 'Medio' },
  SSR: { name: 'SSR (Epic)', color: '#9c27b0', statBoost: 35, production: 'Nivel 5+', cost: '400 Material' },
  UR: { name: 'UR (Legendary)', color: '#ffd700', statBoost: 60, production: 'Nivel 15+', cost: '800 Material' },
};

export default function ChipComparator() {
  const [chip1, setChip1] = useState<keyof typeof chipStats>('SSR');
  const [chip2, setChip2] = useState<keyof typeof chipStats>('UR');

  const stats1 = chipStats[chip1];
  const stats2 = chipStats[chip2];

  const difference = stats2.statBoost - stats1.statBoost;
  const percentIncrease = ((difference / stats1.statBoost) * 100).toFixed(1);

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-2xl text-orange-400">Comparador de Chips</CardTitle>
        <CardDescription>Compare stats entre diferentes raridades de chips</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <label className="text-foreground font-semibold">Chip 1</label>
            <Select value={chip1} onValueChange={(value: any) => setChip1(value)}>
              <SelectTrigger className="bg-background border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-background border-border">
                {Object.entries(chipStats).map(([key, value]) => (
                  <SelectItem key={key} value={key}>
                    {value.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <label className="text-foreground font-semibold">Chip 2</label>
            <Select value={chip2} onValueChange={(value: any) => setChip2(value)}>
              <SelectTrigger className="bg-background border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-background border-border">
                {Object.entries(chipStats).map(([key, value]) => (
                  <SelectItem key={key} value={key}>
                    {value.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-4 bg-background rounded border-2" style={{ borderColor: stats1.color }}>
            <h3 className="text-lg font-bold mb-4" style={{ color: stats1.color }}>
              {stats1.name}
            </h3>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-muted-foreground">Boost de Stats</p>
                <p className="text-foreground font-bold text-lg">+{stats1.statBoost}%</p>
              </div>
              <div>
                <p className="text-muted-foreground">Producao</p>
                <p className="text-foreground">{stats1.production}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Custo</p>
                <Badge className="mt-2" style={{ backgroundColor: stats1.color + '30' }}>
                  {stats1.cost}
                </Badge>
              </div>
            </div>
          </div>

          <div className="p-4 bg-background rounded border-2" style={{ borderColor: stats2.color }}>
            <h3 className="text-lg font-bold mb-4" style={{ color: stats2.color }}>
              {stats2.name}
            </h3>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-muted-foreground">Boost de Stats</p>
                <p className="text-foreground font-bold text-lg">+{stats2.statBoost}%</p>
              </div>
              <div>
                <p className="text-muted-foreground">Producao</p>
                <p className="text-foreground">{stats2.production}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Custo</p>
                <Badge className="mt-2" style={{ backgroundColor: stats2.color + '30' }}>
                  {stats2.cost}
                </Badge>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 bg-background rounded border border-border">
          <h4 className="font-semibold text-orange-400 mb-3">Analise Comparativa</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Diferenca de Boost</span>
              <span className="text-foreground font-bold">
                {difference > 0 ? '+' : ''}{difference}%
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Aumento Percentual</span>
              <span className="text-foreground font-bold">{percentIncrease}%</span>
            </div>
            <div className="pt-2 border-t border-border">
              <p className="text-muted-foreground">
                {chip2} oferece {percentIncrease}% mais boost que {chip1}.
                {difference > 30 ? ' Considere investir em chips de raridade mais alta!' : ' A diferenca eh moderada.'}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
