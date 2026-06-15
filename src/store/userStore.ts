import { create } from 'zustand';
import { loadRoleMenuConfig } from '@/utils/configLoader';
import type { UserInfo, UserRole, MenuItem } from '@/types';

interface UserState {
  user: UserInfo | null;
  isAuthenticated: boolean;
  menuItems: MenuItem[];
  login: (userInfo: UserInfo) => void;
  logout: () => void;
  updateUser: (info: Partial<UserInfo>) => void;
  setRole: (role: UserRole) => void;
}

const defaultUser: UserInfo = {
  id: 'demo-001',
  name: '张老师',
  avatar: undefined,
  role: 'teacher',
  campusId: 'primary',
  className: '三年级(2)班',
};

export const useUserStore = create<UserState>((set, get) => ({
  user: defaultUser,
  isAuthenticated: true,
  menuItems: loadRoleMenuConfig('teacher').menuItems,

  login: (userInfo: UserInfo) => {
    const menuConfig = loadRoleMenuConfig(userInfo.role);
    set({
      user: userInfo,
      isAuthenticated: true,
      menuItems: menuConfig.menuItems,
    });
  },

  logout: () => {
    set({
      user: null,
      isAuthenticated: false,
      menuItems: [],
    });
  },

  updateUser: (info: Partial<UserInfo>) => {
    const { user } = get();
    if (!user) return;

    const updated = { ...user, ...info };
    let menuItems = get().menuItems;

    if (info.role && info.role !== user.role) {
      const menuConfig = loadRoleMenuConfig(info.role);
      menuItems = menuConfig.menuItems;
    }

    set({ user: updated, menuItems });
  },

  setRole: (role: UserRole) => {
    const menuConfig = loadRoleMenuConfig(role);
    set((state) => ({
      user: state.user ? { ...state.user, role } : null,
      menuItems: menuConfig.menuItems,
    }));
  },
}));
