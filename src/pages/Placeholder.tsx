import { useCampus } from '@/hooks/useCampus';
import { Construction } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const moduleInfo: Record<string, { title: string; desc: string }> = {
  homework: { title: '作业中心', desc: '作业查看、提交与批改' },
  grades: { title: '成绩查询', desc: '查看历史成绩与学业分析' },
  exam: { title: '考试安排', desc: '查看考试时间与考场安排' },
  attendance: { title: '考勤打卡', desc: '查看考勤记录与出勤统计' },
  activities: { title: '校园活动', desc: '查看与报名校园活动' },
  communication: { title: '家校沟通', desc: '老师与家长在线交流' },
  library: { title: '图书馆', desc: '图书查询与借阅管理' },
  elective: { title: '选课系统', desc: '在线选课与课程调整' },
  teaching: { title: '教学管理', desc: '作业、成绩、考勤综合管理' },
  class: { title: '班级管理', desc: '学生信息与家长联系管理' },
};

export default function Placeholder() {
  const { config } = useCampus();
  const location = useLocation();
  const pathKey = location.pathname.split('/').filter(Boolean)[0] || '';
  const info = moduleInfo[pathKey] || { title: '功能模块', desc: '模块开发中' };

  return (
    <div className="p-4 lg:p-6 max-w-3xl mx-auto">
      <div
        className="flex flex-col items-center justify-center py-20 bg-white border border-slate-100"
        style={{ borderRadius: config.theme.cardRadius, boxShadow: config.theme.shadowSize }}
      >
        <div
          className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6"
          style={{ backgroundColor: `${config.theme.primaryColor}15` }}
        >
          <Construction
            className="w-10 h-10"
            style={{ color: config.theme.primaryColor }}
          />
        </div>

        <h2 className="text-xl font-bold text-slate-800 mb-2">{info.title}</h2>
        <p className="text-sm text-slate-500 mb-1">{info.desc}</p>
        <p className="text-xs text-slate-400 mt-4">该模块正在建设中，敬请期待</p>
      </div>
    </div>
  );
}
