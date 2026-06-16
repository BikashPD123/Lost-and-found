import React, { useState } from 'react';
import { useAuth, type UserRole } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail, Lock, Shield, User, ArrowRight, AlertCircle, Key, Search,
  Eye, EyeOff, Sparkles, GraduationCap, CheckCircle
} from 'lucide-react';

type AuthTab = 'login' | 'register';

export const Login = () => {
  const { login, error, clearError, masterAdminEmail } = useAuth();
  const navigate = useNavigate();

  const [tab, setTab] = useState<AuthTab>('login');
  const [role, setRole] = useState<UserRole>('User');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState(false);

  const handleInput = (setter: (v: string) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setter(e.target.value);
    if (error) clearError();
  };

  const handleRoleSwitch = (r: UserRole) => {
    setRole(r);
    setTab('login'); // Admin only has login, no register
    clearError();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (tab === 'register' && role === 'User') {
      // Simulate registration → auto login
      const success = login(email, 'User', password, name);
      if (success) {
        setRegisterSuccess(true);
        setTimeout(() => navigate('/app'), 1200);
      }
    } else {
      const success = login(email, role, password);
      if (success) navigate('/app');
    }
  };

  const isAdminMode = role === 'Admin';

  return (
    <div className="min-h-screen bg-[#060913] flex overflow-hidden relative">
      {/* Background blobs */}
      <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-blue-700/15 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-indigo-700/15 blur-[150px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(37,99,235,0.08)_0,transparent_60%)] pointer-events-none" />

      {/* Left: Animated Panel — hidden on mobile */}
      <div className="hidden lg:flex flex-col items-center justify-center w-[48%] xl:w-[52%] p-12 xl:p-16 relative border-r border-slate-800/60 overflow-hidden">
        
        {/* Flowing Animation Background */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 180, 270, 360],
            borderRadius: ["20%", "50%", "20%"]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute w-[80%] h-[80%] bg-gradient-to-tr from-blue-600/20 to-purple-600/20 blur-[80px]"
        />

        {/* Blinking Message */}
        <motion.div
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="relative z-10 text-center max-w-md"
        >
          <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white shadow-2xl shadow-blue-600/30 mb-8">
            <Search className="w-10 h-10 stroke-[2.5]" />
          </div>
          <h2 className="text-3xl font-black text-white leading-snug tracking-tight mb-4">
            This website can help you with your lost items.
          </h2>
          <p className="text-xl font-medium text-blue-400">
            Login and use the features.
          </p>
        </motion.div>
      </div>

      {/* Right: Auth Panel */}
      <div className="flex-1 flex items-center justify-center p-6 relative z-10">
        <div className="w-full max-w-md">

          {/* Mobile logo */}
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white shadow-lg">
              <Search className="w-4 h-4 stroke-[2.5]" />
            </div>
            <span className="text-lg font-black text-white tracking-tight">Foundry</span>
          </div>

          {/* Role Switch — User / Admin */}
          <div className="flex items-center gap-3 mb-8">
            {(['User', 'Admin'] as UserRole[]).map((r) => (
              <button
                key={r}
                onClick={() => handleRoleSwitch(r)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full border text-sm font-bold transition-all ${
                  role === r
                    ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-600/25'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-600 hover:text-slate-200'
                }`}
              >
                {r === 'User' ? <User className="w-4 h-4" /> : <Shield className="w-4 h-4" />}
                {r}
              </button>
            ))}
          </div>

          {/* Login / Register tabs — only for User */}
          {!isAdminMode && (
            <div className="flex gap-1 p-1 rounded-2xl bg-slate-900/60 border border-slate-800/80 mb-8">
              {(['login', 'register'] as AuthTab[]).map((t) => (
                <button
                  key={t}
                  onClick={() => { setTab(t); clearError(); }}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-bold capitalize transition-all ${
                    tab === t
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {t === 'login' ? 'Sign In' : 'Register'}
                </button>
              ))}
            </div>
          )}

          {/* Card */}
          <motion.div
            key={`${tab}-${role}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="bg-slate-900/60 border border-slate-800/80 rounded-[2rem] p-8 backdrop-blur-xl shadow-2xl shadow-black/30"
          >
            {/* Heading */}
            <div className="mb-8">
              <h2 className="text-2xl font-black text-white tracking-tight mb-1">
                {isAdminMode
                  ? 'Admin Access'
                  : tab === 'login' ? 'Welcome Back' : 'Create Account'}
              </h2>
              <p className="text-sm text-slate-400 font-medium">
                {isAdminMode
                  ? 'Verified administrator credentials required.'
                  : tab === 'login'
                    ? 'Sign in to manage your campus belongings.'
                    : 'Join Foundry and start tracking your items.'}
              </p>
            </div>

            {/* Error alert */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-6 p-4 bg-red-500/10 border border-red-500/25 rounded-xl flex items-start gap-3 text-red-400"
                >
                  <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                  <p className="text-sm font-semibold leading-relaxed">{error}</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Success state */}
            <AnimatePresence>
              {registerSuccess && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/25 rounded-xl flex items-center gap-3 text-emerald-400"
                >
                  <CheckCircle className="w-5 h-5 shrink-0" />
                  <p className="text-sm font-bold">Account created! Redirecting to dashboard…</p>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Name field — Register only */}
              {tab === 'register' && !isAdminMode && (
                <div className="space-y-1.5">
                  <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest">Full Name</label>
                  <div className="relative group">
                    <User className="w-4.5 h-4.5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={handleInput(setName)}
                      className="w-full pl-11 pr-4 py-3.5 bg-slate-800/60 border border-slate-700/80 text-slate-100 placeholder-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all text-sm font-medium"
                    />
                  </div>
                </div>
              )}

              {/* Email field */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest">
                  {isAdminMode ? 'Admin Email' : 'Email Address'}
                </label>
                <div className="relative group">
                  {isAdminMode ? (
                    <Key className="w-4.5 h-4.5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
                  ) : (
                    <Mail className="w-4.5 h-4.5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
                  )}
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={handleInput(setEmail)}
                    className="w-full pl-11 pr-4 py-3.5 bg-slate-800/60 border border-slate-700/80 text-slate-100 placeholder-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all text-sm font-medium"
                  />
                </div>
              </div>

              {/* Student ID — Register User only */}
              {tab === 'register' && !isAdminMode && (
                <div className="space-y-1.5">
                  <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest">Student ID <span className="normal-case text-slate-600">(optional)</span></label>
                  <div className="relative group">
                    <GraduationCap className="w-4.5 h-4.5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
                    <input
                      type="text"
                      className="w-full pl-11 pr-4 py-3.5 bg-slate-800/60 border border-slate-700/80 text-slate-100 placeholder-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all text-sm font-medium"
                    />
                  </div>
                </div>
              )}

              {/* Password field */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest">
                  {isAdminMode ? 'Admin Password' : 'Password'}
                </label>
                <div className="relative group">
                  <Lock className="w-4.5 h-4.5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={handleInput(setPassword)}
                    className="w-full pl-11 pr-12 py-3.5 bg-slate-800/60 border border-slate-700/80 text-slate-100 placeholder-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all text-sm font-medium"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-4 mt-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-extrabold rounded-xl shadow-xl shadow-blue-600/25 hover:opacity-90 hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-2 group"
              >
                <span>
                  {isAdminMode
                    ? 'Access Admin Panel'
                    : tab === 'login' ? 'Sign In to Foundry' : 'Create My Account'}
                </span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

            </form>

            {/* Bottom hint */}
            {!isAdminMode && (
              <p className="text-center text-xs text-slate-500 font-medium mt-6">
                {tab === 'login' ? (
                  <>Don't have an account?{' '}
                    <button onClick={() => { setTab('register'); clearError(); }} className="text-blue-400 font-bold hover:text-blue-300 transition-colors">
                      Register now
                    </button>
                  </>
                ) : (
                  <>Already have an account?{' '}
                    <button onClick={() => { setTab('login'); clearError(); }} className="text-blue-400 font-bold hover:text-blue-300 transition-colors">
                      Sign in
                    </button>
                  </>
                )}
              </p>
            )}

            {isAdminMode && (
              <p className="text-center text-xs text-slate-600 font-medium mt-6">
                Only authorized master administrators may access this panel.
              </p>
            )}
          </motion.div>

          {/* Back to landing */}
          <p className="text-center mt-6 text-xs text-slate-600 font-medium">
            <Link to="/home" className="hover:text-blue-400 transition-colors">← Back to Foundry Home</Link>
          </p>

        </div>
      </div>
    </div>
  );
};
