
import React from 'react';

interface HeaderProps {
  activeTab: string;
}

const Header: React.FC<HeaderProps> = ({ activeTab }) => {
  const getTitle = () => {
    switch (activeTab) {
      case 'assess': return 'Risk Assessment';
      case 'history': return 'Records Vault';
      case 'assistant': return 'AI Intelligence';
      case 'learn': return 'Health Marker Guide';
      default: return 'Overview';
    }
  };

  const getSubtitle = () => {
    switch (activeTab) {
      case 'assess': return 'Initiate a new diagnostic cycle powered by advanced neural models.';
      case 'history': return 'Historical longitudinal data and patient assessment logs.';
      case 'assistant': return 'Interactive medical and lifestyle support system.';
      case 'learn': return 'Comprehensive educational breakdown of all diagnostic parameters.';
      default: return '';
    }
  };

  return (
    <div className="border-b border-slate-200 pb-6 no-print">
      <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
        <span>Dashboard</span>
        <span className="text-slate-300">/</span>
        <span className="text-blue-600">{getTitle()}</span>
      </div>
      <h1 className="text-4xl font-black text-slate-900 tracking-tight">{getTitle()}</h1>
      <p className="text-slate-500 mt-2 font-medium max-w-2xl">{getSubtitle()}</p>
    </div>
  );
};

export default Header;
