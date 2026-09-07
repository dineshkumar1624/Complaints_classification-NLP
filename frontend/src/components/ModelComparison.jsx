import React from 'react';
import { 
  Trophy, 
  BarChart3, 
  CheckCircle, 
  Award, 
  Zap, 
  Grid, 
  TrendingUp,
  Cpu
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  Legend, 
  Cell 
} from 'recharts';

export const MODEL_PERFORMANCE_DATA = [
  {
    model: 'Complement Naive Bayes',
    accuracy: 82.40,
    macroF1: 80.68,
    weightedF1: 82.38,
    badge: 'Baseline Fast Model',
    color: '#6366f1'
  },
  {
    model: 'Logistic Regression',
    accuracy: 85.69,
    macroF1: 84.61,
    weightedF1: 85.79,
    badge: 'Highest Macro F1 (84.61%) - Deployed',
    color: '#2563eb',
    isDeployed: true
  },
  {
    model: 'SVM',
    accuracy: 86.06,
    macroF1: 84.48,
    weightedF1: 86.08,
    badge: 'Highest Accuracy (86.06%)',
    color: '#0d9488'
  }
];

export const COMPARISON_CHART_DATA = [
  { metric: 'Accuracy (%)', 'Complement Naive Bayes': 82.40, 'Logistic Regression': 85.69, 'SVM': 86.06 },
  { metric: 'Macro F1 (%)', 'Complement Naive Bayes': 80.68, 'Logistic Regression': 84.61, 'SVM': 84.48 },
  { metric: 'Weighted F1 (%)', 'Complement Naive Bayes': 82.38, 'Logistic Regression': 85.79, 'SVM': 86.08 }
];

export const CONFUSION_MATRIX_DATA = [
  { category: 'Credit Card', credit_card: 92, credit_reporting: 3, debt_collection: 2, mortgages: 1, retail_banking: 2 },
  { category: 'Credit Reporting', credit_card: 2, credit_reporting: 88, debt_collection: 7, mortgages: 2, retail_banking: 1 },
  { category: 'Debt Collection', credit_card: 3, credit_reporting: 8, debt_collection: 85, mortgages: 2, retail_banking: 2 },
  { category: 'Mortgages & Loans', credit_card: 1, credit_reporting: 3, debt_collection: 2, mortgages: 91, retail_banking: 3 },
  { category: 'Retail Banking', credit_card: 3, credit_reporting: 1, debt_collection: 2, mortgages: 3, retail_banking: 91 }
];

export default function ModelComparison() {
  return (
    <div className="space-y-8">
      
      {/* Top Banner & Highlights */}
      <div className="glass-card rounded-2xl p-6 border-l-4 border-indigo-600">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-indigo-600 font-bold text-xs uppercase tracking-wider mb-1">
              <Trophy className="w-4 h-4 text-amber-500" />
              <span>Benchmark Evaluation</span>
            </div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              Machine Learning Model Performance & Benchmark
            </h2>
            <p className="text-sm text-slate-600 font-medium mt-1">
              Three supervised learning algorithms were evaluated on 162K+ financial complaint narratives using TF-IDF feature extraction.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <div className="bg-teal-50 border border-teal-200 text-teal-800 px-3.5 py-2 rounded-xl text-xs font-bold flex items-center space-x-2 shadow-2xs">
              <Award className="w-4 h-4 text-teal-600" />
              <span>SVM Highest Accuracy: <strong>86.06%</strong></span>
            </div>

            <div className="bg-blue-50 border border-blue-200 text-blue-800 px-3.5 py-2 rounded-xl text-xs font-bold flex items-center space-x-2 shadow-2xs">
              <Zap className="w-4 h-4 text-blue-600" />
              <span>Logistic Regression Highest Macro F1: <strong>84.61%</strong></span>
            </div>
          </div>
        </div>
      </div>

      {/* Model Performance Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {MODEL_PERFORMANCE_DATA.map((item, idx) => (
          <div 
            key={idx}
            className={`glass-card rounded-2xl p-6 border transition-all duration-300 relative ${
              item.isDeployed ? 'border-2 border-indigo-500 shadow-md bg-gradient-to-b from-white to-indigo-50/20' : 'border-slate-200'
            }`}
          >
            {item.isDeployed && (
              <span className="absolute -top-3 right-4 px-3 py-0.5 rounded-full text-[11px] font-extrabold bg-indigo-600 text-white shadow-sm flex items-center gap-1">
                <CheckCircle className="w-3 h-3" /> Deployed Model
              </span>
            )}

            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-slate-100 text-slate-700">
                <Cpu className="w-6 h-6 text-indigo-600" />
              </div>
              <span className={`text-[11px] font-bold px-2.5 py-1 rounded-md ${
                item.model === 'SVM' 
                  ? 'bg-teal-100 text-teal-800' 
                  : item.model === 'Logistic Regression' 
                  ? 'bg-blue-100 text-blue-800' 
                  : 'bg-slate-100 text-slate-700'
              }`}>
                {item.badge}
              </span>
            </div>

            <h3 className="text-xl font-bold text-slate-900 mb-4">{item.model}</h3>

            <div className="space-y-3 font-mono text-sm">
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-200/60">
                <span className="text-xs font-sans font-semibold text-slate-600">Accuracy</span>
                <span className="font-bold text-slate-900 text-base">{item.accuracy.toFixed(2)}%</span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-200/60">
                <span className="text-xs font-sans font-semibold text-slate-600">Macro F1</span>
                <span className="font-bold text-indigo-600 text-base">{item.macroF1.toFixed(2)}%</span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-200/60">
                <span className="text-xs font-sans font-semibold text-slate-600">Weighted F1</span>
                <span className="font-bold text-slate-900 text-base">{item.weightedF1.toFixed(2)}%</span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-500 font-medium">
              Evaluated with 50,000 TF-IDF features (unigram + bigram)
            </div>
          </div>
        ))}
      </div>

      {/* Model Metrics Grouped Bar Chart */}
      <div className="glass-card rounded-2xl p-6 shadow-sm border border-slate-200">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-indigo-600" />
              <span>Comparative Benchmark Chart</span>
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Comparison across Accuracy, Macro F1, and Weighted F1 metrics.
            </p>
          </div>
        </div>

        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={COMPARISON_CHART_DATA} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <XAxis dataKey="metric" tick={{ fontSize: 12, fontWeight: 700, fill: '#334155' }} />
              <YAxis domain={[75, 90]} tick={{ fontSize: 11, fill: '#64748b' }} tickFormatter={(v) => `${v}%`} />
              <Tooltip 
                formatter={(val) => [`${val}%`, 'Score']}
                contentStyle={{ borderRadius: '12px', background: '#0f172a', color: '#fff', border: 'none' }}
              />
              <Legend wrapperStyle={{ paddingTop: '15px' }} />
              <Bar dataKey="Complement Naive Bayes" fill="#818cf8" radius={[6, 6, 0, 0]} />
              <Bar dataKey="Logistic Regression" fill="#2563eb" radius={[6, 6, 0, 0]} />
              <Bar dataKey="SVM" fill="#0d9488" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Confusion Matrix Breakdown */}
      <div className="glass-card rounded-2xl p-6 shadow-sm border border-slate-200">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Grid className="w-5 h-5 text-indigo-600" />
              <span>Model Confusion Matrix</span>
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Normalized classification accuracy percentage grid across all 5 financial categories.
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                <th className="p-3">Actual \ Predicted</th>
                <th className="p-3 text-center">Credit Card</th>
                <th className="p-3 text-center">Credit Reporting</th>
                <th className="p-3 text-center">Debt Collection</th>
                <th className="p-3 text-center">Mortgages & Loans</th>
                <th className="p-3 text-center">Retail Banking</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 font-mono">
              {CONFUSION_MATRIX_DATA.map((row, i) => (
                <tr key={i} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-3 font-sans font-bold text-slate-900 bg-slate-50/50">{row.category}</td>
                  <td className="p-3 text-center font-bold bg-blue-50 text-blue-800">{row.credit_card}%</td>
                  <td className="p-3 text-center font-bold bg-purple-50 text-purple-800">{row.credit_reporting}%</td>
                  <td className="p-3 text-center font-bold bg-rose-50 text-rose-800">{row.debt_collection}%</td>
                  <td className="p-3 text-center font-bold bg-amber-50 text-amber-800">{row.mortgages}%</td>
                  <td className="p-3 text-center font-bold bg-emerald-50 text-emerald-800">{row.retail_banking}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
