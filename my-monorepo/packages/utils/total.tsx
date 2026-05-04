// packages/utils/total.ts
export const calculateTotal = (cart: any[]) => {
  return cart.reduce((sum, item) => sum + item.price, 0);
};