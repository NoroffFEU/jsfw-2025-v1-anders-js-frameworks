"use client";

import { getProducts } from "@/lib/api";
import { Product } from "@/types/product";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function SubNav() {
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const results = query.trim().length > 0
    ? products.filter((p) =>
        p.title.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const q = query.trim();
    setDropdownOpen(false);
    router.push(q ? `/products?q=${encodeURIComponent(q)}` : "/products");
    setMenuOpen(false);
  };

  const navLinks = (
    <>
      <Link
        href="/products"
        onClick={() => setMenuOpen(false)}
        className="text-lg group relative w-max cursor-pointer hover:text-blue-500"
      >
        <span>All products</span>
        <span className="absolute -bottom-1 left-0 w-0 transition-all h-0.5 bg-blue-500 group-hover:w-full"></span>
      </Link>
      <Link
        href="/contact"
        onClick={() => setMenuOpen(false)}
        className="text-lg group relative w-max cursor-pointer hover:text-blue-500"
      >
        <span>Contact</span>
        <span className="absolute -bottom-1 left-0 w-0 transition-all h-0.5 bg-blue-500 group-hover:w-full"></span>
      </Link>
    </>
  );

  return (
    <nav className="border-b border-gray-400 bg-white shadow-md">
      <div className="flex justify-between items-center px-6 py-4">
        {/* Desktop links */}
        <div className="hidden md:flex gap-10">{navLinks}</div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden cursor-pointer"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          )}
        </button>

        {/* Search with dropdown */}
        <div ref={searchRef} className="relative">
          <form
            onSubmit={handleSearch}
            className="flex items-center border-2 border-blue-300 rounded-2xl px-2"
          >
            <button type="submit" className="cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
            </button>
            <input
              className="focus:outline-0 py-1 px-2 w-40 md:w-56"
              type="search"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setDropdownOpen(true);
              }}
              placeholder="Search..."
            />
          </form>

          {/* Results dropdown */}
          {dropdownOpen && results.length > 0 && (
            <ul className="absolute right-0 top-full mt-2 w-72 bg-white border border-gray-200 rounded-xl shadow-lg z-50 max-h-80 overflow-y-auto">
              {results.map((product) => (
                <li key={product.id}>
                  <Link
                    href={`/products/${product.id}`}
                    onClick={() => {
                      setQuery("");
                      setDropdownOpen(false);
                    }}
                    className="flex items-center justify-between px-4 py-3 hover:bg-blue-50 transition-colors"
                  >
                    <span className="font-medium text-sm">{product.title}</span>
                    <span className="text-xs text-gray-400 whitespace-nowrap ml-4">
                      {product.discountedPrice ?? product.price} kr
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}

          {dropdownOpen && query.trim().length > 0 && results.length === 0 && (
            <div className="absolute right-0 top-full mt-2 w-72 bg-white border border-gray-200 rounded-xl shadow-lg z-50 px-4 py-3 text-sm text-gray-400">
              No products found
            </div>
          )}
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="md:hidden flex flex-col gap-4 px-6 pb-4 border-t border-gray-100">
          {navLinks}
        </div>
      )}
    </nav>
  );
}
