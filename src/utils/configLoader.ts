import { campusConfigSchema, roleMenuConfigSchema } from '@/types';
import { campusConfigs, roleMenuConfigs, fallbackCampusConfig } from '@/config';
import type { CampusId, CampusConfig, UserRole, RoleMenuConfig } from '@/types';

export function loadCampusConfig(campusId: string): CampusConfig {
  try {
    if (!campusId) {
      console.warn('[ConfigLoader] campusId is empty, using fallback config');
      return { ...fallbackCampusConfig };
    }

    const config = campusConfigs[campusId as CampusId];

    if (!config) {
      console.warn(`[ConfigLoader] Campus config not found for id: ${campusId}, using fallback config`);
      return { ...fallbackCampusConfig };
    }

    const result = campusConfigSchema.safeParse(config);

    if (!result.success) {
      console.warn(
        `[ConfigLoader] Campus config validation failed for id: ${campusId}`,
        result.error.issues
      );
      return mergeWithFallback(config, result.error);
    }

    return result.data;
  } catch (error) {
    console.error('[ConfigLoader] Unexpected error loading campus config:', error);
    return { ...fallbackCampusConfig };
  }
}

function mergeWithFallback(
  partialConfig: Partial<CampusConfig>,
  _error: unknown
): CampusConfig {
  try {
    const merged: CampusConfig = {
      ...fallbackCampusConfig,
      ...partialConfig,
      theme: {
        ...fallbackCampusConfig.theme,
        ...(partialConfig.theme || {}),
      },
      logo: {
        ...fallbackCampusConfig.logo,
        ...(partialConfig.logo || {}),
      },
      homeModules: {
        ...fallbackCampusConfig.homeModules,
        ...(partialConfig.homeModules || {}),
        quickEntries:
          partialConfig.homeModules?.quickEntries?.length ?
            partialConfig.homeModules.quickEntries
          : fallbackCampusConfig.homeModules.quickEntries,
      },
      schedule: {
        ...fallbackCampusConfig.schedule,
        ...(partialConfig.schedule || {}),
      },
      notices: {
        ...fallbackCampusConfig.notices,
        ...(partialConfig.notices || {}),
      },
    };

    const finalResult = campusConfigSchema.safeParse(merged);
    if (finalResult.success) {
      return finalResult.data;
    }

    console.warn('[ConfigLoader] Merged config still invalid, using pure fallback');
    return { ...fallbackCampusConfig };
  } catch {
    return { ...fallbackCampusConfig };
  }
}

export function loadRoleMenuConfig(role: string): RoleMenuConfig {
  try {
    if (!role) {
      console.warn('[ConfigLoader] role is empty, using student menu as default');
      return { ...roleMenuConfigs.student };
    }

    const config = roleMenuConfigs[role as UserRole];

    if (!config) {
      console.warn(`[ConfigLoader] Role menu config not found for role: ${role}, using student menu`);
      return { ...roleMenuConfigs.student };
    }

    const result = roleMenuConfigSchema.safeParse(config);

    if (!result.success) {
      console.warn(
        `[ConfigLoader] Role menu config validation failed for role: ${role}`,
        result.error.issues
      );
      return { ...roleMenuConfigs.student };
    }

    return result.data;
  } catch (error) {
    console.error('[ConfigLoader] Unexpected error loading role menu config:', error);
    return { ...roleMenuConfigs.student };
  }
}

export function getAllCampusIds(): CampusId[] {
  return ['primary', 'junior', 'senior'];
}

export function getAllCampusConfigs(): CampusConfig[] {
  return getAllCampusIds().map((id) => loadCampusConfig(id));
}

export function validateCampusConfig(config: unknown): {
  valid: boolean;
  config?: CampusConfig;
  error?: string;
} {
  const result = campusConfigSchema.safeParse(config);
  if (result.success) {
    return { valid: true, config: result.data };
  }
  return { valid: false, error: result.error.message };
}
