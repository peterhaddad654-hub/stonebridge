import { useRef, useMemo } from "react";
import { Link } from "wouter";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, MessageCircle, Instagram, Truck, Clock, Shield } from "lucide-react";
import { useProducts } from "@/context/ProductsContext";
import ProductCard from "@/components/ProductCard";

const CATEGORY_IMAGES: Record<string, string> = {
  Whiskey: "/images/cat-whiskey.png",
  Vodka: "/images/cat-vodka.png",
  Gin: "/images/cat-gin.png",
  Tequila: "/images/cat-tequila.png",
  Liqueur: "/images/cat-liqueur.png",
  Wine: "/images/cat-wine.png",
  Beer: "/images/cat-beer.png",
  "Energy Drinks": "/images/cat-energy-drink.png",
};

const SHOWCASED_CATEGORIES = [
  "Whiskey",
  "Vodka",
  "Gin",
  "Tequila",
  "Liqueur",
  "Wine",
  "Beer",
  "Energy Drinks",
];

const CATEGORY_GRADIENTS: Record<string, string> = {
  Whiskey: "from-amber-900/80 to-amber-950",
  Vodka: "from-slate-800/80 to-slate-950",
  Gin: "from-teal-900/80 to-teal-950",
  Tequila: "from-yellow-900/80 to-yellow-950",
  Liqueur: "from-violet-900/75 to-violet-950",
  Wine: "from-red-900/80 to-red-950",
  Beer: "from-amber-800/80 to-amber-950",
  "Energy Drinks": "from-cyan-900/80 to-slate-950",
};

function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/hero-bg.png')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#0a0a0a]" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="relative z-10 text-center max-w-4xl mx-auto px-6 pt-20"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-[hsl(43,63%,44%)] text-xs tracking-[0.4em] uppercase mb-8 font-medium"
        >
          Lebanon's Finest Spirits Boutique
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="font-serif text-6xl md:text-8xl lg:text-9xl text-white font-light leading-none mb-8 tracking-tight"
        >
          STONE
          <br />
          <span className="italic text-[hsl(43,63%,55%)]">BRIDGE</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-white/60 text-base md:text-lg font-light tracking-widest uppercase mb-12 max-w-xl mx-auto"
        >
          Premium Spirits &amp; Fine Wines
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/shop"
            data-testid="button-hero-shop"
            className="flex items-center gap-3 bg-[hsl(43,63%,44%)] text-black px-10 py-4 text-xs tracking-[0.2em] uppercase font-semibold hover:bg-[hsl(43,63%,52%)] transition-all duration-300"
          >
            Explore Collection
            <ArrowRight size={14} />
          </Link>
          <a
            href="https://wa.me/96179467530"
            target="_blank"
            rel="noopener noreferrer"
            data-testid="button-hero-whatsapp"
            className="flex items-center gap-3 border border-white/30 text-white px-10 py-4 text-xs tracking-[0.2em] uppercase font-medium hover:border-white/60 transition-all duration-300"
          >
            <MessageCircle size={14} />
            Order via WhatsApp
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <div className="w-px h-16 bg-gradient-to-b from-[hsl(43,63%,44%)]/60 to-transparent mx-auto" />
      </motion.div>
    </div>
  );
}

function FeaturedSection() {
  const { products } = useProducts();
  const showcased = useMemo(
    () => products.filter((p) => p.featured).slice(0, 8),
    [products]
  );
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex items-end justify-between mb-12"
      >
        <div>
          <p className="text-[hsl(43,63%,44%)] text-xs tracking-[0.3em] uppercase mb-3">Curated Selection</p>
          <h2 className="font-serif text-3xl md:text-4xl text-white font-light">Featured Products</h2>
        </div>
        <Link
          href="/shop"
          className="hidden md:flex items-center gap-2 text-xs tracking-[0.15em] uppercase text-white/50 hover:text-[hsl(43,63%,44%)] transition-colors duration-300"
        >
          View All <ArrowRight size={12} />
        </Link>
      </motion.div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {showcased.map((product, i) => (
          <ProductCard key={product.id} product={product} index={i} />
        ))}
      </div>
      <div className="mt-10 text-center md:hidden">
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-[hsl(43,63%,44%)] border border-[hsl(43,63%,44%)]/30 px-8 py-3 hover:bg-[hsl(43,63%,44%)]/10 transition-all"
        >
          View All Products <ArrowRight size={12} />
        </Link>
      </div>
    </section>
  );
}

function CategoriesSection() {
  return (
    <section className="py-24 bg-[#070707]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-[hsl(43,63%,44%)] text-xs tracking-[0.3em] uppercase mb-3">Browse By Spirit</p>
          <h2 className="font-serif text-3xl md:text-4xl text-white font-light">Our Categories</h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {SHOWCASED_CATEGORIES.map((cat, i) => {
            const img = CATEGORY_IMAGES[cat];
            const grad = CATEGORY_GRADIENTS[cat] ?? "from-zinc-800/80 to-zinc-950";
            return (
              <motion.div
                key={cat}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
              >
                <Link
                  href={`/category/${encodeURIComponent(cat)}`}
                  data-testid={`link-category-${cat.toLowerCase().replace(/\s+/g, "-")}`}
                  className="group block relative aspect-[3/4] overflow-hidden rounded-3xl"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${grad}`} />
                  {img && (
                    <img
                      src={img}
                      alt={cat}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      onError={(event) => {
                        event.currentTarget.style.display = "none";
                      }}
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-[hsl(43,63%,44%)]/10 transition-opacity duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="font-serif text-white text-xl font-light mb-1">{cat}</h3>
                    <p className="text-[hsl(43,63%,44%)] text-xs tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Explore &rarr;
                    </p>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[hsl(43,63%,44%)]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function DeliveryBanner() {
  const features = [
    { icon: Truck, title: "Reliable Nationwide Delivery", desc: "Serving customers across Lebanon" },
    { icon: Clock, title: "Order Anytime", desc: "WhatsApp orders 24/7" },
    { icon: Shield, title: "Authentic Products", desc: "100% genuine, premium spirits" },
  ];
  return (
    <section className="py-20 border-y border-white/8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {features.map(({ icon: Icon, title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 border border-[hsl(43,63%,44%)]/30 mb-5 mx-auto">
                <Icon size={20} className="text-[hsl(43,63%,44%)]" />
              </div>
              <h3 className="text-white font-medium mb-2 tracking-wide">{title}</h3>
              <p className="text-white/40 text-sm font-light">{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhatsAppCTA() {
  return (
    <section className="py-32 px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="max-w-2xl mx-auto"
      >
        <div className="w-px h-16 bg-gradient-to-b from-transparent via-[hsl(43,63%,44%)]/50 to-transparent mx-auto mb-12" />
        <p className="text-[hsl(43,63%,44%)] text-xs tracking-[0.4em] uppercase mb-6">Ready to Order?</p>
        <h2 className="font-serif text-4xl md:text-5xl text-white font-light leading-snug mb-6">
          Order directly<br />
          <span className="italic text-[hsl(43,63%,55%)]">via WhatsApp</span>
        </h2>
        <p className="text-white/50 text-base font-light mb-12 leading-relaxed">
          Browse our curated selection and place your order instantly.
          We'll handle the rest — fast, discreet delivery anywhere in Lebanon.
        </p>
        <a
          href="https://wa.me/96179467530"
          target="_blank"
          rel="noopener noreferrer"
          data-testid="button-cta-whatsapp"
          className="inline-flex items-center gap-3 bg-[hsl(43,63%,44%)] text-black px-12 py-5 text-xs tracking-[0.2em] uppercase font-semibold hover:bg-[hsl(43,63%,52%)] transition-all duration-300"
        >
          <MessageCircle size={16} />
          Start Your Order
        </a>
      </motion.div>
    </section>
  );
}

function InstagramSection() {
  return (
    <section className="py-20 bg-[#070707] border-t border-white/8">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Instagram size={32} className="text-[hsl(43,63%,44%)] mx-auto mb-6" />
          <h2 className="font-serif text-3xl text-white font-light mb-4">Follow Our Journey</h2>
          <p className="text-white/50 text-sm mb-8 font-light">
            Discover new arrivals, exclusive collections &amp; more
          </p>
          <a
            href="https://instagram.com/stonebridgelb"
            target="_blank"
            rel="noopener noreferrer"
            data-testid="link-instagram"
            className="inline-flex items-center gap-2 border border-white/20 text-white/70 px-8 py-3 text-xs tracking-[0.2em] uppercase hover:border-[hsl(43,63%,44%)]/50 hover:text-[hsl(43,63%,44%)] transition-all duration-300"
          >
            <Instagram size={14} />
            @stonebridgelb
          </a>
        </motion.div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <main>
      <HeroSection />
      <FeaturedSection />
      <CategoriesSection />
      <DeliveryBanner />
      <WhatsAppCTA />
      <InstagramSection />
    </main>
  );
}
