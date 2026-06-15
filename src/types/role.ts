import { z } from 'zod';

export type UserRole = 'teacher' | 'parent' | 'student';

export interface MenuItem {
  key: string;
  label: string;
  icon: string;
  path: string;
  children?: MenuItem[];
}

export interface RoleMenuConfig {
  role: UserRole;
  menuItems: MenuItem[];
}

export interface UserInfo {
  id: string;
  name: string;
  avatar?: string;
  role: UserRole;
  campusId: string;
  className?: string;
}

export const menuItemSchema: z.ZodSchema<MenuItem> = z.lazy(() =>
  z.object({
    key: z.string(),
    label: z.string(),
    icon: z.string(),
    path: z.string(),
    children: z.array(menuItemSchema).optional(),
  })
);

export const roleMenuConfigSchema = z.object({
  role: z.enum(['teacher', 'parent', 'student']),
  menuItems: z.array(menuItemSchema),
});

export const userInfoSchema = z.object({
  id: z.string(),
  name: z.string(),
  avatar: z.string().optional(),
  role: z.enum(['teacher', 'parent', 'student']),
  campusId: z.string(),
  className: z.string().optional(),
});
