import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function ChipCalculator() {
  const [chipLabLevel, setChipLabLevel] = useState(10);
  const [ssrMaterial, setSSRMaterial] = useState(400);
  const [urMaterial, setURMaterial] = useState(800);

  const productionTimes: Record<number, number> = {
    1: 14400, 2: 12600, 3: 11040, 4: 9600, 5: 8400,
    6: 7200, 7: 6300, 8: 5400, 9: 4800, 10: 4200,
    11: 3600, 12: 3300, 13: 3000, 14: 2700, 15: 2400,
    16: 2100, 17: 1800, 18: 1500, 19: 1200, 20: 900,
  };

  const baseTime = productionTimes[chipLabLevel] || 4200;
  const ssrTimeHours = (baseTime / 3600).toFixed(1);
  const urTimeHours = (baseTime * 2 / 3600).toFixed(1);

  const ssrChipsPerDay = (86400 / baseTime).toFixed(1);
  const urChipsPerDay = (86400 / (baseTime * 2)).toFixed(1);

  const ssrChipsPerWeek = (Math.floor(86400 / baseTime) * 7).toFixed(0);
  const urChipsPerWeek = (Math.floor(86400 / (baseTime * 2)) * 7).toFixed(0);

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-2xl text-orange-400">Calculadora de Producao de Chips</CardTitle>
        <CardDescription>Calcule tempo e quantidade de chips baseado no nivel do Chip Lab</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div>
            <Label className="text-foreground mb-2 block">Nivel do Chip Lab: {chipLabLevel}</Label>
            <Slider
              value={[chipLabLevel]}
              onValueChange={(value) => setChipLabLevel(value[0])}
              min={1}
              max={20}
              step={1}
              className="w-full"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-4 bg-background rounded border border-border">
            <h3 className="text-lg font-semibold text-yellow-400 mb-4">SSR Chips</h3>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-muted-foreground">Tempo de Producao</p>
                <p className="text-foreground font-bold text-lg">{ssrTimeHours} horas</p>
              </div>
              <div>
                <p className="text-muted-foreground">Chips por Dia</p>
                <p className="text-orange-300 font-bold text-lg">{ssrChipsPerDay}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Chips por Semana</p>
                <p className="text-orange-300 font-bold text-lg">{ssrChipsPerWeek}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Material Necessario</p>
                <Badge className="bg-yellow-500 text-black mt-2">{ssrMaterial} Base Material</Badge>
              </div>
            </div>
          </div>

          <div className="p-4 bg-background rounded border border-border">
            <h3 className="text-lg font-semibold text-purple-400 mb-4">UR Chips</h3>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-muted-foreground">Tempo de Producao</p>
                <p className="text-foreground font-bold text-lg">{urTimeHours} horas</p>
              </div>
              <div>
                <p className="text-muted-foreground">Chips por Dia</p>
                <p className="text-purple-300 font-bold text-lg">{urChipsPerDay}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Chips por Semana</p>
                <p className="text-purple-300 font-bold text-lg">{urChipsPerWeek}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Material Necessario</p>
                <Badge className="bg-purple-600 text-white mt-2">{urMaterial} Premium Material</Badge>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 bg-background rounded border border-border border-l-4" style={{ borderLeftColor: '#ffd700' }}>
          <h4 className="font-semibold text-yellow-400 mb-2">Dica de Otimizacao</h4>
          <p className="text-sm text-muted-foreground">
            Com Chip Lab nivel {chipLabLevel}, voce pode produzir aproximadamente {ssrChipsPerWeek} SSR chips por semana. Combine com coletas de lojas para acelerar progresso!
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
