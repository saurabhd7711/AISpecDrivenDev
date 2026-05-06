import type { MenuItem } from '../types/menuItem';

export const getAllMenuItems = (menuItems: MenuItem[]): MenuItem[] => {
  return menuItems;
};

export const getMenuItemById = (
  menuItems: MenuItem[],
  id: string
): MenuItem | undefined => {
  return menuItems.find((item) => item.id === id);
};

export const getMenuItemsByCategory = (
  menuItems: MenuItem[],
  category: string
): MenuItem[] => {
  return menuItems.filter((item) => item.category === category);
};
