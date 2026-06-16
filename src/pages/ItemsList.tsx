import React, { useState } from 'react';
import { useItems } from '../hooks/useItems';
import { useAuth } from '../context/AuthContext';
import { type ItemStatus, type ItemType } from '../data/mockData';
import { format } from 'date-fns';
import { Search, Filter, MoreVertical, CheckCircle, Image as ImageIcon, FileX, FileDown } from 'lucide-react';
import { generateItemReport } from '../lib/pdfGenerator';
import { cn } from '../lib/utils';

export const ItemsList = () => {
  const { items, updateItemStatus, deleteItem, updateItem } = useItems();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<ItemType | 'All'>('All');
  const [filterStatus, setFilterStatus] = useState<ItemStatus | 'All'>('All');

  const isAdmin = user?.role === 'Admin';

  const filteredItems = items.filter(item => {
    const isOwner = isAdmin || item.reportedBy === user?.email;
    if (!isOwner) return false;

    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.studentId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'All' || item.type === filterType;
    const matchesStatus = filterStatus === 'All' || item.status === filterStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const handleClaim = (id: string) => {
    updateItemStatus(id, 'Claimed');
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this report?')) {
      deleteItem(id);
    }
  };

  const handleEdit = (id: string) => {
    const newName = window.prompt('Enter new name:');
    if (newName) {
      updateItem(id, { name: newName });
    }
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h1 className="text-4xl font-extrabold text-secondary-900 tracking-tight">Items Directory</h1>
          <p className="text-secondary-500 mt-2 text-lg font-medium">Manage and track all {isAdmin ? 'university' : 'your'} lost and found items.</p>
        </div>
      </div>

      <div className="glass-panel rounded-[2.5rem] overflow-hidden">
        <div className="p-8 border-b border-secondary-100 flex flex-col lg:flex-row gap-6 items-center justify-between bg-white/40">
          <div className="relative w-full lg:max-w-md group">
            <Search className="h-5 w-5 absolute left-4 top-1/2 -translate-y-1/2 text-secondary-400 group-focus-within:text-primary-600 transition-colors" />
            <input 
              type="text" 
              placeholder="Search by name or ID..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-secondary-50/50 border border-secondary-100 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:bg-white transition-all font-medium"
            />
          </div>
          
          <div className="flex w-full lg:w-auto gap-4">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as ItemType | 'All')}
              className="flex-1 lg:w-40 appearance-none px-4 py-3 bg-white border border-secondary-100 rounded-2xl text-sm font-bold text-secondary-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="All">All Types</option>
              <option value="Lost">Lost</option>
              <option value="Found">Found</option>
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as ItemStatus | 'All')}
              className="flex-1 lg:w-40 appearance-none px-4 py-3 bg-white border border-secondary-100 rounded-2xl text-sm font-bold text-secondary-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="All">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Assigned">Assigned</option>
              <option value="Claimed">Claimed</option>
              <option value="Expired">Expired</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-secondary-50/50 border-b border-secondary-100">
                <th className="px-8 py-5 text-[10px] font-black text-secondary-500 uppercase tracking-[0.2em]">Item Details</th>
                <th className="px-8 py-5 text-[10px] font-black text-secondary-500 uppercase tracking-[0.2em]">Category</th>
                <th className="px-8 py-5 text-[10px] font-black text-secondary-500 uppercase tracking-[0.2em]">Location</th>
                <th className="px-8 py-5 text-[10px] font-black text-secondary-500 uppercase tracking-[0.2em]">Status</th>
                <th className="px-8 py-5 text-[10px] font-black text-secondary-500 uppercase tracking-[0.2em]">Date Reported</th>
                <th className="px-8 py-5 text-[10px] font-black text-secondary-500 uppercase tracking-[0.2em] text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-secondary-50">
              {filteredItems.length > 0 ? (
                filteredItems.map((item) => (
                  <tr key={item.id} className="hover:bg-primary-50/20 transition-colors group">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="h-14 w-14 rounded-2xl bg-white border-2 border-secondary-100 flex-shrink-0 overflow-hidden flex items-center justify-center group-hover:border-primary-200 transition-colors">
                          {item.image ? (
                            <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                          ) : (
                            <ImageIcon className="h-6 w-6 text-secondary-300" />
                          )}
                        </div>
                        <div>
                          <div className="font-bold text-secondary-900 text-base">{item.name}</div>
                          <div className="text-secondary-400 text-xs mt-0.5 font-bold tracking-wider">{item.id} • {item.studentId}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className={cn(
                        "inline-flex items-center px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border shadow-sm",
                        item.type === 'Lost' ? "bg-red-50 text-red-600 border-red-100" : "bg-primary-50 text-primary-600 border-primary-100"
                      )}>
                        {item.type}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-sm font-bold text-secondary-600">
                      {item.location}
                    </td>
                    <td className="px-8 py-6">
                      <span className={cn(
                        "inline-flex items-center px-3 py-1 rounded-xl text-xs font-bold border shadow-sm",
                        item.status === 'Pending' ? "bg-amber-50 text-amber-600 border-amber-100" :
                        item.status === 'Claimed' ? "bg-emerald-50 text-emerald-600 border-emerald-100" :
                        item.status === 'Assigned' ? "bg-primary-50 text-primary-600 border-primary-100" :
                        "bg-red-50 text-red-600 border-red-100"
                      )}>
                        {item.status === 'Assigned' ? `Assigned (${item.assignedTo})` : item.status}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-sm font-bold text-secondary-500 uppercase tracking-tighter">
                      {format(new Date(item.date), 'MMM dd, yyyy')}
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {item.status === 'Pending' && (
                          <button 
                            onClick={() => handleClaim(item.id)}
                            className="p-2.5 text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all"
                            title="Mark Claimed"
                          >
                            <CheckCircle className="h-5 w-5" />
                          </button>
                        )}
                        <button 
                          onClick={() => handleEdit(item.id)}
                          className="p-2.5 text-primary-600 hover:bg-primary-50 rounded-xl transition-all"
                          title="Edit"
                        >
                          <MoreVertical className="h-5 w-5" />
                        </button>
                        {isAdmin && (
                          <button 
                            onClick={() => generateItemReport(item)}
                            className="p-2.5 text-secondary-600 hover:bg-secondary-50 rounded-xl transition-all"
                            title="Download PDF Report"
                          >
                            <FileDown className="h-5 w-5" />
                          </button>
                        )}
                        <button 
                          onClick={() => handleDelete(item.id)}
                          className="p-2.5 text-red-600 hover:bg-red-50 rounded-xl transition-all"
                          title="Delete"
                        >
                          <FileX className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-secondary-500">
                    No items found matching your search and filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
