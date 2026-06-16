import React, { useState, useRef } from 'react';
import { useItems } from '../hooks/useItems';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { type ItemType } from '../data/mockData';
import { Upload, X, Camera, Image as ImageIcon } from 'lucide-react';

interface ReportItemProps {
  type: ItemType;
}

export const ReportItem = ({ type }: ReportItemProps) => {
  const { addItem } = useItems();
  const { user } = useAuth();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    location: '',
    date: new Date().toISOString().split('T')[0],
    studentName: user?.name || '',
    studentId: user?.studentId || '',
    image: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setFormData(prev => ({ ...prev, image: '' }));
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    addItem({
      ...formData,
      type,
      reportedBy: user.email,
      // appending time so it's a valid ISO string
      date: new Date(`${formData.date}T12:00:00Z`).toISOString(),
    });
    navigate('/app/items');
  };

  return (
    <div className="max-w-2xl mx-auto pb-12">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-secondary-900 tracking-tight">
          Report {type} Item
        </h1>
        <p className="text-secondary-500 mt-2 text-lg">Fill out the details below to log a new {type.toLowerCase()} item.</p>
      </div>

      <div className="glass-panel rounded-3xl overflow-hidden">
        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          {/* Image Upload Section */}
          <div className="space-y-4">
            <label className="text-sm font-bold text-secondary-900 uppercase tracking-widest block">Item Photo</label>
            <div 
              onClick={() => fileInputRef.current?.click()}
              className={`relative border-2 border-dashed rounded-2xl transition-all duration-300 cursor-pointer overflow-hidden flex flex-col items-center justify-center min-h-[200px] ${
                formData.image 
                ? 'border-primary-500 bg-primary-50/10' 
                : 'border-secondary-200 bg-secondary-50 hover:border-primary-400 hover:bg-primary-50/30'
              }`}
            >
              {formData.image ? (
                <div className="relative w-full h-[300px]">
                  <img 
                    src={formData.image} 
                    alt="Preview" 
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeImage();
                    }}
                    className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-md rounded-full text-red-600 shadow-lg hover:bg-red-50 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <div className="p-8 text-center">
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-4 mx-auto text-secondary-400 group-hover:text-primary-500 transition-colors">
                    <Camera className="w-8 h-8" />
                  </div>
                  <p className="text-secondary-900 font-bold mb-1">Click to upload photo</p>
                  <p className="text-sm text-secondary-500">SVG, PNG, JPG or GIF (max. 5MB)</p>
                </div>
              )}
              <input 
                ref={fileInputRef}
                type="file" 
                accept="image/*" 
                onChange={handleImageChange}
                className="hidden"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-bold text-secondary-900 uppercase tracking-widest block">Item Name</label>
              <input
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-secondary-50/50 border border-secondary-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all"
                placeholder="e.g. iPhone 13 Pro"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="date" className="text-sm font-bold text-secondary-900 uppercase tracking-widest block">Date</label>
              <input
                id="date"
                name="date"
                type="date"
                required
                value={formData.date}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-secondary-50/50 border border-secondary-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-bold text-secondary-900 uppercase tracking-widest block">Description</label>
            <textarea
              id="description"
              name="description"
              required
              rows={4}
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-secondary-50/50 border border-secondary-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all resize-none"
              placeholder="Describe color, brand, and any identifying marks..."
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="location" className="text-sm font-bold text-secondary-900 uppercase tracking-widest block">Location {type === 'Lost' ? 'Lost' : 'Found'}</label>
            <input
              id="location"
              name="location"
              required
              value={formData.location}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-secondary-50/50 border border-secondary-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all"
              placeholder="e.g. Library 2nd Floor"
            />
          </div>

          <div className="pt-8 border-t border-secondary-100">
            <h3 className="text-sm font-bold text-secondary-900 mb-6 uppercase tracking-[0.2em] flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary-600" />
              Reporter Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label htmlFor="studentName" className="text-sm font-bold text-secondary-900 uppercase tracking-widest block">Student Name</label>
                <input
                  id="studentName"
                  name="studentName"
                  required
                  value={formData.studentName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-secondary-50/50 border border-secondary-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all"
                  placeholder="John Doe"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="studentId" className="text-sm font-bold text-secondary-900 uppercase tracking-widest block">Student ID</label>
                <input
                  id="studentId"
                  name="studentId"
                  required
                  value={formData.studentId}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-secondary-50/50 border border-secondary-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all"
                  placeholder="STU123456"
                />
              </div>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row justify-end gap-4">
            <button 
              type="button"
              onClick={() => navigate('/app')}
              className="px-8 py-4 text-sm font-bold text-secondary-600 bg-white border border-secondary-200 rounded-2xl hover:bg-secondary-50 hover:border-secondary-300 transition-all active:scale-95"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="px-8 py-4 text-sm font-bold text-white bg-primary-600 rounded-2xl hover:bg-primary-700 shadow-xl shadow-primary-200 transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              Submit {type} Report
              <Upload className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
