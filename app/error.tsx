"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <main className="max-w-3xl mx-auto px-10 py-20 text-center text-gray-600">
      <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
      <p className="text-gray-400 mb-8">{error.message || "An unexpected error occurred."}</p>
      <button
        onClick={reset}
        className="bg-blue-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-600 transition-colors"
      >
        Try again
      </button>
    </main>
  );
}
