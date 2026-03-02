import { Product } from "@/types/product";

interface AllProductsProps {
  products: Product[];
}

export default function AllProducts({ products }: AllProductsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <div key={product.id} className="border p-4 rounded-xl shadow">
          <img
            className="w-60"
            src={product.image.url}
            alt={product.image.alt}
          />
          <h2 className="text-xl font-bold">{product.title}</h2>
          <p>{product.price} kr</p>
        </div>
      ))}
    </div>
  );
}
