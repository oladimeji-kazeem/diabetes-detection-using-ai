
import React from 'react';
import { AssessmentRecord } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Calendar, Trash2 } from 'lucide-react';

interface RecordsHistoryProps {
  records: AssessmentRecord[];
}

const RecordsHistory: React.FC<RecordsHistoryProps> = ({ records }) => {
  if (records.length === 0) {
    return (
      <div className="bg-white p-20 rounded-2xl shadow-sm border border-slate-100 text-center flex flex-col items-center">
        <Calendar size={64} className="text-slate-100 mb-4" />
        <h3 className="text-xl font-bold text-slate-800">No records found</h3>
        <p className="text-slate-500">Perform an assessment to see your history here.</p>
      </div>
    );
  }

  const chartData = records.slice(0, 7).reverse().map(r => ({
    date: new Date(r.timestamp).toLocaleDateString([], { month: 'short', day: 'numeric' }),
    risk: r.result.probability,
    glucose: r.data.glucose
  }));

  return (
    <div className="space-y-8">
      {/* Analytics Summary */}
      <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <h2 className="text-lg font-bold text-slate-800 mb-6">Recent Trends</h2>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="date" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
              />
              <Line type="monotone" dataKey="risk" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, fill: '#3b82f6' }} name="Risk %" />
              <Line type="monotone" dataKey="glucose" stroke="#10b981" strokeWidth={2} strokeDasharray="5 5" dot={false} name="Glucose" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Historical List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {records.map((record) => (
          <div key={record.id} className="bg-white p-5 rounded-xl border border-slate-100 hover:border-blue-200 transition-colors shadow-sm">
            <div className="flex justify-between items-start mb-3">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  {new Date(record.timestamp).toLocaleDateString()}
                </p>
                <h4 className="font-bold text-slate-800">{record.result.prediction}</h4>
              </div>
              <div className={`px-2 py-1 rounded-full text-xs font-bold ${
                record.result.prediction === 'Low Risk' ? 'bg-emerald-50 text-emerald-600' : 
                record.result.prediction === 'Moderate Risk' ? 'bg-amber-50 text-amber-600' : 'bg-rose-50 text-rose-600'
              }`}>
                {record.result.probability}%
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded-md text-slate-600">Glucose: {record.data.glucose}</span>
              <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded-md text-slate-600">BMI: {record.data.bmi}</span>
              <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded-md text-slate-600">Age: {record.data.age}</span>
            </div>

            <p className="text-xs text-slate-500 line-clamp-2 italic">
              "{record.result.explanation}"
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecordsHistory;
