import type { ReactNode } from 'react';
import { cn } from '../lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  trend?: string;
  trendUp?: boolean;
  className?: string;
  iconBg?: string;
  iconColor?: string;
  subtitle?: string;
}

export const StatCard = ({ 
  title, 
  value, 
  icon, 
  trend, 
  trendUp = true, 
  className,
  iconBg = 'bg-blue-50',
  iconColor = 'text-blue-600',
  subtitle = 'vs last 7 days'
}: StatCardProps) => {
  return (
    <div className={cn(
      "bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between group hover:shadow-md hover:border-slate-300 transition-all duration-300 relative overflow-hidden", 
      className
    )}>
      {/* Top Header section: Icon on left, Title on right */}
      <div className="flex items-center gap-3.5">
        <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-105", iconBg, iconColor)}>
          {icon}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold text-slate-500 truncate">{title}</p>
          <h3 className="text-2xl font-bold text-slate-900 tracking-tight leading-none mt-1">{value}</h3>
        </div>
      </div>
      
      {/* Bottom Trend section */}
      {trend && (
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-xs">
          <span className={cn("font-bold flex items-center gap-0.5", trendUp ? "text-emerald-600" : "text-rose-600")}>
            {trendUp ? '↑' : '↓'} {trend}
          </span>
          <span className="text-slate-400 font-medium">{subtitle}</span>
        </div>
      )}
    </div>
  );
};
