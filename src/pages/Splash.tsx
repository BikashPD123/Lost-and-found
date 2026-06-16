import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Splash = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/login');
    }, 2200);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="fixed inset-0 z-[100] bg-[#060913] flex flex-col items-center justify-center text-white overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.18)_0,transparent_65%)] pointer-events-none" />

      {/* Floating blob 1 */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.6, 0.4] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-blue-700/20 blur-[100px] pointer-events-none"
      />
      {/* Floating blob 2 */}
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-indigo-700/20 blur-[120px] pointer-events-none"
      />

      {/* Logo + spinner */}
      <div className="relative flex items-center justify-center mb-7">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
          className="absolute w-28 h-28 rounded-[2rem] border-2 border-transparent border-t-blue-500 border-r-indigo-500 opacity-80"
        />
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: 'backOut' }}
          className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-2xl shadow-blue-500/40"
        >
          <Search className="w-8 h-8 text-white stroke-[2.5]" />
        </motion.div>
      </div>

      {/* Brand name */}
      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.5 }}
        className="text-4xl font-black tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-blue-400 uppercase"
      >
        Foundry
      </motion.h1>

      {/* Animated progress bar */}
      <motion.div
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: '130px', opacity: 1 }}
        transition={{ delay: 0.4, duration: 1.4, ease: 'easeInOut' }}
        className="h-[3px] bg-gradient-to-r from-blue-500 via-indigo-400 to-purple-500 rounded-full mt-5"
      />

      {/* Tagline */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.6 }}
        className="text-[11px] text-slate-500 font-bold uppercase tracking-[0.25em] mt-4"
      >
        University Lost &amp; Found Platform
      </motion.p>
    </div>
  );
};
