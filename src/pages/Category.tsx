import { useMemo } from "react";
import { useParams, Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useProducts } from "@/context/ProductsContext";
import ProductCard from "@/components/ProductCard";

export default function CategoryPage() {
  const params = useParams<{ category: string }>();
  const category = decodeURIComponent(params.category ?? "");
  const { products } = useProducts();
  const categoryProducts = useMemo(
    () => products.filter((p) => p.category === category),
    [products, category]
  );

  if (categoryProducts.length === 0) {
    return (
      <main className="min-h-screen pt-28 pb-24 flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-serif text-3xl text-white mb-4">Category not found</h1>
          <Link href="/shop" className="text-[hsl(43,63%,44%)] text-sm tracking-widest uppercase">
            Back to Shop
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <Link
            href="/shop"
            data-testid="link-back-shop"
            className="inline-flex items-center gap-2 text-white/40 text-xs tracking-widest uppercase hover:text-white/70 transition-colors mb-8"
          >
            <ArrowLeft size={12} /> All Categories
          </Link>
          <p className="text-[hsl(43,63%,44%)] text-xs tracking-[0.3em] uppercase mb-3">
            {categoryProducts.length} Products
          </p>
          <h1 className="font-serif text-4xl md:text-5xl text-white font-light">{category}</h1>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {categoryProducts.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </main>
  );
}
