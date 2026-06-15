import { NavLink, useLocation } from 'react-router-dom';
import {
  Home,
  CalendarDays,
  BookOpen,
  Bell,
  Award,
  User,
  Users,
  ClipboardCheck,
  ClipboardList,
  UserRound,
  MessageCircle,
  FileText,
  PartyPopper,
  ListChecks,
  Library,
  ChevronDown,
  ChevronRight,
  School,
} from 'lucide-react';
import { useRoleMenu } from '@/hooks/useRoleMenu';
import { useUIStore } from '@/store/uiStore';
import { cn } from '@/lib/utils';
import type { MenuItem } from '@/types';
import { useState } from 'react';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  home: Home,
  'calendar-days': CalendarDays,
  'book-open': BookOpen,
  bell: Bell,
  award: Award,
  user: User,
  users: Users,
  'clipboard-check': ClipboardCheck,
  'clipboard-list': ClipboardList,
  'user-round': UserRound,
  'message-circle': MessageCircle,
  'file-text': FileText,
  'party-popper': PartyPopper,
  'list-checks': ListChecks,
  library: Library,
  school: School,
};

interface MenuItemProps {
  item: MenuItem;
  collapsed: boolean;
  level?: number;
}

function MenuItemComponent({ item, collapsed, level = 0 }: MenuItemProps) {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = item.children && item.children.length > 0;
  const Icon = iconMap[item.icon] || Home;

  const isActive = (path: string) => {
    if (path === '/home') {
      return location.pathname === '/home' || location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const hasActiveChild = (children: MenuItem[]) => {
    return children.some((child) =>
      child.children ? hasActiveChild(child.children) : isActive(child.path)
    );
  };

  if (hasChildren) {
    const isChildActive = hasActiveChild(item.children!);

    return (
      <div className="mb-0.5">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200',
            collapsed ? 'justify-center' : 'justify-between',
            isChildActive
              ? 'bg-primary/10 text-primary'
              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
          )}
        >
          <div className="flex items-center gap-3">
            <Icon className="w-5 h-5 flex-shrink-0" />
            {!collapsed && <span>{item.label}</span>}
          </div>
          {!collapsed && (
            <span className="transition-transform duration-200">
              {isOpen || isChildActive ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </span>
          )}
        </button>

        {!collapsed && (isOpen || isChildActive) && (
          <div className="mt-0.5 ml-4 pl-4 border-l border-slate-200">
            {item.children!.map((child) => (
              <MenuItemComponent
                key={child.key}
                item={child}
                collapsed={collapsed}
                level={level + 1}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <NavLink
      to={item.path}
      className={({ isActive: active }) =>
        cn(
          'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 mb-0.5',
          collapsed ? 'justify-center' : '',
          active || isActive(item.path)
            ? 'bg-primary text-white shadow-md shadow-primary/25'
            : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
        )
      }
    >
      <Icon className="w-5 h-5 flex-shrink-0" />
      {!collapsed && <span>{item.label}</span>}
    </NavLink>
  );
}

export function Sidebar() {
  const { menuItems } = useRoleMenu();
  const { sidebarCollapsed } = useUIStore();

  return (
    <aside
      className={cn(
        'h-screen bg-white border-r border-slate-200 flex flex-col transition-all duration-300 sticky top-0',
        sidebarCollapsed ? 'w-20' : 'w-64'
      )}
    >
      <div className="p-4 border-b border-slate-100">
        <div
          className={cn(
            'flex items-center gap-2',
            sidebarCollapsed ? 'justify-center' : ''
          )}
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-500/30">
            <School className="w-5 h-5" />
          </div>
          {!sidebarCollapsed && (
            <div>
              <h1 className="text-lg font-bold text-slate-800 leading-tight">
                教务门户
              </h1>
              <p className="text-xs text-slate-500">EduPortal</p>
            </div>
          )}
        </div>
      </div>

      <nav className="flex-1 p-3 overflow-y-auto">
        <div className="space-y-0.5">
          {menuItems.map((item) => (
            <MenuItemComponent
              key={item.key}
              item={item}
              collapsed={sidebarCollapsed}
            />
          ))}
        </div>
      </nav>

      <div className="p-3 border-t border-slate-100">
        <div
          className={cn(
            'text-xs text-slate-400',
            sidebarCollapsed ? 'text-center' : ''
          )}
        >
          {sidebarCollapsed ? 'v1.0' : '版本 v1.0.0'}
        </div>
      </div>
    </aside>
  );
}
