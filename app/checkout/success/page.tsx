"use client";

import Link from "next/link";

export default function CheckoutSuccessPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-[60vh] px-10 text-center text-gray-800">
      <div className="text-6xl mb-6">✓</div>
      <h1 className="text-3xl font-bold mb-3">Order confirmed!</h1>
      <p className="text-gray-500 mb-10">
        Thank you for your purchase. Your order is on its way.
      </p>
      <Link
        href="/"
        className="bg-blue-500 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-600 transition-colors"
      >
        Back to home
      </Link>
    </main>
  );
}
