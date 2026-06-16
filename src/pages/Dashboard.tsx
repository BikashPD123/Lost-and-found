import React, { useState } from 'react';
import { useItems } from '../hooks/useItems';
import { StatCard } from '../components/StatCard';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import { 
  Calendar, 
  ChevronDown, 
  AlertTriangle, 
  PackageSearch, 
  Clock, 
  CheckCircle, 
  MoreVertical, 
  Database, 
  Server, 
  HardDrive, 
  Bell, 
  Mail, 
  Users, 
  Activity, 
  ShieldCheck 
} from 'lucide-react';
import { format } from 'date-fns';
import { type ItemType } from '../data/mockData';

export const Dashboard = () => {
  const { user } = useAuth();
  const { items, getDashboardStats } = useItems();

  if (user?.role !== 'Admin') {
    return <Navigate to="/app/items" replace />;
  }
  const stats = getDashboardStats();

  // Custom table tab management exactly matching screenshot
  const [activeTab, setActiveTab] = useState<'All' | 'Lost Reports' | 'Found Items' | 'Claims'>('All');

  // Filter items dynamically based on selected tab
  const filteredItems = items.filter(item => {
    if (activeTab === 'Lost Reports') return item.type === 'Lost';
    if (activeTab === 'Found Items') return item.type === 'Found';
    if (activeTab === 'Claims') return item.type === 'Claim';
    return true;
  });

  return (
    <div className="space-y-6 pb-12 bg-[#F4F6F8] min-h-full font-sans text-slate-800 -m-6 sm:-m-8 lg:-m-10 p-6 sm:p-8 lg:p-10">
      {/* Top Title & Date Selector Row */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight leading-tight">
            Dashboard Overview
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Monitor and manage all lost & found activities across the campus.
          </p>
        </div>
        
        {/* Date Selector Dropdown Button */}
        <button 
          onClick={() => alert('Selecting custom date ranges...')}
          className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 hover:border-slate-300 rounded-xl text-xs font-semibold text-slate-700 shadow-2xs transition-all duration-200 group"
        >
          <Calendar className="h-4 w-4 text-slate-400 group-hover:text-blue-600 transition-colors" />
          <span>May 6 – May 12, 2025</span>
          <ChevronDown className="h-3.5 w-3.5 text-slate-400 group-hover:text-slate-600 transition-colors ml-0.5" />
        </button>
      </div>

      {/* Stats Cards Row (Grid of 4) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Lost Reports" 
          value={stats.totalLost.toLocaleString()} 
          icon={<AlertTriangle className="h-5 w-5" />} 
          trend="18.6%" 
          trendUp={true}
          iconBg="bg-blue-50"
          iconColor="text-blue-600"
          subtitle="vs last 7 days"
        />
        <StatCard 
          title="Found Items" 
          value={stats.totalFound.toLocaleString()} 
          icon={<PackageSearch className="h-5 w-5" />} 
          trend="12.4%" 
          trendUp={true}
          iconBg="bg-emerald-50"
          iconColor="text-emerald-600"
          subtitle="vs last 7 days"
        />
        <StatCard 
          title="Pending Claims" 
          value={stats.pendingClaims.toLocaleString()} 
          icon={<Clock className="h-5 w-5" />} 
          trend="8.3%" 
          trendUp={true}
          iconBg="bg-amber-50"
          iconColor="text-amber-600"
          subtitle="vs last 7 days"
        />
        <StatCard 
          title="Resolved Cases" 
          value={stats.resolvedCases.toLocaleString()} 
          icon={<CheckCircle className="h-5 w-5" />} 
          trend="22.7%" 
          trendUp={true}
          iconBg="bg-purple-50"
          iconColor="text-purple-600"
          subtitle="vs last 7 days"
        />
      </div>

      {/* Charts Row (Grid of 2) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Left Chart: Activity Overview */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-bold text-slate-900">Activity Overview</h3>
            <button className="flex items-center gap-1.5 px-2.5 py-1 bg-[#F8FAFC] border border-slate-200 hover:bg-slate-50 rounded-lg text-xs font-semibold text-slate-600 transition-colors">
              <span>This Week</span>
              <ChevronDown className="h-3 w-3 text-slate-400" />
            </button>
          </div>

          {/* Custom SVG Line Chart imitating screenshot curves exactly */}
          <div className="relative pt-2 pb-1 flex-1 flex flex-col justify-between">
            {/* Legend inside Chart */}
            <div className="flex items-center justify-end gap-4 text-[11px] font-semibold text-slate-500 mb-2 absolute top-0 right-2 z-10">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-blue-600 inline-block"></span>
                <span>Lost Reports</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-500 inline-block"></span>
                <span>Found Items</span>
              </div>
            </div>

            {/* Graphic area */}
            <div className="relative h-44 w-full mt-4 flex items-end">
              {/* Grid Background */}
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none border-b border-slate-100 pb-5">
                {[250, 200, 150, 100, 50, 0].map((val, idx) => (
                  <div key={idx} className="flex items-center w-full h-0">
                    <span className="text-[9px] font-medium text-slate-400 w-6 text-right pr-2 select-none">{val}</span>
                    <div className="flex-1 border-b border-dashed border-slate-100"></div>
                  </div>
                ))}
              </div>

              {/* Chart Path and Points container */}
              <div className="absolute left-6 right-2 top-2 bottom-5 pointer-events-none">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 400 150" preserveAspectRatio="none">
                  {/* Smooth line for Lost Reports (Blue) */}
                  <path 
                    d="M 10 110 C 60 70, 120 130, 180 50 C 240 20, 300 80, 380 40" 
                    fill="none" 
                    stroke="#2563EB" 
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                  {/* Smooth line for Found Items (Orange) */}
                  <path 
                    d="M 10 130 C 70 110, 130 90, 190 100 C 250 110, 310 60, 380 75" 
                    fill="none" 
                    stroke="#F59E0B" 
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                  {/* Data Points / Dots for Lost Reports */}
                  <circle cx="10" cy="110" r="4.5" fill="#2563EB" stroke="#FFFFFF" strokeWidth="2" />
                  <circle cx="95" cy="100" r="4.5" fill="#2563EB" stroke="#FFFFFF" strokeWidth="2" />
                  <circle cx="180" cy="50" r="4.5" fill="#2563EB" stroke="#FFFFFF" strokeWidth="2" />
                  <circle cx="265" cy="40" r="4.5" fill="#2563EB" stroke="#FFFFFF" strokeWidth="2" />
                  <circle cx="380" cy="40" r="4.5" fill="#2563EB" stroke="#FFFFFF" strokeWidth="2" />

                  {/* Data Points / Dots for Found Items */}
                  <circle cx="10" cy="130" r="4.5" fill="#F59E0B" stroke="#FFFFFF" strokeWidth="2" />
                  <circle cx="120" cy="95" r="4.5" fill="#F59E0B" stroke="#FFFFFF" strokeWidth="2" />
                  <circle cx="190" cy="100" r="4.5" fill="#F59E0B" stroke="#FFFFFF" strokeWidth="2" />
                  <circle cx="290" cy="80" r="4.5" fill="#F59E0B" stroke="#FFFFFF" strokeWidth="2" />
                  <circle cx="380" cy="75" r="4.5" fill="#F59E0B" stroke="#FFFFFF" strokeWidth="2" />
                </svg>
              </div>
            </div>

            {/* X-Axis labels */}
            <div className="flex justify-between items-center text-[10px] font-semibold text-slate-400 pl-6 pr-2 pt-2 border-t border-slate-100 select-none">
              <span>May 6</span>
              <span>May 7</span>
              <span>May 8</span>
              <span>May 9</span>
              <span>May 10</span>
              <span>May 11</span>
              <span>May 12</span>
            </div>
          </div>
        </div>

        {/* Right Chart: Item Categories */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-bold text-slate-900">Item Categories</h3>
            <button className="flex items-center gap-1.5 px-2.5 py-1 bg-[#F8FAFC] border border-slate-200 hover:bg-slate-50 rounded-lg text-xs font-semibold text-slate-600 transition-colors">
              <span>This Month</span>
              <ChevronDown className="h-3 w-3 text-slate-400" />
            </button>
          </div>

          {/* Doughnut Graphic & Custom Legend layout */}
          <div className="flex items-center justify-between gap-4 flex-1 py-2">
            {/* Beautiful SVG Doughnut ring mimicking image proportions exactly */}
            <div className="relative w-40 h-40 flex items-center justify-center shrink-0 mx-auto sm:mx-0">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                {/* Segment 1: Electronics (35%) - Blue */}
                <circle
                  cx="50" cy="50" r="35"
                  fill="transparent"
                  stroke="#2563EB"
                  strokeWidth="20"
                  strokeDasharray="220 220"
                  strokeDashoffset="77"
                  className="transition-all duration-500 hover:opacity-85 cursor-pointer"
                />
                {/* Segment 2: Wallets (20%) - Orange */}
                <circle
                  cx="50" cy="50" r="35"
                  fill="transparent"
                  stroke="#F59E0B"
                  strokeWidth="20"
                  strokeDasharray="220 220"
                  strokeDashoffset="154"
                  className="transition-all duration-500 hover:opacity-85 cursor-pointer"
                />
                {/* Segment 3: ID Cards (15%) - Green */}
                <circle
                  cx="50" cy="50" r="35"
                  fill="transparent"
                  stroke="#10B981"
                  strokeWidth="20"
                  strokeDasharray="220 220"
                  strokeDashoffset="198"
                  className="transition-all duration-500 hover:opacity-85 cursor-pointer"
                />
                {/* Segment 4: Bags (10%) - Purple */}
                <circle
                  cx="50" cy="50" r="35"
                  fill="transparent"
                  stroke="#8B5CF6"
                  strokeWidth="20"
                  strokeDasharray="220 220"
                  strokeDashoffset="231"
                  className="transition-all duration-500 hover:opacity-85 cursor-pointer"
                />
                {/* Segment 5: Books (8%) - Rose */}
                <circle
                  cx="50" cy="50" r="35"
                  fill="transparent"
                  stroke="#F43F5E"
                  strokeWidth="20"
                  strokeDasharray="220 220"
                  strokeDashoffset="253"
                  className="transition-all duration-500 hover:opacity-85 cursor-pointer"
                />
                {/* Segment 6: Others (12%) - Slate */}
                <circle
                  cx="50" cy="50" r="35"
                  fill="transparent"
                  stroke="#64748B"
                  strokeWidth="20"
                  strokeDasharray="220 220"
                  strokeDashoffset="270"
                  className="transition-all duration-500 hover:opacity-85 cursor-pointer"
                />
              </svg>
              {/* Internal Doughnut center stats */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
                <span className="text-xl font-bold text-slate-900 leading-none">1,248</span>
                <span className="text-[10px] font-semibold text-slate-400 mt-0.5">Total Items</span>
              </div>
            </div>

            {/* Custom Legend multi-row layout perfectly mirroring text & colors */}
            <div className="flex-1 space-y-2.5 max-w-[180px]">
              {[
                { label: 'Electronics', value: '35%', dot: 'bg-blue-600' },
                { label: 'Wallets', value: '20%', dot: 'bg-amber-500' },
                { label: 'ID Cards', value: '15%', dot: 'bg-emerald-500' },
                { label: 'Bags', value: '10%', dot: 'bg-purple-500' },
                { label: 'Books', value: '8%', dot: 'bg-rose-500' },
                { label: 'Others', value: '12%', dot: 'bg-slate-500' },
              ].map((cat, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs font-medium">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${cat.dot} shrink-0`}></span>
                    <span className="text-slate-600">{cat.label}</span>
                  </div>
                  <span className="font-bold text-slate-900">{cat.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Area Layout: Split into Table Column and Side Panels Column */}
      <div className="flex flex-col lg:flex-row items-start gap-4">
        {/* Left wider area: Recent Reports Table */}
        <div className="flex-1 w-full bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
          {/* Table Header and Tabs */}
          <div className="px-5 pt-4 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            {/* Custom Tab List */}
            <div className="flex items-center gap-1 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
              {(['All', 'Lost Reports', 'Found Items', 'Claims'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                    activeTab === tab
                      ? 'bg-blue-50 text-blue-600 shadow-2xs'
                      : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* View All link */}
            <button 
              onClick={() => alert('Viewing all comprehensive records list...')}
              className="text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors pb-2 sm:pb-0 shrink-0 self-end sm:self-auto"
            >
              View All
            </button>
          </div>

          {/* Table contents */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#F8FAFC] border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider select-none">
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
              <tbody className="divide-y divide-slate-100 text-xs text-slate-600">
                {filteredItems.length > 0 ? (
                  filteredItems.map((item) => {
                    // Decide beautifully tailored badge formatting
                    const isLost = item.type === 'Lost';
                    const isFound = item.type === 'Found';
                    const isClaim = item.type === 'Claim';

                    return (
                      <tr key={item.id} className="hover:bg-slate-50/60 transition-colors group">
                        {/* ID */}
                        <td className="py-3.5 px-5 font-bold text-slate-900 whitespace-nowrap">
                          #{item.id}
                        </td>

                        {/* Type badge */}
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold border ${
                            isLost ? 'bg-blue-50 text-blue-600 border-blue-100' :
                            isFound ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                            'bg-purple-50 text-purple-600 border-purple-100'
                          }`}>
                            {item.type}
                          </span>
                        </td>

                        {/* Item Name */}
                        <td className="py-3.5 px-4 font-bold text-slate-900 max-w-[160px] truncate" title={item.name}>
                          {item.name}
                        </td>

                        {/* Reported By */}
                        <td className="py-3.5 px-4 text-slate-500 whitespace-nowrap">
                          {item.studentName}
                        </td>

                        {/* Location */}
                        <td className="py-3.5 px-4 text-slate-500 max-w-[140px] truncate" title={item.location}>
                          {item.location}
                        </td>

                        {/* Status badge with colored status dot */}
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border ${
                            item.status === 'Pending' ? 'bg-amber-50 text-amber-700 border-amber-200/80' :
                            item.status === 'Under Review' ? 'bg-blue-50 text-blue-700 border-blue-200/80' :
                            item.status === 'Resolved' || item.status === 'Claimed' ? 'bg-emerald-50 text-emerald-700 border-emerald-200/80' :
                            'bg-slate-50 text-slate-700 border-slate-200/80'
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

                        {/* Date */}
                        <td className="py-3.5 px-4 text-slate-400 font-medium whitespace-nowrap">
                          {format(new Date(item.date), 'MMM dd, yyyy')}
                        </td>

                        {/* Actions options trigger */}
                        <td className="py-3.5 px-3 text-center whitespace-nowrap">
                          <button 
                            onClick={() => alert(`Options triggered for item #${item.id} (${item.name})`)}
                            className="p-1 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-all"
                            title="More Actions"
                          >
                            <MoreVertical className="h-4 w-4 mx-auto" />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={8} className="py-12 text-center text-slate-400 font-medium">
                      No records match the current filter selection.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right side stacked sidebars column */}
        <div className="w-full lg:w-[320px] shrink-0 space-y-4">
          {/* Card 1: Recent Activity */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Recent Activity</h3>
              <button 
                onClick={() => alert('Loading complete activity feed history...')}
                className="text-[11px] font-bold text-blue-600 hover:text-blue-700 transition-colors"
              >
                View All
              </button>
            </div>

            {/* Exactly replicated Activity history list */}
            <div className="space-y-3 pt-1">
              {[
                { title: 'New lost report submitted', desc: 'MacBook Pro - Library', time: '2 min ago' },
                { title: 'New found item reported', desc: 'iPhone 14 - Bus Stand', time: '15 min ago' },
                { title: 'Claim approved', desc: 'Wallet - Engineering Block', time: '1 hr ago' },
                { title: 'User registered', desc: 'john.doe@university.edu', time: '2 hr ago' },
                { title: 'Claim rejected', desc: 'ID Card - Admin Block', time: '3 hr ago' },
              ].map((act, idx) => (
                <div key={idx} className="flex items-start justify-between gap-2 text-xs">
                  <div className="min-w-0">
                    <p className="font-bold text-slate-900 truncate leading-tight">{act.title}</p>
                    <p className="text-[11px] text-slate-500 truncate mt-0.5">{act.desc}</p>
                  </div>
                  <span className="text-[10px] font-medium text-slate-400 shrink-0 pt-0.5">{act.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Card 2: System Status */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">System Status</h3>
              <button 
                onClick={() => alert('Viewing system server details...')}
                className="text-[11px] font-bold text-blue-600 hover:text-blue-700 transition-colors"
              >
                View All
              </button>
            </div>

            {/* Replicated live server indicators list */}
            <div className="space-y-2.5 pt-1">
              {[
                { label: 'Database', state: 'Operational' },
                { label: 'Server', state: 'Operational' },
                { label: 'Storage', state: 'Operational' },
                { label: 'Notifications', state: 'Operational' },
                { label: 'Email Service', state: 'Operational' },
              ].map((sys, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs">
                  <span className="font-medium text-slate-600">{sys.label}</span>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="font-bold text-emerald-600 text-[11px]">{sys.state}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Card 3: Quick Summary Counters */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs space-y-2.5">
            {/* Total Users */}
            <div className="flex items-center justify-between p-2.5 bg-blue-50/60 rounded-xl border border-blue-100/50">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0">
                  <Users className="h-3.5 w-3.5" />
                </div>
                <span className="text-xs font-bold text-blue-900">Total Users</span>
              </div>
              <span className="text-sm font-extrabold text-blue-950">2,489</span>
            </div>

            {/* Active Today */}
            <div className="flex items-center justify-between p-2.5 bg-emerald-50/60 rounded-xl border border-emerald-100/50">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0">
                  <Activity className="h-3.5 w-3.5" />
                </div>
                <span className="text-xs font-bold text-emerald-900">Active Today</span>
              </div>
              <span className="text-sm font-extrabold text-emerald-950">342</span>
            </div>

            {/* Success Rate */}
            <div className="flex items-center justify-between p-2.5 bg-purple-50/60 rounded-xl border border-purple-100/50">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-purple-600 text-white flex items-center justify-center shrink-0">
                  <ShieldCheck className="h-3.5 w-3.5" />
                </div>
                <span className="text-xs font-bold text-purple-900">Success Rate</span>
              </div>
              <span className="text-sm font-extrabold text-purple-950">87.4%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer watermark message */}
      <div className="text-center pt-8 pb-2 select-none">
        <p className="text-xs text-slate-400 font-medium tracking-wide">
          Lost & Found Admin Panel • Built with ❤️ for safer campuses
        </p>
      </div>
    </div>
  );
};
