
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Packages from './pages/Packages';
import Roadmap from './pages/Roadmap';
import Analytics from './pages/Analytics';
import { ViewMode } from './types';

const App: React.FC = () => {
  const [view, setView] = useState<ViewMode>('dashboard');

  const renderView = () => {
    switch (view) {
      case 'dashboard':
        return <Dashboard />;
      case 'packages':
        return <Packages />;
      case 'roadmap':
        return <Roadmap />;
      case 'analytics':
        return <Analytics />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-background text-zinc-100 font-sans selection:bg-primary/30">
      <Navbar currentView={view} setView={setView} />
      
      <main className="min-h-screen pt-16">
        <div className="max-w-7xl mx-auto p-6 md:p-8">
          {/* Header Area */}
          <header className="flex justify-between items-center mb-8 mt-4">
            <div className="text-sm breadcrumbs text-zinc-500">
              <span>App</span> 
              <span className="mx-2">/</span> 
              <span className="text-white capitalize">{view}</span>
            </div>
            <div className="flex gap-3">
              <button className="px-4 py-2 text-sm bg-white text-black font-semibold rounded hover:bg-zinc-200 transition-colors shadow-lg shadow-white/10">
                Export Report
              </button>
            </div>
          </header>

          {renderView()}
        </div>
      </main>
    </div>
  );
};

export default App;
