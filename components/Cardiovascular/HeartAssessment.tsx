import React, { useState } from 'react';
import { HeartData, UserRole } from '../../types';
import {
    ChevronRight,
    ChevronLeft,
    User,
    HeartPulse,
    Activity,
    Stethoscope,
    AlertCircle
} from 'lucide-react';

interface HeartAssessmentProps {
    onSubmit: (data: HeartData) => void;
    isLoading: boolean;
    role: UserRole;
}

const HeartAssessment: React.FC<HeartAssessmentProps> = ({ onSubmit, isLoading, role }) => {
    const [step, setStep] = useState(0);
    const [formData, setFormData] = useState<HeartData>({
        patientName: '',
        age: 45,
        sex: 'male',
        cp: 0,
        trestbps: 120,
        chol: 200,
        fbs: 0,
        restecg: 0,
        thalach: 150,
        exang: 0,
        oldpeak: 0,
        slope: 1,
        ca: 0,
        thal: 2
    });

    const steps = [
        { title: 'Patient Profile', icon: <User />, desc: 'Demographics & Symptoms' },
        { title: 'Vitals & Labs', icon: <HeartPulse />, desc: 'Hemodynamics & Biochemistry' },
        { title: 'Advanced Diagnostics', icon: <Stethoscope />, desc: 'ECG & Stress Test' }
    ];

    const handleNext = () => setStep(s => Math.min(s + 1, steps.length - 1));
    const handleBack = () => setStep(s => Math.max(s - 1, 0));

    const updateField = (name: keyof HeartData, value: any) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="bg-white rounded-[3rem] shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden max-w-5xl mx-auto flex flex-col md:flex-row min-h-[600px] animate-in slide-in-from-bottom-8 duration-700">

            {/* Sidebar */}
            <div className="w-full md:w-80 bg-slate-50 p-10 border-r border-slate-100 flex flex-col">
                <div className="mb-10">
                    <div className="flex items-center gap-2 mb-6">
                        {steps.map((_, i) => (
                            <div key={i} className={`h-1.5 rounded-full transition-all duration-500 ${i === step ? 'w-8 bg-rose-600' : i < step ? 'w-2 bg-rose-300' : 'w-2 bg-slate-200'}`} />
                        ))}
                    </div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Heart Assessment {step + 1}</p>
                    <h2 className="text-2xl font-black text-slate-800 mt-2 tracking-tight">{steps[step].title}</h2>
                    <p className="text-xs text-slate-500 mt-2 font-medium">{steps[step].desc}</p>
                </div>
            </div>

            {/* Form Area */}
            <div className="flex-1 p-10 md:p-14 flex flex-col justify-between overflow-y-auto">
                <div className="space-y-10">

                    {step === 0 && (
                        <div className="space-y-8 animate-in slide-in-from-right-8 duration-500">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <label className="text-sm font-black text-slate-700 uppercase tracking-widest">Age</label>
                                    <input type="number" value={formData.age} onChange={e => updateField('age', parseInt(e.target.value) || 0)} className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-xl font-bold text-rose-600 outline-none focus:ring-4 focus:ring-rose-100 transition-all" />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-sm font-black text-slate-700 uppercase tracking-widest">Sex</label>
                                    <div className="flex bg-slate-50 p-1 rounded-xl border border-slate-100">
                                        {['male', 'female'].map(s => (
                                            <button key={s} onClick={() => updateField('sex', s)} className={`flex-1 py-3 rounded-lg text-sm font-bold uppercase transition-all ${formData.sex === s ? 'bg-white text-rose-600 shadow-sm' : 'text-slate-400'}`}>
                                                {s}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <label className="text-sm font-black text-slate-700 uppercase tracking-widest">Chest Pain Type</label>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {[
                                        { val: 0, label: 'Typical Angina' },
                                        { val: 1, label: 'Atypical Angina' },
                                        { val: 2, label: 'Non-anginal Pain' },
                                        { val: 3, label: 'Asymptomatic' }
                                    ].map(opt => (
                                        <button
                                            key={opt.val}
                                            onClick={() => updateField('cp', opt.val)}
                                            className={`p-4 rounded-xl border transition-all text-left ${formData.cp === opt.val ? 'border-rose-200 bg-rose-50 text-rose-700' : 'border-slate-100 hover:border-slate-200 text-slate-600'}`}
                                        >
                                            <span className="font-bold text-sm block">{opt.label}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 1 && (
                        <div className="space-y-8 animate-in slide-in-from-right-8 duration-500">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <label className="text-sm font-black text-slate-700 uppercase tracking-widest">Resting BP (mmHg)</label>
                                    <input type="number" value={formData.trestbps} onChange={e => updateField('trestbps', parseInt(e.target.value) || 0)} className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-xl font-bold text-rose-600 outline-none transition-all" />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-sm font-black text-slate-700 uppercase tracking-widest">Cholesterol (mg/dl)</label>
                                    <input type="number" value={formData.chol} onChange={e => updateField('chol', parseInt(e.target.value) || 0)} className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-xl font-bold text-rose-600 outline-none transition-all" />
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="text-sm font-black text-slate-700 uppercase tracking-widest">Fasting Blood Sugar ({'>'} 120 mg/dl)</label>
                                <div className="flex gap-4">
                                    <button onClick={() => updateField('fbs', 1)} className={`flex-1 py-4 rounded-xl font-bold border ${formData.fbs === 1 ? 'bg-rose-50 border-rose-200 text-rose-700' : 'border-slate-100 text-slate-400'}`}>Yes</button>
                                    <button onClick={() => updateField('fbs', 0)} className={`flex-1 py-4 rounded-xl font-bold border ${formData.fbs === 0 ? 'bg-rose-50 border-rose-200 text-rose-700' : 'border-slate-100 text-slate-400'}`}>No</button>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <label className="text-sm font-black text-slate-700 uppercase tracking-widest">Max Heart Rate</label>
                                    <input type="number" value={formData.thalach} onChange={e => updateField('thalach', parseInt(e.target.value) || 0)} className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-xl font-bold text-rose-600 outline-none transition-all" />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-sm font-black text-slate-700 uppercase tracking-widest">Resting ECG</label>
                                    <select value={formData.restecg} onChange={e => updateField('restecg', parseInt(e.target.value))} className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-lg font-bold text-slate-600 outline-none transition-all appearance-none cursor-pointer">
                                        <option value={0}>Normal</option>
                                        <option value={1}>ST-T Wave Abnormality</option>
                                        <option value={2}>Left Ventricular Hypertrophy</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-8 animate-in slide-in-from-right-8 duration-500">
                            <div className="space-y-3">
                                <label className="text-sm font-black text-slate-700 uppercase tracking-widest">Exercise Induced Angina</label>
                                <div className="flex gap-4">
                                    <button onClick={() => updateField('exang', 1)} className={`flex-1 py-4 rounded-xl font-bold border ${formData.exang === 1 ? 'bg-rose-50 border-rose-200 text-rose-700' : 'border-slate-100 text-slate-400'}`}>Yes</button>
                                    <button onClick={() => updateField('exang', 0)} className={`flex-1 py-4 rounded-xl font-bold border ${formData.exang === 0 ? 'bg-rose-50 border-rose-200 text-rose-700' : 'border-slate-100 text-slate-400'}`}>No</button>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <label className="text-sm font-black text-slate-700 uppercase tracking-widest">ST Depression (Oldpeak)</label>
                                    <input type="number" step="0.1" value={formData.oldpeak} onChange={e => updateField('oldpeak', parseFloat(e.target.value) || 0)} className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-xl font-bold text-rose-600 outline-none transition-all" />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-sm font-black text-slate-700 uppercase tracking-widest">ST Slope</label>
                                    <select value={formData.slope} onChange={e => updateField('slope', parseInt(e.target.value))} className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-lg font-bold text-slate-600 outline-none transition-all appearance-none cursor-pointer">
                                        <option value={0}>Upsloping</option>
                                        <option value={1}>Flat</option>
                                        <option value={2}>Downsloping</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <label className="text-sm font-black text-slate-700 uppercase tracking-widest">Major Vessels (0-3)</label>
                                    <input type="number" max="3" min="0" value={formData.ca} onChange={e => updateField('ca', parseInt(e.target.value) || 0)} className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-xl font-bold text-rose-600 outline-none transition-all" />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-sm font-black text-slate-700 uppercase tracking-widest">Thalassemia</label>
                                    <select value={formData.thal} onChange={e => updateField('thal', parseInt(e.target.value))} className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-lg font-bold text-slate-600 outline-none transition-all appearance-none cursor-pointer">
                                        <option value={1}>Normal</option>
                                        <option value={2}>Fixed Defect</option>
                                        <option value={3}>Reversable Defect</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    )}

                </div>

                {/* Footer */}
                <div className="flex items-center justify-between gap-6 pt-10">
                    <button onClick={handleBack} disabled={step === 0} className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-slate-400 hover:bg-slate-50 transition-all disabled:opacity-0">
                        <ChevronLeft size={20} /> Back
                    </button>

                    {step < steps.length - 1 ? (
                        <button onClick={handleNext} className="flex items-center gap-4 px-8 py-4 bg-rose-600 text-white rounded-2xl font-bold hover:bg-rose-700 transition-all shadow-xl shadow-rose-200">
                            Continue <ChevronRight size={20} />
                        </button>
                    ) : (
                        <button onClick={() => onSubmit(formData)} disabled={isLoading} className="flex items-center gap-4 px-8 py-4 bg-emerald-600 text-white rounded-2xl font-bold hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-200 disabled:opacity-50">
                            {isLoading ? 'Analyzing...' : 'Run Analysis'} <Activity size={20} />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default HeartAssessment;
