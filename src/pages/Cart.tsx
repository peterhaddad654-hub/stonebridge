import { Link } from "wouter";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { ArrowLeft, Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { productImages } from "@/data/productImages";

function buildWhatsAppCartMessage(items: { product: { name: string; sizeCl: number | string; price: number }; quantity: number }[]) {
  const lines = items.map(
    (item) => `• ${item.product.name} ${item.product.sizeCl}cl ×${item.quantity}`
  );
  return `Hello STONEBRIDGE,\nI would like to place an order for the following items:\n\n${lines.join("\n")}\n\nPlease confirm availability and delivery details. Thank you.`;
}

export default function CartPage() {
  const { items, cartCount, cartTotal, updateQuantity, removeFromCart, clearCart } = useCart();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const checkoutUrl = `https://wa.me/96179467530?text=${encodeURIComponent(
    buildWhatsAppCartMessage(items)
  )}`;

  return (
    <main className="min-h-screen pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <div className="flex items-center gap-3 text-white/50 text-xs uppercase tracking-[0.3em] mb-4">
            <ShoppingCart size={16} />
            <span>Cart</span>
          </div>
          <h1 className="font-serif text-4xl text-white font-light">Your Cart</h1>
          <p className="mt-3 text-white/50 text-sm">
            {cartCount} item{cartCount === 1 ? "" : "s"} in your cart.
          </p>
        </motion.div>

        {items.length === 0 ? (
          <div className="rounded-3xl border border-white/10 bg-[#0f0f0f] p-12 text-center">
            <p className="text-white/70 text-lg mb-4">Your cart is currently empty.</p>
            <Link
              href="/shop"
              className="inline-flex items-center justify-center rounded-full border border-[hsl(43,63%,44%)] px-6 py-3 text-[hsl(43,63%,44%)] uppercase tracking-[0.25em] text-xs"
            >
              Browse the shop
            </Link>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="rounded-3xl border border-white/10 bg-[#0f0f0f] p-6">
              {items.map((item) => {
                const imgSrc =
                  (item.product as { imageUrl?: string }).imageUrl ?? productImages[item.product.slug];

                return (
                  <div
                    key={item.product.slug}
                    className="grid grid-cols-1 gap-6 py-5 border-b border-white/10 last:border-none md:grid-cols-[auto_1fr_auto] md:items-center"
                  >
                    <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-sm">
                      {imgSrc ? (
                        <img
                          src={imgSrc}
                          alt={item.product.name}
                          className="h-28 w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-28 items-center justify-center bg-white/5 text-white/50">
                          No image
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col justify-between gap-3">
                      <div className="space-y-3">
                        <div className="flex flex-wrap items-center gap-3">
                          <h2 className="text-white text-lg font-medium">{item.product.name}</h2>
                          <span className="text-white/40 text-xs uppercase tracking-[0.25em]">
                            {item.product.sizeCl}cl
                          </span>
                        </div>
                        <p className="text-white/50 text-sm">{item.product.category}</p>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 text-white/70">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.product.slug, item.quantity - 1)}
                          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/80 transition hover:bg-white/10"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="min-w-[2rem] text-center text-white">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.product.slug, item.quantity + 1)}
                          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/80 transition hover:bg-white/10"
                        >
                          <Plus size={14} />
                        </button>
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.product.slug)}
                          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs uppercase tracking-[0.2em] text-white/70 transition hover:bg-white/10"
                        >
                          <Trash2 size={14} /> Remove
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-4 md:justify-end md:text-right">
                      <div>
                        <p className="text-white text-lg font-medium">
                          ${Number(item.product.price * item.quantity).toFixed(2)}
                        </p>
                        <p className="text-white/40 text-sm">${item.product.price.toFixed(2)} each</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="rounded-3xl border border-white/10 bg-[#0f0f0f] p-6 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-white/50 text-sm uppercase tracking-[0.3em]">Order summary</p>
                <p className="mt-2 text-white text-3xl font-light">${cartTotal.toFixed(2)}</p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={clearCart}
                  className="rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm uppercase tracking-[0.2em] text-white/80 transition hover:bg-white/10"
                >
                  Clear cart
                </button>
                <a
                  href={checkoutUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-[hsl(43,63%,44%)] px-6 py-3 text-sm uppercase tracking-[0.2em] text-black transition hover:bg-[hsl(43,63%,52%)]"
                >
                  Checkout on WhatsApp
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
