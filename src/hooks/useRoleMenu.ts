import { useMemo } from 'react';
import { useUserStore } from '@/store/userStore';
import type { UserRole, MenuItem } from '@/types';

export function useRoleMenu() {
  const { user, menuItems, setRole } = useUserStore();

  const flatMenuItems = useMemo(() => {
    const flatten = (items: MenuItem[]): MenuItem[] => {
      return items.reduce<MenuItem[]>((acc, item) => {
        acc.push(item);
        if (item.children && item.children.length > 0) {
          acc.push(...flatten(item.children));
        }
        return acc;
      }, []);
    };
    return flatten(menuItems);
  }, [menuItems]);

  const hasMenuKey = (key: string): boolean => {
    return flatMenuItems.some((item) => item.key === key);
  };

  const getMenuItemByKey = (key: string): MenuItem | undefined => {
    return flatMenuItems.find((item) => item.key === key);
  };

  const switchRole = (role: UserRole) => {
    setRole(role);
  };

  return {
    user,
    role: user?.role,
    menuItems,
    flatMenuItems,
    hasMenuKey,
    getMenuItemByKey,
    switchRole,
  };
}
