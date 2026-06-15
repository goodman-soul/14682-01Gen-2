import { useCampus } from '@/hooks/useCampus';
import { CalendarDays, ChevronLeft, ChevronRight } from 'lucide-react';

const weekDays = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];

const timeSlots = [
  { time: '08:00-08:45', label: '第1节' },
  { time: '09:00-09:45', label: '第2节' },
  { time: '10:15-11:00', label: '第3节' },
  { time: '11:15-12:00', label: '第4节' },
  { time: '14:00-14:45', label: '第5节' },
  { time: '15:00-15:45', label: '第6节' },
  { time: '16:00-16:45', label: '第7节' },
  { time: '17:00-17:45', label: '第8节' },
];

const scheduleData = [
  [
    { subject: '语文', teacher: '王老师', room: '302', color: '#FF7A45', emoji: '📖' },
    { subject: '数学', teacher: '李老师', room: '302', color: '#3B82F6', emoji: '🔢' },
    null,
    { subject: '英语', teacher: '张老师', room: '语音室', color: '#10B981', emoji: '🔤' },
    { subject: '科学', teacher: '刘老师', room: '实验室', color: '#8B5CF6', emoji: '🔬' },
    null,
    { subject: '美术', teacher: '陈老师', room: '美术室', color: '#EC4899', emoji: '🎨' },
    null,
  ],
  [
    { subject: '数学', teacher: '李老师', room: '302', color: '#3B82F6', emoji: '🔢' },
    { subject: '语文', teacher: '王老师', room: '302', color: '#FF7A45', emoji: '📖' },
    { subject: '体育', teacher: '赵老师', room: '操场', color: '#14B8A6', emoji: '⚽' },
    { subject: '音乐', teacher: '周老师', room: '音乐室', color: '#F59E0B', emoji: '🎵' },
    null,
    { subject: '英语', teacher: '张老师', room: '语音室', color: '#10B981', emoji: '🔤' },
    null,
    { subject: '科学', teacher: '刘老师', room: '实验室', color: '#8B5CF6', emoji: '🔬' },
  ],
  [
    { subject: '英语', teacher: '张老师', room: '语音室', color: '#10B981', emoji: '🔤' },
    { subject: '科学', teacher: '刘老师', room: '实验室', color: '#8B5CF6', emoji: '🔬' },
    { subject: '语文', teacher: '王老师', room: '302', color: '#FF7A45', emoji: '📖' },
    { subject: '数学', teacher: '李老师', room: '302', color: '#3B82F6', emoji: '🔢' },
    null,
    { subject: '美术', teacher: '陈老师', room: '美术室', color: '#EC4899', emoji: '🎨' },
    { subject: '体育', teacher: '赵老师', room: '操场', color: '#14B8A6', emoji: '⚽' },
    null,
  ],
  [
    { subject: '数学', teacher: '李老师', room: '302', color: '#3B82F6', emoji: '🔢' },
    { subject: '语文', teacher: '王老师', room: '302', color: '#FF7A45', emoji: '📖' },
    { subject: '英语', teacher: '张老师', room: '语音室', color: '#10B981', emoji: '🔤' },
    null,
    { subject: '科学', teacher: '刘老师', room: '实验室', color: '#8B5CF6', emoji: '🔬' },
    { subject: '音乐', teacher: '周老师', room: '音乐室', color: '#F59E0B', emoji: '🎵' },
    null,
    { subject: '班会', teacher: '王老师', room: '302', color: '#6366F1', emoji: '👥' },
  ],
  [
    { subject: '语文', teacher: '王老师', room: '302', color: '#FF7A45', emoji: '📖' },
    { subject: '数学', teacher: '李老师', room: '302', color: '#3B82F6', emoji: '🔢' },
    { subject: '科学', teacher: '刘老师', room: '实验室', color: '#8B5CF6', emoji: '🔬' },
    { subject: '英语', teacher: '张老师', room: '语音室', color: '#10B981', emoji: '🔤' },
    null,
    { subject: '体育', teacher: '赵老师', room: '操场', color: '#14B8A6', emoji: '⚽' },
    { subject: '美术', teacher: '陈老师', room: '美术室', color: '#EC4899', emoji: '🎨' },
    null,
  ],
];

export default function Schedule() {
  const { scheduleConfig, theme } = useCampus();
  const displayDays = weekDays.slice(0, scheduleConfig.daysCount || 5);

  const getCellPadding = () => {
    switch (scheduleConfig.style) {
      case 'colorful':
        return 'p-3';
      case 'minimal':
        return 'p-2';
      case 'compact':
        return 'p-1.5';
      default:
        return 'p-2';
    }
  };

  return (
    <div className="p-4 lg:p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <CalendarDays className="w-6 h-6" style={{ color: theme.primaryColor }} />
          <div>
            <h1 className="text-xl font-bold text-slate-800">课程表</h1>
            <p className="text-sm text-slate-500">2024-2025学年 第二学期</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-lg hover:bg-slate-100 transition-colors">
            <ChevronLeft className="w-5 h-5 text-slate-600" />
          </button>
          <span className="text-sm font-medium text-slate-700 px-3">第8周</span>
          <button className="p-2 rounded-lg hover:bg-slate-100 transition-colors">
            <ChevronRight className="w-5 h-5 text-slate-600" />
          </button>
        </div>
      </div>

      <div
        className="bg-white border border-slate-200 overflow-hidden"
        style={{ borderRadius: theme.cardRadius, boxShadow: theme.shadowSize }}
      >
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="bg-slate-50">
                <th className="p-3 text-left text-xs font-medium text-slate-500 w-24 border-r border-slate-200">
                  时间
                </th>
                {displayDays.map((day, idx) => (
                  <th
                    key={day}
                    className={`p-3 text-center text-sm font-medium text-slate-700 ${
                      idx < displayDays.length - 1 ? 'border-r border-slate-200' : ''
                    }`}
                  >
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {timeSlots.slice(0, scheduleConfig.timeSlots || 8).map((slot, slotIdx) => (
                <tr key={slotIdx} className="border-t border-slate-100">
                  <td className="p-2 border-r border-slate-200">
                    <div className="text-xs font-medium text-slate-600">{slot.label}</div>
                    <div className="text-[10px] text-slate-400">{slot.time}</div>
                  </td>
                  {displayDays.map((_, dayIdx) => {
                    const course = scheduleData[dayIdx]?.[slotIdx];
                    return (
                      <td
                        key={dayIdx}
                        className={`${getCellPadding()} border-r border-slate-100 last:border-r-0`}
                      >
                        {course ? (
                          <div
                            className={`rounded-lg text-white transition-all duration-200 hover:scale-[1.02] cursor-pointer ${
                              scheduleConfig.showEmoji ? 'p-2' : 'p-2'
                            }`}
                            style={{ backgroundColor: course.color }}
                          >
                            {scheduleConfig.showEmoji && (
                              <div className="text-lg mb-1">{course.emoji}</div>
                            )}
                            <div
                              className={`font-medium ${
                                scheduleConfig.style === 'compact' ? 'text-[10px]' : 'text-xs'
                              }`}
                            >
                              {course.subject}
                            </div>
                            {scheduleConfig.style !== 'compact' && (
                              <>
                                <div className="text-[10px] opacity-80 mt-0.5">
                                  {course.teacher}
                                </div>
                                <div className="text-[10px] opacity-80">
                                  {course.room}
                                </div>
                              </>
                            )}
                          </div>
                        ) : (
                          <div className="h-full min-h-[60px]" />
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
