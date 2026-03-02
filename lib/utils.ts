export function calculateDiscountPercentage(
  price: number,
  discountedPrice: number,
): number {
  return Math.round(((price - discountedPrice) / price) * 100);
}
