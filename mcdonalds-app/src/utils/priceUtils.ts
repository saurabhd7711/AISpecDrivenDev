export const formatPrice = (amount: number): string => {
  return `$${amount.toFixed(2)}`;
};

export const calculateSubtotal = (price: number, quantity: number): number => {
  return price * quantity;
};
