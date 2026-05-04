// packages/utils/search.ts
export const searchProducts = (products: any[], query: string) => {
  return products.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase())
  );
};