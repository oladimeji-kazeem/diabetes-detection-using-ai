
import React, { useState, useMemo } from 'react';
import { UserRole, AssessmentRecord } from '../types';
import { 
  Users, 
  Building, 
  UserPlus, 
  Activity, 
  TrendingUp, 
  FileText, 
  ChevronRight,
  Stethoscope,
  ShieldCheck,
  Search,
  FlaskConical,
  Beaker,
  Thermometer,
  Zap,
  Filter,
  Calendar,
  AlertCircle
} from 'lucide-react';

interface ManagementPanelProps {
  role: UserRole;
  records: AssessmentRecord[];
}

const ManagementPanel: React.FC<ManagementPanelProps> = ({ role, records }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [riskFilter, setRiskFilter] = useState<string>('all');

  const filteredRecords = useMemo(() => {
    return records.filter(record => {
      const nameMatch = (record.data.patientName || '').toLowerCase().includes(searchTerm.toLowerCase());
      const idMatch = record.id.toLowerCase().includes(searchTerm.toLowerCase());
      const riskMatch = riskFilter === 'all' || record.result.prediction === riskFilter;
      return (nameMatch || idMatch) && riskMatch;
    });
  }, [records, searchTerm, riskFilter]);

  const getPanelContent = () => {
    switch (role) {
      case 'hmo': return {
        title: 'HMO Central Intelligence',
        subtitle: 'Managing affiliated hospitals and privileged regional health data.',
        primaryColor: 'bg-[#1E3A8A]',
        stats: [
          { label: 'Affiliated Clinics', value: '12', icon: <Building className="text-blue-500" />, trend: '+2 this month' },
          { label: 'Global Coverage', value: '14.5k', icon: <Users className="text-emerald-500" />, trend: '+12% growth' },
          { label: 'High Risk Alerts', value: '234', icon: <Activity className="text-rose-500" />, trend: 'System check required' },
        ]
      };
      case 'clinic': return {
        title: 'Institutional Dashboard',
        subtitle: 'Administrative control of staff, patient flow, and clinical assessment.',
        primaryColor: 'bg-[#1E3A8A]',
        stats: [
          { label: 'Staff Physicians', value: '28', icon: <Users className="text-blue-500" />, trend: '4 on leave' },
          { label: 'Active Patients', value: records.length.toString(), icon: <Stethoscope className="text-emerald-500" />, trend: 'Total managed' },
          { label: 'Lab Reports', value: records.filter(r => r.data.status === 'results_updated').length.toString(), icon: <FileText className="text-amber-500" />, trend: 'Pending review' },
        ]
      };
      case 'professional': return {
        title: 'Clinical Practice Manager',
        subtitle: 'Personal caseload oversight and longitudinal risk evaluation tools.',
        primaryColor: 'bg-[#1E3A8A]',
        stats: [
          { label: 'My Patients', value: '42', icon: <ShieldCheck className="text-blue-500" />, trend: 'Active cases' },
          { label: 'Assessments', value: '128', icon: <Activity className="text-emerald-500" />, trend: '+8 this week' },
          { label: 'Flagged Cases', value: '7', icon: <TrendingUp className="text-rose-500" />, trend: 'Immediate follow-up' },
        ]
      };
      case 'lab': return {
        title: 'Diagnostic Test Center Portal',
        subtitle: 'Lab technician management, automated panel processing, and biological data vault.',
        primaryColor: 'bg-[#14B8A6]',
        stats: [
          { label: 'Pending Panel Vials', value: '18', icon: <FlaskConical className="text-white" />, trend: 'Current batch' },
          { label: 'Machine Uptime', value: '99.8%', icon: <Zap className="text-white" />, trend: 'Optimal calibration' },
          { label: 'Daily Throughput', value: '242', icon: <Beaker className="text-white" />, trend: 'Processed today' },
        ]
      };
      default: return null;
    }
  };

  const content = getPanelContent();
  if (!content) return null;

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className={`${content.primaryColor} p-12 rounded-[3rem] text-white shadow-2xl relative overflow-hidden transition-colors`}>
        <div className="relative z-10 max-w-2xl">
          <h2 className="text-4xl font-black mb-4 tracking-tight">{content.title}</h2>
          <p className="text-blue-100 text-lg font-medium opacity-90">{content.subtitle}</p>
          <div className="flex gap-4 mt-8">
            <button className="bg-[#A3E635] text-[#1E3A8A] px-6 py-3 rounded-2xl font-black text-sm flex items-center gap-2 hover:bg-lime-300 transition-all shadow-lg active:scale-95">
              <UserPlus size={18} /> 
              {role === 'hmo' ? 'Add Hospital' : 
               role === 'clinic' ? 'Onboard Doctor' : 
               role === 'lab' ? 'Process New Batch' : 'New Patient'}
            </button>
            <button className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-6 py-3 rounded-2xl font-black text-sm flex items-center gap-2 hover:bg-white/20 transition-all">
              Clinical Report Engine
            </button>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {content.stats.map((stat, i) => (
          <div key={i} className="bg-white dark:bg-slate-800 p-8 rounded-[2rem] border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-xl transition-all group">
            <div className="flex items-center justify-between mb-6">
              <div className={`p-4 ${role === 'lab' ? 'bg-[#14B8A6]' : 'bg-slate-50 dark:bg-slate-900'} rounded-2xl group-hover:scale-110 transition-transform`}>
                {stat.icon}
              </div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
            </div>
            <h4 className="text-4xl font-black text-slate-800 dark:text-white mb-2">{stat.value}</h4>
            <p className="text-xs font-bold text-slate-400">{stat.trend}</p>
          </div>
        ))}
      </div>

      {/* Dynamic Records Management Section */}
      <div className="bg-white dark:bg-slate-800 p-10 rounded-[2.5rem] border border-slate-100 dark:border-slate-700 shadow-sm transition-colors">
        <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between gap-6 mb-8">
          <div>
            <h3 className="text-xl font-black text-slate-800 dark:text-white">
              {role === 'clinic' ? 'Institutional Patient Records' : 
               role === 'hmo' ? 'Affiliated Entity Ledger' : 
               role === 'lab' ? 'Diagnostic Test Queue' : 'Managed Clinical Files'}
            </h3>
            <p className="text-xs font-medium text-slate-500 mt-1">
              Found {filteredRecords.length} records matching your current criteria.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full xl:w-auto">
            <div className="relative flex-1 sm:w-64">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
               <input 
                type="text" 
                placeholder="Search patient name or ID..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-700 rounded-xl pl-10 pr-4 py-3 text-xs font-bold outline-none focus:ring-2 focus:ring-[#1E3A8A] transition-all dark:text-white" 
               />
            </div>
            
            <div className="relative sm:w-48">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <select 
                value={riskFilter}
                onChange={(e) => setRiskFilter(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-700 rounded-xl pl-10 pr-4 py-3 text-xs font-bold outline-none focus:ring-2 focus:ring-[#1E3A8A] appearance-none cursor-pointer dark:text-white"
              >
                <option value="all">All Risk Levels</option>
                <option value="High Risk">High Risk</option>
                <option value="Moderate Risk">Moderate Risk</option>
                <option value="Low Risk">Low Risk</option>
              </select>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {filteredRecords.length > 0 ? (
            filteredRecords.map((record) => (
              <div key={record.id} className="flex items-center justify-between p-5 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-900/50 border border-transparent hover:border-slate-100 dark:hover:border-slate-700 transition-all cursor-pointer group">
                <div className="flex items-center gap-5">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-black text-white shadow-sm transition-transform group-hover:scale-105 ${
                    record.result.prediction === 'High Risk' ? 'bg-rose-500' : 
                    record.result.prediction === 'Moderate Risk' ? 'bg-amber-500' : 'bg-emerald-500'
                  }`}>
                    {record.data.patientName?.[0] || 'P'}
                  </div>
                  <div>
                    <h5 className="font-black text-slate-800 dark:text-white flex items-center gap-2">
                      {record.data.patientName || 'Anonymous Identifier'}
                      <span className={`text-[8px] px-1.5 py-0.5 rounded-full uppercase tracking-tighter ${
                        record.result.prediction === 'High Risk' ? 'bg-rose-100 text-rose-600' : 
                        record.result.prediction === 'Moderate Risk' ? 'bg-amber-100 text-amber-600' : 'bg-emerald-100 text-emerald-600'
                      }`}>
                        {record.result.prediction}
                      </span>
                    </h5>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                        <Calendar size={10} /> {new Date(record.timestamp).toLocaleDateString()}
                      </span>
                      <span className="w-1 h-1 rounded-full bg-slate-200" />
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                        <Activity size={10} /> Prob: {record.result.probability}%
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-8">
                   <div className="text-right hidden sm:block">
                     <p className="text-[10px] font-black text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                       Current Status: <span className="text-[#14B8A6]">{record.data.status?.replace('_', ' ') || 'Screening'}</span>
                     </p>
                     <p className="text-[8px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-0.5">Reference ID: {record.id.split('-')[0]}</p>
                   </div>
                   <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-700 text-slate-300 group-hover:text-[#1E3A8A] group-hover:bg-blue-50 transition-all">
                    <ChevronRight size={20} />
                   </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-20 text-center bg-slate-50 dark:bg-slate-900/50 rounded-[2rem] border border-dashed border-slate-200 dark:border-slate-700">
               <AlertCircle className="mx-auto text-slate-300 mb-4" size={40} />
               <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">No matching records found</p>
               <button 
                onClick={() => { setSearchTerm(''); setRiskFilter('all'); }}
                className="mt-4 text-xs font-black text-[#1E3A8A] hover:underline"
               >
                 Clear all filters
               </button>
            </div>
          )}
        </div>
        
        {filteredRecords.length > 5 && (
          <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-700 flex justify-center">
             <button className="text-xs font-black text-slate-400 uppercase tracking-widest hover:text-[#1E3A8A] transition-colors flex items-center gap-2">
               Load Additional Clinical Data <ChevronRight size={14} />
             </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManagementPanel;
