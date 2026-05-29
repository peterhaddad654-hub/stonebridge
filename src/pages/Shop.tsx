import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { useProducts } from "@/context/ProductsContext";
import ProductCard from "@/components/ProductCard";

type SortOption = "default" | "price-asc" | "price-desc" | "name-asc";

export default function Shop() {
  const { products } = useProducts();
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [sort, setSort] = useState<SortOption>("default");

  const allCategories = useMemo(() => {
    const cats = [...new Set(products.map((p) => p.category))];
    return ["All", ...cats];
  }, [products]);

  const filtered = useMemo(() => {
    let result = [...products];
    if (query.trim()) {
      const q = query.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          (p.subcategory && p.subcategory.toLowerCase().includes(q))
      );
    }
    if (activeCategory !== "All") {
      result = result.filter((p) => p.category === activeCategory);
    }
    switch (sort) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }
    return result;
  }, [query, activeCategory, sort]);

  return (
    <main className="min-h-screen pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-[hsl(43,63%,44%)] text-xs tracking-[0.3em] uppercase mb-3">Complete Collection</p>
          <h1 className="font-serif text-4xl md:text-5xl text-white font-light">Shop All Spirits</h1>
        </motion.div>

        <div className="flex flex-col gap-4 md:flex-row md:items-end mb-8">
          <div className="relative flex-1 min-w-0">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[hsl(43,63%,44%)]" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, brand, or category..."
              data-testid="input-search"
              className="w-full min-w-0 bg-white/5 border border-white/10 text-white placeholder:text-white/40 pl-14 pr-14 py-4 text-sm rounded-[1.75rem] focus:border-[hsl(43,63%,44%)]/70 focus:outline-none transition duration-300 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/80"
              >
                <X size={16} />
              </button>
            )}
          </div>

          <div className="relative min-w-[220px]">
            <SlidersHorizontal size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[hsl(43,63%,44%)] pointer-events-none" />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortOption)}
              data-testid="select-sort"
              className="w-full bg-white/5 border border-white/10 text-white/80 pl-14 pr-10 py-4 text-sm rounded-[1.75rem] focus:border-[hsl(43,63%,44%)]/70 focus:outline-none appearance-none cursor-pointer shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]"
            >
              <option value="default">Default Order</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name-asc">Name: A to Z</option>
            </select>
          </div>
        </div>

        <div className="mb-10 pb-4 border-b border-white/10 overflow-hidden">
          <div className="flex gap-3 overflow-x-auto pb-3 scroll-smooth snap-x snap-mandatory">
            {allCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                data-testid={`filter-${cat.toLowerCase().replace(/\s+/g, "-")}`}
                className={`flex-shrink-0 snap-start rounded-full px-5 py-3 text-[0.75rem] md:text-sm tracking-[0.28em] uppercase transition-all duration-300 whitespace-nowrap border border-white/10 backdrop-blur-md ${
                  activeCategory === cat
                    ? "bg-white text-black font-semibold border-white/20 shadow-[0_20px_60px_-40px_rgba(255,255,255,0.95)]"
                    : "bg-white/5 text-white/70 hover:bg-white/15 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between mb-8">
          <p className="text-white/40 text-sm">
            <span className="text-white/70 font-medium">{filtered.length}</span> products
            {activeCategory !== "All" && (
              <span className="ml-1">in <span className="text-[hsl(43,63%,44%)]">{activeCategory}</span></span>
            )}
          </p>
          {(query || activeCategory !== "All") && (
            <button
              onClick={() => { setQuery(""); setActiveCategory("All"); }}
              className="text-xs text-white/30 hover:text-white/60 flex items-center gap-1 transition-colors"
            >
              <X size={12} /> Clear filters
            </button>
          )}
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-32">
            <p className="text-white/20 font-serif text-2xl mb-4">No products found</p>
            <button
              onClick={() => { setQuery(""); setActiveCategory("All"); }}
              className="text-[hsl(43,63%,44%)] text-xs tracking-widest uppercase hover:underline"
            >
              Clear search
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
