import { Link } from "wouter";
import { Instagram, MessageCircle, MapPin, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#060606]">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-1">
            <img src="/logo.png" alt="STONEBRIDGE" className="h-14 w-auto mb-6" />
            <p className="text-white/50 text-sm leading-relaxed font-light">
              Lebanon's premier luxury spirits boutique. Curated collections delivered to your door.
            </p>
          </div>

          <div>
            <h4 className="text-[hsl(43,63%,44%)] text-xs tracking-[0.2em] uppercase mb-5 font-medium">Shop</h4>
            <ul className="space-y-3">
              {["Whiskey", "Vodka", "Gin", "Tequila", "Champagne", "Wine"].map((cat) => (
                <li key={cat}>
                  <Link
                    href={`/category/${encodeURIComponent(cat)}`}
                    className="text-white/50 text-sm hover:text-white/80 transition-colors"
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[hsl(43,63%,44%)] text-xs tracking-[0.2em] uppercase mb-5 font-medium">Information</h4>
            <ul className="space-y-3">
              {[
                { label: "Shop All", href: "/shop" },
                { label: "Delivery Info", href: "/delivery" },
                { label: "Contact Us", href: "/contact" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-white/50 text-sm hover:text-white/80 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[hsl(43,63%,44%)] text-xs tracking-[0.2em] uppercase mb-5 font-medium">Get In Touch</h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="https://wa.me/96179467530"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-white/50 text-sm hover:text-white/80 transition-colors"
                >
                  <MessageCircle size={15} className="text-[hsl(43,63%,44%)] shrink-0" />
                  +961 79 467 530
                </a>
              </li>
              <li>
                <a
                  href="mailto:stonebridgelb.info@gmail.com"
                  className="flex items-center gap-3 text-white/50 text-sm hover:text-white/80 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[hsl(43,63%,44%)] shrink-0"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                  stonebridgelb.info@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/stonebridgelb"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-white/50 text-sm hover:text-white/80 transition-colors"
                >
                  <Instagram size={15} className="text-[hsl(43,63%,44%)] shrink-0" />
                  @stonebridgelb
                </a>
              </li>
              <li>
                <div className="flex items-center gap-3 text-white/50 text-sm">
                  <MapPin size={15} className="text-[hsl(43,63%,44%)] shrink-0" />
                  Lebanon
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-xs tracking-widest uppercase">
            &copy; {new Date().getFullYear()} STONEBRIDGE. All rights reserved.
          </p>
          <p className="text-white/20 text-xs">
            Please drink responsibly. Must be 18+ to purchase.
          </p>
        </div>
      </div>
    </footer>
  );
}
