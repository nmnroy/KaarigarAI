import React, { useState, useEffect } from 'react';
import ArtisanContentGenerator from './ArtisanContentGenerator';

function LandingPage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="bg-cream min-h-screen text-deepBrown">
      
      {/* ===== Sticky Navbar ===== */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-3' : 'bg-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🏺</span>
            <div>
              <h1 className="text-xl sm:text-2xl font-serif font-bold text-terracotta tracking-tight leading-none">KaarigarAI</h1>
              <p className="text-[10px] sm:text-xs text-deepBrown-light tracking-widest uppercase font-medium">Hunar ko Duniya Tak</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <a href="#features" className="hidden sm:inline-block text-sm font-medium text-deepBrown-light hover:text-terracotta transition-colors">Features</a>
            <a href="#how" className="hidden sm:inline-block text-sm font-medium text-deepBrown-light hover:text-terracotta transition-colors">How It Works</a>
            <a href="#demo" className="bg-saffron hover:bg-saffron-dark text-white text-sm font-bold px-5 py-2 rounded-full shadow-md transition-all hover:-translate-y-0.5">Try Now</a>
          </div>
        </div>
      </nav>

      {/* ===== 1. Hero Section ===== */}
      <section className="relative pt-32 sm:pt-40 pb-28 px-4 sm:px-6 lg:px-8 text-center overflow-hidden">
        {/* Mandala pattern background */}
        <div className="absolute inset-0 bg-mandala-pattern bg-[length:200px_200px] opacity-60 pointer-events-none"></div>
        {/* Gradient overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-cream via-cream/95 to-cream pointer-events-none"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="animate-fade-in-up">
            <p className="inline-block text-xs sm:text-sm font-semibold tracking-widest uppercase text-saffron bg-saffron/10 border border-saffron/20 rounded-full px-4 py-1.5 mb-6">
              AI-Powered Craft Marketing
            </p>
          </div>
          <h2 className="text-5xl sm:text-6xl md:text-7xl font-serif font-bold text-deepBrown mb-6 leading-[1.1] animate-fade-in-up-delay-1">
            From Your Hands{' '}
            <span className="text-terracotta">to the World</span>
          </h2>
          <p className="text-lg sm:text-xl text-deepBrown-light mb-10 font-sans max-w-2xl mx-auto leading-relaxed animate-fade-in-up-delay-2">
            KaarigarAI automatically writes your heritage stories, product listings, and Instagram captions in seconds — so you can focus on your craft.
          </p>
          <div className="animate-fade-in-up-delay-3">
            <a href="#demo" className="inline-block bg-saffron text-white text-lg font-bold px-10 py-4 rounded-full shadow-lg hover:bg-saffron-dark transition-all hover:-translate-y-1 animate-pulse-glow">
              ✨ Start Selling Automatically
            </a>
          </div>
        </div>

        {/* Decorative bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 40L48 37C96 34 192 28 288 30C384 32 480 42 576 47C672 52 768 52 864 47C960 42 1056 32 1152 30C1248 28 1344 34 1392 37L1440 40V80H0V40Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* ===== 2. Problem Section ===== */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-center text-terracotta mb-4">The Artisan's Struggle</h2>
          <p className="text-center text-deepBrown-light mb-16 max-w-xl mx-auto">7 million artisans. Less than 3% sell online. Here's why.</p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: '📱', title: 'No Digital Skills', desc: 'Selling online requires SEO, cataloging, and digital marketing knowledge that takes years to learn.' },
              { icon: '🗣️', title: 'Language Barriers', desc: 'Most global marketplaces operate in English, making it incredibly hard to write compelling product descriptions.' },
              { icon: '💰', title: 'Pricing Confusion', desc: 'Artisans often severely underprice their handmade heritage crafts because they don\'t know the global market value.' }
            ].map((item, i) => (
              <div key={i} className="bg-cream rounded-2xl p-8 text-center shadow-md border border-cream-dark/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">{item.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-deepBrown">{item.title}</h3>
                <p className="text-deepBrown-light leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 3. Solution / Features Section ===== */}
      <section id="features" className="py-20 bg-gradient-to-br from-terracotta to-terracotta-dark text-white relative overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 bg-mandala-pattern bg-[length:180px_180px] opacity-10 pointer-events-none"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-center mb-4 text-cream">How KaarigarAI Helps You</h2>
          <p className="text-center text-cream/70 mb-16 max-w-lg mx-auto">One photo. Four powerful AI-generated content pieces.</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: '📖', title: 'Heritage Story Generator', desc: 'Creates emotional and authentic background stories for your specific crafts.' },
              { icon: '🛍️', title: 'Marketplace Copy', desc: 'Generates SEO-rich titles, descriptions, and tags ready for Etsy or Amazon.' },
              { icon: '⚖️', title: 'Smart Pricing', desc: 'Suggests fair low, mid, and high pricing ranges in INR based on your product.' },
              { icon: '🌐', title: 'Multilingual', desc: 'Work in Hindi or English, and let the AI translate it perfectly for the global market.' }
            ].map((item, i) => (
              <div key={i} className="text-center p-6 border border-white/15 rounded-2xl bg-white/5 backdrop-blur-sm hover:bg-white/15 transition-all duration-300 hover:-translate-y-1 group">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{item.icon}</div>
                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-cream/80 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 4. How It Works Section ===== */}
      <section id="how" className="py-20 bg-cream-dark/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-center text-terracotta mb-16">Three Simple Steps</h2>
          
          <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-12 relative">
            {/* Connector Line (Desktop) */}
            <div className="hidden md:block absolute top-1/2 left-1/4 right-1/4 h-1 bg-gradient-to-r from-saffron via-terracotta to-saffron rounded-full -z-0"></div>

            {[
              { num: '1', title: 'Snap & Upload', desc: 'Take a clear photo of your handmade product and give it a brief description.' },
              { num: '2', title: 'AI Generates', desc: 'Our cultural AI analyzes the craft and instantly writes compelling marketing content.' },
              { num: '3', title: 'Copy & Publish', desc: 'Copy the results and paste them directly into Instagram, WhatsApp, or Amazon.' }
            ].map((step, i) => (
              <div key={i} className="relative z-10 flex flex-col items-center max-w-xs text-center group">
                <div className="w-16 h-16 bg-saffron text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4 shadow-lg border-4 border-cream group-hover:scale-110 transition-transform duration-300">{step.num}</div>
                <h3 className="text-xl font-bold text-deepBrown mb-2">{step.title}</h3>
                <p className="text-deepBrown-light leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 5. Live Demo Section ===== */}
      <section id="demo" className="py-20 bg-white border-t border-cream-dark">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif font-bold text-deepBrown mb-4">Try KaarigarAI Now</h2>
            <p className="text-lg text-deepBrown-light">No signup required. Experience the magic for yourself.</p>
          </div>
          
          {/* Decorative wrapper for the generator */}
          <div className="bg-cream rounded-3xl shadow-2xl p-2 sm:p-4 border border-saffron-light/30">
             <ArtisanContentGenerator />
          </div>
        </div>
      </section>

      {/* ===== 6. Footer ===== */}
      <footer className="bg-deepBrown text-cream py-12 text-center border-t-4 border-saffron relative overflow-hidden">
        {/* Mandala subtle background */}
        <div className="absolute inset-0 bg-mandala-pattern bg-[length:150px_150px] opacity-5 pointer-events-none"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <div className="text-4xl mb-4">🏺</div>
          <h2 className="text-2xl font-serif font-bold text-saffron mb-1">KaarigarAI</h2>
          <p className="text-xs tracking-[0.3em] uppercase text-saffron-light/70 mb-4">Hunar ko Duniya Tak</p>
          <p className="text-base text-cream-dark mb-8">Empowering Indian Artisans with Artificial Intelligence.</p>
          <div className="inline-block px-6 py-2 border border-terracotta-light/40 rounded-full text-terracotta-light font-medium tracking-wider uppercase text-sm hover:bg-terracotta-light/10 transition-colors">
            Built for Bharat 🇮🇳
          </div>
          <p className="mt-8 text-sm text-deepBrown-light opacity-50">
            © 2026 KaarigarAI. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
