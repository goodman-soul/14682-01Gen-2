import type { CampusConfig } from '@/types';

export const fallbackCampusConfig: CampusConfig = {
  id: 'primary',
  name: '校园门户',
  fullName: '智慧校园',
  description: '欢迎使用智慧校园管理系统',
  theme: {
    primaryColor: '#6366F1',
    primaryLight: '#A5B4FC',
    primaryDark: '#4F46E5',
    secondaryColor: '#8B5CF6',
    backgroundColor: '#F8FAFC',
    surfaceColor: '#FFFFFF',
    textPrimary: '#1E293B',
    textSecondary: '#64748B',
    cardRadius: '12px',
    shadowSize: '0 4px 20px rgba(99, 102, 241, 0.10)',
  },
  logo: {
    style: 'circle',
    text: '校',
    icon: 'school',
    bgColor: '#6366F1',
    textColor: '#FFFFFF',
  },
  homeModules: {
    quickEntries: [
      { key: 'schedule', label: '课表', icon: 'calendar-days', path: '/schedule' },
      { key: 'notices', label: '通知', icon: 'bell', path: '/notices' },
      { key: 'profile', label: '我的', icon: 'user', path: '/profile' },
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
    showTags: false,
    itemsPerPage: 10,
  },
};
