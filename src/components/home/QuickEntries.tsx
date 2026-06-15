import { useCampus } from '@/hooks/useCampus';
import {
  CalendarDays,
  BookOpen,
  Bell,
  Award,
  ClipboardCheck,
  PartyPopper,
  FileText,
  Library,
  ListChecks,
  User,
  ClipboardList,
  Users,
  MessageCircle,
  UserRound,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  'calendar-days': CalendarDays,
  'book-open': BookOpen,
  bell: Bell,
  award: Award,
  'clipboard-check': ClipboardCheck,
  'party-popper': PartyPopper,
  'file-text': FileText,
  library: Library,
  'list-checks': ListChecks,
  user: User,
  'clipboard-list': ClipboardList,
  users: Users,
  'message-circle': MessageCircle,
  'user-round': UserRound,
};

export function QuickEntries() {
  const { homeModules, theme } = useCampus();
  const navigate = useNavigate();
  const entries = homeModules.quickEntries;

  return (
    <div className="grid grid-cols-3 md:grid-cols-6 gap-3 md:gap-4">
      {entries.map((entry, index) => {
        const Icon = iconMap[entry.icon] || BookOpen;

        return (
          <button
            key={entry.key}
            onClick={() => navigate(entry.path)}
            className={cn(
              'group flex flex-col items-center gap-2 p-4 transition-all duration-300 hover:-translate-y-1',
              'bg-white border border-slate-100 hover:shadow-lg'
            )}
            style={{
              borderRadius: theme.cardRadius,
              boxShadow: theme.shadowSize,
              animationDelay: `${index * 50}ms`,
            }}
          >
            <div
              className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-110"
              style={{
                backgroundColor: `${theme.primaryColor}15`,
                color: theme.primaryColor,
              }}
            >
              <Icon className="w-6 h-6 md:w-7 md:h-7" />
            </div>
            <span className="text-xs md:text-sm font-medium text-slate-700 text-center">
              {entry.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
