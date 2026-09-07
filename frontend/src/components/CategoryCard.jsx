import React from 'react';
import { 
  CreditCard, 
  FileText, 
  PhoneCall, 
  Home, 
  Landmark, 
  ArrowRight 
} from 'lucide-react';

export const CATEGORIES_LIST = [
  {
    id: 'credit_card',
    name: 'Credit Card',
    icon: CreditCard,
    color: 'border-l-blue-500 text-blue-600 bg-blue-50',
    hoverBorder: 'hover:border-blue-400',
    description: 'Credit card charges, rewards, double billing, annual fees, and transaction disputes.',
    sample: 'My credit card company charged me twice for the same purchase.'
  },
  {
    id: 'credit_reporting',
    name: 'Credit Reporting',
    icon: FileText,
    color: 'border-l-purple-500 text-purple-600 bg-purple-50',
    hoverBorder: 'hover:border-purple-400',
    description: 'Incorrect credit bureau items, identity theft marks, score dispute letters.',
    sample: 'I found several incorrect accounts on my credit report and I want them removed.'
  },
  {
    id: 'debt_collection',
    name: 'Debt Collection',
    icon: PhoneCall,
    color: 'border-l-rose-500 text-rose-600 bg-rose-50',
    hoverBorder: 'hover:border-rose-400',
    description: 'Aggressive collector calls, invalid debt demands, harassment complaints.',
    sample: 'A debt collector keeps calling me about a debt that I do not owe.'
  },
  {
    id: 'mortgages_and_loans',
    name: 'Mortgages & Loans',
    icon: Home,
    color: 'border-l-amber-500 text-amber-600 bg-amber-50',
    hoverBorder: 'hover:border-amber-400',
    description: 'Mortgage escrow calculation errors, property tax deposits, loan modifications.',
    sample: 'My mortgage payment was incorrectly calculated and I need help with my home loan.'
  },
  {
    id: 'retail_banking',
    name: 'Retail Banking',
    icon: Landmark,
    color: 'border-l-emerald-500 text-emerald-600 bg-emerald-50',
    hoverBorder: 'hover:border-emerald-400',
    description: 'Unauthorized bank account transfers, checking/savings overdrafts, wire issues.',
    sample: 'There is an unauthorized transaction in my bank account.'
  }
];

export default function CategoryCard({ onSelectCategory }) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">
            Supported Complaint Categories
          </h3>
          <p className="text-xs text-slate-500 font-medium">
            The NLP model is trained to classify text into five distinct financial domain categories.
          </p>
        </div>
        <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100 self-start sm:self-auto">
          5 Classes Trained
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {CATEGORIES_LIST.map((cat) => {
          const Icon = cat.icon;
          return (
            <div
              key={cat.id}
              onClick={() => onSelectCategory(cat.sample)}
              className={`glass-card rounded-2xl p-5 border-l-4 ${cat.color} ${cat.hoverBorder} transition-all duration-200 hover:-translate-y-1 hover:shadow-md cursor-pointer flex flex-col justify-between group`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-2.5 rounded-xl ${cat.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
                </div>
                <h4 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                  {cat.name}
                </h4>
                <p className="text-xs text-slate-500 font-medium mt-1.5 leading-relaxed">
                  {cat.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center text-[11px] font-bold text-indigo-600">
                <span>Test this category &rarr;</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
