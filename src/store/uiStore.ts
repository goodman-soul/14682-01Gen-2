import { create } from 'zustand';

interface UIState {
  sidebarCollapsed: boolean;
  sidebarMobileOpen: boolean;
  themeMode: 'light' | 'dark';
  toggleSidebar: () => void;
  toggleMobileSidebar: () => void;
  closeMobileSidebar: () => void;
  setThemeMode: (mode: 'light' | 'dark') => void;
}

export const useUIStore = create<UIState>((set) => ({
  sidebarCollapsed: false,
  sidebarMobileOpen: false,
  themeMode: 'light',

  toggleSidebar: () =>
    set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),

  toggleMobileSidebar: () =>
    set((state) => ({ sidebarMobileOpen: !state.sidebarMobileOpen })),

  closeMobileSidebar: () => set({ sidebarMobileOpen: false }),

  setThemeMode: (mode: 'light' | 'dark') => set({ themeMode: mode }),
}));
