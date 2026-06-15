import type { RoleMenuConfig } from '@/types';

export const studentMenuConfig: RoleMenuConfig = {
  role: 'student',
  menuItems: [
    { key: 'home', label: '首页', icon: 'home', path: '/home' },
    { key: 'schedule', label: '我的课表', icon: 'calendar-days', path: '/schedule' },
    { key: 'homework', label: '作业', icon: 'book-open', path: '/homework' },
    { key: 'grades', label: '成绩', icon: 'award', path: '/grades' },
    { key: 'notices', label: '通知', icon: 'bell', path: '/notices' },
    { key: 'exam', label: '考试安排', icon: 'file-text', path: '/exam' },
    { key: 'activities', label: '校园活动', icon: 'party-popper', path: '/activities' },
    { key: 'profile', label: '个人中心', icon: 'user', path: '/profile' },
  ],
};
