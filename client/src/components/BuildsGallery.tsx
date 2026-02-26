import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Heart, Share2, Download } from 'lucide-react';

interface Build {
  id: string;
  name: string;
  author: string;
  squadName: string;
  heroes: Array<{
    name: string;
    chips: string[];
  }>;
  stats: { hp: number; atk: number; def: number; speed: number };
  likes: number;
  downloads: number;
  createdAt: string;
}

const sampleBuilds: Build[] = [
  {
    id: '1',
    name: 'Tank Defensivo Pro',
    author: 'LastWarMaster',
    squadName: 'Defesa Absoluta',
    heroes: [
      { name: 'Tanque Delta', chips: ['Defense', 'Defense'] },
      { name: 'Paladino Zeta', chips: ['Defense', 'Interference'] },
      { name: 'Guerreiro Beta', chips: ['Interference'] },
    ],
    stats: { hp: 1350, atk: 300, def: 700, speed: 100 },
    likes: 245,
    downloads: 128,
    createdAt: '2026-02-20',
  },
  {
    id: '2',
    name: 'Rocket Agressivo',
    author: 'ChipExpert',
    squadName: 'Ataque Devastador',
    heroes: [
      { name: 'Arqueira Epsilon', chips: ['Attack', 'Attack'] },
      { name: 'Mago Gama', chips: ['Attack', 'Movement'] },
      { name: 'Guerreiro Beta', chips: ['Attack'] },
    ],
    stats: { hp: 600, atk: 1040, def: 200, speed: 125 },
    likes: 189,
    downloads: 95,
    createdAt: '2026-02-19',
  },
  {
    id: '3',
    name: 'Aircraft Equilibrado',
    author: 'StrategyGamer',
    squadName: 'Velocidade Aerea',
    heroes: [
      { name: 'Comandante Alpha', chips: ['Movement', 'Interference'] },
      { name: 'Mago Gama', chips: ['Movement', 'Attack'] },
      { name: 'Arqueira Epsilon', chips: ['Movement'] },
    ],
    stats: { hp: 540, atk: 690, def: 165, speed: 150 },
    likes: 156,
    downloads: 72,
    createdAt: '2026-02-18',
  },
  {
    id: '4',
    name: 'Formacao Mista Balanceada',
    author: 'ProPlayer',
    squadName: 'Equilibrio Perfeito',
    heroes: [
      { name: 'Tanque Delta', chips: ['Defense', 'Interference'] },
      { name: 'Guerreiro Beta', chips: ['Attack', 'Movement'] },
      { name: 'Paladino Zeta', chips: ['Defense', 'Attack'] },
    ],
    stats: { hp: 2490, atk: 2030, def: 1065, speed: 375 },
    likes: 312,
    downloads: 201,
    createdAt: '2026-02-17',
  },
  {
    id: '5',
    name: 'Build Speedrun',
    author: 'FastRunner',
    squadName: 'Velocidade Maxima',
    heroes: [
      { name: 'Arqueira Epsilon', chips: ['Movement', 'Movement'] },
      { name: 'Mago Gama', chips: ['Movement'] },
      { name: 'Comandante Alpha', chips: ['Movement'] },
    ],
    stats: { hp: 400, atk: 600, def: 150, speed: 200 },
    likes: 98,
    downloads: 45,
    createdAt: '2026-02-16',
  },
  {
    id: '6',
    name: 'Defesa Impenetravel',
    author: 'TankMaster',
    squadName: 'Muralha Viva',
    heroes: [
      { name: 'Tanque Delta', chips: ['Defense', 'Defense'] },
      { name: 'Paladino Zeta', chips: ['Defense', 'Defense'] },
      { name: 'Guerreiro Beta', chips: ['Defense'] },
    ],
    stats: { hp: 1620, atk: 300, def: 850, speed: 100 },
    likes: 267,
    downloads: 156,
    createdAt: '2026-02-15',
  },
];

export default function BuildsGallery() {
  const [likedBuilds, setLikedBuilds] = useState<Set<string>>(new Set());
  const [sortBy, setSortBy] = useState<'likes' | 'downloads' | 'recent'>('likes');

  const toggleLike = (buildId: string) => {
    const newLiked = new Set(likedBuilds);
    if (newLiked.has(buildId)) {
      newLiked.delete(buildId);
    } else {
      newLiked.add(buildId);
    }
    setLikedBuilds(newLiked);
  };

  const sortedBuilds = [...sampleBuilds].sort((a, b) => {
    if (sortBy === 'likes') return b.likes - a.likes;
    if (sortBy === 'downloads') return b.downloads - a.downloads;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const chipColors: Record<string, string> = {
    'Movement': '#00d9ff',
    'Attack': '#ff6f00',
    'Interference': '#9c27b0',
    'Defense': '#ffd700',
  };

  return (
    <div className="space-y-6">
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-orange-400">Galeria de Builds Comunitaria</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 flex-wrap">
            <Button
              onClick={() => setSortBy('likes')}
              variant={sortBy === 'likes' ? 'default' : 'outline'}
              className={sortBy === 'likes' ? 'bg-orange-600' : 'border-border'}
            >
              Mais Populares
            </Button>
            <Button
              onClick={() => setSortBy('downloads')}
              variant={sortBy === 'downloads' ? 'default' : 'outline'}
              className={sortBy === 'downloads' ? 'bg-orange-600' : 'border-border'}
            >
              Mais Baixados
            </Button>
            <Button
              onClick={() => setSortBy('recent')}
              variant={sortBy === 'recent' ? 'default' : 'outline'}
              className={sortBy === 'recent' ? 'bg-orange-600' : 'border-border'}
            >
              Recentes
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        {sortedBuilds.map(build => (
          <Card key={build.id} className="bg-card border-border hover:border-orange-400 transition-colors">
            <CardHeader>
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <CardTitle className="text-lg text-orange-400">{build.name}</CardTitle>
                  <p className="text-xs text-muted-foreground">por {build.author}</p>
                  <p className="text-xs text-yellow-400 font-semibold mt-1">Esquadrao: {build.squadName}</p>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Herois e Chips */}
              <div>
                <p className="text-xs font-semibold text-muted-foreground mb-3">HEROIS E CHIPS</p>
                <div className="space-y-2">
                  {build.heroes.map((hero, idx) => (
                    <div key={idx} className="p-2 bg-background rounded border border-border">
                      <p className="text-xs font-semibold text-foreground mb-1">{hero.name}</p>
                      <div className="flex flex-wrap gap-1">
                        {hero.chips.map((chip, chipIdx) => (
                          <Badge
                            key={chipIdx}
                            className="text-xs"
                            style={{
                              backgroundColor: (chipColors[chip] || '#808080') + '30',
                              color: chipColors[chip] || '#808080',
                            }}
                          >
                            {chip}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div>
                <p className="text-xs font-semibold text-muted-foreground mb-2">STATS TOTAIS</p>
                <div className="grid grid-cols-4 gap-2">
                  <div className="p-2 bg-background rounded border border-border text-center">
                    <p className="text-xs text-muted-foreground">HP</p>
                    <p className="text-sm font-bold text-green-400">{build.stats.hp}</p>
                  </div>
                  <div className="p-2 bg-background rounded border border-border text-center">
                    <p className="text-xs text-muted-foreground">ATK</p>
                    <p className="text-sm font-bold text-red-400">{build.stats.atk}</p>
                  </div>
                  <div className="p-2 bg-background rounded border border-border text-center">
                    <p className="text-xs text-muted-foreground">DEF</p>
                    <p className="text-sm font-bold text-blue-400">{build.stats.def}</p>
                  </div>
                  <div className="p-2 bg-background rounded border border-border text-center">
                    <p className="text-xs text-muted-foreground">SPD</p>
                    <p className="text-sm font-bold text-cyan-400">{build.stats.speed}</p>
                  </div>
                </div>
              </div>

              {/* Engagement */}
              <div className="flex items-center justify-between pt-2 border-t border-border">
                <div className="flex gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Heart size={14} className={likedBuilds.has(build.id) ? 'fill-red-500 text-red-500' : ''} />
                    {build.likes + (likedBuilds.has(build.id) ? 1 : 0)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Download size={14} />
                    {build.downloads}
                  </span>
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={() => toggleLike(build.id)}
                    size="sm"
                    variant="outline"
                    className={`border-border ${likedBuilds.has(build.id) ? 'bg-red-500 text-white' : ''}`}
                  >
                    <Heart size={14} className={likedBuilds.has(build.id) ? 'fill-white' : ''} />
                  </Button>
                  <Button
                    size="sm"
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <Share2 size={14} className="mr-1" />
                    Copiar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-background border-border border-l-4" style={{ borderLeftColor: '#ff6f00' }}>
        <CardHeader>
          <CardTitle className="text-orange-400">Compartilhe Sua Build!</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Crie sua build no Simulador de Formacao e exporte como imagem para compartilhar com a comunidade. Quanto mais pessoas usarem sua build, mais votos ela recebe!
          </p>
          <Button className="bg-orange-600 hover:bg-orange-700 text-white">
            Ir para Simulador
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
