import { useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  AlertTriangle,
  PackageSearch,
  CheckCircle,
  Users,
  Bell,
  BarChart3,
  MessageSquare,
  FileText,
  Settings,
  ShieldCheck,
  Megaphone,
  Download,
  Sliders,
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

  const mainLinks = isAdmin ? [
    { name: 'Dashboard', path: '/app', icon: LayoutDashboard },
    { name: 'Lost Reports', path: '/app/report-lost', icon: AlertTriangle },
    { name: 'Found Items', path: '/app/report-found', icon: PackageSearch },
    { name: 'Claims Verification', path: '/app/items', icon: CheckCircle },
    { name: 'Users Management', path: '/app/profile', icon: Users },
    { name: 'Notifications', path: '#notifications', icon: Bell },
    { name: 'Analytics & Reports', path: '#analytics', icon: BarChart3 },
    { name: 'Complaints', path: '#complaints', icon: MessageSquare },
    { name: 'Audit Logs', path: '#audit', icon: FileText },
    { name: 'Settings', path: '/app/settings', icon: Settings },
    { name: 'Roles & Permissions', path: '#roles', icon: ShieldCheck },
  ] : [
    { name: 'Items Directory', path: '/app/items', icon: CheckCircle },
    { name: 'Report Lost', path: '/app/report-lost', icon: AlertTriangle },
    { name: 'Report Found', path: '/app/report-found', icon: PackageSearch },
    { name: 'My Profile', path: '/app/profile', icon: Users },
    { name: 'Settings', path: '/app/settings', icon: Settings },
  ];

  const quickActions = [
    { name: 'Add Announcement', icon: Megaphone, action: () => alert('Opening Add Announcement modal...') },
    { name: 'Export Reports', icon: Download, action: () => alert('Exporting generated CSV reports...') },
    { name: 'System Logs', icon: Sliders, action: () => alert('Fetching live system logs...') },
  ];

  const handleLogout = () => {
    logout();
    if (onCloseMobile) onCloseMobile();
    navigate('/');
  };

  const handleNavClick = (path: string, name: string) => {
    if (onCloseMobile) onCloseMobile();
    if (path.startsWith('#')) {
      alert(`${name} module is available in full release.`);
    } else {
      navigate(path);
    }
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
              {isAdmin ? 'Admin Panel' : 'Student Portal'}
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

      {/* Navigation Links Scrollable Area */}
      <div className="flex-1 overflow-y-auto py-6 px-4 space-y-6 scrollbar-thin scrollbar-thumb-slate-800">
        <div className="space-y-1">
          <div className="px-3 mb-2 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
            Main Menu
          </div>
          {mainLinks.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.path || (link.path === '/app' && location.pathname === '/app/');

            return (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.path, link.name)}
                className={cn(
                  "w-full flex items-center gap-3.5 px-3 py-2.5 rounded-xl transition-all duration-200 text-sm font-medium group relative text-left",
                  isActive
                    ? "bg-blue-600 text-white font-semibold shadow-md shadow-blue-600/20"
                    : "text-slate-400 hover:bg-slate-800/60 dark:hover:bg-slate-700/60 hover:text-slate-200"
                )}
              >
                <Icon className={cn(
                  "h-4 w-4 shrink-0 transition-transform duration-200 group-hover:scale-110",
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

        {/* Quick Actions Section */}
        <div className="space-y-1 pt-4 border-t border-slate-800/60 dark:border-slate-700/60">
          <div className="px-3 mb-2 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
            Quick Actions
          </div>
          {quickActions.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.name}
                onClick={() => {
                  if (onCloseMobile) onCloseMobile();
                  item.action();
                }}
                className="w-full flex items-center gap-3.5 px-3 py-2.5 rounded-xl transition-all duration-200 text-sm font-medium text-slate-400 hover:bg-slate-800/60 dark:hover:bg-slate-700/60 hover:text-slate-200 text-left group"
              >
                <Icon className="h-4 w-4 shrink-0 text-slate-500 group-hover:text-amber-400 transition-colors" />
                <span className="truncate">{item.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* User Profile / Logout footer */}
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
              <p className="text-xs font-bold text-slate-200 truncate">{user?.name || 'Admin User'}</p>
              <p className="text-[10px] text-slate-500 truncate">{user?.email || 'admin@university.edu'}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors shrink-0"
            title="Sign Out"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>

        <div className="text-center pt-1">
          <p className="text-[10px] text-slate-600 font-medium">© 2025 Lost & Found</p>
          <p className="text-[9px] text-slate-700">All rights reserved.</p>
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

      {/* Mobile Drawer Overlay & Sliding Panel */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          {/* Backdrop */}
          <div 
            onClick={onCloseMobile}
            className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity"
            aria-hidden="true"
          />

          {/* Drawer Sidebar */}
          <aside className="relative w-[280px] max-w-[85vw] bg-[#0B132B] dark:bg-slate-900 text-slate-300 flex flex-col h-full z-50 shadow-2xl select-none animate-in slide-in-from-left duration-300">
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  );
};
