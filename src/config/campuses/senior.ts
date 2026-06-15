import type { CampusConfig } from '@/types';

export const seniorCampusConfig: CampusConfig = {
  id: 'senior',
  name: '高中部',
  fullName: '博学高级中学',
  description: '博学笃志，追求真理',
  theme: {
    primaryColor: '#4338CA',
    primaryLight: '#818CF8',
    primaryDark: '#3730A3',
    secondaryColor: '#6366F1',
    backgroundColor: '#F8FAFC',
    surfaceColor: '#FFFFFF',
    textPrimary: '#0F172A',
    textSecondary: '#475569',
    cardRadius: '8px',
    shadowSize: '0 4px 16px rgba(67, 56, 202, 0.08)',
  },
  logo: {
    style: 'square',
    text: '博学',
    icon: 'book-marked',
    bgColor: '#4338CA',
    textColor: '#FFFFFF',
  },
  homeModules: {
    quickEntries: [
      { key: 'schedule', label: '课程安排', icon: 'calendar-days', path: '/schedule' },
      { key: 'homework', label: '作业管理', icon: 'book-open', path: '/homework' },
      { key: 'notices', label: '教务通知', icon: 'bell', path: '/notices' },
      { key: 'grades', label: '学业成绩', icon: 'award', path: '/grades' },
      { key: 'exam', label: '考试信息', icon: 'file-text', path: '/exam' },
      { key: 'elective', label: '选课系统', icon: 'list-checks', path: '/elective' },
    ],
    showSchedulePreview: true,
    showNotices: true,
    noticeStyle: 'academic',
  },
  schedule: {
    style: 'compact',
    showEmoji: false,
    timeSlots: 10,
    daysCount: 6,
  },
  notices: {
    cardStyle: 'academic',
    showTags: false,
    itemsPerPage: 20,
  },
};
