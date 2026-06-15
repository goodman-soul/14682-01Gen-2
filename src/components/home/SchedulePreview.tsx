import { useCampus } from '@/hooks/useCampus';
import { CalendarDays, Clock, ArrowRight, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

const todaySchedule = [
  { id: 1, subject: '语文', teacher: '王老师', room: '302教室', time: '08:00-08:45', color: '#FF7A45', emoji: '📖' },
  { id: 2, subject: '数学', teacher: '李老师', room: '302教室', time: '09:00-09:45', color: '#3B82F6', emoji: '🔢' },
  { id: 3, subject: '英语', teacher: '张老师', room: '语音室', time: '10:15-11:00', color: '#10B981', emoji: '🔤' },
  { id: 4, subject: '科学', teacher: '刘老师', room: '实验室', time: '11:15-12:00', color: '#8B5CF6', emoji: '🔬' },
  { id: 5, subject: '美术', teacher: '陈老师', room: '美术室', time: '14:00-14:45', color: '#EC4899', emoji: '🎨' },
  { id: 6, subject: '体育', teacher: '赵老师', room: '操场', time: '15:00-15:45', color: '#14B8A6', emoji: '⚽' },
];

function ColorfulSchedule({ primaryColor }: { primaryColor: string }) {
  return (
    <div className="space-y-2">
      {todaySchedule.slice(0, 4).map((item) => (
        <div
          key={item.id}
          className="flex items-center gap-3 p-3 rounded-xl transition-all duration-200 hover:scale-[1.02] cursor-pointer"
          style={{ backgroundColor: `${item.color}15` }}
        >
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
            style={{ backgroundColor: `${item.color}30` }}
          >
            {item.emoji}
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-sm" style={{ color: item.color }}>
              {item.subject}
            </h4>
            <p className="text-xs text-slate-500 truncate">
              {item.teacher} · {item.room}
            </p>
          </div>
          <div className="text-right flex-shrink-0">
            <span className="text-xs font-medium text-slate-600">{item.time}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function MinimalSchedule({ primaryColor }: { primaryColor: string }) {
  return (
    <div className="space-y-1">
      {todaySchedule.slice(0, 5).map((item, index) => (
        <div
          key={item.id}
          className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
        >
          <div className="w-1 h-10 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-medium text-slate-800">{item.subject}</h4>
              <span className="text-xs text-slate-400">{item.room}</span>
            </div>
            <p className="text-xs text-slate-400">{item.teacher}</p>
          </div>
          <span className="text-xs text-slate-500 font-mono flex-shrink-0">
            {item.time.split('-')[0]}
          </span>
        </div>
      ))}
    </div>
  );
}

function CompactSchedule({ primaryColor }: { primaryColor: string }) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {todaySchedule.slice(0, 6).map((item) => (
        <div
          key={item.id}
          className="p-2 rounded-lg text-center cursor-pointer hover:opacity-80 transition-opacity"
          style={{ backgroundColor: `${item.color}15` }}
        >
          <div className="text-xs font-medium truncate" style={{ color: item.color }}>
            {item.subject}
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5">
            {item.time.split('-')[0]}
          </div>
        </div>
      ))}
    </div>
  );
}

export function SchedulePreview() {
  const { scheduleConfig, theme, homeModules } = useCampus();
  const navigate = useNavigate();

  if (!homeModules.showSchedulePreview) {
    return null;
  }

  const renderSchedule = () => {
    switch (scheduleConfig.style) {
      case 'colorful':
        return <ColorfulSchedule primaryColor={theme.primaryColor} />;
      case 'minimal':
        return <MinimalSchedule primaryColor={theme.primaryColor} />;
      case 'compact':
        return <CompactSchedule primaryColor={theme.primaryColor} />;
      default:
        return null;
    }
  };

  return (
    <div
      className="bg-white border border-slate-100 overflow-hidden"
      style={{ borderRadius: theme.cardRadius, boxShadow: theme.shadowSize }}
    >
      <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CalendarDays className="w-5 h-5" style={{ color: theme.primaryColor }} />
          <h3 className="font-semibold text-slate-800">今日课表</h3>
          <span className="text-xs text-slate-400">周一</span>
        </div>
        <button
          onClick={() => navigate('/schedule')}
          className="flex items-center gap-1 text-sm font-medium transition-colors hover:underline"
          style={{ color: theme.primaryColor }}
        >
          查看全部
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
      <div className="p-4">{renderSchedule()}</div>
    </div>
  );
}
