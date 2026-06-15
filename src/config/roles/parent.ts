import type { RoleMenuConfig } from '@/types';

export const parentMenuConfig: RoleMenuConfig = {
  role: 'parent',
  menuItems: [
    { key: 'home', label: '首页', icon: 'home', path: '/home' },
    { key: 'schedule', label: '孩子课表', icon: 'calendar-days', path: '/schedule' },
    { key: 'homework', label: '作业情况', icon: 'book-open', path: '/homework' },
    { key: 'grades', label: '成绩查询', icon: 'award', path: '/grades' },
    { key: 'notices', label: '通知公告', icon: 'bell', path: '/notices' },
    { key: 'attendance', label: '考勤记录', icon: 'clipboard-check', path: '/attendance' },
    { key: 'communication', label: '家校沟通', icon: 'message-circle', path: '/communication' },
    { key: 'profile', label: '个人中心', icon: 'user', path: '/profile' },
  ],
};
