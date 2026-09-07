import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Sparkles, 
  CreditCard, 
  FileText, 
  PhoneCall, 
  Home, 
  Landmark, 
  ChevronDown, 
  ChevronUp, 
  Cpu, 
  Layers,
  AlertTriangle
} from 'lucide-react';

export const CATEGORY_META = {
  credit_card: {
    title: 'Credit Card',
    icon: CreditCard,
    color: 'from-blue-500 to-indigo-600',
    bgColor: 'bg-blue-50 text-blue-700 border-blue-200',
    iconBg: 'bg-blue-100 text-blue-600',
    description: 'Credit card charges, fees, billing errors, and transaction disputes.'
  },
  credit_reporting: {
    title: 'Credit Reporting',
    icon: FileText,
    color: 'from-purple-500 to-indigo-600',
    bgColor: 'bg-purple-50 text-purple-700 border-purple-200',
    iconBg: 'bg-purple-100 text-purple-600',
    description: 'Credit bureau report errors, dispute status, and score inaccuracies.'
  },
  debt_collection: {
    title: 'Debt Collection',
    icon: PhoneCall,
    color: 'from-rose-500 to-pink-600',
    bgColor: 'bg-rose-50 text-rose-700 border-rose-200',
    iconBg: 'bg-rose-100 text-rose-600',
    description: 'Third-party collector harassment, unknown debt verification, calls.'
  },
  mortgages_and_loans: {
    title: 'Mortgages & Loans',
    icon: Home,
    color: 'from-amber-500 to-orange-600',
    bgColor: 'bg-amber-50 text-amber-700 border-amber-200',
    iconBg: 'bg-amber-100 text-amber-600',
    description: 'Mortgage payments, escrow accounting, home loan modifications.'
  },
  retail_banking: {
    title: 'Retail Banking',
    icon: Landmark,
    color: 'from-emerald-500 to-teal-600',
    bgColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    iconBg: 'bg-emerald-100 text-emerald-600',
    description: 'Checking & savings account transactions, wire transfers, overdraft fees.'
  }
};

export default function PredictionCard({ prediction }) {
  const [showCleanedText, setShowCleanedText] = useState(false);

  if (!prediction) return null;

  const { category, confidence, cleaned_text } = prediction;
  const meta = CATEGORY_META[category] || {
    title: category ? category.replace(/_/g, ' ').toUpperCase() : 'Unknown',
    icon: Sparkles,
    color: 'from-indigo-500 to-blue-600',
    bgColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    iconBg: 'bg-indigo-100 text-indigo-600',
    description: 'Customer Complaint Category'
  };

  const Icon = meta.icon;

  return (
    <div className="glass-card rounded-2xl p-6 border-2 border-indigo-100 shadow-md relative overflow-hidden transition-all duration-300">
      
      {/* Top Banner Highlight */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div className="flex items-center space-x-2">
          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 font-bold text-xs">
            <CheckCircle2 className="w-4 h-4" />
          </span>
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Classification Result</span>
        </div>
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
          <Cpu className="w-3.5 h-3.5 text-indigo-600" />
          <span>Logistic Regression + TF-IDF</span>
        </div>
      </div>

      {/* Main Result Display Grid */}
      <div className="py-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        
        {/* Category Box */}
        <div className="md:col-span-7 flex items-start space-x-4">
          <div className={`p-4 rounded-2xl ${meta.iconBg} shadow-sm border border-slate-200/50 shrink-0`}>
            <Icon className="w-10 h-10" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase">Predicted Category</span>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-0.5">
              {meta.title}
            </h3>
            <p className="text-xs text-slate-500 font-medium mt-1 leading-relaxed">
              {meta.description}
            </p>
          </div>
        </div>

        {/* Confidence Percentage Metric */}
        <div className="md:col-span-5 bg-gradient-to-br from-slate-900 to-indigo-950 p-5 rounded-2xl text-white shadow-lg relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 transform translate-x-4 -translate-y-4 w-24 h-24 bg-indigo-500/10 rounded-full blur-xl"></div>
          
          <div className="flex items-center justify-between text-xs text-indigo-200 font-semibold mb-1">
            <span>Model Confidence</span>
            <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-mono text-[11px]">
              Probability Score
            </span>
          </div>

          <div className="flex items-baseline space-x-2 my-1">
            <span className="text-4xl sm:text-5xl font-black tracking-tight text-white font-mono">
              {confidence.toFixed(2)}%
            </span>
          </div>

          {/* Animated Progress Bar */}
          <div className="w-full bg-slate-800 rounded-full h-2 mt-2 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-indigo-400 to-emerald-400 h-2 rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${Math.min(100, Math.max(0, confidence))}%` }}
            ></div>
          </div>
        </div>

      </div>

      {/* Processed Text Section Expander */}
      <div className="mt-2 pt-4 border-t border-slate-100">
        <button
          onClick={() => setShowCleanedText(!showCleanedText)}
          className="flex items-center justify-between w-full text-xs font-bold text-slate-600 hover:text-indigo-600 transition-colors py-1"
        >
          <div className="flex items-center space-x-2">
            <Layers className="w-4 h-4 text-indigo-500" />
            <span>View Preprocessed NLP Text Transformation</span>
          </div>
          {showCleanedText ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {showCleanedText && (
          <div className="mt-3 p-3 bg-slate-900 rounded-xl text-slate-200 text-xs font-mono border border-slate-800 leading-relaxed overflow-x-auto">
            <div className="flex items-center justify-between text-[11px] text-slate-400 pb-2 mb-2 border-b border-slate-800">
              <span>Sanitized Token Stream (Lowercase, No URLs, Clean Punctuation):</span>
              <span className="text-emerald-400 font-semibold">Cleaned</span>
            </div>
            <p className="whitespace-pre-wrap">{cleaned_text || 'No text processed'}</p>
          </div>
        )}
      </div>

    </div>
  );
}
