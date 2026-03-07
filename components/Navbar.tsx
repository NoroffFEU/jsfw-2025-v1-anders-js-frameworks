"use client";

import { useCart } from "@/context/CartContext";
import Logo from "@/public/Logo.png";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const { openCart, totalItems } = useCart();

  return (
    <nav className="flex justify-between px-10 py-4 items-center border-b-2 border-blue-400 sticky top-0 z-10 bg-white shadow-md">
      <Link href="/">
        <Image className="w-60 cursor-pointer" src={Logo} alt="Logo for Snapbuy" />
      </Link>

      <div className="flex items-center gap-4">
        {/* Cart icon */}
        <button onClick={openCart} className="relative cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
            />
          </svg>
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </button>

      </div>
    </nav>
  );
}
