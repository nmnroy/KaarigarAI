import { useState, useRef } from 'react';
import { Upload as UploadIcon, Image as ImageIcon, Loader2, Copy, Check, MapPin, User, Palette, AlignLeft, Tags, DollarSign, Instagram, BookOpen, Sparkles, Globe, ChevronDown } from 'lucide-react';

const REGIONS = ['Rajasthan', 'Bengal', 'Bihar', 'UP', 'Tamil Nadu', 'Kashmir', 'Other'];

const LANGUAGES = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'hi', label: 'Hindi', flag: '🇮🇳' },
  { code: 'ta', label: 'Tamil', flag: '🏳️' },
  { code: 'bn', label: 'Bengali', flag: '🏴' }
];

// Pre-filled demo data for a Madhubani Painting from Bihar
const DEMO_DATA = {
  form: {
    craftName: 'Madhubani Painting - Tree of Life',
    description: 'Traditional Madhubani painting made with natural dyes on handmade paper. Features the sacred Tree of Life motif with intricate line work and vibrant colors. Created using double-line border technique passed down through five generations.',
    artisanName: 'Sita Devi',
    region: 'Bihar'
  },
  // Sample preview image (a solid color placeholder since we can't bundle a real image)
  previewUrl: 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400"><rect width="400" height="400" fill="#FFF8F0"/><rect x="20" y="20" width="360" height="360" fill="none" stroke="#C45C26" stroke-width="4"/><rect x="30" y="30" width="340" height="340" fill="none" stroke="#FF9933" stroke-width="2"/><line x1="200" y1="350" x2="200" y2="120" stroke="#3B1F0A" stroke-width="6"/><circle cx="200" cy="100" r="60" fill="none" stroke="#C45C26" stroke-width="3"/><circle cx="200" cy="100" r="45" fill="none" stroke="#FF9933" stroke-width="2"/><path d="M140,180 Q170,140 200,160 Q230,140 260,180" fill="none" stroke="#2D8B2D" stroke-width="3"/><path d="M120,220 Q160,170 200,200 Q240,170 280,220" fill="none" stroke="#2D8B2D" stroke-width="3"/><path d="M100,260 Q150,200 200,240 Q250,200 300,260" fill="none" stroke="#2D8B2D" stroke-width="3"/><circle cx="160" cy="190" r="8" fill="#FF9933"/><circle cx="240" cy="190" r="8" fill="#C45C26"/><circle cx="150" cy="240" r="6" fill="#FF9933"/><circle cx="250" cy="240" r="6" fill="#C45C26"/><circle cx="200" cy="160" r="6" fill="#FF9933"/><path d="M170,320 Q185,290 200,310 Q215,290 230,320" fill="none" stroke="#3B1F0A" stroke-width="2"/><text x="200" y="385" text-anchor="middle" font-family="serif" font-size="14" fill="#C45C26">Madhubani - Tree of Life</text></svg>'),
  results: {
    heritageStory: "In the ancient village of Jitwarpur, Bihar, where the Ganges whispers stories of a thousand years, Sita Devi sits on her veranda with brushes made from twigs and colors drawn from the earth itself. Her Madhubani painting of the Tree of Life is not merely art — it is a prayer rendered in pigment. Each branch represents a generation of women who painted these walls during festivals, weddings, and harvests. The sacred tree, rooted in mythology and blooming with fertility symbols, connects heaven to earth. Using the ancient double-line technique passed down from her grandmother, Sita fills every inch with meaning — fish for prosperity, peacocks for love, and lotuses for purity. This is not decoration; it is the living memory of Mithila.",
    productListing: {
      title: "Authentic Handpainted Madhubani Tree of Life | Original Bihar Folk Art on Handmade Paper | Natural Dyes",
      description: "Own a piece of living Indian heritage with this stunning original Madhubani painting depicting the sacred Tree of Life motif. Meticulously handpainted by master artisan Sita Devi from Bihar's renowned Mithila region, this artwork uses traditional natural dyes extracted from turmeric, indigo, and vermillion on authentic handmade Nepali paper. The intricate double-line border technique — a hallmark of the Bharni style — showcases five generations of artistic mastery. Each brushstroke carries cultural significance: the intertwining branches symbolize the connection between heaven and earth, while the floral motifs represent fertility and prosperity. Perfect as a statement wall piece, a meaningful gift, or a collector's treasure. Comes with a certificate of authenticity.",
      tags: ["MadhubaniArt", "IndianFolkArt", "TreeOfLife", "BiharHandicraft", "MithilaPainting", "NaturalDyes", "HandmadePaper", "AuthenticCraft", "WallArt", "CulturalHeritage"]
    },
    instagramCaptions: [
      "Every line tells a story older than memory itself 🎨 Madhubani magic from Bihar. #MadhubaniArt #IndianHeritage #HandmadeInIndia #FolkArt",
      "When art becomes prayer 🙏 The Tree of Life, painted with earth and soul by Sita Devi. #MithilaArt #TreeOfLife #ArtisanMade #SupportArtisans",
      "5 generations. One brushstroke at a time. This is Madhubani. 🌳✨ #MadhubaniPainting #BiharArt #CulturalTreasure #BuyHandmade"
    ],
    pricing: {
      low: "₹1,200",
      mid: "₹2,500",
      high: "₹4,500",
      justification: "Pricing reflects the use of authentic natural dyes and handmade paper, which cost significantly more than synthetic alternatives. The artist's five-generation lineage and the intricate double-line Bharni technique place this work in the mid-to-premium range for original Madhubani paintings in the domestic and export market."
    }
  }
};

export default function ArtisanContentGenerator() {
  const fileInputRef = useRef(null);
  
  // Form State
  const [formData, setFormData] = useState({
    craftName: '',
    description: '',
    artisanName: '',
    region: 'Rajasthan'
  });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  
  // UI State
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedData, setGeneratedData] = useState(null);
  const [copiedSection, setCopiedSection] = useState(null);
  const [isDemoMode, setIsDemoMode] = useState(false);

  // Language toggle state
  const [cardLangs, setCardLangs] = useState({ story: 'en', listing: 'en', captions: 'en', pricing: 'en' });
  const [translating, setTranslating] = useState({ story: false, listing: false, captions: false, pricing: false });
  const [originalData, setOriginalData] = useState(null); // preserve English originals
  const [openLangMenu, setOpenLangMenu] = useState(null); // which card's menu is open

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileSelect = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
    }
  };

  const copyToClipboard = (text, section) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(section);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  // Helper: read a File as base64 string
  const fileToBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result.split(',')[1]); // strip data:...;base64, prefix
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert('Please upload a product photo.');

    const GEMINI_KEY = import.meta.env.VITE_GEMINI_API_KEY;
    if (!GEMINI_KEY) {
      alert('Gemini API key not found. Add VITE_GEMINI_API_KEY to your .env file.');
      return;
    }
    
    setIsGenerating(true);
    setGeneratedData(null);
    setIsDemoMode(false);

    try {
      const base64Image = await fileToBase64(file);

      const prompt = `
        You are a cultural marketing expert specializing in Indian handicrafts. Generate marketing content that honors the heritage and story behind each craft.
        
        Artisan's Name: ${formData.artisanName || 'Unknown Artisan'}
        Craft Name: ${formData.craftName || 'Unknown Craft'}
        Region of India: ${formData.region || 'Unknown Region'}
        Artisan's Description: "${formData.description || 'No description provided.'}"

        Analyze the attached image and generate the following content. Return the result strictly in valid JSON format with the following keys:
        {
          "heritageStory": "A 150-word emotional and authentic heritage story about the craft and origin.",
          "productListing": {
            "title": "SEO optimized title",
            "description": "Around 200 word detailed description of the product",
            "tags": ["tag1", "tag2", "tag3", "tag4", "tag5", "tag6", "tag7", "tag8", "tag9", "tag10"]
          },
          "instagramCaptions": [
            "Caption 1 (under 150 characters with hashtags)",
            "Caption 2 (under 150 characters with hashtags)",
            "Caption 3 (under 150 characters with hashtags)"
          ],
          "pricing": {
            "low": "Suggested low price in INR",
            "mid": "Suggested mid price in INR",
            "high": "Suggested high price in INR",
            "justification": "Brief justification for the price ranges"
          }
        }
        Do not include any markdown formatting like \`\`\`json in the response, just the raw JSON object.
      `;

      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${GEMINI_KEY}`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [
              { text: prompt },
              { inline_data: { mime_type: file.type, data: base64Image } }
            ]
          }]
        })
      });

      if (!response.ok) {
        const errBody = await response.text();
        console.error('Gemini API Error:', errBody);
        throw new Error('Gemini API returned an error.');
      }

      const result = await response.json();
      const outputText = result.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!outputText) throw new Error('No text in Gemini response.');

      // Clean and parse JSON
      const cleanedText = outputText.replace(/```json/g, '').replace(/```/g, '').trim();
      const jsonResult = JSON.parse(cleanedText);
      setGeneratedData(jsonResult);
      setOriginalData(JSON.parse(JSON.stringify(jsonResult))); // deep clone for translation fallback
      setCardLangs({ story: 'en', listing: 'en', captions: 'en', pricing: 'en' }); // reset languages

      // Scroll to results smoothly
      setTimeout(() => {
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
      }, 100);

    } catch (err) {
      console.error('Generation error:', err);
      alert('Failed to generate content. Check the console for details. Falling back to demo mode.');
      // Fallback to demo data
      setFormData(DEMO_DATA.form);
      setPreview(DEMO_DATA.previewUrl);
      setGeneratedData(DEMO_DATA.results);
      setIsDemoMode(true);
    } finally {
      setIsGenerating(false);
    }
  };

  // --- Language Translation via Gemini ---
  const translateCard = async (cardKey, langCode) => {
    if (langCode === 'en') {
      // Revert to original English data
      if (originalData) {
        if (cardKey === 'story') setGeneratedData(prev => ({ ...prev, heritageStory: originalData.heritageStory }));
        if (cardKey === 'listing') setGeneratedData(prev => ({ ...prev, productListing: originalData.productListing }));
        if (cardKey === 'captions') setGeneratedData(prev => ({ ...prev, instagramCaptions: originalData.instagramCaptions }));
        if (cardKey === 'pricing') setGeneratedData(prev => ({ ...prev, pricing: originalData.pricing }));
      }
      setCardLangs(prev => ({ ...prev, [cardKey]: 'en' }));
      return;
    }

    const GEMINI_KEY = import.meta.env.VITE_GEMINI_API_KEY;
    if (!GEMINI_KEY) { alert('API Key missing'); return; }

    const langName = LANGUAGES.find(l => l.code === langCode)?.label || langCode;
    setTranslating(prev => ({ ...prev, [cardKey]: true }));
    setOpenLangMenu(null);

    try {
      let contentToTranslate = '';
      let parseInstructions = '';

      if (cardKey === 'story') {
        contentToTranslate = originalData?.heritageStory || generatedData.heritageStory;
        parseInstructions = 'Return ONLY the translated text as a plain string. No JSON, no markdown.';
      } else if (cardKey === 'listing') {
        const src = originalData?.productListing || generatedData.productListing;
        contentToTranslate = JSON.stringify(src);
        parseInstructions = 'Return a valid JSON object with keys: title, description, tags (array of strings). No markdown.';
      } else if (cardKey === 'captions') {
        const src = originalData?.instagramCaptions || generatedData.instagramCaptions;
        contentToTranslate = JSON.stringify(src);
        parseInstructions = 'Return a valid JSON array of 3 translated caption strings. No markdown.';
      } else if (cardKey === 'pricing') {
        const src = originalData?.pricing || generatedData.pricing;
        contentToTranslate = JSON.stringify(src);
        parseInstructions = 'Return a valid JSON object with keys: low, mid, high, justification. Keep prices in INR numerals. No markdown.';
      }

      const prompt = `Translate the following content to ${langName}. Keep hashtags, emojis, and INR prices as-is. ${parseInstructions}\n\nContent:\n${contentToTranslate}`;

      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${GEMINI_KEY}`;
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
      });

      const result = await response.json();
      const outputText = result.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!outputText) throw new Error('Empty response');

      const cleaned = outputText.replace(/```json/g, '').replace(/```/g, '').trim();

      if (cardKey === 'story') {
        setGeneratedData(prev => ({ ...prev, heritageStory: cleaned }));
      } else if (cardKey === 'listing') {
        setGeneratedData(prev => ({ ...prev, productListing: JSON.parse(cleaned) }));
      } else if (cardKey === 'captions') {
        setGeneratedData(prev => ({ ...prev, instagramCaptions: JSON.parse(cleaned) }));
      } else if (cardKey === 'pricing') {
        setGeneratedData(prev => ({ ...prev, pricing: JSON.parse(cleaned) }));
      }

      setCardLangs(prev => ({ ...prev, [cardKey]: langCode }));
    } catch (err) {
      console.error('Translation error:', err);
      alert('Translation failed. Check the console.');
    } finally {
      setTranslating(prev => ({ ...prev, [cardKey]: false }));
    }
  };

  // Language toggle dropdown component
  const LanguageToggle = ({ cardKey }) => {
    const currentLang = LANGUAGES.find(l => l.code === cardLangs[cardKey]) || LANGUAGES[0];
    const isOpen = openLangMenu === cardKey;
    const isLoading = translating[cardKey];

    return (
      <div className="relative">
        <button
          type="button"
          onClick={() => setOpenLangMenu(isOpen ? null : cardKey)}
          disabled={isLoading}
          className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border transition-all ${
            isLoading ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-wait'
            : 'bg-white hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-gray-200 hover:border-gray-300 shadow-sm'
          }`}
        >
          {isLoading ? (
            <><Loader2 size={12} className="animate-spin" /> Translating...</>
          ) : (
            <><Globe size={12} /> {currentLang.flag} {currentLang.label} <ChevronDown size={12} /></>
          )}
        </button>

        {isOpen && (
          <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-50 min-w-[140px] overflow-hidden">
            {LANGUAGES.map(lang => (
              <button
                key={lang.code}
                type="button"
                onClick={() => translateCard(cardKey, lang.code)}
                className={`w-full text-left px-4 py-2.5 text-sm flex items-center gap-2 hover:bg-saffron/10 transition-colors ${
                  cardLangs[cardKey] === lang.code ? 'bg-saffron/5 font-semibold text-terracotta' : 'text-gray-700'
                }`}
              >
                <span>{lang.flag}</span> {lang.label}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderCopyBtn = (text, sectionId) => (
    <button 
      onClick={() => copyToClipboard(text, sectionId)}
      className="bg-white/80 hover:bg-white text-gray-600 hover:text-terracotta border border-gray-200 p-2 rounded-lg transition-all shadow-sm flex items-center justify-center min-w-[36px] min-h-[36px]"
      title="Copy to clipboard"
    >
      {copiedSection === sectionId ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
    </button>
  );

  return (
    <div className="max-w-4xl mx-auto space-y-10 animation-fade-in relative pb-20">
      
      {/* Header section */}
      <div className="text-center mt-6 mb-10">
        <h2 className="text-4xl font-bold tracking-tight text-gray-900 mb-4 font-serif">Marketing Crafted as <span className="text-terracotta">Art</span></h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">Upload your masterpiece and let AI weave its heritage into beautiful stories that sell on global marketplaces.</p>
        <button
          type="button"
          onClick={() => {
            setFormData(DEMO_DATA.form);
            setPreview(DEMO_DATA.previewUrl);
            setFile(null); // No real file in demo mode
            setGeneratedData(DEMO_DATA.results);
            setOriginalData(JSON.parse(JSON.stringify(DEMO_DATA.results)));
            setCardLangs({ story: 'en', listing: 'en', captions: 'en', pricing: 'en' });
            setIsDemoMode(true);
            setTimeout(() => {
              window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
            }, 150);
          }}
          className="mt-6 inline-flex items-center gap-2 bg-saffron/10 hover:bg-saffron/20 text-saffron-dark font-semibold px-6 py-3 rounded-full border-2 border-saffron/30 hover:border-saffron transition-all hover:-translate-y-0.5 shadow-sm"
        >
          <Sparkles size={18} /> Try Demo — Madhubani Painting
        </button>
      </div>

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="card p-6 sm:p-10 shadow-xl border-t-4 border-t-saffron">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Left Column: Image Upload */}
          <div className="space-y-4">
             <div 
              className={`border-2 border-dashed rounded-2xl p-6 flex flex-col items-center justify-center transition-all cursor-pointer h-full min-h-[320px] relative overflow-hidden group
                ${preview ? 'border-terracotta bg-terracotta/5' : 'border-gray-300 bg-gray-50 hover:bg-cream hover:border-gray-400'}`}
              onClick={() => fileInputRef.current.click()}
            >
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileSelect} 
                accept="image/*" 
                className="hidden" 
              />
              
              {preview ? (
                <>
                  <img src={preview} alt="Preview" className="absolute inset-0 w-full h-full object-cover rounded-xl" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                     <div className="bg-white px-4 py-2 rounded-lg font-medium text-gray-800 shadow-lg flex items-center gap-2">
                        <ImageIcon size={18}/> Change Image
                     </div>
                  </div>
                </>
              ) : (
                <div className="text-center px-4">
                  <div className="w-20 h-20 rounded-full bg-white shadow-sm flex items-center justify-center mx-auto mb-4 border border-gray-100 group-hover:scale-105 transition-transform">
                    <UploadIcon size={32} className="text-saffron" />
                  </div>
                  <h3 className="text-xl font-medium text-gray-800 mb-2">Upload Product Photo</h3>
                  <p className="text-sm text-gray-500 font-medium">Click to browse or drag and drop</p>
                  <p className="text-xs text-gray-400 mt-4 uppercase tracking-wider font-semibold">JPG, PNG strictly under 10MB</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Details */}
          <div className="space-y-5">
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <Palette size={16} className="text-terracotta" /> Craft Name
              </label>
              <input 
                type="text" 
                name="craftName"
                required
                className="input-field bg-gray-50/50" 
                placeholder="e.g. Block Printed Kantha Quilt"
                value={formData.craftName}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <User size={16} className="text-terracotta" /> Artisan / Brand Name
              </label>
              <input 
                type="text" 
                name="artisanName"
                className="input-field bg-gray-50/50" 
                placeholder="e.g. Anjali Devi"
                value={formData.artisanName}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <MapPin size={16} className="text-terracotta" /> Region of Origin
              </label>
              <select 
                name="region"
                className="input-field bg-gray-50/50 cursor-pointer"
                value={formData.region}
                onChange={handleChange}
              >
                {REGIONS.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <AlignLeft size={16} className="text-terracotta" /> Product Description
              </label>
              <textarea 
                name="description"
                className="input-field bg-gray-50/50 min-h-[100px] resize-y"
                placeholder="Briefly describe the materials and the technique used..."
                value={formData.description}
                onChange={handleChange}
              ></textarea>
            </div>
          </div>
        </div>

        <button 
          type="submit" 
          disabled={isGenerating || !file}
          className={`btn-primary w-full text-lg py-4 mt-8 flex items-center justify-center gap-3 rounded-xl shadow-lg
            ${isGenerating || !file ? 'opacity-70 cursor-not-allowed bg-gray-400 hover:bg-gray-400 hover:-translate-y-0 text-white border-0' : 'bg-terracotta hover:bg-terracotta-dark text-white'}`}
        >
          {isGenerating ? (
            <><Loader2 className="animate-spin" size={24} /> Breathing life into your story...</>
          ) : (
            '✨ Generate Magic with AI'
          )}
        </button>
      </form>


      {/* Generated Content Output Section */}
      {generatedData && (
        <div className="space-y-8 animate-fade-in pt-6 border-t border-gray-200">
          <h3 className="text-2xl font-bold text-center text-gray-800 font-serif">Your AI Generated Kit</h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* 1. Heritage Story Card */}
            <div className="card bg-[#FDFBF7] border border-orange-100 shadow-md h-full flex flex-col">
              <div className="bg-orange-50/50 p-4 border-b border-orange-100 flex justify-between items-center">
                 <h4 className="font-bold text-orange-800 flex items-center gap-2">
                    <BookOpen size={18} className="text-orange-500" /> 
                    Heritage Story
                 </h4>
                  {renderCopyBtn(generatedData.heritageStory, 'story')}
                  <LanguageToggle cardKey="story" />
              </div>
              <div className="p-6 relative flex-grow">
                 <span className="text-6xl text-orange-200/50 absolute top-4 left-4 leading-none font-serif">"</span>
                 <p className="text-gray-700 leading-relaxed relative z-10 italic">
                   {generatedData.heritageStory}
                 </p>
              </div>
            </div>

            {/* 2. Marketplace Listing Card */}
            <div className="card bg-white border border-blue-100 shadow-md h-full flex flex-col">
              <div className="bg-blue-50/50 p-4 border-b border-blue-100 flex justify-between items-center">
                 <h4 className="font-bold text-blue-800 flex items-center gap-2">
                    <Tags size={18} className="text-blue-500" /> 
                    Marketplace Listing
                 </h4>
                 {renderCopyBtn(
                   `${generatedData.productListing.title}\n\n${generatedData.productListing.description}\n\nTags: ${generatedData.productListing.tags.join(', ')}`, 
                   'listing'
                 )}
                  <LanguageToggle cardKey="listing" />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                 <h5 className="font-bold text-lg text-gray-900 mb-3">{generatedData.productListing.title}</h5>
                 <p className="text-gray-600 text-sm leading-relaxed mb-6 whitespace-pre-line flex-grow">
                   {generatedData.productListing.description}
                 </p>
                 <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-100">
                    {generatedData.productListing.tags.map(t => (
                      <span key={t} className="bg-blue-50 text-blue-700 border border-blue-100 px-2.5 py-1 rounded-full text-xs font-medium">#{t}</span>
                    ))}
                 </div>
              </div>
            </div>

            {/* 3. Social Media Card */}
            <div className="card bg-white border border-pink-100 shadow-md h-full flex flex-col lg:col-span-2">
              <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-4 border-b border-pink-100 flex justify-between items-center">
                 <h4 className="font-bold text-pink-800 flex items-center gap-2">
                    <Instagram size={18} className="text-pink-500" /> 
                    Social Media Captions
                 </h4>
                 <LanguageToggle cardKey="captions" />
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {generatedData.instagramCaptions.map((cap, i) => (
                     <div key={i} className="bg-gray-50 border border-gray-100 rounded-xl p-4 relative group hover:bg-pink-50/30 transition-colors">
                       <p className="text-sm text-gray-700 mb-2 leading-relaxed pr-8">{cap}</p>
                       <div className="absolute top-2 right-2">
                         {renderCopyBtn(cap, `ig-${i}`)}
                       </div>
                     </div>
                  ))}
                </div>
              </div>
            </div>

             {/* 4. Pricing Card */}
             <div className="card bg-white border border-emerald-100 shadow-md h-full flex flex-col lg:col-span-2">
              <div className="bg-emerald-50/50 p-4 border-b border-emerald-100 flex justify-between items-center">
                 <h4 className="font-bold text-emerald-800 flex items-center gap-2">
                    <DollarSign size={18} className="text-emerald-600" /> 
                    Suggested Pricing Strategy
                 </h4>
                 <LanguageToggle cardKey="pricing" />
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
                 <div className="md:col-span-1 space-y-3">
                    <div className="bg-gray-50 px-4 py-3 rounded-lg border border-gray-200 flex justify-between items-center group">
                      <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Low</span>
                      <span className="font-bold text-gray-800">{generatedData.pricing.low}</span>
                       <div className="opacity-0 group-hover:opacity-100 transition-opacity ml-2">
                         {renderCopyBtn(generatedData.pricing.low, 'price-low')}
                       </div>
                    </div>
                    <div className="bg-emerald-50 px-4 py-3 rounded-lg border border-emerald-200 flex justify-between items-center shadow-sm group">
                      <span className="text-xs font-bold text-emerald-600 uppercase tracking-wide">Optimal</span>
                      <span className="font-bold text-emerald-800 text-lg">{generatedData.pricing.mid}</span>
                       <div className="opacity-0 group-hover:opacity-100 transition-opacity ml-2">
                         {renderCopyBtn(generatedData.pricing.mid, 'price-mid')}
                       </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 rounded-lg border border-gray-200 flex justify-between items-center group">
                      <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Premium</span>
                      <span className="font-bold text-gray-800">{generatedData.pricing.high}</span>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity ml-2">
                         {renderCopyBtn(generatedData.pricing.high, 'price-high')}
                       </div>
                    </div>
                 </div>
                 <div className="md:col-span-3 bg-gray-50/80 border border-gray-100 p-5 rounded-xl h-full flex flex-col justify-center relative group">
                   <h5 className="font-semibold text-gray-800 mb-2">Pricing Justification</h5>
                   <p className="text-sm text-gray-600 leading-relaxed pr-8">{generatedData.pricing.justification}</p>
                   <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      {renderCopyBtn(generatedData.pricing.justification, 'price-just')}
                   </div>
                 </div>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
