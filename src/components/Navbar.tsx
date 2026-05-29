import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, ShoppingCart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/delivery", label: "Delivery" },
  { href: "/contact", label: "Contact" },
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [location] = useLocation();
  const { cartCount } = useCart();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "py-3 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/10"
            : "py-5 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link href="/" data-testid="link-logo">
            <img
              src="/logo.png"
              alt="STONEBRIDGE"
              className="h-14 w-auto object-contain"
            />
          </Link>

          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                data-testid={`nav-link-${link.label.toLowerCase()}`}
                className={`text-xs tracking-[0.2em] uppercase font-medium transition-colors duration-300 ${
                  location === link.href
                    ? "text-[hsl(43,63%,44%)]"
                    : "text-white/70 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/cart"
              data-testid="nav-cart"
              className="flex items-center gap-2 text-xs tracking-[0.15em] uppercase font-medium text-white/70 hover:text-white transition-all duration-300"
            >
              <ShoppingCart size={14} />
              Cart
              {cartCount > 0 && (
                <span className="rounded-full bg-[hsl(43,63%,44%)] px-2 py-1 text-[10px] font-semibold text-black">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-white p-2"
              data-testid="button-menu-toggle"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 z-40 bg-[#0a0a0a] flex flex-col items-center justify-center gap-10"
          >
            <img src="/logo.png" alt="STONEBRIDGE" className="h-20 w-auto mb-4" />
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-2xl tracking-[0.2em] uppercase font-light text-white/80 hover:text-[hsl(43,63%,44%)] transition-colors duration-300"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/cart"
              className="mt-4 inline-flex items-center justify-center rounded-full border border-[hsl(43,63%,44%)]/40 px-8 py-3 text-sm tracking-[0.2em] uppercase text-[hsl(43,63%,44%)] hover:bg-[hsl(43,63%,44%)]/10 transition-colors duration-300"
            >
              <ShoppingCart size={18} />
              <span className="ml-3">Cart</span>
            </Link>
            <a
              href="https://wa.me/96179467530"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 text-sm tracking-[0.2em] uppercase text-[hsl(43,63%,44%)] border border-[hsl(43,63%,44%)]/40 px-8 py-3"
            >
              Order on WhatsApp
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {!location.startsWith("/product/") && location !== "/cart" && (
        <Link
          href="/cart"
          data-testid="mobile-cart-fab"
          className="fixed bottom-24 right-4 z-50 md:hidden inline-flex items-center justify-center rounded-full bg-[hsl(43,63%,44%)] p-4 text-white shadow-[0_18px_50px_rgba(0,0,0,0.25)] transition-all duration-300 hover:bg-[hsl(43,63%,52%)]"
          aria-label="Open cart"
        >
          <ShoppingCart size={22} />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-black text-[10px] font-semibold text-white px-1">
              {cartCount}
            </span>
          )}
        </Link>
      )}
    </>
  );
}

export default Navbar;
