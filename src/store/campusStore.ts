import { create } from 'zustand';
import { loadCampusConfig } from '@/utils/configLoader';
import type { CampusConfig, CampusId } from '@/types';

interface CampusState {
  currentCampusId: CampusId;
  config: CampusConfig;
  isLoading: boolean;
  error: string | null;
  setCampus: (campusId: CampusId) => void;
  reloadConfig: () => void;
}

export const useCampusStore = create<CampusState>((set, get) => ({
  currentCampusId: 'primary',
  config: loadCampusConfig('primary'),
  isLoading: false,
  error: null,

  setCampus: (campusId: CampusId) => {
    const config = loadCampusConfig(campusId);
    set({ currentCampusId: campusId, config });
  },

  reloadConfig: () => {
    const { currentCampusId } = get();
    const config = loadCampusConfig(currentCampusId);
    set({ config });
  },
}));
