
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import GuidedAssessment from './components/GuidedAssessment';
import ResultDisplay from './components/ResultDisplay';
import RecordsHistory from './components/RecordsHistory';
import ChatAssistant from './components/ChatAssistant';
import IndicatorWiki from './components/IndicatorWiki';
import ManagementPanel from './components/ManagementPanel';
import UserProfileSection from './components/UserProfile';
import WorkflowOrchestrator from './components/WorkflowOrchestrator';
import CardioLanding from './components/Cardiovascular/CardioLanding';
import HeartAssessment from './components/Cardiovascular/HeartAssessment';
import HypertensionAssessment from './components/Cardiovascular/HypertensionAssessment';
import StrokeAssessment from './components/Cardiovascular/StrokeAssessment';
import { HealthData, AssessmentRecord, RiskAssessment, UserRole, UserProfile, AssessmentType, HeartData, HypertensionData, StrokeData } from './types';
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
  LayoutDashboard,
  UserCircle,
  LogOut,
  Building,
  FlaskConical,
  Stethoscope,
  Pill,
  Beaker,
  Heart
} from 'lucide-react';

const App: React.FC = () => {
  const [role, setRole] = useState<UserRole | null>(() => {
    const saved = localStorage.getItem('healthscan_role');
    return saved ? (saved as UserRole) : null;
  });

  const [activeTab, setActiveTab] = useState<'assess' | 'cardio' | 'history' | 'assistant' | 'learn' | 'manage' | 'profile' | 'workflow'>('assess');
  const [cardioModule, setCardioModule] = useState<'landing' | AssessmentType>('landing');
  const [loading, setLoading] = useState(false);
  const [currentResult, setCurrentResult] = useState<RiskAssessment | null>(null);
  const [records, setRecords] = useState<AssessmentRecord[]>([]);
  const [profile, setProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('healthscan_profile');
    return saved ? JSON.parse(saved) : {
      name: 'Guest User',
      email: '',
      preferences: { darkMode: false, notifications: true, unitSystem: 'metric' }
    };
  });

  useEffect(() => {
    if (profile.preferences.darkMode) {
      document.documentElement.classList.add('dark');
      document.body.style.backgroundColor = '#0f172a';
    } else {
      document.documentElement.classList.remove('dark');
      document.body.style.backgroundColor = '#f8fafc';
    }
  }, [profile.preferences.darkMode]);

  useEffect(() => {
    const savedRecords = localStorage.getItem('healthscan_records');
    if (savedRecords) setRecords(JSON.parse(savedRecords));
  }, []);

  const handleRoleSelection = (selectedRole: UserRole) => {
    setRole(selectedRole);
    localStorage.setItem('healthscan_role', selectedRole);
    if (['hmo', 'clinic', 'lab'].includes(selectedRole)) {
      setActiveTab('manage');
    } else {
      setActiveTab('workflow');
    }
  };

  const saveRecord = (data: any, result: RiskAssessment, type: AssessmentType) => {
    if (!role) return;
    const newRecord: AssessmentRecord = {
      id: crypto.randomUUID(),
      timestamp: Date.now(),
      role,
      type,
      data,
      result
    };
    const updated = [newRecord, ...records];
    setRecords(updated);
    localStorage.setItem('healthscan_records', JSON.stringify(updated));
  };

  const handleAssessment = async (data: HealthData) => {
    if (!role) return;
    setLoading(true);
    try {
      const result = await geminiService.analyzeRisk(data, role);
      setCurrentResult(result);
      saveRecord(data, result, 'diabetes');
    } catch (error) {
      console.error("Assessment failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCardioAssessment = async (data: HeartData | HypertensionData | StrokeData, type: AssessmentType) => {
    if (!role) return;
    setLoading(true);
    try {
      let result;
      if (type === 'heart') {
        result = await geminiService.analyzeHeartRisk(data as HeartData, role);
      } else if (type === 'hypertension') {
        result = await geminiService.analyzeHypertensionRisk(data as HypertensionData, role);
      } else if (type === 'stroke') {
        result = await geminiService.analyzeStrokeRisk(data as StrokeData, role);
      }

      if (result) {
        setCurrentResult(result);
        saveRecord(data, result, type);
      }
    } catch (error) {
      console.error("Cardio Assessment failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('healthscan_role');
    setRole(null);
    setCurrentResult(null);
  };

  if (!role) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center p-4 transition-colors duration-300">
        <div className="max-w-7xl w-full">
          <div className="text-center mb-12 animate-in fade-in zoom-in duration-700">
            <div className="flex justify-center mb-6">
              <div className="bg-[#1E3A8A] p-5 rounded-3xl shadow-2xl shadow-blue-200 dark:shadow-none">
                <HeartPulse className="text-[#A3E635] w-12 h-12" />
              </div>
            </div>
            <h1 className="text-5xl font-black text-[#1E3A8A] dark:text-blue-400 mb-4 tracking-tight">HealthScan Network</h1>
            <p className="text-xl text-slate-500 dark:text-slate-400 font-medium max-w-2xl mx-auto">
              Select your clinical node to manage integrated metabolic health.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { id: 'individual', icon: <ShieldCheck size={32} />, title: 'Patient', desc: 'Manage health risk tips and scheduling.' },
              { id: 'professional', icon: <Stethoscope size={32} />, title: 'Clinician', desc: 'Diagnostics, referrals & prescriptions.' },
              { id: 'lab', icon: <Beaker size={32} />, title: 'Diagnostic Test Center', desc: 'Process tests and update clinical records.' },
              { id: 'clinic', icon: <Building2 size={32} />, title: 'Hospital', desc: 'Patient flow & institutional administration.' },
              { id: 'hmo', icon: <Building size={32} />, title: 'HMO', desc: 'Global oversight & ecosystem analytics.' }
            ].map((item, idx) => (
              <button
                key={item.id}
                onClick={() => handleRoleSelection(item.id as UserRole)}
                className="bg-white dark:bg-slate-800 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-700 hover:border-[#14B8A6] hover:shadow-2xl transition-all text-left group flex flex-col h-full animate-in fade-in slide-in-from-bottom-4"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="p-4 bg-slate-50 dark:bg-slate-700 rounded-2xl text-[#14B8A6] group-hover:bg-[#14B8A6] group-hover:text-white transition-all mb-6 w-fit">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-[#1E3A8A] dark:text-white mb-2">{item.title}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-6 flex-1">{item.desc}</p>
                <div className="flex items-center gap-2 text-[#14B8A6] font-bold text-[10px] uppercase">
                  Access Portal <ChevronRight size={14} />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex flex-col md:flex-row ${profile.preferences.darkMode ? 'dark' : ''}`}>
      <nav className="w-full md:w-72 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 p-6 flex flex-col gap-2 no-print shadow-sm z-20 transition-colors duration-300">
        <div className="flex items-center gap-3 px-2 py-4 mb-8">
          <div className="bg-[#1E3A8A] p-2.5 rounded-2xl shadow-lg">
            <HeartPulse className="text-[#A3E635] w-6 h-6" />
          </div>
          <h1 className="text-2xl font-black text-[#1E3A8A] dark:text-white tracking-tight">HealthScan</h1>
        </div>

        <div className="space-y-1 mb-6 overflow-y-auto pr-2 custom-scrollbar flex-1">
          <p className="px-4 text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Health Network</p>

          <button onClick={() => setActiveTab('workflow')} className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all ${activeTab === 'workflow' ? 'bg-[#1E3A8A] text-white shadow-lg' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700'}`}>
            <Activity size={22} /> <span className="flex-1 text-left">Clinical Journey</span>
          </button>

          {(role === 'hmo' || role === 'clinic' || role === 'lab') && (
            <button onClick={() => setActiveTab('manage')} className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all ${activeTab === 'manage' ? 'bg-[#1E3A8A] text-white shadow-lg' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700'}`}>
              <LayoutDashboard size={22} /> <span className="flex-1 text-left">Management</span>
            </button>
          )}

          {role === 'professional' && (
            <button onClick={() => setActiveTab('assess')} className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all ${activeTab === 'assess' ? 'bg-[#1E3A8A] text-white shadow-lg' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700'}`}>
              <FlaskConical size={22} /> <span className="flex-1 text-left">Lab Referral</span>
            </button>
          )}

          <div className="pt-4 pb-2">
            <p className="px-4 text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Assessments</p>
            <button onClick={() => setActiveTab('assess')} className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all ${activeTab === 'assess' ? 'bg-[#1E3A8A] text-white shadow-lg' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700'}`}>
              <Activity size={22} /> <span className="flex-1 text-left">Diabetes Risk</span>
            </button>
            <button onClick={() => { setActiveTab('cardio'); setCardioModule('landing'); setCurrentResult(null); }} className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all ${activeTab === 'cardio' ? 'bg-[#1E3A8A] text-white shadow-lg' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700'}`}>
              <Heart size={22} /> <span className="flex-1 text-left">Cardiovascular</span>
            </button>
          </div>

          <button onClick={() => setActiveTab('history')} className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all ${activeTab === 'history' ? 'bg-[#1E3A8A] text-white shadow-lg' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700'}`}>
            <History size={22} /> <span className="flex-1 text-left">Records</span>
          </button>

          <button onClick={() => setActiveTab('learn')} className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all ${activeTab === 'learn' ? 'bg-[#1E3A8A] text-white shadow-lg' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700'}`}>
            <BookOpen size={22} /> <span className="flex-1 text-left">Health Tips</span>
          </button>

          <button onClick={() => setActiveTab('assistant')} className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all ${activeTab === 'assistant' ? 'bg-[#1E3A8A] text-white shadow-lg' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700'}`}>
            <MessageSquare size={22} /> <span className="flex-1 text-left">AI Assistant</span>
          </button>
        </div>

        <div className="mt-auto pt-6 border-t border-slate-100 dark:border-slate-700">
          <button onClick={() => setActiveTab('profile')} className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all mb-2 ${activeTab === 'profile' ? 'bg-[#1E3A8A] text-white' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700'}`}>
            <UserCircle size={22} /> <span className="flex-1 text-left">Profile</span>
          </button>

          <button onClick={logout} className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-all">
            <LogOut size={22} /> <span className="flex-1 text-left">Switch Role</span>
          </button>
        </div>
      </nav>

      <main className="flex-1 overflow-y-auto px-6 py-8 md:px-12 md:py-12 bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
        <div className="max-w-6xl mx-auto">
          <Header activeTab={activeTab} />

          <div className="mt-8">
            {activeTab === 'workflow' && <WorkflowOrchestrator role={role} records={records} setRecords={(recs) => { setRecords(recs); localStorage.setItem('healthscan_records', JSON.stringify(recs)); }} />}

            {activeTab === 'profile' && <UserProfileSection profile={profile} onSave={(p) => { setProfile(p); localStorage.setItem('healthscan_profile', JSON.stringify(p)); }} />}

            {activeTab === 'manage' && <ManagementPanel role={role} records={records} />}

            {activeTab === 'assess' && (
              <div className="space-y-12">
                {!currentResult && !loading && (
                  <GuidedAssessment onSubmit={handleAssessment} isLoading={loading} role={role} />
                )}

                {loading && (
                  <div className="bg-white dark:bg-slate-800 p-24 rounded-[3rem] shadow-xl flex flex-col items-center justify-center text-center">
                    <div className="w-20 h-20 border-8 border-[#1E3A8A] border-t-transparent rounded-full animate-spin mb-6"></div>
                    <h3 className="text-3xl font-black text-[#1E3A8A] dark:text-white mb-4">Referral Engine...</h3>
                    <p className="text-slate-500 dark:text-slate-400 max-w-sm mx-auto uppercase text-[10px] font-black tracking-widest">Processing flags for diagnostic referral</p>
                  </div>
                )}

                {currentResult && !loading && (
                  <div className="space-y-8 animate-in slide-in-from-bottom-8 duration-700">
                    <button onClick={() => setCurrentResult(null)} className="flex items-center gap-2 text-sm font-bold text-[#14B8A6] hover:bg-teal-50 dark:hover:bg-teal-900/20 px-4 py-2 rounded-xl transition-all w-fit no-print">
                      <ChevronLeft size={18} /> New Analysis
                    </button>
                    <ResultDisplay result={currentResult} />
                  </div>
                )}
              </div>
            )}

            {activeTab === 'cardio' && (
              <div className="space-y-12">
                {cardioModule === 'landing' && !currentResult && (
                  <CardioLanding onSelect={(type) => setCardioModule(type)} />
                )}

                {!currentResult && !loading && cardioModule === 'heart' && (
                  <div className="space-y-8 animate-in slide-in-from-bottom-8">
                    <button onClick={() => setCardioModule('landing')} className="flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-slate-600 px-4 py-2 rounded-xl transition-all w-fit">
                      <ChevronLeft size={18} /> Back to Suite
                    </button>
                    <HeartAssessment onSubmit={(data) => handleCardioAssessment(data, 'heart')} isLoading={loading} role={role} />
                  </div>
                )}

                {!currentResult && !loading && cardioModule === 'hypertension' && (
                  <div className="space-y-8 animate-in slide-in-from-bottom-8">
                    <button onClick={() => setCardioModule('landing')} className="flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-slate-600 px-4 py-2 rounded-xl transition-all w-fit">
                      <ChevronLeft size={18} /> Back to Suite
                    </button>
                    <HypertensionAssessment onSubmit={(data) => handleCardioAssessment(data, 'hypertension')} isLoading={loading} role={role} />
                  </div>
                )}

                {!currentResult && !loading && cardioModule === 'stroke' && (
                  <div className="space-y-8 animate-in slide-in-from-bottom-8">
                    <button onClick={() => setCardioModule('landing')} className="flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-slate-600 px-4 py-2 rounded-xl transition-all w-fit">
                      <ChevronLeft size={18} /> Back to Suite
                    </button>
                    <StrokeAssessment onSubmit={(data) => handleCardioAssessment(data, 'stroke')} isLoading={loading} role={role} />
                  </div>
                )}

                {loading && (
                  <div className="bg-white dark:bg-slate-800 p-24 rounded-[3rem] shadow-xl flex flex-col items-center justify-center text-center">
                    <div className="w-20 h-20 border-8 border-rose-500 border-t-transparent rounded-full animate-spin mb-6"></div>
                    <h3 className="text-3xl font-black text-rose-600 dark:text-rose-400 mb-4">Cardio Analysis...</h3>
                    <p className="text-slate-500 dark:text-slate-400 max-w-sm mx-auto uppercase text-[10px] font-black tracking-widest"> evaluating vascular risk markers</p>
                  </div>
                )}

                {currentResult && !loading && (
                  <div className="space-y-8 animate-in slide-in-from-bottom-8 duration-700">
                    <button onClick={() => { setCurrentResult(null); }} className="flex items-center gap-2 text-sm font-bold text-[#14B8A6] hover:bg-teal-50 dark:hover:bg-teal-900/20 px-4 py-2 rounded-xl transition-all w-fit no-print">
                      <ChevronLeft size={18} /> New Analysis
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
