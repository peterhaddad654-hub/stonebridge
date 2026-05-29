import { motion } from "framer-motion";
import { Truck, Clock, MapPin, MessageCircle, CheckCircle2, Package } from "lucide-react";

export default function Delivery() {
  const zones = [
    { zone: "Greater Beirut", time: "12H–2 Days", note: "Beirut, Baabda, Metn, Keserwan" },
    { zone: "Mount Lebanon", time: "1–2 Days", note: "Chouf, Aley, Baabda Periphery" },
    { zone: "North Lebanon", time: "2-3 Days", note: "Tripoli, Zgharta, Koura, Batroun" },
    { zone: "South Lebanon", time: "2-3 Days", note: "Saida, Tyre, Nabatieh" },
    { zone: "Bekaa Valley", time: "2-3 Days", note: "Zahle, Baalbek, West Bekaa" },
  ];

  const faqs = [
    {
      q: "How do I place an order?",
      a: "Browse our catalog, click 'Order on WhatsApp' on any product, and we'll confirm your order and delivery time instantly.",
    },
    {
      q: "Is there a minimum order?",
      a: "There is no minimum order requirement. We deliver any single bottle or case.",
    },
    {
      q: "Do you deliver on weekends?",
      a: "Weekend delivery may be available depending on schedule and location. We'll confirm this when you place your order.",
    },
    {
      q: "What if a product is out of stock?",
      a: "We'll suggest the closest available alternative and confirm with you before proceeding.",
    },
    {
      q: "Can I order multiple products at once?",
      a: "Absolutely. List everything you need in one WhatsApp message and we'll handle it as a single order.",
    },
  ];

  return (
    <main className="min-h-screen pt-28 pb-24">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <p className="text-[hsl(43,63%,44%)] text-xs tracking-[0.3em] uppercase mb-3">Fast &amp; Reliable</p>
          <h1 className="font-serif text-4xl md:text-5xl text-white font-light">Delivery Information</h1>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {[
            { icon: Truck, title: "Nationwide Delivery", desc: "We deliver across all of Lebanon — from Tripoli to Tyre." },
            { icon: Clock, title: "Same-Day Available", desc: "Delivery times are confirmed after your order is reviewed and scheduled." },
            { icon: MessageCircle, title: "WhatsApp Ordering", desc: "Every product page has a direct WhatsApp order button for instant checkout." },
          ].map(({ icon: Icon, title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="p-6 border border-white/8 hover:border-[hsl(43,63%,44%)]/30 transition-colors duration-300"
            >
              <div className="w-10 h-10 border border-[hsl(43,63%,44%)]/30 flex items-center justify-center mb-5">
                <Icon size={18} className="text-[hsl(43,63%,44%)]" />
              </div>
              <h3 className="text-white font-medium mb-3 tracking-wide">{title}</h3>
              <p className="text-white/40 text-sm font-light leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <p className="text-[hsl(43,63%,44%)] text-xs tracking-[0.3em] uppercase mb-3">Coverage Areas</p>
          <h2 className="font-serif text-3xl text-white font-light mb-10">Delivery Zones</h2>
          <div className="space-y-3">
            {zones.map((zone, i) => (
              <motion.div
                key={zone.zone}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="flex items-center justify-between p-5 border border-white/8 hover:border-[hsl(43,63%,44%)]/30 transition-colors duration-300"
              >
                <div className="flex items-center gap-4">
                  <MapPin size={14} className="text-[hsl(43,63%,44%)] shrink-0" />
                  <div>
                    <h4 className="text-white text-sm font-medium">{zone.zone}</h4>
                    <p className="text-white/35 text-xs mt-0.5">{zone.note}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[hsl(43,63%,44%)] text-sm font-medium">{zone.time}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <p className="text-[hsl(43,63%,44%)] text-xs tracking-[0.3em] uppercase mb-3">How It Works</p>
          <h2 className="font-serif text-3xl text-white font-light mb-10">Ordering Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { step: "01", icon: Package, text: "Browse the full catalog and find your selection" },
              { step: "02", icon: MessageCircle, text: "Click 'Order on WhatsApp' — message is pre-filled" },
              { step: "03", icon: CheckCircle2, text: "We confirm stock, price, and estimated delivery" },
              { step: "04", icon: Truck, text: "Your order is packed and dispatched swiftly" },
            ].map(({ step, icon: Icon, text }) => (
              <div key={step} className="flex items-start gap-5 p-5 border border-white/8">
                <span className="text-[hsl(43,63%,44%)] font-serif text-2xl font-light shrink-0">{step}</span>
                <div className="flex items-start gap-3">
                  <Icon size={16} className="text-white/30 mt-0.5 shrink-0" />
                  <p className="text-white/60 text-sm font-light leading-relaxed">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <p className="text-[hsl(43,63%,44%)] text-xs tracking-[0.3em] uppercase mb-3">Common Questions</p>
          <h2 className="font-serif text-3xl text-white font-light mb-10">FAQ</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="p-6 border border-white/8"
              >
                <h4 className="text-white text-sm font-medium mb-3 tracking-wide">{faq.q}</h4>
                <p className="text-white/45 text-sm font-light leading-relaxed">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center py-16 border-t border-white/8"
        >
          <h2 className="font-serif text-3xl text-white font-light mb-6">Ready to Order?</h2>
          <p className="text-white/50 text-sm mb-10 font-light max-w-md mx-auto">
            Open WhatsApp and tell us what you need. We'll handle the rest.
          </p>
          <a
            href="https://wa.me/96179467530"
            target="_blank"
            rel="noopener noreferrer"
            data-testid="button-delivery-cta"
            className="inline-flex items-center gap-3 bg-[hsl(43,63%,44%)] text-black px-12 py-5 text-xs tracking-[0.2em] uppercase font-semibold hover:bg-[hsl(43,63%,52%)] transition-all duration-300"
          >
            <MessageCircle size={16} />
            Order on WhatsApp
          </a>
        </motion.div>
      </div>
    </main>
  );
}
