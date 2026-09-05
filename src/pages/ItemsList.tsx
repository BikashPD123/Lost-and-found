import React, { useState } from 'react';
import { useItems } from '../hooks/useItems';
import { useAuth } from '../context/AuthContext';
import { type ItemStatus, type ItemType, type Item } from '../data/mockData';
import { format } from 'date-fns';
import { 
  Search, 
  MoreVertical, 
  CheckCircle, 
  Image as ImageIcon, 
  FileX, 
  FileDown, 
  Plus, 
  Eye, 
  Edit3, 
  X, 
  Calendar, 
  MapPin, 
  User, 
  Tag, 
  Check, 
  AlertCircle 
} from 'lucide-react';
import { generateItemReport } from '../lib/pdfGenerator';
import { cn } from '../lib/utils';

export const ItemsList = () => {
  const { items, updateItemStatus, deleteItem, updateItem, addItem } = useItems();
  const { user } = useAuth();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<ItemType | 'All'>('All');
  const [filterStatus, setFilterStatus] = useState<ItemStatus | 'All'>('All');

  // Modals state
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [editingItem, setEditingItem] = useState<Item | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Add Item form state
  const [newItemName, setNewItemName] = useState('');
  const [newItemType, setNewItemType] = useState<ItemType>('Lost');
  const [newItemLocation, setNewItemLocation] = useState('');
  const [newItemDescription, setNewItemDescription] = useState('');
  const [newItemImage, setNewItemImage] = useState('');

  // Edit Item form state
  const [editName, setEditName] = useState('');
  const [editLocation, setEditLocation] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editStatus, setEditStatus] = useState<ItemStatus>('Pending');
  const [editType, setEditType] = useState<ItemType>('Lost');

  const isAdmin = user?.role === 'Admin';

  const filteredItems = items.filter(item => {
    const isOwner = isAdmin || item.reportedBy === user?.email;
    if (!isOwner) return false;

    const matchesSearch = 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      item.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = filterType === 'All' || item.type === filterType;
    const matchesStatus = filterStatus === 'All' || item.status === filterStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const handleClaim = (id: string) => {
    updateItemStatus(id, 'Claimed');
    if (selectedItem?.id === id) {
      setSelectedItem(prev => prev ? { ...prev, status: 'Claimed' } : null);
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this item report?')) {
      deleteItem(id);
      if (selectedItem?.id === id) setSelectedItem(null);
      if (editingItem?.id === id) setEditingItem(null);
    }
  };

  const openEditModal = (item: Item) => {
    setEditingItem(item);
    setEditName(item.name);
    setEditLocation(item.location);
    setEditDescription(item.description || '');
    setEditStatus(item.status);
    setEditType(item.type);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    updateItem(editingItem.id, {
      name: editName,
      location: editLocation,
      description: editDescription,
      status: editStatus,
      type: editType
    });

    if (selectedItem?.id === editingItem.id) {
      setSelectedItem(prev => prev ? {
        ...prev,
        name: editName,
        location: editLocation,
        description: editDescription,
        status: editStatus,
        type: editType
      } : null);
    }

    setEditingItem(null);
  };

  const handleCreateItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName || !newItemLocation) return;

    addItem({
      name: newItemName,
      type: newItemType,
      location: newItemLocation,
      description: newItemDescription || `${newItemType} item reported on campus.`,
      image: newItemImage || undefined,
      date: new Date().toISOString(),
      studentName: user?.name || 'Student User',
      studentId: user?.studentId || 'STU-' + Math.floor(100000 + Math.random() * 900000),
      reportedBy: user?.email || 'user@university.edu'
    });

    // Reset form
    setNewItemName('');
    setNewItemLocation('');
    setNewItemDescription('');
    setNewItemImage('');
    setIsAddModalOpen(false);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Title & Add Item Action */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-secondary-900 dark:text-white tracking-tight">
            Items Directory
          </h1>
          <p className="text-secondary-500 dark:text-slate-400 mt-1 text-sm sm:text-base font-medium">
            Manage and track all {isAdmin ? 'university' : 'your'} lost and found items.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-bold rounded-2xl shadow-lg shadow-blue-600/25 transition-all text-sm"
        >
          <Plus className="h-4 w-4 stroke-[3]" />
          <span>Report New Item</span>
        </button>
      </div>

      {/* Filter and Search Bar Container */}
      <div className="glass-panel rounded-3xl p-4 sm:p-6 space-y-4 bg-white/60 dark:bg-slate-900/60 dark:border-slate-800">
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          
          {/* Search Input */}
          <div className="relative flex-1 group">
            <Search className="h-4 w-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-secondary-400 dark:text-slate-500 group-focus-within:text-primary-600 transition-colors" />
            <input 
              type="text" 
              placeholder="Search by name, ID, or location..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-secondary-50/70 dark:bg-slate-800/80 border border-secondary-200/80 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-secondary-900 dark:text-slate-100 placeholder-secondary-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:bg-white dark:focus:bg-slate-800 transition-all font-medium"
            />
          </div>
          
          {/* Filters Row */}
          <div className="flex flex-row gap-2.5 w-full md:w-auto">
            {/* Category / Type Select */}
            <div className="flex-1 md:w-36">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value as ItemType | 'All')}
                className="w-full px-3 py-3 bg-white dark:bg-slate-800 border border-secondary-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm font-bold text-secondary-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
              >
                <option value="All">All Types</option>
                <option value="Lost">Lost Only</option>
                <option value="Found">Found Only</option>
              </select>
            </div>

            {/* Status Select */}
            <div className="flex-1 md:w-40">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as ItemStatus | 'All')}
                className="w-full px-3 py-3 bg-white dark:bg-slate-800 border border-secondary-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm font-bold text-secondary-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
              >
                <option value="All">All Statuses</option>
                <option value="Pending">Pending</option>
                <option value="Assigned">Assigned</option>
                <option value="Claimed">Claimed</option>
                <option value="Expired">Expired</option>
                <option value="Under Review">Under Review</option>
                <option value="Resolved">Resolved</option>
              </select>
            </div>
          </div>
        </div>

        {/* Counter Summary */}
        <div className="flex items-center justify-between text-xs text-secondary-500 dark:text-slate-400 px-1 pt-1 border-t border-secondary-100 dark:border-slate-800">
          <span>Showing <strong className="text-secondary-800 dark:text-slate-200 font-bold">{filteredItems.length}</strong> items</span>
          {(searchTerm || filterType !== 'All' || filterStatus !== 'All') && (
            <button
              onClick={() => { setSearchTerm(''); setFilterType('All'); setFilterStatus('All'); }}
              className="text-blue-600 dark:text-blue-400 font-bold hover:underline"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Item Display Container */}
      <div className="bg-white dark:bg-slate-900 border border-secondary-200/80 dark:border-slate-800 rounded-3xl overflow-hidden shadow-xs">
        
        {/* MOBILE CARD VIEW (< 768px) */}
        <div className="block md:hidden divide-y divide-secondary-100 dark:divide-slate-800">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <div key={item.id} className="p-4 space-y-3.5 hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors">
                <div className="flex items-start gap-3">
                  {/* Thumbnail */}
                  <div 
                    onClick={() => setSelectedItem(item)}
                    className="h-16 w-16 rounded-2xl bg-secondary-100 dark:bg-slate-800 border border-secondary-200 dark:border-slate-700 shrink-0 overflow-hidden flex items-center justify-center cursor-pointer"
                  >
                    {item.image ? (
                      <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                    ) : (
                      <ImageIcon className="h-6 w-6 text-secondary-400 dark:text-slate-500" />
                    )}
                  </div>

                  {/* Title & Badges */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h3 
                        onClick={() => setSelectedItem(item)}
                        className="font-bold text-secondary-900 dark:text-slate-100 text-sm truncate cursor-pointer hover:text-blue-600 dark:hover:text-blue-400"
                      >
                        {item.name}
                      </h3>
                      <span className={cn(
                        "px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider shrink-0 border",
                        item.type === 'Lost' ? "bg-red-50 dark:bg-red-950/50 text-red-600 dark:text-red-400 border-red-200 dark:border-red-800" :
                        item.type === 'Found' ? "bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800" :
                        "bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-800"
                      )}>
                        {item.type}
                      </span>
                    </div>

                    <p className="text-secondary-400 dark:text-slate-500 text-[11px] font-semibold mt-0.5">
                      #{item.id} • {item.studentId}
                    </p>

                    <div className="flex items-center gap-3 text-xs text-secondary-600 dark:text-slate-400 mt-1.5">
                      <span className="flex items-center gap-1 truncate">
                        <MapPin className="h-3 w-3 text-secondary-400 shrink-0" />
                        {item.location}
                      </span>
                      <span className="flex items-center gap-1 shrink-0 text-[11px]">
                        <Calendar className="h-3 w-3 text-secondary-400 shrink-0" />
                        {format(new Date(item.date), 'MMM dd')}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Status & Actions Footer */}
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-2">
                  <span className={cn(
                    "inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-[11px] font-bold border",
                    item.status === 'Pending' ? "bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800" :
                    item.status === 'Claimed' ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800" :
                    item.status === 'Assigned' ? "bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800" :
                    "bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700"
                  )}>
                    <span className={cn(
                      "w-1.5 h-1.5 rounded-full shrink-0",
                      item.status === 'Pending' ? "bg-amber-500" :
                      item.status === 'Claimed' ? "bg-emerald-500" :
                      item.status === 'Assigned' ? "bg-blue-500" : "bg-slate-400"
                    )} />
                    {item.status}
                  </span>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setSelectedItem(item)}
                      className="p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                      title="View Details"
                    >
                      <Eye className="h-4 w-4" />
                    </button>

                    {item.status === 'Pending' && (
                      <button 
                        onClick={() => handleClaim(item.id)}
                        className="p-2 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/50 rounded-lg transition-colors"
                        title="Mark Claimed"
                      >
                        <CheckCircle className="h-4 w-4" />
                      </button>
                    )}

                    <button 
                      onClick={() => openEditModal(item)}
                      className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/50 rounded-lg transition-colors"
                      title="Edit Item"
                    >
                      <Edit3 className="h-4 w-4" />
                    </button>

                    {isAdmin && (
                      <button 
                        onClick={() => generateItemReport(item)}
                        className="p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                        title="Download PDF"
                      >
                        <FileDown className="h-4 w-4" />
                      </button>
                    )}

                    <button 
                      onClick={() => handleDelete(item.id)}
                      className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/50 rounded-lg transition-colors"
                      title="Delete Item"
                    >
                      <FileX className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-secondary-500 dark:text-slate-400 text-sm">
              No items found matching your search and filters.
            </div>
          )}
        </div>

        {/* DESKTOP TABLE VIEW (>= 768px) */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-secondary-50/70 dark:bg-slate-800/60 border-b border-secondary-200/80 dark:border-slate-800">
                <th className="px-6 py-4 text-[10px] font-black text-secondary-500 dark:text-slate-400 uppercase tracking-[0.2em]">Item Details</th>
                <th className="px-6 py-4 text-[10px] font-black text-secondary-500 dark:text-slate-400 uppercase tracking-[0.2em]">Type</th>
                <th className="px-6 py-4 text-[10px] font-black text-secondary-500 dark:text-slate-400 uppercase tracking-[0.2em]">Location</th>
                <th className="px-6 py-4 text-[10px] font-black text-secondary-500 dark:text-slate-400 uppercase tracking-[0.2em]">Status</th>
                <th className="px-6 py-4 text-[10px] font-black text-secondary-500 dark:text-slate-400 uppercase tracking-[0.2em]">Date Reported</th>
                <th className="px-6 py-4 text-[10px] font-black text-secondary-500 dark:text-slate-400 uppercase tracking-[0.2em] text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-secondary-100 dark:divide-slate-800">
              {filteredItems.length > 0 ? (
                filteredItems.map((item) => (
                  <tr key={item.id} className="hover:bg-primary-50/20 dark:hover:bg-slate-800/40 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3.5">
                        <div 
                          onClick={() => setSelectedItem(item)}
                          className="h-12 w-12 rounded-xl bg-secondary-50 dark:bg-slate-800 border border-secondary-200 dark:border-slate-700 flex-shrink-0 overflow-hidden flex items-center justify-center cursor-pointer group-hover:border-primary-300 transition-colors"
                        >
                          {item.image ? (
                            <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                          ) : (
                            <ImageIcon className="h-5 w-5 text-secondary-400 dark:text-slate-500" />
                          )}
                        </div>
                        <div>
                          <div 
                            onClick={() => setSelectedItem(item)}
                            className="font-bold text-secondary-900 dark:text-slate-100 text-sm cursor-pointer hover:text-blue-600 dark:hover:text-blue-400"
                          >
                            {item.name}
                          </div>
                          <div className="text-secondary-400 dark:text-slate-500 text-xs mt-0.5 font-semibold tracking-wider">
                            #{item.id} • {item.studentId}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={cn(
                        "inline-flex items-center px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border shadow-2xs",
                        item.type === 'Lost' ? "bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 border-red-200 dark:border-red-800" :
                        item.type === 'Found' ? "bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800" :
                        "bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-800"
                      )}>
                        {item.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs font-bold text-secondary-600 dark:text-slate-300">
                      {item.location}
                    </td>
                    <td className="px-6 py-4">
                      <span className={cn(
                        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-bold border shadow-2xs",
                        item.status === 'Pending' ? "bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800" :
                        item.status === 'Claimed' ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800" :
                        item.status === 'Assigned' ? "bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800" :
                        "bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700"
                      )}>
                        {item.status === 'Assigned' ? `Assigned (${item.assignedTo})` : item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs font-semibold text-secondary-500 dark:text-slate-400 uppercase tracking-tight">
                      {format(new Date(item.date), 'MMM dd, yyyy')}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => setSelectedItem(item)}
                          className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all"
                          title="View Details"
                        >
                          <Eye className="h-4.5 w-4.5" />
                        </button>

                        {item.status === 'Pending' && (
                          <button 
                            onClick={() => handleClaim(item.id)}
                            className="p-2 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 rounded-xl transition-all"
                            title="Mark Claimed"
                          >
                            <CheckCircle className="h-4.5 w-4.5" />
                          </button>
                        )}

                        <button 
                          onClick={() => openEditModal(item)}
                          className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/40 rounded-xl transition-all"
                          title="Edit Item"
                        >
                          <Edit3 className="h-4.5 w-4.5" />
                        </button>

                        {isAdmin && (
                          <button 
                            onClick={() => generateItemReport(item)}
                            className="p-2 text-secondary-600 hover:bg-secondary-50 dark:hover:bg-slate-800 rounded-xl transition-all"
                            title="Download PDF Report"
                          >
                            <FileDown className="h-4.5 w-4.5" />
                          </button>
                        )}

                        <button 
                          onClick={() => handleDelete(item.id)}
                          className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-xl transition-all"
                          title="Delete Item"
                        >
                          <FileX className="h-4.5 w-4.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-secondary-500 dark:text-slate-400">
                    No items found matching your search and filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* VIEW DETAILS MODAL */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl space-y-0">
            {/* Header */}
            <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/40">
              <div className="flex items-center gap-2">
                <Tag className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                <h3 className="font-bold text-slate-900 dark:text-white text-base">Item Details</h3>
              </div>
              <button 
                onClick={() => setSelectedItem(null)}
                className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
              {/* Image Banner */}
              {selectedItem.image ? (
                <div className="h-48 w-full rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800">
                  <img src={selectedItem.image} alt={selectedItem.name} className="w-full h-full object-cover" />
                </div>
              ) : null}

              <div>
                <div className="flex items-center justify-between gap-2">
                  <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">{selectedItem.name}</h2>
                  <span className={cn(
                    "px-3 py-1 rounded-lg text-xs font-black uppercase tracking-wider border",
                    selectedItem.type === 'Lost' ? "bg-red-50 text-red-600 border-red-200" : "bg-blue-50 text-blue-600 border-blue-200"
                  )}>
                    {selectedItem.type}
                  </span>
                </div>
                <p className="text-xs text-slate-400 font-bold tracking-wider mt-1">ID: #{selectedItem.id}</p>
              </div>

              <div className="grid grid-cols-2 gap-3 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800 text-xs">
                <div>
                  <span className="text-slate-400 font-semibold block">Location</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200 mt-0.5 block">{selectedItem.location}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold block">Status</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200 mt-0.5 block">{selectedItem.status}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold block">Date Reported</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200 mt-0.5 block">{format(new Date(selectedItem.date), 'PPP')}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold block">Reported By</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200 mt-0.5 block">{selectedItem.studentName} ({selectedItem.studentId})</span>
                </div>
              </div>

              {selectedItem.description && (
                <div className="space-y-1">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Description</span>
                  <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50/50 dark:bg-slate-800/30 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                    {selectedItem.description}
                  </p>
                </div>
              )}
            </div>

            {/* Footer Actions */}
            <div className="p-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3 bg-slate-50/50 dark:bg-slate-800/40">
              <button
                onClick={() => { setSelectedItem(null); openEditModal(selectedItem); }}
                className="px-4 py-2.5 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 font-bold rounded-xl text-xs hover:bg-blue-100 transition-colors"
              >
                Edit Details
              </button>
              <button
                onClick={() => setSelectedItem(null)}
                className="px-5 py-2.5 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold rounded-xl text-xs hover:opacity-90 transition-opacity"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT ITEM MODAL */}
      {editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl space-y-0">
            {/* Header */}
            <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/40">
              <h3 className="font-bold text-slate-900 dark:text-white text-base">Edit Item #{editingItem.id}</h3>
              <button 
                onClick={() => setEditingItem(null)}
                className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSaveEdit} className="p-6 space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-600 dark:text-slate-400">Item Name</label>
                <input 
                  type="text" 
                  required
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-400">Category / Type</label>
                  <select
                    value={editType}
                    onChange={(e) => setEditType(e.target.value as ItemType)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Lost">Lost</option>
                    <option value="Found">Found</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-400">Status</label>
                  <select
                    value={editStatus}
                    onChange={(e) => setEditStatus(e.target.value as ItemStatus)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Assigned">Assigned</option>
                    <option value="Claimed">Claimed</option>
                    <option value="Expired">Expired</option>
                    <option value="Under Review">Under Review</option>
                    <option value="Resolved">Resolved</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-600 dark:text-slate-400">Location</label>
                <input 
                  type="text" 
                  required
                  value={editLocation}
                  onChange={(e) => setEditLocation(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-600 dark:text-slate-400">Description</label>
                <textarea 
                  rows={3}
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-4 py-2.5 text-slate-600 dark:text-slate-300 font-bold rounded-xl text-xs hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-blue-600 text-white font-bold rounded-xl text-xs shadow-md shadow-blue-600/20 hover:bg-blue-700 transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* REPORT NEW ITEM MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl space-y-0">
            {/* Header */}
            <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/40">
              <h3 className="font-bold text-slate-900 dark:text-white text-base">Report New Lost or Found Item</h3>
              <button 
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleCreateItem} className="p-6 space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-600 dark:text-slate-400">Item Title / Name *</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Blue Backpack, iPhone 14, Silver Keys"
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-400">Report Type *</label>
                  <select
                    value={newItemType}
                    onChange={(e) => setNewItemType(e.target.value as ItemType)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Lost">Lost Item</option>
                    <option value="Found">Found Item</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-400">Location *</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. Main Library, Bus Stand"
                    value={newItemLocation}
                    onChange={(e) => setNewItemLocation(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-600 dark:text-slate-400">Image URL <span className="text-slate-400 font-normal">(optional)</span></label>
                <input 
                  type="url" 
                  placeholder="https://example.com/item.jpg"
                  value={newItemImage}
                  onChange={(e) => setNewItemImage(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-600 dark:text-slate-400">Description</label>
                <textarea 
                  rows={3}
                  placeholder="Provide distinct marks, color, brand, or details..."
                  value={newItemDescription}
                  onChange={(e) => setNewItemDescription(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2.5 text-slate-600 dark:text-slate-300 font-bold rounded-xl text-xs hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-blue-600 text-white font-bold rounded-xl text-xs shadow-md shadow-blue-600/20 hover:bg-blue-700 transition-colors"
                >
                  Submit Item Report
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
