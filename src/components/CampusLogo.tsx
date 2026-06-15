import { Sun, GraduationCap, BookMarked, School } from 'lucide-react';
import { useCampus } from '@/hooks/useCampus';
import { cn } from '@/lib/utils';
import type { LogoStyle } from '@/types';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  sun: Sun,
  'graduation-cap': GraduationCap,
  'book-marked': BookMarked,
  school: School,
};

interface CampusLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

export function CampusLogo({
  size = 'md',
  showText = true,
  className,
}: CampusLogoProps) {
  const { logo, config } = useCampus();
  const IconComponent = iconMap[logo.icon] || School;

  const sizeClasses = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-14 h-14 text-lg',
  };

  const iconSizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-7 h-7',
  };

  const getStyleClasses = (style: LogoStyle) => {
    switch (style) {
      case 'circle':
        return 'rounded-full';
      case 'shield':
        return 'rounded-xl rounded-t-[28px]';
      case 'square':
        return 'rounded-md';
      default:
        return 'rounded-full';
    }
  };

  return (
    <div className={cn('flex items-center gap-3', className)}>
      <div
        className={cn(
          'flex items-center justify-center font-bold transition-all duration-300',
          sizeClasses[size],
          getStyleClasses(logo.style)
        )}
        style={{
          backgroundColor: logo.bgColor,
          color: logo.textColor,
        }}
      >
        {size === 'sm' ? (
          <IconComponent className={iconSizeClasses[size]} />
        ) : (
          <span className="font-bold tracking-wide">{logo.text}</span>
        )}
      </div>

      {showText && (
        <div className="flex flex-col">
          <span className="font-bold text-slate-800 text-lg leading-tight">
            {config.name}
          </span>
          <span className="text-xs text-slate-500">{config.description}</span>
        </div>
      )}
    </div>
  );
}
