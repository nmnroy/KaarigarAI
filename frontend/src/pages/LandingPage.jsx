import React from 'react';
import ArtisanContentGenerator from './ArtisanContentGenerator';

function LandingPage() {
  return (
    <div className="bg-cream min-h-screen text-deepBrown">
      
      {/* 1. Hero Section */}
      <section className="relative pt-20 pb-24 px-4 sm:px-6 lg:px-8 text-center bg-cream bg-indian-pattern bg-[length:60px_60px]">
        {/* Semi-transparent overlay for readability if needed */}
        <div className="absolute inset-0 bg-cream/80"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-terracotta-dark mb-6 leading-tight">
            From Your Hands to the World
          </h1>
          <p className="text-xl md:text-2xl text-deepBrown-light mb-10 font-sans max-w-2xl mx-auto">
            KaarigarAI automatically writes your heritage stories, product listings, and Instagram captions in seconds.
          </p>
          <a href="#demo" className="inline-block bg-saffron text-white text-lg font-bold px-8 py-4 rounded-full shadow-lg hover:bg-saffron-dark transition-transform hover:-translate-y-1">
            Start Selling Automatically
          </a>
        </div>
      </section>

      {/* 2. Problem Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-serif font-bold text-center text-terracotta mb-16">The Artisan's Struggle</h2>
          <div className="grid md:grid-cols-3 gap-10">
            {/* Pain Point 1 */}
            <div className="bg-cream rounded-2xl p-8 text-center shadow-md">
              <div className="text-5xl mb-4">📱</div>
              <h3 className="text-xl font-bold mb-3 text-deepBrown">No Digital Skills</h3>
              <p className="text-deepBrown-light">Selling online requires SEO, cataloging, and digital marketing knowledge that takes years to learn.</p>
            </div>
            {/* Pain Point 2 */}
            <div className="bg-cream rounded-2xl p-8 text-center shadow-md">
              <div className="text-5xl mb-4">🗣️</div>
              <h3 className="text-xl font-bold mb-3 text-deepBrown">Language Barriers</h3>
              <p className="text-deepBrown-light">Most global marketplaces operate in English, making it incredibly hard to write compelling product descriptions.</p>
            </div>
            {/* Pain Point 3 */}
            <div className="bg-cream rounded-2xl p-8 text-center shadow-md">
              <div className="text-5xl mb-4">💰</div>
              <h3 className="text-xl font-bold mb-3 text-deepBrown">Pricing Confusion</h3>
              <p className="text-deepBrown-light">Artisans often severely underprice their handmade heritage crafts because they don't know the global market value.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Solution Section */}
      <section className="py-20 bg-terracotta text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-center mb-16 text-cream">How KaarigarAI Helps You</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="text-center p-6 border border-terracotta-light rounded-2xl bg-terracotta-dark/30 hover:bg-terracotta-dark/50 transition-colors">
              <div className="text-4xl mb-4">📖</div>
              <h3 className="text-lg font-bold mb-2">Heritage Story Generator</h3>
              <p className="text-sm text-cream/80">Creates emotional and authentic background stories for your specific crafts.</p>
            </div>
             {/* Feature 2 */}
            <div className="text-center p-6 border border-terracotta-light rounded-2xl bg-terracotta-dark/30 hover:bg-terracotta-dark/50 transition-colors">
              <div className="text-4xl mb-4">🛍️</div>
              <h3 className="text-lg font-bold mb-2">Marketplace Copy</h3>
              <p className="text-sm text-cream/80">Generates SEO-rich titles, descriptions, and tags ready for Etsy or Amazon.</p>
            </div>
             {/* Feature 3 */}
            <div className="text-center p-6 border border-terracotta-light rounded-2xl bg-terracotta-dark/30 hover:bg-terracotta-dark/50 transition-colors">
              <div className="text-4xl mb-4">⚖️</div>
              <h3 className="text-lg font-bold mb-2">Smart Pricing</h3>
              <p className="text-sm text-cream/80">Suggests fair low, mid, and high pricing ranges in INR based on your product.</p>
            </div>
             {/* Feature 4 */}
            <div className="text-center p-6 border border-terracotta-light rounded-2xl bg-terracotta-dark/30 hover:bg-terracotta-dark/50 transition-colors">
              <div className="text-4xl mb-4">🌐</div>
              <h3 className="text-lg font-bold mb-2">Multilingual</h3>
              <p className="text-sm text-cream/80">Work in Hindi or English, and let the AI translate it perfectly for the global market.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. How It Works Section */}
      <section className="py-20 bg-cream-dark/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-serif font-bold text-center text-terracotta mb-16">Three Simple Steps</h2>
          
          <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-12 relative">
            {/* Connector Line (Desktop) */}
            <div className="hidden md:block absolute top-1/2 left-1/4 right-1/4 h-1 bg-saffron-light -z-0"></div>

            {/* Step 1 */}
            <div className="relative z-10 flex flex-col items-center max-w-xs text-center">
              <div className="w-16 h-16 bg-saffron text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4 shadow-lg border-4 border-cream">1</div>
              <h3 className="text-xl font-bold text-deepBrown mb-2">Snap & Upload</h3>
              <p className="text-deepBrown-light">Take a clear photo of your handmade product and give it a brief description.</p>
            </div>
             {/* Step 2 */}
            <div className="relative z-10 flex flex-col items-center max-w-xs text-center">
              <div className="w-16 h-16 bg-saffron text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4 shadow-lg border-4 border-cream">2</div>
              <h3 className="text-xl font-bold text-deepBrown mb-2">AI Generates</h3>
              <p className="text-deepBrown-light">Our cultural AI analyzes the craft and instantly writes compelling marketing content.</p>
            </div>
             {/* Step 3 */}
            <div className="relative z-10 flex flex-col items-center max-w-xs text-center">
              <div className="w-16 h-16 bg-saffron text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4 shadow-lg border-4 border-cream">3</div>
              <h3 className="text-xl font-bold text-deepBrown mb-2">Copy & Publish</h3>
              <p className="text-deepBrown-light">Copy the results and paste them directly into Instagram, WhatsApp, or Amazon.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Live Demo Section (Embedded Component) */}
      <section id="demo" className="py-20 bg-white border-t border-cream-dark shadow-inner">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif font-bold text-deepBrown mb-4">Try KaarigarAI Now</h2>
            <p className="text-lg text-deepBrown-light">No signup required. Experience the magic for yourself.</p>
          </div>
          
          {/* Decorative wrapper for the generator */}
          <div className="bg-cream rounded-3xl shadow-2xl p-2 sm:p-4 border border-saffron-light">
             <ArtisanContentGenerator />
          </div>
        </div>
      </section>

      {/* 6. Footer */}
      <footer className="bg-deepBrown text-cream py-12 text-center border-t-4 border-saffron">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-4xl mb-4">🏺</div>
          <h2 className="text-2xl font-serif font-bold text-saffron mb-2">KaarigarAI</h2>
          <p className="text-lg text-cream-dark mb-8">Empowering Indian Artisans with Artificial Intelligence.</p>
          <div className="inline-block px-6 py-2 border border-terracotta-light rounded-full text-terracotta-light font-medium tracking-wider uppercase text-sm">
            Built for Bharat
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
