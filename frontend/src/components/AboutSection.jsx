import React from 'react';
import { 
  Landmark, 
  Target, 
  Layers, 
  Cpu, 
  CheckCircle2, 
  Sparkles,
  ShieldCheck,
  Server
} from 'lucide-react';

export const TECH_STACK = [
  { category: 'Machine Learning', items: ['Python', 'Scikit-learn', 'TF-IDF Vectorizer', 'Logistic Regression', 'SVM', 'Naive Bayes'] },
  { category: 'Backend API', items: ['FastAPI', 'Uvicorn', 'Pydantic', 'Pickle Artifacts', 'CORS Middleware'] },
  { category: 'Frontend UI', items: ['React 18', 'Vite', 'Tailwind CSS', 'Lucide Icons', 'Recharts', 'Framer Motion'] }
];

export default function AboutSection() {
  return (
    <div className="space-y-8">
      
      {/* Hero Overview */}
      <div className="glass-card rounded-2xl p-8 border border-slate-200 relative overflow-hidden">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold border border-indigo-200">
            <Landmark className="w-3.5 h-3.5" />
            <span>Financial Services Natural Language Processing</span>
          </div>

          <h2 className="text-3xl font-black text-slate-900 tracking-tight">
            Automated Financial Complaint Classification System
          </h2>

          <p className="text-sm text-slate-600 leading-relaxed font-medium">
            <strong>ComplaintAI</strong> is an end-to-end Machine Learning solution designed to ingest unstructured customer financial complaints and automatically classify them into five distinct domain categories. By analyzing text patterns using TF-IDF feature vectors, the system dramatically reduces manual triage overhead and improves operational response times.
          </p>
        </div>
      </div>

      {/* Objective & Architecture Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Core Objective Card */}
        <div className="glass-card rounded-2xl p-6 border border-slate-200 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
            <Target className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">Project Objective</h3>
          <p className="text-xs text-slate-600 font-medium leading-relaxed">
            Provide financial institutions with an accurate, low-latency API to automatically route incoming customer disputes to the appropriate internal support teams (Credit Card, Credit Reporting, Debt Collection, Mortgages, or Retail Banking).
          </p>
          
          <ul className="space-y-2 pt-2 text-xs font-semibold text-slate-700">
            <li className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Automate complaint ticket triage</span>
            </li>
            <li className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Provide confidence distribution scores for transparency</span>
            </li>
            <li className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Achieve over 85% classification accuracy across all categories</span>
            </li>
          </ul>
        </div>

        {/* System Architecture Card */}
        <div className="glass-card rounded-2xl p-6 border border-slate-200 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">
            <Server className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">System Architecture</h3>
          <p className="text-xs text-slate-600 font-medium leading-relaxed">
            Built as a decoupled SaaS architecture separating the RESTful Python FastAPI inference server from a lightweight React single-page application.
          </p>

          <div className="p-3 bg-slate-900 rounded-xl text-white text-xs font-mono border border-slate-800 space-y-1.5">
            <div className="text-indigo-400 font-bold">[React Frontend (Port 5173)]</div>
            <div className="text-slate-400 pl-4">&darr; POST /predict {"{ complaint: string }"}</div>
            <div className="text-emerald-400 font-bold">[FastAPI Backend (Port 8000)]</div>
            <div className="text-slate-400 pl-4">&darr; loads best_complaint_model.pkl</div>
            <div className="text-indigo-300 font-bold">[Logistic Regression + TF-IDF (50K Features)]</div>
          </div>
        </div>

      </div>

      {/* Tech Stack Grid */}
      <div className="glass-card rounded-2xl p-6 border border-slate-200 space-y-4">
        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Layers className="w-5 h-5 text-indigo-600" />
          <span>Technologies & Frameworks</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {TECH_STACK.map((stack, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
              <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-600 mb-2.5">
                {stack.category}
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {stack.items.map((item, itemIdx) => (
                  <span key={itemIdx} className="text-xs font-semibold px-2.5 py-1 rounded-md bg-white text-slate-800 border border-slate-200 shadow-2xs">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
