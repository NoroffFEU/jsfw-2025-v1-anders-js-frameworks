"use client";

import { useRouter, useSearchParams } from "next/navigation";

const options = [
  { value: "default", label: "Default" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
  { value: "name", label: "Name A–Z" },
];

export default function SortDropdown() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const current = searchParams.get("sort") ?? "default";

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams.toString());
    if (e.target.value === "default") {
      params.delete("sort");
    } else {
      params.set("sort", e.target.value);
    }
    router.push(`/products?${params.toString()}`);
  };

  return (
    <select
      value={current}
      onChange={handleChange}
      className="border-2 border-blue-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-blue-500 cursor-pointer"
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}
