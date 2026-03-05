"use client";

import { useCart } from "@/context/CartContext";
import { Product } from "@/types/product";

export default function AddToCartButton({ product }: { product: Product }) {
  const { addToCart, openCart } = useCart();

  const handleClick = () => {
    addToCart(product);
    openCart();
  };

  return (
    <button
      onClick={handleClick}
      className="bg-blue-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-600 transition-colors cursor-pointer"
    >
      Add to Cart
    </button>
  );
}
