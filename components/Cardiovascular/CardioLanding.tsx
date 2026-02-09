import React from 'react';
import { Heart, Activity, Brain, ChevronRight } from 'lucide-react';
import { AssessmentType } from '../../types';

interface CardioLandingProps {
    onSelect: (type: AssessmentType) => void;
}

const CardioLanding: React.FC<CardioLandingProps> = ({ onSelect }) => {
    const modules = [
        {
            id: 'heart' as const,
            title: 'Heart Disease',
            description: 'Assess probability of coronary artery disease using standard clinical markers.',
            icon: <Heart size={32} className="text-white" />,
            bg: 'bg-rose-500',
            shadow: 'shadow-rose-200'
        },
        {
            id: 'hypertension' as const,
            title: 'Hypertension',
            description: 'Evaluate risk of high blood pressure complications based on lifestyle and vitals.',
            icon: <Activity size={32} className="text-white" />,
            bg: 'bg-orange-500',
            shadow: 'shadow-orange-200'
        },
        {
            id: 'stroke' as const,
            title: 'Stroke Risk',
            description: 'Analyze neurological risk factors including age, history, and metabolic state.',
            icon: <Brain size={32} className="text-white" />,
            bg: 'bg-indigo-500',
            shadow: 'shadow-indigo-200'
        }
    ];

    return (
        <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="mb-12 text-center">
                <h2 className="text-4xl font-black text-[#1E3A8A] dark:text-white mb-4 tracking-tight">Cardiovascular Suite</h2>
                <p className="text-slate-500 dark:text-slate-400 font-medium max-w-2xl mx-auto">
                    Comprehensive vascular health risk assessment tools. Select a specific module to begin analysis.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {modules.map((module, idx) => (
                    <button
                        key={module.id}
                        onClick={() => onSelect(module.id)}
                        className="group relative bg-white dark:bg-slate-800 rounded-[2.5rem] p-8 text-left border border-slate-100 dark:border-slate-700 hover:shadow-xl hover:translate-y-[-4px] transition-all duration-300 flex flex-col h-full overflow-hidden"
                        style={{ animationDelay: `${idx * 100}ms` }}
                    >
                        <div className={`absolute top-0 right-0 w-32 h-32 ${module.bg} opacity-5 rounded-bl-[100px] transition-transform group-hover:scale-150 duration-700`} />

                        <div className={`${module.bg} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg ${module.shadow} group-hover:scale-110 transition-transform duration-300`}>
                            {module.icon}
                        </div>

                        <h3 className="text-xl font-black text-slate-800 dark:text-white mb-3">{module.title}</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-8 flex-1">
                            {module.description}
                        </p>

                        <div className="flex items-center gap-2 text-sm font-bold text-slate-800 dark:text-white group-hover:text-blue-600 transition-colors mt-auto">
                            Start Assessment <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default CardioLanding;
