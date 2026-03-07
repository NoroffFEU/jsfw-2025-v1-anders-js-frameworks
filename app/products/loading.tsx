export default function Loading() {
  return (
    <main className="max-w-7xl mx-auto px-10 py-16">
      <div className="h-8 bg-gray-200 rounded w-48 mb-6 animate-pulse" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="border-2 border-gray-100 p-4 rounded-xl animate-pulse">
            <div className="aspect-4/3 bg-gray-200 rounded-lg" />
            <div className="pt-3 space-y-2">
              <div className="h-5 bg-gray-200 rounded w-3/4" />
              <div className="h-4 bg-gray-200 rounded w-1/2" />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
