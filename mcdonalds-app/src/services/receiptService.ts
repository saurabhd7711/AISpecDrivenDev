import type { Order } from '../types/order';
import type { Receipt } from '../types/receipt';
import { generateId } from '../utils/idUtils';

export const generateReceipt = (order: Order): Receipt => {
  return {
    id: generateId(),
    orderId: order.id,
    items: order.items,
    totalAmount: order.totalAmount,
    placedAt: order.placedAt,
    completedAt: order.completedAt,
    isActive: true,
  };
};

export const closeReceipt = (receipt: Receipt): Receipt => {
  return {
    ...receipt,
    isActive: false,
  };
};
