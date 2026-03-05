"use client";

import { useCart } from "@/context/CartContext";
import Image from "next/image";

export default function CartDrawer() {
  const { items, removeFromCart, clearCart, totalItems, isOpen, closeCart } =
    useCart();

  const total = items.reduce(
    (sum, { product, quantity }) =>
      sum + (product.discountedPrice ?? product.price) * quantity,
    0
  );

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={closeCart}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-96 bg-white z-50 shadow-2xl flex flex-col transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center px-6 py-5 border-b">
          <h2 className="text-xl font-bold">Your Cart ({totalItems})</h2>
          <button
            onClick={closeCart}
            className="text-gray-400 hover:text-gray-800 text-xl cursor-pointer"
          >
            ✕
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex-1 flex items-center justify-center text-gray-400">
            Your cart is empty
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-4">
              {items.map(({ product, quantity }) => (
                <div key={product.id} className="flex items-center gap-4">
                  <div className="relative w-16 h-16 flex-shrink-0">
                    <Image
                      src={product.image.url}
                      alt={product.image.alt}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-sm">{product.title}</p>
                    <p className="text-sm text-gray-500">
                      {product.discountedPrice ?? product.price} kr × {quantity}
                    </p>
                  </div>
                  <button
                    onClick={() => removeFromCart(product.id)}
                    className="text-red-400 hover:text-red-600 text-sm cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <div className="px-6 py-5 border-t">
              <div className="flex justify-between mb-4">
                <p className="font-semibold">Total</p>
                <p className="font-bold">{total.toFixed(2)} kr</p>
              </div>
              <button className="w-full bg-blue-500 text-white py-3 rounded-xl font-semibold hover:bg-blue-600 transition-colors mb-2 cursor-pointer">
                Checkout
              </button>
              <button
                onClick={clearCart}
                className="w-full text-sm text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                Clear cart
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
