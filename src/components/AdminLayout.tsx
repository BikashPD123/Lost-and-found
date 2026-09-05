import { useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

export const AdminLayout = () => {
  const { isAuthenticated } = useAuth();
  const { isDark } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className={`${isDark ? 'dark' : ''} flex h-screen overflow-hidden font-sans transition-colors duration-300`}>
      <div className="flex h-screen w-full bg-[#F8FAFC] dark:bg-slate-950 overflow-hidden transition-colors duration-300">
        <Sidebar isMobileOpen={isMobileMenuOpen} onCloseMobile={() => setIsMobileMenuOpen(false)} />
        <div className="flex-1 flex flex-col h-full relative overflow-hidden">
          <Navbar onOpenMobileMenu={() => setIsMobileMenuOpen(true)} />
          <main className="flex-1 overflow-y-auto p-4 sm:p-8 lg:p-10 scroll-smooth bg-[#F4F6F8] dark:bg-slate-950 transition-colors duration-300">
            <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700 ease-out">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

