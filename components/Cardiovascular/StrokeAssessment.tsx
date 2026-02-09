import React, { useState } from 'react';
import { StrokeData, UserRole } from '../../types';
import {
    ChevronRight,
    ChevronLeft,
    Brain,
    User,
    Activity,
    Briefcase
} from 'lucide-react';

interface StrokeAssessmentProps {
    onSubmit: (data: StrokeData) => void;
    isLoading: boolean;
    role: UserRole;
}

const StrokeAssessment: React.FC<StrokeAssessmentProps> = ({ onSubmit, isLoading, role }) => {
    const [step, setStep] = useState(0);
    const [formData, setFormData] = useState<StrokeData>({
        patientName: '',
        age: 65,
        gender: 'male',
        hypertension: false,
        heartDisease: false,
        everMarried: true,
        workType: 'private',
        residenceType: 'urban',
        avgGlucoseLevel: 90,
        bmi: 26,
        smokingStatus: 'never smoked'
    });

    const steps = [
        { title: 'Profile', icon: <User />, desc: 'Personal Details' },
        { title: 'Medical History', icon: <Activity />, desc: 'Conditions & Vitals' },
        { title: 'Lifestyle', icon: <Briefcase />, desc: 'Work & Habits' }
    ];

    const handleNext = () => setStep(s => Math.min(s + 1, steps.length - 1));
    const handleBack = () => setStep(s => Math.max(s - 1, 0));

    const updateField = (name: keyof StrokeData, value: any) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="bg-white rounded-[3rem] shadow-2xl shadow-indigo-100/50 border border-slate-100 overflow-hidden max-w-5xl mx-auto flex flex-col md:flex-row min-h-[600px] animate-in slide-in-from-bottom-8 duration-700">

            <div className="w-full md:w-80 bg-slate-50 p-10 border-r border-slate-100 flex flex-col">
                <div className="mb-10">
                    <div className="flex items-center gap-2 mb-6">
                        {steps.map((_, i) => (
                            <div key={i} className={`h-1.5 rounded-full transition-all duration-500 ${i === step ? 'w-8 bg-indigo-500' : i < step ? 'w-2 bg-indigo-300' : 'w-2 bg-slate-200'}`} />
                        ))}
                    </div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Stroke Assessment</p>
                    <h2 className="text-2xl font-black text-slate-800 mt-2 tracking-tight">{steps[step].title}</h2>
                    <p className="text-xs text-slate-500 mt-2 font-medium">{steps[step].desc}</p>
                </div>
            </div>

            <div className="flex-1 p-10 md:p-14 flex flex-col justify-between overflow-y-auto">
                <div className="space-y-10">

                    {step === 0 && (
                        <div className="space-y-8 animate-in slide-in-from-right-8 duration-500">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <label className="text-sm font-black text-slate-700 uppercase tracking-widest">Age</label>
                                    <input type="number" value={formData.age} onChange={e => updateField('age', parseInt(e.target.value) || 0)} className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-xl font-bold text-indigo-500 outline-none focus:ring-4 focus:ring-indigo-100 transition-all" />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-sm font-black text-slate-700 uppercase tracking-widest">Gender</label>
                                    <div className="flex bg-slate-50 p-1 rounded-xl border border-slate-100">
                                        {['male', 'female', 'other'].map(s => (
                                            <button key={s} onClick={() => updateField('gender', s)} className={`flex-1 py-3 rounded-lg text-sm font-bold uppercase transition-all ${formData.gender === s ? 'bg-white text-indigo-500 shadow-sm' : 'text-slate-400'}`}>
                                                {s}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="text-sm font-black text-slate-700 uppercase tracking-widest">Married History</label>
                                <div className="flex gap-4">
                                    <button onClick={() => updateField('everMarried', true)} className={`flex-1 py-4 rounded-xl font-bold border ${formData.everMarried ? 'bg-indigo-50 border-indigo-200 text-indigo-600' : 'border-slate-100 text-slate-400'}`}>Yes</button>
                                    <button onClick={() => updateField('everMarried', false)} className={`flex-1 py-4 rounded-xl font-bold border ${!formData.everMarried ? 'bg-indigo-50 border-indigo-200 text-indigo-600' : 'border-slate-100 text-slate-400'}`}>No</button>
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 1 && (
                        <div className="space-y-8 animate-in slide-in-from-right-8 duration-500">
                            <div className="space-y-3">
                                <label className="text-sm font-black text-slate-700 uppercase tracking-widest">Pre-existing Conditions</label>
                                <div className="grid grid-cols-2 gap-4">
                                    <button
                                        onClick={() => updateField('hypertension', !formData.hypertension)}
                                        className={`p-6 rounded-2xl border transition-all text-left ${formData.hypertension ? 'bg-indigo-50 border-indigo-200 text-indigo-700' : 'border-slate-100 text-slate-500'}`}
                                    >
                                        <span className="font-bold block">Hypertension</span>
                                        <span className="text-xs opacity-70">High Blood Pressure</span>
                                    </button>
                                    <button
                                        onClick={() => updateField('heartDisease', !formData.heartDisease)}
                                        className={`p-6 rounded-2xl border transition-all text-left ${formData.heartDisease ? 'bg-indigo-50 border-indigo-200 text-indigo-700' : 'border-slate-100 text-slate-500'}`}
                                    >
                                        <span className="font-bold block">Heart Disease</span>
                                        <span className="text-xs opacity-70">Coronary Conditions</span>
                                    </button>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <label className="text-sm font-black text-slate-700 uppercase tracking-widest">Avg. Glucose</label>
                                    <input type="number" value={formData.avgGlucoseLevel} onChange={e => updateField('avgGlucoseLevel', parseFloat(e.target.value) || 0)} className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-xl font-bold text-indigo-500 outline-none transition-all" />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-sm font-black text-slate-700 uppercase tracking-widest">BMI</label>
                                    <input type="number" step="0.1" value={formData.bmi} onChange={e => updateField('bmi', parseFloat(e.target.value) || 0)} className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-xl font-bold text-indigo-500 outline-none transition-all" />
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-8 animate-in slide-in-from-right-8 duration-500">
                            <div className="space-y-3">
                                <label className="text-sm font-black text-slate-700 uppercase tracking-widest">Work Type</label>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                    {['private', 'self-employed', 'govt_job', 'children', 'never_worked'].map(wt => (
                                        <button key={wt} onClick={() => updateField('workType', wt)} className={`py-3 rounded-xl font-bold text-sm uppercase border ${formData.workType === wt ? 'bg-indigo-50 border-indigo-200 text-indigo-600' : 'border-slate-100 text-slate-400'}`}>
                                            {wt.replace('_', ' ')}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="text-sm font-black text-slate-700 uppercase tracking-widest">Residence Type</label>
                                <div className="flex gap-4">
                                    <button onClick={() => updateField('residenceType', 'urban')} className={`flex-1 py-4 rounded-xl font-bold border ${formData.residenceType === 'urban' ? 'bg-indigo-50 border-indigo-200 text-indigo-600' : 'border-slate-100 text-slate-400'}`}>Urban</button>
                                    <button onClick={() => updateField('residenceType', 'rural')} className={`flex-1 py-4 rounded-xl font-bold border ${formData.residenceType === 'rural' ? 'bg-indigo-50 border-indigo-200 text-indigo-600' : 'border-slate-100 text-slate-400'}`}>Rural</button>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="text-sm font-black text-slate-700 uppercase tracking-widest">Smoking Status</label>
                                <select value={formData.smokingStatus} onChange={e => updateField('smokingStatus', e.target.value)} className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-lg font-bold text-slate-600 outline-none transition-all appearance-none cursor-pointer">
                                    <option value="never smoked">Never Smoked</option>
                                    <option value="formerly smoked">Formerly Smoked</option>
                                    <option value="smokes">Smokes</option>
                                    <option value="unknown">Unknown</option>
                                </select>
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
                        <button onClick={handleNext} className="flex items-center gap-4 px-8 py-4 bg-indigo-500 text-white rounded-2xl font-bold hover:bg-indigo-600 transition-all shadow-xl shadow-indigo-200">
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

export default StrokeAssessment;
