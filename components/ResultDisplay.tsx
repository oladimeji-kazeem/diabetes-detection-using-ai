
import React from 'react';
import { RiskAssessment } from '../types';
import { CheckCircle2, AlertTriangle, XCircle, Info, ArrowRight, Download, Printer, HeartPulse } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface ResultDisplayProps {
  result: RiskAssessment;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ result }) => {
  const getRiskStyles = () => {
    switch (result.prediction) {
      case 'Low Risk': return { color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200', icon: <CheckCircle2 className="text-emerald-500" /> };
      case 'Moderate Risk': return { color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200', icon: <AlertTriangle className="text-amber-500" /> };
      case 'High Risk': return { color: 'text-rose-600', bg: 'bg-rose-50', border: 'border-rose-200', icon: <XCircle className="text-rose-500" /> };
    }
  };

  const handleExportPDF = () => {
    window.print();
  };

  const styles = getRiskStyles();
  const chartData = [
    { name: 'Risk', value: result.probability },
    { name: 'Healthy', value: 100 - result.probability }
  ];
  const COLORS = [styles.color.replace('text-', '#').replace('600', '600'), '#f1f5f9'];

  return (
    <div className={`p-8 rounded-3xl shadow-xl border ${styles.border} ${styles.bg} transition-all duration-500 bg-white relative overflow-hidden print:p-10 print:border-0 print:shadow-none`}>
      
      {/* Print-only Header */}
      <div className="hidden print:flex items-center justify-between mb-10 border-b-2 border-slate-100 pb-6">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-lg">
            <HeartPulse className="text-white w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900">GlucoScan AI</h1>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Medical Assessment Report</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-bold text-slate-400 uppercase">Assessment ID</p>
          <p className="text-sm font-mono text-slate-700">{crypto.randomUUID().split('-')[0].toUpperCase()}</p>
          <p className="text-[10px] font-bold text-slate-400 uppercase mt-1">Generated On</p>
          <p className="text-sm text-slate-700">{new Date().toLocaleString()}</p>
        </div>
      </div>

      <div className="flex items-center justify-between mb-8 no-print">
        <div>
          <h3 className="text-xl font-bold text-slate-800">Risk Assessment Analysis</h3>
          <p className="text-sm text-slate-500">Evaluated by Gemini Clinical Model</p>
        </div>
        <button 
          onClick={handleExportPDF}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all font-semibold text-sm shadow-sm active:scale-95 no-print"
        >
          <Printer size={16} />
          Export Report (PDF)
        </button>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-10 mb-10">
        <div className="w-56 h-56 relative group">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                innerRadius={75}
                outerRadius={95}
                paddingAngle={5}
                dataKey="value"
                startAngle={90}
                endAngle={450}
                animationDuration={1500}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} strokeWidth={0} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
             <span className={`text-4xl font-black ${styles.color}`}>{result.probability}%</span>
             <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Risk Probability</span>
          </div>
        </div>

        <div className="flex-1 space-y-5">
          <div className="flex items-center gap-4">
            <div className={`p-4 rounded-2xl shadow-sm bg-white border ${styles.border}`}>{styles.icon}</div>
            <div>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-1">Prediction Outcome</p>
              <h4 className={`text-3xl font-black ${styles.color} leading-none tracking-tight`}>{result.prediction}</h4>
            </div>
          </div>
          <div className="bg-white/60 backdrop-blur-sm p-5 rounded-2xl border border-white/40 shadow-inner">
            <p className="text-slate-700 text-sm leading-relaxed italic">
              "{result.explanation}"
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 print:gap-10">
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm print:border-slate-200">
          <h5 className="text-sm font-black text-slate-800 mb-4 flex items-center gap-2 border-b border-slate-50 pb-2">
            <Info size={18} className="text-blue-500" /> 
            CORE RISK FACTORS
          </h5>
          <ul className="space-y-3">
            {result.keyFactors.map((factor, i) => (
              <li key={i} className="text-xs text-slate-600 flex items-start gap-3">
                <div className="w-5 h-5 rounded-md bg-slate-50 border border-slate-100 flex items-center justify-center flex-shrink-0 text-[10px] font-bold text-slate-400">
                  {i + 1}
                </div>
                <span className="pt-0.5">{factor}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm print:border-slate-200">
          <h5 className="text-sm font-black text-slate-800 mb-4 flex items-center gap-2 border-b border-slate-50 pb-2">
            <ArrowRight size={18} className="text-emerald-500" /> 
            CLINICAL RECOMMENDATIONS
          </h5>
          <ul className="space-y-3">
            {result.recommendations.map((rec, i) => (
              <li key={i} className="text-xs text-slate-600 flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center flex-shrink-0">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                </div>
                <span className="pt-0.5">{rec}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Print Disclaimer */}
      <div className="hidden print:block mt-12 border-t border-slate-100 pt-6">
        <p className="text-[10px] text-slate-400 leading-relaxed text-center italic">
          <strong>Medical Disclaimer:</strong> This assessment is generated by an artificial intelligence model and is intended for informational purposes only. It does not constitute a medical diagnosis, professional medical advice, or a treatment plan. The results provided are based on statistical patterns and should be discussed with a qualified healthcare professional before making any health-related decisions.
        </p>
      </div>
    </div>
  );
};

export default ResultDisplay;
