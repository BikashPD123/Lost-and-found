import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  MapPin, 
  Shield, 
  ArrowRight, 
  Camera, 
  Bell, 
  Sparkles, 
  Smartphone, 
  CreditCard, 
  Laptop, 
  Briefcase, 
  CheckCircle, 
  Zap, 
  QrCode, 
  Lock, 
  LayoutDashboard, 
  Archive, 
  User, 
  Star, 
  Menu, 
  X, 
  Sun, 
  Moon, 
  ChevronRight,
  Clock,
  Coffee,
  Check
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const Landing = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState(true);

  // Custom Animated Cursor Glow Tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Premium Initial Loading Screen Simulation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  // Mock live items for Live Preview Section
  const previewItems = [
    {
      id: "ITM-902",
      title: "iPhone 15 Pro",
      category: "Electronics",
      location: "Library 2nd Floor",
      time: "10 mins ago",
      status: "Lost",
      icon: Smartphone,
      color: "from-blue-500 to-indigo-600"
    },
    {
      id: "ITM-884",
      title: "Student ID Card",
      category: "Personal",
      location: "Science Block B",
      time: "25 mins ago",
      status: "Found",
      icon: CreditCard,
      color: "from-emerald-500 to-teal-600"
    },
    {
      id: "ITM-751",
      title: "Hydro Flask 32oz",
      category: "Accessories",
      location: "Main Cafeteria",
      time: "1 hour ago",
      status: "Lost",
      icon: Coffee,
      color: "from-amber-500 to-orange-600"
    },
    {
      id: "ITM-662",
      title: "MacBook Air M2",
      category: "Electronics",
      location: "Auditorium Hallway",
      time: "2 hours ago",
      status: "Verified",
      icon: Laptop,
      color: "from-purple-500 to-indigo-600"
    },
    {
      id: "ITM-540",
      title: "North Face Backpack",
      category: "Bags",
      location: "Campus Gym Entry",
      time: "3 hours ago",
      status: "Found",
      icon: Briefcase,
      color: "from-rose-500 to-red-600"
    }
  ];

  // Features array
  const features = [
    {
      icon: Zap,
      title: "AI Smart Matching",
      description: "Proprietary natural language algorithms instantly link lost descriptions with found repository logs."
    },
    {
      icon: QrCode,
      title: "QR Verification",
      description: "Generate highly secure end-to-end encrypted claim keys for frictionless physical recovery."
    },
    {
      icon: Bell,
      title: "Real-Time Notifications",
      description: "Receive high-priority SMS and push alerts the absolute millisecond a high-confidence match is cataloged."
    },
    {
      icon: Shield,
      title: "Secure Claims",
      description: "Multi-layered role verification restricts view permissions to prevent fraudulent opportunistic claims."
    },
    {
      icon: LayoutDashboard,
      title: "Admin Dashboard",
      description: "Comprehensive multi-tenant analytical suites giving complete macro oversight to campus security staff."
    },
    {
      icon: Archive,
      title: "Auto Archive after 30 days",
      description: "Automated database tidying policies seamlessly transition unrecovered legacy items to storage logs."
    }
  ];

  // How it works steps
  const steps = [
    {
      num: "01",
      title: "Report Item",
      description: "Provide key parameters, structural descriptors, and pinpoint geospatial drop markers inside our lightning-fast upload form."
    },
    {
      num: "02",
      title: "Smart Matching",
      description: "Foundry’s autonomous matching engine cross-references real-time catalog arrays to suggest pairing probability percentages."
    },
    {
      num: "03",
      title: "Recover Securely",
      description: "Exchange verification handshakes via designated secure campus hubs to safely restore physical property."
    }
  ];

  // Testimonials
  const testimonials = [
    {
      quote: "I lost my iPad right before finals week. Foundry matched my report with a device dropped at the library desk in less than 15 minutes. Absolutely flawless execution.",
      author: "Sarah Jenkins",
      role: "Computer Science Major",
      avatarBg: "bg-blue-600"
    },
    {
      quote: "Managing lost property for a campus of 25,000 students used to be a logistical nightmare. This platform automated our entire sorting flow overnight.",
      author: "Officer Marcus Vance",
      role: "Head of Campus Security",
      avatarBg: "bg-indigo-600"
    },
    {
      quote: "The interface is incredibly polished. Being able to browse recovered items instantly saved me from replacing my expensive lab equipment.",
      author: "David Chen",
      role: "Graduate Researcher",
      avatarBg: "bg-purple-600"
    }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-500 font-sans relative overflow-x-hidden ${
      isDarkMode 
        ? 'bg-[#060913] text-slate-100 selection:bg-blue-500/30 selection:text-blue-300' 
        : 'bg-[#FAFCFF] text-slate-900 selection:bg-blue-100 selection:text-blue-700'
    }`}>
      
      {/* Premium Initial Startup Loader */}
      <AnimatePresence>
        {isLoading && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed inset-0 z-[100] bg-[#060913] flex flex-col items-center justify-center text-white"
          >
            <div className="relative flex items-center justify-center mb-6">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute w-24 h-24 rounded-3xl border-2 border-blue-500/20 border-t-blue-500"
              />
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-xl shadow-blue-500/30">
                <Search className="w-7 h-7 text-white" />
              </div>
            </div>
            <motion.h2 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="text-3xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-blue-400"
            >
              FOUNDRY
            </motion.h2>
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "120px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mt-4"
            />
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-3">
              Elite Enterprise Grade Experience
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Animated Cursor Glow Overlay */}
      <motion.div 
        className="fixed top-0 left-0 w-[450px] h-[450px] rounded-full bg-gradient-to-br from-blue-500/10 to-purple-500/10 blur-[120px] pointer-events-none z-30 transition-opacity duration-300 hidden lg:block"
        animate={{ 
          x: mousePos.x - 225, 
          y: mousePos.y - 225,
        }}
        transition={{ type: "spring", damping: 45, stiffness: 250, mass: 0.2 }}
      />

      {/* Background Animated Blobs & Subtle Grid Overlay */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[800px] pointer-events-none overflow-hidden -z-10">
        <div className={`absolute top-[-10%] left-[10%] w-[500px] h-[500px] rounded-full blur-[120px] transition-all duration-700 opacity-60 animate-pulse ${
          isDarkMode ? 'bg-blue-600/20' : 'bg-blue-400/20'
        }`} style={{ animationDuration: '8s' }} />
        <div className={`absolute top-[20%] right-[5%] w-[600px] h-[600px] rounded-full blur-[140px] transition-all duration-700 opacity-50 ${
          isDarkMode ? 'bg-indigo-600/20' : 'bg-indigo-300/20'
        }`} />
        {/* Apple + Stripe Inspired Subtle Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.02]" style={{ backgroundImage: 'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      </div>

      {/* Sticky Glassmorphism Navbar */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 backdrop-blur-xl border-b ${
        isDarkMode 
          ? 'bg-[#060913]/70 border-slate-800/80 shadow-lg shadow-black/20' 
          : 'bg-white/70 border-slate-200/80 shadow-xs'
      }`}>
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-600/20 group-hover:scale-105 transition-transform duration-300">
              <Search className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div className="flex flex-col">
              <span className={`text-xl font-extrabold tracking-tight leading-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                Foundry
              </span>
              <span className="text-[9px] font-bold tracking-widest text-blue-500 uppercase">
                University Hub
              </span>
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className={`text-sm font-medium transition-colors hover:text-blue-500 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
              Features
            </a>
            <a href="#preview" className={`text-sm font-medium transition-colors hover:text-blue-500 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
              Live Feed
            </a>
            <a href="#how-it-works" className={`text-sm font-medium transition-colors hover:text-blue-500 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
              How It Works
            </a>
            <a href="#testimonials" className={`text-sm font-medium transition-colors hover:text-blue-500 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
              Testimonials
            </a>
          </div>

          {/* Right Controls: Theme Toggle & Dashboard CTA */}
          <div className="hidden md:flex items-center gap-4">
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2.5 rounded-xl border transition-all duration-300 ${
                isDarkMode 
                  ? 'bg-slate-900 border-slate-800 text-amber-400 hover:bg-slate-800' 
                  : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
              title="Toggle Contrast State"
            >
              {isDarkMode ? <Sun className="w-4 h-4 animate-spin-slow" /> : <Moon className="w-4 h-4" />}
            </button>

            <Link 
              to="/app" 
              className="relative inline-flex items-center justify-center p-0.5 rounded-full overflow-hidden font-bold text-sm transition-all group active:scale-95 shadow-lg shadow-blue-500/10"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 group-hover:opacity-90 transition-opacity" />
              <span className={`relative px-6 py-2.5 rounded-full transition-colors flex items-center gap-2 ${
                isDarkMode ? 'bg-[#060913] text-white hover:bg-transparent' : 'bg-white text-slate-900 hover:bg-transparent hover:text-white'
              }`}>
                <span>Dashboard</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          </div>

          {/* Mobile Hamburger Controls */}
          <div className="flex items-center gap-3 md:hidden">
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2 rounded-lg border ${isDarkMode ? 'bg-slate-900 border-slate-800 text-amber-400' : 'bg-slate-50 border-slate-200 text-slate-600'}`}
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-lg border ${isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'}`}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Expanded View */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className={`md:hidden px-6 py-6 border-t flex flex-col gap-4 ${
                isDarkMode ? 'bg-[#060913] border-slate-800' : 'bg-white border-slate-200'
              }`}
            >
              <a 
                href="#features" 
                onClick={() => setMobileMenuOpen(false)}
                className={`text-base font-semibold py-2 ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}
              >
                Features
              </a>
              <a 
                href="#preview" 
                onClick={() => setMobileMenuOpen(false)}
                className={`text-base font-semibold py-2 ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}
              >
                Live Feed
              </a>
              <a 
                href="#how-it-works" 
                onClick={() => setMobileMenuOpen(false)}
                className={`text-base font-semibold py-2 ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}
              >
                How It Works
              </a>
              <a 
                href="#testimonials" 
                onClick={() => setMobileMenuOpen(false)}
                className={`text-base font-semibold py-2 ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}
              >
                Testimonials
              </a>
              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-3">
                <Link 
                  to="/app" 
                  className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl text-center shadow-lg shadow-blue-600/20"
                >
                  Enter Dashboard
                </Link>
                <Link 
                  to="/app/report-lost" 
                  className={`w-full py-3 font-bold rounded-xl text-center border ${
                    isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                >
                  Report Lost Item
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section className="pt-36 pb-20 md:pt-44 md:pb-32 px-6 max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          
          {/* Subtle Top Indicator Tag */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-bold uppercase tracking-widest mb-8 ${
              isDarkMode 
                ? 'bg-blue-500/10 border-blue-500/20 text-blue-400' 
                : 'bg-blue-50 border-blue-200/80 text-blue-600'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            <span>Next-Gen Inventory Recovery System</span>
          </motion.div>

          {/* Animated Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[1.08] mb-6"
          >
            Reconnect With <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600">
              Your Belongings.
            </span>
          </motion.h1>

          {/* Premium Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`text-lg sm:text-xl max-w-2xl font-medium leading-relaxed mb-10 ${
              isDarkMode ? 'text-slate-400' : 'text-slate-600'
            }`}
          >
            The smartest university lost and found platform designed to help students recover their items quickly and securely.
          </motion.p>

          {/* Hero CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center items-center mb-16"
          >
            <Link 
              to="/app/report-lost" 
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-2xl shadow-xl shadow-blue-600/25 hover:opacity-95 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 text-base group"
            >
              <span>Report Lost Item</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link 
              to="/app/items" 
              className={`w-full sm:w-auto px-8 py-4 font-bold rounded-2xl border transition-all flex items-center justify-center gap-2 text-base hover:scale-[1.02] active:scale-95 ${
                isDarkMode 
                  ? 'bg-slate-900/80 border-slate-800 text-white hover:border-blue-500/50 hover:bg-slate-900' 
                  : 'bg-white border-slate-200 text-slate-900 hover:border-blue-600 hover:text-blue-600 shadow-xs'
              }`}
            >
              <span>Browse Found Items</span>
            </Link>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="w-full pt-8 border-t border-slate-200/80 dark:border-slate-800/80"
          >
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">
              Trusted by Core Security Teams Across 25+ Institutions
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-300">
              {['Stanford Hub', 'Berkeley Sec', 'MIT Logistics', 'Columbia Core', 'Oxford Res'].map((badge, idx) => (
                <span key={idx} className={`font-black text-sm tracking-tighter ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  // {badge}
                </span>
              ))}
            </div>
          </motion.div>

        </div>

        {/* Floating Dashboard Interactive Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 max-w-5xl mx-auto relative"
        >
          {/* Floating Accents */}
          <motion.div 
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className={`absolute -top-6 -left-6 z-20 hidden md:flex items-center gap-3 p-4 rounded-2xl border backdrop-blur-xl shadow-xl ${
              isDarkMode ? 'bg-[#0B132B]/90 border-slate-800 text-white' : 'bg-white/90 border-slate-200 text-slate-900'
            }`}
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 shrink-0">
              <CheckCircle className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold leading-none">95% Match Ratio</p>
              <p className="text-[10px] text-slate-400 mt-1">Autonomous Linker</p>
            </div>
          </motion.div>

          <motion.div 
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className={`absolute -bottom-6 -right-6 z-20 hidden md:flex items-center gap-3 p-4 rounded-2xl border backdrop-blur-xl shadow-xl ${
              isDarkMode ? 'bg-[#0B132B]/90 border-slate-800 text-white' : 'bg-white/90 border-slate-200 text-slate-900'
            }`}
          >
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 shrink-0">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold leading-none">Instant Ping Sent</p>
              <p className="text-[10px] text-slate-400 mt-1">Owner Notified via SMS</p>
            </div>
          </motion.div>

          {/* Actual Mockup Shell */}
          <div className={`rounded-[2rem] border p-3 md:p-5 shadow-2xl backdrop-blur-xl transition-all ${
            isDarkMode 
              ? 'bg-[#0B132B]/60 border-slate-800/80 shadow-blue-900/10' 
              : 'bg-white/60 border-slate-200/80 shadow-slate-200'
          }`}>
            <div className={`rounded-2xl border overflow-hidden ${
              isDarkMode ? 'bg-[#060913] border-slate-800' : 'bg-slate-50 border-slate-200/60'
            }`}>
              
              {/* Window Controls Header */}
              <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-800/80 flex items-center justify-between bg-white/40 dark:bg-slate-950/40">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-rose-500" />
                  <div className="w-3 h-3 rounded-full bg-amber-500" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                </div>
                <div className="text-[11px] font-bold text-slate-400 font-mono tracking-wider">
                  foundry-admin-console.app
                </div>
                <div className="w-12" /> {/* alignment spacer */}
              </div>

              {/* Console Mock Body */}
              <div className="p-4 md:p-6 grid grid-cols-1 lg:grid-cols-4 gap-6 text-left">
                
                {/* Left Mini Sidebar Preview */}
                <div className="space-y-4 hidden lg:block border-r border-slate-200 dark:border-slate-800/80 pr-4">
                  <div className="flex items-center gap-2 pb-2">
                    <div className="w-6 h-6 rounded-lg bg-blue-600 flex items-center justify-center text-white text-xs font-bold">
                      F
                    </div>
                    <span className="text-xs font-bold truncate">Campus Vault</span>
                  </div>
                  <div className="space-y-1">
                    {['Overview Dashboard', 'Active Lost Reports', 'Found Verification', 'Student Claims', 'System Settings'].map((item, i) => (
                      <div key={i} className={`px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center justify-between ${
                        i === 0 
                          ? 'bg-blue-600 text-white font-bold shadow-xs' 
                          : 'text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900'
                      }`}>
                        <span>{item}</span>
                        {i === 1 && <span className="text-[9px] px-1 bg-amber-500 text-white rounded">5</span>}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Main Content Area Preview */}
                <div className="lg:col-span-3 space-y-6">
                  
                  {/* Top quick stats row */}
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { title: "Total Cataloged", val: "1,420", change: "+12% this week" },
                      { title: "Reunited Percentage", val: "94.8%", change: "Industry Benchmark" },
                      { title: "Pending Audits", val: "24 Items", change: "Requires Dropoff" }
                    ].map((st, i) => (
                      <div key={i} className={`p-3 rounded-xl border ${
                        isDarkMode ? 'bg-slate-900/50 border-slate-800/80' : 'bg-white border-slate-200/80'
                      }`}>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{st.title}</p>
                        <p className="text-lg font-black mt-1 leading-tight">{st.val}</p>
                        <p className="text-[9px] text-emerald-500 font-semibold mt-0.5">{st.change}</p>
                      </div>
                    ))}
                  </div>

                  {/* Active Feed Simulation Table */}
                  <div className={`rounded-xl border overflow-hidden ${
                    isDarkMode ? 'bg-slate-900/30 border-slate-800/80' : 'bg-white border-slate-200/80'
                  }`}>
                    <div className="px-4 py-2.5 border-b border-slate-200 dark:border-slate-800/80 flex items-center justify-between">
                      <span className="text-xs font-bold">Autocorrelated Activity Logs</span>
                      <span className="text-[10px] text-blue-500 font-bold">Live Feed Connected</span>
                    </div>
                    
                    <div className="divide-y divide-slate-100 dark:divide-slate-800/50">
                      {[
                        { item: "Space Gray iPad Pro", user: "STU-88219", match: "98% Confidence", status: "Auto-Matched", badge: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" },
                        { item: "Car Keys + Toyota Keychain", user: "FAC-11029", match: "Manual Entry", status: "Awaiting Claim", badge: "bg-amber-500/10 text-amber-500 border-amber-500/20" },
                        { item: "Calculators (TI-84)", user: "STU-44012", match: "91% Confidence", status: "Verified Code", badge: "bg-blue-500/10 text-blue-500 border-blue-500/20" }
                      ].map((row, i) => (
                        <div key={i} className="px-4 py-3 flex items-center justify-between text-xs hover:bg-slate-50 dark:hover:bg-slate-900/40 transition-colors">
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-blue-500" />
                            <div>
                              <p className="font-bold">{row.item}</p>
                              <p className="text-[10px] text-slate-400">Reporter ID: {row.user}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="text-[10px] font-mono text-slate-400 hidden sm:inline">{row.match}</span>
                            <span className={`px-2 py-0.5 rounded text-[9px] font-bold border ${row.badge}`}>
                              {row.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

              </div>

            </div>
          </div>
        </motion.div>

      </section>

      {/* Live Preview Floating Cards Section */}
      <section id="preview" className="py-24 border-t border-slate-200/60 dark:border-slate-800/60 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4">
              Recently Reported Live Array
            </h2>
            <p className={`text-base font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Modern glass cards optimized for fast visual categorization. Hover to examine platform-level actions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {previewItems.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className={`rounded-2xl p-5 border backdrop-blur-xl transition-all duration-300 relative group overflow-hidden ${
                    isDarkMode 
                      ? 'bg-slate-900/40 border-slate-800 hover:border-slate-700 hover:bg-slate-900/80 hover:shadow-[0_0_30px_rgba(37,99,235,0.15)]' 
                      : 'bg-white/80 border-slate-200 hover:border-slate-300 hover:bg-white hover:shadow-xl'
                  }`}
                >
                  {/* Subtle top indicator glow strip */}
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${item.color} opacity-80`} />

                  <div className="flex items-center justify-between mb-4 mt-1">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br ${item.color} text-white shadow-md`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-wider ${
                      item.status === 'Lost' ? 'bg-rose-500/10 text-rose-500 border border-rose-500/20' : 
                      item.status === 'Found' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' :
                      'bg-blue-500/10 text-blue-500 border border-blue-500/20'
                    }`}>
                      {item.status}
                    </span>
                  </div>

                  <p className="text-xs font-mono text-slate-400 mb-0.5">{item.id}</p>
                  <h3 className="text-base font-bold leading-tight mb-3 group-hover:text-blue-500 transition-colors">
                    {item.title}
                  </h3>

                  <div className="space-y-1.5 pt-3 border-t border-slate-100 dark:border-slate-800/80 text-xs text-slate-400">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 shrink-0 text-slate-500" />
                      <span className="truncate">{item.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 shrink-0 text-slate-500" />
                      <span>{item.time}</span>
                    </div>
                  </div>

                  {/* Absolute view button on hover */}
                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-[10px] font-bold text-blue-500">Examine details</span>
                    <ArrowRight className="w-3.5 h-3.5 text-blue-500" />
                  </div>

                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Statistics Animated Counters Section */}
      <section className={`py-20 border-y transition-colors ${
        isDarkMode ? 'bg-[#0B132B]/40 border-slate-800' : 'bg-slate-50/50 border-slate-200/60'
      }`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center">
            {[
              { value: "500+", label: "Items Recovered", suffix: "Successfully returned" },
              { value: "1200+", label: "Students Helped", suffix: "Active accounts verified" },
              { value: "95%", label: "Match Accuracy", suffix: "AI Correlated engine" },
              { value: "24/7", label: "Availability", suffix: "Always tracking updates" }
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="space-y-1"
              >
                <div className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-blue-600 to-indigo-500 tracking-tight">
                  {stat.value}
                </div>
                <div className="text-sm font-bold tracking-wide mt-2">
                  {stat.label}
                </div>
                <div className="text-[11px] text-slate-400 font-medium">
                  {stat.suffix}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Features Section */}
      <section id="features" className="py-28 max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4 leading-tight">
            Designed for Flawless Asset Logistics
          </h2>
          <p className={`text-lg font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            Every parameter engineered to completely eliminate friction from legacy physical claims management protocols.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -8 }}
                className={`p-8 rounded-[2rem] border transition-all duration-300 group relative overflow-hidden ${
                  isDarkMode 
                    ? 'bg-slate-900/40 border-slate-800 hover:border-slate-700 hover:bg-slate-900/80 hover:shadow-[0_10px_30px_rgba(37,99,235,0.1)]' 
                    : 'bg-white border-slate-200/80 hover:border-slate-300 hover:shadow-xl'
                }`}
              >
                {/* Background accent radial blob on hover */}
                <div className="absolute -right-12 -top-12 w-32 h-32 rounded-full bg-blue-500/10 blur-xl group-hover:bg-blue-500/20 transition-all duration-500" />

                <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300 shadow-sm">
                  <Icon className="w-6 h-6 stroke-[2]" />
                </div>

                <h3 className="text-xl font-bold mb-3 tracking-tight group-hover:text-blue-500 transition-colors">
                  {feat.title}
                </h3>
                
                <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  {feat.description}
                </p>

                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center gap-2 text-xs font-bold text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Explore parameter setup</span>
                  <ChevronRight className="w-4 h-4 translate-y-[0.5px]" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* How It Works Timeline Section */}
      <section id="how-it-works" className={`py-28 border-t transition-colors ${
        isDarkMode ? 'bg-[#0B132B]/30 border-slate-800' : 'bg-slate-50/30 border-slate-200/60'
      }`}>
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="max-w-3xl mx-auto text-center mb-20">
            <span className="text-xs font-black uppercase tracking-widest text-blue-500">
              Architectural Processing Flow
            </span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight mt-2 mb-4 leading-tight">
              3-Step Unified Timeline UI
            </h2>
            <p className={`text-base font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Seamless linear execution pipeline guarantees items transition safely back home.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            
            {/* Background connection visual horizontal line */}
            <div className="hidden md:block absolute top-24 left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-blue-500/20 via-indigo-500/40 to-purple-500/20 z-0" />

            {steps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                className="relative z-10 flex flex-col items-center text-center"
              >
                {/* Number Core Hub */}
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white font-black text-xl flex items-center justify-center shadow-lg shadow-blue-600/20 mb-6 ring-4 ring-white dark:ring-[#060913]">
                  {step.num}
                </div>

                <h3 className="text-xl font-bold mb-3 tracking-tight">
                  {step.title}
                </h3>

                <p className={`text-sm leading-relaxed max-w-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  {step.description}
                </p>
              </motion.div>
            ))}

          </div>

        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-28 max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4">
            Verified Student Stories
          </h2>
          <p className={`text-base font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            Real testimonials collected automatically via our automated verification close hooks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((test, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className={`p-8 rounded-3xl border flex flex-col justify-between relative backdrop-blur-xl ${
                isDarkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200/80 shadow-xs'
              }`}
            >
              {/* Subtle top star row */}
              <div>
                <div className="flex items-center gap-1 mb-4 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 stroke-none" />
                  ))}
                </div>

                <p className={`text-sm font-medium leading-relaxed italic mb-8 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                  "{test.quote}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-slate-100 dark:border-slate-800/80">
                <div className={`w-10 h-10 rounded-xl ${test.avatarBg} flex items-center justify-center text-white font-bold text-xs shrink-0 shadow-sm`}>
                  {test.author.substring(0, 2).toUpperCase()}
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold truncate">{test.author}</p>
                  <p className="text-[10px] text-slate-400 truncate">{test.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Premium Centered CTA Section with glowing background */}
      <section className="py-24 max-w-6xl mx-auto px-6 relative z-10">
        <div className="relative rounded-[3rem] p-12 md:p-24 overflow-hidden text-center bg-gradient-to-br from-blue-950 via-indigo-950 to-slate-900 border border-blue-500/20 shadow-2xl">
          
          {/* Radial Center Backing Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.25)_0,transparent_70%)] pointer-events-none" />

          {/* Abstract background floating nodes */}
          <div className="absolute top-4 left-4 w-24 h-24 rounded-full bg-blue-500/10 blur-xl pointer-events-none" />
          <div className="absolute bottom-4 right-4 w-32 h-32 rounded-full bg-purple-500/10 blur-xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto">
            <span className="px-3 py-1 bg-white/10 text-blue-300 text-[10px] font-black uppercase tracking-widest rounded-full border border-white/10 backdrop-blur-md">
              Secure Cloud Provisioning
            </span>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mt-6 mb-6 leading-tight">
              Start Recovering Campus Belongings Today.
            </h2>
            
            <p className="text-slate-300 text-base md:text-lg mb-10 leading-relaxed font-medium">
              Join thousands of students and staff members inside Foundry’s streamlined registry framework. No complex passwords required.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link 
                to="/app" 
                className="w-full sm:w-auto px-8 py-4 bg-white text-slate-950 font-extrabold rounded-2xl hover:bg-slate-100 transition-all shadow-xl hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2"
              >
                <span>Launch Main Client Console</span>
                <ArrowRight className="w-4 h-4 text-blue-600" />
              </Link>
              
              <Link 
                to="/app/report-lost" 
                className="w-full sm:w-auto px-8 py-4 bg-blue-600/30 border border-blue-500/40 text-white font-bold rounded-2xl hover:bg-blue-600/40 transition-all flex items-center justify-center backdrop-blur-md"
              >
                <span>Report Item Instantly</span>
              </Link>
            </div>

            <div className="mt-8 flex items-center justify-center gap-6 text-xs text-slate-400 font-medium">
              <span className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-400" /> Free multi-tier user role
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-400" /> Zero installation hooks
              </span>
            </div>

          </div>
        </div>
      </section>

      {/* Modern Minimal Footer */}
      <footer className={`py-16 border-t transition-colors ${
        isDarkMode ? 'bg-[#060913] border-slate-800/80 text-slate-400' : 'bg-white border-slate-200/80 text-slate-600'
      }`}>
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-12 border-b border-slate-200 dark:border-slate-800">
            
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                  <Search className="w-4 h-4 stroke-[2.5]" />
                </div>
                <span className={`text-lg font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  Foundry
                </span>
              </div>
              <p className="text-xs max-w-xs leading-relaxed">
                Empowering connected logistics across global university networks. Built natively on React & Tailwind CSS framework environments.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-x-8 gap-y-3 text-xs font-semibold">
              <Link to="/app" className="hover:text-blue-500 transition-colors">Admin Hub</Link>
              <Link to="/app/report-lost" className="hover:text-blue-500 transition-colors">Lost Submissions</Link>
              <Link to="/app/report-found" className="hover:text-blue-500 transition-colors">Found Log</Link>
              <a href="#features" className="hover:text-blue-500 transition-colors">Security Rules</a>
              <a href="#preview" className="hover:text-blue-500 transition-colors">API Docs</a>
            </div>

          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <div>
              © 2026 Foundry Enterprise Logistics. All rights reserved.
            </div>
            
            <div className="flex items-center gap-6 font-medium">
              <span className="hover:text-blue-500 cursor-pointer">Privacy Protocols</span>
              <span className="hover:text-blue-500 cursor-pointer">Terms of Operation</span>
              <span className="hover:text-blue-500 cursor-pointer">Status Engine</span>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
};
