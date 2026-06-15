import { primaryCampusConfig } from './campuses/primary';
import { juniorCampusConfig } from './campuses/junior';
import { seniorCampusConfig } from './campuses/senior';
import { fallbackCampusConfig } from './fallback';
import { teacherMenuConfig } from './roles/teacher';
import { parentMenuConfig } from './roles/parent';
import { studentMenuConfig } from './roles/student';
import type { CampusId, CampusConfig, UserRole, RoleMenuConfig } from '@/types';

export const campusConfigs: Record<CampusId, CampusConfig> = {
  primary: primaryCampusConfig,
  junior: juniorCampusConfig,
  senior: seniorCampusConfig,
};

export const roleMenuConfigs: Record<UserRole, RoleMenuConfig> = {
  teacher: teacherMenuConfig,
  parent: parentMenuConfig,
  student: studentMenuConfig,
};

export { fallbackCampusConfig };
export { primaryCampusConfig, juniorCampusConfig, seniorCampusConfig };
export { teacherMenuConfig, parentMenuConfig, studentMenuConfig };
