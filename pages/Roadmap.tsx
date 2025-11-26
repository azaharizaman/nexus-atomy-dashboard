import React from 'react';
import { ROADMAP } from '../data';
import { CheckCircle2, ArrowRight, Clock, AlertCircle } from 'lucide-react';

const Roadmap: React.FC = () => {
  const getIcon = (term: string) => {
    switch(term) {
      case 'Immediate': return <AlertCircle className="text-red-400" size={20} />;
      case 'Medium-Term': return <Clock className="text-yellow-400" size={20} />;
      case 'Long-Term': return <CheckCircle2 className="text-emerald-400" size={20} />;
      default: return <Clock size={20} />;
    }
  };

  const getColor = (term: string) => {
    switch(term) {
      case 'Immediate': return 'border-red-500/30 bg-red-500/5';
      case 'Medium-Term': return 'border-yellow-500/30 bg-yellow-500/5';
      case 'Long-Term': return 'border-emerald-500/30 bg-emerald-500/5';
      default: return 'border-zinc-800 bg-zinc-900';
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white">Strategic Roadmap</h2>
        <p className="text-zinc-400 mt-2">Critical path recommendations for the next 12 weeks to maximize ROI and unlock blocking dependencies.</p>
      </div>

      <div className="relative border-l border-zinc-800 ml-4 space-y-12">
        {['Immediate', 'Medium-Term', 'Long-Term'].map((term) => {
          const items = ROADMAP.filter(r => r.term === term);
          
          return (
            <div key={term} className="relative pl-8">
              {/* Timeline Node */}
              <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full bg-zinc-600 border border-zinc-950 ring-4 ring-zinc-950" />
              
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                {term}
                <span className="text-xs font-normal text-zinc-500 px-2 py-1 bg-zinc-900 rounded border border-zinc-800">
                  {term === 'Immediate' ? 'Next 4 Weeks' : term === 'Medium-Term' ? 'Next 8 Weeks' : 'Next 12 Weeks'}
                </span>
              </h3>

              <div className="space-y-4">
                {items.map(item => (
                  <div key={item.id} className={`p-6 rounded-xl border ${getColor(term)} transition-transform hover:-translate-y-1 duration-300`}>
                    <div className="flex justify-between items-start mb-2">
                       <h4 className="text-lg font-bold text-white">{item.title}</h4>
                       {getIcon(term)}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <div>
                        <p className="text-xs uppercase tracking-wider text-zinc-500 font-bold mb-1">Impact</p>
                        <p className="text-zinc-300 text-sm">{item.impact}</p>
                      </div>
                       <div>
                        <p className="text-xs uppercase tracking-wider text-zinc-500 font-bold mb-1">Value Unlocked</p>
                        <p className="text-white text-sm font-mono font-bold">${(item.valueImpact / 1000).toFixed(0)}k</p>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-white/5">
                      <div className="flex items-start gap-2">
                         <ArrowRight size={16} className="text-primary mt-0.5 shrink-0" />
                         <p className="text-sm text-zinc-300"><span className="text-primary font-medium">Action:</span> {item.action}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Roadmap;
