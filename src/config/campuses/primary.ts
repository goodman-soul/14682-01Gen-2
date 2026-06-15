import type { CampusConfig } from '@/types';

export const primaryCampusConfig: CampusConfig = {
  id: 'primary',
  name: '小学部',
  fullName: '阳光实验小学',
  description: '快乐学习，健康成长',
  theme: {
    primaryColor: '#FF7A45',
    primaryLight: '#FFB088',
    primaryDark: '#E65D2A',
    secondaryColor: '#FFD93D',
    backgroundColor: '#FFF8F3',
    surfaceColor: '#FFFFFF',
    textPrimary: '#2D3436',
    textSecondary: '#636E72',
    cardRadius: '16px',
    shadowSize: '0 8px 30px rgba(255, 122, 69, 0.12)',
  },
  logo: {
    style: 'circle',
    text: '阳光',
    icon: 'sun',
    bgColor: '#FF7A45',
    textColor: '#FFFFFF',
  },
  homeModules: {
    quickEntries: [
      { key: 'schedule', label: '我的课表', icon: 'calendar-days', path: '/schedule' },
      { key: 'homework', label: '作业中心', icon: 'book-open', path: '/homework' },
      { key: 'notices', label: '通知公告', icon: 'bell', path: '/notices' },
      { key: 'grades', label: '成绩查询', icon: 'award', path: '/grades' },
      { key: 'attendance', label: '考勤打卡', icon: 'clipboard-check', path: '/attendance' },
      { key: 'activities', label: '校园活动', icon: 'party-popper', path: '/activities' },
    ],
    showSchedulePreview: true,
    showNotices: true,
    noticeStyle: 'colorful',
  },
  schedule: {
    style: 'colorful',
    showEmoji: true,
    timeSlots: 8,
    daysCount: 5,
  },
  notices: {
    cardStyle: 'colorful',
    showTags: true,
    itemsPerPage: 10,
  },
};
