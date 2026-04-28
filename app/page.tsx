'use client';

// DESIGN DECISIONS:
// Layout Energy: editorial
// Depth Treatment: layered
// Divider Style: D-RULE
// Typography Personality: refined

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { 
  Scissors, 
  Truck, 
  Package, 
  Mail, 
  Phone, 
  MapPin, 
  ArrowRight, 
  Menu, 
  X, 
  CheckCheck, 
  Loader2, 
  ImageOff, 
  Instagram,
  Users,
  Award
} from 'lucide-react';

// --- Utilities & Hooks ---

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
  }, [threshold]);
  return { ref, isVisible };
};

function SafeImage({ src, alt, fill, width, height, className, priority }: {
  src: string; alt: string; fill?: boolean; width?: number; height?: number;
  className?: string; priority?: boolean;
}) {
  const [error, setError] = useState(false);
  if (error) {
    return (
      <div className={`flex items-center justify-center bg-secondary/10 ${className}`}>
        <ImageOff size={24} className="text-white/10" />
      </div>
    );
  }
  return (
    <Image 
      src={src} 
      alt={alt} 
      fill={fill}
      width={!fill ? (width ?? 800) : undefined}
      height={!fill ? (height ?? 600) : undefined}
      className={className} 
      priority={priority}
      onError={() => setError(true)} 
    />
  );
}

// --- Data ---

const brand = {
  name: "IBKS CLOTHING",
  tagline: "Class in Clothing",
  description: "Lagos' premier destination for the modern gentleman, blending the rich heritage of Traditional Nigerian Attire with the sharp precision of contemporary Corporate Wear and Bespoke Suits.",
  industry: "fashion",
  region: "Nigeria"
};

const IMAGES = {
  hero: "https://images.unsplash.com/photo-1591933320290-adfceefb40be?q=80&w=1080",
  products: [
    "https://images.unsplash.com/photo-1698314551183-0d9188d61f48?q=80&w=1080",
    "https://images.unsplash.com/photo-1670147434607-2467290ad9d0?q=80&w=1080",
    "https://images.unsplash.com/photo-1663572092941-4baed4429c73?q=80&w=1080",
    "https://images.unsplash.com/photo-1661332306744-70f9ed1a7f40?q=80&w=1080"
  ],
  lookbook: [
    "https://images.unsplash.com/photo-1595358418552-9954a8bda0d6?q=80&w=1080",
    "https://images.unsplash.com/photo-1620064916958-605375619af8?q=80&w=1080",
    "https://images.unsplash.com/photo-1731664453420-3b4fed3bcccb?q=80&w=1080",
    "https://images.unsplash.com/photo-1641764285272-69edef7e38a6?q=80&w=1080",
    "https://images.unsplash.com/photo-1769159524453-7a55e53066d8?q=80&w=1080",
    "https://images.unsplash.com/photo-1591932589265-e4c85fa393dd?q=80&w=1080"
  ]
};

const products = [
  { name: "Grand Agbada 'Oba' Edition", description: "Hand-stitched four-piece ensemble crafted from premium Aso-Oke and Italian silk blends.", price: "₦55,000" },
  { name: "Executive Two-Piece Suit", description: "Slim-fit charcoal corporate suit with silk lining and bespoke lapel detailing.", price: "₦45,000" },
  { name: "The Signature Linen Kaftan", description: "Crisp, breathable linen kaftan with intricate neck embroidery, perfect for the Lagos sun.", price: "₦25,000" },
  { name: "Essential Silk Pocket Square", description: "Hand-rolled edges with traditional patterns to elevate any blazer.", price: "₦5,000" }
];

const features = [
  { title: "Bespoke Tailoring", description: "Every stitch is measured to your exact proportions for a flawless silhouette.", icon: Scissors },
  { title: "Exquisite Fabrics", description: "We source only the finest silks, linens, and wools from across the globe.", icon: Award },
  { title: "Nationwide Delivery", description: "Sharp delivery, nationwide. Fast and secure shipping from our Lagos hub to your doorstep.", icon: Truck }
];

// --- Components ---

const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 md:px-12 py-5 ${
      scrolled ? 'bg-primary/95 backdrop-blur-xl border-b border-white/5 py-4' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <a href="#home" className="group">
          <span className="font-heading text-2xl font-bold tracking-tighter text-white">
            IBKS <span className="text-accent">CLOTHING</span>
          </span>
        </a>

        <div className="hidden md:flex items-center gap-10">
          {['Home', 'Collection', 'Consultation'].map((link) => (
            <a key={link} href={`#${link === 'Home' ? 'home' : link === 'Collection' ? 'products' : 'contact'}`} 
              className="text-xs uppercase tracking-[0.2em] font-medium text-white/70 hover:text-accent transition-colors">
              {link}
            </a>
          ))}
          <a href="#contact" className="bg-accent text-primary px-6 py-2.5 rounded-full font-bold text-xs uppercase tracking-widest hover:brightness-110 transition-all">
            Bespoke Consultation
          </a>
        </div>

        <button onClick={() => setMobileOpen(true)} className="md:hidden text-white">
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile Sidebar */}
      <div className={`fixed inset-0 z-[60] bg-primary transition-transform duration-500 ${mobileOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-8 flex flex-col h-full">
          <div className="flex justify-between items-center mb-16">
            <span className="font-heading text-xl font-bold">IBKS</span>
            <button onClick={() => setMobileOpen(false)} className="text-white"><X size={28} /></button>
          </div>
          <div className="flex flex-col gap-8">
            {['Home', 'Collection', 'Consultation'].map((link) => (
              <a key={link} href={`#${link === 'Home' ? 'home' : link === 'Collection' ? 'products' : 'contact'}`} 
                onClick={() => setMobileOpen(false)}
                className="font-heading text-4xl font-bold text-white">
                {link}
              </a>
            ))}
          </div>
          <div className="mt-auto pt-10 border-t border-white/10">
            <a href="#contact" onClick={() => setMobileOpen(false)} 
              className="block w-full bg-accent text-primary text-center py-4 rounded-xl font-bold">
              Bespoke Consultation
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

const SectionDivider = () => (
  <div className="py-16 flex items-center gap-8 px-8 max-w-6xl mx-auto">
    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
    <span className="text-accent font-mono text-[10px] tracking-[0.5em] uppercase whitespace-nowrap opacity-60">
      {brand.tagline}
    </span>
    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
  </div>
);

const Hero = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section id="home" ref={ref} className="min-h-screen grid md:grid-cols-[1fr_1fr] items-stretch bg-primary overflow-hidden">
      <div className={`flex flex-col justify-center px-8 md:px-20 py-32 transition-all duration-1000 ${isVisible ? 'opacity-100 skew-y-0 translate-y-0' : 'opacity-0 skew-y-2 translate-y-8'}`}>
        <p className="text-accent font-mono text-xs tracking-[0.4em] uppercase mb-6 opacity-80">Lagos Luxury Fashion</p>
        <h1 className="font-heading text-6xl md:text-[5.5rem] font-bold text-white leading-[0.9] tracking-tight">
          Elegance Rooted in <span className="italic text-accent/90">Heritage.</span>
        </h1>
        <p className="text-white/50 mt-8 text-lg max-w-md leading-relaxed">
          Experience &apos;Class in Clothing&apos; with our meticulously curated collection of Traditional Attire and Corporate Excellence.
        </p>
        <div className="flex gap-4 mt-12 flex-wrap">
          <a href="#products" className="bg-accent text-primary px-10 py-4 font-bold rounded-full hover:brightness-110 hover:scale-[1.02] transition-all duration-300">
            Explore the Collection
          </a>
        </div>
        <div className="mt-20 flex gap-12 border-t border-white/5 pt-10">
          <div>
            <p className="font-heading text-4xl font-bold text-white">2.7k+</p>
            <p className="text-white/30 text-[10px] uppercase tracking-widest mt-1 font-bold">Masterpieces</p>
          </div>
          <div>
            <p className="font-heading text-4xl font-bold text-white">15+</p>
            <p className="text-white/30 text-[10px] uppercase tracking-widest mt-1 font-bold">Master Tailors</p>
          </div>
        </div>
      </div>
      <div className={`relative min-h-[50vh] md:min-h-full transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}>
        <SafeImage src={IMAGES.hero} alt="Modern Gentleman" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/20 to-transparent" />
      </div>
    </section>
  );
};

const About = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section id="about" ref={ref} className="py-28 px-6 bg-secondary">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-20 items-center">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}>
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden group">
            <SafeImage src={IMAGES.lookbook[1]} alt="Tailoring Craft" fill className="object-cover group-hover:scale-105 transition-transform duration-1000" />
            <div className="absolute inset-0 border-[20px] border-secondary/20" />
          </div>
        </div>
        <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}>
          <h2 className="font-heading text-5xl font-bold text-primary mb-8 leading-tight">Our Legacy of Style</h2>
          <p className="text-primary/70 text-lg leading-relaxed mb-8">
            IBKS CLOTHING is more than a boutique; it&apos;s a testament to the Nigerian spirit of excellence. We believe that true class is found in the details—from the curve of a lapel to the weave of a Senator suit.
          </p>
          <div className="space-y-6">
            <div className="flex gap-4 items-center p-6 bg-white shadow-xl shadow-primary/5 rounded-2xl border border-primary/5">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent"><Users size={24} /></div>
              <div>
                <p className="font-bold text-primary">Master Tailors</p>
                <p className="text-primary/50 text-sm">Crafting excellence in our Lagos studio.</p>
              </div>
            </div>
            <div className="flex gap-4 items-center p-6 bg-white shadow-xl shadow-primary/5 rounded-2xl border border-primary/5">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent"><Award size={24} /></div>
              <div>
                <p className="font-bold text-primary">Traditional Heritage</p>
                <p className="text-primary/50 text-sm">Preserving the art of the Grand Agbada.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Products = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section id="products" ref={ref} className="py-28 px-6 bg-primary overflow-hidden">
      <div className="max-w-6xl mx-auto space-y-32">
        <div className="text-center">
          <h2 className="font-heading text-6xl font-bold text-white mb-4">Signature Pieces</h2>
          <p className="text-white/40 tracking-widest uppercase text-xs">Discover the height of luxury craftsmanship</p>
        </div>
        
        <div className="space-y-32">
          {products.map((p, i) => (
            <div key={i} className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12 md:gap-24
              transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
              style={{ transitionDelay: `${i * 200}ms` }}>
              <div className="w-full md:w-1/2 relative">
                <div className="aspect-[4/5] relative rounded-3xl overflow-hidden shadow-2xl group">
                  <SafeImage src={IMAGES.products[i]} alt={p.name} fill className="object-cover group-hover:scale-105 transition-all duration-1000" />
                  <div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-colors duration-500" />
                </div>
                <div className={`absolute -bottom-6 ${i % 2 === 0 ? '-right-6' : '-left-6'} w-3/4 h-3/4 bg-accent/5 rounded-3xl -z-10 blur-3xl`} />
              </div>
              <div className={`w-full md:w-1/2 ${i % 2 === 0 ? 'text-left' : 'md:text-right'}`}>
                <span className="font-mono text-accent text-xs font-bold tracking-widest uppercase mb-4 block">0{i + 1} — Collection</span>
                <h3 className="font-heading text-5xl font-bold text-white leading-tight mb-6">{p.name}</h3>
                <p className="text-white/50 text-xl leading-relaxed mb-8">{p.description}</p>
                <div className="flex flex-col gap-8">
                  <span className="text-4xl font-bold text-white">{p.price}</span>
                  <a href="#contact" className="bg-white/5 border border-white/10 text-white px-8 py-4 rounded-full font-bold hover:bg-accent hover:text-primary transition-all w-fit">
                    Request Fitting
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Gallery = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section ref={ref} className="py-28 px-6 bg-secondary">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h2 className="font-heading text-5xl font-bold text-primary">The Lookbook</h2>
            <p className="text-primary/50 mt-2">A visual journey through our latest drops.</p>
          </div>
          <div className="h-px flex-1 bg-primary/10 mx-10 hidden md:block" />
          <p className="text-primary/30 font-mono text-[10px] uppercase tracking-[0.4em]">Curated Excellence</p>
        </div>
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {IMAGES.lookbook.map((src, i) => (
            <div key={i} className={`break-inside-avoid group relative rounded-2xl overflow-hidden transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-6 blur-sm'
            }`} style={{ transitionDelay: `${i * 100}ms` }}>
              <SafeImage src={src} alt={`Lookbook ${i + 1}`} width={600} height={800} className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full border border-white/50 flex items-center justify-center">
                  <Instagram size={20} className="text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Features = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section ref={ref} className="py-28 px-6 bg-primary">
      <div className="max-w-6xl mx-auto">
        <div className="mb-20">
          <h2 className="font-heading text-5xl font-bold text-white mb-4">Why Choose IBKS</h2>
          <p className="text-white/40 text-lg">The standard of Lagos luxury.</p>
        </div>
        <div className="divide-y divide-white/10">
          {features.map((f, i) => (
            <div key={i} className={`py-12 flex flex-col md:flex-row items-start gap-12 group transition-all duration-700 ${
              isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`} style={{ transitionDelay: `${i * 150}ms` }}>
              <span className="font-heading text-accent/30 text-5xl font-bold shrink-0 w-20">
                0{i + 1}
              </span>
              <div className="flex-1 pt-2">
                <h3 className="font-heading text-3xl font-bold text-white group-hover:text-accent transition-colors mb-4">{f.title}</h3>
                <p className="text-white/50 text-lg max-w-2xl leading-relaxed">{f.description}</p>
              </div>
              <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-accent group-hover:border-accent transition-all duration-500">
                <f.icon className="text-white group-hover:text-primary" size={24} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const { ref, isVisible } = useScrollReveal();
  const items = [
    { name: "Folake Adeniyi", text: "The Agbada I ordered for my husband's birthday was breathtaking. The attention to detail is unmatched in Lagos.", role: "Verified Client" },
    { name: "Chidi Okoro", text: "Best corporate suits in the city. The fit was perfect on the first try. IBKS defines professionalism.", role: "Executive, Tech Firm" }
  ];

  return (
    <section ref={ref} className="py-28 px-6 bg-accent/5">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="font-heading text-5xl font-bold text-white mb-16">Client Stories</h2>
        <div className="space-y-10">
          {items.map((t, i) => (
            <div key={i} className={`relative py-12 px-10 rounded-3xl border border-white/5 bg-primary/40 backdrop-blur-sm transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`} style={{ transitionDelay: `${i * 200}ms` }}>
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-accent flex items-center justify-center text-primary font-black text-2xl">
                &ldquo;
              </div>
              <p className="text-white/80 text-2xl italic font-heading leading-relaxed mb-10">&ldquo;{t.text}&rdquo;</p>
              <div className="flex items-center justify-center gap-4">
                <div className="text-left">
                  <p className="font-bold text-white text-lg">{t.name}</p>
                  <p className="text-accent text-xs font-mono tracking-widest uppercase mt-1">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  const { ref, isVisible } = useScrollReveal();
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1500);
  };

  return (
    <section id="contact" ref={ref} className="relative overflow-hidden py-32">
      <div className="absolute inset-0 bg-accent" />
      <div className="absolute inset-0 bg-primary [clip-path:polygon(0_0,65%_0,50%_100%,0_100%)] hidden md:block" />
      <div className="absolute inset-0 bg-primary opacity-90 md:hidden" />
      
      <div className={`relative z-10 max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}>
        <div className="text-white">
          <h2 className="font-heading text-7xl md:text-[6rem] font-bold leading-none mb-10">Visit Our <br/><span className="text-accent italic">Boutique</span></h2>
          <div className="space-y-8 max-w-sm">
            <div className="flex gap-4">
              <MapPin className="text-accent shrink-0" />
              <p className="text-white/70">Lagos, Nigeria — The Heart of Contemporary Fashion.</p>
            </div>
            <div className="flex gap-4">
              <Instagram className="text-accent shrink-0" />
              <p className="text-white/70">@ibks_clothing</p>
            </div>
          </div>
        </div>

        <div className="w-full max-w-lg ml-auto">
          {sent ? (
            <div className="bg-secondary p-12 text-center rounded-3xl animate-scaleIn">
              <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center mb-6 mx-auto">
                <CheckCheck size={32} className="text-accent" />
              </div>
              <h3 className="font-heading text-3xl font-bold text-primary mb-3">Consultation Booked</h3>
              <p className="text-primary/60">Our head tailor will reach out within 24 hours to confirm your bespoke session.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-secondary p-8 sm:p-12 rounded-3xl shadow-2xl space-y-4">
              <h3 className="font-heading text-3xl font-bold text-primary mb-8">Bespoke Inquiry</h3>
              {['name', 'email', 'phone'].map(field => (
                <input
                  key={field}
                  type={field === 'email' ? 'email' : 'text'}
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  required={field !== 'phone'}
                  className="w-full bg-primary/5 border border-primary/10 rounded-xl px-5 py-4 text-primary placeholder-primary/40 outline-none focus:border-accent transition-all"
                  value={(form as any)[field]}
                  onChange={e => setForm(prev => ({ ...prev, [field]: e.target.value }))}
                />
              ))}
              <textarea
                placeholder="How can we help define your style?"
                rows={4}
                className="w-full bg-primary/5 border border-primary/10 rounded-xl px-5 py-4 text-primary placeholder-primary/40 outline-none focus:border-accent transition-all"
                value={form.message}
                onChange={e => setForm(prev => ({ ...prev, message: e.target.value }))}
              />
              <button disabled={loading} className="w-full bg-primary text-white py-4 rounded-xl font-bold hover:bg-accent hover:text-primary transition-all flex justify-center items-center gap-3">
                {loading ? <Loader2 className="animate-spin" /> : <>Schedule Now <ArrowRight size={18} /></>}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-primary pt-24 pb-12 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-2">
            <span className="font-heading text-3xl font-bold tracking-tighter text-white">
              IBKS <span className="text-accent">CLOTHING</span>
            </span>
            <p className="text-white/40 mt-6 max-w-sm text-sm leading-relaxed">
              Lagos premier destination for the modern gentleman. We blend heritage and precision to define true class.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-xs">Navigation</h4>
            <div className="flex flex-col gap-4">
              <a href="#home" className="text-white/50 hover:text-accent transition-colors text-sm">Home</a>
              <a href="#products" className="text-white/50 hover:text-accent transition-colors text-sm">Collection</a>
              <a href="#contact" className="text-white/50 hover:text-accent transition-colors text-sm">Consultation</a>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-xs">Connect</h4>
            <div className="flex flex-col gap-4">
              <a href="https://instagram.com/ibks_clothing" className="text-white/50 hover:text-accent transition-colors text-sm">Instagram</a>
              <a href="https://wa.me/message/IBKS" className="text-white/50 hover:text-accent transition-colors text-sm">WhatsApp</a>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center pt-10 border-t border-white/5 gap-6">
          <p className="text-white/20 text-xs tracking-widest uppercase">
            © {new Date().getFullYear()} IBKS CLOTHING. All Rights Reserved.
          </p>
          <div className="flex gap-8">
            <span className="text-white/20 text-[10px] uppercase tracking-[0.3em]">Crafted in Lagos</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function Page() {
  return (
    <main className="relative">
      <Nav />
      <Hero />
      <About />
      <SectionDivider />
      <Products />
      <Gallery />
      <Features />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  );
}