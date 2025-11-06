// app/(shop)/shopPage/page.jsx
"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import product1 from '@/public/product1.jpg';
import product2 from '@/public/product2.jpg';
import product3 from '@/public/product3.jpg';
import product4 from '@/public/product4.jpg';
import product5 from '@/public/product5.jpg';
import product6 from '@/public/product6.jpg';
import Image from "next/image";
import ProductCard from "@/app/components/layout/ProductCard";

// Helper function for color CSS - moved to top
function colorCss(name) {
  const map = {
    black: "#111827",
    brown: "#92400e",
    red: "#ef4444",
    white: "#ffffff",
    yellow: "#facc15",
    blue: "#3b82f6",
    gray: "#9ca3af",
    lilac: "#c4b5fd",
  };
  return map[name] || "#9ca3af";
}

const SAMPLE_PRODUCTS = [
  {
    id: 1,
    name: "Adult Quantity Tee",
    priceMin: 26,
    priceMax: 29,
    badge: "Sale",
    image: product1,
    colors: ["black", "brown", "white"],
    soldOut: false,
    category: "T-Shirt",
  },
  {
    id: 2,
    name: "All-Over-Print Hoodie",
    priceMin: 26,
    priceMax: 29,
    badge: "New",
    image: product2,
    colors: ["gray"],
    soldOut: false,
    category: "Hoodie",
  },
  {
    id: 3,
    name: "AOP Cut & Sew Tee",
    priceMin: 26,
    priceMax: 29,
    badge: "Sale",
    image: product3,
    colors: ["white"],
    soldOut: false,
    category: "T-Shirt",
  },
  {
    id: 4,
    name: "Fine Jersey Tee",
    priceMin: 28,
    priceMax: 28,
    badge: "Hot",
    image: product4,
    colors: ["blue"],
    soldOut: false,
    category: "T-Shirt",
  },
  {
    id: 5,
    name: "Fit Round-neck T-shirt",
    priceMin: 26,
    priceMax: 29,
    badge: null,
    image: product5,
    colors: ["black", "brown"],
    soldOut: false,
    category: "T-Shirt",
  },
  {
    id: 6,
    name: "Hooded Sweatshirt",
    priceMin: 28,
    priceMax: 28,
    badge: "Hot",
    image: product6,
    colors: ["white"],
    soldOut: false,
    category: "Hoodie",
  },
  {
    id: 7,
    name: "Kids Hoodie",
    priceMin: 26,
    priceMax: 29,
    badge: "New",
    image: product1,
    colors: ["yellow"],
    soldOut: false,
    category: "Kids",
  },
  {
    id: 8,
    name: "Lightweight Fashion Tee",
    priceMin: 32,
    priceMax: 32,
    badge: null,
    image: product2,
    colors: ["black"],
    soldOut: false,
    category: "T-Shirt",
  },
  {
    id: 9,
    name: "Midweight Cotton Tee",
    priceMin: 26,
    priceMax: 29,
    badge: null,
    image: product3,
    colors: ["brown"],
    soldOut: false,
    category: "T-Shirt",
  },
  {
    id: 10,
    name: "Premium Crewneck Sweatshirt",
    priceMin: 29,
    priceMax: 29,
    badge: "Sold out",
    image: product4,
    colors: ["black"],
    soldOut: true,
    category: "Sweater",
  },
  {
    id: 11,
    name: "Premium Pullover Hoodie",
    priceMin: 26,
    priceMax: 29,
    badge: "New",
    image: product5,
    colors: ["lilac"],
    soldOut: false,
    category: "Hoodie",
  },
  {
    id: 12,
    name: "Product Price by Options",
    priceMin: 26,
    priceMax: 29,
    badge: "New",
    image: product6,
    colors: ["gray"],
    soldOut: false,
    category: "Product Designer",
  },
];

// function Price({ min, max }) {
//   if (min === max) return <>${min.toFixed(2)}</>;
//   return <>${min.toFixed(2)} — ${max.toFixed(2)}</>;
// }



export default function ShopPage() {
  const [openMobileFilters, setOpenMobileFilters] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [priceMax, setPriceMax] = useState(150);
  const [selectedColors, setSelectedColors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 9;

  // categories example
  const categories = [
    "Hoodie",
    "Kids",
    "Long Sleeves",
    "Product Designer",
    "Sweater",
    "T-Shirt",
  ];

  // color options
  const colorOptions = ["black", "brown", "white", "yellow", "blue", "gray", "lilac"];

  // client-side filtered products
  const filtered = useMemo(() => {
    let list = SAMPLE_PRODUCTS.slice();

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(q));
    }

    if (selectedCategory) {
      // Improved category filtering using actual category field
      list = list.filter((p) => p.category === selectedCategory);
    }

    if (selectedColors.length) {
      list = list.filter((p) => p.colors.some((c) => selectedColors.includes(c)));
    }

    list = list.filter((p) => p.priceMin <= priceMax);

    return list;
  }, [search, selectedCategory, selectedColors, priceMax]);

  const total = filtered.length;
  const pages = Math.max(1, Math.ceil(total / perPage));
  const paginated = filtered.slice((currentPage - 1) * perPage, currentPage * perPage);

  function toggleColor(c) {
    setSelectedColors((prev) => (prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]));
  }

  function resetFilters() {
    setSearch("");
    setSelectedCategory(null);
    setSelectedColors([]);
    setPriceMax(150);
    setCurrentPage(1);
  }

  return (
    <div className="bg-white min-h-screen">
          {/* Header */}
        <div className="text-center mb-10 bg-gray-100 py-12">
          <h1 className="text-3xl font-semibold">Shop</h1>
          <p className="text-sm text-gray-500 mt-1">Home — Shop</p>
        </div>
      <div className="container mx-auto px-8 2xl:px-0">
      

        <div className="flex items-center justify-between mb-6 px-4 ">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setOpenMobileFilters(true)}
              className="lg:hidden inline-flex items-center gap-2 px-3 py-2 border rounded-lg text-sm"
            >
              Filters
            </button>
            <p className="text-sm text-gray-600 hidden sm:block">Showing {Math.min(total, perPage)} of {total} results</p>
          </div>

          <div className="flex items-center gap-3">
            <select
              className="border rounded-lg px-3 py-2 text-sm"
              aria-label="Sort products"
            >
              <option>Default sorting</option>
              <option>Latest</option>
              <option>Price: low to high</option>
              <option>Price: high to low</option>
            </select>

            <div className="hidden md:flex gap-2 items-center">
              <button className="p-2 border rounded-md" title="Grid view (default)">▦</button>
              <button className="p-2 border rounded-md" title="List view">≡</button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-8 px-4">
          {/* Sidebar (desktop) */}
          <aside className="col-span-3 hidden lg:block">
            <div className="space-y-8">
              {/* Search */}
              <div>
                <label htmlFor="search" className="block text-sm font-medium text-gray-700">Search</label>
                <div className="mt-2 relative">
                  <input
                    id="search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search products..."
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                  />
                </div>
              </div>

              {/* Categories */}
              <div>
                <h4 className="font-semibold mb-3">Product categories</h4>
                <ul className="space-y-2 text-sm text-gray-700 ">
                  <li>
                    <button
                      onClick={() => setSelectedCategory(null)}
                      className={`text-left cursor-pointer w-full ${selectedCategory === null ? "font-semibold" : "text-gray-600"}`}
                    >
                      All
                    </button>
                  </li>
                  {categories.map((c) => (
                    <li key={c}>
                      <button
                        onClick={() => setSelectedCategory(c)}
                        className={`text-left cursor-pointer w-full ${selectedCategory === c ? "font-semibold" : "text-gray-600"}`}
                      >
                        {c}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Price */}
              <div>
                <h4 className="font-semibold mb-3">Filter by price</h4>
                <input
                  type="range"
                  min={10}
                  max={150}
                  value={priceMax}
                  onChange={(e) => setPriceMax(Number(e.target.value))}
                  className="w-full cursor-pointer accent-black "
                />
                <div className="text-sm text-gray-600 mt-2">Price: $10 — ${priceMax}</div>
              </div>

              {/* Color */}
              <div>
                <h4 className="font-semibold mb-3">Filter by Color</h4>
                <div className="flex flex-wrap gap-2">
                  {colorOptions.map((c) => (
                    <button
                      key={c}
                      onClick={() => toggleColor(c)}
                      className={`flex items-center gap-2 px-2 py-1 border rounded-md text-sm ${selectedColors.includes(c) ? "bg-gray-100" : ""}`}
                    >
                      <span className="w-4 h-4 rounded-full" style={{ background: colorCss(c) }} />
                      <span className="capitalize">{c}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <button onClick={resetFilters} className="text-sm text-gray-600 underline">Reset Filters</button>
              </div>
            </div>
          </aside>

          {/* Main */}
          <main className="col-span-12 lg:col-span-9">
            {paginated.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">No products found. Try adjusting your filters.</p>
                <button onClick={resetFilters} className="mt-4 text-sm text-black underline">
                  Reset all filters
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {paginated.map((p) => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>

                {/* Pagination */}
                <div className="flex justify-center mt-10">
                  <nav className="inline-flex gap-2 items-center">
                    <button
                      onClick={() => setCurrentPage((s) => Math.max(1, s - 1))}
                      disabled={currentPage === 1}
                      className="px-3 py-2 border rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      ‹
                    </button>

                    {Array.from({ length: pages }).map((_, i) => {
                      const pageNum = i + 1;
                      return (
                        <button
                          key={pageNum}
                          onClick={() => setCurrentPage(pageNum)}
                          className={`w-9 h-9 rounded-full flex items-center justify-center ${currentPage === pageNum ? "bg-black text-white" : "border"}`}
                          aria-current={currentPage === pageNum ? "page" : undefined}
                        >
                          {pageNum}
                        </button>
                      );
                    })}

                    <button
                      onClick={() => setCurrentPage((s) => Math.min(pages, s + 1))}
                      disabled={currentPage === pages}
                      className="px-3 py-2 border rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      ›
                    </button>
                  </nav>
                </div>
              </>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {openMobileFilters && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpenMobileFilters(false)}
          />
          <div className="absolute right-0 top-0 bottom-0 w-80 bg-white p-4 overflow-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium">Filters</h3>
              <button onClick={() => setOpenMobileFilters(false)} className="text-sm text-gray-600">Close</button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Search</label>
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 mt-2"
                />
              </div>

              <div>
                <h4 className="font-semibold mb-2">Category</h4>
                <select
                  value={selectedCategory ?? ""}
                  onChange={(e) => setSelectedCategory(e.target.value || null)}
                  className="w-full border rounded-lg px-3 py-2"
                >
                  <option value="">All</option>
                  {categories.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Price</h4>
                <input
                  type="range"
                  min={10}
                  max={150}
                  value={priceMax}
                  onChange={(e) => setPriceMax(Number(e.target.value))}
                  className="w-full accent-black"
                />
                <div className="text-sm text-gray-600 mt-2">Max: ${priceMax}</div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Colors</h4>
                <div className="flex flex-wrap gap-2">
                  {colorOptions.map((c) => (
                    <button
                      key={c}
                      onClick={() => toggleColor(c)}
                      className={`flex items-center gap-2 px-2 py-1 border rounded-md ${selectedColors.includes(c) ? "bg-gray-100" : ""}`}
                    >
                      <span className="w-4 h-4 rounded-full" style={{ background: colorCss(c) }} />
                      <span className="capitalize">{c}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <button onClick={() => { resetFilters(); setOpenMobileFilters(false); }} className="flex-1 border rounded-md px-4 py-2">Reset</button>
                <button onClick={() => setOpenMobileFilters(false)} className="flex-1 bg-black text-white rounded-md px-4 py-2">Apply</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}