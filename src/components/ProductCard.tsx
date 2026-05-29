import { useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import type { Product } from "@/data/products";
import { productImages } from "@/data/productImages";
import { useCart } from "@/context/CartContext";

const CATEGORY_COLORS: Record<string, string> = {
  Whiskey: "from-amber-900/40 to-amber-950/60",
  "Single Malt": "from-amber-800/40 to-amber-950/60",
  "Bourbon Whiskey": "from-orange-900/40 to-orange-950/60",
  Vodka: "from-slate-700/40 to-slate-900/60",
  Gin: "from-teal-900/40 to-teal-950/60",
  Tequila: "from-yellow-900/40 to-yellow-950/60",
  Champagne: "from-yellow-800/30 to-yellow-950/50",
  "Prosecco & Sparkling": "from-yellow-800/30 to-yellow-950/50",
  Wine: "from-red-900/40 to-red-950/60",
  Cognac: "from-orange-900/40 to-orange-950/60",
  Rum: "from-amber-900/40 to-amber-950/60",
  Liqueur: "from-purple-900/40 to-purple-950/60",
  Jagermeister: "from-green-900/40 to-green-950/60",
  Beer: "from-amber-800/30 to-amber-950/50",
  Arak: "from-zinc-700/40 to-zinc-900/60",
  Vermouth: "from-red-900/30 to-red-950/50",
  "Energy Drinks": "from-blue-900/40 to-blue-950/60",
  "Buzz Mix": "from-violet-900/40 to-violet-950/60",
  Beverages: "from-sky-900/40 to-sky-950/60",
  "Minis 5cl": "from-zinc-700/40 to-zinc-900/60",
};

const CATEGORY_ICONS: Record<string, string> = {
  Whiskey: "🥃",
  "Single Malt": "🥃",
  "Bourbon Whiskey": "🥃",
  Vodka: "🍸",
  Gin: "🍹",
  Tequila: "🌵",
  Champagne: "🍾",
  "Prosecco & Sparkling": "🍾",
  Wine: "🍷",
  Cognac: "🥃",
  Rum: "🥃",
  Liqueur: "🍶",
  Jagermeister: "🌿",
  Beer: "🍺",
  Arak: "🌿",
  Vermouth: "🍷",
  "Energy Drinks": "⚡",
  "Buzz Mix": "⚡",
  Beverages: "🥤",
  "Minis 5cl": "🥃",
};

interface ProductCardProps {
  product: Product;
  index?: number;
}

function buildWhatsAppUrl(productName: string, sizeCl: number | string) {
  const msg = `Hello STONEBRIDGE,\nI would like to place an order for the following items:\n\n• ${productName} ${sizeCl}cl ×1\n\nPlease confirm availability and delivery details. Thank you.`;
  return `https://wa.me/96179467530?text=${encodeURIComponent(msg)}`;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addToCart } = useCart();
  const [isClicked, setIsClicked] = useState(false);
  const gradient = CATEGORY_COLORS[product.category] ?? "from-zinc-800/40 to-zinc-950/60";
  const imgSrc = (product as { imageUrl?: string }).imageUrl ?? productImages[product.slug];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: (index % 8) * 0.06 }}
      data-testid={`card-product-${product.id}`}
      className="group relative flex h-full flex-col bg-[#0e0e0e] border border-white/8 overflow-hidden hover:border-[hsl(43,63%,44%)]/40 transition-all duration-500"
    >
      <Link href={`/product/${product.slug}`} data-testid={`link-product-${product.id}`} className="flex-1">
        <div
          className={`relative aspect-[3/4] flex items-center justify-center overflow-hidden ${imgSrc ? "bg-[#f5f1eb]" : `bg-gradient-to-br ${gradient}`}`}
        >
          {imgSrc ? (
            <img
              src={imgSrc}
              alt={`${product.name} ${product.sizeCl}cl`}
              className="w-full h-full object-contain p-4 mix-blend-darken group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
          ) : (
            <>
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[hsl(43,63%,44%)] to-transparent" />
              <div className="relative z-10 text-center px-4">
                <div className="text-5xl mb-3 opacity-60">{CATEGORY_ICONS[product.category] ?? "🍶"}</div>
                <p className="text-[hsl(43,63%,44%)] text-[10px] tracking-[0.25em] uppercase font-medium opacity-80">
                  {product.category}
                </p>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] via-transparent to-transparent" />
            </>
          )}

          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[hsl(43,63%,44%)]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-30" />
        </div>
      </Link>

      <div className="p-4 flex flex-1 flex-col justify-between gap-4">
        <div>
          <Link href={`/product/${product.slug}`}>
            <h3
              data-testid={`text-product-name-${product.id}`}
              className="font-serif text-white text-base leading-snug mb-1 group-hover:text-[hsl(43,63%,60%)] transition-colors duration-300 line-clamp-2"
            >
              {product.name}
            </h3>
          </Link>
          <p className="text-white/40 text-xs tracking-wider mb-3">
            {product.sizeCl}cl
            {product.subcategory && (
              <span className="ml-2 text-[hsl(43,63%,44%)]/60">{product.subcategory}</span>
            )}
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span
              data-testid={`text-price-${product.id}`}
              className="text-[hsl(43,63%,60%)] font-medium text-base tracking-wide"
            >
              ${product.price.toFixed(2)}
            </span>
          </div>
          <motion.button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsClicked(true);
              addToCart(product);
              window.setTimeout(() => setIsClicked(false), 900);
            }}
            data-testid={`button-add-to-cart-${product.id}`}
            whileTap={{ scale: 0.95 }}
            animate={{ scale: isClicked ? 1.03 : 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 18 }}
            className={`inline-flex items-center gap-2 text-[10px] tracking-[0.15em] uppercase font-semibold px-3 py-1.5 rounded transition-all duration-300 ${
              isClicked
                ? "bg-emerald-500 text-white hover:bg-emerald-600"
                : "text-black bg-[hsl(43,63%,44%)] hover:bg-[hsl(43,63%,52%)]"
            }`}
          >
            <ShoppingCart size={12} />
            {isClicked ? "Added" : "Add to Cart"}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
