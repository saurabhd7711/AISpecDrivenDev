export type MenuCategory = 'Burger' | 'Side' | 'Drink' | 'Dessert';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: MenuCategory;
  isAvailable: boolean;
  imageUrl?: string;
}
