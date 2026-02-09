
import React, { useState } from 'react';
import { 
  Target, 
  HelpCircle, 
  Activity, 
  Droplets, 
  User, 
  Heart, 
  Dna,
  ShieldCheck,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Info
} from 'lucide-react';
import { IndicatorInfo } from '../types';

export const INDICATORS: IndicatorInfo[] = [
  {
    id: 'glucose',
    label: '2-Hour Plasma Glucose',
    unit: 'mg/dL',
    range: '70 - 140',
    description: 'Measures your blood sugar concentration exactly 2 hours after consuming a standardized 75-gram oral glucose solution.',
    whyItMatters: 'This is the "gold standard" for identifying impaired glucose tolerance (prediabetes) and Type 2 diabetes. It shows how efficiently your pancreas secretes insulin and how well your cells use it.',
    icon: 'droplets'
  },
  {
    id: 'bmi',
    label: 'Body Mass Index (BMI)',
    unit: 'kg/m²',
    range: '18.5 - 24.9',
    description: 'A calculation based on your weight and height that estimates body fat and health risks.',
    whyItMatters: 'Excessive body weight, especially abdominal fat, is the leading cause of insulin resistance. Adipose tissue releases pro-inflammatory chemicals that interfere with insulin signals.',
    icon: 'user'
  },
  {
    id: 'bloodPressure',
    label: 'Diastolic Blood Pressure',
    unit: 'mmHg',
    range: '60 - 80',
    description: 'The pressure in your blood vessels when the heart muscle relaxes between beats.',
    whyItMatters: 'High blood pressure (Hypertension) and diabetes often occur together (Metabolic Syndrome). They both damage blood vessels, compounding the risk of heart disease and stroke.',
    icon: 'heart'
  },
  {
    id: 'pedigree',
    label: 'Pedigree Function',
    unit: 'Score',
    range: '0.1 - 2.5',
    description: 'A numerical score evaluating your genetic predisposition based on siblings, parents, and grandparents with diabetes.',
    whyItMatters: 'While lifestyle is critical, genetics provide the "baseline" risk. This score helps determine how aggressive preventative measures should be based on your DNA.',
    icon: 'dna'
  },
  {
    id: 'insulin',
    label: 'Serum Insulin',
    unit: 'mu U/ml',
    range: '15 - 270',
    description: 'A lab measurement of the hormone insulin present in your serum 2 hours after a glucose challenge.',
    whyItMatters: 'Very high insulin with high glucose indicates "Insulin Resistance" (your body is ignoring the hormone). Low insulin with high glucose indicates "Insulin Deficiency" (your pancreas is failing).',
    icon: 'activity'
  },
  {
    id: 'skinThickness',
    label: 'Triceps Skin Thickness',
    unit: 'mm',
    range: '10 - 50',
    description: 'The thickness of a skin fold on the back of the upper arm, used as a proxy for subcutaneous body fat.',
    whyItMatters: 'In clinical studies, this marker is often more predictive of metabolic syndrome than total weight, as it specifically measures peripheral fat distribution.',
    icon: 'shield'
  }
];

const IndicatorWiki: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const getIcon = (id: string) => {
    switch (id) {
      case 'glucose': return <Droplets />;
      case 'bmi': return <User />;
      case 'bloodPressure': return <Heart />;
      case 'pedigree': return <Dna />;
      case 'insulin': return <Activity />;
      case 'skinThickness': return <ShieldCheck />;
      default: return <Activity />;
    }
  };

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="space-y-10">
      <div className="bg-white dark:bg-slate-800 p-10 rounded-[2.5rem] border border-slate-100 dark:border-slate-700 shadow-sm relative overflow-hidden transition-colors duration-300">
        <div className="relative z-10">
          <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">Clinical Parameter Library</h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium max-w-3xl leading-relaxed text-lg">
            GlucoScan uses several key physiological and demographic indicators to model your risk profile. 
            Click an indicator to explore its clinical significance in detail.
          </p>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 dark:bg-blue-900/20 rounded-full -mr-32 -mt-32 blur-3xl opacity-50"></div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {INDICATORS.map((indicator) => {
          const isExpanded = expandedId === indicator.id;
          return (
            <div 
              key={indicator.id} 
              className={`bg-white dark:bg-slate-800 rounded-[2rem] shadow-sm border ${isExpanded ? 'border-[#14B8A6] ring-4 ring-teal-50 dark:ring-teal-900/20' : 'border-slate-100 dark:border-slate-700'} hover:shadow-xl transition-all duration-300 overflow-hidden group`}
            >
              <button 
                onClick={() => toggleExpand(indicator.id)}
                className="w-full text-left p-8 flex items-center justify-between"
              >
                <div className="flex items-center gap-6">
                  <div className={`p-5 rounded-2xl transition-all duration-300 shadow-sm ${isExpanded ? 'bg-[#14B8A6] text-white' : 'bg-blue-50 dark:bg-slate-700 text-blue-600 dark:text-blue-400'}`}>
                    {getIcon(indicator.id)}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-800 dark:text-white tracking-tight">{indicator.label}</h3>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mt-1">
                      Range: {indicator.range} <span className="font-bold">{indicator.unit}</span>
                    </p>
                  </div>
                </div>
                <div className="text-slate-300 group-hover:text-slate-500 transition-colors">
                  {isExpanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                </div>
              </button>

              {isExpanded && (
                <div className="px-8 pb-8 animate-in slide-in-from-top-2 duration-300">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-slate-50 dark:border-slate-700">
                    <div className="space-y-4">
                      <h4 className="text-xs font-black text-[#1E3A8A] dark:text-blue-400 uppercase tracking-widest flex items-center gap-2">
                        <Info size={14} /> Comprehensive Description
                      </h4>
                      <p className="text-slate-600 dark:text-slate-300 leading-relaxed font-medium bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800">
                        {indicator.description}
                      </p>
                    </div>

                    <div className="space-y-4">
                      <h4 className="text-xs font-black text-[#14B8A6] uppercase tracking-widest flex items-center gap-2">
                        <Target size={14} /> Clinical Significance
                      </h4>
                      <div className="bg-teal-50 dark:bg-teal-900/20 p-6 rounded-2xl border border-teal-100 dark:border-teal-800 relative">
                        <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed italic font-medium">
                          "{indicator.whyItMatters}"
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-100 dark:border-amber-800 flex items-center gap-3">
                    <AlertCircle className="text-amber-500" size={16} />
                    <p className="text-[10px] font-bold text-amber-700 dark:text-amber-400 uppercase tracking-tight">
                      Note: Factors like fasting duration and hydration levels can influence {indicator.label} readings.
                    </p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      <div className="bg-blue-600 dark:bg-[#1E3A8A] text-white p-12 rounded-[3rem] shadow-2xl shadow-blue-200 dark:shadow-none relative overflow-hidden group transition-colors duration-300">
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-md">
              <HelpCircle size={32} />
            </div>
            <h2 className="text-3xl font-black tracking-tight">Need a customized explanation?</h2>
          </div>
          <p className="text-blue-100 mb-10 leading-relaxed text-xl max-w-3xl font-medium">
            Our specialized AI Assistant can break down these markers further based on your specific age, gender, and recent lab results.
          </p>
          <button className="bg-white text-blue-600 px-10 py-5 rounded-[1.5rem] font-black hover:bg-blue-50 transition-all transform active:scale-95 shadow-xl shadow-blue-800/20 tracking-tight">
            Consult AI Intelligence
          </button>
        </div>
        
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl transition-transform duration-1000 group-hover:scale-110"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400/20 rounded-full -ml-32 -mb-32 blur-2xl"></div>
      </div>
    </div>
  );
};

export default IndicatorWiki;
