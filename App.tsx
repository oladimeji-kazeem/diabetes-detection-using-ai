
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import GuidedAssessment from './components/GuidedAssessment';
import ResultDisplay from './components/ResultDisplay';
import RecordsHistory from './components/RecordsHistory';
import ChatAssistant from './components/ChatAssistant';
import IndicatorWiki from './components/IndicatorWiki';
import { HealthData, AssessmentRecord, RiskAssessment, UserRole } from './types';
import { geminiService } from './services/geminiService';
import { 
  Activity, 
  History, 
  MessageSquare, 
  HeartPulse, 
  ShieldCheck, 
  Users, 
  Building2, 
  ChevronRight, 
  ChevronLeft, 
  BookOpen,
  Settings,
  LogOut
} from 'lucide-react';

const App: React.FC = () => {
  const [role, setRole] = useState<UserRole | null>(() => {
    const saved = localStorage.getItem('glucoscan_role');
    return saved ? (saved as UserRole) : null;
  });
  const [activeTab, setActiveTab] = useState<'assess' | 'history' | 'assistant' | 'learn'>('assess');
  const [loading, setLoading] = useState(false);
  const [currentResult, setCurrentResult] = useState<RiskAssessment | null>(null);
  const [records, setRecords] = useState<AssessmentRecord[]>([]);

  useEffect(() => {
    const savedRecords = localStorage.getItem('glucoscan_records');
    if (savedRecords) setRecords(JSON.parse(savedRecords));
  }, []);

  const handleRoleSelection = (selectedRole: UserRole) => {
    setRole(selectedRole);
    localStorage.setItem('glucoscan_role', selectedRole);
  };

  const handleAssessment = async (data: HealthData) => {
    if (!role) return;
    setLoading(true);
    try {
      const result = await geminiService.analyzeRisk(data, role);
      setCurrentResult(result);
      const newRecord: AssessmentRecord = {
        id: crypto.randomUUID(),
        timestamp: Date.now(),
        role,
        data,
        result
      };
      const updated = [newRecord, ...records];
      setRecords(updated);
      localStorage.setItem('glucoscan_records', JSON.stringify(updated));
    } catch (error) {
      console.error("Assessment failed:", error);
      alert("Failed to perform assessment. Please check your network.");
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('glucoscan_role');
    setRole(null);
    setCurrentResult(null);
  };

  if (!role) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="max-w-5xl w-full">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="bg-blue-600 p-5 rounded-3xl shadow-2xl shadow-blue-200 animate-in zoom-in duration-500">
                <HeartPulse className="text-white w-12 h-12" />
              </div>
            </div>
            <h1 className="text-5xl font-black text-slate-900 mb-4 tracking-tight">GlucoScan Intelligence</h1>
            <p className="text-xl text-slate-500 font-medium max-w-2xl mx-auto">
              Select your platform access level to begin specialized metabolic health monitoring.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { id: 'individual', icon: <ShieldCheck size={32} />, title: 'Personal Care', desc: 'Monitor personal glucose trends, track BMI, and get AI lifestyle coaching.' },
              { id: 'professional', icon: <Users size={32} />, title: 'Clinical Professional', desc: 'Diagnostic tools for endocrinologists and nurses. Manage individual patient assessments.' },
              { id: 'clinic', icon: <Building2 size={32} />, title: 'Health Center', desc: 'Enterprise-grade patient data management and multi-user clinical reporting.' }
            ].map((item) => (
              <button 
                key={item.id}
                onClick={() => handleRoleSelection(item.id as UserRole)}
                className="bg-white p-10 rounded-[2.5rem] border border-slate-100 hover:border-blue-500 hover:shadow-2xl hover:shadow-blue-100/50 transition-all text-left group flex flex-col h-full relative overflow-hidden"
              >
                <div className="p-4 bg-slate-50 rounded-2xl text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all mb-8 w-fit shadow-sm">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-4">{item.title}</h3>
                <p className="text-slate-500 leading-relaxed mb-8 flex-1">{item.desc}</p>
                <div className="flex items-center gap-2 text-blue-600 font-bold group-hover:translate-x-2 transition-transform">
                  Enter Platform <ChevronRight size={20} />
                </div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 opacity-0 group-hover:opacity-20 rounded-full -mr-16 -mt-16 transition-opacity blur-2xl"></div>
              </button>
            ))}
          </div>
          
          <p className="text-center text-slate-400 mt-16 text-sm font-medium">
            Trusted by medical professionals globally for preliminary risk screening.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#f8fafc]">
      {/* Navigation Sidebar */}
      <nav className="w-full md:w-72 bg-white border-r border-slate-200 p-6 flex flex-col gap-2 no-print shadow-sm z-20">
        <div className="flex items-center gap-3 px-2 py-4 mb-8">
          <div className="bg-blue-600 p-2.5 rounded-2xl shadow-lg shadow-blue-100">
            <HeartPulse className="text-white w-6 h-6" />
          </div>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight">GlucoScan</h1>
        </div>

        <div className="space-y-1 mb-8">
          <p className="px-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Core Platform</p>
          
          <button onClick={() => setActiveTab('assess')} className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-200 ${activeTab === 'assess' ? 'bg-blue-600 text-white font-bold shadow-xl shadow-blue-100' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'}`}>
            <Activity size={22} /> 
            <span className="flex-1 text-left">Assessment</span>
          </button>

          <button onClick={() => setActiveTab('history')} className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-200 ${activeTab === 'history' ? 'bg-blue-600 text-white font-bold shadow-xl shadow-blue-100' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'}`}>
            <History size={22} /> 
            <span className="flex-1 text-left">{role === 'individual' ? 'My History' : 'Records'}</span>
          </button>

          <button onClick={() => setActiveTab('learn')} className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-200 ${activeTab === 'learn' ? 'bg-blue-600 text-white font-bold shadow-xl shadow-blue-100' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'}`}>
            <BookOpen size={22} /> 
            <span className="flex-1 text-left">Clinical Wiki</span>
          </button>

          <button onClick={() => setActiveTab('assistant')} className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-200 ${activeTab === 'assistant' ? 'bg-blue-600 text-white font-bold shadow-xl shadow-blue-100' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'}`}>
            <MessageSquare size={22} /> 
            <span className="flex-1 text-left">AI Assistant</span>
          </button>
        </div>

        <div className="mt-auto pt-8 border-t border-slate-100">
          <p className="px-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Account Settings</p>
          
          <div className="px-4 mb-4">
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-blue-600 flex items-center justify-center font-bold">
                  {role === 'individual' ? <ShieldCheck size={20} /> : role === 'professional' ? <Users size={20} /> : <Building2 size={20} />}
                </div>
                <div className="overflow-hidden">
                  <p className="text-[10px] font-bold text-slate-400 uppercase leading-none mb-1">Active Mode</p>
                  <p className="text-sm font-bold text-slate-800 truncate capitalize">{role}</p>
                </div>
              </div>
              <button 
                onClick={logout}
                className="w-full flex items-center justify-center gap-2 py-2 text-xs font-bold text-slate-500 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all"
              >
                <LogOut size={14} /> Switch Platform
              </button>
            </div>
          </div>
          
          <div className="p-4 text-center">
            <p className="text-[10px] font-bold text-slate-300 uppercase">System Status: Operational</p>
          </div>
        </div>
      </nav>

      {/* Content Container */}
      <main className="flex-1 overflow-y-auto px-6 py-8 md:px-12 md:py-12">
        <div className="max-w-6xl mx-auto">
          <Header activeTab={activeTab} />
          
          <div className="mt-10">
            {activeTab === 'assess' && (
              <div className="space-y-12">
                {!currentResult && !loading && (
                  <GuidedAssessment onSubmit={handleAssessment} isLoading={loading} role={role} />
                )}
                
                {loading && (
                  <div className="bg-white p-24 rounded-[3rem] shadow-2xl shadow-blue-50 border border-slate-100 flex flex-col items-center justify-center text-center animate-in fade-in zoom-in duration-500">
                    <div className="relative mb-8">
                      <div className="w-24 h-24 border-8 border-blue-600/10 rounded-full"></div>
                      <div className="absolute inset-0 w-24 h-24 border-8 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                      <Activity className="absolute inset-0 m-auto text-blue-600 animate-pulse" size={32} />
                    </div>
                    <h3 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">Clinical Correlation</h3>
                    <p className="text-slate-500 text-lg max-w-md mx-auto leading-relaxed">
                      Gemini is processing your physiological indicators against established diabetes risk matrices and pedigree history.
                    </p>
                  </div>
                )}

                {currentResult && !loading && (
                  <div className="space-y-8 animate-in slide-in-from-bottom-8 duration-700">
                    <button 
                      onClick={() => setCurrentResult(null)}
                      className="flex items-center gap-2 text-sm font-bold text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-xl transition-all no-print w-fit"
                    >
                      <ChevronLeft size={18} /> New Assessment
                    </button>
                    <ResultDisplay result={currentResult} />
                  </div>
                )}
              </div>
            )}

            {activeTab === 'history' && <RecordsHistory records={records} />}
            {activeTab === 'learn' && <IndicatorWiki />}
            {activeTab === 'assistant' && <ChatAssistant role={role} />}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
