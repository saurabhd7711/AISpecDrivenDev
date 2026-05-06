import type { CartItem } from './cartItem';

export type OrderStatus = 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';

export interface Order {
  id: string;
  items: CartItem[];
  totalAmount: number;
  status: OrderStatus;
  placedAt: string;
  completedAt?: string;
}
