import React, { useState } from 'react';
import { LayoutDashboard, Package, Map, BarChart3, Settings, Menu, X } from 'lucide-react';
import { ViewMode } from '../types';

interface NavbarProps {
  currentView: ViewMode;
  setView: (view: ViewMode) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, setView }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Overview' },
    { id: 'packages', icon: Package, label: 'Packages' },
    { id: 'roadmap', icon: Map, label: 'Roadmap' },
    { id: 'analytics', icon: BarChart3, label: 'Analytics' },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-border bg-black/80 backdrop-blur-md flex items-center justify-between px-6 md:px-8">
        {/* Brand & Mobile Toggle */}
        <div className="flex items-center gap-4">
          <button 
            className="md:hidden text-zinc-400 hover:text-white transition-colors"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu size={24} />
          </button>

          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setView('dashboard')}>
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center shadow-lg shadow-primary/20">
              <span className="text-white font-bold text-lg">N</span>
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight text-white leading-none">Nexus ERP</h1>
              <p className="text-[10px] text-zinc-500 font-medium tracking-wider">FRAMEWORK</p>
            </div>
          </div>
        </div>

        {/* Navigation - Desktop */}
        <div className="hidden md:flex items-center gap-1">
          {menuItems.map((item) => {
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setView(item.id as ViewMode)}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
                  isActive
                    ? 'bg-zinc-800 text-white shadow-inner'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
                }`}
              >
                <item.icon size={16} className={isActive ? 'text-primary' : ''} />
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-md bg-zinc-900 border border-zinc-800 text-xs text-zinc-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"/>
            v2025.11.25
          </div>
          <button className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-full transition-colors">
            <Settings size={20} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[100] md:hidden">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                style={{ animation: 'fadeInOpacity 0.3s ease-out forwards' }}
                onClick={() => setIsMobileMenuOpen(false)}
            />
            
            {/* Drawer */}
            <div 
                className="absolute top-0 left-0 bottom-0 w-[90%] bg-zinc-950 border-r border-zinc-800 shadow-2xl flex flex-col"
                style={{ animation: 'slideInLeft 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards' }}
            >
                {/* Drawer Header */}
                <div className="p-6 border-b border-zinc-800 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center">
                            <span className="text-white font-bold text-lg">N</span>
                        </div>
                        <div>
                            <h1 className="text-lg font-bold text-white leading-none">Nexus ERP</h1>
                            <p className="text-[10px] text-zinc-500 font-medium tracking-wider">FRAMEWORK</p>
                        </div>
                    </div>
                    <button 
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="p-2 text-zinc-400 hover:text-white bg-zinc-900 rounded-full border border-zinc-800"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Drawer Nav */}
                <div className="p-4 flex-1 overflow-y-auto">
                    <div className="space-y-2">
                        {menuItems.map((item) => {
                            const isActive = currentView === item.id;
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => {
                                        setView(item.id as ViewMode);
                                        setIsMobileMenuOpen(false);
                                    }}
                                    className={`w-full flex items-center gap-4 px-4 py-4 text-base font-medium rounded-xl transition-all ${
                                        isActive
                                            ? 'bg-zinc-800 text-white border border-zinc-700'
                                            : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                                    }`}
                                >
                                    <item.icon size={20} className={isActive ? 'text-primary' : ''} />
                                    {item.label}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Drawer Footer */}
                <div className="p-6 border-t border-zinc-800 bg-zinc-900/30">
                     <div className="flex items-center gap-2 px-3 py-2 rounded-md bg-zinc-900 border border-zinc-800 text-sm text-zinc-400 w-fit">
                        <span className="w-2 h-2 rounded-full bg-emerald-500"/>
                        v2025.11.25
                    </div>
                </div>
            </div>
        </div>
      )}

      <style>{`
          @keyframes slideInLeft {
              from { transform: translateX(-100%); }
              to { transform: translateX(0); }
          }
          @keyframes fadeInOpacity {
              from { opacity: 0; }
              to { opacity: 1; }
          }
      `}</style>
    </>
  );
};

export default Navbar;