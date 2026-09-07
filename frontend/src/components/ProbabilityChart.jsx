import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  Cell, 
  LabelList 
} from 'recharts';
import { BarChart2, Award } from 'lucide-react';

const CATEGORY_NAMES = {
  credit_card: 'Credit Card',
  credit_reporting: 'Credit Reporting',
  debt_collection: 'Debt Collection',
  mortgages_and_loans: 'Mortgages & Loans',
  retail_banking: 'Retail Banking'
};

export default function ProbabilityChart({ probabilities, predictedCategory }) {
  if (!probabilities) return null;

  // Prepare chart data array with all 5 categories
  const allCategories = ['credit_card', 'credit_reporting', 'debt_collection', 'mortgages_and_loans', 'retail_banking'];
  
  const chartData = allCategories.map((key) => {
    const rawVal = probabilities[key] !== undefined ? probabilities[key] : 0;
    return {
      key: key,
      name: CATEGORY_NAMES[key] || key,
      value: rawVal,
      formatted: `${rawVal.toFixed(2)}%`,
      isTop: key === predictedCategory
    };
  }).sort((a, b) => b.value - a.value); // Sort descending for horizontal bar chart

  // Custom tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-slate-900 text-white p-3 rounded-xl shadow-xl text-xs font-semibold border border-slate-700">
          <p className="text-slate-300 font-normal">{data.name}</p>
          <p className="text-lg font-bold text-indigo-400 font-mono mt-0.5">{data.formatted}</p>
          {data.isTop && (
            <span className="inline-block mt-1 px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px]">
              Top Prediction
            </span>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="glass-card rounded-2xl p-6 shadow-sm border border-slate-200/80">
      
      {/* Title Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <BarChart2 className="w-5 h-5 text-indigo-600" />
            <span>Probability Distribution</span>
          </h3>
          <p className="text-xs text-slate-500 font-medium">
            Confidence scores across all 5 financial complaint categories.
          </p>
        </div>

        <div className="hidden sm:flex items-center space-x-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-bold">
          <Award className="w-3.5 h-3.5 text-amber-500" />
          <span>Softmax Probabilities</span>
        </div>
      </div>

      {/* Recharts Bar Container */}
      <div className="h-72 sm:h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{ top: 5, right: 70, left: 20, bottom: 5 }}
          >
            <XAxis 
              type="number" 
              domain={[0, 100]} 
              tickFormatter={(v) => `${v}%`}
              tick={{ fontSize: 11, fill: '#64748b' }}
              axisLine={{ stroke: '#cbd5e1' }}
              tickLine={false}
            />
            <YAxis 
              type="category" 
              dataKey="name" 
              width={130}
              tick={{ fontSize: 12, fill: '#1e293b', fontWeight: 600 }}
              axisLine={{ stroke: '#cbd5e1' }}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(241, 245, 249, 0.6)' }} />
            
            <Bar 
              dataKey="value" 
              radius={[0, 8, 8, 0]} 
              barSize={28}
              animationDuration={1000}
            >
              {chartData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={
                    entry.isTop 
                      ? 'url(#topBarGradient)' 
                      : index % 2 === 0 ? '#94a3b8' : '#cbd5e1'
                  }
                  className="transition-all duration-300 hover:opacity-90"
                />
              ))}
              
              <LabelList 
                dataKey="formatted" 
                position="right" 
                style={{ fill: '#0f172a', fontSize: '12px', fontWeight: 700, fontFamily: 'monospace' }} 
              />
            </Bar>

            {/* Gradient definition */}
            <defs>
              <linearGradient id="topBarGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#2563eb" />
                <stop offset="100%" stopColor="#4f46e5" />
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Legend & Note */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between text-xs text-slate-500">
        <div className="flex items-center space-x-4">
          <span className="flex items-center space-x-1.5">
            <span className="w-3 h-3 rounded bg-indigo-600 inline-block"></span>
            <span className="font-semibold text-slate-700">Predicted Class</span>
          </span>
          <span className="flex items-center space-x-1.5">
            <span className="w-3 h-3 rounded bg-slate-400 inline-block"></span>
            <span>Other Categories</span>
          </span>
        </div>
        <span className="text-[11px] italic text-slate-400">All 5 categories shown simultaneously</span>
      </div>

    </div>
  );
}
