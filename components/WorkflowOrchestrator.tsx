
import React, { useState } from 'react';
import { UserRole, AssessmentRecord, HealthData, Prescription } from '../types';
import { 
  FlaskConical, 
  Calendar, 
  CheckCircle2, 
  AlertCircle, 
  Mail, 
  Stethoscope, 
  Pill,
  MapPin,
  Clock,
  Activity,
  HeartPulse,
  Send,
  Plus,
  ArrowRight,
  // Fix: Added missing Zap icon import
  Zap
} from 'lucide-react';

interface WorkflowOrchestratorProps {
  role: UserRole;
  records: AssessmentRecord[];
  setRecords: (records: AssessmentRecord[]) => void;
}

const PREDEFINED_PHARMACIES = [
  { name: 'Green Cross specialized Pharmacy', location: 'Suite 201, Medical Park' },
  { name: 'City Wellness Center', location: '455 Health Ave, Downtown' },
  { name: 'Medi-Quick Pharma', location: '12-B North Boulevard' },
];

const WorkflowOrchestrator: React.FC<WorkflowOrchestratorProps> = ({ role, records, setRecords }) => {
  const [notification, setNotification] = useState<{message: string, type: 'success' | 'info' | 'error'} | null>(null);
  
  // Local state for forms
  const [selectedPharmacy, setSelectedPharmacy] = useState(PREDEFINED_PHARMACIES[0]);
  const [customPharmacy, setCustomPharmacy] = useState({ name: '', location: '' });
  const [useCustomPharmacy, setUseCustomPharmacy] = useState(false);
  const [prefDate, setPrefDate] = useState('');
  const [prefTime, setPrefTime] = useState('');

  const triggerNotification = (message: string, type: 'success' | 'info' | 'error' = 'info') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000);
  };

  const updateDataStatus = (id: string, dataUpdates: Partial<HealthData>) => {
    const updated = records.map(r => r.id === id ? { ...r, data: { ...r.data, ...dataUpdates } } : r);
    setRecords(updated);
  };

  const WORKFLOW_STEPS = [
    { key: 'healthy', label: 'Screening', icon: <HeartPulse size={12} />, color: 'bg-blue-500' },
    { key: 'referral_sent', label: 'Referral', icon: <Mail size={12} />, color: 'bg-indigo-500' },
    { key: 'test_scheduled', label: 'Scheduled', icon: <Calendar size={12} />, color: 'bg-rose-500' },
    { key: 'results_updated', label: 'Results', icon: <FlaskConical size={12} />, color: 'bg-teal-500' },
    { key: 'consultation_booked', label: 'Consult', icon: <Stethoscope size={12} />, color: 'bg-amber-500' },
    { key: 'prescribed', label: 'Complete', icon: <CheckCircle2 size={12} />, color: 'bg-emerald-500' }
  ];

  return (
    <div className="space-y-10">
      {notification && (
        <div className={`fixed top-6 right-6 z-[100] ${notification.type === 'success' ? 'bg-emerald-600' : 'bg-[#1E3A8A]'} text-white p-6 rounded-2xl shadow-2xl flex items-center gap-4 animate-in slide-in-from-right-8 border border-white/20 max-w-md`}>
          {notification.type === 'success' ? <CheckCircle2 className="text-white animate-pulse" /> : <Mail className="text-[#A3E635] animate-bounce" />}
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-blue-100">Workflow update</p>
            <p className="font-bold text-sm leading-tight">{notification.message}</p>
          </div>
        </div>
      )}

      <div className="bg-white dark:bg-slate-800 p-10 rounded-[3rem] border border-slate-100 dark:border-slate-700 shadow-sm transition-colors">
        <h2 className="text-3xl font-black text-slate-800 dark:text-white mb-2">Clinical Journey Tracker</h2>
        <p className="text-slate-500 dark:text-slate-400 font-medium">Monitoring multi-stakeholder health transitions with integrated coordination.</p>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {records.length === 0 ? (
          <div className="p-20 text-center bg-slate-50 dark:bg-slate-900/50 rounded-[3rem] border border-dashed border-slate-200 dark:border-slate-700">
            <Activity className="mx-auto text-slate-200 mb-4" size={48} />
            <p className="text-slate-400 font-bold uppercase text-xs tracking-widest">No Active Workflows found</p>
          </div>
        ) : (
          records.map(record => {
            const currentStatus = record.data.status || 'healthy';
            const currentStepIdx = WORKFLOW_STEPS.findIndex(s => s.key === currentStatus);
            
            return (
              <div key={record.id} className="bg-white dark:bg-slate-800 rounded-[2.5rem] border border-slate-100 dark:border-slate-700 overflow-hidden shadow-sm hover:shadow-xl transition-all">
                {/* Visual Progress Header */}
                <div className="p-8 border-b border-slate-50 dark:border-slate-700 space-y-8 bg-slate-50/50 dark:bg-slate-900/10">
                  <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-[#1E3A8A] flex items-center justify-center font-black text-white text-xl shadow-lg relative">
                        {record.data.patientName?.[0] || 'P'}
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-white dark:bg-slate-800 border-2 border-[#1E3A8A] flex items-center justify-center">
                          <Activity size={10} className="text-[#1E3A8A]" />
                        </div>
                      </div>
                      <div>
                        <h4 className="text-xl font-black text-slate-800 dark:text-white">{record.data.patientName || 'Anonymous Identifier'}</h4>
                        <div className="flex items-center gap-2">
                           <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">UID: {record.id.split('-')[0]}</span>
                           <span className="w-1 h-1 rounded-full bg-slate-300" />
                           <span className="text-[10px] font-bold text-[#14B8A6] uppercase tracking-widest">{currentStatus.replace('_', ' ')}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Segmented Progress Bar */}
                    <div className="flex gap-1.5 h-3 w-full md:w-64 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden p-0.5 border border-slate-100 dark:border-slate-600">
                      {WORKFLOW_STEPS.map((step, idx) => (
                        <div 
                          key={step.key} 
                          className={`flex-1 rounded-full transition-all duration-700 ${idx <= currentStepIdx ? step.color : 'bg-transparent'}`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Icon Stepper */}
                  <div className="relative flex justify-between px-2">
                    <div className="absolute top-1/2 left-0 right-0 h-px bg-slate-200 dark:bg-slate-700 -translate-y-1/2 mx-8" />
                    {WORKFLOW_STEPS.map((step, idx) => {
                      const isPast = idx < currentStepIdx;
                      const isCurrent = idx === currentStepIdx;
                      return (
                        <div key={step.key} className="flex flex-col items-center gap-3 relative z-10">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center border-2 transition-all duration-500 ${
                            isPast ? 'bg-[#14B8A6] border-[#14B8A6] text-white' : 
                            isCurrent ? 'bg-white dark:bg-slate-800 border-[#14B8A6] text-[#14B8A6] shadow-lg shadow-teal-100 ring-4 ring-teal-50 dark:ring-teal-900/20' : 
                            'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-300'
                          }`}>
                            {isPast ? <CheckCircle2 size={18} /> : step.icon}
                          </div>
                          <span className={`text-[9px] font-black uppercase tracking-widest ${isCurrent ? 'text-[#14B8A6]' : 'text-slate-400'}`}>
                            {step.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-10">
                  <div className="space-y-6">
                    <h5 className="font-black text-slate-800 dark:text-white flex items-center gap-2 uppercase text-xs tracking-widest">
                      <Zap size={16} className="text-[#14B8A6]" /> Decision Node: {role.toUpperCase()}
                    </h5>
                    
                    {/* PROFESSIONAL ACTIONS */}
                    {role === 'professional' && (
                      <div className="space-y-6 animate-in fade-in slide-in-from-top-2">
                        {currentStatus === 'results_updated' && (
                          <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-700 space-y-6">
                            <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
                              <Pill className="text-[#1E3A8A]" />
                              <h6 className="font-bold text-slate-800 dark:text-white uppercase text-xs tracking-widest">Prescription Dispatch</h6>
                            </div>
                            
                            <div className="space-y-4">
                              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Select Receiving Pharmacy</p>
                              <div className="grid grid-cols-1 gap-2">
                                {PREDEFINED_PHARMACIES.map(p => (
                                  <button 
                                    key={p.name}
                                    onClick={() => { setUseCustomPharmacy(false); setSelectedPharmacy(p); }}
                                    className={`text-left p-4 rounded-2xl border text-xs transition-all ${!useCustomPharmacy && selectedPharmacy.name === p.name ? 'border-[#1E3A8A] bg-blue-50 dark:bg-blue-900/20 font-bold' : 'border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
                                  >
                                    <p>{p.name}</p>
                                    <p className="text-[9px] font-normal opacity-60 flex items-center gap-1 mt-1"><MapPin size={10}/> {p.location}</p>
                                  </button>
                                ))}
                                <button 
                                  onClick={() => setUseCustomPharmacy(true)}
                                  className={`text-left p-4 rounded-2xl border text-xs transition-all ${useCustomPharmacy ? 'border-[#1E3A8A] bg-blue-50 dark:bg-blue-900/20 font-bold' : 'border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
                                >
                                  <p className="flex items-center gap-2"><Plus size={14} /> Custom Pharmacy Location</p>
                                </button>
                              </div>

                              {useCustomPharmacy && (
                                <div className="space-y-2 animate-in fade-in duration-300">
                                  <input 
                                    type="text" placeholder="Pharmacy Name"
                                    value={customPharmacy.name}
                                    onChange={e => setCustomPharmacy({...customPharmacy, name: e.target.value})}
                                    className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-3 rounded-xl text-xs outline-none focus:ring-2 focus:ring-[#1E3A8A]"
                                  />
                                  <input 
                                    type="text" placeholder="Full Address"
                                    value={customPharmacy.location}
                                    onChange={e => setCustomPharmacy({...customPharmacy, location: e.target.value})}
                                    className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-3 rounded-xl text-xs outline-none focus:ring-2 focus:ring-[#1E3A8A]"
                                  />
                                </div>
                              )}
                            </div>

                            <button 
                              onClick={() => {
                                const target = useCustomPharmacy ? customPharmacy : selectedPharmacy;
                                if (useCustomPharmacy && !customPharmacy.name) {
                                  triggerNotification("Please enter a custom pharmacy name", "error");
                                  return;
                                }
                                
                                updateDataStatus(record.id, { 
                                  status: 'prescribed',
                                  prescriptions: [{ 
                                    id: crypto.randomUUID(), 
                                    medication: "Metformin ER 500mg", 
                                    dosage: "Once Daily with Evening Meal", 
                                    pharmacyName: target.name, 
                                    pharmacyLocation: target.location, 
                                    timestamp: Date.now() 
                                  }]
                                });
                                triggerNotification(`SUCCESS: Prescription for ${record.data.patientName} electronically routed to ${target.name}. Recipient has confirmed receipt.`, "success");
                              }}
                              className="w-full py-4 bg-[#1E3A8A] text-white rounded-2xl font-black text-xs hover:bg-[#14B8A6] transition-all flex items-center justify-center gap-2 shadow-xl"
                            >
                              <Send size={14} /> Dispatch & Finalize Case
                            </button>
                          </div>
                        )}
                        
                        {(currentStatus === 'healthy' || !record.data.status) && (
                           <button 
                            onClick={() => {
                              updateDataStatus(record.id, { status: 'referral_sent' });
                              triggerNotification(`Referral issued to Diagnostic Center. Case ID: ${record.id.split('-')[0]} transmitted.`, "success");
                            }}
                            className="w-full p-8 bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900 rounded-[2rem] group hover:bg-[#1E3A8A] transition-all flex items-center justify-between"
                          >
                            <div className="text-left">
                              <h6 className="font-black text-[#1E3A8A] group-hover:text-white">Issue Diagnostic Referral</h6>
                              <p className="text-[10px] text-blue-500 group-hover:text-blue-200 mt-1 uppercase tracking-widest font-bold">Standard Metabolic Panel Request</p>
                            </div>
                            <ArrowRight className="text-[#1E3A8A] group-hover:text-white group-hover:translate-x-2 transition-all" />
                          </button>
                        )}
                      </div>
                    )}

                    {/* LAB ACTIONS */}
                    {role === 'lab' && (
                      <div className="space-y-6">
                        {currentStatus === 'test_scheduled' && (
                          <div className="p-8 bg-teal-600 text-white rounded-[2.5rem] shadow-xl space-y-6 relative overflow-hidden">
                             <div className="relative z-10">
                               <h6 className="text-xl font-black">Process Biological Sample</h6>
                               <p className="text-xs opacity-80 mt-2">Vial collection verified. Execute biochemical analysis.</p>
                               <button 
                                onClick={() => {
                                  updateDataStatus(record.id, { status: 'results_updated', glucose: 162, insulin: 115 });
                                  triggerNotification(`Lab Data Uploaded for ${record.data.patientName}. System record updated.`, "success");
                                }}
                                className="mt-6 bg-white text-teal-600 px-8 py-4 rounded-2xl font-black text-xs hover:bg-slate-50 transition-all flex items-center gap-2"
                               >
                                 <FlaskConical size={14} /> Submit Lab Panel
                               </button>
                             </div>
                             <FlaskConical size={120} className="absolute -right-8 -bottom-8 opacity-10 rotate-12" />
                          </div>
                        )}
                        {currentStatus === 'results_updated' && (
                          <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-3xl border border-dashed border-teal-200 dark:border-teal-900 text-center animate-pulse">
                             <Stethoscope className="mx-auto text-teal-400 mb-4" size={32} />
                             <p className="text-xs font-bold text-teal-600 dark:text-teal-400 mb-6 uppercase tracking-widest">Diagnostics Pending Professional Review</p>
                             <button 
                              onClick={() => {
                                triggerNotification(`SUCCESS: Results for ${record.data.patientName} have been marked as priority and emailed to the referring physician.`, "success");
                              }}
                              className="w-full py-4 bg-teal-600 text-white rounded-2xl font-black text-xs hover:bg-teal-700 transition-all flex items-center justify-center gap-2"
                             >
                               <Send size={14} /> Send Test Results to Professional
                             </button>
                          </div>
                        )}
                      </div>
                    )}

                    {/* INDIVIDUAL ACTIONS */}
                    {role === 'individual' && (
                      <div className="space-y-6">
                        {currentStatus === 'results_updated' && (
                          <div className="p-8 bg-amber-50 dark:bg-amber-900/10 rounded-[2.5rem] border border-amber-100 dark:border-amber-900 space-y-6">
                             <div className="flex items-center gap-3 border-b border-amber-100 dark:border-amber-900/50 pb-4">
                               <Stethoscope className="text-amber-600" />
                               <h6 className="font-bold text-amber-900 dark:text-amber-400 uppercase text-xs tracking-widest">Consultation Request</h6>
                             </div>
                             
                             <div className="space-y-4">
                               <p className="text-[10px] font-black text-amber-700 dark:text-amber-500 uppercase tracking-widest">Select Preferred Schedule</p>
                               <div className="grid grid-cols-2 gap-4">
                                  <div className="space-y-1">
                                    <label className="text-[9px] font-bold text-slate-400 uppercase ml-2">Date</label>
                                    <input 
                                      type="date" 
                                      value={prefDate}
                                      onChange={e => setPrefDate(e.target.value)}
                                      className="w-full bg-white dark:bg-slate-800 border-none rounded-xl p-3 text-xs outline-none focus:ring-2 focus:ring-amber-500"
                                    />
                                  </div>
                                  <div className="space-y-1">
                                    <label className="text-[9px] font-bold text-slate-400 uppercase ml-2">Preferred Window</label>
                                    <select 
                                      value={prefTime}
                                      onChange={e => setPrefTime(e.target.value)}
                                      className="w-full bg-white dark:bg-slate-800 border-none rounded-xl p-3 text-xs outline-none focus:ring-2 focus:ring-amber-500"
                                    >
                                      <option value="">Select Time</option>
                                      <option value="morning">Morning (08:00 - 11:00)</option>
                                      <option value="noon">Lunch (12:00 - 14:00)</option>
                                      <option value="afternoon">Afternoon (15:00 - 17:00)</option>
                                    </select>
                                  </div>
                               </div>
                             </div>

                             <button 
                              onClick={() => {
                                if (!prefDate || !prefTime) {
                                  triggerNotification("Please select a date and time slot", "error");
                                  return;
                                }
                                updateDataStatus(record.id, { status: 'consultation_booked' });
                                triggerNotification(`SUCCESS: Consultation request for ${prefDate} (${prefTime}) dispatched to Hospital Admin. They will confirm via secure portal within 2 hours.`, "success");
                              }}
                              className="w-full py-4 bg-[#1E3A8A] text-white rounded-2xl font-black text-xs hover:bg-amber-600 transition-all flex items-center justify-center gap-2 shadow-xl"
                             >
                               <Send size={14} /> Call Hospital for Consultation
                             </button>
                             <p className="text-[9px] text-amber-600 dark:text-amber-500 font-bold text-center uppercase tracking-tighter">Your preferred slots will be sent to the front desk</p>
                          </div>
                        )}
                        
                        {currentStatus === 'referral_sent' && (
                          <div className="p-8 bg-indigo-600 text-white rounded-[2.5rem] shadow-xl text-center space-y-6">
                            <Calendar size={32} className="mx-auto" />
                            <h6 className="text-lg font-black leading-tight">Coordinate Laboratory Visit</h6>
                            <p className="text-xs opacity-80 max-w-xs mx-auto">Referral ID active. Lock in your diagnostic window at the nearest center.</p>
                            <button 
                              onClick={() => {
                                updateDataStatus(record.id, { status: 'test_scheduled' });
                                triggerNotification(`Appointment locked for tomorrow at BioCheck Lab. Check-in instructions sent to your email.`, "success");
                              }}
                              className="w-full py-4 bg-white text-indigo-600 rounded-2xl font-black text-xs hover:bg-indigo-50 transition-all"
                            >
                              Confirm Lab Appointment
                            </button>
                          </div>
                        )}

                        {currentStatus === 'prescribed' && (
                          <div className="bg-[#1E3A8A] p-8 rounded-[2.5rem] text-white space-y-4">
                            <div className="flex items-center gap-3">
                              <div className="p-2 bg-emerald-500 rounded-lg">
                                <CheckCircle2 size={16} />
                              </div>
                              <h6 className="font-black uppercase text-xs tracking-widest">Care Cycle Complete</h6>
                            </div>
                            <p className="text-xs text-blue-200">Prescription active at {record.data.prescriptions?.[0]?.pharmacyName}. Access your full history in the Records tab.</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Audit Ledger for Journey Context */}
                  <div className="bg-slate-50 dark:bg-slate-900/50 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 flex flex-col">
                    <h6 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6 border-b border-slate-200 dark:border-slate-800 pb-3 flex items-center gap-2">
                       <Clock size={12} /> Live Audit Trail
                    </h6>
                    <div className="space-y-4 flex-1">
                      {[
                        { icon: <HeartPulse size={12} />, text: 'Baseline screening established', date: 'T+0' },
                        currentStepIdx >= 1 && { icon: <Mail size={12} />, text: 'Laboratory referral dispatched', date: 'T+2m' },
                        currentStepIdx >= 2 && { icon: <Calendar size={12} />, text: 'Diagnostic slot confirmed', date: 'T+5m' },
                        currentStepIdx >= 3 && { icon: <FlaskConical size={12} />, text: 'Blood panel results verified', date: 'T+12m' },
                        currentStepIdx >= 4 && { icon: <Stethoscope size={12} />, text: 'Consultation request routed', date: 'T+15m' },
                        currentStepIdx >= 5 && { icon: <CheckCircle2 size={12} />, text: 'Care cycle archived', date: 'T+18m' }
                      ].filter(Boolean).map((log: any, i) => (
                        <div key={i} className="flex gap-4 group">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow-sm border ${i <= currentStepIdx ? 'bg-white dark:bg-slate-800 text-[#14B8A6] border-teal-100' : 'bg-slate-100 dark:bg-slate-900 text-slate-300 border-transparent'} flex-shrink-0`}>
                            {log.icon}
                          </div>
                          <div>
                            <p className={`text-[10px] font-black leading-tight ${i <= currentStepIdx ? 'text-slate-800 dark:text-slate-200' : 'text-slate-400'}`}>{log.text}</p>
                            <p className="text-[8px] font-bold text-slate-400 uppercase">{log.date}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default WorkflowOrchestrator;
