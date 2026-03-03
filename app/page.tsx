import AllProducts from "@/components/AllProducts";
import Header from "@/components/Header";
import PopularProducts from "@/components/PopularProducts";
import { getProducts } from "@/lib/api";

export default async function Home() {
  const products = await getProducts();

  return (
    <div className="flex min-h-screen items-center justify-center font-sans">
      <main className="flex flex-col min-h-screen w-screen">
        <Header products={products} />
        <div className="px-10">
          <PopularProducts products={products} />
        </div>
        <div className="px-10">
          <h2 className="text-4xl text-center text-gray-800 py-10">
            All Products
          </h2>
          <AllProducts products={products} />
        </div>
      </main>
    </div>
  );
}
