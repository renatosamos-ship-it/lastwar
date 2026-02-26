import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ThumbsUp, MessageCircle, Share2 } from 'lucide-react';

const communityBuilds = [
  {
    id: 1,
    author: 'ProPlayer_BR',
    title: 'Ofensiva Extrema - Dano Maximo',
    description: 'Build focada em dano puro para derrotar inimigos rapidamente',
    chips: ['Attack', 'Attack', 'Attack'],
    difficulty: 'Avancado',
    effectiveness: 'Muito Alto',
    votes: 342,
    comments: 45,
    rating: 4.8,
    bestAgainst: ['Tanques', 'Defesa'],
    worstAgainst: ['Controle', 'Atordoamento'],
  },
  {
    id: 2,
    author: 'DefenseKing',
    title: 'Tanque Imortal - Resistencia Total',
    description: 'Formacao defensiva extrema com resistencia maxima',
    chips: ['Defense', 'Defense', 'Defense'],
    difficulty: 'Basico',
    effectiveness: 'Alto',
    votes: 287,
    comments: 32,
    rating: 4.6,
    bestAgainst: ['Ofensiva', 'Dano'],
    worstAgainst: ['Controle', 'Atordoamento'],
  },
  {
    id: 3,
    author: 'BalanceSeeker',
    title: 'Versatilidade Total - Adaptavel',
    description: 'Build balanceada que se adapta a qualquer situacao',
    chips: ['Attack', 'Defense', 'Movement'],
    difficulty: 'Intermediario',
    effectiveness: 'Moderado',
    votes: 198,
    comments: 28,
    rating: 4.4,
    bestAgainst: ['Multiplos Inimigos', 'Desconhecido'],
    worstAgainst: ['Especializacoes'],
  },
  {
    id: 4,
    author: 'ControlMaster',
    title: 'Dominio Total - Atordoamento Puro',
    description: 'Formacao de controle que impede acoes inimigas',
    chips: ['Interference', 'Interference', 'Interference'],
    difficulty: 'Avancado',
    effectiveness: 'Muito Alto',
    votes: 256,
    comments: 41,
    rating: 4.7,
    bestAgainst: ['Ofensiva', 'Rapido'],
    worstAgainst: ['Defesa Pura', 'Resistencia'],
  },
  {
    id: 5,
    author: 'HybridTactics',
    title: 'Hibrido Ofensivo - Dano com Controle',
    description: 'Combina dano alto com controle para versatilidade',
    chips: ['Attack', 'Attack', 'Interference'],
    difficulty: 'Intermediario',
    effectiveness: 'Alto',
    votes: 234,
    comments: 35,
    rating: 4.5,
    bestAgainst: ['Balanceado', 'Ofensiva'],
    worstAgainst: ['Tanques', 'Defesa'],
  },
  {
    id: 6,
    author: 'SpeedDemon',
    title: 'Mobilidade Extrema - Velocidade Maxima',
    description: 'Build focada em velocidade e mobilidade',
    chips: ['Movement', 'Movement', 'Attack'],
    difficulty: 'Intermediario',
    effectiveness: 'Moderado',
    votes: 167,
    comments: 22,
    rating: 4.2,
    bestAgainst: ['Lento', 'Tanque'],
    worstAgainst: ['Controle', 'Atordoamento'],
  },
];

export default function CommunityGallery() {
  const [sortBy, setSortBy] = useState<'votes' | 'rating'>('votes');
  const [selectedBuild, setSelectedBuild] = useState<number | null>(null);

  const sortedBuilds = [...communityBuilds].sort((a, b) => {
    if (sortBy === 'votes') return b.votes - a.votes;
    return b.rating - a.rating;
  });

  return (
    <div className="space-y-6">
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-2xl text-orange-400">Galeria de Builds Comunitaria</CardTitle>
          <CardDescription>Veja as melhores formacoes criadas pela comunidade</CardDescription>
        </CardHeader>
      </Card>

      <div className="flex gap-2 mb-4">
        <Button
          onClick={() => setSortBy('votes')}
          className={`${
            sortBy === 'votes'
              ? 'bg-orange-600 text-white'
              : 'bg-background text-foreground border border-border'
          }`}
        >
          Mais Votadas
        </Button>
        <Button
          onClick={() => setSortBy('rating')}
          className={`${
            sortBy === 'rating'
              ? 'bg-orange-600 text-white'
              : 'bg-background text-foreground border border-border'
          }`}
        >
          Melhor Avaliadas
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {sortedBuilds.map(build => (
          <Card
            key={build.id}
            className="bg-card border-border cursor-pointer hover:border-orange-500 transition-all"
            onClick={() => setSelectedBuild(selectedBuild === build.id ? null : build.id)}
          >
            <CardHeader>
              <div className="flex items-start justify-between mb-2">
                <div>
                  <CardTitle className="text-lg text-orange-400">{build.title}</CardTitle>
                  <CardDescription className="text-xs">por {build.author}</CardDescription>
                </div>
                <Badge className="bg-yellow-500 text-black">{build.rating}★</Badge>
              </div>
              <p className="text-sm text-muted-foreground">{build.description}</p>
            </CardHeader>

            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-foreground mb-2 text-sm">Chips</h4>
                <div className="flex flex-wrap gap-2">
                  {build.chips.map((chip, idx) => (
                    <Badge key={idx} className="bg-background text-foreground border border-border">
                      {chip}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2 bg-background rounded border border-border">
                  <p className="text-muted-foreground">Dificuldade</p>
                  <p className="font-semibold text-foreground">{build.difficulty}</p>
                </div>
                <div className="p-2 bg-background rounded border border-border">
                  <p className="text-muted-foreground">Efetividade</p>
                  <p className="font-semibold text-green-400">{build.effectiveness}</p>
                </div>
              </div>

              {selectedBuild === build.id && (
                <div className="space-y-3 pt-3 border-t border-border">
                  <div className="grid md:grid-cols-2 gap-3">
                    <div>
                      <h4 className="font-semibold text-green-400 text-xs mb-1">Efetivo Contra</h4>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        {build.bestAgainst.map((item, idx) => (
                          <li key={idx}>• {item}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-red-400 text-xs mb-1">Fraco Contra</h4>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        {build.worstAgainst.map((item, idx) => (
                          <li key={idx}>• {item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex gap-2 pt-2 border-t border-border">
                <Button
                  size="sm"
                  className="flex-1 bg-background text-foreground border border-border hover:bg-background"
                >
                  <ThumbsUp size={16} className="mr-1" />
                  {build.votes}
                </Button>
                <Button
                  size="sm"
                  className="flex-1 bg-background text-foreground border border-border hover:bg-background"
                >
                  <MessageCircle size={16} className="mr-1" />
                  {build.comments}
                </Button>
                <Button
                  size="sm"
                  className="flex-1 bg-background text-foreground border border-border hover:bg-background"
                >
                  <Share2 size={16} />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-card border-border border-l-4" style={{ borderLeftColor: '#ffd700' }}>
        <CardHeader>
          <CardTitle className="text-yellow-400">Compartilhe Sua Build!</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Tem uma formacao que funciona muito bem? Compartilhe com a comunidade e receba votos e comentarios!
          </p>
          <Button className="bg-orange-600 text-white hover:bg-orange-700 w-full">
            Enviar Minha Build
          </Button>
        </CardContent>
      </Card>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-orange-400">Dicas para Criar uma Build Vencedora</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm">
            <li className="flex gap-3">
              <span className="font-bold text-orange-400">1.</span>
              <span className="text-muted-foreground">Escolha chips que se complementam</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-orange-400">2.</span>
              <span className="text-muted-foreground">Teste contra diferentes tipos de inimigos</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-orange-400">3.</span>
              <span className="text-muted-foreground">Documente suas taxas de vitoria</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-orange-400">4.</span>
              <span className="text-muted-foreground">Compartilhe seus resultados com a comunidade</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-orange-400">5.</span>
              <span className="text-muted-foreground">Receba feedback e melhore sua build</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
