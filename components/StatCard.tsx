import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string | number;
  subValue?: string;
  icon: LucideIcon;
  trend?: 'up' | 'down' | 'neutral';
  color?: string;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, subValue, icon: Icon, color = 'text-primary' }) => {
  return (
    <div className="bg-surface border border-border rounded-xl p-5 hover:border-zinc-700 transition-colors shadow-sm">
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-zinc-400 text-sm font-medium mb-1">{label}</p>
          <h3 className="text-2xl font-bold text-white tracking-tight">{value}</h3>
        </div>
        <div className={`p-2 rounded-lg bg-zinc-900/50 border border-zinc-800 ${color}`}>
          <Icon size={20} />
        </div>
      </div>
      {subValue && (
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-zinc-900 text-zinc-400 border border-zinc-800">
            {subValue}
          </span>
        </div>
      )}
    </div>
  );
};

export default StatCard;
