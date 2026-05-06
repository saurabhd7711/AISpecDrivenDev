import type { CartItem } from './cartItem';

export interface Receipt {
  id: string;
  orderId: string;
  items: CartItem[];
  totalAmount: number;
  placedAt: string;
  completedAt?: string;
  isActive: boolean;
}
