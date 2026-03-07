"use client";

import { useCart } from "@/context/CartContext";

export default function Toast() {
  const { toastMessage } = useCart();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-gray-900 text-white px-6 py-3 rounded-xl shadow-lg text-sm font-medium animate-fade-in">
      {toastMessage}
    </div>
  );
}
