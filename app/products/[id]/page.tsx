import { getProductById } from "@/lib/api";
import Image from "next/image";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const product = await getProductById(id);

  const isDiscounted =
    product.discountedPrice != null &&
    product.discountedPrice < product.price;

  return (
    <main className="max-w-4xl mx-auto px-10 py-16 text-gray-800">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="relative h-96 rounded-2xl overflow-hidden">
          <Image
            src={product.image.url}
            alt={product.image.alt}
            fill
            className="object-cover"
          />
        </div>

        <div className="flex flex-col justify-center gap-4">
          <h1 className="text-3xl font-bold">{product.title}</h1>
          <p className="text-gray-500">{product.description}</p>

          {isDiscounted ? (
            <div className="flex items-center gap-3">
              <p className="text-2xl text-red-500 font-semibold">
                {product.discountedPrice} kr
              </p>
              <p className="line-through text-gray-400">{product.price} kr</p>
            </div>
          ) : (
            <p className="text-2xl font-semibold">{product.price} kr</p>
          )}

          <p className="text-sm text-gray-500">Rating: {product.rating} / 5</p>
        </div>
      </div>

      {product.reviews && product.reviews.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Reviews</h2>
          <div className="flex flex-col gap-4">
            {product.reviews.map((review) => (
              <div key={review.id} className="border rounded-xl p-4 shadow-sm">
                <div className="flex justify-between mb-1">
                  <p className="font-semibold">{review.username}</p>
                  <p className="text-sm text-gray-500">{review.rating} / 5</p>
                </div>
                <p className="text-gray-600 text-sm">{review.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
