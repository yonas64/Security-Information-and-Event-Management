// packages/utils/cart.ts
export const addToCart = (cart: any[], product: any) => {
  return [...cart, product];
};

export const removeFromCart = (cart: any[], index: number) => {
  return cart.filter((_, i) => i !== index);
};