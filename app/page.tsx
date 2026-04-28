'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { 
  Scissors, 
  Scroll, 
  Crown, 
  Package, 
  Award, 
  Phone, 
  Instagram, 
  Mail, 
  MapPin, 
  Menu, 
  X, 
  ArrowRight, 
  CheckCheck, 
  Loader2,
  ImageOff
} from 'lucide-react';

// DESIGN DECISIONS:
// Layout Energy: editorial
// Depth Treatment: layered
// Divider Style: D-RULE
// Typography Personality: refined

const brand = {
  name: "IBKS CLOTHING",
  tagline: "Adorned in Strength and Dignity",
  description: "Lagos' premier boutique specializing in the intersection of traditional Nigerian heritage and modern corporate excellence. Every stitch is a testament to the power of identity.",
  industry: "fashion",
  region: "nigeria",
  currency: "₦"
};

const IMAGES = {
  hero: "https://picsum.photos/seed/fashion1/1600/900",
  products: [
    "https://picsum.photos/seed/fashion2/800/1000",
    "https://picsum.photos/seed/fashion3/800/1000",
    "https://picsum.photos/seed/fashion4/800/1000",
    "https://picsum.photos/seed/fashion5/800/1000"
  ],
  gallery: [
    "https://picsum.photos/seed/fashion6/800/1200",
    "https://picsum.photos/seed/fashion7/800/800",
    "https://picsum.photos/seed/fashion8/800/1000",
    "https://picsum.photos/seed/fashion9/800/600",
    "https://picsum.photos/seed/fashion10/800/1000",
    "https://picsum.photos/seed/fashion11/800/1200"
  ]
};

function SafeImage({ src, alt, fill, width, height, className, priority, fallbackClassName }: {
  src: string; alt: string; fill?: boolean; width?: number; height?: number;
  className?: string; priority?: boolean; fallbackClassName?: string;
}) {
  const [error, setError] = useState(false);
  if (error) {
    return (
      <div className={`flex items-center justify-center bg-primary/20 ${fallbackClassName ?? className ?? ''}`}>
        <ImageOff size={28} className="text-white/20" />
      </div>
    );
  }
  return (
    <Image src={src} alt={alt} fill={fill}
      width={!fill ? (width ?? 800) : undefined}
      height={!fill ? (height ?? 600) : undefined}
      className={className} priority={priority}
      onError={() => setError(true)} />
  );
}

const useScrollReveal = (threshold = 0.15) => {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return { ref, isVisible };
};

const SectionDivider = () => (
  <div className="py-16 flex items-center gap-8 px-8 max-w-6xl mx-auto">
    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
    <span className="text-accent font-mono text-xs tracking-[0.4em] uppercase whitespace-nowrap opacity-70">
      {brand.tagline}
    </span>
    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
  </div>
);

export default function Page() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const heroReveal = useScrollReveal();
  const productsReveal = useScrollReveal();
  const galleryReveal = useScrollReveal();
  const featuresReveal = useScrollReveal();
  const aboutReveal = useScrollReveal();
  const testimonialReveal = useScrollReveal();
  const contactReveal = useScrollReveal();

  return (
    <main className="bg-primary text-white selection:bg-accent selection:text-primary">
      {/* HEADER */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-primary/95 backdrop-blur-xl shadow-2xl py-4' : 'bg-transparent py-8'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <a href="#home" className="group">
            <div className="flex flex-col">
              <span className="text-2xl font-heading font-black tracking-tighter text-white group-hover:text-accent transition-colors">
                IBKS<span className="text-accent group-hover:text-white">.</span>
              </span>
              <span className="text-[10px] font-mono tracking-[0.3em] uppercase opacity-60">Clothing</span>
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-10">
            {["The Collection", "Our Story", "Gallery"].map((item, i) => (
              <a key={i} href={`#${item.toLowerCase().replace(' ', '')}`} className="text-xs uppercase tracking-widest font-bold text-white/70 hover:text-accent transition-colors">
                {item}
              </a>
            ))}
            <a href="#contact" className="bg-accent text-primary px-6 py-2.5 rounded-full font-bold text-xs uppercase tracking-widest hover:scale-105 transition-all">
              Book Appointment
            </a>
          </nav>

          <button className="md:hidden text-white" onClick={() => setMobileMenu(true)}>
            <Menu size={28} />
          </button>
        </div>
      </header>

      {/* MOBILE NAV */}
      <div className={`fixed inset-0 z-[60] bg-primary transition-transform duration-500 ${mobileMenu ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-8 flex justify-between items-center">
          <span className="text-2xl font-heading font-black">IBKS.</span>
          <button onClick={() => setMobileMenu(false)}><X size={32} /></button>
        </div>
        <nav className="flex flex-col gap-8 p-12 mt-12">
          {["The Collection", "Our Story", "Gallery", "Contact"].map((item, i) => (
            <a key={i} href={`#${item.toLowerCase().replace(' ', '')}`} onClick={() => setMobileMenu(false)} className="text-4xl font-heading font-bold text-white">
              {item}
            </a>
          ))}
        </nav>
      </div>

      {/* HERO SECTION - HR-B Reveal V1 */}
      <section id="home" className="min-h-screen relative flex items-end pb-32 px-6 md:px-16 overflow-hidden">
        <SafeImage src={IMAGES.hero} alt={brand.name} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/60 to-transparent" />
        
        <div ref={heroReveal.ref} className={`relative z-10 max-w-4xl transition-all duration-1000 ${heroReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <h1 className="font-heading text-6xl md:text-[8rem] font-black text-white leading-[0.85] tracking-tight">
            STRENGTH<br/>& DIGNITY
          </h1>
          <p className="text-white/70 mt-8 text-xl max-w-xl leading-relaxed font-light">
            Exquisite traditional attire and corporate wear for the discerning modern gentleman in Lagos.
          </p>
          <div className="flex flex-wrap gap-6 mt-12">
            <a href="#thecollection" className="bg-accent text-primary px-10 py-5 font-black text-sm uppercase tracking-widest hover:brightness-110 transition-all rounded-full">
              Discover the Collection
            </a>
            <a href="#gallery" className="text-white border-b-2 border-white/30 pb-2 hover:border-accent hover:text-accent transition-all font-bold uppercase tracking-widest text-sm self-center">
              Lookbook →
            </a>
          </div>
        </div>
      </section>

      {/* PRODUCTS SECTION - P-STAGGER Reveal V2 */}
      <section id="thecollection" ref={productsReveal.ref} className="py-32 px-6 bg-secondary overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="mb-24 text-center">
            <h2 className="font-heading text-5xl md:text-7xl font-black text-primary leading-none">The Collection</h2>
            <p className="text-primary/50 mt-4 uppercase tracking-[0.3em] text-sm">Signature pieces curated for impact</p>
          </div>
          
          <div className="space-y-40">
            {[
              { name: "The Heritage Agbada", price: "₦55,000", desc: "Hand-embroidered four-piece traditional set crafted from premium cotton Aso-oke.", img: IMAGES.products[0] },
              { name: "Executive Corporate Suit", price: "₦45,000", desc: "Slim-fit bespoke suit tailored for the modern Nigerian professional.", img: IMAGES.products[1] },
              { name: "Signature Kaftan", price: "₦35,000", desc: "Minimalist luxury kaftan with contemporary cuff detailing and crisp finish.", img: IMAGES.products[2] }
            ].map((p, i) => (
              <div key={i} className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12 md:gap-24 transition-all duration-1000 ${productsReveal.isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
                <div className="w-full md:w-1/2 group relative">
                  <div className="aspect-[4/5] relative rounded-2xl overflow-hidden shadow-2xl">
                    <SafeImage src={p.img} alt={p.name} fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                  </div>
                  <div className={`absolute -bottom-10 ${i % 2 === 0 ? '-right-10' : '-left-10'} w-2/3 h-2/3 bg-accent/10 rounded-2xl -z-10 blur-3xl`} />
                </div>
                <div className={`w-full md:w-1/2 text-primary ${i % 2 === 0 ? 'text-left' : 'md:text-right'}`}>
                  <span className="font-mono text-accent text-sm font-bold tracking-widest uppercase mb-6 block">0{i + 1} — Selection</span>
                  <h3 className="font-heading text-4xl md:text-6xl font-black leading-tight text-primary">{p.name}</h3>
                  <p className="text-primary/60 mt-6 text-lg leading-relaxed max-w-lg">{p.desc}</p>
                  <div className={`mt-10 flex flex-col gap-6 ${i % 2 === 0 ? 'items-start' : 'md:items-end'}`}>
                    <span className="text-4xl font-heading font-black text-primary">{p.price}</span>
                    <a href="#contact" className="bg-primary text-white px-10 py-4 rounded-full font-bold tracking-widest uppercase text-xs hover:bg-accent hover:text-primary transition-all">
                      Secure Piece
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* GALLERY - G-MASONRY Reveal V6 */}
      <section id="gallery" ref={galleryReveal.ref} className="py-32 px-6 bg-primary">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
            <div>
              <h2 className="font-heading text-6xl font-black">Strength in Style</h2>
              <p className="text-white/40 mt-4 text-lg uppercase tracking-widest">An editorial look into our design season</p>
            </div>
            <div className="hidden md:block text-right text-white/30 font-mono text-sm uppercase tracking-tighter">
              Archive 2024<br/>Lagos, NG
            </div>
          </div>
          
          <div className={`columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6 transition-all duration-1000 ${galleryReveal.isVisible ? 'max-w-full opacity-100' : 'max-w-0 opacity-0'}`}>
            {IMAGES.gallery.map((src, i) => (
              <div key={i} className="break-inside-avoid group relative rounded-xl overflow-hidden border border-white/5">
                <SafeImage src={src} alt={`Gallery ${i + 1}`} width={600} height={800} className="w-full h-auto object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                  <span className="text-xs font-mono uppercase tracking-widest">Look No. 0{i + 1}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES - F-NUMBERED Reveal V4 */}
      <section ref={featuresReveal.ref} className="py-32 px-6 bg-secondary">
        <div className="max-w-5xl mx-auto divide-y divide-primary/10">
          <div className="pb-16">
            <h2 className="font-heading text-5xl md:text-7xl font-black text-primary leading-none">Why IBKS</h2>
            <p className="text-primary/40 mt-4 uppercase tracking-[0.4em] text-sm">The standard of luxury in every thread</p>
          </div>
          {[
            { title: "Bespoke Tailoring", icon: Scissors, desc: "Each garment is custom-fitted to your precise measurements for ultimate comfort and presence." },
            { title: "Premium Fabrics", icon: Scroll, desc: "We source only the finest wools, silks, and traditional hand-woven Aso-oke for our clients." },
            { title: "Heritage Design", icon: Crown, desc: "Preserving the legacy of Nigerian fashion with a sophisticated modern lens that speaks to the world." }
          ].map((f, i) => (
            <div key={i} className={`py-16 flex flex-col md:flex-row items-start gap-12 transition-all duration-700 ${featuresReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: `${i * 200}ms` }}>
              <span className="font-mono text-accent text-5xl font-black tracking-tighter shrink-0 w-24">0{i + 1}</span>
              <div className="flex-1">
                <h3 className="font-heading text-3xl font-black text-primary">{f.title}</h3>
                <p className="text-primary/60 mt-4 text-xl leading-relaxed max-w-xl">{f.desc}</p>
              </div>
              <div className="w-16 h-16 rounded-2xl border border-primary/10 flex items-center justify-center shrink-0 text-accent bg-primary/5">
                <f.icon size={28} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT & STATS - V3 Horizontal Split + V9 Stats */}
      <section id="ourstory" ref={aboutReveal.ref} className="min-h-[80vh] grid md:grid-cols-2 bg-primary">
        <div className={`p-8 md:p-24 flex flex-col justify-center transition-all duration-1000 ${aboutReveal.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}>
          <h2 className="font-heading text-5xl md:text-7xl font-black leading-[0.9] mb-10">The IBKS Legacy</h2>
          <p className="text-white/60 text-xl leading-relaxed mb-12">
            Born in the heart of Lagos, IBKS Clothing represents the dual nature of the modern Nigerian: rooted in deep tradition while moving with global corporate speed. Our philosophy of &ldquo;Strength & Dignity&rdquo; is woven into every garment we produce.
          </p>
          <p className="text-accent font-mono text-sm uppercase tracking-widest mb-16">Sharp delivery, nationwide.</p>
          
          <div className="grid grid-cols-2 gap-12 border-t border-white/10 pt-12">
            {[
              { num: "2.7k+", label: "Garments Crafted", icon: Package },
              { num: "15+", label: "Years Experience", icon: Award }
            ].map((s, i) => (
              <div key={i} className={`transition-all duration-1000 ${aboutReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: `${i * 300}ms` }}>
                <s.icon className="text-accent mb-4" size={24} />
                <p className="font-heading text-5xl font-black text-white leading-none">{s.num}</p>
                <p className="text-white/40 uppercase tracking-widest text-xs mt-3">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="relative min-h-[500px]">
          <SafeImage src="https://picsum.photos/seed/fashion14/800/1200" alt="About IBKS" fill className="object-cover grayscale hover:grayscale-0 transition-all duration-1000" />
          <div className="absolute inset-0 bg-accent/10 mix-blend-overlay" />
        </div>
      </section>

      {/* TESTIMONIALS - T-SPOTLIGHT Reveal V7 */}
      <section ref={testimonialReveal.ref} className="py-32 px-6 bg-accent/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-heading text-5xl font-black mb-20">Client Stories</h2>
          <div className="space-y-12">
            {[
              { name: "Oluwaseun Adeyemi", role: "Tech Entrepreneur", text: "The fit of my wedding Agbada was absolutely perfect. IBKS captures the essence of luxury traditional wear better than anyone in Lagos." },
              { name: "Chidi Okoro", role: "Finance Executive", text: "My corporate suits from IBKS command the room. The quality of the wool and the precision of the cut is world-class." }
            ].map((t, i) => (
              <div key={i} className={`relative py-16 px-8 rounded-3xl border border-white/10 bg-primary/20 transition-all duration-700 ${testimonialReveal.isVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-6 blur-sm'}`} style={{ transitionDelay: `${i * 200}ms` }}>
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-accent flex items-center justify-center">
                  <span className="text-primary text-3xl font-black leading-none">&ldquo;</span>
                </div>
                <p className="text-white/80 text-2xl md:text-3xl font-heading leading-relaxed mb-10 italic">&ldquo;{t.text}&rdquo;</p>
                <div className="flex flex-col items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center text-accent font-black text-xl border border-accent/20">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-white text-lg">{t.name}</p>
                    <p className="text-accent/60 text-sm uppercase tracking-widest font-mono">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT SECTION - C3 Reveal V5 */}
      <section id="contact" ref={contactReveal.ref} className="py-32 px-6 bg-primary">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-accent font-mono text-xs tracking-[0.4em] uppercase mb-6 opacity-60">Appointment</p>
          <h2 className={`font-heading text-6xl font-black mb-8 transition-all duration-700 ${contactReveal.isVisible ? 'opacity-100 skew-y-0 translate-y-0' : 'opacity-0 skew-y-2 translate-y-8'}`}>Secure Your Appointment</h2>
          <p className="text-white/40 mb-16 text-lg leading-relaxed">
            Our master tailors are ready to bring your vision to life. Please provide your details and we will reach out to schedule your consultation.
          </p>
          
          <ContactForm />
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-primary border-t border-white/10 py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16">
          <div className="md:col-span-2">
            <span className="text-4xl font-heading font-black tracking-tighter">IBKS<span className="text-accent">.</span></span>
            <p className="text-white/40 mt-6 max-w-sm text-lg leading-relaxed">{brand.description}</p>
            <div className="mt-10 flex gap-6">
              <a href="#" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:border-accent hover:text-accent transition-all">
                <Instagram size={20} />
              </a>
              <a href="#" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:border-accent hover:text-accent transition-all">
                <Phone size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold uppercase tracking-widest text-xs mb-8">Navigation</h4>
            <ul className="space-y-4 text-white/50 text-sm uppercase tracking-widest font-medium">
              <li><a href="#thecollection" className="hover:text-accent transition-colors">The Collection</a></li>
              <li><a href="#ourstory" className="hover:text-accent transition-colors">Our Story</a></li>
              <li><a href="#gallery" className="hover:text-accent transition-colors">Lookbook</a></li>
              <li><a href="#contact" className="hover:text-accent transition-colors">Book Consult</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold uppercase tracking-widest text-xs mb-8">Inquiries</h4>
            <div className="space-y-6 text-white/50 text-sm">
              <div className="flex items-center gap-3">
                <MapPin size={18} className="text-accent" />
                <span>Lagos, Nigeria</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={18} className="text-accent" />
                <span>contact@ibksclothing.com</span>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white/30 text-xs font-mono uppercase tracking-widest">
            © {new Date().getFullYear()} IBKS CLOTHING. ALL RIGHTS RESERVED.
          </p>
          <p className="text-white/20 text-[10px] font-mono tracking-widest">
            STRENGTH • DIGNITY • POWER
          </p>
        </div>
      </footer>
    </main>
  );
}

function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1500);
  };

  if (sent) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center animate-scaleIn bg-secondary/5 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent opacity-50" />
        <div className="w-24 h-24 rounded-full bg-accent/20 flex items-center justify-center mb-6 border border-accent/40 relative z-10">
          <CheckCheck size={40} className="text-accent" />
        </div>
        <h3 className="font-heading text-4xl font-black text-white mb-4 relative z-10">Message Received</h3>
        <p className="text-white/60 max-w-sm text-lg relative z-10 font-light">Thank you for choosing IBKS. Our consultation team will contact you within 24 hours.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 text-left">
      <div className="grid md:grid-cols-2 gap-5">
        <input
          type="text"
          placeholder="Full Name"
          value={form.name}
          onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))}
          required
          className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder-white/30 outline-none focus:border-accent transition-all"
        />
        <input
          type="email"
          placeholder="Email Address"
          value={form.email}
          onChange={e => setForm(prev => ({ ...prev, email: e.target.value }))}
          required
          className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder-white/30 outline-none focus:border-accent transition-all"
        />
      </div>
      <input
        type="text"
        placeholder="Phone Number (WhatsApp Preferred)"
        value={form.phone}
        onChange={e => setForm(prev => ({ ...prev, phone: e.target.value }))}
        required
        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder-white/30 outline-none focus:border-accent transition-all"
      />
      <textarea
        rows={5}
        placeholder="Garment Type or Special Request"
        value={form.message}
        onChange={e => setForm(prev => ({ ...prev, message: e.target.value }))}
        required
        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder-white/30 outline-none focus:border-accent transition-all resize-none"
      />
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-accent text-primary py-5 rounded-2xl font-black text-sm uppercase tracking-[0.2em] hover:brightness-110 hover:shadow-[0_0_30px_rgba(255,171,76,0.2)] transition-all disabled:opacity-50 flex justify-center items-center gap-4"
      >
        {loading ? (
          <><Loader2 className="animate-spin" size={20} /> Processing...</>
        ) : (
          <>Send Inquiry <ArrowRight size={20} /></>
        )}
      </button>
    </form>
  );
}