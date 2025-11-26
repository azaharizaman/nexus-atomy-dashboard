import React from 'react';
import { LayoutDashboard, Package, Map, BarChart3, Settings } from 'lucide-react';
import { ViewMode } from '../types';

interface SidebarProps {
  currentView: ViewMode;
  setView: (view: ViewMode) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setView }) => {
  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Overview' },
    { id: 'packages', icon: Package, label: 'Packages' },
    { id: 'roadmap', icon: Map, label: 'Roadmap' },
    { id: 'analytics', icon: BarChart3, label: 'Analytics' },
  ];

  return (
    <div className="w-64 border-r border-border bg-black/50 backdrop-blur-md flex flex-col h-full fixed left-0 top-0 z-50">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center">
            <span className="text-white font-bold text-lg">N</span>
          </div>
          <h1 className="text-xl font-bold tracking-tight text-white">Nexus ERP</h1>
        </div>
        <p className="text-xs text-zinc-500 pl-10 font-medium">FRAMEWORK</p>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1">
        {menuItems.map((item) => {
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setView(item.id as ViewMode)}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-md transition-all duration-200 group ${
                isActive
                  ? 'bg-zinc-900 text-white border border-zinc-800 shadow-lg shadow-black/20'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-900/50'
              }`}
            >
              <item.icon
                size={18}
                className={`transition-colors ${isActive ? 'text-primary' : 'text-zinc-500 group-hover:text-zinc-300'}`}
              />
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-zinc-500">
          <Settings size={18} />
          <span>v2025.11.25</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
