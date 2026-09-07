import React from 'react';
import { 
  Sparkles, 
  Trash2, 
  Send, 
  CreditCard, 
  FileText, 
  PhoneCall, 
  Home, 
  Landmark,
  Loader2,
  HelpCircle
} from 'lucide-react';

export const SAMPLE_COMPLAINTS = [
  {
    category: 'Credit Card',
    icon: CreditCard,
    text: "My credit card company charged me twice for the same purchase on my monthly statement. I submitted a dispute online over two weeks ago, but they still haven't refunded the duplicate $250 charge or removed the late fee applied to my account."
  },
  {
    category: 'Credit Reporting',
    icon: FileText,
    text: "I found several incorrect accounts on my Equifax credit report that do not belong to me. There is a fraudulent debt listed that is severely lowering my credit score. I sent formal dispute letters but received no resolution."
  },
  {
    category: 'Debt Collection',
    icon: PhoneCall,
    text: "A third-party debt collection agency keeps calling my cell phone multiple times a day demanding payment for a debt that I already settled years ago. They are using aggressive tactics and refusing to provide written debt validation."
  },
  {
    category: 'Mortgages & Loans',
    icon: Home,
    text: "My mortgage servicer misapplied my monthly escrow payment to principal only, causing my property tax payment to bounce. They are now threatening me with foreclosure fees due to their internal calculation accounting error."
  },
  {
    category: 'Retail Banking',
    icon: Landmark,
    text: "There is an unauthorized wire transfer transaction of $1,200 deducted from my checking account without my consent. When I called bank customer support, they locked my online account without reversing the fraudulent transaction."
  }
];

export default function ComplaintInput({ 
  complaint, 
  setComplaint, 
  onAnalyze, 
  isLoading, 
  onClear 
}) {
  const wordCount = complaint.trim() ? complaint.trim().split(/\s+/).length : 0;
  const charCount = complaint.length;

  const handleSelectSample = (sampleText) => {
    setComplaint(sampleText);
  };

  return (
    <div className="glass-card rounded-2xl p-6 shadow-sm border border-slate-200/80">
      
      {/* Title & Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-600" />
            <span>Enter Customer Complaint Narrative</span>
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            Paste raw text or select a sample complaint below for automated NLP classification.
          </p>
        </div>

        {/* Word count */}
        <div className="flex items-center space-x-3 text-xs font-semibold text-slate-500">
          <span className="px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200">
            {wordCount} {wordCount === 1 ? 'word' : 'words'}
          </span>
          <span className="px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200">
            {charCount} chars
          </span>
        </div>
      </div>

      {/* Sample Quick Chips */}
      <div className="mb-4">
        <div className="flex items-center space-x-1 mb-2 text-xs font-bold text-slate-600">
          <HelpCircle className="w-3.5 h-3.5 text-indigo-500" />
          <span>Try a sample complaint:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {SAMPLE_COMPLAINTS.map((sample, idx) => {
            const Icon = sample.icon;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectSample(sample.text)}
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-50/70 text-indigo-700 hover:bg-indigo-100 hover:text-indigo-900 border border-indigo-200/60 transition-all duration-150 cursor-pointer shadow-2xs"
              >
                <Icon className="w-3.5 h-3.5 text-indigo-600" />
                <span>{sample.category}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Textarea Input */}
      <div className="relative mb-4">
        <textarea
          rows={5}
          value={complaint}
          onChange={(e) => setComplaint(e.target.value)}
          placeholder="Type or paste the financial complaint narrative here (e.g. 'I was charged double interest fees on my credit card statement without prior notification...')"
          className="w-full p-4 rounded-xl border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-slate-900 placeholder-slate-400 text-sm md:text-base leading-relaxed transition-all resize-y outline-none bg-white/90 shadow-inner"
        />
        {complaint && (
          <button
            onClick={onClear}
            className="absolute top-3 right-3 p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
            title="Clear text"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onClear}
          disabled={!complaint || isLoading}
          className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          Clear Input
        </button>

        <button
          type="button"
          onClick={onAnalyze}
          disabled={!complaint.strip ? !complaint.trim() || isLoading : false}
          className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl font-bold text-sm text-white gradient-accent hover:opacity-95 shadow-md shadow-indigo-500/25 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 cursor-pointer"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-white" />
              <span>Analyzing NLP Model...</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>Analyze Complaint</span>
            </>
          )}
        </button>
      </div>

    </div>
  );
}
