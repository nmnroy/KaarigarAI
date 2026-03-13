import React, { useState, useEffect, useCallback } from 'react';
import pitchData from '../data/pitchDeck.json';

const PitchDeck = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlideIndex((prev) => (prev === pitchData.length - 1 ? prev : prev + 1));
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlideIndex((prev) => (prev === 0 ? 0 : prev - 1));
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'Space') {
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        prevSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  const slide = pitchData[currentSlideIndex];

  // Helper renderer for different slide types
  const renderSlideContent = () => {
    switch (slide.type) {
      case 'title':
      case 'cta':
        return (
          <div className="flex flex-col items-center justify-center text-center h-full max-w-4xl mx-auto space-y-8">
            <h1 className="text-6xl sm:text-7xl font-serif font-bold text-terracotta">{slide.title}</h1>
            {slide.subtitle && <h2 className="text-3xl text-saffron-dark font-medium">{slide.subtitle}</h2>}
            <p className="text-2xl text-deepBrown-light mt-8 font-serif italic">"{slide.content}"</p>
          </div>
        );

      case 'architecture':
        return (
          <div className="flex flex-col h-full max-w-6xl mx-auto w-full">
            <h1 className="text-5xl font-serif font-bold text-terracotta mb-4 border-b-4 border-saffron pb-4">{slide.title}</h1>
            <p className="text-xl text-deepBrown-light mb-12">{slide.content}</p>
            
            {/* Visual Architecture Diagram using Flexbox */}
            <div className="flex-grow flex flex-col md:flex-row items-center justify-between gap-4 py-8">
              
              <div className="flex flex-col gap-8 w-full md:w-1/4">
                 <div className="bg-white border-2 border-saffron-light shadow-xl rounded-xl p-6 text-center z-10">
                   <div className="text-4xl mb-2">📱</div>
                   <h3 className="font-bold text-terracotta">WhatsApp Bot</h3>
                   <p className="text-sm text-gray-500">Twilio Webhook</p>
                 </div>
                 <div className="bg-white border-2 border-saffron-light shadow-xl rounded-xl p-6 text-center z-10">
                   <div className="text-4xl mb-2">💻</div>
                   <h3 className="font-bold text-terracotta">Web Upload</h3>
                   <p className="text-sm text-gray-500">React Frontend</p>
                 </div>
              </div>

              {/* Data Flow Arrows */}
              <div className="hidden md:flex flex-col justify-center items-center px-4 w-1/4">
                 <div className="flex gap-2 items-center text-saffron font-bold tracking-widest text-lg">
                   PHOTO & TEXT <span className="text-3xl">→</span>
                 </div>
              </div>

              <div className="bg-terracotta-light/10 border-4 border-terracotta shadow-2xl rounded-3xl p-8 text-center flex-grow z-10 w-full relative">
                 <div className="absolute top-0 right-0 -mt-6 -mr-6 bg-saffron text-white font-bold p-3 rounded-full shadow-lg">Cloud</div>
                 <div className="text-5xl mb-4">⚙️</div>
                 <h2 className="text-2xl font-bold text-deepBrown mb-2">Node.js Gateway</h2>
                 <p className="text-deepBrown-light mb-6">Handles formatting & routing</p>
                 
                 <div className="flex justify-center gap-4 mt-8">
                   <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
                     <span className="font-bold text-blue-600 block">Gemini 1.5 Pro</span>
                     <span className="text-xs">Vision + Text Gens</span>
                   </div>
                   <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
                     <span className="font-bold text-blue-600 block">Google Translate</span>
                     <span className="text-xs">Multilingual Output</span>
                   </div>
                 </div>
              </div>

              <div className="hidden md:flex flex-col justify-center items-center px-4 w-1/4">
                 <div className="flex gap-2 items-center text-saffron font-bold text-center tracking-widest text-lg">
                   <span className="text-3xl">→</span> GENERATED DATA
                 </div>
              </div>

              <div className="w-full md:w-1/4 flex flex-col justify-center">
                 <div className="bg-white border-2 border-saffron-light shadow-xl rounded-xl p-6 text-center z-10">
                   <div className="text-4xl mb-2">📦</div>
                   <h3 className="font-bold text-terracotta">Marketplaces</h3>
                   <p className="text-sm text-gray-500">Etsy, Amazon List</p>
                 </div>
              </div>

            </div>
          </div>
        );

      case 'market':
        return (
          <div className="flex flex-col h-full max-w-5xl mx-auto w-full">
            <h1 className="text-5xl font-serif font-bold text-terracotta mb-4 border-b-4 border-saffron pb-4">{slide.title}</h1>
            <p className="text-xl text-deepBrown-light mb-16">{slide.content}</p>
            <div className="flex flex-col gap-10 justify-center flex-grow">
              {slide.stats.map((stat, i) => (
                <div key={i} className="flex justify-between items-center bg-white p-8 rounded-2xl shadow-md border border-cream-dark hover:border-saffron transition-colors">
                   <h3 className="text-2xl sm:text-3xl text-deepBrown-light font-medium">{stat.label}</h3>
                   <span className="text-4xl sm:text-6xl font-bold text-saffron drop-shadow-sm">{stat.value}</span>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        // Problem, Solution, Tech, Demo, Google, Team
        return (
          <div className="flex flex-col h-full max-w-5xl mx-auto w-full">
            <h1 className="text-5xl font-serif font-bold text-terracotta mb-4 border-b-4 border-saffron pb-4">{slide.title}</h1>
            {slide.content && <p className="text-2xl text-deepBrown-light mb-12 font-medium">{slide.content}</p>}
            
            {slide.bullets && (
              <ul className="space-y-8 flex-grow flex flex-col justify-center">
                {slide.bullets.map((bullet, i) => {
                  const [boldPart, rest] = bullet.includes(':') ? bullet.split(/:(.+)/) : [bullet, ''];
                  return (
                    <li key={i} className="flex items-start text-2xl sm:text-3xl text-deepBrown leading-tight">
                      <span className="text-saffron mr-4 mt-1">✦</span>
                      <span>
                        {rest ? (
                          <>
                            <span className="font-bold text-terracotta">{boldPart}:</span>
                            <span className="text-deepBrown-light">{rest}</span>
                          </>
                        ) : (
                          <span className="text-deepBrown-light">{bullet}</span>
                        )}
                      </span>
                    </li>
                  )
                })}
              </ul>
            )}
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen h-screen w-full bg-cream text-deepBrown flex flex-col font-sans overflow-hidden select-none">
      
      {/* Background Motifs */}
      <div className="absolute inset-0 bg-indian-pattern bg-[length:120px_120px] opacity-10 pointer-events-none"></div>

      {/* Main Slide Sandbox */}
      <main className="flex-grow flex items-center justify-center p-8 sm:p-16 relative z-10 w-full">
        {renderSlideContent()}
      </main>

      {/* Slide Navigation & Progress */}
      <footer className="h-16 flex items-center justify-between px-8 z-10 border-t border-saffron/20 relative">
         <div className="text-deepBrown-light font-medium">KaarigarAI Pitch Deck</div>
         
         <div className="flex gap-4">
           <button 
             onClick={prevSlide}
             disabled={currentSlideIndex === 0}
             className="p-2 rounded-full hover:bg-saffron/20 disabled:opacity-30 transition-colors"
           >
             ◀
           </button>
           <div className="px-4 py-2 font-bold text-terracotta">
             {currentSlideIndex + 1} / {pitchData.length}
           </div>
           <button 
             onClick={nextSlide}
             disabled={currentSlideIndex === pitchData.length - 1}
             className="p-2 rounded-full hover:bg-saffron/20 disabled:opacity-30 transition-colors"
           >
             ▶
           </button>
         </div>

         {/* Progress Bar background graphic */}
         <div className="absolute bottom-0 left-0 h-1 bg-saffron transition-all duration-300 ease-out" 
              style={{ width: `${((currentSlideIndex + 1) / pitchData.length) * 100}%` }}></div>
      </footer>
    </div>
  );
};

export default PitchDeck;
