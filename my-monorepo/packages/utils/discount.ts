// packages/utils/discount.ts
const VALID_CODES: Record<string, number> = {
  SAVE10: 0.1,
  SAVE20: 0.2,
};

export const applyDiscount = (total: number, code: string): number => {
  const rate = VALID_CODES[code.toUpperCase()];
  if (!rate) return total;
  return total * (1 - rate);
};

export const isValidCoupon = (code: string): boolean => {
  return code.toUpperCase() in VALID_CODES;
};
