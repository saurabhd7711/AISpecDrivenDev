import type { MenuItem } from '../types/menuItem';

export const menuData: MenuItem[] = [
  {
    id: 'm1',
    name: 'Big Mac',
    description:
      'Two beef patties with special sauce, lettuce, cheese, pickles, and onions.',
    price: 5.99,
    category: 'Burger',
    isAvailable: true,
  },
  {
    id: 'm2',
    name: 'McChicken',
    description: 'Crispy chicken patty with mayo and shredded lettuce.',
    price: 4.49,
    category: 'Burger',
    isAvailable: true,
  },
  {
    id: 'm3',
    name: 'French Fries (Large)',
    description: 'Golden, crispy fries lightly salted.',
    price: 2.99,
    category: 'Side',
    isAvailable: true,
  },
  {
    id: 'm4',
    name: 'Coca-Cola (Medium)',
    description: 'Refreshing Coca-Cola served with ice.',
    price: 1.99,
    category: 'Drink',
    isAvailable: true,
  },
  {
    id: 'm5',
    name: 'McFlurry Oreo',
    description: 'Creamy vanilla soft serve with Oreo cookie pieces.',
    price: 3.49,
    category: 'Dessert',
    isAvailable: true,
  },
  {
    id: 'm6',
    name: 'Quarter Pounder with Cheese',
    description: 'A quarter pound beef patty with cheese, onions, and pickles.',
    price: 6.49,
    category: 'Burger',
    isAvailable: false,
  },
];
