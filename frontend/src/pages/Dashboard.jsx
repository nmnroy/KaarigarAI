import { useState, useEffect } from 'react';
import { Copy, Check, MessageCircle, Instagram, Store, BookOpen, Tag } from 'lucide-react';

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [artisan, setArtisan] = useState(null);
  const [lang, setLang] = useState('en');
  const [copiedSection, setCopiedSection] = useState(null);

  useEffect(() => {
    const rawData = localStorage.getItem('generatedContent');
    const rawArtisan = localStorage.getItem('artisan');
    
    if (rawData) setData(JSON.parse(rawData));
    if (rawArtisan) {
      const parsedArtisan = JSON.parse(rawArtisan);
      setArtisan(parsedArtisan);
      if (parsedArtisan.language === 'Hindi') setLang('hi');
    }
  }, []);

  const currentData = data ? data[lang] : null;

  const copyToClipboard = (text, section) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(section);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  if (!data) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-gray-500">No content found. Please upload a product first.</h2>
        <a href="/upload" className="btn-primary inline-block mt-4 text-white">Go to Upload</a>
      </div>
    );
  }

  const renderCopyButton = (text, section) => (
    <button 
      onClick={() => copyToClipboard(text, section)}
      className="text-gray-500 hover:text-terracotta bg-gray-100 hover:bg-terracotta/10 p-2 rounded-lg transition-colors"
      title="Copy to clipboard"
    >
      {copiedSection === section ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
    </button>
  );

  return (
    <div className="max-w-5xl mx-auto mt-4 pb-12">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-terracotta-dark">Your AI Marketing Kit</h2>
          <p className="text-gray-600 mt-1">Ready to share {!artisan?.name ? 'your' : `${artisan.name}'s`} craft with the world.</p>
        </div>
        
        <div className="bg-white p-1 rounded-lg border border-gray-200 shadow-sm flex items-center">
          <button 
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${lang === 'en' ? 'bg-terracotta text-white' : 'text-gray-600 hover:bg-gray-50'}`}
            onClick={() => setLang('en')}
          >
            English
          </button>
          <button 
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${lang === 'hi' ? 'bg-terracotta text-white' : 'text-gray-600 hover:bg-gray-50'}`}
            onClick={() => setLang('hi')}
          >
            हिंदी (Hindi)
          </button>
        </div>
      </div>

      {!currentData ? (
        <div className="card p-8 text-center text-red-500">Failed to load content for this language.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Product Listing Card */}
          <div className="card p-6 flex flex-col h-full border-t-4 border-t-saffron">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <Store size={20} className="text-saffron" /> Shop Listing
              </h3>
              {renderCopyButton(
                `${currentData.productListing.title}\n\n${currentData.productListing.description}\n\nSuggested Price: ${currentData.suggestedPrice}`, 
                'listing'
              )}
            </div>
            
            <div className="bg-ivory rounded-lg p-4 flex-grow border border-gray-100">
              <h4 className="font-bold text-lg mb-2">{currentData.productListing.title}</h4>
              <p className="text-gray-700 whitespace-pre-line text-sm leading-relaxed mb-4">
                {currentData.productListing.description}
              </p>
              
              <div className="mt-auto">
                <div className="flex gap-2 flex-wrap mb-3">
                  {currentData.productListing.tags.map(tag => (
                    <span key={tag} className="bg-white border border-gray-200 text-gray-600 px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                      <Tag size={10} /> {tag}
                    </span>
                  ))}
                </div>
                <div className="inline-block bg-green-50 text-green-700 font-bold px-3 py-1.5 rounded-lg border border-green-200 text-sm">
                  Suggested Price: {currentData.suggestedPrice}
                </div>
              </div>
            </div>
          </div>

          {/* Social Media & WhatsApp */}
          <div className="flex flex-col gap-6">
            
            {/* Story Card */}
            <div className="card p-6 border-l-4 border-l-terracotta">
               <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                  <BookOpen size={20} className="text-terracotta" /> Heritage Story
                </h3>
                {renderCopyButton(currentData.heritageStory, 'story')}
              </div>
              <div className="bg-cream rounded-lg p-4 border border-gray-100">
                <p className="text-gray-700 italic text-sm leading-relaxed relative">
                  <span className="text-4xl text-terracotta/20 absolute -top-2 -left-2 leading-none">"</span>
                  {currentData.heritageStory}
                </p>
              </div>
            </div>

            {/* WhatsApp Card */}
            <div className="card p-6 border-l-4 border-l-green-500">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                  <MessageCircle size={20} className="text-green-500" /> WhatsApp Pitch
                </h3>
                {renderCopyButton(currentData.whatsappMessage, 'whatsapp')}
              </div>
              <div className="bg-green-50/50 rounded-lg p-4 border border-green-100">
                 <p className="text-gray-800 whitespace-pre-line text-sm">
                  {currentData.whatsappMessage}
                </p>
              </div>
            </div>

          </div>

          {/* Instagram Captions - full width bottom */}
          <div className="card p-6 md:col-span-2 border-t-4 border-t-pink-500">
             <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <Instagram size={20} className="text-pink-500" /> Instagram Captions
              </h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {currentData.instagramCaptions.map((caption, idx) => (
                <div key={idx} className="bg-gray-50 rounded-lg p-4 border border-gray-200 relative group transition-colors hover:bg-pink-50/30 hover:border-pink-200">
                  <p className="text-gray-700 text-sm whitespace-pre-line pr-8">{caption}</p>
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    {renderCopyButton(caption, `insta-${idx}`)}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
