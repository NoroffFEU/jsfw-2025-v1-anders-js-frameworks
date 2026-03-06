"use client";

import { Product } from "@/types/product";
import { createContext, useContext, useSyncExternalStore, useState } from "react";

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<CartContextType | null>(null);

const EMPTY: CartItem[] = [];
let cachedCartString: string | null = null;
let cachedCart: CartItem[] = EMPTY;

function readCart(): CartItem[] {
  try {
    const stored = localStorage.getItem("cart");
    if (stored === cachedCartString) return cachedCart;
    cachedCartString = stored;
    cachedCart = stored ? JSON.parse(stored) : EMPTY;
    return cachedCart;
  } catch {
    return cachedCart;
  }
}

function writeCart(items: CartItem[]) {
  localStorage.setItem("cart", JSON.stringify(items));
  window.dispatchEvent(new Event("cart-update"));
}

function subscribeToCart(callback: () => void) {
  window.addEventListener("cart-update", callback);
  return () => window.removeEventListener("cart-update", callback);
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const items = useSyncExternalStore(subscribeToCart, readCart, () => EMPTY);
  const [isOpen, setIsOpen] = useState(false);

  const addToCart = (product: Product) => {
    const current = readCart();
    const existing = current.find((item) => item.product.id === product.id);
    if (existing) {
      writeCart(
        current.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      writeCart([...current, { product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId: string) => {
    writeCart(readCart().filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      writeCart(
        readCart().map((item) =>
          item.product.id === productId ? { ...item, quantity } : item
        )
      );
    }
  };

  const clearCart = () => writeCart([]);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        isOpen,
        openCart: () => setIsOpen(true),
        closeCart: () => setIsOpen(false),
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
}
