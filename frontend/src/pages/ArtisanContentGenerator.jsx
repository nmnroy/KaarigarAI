import { useState, useRef } from 'react';
import { Upload as UploadIcon, Image as ImageIcon, Loader2, Copy, Check, MapPin, User, Palette, AlignLeft, Tags, DollarSign, Instagram, BookOpen } from 'lucide-react';

const REGIONS = ['Rajasthan', 'Bengal', 'UP', 'Tamil Nadu', 'Kashmir', 'Other'];

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert('Please upload a product photo.');
    
    setIsGenerating(true);
    setGeneratedData(null);
    
    const submitData = new FormData();
    submitData.append('image', file);
    submitData.append('craftName', formData.craftName);
    submitData.append('description', formData.description);
    submitData.append('artisanName', formData.artisanName);
    submitData.append('region', formData.region);

    try {
      // Use the production URL provided by the user
      const BASE_URL = 'https://kaarigarai.onrender.com';
      const response = await fetch(`${BASE_URL}/api/generate`, {
        method: 'POST',
        body: submitData
      });
      
      if (!response.ok) throw new Error('API Error');
      
      const data = await response.json();
      setGeneratedData(data);
      
      // Scroll to results smoothly
      setTimeout(() => {
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
      }, 100);
      
    } catch (err) {
      console.error(err);
      alert('Failed to process image. Make sure the backend server is running.');
    } finally {
      setIsGenerating(false);
    }
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
