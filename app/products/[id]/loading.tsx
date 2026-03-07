export default function Loading() {
  return (
    <main className="max-w-4xl mx-auto px-10 py-16 animate-pulse">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="aspect-4/3 bg-gray-200 rounded-xl" />
        <div className="space-y-4">
          <div className="h-8 bg-gray-200 rounded w-3/4" />
          <div className="h-5 bg-gray-200 rounded w-1/4" />
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-5/6" />
          <div className="h-12 bg-gray-200 rounded-xl w-40 mt-6" />
        </div>
      </div>
    </main>
  );
}
