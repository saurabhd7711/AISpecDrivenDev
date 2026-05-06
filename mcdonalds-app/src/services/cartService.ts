import type { CartItem } from '../types/cartItem';
import type { MenuItem } from '../types/menuItem';
import { generateId } from '../utils/idUtils';

export const addItemToCart = (
  cart: CartItem[],
  menuItem: MenuItem
): CartItem[] => {
  const existingItem = cart.find((item) => item.menuItemId === menuItem.id);

  if (existingItem) {
    return cart.map((item) =>
      item.menuItemId === menuItem.id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
  }

  const newCartItem: CartItem = {
    id: generateId(),
    menuItemId: menuItem.id,
    name: menuItem.name,
    price: menuItem.price,
    quantity: 1,
  };

  return [...cart, newCartItem];
};

export const removeItemFromCart = (
  cart: CartItem[],
  cartItemId: string
): CartItem[] => {
  return cart.filter((item) => item.id !== cartItemId);
};

export const updateItemQuantity = (
  cart: CartItem[],
  cartItemId: string,
  quantity: number
): CartItem[] => {
  if (quantity < 1) {
    return removeItemFromCart(cart, cartItemId);
  }

  return cart.map((item) =>
    item.id === cartItemId ? { ...item, quantity } : item
  );
};

export const calculateTotal = (cart: CartItem[]): number => {
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
};

export const clearCart = (): CartItem[] => {
  return [];
};
