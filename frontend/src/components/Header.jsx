import React, { useState } from 'react';
import { 
  Landmark, 
  BrainCircuit, 
  BarChart3, 
  GitCommit, 
  Info, 
  Activity, 
  Menu, 
  X,
  Sparkles
} from 'lucide-react';

export default function Header({ activeTab, setActiveTab, apiStatus, onRetryStatus }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'classifier', label: 'Classifier', icon: BrainCircuit },
    { id: 'performance', label: 'Model Performance', icon: BarChart3 },
    { id: 'pipeline', label: 'NLP Pipeline', icon: GitCommit },
    { id: 'about', label: 'About', icon: Info },
  ];

  return (
    <header className="sticky top-0 z-50 glass-card border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('classifier')}>
            <div className="w-10 h-10 rounded-xl gradient-accent flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
              <Landmark className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-xl tracking-tight text-slate-900">Complaint<span className="text-indigo-600">AI</span></span>
                <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200/60 hidden sm:inline-block">
                  v1.0 ML
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium hidden md:block">Financial NLP Classifier</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 bg-slate-100/80 p-1 rounded-xl border border-slate-200/60">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-white text-indigo-600 shadow-xs border border-slate-200/60'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* API Health Status Badge & Quick Action */}
          <div className="hidden lg:flex items-center space-x-3">
            <div 
              onClick={onRetryStatus}
              title="Click to re-check API connection"
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-full border text-xs font-semibold cursor-pointer transition-all ${
                apiStatus === 'online'
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                  : apiStatus === 'checking'
                  ? 'bg-amber-50 text-amber-700 border-amber-200'
                  : 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100'
              }`}
            >
              <span className="relative flex h-2 w-2">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                  apiStatus === 'online' ? 'bg-emerald-400' : 'bg-rose-400'
                }`}></span>
                <span className={`relative inline-flex rounded-full h-2 w-2 ${
                  apiStatus === 'online' ? 'bg-emerald-500' : apiStatus === 'checking' ? 'bg-amber-500' : 'bg-rose-500'
                }`}></span>
              </span>
              <span>
                {apiStatus === 'online' ? 'FastAPI Online (8000)' : apiStatus === 'checking' ? 'Connecting API...' : 'API Disconnected'}
              </span>
            </div>

            <a
              href="http://localhost:8000/docs"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors shadow-2xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
              <span>API Docs</span>
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-2 pb-4 space-y-1 shadow-lg">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-base font-semibold ${
                  isActive ? 'bg-indigo-50 text-indigo-600' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
          
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between px-3">
            <span className="text-xs font-medium text-slate-500">Backend API (Port 8000):</span>
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
              apiStatus === 'online' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
            }`}>
              {apiStatus === 'online' ? 'Active' : 'Offline'}
            </span>
          </div>
        </div>
      )}
    </header>
  );
}
