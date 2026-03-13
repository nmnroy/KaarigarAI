import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Palette, MapPin, Languages, User } from 'lucide-react';

export default function Registration() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    craftType: '',
    region: '',
    language: 'Hindi'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.craftType || !formData.region) {
      alert("Please fill in all required fields.");
      return;
    }
    // Simulate saving artisan to database
    localStorage.setItem('artisan', JSON.stringify({ ...formData, id: 'mock-id-' + Date.now() }));
    
    // Quick success message before navigating
    alert(`Welcome ${formData.name}! Registration successful.`);
    navigate('/upload');
  };

  return (
    <div className="max-w-md mx-auto animation-fade-in mt-10">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-terracotta-dark mb-4">Join KaarigarAI</h2>
        <p className="text-gray-600 text-lg">Bring your beautiful craft to the world stage with the power of artificial intelligence.</p>
      </div>

      <form onSubmit={handleSubmit} className="card p-8 space-y-6">
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-gray-700 font-medium ml-1">
            <User size={18} className="text-terracotta" /> Full Name
          </label>
          <input 
            type="text" 
            name="name"
            required
            className="input-field" 
            placeholder="e.g. Ramesh Kumar"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-2 text-gray-700 font-medium ml-1">
            <Palette size={18} className="text-saffron" /> Craft Type
          </label>
          <input 
            type="text" 
            name="craftType"
            required
            className="input-field" 
            placeholder="e.g. Block Printing, Pottery"
            value={formData.craftType}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-2 text-gray-700 font-medium ml-1">
            <MapPin size={18} className="text-olive" /> Region / State
          </label>
          <input 
            type="text" 
            name="region"
            required
            className="input-field" 
            placeholder="e.g. Rajasthan"
            value={formData.region}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-2 text-gray-700 font-medium ml-1">
            <Languages size={18} className="text-gray-500" /> Output Language Preference
          </label>
          <select 
            name="language"
            className="input-field"
            value={formData.language}
            onChange={handleChange}
          >
            <option value="Hindi">Hindi (हिंदी)</option>
            <option value="English">English</option>
          </select>
        </div>

        <button type="submit" className="btn-primary w-full text-lg mt-4">
          Register & Continue
        </button>
      </form>
    </div>
  );
}
