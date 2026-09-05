import React, { useState, useRef } from 'react';
import { useItems } from '../hooks/useItems';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { type ItemType } from '../data/mockData';
import { Upload, X, Camera, Link as LinkIcon } from 'lucide-react';

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

  const [imageUrlInput, setImageUrlInput] = useState('');
  const [activeImageTab, setActiveImageTab] = useState<'upload' | 'url'>('upload');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleApplyUrl = () => {
    if (imageUrlInput) {
      setFormData(prev => ({ ...prev, image: imageUrlInput }));
    }
  };

  const removeImage = () => {
    setFormData(prev => ({ ...prev, image: '' }));
    setImageUrlInput('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    addItem({
      ...formData,
      type,
      reportedBy: user.email,
      date: new Date(`${formData.date}T12:00:00Z`).toISOString(),
    });
    navigate('/app/items');
  };

  return (
    <div className="max-w-2xl mx-auto pb-12">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-secondary-900 dark:text-white tracking-tight">
          Report {type} Item
        </h1>
        <p className="text-secondary-500 dark:text-slate-400 mt-2 text-sm sm:text-base">
          Fill out the details below to log a new {type.toLowerCase()} item.
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-secondary-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-xl transition-colors duration-300">
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-8">
          
          {/* Image Upload / URL Input Section */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-secondary-900 dark:text-slate-200 uppercase tracking-widest block">
                Item Photo <span className="text-secondary-400 dark:text-slate-500 font-normal">(optional)</span>
              </label>
              
              <div className="flex gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setActiveImageTab('upload')}
                  className={`px-2.5 py-1 rounded-md transition-all ${
                    activeImageTab === 'upload'
                      ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-2xs'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                >
                  Upload File
                </button>
                <button
                  type="button"
                  onClick={() => setActiveImageTab('url')}
                  className={`px-2.5 py-1 rounded-md transition-all ${
                    activeImageTab === 'url'
                      ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-2xs'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                >
                  Image URL
                </button>
              </div>
            </div>

            {formData.image ? (
              <div className="relative w-full h-64 rounded-2xl overflow-hidden border border-secondary-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800">
                <img 
                  src={formData.image} 
                  alt="Item Preview" 
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-3 right-3 p-2 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-full text-red-600 dark:text-red-400 shadow-lg hover:bg-red-50 dark:hover:bg-slate-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            ) : activeImageTab === 'upload' ? (
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-secondary-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-400 bg-secondary-50/60 dark:bg-slate-800/40 hover:bg-blue-50/20 dark:hover:bg-slate-800/80 rounded-2xl p-8 transition-all duration-300 cursor-pointer flex flex-col items-center justify-center min-h-[180px] group"
              >
                <div className="w-14 h-14 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center shadow-sm mb-3 text-secondary-400 dark:text-slate-500 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors border border-secondary-100 dark:border-slate-700">
                  <Camera className="w-7 h-7" />
                </div>
                <p className="text-secondary-900 dark:text-slate-100 font-bold text-sm mb-1">Click to upload photo from your device</p>
                <p className="text-xs text-secondary-500 dark:text-slate-400">PNG, JPG, WEBP or GIF (max. 5MB)</p>
                
                <input 
                  ref={fileInputRef}
                  type="file" 
                  accept="image/*" 
                  onChange={handleImageFileChange}
                  className="hidden"
                />
              </div>
            ) : (
              <div className="space-y-2 p-4 bg-secondary-50/60 dark:bg-slate-800/40 rounded-2xl border border-secondary-200 dark:border-slate-700">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <LinkIcon className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input 
                      type="url"
                      placeholder="https://example.com/image.jpg"
                      value={imageUrlInput}
                      onChange={(e) => setImageUrlInput(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleApplyUrl}
                    className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs transition-colors shrink-0"
                  >
                    Apply URL
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label htmlFor="name" className="text-xs font-bold text-secondary-900 dark:text-slate-200 uppercase tracking-widest block">Item Name *</label>
              <input
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-secondary-50/50 dark:bg-slate-800/60 border border-secondary-200 dark:border-slate-700 rounded-xl text-sm font-medium text-secondary-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-slate-800 transition-all"
                placeholder="e.g. MacBook Pro 14, Blue Backpack"
              />
            </div>
            
            <div className="space-y-1.5">
              <label htmlFor="date" className="text-xs font-bold text-secondary-900 dark:text-slate-200 uppercase tracking-widest block">Date *</label>
              <input
                id="date"
                name="date"
                type="date"
                required
                value={formData.date}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-secondary-50/50 dark:bg-slate-800/60 border border-secondary-200 dark:border-slate-700 rounded-xl text-sm font-medium text-secondary-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-slate-800 transition-all"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="location" className="text-xs font-bold text-secondary-900 dark:text-slate-200 uppercase tracking-widest block">
              Location {type === 'Lost' ? 'Lost' : 'Found'} *
            </label>
            <input
              id="location"
              name="location"
              required
              value={formData.location}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-secondary-50/50 dark:bg-slate-800/60 border border-secondary-200 dark:border-slate-700 rounded-xl text-sm font-medium text-secondary-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-slate-800 transition-all"
              placeholder="e.g. Library 2nd Floor, Bus Stand"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="description" className="text-xs font-bold text-secondary-900 dark:text-slate-200 uppercase tracking-widest block">Description</label>
            <textarea
              id="description"
              name="description"
              required
              rows={4}
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-secondary-50/50 dark:bg-slate-800/60 border border-secondary-200 dark:border-slate-700 rounded-xl text-sm font-medium text-secondary-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-slate-800 transition-all resize-none"
              placeholder="Describe color, brand, distinct marks..."
            />
          </div>

          <div className="pt-6 border-t border-secondary-100 dark:border-slate-800">
            <h3 className="text-xs font-bold text-secondary-900 dark:text-slate-200 mb-4 uppercase tracking-[0.2em] flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400" />
              Reporter Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label htmlFor="studentName" className="text-xs font-bold text-secondary-900 dark:text-slate-200 uppercase tracking-widest block">Student Name</label>
                <input
                  id="studentName"
                  name="studentName"
                  required
                  value={formData.studentName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-secondary-50/50 dark:bg-slate-800/60 border border-secondary-200 dark:border-slate-700 rounded-xl text-sm font-medium text-secondary-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-slate-800 transition-all"
                  placeholder="John Doe"
                />
              </div>
              
              <div className="space-y-1.5">
                <label htmlFor="studentId" className="text-xs font-bold text-secondary-900 dark:text-slate-200 uppercase tracking-widest block">Student ID</label>
                <input
                  id="studentId"
                  name="studentId"
                  required
                  value={formData.studentId}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-secondary-50/50 dark:bg-slate-800/60 border border-secondary-200 dark:border-slate-700 rounded-xl text-sm font-medium text-secondary-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-slate-800 transition-all"
                  placeholder="STU123456"
                />
              </div>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row justify-end gap-3">
            <button 
              type="button"
              onClick={() => navigate('/app')}
              className="px-6 py-3.5 text-xs font-bold text-secondary-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-secondary-200 dark:border-slate-700 rounded-xl hover:bg-secondary-50 dark:hover:bg-slate-700 transition-all"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="px-8 py-3.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-lg shadow-blue-600/20 transition-all flex items-center justify-center gap-2"
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
