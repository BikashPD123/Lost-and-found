import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { User, Mail, GraduationCap, Save, Camera, CheckCircle } from 'lucide-react';

export const Profile = () => {
  const { user, updateProfile } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    studentId: user?.studentId || '',
  });
  const [isSaved, setIsSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(formData);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        updateProfile({ avatar: base64String });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-4xl mx-auto pb-12">
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold text-secondary-900 tracking-tight">Your Profile</h1>
        <p className="text-secondary-500 mt-2 text-lg">Manage your personal information and preferences.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <div className="glass-panel rounded-[2.5rem] p-8 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-br from-primary-600 to-primary-400 -z-10" />
            <div className="relative mb-6 inline-block">
              <div className="w-32 h-32 rounded-[2.5rem] bg-white border-4 border-white shadow-xl flex items-center justify-center overflow-hidden">
                {user?.avatar ? (
                  <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-primary-50 flex items-center justify-center text-primary-600 text-4xl font-black">
                    {user?.name.substring(0, 2).toUpperCase()}
                  </div>
                )}
              </div>
              <input 
                type="file" 
                id="avatar-upload" 
                accept="image/*" 
                className="hidden" 
                onChange={handleImageUpload} 
              />
              <label 
                htmlFor="avatar-upload" 
                className="absolute bottom-1 right-1 p-2 bg-primary-600 text-white rounded-xl shadow-lg hover:bg-primary-700 transition-all active:scale-90 cursor-pointer block"
                title="Upload Profile Picture"
              >
                <Camera className="w-4 h-4" />
              </label>
            </div>
            <h2 className="text-2xl font-bold text-secondary-900 mb-1">{user?.name}</h2>
            <p className="text-secondary-500 font-medium mb-6 uppercase tracking-widest text-xs">{user?.role} Account</p>
            <div className="pt-6 border-t border-secondary-50 flex flex-col gap-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-secondary-400 font-bold">Reports</span>
                <span className="text-secondary-900 font-bold">12</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-secondary-400 font-bold">Resolved</span>
                <span className="text-secondary-900 font-bold">8</span>
              </div>
            </div>
          </div>
        </div>

        {/* Edit Form */}
        <div className="lg:col-span-2">
          <div className="glass-panel rounded-[2.5rem] p-10">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-secondary-500 uppercase tracking-widest ml-1">Full Name</label>
                  <div className="relative group">
                    <User className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-secondary-400 group-focus-within:text-primary-600 transition-colors" />
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full pl-12 pr-4 py-4 bg-secondary-50 border border-secondary-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all font-medium"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-secondary-500 uppercase tracking-widest ml-1">Email Address</label>
                  <div className="relative group">
                    <Mail className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-secondary-400 group-focus-within:text-primary-600 transition-colors" />
                    <input
                      type="email"
                      value={formData.email}
                      disabled
                      className="w-full pl-12 pr-4 py-4 bg-secondary-50 border border-secondary-100 rounded-2xl opacity-60 cursor-not-allowed font-medium"
                    />
                  </div>
                </div>

                {user?.role === 'User' && (
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-secondary-500 uppercase tracking-widest ml-1">Student ID</label>
                    <div className="relative group">
                      <GraduationCap className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-secondary-400 group-focus-within:text-primary-600 transition-colors" />
                      <input
                        type="text"
                        value={formData.studentId}
                        onChange={(e) => setFormData({...formData, studentId: e.target.value})}
                        className="w-full pl-12 pr-4 py-4 bg-secondary-50 border border-secondary-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all font-medium"
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-6 border-t border-secondary-50 flex items-center justify-between">
                <p className="text-xs text-secondary-400 font-medium italic">
                  Note: Email address cannot be changed once the account is verified.
                </p>
                <button
                  type="submit"
                  className={`px-8 py-4 rounded-2xl font-bold flex items-center gap-2 transition-all active:scale-95 shadow-xl ${
                    isSaved 
                    ? 'bg-emerald-500 text-white shadow-emerald-200' 
                    : 'bg-primary-600 text-white shadow-primary-200 hover:bg-primary-700'
                  }`}
                >
                  {isSaved ? <CheckCircle className="w-5 h-5" /> : <Save className="w-5 h-5" />}
                  {isSaved ? 'Changes Saved' : 'Update Profile'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
