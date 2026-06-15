import { z } from 'zod';

export type CampusId = 'primary' | 'junior' | 'senior';

export type LogoStyle = 'circle' | 'shield' | 'square';
export type NoticeStyle = 'colorful' | 'minimal' | 'academic';
export type ScheduleStyle = 'colorful' | 'minimal' | 'compact';

export interface QuickEntryConfig {
  key: string;
  label: string;
  icon: string;
  path: string;
}

export interface CampusTheme {
  primaryColor: string;
  primaryLight: string;
  primaryDark: string;
  secondaryColor: string;
  backgroundColor: string;
  surfaceColor: string;
  textPrimary: string;
  textSecondary: string;
  cardRadius: string;
  shadowSize: string;
}

export interface CampusLogo {
  style: LogoStyle;
  text: string;
  icon: string;
  bgColor: string;
  textColor: string;
}

export interface HomeModulesConfig {
  quickEntries: QuickEntryConfig[];
  showSchedulePreview: boolean;
  showNotices: boolean;
  noticeStyle: NoticeStyle;
}

export interface ScheduleConfig {
  style: ScheduleStyle;
  showEmoji: boolean;
  timeSlots: number;
  daysCount: number;
}

export interface NoticesConfig {
  cardStyle: NoticeStyle;
  showTags: boolean;
  itemsPerPage: number;
}

export interface CampusConfig {
  id: CampusId;
  name: string;
  fullName: string;
  description: string;
  theme: CampusTheme;
  logo: CampusLogo;
  homeModules: HomeModulesConfig;
  schedule: ScheduleConfig;
  notices: NoticesConfig;
}

export const campusThemeSchema = z.object({
  primaryColor: z.string(),
  primaryLight: z.string(),
  primaryDark: z.string(),
  secondaryColor: z.string(),
  backgroundColor: z.string(),
  surfaceColor: z.string(),
  textPrimary: z.string(),
  textSecondary: z.string(),
  cardRadius: z.string(),
  shadowSize: z.string(),
});

export const campusLogoSchema = z.object({
  style: z.enum(['circle', 'shield', 'square']),
  text: z.string(),
  icon: z.string(),
  bgColor: z.string(),
  textColor: z.string(),
});

export const quickEntrySchema = z.object({
  key: z.string(),
  label: z.string(),
  icon: z.string(),
  path: z.string(),
});

export const homeModulesSchema = z.object({
  quickEntries: z.array(quickEntrySchema),
  showSchedulePreview: z.boolean(),
  showNotices: z.boolean(),
  noticeStyle: z.enum(['colorful', 'minimal', 'academic']),
});

export const scheduleSchema = z.object({
  style: z.enum(['colorful', 'minimal', 'compact']),
  showEmoji: z.boolean(),
  timeSlots: z.number(),
  daysCount: z.number(),
});

export const noticesSchema = z.object({
  cardStyle: z.enum(['colorful', 'minimal', 'academic']),
  showTags: z.boolean(),
  itemsPerPage: z.number(),
});

export const campusConfigSchema = z.object({
  id: z.enum(['primary', 'junior', 'senior']),
  name: z.string(),
  fullName: z.string(),
  description: z.string(),
  theme: campusThemeSchema,
  logo: campusLogoSchema,
  homeModules: homeModulesSchema,
  schedule: scheduleSchema,
  notices: noticesSchema,
});
