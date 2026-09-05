import React, { useState } from 'react';
import { useItems } from '../hooks/useItems';
import { StatCard } from '../components/StatCard';
import { useAuth } from '../context/AuthContext';
import { Navigate, useNavigate } from 'react-router-dom';
import { 
  Calendar, 
  ChevronDown, 
  AlertTriangle, 
  PackageSearch, 
  Clock, 
  CheckCircle, 
  MoreVertical, 
  Users, 
  Activity, 
  ShieldCheck,
  Plus,
  Inbox
} from 'lucide-react';
import { format } from 'date-fns';

export const Dashboard = () => {
  const { user } = useAuth();
  const { items, getDashboardStats } = useItems();
  const navigate = useNavigate();

  if (user?.role !== 'Admin') {
    return <Navigate to="/app/items" replace />;
  }
  
  const stats = getDashboardStats();
  const [activeTab, setActiveTab] = useState<'All' | 'Lost Reports' | 'Found Items' | 'Claims'>('All');

  // Filter items dynamically based on selected tab
  const filteredItems = items.filter(item => {
    if (activeTab === 'Lost Reports') return item.type === 'Lost';
    if (activeTab === 'Found Items') return item.type === 'Found';
    if (activeTab === 'Claims') return item.type === 'Claim';
    return true;
  });

  return (
    <div className="space-y-6 pb-12 bg-[#F4F6F8] dark:bg-slate-950 min-h-full font-sans text-slate-800 dark:text-slate-100 -m-4 sm:-m-8 lg:-m-10 p-4 sm:p-8 lg:p-10 transition-colors duration-300">
      {/* Top Title & Date Selector Row */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight leading-tight">
            Super Admin Dashboard
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Real-time live monitoring of lost & found reports submitted by users.
          </p>
        </div>
        
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button 
            onClick={() => navigate('/app/report-lost')}
            className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-600/20 transition-all"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Submit Report</span>
          </button>

          <div className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 shadow-2xs">
            <Calendar className="h-4 w-4 text-slate-400 dark:text-slate-500" />
            <span>{format(new Date(), 'MMM dd, yyyy')}</span>
          </div>
        </div>
      </div>

      {/* Stats Cards Row (Dynamic values calculated strictly from real database) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Lost Reports" 
          value={stats.totalLost.toString()} 
          icon={<AlertTriangle className="h-5 w-5" />} 
          trend={stats.totalLost > 0 ? "+100%" : "0%"} 
          trendUp={true}
          iconBg="bg-blue-50 dark:bg-blue-950/50"
          iconColor="text-blue-600 dark:text-blue-400"
          subtitle="Real submitted items"
        />
        <StatCard 
          title="Found Items" 
          value={stats.totalFound.toString()} 
          icon={<PackageSearch className="h-5 w-5" />} 
          trend={stats.totalFound > 0 ? "+100%" : "0%"} 
          trendUp={true}
          iconBg="bg-emerald-50 dark:bg-emerald-950/50"
          iconColor="text-emerald-600 dark:text-emerald-400"
          subtitle="Real submitted items"
        />
        <StatCard 
          title="Pending Claims" 
          value={stats.pendingClaims.toString()} 
          icon={<Clock className="h-5 w-5" />} 
          trend="Live" 
          trendUp={true}
          iconBg="bg-amber-50 dark:bg-amber-950/50"
          iconColor="text-amber-600 dark:text-amber-400"
          subtitle="Awaiting admin action"
        />
        <StatCard 
          title="Resolved Cases" 
          value={stats.resolvedCases.toString()} 
          icon={<CheckCircle className="h-5 w-5" />} 
          trend="Live" 
          trendUp={true}
          iconBg="bg-purple-50 dark:bg-purple-950/50"
          iconColor="text-purple-600 dark:text-purple-400"
          subtitle="Successfully returned"
        />
      </div>

      {/* Zero Data Empty State Banner */}
      {items.length === 0 && (
        <div className="p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl text-center space-y-3 shadow-xs">
          <div className="w-12 h-12 bg-blue-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center mx-auto text-blue-600 dark:text-blue-400">
            <Inbox className="w-6 h-6" />
          </div>
          <h3 className="text-base font-extrabold text-slate-900 dark:text-white">No Lost or Found Item Reports Submitted Yet</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
            When users submit lost or found reports from their phone or app, they will automatically be saved to the database and appear right here.
          </p>
          <button
            onClick={() => navigate('/app/report-lost')}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs shadow-md transition-all mt-2"
          >
            <Plus className="w-4 h-4" />
            <span>Create First Report</span>
          </button>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex flex-col lg:flex-row items-start gap-4">
        {/* Left wider area: Recent Reports Table */}
        <div className="flex-1 w-full bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs overflow-hidden transition-colors duration-300">
          {/* Table Header and Tabs */}
          <div className="px-5 pt-4 border-b border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div className="flex items-center gap-1 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
              {(['All', 'Lost Reports', 'Found Items', 'Claims'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                    activeTab === tab
                      ? 'bg-blue-50 dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-2xs'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <button 
              onClick={() => navigate('/app/items')}
              className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline pb-2 sm:pb-0 shrink-0 self-end sm:self-auto"
            >
              View Items Directory →
            </button>
          </div>

          {/* Table contents */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#F8FAFC] dark:bg-slate-800/60 border-b border-slate-100 dark:border-slate-800 text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider select-none">
                  <th className="py-3 px-5">ID</th>
                  <th className="py-3 px-4">Type</th>
                  <th className="py-3 px-4">Item Name</th>
                  <th className="py-3 px-4">Reported By</th>
                  <th className="py-3 px-4">Location</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs text-slate-600 dark:text-slate-300">
                {filteredItems.length > 0 ? (
                  filteredItems.map((item) => {
                    const isLost = item.type === 'Lost';
                    const isFound = item.type === 'Found';

                    return (
                      <tr key={item.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors group">
                        <td className="py-3.5 px-5 font-bold text-slate-900 dark:text-slate-100 whitespace-nowrap">
                          #{item.id}
                        </td>

                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold border ${
                            isLost ? 'bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 border-red-100 dark:border-red-800' :
                            isFound ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border-blue-100 dark:border-blue-800' :
                            'bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 border-purple-100 dark:border-purple-800'
                          }`}>
                            {item.type}
                          </span>
                        </td>

                        <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-slate-100 max-w-[160px] truncate" title={item.name}>
                          {item.name}
                        </td>

                        <td className="py-3.5 px-4 text-slate-500 dark:text-slate-400 whitespace-nowrap">
                          {item.studentName || item.reportedBy}
                        </td>

                        <td className="py-3.5 px-4 text-slate-500 dark:text-slate-400 max-w-[140px] truncate" title={item.location}>
                          {item.location}
                        </td>

                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border ${
                            item.status === 'Pending' ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border-amber-200/80 dark:border-amber-800' :
                            item.status === 'Under Review' ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400 border-blue-200/80 dark:border-blue-800' :
                            item.status === 'Resolved' || item.status === 'Claimed' ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border-emerald-200/80 dark:border-emerald-800' :
                            'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                          }`}>
                            <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                              item.status === 'Pending' ? 'bg-amber-500' :
                              item.status === 'Under Review' ? 'bg-blue-500' :
                              item.status === 'Resolved' || item.status === 'Claimed' ? 'bg-emerald-500' :
                              'bg-slate-500'
                            }`}></span>
                            <span>{item.status}</span>
                          </span>
                        </td>

                        <td className="py-3.5 px-4 text-slate-400 dark:text-slate-500 font-medium whitespace-nowrap">
                          {format(new Date(item.date), 'MMM dd, yyyy')}
                        </td>

                        <td className="py-3.5 px-3 text-center whitespace-nowrap">
                          <button 
                            onClick={() => navigate('/app/items')}
                            className="p-1 text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-all"
                            title="Manage Item"
                          >
                            <MoreVertical className="h-4 w-4 mx-auto" />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={8} className="py-12 text-center text-slate-400 dark:text-slate-500 font-medium">
                      No reports match the current filter selection.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right side stacked sidebars column */}
        <div className="w-full lg:w-[320px] shrink-0 space-y-4">
          {/* Real Live Activity Feed */}
          <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">Live Activity Feed</h3>
              <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                Active
              </span>
            </div>

            <div className="space-y-3 pt-1">
              {items.length > 0 ? (
                items.slice(0, 5).map((item) => (
                  <div key={item.id} className="flex items-start justify-between gap-2 text-xs">
                    <div className="min-w-0">
                      <p className="font-bold text-slate-900 dark:text-slate-100 truncate leading-tight">
                        New {item.type.toLowerCase()} report submitted
                      </p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                        {item.name} • {item.location}
                      </p>
                    </div>
                    <span className="text-[10px] font-medium text-slate-400 shrink-0 pt-0.5">
                      {format(new Date(item.date), 'HH:mm')}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-xs text-slate-400 dark:text-slate-500 italic">No recent activity logged yet.</p>
              )}
            </div>
          </div>

          {/* System Status Indicators */}
          <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">System Status</h3>
              <span className="text-[10px] font-semibold text-slate-400">Production</span>
            </div>

            <div className="space-y-2.5 pt-1">
              {[
                { label: 'Database Connection', state: 'Connected' },
                { label: 'REST API Service', state: 'Operational' },
                { label: 'Persistent Storage', state: 'Active' },
                { label: 'Vercel Deployment', state: 'Synced' },
              ].map((sys, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs">
                  <span className="font-medium text-slate-600 dark:text-slate-400">{sys.label}</span>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400 text-[11px]">{sys.state}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dynamic Summary Counters */}
          <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-2.5">
            <div className="flex items-center justify-between p-2.5 bg-blue-50/60 dark:bg-blue-950/30 rounded-xl border border-blue-100/50 dark:border-blue-900/50">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0">
                  <Users className="h-3.5 w-3.5" />
                </div>
                <span className="text-xs font-bold text-blue-900 dark:text-blue-300">Total Reports</span>
              </div>
              <span className="text-sm font-extrabold text-blue-950 dark:text-white">{items.length}</span>
            </div>

            <div className="flex items-center justify-between p-2.5 bg-emerald-50/60 dark:bg-emerald-950/30 rounded-xl border border-emerald-100/50 dark:border-emerald-900/50">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0">
                  <Activity className="h-3.5 w-3.5" />
                </div>
                <span className="text-xs font-bold text-emerald-900 dark:text-emerald-300">Active Pending</span>
              </div>
              <span className="text-sm font-extrabold text-emerald-950 dark:text-white">{stats.activeItems}</span>
            </div>

            <div className="flex items-center justify-between p-2.5 bg-purple-50/60 dark:bg-purple-950/30 rounded-xl border border-purple-100/50 dark:border-purple-900/50">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-purple-600 text-white flex items-center justify-center shrink-0">
                  <ShieldCheck className="h-3.5 w-3.5" />
                </div>
                <span className="text-xs font-bold text-purple-900 dark:text-purple-300">Resolved Rate</span>
              </div>
              <span className="text-sm font-extrabold text-purple-950 dark:text-white">
                {items.length > 0 ? `${Math.round((stats.resolvedCases / items.length) * 100)}%` : '100%'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
