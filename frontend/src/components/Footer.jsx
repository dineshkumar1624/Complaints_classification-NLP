import React from 'react';
import { Landmark, Heart } from 'lucide-react';

export default function Footer({ setActiveTab }) {
  return (
    <footer className="mt-16 border-t border-slate-200/80 bg-white/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg gradient-accent flex items-center justify-center text-white shadow-xs">
              <Landmark className="w-4 h-4" />
            </div>
            <div>
              <span className="font-extrabold text-base tracking-tight text-slate-900">Complaint<span className="text-indigo-600">AI</span></span>
              <p className="text-xs text-slate-500 font-medium">Customer Complaint Classification NLP System</p>
            </div>
          </div>

          {/* Quick Footer Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-semibold text-slate-600">
            <button onClick={() => setActiveTab('classifier')} className="hover:text-indigo-600 transition-colors">Classifier</button>
            <button onClick={() => setActiveTab('performance')} className="hover:text-indigo-600 transition-colors">Model Performance</button>
            <button onClick={() => setActiveTab('pipeline')} className="hover:text-indigo-600 transition-colors">NLP Pipeline</button>
            <button onClick={() => setActiveTab('about')} className="hover:text-indigo-600 transition-colors">About</button>
            <a href="http://localhost:8000/docs" target="_blank" rel="noreferrer" className="hover:text-indigo-600 transition-colors">FastAPI Docs</a>
          </div>

          <div className="text-xs text-slate-500 font-medium text-center md:text-right">
            <span>Powered by Scikit-Learn &bull; FastAPI &bull; React &bull; Tailwind CSS</span>
          </div>

        </div>
      </div>
    </footer>
  );
}
