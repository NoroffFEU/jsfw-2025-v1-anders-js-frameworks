"use client";

import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, clearCart, totalItems } =
    useCart();
  const router = useRouter();

  const total = items.reduce(
    (sum, { product, quantity }) =>
      sum + (product.discountedPrice ?? product.price) * quantity,
    0
  );

  const handleCheckout = () => {
    clearCart();
    router.push("/checkout/success");
  };

  if (items.length === 0) {
    return (
      <main className="max-w-3xl mx-auto px-10 py-20 text-center text-gray-500">
        <p className="text-2xl mb-6">Your cart is empty</p>
        <Link
          href="/"
          className="bg-blue-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-600 transition-colors"
        >
          Continue shopping
        </Link>
      </main>
    );
  }

  return (
    <main className="max-w-3xl mx-auto px-10 py-16 text-gray-800">
      <h1 className="text-3xl font-bold mb-10">
        Your Cart ({totalItems} item{totalItems !== 1 ? "s" : ""})
      </h1>

      <div className="flex flex-col gap-6">
        {items.map(({ product, quantity }) => {
          const price = product.discountedPrice ?? product.price;
          return (
            <div
              key={product.id}
              className="flex items-center gap-6 border rounded-xl p-4 shadow-sm"
            >
              <div className="relative w-24 h-24 flex-shrink-0">
                <Image
                  src={product.image.url}
                  alt={product.image.alt}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>

              <div className="flex-1">
                <p className="font-semibold text-lg">{product.title}</p>
                <p className="text-gray-500 text-sm">{price} kr each</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQuantity(product.id, quantity - 1)}
                  className="w-8 h-8 rounded-full border-2 border-blue-500 text-blue-500 font-bold hover:bg-blue-50 cursor-pointer"
                >
                  −
                </button>
                <span className="w-6 text-center font-semibold">{quantity}</span>
                <button
                  onClick={() => updateQuantity(product.id, quantity + 1)}
                  className="w-8 h-8 rounded-full border-2 border-blue-500 text-blue-500 font-bold hover:bg-blue-50 cursor-pointer"
                >
                  +
                </button>
              </div>

              <p className="w-24 text-right font-semibold">
                {(price * quantity).toFixed(2)} kr
              </p>

              <button
                onClick={() => removeFromCart(product.id)}
                className="text-red-400 hover:text-red-600 text-sm cursor-pointer"
              >
                Remove
              </button>
            </div>
          );
        })}
      </div>

      <div className="mt-10 border-t pt-6 flex flex-col items-end gap-4">
        <div className="flex justify-between w-full text-xl font-bold">
          <span>Total</span>
          <span>{total.toFixed(2)} kr</span>
        </div>
        <button
          onClick={handleCheckout}
          className="bg-blue-500 text-white px-10 py-3 rounded-xl font-semibold hover:bg-blue-600 transition-colors cursor-pointer"
        >
          Checkout
        </button>
        <button
          onClick={clearCart}
          className="text-sm text-gray-400 hover:text-gray-600 cursor-pointer"
        >
          Clear cart
        </button>
      </div>
    </main>
  );
}
