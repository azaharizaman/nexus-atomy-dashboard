
import React from 'react';
import { Package } from '../types';
import { GitCommit, FileText, Activity, CircleDollarSign } from 'lucide-react';

interface PackageCardProps {
  pkg: Package;
  onClick?: (pkg: Package) => void;
}

const PackageCard: React.FC<PackageCardProps> = ({ pkg, onClick }) => {
  const getProgressColor = (percent: number) => {
    if (percent >= 90) return 'bg-emerald-500';
    if (percent >= 70) return 'bg-blue-500';
    if (percent >= 40) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getCriticalityColor = (level: string) => {
    switch (level) {
      case 'High': return 'text-red-400 bg-red-400/10 border-red-400/20';
      case 'Medium': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
      case 'Low': return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
      default: return 'text-zinc-400';
    }
  };

  return (
    <div 
      onClick={() => onClick && onClick(pkg)}
      className="group bg-zinc-900/50 border border-border rounded-lg p-5 hover:bg-zinc-800/80 hover:scale-[1.02] hover:border-zinc-500/50 hover:shadow-xl hover:shadow-black/50 transition-all duration-300 ease-out relative overflow-hidden cursor-pointer active:scale-[0.98]"
    >
      
      {/* Top section: Title and Badges */}
      <div className="flex justify-between items-start mb-3">
        <div>
          <h4 className="text-lg font-bold text-white group-hover:text-primary transition-colors font-mono">
            {pkg.name}
          </h4>
          <span className="text-xs text-zinc-500 font-mono">{pkg.nature}</span>
        </div>
        <div className={`text-xs px-2 py-1 rounded-md border font-medium ${getCriticalityColor(pkg.criticality)}`}>
          {pkg.criticality}
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-zinc-400 mb-6 line-clamp-2 h-10 group-hover:text-zinc-300 transition-colors">
        {pkg.description}
      </p>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="flex items-center gap-2">
          <GitCommit size={14} className="text-zinc-600 group-hover:text-zinc-500 transition-colors" />
          <span className="text-xs text-zinc-300 font-mono">{pkg.loc.toLocaleString()} LOC</span>
        </div>
        <div className="flex items-center gap-2">
          <FileText size={14} className="text-zinc-600 group-hover:text-zinc-500 transition-colors" />
          <span className="text-xs text-zinc-300 font-mono">{pkg.docLines.toLocaleString()} Docs</span>
        </div>
        <div className="flex items-center gap-2">
          <Activity size={14} className="text-zinc-600 group-hover:text-zinc-500 transition-colors" />
          <span className="text-xs text-zinc-300 font-mono">{pkg.tests} Tests</span>
        </div>
        <div className="flex items-center gap-2">
          <CircleDollarSign size={14} className="text-emerald-600" />
          <span className="text-xs text-emerald-400 font-bold">${(pkg.value / 1000).toFixed(0)}k Val</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-1.5">
        <div className="flex justify-between text-xs">
          <span className="text-zinc-500 group-hover:text-zinc-400 transition-colors">Completion</span>
          <span className={`font-bold ${pkg.percentComplete === 100 ? 'text-emerald-400' : 'text-white'}`}>
            {pkg.percentComplete}%
          </span>
        </div>
        <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden group-hover:bg-zinc-700 transition-colors">
          <div 
            className={`h-full rounded-full ${getProgressColor(pkg.percentComplete)}`} 
            style={{ width: `${pkg.percentComplete}%` }}
          />
        </div>
      </div>

      {/* Hover decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-bl-full pointer-events-none" />
      
      {/* Click hint */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="bg-zinc-950/90 px-4 py-2 rounded-full text-xs font-medium text-white border border-white/10 backdrop-blur-md transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 shadow-xl">
          View Details
        </div>
      </div>
    </div>
  );
};

export default PackageCard;
