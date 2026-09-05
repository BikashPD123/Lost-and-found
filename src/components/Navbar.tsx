import { Menu, Search, Sun, Moon, ChevronDown, User as UserIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';

interface NavbarProps {
  onOpenMobileMenu?: () => void;
}

export const Navbar = ({ onOpenMobileMenu }: NavbarProps) => {
  const { user } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();

  return (
    <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-4 sm:px-6 z-10 sticky top-0 shrink-0 transition-colors duration-300">
      {/* Left section: toggle and Search Bar */}
      <div className="flex items-center gap-3 flex-1 max-w-md">
        <button 
          onClick={onOpenMobileMenu}
          className="md:hidden p-1.5 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
          aria-label="Open navigation menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="relative w-full hidden sm:block">
          <Search className="h-4 w-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
          <input
            type="text"
            placeholder="Search items, reports..."
            onClick={() => navigate('/app/items')}
            className="w-full pl-10 pr-4 py-2 bg-[#F8FAFC] dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all cursor-pointer"
          />
        </div>
      </div>

      {/* Right section: Theme Toggle & User Profile */}
      <div className="flex items-center gap-3">
        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all duration-200 group"
          title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          id="theme-toggle-btn"
        >
          {isDark ? (
            <Sun className="h-4.5 w-4.5 text-amber-400 group-hover:rotate-12 transition-transform duration-300" />
          ) : (
            <Moon className="h-4.5 w-4.5 group-hover:-rotate-12 transition-transform duration-300" />
          )}
        </button>

        <div className="h-6 w-px bg-slate-200 dark:bg-slate-800 mx-1 hidden sm:block" />

        {/* Profile Info */}
        <div
          onClick={() => navigate('/app/profile')}
          className="flex items-center gap-3 cursor-pointer group pl-1"
          title="View Profile Settings"
        >
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xs shadow-sm shadow-blue-600/20 ring-2 ring-blue-50 dark:ring-slate-800 overflow-hidden">
            {user?.avatar ? (
              <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" />
            ) : (
              user?.name?.substring(0, 2).toUpperCase() || 'SA'
            )}
          </div>
          <div className="text-left hidden sm:block">
            <p className="text-xs font-bold text-slate-800 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-tight">
              {user?.name || 'Super Admin'}
            </p>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight">
              {user?.role === 'Admin' ? 'Super Admin' : 'User Account'}
            </p>
          </div>
          <ChevronDown className="h-3.5 w-3.5 text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors hidden sm:block" />
        </div>
      </div>
    </header>
  );
};
