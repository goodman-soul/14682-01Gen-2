import { QuickEntries } from '@/components/home/QuickEntries';
import { NoticePanel } from '@/components/home/NoticePanel';
import { SchedulePreview } from '@/components/home/SchedulePreview';
import { ModuleErrorBoundary } from '@/components/ModuleErrorBoundary';
import { useCampus } from '@/hooks/useCampus';
import { useRoleMenu } from '@/hooks/useRoleMenu';
import { Waves, Sparkles, BookOpen } from 'lucide-react';

export default function Home() {
  const { config, homeModules } = useCampus();
  const { user, role } = useRoleMenu();

  const roleGreeting = {
    teacher: '老师',
    parent: '家长',
    student: '同学',
  };

  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 6) return '凌晨好';
    if (hour < 12) return '上午好';
    if (hour < 14) return '中午好';
    if (hour < 18) return '下午好';
    return '晚上好';
  };

  return (
    <div className="p-4 lg:p-6 max-w-7xl mx-auto">
      <div
        className="mb-6 p-6 rounded-2xl text-white overflow-hidden relative"
        style={{
          background: `linear-gradient(135deg, ${config.theme.primaryColor} 0%, ${config.theme.secondaryColor} 100%)`,
        }}
      >
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-5 h-5" />
            <span className="text-white/90 text-sm">欢迎回来</span>
          </div>
          <h1 className="text-2xl font-bold mb-1">
            {greeting()}，{user?.name || '用户'}
            {role && <span className="text-white/80 text-lg ml-2">
              {roleGreeting[role]}
            </span>}
          </h1>
          <p className="text-white/70 text-sm">
            {config.fullName} · {user?.className || '祝您今天愉快'}
          </p>
        </div>
        <div className="absolute -right-10 -bottom-10 w-40 h-40 rounded-full bg-white/10" />
        <div className="absolute right-20 -top-10 w-32 h-32 rounded-full bg-white/5" />
        <Waves className="absolute bottom-0 right-0 w-32 h-32 text-white/20" />
      </div>

      <ModuleErrorBoundary moduleName="快捷入口">
        <div className="mb-6">
          <QuickEntries />
        </div>
      </ModuleErrorBoundary>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {homeModules.showSchedulePreview && (
          <ModuleErrorBoundary moduleName="课表预览">
            <SchedulePreview />
          </ModuleErrorBoundary>
        )}

        {homeModules.showNotices && (
          <ModuleErrorBoundary moduleName="通知公告">
            <NoticePanel />
          </ModuleErrorBoundary>
        )}
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div
          className="p-5 bg-white border border-slate-100 rounded-xl shadow-sm"
          style={{ borderRadius: config.theme.cardRadius }}
        >
          <div className="flex items-center gap-3 mb-3">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: `${config.theme.primaryColor}15` }}
            >
              <BookOpen
                className="w-5 h-5"
                style={{ color: config.theme.primaryColor }}
              />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-800">6</p>
              <p className="text-xs text-slate-500">今日课程</p>
            </div>
          </div>
          <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full"
              style={{
                width: '75%',
                backgroundColor: config.theme.primaryColor,
              }}
            />
          </div>
          <p className="text-xs text-slate-400 mt-2">
            已完成 3 节，还有 3 节</p>
        </div>

        <div
          className="p-5 bg-white border border-slate-100 rounded-xl shadow-sm"
          style={{ borderRadius: config.theme.cardRadius }}
        >
          <div className="flex items-center gap-3 mb-3">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: '#10b98120' }}
            >
              <Sparkles className="w-5 h-5 text-emerald-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-800">12</p>
              <p className="text-xs text-slate-500">待办事项</p>
            </div>
          </div>
          <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-emerald-500"
              style={{ width: '60%' }}
            />
          </div>
          <p className="text-xs text-slate-400 mt-2">已完成 7 项，还有 5 项</p>
        </div>

        <div
          className="p-5 bg-white border border-slate-100 rounded-xl shadow-sm"
          style={{ borderRadius: config.theme.cardRadius }}
        >
          <div className="flex items-center gap-3 mb-3">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: '#f59e0b20' }}
            >
              <BookOpen className="w-5 h-5 text-amber-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-800">95</p>
              <p className="text-xs text-slate-500">综合评分</p>
            </div>
          </div>
          <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-amber-500"
              style={{ width: '95%' }}
            />
          </div>
          <p className="text-xs text-slate-400 mt-2">较上周提升 2 分</p>
        </div>
      </div>
    </div>
  );
}
