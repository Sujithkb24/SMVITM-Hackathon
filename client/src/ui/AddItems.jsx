// OrderFormCompact.jsx
import React, { useState } from 'react';
import { Calendar, FileText, User, Plus, CheckCircle, AlertCircle } from 'lucide-react';

const OrderFormCompact = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    dateOfServing: '',
    type: '' // added field
  });
  
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (status.message) setStatus({ type: '', message: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.description || !formData.dateOfServing || !formData.type) {
      setStatus({ type: 'error', message: 'Please fill in all fields' });
      return;
    }

    setIsLoading(true);
    setStatus({ type: '', message: '' });

    try {
      // Update this URL to match your backend
      const response = await fetch('http://localhost:5000/api/items/add-item', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          description: formData.description,
          serving_day: formData.dateOfServing,
          type: formData.type // send type
        })
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({ 
          type: 'success', 
          message: data.message || 'Item added successfully!' 
        });
        setFormData({ name: '', description: '', dateOfServing: '', type: '' }); // reset type as well
        
        // Call parent's onSubmit if provided
        if (onSubmit) {
          onSubmit(formData);
        }
      } else {
        setStatus({ 
          type: 'error', 
          message: data.error || 'Failed to add item' 
        });
      }
    } catch (error) {
      setStatus({ 
        type: 'error', 
        message: 'Network error. Please check your connection.' 
      });
      console.error('Error adding item:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-[#0b0b0d] border border-purple-700/20 rounded-2xl p-6 shadow-lg">
      <h3 className="text-xl font-extrabold text-white mb-4">Quick Add Item</h3>

      {status.message && (
        <div className={`mb-4 p-3 rounded-lg flex items-center gap-2 ${
          status.type === 'success' 
            ? 'bg-green-500/10 border border-green-500/30 text-green-400' 
            : 'bg-red-500/10 border border-red-500/30 text-red-400'
        }`}>
          {status.type === 'success' ? (
            <CheckCircle size={18} />
          ) : (
            <AlertCircle size={18} />
          )}
          <span className="text-sm font-medium">{status.message}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="relative">
          <User className="absolute left-3 top-3 h-5 w-5 text-purple-300" />
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Item name"
            required
            disabled={isLoading}
            className="w-full pl-10 pr-4 py-2.5 bg-transparent border border-purple-700/30 rounded-lg text-white placeholder:text-purple-200/40 focus:outline-none focus:ring-2 focus:ring-purple-600 disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>

        <div className="relative">
          <FileText className="absolute left-3 top-3 h-5 w-5 text-purple-300" />
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Short description"
            required
            disabled={isLoading}
            className="w-full pl-10 pr-4 py-2.5 bg-transparent border border-purple-700/30 rounded-lg text-white placeholder:text-purple-200/40 focus:outline-none focus:ring-2 focus:ring-purple-600 disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>

        <div className="relative">
          <Calendar className="absolute left-3 top-3 h-5 w-5 text-purple-300" />
          <input
            type="text"
            name="dateOfServing"
            value={formData.dateOfServing}
            onChange={handleChange}
            placeholder="Day (e.g. Monday)"
            required
            disabled={isLoading}
            className="w-full pl-10 pr-4 py-2.5 bg-transparent border border-purple-700/30 rounded-lg text-white placeholder:text-purple-200/40 focus:outline-none focus:ring-2 focus:ring-purple-600 disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>
      </div>

      {/* Type dropdown (new field) */}
      <div className="mb-4 ">
        <label className="block text-sm text-purple-200 mb-2">Type</label>
        <div className="relative ">
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
            disabled={isLoading}
            className="w-full  pl-4 pr-10 py-2.5  border border-purple-700/30 rounded-lg text-white placeholder:text-purple-200/40 focus:outline-none focus:ring-2 focus:ring-purple-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <option className='bg-black'  value="" disabled>Choose type</option>
            <option className='bg-black' value="Breakfast">Breakfast</option>
            <option className='bg-black' value="Lunch">Non-Veg</option>
            <option className='bg-black' value="Snacks">Snacks</option>
            
          </select>
          <div className="pointer-events-none absolute right-3 top-3 text-purple-300">▾</div>
        </div>
      </div>

      <div className="flex gap-3 items-center">
        <button
          type="submit"
          disabled={isLoading}
          className="flex-1 inline-flex items-center justify-center gap-2 bg-gradient-to-tr from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white py-3 rounded-lg font-semibold transition-shadow shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Adding...
            </>
          ) : (
            <>
              <Plus size={18} />
              Add Item
            </>
          )}
        </button>

        <button
          type="button"
          onClick={() => {
            setFormData({ name: '', description: '', dateOfServing: '', type: '' });
            setStatus({ type: '', message: '' });
          }}
          disabled={isLoading}
          className="px-4 py-3 bg-white/5 hover:bg-white/10 text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Reset
        </button>
      </div>
    </form>
  );
};

export default OrderFormCompact;