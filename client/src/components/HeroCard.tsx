import { Badge } from '@/components/ui/badge';
import { Hero } from '@shared/heroes';
import { getHeroImage } from '@/data/heroImages';
import { Zap, Shield, Sword } from 'lucide-react';

interface HeroCardProps {
  hero: Hero;
  onClick?: () => void;
  isSelected?: boolean;
}

export default function HeroCard({ hero, onClick, isSelected }: HeroCardProps) {
  // Ícone baseado no papel
  const getRoleIcon = () => {
    switch (hero.role) {
      case 'Defesa':
        return <Shield className="w-8 h-8" />;
      case 'Dano':
        return <Sword className="w-8 h-8" />;
      case 'Suporte':
        return <Zap className="w-8 h-8" />;
      default:
        return null;
    }
  };

  // Cor de fundo baseada no tipo
  const getTypeColor = () => {
    switch (hero.type) {
      case 'Tanque':
        return 'from-blue-600 to-blue-900';
      case 'Aeronave':
        return 'from-cyan-600 to-cyan-900';
      case 'Míssil':
        return 'from-orange-600 to-orange-900';
      default:
        return 'from-purple-600 to-purple-900';
    }
  };

  // Cor do ícone baseada na raridade
  const getIconColor = () => {
    switch (hero.rarity) {
      case 'UR':
        return 'text-yellow-300';
      case 'SSR':
        return 'text-purple-300';
      case 'SR':
        return 'text-blue-300';
      default:
        return 'text-gray-300';
    }
  };

  return (
    <div
      onClick={onClick}
      className={`p-4 bg-background rounded border-2 transition-all text-left cursor-pointer ${
        isSelected
          ? 'border-orange-400 bg-orange-400/10 shadow-lg shadow-orange-400/20'
          : 'border-border hover:border-orange-400 hover:shadow-lg hover:shadow-orange-400/10'
      }`}
    >
      {/* Placeholder Atraente */}
      <div className={`w-full h-32 bg-gradient-to-br ${getTypeColor()} rounded mb-3 flex flex-col items-center justify-center overflow-hidden relative group`}>
        {/* Overlay gradiente */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/20" />
        
        {/* Conteúdo */}
        <div className="relative z-10 flex flex-col items-center justify-center gap-3">
          <div className={`${getIconColor()} drop-shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
            {getRoleIcon()}
          </div>
          <div className="text-center">
            <p className="text-xs text-white font-bold drop-shadow-md">{hero.type}</p>
            <p className="text-xs text-white/80 drop-shadow-md">{hero.role}</p>
          </div>
        </div>
      </div>

      {/* Nome do Herói */}
      <h4 className="font-semibold text-foreground truncate mb-2">{hero.name}</h4>

      {/* Badges */}
      <div className="flex gap-2 flex-wrap">
        {/* Raridade */}
        <Badge
          className={`text-xs font-bold ${
            hero.rarity === 'UR'
              ? 'bg-yellow-600 text-yellow-950'
              : hero.rarity === 'SSR'
              ? 'bg-purple-600 text-purple-950'
              : hero.rarity === 'SR'
              ? 'bg-blue-600 text-blue-950'
              : 'bg-gray-600 text-gray-950'
          }`}
        >
          {hero.rarity}
        </Badge>

        {/* Papel */}
        <Badge
          variant="outline"
          className="text-xs"
        >
          {hero.role}
        </Badge>
      </div>

      {/* Tipo como texto pequeno */}
      <p className="text-xs text-muted-foreground mt-2">{hero.type}</p>
    </div>
  );
}
