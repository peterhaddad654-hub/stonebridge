import { useMemo, useEffect } from "react";
import { useParams, Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, MessageCircle, ShoppingCart, Tag, Package } from "lucide-react";
import { useProducts } from "@/context/ProductsContext";
import { useCart } from "@/context/CartContext";
import { productImages } from "@/data/productImages";
import ProductCard from "@/components/ProductCard";

function buildWhatsAppUrl(productName: string, sizeCl: number | string) {
  const msg = `Hello STONEBRIDGE,\nI would like to place an order for the following items:\n\n• ${productName} ${sizeCl}cl ×1\n\nPlease confirm availability and delivery details. Thank you.`;
  return `https://wa.me/96179467530?text=${encodeURIComponent(msg)}`;
}

const CATEGORY_GRADIENTS: Record<string, string> = {
  Whiskey: "from-amber-900/60 to-amber-950",
  "Single Malt": "from-amber-800/60 to-amber-950",
  "Bourbon Whiskey": "from-orange-900/60 to-orange-950",
  Vodka: "from-slate-800/60 to-slate-950",
  Gin: "from-teal-900/60 to-teal-950",
  Tequila: "from-yellow-900/60 to-yellow-950",
  Champagne: "from-yellow-800/50 to-yellow-950",
  "Prosecco & Sparkling": "from-yellow-800/50 to-yellow-950",
  Wine: "from-red-900/60 to-red-950",
  Cognac: "from-orange-900/60 to-orange-950",
  Rum: "from-amber-900/60 to-amber-950",
  Liqueur: "from-purple-900/60 to-purple-950",
  Jagermeister: "from-green-900/60 to-green-950",
  Beer: "from-amber-800/50 to-amber-950",
  Arak: "from-zinc-700/50 to-zinc-900",
  default: "from-zinc-800/60 to-zinc-950",
};

const CATEGORY_ICONS: Record<string, string> = {
  Whiskey: "🥃", "Single Malt": "🥃", "Bourbon Whiskey": "🥃",
  Vodka: "🍸", Gin: "🍹", Tequila: "🌵",
  Champagne: "🍾", "Prosecco & Sparkling": "🍾",
  Wine: "🍷", Cognac: "🥃", Rum: "🥃",
  Liqueur: "🍶", Jagermeister: "🌿", Beer: "🍺",
  Arak: "🌿", default: "🍶",
};

export default function ProductPage() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug ?? "";
  const { products } = useProducts();
  const { addToCart } = useCart();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const product = useMemo(() => products.find((p) => p.slug === slug), [products, slug]);
  const related = useMemo(
    () =>
      product
        ? products.filter((p) => p.category === product.category && p.slug !== product.slug).slice(0, 4)
        : [],
    [products, product]
  );

  if (!product) {
    return (
      <main className="min-h-screen pt-28 pb-24 flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-serif text-3xl text-white mb-4">Product not found</h1>
          <Link href="/shop" className="text-[hsl(43,63%,44%)] text-sm tracking-widest uppercase">
            Back to Shop
          </Link>
        </div>
      </main>
    );
  }

  const gradient = CATEGORY_GRADIENTS[product.category] ?? CATEGORY_GRADIENTS.default;
  const icon = CATEGORY_ICONS[product.category] ?? CATEGORY_ICONS.default;
  const imgSrc = (product as { imageUrl?: string }).imageUrl ?? productImages[product.slug];

  return (
    <main className="min-h-screen pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Link
            href={`/category/${encodeURIComponent(product.category)}`}
            data-testid="link-back-category"
            className="inline-flex items-center gap-2 text-white/40 text-xs tracking-widest uppercase hover:text-white/70 transition-colors mb-12"
          >
            <ArrowLeft size={12} /> {product.category}
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div
              className={`relative aspect-square flex items-center justify-center overflow-hidden ${imgSrc ? "bg-[#f5f1eb]" : `bg-gradient-to-br ${gradient}`}`}
            >
              {imgSrc ? (
                <img
                  src={imgSrc}
                  alt={`${product.name} ${product.sizeCl}cl`}
                  className="w-full h-full object-contain p-10 mix-blend-darken"
                />
              ) : (
                <>
                  <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[hsl(43,63%,44%)] to-transparent" />
                  <div className="relative z-10 text-center">
                    <div className="text-8xl mb-6 opacity-50">{icon}</div>
                    <p className="text-[hsl(43,63%,44%)] text-xs tracking-[0.3em] uppercase font-medium">
                      {product.category}
                    </p>
                  </div>
                </>
              )}
              <div className="absolute inset-0 border border-[hsl(43,63%,44%)]/10" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="flex flex-col justify-center"
          >
            <p className="text-[hsl(43,63%,44%)] text-xs tracking-[0.3em] uppercase mb-4">
              {product.category}
              {product.subcategory && <span className="text-white/30 ml-2">/ {product.subcategory}</span>}
            </p>
            <h1
              data-testid="text-product-title"
              className="font-serif text-4xl md:text-5xl text-white font-light leading-tight mb-6"
            >
              {product.name}
            </h1>

            <div className="flex items-center gap-6 mb-8 pb-8 border-b border-white/10">
              <div className="flex items-center gap-2 text-white/50 text-sm">
                <Package size={14} className="text-[hsl(43,63%,44%)]" />
                {product.sizeCl}cl
              </div>
              <div className="flex items-center gap-2 text-white/50 text-sm">
                <Tag size={14} className="text-[hsl(43,63%,44%)]" />
                {product.category}
              </div>
            </div>

            <div className="mb-8">
              <span
                data-testid="text-product-price"
                className="text-[hsl(43,63%,55%)] font-serif text-4xl font-light"
              >
                ${product.price.toFixed(2)}
              </span>
            </div>

            {product.description && (
              <p className="text-white/50 text-sm leading-relaxed mb-8 font-light">
                {product.description}
              </p>
            )}

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <button
                type="button"
                onClick={() => addToCart(product)}
                className="inline-flex items-center justify-center gap-3 bg-[hsl(43,63%,44%)] text-black px-10 py-5 text-xs tracking-[0.2em] uppercase font-semibold hover:bg-[hsl(43,63%,52%)] transition-all duration-300 w-full sm:w-auto"
              >
                <ShoppingCart size={16} />
                Add to Cart
              </button>
              <a
                href={buildWhatsAppUrl(product.name, product.sizeCl)}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="button-order-whatsapp"
                className="inline-flex items-center justify-center gap-3 border border-white/10 text-white px-10 py-5 text-xs tracking-[0.2em] uppercase font-semibold hover:border-[hsl(43,63%,44%)] hover:text-[hsl(43,63%,44%)] transition-all duration-300 w-full sm:w-auto"
              >
                <MessageCircle size={16} />
                Order on WhatsApp
              </a>
            </div>

            <p className="text-white/25 text-xs mt-4 tracking-wider">
              
            </p>
          </motion.div>
        </div>

        {related.length > 0 && (
          <section>
            <div className="border-t border-white/8 pt-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mb-10"
              >
                <p className="text-[hsl(43,63%,44%)] text-xs tracking-[0.3em] uppercase mb-3">You May Also Like</p>
                <h2 className="font-serif text-2xl text-white font-light">Related Products</h2>
              </motion.div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {related.map((p, i) => (
                  <ProductCard key={p.id} product={p} index={i} />
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
