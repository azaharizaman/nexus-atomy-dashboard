
import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Package } from '../types';
import { X, GitCommit, FileText, Activity, CircleDollarSign, Shield, Layers, Clock } from 'lucide-react';

interface PackageDetailModalProps {
  pkg: Package | null;
  onClose: () => void;
}

const PackageDetailModal: React.FC<PackageDetailModalProps> = ({ pkg, onClose }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Trigger entry animation on mount
    requestAnimationFrame(() => setIsAnimating(true));

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  const handleClose = () => {
    // Trigger exit animation
    setIsAnimating(false);
    // Wait for animation to finish before unmounting
    setTimeout(() => {
      onClose();
    }, 300);
  };

  if (!pkg) return null;

  const getProgressColor = (percent: number) => {
    if (percent >= 90) return 'bg-emerald-500';
    if (percent >= 70) return 'bg-blue-500';
    if (percent >= 40) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const modalContent = (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-300 ease-out"
        style={{ opacity: isAnimating ? 1 : 0 }}
        onClick={handleClose}
      />
      
      {/* Modal Card with 3D Flip Animation */}
      <div 
        className="relative w-full max-w-2xl bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl shadow-black overflow-hidden"
        style={{
          transform: isAnimating 
            ? 'perspective(1000px) rotateX(0deg) scale(1) translateY(0)' 
            : 'perspective(1000px) rotateX(15deg) scale(0.95) translateY(20px)',
          opacity: isAnimating ? 1 : 0,
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)', // Ease-out expo
          transformOrigin: 'center top'
        }}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-zinc-800 flex justify-between items-start bg-zinc-900/30">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h2 className="text-2xl font-bold text-white font-mono">{pkg.name}</h2>
              <span className="px-2 py-0.5 rounded text-[10px] bg-zinc-800 text-zinc-400 border border-zinc-700 font-mono">
                {pkg.id}
              </span>
            </div>
            <p className="text-zinc-400 text-sm">{pkg.description}</p>
          </div>
          <button 
            onClick={handleClose}
            className="p-2 -mr-2 text-zinc-500 hover:text-white hover:bg-zinc-800 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Main Status */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800">
               <div className="flex justify-between items-center mb-2">
                 <span className="text-sm text-zinc-500">Completion</span>
                 <span className={`text-xl font-bold ${pkg.percentComplete === 100 ? 'text-emerald-400' : 'text-white'}`}>
                   {pkg.percentComplete}%
                 </span>
               </div>
               <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full ${getProgressColor(pkg.percentComplete)}`} 
                  style={{ width: `${pkg.percentComplete}%` }}
                />
              </div>
              <p className="text-xs text-zinc-500 mt-2">Target: Production Ready</p>
            </div>

            <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800 flex flex-col justify-center">
               <span className="text-sm text-zinc-500 mb-1">Estimated Value</span>
               <div className="flex items-center gap-2">
                 <CircleDollarSign size={20} className="text-emerald-500" />
                 <span className="text-2xl font-bold text-white tracking-tight">
                   ${pkg.value.toLocaleString()}
                 </span>
               </div>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <DetailItem icon={Layers} label="Vertical" value={pkg.category} />
            <DetailItem icon={Shield} label="Criticality" value={pkg.criticality} 
              valueClass={
                pkg.criticality === 'High' ? 'text-red-400' : 
                pkg.criticality === 'Medium' ? 'text-yellow-400' : 'text-blue-400'
              } 
            />
            <DetailItem icon={Clock} label="Nature" value={pkg.nature} />
          </div>

          <div className="border-t border-zinc-800 pt-6">
            <h4 className="text-sm font-semibold text-zinc-300 mb-4 uppercase tracking-wider">Quality Metrics</h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <MetricBox icon={GitCommit} label="LOC" value={pkg.loc.toLocaleString()} />
              <MetricBox icon={FileText} label="Doc Lines" value={pkg.docLines.toLocaleString()} />
              <MetricBox icon={Activity} label="Tests" value={pkg.tests.toString()} />
              <MetricBox icon={FileText} label="Doc/Code" value={`${pkg.docCodeRatio}:1`} />
            </div>
          </div>
        </div>

        <div className="px-6 py-4 bg-zinc-900/50 border-t border-zinc-800 flex justify-end gap-3">
          <button 
            onClick={handleClose}
            className="px-4 py-2 text-sm font-medium text-white bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors border border-zinc-700"
          >
            Close
          </button>
          <button className="px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary/90 rounded-lg transition-colors shadow-lg shadow-primary/20">
            View Source Code
          </button>
        </div>
      </div>
    </div>
  );

  // Render to document.body to avoid stacking context issues
  return createPortal(modalContent, document.body);
};

const DetailItem = ({ icon: Icon, label, value, valueClass = 'text-white' }: any) => (
  <div className="flex items-start gap-3">
    <div className="p-2 rounded bg-zinc-900 border border-zinc-800 text-zinc-400">
      <Icon size={16} />
    </div>
    <div>
      <p className="text-xs text-zinc-500">{label}</p>
      <p className={`text-sm font-medium ${valueClass}`}>{value}</p>
    </div>
  </div>
);

const MetricBox = ({ icon: Icon, label, value }: any) => (
  <div className="bg-zinc-950 p-3 rounded-lg border border-zinc-800 text-center hover:border-zinc-600 transition-colors">
    <div className="flex justify-center mb-2 text-zinc-500">
      <Icon size={16} />
    </div>
    <div className="text-lg font-bold text-white mb-0.5">{value}</div>
    <div className="text-[10px] text-zinc-500 uppercase">{label}</div>
  </div>
);

export default PackageDetailModal;
