import { useState } from 'react';
import {
  Bell,
  Search,
  ChevronDown,
  Menu,
  User,
  LogOut,
  Settings,
  Building2,
} from 'lucide-react';
import { CampusLogo } from '@/components/CampusLogo';
import { useCampus } from '@/hooks/useCampus';
import { useRoleMenu } from '@/hooks/useRoleMenu';
import { useUIStore } from '@/store/uiStore';
import { cn } from '@/lib/utils';
import type { CampusId, UserRole } from '@/types';
import { getAllCampusConfigs } from '@/utils/configLoader';

const roleLabels: Record<UserRole, string> = {
  teacher: '教师',
  parent: '家长',
  student: '学生',
};

export function Header() {
  const { campusId, config, switchCampus } = useCampus();
  const { user, role, switchRole } = useRoleMenu();
  const { toggleSidebar, sidebarCollapsed } = useUIStore();
  const [showCampusMenu, setShowCampusMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showRoleMenu, setShowRoleMenu] = useState(false);

  const campusList = getAllCampusConfigs();

  return (
    <header
      className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 lg:px-6 sticky top-0 z-40"
      style={{ backgroundColor: config.theme.surfaceColor }}
    >
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-lg hover:bg-slate-100 transition-colors lg:hidden"
        >
          <Menu className="w-5 h-5 text-slate-600" />
        </button>

        <button
          onClick={toggleSidebar}
          className="p-2 rounded-lg hover:bg-slate-100 transition-colors hidden lg:block"
          title={sidebarCollapsed ? '展开侧边栏' : '收起侧边栏'}
        >
          <Menu className="w-5 h-5 text-slate-600" />
        </button>

        <div className="hidden md:block">
          <CampusLogo size="md" showText={true} />
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="搜索..."
            className="pl-9 pr-4 py-2 w-48 lg:w-64 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
          />
        </div>

        <div className="relative">
          <button
            onClick={() => {
              setShowCampusMenu(!showCampusMenu);
              setShowUserMenu(false);
              setShowRoleMenu(false);
            }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-slate-100 transition-colors"
            style={{ backgroundColor: `${config.theme.primaryColor}10` }}
          >
            <Building2
              className="w-4 h-4"
              style={{ color: config.theme.primaryColor }}
            />
            <span
              className="text-sm font-medium hidden sm:inline"
              style={{ color: config.theme.primaryColor }}
            >
              {config.name}
            </span>
            <ChevronDown className="w-4 h-4 text-slate-500" />
          </button>

          {showCampusMenu && (
            <div className="absolute right-0 top-full mt-1 w-56 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50">
              <div className="px-3 py-2 text-xs font-medium text-slate-400 uppercase tracking-wider">
                切换校区
              </div>
              {campusList.map((campus) => (
                <button
                  key={campus.id}
                  onClick={() => {
                    switchCampus(campus.id as CampusId);
                    setShowCampusMenu(false);
                  }}
                  className={cn(
                    'w-full flex items-center gap-3 px-3 py-2.5 text-left hover:bg-slate-50 transition-colors',
                    campusId === campus.id ? 'bg-slate-50' : ''
                  )}
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold"
                    style={{ backgroundColor: campus.theme.primaryColor }}
                  >
                    {campus.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <div
                      className="text-sm font-medium"
                      style={{
                        color:
                          campusId === campus.id
                            ? campus.theme.primaryColor
                            : '#1e293b',
                      }}
                    >
                      {campus.name}
                    </div>
                    <div className="text-xs text-slate-500">
                      {campus.description}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="relative">
          <button
            onClick={() => {
              setShowRoleMenu(!showRoleMenu);
              setShowCampusMenu(false);
              setShowUserMenu(false);
            }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-slate-100 transition-colors border border-slate-200"
          >
            <User className="w-4 h-4 text-slate-600" />
            <span className="text-sm font-medium text-slate-700 hidden sm:inline">
              {role ? roleLabels[role] : '角色'}
            </span>
            <ChevronDown className="w-4 h-4 text-slate-500" />
          </button>

          {showRoleMenu && (
            <div className="absolute right-0 top-full mt-1 w-40 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50">
              <div className="px-3 py-2 text-xs font-medium text-slate-400 uppercase tracking-wider">
                切换角色
              </div>
              {(['teacher', 'parent', 'student'] as UserRole[]).map((r) => (
                <button
                  key={r}
                  onClick={() => {
                    switchRole(r);
                    setShowRoleMenu(false);
                  }}
                  className={cn(
                    'w-full text-left px-3 py-2 text-sm hover:bg-slate-50 transition-colors',
                    role === r ? 'text-primary font-medium bg-slate-50' : 'text-slate-700'
                  )}
                >
                  {roleLabels[r]}
                </button>
              ))}
            </div>
          )}
        </div>

        <button className="relative p-2 rounded-lg hover:bg-slate-100 transition-colors">
          <Bell className="w-5 h-5 text-slate-600" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        <div className="relative">
          <button
            onClick={() => {
              setShowUserMenu(!showUserMenu);
              setShowCampusMenu(false);
              setShowRoleMenu(false);
            }}
            className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium"
              style={{ backgroundColor: config.theme.primaryColor }}
            >
              {user?.name?.charAt(0) || 'U'}
            </div>
            <span className="text-sm font-medium text-slate-700 hidden md:inline">
              {user?.name || '用户'}
            </span>
            <ChevronDown className="w-4 h-4 text-slate-500 hidden md:block" />
          </button>

          {showUserMenu && (
            <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50">
              <div className="px-3 py-3 border-b border-slate-100">
                <div className="text-sm font-medium text-slate-800">
                  {user?.name || '用户'}
                </div>
                <div className="text-xs text-slate-500">
                  {role ? roleLabels[role] : ''} · {config.name}
                </div>
              </div>
              <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors">
                <User className="w-4 h-4" />
                个人中心
              </button>
              <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors">
                <Settings className="w-4 h-4" />
                设置
              </button>
              <div className="border-t border-slate-100 my-1" />
              <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors">
                <LogOut className="w-4 h-4" />
                退出登录
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
