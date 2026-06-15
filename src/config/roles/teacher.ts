import type { RoleMenuConfig } from '@/types';

export const teacherMenuConfig: RoleMenuConfig = {
  role: 'teacher',
  menuItems: [
    { key: 'home', label: '首页', icon: 'home', path: '/home' },
    { key: 'schedule', label: '我的课表', icon: 'calendar-days', path: '/schedule' },
    {
      key: 'teaching',
      label: '教学管理',
      icon: 'book-open',
      path: '/teaching',
      children: [
        { key: 'homework', label: '作业管理', icon: 'clipboard-list', path: '/teaching/homework' },
        { key: 'grades', label: '成绩管理', icon: 'award', path: '/teaching/grades' },
        { key: 'attendance', label: '考勤管理', icon: 'clipboard-check', path: '/teaching/attendance' },
      ],
    },
    { key: 'notices', label: '通知公告', icon: 'bell', path: '/notices' },
    {
      key: 'class',
      label: '班级管理',
      icon: 'users',
      path: '/class',
      children: [
        { key: 'students', label: '学生信息', icon: 'user-round', path: '/class/students' },
        { key: 'parents', label: '家长联系', icon: 'message-circle', path: '/class/parents' },
      ],
    },
    { key: 'profile', label: '个人中心', icon: 'user', path: '/profile' },
  ],
};
