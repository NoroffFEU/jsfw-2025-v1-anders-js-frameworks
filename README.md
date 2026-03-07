# Snapbuy

An online shop built with Next.js, TypeScript, and Tailwind CSS for the Noroff JavaScript Frameworks assignment.

## Features

- Browse all products with discount badges and ratings
- Search products by name with live dropdown suggestions
- Sort products by price and rating
- Product detail pages with reviews
- Add to cart with toast feedback
- Cart drawer with item count badge
- Full cart page with quantity controls and total
- Checkout success page
- Contact form with validation
- Persistent cart using localStorage
- Responsive layout for mobile and desktop

## Tech Stack

- [Next.js 15](https://nextjs.org) (App Router)
- TypeScript
- Tailwind CSS
- [Noroff Online Shop API](https://v2.api.noroff.dev/online-shop)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
app/
  page.tsx                  # Home page (carousel + all products)
  products/
    page.tsx                # Product listing with search/sort
    [id]/page.tsx           # Individual product detail
  cart/page.tsx             # Cart page
  checkout/success/page.tsx # Order confirmation
  contact/page.tsx          # Contact form
components/
  Navbar.tsx                # Top nav with cart icon
  SubNav.tsx                # Search bar and category links
  Header.tsx                # Hero carousel + featured products
  AllProducts.tsx           # Product grid
  CartDrawer.tsx            # Slide-in cart drawer
  AddToCartButton.tsx       # Client-side add to cart
  SortDropdown.tsx          # URL-based sort control
  Toast.tsx                 # Cart action toast notifications
context/
  CartContext.tsx           # Global cart state with localStorage persistence
lib/
  api.ts                    # API fetch helpers
types/
  product.ts                # TypeScript interfaces
```
