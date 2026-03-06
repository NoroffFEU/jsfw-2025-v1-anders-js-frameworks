import AllProducts from "@/components/AllProducts";
import SortDropdown from "@/components/SortDropdown";
import { getProducts } from "@/lib/api";
import { Product } from "@/types/product";
import { Suspense } from "react";

interface Props {
  searchParams: Promise<{ q?: string; sort?: string }>;
}

function sortProducts(products: Product[], sort?: string): Product[] {
  const copy = [...products];
  switch (sort) {
    case "price-asc":
      return copy.sort(
        (a, b) =>
          (a.discountedPrice ?? a.price) - (b.discountedPrice ?? b.price)
      );
    case "price-desc":
      return copy.sort(
        (a, b) =>
          (b.discountedPrice ?? b.price) - (a.discountedPrice ?? a.price)
      );
    case "rating":
      return copy.sort((a, b) => b.rating - a.rating);
    case "name":
      return copy.sort((a, b) => a.title.localeCompare(b.title));
    default:
      return copy;
  }
}

export default async function ProductsPage({ searchParams }: Props) {
  const { q, sort } = await searchParams;
  const products = await getProducts();

  const filtered = q
    ? products.filter((p) => p.title.toLowerCase().includes(q.toLowerCase()))
    : products;

  const sorted = sortProducts(filtered, sort);

  return (
    <main>
      <div className="px-10 pt-10 flex items-end justify-between">
        <div>
          {q ? (
            <>
              <h1 className="text-2xl font-bold text-gray-800">
                Results for &quot;{q}&quot;
              </h1>
              <p className="text-gray-400 text-sm mt-1">
                {sorted.length} product{sorted.length !== 1 ? "s" : ""} found
              </p>
            </>
          ) : (
            <h1 className="text-2xl font-bold text-gray-800">All Products</h1>
          )}
        </div>
        <Suspense>
          <SortDropdown />
        </Suspense>
      </div>
      <AllProducts products={sorted} />
    </main>
  );
}
