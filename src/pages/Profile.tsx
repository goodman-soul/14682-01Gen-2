import { User, CalendarDays, BookOpen, Award, Settings, Bell, Shield, ChevronRight, MapPin, Mail, Phone } from 'lucide-react';
import { useCampus } from '@/hooks/useCampus';
import { useRoleMenu } from '@/hooks/useRoleMenu';

const roleLabels = {
  teacher: '教师',
  parent: '家长',
  student: '学生',
};

export default function Profile() {
  const { config } = useCampus();
  const { user, role } = useRoleMenu();

  const menuItems = [
    { icon: BookOpen, label: '我的课程', desc: '查看所有课程安排', value: '6门课程' },
    { icon: Award, label: '成绩记录', desc: '查看历史成绩', value: '查看详情' },
    { icon: CalendarDays, label: '考勤记录', desc: '查看出勤情况', value: '出勤率 98%' },
    { icon: Bell, label: '消息通知', desc: '管理通知偏好', value: '' },
    { icon: Shield, label: '账号安全', desc: '密码、绑定手机', value: '' },
    { icon: Settings, label: '系统设置', desc: '通用、显示设置', value: '' },
  ];

  return (
    <div className="p-4 lg:p-6 max-w-3xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <User className="w-6 h-6" style={{ color: config.theme.primaryColor }} />
        <h1 className="text-xl font-bold text-slate-800">个人中心</h1>
      </div>

      <div
        className="p-6 mb-6 text-white overflow-hidden relative"
        style={{
          background: `linear-gradient(135deg, ${config.theme.primaryColor} 0%, ${config.theme.secondaryColor} 100%)`,
          borderRadius: config.theme.cardRadius,
        }}
      >
        <div className="relative z-10 flex items-center gap-5">
          <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center border-2 border-white/30">
            <span className="text-3xl font-bold">{user?.name?.charAt(0) || 'U'}</span>
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-1">{user?.name || '用户'}</h2>
            <div className="flex items-center gap-3 text-white/80 text-sm">
              <span className="px-2 py-0.5 rounded bg-white/20 text-xs">
                {role ? roleLabels[role] : '用户'}
              </span>
              <span>{config.fullName}</span>
            </div>
            <p className="text-white/70 text-sm mt-2">
              <MapPin className="w-4 h-4 inline mr-1" />
              {user?.className || '暂无班级信息'}
            </p>
          </div>
        </div>
        <div className="absolute -right-8 -bottom-8 w-40 h-40 rounded-full bg-white/10" />
        <div className="absolute right-20 -top-10 w-32 h-32 rounded-full bg-white/5" />
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white border border-slate-100 p-4 text-center" style={{ borderRadius: config.theme.cardRadius }}>
          <p className="text-2xl font-bold text-slate-800">28</p>
          <p className="text-xs text-slate-500 mt-1">本学期课时</p>
        </div>
        <div className="bg-white border border-slate-100 p-4 text-center" style={{ borderRadius: config.theme.cardRadius }}>
          <p className="text-2xl font-bold text-slate-800">95</p>
          <p className="text-xs text-slate-500 mt-1">综合评分</p>
        </div>
        <div className="bg-white border border-slate-100 p-4 text-center" style={{ borderRadius: config.theme.cardRadius }}>
          <p className="text-2xl font-bold text-slate-800">98%</p>
          <p className="text-xs text-slate-500 mt-1">出勤率</p>
        </div>
      </div>

      <div
        className="bg-white border border-slate-100 overflow-hidden"
        style={{ borderRadius: config.theme.cardRadius }}
      >
        {menuItems.map((item, index) => (
          <div
            key={item.label}
            className={`flex items-center gap-4 p-4 hover:bg-slate-50 cursor-pointer transition-colors ${
              index < menuItems.length - 1 ? 'border-b border-slate-100' : ''
            }`}
          >
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: `${config.theme.primaryColor}15` }}
            >
              <item.icon
                className="w-5 h-5"
                style={{ color: config.theme.primaryColor }}
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-800">{item.label}</p>
              <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
            </div>
            {item.value && (
              <span className="text-sm text-slate-500 flex-shrink-0">
                {item.value}
              </span>
            )}
            <ChevronRight className="w-4 h-4 text-slate-400 flex-shrink-0" />
          </div>
        ))}
      </div>

      <div
        className="mt-6 p-4 bg-white border border-slate-100"
        style={{ borderRadius: config.theme.cardRadius }}
      >
        <h3 className="text-sm font-medium text-slate-700 mb-3">联系信息</h3>
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-slate-600">
            <Mail className="w-4 h-4 text-slate-400" />
            <span>{user?.name?.toLowerCase() || 'user'}@school.edu.cn</span>
          </div>
          <div className="flex items-center gap-2 text-slate-600">
            <Phone className="w-4 h-4 text-slate-400" />
            <span>138****8888</span>
          </div>
          <div className="flex items-center gap-2 text-slate-600">
            <MapPin className="w-4 h-4 text-slate-400" />
            <span>{config.fullName}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
