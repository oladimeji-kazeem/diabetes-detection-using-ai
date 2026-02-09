
import React from 'react';

interface HeaderProps {
  activeTab: string;
}

const Header: React.FC<HeaderProps> = ({ activeTab }) => {
  const getTitle = () => {
    switch (activeTab) {
      case 'assess': return 'Risk Evaluation';
      case 'history': return 'Clinical Records';
      case 'assistant': return 'AI Intelligence';
      case 'learn': return 'Health Maintenance';
      case 'manage': return 'Ecosystem Management';
      case 'profile': return 'User Settings';
      case 'workflow': return 'Clinical Journey';
      default: return 'Dashboard';
    }
  };

  const getSubtitle = () => {
    switch (activeTab) {
      case 'assess': return 'Process physiological vitals through the Gemini medical risk engine.';
      case 'history': return 'Longitudinal data tracking and analytical summaries.';
      case 'assistant': return 'Advanced clinical Q&A and nutritional coaching interface.';
      case 'learn': return 'Education and lifestyle tips for better health outcomes.';
      case 'manage': return 'Hierarchical administration for institutions and professionals.';
      case 'profile': return 'Configure your identity and clinical interface preferences.';
      case 'workflow': return 'Track and orchestrate tests, referrals, and prescriptions.';
      default: return '';
    }
  };

  return (
    <div className="border-b border-slate-200 dark:border-slate-700 pb-8 no-print transition-colors">
      <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">
        <span>Portal</span>
        <span className="text-slate-200 dark:text-slate-700">/</span>
        <span className="text-[#14B8A6]">{getTitle()}</span>
      </div>
      <h1 className="text-4xl font-black text-[#1E3A8A] dark:text-white tracking-tight">{getTitle()}</h1>
      <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium max-w-2xl text-lg">{getSubtitle()}</p>
    </div>
  );
};

export default Header;
