import { useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  AlertTriangle,
  PackageSearch,
  CheckCircle,
  Users,
  Settings,
  LogOut,
  Search,
  X
} from 'lucide-react';
import { cn } from '../lib/utils';
import { useAuth } from '../context/AuthContext';

interface SidebarProps {
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar = ({ isMobileOpen = false, onCloseMobile }: SidebarProps) => {
  const location = useLocation();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const isAdmin = user?.role === 'Admin';

  // Clean, focused navigation with zero stub links
  const mainLinks = isAdmin ? [
    { name: 'Dashboard', path: '/app', icon: LayoutDashboard },
    { name: 'Lost Items', path: '/app/report-lost', icon: AlertTriangle },
    { name: 'Found Items', path: '/app/report-found', icon: PackageSearch },
    { name: 'All Reports & Claims', path: '/app/items', icon: CheckCircle },
    { name: 'Users & Profile', path: '/app/profile', icon: Users },
    { name: 'Settings', path: '/app/settings', icon: Settings },
  ] : [
    { name: 'Items Directory', path: '/app/items', icon: CheckCircle },
    { name: 'Report Lost Item', path: '/app/report-lost', icon: AlertTriangle },
    { name: 'Report Found Item', path: '/app/report-found', icon: PackageSearch },
    { name: 'My Profile', path: '/app/profile', icon: Users },
    { name: 'Settings', path: '/app/settings', icon: Settings },
  ];

  const handleLogout = () => {
    logout();
    if (onCloseMobile) onCloseMobile();
    navigate('/');
  };

  const handleNavClick = (path: string) => {
    if (onCloseMobile) onCloseMobile();
    navigate(path);
  };

  const sidebarContent = (
    <>
      {/* Top Logo Section */}
      <div className="h-20 flex items-center justify-between px-6 border-b border-slate-800/80 dark:border-slate-700/80">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/30">
            <Search className="h-5 w-5 text-white stroke-[2.5]" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-base leading-tight text-white tracking-wide">Lost & Found</span>
            <span className="text-[11px] text-blue-400 font-semibold tracking-wider uppercase">
              {isAdmin ? 'Super Admin' : 'Student Portal'}
            </span>
          </div>
        </div>

        {/* Mobile Close Button */}
        {onCloseMobile && (
          <button
            onClick={onCloseMobile}
            className="md:hidden p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            aria-label="Close sidebar menu"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto py-6 px-4 space-y-6">
        <div className="space-y-1">
          <div className="px-3 mb-2 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
            Navigation Menu
          </div>
          {mainLinks.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.path || (link.path === '/app' && location.pathname === '/app/');

            return (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.path)}
                className={cn(
                  "w-full flex items-center gap-3.5 px-3.5 py-3 rounded-xl transition-all duration-200 text-sm font-medium group relative text-left",
                  isActive
                    ? "bg-blue-600 text-white font-semibold shadow-md shadow-blue-600/20"
                    : "text-slate-400 hover:bg-slate-800/60 dark:hover:bg-slate-700/60 hover:text-slate-200"
                )}
              >
                <Icon className={cn(
                  "h-4.5 w-4.5 shrink-0 transition-transform duration-200 group-hover:scale-110",
                  isActive ? "text-white" : "text-slate-400 group-hover:text-blue-400"
                )} />
                <span className="truncate">{link.name}</span>
                {isActive && (
                  <div className="absolute left-0 top-2 bottom-2 w-1 bg-white rounded-r-full" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* User Profile & Logout Footer */}
      <div className="p-4 border-t border-slate-800/80 dark:border-slate-700/80 bg-slate-950/40 dark:bg-slate-900/60 space-y-3 transition-colors duration-300">
        <div className="flex items-center justify-between gap-3 px-2">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-lg bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400 font-bold text-sm uppercase shrink-0 overflow-hidden">
              {user?.avatar ? (
                <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                user?.name?.substring(0, 2) || 'AU'
              )}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-slate-200 truncate">{user?.name || 'Super Admin'}</p>
              <p className="text-[10px] text-slate-500 truncate">{user?.email || 'admin@university.edu'}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors shrink-0"
            title="Sign Out"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>

        <div className="text-center pt-1">
          <p className="text-[10px] text-slate-600 font-medium">© 2025 Lost & Found System</p>
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="w-[280px] bg-[#0B132B] dark:bg-slate-900 dark:border-slate-800 text-slate-300 hidden md:flex flex-col h-screen sticky top-0 left-0 z-50 border-r border-slate-800 select-none transition-colors duration-300">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Overlay */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div 
            onClick={onCloseMobile}
            className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity"
            aria-hidden="true"
          />
          <aside className="relative w-[280px] max-w-[85vw] bg-[#0B132B] dark:bg-slate-900 text-slate-300 flex flex-col h-full z-50 shadow-2xl select-none animate-in slide-in-from-left duration-300">
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  );
};
