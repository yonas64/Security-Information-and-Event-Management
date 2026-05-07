// packages/utils/wishlist.ts
export const addToWishlist = (wishlist: any[], product: any) => {
  if (wishlist.find((item) => item.id === product.id)) return wishlist;
  return [...wishlist, product];
};

export const removeFromWishlist = (wishlist: any[], productId: number) => {
  return wishlist.filter((item) => item.id !== productId);
};

export const isInWishlist = (wishlist: any[], productId: number) => {
  return wishlist.some((item) => item.id === productId);
};
