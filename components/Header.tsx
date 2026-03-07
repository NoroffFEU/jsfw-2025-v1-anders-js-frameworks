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

  const currentProduct = carouselProducts[current];
  const carouselIsDiscounted =
    currentProduct?.discountedPrice != null &&
    currentProduct.discountedPrice < currentProduct.price;
  const carouselDiscountPct = carouselIsDiscounted
    ? Math.round(
        ((currentProduct.price - currentProduct.discountedPrice!) /
          currentProduct.price) *
          100
      )
    : 0;

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
            {carouselProducts.map((product) => {
              const isDisc =
                product.discountedPrice != null &&
                product.discountedPrice < product.price;
              const pct = isDisc
                ? Math.round(
                    ((product.price - product.discountedPrice!) /
                      product.price) *
                      100
                  )
                : 0;
              return (
                <Link
                  key={product.id}
                  href={`/products/${product.id}`}
                  className="relative min-w-full aspect-video block"
                >
                  <Image
                    src={product.image.url}
                    alt={product.image.alt}
                    fill
                    className="object-cover rounded-2xl"
                  />
                  {isDisc && (
                    <span className="absolute top-3 left-3 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                      -{pct}%
                    </span>
                  )}
                </Link>
              );
            })}
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
            {currentProduct?.title}
          </h2>
          {carouselIsDiscounted ? (
            <div className="flex items-center gap-2 mt-4 pl-4">
              <p className="text-xl text-red-500 font-semibold">
                {currentProduct.discountedPrice} kr
              </p>
              <p className="line-through text-gray-400">
                {currentProduct.price} kr
              </p>
            </div>
          ) : (
            <p className="text-xl mt-4 pl-4">{currentProduct?.price} kr</p>
          )}
          {carouselIsDiscounted && (
            <span className="ml-3 mt-4 bg-red-100 text-red-500 text-xs font-bold px-2 py-1 rounded-full">
              -{carouselDiscountPct}%
            </span>
          )}
        </div>
      </div>

      {/* HØYRE – To produkter */}
      <div className="grid grid-cols-2 lg:grid-cols-1 lg:grid-rows-2 gap-6 lg:h-full">
        {sideProducts.map((product) => {
          const isDisc =
            product.discountedPrice != null &&
            product.discountedPrice < product.price;
          const pct = isDisc
            ? Math.round(
                ((product.price - product.discountedPrice!) / product.price) *
                  100
              )
            : 0;
          return (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="border-2 border-blue-500 rounded-xl p-4 shadow-lg block lg:flex lg:flex-col"
            >
              <div className="relative aspect-4/3 lg:aspect-auto lg:flex-1 lg:min-h-0">
                <Image
                  src={product.image.url}
                  alt={product.image.alt}
                  fill
                  className="object-cover rounded-lg"
                />
                {isDisc && (
                  <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    -{pct}%
                  </span>
                )}
              </div>
              <h3 className="mt-3 font-semibold">{product.title}</h3>
              {isDisc ? (
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
          );
        })}
      </div>
    </header>
  );
}
