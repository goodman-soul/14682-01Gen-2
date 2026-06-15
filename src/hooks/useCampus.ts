import { useMemo, useEffect } from 'react';
import { useCampusStore } from '@/store/campusStore';
import type { CampusId } from '@/types';

export function useCampus() {
  const { currentCampusId, config, isLoading, error, setCampus, reloadConfig } =
    useCampusStore();

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--color-primary', config.theme.primaryColor);
    root.style.setProperty('--color-primary-light', config.theme.primaryLight);
    root.style.setProperty('--color-primary-dark', config.theme.primaryDark);
    root.style.setProperty('--color-secondary', config.theme.secondaryColor);
    root.style.setProperty('--color-bg', config.theme.backgroundColor);
    root.style.setProperty('--color-surface', config.theme.surfaceColor);
    root.style.setProperty('--color-text-primary', config.theme.textPrimary);
    root.style.setProperty('--color-text-secondary', config.theme.textSecondary);
    root.style.setProperty('--radius-card', config.theme.cardRadius);
    root.style.setProperty('--shadow-card', config.theme.shadowSize);
  }, [config]);

  const themeColors = useMemo(() => {
    const hexToRgb = (hex: string) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result
        ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16),
          }
        : { r: 0, g: 0, b: 0 };
    };

    const primaryRgb = hexToRgb(config.theme.primaryColor);

    return {
      primary: config.theme.primaryColor,
      primaryLight: config.theme.primaryLight,
      primaryDark: config.theme.primaryDark,
      secondary: config.theme.secondaryColor,
      primaryRgb: `${primaryRgb.r}, ${primaryRgb.g}, ${primaryRgb.b}`,
    };
  }, [config]);

  const switchCampus = (campusId: CampusId) => {
    setCampus(campusId);
  };

  return {
    campusId: currentCampusId,
    config,
    isLoading,
    error,
    themeColors,
    switchCampus,
    reloadConfig,
    logo: config.logo,
    theme: config.theme,
    homeModules: config.homeModules,
    scheduleConfig: config.schedule,
    noticesConfig: config.notices,
  };
}
