import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronDown } from 'lucide-react';

const faqItems = [
  {
    id: 'chips-not-equip',
    question: 'Por que meus chips nao equipam nas tropas?',
    category: 'Equipamento',
    severity: 'Alto',
    answer: 'Existem varios motivos pelos quais chips nao equipam:',
    solutions: [
      'Verifique se o nivel da tropa eh suficiente (precisa estar no nivel minimo)',
      'Confirme se voce tem o chip na sua bolsa (nao em producao)',
      'Verifique se o slot ja nao esta ocupado por outro chip',
      'Tente reiniciar o jogo e tentar novamente',
      'Se o problema persistir, entre em contato com o suporte',
    ],
  },
  {
    id: 'slow-production',
    question: 'Por que a producao de chips eh tao lenta?',
    category: 'Producao',
    severity: 'Medio',
    answer: 'A velocidade de producao depende do nivel do seu Chip Lab:',
    solutions: [
      'Nivel 1-5: ~4 horas por chip (SSR)',
      'Nivel 10: ~2 horas por chip (SSR)',
      'Nivel 15: ~1.2 horas por chip (SSR)',
      'Nivel 20: ~30 minutos por chip (SSR)',
      'Aumente o nivel do Chip Lab para acelerar a producao',
      'Use bonus de producao durante eventos',
    ],
  },
  {
    id: 'no-material',
    question: 'Onde consigo material para produzir chips?',
    category: 'Material',
    severity: 'Alto',
    answer: 'Existem varias formas de obter material para chips:',
    solutions: [
      'Alliance Shop: Ate 5 Rare Chests por semana',
      'Campaign Shop: 1 Epic Chest por semana',
      'Alliance Duel: Material premium por pontos',
      'Zombie Invasion: Recompensas especiais',
      'Ghost Ops: Eventos especiais com material',
      'Coleta diaria nas lojas',
    ],
  },
  {
    id: 'chip-stats-low',
    question: 'Por que meus chips dao pouco bonus?',
    category: 'Stats',
    severity: 'Medio',
    answer: 'O bonus dos chips depende de varios fatores:',
    solutions: [
      'Raridade do chip: R < SR < SSR < UR',
      'Nivel do Chip Lab: Chips de nivel maior dao mais bonus',
      'Compatibilidade: Chips devem combinar com o tipo de tropa',
      'Quantidade: Quanto mais chips, maior o bonus total',
      'Upgrade chips para raridade mais alta para mais bonus',
    ],
  },
  {
    id: 'cant-unlock-chiplab',
    question: 'Como desbloquear o Chip Lab?',
    category: 'Desbloqueio',
    severity: 'Baixo',
    answer: 'O Chip Lab eh desbloqueado automaticamente no dia 80 do jogo:',
    solutions: [
      'Espere ate o dia 80 para desbloquear automaticamente',
      'Verifique se ja passou o dia 80 (pode estar em construcao)',
      'Se nao aparecer, tente reiniciar o jogo',
      'Verifique se voce tem espaco na sua base para construir',
      'Entre em contato com o suporte se o problema persistir',
    ],
  },
  {
    id: 'chip-disappeared',
    question: 'Meu chip desapareceu! O que fazer?',
    category: 'Bug',
    severity: 'Alto',
    answer: 'Se um chip desapareceu, tente os seguintes passos:',
    solutions: [
      'Verifique se o chip foi equipado em uma tropa',
      'Procure na bolsa de chips (pode estar em outro lugar)',
      'Verifique o historico de producao',
      'Tente sincronizar o jogo (desligar e ligar)',
      'Se ainda nao encontrar, entre em contato com o suporte com detalhes',
    ],
  },
  {
    id: 'low-win-rate',
    question: 'Minha taxa de vitoria eh muito baixa, o que fazer?',
    category: 'Estrategia',
    severity: 'Medio',
    answer: 'Se voce esta perdendo muitas batalhas, considere:',
    solutions: [
      'Use o Sistema de Recomendacoes para descobrir melhor build',
      'Aumente o nivel do seu Chip Lab para chips mais fortes',
      'Coleta mais material para chips de raridade mais alta',
      'Estude as Estrategias Avancadas para melhorar tatica',
      'Veja a Galeria de Builds para inspiracao',
      'Teste diferentes combinacoes de chips',
    ],
  },
  {
    id: 'production-stuck',
    question: 'Minha producao ficou travada, como resolver?',
    category: 'Bug',
    severity: 'Alto',
    answer: 'Se a producao ficou travada, tente:',
    solutions: [
      'Aguarde alguns minutos (pode estar processando)',
      'Tente reiniciar o jogo completamente',
      'Verifique sua conexao com a internet',
      'Limpe o cache do jogo (configuracoes)',
      'Se persistir, entre em contato com o suporte',
    ],
  },
];

export default function Troubleshooting() {
  const [expandedId, setExpandedId] = useState<string | null>('chips-not-equip');
  const [filterCategory, setFilterCategory] = useState<string | null>(null);

  const categories = Array.from(new Set(faqItems.map(item => item.category)));
  const filteredItems = filterCategory
    ? faqItems.filter(item => item.category === filterCategory)
    : faqItems;

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Alto':
        return 'bg-red-600 text-white';
      case 'Medio':
        return 'bg-yellow-600 text-white';
      case 'Baixo':
        return 'bg-green-600 text-white';
      default:
        return 'bg-gray-600 text-white';
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-2xl text-orange-400">Guia de Troubleshooting</CardTitle>
          <CardDescription>Encontre respostas para problemas comuns</CardDescription>
        </CardHeader>
      </Card>

      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={() => setFilterCategory(null)}
          className={`px-4 py-2 rounded border transition-all ${
            filterCategory === null
              ? 'bg-orange-600 text-white border-orange-600'
              : 'bg-background text-foreground border-border border'
          }`}
        >
          Todas
        </button>
        {categories.map((category: string) => (
          <button
            key={category}
            onClick={() => setFilterCategory(category)}
            className={`px-4 py-2 rounded border transition-all ${
              filterCategory === category
                ? 'bg-orange-600 text-white border-orange-600'
                : 'bg-background text-foreground border-border border'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filteredItems.map(item => {
          const isExpanded = expandedId === item.id;

          return (
            <Card
              key={item.id}
              className="bg-card border-border cursor-pointer hover:border-orange-500 transition-all"
              onClick={() => setExpandedId(isExpanded ? null : item.id)}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1">
                    <ChevronDown
                      size={20}
                      className={`text-orange-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                    />
                    <div>
                      <CardTitle className="text-lg text-foreground">{item.question}</CardTitle>
                      <CardDescription className="text-xs mt-1">{item.category}</CardDescription>
                    </div>
                  </div>
                  <Badge className={getSeverityColor(item.severity)}>{item.severity}</Badge>
                </div>
              </CardHeader>

              {isExpanded && (
                <CardContent className="space-y-4 border-t border-border pt-4">
                  <p className="text-foreground font-semibold">{item.answer}</p>

                  <div className="space-y-2">
                    {item.solutions.map((solution, idx) => (
                      <div key={idx} className="flex gap-3 p-3 bg-background rounded border border-border">
                        <span className="font-bold text-orange-400 flex-shrink-0">{idx + 1}.</span>
                        <p className="text-sm text-muted-foreground">{solution}</p>
                      </div>
                    ))}
                  </div>

                  <div className="p-3 bg-background rounded border border-border border-l-4" style={{ borderLeftColor: '#9c27b0' }}>
                    <p className="text-xs text-muted-foreground">
                      Se o problema persistir apos tentar estas solucoes, entre em contato com o suporte do jogo com detalhes do problema.
                    </p>
                  </div>
                </CardContent>
              )}
            </Card>
          );
        })}
      </div>

      <Card className="bg-card border-border border-l-4" style={{ borderLeftColor: '#ffd700' }}>
        <CardHeader>
          <CardTitle className="text-yellow-400">Nao encontrou sua resposta?</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Se voce nao encontrou a resposta para seu problema, tente:
          </p>
          <ul className="space-y-2 text-sm">
            <li className="flex gap-3">
              <span className="font-bold text-orange-400">1.</span>
              <span className="text-muted-foreground">Procure no forum da comunidade</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-orange-400">2.</span>
              <span className="text-muted-foreground">Entre em contato com o suporte oficial</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-orange-400">3.</span>
              <span className="text-muted-foreground">Verifique o site lastwar-tutorial.com</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-orange-400">4.</span>
              <span className="text-muted-foreground">Pergunte em grupos da comunidade</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
