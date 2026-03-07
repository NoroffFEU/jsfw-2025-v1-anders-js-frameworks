"use client";

import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <main className="max-w-3xl mx-auto px-10 py-20 text-center text-gray-600">
      <h2 className="text-2xl font-bold mb-4">Product not found</h2>
      <p className="text-gray-400 mb-8">{error.message || "We couldn't load this product."}</p>
      <div className="flex justify-center gap-4">
        <button
          onClick={reset}
          className="border-2 border-blue-500 text-blue-500 px-6 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-colors"
        >
          Try again
        </button>
        <Link
          href="/products"
          className="bg-blue-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-600 transition-colors"
        >
          Back to products
        </Link>
      </div>
    </main>
  );
}
