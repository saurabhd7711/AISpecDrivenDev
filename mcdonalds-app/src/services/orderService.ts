import type { CartItem } from '../types/cartItem';
import type { Order, OrderStatus } from '../types/order';
import { generateId } from '../utils/idUtils';
import { getCurrentISOTime } from '../utils/timeUtils';

export const createOrder = (cart: CartItem[]): Order => {
  return {
    id: generateId(),
    items: cart,
    totalAmount: cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    ),
    status: 'Pending',
    placedAt: getCurrentISOTime(),
  };
};

export const updateOrderStatus = (
  order: Order,
  status: OrderStatus
): Order => {
  return {
    ...order,
    status,
    completedAt: status === 'Completed' ? getCurrentISOTime() : order.completedAt,
  };
};

export const getOrderById = (
  orders: Order[],
  id: string
): Order | undefined => {
  return orders.find((order) => order.id === id);
};
