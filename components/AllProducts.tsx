import { Product } from "@/types/product";
import Image from "next/image";
import Link from "next/link";

interface AllProductsProps {
  products: Product[];
}

export default function AllProducts({ products }: AllProductsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-10 py-10">
      {products.map((product) => (
        <Link
          key={product.id}
          href={`/products/${product.id}`}
          className="border-2 border-blue-500 p-4 rounded-xl shadow-lg block"
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
            <h2 className="text-xl font-bold">{product.title}</h2>
            {product.discountedPrice &&
            product.discountedPrice < product.price ? (
              <div className="flex items-center gap-2">
                <p className="text-red-500 font-semibold">
                  {product.discountedPrice} kr
                </p>
                <p className="line-through text-gray-400 text-sm">
                  {product.price} kr
                </p>
              </div>
            ) : (
              <p>{product.price} kr</p>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
}
