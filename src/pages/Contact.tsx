import { motion } from "framer-motion";
import { MessageCircle, Instagram, MapPin, Clock, Mail, Phone } from "lucide-react";

export default function Contact() {
  return (
    <main className="min-h-screen pt-28 pb-24">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <p className="text-[hsl(43,63%,44%)] text-xs tracking-[0.3em] uppercase mb-3">Reach Out</p>
          <h1 className="font-serif text-4xl md:text-5xl text-white font-light">Contact Us</h1>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            <div>
              <h2 className="font-serif text-2xl text-white font-light mb-6">Get In Touch</h2>
              <p className="text-white/50 font-light leading-relaxed mb-8">
                The easiest way to order is via WhatsApp — browse our catalog, find what you love,
                and tap the Order button. We'll confirm your order and arrange delivery.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-5 p-5 border border-white/8 hover:border-[hsl(43,63%,44%)]/30 transition-colors duration-300">
                <div className="w-10 h-10 border border-[hsl(43,63%,44%)]/30 flex items-center justify-center shrink-0">
                  <MessageCircle size={18} className="text-[hsl(43,63%,44%)]" />
                </div>
                <div>
                  <h3 className="text-white text-sm font-medium mb-1 tracking-wide">WhatsApp</h3>
                  <p className="text-white/40 text-sm font-light mb-3">
                    Fastest way to order — pre-filled messages, instant replies
                  </p>
                  <a
                    href="https://wa.me/96179467530"
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid="link-contact-whatsapp"
                    className="text-[hsl(43,63%,44%)] text-xs tracking-[0.15em] uppercase hover:underline"
                  >
                    +961 79 467 530 &rarr;
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-5 p-5 border border-white/8 hover:border-[hsl(43,63%,44%)]/30 transition-colors duration-300">
                <div className="w-10 h-10 border border-[hsl(43,63%,44%)]/30 flex items-center justify-center shrink-0">
                  <Mail size={18} className="text-[hsl(43,63%,44%)]" />
                </div>
                <div>
                  <h3 className="text-white text-sm font-medium mb-1 tracking-wide">Email</h3>
                  <p className="text-white/40 text-sm font-light mb-3">
                    For inquiries, wholesale, or general questions
                  </p>
                  <a
                    href="mailto:stonebridgelb.info@gmail.com"
                    data-testid="link-contact-email"
                    className="text-[hsl(43,63%,44%)] text-xs tracking-[0.15em] uppercase hover:underline"
                  >
                    stonebridgelb.info@gmail.com &rarr;
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-5 p-5 border border-white/8 hover:border-[hsl(43,63%,44%)]/30 transition-colors duration-300">
                <div className="w-10 h-10 border border-[hsl(43,63%,44%)]/30 flex items-center justify-center shrink-0">
                  <Instagram size={18} className="text-[hsl(43,63%,44%)]" />
                </div>
                <div>
                  <h3 className="text-white text-sm font-medium mb-1 tracking-wide">Instagram</h3>
                  <p className="text-white/40 text-sm font-light mb-3">
                    Follow for new arrivals and exclusive collections
                  </p>
                  <a
                    href="https://instagram.com/stonebridgelb"
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid="link-contact-instagram"
                    className="text-[hsl(43,63%,44%)] text-xs tracking-[0.15em] uppercase hover:underline"
                  >
                    @stonebridgelb &rarr;
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-5 p-5 border border-white/8">
                <div className="w-10 h-10 border border-[hsl(43,63%,44%)]/30 flex items-center justify-center shrink-0">
                  <MapPin size={18} className="text-[hsl(43,63%,44%)]" />
                </div>
                <div>
                  <h3 className="text-white text-sm font-medium mb-1 tracking-wide">Location</h3>
                  <p className="text-white/40 text-sm font-light">
                    Lebanon — nationwide delivery available
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <div className="bg-[#0e0e0e] border border-white/8 p-8">
              <h3 className="font-serif text-2xl text-white font-light mb-8">Order via WhatsApp</h3>
              <div className="space-y-5 mb-8">
                {[
                  { step: "01", text: "Browse our catalog and find your spirit" },
                  { step: "02", text: "Tap the Order button on any product" },
                  { step: "03", text: "WhatsApp opens with your order pre-filled" },
                  { step: "04", text: "We confirm and arrange fast delivery" },
                ].map(({ step, text }) => (
                  <div key={step} className="flex items-start gap-4">
                    <span className="text-[hsl(43,63%,44%)] font-serif text-sm font-medium shrink-0">{step}</span>
                    <p className="text-white/60 text-sm font-light">{text}</p>
                  </div>
                ))}
              </div>
              <a
                href="https://wa.me/96179467530"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="button-contact-order"
                className="flex items-center justify-center gap-3 bg-[hsl(43,63%,44%)] text-black px-8 py-4 text-xs tracking-[0.2em] uppercase font-semibold hover:bg-[hsl(43,63%,52%)] transition-all duration-300 w-full"
              >
                <MessageCircle size={14} />
                Start Ordering
              </a>
            </div>

            <div className="mt-4 p-6 border border-white/8">
              <div className="flex items-center gap-3 mb-4">
                <Clock size={16} className="text-[hsl(43,63%,44%)]" />
                <h4 className="text-white text-sm font-medium tracking-wide">Hours</h4>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-white/40 font-light">Monday – Saturday</span>
                  <span className="text-white/70">9:00 AM – 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/40 font-light">Sunday</span>
                  <span className="text-white/70">10:00 AM – 3:00 PM</span>
                </div>
              </div>
            </div>

            <div className="mt-4 p-6 border border-white/8">
              <div className="flex items-center gap-3 mb-4">
                <Phone size={16} className="text-[hsl(43,63%,44%)]" />
                <h4 className="text-white text-sm font-medium tracking-wide">Direct Line</h4>
              </div>
              <a
                href="tel:+96179467530"
                className="text-white/60 text-sm hover:text-white/90 transition-colors"
              >
                +961 79 467 530
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
