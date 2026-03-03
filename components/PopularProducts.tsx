import { Product } from "@/types/product";
import Image from "next/image";
import Link from "next/link";

interface PopularProductsProps {
  products: Product[];
}

export default function PopularProducts({ products }: PopularProductsProps) {
  const popular = [...products].sort((a, b) => b.rating - a.rating).slice(0, 4);

  return (
    <section className="px-10 py-10">
      <h2 className="text-4xl text-center text-gray-800 pb-10">
        Popular Products
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {popular.map((product) => (
          <Link
            key={product.id}
            href={`/products/${product.id}`}
            className="border-2 border-blue-500 rounded-xl p-4 shadow-lg flex flex-col"
          >
            <div className="relative h-48">
              <Image
                src={product.image.url}
                alt={product.image.alt}
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <div className="pt-10">
              <h3 className="mt-3 font-semibold text-xl">{product.title}</h3>
              <p className="text-sm text-gray-500">
                Rating: {product.rating} / 5
              </p>
              {product.discountedPrice &&
              product.discountedPrice < product.price ? (
                <div className="flex items-center gap-2">
                  <p className="text-sm text-red-500 font-semibold">
                    {product.discountedPrice} kr
                  </p>
                  <p className="line-through text-gray-400 text-xs">
                    {product.price} kr
                  </p>
                </div>
              ) : (
                <p className="text-sm">{product.price} kr</p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
