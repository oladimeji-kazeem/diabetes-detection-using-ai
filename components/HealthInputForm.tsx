
import React, { useState } from 'react';
import { HealthData } from '../types';

interface HealthInputFormProps {
  onSubmit: (data: HealthData) => void;
  isLoading: boolean;
}

const HealthInputForm: React.FC<HealthInputFormProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<HealthData>({
    pregnancies: 0,
    glucose: 100,
    bloodPressure: 80,
    skinThickness: 20,
    insulin: 80,
    bmi: 24.5,
    diabetesPedigree: 0.45,
    age: 30
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: parseFloat(value) || 0
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const InputField = ({ label, name, value, min, max, step, helpText }: any) => (
    <div className="space-y-1.5">
      <div className="flex justify-between items-center">
        <label className="text-sm font-semibold text-slate-700">{label}</label>
        <span className="text-xs font-mono bg-slate-100 px-2 py-0.5 rounded text-slate-600">{value}</span>
      </div>
      <input
        type="range"
        name={name}
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleChange}
        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
      />
      <p className="text-[10px] text-slate-400 italic">{helpText}</p>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
        <InputField 
          label="Glucose Level" 
          name="glucose" 
          value={formData.glucose} 
          min={0} max={200} step={1}
          helpText="2hr plasma glucose concentration"
        />
        <InputField 
          label="BMI" 
          name="bmi" 
          value={formData.bmi} 
          min={10} max={60} step={0.1}
          helpText="Body mass index (weight in kg/(height in m)^2)"
        />
        <InputField 
          label="Blood Pressure" 
          name="bloodPressure" 
          value={formData.bloodPressure} 
          min={0} max={140} step={1}
          helpText="Diastolic blood pressure (mm Hg)"
        />
        <InputField 
          label="Age" 
          name="age" 
          value={formData.age} 
          min={1} max={100} step={1}
          helpText="Patient age in years"
        />
        <InputField 
          label="Insulin" 
          name="insulin" 
          value={formData.insulin} 
          min={0} max={850} step={1}
          helpText="2-Hour serum insulin (mu U/ml)"
        />
        <InputField 
          label="Diabetes Pedigree" 
          name="diabetesPedigree" 
          value={formData.diabetesPedigree} 
          min={0.05} max={2.5} step={0.01}
          helpText="Genetic score based on family history"
        />
        <InputField 
          label="Pregnancies" 
          name="pregnancies" 
          value={formData.pregnancies} 
          min={0} max={17} step={1}
          helpText="Number of times pregnant"
        />
        <InputField 
          label="Skin Thickness" 
          name="skinThickness" 
          value={formData.skinThickness} 
          min={0} max={99} step={1}
          helpText="Triceps skin fold thickness (mm)"
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition-colors disabled:opacity-50 shadow-lg shadow-blue-200"
      >
        {isLoading ? 'Analyzing Data...' : 'Generate AI Risk Assessment'}
      </button>
    </form>
  );
};

export default HealthInputForm;
