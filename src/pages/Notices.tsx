import { useState } from 'react';
import { Search, Bell, Calendar, Tag, ArrowRight } from 'lucide-react';
import { useCampus } from '@/hooks/useCampus';
import { cn } from '@/lib/utils';

const mockNotices = [
  {
    id: 1,
    title: '关于2024年春季学期开学时间的通知',
    summary: '请各位同学和家长注意开学报到时间及相关准备事项。报到当天请携带好寒假作业、学生手册及相关费用。',
    date: '2024-02-20',
    tag: '重要通知',
    tagColor: 'red',
    category: '教务通知',
  },
  {
    id: 2,
    title: '校园文化艺术节活动安排',
    summary: '本年度校园文化艺术节将于下月初举行，欢迎同学们积极参与。活动包括歌唱比赛、书画展览、文艺汇演等。',
    date: '2024-02-18',
    tag: '活动通知',
    tagColor: 'orange',
    category: '校园活动',
  },
  {
    id: 3,
    title: '期中考试时间安排公告',
    summary: '本学期期中考试定于第10周进行，请同学们做好复习准备。考试科目涵盖语文、数学、英语等主要学科。',
    date: '2024-02-15',
    tag: '教学通知',
    tagColor: 'blue',
    category: '教学信息',
  },
  {
    id: 4,
    title: '家长会召开通知',
    summary: '为加强家校沟通，学校定于本周五下午召开家长会。请各位家长准时参加，共同关注孩子的成长与发展。',
    date: '2024-02-12',
    tag: '家长通知',
    tagColor: 'green',
    category: '家校沟通',
  },
  {
    id: 5,
    title: '春季传染病预防告知书',
    summary: '春季是传染病高发季节，请家长和同学们注意个人卫生，加强体育锻炼，做好预防措施。',
    date: '2024-02-10',
    tag: '健康提醒',
    tagColor: 'purple',
    category: '卫生健康',
  },
  {
    id: 6,
    title: '图书馆新书上架通知',
    summary: '图书馆新进了一批优质图书，涵盖文学、科学、历史等多个类别，欢迎同学们前来借阅。',
    date: '2024-02-08',
    tag: '图书通知',
    tagColor: 'blue',
    category: '校园资源',
  },
];

const tagColorMap: Record<string, string> = {
  red: 'bg-red-100 text-red-600',
  orange: 'bg-orange-100 text-orange-600',
  blue: 'bg-blue-100 text-blue-600',
  green: 'bg-green-100 text-green-600',
  purple: 'bg-purple-100 text-purple-600',
};

export default function Notices() {
  const { noticesConfig, theme } = useCampus();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filteredNotices = mockNotices.filter((notice) => {
    const matchesSearch =
      notice.title.includes(searchQuery) || notice.summary.includes(searchQuery);
    const matchesTag = !activeTag || notice.tag === activeTag;
    return matchesSearch && matchesTag;
  });

  const renderColorfulCard = (notice: typeof mockNotices[0]) => {
    const tagClass = tagColorMap[notice.tagColor] || 'bg-slate-100 text-slate-600';

    return (
      <div
        key={notice.id}
        className="group p-5 bg-white border border-slate-100 rounded-xl hover:shadow-lg transition-all duration-300 cursor-pointer hover:-translate-y-0.5"
        style={{ borderRadius: theme.cardRadius }}
      >
        <div className="flex items-start gap-4">
          <div
            className="w-1.5 h-full min-h-[80px] rounded-full flex-shrink-0"
            style={{ backgroundColor: theme.primaryColor }}
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className={cn('px-2.5 py-0.5 rounded-full text-xs font-medium', tagClass)}>
                {notice.tag}
              </span>
              <span className="text-xs text-slate-400">{notice.category}</span>
            </div>
            <h3 className="text-base font-semibold text-slate-800 group-hover:text-primary transition-colors">
              {notice.title}
            </h3>
            <p className="text-sm text-slate-500 mt-2 line-clamp-2">{notice.summary}</p>
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center gap-1 text-xs text-slate-400">
                <Calendar className="w-3.5 h-3.5" />
                <span>{notice.date}</span>
              </div>
              <span
                className="text-sm font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ color: theme.primaryColor }}
              >
                查看详情
                <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderMinimalCard = (notice: typeof mockNotices[0]) => {
    return (
      <div
        key={notice.id}
        className="group flex items-center gap-4 p-4 bg-white border border-slate-100 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
        style={{ borderRadius: theme.cardRadius }}
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            {noticesConfig.showTags && (
              <span
                className="text-xs px-2 py-0.5 rounded"
                style={{
                  backgroundColor: `${theme.primaryColor}15`,
                  color: theme.primaryColor,
                }}
              >
                {notice.tag}
              </span>
            )}
          </div>
          <h3 className="text-sm font-medium text-slate-800 group-hover:text-primary transition-colors">
            {notice.title}
          </h3>
          <p className="text-xs text-slate-500 mt-1 line-clamp-1">{notice.summary}</p>
        </div>
        <span className="text-xs text-slate-400 flex-shrink-0">{notice.date}</span>
      </div>
    );
  };

  const renderAcademicCard = (notice: typeof mockNotices[0], index: number) => {
    return (
      <div
        key={notice.id}
        className="group flex items-start gap-4 py-4 border-b border-slate-100 last:border-b-0 cursor-pointer hover:bg-slate-50 transition-colors px-2"
      >
        <span className="text-lg font-serif font-bold text-slate-300 group-hover:text-primary transition-colors flex-shrink-0 w-8">
          {String(index + 1).padStart(2, '0')}
        </span>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium text-slate-700 group-hover:text-primary transition-colors">
            {notice.title}
          </h3>
          <p className="text-xs text-slate-500 mt-1.5 line-clamp-2">{notice.summary}</p>
          <div className="flex items-center justify-between mt-2">
            <span className="text-xs text-slate-400 font-mono">
              NO.{notice.id.toString().padStart(4, '0')}
            </span>
            <span className="text-xs text-slate-400">{notice.date}</span>
          </div>
        </div>
      </div>
    );
  };

  const renderList = () => {
    switch (noticesConfig.cardStyle) {
      case 'colorful':
        return (
          <div className="space-y-4">
            {filteredNotices.map((notice) => renderColorfulCard(notice))}
          </div>
        );
      case 'minimal':
        return (
          <div className="space-y-2">
            {filteredNotices.map((notice) => renderMinimalCard(notice))}
          </div>
        );
      case 'academic':
        return (
          <div
            className="bg-white border border-slate-200 px-4 py-2"
            style={{ borderRadius: theme.cardRadius }}
          >
            {filteredNotices.map((notice, index) => renderAcademicCard(notice, index))}
          </div>
        );
      default:
        return null;
    }
  };

  const tags = [...new Set(mockNotices.map((n) => n.tag))];

  return (
    <div className="p-4 lg:p-6 max-w-5xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <Bell className="w-6 h-6" style={{ color: theme.primaryColor }} />
        <div>
          <h1 className="text-xl font-bold text-slate-800">通知公告</h1>
          <p className="text-sm text-slate-500">了解最新的校园动态与通知</p>
        </div>
      </div>

      <div className="mb-6 space-y-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="搜索通知..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
          />
        </div>

        {noticesConfig.showTags && (
          <div className="flex items-center gap-2 flex-wrap">
            <Tag className="w-4 h-4 text-slate-400" />
            <button
              onClick={() => setActiveTag(null)}
              className={cn(
                'px-3 py-1 text-sm rounded-full transition-colors',
                !activeTag
                  ? 'text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              )}
              style={{
                backgroundColor: !activeTag ? theme.primaryColor : undefined,
              }}
            >
              全部
            </button>
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag === activeTag ? null : tag)}
                className={cn(
                  'px-3 py-1 text-sm rounded-full transition-colors',
                  activeTag === tag
                    ? 'text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                )}
                style={{
                  backgroundColor: activeTag === tag ? theme.primaryColor : undefined,
                }}
              >
                {tag}
              </button>
            ))}
          </div>
        )}
      </div>

      {renderList()}

      {filteredNotices.length === 0 && (
        <div className="text-center py-16">
          <Bell className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <p className="text-slate-500">暂无相关通知</p>
        </div>
      )}
    </div>
  );
}
