import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import StatCard from './components/StatCard';
import ComplaintInput from './components/ComplaintInput';
import PredictionCard from './components/PredictionCard';
import ProbabilityChart from './components/ProbabilityChart';
import CategoryCard from './components/CategoryCard';
import ModelComparison from './components/ModelComparison';
import NlpPipeline from './components/NlpPipeline';
import AboutSection from './components/AboutSection';
import Footer from './components/Footer';

import { 
  FileText, 
  Layers, 
  Binary, 
  Target, 
  AlertCircle, 
  RefreshCw, 
  BrainCircuit,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('classifier');
  const [complaint, setComplaint] = useState('');
  const [prediction, setPrediction] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [apiStatus, setApiStatus] = useState('checking');

  const API_BASE_URL = 'http://localhost:8000';

  // Check API health on load & periodically
  const checkApiHealth = async () => {
    try {
      setApiStatus('checking');
      const res = await fetch(`${API_BASE_URL}/health`);
      if (res.ok) {
        setApiStatus('online');
      } else {
        setApiStatus('offline');
      }
    } catch (err) {
      console.warn('Backend API connection check failed:', err);
      setApiStatus('offline');
    }
  };

  useEffect(() => {
    checkApiHealth();
  }, []);

  // Handle complaint classification submit
  const handleAnalyze = async () => {
    if (!complaint || !complaint.trim()) {
      setError('Please enter a complaint text before analyzing.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/predict`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ complaint: complaint.trim() }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || `Server returned status ${response.status}`);
      }

      const data = await response.json();
      setPrediction(data);
      setApiStatus('online');

      // Scroll smoothly to prediction result section
      setTimeout(() => {
        const resultElem = document.getElementById('prediction-results-section');
        if (resultElem) {
          resultElem.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);

    } catch (err) {
      console.error('Prediction API Error:', err);
      setError(
        err.message || 'Failed to connect to FastAPI backend server on http://localhost:8000. Please verify the Python backend is running.'
      );
      setApiStatus('offline');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setComplaint('');
    setPrediction(null);
    setError(null);
  };

  const handleSelectCategorySample = (sampleText) => {
    setActiveTab('classifier');
    setComplaint(sampleText);
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col selection:bg-indigo-500 selection:text-white">
      
      {/* SaaS Navigation Header */}
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        apiStatus={apiStatus}
        onRetryStatus={checkApiHealth}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        
        {/* Tab 1: CLASSIFIER MAIN PAGE */}
        {activeTab === 'classifier' && (
          <div className="space-y-10">
            
            {/* Hero Banner Section */}
            <section className="relative glass-card rounded-3xl p-6 sm:p-10 border border-slate-200/80 gradient-bg-hero overflow-hidden shadow-xs">
              <div className="max-w-3xl space-y-4">
                
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-100/80 text-indigo-800 text-xs font-bold border border-indigo-200/60">
                  <BrainCircuit className="w-4 h-4 text-indigo-600" />
                  <span>Production NLP Model &bull; Logistic Regression</span>
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                  Intelligent Customer <span className="gradient-text">Complaint AI</span>
                </h1>

                <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed">
                  Automatically categorize customer financial dispute narratives using machine learning and TF-IDF feature vectors. Instant classification across 5 key banking and credit domains.
                </p>
              </div>

              {/* Decorative Background Element */}
              <div className="absolute top-0 right-0 transform translate-x-12 -translate-y-12 w-64 h-64 bg-indigo-400/10 rounded-full blur-3xl pointer-events-none"></div>
            </section>

            {/* Dataset Statistics Grid */}
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <StatCard 
                title="Complaints Evaluated"
                value="162K+"
                description="Raw CFPB complaint dataset"
                icon={FileText}
                color="indigo"
              />
              <StatCard 
                title="Target Categories"
                value="5"
                description="Financial domain classes"
                icon={Layers}
                color="blue"
              />
              <StatCard 
                title="TF-IDF Features"
                value="50,000"
                description="Unigrams & Bigrams"
                icon={Binary}
                color="purple"
              />
              <StatCard 
                title="Model Accuracy"
                value="85.69%"
                badge="Best F1"
                description="Logistic Regression"
                icon={Target}
                color="emerald"
              />
            </section>

            {/* Complaint Input Section */}
            <section className="space-y-4">
              <ComplaintInput 
                complaint={complaint}
                setComplaint={setComplaint}
                onAnalyze={handleAnalyze}
                isLoading={isLoading}
                onClear={handleClear}
              />
            </section>

            {/* Error Message Alert */}
            {error && (
              <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 flex items-start space-x-3 shadow-xs">
                <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                <div className="flex-1 text-xs sm:text-sm font-medium">
                  <p className="font-bold text-rose-900">Classification Error</p>
                  <p className="mt-0.5">{error}</p>
                  <p className="text-[11px] text-rose-700 mt-2 font-mono bg-rose-100/60 p-2 rounded-lg">
                    Make sure the FastAPI server is running: <code>python -m uvicorn main:app --port 8000</code>
                  </p>
                </div>
                <button
                  onClick={checkApiHealth}
                  className="px-3 py-1.5 rounded-lg bg-rose-600 text-white text-xs font-bold hover:bg-rose-700 transition-colors shrink-0"
                >
                  Retry Connection
                </button>
              </div>
            )}

            {/* Prediction Output Section */}
            {prediction && (
              <section id="prediction-results-section" className="space-y-6 pt-2">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-indigo-600" />
                    <span>Analysis & Probability Report</span>
                  </h2>
                  <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
                    Live Response
                  </span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  
                  {/* Left Column: Prediction Result Card */}
                  <div className="lg:col-span-6">
                    <PredictionCard prediction={prediction} />
                  </div>

                  {/* Right Column: Recharts Horizontal Bar Chart */}
                  <div className="lg:col-span-6">
                    <ProbabilityChart 
                      probabilities={prediction.probabilities} 
                      predictedCategory={prediction.category}
                    />
                  </div>

                </div>
              </section>
            )}

            {/* Five Categories Grid Section */}
            <section className="pt-6">
              <CategoryCard onSelectCategory={handleSelectCategorySample} />
            </section>

          </div>
        )}

        {/* Tab 2: MODEL PERFORMANCE PAGE */}
        {activeTab === 'performance' && (
          <ModelComparison />
        )}

        {/* Tab 3: NLP PIPELINE PAGE */}
        {activeTab === 'pipeline' && (
          <NlpPipeline />
        )}

        {/* Tab 4: ABOUT PAGE */}
        {activeTab === 'about' && (
          <AboutSection />
        )}

      </main>

      {/* Footer */}
      <Footer setActiveTab={setActiveTab} />

    </div>
  );
}
