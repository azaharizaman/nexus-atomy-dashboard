
import React from 'react';
import { PACKAGES, HIGHLIGHTS, ROADMAP } from '../data';
import StatCard from '../components/StatCard';
import { Code2, DollarSign, Layers, PieChart } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell, Pie, PieChart as RePieChart } from 'recharts';

const Dashboard: React.FC = () => {
  // Calculated Aggregates
  const totalLoc = PACKAGES.reduce((acc, p) => acc + p.loc, 0);
  const totalValue = PACKAGES.reduce((acc, p) => acc + p.value, 0);
  const avgCompletion = Math.round(PACKAGES.reduce((acc, p) => acc + p.percentComplete, 0) / PACKAGES.length);
  const productionReadyCount = PACKAGES.filter(p => p.percentComplete === 100).length;

  // Chart Data Preparation
  const categoryData = PACKAGES.reduce((acc, pkg) => {
    const existing = acc.find(item => item.name === pkg.category);
    if (existing) {
      existing.value += pkg.value;
    } else {
      acc.push({ name: pkg.category, value: pkg.value });
    }
    return acc;
  }, [] as { name: string; value: number }[]).sort((a, b) => b.value - a.value);

  const statusData = [
    { name: 'Production Ready', value: productionReadyCount, color: '#10b981' }, // Emerald
    { name: 'In Progress (>50%)', value: PACKAGES.filter(p => p.percentComplete < 100 && p.percentComplete >= 50).length, color: '#8b5cf6' }, // Violet
    { name: 'Early Stage (<50%)', value: PACKAGES.filter(p => p.percentComplete < 50).length, color: '#f59e0b' }, // Amber
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-zinc-900 via-zinc-900 to-zinc-950 border border-zinc-800 p-8">
        <div className="relative z-10 max-w-2xl">
          <h2 className="text-4xl font-bold text-white mb-4 tracking-tight">
            Not just another ERP,<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
              it's a framework.
            </span>
          </h2>
          <p className="text-zinc-400 text-lg mb-6 leading-relaxed">
            Nexus empowers developers to build enterprise-grade systems with {productionReadyCount} production-ready packages.
            Architecture-first, documentation-obsessed, and high ROI.
          </p>
          <div className="flex gap-4">
             <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-md text-sm text-zinc-300">
                Est. License Savings: <span className="text-white font-bold">$1.05M/yr</span>
             </div>
             <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-md text-sm text-zinc-300">
                Avg ROI: <span className="text-emerald-400 font-bold">~868%</span>
             </div>
          </div>
        </div>
        {/* Abstract decoration */}
        <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-primary/10 to-transparent pointer-events-none" />
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          label="Total Codebase" 
          value={`${(totalLoc / 1000).toFixed(0)}k`} 
          subValue="Lines of PHP"
          icon={Code2} 
        />
        <StatCard 
          label="Portfolio Value" 
          value={`$${(totalValue / 1000000).toFixed(2)}M`} 
          subValue="Dev Cost Equiv."
          icon={DollarSign} 
          color="text-emerald-500"
        />
        <StatCard 
          label="Overall Progress" 
          value={`${avgCompletion}%`} 
          subValue={`${productionReadyCount}/${PACKAGES.length} Ready`}
          icon={PieChart} 
          color="text-blue-500"
        />
        <StatCard 
          label="Packages" 
          value={PACKAGES.length} 
          subValue="Across 6 Verticals"
          icon={Layers} 
          color="text-purple-500"
        />
      </div>

      {/* Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Value Distribution Chart */}
        <div className="lg:col-span-2 bg-surface border border-border rounded-xl p-6">
          <h3 className="text-lg font-bold text-white mb-6">Value Distribution by Vertical</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#71717a', fontSize: 12 }} dy={10} />
                <YAxis hide />
                <Tooltip 
                  cursor={{ fill: '#27272a', opacity: 0.4 }}
                  contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', color: '#fff' }}
                />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#8b5cf6' : '#6366f1'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Status Pie Chart */}
        <div className="bg-surface border border-border rounded-xl p-6">
          <h3 className="text-lg font-bold text-white mb-2">Package Maturity</h3>
          <div className="h-64 relative">
             <ResponsiveContainer width="100%" height="100%">
              <RePieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '8px' }} />
              </RePieChart>
            </ResponsiveContainer>
            {/* Center Text */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-center">
                <span className="block text-2xl font-bold text-white">{productionReadyCount}</span>
                <span className="text-xs text-zinc-500">Ready</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 mt-2">
            {statusData.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-sm">
                 <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-zinc-400">{item.name}</span>
                 </div>
                 <span className="text-white font-medium">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Highlights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {HIGHLIGHTS.map((highlight, idx) => (
          <div key={idx} className="bg-zinc-900/30 border border-border rounded-xl p-6">
            <h4 className="text-primary font-medium mb-4 flex items-center gap-2">
              {highlight.category}
            </h4>
            <div className="space-y-4">
              {highlight.items.map((item, i) => (
                <div key={i} className="flex justify-between items-center group">
                   <div>
                     <p className="text-white font-medium text-sm group-hover:text-primary transition-colors">{item.label}</p>
                     {item.subtext && <p className="text-zinc-500 text-xs">{item.subtext}</p>}
                   </div>
                   <div className="text-right">
                     <p className="text-white font-mono font-bold">{item.value}</p>
                   </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
