import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload as UploadIcon, Image as ImageIcon, Mic, Type, Loader2 } from 'lucide-react';

export default function Upload() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [description, setDescription] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const handleFileSelect = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert('Please upload a product photo.');
    
    setIsUploading(true);
    
    const formData = new FormData();
    formData.append('image', file);
    formData.append('description', description);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        body: formData
      });
      
      if (!response.ok) throw new Error('API Error');
      
      const data = await response.json();
      
      const artisanData = JSON.parse(localStorage.getItem('artisan')) || {};
      const productPayload = {
        artisanId: artisanData.id || 'anonymous',
        description,
        generatedContent: data,
        createdAt: new Date().toISOString()
      };

      // Mock save to "database"
      const existingProducts = JSON.parse(localStorage.getItem('products') || '[]');
      existingProducts.push(productPayload);
      localStorage.setItem('products', JSON.stringify(existingProducts));

      // Save generating data to localStorage to view in dashboard
      localStorage.setItem('generatedContent', JSON.stringify(data));
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      alert('Failed to process image. Make sure the backend server is running and API key is set.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-terracotta-dark mb-2">Upload Your Product</h2>
        <p className="text-gray-600">Let our AI craft the perfect story and details for your creation.</p>
      </div>

      <form onSubmit={handleSubmit} className="card p-8 bg-white border border-ivory-dark">
        {/* Image Upload Area */}
        <div 
          className="border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center bg-gray-50 hover:bg-ivory transition-colors cursor-pointer min-h-[250px] mb-8 relative overflow-hidden"
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
            <img src={preview} alt="Preview" className="absolute inset-0 w-full h-full object-contain bg-black/5" />
          ) : (
            <>
              <div className="w-16 h-16 rounded-full bg-saffron-light/20 flex items-center justify-center mb-4 text-saffron">
                <UploadIcon size={32} />
              </div>
              <p className="text-lg font-medium text-gray-700">Click to upload product photo</p>
              <p className="text-sm text-gray-500 mt-2 flex items-center gap-1"><ImageIcon size={14}/> PNG, JPG up to 10MB</p>
            </>
          )}
        </div>

        {/* Description Input */}
        <div className="space-y-3 mb-8">
          <div className="flex justify-between items-center">
             <label className="text-gray-700 font-medium flex items-center gap-2">
              <Type size={18} className="text-terracotta" /> Tell us what it is (Optional)
            </label>
            <button 
              type="button" 
              onClick={() => alert("Voice transcription coming soon! Please type your description for now.")}
              className="text-terracotta-dark hover:text-terracotta flex items-center gap-1 text-sm font-medium bg-terracotta/10 px-3 py-1.5 rounded-full transition-colors"
            >
               <Mic size={14} /> Voice Input
            </button>
          </div>
          <textarea 
            className="input-field min-h-[120px] resize-y"
            placeholder="E.g., This is a hand-painted clay pot with traditional Warli art. Made using natural colors..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        <button 
          type="submit" 
          disabled={isUploading || !file}
          className={`btn-primary w-full text-lg py-3 flex items-center justify-center gap-2 ${isUploading || !file ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          {isUploading ? (
            <><Loader2 className="animate-spin" size={24} /> Generating Magic...</>
          ) : (
            'Generate Smart Content ✨'
          )}
        </button>
      </form>
    </div>
  );
}
