
import React, { useState } from 'react';
import { PACKAGES } from '../data';
import PackageCard from '../components/PackageCard';
import PackageDetailModal from '../components/PackageDetailModal';
import { Package } from '../types';
import { Search, Filter, Layers, Shield, Percent, X } from 'lucide-react';

const Packages: React.FC = () => {
  const [search, setSearch] = useState('');
  const [filterVertical, setFilterVertical] = useState('All');
  const [filterCriticality, setFilterCriticality] = useState<'All' | 'High' | 'Medium' | 'Low'>('All');
  const [completionRange, setCompletionRange] = useState<[number, number]>([0, 100]);
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);

  const verticals = ['All', ...Array.from(new Set(PACKAGES.map(p => p.category)))];

  const filteredPackages = PACKAGES.filter(pkg => {
    const matchesSearch = pkg.name.toLowerCase().includes(search.toLowerCase()) || 
                          pkg.description.toLowerCase().includes(search.toLowerCase());
    const matchesVertical = filterVertical === 'All' || pkg.category === filterVertical;
    const matchesCriticality = filterCriticality === 'All' || pkg.criticality === filterCriticality;
    const matchesCompletion = pkg.percentComplete >= completionRange[0] && pkg.percentComplete <= completionRange[1];

    return matchesSearch && matchesVertical && matchesCriticality && matchesCompletion;
  });

  const clearFilters = () => {
    setSearch('');
    setFilterVertical('All');
    setFilterCriticality('All');
    setCompletionRange([0, 100]);
  };

  const hasActiveFilters = search !== '' || filterVertical !== 'All' || filterCriticality !== 'All' || completionRange[0] > 0 || completionRange[1] < 100;

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    // Enforce a 10% gap to prevent overlap and ensure handles remain accessible
    const newMin = Math.min(val, completionRange[1] - 10);
    setCompletionRange([newMin, completionRange[1]]);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    // Enforce a 10% gap
    const newMax = Math.max(val, completionRange[0] + 10);
    setCompletionRange([completionRange[0], newMax]);
  };

  return (
    <div className="space-y-8 animate-fade-in relative">
      <div>
        <h2 className="text-2xl font-bold text-white">Package Explorer</h2>
        <p className="text-zinc-400 text-sm mt-1">
          Browse {PACKAGES.length} packages across the Nexus ecosystem.
        </p>
      </div>

      {/* Control Panel */}
      <div className="bg-surface border border-border rounded-xl p-5 space-y-6 shadow-sm">
        
        {/* Top Row: Search */}
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-primary transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="Search packages by name or description..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 text-sm text-white pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-zinc-600"
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          
          {/* Vertical Filter (Pills) */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-3 text-xs font-semibold text-zinc-500 uppercase tracking-wider">
              <Layers size={14} />
              <span>Verticals</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {verticals.map(v => (
                <button
                  key={v}
                  onClick={() => setFilterVertical(v)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-all duration-200 ${
                    filterVertical === v
                      ? 'bg-primary/10 border-primary text-primary shadow-[0_0_10px_rgba(139,92,246,0.2)]'
                      : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-300'
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>

          <div className="w-px bg-zinc-800 hidden lg:block"></div>

          {/* Right Side Filters */}
          <div className="flex flex-col sm:flex-row gap-6 lg:w-[450px] shrink-0">
            
            {/* Criticality */}
            <div className="flex-1">
               <div className="flex items-center gap-2 mb-3 text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                  <Shield size={14} />
                  <span>Criticality</span>
               </div>
               <div className="flex rounded-lg bg-zinc-900 border border-zinc-800 p-1">
                 {['All', 'High', 'Medium', 'Low'].map((c) => (
                   <button
                    key={c}
                    onClick={() => setFilterCriticality(c as any)}
                    className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-all ${
                      filterCriticality === c
                        ? 'bg-zinc-800 text-white shadow-sm'
                        : 'text-zinc-500 hover:text-zinc-300'
                    }`}
                   >
                     {c}
                   </button>
                 ))}
               </div>
            </div>

            {/* Completion Range Slider */}
            <div className="flex-1">
               <div className="flex items-center justify-between mb-3 text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    <Percent size={14} />
                    <span>Completion Range</span>
                  </div>
                  <span className="text-primary font-mono text-[10px]">{completionRange[0]}% - {completionRange[1]}%</span>
               </div>
               
               {/* Dual Slider Container */}
               <div className="relative h-8 px-1">
                  {/* Track Background */}
                  <div className="absolute top-1/2 left-0 right-0 h-1.5 bg-zinc-800 rounded-full -translate-y-1/2 pointer-events-none"></div>
                  
                  {/* Active Range Track */}
                  <div 
                    className="absolute top-1/2 h-1.5 bg-primary/50 rounded-full -translate-y-1/2 pointer-events-none transition-all duration-100"
                    style={{ 
                      left: `${completionRange[0]}%`, 
                      right: `${100 - completionRange[1]}%` 
                    }}
                  ></div>

                  {/* Min Input */}
                  <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    step="10"
                    value={completionRange[0]}
                    onChange={handleMinChange}
                    className="absolute top-1/2 left-0 w-full -translate-y-1/2 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-zinc-200 [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-primary [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-lg z-20"
                  />
                  
                  {/* Max Input */}
                  <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    step="10"
                    value={completionRange[1]}
                    onChange={handleMaxChange}
                    className="absolute top-1/2 left-0 w-full -translate-y-1/2 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-lg z-30"
                  />
               </div>
               
               <div className="flex justify-between mt-1 px-1">
                  <span className="text-[10px] text-zinc-600">0%</span>
                  <span className="text-[10px] text-zinc-600">100%</span>
               </div>
            </div>

          </div>
        </div>
        
        {/* Active Filter Summary / Clear */}
        {hasActiveFilters && (
          <div className="pt-4 border-t border-zinc-800 flex justify-between items-center">
            <p className="text-xs text-zinc-500">
              Showing <span className="text-white font-bold">{filteredPackages.length}</span> results
            </p>
            <button 
              onClick={clearFilters}
              className="flex items-center gap-1.5 text-xs text-red-400 hover:text-red-300 transition-colors"
            >
              <X size={12} />
              Clear Filters
            </button>
          </div>
        )}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredPackages.map(pkg => (
          <PackageCard 
            key={pkg.id} 
            pkg={pkg} 
            onClick={(p) => setSelectedPackage(p)}
          />
        ))}
      </div>
      
      {/* Empty State */}
      {filteredPackages.length === 0 && (
        <div className="text-center py-24 border border-dashed border-zinc-800 rounded-xl bg-zinc-900/20">
          <div className="w-16 h-16 bg-zinc-900 rounded-full flex items-center justify-center mx-auto mb-4 border border-zinc-800">
             <Filter className="text-zinc-500 opacity-50" size={32} />
          </div>
          <h3 className="text-lg font-medium text-white mb-2">No packages found</h3>
          <p className="text-zinc-500 mb-6 max-w-sm mx-auto">
            Your current filters didn't match any packages. Try adjusting the vertical, criticality, or search terms.
          </p>
          <button 
            onClick={clearFilters}
            className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white text-sm font-medium rounded-lg transition-colors border border-zinc-700"
          >
            Reset All Filters
          </button>
        </div>
      )}

      {/* Detail Modal */}
      {selectedPackage && (
        <PackageDetailModal 
          pkg={selectedPackage} 
          onClose={() => setSelectedPackage(null)} 
        />
      )}
    </div>
  );
};

export default Packages;
