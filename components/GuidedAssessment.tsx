
import React, { useState } from 'react';
import { HealthData, UserRole } from '../types';
import { 
  ChevronRight, 
  ChevronLeft, 
  Info, 
  Activity, 
  User, 
  Heart, 
  Droplets, 
  Dna,
  ShieldCheck,
  AlertCircle,
  HelpCircle
} from 'lucide-react';
import { INDICATORS } from './IndicatorWiki';

interface GuidedAssessmentProps {
  onSubmit: (data: HealthData) => void;
  isLoading: boolean;
  role: UserRole;
}

const GuidedAssessment: React.FC<GuidedAssessmentProps> = ({ onSubmit, isLoading, role }) => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<HealthData>({
    patientName: '',
    pregnancies: 0,
    glucose: 100,
    bloodPressure: 80,
    skinThickness: 20,
    insulin: 80,
    bmi: 24.5,
    diabetesPedigree: 0.45,
    age: 30
  });

  const steps = [
    { id: 'basics', title: 'Identity & Age', icon: <User />, indicatorId: null },
    { id: 'glucose', title: 'Glycemic State', icon: <Droplets />, indicatorId: 'glucose' },
    { id: 'physiology', title: 'Body Composition', icon: <Heart />, indicatorId: 'bmi' },
    { id: 'clinical', title: 'Laboratory Markers', icon: <Activity />, indicatorId: 'insulin' },
    { id: 'genetics', title: 'History & Genetics', icon: <Dna />, indicatorId: 'pedigree' },
  ];

  const handleNext = () => setStep(s => Math.min(s + 1, steps.length - 1));
  const handleBack = () => setStep(s => Math.max(s - 1, 0));

  const updateField = (name: keyof HealthData, value: any) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePatientIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow alphanumeric characters and hyphens
    const val = e.target.value.replace(/[^a-zA-Z0-9-]/g, '');
    updateField('patientName', val);
  };

  const currentStepInfo = steps[step];
  const activeIndicator = INDICATORS.find(i => i.id === currentStepInfo.indicatorId);

  return (
    <div className="bg-white rounded-[3rem] shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden max-w-4xl mx-auto flex flex-col md:flex-row min-h-[600px] animate-in slide-in-from-bottom-8 duration-700">
      
      {/* Left Sidebar Info Panel */}
      <div className="w-full md:w-80 bg-slate-50 p-10 border-r border-slate-100 flex flex-col">
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-6">
            {steps.map((_, i) => (
              <div 
                key={i} 
                className={`h-1.5 rounded-full transition-all duration-500 ${i === step ? 'w-8 bg-blue-600' : i < step ? 'w-2 bg-emerald-500' : 'w-2 bg-slate-200'}`} 
              />
            ))}
          </div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Capture Phase {step + 1}</p>
          <h2 className="text-2xl font-black text-slate-800 mt-2 tracking-tight">{currentStepInfo.title}</h2>
        </div>

        <div className="flex-1 flex flex-col justify-center">
          {activeIndicator ? (
            <div className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-500">
              <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
                <p className="text-[10px] font-bold text-blue-600 uppercase mb-2">What is this?</p>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">{activeIndicator.description}</p>
              </div>
              <div className="p-4 bg-blue-600 text-white rounded-2xl shadow-lg shadow-blue-100">
                <p className="text-[10px] font-bold text-blue-200 uppercase mb-2">Clinical Logic</p>
                <p className="text-xs text-blue-50 leading-relaxed font-medium italic">"{activeIndicator.whyItMatters}"</p>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm text-center">
                <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center mx-auto mb-4 text-slate-400">
                  <User />
                </div>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">
                  Establishing the baseline patient profile. Age and identifier are the primary weights in the assessment initiation.
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 p-4 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-center gap-3">
          <div className="p-2 bg-white rounded-lg text-emerald-600 shadow-sm">
            <ShieldCheck size={16} />
          </div>
          <p className="text-[10px] font-bold text-emerald-700 leading-snug">HIPAA Compliant Local Processing</p>
        </div>
      </div>

      {/* Main Form Panel */}
      <div className="flex-1 p-10 md:p-14 flex flex-col justify-between">
        <div className="space-y-10">
          {step === 0 && (
            <div className="space-y-8 animate-in slide-in-from-right-8 duration-500">
              {(role === 'professional' || role === 'clinic' || role === 'lab') && (
                <div className="space-y-3">
                  <label className="text-sm font-black text-slate-700 uppercase tracking-widest flex items-center gap-2">
                    Patient Reference ID <AlertCircle size={14} className="text-slate-300" />
                  </label>
                  <input 
                    type="text" 
                    value={formData.patientName} 
                    onChange={handlePatientIdChange}
                    className="w-full bg-slate-50 border border-slate-100 rounded-[1.25rem] px-6 py-5 text-lg font-bold text-slate-800 focus:ring-4 focus:ring-blue-100 focus:bg-white focus:border-blue-300 outline-none transition-all placeholder:text-slate-300"
                    placeholder="Enter Clinical Identifier"
                  />
                  <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider px-2">Alphanumeric characters and hyphens only</p>
                </div>
              )}
              <div className="space-y-3">
                <label className="text-sm font-black text-slate-700 uppercase tracking-widest flex items-center gap-2">
                  Chronological Age
                </label>
                <div className="flex items-center gap-6">
                  <input 
                    type="number" 
                    value={formData.age} 
                    onChange={e => updateField('age', parseInt(e.target.value) || 0)}
                    className="w-32 bg-slate-50 border border-slate-100 rounded-[1.25rem] px-6 py-5 text-2xl font-black text-blue-600 focus:ring-4 focus:ring-blue-100 focus:bg-white focus:border-blue-300 outline-none transition-all"
                  />
                  <div className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden relative">
                    <div 
                      className="absolute top-0 left-0 h-full bg-blue-600 transition-all duration-500" 
                      style={{ width: `${Math.min(formData.age, 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-12 animate-in slide-in-from-right-8 duration-500">
              <div className="space-y-6">
                <div className="flex justify-between items-end">
                  <label className="text-sm font-black text-slate-700 uppercase tracking-widest">Plasma Glucose Concentration</label>
                  <div className="text-right">
                    <span className="text-5xl font-black text-blue-600 tracking-tight">{formData.glucose}</span>
                    <span className="text-xs font-bold text-slate-400 ml-2">mg/dL</span>
                  </div>
                </div>
                <input 
                  type="range" min="0" max="300" step="1"
                  value={formData.glucose} 
                  onChange={e => updateField('glucose', parseInt(e.target.value))}
                  className="w-full h-4 bg-slate-100 rounded-2xl appearance-none cursor-pointer accent-blue-600 hover:accent-blue-700 transition-all shadow-inner"
                />
                <div className="flex justify-between text-[10px] font-bold text-slate-400 px-1 uppercase tracking-widest">
                  <span>Standard Fasting (70-99)</span>
                  <span>Post-Prandial Limit (140)</span>
                  <span>High Risk (200+)</span>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 animate-in slide-in-from-right-8 duration-500">
              <div className="space-y-3">
                <label className="text-sm font-black text-slate-700 uppercase tracking-widest">Body Mass Index (BMI)</label>
                <div className="relative">
                  <input type="number" step="0.1" value={formData.bmi} onChange={e => updateField('bmi', parseFloat(e.target.value) || 0)} className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-5 text-2xl font-black text-blue-600 outline-none focus:bg-white focus:ring-4 focus:ring-blue-100 transition-all" />
                  <div className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-300 font-bold">kg/m²</div>
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-sm font-black text-slate-700 uppercase tracking-widest">Blood Pressure (Dia.)</label>
                <div className="relative">
                  <input type="number" value={formData.bloodPressure} onChange={e => updateField('bloodPressure', parseInt(e.target.value) || 0)} className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-5 text-2xl font-black text-blue-600 outline-none focus:bg-white focus:ring-4 focus:ring-blue-100 transition-all" />
                  <div className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-300 font-bold">mmHg</div>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 animate-in slide-in-from-right-8 duration-500">
              <div className="space-y-3">
                <label className="text-sm font-black text-slate-700 uppercase tracking-widest">Serum Insulin</label>
                <input type="number" value={formData.insulin} onChange={e => updateField('insulin', parseInt(e.target.value) || 0)} className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-5 text-2xl font-black text-blue-600 outline-none transition-all" />
              </div>
              <div className="space-y-3">
                <label className="text-sm font-black text-slate-700 uppercase tracking-widest">Skin Thickness</label>
                <div className="relative">
                  <input type="number" value={formData.skinThickness} onChange={e => updateField('skinThickness', parseInt(e.target.value) || 0)} className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-5 text-2xl font-black text-blue-600 outline-none transition-all" />
                  <div className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-300 font-bold">mm</div>
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-10 animate-in slide-in-from-right-8 duration-500">
              <div className="space-y-3">
                <label className="text-sm font-black text-slate-700 uppercase tracking-widest">Genetic Pedigree Score</label>
                <div className="flex items-center gap-6">
                  <input type="number" step="0.01" value={formData.diabetesPedigree} onChange={e => updateField('diabetesPedigree', parseFloat(e.target.value) || 0)} className="w-40 bg-slate-50 border border-slate-100 rounded-2xl px-6 py-5 text-3xl font-black text-blue-600 outline-none transition-all" />
                  <div className="flex-1 text-xs text-slate-500 font-medium leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
                    Calculated based on first and second degree relative history. Higher scores indicate strong inherited susceptibility.
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-sm font-black text-slate-700 uppercase tracking-widest">Previous Pregnancies</label>
                <input type="number" value={formData.pregnancies} onChange={e => updateField('pregnancies', parseInt(e.target.value) || 0)} className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-5 text-2xl font-black text-blue-600 outline-none transition-all" />
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation */}
        <div className="flex items-center justify-between gap-6 pt-10">
          <button 
            onClick={handleBack}
            disabled={step === 0}
            className="flex items-center gap-3 px-8 py-5 rounded-2xl font-black text-slate-400 hover:text-slate-700 hover:bg-slate-50 transition-all disabled:opacity-0 active:scale-95"
          >
            <ChevronLeft size={24} /> Previous
          </button>
          
          <div className="flex-1 text-center hidden md:block">
            <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.4em]">Step Verification</p>
          </div>

          {step < steps.length - 1 ? (
            <button 
              onClick={handleNext}
              className="group flex items-center gap-3 px-10 py-5 bg-blue-600 text-white rounded-[1.5rem] font-black hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 active:scale-95 tracking-tight"
            >
              Continue <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
            </button>
          ) : (
            <button 
              onClick={() => onSubmit(formData)}
              disabled={isLoading}
              className="flex items-center gap-3 px-12 py-5 bg-emerald-600 text-white rounded-[1.5rem] font-black hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-200 disabled:opacity-50 active:scale-95 tracking-tight"
            >
              {isLoading ? 'Clinical Analysis...' : 'Submit Records'} <Activity size={24} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default GuidedAssessment;
