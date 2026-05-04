// packages/utils/formatPrice.ts
export const formatPrice = (price: number) => {
  return `$${price.toFixed(2)}`;
};