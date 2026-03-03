"use client";

import { Product } from "@/types/product";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface HeaderProps {
  products: Product[];
}

export default function Header({ products }: HeaderProps) {
  const carouselProducts = products.slice(11, 14);
  const sideProducts = products.slice(3, 5);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % carouselProducts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [carouselProducts.length]);

  return (
    <header className="grid grid-cols-1 lg:grid-cols-3 gap-6 py-10 px-10 border-b-2 border-blue-500 text-gray-800">
      {/* VENSTRE – Carousel */}
      <div className="lg:col-span-2 overflow-hidden rounded-2xl">
        <div className="relative">
          {/* Sliding track */}
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {carouselProducts.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className="relative min-w-full h-150 block"
              >
                <Image
                  src={product.image.url}
                  alt={product.image.alt}
                  fill
                  className="object-cover rounded-2xl"
                />
              </Link>
            ))}
          </div>

          {/* Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {carouselProducts.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${
                  i === current ? "bg-white" : "bg-white/40"
                }`}
              />
            ))}
          </div>
        </div>
        <div className="flex items-center">
          <h2 className="text-2xl font-bold mt-4 pl-4">
            {carouselProducts[current]?.title}
          </h2>
          {carouselProducts[current]?.discountedPrice &&
          carouselProducts[current].discountedPrice! <
            carouselProducts[current].price ? (
            <div className="flex items-center gap-2 mt-4 pl-4">
              <p className="text-xl text-red-500 font-semibold">
                {carouselProducts[current].discountedPrice} kr
              </p>
              <p className="line-through text-gray-400">
                {carouselProducts[current].price} kr
              </p>
            </div>
          ) : (
            <p className="text-xl mt-4 pl-4">
              {carouselProducts[current]?.price} kr
            </p>
          )}
        </div>
      </div>

      {/* HØYRE – To produkter */}
      <div className="flex flex-col gap-6">
        {sideProducts.map((product) => (
          <Link
            key={product.id}
            href={`/products/${product.id}`}
            className="border-2 border-blue-500 rounded-xl p-4 shadow-lg block"
          >
            <div className="relative h-49">
              <Image
                src={product.image.url}
                alt={product.image.alt}
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <h3 className="mt-3 font-semibold">{product.title}</h3>
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
          </Link>
        ))}
      </div>
    </header>
  );
}
