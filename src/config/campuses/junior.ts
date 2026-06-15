import type { CampusConfig } from '@/types';

export const juniorCampusConfig: CampusConfig = {
  id: 'junior',
  name: '初中部',
  fullName: '青藤实验中学',
  description: '青春向上，追求卓越',
  theme: {
    primaryColor: '#2DD4BF',
    primaryLight: '#78E8DB',
    primaryDark: '#14B8A6',
    secondaryColor: '#60A5FA',
    backgroundColor: '#F0FDFA',
    surfaceColor: '#FFFFFF',
    textPrimary: '#1E293B',
    textSecondary: '#64748B',
    cardRadius: '12px',
    shadowSize: '0 6px 24px rgba(45, 212, 191, 0.10)',
  },
  logo: {
    style: 'shield',
    text: '青藤',
    icon: 'graduation-cap',
    bgColor: '#2DD4BF',
    textColor: '#FFFFFF',
  },
  homeModules: {
    quickEntries: [
      { key: 'schedule', label: '课程表', icon: 'calendar-days', path: '/schedule' },
      { key: 'homework', label: '作业', icon: 'book-open', path: '/homework' },
      { key: 'notices', label: '通知', icon: 'bell', path: '/notices' },
      { key: 'grades', label: '成绩', icon: 'award', path: '/grades' },
      { key: 'exam', label: '考试安排', icon: 'file-text', path: '/exam' },
      { key: 'library', label: '图书馆', icon: 'library', path: '/library' },
    ],
    showSchedulePreview: true,
    showNotices: true,
    noticeStyle: 'minimal',
  },
  schedule: {
    style: 'minimal',
    showEmoji: false,
    timeSlots: 8,
    daysCount: 5,
  },
  notices: {
    cardStyle: 'minimal',
    showTags: true,
    itemsPerPage: 15,
  },
};
