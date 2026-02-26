import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, Share2, Copy, Check } from 'lucide-react';
import html2canvas from 'html2canvas';

interface BuildExporterProps {
  buildName: string;
  troopType: string;
  chips: Array<{
    type: string;
    rarity: string;
    level: number;
    bonus: number;
  }>;
  stats: {
    hp: number;
    atk: number;
    def: number;
    speed: number;
  };
}

export default function BuildExporter({ buildName, troopType, chips, stats }: BuildExporterProps) {
  const [copied, setCopied] = useState(false);
  const [exporting, setExporting] = useState(false);
  const buildCardRef = useRef<HTMLDivElement>(null);

  const rarityColors: Record<string, { bg: string; text: string; border: string }> = {
    R: { bg: '#80808020', text: '#808080', border: '#808080' },
    SR: { bg: '#00d9ff20', text: '#00d9ff', border: '#00d9ff' },
    SSR: { bg: '#9c27b020', text: '#9c27b0', border: '#9c27b0' },
    UR: { bg: '#ffd70020', text: '#ffd700', border: '#ffd700' },
  };

  const exportAsImage = async (format: 'png' | 'jpg') => {
    if (!buildCardRef.current) return;

    setExporting(true);
    try {
      const canvas = await html2canvas(buildCardRef.current, {
        backgroundColor: '#1a1a2e',
        scale: 2,
        logging: false,
      });

      const link = document.createElement('a');
      link.href = canvas.toDataURL(`image/${format}`);
      link.download = `${buildName.replace(/\s+/g, '-')}-build.${format}`;
      link.click();
    } catch (error) {
      console.error('Erro ao exportar imagem:', error);
    } finally {
      setExporting(false);
    }
  };

  const shareOnSocial = async (platform: string) => {
    if (!buildCardRef.current) return;

    setExporting(true);
    try {
      const canvas = await html2canvas(buildCardRef.current, {
        backgroundColor: '#1a1a2e',
        scale: 2,
        logging: false,
      });

      const imageData = canvas.toDataURL('image/png');
      const text = `Confira meu build de ${troopType}: ${buildName}\n\nStats:\nHP: ${stats.hp} | ATK: ${stats.atk} | DEF: ${stats.def} | SPD: ${stats.speed}\n\n#LastWar #ChipLab #Gaming`;

      if (platform === 'twitter') {
        const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
        window.open(twitterUrl, '_blank');
      } else if (platform === 'discord') {
        alert('Para compartilhar no Discord, copie a imagem e cole no seu servidor!');
      } else if (platform === 'whatsapp') {
        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
        window.open(whatsappUrl, '_blank');
      }
    } catch (error) {
      console.error('Erro ao compartilhar:', error);
    } finally {
      setExporting(false);
    }
  };

  const copyBuildCode = () => {
    const buildCode = `${buildName}|${troopType}|${chips.map(c => `${c.type}-${c.rarity}-${c.level}`).join(',')}`;
    navigator.clipboard.writeText(buildCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Preview da Build */}
      <div
        ref={buildCardRef}
        className="p-8 rounded-lg border-2 border-orange-500"
        style={{ backgroundColor: '#1a1a2e' }}
      >
        <div className="space-y-6">
          {/* Header */}
          <div className="border-b border-orange-500 pb-4">
            <h2 className="text-3xl font-bold text-orange-400 mb-2">{buildName}</h2>
            <Badge className="bg-purple-600 text-white px-3 py-1">{troopType}</Badge>
          </div>

          {/* Chips Grid */}
          <div>
            <h3 className="text-lg font-semibold text-yellow-400 mb-3">Chips Equipados</h3>
            <div className="grid grid-cols-2 gap-3">
              {chips.map((chip, idx) => {
                const rarity = rarityColors[chip.rarity] || rarityColors.R;
                return (
                  <div
                    key={idx}
                    className="p-3 rounded border-2"
                    style={{
                      borderColor: rarity.border,
                      backgroundColor: rarity.bg,
                    }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-foreground">{chip.type}</span>
                      <span style={{ color: rarity.text }} className="font-bold">
                        {chip.rarity}
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      <p>Nível: {chip.level}</p>
                      <p>Bonus: +{chip.bonus}%</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Stats */}
          <div>
            <h3 className="text-lg font-semibold text-yellow-400 mb-3">Stats Totais</h3>
            <div className="grid grid-cols-4 gap-2">
              <div className="p-3 bg-background rounded border border-border text-center">
                <p className="text-xs text-muted-foreground mb-1">HP</p>
                <p className="text-xl font-bold text-green-400">{stats.hp}</p>
              </div>
              <div className="p-3 bg-background rounded border border-border text-center">
                <p className="text-xs text-muted-foreground mb-1">ATK</p>
                <p className="text-xl font-bold text-red-400">{stats.atk}</p>
              </div>
              <div className="p-3 bg-background rounded border border-border text-center">
                <p className="text-xs text-muted-foreground mb-1">DEF</p>
                <p className="text-xl font-bold text-blue-400">{stats.def}</p>
              </div>
              <div className="p-3 bg-background rounded border border-border text-center">
                <p className="text-xs text-muted-foreground mb-1">SPD</p>
                <p className="text-xl font-bold text-cyan-400">{stats.speed}</p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-orange-500 pt-4 text-center">
            <p className="text-sm text-muted-foreground">Guia Prático: Chips de Combate LastWar</p>
          </div>
        </div>
      </div>

      {/* Controles de Exportação */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-orange-400">Exportar e Compartilhar</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Opções de Download */}
          <div>
            <h4 className="font-semibold text-foreground mb-3">Baixar Imagem</h4>
            <div className="flex gap-2 flex-wrap">
              <Button
                onClick={() => exportAsImage('png')}
                disabled={exporting}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Download size={16} className="mr-2" />
                {exporting ? 'Exportando...' : 'PNG'}
              </Button>
              <Button
                onClick={() => exportAsImage('jpg')}
                disabled={exporting}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Download size={16} className="mr-2" />
                {exporting ? 'Exportando...' : 'JPG'}
              </Button>
            </div>
          </div>

          {/* Compartilhamento em Redes Sociais */}
          <div>
            <h4 className="font-semibold text-foreground mb-3">Compartilhar nas Redes</h4>
            <div className="flex gap-2 flex-wrap">
              <Button
                onClick={() => shareOnSocial('twitter')}
                disabled={exporting}
                className="bg-sky-500 hover:bg-sky-600"
              >
                <Share2 size={16} className="mr-2" />
                Twitter
              </Button>
              <Button
                onClick={() => shareOnSocial('discord')}
                disabled={exporting}
                className="bg-indigo-600 hover:bg-indigo-700"
              >
                <Share2 size={16} className="mr-2" />
                Discord
              </Button>
              <Button
                onClick={() => shareOnSocial('whatsapp')}
                disabled={exporting}
                className="bg-green-600 hover:bg-green-700"
              >
                <Share2 size={16} className="mr-2" />
                WhatsApp
              </Button>
            </div>
          </div>

          {/* Copiar Código da Build */}
          <div>
            <h4 className="font-semibold text-foreground mb-3">Código da Build</h4>
            <div className="flex gap-2">
              <div className="flex-1 p-3 bg-background rounded border border-border text-sm text-muted-foreground overflow-x-auto">
                {buildName}|{troopType}|{chips.map(c => `${c.type}-${c.rarity}-${c.level}`).join(',')}
              </div>
              <Button
                onClick={copyBuildCode}
                variant="outline"
                className="border-border hover:bg-background"
              >
                {copied ? (
                  <>
                    <Check size={16} className="mr-2 text-green-400" />
                    Copiado!
                  </>
                ) : (
                  <>
                    <Copy size={16} className="mr-2" />
                    Copiar
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
