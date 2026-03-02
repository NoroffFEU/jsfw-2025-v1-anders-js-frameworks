import AllProducts from "@/components/AllProducts";
import { getProducts } from "@/lib/api";

export default async function Home() {
  const products = await getProducts();

  return (
    <div className="flex min-h-screen items-center justify-center font-sans">
      <main className="flex flex-col min-h-screen w-screen pt-10">
        <h1 className="text-4xl font-mono">Mitt Next.Js prosjekt.</h1>
        <AllProducts products={products} />
      </main>
    </div>
  );
}
