import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
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
      <div className="mb-8">
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">Your Profile</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm sm:text-base">Manage your personal information and preferences.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 text-center relative overflow-hidden shadow-xl transition-colors duration-300">
            <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-br from-blue-600 to-indigo-600 -z-10" />
            <div className="relative mb-6 inline-block">
              <div className="w-28 h-28 rounded-3xl bg-white dark:bg-slate-800 border-4 border-white dark:border-slate-800 shadow-xl flex items-center justify-center overflow-hidden">
                {user?.avatar ? (
                  <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-blue-50 dark:bg-slate-800 flex items-center justify-center text-blue-600 dark:text-blue-400 text-3xl font-black">
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
                className="absolute bottom-1 right-1 p-2 bg-blue-600 text-white rounded-xl shadow-lg hover:bg-blue-700 transition-all active:scale-90 cursor-pointer block"
                title="Upload Profile Picture"
              >
                <Camera className="w-4 h-4" />
              </label>
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-1">{user?.name}</h2>
            <p className="text-slate-500 dark:text-slate-400 font-medium mb-6 uppercase tracking-widest text-xs">{user?.role} Account</p>
            <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400 dark:text-slate-500 font-bold">Reports</span>
                <span className="text-slate-900 dark:text-slate-100 font-bold">12</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400 dark:text-slate-500 font-bold">Resolved</span>
                <span className="text-slate-900 dark:text-slate-100 font-bold">8</span>
              </div>
            </div>
          </div>
        </div>

        {/* Edit Form */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl transition-colors duration-300">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-widest ml-1">Full Name</label>
                  <div className="relative group">
                    <User className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 group-focus-within:text-blue-600 transition-colors" />
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full pl-12 pr-4 py-3.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-slate-800 transition-all font-medium text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-widest ml-1">Email Address</label>
                  <div className="relative group">
                    <Mail className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
                    <input
                      type="email"
                      value={formData.email}
                      disabled
                      className="w-full pl-12 pr-4 py-3.5 bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 rounded-2xl opacity-80 cursor-not-allowed font-medium text-sm"
                    />
                  </div>
                </div>

                {user?.role === 'User' && (
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-widest ml-1">Student ID</label>
                    <div className="relative group">
                      <GraduationCap className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 group-focus-within:text-blue-600 transition-colors" />
                      <input
                        type="text"
                        value={formData.studentId}
                        onChange={(e) => setFormData({...formData, studentId: e.target.value})}
                        className="w-full pl-12 pr-4 py-3.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-slate-800 transition-all font-medium text-sm"
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <p className="text-xs text-slate-400 dark:text-slate-500 font-medium italic">
                  Note: Email address cannot be changed once verified.
                </p>
                <button
                  type="submit"
                  className={`w-full sm:w-auto px-6 py-3.5 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all active:scale-95 text-xs ${
                    isSaved 
                    ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' 
                    : 'bg-blue-600 text-white shadow-lg shadow-blue-600/20 hover:bg-blue-700'
                  }`}
                >
                  {isSaved ? <CheckCircle className="w-4 h-4" /> : <Save className="w-4 h-4" />}
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
