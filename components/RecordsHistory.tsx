
import React, { useState, useMemo } from 'react';
import { AssessmentRecord } from '../types';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area,
  Legend 
} from 'recharts';
import { 
  Calendar, 
  Search, 
  Filter, 
  ArrowUpDown, 
  AlertCircle, 
  Activity,
  Download,
  ChevronRight,
  FileText,
  HeartPulse,
  Printer
} from 'lucide-react';

interface RecordsHistoryProps {
  records: AssessmentRecord[];
}

const RecordsHistory: React.FC<RecordsHistoryProps> = ({ records }) => {
  const [filter, setFilter] = useState('');
  const [sortField, setSortField] = useState<'timestamp' | 'probability'>('timestamp');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [riskFilter, setRiskFilter] = useState<'all' | 'High Risk' | 'Moderate Risk' | 'Low Risk'>('all');
  const [selectedForPrint, setSelectedForPrint] = useState<AssessmentRecord | null>(null);

  const filteredRecords = useMemo(() => {
    return records
      .filter(r => {
        const name = (r.data.patientName || '').toLowerCase();
        const expl = (r.result.explanation || '').toLowerCase();
        const matchesSearch = name.includes(filter.toLowerCase()) || expl.includes(filter.toLowerCase());
        const matchesRisk = riskFilter === 'all' || r.result.prediction === riskFilter;
        return matchesSearch && matchesRisk;
      })
      .sort((a, b) => {
        const valA = sortField === 'timestamp' ? a.timestamp : a.result.probability;
        const valB = sortField === 'timestamp' ? b.timestamp : b.result.probability;
        return sortOrder === 'desc' ? valB - valA : valA - valB;
      });
  }, [records, filter, sortField, sortOrder, riskFilter]);

  const chartData = useMemo(() => {
    return [...records].reverse().slice(-10).map(r => ({
      date: new Date(r.timestamp).toLocaleDateString([], { month: 'short', day: 'numeric' }),
      risk: r.result.probability,
      glucose: r.data.glucose,
      bmi: r.data.bmi
    }));
  }, [records]);

  const exportRecordPDF = (record: AssessmentRecord) => {
    setSelectedForPrint(record);
    // Short delay to ensure state update renders the print-visible div
    setTimeout(() => {
      window.print();
      setSelectedForPrint(null);
    }, 100);
  };

  if (records.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-800 p-24 rounded-[3rem] shadow-sm border border-slate-100 dark:border-slate-700 text-center flex flex-col items-center transition-colors duration-300">
        <Calendar size={80} className="text-slate-100 dark:text-slate-700 mb-6" />
        <h3 className="text-2xl font-black text-slate-800 dark:text-white">No Historical Data</h3>
        <p className="text-slate-500 dark:text-slate-400 max-w-xs mx-auto mt-2">Begin your first clinical assessment to populate the secure vault.</p>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {/* Print-only Individual Record Template */}
      {selectedForPrint && (
        <div className="hidden print:block fixed inset-0 z-[9999] bg-white p-12 text-slate-900 overflow-visible">
          <div className="flex items-center justify-between mb-10 border-b-4 border-[#1E3A8A] pb-8">
            <div className="flex items-center gap-4">
               <div className="bg-[#1E3A8A] p-3 rounded-2xl">
                 <HeartPulse className="text-white w-10 h-10" />
               </div>
               <div>
                 <h1 className="text-3xl font-black">GlucoScan Clinical Report</h1>
                 <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.3em]">AI-Powered Diagnostics</p>
               </div>
            </div>
            <div className="text-right">
               <p className="text-xs font-bold text-slate-400 uppercase mb-1">Generated</p>
               <p className="text-sm font-bold">{new Date().toLocaleString()}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10 mb-12">
            <div className="space-y-6">
              <h2 className="text-xl font-black text-[#1E3A8A] uppercase tracking-widest border-b border-slate-100 pb-2">Patient Profile</h2>
              <div className="grid grid-cols-2 gap-y-4 text-sm">
                <span className="text-slate-400 font-bold uppercase text-[10px]">Reference Name</span>
                <span className="font-bold">{selectedForPrint.data.patientName || 'Anonymous'}</span>
                <span className="text-slate-400 font-bold uppercase text-[10px]">Assessment Date</span>
                <span className="font-bold">{new Date(selectedForPrint.timestamp).toLocaleDateString()}</span>
                <span className="text-slate-400 font-bold uppercase text-[10px]">Chronological Age</span>
                <span className="font-bold">{selectedForPrint.data.age} Years</span>
                <span className="text-slate-400 font-bold uppercase text-[10px]">Clinical Role</span>
                <span className="font-bold uppercase text-[#14B8A6]">{selectedForPrint.role}</span>
              </div>
            </div>
            <div className="space-y-6">
              <h2 className="text-xl font-black text-[#1E3A8A] uppercase tracking-widest border-b border-slate-100 pb-2">Risk Summary</h2>
              <div className="flex items-center gap-6">
                 <div className="text-5xl font-black text-[#1E3A8A]">{selectedForPrint.result.probability}%</div>
                 <div>
                    <p className={`text-xl font-black uppercase ${
                      selectedForPrint.result.prediction === 'High Risk' ? 'text-rose-600' : 
                      selectedForPrint.result.prediction === 'Moderate Risk' ? 'text-amber-600' : 'text-emerald-600'
                    }`}>{selectedForPrint.result.prediction}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Calculated Probability</p>
                 </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4 mb-12">
            {[
              { label: 'Glucose', val: selectedForPrint.data.glucose, unit: 'mg/dL' },
              { label: 'BMI', val: selectedForPrint.data.bmi, unit: 'kg/m²' },
              { label: 'BP Diastolic', val: selectedForPrint.data.bloodPressure, unit: 'mmHg' },
              { label: 'Insulin', val: selectedForPrint.data.insulin, unit: 'mu U/ml' },
            ].map(item => (
              <div key={item.label} className="p-4 bg-slate-50 border border-slate-100 rounded-2xl text-center">
                 <p className="text-[9px] font-black text-slate-400 uppercase mb-1">{item.label}</p>
                 <p className="text-lg font-black">{item.val}</p>
                 <p className="text-[8px] font-bold text-slate-300">{item.unit}</p>
              </div>
            ))}
          </div>

          <div className="space-y-8">
            <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100">
               <h3 className="text-xs font-black text-[#1E3A8A] uppercase mb-4 tracking-widest">Clinical Explanation</h3>
               <p className="text-sm leading-relaxed text-slate-700 italic">"{selectedForPrint.result.explanation}"</p>
            </div>
            
            <div className="grid grid-cols-2 gap-10">
              <div className="space-y-4">
                 <h3 className="text-xs font-black text-rose-600 uppercase tracking-widest">Risk Factors Identified</h3>
                 <ul className="space-y-2">
                   {selectedForPrint.result.keyFactors.map((f, i) => (
                     <li key={i} className="text-xs text-slate-600 flex items-start gap-2">
                       <span className="font-bold text-slate-400">•</span> {f}
                     </li>
                   ))}
                 </ul>
              </div>
              <div className="space-y-4">
                 <h3 className="text-xs font-black text-[#14B8A6] uppercase tracking-widest">Clinical Recommendations</h3>
                 <ul className="space-y-2">
                   {selectedForPrint.result.recommendations.map((r, i) => (
                     <li key={i} className="text-xs text-slate-600 flex items-start gap-2">
                       <span className="font-bold text-[#14B8A6]">✓</span> {r}
                     </li>
                   ))}
                 </ul>
              </div>
            </div>
          </div>

          <div className="absolute bottom-12 left-12 right-12 text-center border-t border-slate-100 pt-6">
             <p className="text-[8px] text-slate-400 leading-relaxed max-w-2xl mx-auto italic">
               Medical Disclaimer: This report is generated by an artificial intelligence model and is intended for informational purposes only. It does not constitute a medical diagnosis. Consult a qualified healthcare professional before making health-related decisions.
             </p>
          </div>
        </div>
      )}

      {/* Analytics Visualization */}
      <section className="bg-white dark:bg-slate-800 p-10 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-700 relative overflow-hidden transition-colors duration-300">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-black text-[#1E3A8A] dark:text-white">Longitudinal Trends</h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm">Visualizing the last 10 clinical assessments</p>
          </div>
          <div className="flex gap-2">
             <div className="flex items-center gap-1.5 px-3 py-1 bg-teal-50 dark:bg-teal-900/20 rounded-full text-[10px] font-bold text-teal-600 dark:text-teal-400">
               <div className="w-2 h-2 rounded-full bg-teal-500" /> Probability %
             </div>
             <div className="flex items-center gap-1.5 px-3 py-1 bg-lime-50 dark:bg-lime-900/20 rounded-full text-[10px] font-bold text-lime-600 dark:text-lime-400">
               <div className="w-2 h-2 rounded-full bg-lime-400" /> Glucose mg/dL
             </div>
          </div>
        </div>
        
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorRisk" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#14B8A6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#14B8A6" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorGlucose" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#A3E635" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#A3E635" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="date" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} dy={10} />
              <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', padding: '12px' }}
              />
              <Area type="monotone" dataKey="risk" stroke="#14B8A6" strokeWidth={4} fillOpacity={1} fill="url(#colorRisk)" name="Risk Probability" />
              <Area type="monotone" dataKey="glucose" stroke="#A3E635" strokeWidth={3} fillOpacity={1} fill="url(#colorGlucose)" name="Glucose Level" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Control Bar */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 flex flex-col lg:flex-row gap-6 items-center transition-colors duration-300">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search patients or diagnosis keywords..." 
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full bg-slate-50 dark:bg-slate-900 border-none rounded-2xl pl-12 pr-4 py-4 focus:ring-2 focus:ring-[#14B8A6] transition-all text-sm outline-none dark:text-white"
          />
        </div>
        
        <div className="flex flex-wrap gap-4 items-center w-full lg:w-auto">
          <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-900 px-4 py-2 rounded-2xl">
            <Filter size={16} className="text-slate-400" />
            <select 
              value={riskFilter} 
              onChange={(e) => setRiskFilter(e.target.value as any)}
              className="bg-transparent text-sm font-bold text-slate-600 dark:text-slate-300 outline-none"
            >
              <option value="all">All Risks</option>
              <option value="High Risk">High Risk Only</option>
              <option value="Moderate Risk">Moderate Risk</option>
              <option value="Low Risk">Low Risk</option>
            </select>
          </div>

          <button 
            onClick={() => {
              setSortField('probability');
              setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
            }}
            className="flex items-center gap-2 bg-slate-50 dark:bg-slate-900 px-4 py-3 rounded-2xl text-sm font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all"
          >
            <ArrowUpDown size={16} /> Risk Rank
          </button>
        </div>
      </div>

      {/* Records Table/Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredRecords.map((record) => (
          <div key={record.id} className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-100 dark:border-slate-700 hover:border-[#14B8A6] transition-all group shadow-sm flex flex-col h-full">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-2xl ${
                  record.result.prediction === 'High Risk' ? 'bg-rose-50 text-rose-500' : 
                  record.result.prediction === 'Moderate Risk' ? 'bg-amber-50 text-amber-500' : 'bg-emerald-50 text-emerald-500'
                }`}>
                  <AlertCircle size={24} />
                </div>
                <div>
                  <h4 className="font-black text-slate-800 dark:text-white leading-none mb-1">{record.data.patientName || 'Anonymous Case'}</h4>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    {new Date(record.timestamp).toLocaleDateString()} at {new Date(record.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
              <div className={`text-xl font-black ${
                record.result.prediction === 'High Risk' ? 'text-rose-500' : 
                record.result.prediction === 'Moderate Risk' ? 'text-amber-500' : 'text-emerald-500'
              }`}>
                {record.result.probability}%
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-2 mb-6">
              {[
                { label: 'GLUC', val: record.data.glucose, unit: 'mg' },
                { label: 'BMI', val: record.data.bmi, unit: '' },
                { label: 'AGE', val: record.data.age, unit: 'yr' }
              ].map(stat => (
                <div key={stat.label} className="bg-slate-50 dark:bg-slate-900 p-3 rounded-2xl text-center transition-colors">
                  <p className="text-[8px] font-black text-slate-400 uppercase tracking-tighter mb-1">{stat.label}</p>
                  <p className="text-sm font-black text-[#1E3A8A] dark:text-blue-400">{stat.val}<span className="text-[8px] ml-0.5 text-slate-400">{stat.unit}</span></p>
                </div>
              ))}
            </div>

            <div className="flex-1">
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed italic line-clamp-3">
                "{record.result.explanation}"
              </p>
            </div>

            <div className="mt-6 pt-6 border-t border-slate-50 dark:border-slate-700 flex justify-between items-center">
               <span className="px-3 py-1 bg-slate-100 dark:bg-slate-700 rounded-full text-[9px] font-bold text-slate-400 uppercase">Assessment: {record.id.split('-')[0]}</span>
               <div className="flex gap-2">
                 <button 
                  onClick={() => exportRecordPDF(record)}
                  className="p-2 bg-slate-50 dark:bg-slate-700 text-slate-400 hover:text-[#1E3A8A] dark:hover:text-blue-400 rounded-xl transition-all"
                  title="Export PDF Report"
                 >
                   <Printer size={16} />
                 </button>
                 <button className="text-[#14B8A6] font-bold text-xs flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                   Full File <ChevronRight size={14} />
                 </button>
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecordsHistory;
