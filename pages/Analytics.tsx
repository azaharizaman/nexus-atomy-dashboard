
import React, { useState } from 'react';
import { PACKAGES } from '../data';
import { 
  ResponsiveContainer, 
  ScatterChart, 
  Scatter, 
  XAxis, 
  YAxis, 
  ZAxis, 
  Tooltip, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar,
  BarChart,
  Bar,
  Cell,
  CartesianGrid,
  Legend,
  ComposedChart,
  Line
} from 'recharts';
import { Activity, FileText, AlertTriangle, Layers, Sparkles, Send, Bot, TrendingUp, DollarSign } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

const Analytics: React.FC = () => {
  // --- AI Chat State ---
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  // --- Data Prep for Scatter Plot (Complexity vs Docs) ---
  const scatterData = PACKAGES.map(p => ({
    name: p.name,
    loc: p.loc,
    docRatio: p.docCodeRatio,
    value: p.value,
    vertical: p.category,
    criticality: p.criticality
  }));

  // --- Data Prep for Cost Efficiency (Cost vs Value) ---
  const costEfficiencyData = PACKAGES.map(p => ({
    name: p.name,
    x: p.devCost,
    y: p.value,
    z: p.roi,
    vertical: p.category
  }));

  // --- Data Prep for Radar Chart (Vertical Maturity) ---
  const verticals = Array.from(new Set(PACKAGES.map(p => p.category)));
  const radarData = verticals.map(v => {
    const pkgs = PACKAGES.filter(p => p.category === v);
    const avgComp = pkgs.reduce((sum, p) => sum + p.percentComplete, 0) / pkgs.length;
    // Normalize Test Density (Tests per 1k LOC) - Cap at 50 for visualization
    const avgTestDensity = pkgs.reduce((sum, p) => sum + ((p.tests / p.loc) * 1000), 0) / pkgs.length;
    // Normalize Value (Logarithmic scale roughly)
    const totalVal = pkgs.reduce((sum, p) => sum + p.value, 0);
    
    return {
      subject: v,
      A: avgComp, // Completion
      B: Math.min(avgTestDensity * 2, 100), // Scaled Test Density
      C: Math.min(totalVal / 10000, 100), // Scaled Value
      fullMark: 100
    };
  });

  // --- Data Prep for Tier Maturity ---
  const tiers = ['Architectural', 'Tier 1', 'Tier 2', 'Tier 3'];
  const tierData = tiers.map(t => {
      const pkgs = PACKAGES.filter(p => p.nature.includes(t) || (t === 'Architectural' && p.nature === 'Architectural') || (t === 'Tier 1' && p.nature.includes('Tier 1')));
      if (pkgs.length === 0) return null;
      const avgComp = pkgs.reduce((sum, p) => sum + p.percentComplete, 0) / pkgs.length;
      const avgDocRatio = pkgs.reduce((sum, p) => sum + p.docCodeRatio, 0) / pkgs.length;
      return {
          name: t,
          completion: Math.round(avgComp),
          docRatio: parseFloat(avgDocRatio.toFixed(2)),
          count: pkgs.length
      };
  }).filter(Boolean);


  // --- Data Prep for Test Density (Top 5 vs Bottom 5) ---
  const testDensityData = PACKAGES.map(p => ({
    name: p.name.replace('Nexus\\', ''),
    density: parseFloat(((p.tests / p.loc) * 1000).toFixed(1)),
    loc: p.loc
  })).sort((a, b) => b.density - a.density);

  const topTestDensity = testDensityData.slice(0, 5);
  const bottomTestDensity = testDensityData.filter(x => x.loc > 500).slice(-5).reverse(); // Filter out tiny packages

  // --- AI Handler ---
  const handleAsk = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setResponse('');
    
    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        
        const context = `
            You are a Data Analyst for the Nexus ERP Framework.
            Analyze the following dataset to answer the user's question.
            
            Dataset Summary:
            - Total Packages: ${PACKAGES.length}
            - Vertical Performance: ${JSON.stringify(radarData)}
            - Cost Efficiency Data (Sample): ${JSON.stringify(costEfficiencyData.slice(0, 5))}
            - Tier Maturity: ${JSON.stringify(tierData)}
            
            Key Insights:
            - Most Expensive Dev Cost: ${JSON.stringify(PACKAGES.sort((a,b) => b.devCost - a.devCost)[0])}
            - Highest ROI: ${JSON.stringify(PACKAGES.sort((a,b) => b.roi - a.roi)[0])}
            - Lowest Test Density: ${JSON.stringify(bottomTestDensity[0])}
        `;

        const result = await ai.models.generateContent({
            model: 'gemini-2.5-flash-lite',
            contents: `Context: ${context}\n\nUser Question: ${query}\n\nProvide a data-driven answer in 2-3 sentences.`,
        });
        setResponse(result.text || "No response generated.");
    } catch (error) {
        console.error(error);
        setResponse("Sorry, I encountered an error connecting to the AI service.");
    } finally {
        setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleAsk();
  };

  // Custom Tooltip for Scatter
  const CustomScatterTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-zinc-950 border border-zinc-800 p-3 rounded-lg shadow-xl z-50">
          <p className="font-bold text-white mb-1">{data.name}</p>
          <div className="space-y-1 text-xs text-zinc-400">
            {data.loc && <p>LOC: <span className="text-zinc-200">{data.loc}</span></p>}
            {data.x && <p>Cost: <span className="text-zinc-200">${(data.x/1000).toFixed(1)}k</span></p>}
            {data.y && <p>Value: <span className="text-zinc-200">${(data.y/1000).toFixed(1)}k</span></p>}
            {data.z && <p>ROI: <span className="text-emerald-400">{data.z}%</span></p>}
            {data.docRatio && <p>Doc Ratio: <span className={data.docRatio < 0.6 ? 'text-red-400' : 'text-emerald-400'}>{data.docRatio}:1</span></p>}
            <p>Vertical: {data.vertical}</p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
            <h2 className="text-2xl font-bold text-white">System Analytics</h2>
            <p className="text-zinc-400 text-sm mt-1">Deep dive into code quality, architectural balance, and vertical maturity.</p>
        </div>
      </div>

      {/* AI Data Analyst */}
      <div className="bg-zinc-900/30 border border-border rounded-xl p-1 shadow-sm">
         <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Sparkles className={`h-5 w-5 transition-colors ${loading ? 'text-primary animate-pulse' : 'text-zinc-500 group-focus-within:text-primary'}`} />
            </div>
            <input
                type="text"
                className="block w-full pl-11 pr-12 py-3 border border-transparent rounded-lg leading-5 bg-transparent text-zinc-200 placeholder-zinc-500 focus:outline-none focus:bg-zinc-900 focus:border-zinc-800 transition-all"
                placeholder="Ask AI Analyst (e.g., 'Which vertical has the best ROI?', 'Show me underperforming packages')"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={loading}
            />
            <div className="absolute inset-y-0 right-0 pr-2 flex items-center">
                <button 
                  onClick={handleAsk} 
                  disabled={loading || !query.trim()} 
                  className="p-2 text-zinc-500 hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    {loading ? (
                        <div className="animate-spin h-4 w-4 border-2 border-primary border-t-transparent rounded-full" />
                    ) : (
                        <Send size={18} />
                    )}
                </button>
            </div>
        </div>
        {response && (
            <div className="mx-2 mb-2 p-4 bg-zinc-950/50 border-t border-zinc-800 rounded-b-lg flex gap-3 animate-fade-in">
                <div className="shrink-0 w-6 h-6 rounded bg-primary/20 flex items-center justify-center text-primary mt-0.5">
                    <Bot size={14} />
                </div>
                <div className="space-y-1">
                    <p className="text-zinc-200 text-sm leading-relaxed">{response}</p>
                </div>
            </div>
        )}
      </div>

      {/* Row 1: Investment Efficiency (New) */}
      <div className="bg-surface border border-border rounded-xl p-6 shadow-sm">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <TrendingUp size={18} className="text-emerald-500" />
              Investment Efficiency Frontier
            </h3>
            <p className="text-zinc-500 text-xs mt-1">
              X: Dev Cost | Y: Package Value | Size: ROI %
            </p>
          </div>
          <div className="px-3 py-1 bg-zinc-900 border border-zinc-800 rounded text-xs text-zinc-400">
             Top Right = High Value / High Cost
          </div>
        </div>
        <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                    <XAxis type="number" dataKey="x" name="Cost" unit="$" tick={{ fill: '#71717a' }} fontSize={12} label={{ value: 'Dev Cost ($)', position: 'bottom', fill: '#52525b', dy: 10 }} />
                    <YAxis type="number" dataKey="y" name="Value" unit="$" tick={{ fill: '#71717a' }} fontSize={12} label={{ value: 'Package Value ($)', angle: -90, position: 'left', fill: '#52525b' }} />
                    <ZAxis type="number" dataKey="z" range={[60, 600]} name="ROI" />
                    <Tooltip content={<CustomScatterTooltip />} cursor={{ strokeDasharray: '3 3' }} />
                    <Scatter name="Packages" data={costEfficiencyData} fill="#10b981" fillOpacity={0.6} stroke="#10b981" />
                </ScatterChart>
            </ResponsiveContainer>
        </div>
      </div>

      {/* Row 2: Code Quality Scatter */}
      <div className="bg-surface border border-border rounded-xl p-6 shadow-sm">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <FileText size={18} className="text-blue-500" />
              Code Mass vs. Documentation Health
            </h3>
            <p className="text-zinc-500 text-xs mt-1">
              X: Complexity (LOC) | Y: Doc Ratio
            </p>
          </div>
        </div>
        
        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
              <XAxis 
                type="number" 
                dataKey="loc" 
                name="LOC" 
                tick={{ fill: '#71717a' }} 
                label={{ value: 'Lines of Code', position: 'bottom', fill: '#52525b', fontSize: 12, dy: 10 }} 
              />
              <YAxis 
                type="number" 
                dataKey="docRatio" 
                name="Doc Ratio" 
                tick={{ fill: '#71717a' }}
                label={{ value: 'Doc:Code Ratio', angle: -90, position: 'left', fill: '#52525b', fontSize: 12 }} 
              />
              <ZAxis type="number" dataKey="value" range={[50, 400]} />
              <Tooltip content={<CustomScatterTooltip />} cursor={{ strokeDasharray: '3 3' }} />
              <Scatter name="Packages" data={scatterData} fill="#8b5cf6">
                {scatterData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.docRatio < 0.7 && entry.loc > 2000 ? '#ef4444' : entry.docRatio > 1.0 ? '#10b981' : '#8b5cf6'} 
                    fillOpacity={0.6}
                    stroke={entry.docRatio < 0.7 && entry.loc > 2000 ? '#ef4444' : '#8b5cf6'}
                  />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Row 3 Col 1: Radar Chart (Verticals) */}
        <div className="bg-surface border border-border rounded-xl p-6">
           <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-2">
              <Layers size={18} className="text-purple-500" />
              Vertical Maturity Profile
            </h3>
            <p className="text-zinc-500 text-xs mb-6">Comparing Avg Completion, Test Density, and Total Value</p>
            
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                  <PolarGrid stroke="#27272a" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#a1a1aa', fontSize: 11 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                  <Radar name="Completion" dataKey="A" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.3} />
                  <Radar name="Test Density" dataKey="B" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }}/>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '8px' }}
                    itemStyle={{ color: '#fff' }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
        </div>

        {/* Row 3 Col 2: Tier Maturity (New) */}
        <div className="bg-surface border border-border rounded-xl p-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-2">
              <Layers size={18} className="text-yellow-500" />
              Architectural Tier Health
            </h3>
            <p className="text-zinc-500 text-xs mb-6">Avg Completion and Doc Ratio by Tier</p>

            <div className="h-[300px] w-full">
               <ResponsiveContainer width="100%" height="100%">
                   <ComposedChart data={tierData} margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
                       <CartesianGrid stroke="#27272a" vertical={false} />
                       <XAxis dataKey="name" tick={{ fill: '#a1a1aa', fontSize: 12 }} />
                       <YAxis yAxisId="left" tick={{ fill: '#a1a1aa' }} unit="%" />
                       <YAxis yAxisId="right" orientation="right" tick={{ fill: '#a1a1aa' }} domain={[0, 1.5]} />
                       <Tooltip contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a' }} />
                       <Bar yAxisId="left" dataKey="completion" name="Avg Completion" fill="#eab308" fillOpacity={0.4} stroke="#eab308" barSize={30} radius={[4, 4, 0, 0]} />
                       <Line yAxisId="right" type="monotone" dataKey="docRatio" name="Doc Ratio" stroke="#f472b6" strokeWidth={2} dot={{ r: 4 }} />
                   </ComposedChart>
               </ResponsiveContainer>
            </div>
        </div>

        {/* Row 4 Col 1: Test Density Bar Chart */}
        <div className="lg:col-span-2 bg-surface border border-border rounded-xl p-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-2">
              <Activity size={18} className="text-emerald-500" />
              Test Coverage Density Leaderboard
            </h3>
            <p className="text-zinc-500 text-xs mb-6">Tests per 1,000 Lines of Code (Top 5 vs Bottom 5)</p>

            <div className="h-[250px] w-full flex gap-4">
               {/* Leaders */}
               <div className="flex-1">
                 <p className="text-xs font-bold text-emerald-400 mb-2 uppercase tracking-wider text-center">Leaders</p>
                 <ResponsiveContainer width="100%" height="90%">
                    <BarChart layout="vertical" data={topTestDensity} margin={{ left: 0 }}>
                       <XAxis type="number" hide />
                       <YAxis dataKey="name" type="category" width={100} tick={{ fill: '#a1a1aa', fontSize: 10 }} />
                       <Tooltip cursor={{fill: '#27272a'}} contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a' }} />
                       <Bar 
                         dataKey="density" 
                         fill="#10b981" 
                         fillOpacity={0.3} 
                         stroke="#10b981"
                         radius={[0, 4, 4, 0]} 
                         barSize={20} 
                       />
                    </BarChart>
                 </ResponsiveContainer>
               </div>
               
               {/* Laggards */}
               <div className="flex-1 border-l border-zinc-800 pl-4">
                 <p className="text-xs font-bold text-red-400 mb-2 uppercase tracking-wider text-center">Needs Imp.</p>
                 <ResponsiveContainer width="100%" height="90%">
                    <BarChart layout="vertical" data={bottomTestDensity} margin={{ left: 0 }}>
                       <XAxis type="number" hide />
                       <YAxis orientation="right" dataKey="name" type="category" width={100} tick={{ fill: '#a1a1aa', fontSize: 10 }} />
                       <Tooltip cursor={{fill: '#27272a'}} contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a' }} />
                       <Bar 
                         dataKey="density" 
                         fill="#ef4444" 
                         fillOpacity={0.3} 
                         stroke="#ef4444"
                         radius={[4, 0, 0, 4]} 
                         barSize={20} 
                       />
                    </BarChart>
                 </ResponsiveContainer>
               </div>
            </div>
        </div>

      </div>

      {/* Insight Box */}
      <div className="bg-blue-500/5 border border-blue-500/20 rounded-xl p-6 flex gap-4 items-start">
         <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400 shrink-0">
            <AlertTriangle size={20} />
         </div>
         <div>
            <h4 className="text-white font-bold mb-1">Architecture Insight</h4>
            <p className="text-zinc-400 text-sm leading-relaxed">
              <strong>Nexus\Procurement</strong> and <strong>Nexus\Budget</strong> show high complexity (LOC > 5k) but lower document ratios compared to the platform average. 
              Prioritize documentation for these packages to reduce "Bus Factor" risk. Conversely, the <strong>Infrastructure</strong> vertical maintains the healthiest test density, 
              providing a stable foundation for the Tier 3 business packages.
            </p>
         </div>
      </div>
    </div>
  );
};

export default Analytics;
