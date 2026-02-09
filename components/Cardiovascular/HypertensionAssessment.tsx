import React, { useState } from 'react';
import { HypertensionData, UserRole } from '../../types';
import {
    ChevronRight,
    ChevronLeft,
    Activity,
    User,
    Heart,
    Utensils
} from 'lucide-react';

interface HypertensionAssessmentProps {
    onSubmit: (data: HypertensionData) => void;
    isLoading: boolean;
    role: UserRole;
}

const HypertensionAssessment: React.FC<HypertensionAssessmentProps> = ({ onSubmit, isLoading, role }) => {
    const [step, setStep] = useState(0);
    const [formData, setFormData] = useState<HypertensionData>({
        patientName: '',
        age: 45,
        sex: 'male',
        bmi: 24.5,
        systolicBP: 120,
        diastolicBP: 80,
        heartRate: 72,
        smoking: 'no',
        alcohol: 'no',
        activity: 'moderate',
        familyHistory: 'no',
        saltIntake: 'moderate'
    });

    const steps = [
        { title: 'Demographics', icon: <User />, desc: 'Basic Patient Info' },
        { title: 'Vitals', icon: <Activity />, desc: 'Blood Pressure & HR' },
        { title: 'Lifestyle', icon: <Utensils />, desc: 'Habits & Diet' }
    ];

    const handleNext = () => setStep(s => Math.min(s + 1, steps.length - 1));
    const handleBack = () => setStep(s => Math.max(s - 1, 0));

    const updateField = (name: keyof HypertensionData, value: any) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="bg-white rounded-[3rem] shadow-2xl shadow-orange-100/50 border border-slate-100 overflow-hidden max-w-5xl mx-auto flex flex-col md:flex-row min-h-[600px] animate-in slide-in-from-bottom-8 duration-700">

            <div className="w-full md:w-80 bg-slate-50 p-10 border-r border-slate-100 flex flex-col">
                <div className="mb-10">
                    <div className="flex items-center gap-2 mb-6">
                        {steps.map((_, i) => (
                            <div key={i} className={`h-1.5 rounded-full transition-all duration-500 ${i === step ? 'w-8 bg-orange-500' : i < step ? 'w-2 bg-orange-300' : 'w-2 bg-slate-200'}`} />
                        ))}
                    </div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Hypertension Assessment</p>
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
                                    <input type="number" value={formData.age} onChange={e => updateField('age', parseInt(e.target.value) || 0)} className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-xl font-bold text-orange-500 outline-none focus:ring-4 focus:ring-orange-100 transition-all" />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-sm font-black text-slate-700 uppercase tracking-widest">Sex</label>
                                    <div className="flex bg-slate-50 p-1 rounded-xl border border-slate-100">
                                        {['male', 'female'].map(s => (
                                            <button key={s} onClick={() => updateField('sex', s)} className={`flex-1 py-3 rounded-lg text-sm font-bold uppercase transition-all ${formData.sex === s ? 'bg-white text-orange-500 shadow-sm' : 'text-slate-400'}`}>
                                                {s}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="text-sm font-black text-slate-700 uppercase tracking-widest">Body Mass Index (BMI)</label>
                                <input type="number" step="0.1" value={formData.bmi} onChange={e => updateField('bmi', parseFloat(e.target.value) || 0)} className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-xl font-bold text-orange-500 outline-none focus:ring-4 focus:ring-orange-100 transition-all" />
                            </div>

                            <div className="space-y-3">
                                <label className="text-sm font-black text-slate-700 uppercase tracking-widest">Family History of Hypertension</label>
                                <div className="flex gap-4">
                                    <button onClick={() => updateField('familyHistory', 'yes')} className={`flex-1 py-4 rounded-xl font-bold border ${formData.familyHistory === 'yes' ? 'bg-orange-50 border-orange-200 text-orange-600' : 'border-slate-100 text-slate-400'}`}>Yes</button>
                                    <button onClick={() => updateField('familyHistory', 'no')} className={`flex-1 py-4 rounded-xl font-bold border ${formData.familyHistory === 'no' ? 'bg-orange-50 border-orange-200 text-orange-600' : 'border-slate-100 text-slate-400'}`}>No</button>
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 1 && (
                        <div className="space-y-8 animate-in slide-in-from-right-8 duration-500">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <label className="text-sm font-black text-slate-700 uppercase tracking-widest">Systolic BP</label>
                                    <input type="number" value={formData.systolicBP} onChange={e => updateField('systolicBP', parseInt(e.target.value) || 0)} className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-xl font-bold text-orange-500 outline-none transition-all" />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-sm font-black text-slate-700 uppercase tracking-widest">Diastolic BP</label>
                                    <input type="number" value={formData.diastolicBP} onChange={e => updateField('diastolicBP', parseInt(e.target.value) || 0)} className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-xl font-bold text-orange-500 outline-none transition-all" />
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="text-sm font-black text-slate-700 uppercase tracking-widest">Heart Rate</label>
                                <input type="number" value={formData.heartRate} onChange={e => updateField('heartRate', parseInt(e.target.value) || 0)} className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-xl font-bold text-orange-500 outline-none transition-all" />
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-8 animate-in slide-in-from-right-8 duration-500">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <label className="text-sm font-black text-slate-700 uppercase tracking-widest">Smoker</label>
                                    <div className="flex gap-4">
                                        <button onClick={() => updateField('smoking', 'yes')} className={`flex-1 py-3 rounded-xl font-bold border ${formData.smoking === 'yes' ? 'bg-orange-50 border-orange-200 text-orange-600' : 'border-slate-100 text-slate-400'}`}>Yes</button>
                                        <button onClick={() => updateField('smoking', 'no')} className={`flex-1 py-3 rounded-xl font-bold border ${formData.smoking === 'no' ? 'bg-orange-50 border-orange-200 text-orange-600' : 'border-slate-100 text-slate-400'}`}>No</button>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <label className="text-sm font-black text-slate-700 uppercase tracking-widest">Alcohol Consumer</label>
                                    <div className="flex gap-4">
                                        <button onClick={() => updateField('alcohol', 'yes')} className={`flex-1 py-3 rounded-xl font-bold border ${formData.alcohol === 'yes' ? 'bg-orange-50 border-orange-200 text-orange-600' : 'border-slate-100 text-slate-400'}`}>Yes</button>
                                        <button onClick={() => updateField('alcohol', 'no')} className={`flex-1 py-3 rounded-xl font-bold border ${formData.alcohol === 'no' ? 'bg-orange-50 border-orange-200 text-orange-600' : 'border-slate-100 text-slate-400'}`}>No</button>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="text-sm font-black text-slate-700 uppercase tracking-widest">Physical Activity</label>
                                <div className="grid grid-cols-3 gap-2">
                                    {['sedentary', 'moderate', 'active'].map(ls => (
                                        <button key={ls} onClick={() => updateField('activity', ls)} className={`py-4 rounded-xl font-bold text-sm uppercase border ${formData.activity === ls ? 'bg-orange-50 border-orange-200 text-orange-600' : 'border-slate-100 text-slate-400'}`}>
                                            {ls}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="text-sm font-black text-slate-700 uppercase tracking-widest">Salt Intake</label>
                                <div className="grid grid-cols-3 gap-2">
                                    {['low', 'moderate', 'high'].map(ls => (
                                        <button key={ls} onClick={() => updateField('saltIntake', ls)} className={`py-4 rounded-xl font-bold text-sm uppercase border ${formData.saltIntake === ls ? 'bg-orange-50 border-orange-200 text-orange-600' : 'border-slate-100 text-slate-400'}`}>
                                            {ls}
                                        </button>
                                    ))}
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
                        <button onClick={handleNext} className="flex items-center gap-4 px-8 py-4 bg-orange-500 text-white rounded-2xl font-bold hover:bg-orange-600 transition-all shadow-xl shadow-orange-200">
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

export default HypertensionAssessment;
