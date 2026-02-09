
import React, { useState } from 'react';
import { UserProfile } from '../types';
import { Save, User, Mail, Building, Bell, Moon, Globe, Shield, Sun } from 'lucide-react';

interface UserProfileSectionProps {
  profile: UserProfile;
  onSave: (profile: UserProfile) => void;
}

const UserProfileSection: React.FC<UserProfileSectionProps> = ({ profile, onSave }) => {
  const [formData, setFormData] = useState<UserProfile>(profile);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center gap-6 mb-12">
        <div className="w-24 h-24 rounded-[2rem] bg-[#1E3A8A] flex items-center justify-center text-white shadow-2xl">
          <User size={48} />
        </div>
        <div>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Personal & Account Settings</h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium">Manage your clinical preferences and secure identifiers.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="bg-white dark:bg-slate-800 p-10 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-700 space-y-8 transition-colors duration-300">
          <h3 className="text-lg font-black text-slate-800 dark:text-white border-b border-slate-50 dark:border-slate-700 pb-4">Identity Information</h3>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
              <User size={12} /> Full Clinical Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-slate-50 dark:bg-slate-900 border-none rounded-2xl px-5 py-4 text-sm font-bold text-slate-700 dark:text-white outline-none focus:ring-2 focus:ring-[#1E3A8A] transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
              <Mail size={12} /> Contact Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-slate-50 dark:bg-slate-900 border-none rounded-2xl px-5 py-4 text-sm font-bold text-slate-700 dark:text-white outline-none focus:ring-2 focus:ring-[#1E3A8A] transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
              <Building size={12} /> Primary Institution
            </label>
            <input
              type="text"
              value={formData.institution || ''}
              onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
              className="w-full bg-slate-50 dark:bg-slate-900 border-none rounded-2xl px-5 py-4 text-sm font-bold text-slate-700 dark:text-white outline-none focus:ring-2 focus:ring-[#1E3A8A] transition-all"
            />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-10 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-700 space-y-8 transition-colors duration-300">
          <h3 className="text-lg font-black text-slate-800 dark:text-white border-b border-slate-50 dark:border-slate-700 pb-4">System Preferences</h3>

          <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl transition-colors">
            <div className="flex items-center gap-3">
              {formData.preferences.darkMode ? <Moon className="text-blue-400" size={20} /> : <Sun className="text-amber-500" size={20} />}
              <div>
                <p className="text-xs font-black text-slate-700 dark:text-slate-200">Dark Mode Architecture</p>
                <p className="text-[10px] text-slate-400 font-bold uppercase">Eye fatigue protection</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setFormData({ ...formData, preferences: { ...formData.preferences, darkMode: !formData.preferences.darkMode } })}
              className={`w-12 h-6 rounded-full p-1 transition-colors ${formData.preferences.darkMode ? 'bg-blue-600' : 'bg-slate-300'}`}
            >
              <div className={`w-4 h-4 bg-white rounded-full transition-transform ${formData.preferences.darkMode ? 'translate-x-6' : 'translate-x-0'}`} />
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl transition-colors">
            <div className="flex items-center gap-3">
              <Bell className="text-[#14B8A6]" size={20} />
              <div>
                <p className="text-xs font-black text-slate-700 dark:text-slate-200">Real-time Risk Alerts</p>
                <p className="text-[10px] text-slate-400 font-bold uppercase">Critical case monitoring</p>
              </div>
            </div>
            <input
              type="checkbox"
              checked={formData.preferences.notifications}
              onChange={(e) => setFormData({ ...formData, preferences: { ...formData.preferences, notifications: e.target.checked } })}
              className="w-6 h-6 rounded-lg text-[#1E3A8A] focus:ring-[#1E3A8A]"
            />
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
              <Globe size={12} /> Unit Measurement System
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, preferences: { ...formData.preferences, unitSystem: 'metric' } })}
                className={`py-3 rounded-xl text-xs font-black transition-all ${formData.preferences.unitSystem === 'metric' ? 'bg-[#1E3A8A] text-white shadow-lg' : 'bg-slate-50 dark:bg-slate-900 text-slate-400'}`}
              >
                Metric (mg/dL)
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, preferences: { ...formData.preferences, unitSystem: 'imperial' } })}
                className={`py-3 rounded-xl text-xs font-black transition-all ${formData.preferences.unitSystem === 'imperial' ? 'bg-[#1E3A8A] text-white shadow-lg' : 'bg-slate-50 dark:bg-slate-900 text-slate-400'}`}
              >
                Imperial (mmol/L)
              </button>
            </div>
          </div>
        </div>

        <div className="md:col-span-2 flex justify-end gap-4 mt-6">
          <button type="button" onClick={() => setFormData(profile)} className="px-10 py-5 rounded-2xl font-black text-slate-400 hover:text-slate-600 transition-all uppercase tracking-widest text-xs">Reset Changes</button>
          <button type="submit" className="px-12 py-5 bg-[#1E3A8A] text-white rounded-[1.5rem] font-black hover:bg-[#14B8A6] transition-all shadow-xl shadow-blue-100 dark:shadow-none flex items-center gap-3 active:scale-95">
            <Save size={20} /> Update Platform Profile
          </button>
        </div>
      </form>

      <div className="p-10 bg-emerald-50 dark:bg-emerald-900/20 rounded-[2.5rem] border border-emerald-100 dark:border-emerald-800 flex items-start gap-6 transition-colors">
        <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl text-emerald-500 shadow-sm">
          <Shield size={32} />
        </div>
        <div>
          <h4 className="text-lg font-black text-emerald-900 dark:text-emerald-400 mb-2">Secure Data Protection</h4>
          <p className="text-sm text-emerald-700 dark:text-slate-300 leading-relaxed font-medium">
            Your preferences and identification data are stored exclusively in your local secure browser storage. GlucoScan does not synchronize these details to external servers, ensuring complete privacy control.
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserProfileSection;
