import React from 'react';
import { 
  Database, 
  Filter, 
  FileCode, 
  Binary, 
  Brain, 
  BarChart, 
  Zap, 
  ArrowRight,
  Code2
} from 'lucide-react';

export const PIPELINE_STEPS = [
  {
    step: '01',
    title: 'Data Collection',
    icon: Database,
    color: 'bg-blue-500 text-white',
    badge: '162,000+ Records',
    description: 'Collected raw customer financial complaint narratives across 5 core banking & credit domains from public CFPB repositories.',
    details: ['Raw text extraction', 'Domain filtering', '5 target classes']
  },
  {
    step: '02',
    title: 'Data Cleaning',
    icon: Filter,
    color: 'bg-indigo-500 text-white',
    badge: 'Sanitization',
    description: 'Removed null entries, duplicate records, non-narrative rows, and redacted personal identifiable information (PII).',
    details: ['Deduplication', 'Null drop', 'PII strip']
  },
  {
    step: '03',
    title: 'Text Preprocessing',
    icon: FileCode,
    color: 'bg-purple-500 text-white',
    badge: 'Regex Cleaning',
    description: 'Lowercased text, eliminated web URLs, email addresses, numbers, special characters, and trimmed redundant whitespace.',
    details: ['Lowercasing', 'URL regex', 'Special char strip']
  },
  {
    step: '04',
    title: 'TF-IDF Feature Extraction',
    icon: Binary,
    color: 'bg-teal-500 text-white',
    badge: '50,000 Features',
    description: 'Transformed unstructured text into numerical vector matrices using Term Frequency-Inverse Document Frequency with unigrams and bigrams.',
    details: ['Unigram & Bigram', 'Sublinear TF scaling', '50K Vocabulary']
  },
  {
    step: '05',
    title: 'Model Training',
    icon: Brain,
    color: 'bg-amber-500 text-white',
    badge: 'Supervised ML',
    description: 'Trained Complement Naive Bayes, Logistic Regression, and Support Vector Machines (SVM) using stratified train-test splitting.',
    details: ['Stratified Split (80/20)', 'Class Weighting', 'L2 Regularization']
  },
  {
    step: '06',
    title: 'Model Evaluation',
    icon: BarChart,
    color: 'bg-rose-500 text-white',
    badge: 'Benchmark',
    description: 'Evaluated models using Accuracy, Macro F1, and Weighted F1 metrics to select the optimal model for production deployment.',
    details: ['Confusion Matrix', 'Classification Report', 'Cross Validation']
  },
  {
    step: '07',
    title: 'Real-Time Prediction',
    icon: Zap,
    color: 'bg-emerald-500 text-white',
    badge: 'FastAPI Production',
    description: 'Deployed the trained Logistic Regression artifact inside a FastAPI REST endpoint with CORS support for instant React frontend prediction.',
    details: ['Sub-10ms Inference', 'JSON Endpoint', 'CORS Enabled']
  }
];

export default function NlpPipeline() {
  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="glass-card rounded-2xl p-6 border-l-4 border-indigo-600">
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">
          End-to-End NLP & Machine Learning Pipeline
        </h2>
        <p className="text-sm text-slate-600 font-medium mt-1">
          Detailed technical breakdown of how raw customer narratives are processed, vectorized, and classified into actionable insights.
        </p>
      </div>

      {/* Visual Workflow Steps Grid */}
      <div className="space-y-4">
        {PIPELINE_STEPS.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div 
              key={idx}
              className="glass-card rounded-2xl p-5 border border-slate-200/80 hover:border-indigo-300 transition-all duration-200 shadow-2xs group"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                
                <div className="flex items-start space-x-4">
                  <div className={`w-12 h-12 rounded-2xl ${item.color} flex items-center justify-center font-black text-lg shadow-sm shrink-0`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-mono font-bold text-indigo-600 uppercase">Step {item.step}</span>
                      <span className="text-slate-300">•</span>
                      <span className="text-xs font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                        {item.badge}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 mt-0.5 group-hover:text-indigo-600 transition-colors">
                      {item.title}
                    </h3>

                    <p className="text-xs text-slate-600 font-medium mt-1 leading-relaxed max-w-3xl">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 md:self-center">
                  {item.details.map((tag, tagIdx) => (
                    <span key={tagIdx} className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600 border border-slate-200">
                      {tag}
                    </span>
                  ))}
                </div>

              </div>
            </div>
          );
        })}
      </div>

      {/* Preprocessing Code Snippet Feature */}
      <div className="glass-card rounded-2xl p-6 bg-slate-900 text-white border border-slate-800">
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
          <div className="flex items-center space-x-2">
            <Code2 className="w-5 h-5 text-indigo-400" />
            <span className="text-sm font-bold text-slate-200">Python Text Sanitization Logic (`clean_text`)</span>
          </div>
          <span className="text-xs font-mono text-emerald-400">Deployed Regex Sanitizer</span>
        </div>

        <pre className="text-xs font-mono text-indigo-200 bg-slate-950 p-4 rounded-xl leading-relaxed overflow-x-auto border border-slate-800">
{`def clean_text(text: str) -> str:
    text = str(text).lower()
    text = re.sub(r"http\\S+|www\\S+|https\\S+", " ", text)
    text = re.sub(r"\\S+@\\S+", " ", text)
    text = re.sub(r"[^a-zA-Z0-9\\s]", " ", text)
    text = re.sub(r"\\s+", " ", text)
    return text.strip()`}
        </pre>
      </div>

    </div>
  );
}
