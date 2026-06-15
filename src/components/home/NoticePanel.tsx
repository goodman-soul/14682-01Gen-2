import { useCampus } from '@/hooks/useCampus';
import { Bell, ArrowRight, Calendar, Tag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

const mockNotices = [
  {
    id: 1,
    title: '关于2024年春季学期开学时间的通知',
    summary: '请各位同学和家长注意开学报到时间及相关准备事项...',
    date: '2024-02-20',
    tag: '重要通知',
    tagColor: 'red',
  },
  {
    id: 2,
    title: '校园文化艺术节活动安排',
    summary: '本年度校园文化艺术节将于下月初举行，欢迎同学们积极参与...',
    date: '2024-02-18',
    tag: '活动通知',
    tagColor: 'orange',
  },
  {
    id: 3,
    title: '期中考试时间安排公告',
    summary: '本学期期中考试定于第10周进行，请同学们做好复习准备...',
    date: '2024-02-15',
    tag: '教学通知',
    tagColor: 'blue',
  },
  {
    id: 4,
    title: '家长会召开通知',
    summary: '为加强家校沟通，学校定于本周五下午召开家长会...',
    date: '2024-02-12',
    tag: '家长通知',
    tagColor: 'green',
  },
];

const tagColorMap: Record<string, string> = {
  red: 'bg-red-100 text-red-600',
  orange: 'bg-orange-100 text-orange-600',
  blue: 'bg-blue-100 text-blue-600',
  green: 'bg-green-100 text-green-600',
  purple: 'bg-purple-100 text-purple-600',
};

function ColorfulNoticeCard({ notice, primaryColor }: { notice: typeof mockNotices[0]; primaryColor: string }) {
  const tagClass = tagColorMap[notice.tagColor] || 'bg-slate-100 text-slate-600';

  return (
    <div className="group p-4 bg-white rounded-xl border border-slate-100 hover:shadow-md transition-all duration-300 cursor-pointer hover:-translate-y-0.5">
      <div className="flex items-start gap-3">
        <div
          className="w-1 h-12 rounded-full flex-shrink-0"
          style={{ backgroundColor: primaryColor }}
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5">
            <span className={cn('px-2 py-0.5 rounded-full text-xs font-medium', tagClass)}>
              {notice.tag}
            </span>
          </div>
          <h4 className="text-sm font-semibold text-slate-800 truncate group-hover:text-primary transition-colors">
            {notice.title}
          </h4>
          <p className="text-xs text-slate-500 mt-1 line-clamp-2">{notice.summary}</p>
          <div className="flex items-center gap-1 mt-2 text-xs text-slate-400">
            <Calendar className="w-3 h-3" />
            <span>{notice.date}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function MinimalNoticeCard({ notice }: { notice: typeof mockNotices[0] }) {
  return (
    <div className="group flex items-center gap-4 p-3 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer border-b border-slate-100 last:border-b-0">
      <div className="w-1 h-1 bg-slate-300 rounded-full flex-shrink-0 group-hover:bg-primary transition-colors" />
      <div className="flex-1 min-w-0">
        <h4 className="text-sm text-slate-700 font-medium truncate group-hover:text-primary transition-colors">
          {notice.title}
        </h4>
        <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">{notice.summary}</p>
      </div>
      <span className="text-xs text-slate-400 flex-shrink-0">{notice.date}</span>
    </div>
  );
}

function AcademicNoticeCard({ notice, index }: { notice: typeof mockNotices[0]; index: number }) {
  return (
    <div className="group flex items-start gap-3 p-3 hover:bg-slate-50 rounded transition-colors cursor-pointer">
      <span className="text-lg font-serif font-bold text-slate-300 group-hover:text-primary transition-colors flex-shrink-0 w-6">
        {String(index + 1).padStart(2, '0')}
      </span>
      <div className="flex-1 min-w-0 border-b border-slate-100 pb-2">
        <h4 className="text-sm text-slate-700 font-medium group-hover:text-primary transition-colors line-clamp-1">
          {notice.title}
        </h4>
        <div className="flex items-center justify-between mt-1">
          <span className="text-xs text-slate-400">{notice.date}</span>
          <span className="text-xs text-slate-400 font-mono">N{notice.id.toString().padStart(4, '0')}</span>
        </div>
      </div>
    </div>
  );
}

export function NoticePanel() {
  const { noticesConfig, theme } = useCampus();
  const navigate = useNavigate();

  const renderNoticeList = () => {
    switch (noticesConfig.cardStyle) {
      case 'colorful':
        return (
          <div className="space-y-3">
            {mockNotices.map((notice) => (
              <ColorfulNoticeCard
                key={notice.id}
                notice={notice}
                primaryColor={theme.primaryColor}
              />
            ))}
          </div>
        );
      case 'minimal':
        return (
          <div className="divide-y divide-slate-100 -mx-2">
            {mockNotices.map((notice) => (
              <MinimalNoticeCard key={notice.id} notice={notice} />
            ))}
          </div>
        );
      case 'academic':
        return (
          <div className="space-y-1">
            {mockNotices.map((notice, index) => (
              <AcademicNoticeCard key={notice.id} notice={notice} index={index} />
            ))}
          </div>
        );
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
          <Bell className="w-5 h-5" style={{ color: theme.primaryColor }} />
          <h3 className="font-semibold text-slate-800">通知公告</h3>
        </div>
        <button
          onClick={() => navigate('/notices')}
          className="flex items-center gap-1 text-sm font-medium transition-colors hover:underline"
          style={{ color: theme.primaryColor }}
        >
          查看全部
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
      <div className="p-4">{renderNoticeList()}</div>
    </div>
  );
}
