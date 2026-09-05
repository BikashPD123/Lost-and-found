import React, { useState } from 'react';
import { useItems } from '../hooks/useItems';
import { StatCard } from '../components/StatCard';
import { useAuth } from '../context/AuthContext';
import { Navigate, useNavigate } from 'react-router-dom';
import { 
  Calendar, 
  AlertTriangle, 
  PackageSearch, 
  Clock, 
  CheckCircle, 
  MoreVertical, 
  Plus,
  Inbox,
  Eye,
  Trash2,
  Edit3
} from 'lucide-react';
import { format } from 'date-fns';

export const Dashboard = () => {
  const { user } = useAuth();
  const { items, getDashboardStats, deleteItem, updateItemStatus } = useItems();
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

  const handleDelete = (id: string) => {
    if (window.confirm(`Are you sure you want to delete report #${id}?`)) {
      deleteItem(id);
    }
  };

  const handleResolve = (id: string) => {
    updateItemStatus(id, 'Resolved');
  };

  return (
    <div className="space-y-6 pb-12 bg-[#F4F6F8] dark:bg-slate-950 min-h-full font-sans text-slate-800 dark:text-slate-100 -m-4 sm:-m-8 lg:-m-10 p-4 sm:p-8 lg:p-10 transition-colors duration-300">
      {/* Top Title & Quick Actions Row */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            Super Admin Dashboard
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-medium">
            Live database records & reports submitted by application users.
          </p>
        </div>
        
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button 
            onClick={() => navigate('/app/report-lost')}
            className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-600/20 transition-all"
          >
            <Plus className="h-4 w-4" />
            <span>Report Lost Item</span>
          </button>

          <div className="flex items-center gap-2 px-3.5 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 shadow-2xs">
            <Calendar className="h-4 w-4 text-slate-400 dark:text-slate-500" />
            <span>{format(new Date(), 'MMM dd, yyyy')}</span>
          </div>
        </div>
      </div>

      {/* 4 Core Dynamic Stat Cards (Computed Strictly from Real Database Records) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Total Lost Items" 
          value={stats.totalLost.toString()} 
          icon={<AlertTriangle className="h-5 w-5" />} 
          trend={stats.totalLost > 0 ? "Real Data" : "0"} 
          trendUp={true}
          iconBg="bg-blue-50 dark:bg-blue-950/50"
          iconColor="text-blue-600 dark:text-blue-400"
          subtitle="Submitted lost reports"
        />
        <StatCard 
          title="Total Found Items" 
          value={stats.totalFound.toString()} 
          icon={<PackageSearch className="h-5 w-5" />} 
          trend={stats.totalFound > 0 ? "Real Data" : "0"} 
          trendUp={true}
          iconBg="bg-emerald-50 dark:bg-emerald-950/50"
          iconColor="text-emerald-600 dark:text-emerald-400"
          subtitle="Submitted found items"
        />
        <StatCard 
          title="Pending Reports" 
          value={stats.pendingClaims.toString()} 
          icon={<Clock className="h-5 w-5" />} 
          trend="Real Data" 
          trendUp={true}
          iconBg="bg-amber-50 dark:bg-amber-950/50"
          iconColor="text-amber-600 dark:text-amber-400"
          subtitle="Awaiting resolution"
        />
        <StatCard 
          title="Resolved Reports" 
          value={stats.resolvedCases.toString()} 
          icon={<CheckCircle className="h-5 w-5" />} 
          trend="Real Data" 
          trendUp={true}
          iconBg="bg-purple-50 dark:bg-purple-950/50"
          iconColor="text-purple-600 dark:text-purple-400"
          subtitle="Successfully returned"
        />
      </div>

      {/* Zero Data Empty State Banner */}
      {items.length === 0 ? (
        <div className="p-10 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl text-center space-y-4 shadow-sm">
          <div className="w-14 h-14 bg-blue-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center mx-auto text-blue-600 dark:text-blue-400">
            <Inbox className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">No lost item reports yet</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto leading-relaxed mt-1">
              When users submit lost or found reports from their phone or app, they will automatically be saved to the database and appear here dynamically.
            </p>
          </div>
          <button
            onClick={() => navigate('/app/report-lost')}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs shadow-md transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Submit First Lost Report</span>
          </button>
        </div>
      ) : (
        /* Real Database Records Table */
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-hidden transition-colors duration-300">
          {/* Table Header & Category Tabs */}
          <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-slate-50/50 dark:bg-slate-800/40">
            <div className="flex items-center gap-1 overflow-x-auto w-full sm:w-auto">
              {(['All', 'Lost Reports', 'Found Items', 'Claims'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                    activeTab === tab
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <button 
              onClick={() => navigate('/app/items')}
              className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline shrink-0"
            >
              Full Items Directory →
            </button>
          </div>

          {/* Table contents */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/70 dark:bg-slate-800/60 border-b border-slate-100 dark:border-slate-800 text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider select-none">
                  <th className="py-4 px-6">ID</th>
                  <th className="py-4 px-4">Type</th>
                  <th className="py-4 px-4">Item Name</th>
                  <th className="py-4 px-4">Reported By</th>
                  <th className="py-4 px-4">Location</th>
                  <th className="py-4 px-4">Status</th>
                  <th className="py-4 px-4">Date</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs text-slate-700 dark:text-slate-300">
                {filteredItems.length > 0 ? (
                  filteredItems.map((item) => {
                    const isLost = item.type === 'Lost';

                    return (
                      <tr key={item.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                        <td className="py-4 px-6 font-bold text-slate-900 dark:text-slate-100 whitespace-nowrap">
                          #{item.id}
                        </td>

                        <td className="py-4 px-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider border ${
                            isLost ? 'bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 border-red-200 dark:border-red-800' :
                            'bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800'
                          }`}>
                            {item.type}
                          </span>
                        </td>

                        <td className="py-4 px-4 font-bold text-slate-900 dark:text-slate-100 max-w-[160px] truncate" title={item.name}>
                          {item.name}
                        </td>

                        <td className="py-4 px-4 text-slate-600 dark:text-slate-400 whitespace-nowrap">
                          {item.studentName || item.reportedBy}
                        </td>

                        <td className="py-4 px-4 text-slate-600 dark:text-slate-400 max-w-[140px] truncate" title={item.location}>
                          {item.location}
                        </td>

                        <td className="py-4 px-4 whitespace-nowrap">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border ${
                            item.status === 'Pending' ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800' :
                            item.status === 'Resolved' || item.status === 'Claimed' ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800' :
                            'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                          }`}>
                            <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                              item.status === 'Pending' ? 'bg-amber-500' :
                              item.status === 'Resolved' || item.status === 'Claimed' ? 'bg-emerald-500' :
                              'bg-slate-400'
                            }`}></span>
                            <span>{item.status}</span>
                          </span>
                        </td>

                        <td className="py-4 px-4 text-slate-500 dark:text-slate-400 font-medium whitespace-nowrap">
                          {format(new Date(item.date), 'MMM dd, yyyy')}
                        </td>

                        <td className="py-4 px-6 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-1.5">
                            <button 
                              onClick={() => navigate('/app/items')}
                              className="p-2 text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-slate-800 rounded-lg transition-colors"
                              title="View & Edit Details"
                            >
                              <Eye className="h-4 w-4" />
                            </button>

                            {item.status === 'Pending' && (
                              <button 
                                onClick={() => handleResolve(item.id)}
                                className="p-2 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 rounded-lg transition-colors"
                                title="Mark Resolved"
                              >
                                <CheckCircle className="h-4 w-4" />
                              </button>
                            )}

                            <button 
                              onClick={() => handleDelete(item.id)}
                              className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-lg transition-colors"
                              title="Delete Report"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={8} className="py-12 text-center text-slate-400 dark:text-slate-500 font-medium">
                      No reports match the current selection.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
