import React, { useState } from 'react';
import { Syringe, CheckCircle2, Circle, Clock, ShieldCheck, Droplets, ChevronRight } from 'lucide-react';

const sprayCycle = [
  { id: 1, name: 'Dormant Stage', phase: 'Feb/Mar', target: 'San Jose Scale', chem: 'HMO / Servo Oil', active: true },
  { id: 2, name: 'Green Tip Stage', phase: 'Mar End', target: 'Apple Scab', chem: 'Dodine / Captan', active: false },
  { id: 3, name: 'Pink Bud Stage', phase: 'April', target: 'Early Scab', chem: 'Difenoconazole', active: false },
  { id: 4, name: 'Petal Fall Stage', phase: 'May Early', target: 'Mites / Scab', chem: 'Mancozeb', active: false },
  { id: 5, name: 'Pea Size Stage', phase: 'May End', target: 'Alternaria', chem: 'Ziram / Propineb', active: false },
];

const SprayTracker: React.FC = () => {
  const [completed, setCompleted] = useState<number[]>([]);

  const toggle = (id: number) => {
    setCompleted(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-700 pb-20">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-emerald-900 text-white rounded-[2rem] flex items-center justify-center shadow-2xl ring-4 ring-emerald-100">
            <Syringe className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-3xl font-heading font-bold text-slate-900">Spray Tracker</h2>
            <p className="text-slate-500 font-medium">Managing the SKUAST-K 12-spray horticultural cycle.</p>
          </div>
        </div>
        <div className="bg-emerald-50 px-4 py-2 rounded-2xl border border-emerald-100 font-black text-[10px] text-emerald-700 uppercase tracking-widest">Progress: {Math.round((completed.length/sprayCycle.length)*100)}%</div>
      </header>

      <div className="space-y-4">
        {sprayCycle.map((s) => (
          <div key={s.id} onClick={() => toggle(s.id)} className={`bg-white p-8 rounded-[2.5rem] border transition-all cursor-pointer flex items-center gap-8 group ${completed.includes(s.id) ? 'border-emerald-500 bg-emerald-50/50' : 'border-slate-100 hover:border-emerald-200 shadow-sm'}`}>
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-colors ${completed.includes(s.id) ? 'bg-emerald-600 text-white' : 'bg-slate-50 text-slate-300'}`}>
              {completed.includes(s.id) ? <CheckCircle2 className="w-8 h-8" /> : <Circle className="w-8 h-8" />}
            </div>
            <div className="flex-1 space-y-1">
              <div className="flex items-center gap-3">
                <h4 className={`text-xl font-bold ${completed.includes(s.id) ? 'text-emerald-900' : 'text-slate-900'}`}>{s.name}</h4>
                <span className="text-[10px] font-black uppercase text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded">{s.phase}</span>
              </div>
              <p className="text-sm text-slate-500 font-medium">Target: {s.target} • Recommend: {s.chem}</p>
            </div>
            <ChevronRight className={`w-6 h-6 transition-transform ${completed.includes(s.id) ? 'text-emerald-600 rotate-90' : 'text-slate-200 group-hover:translate-x-1'}`} />
          </div>
        ))}
      </div>

      <div className="bg-emerald-900 p-10 rounded-[3.5rem] text-white space-y-6 relative overflow-hidden shadow-2xl">
        <h3 className="text-2xl font-bold flex items-center gap-3"><ShieldCheck className="w-6 h-6 text-emerald-400" /> SKUAST Advisory</h3>
        <p className="text-emerald-100/70 font-medium leading-relaxed">Spray timing depends on tree phenology (bloom stage). Use the Weather Hub to choose windless, non-rainy days for maximum coverage.</p>
        <div className="flex gap-4">
           <button className="flex-1 bg-white/10 hover:bg-white/20 py-4 rounded-2xl text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2"><Droplets className="w-4 h-4 text-emerald-400" /> Mixing Guide</button>
           <button className="flex-1 bg-white/10 hover:bg-white/20 py-4 rounded-2xl text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2"><Clock className="w-4 h-4 text-emerald-400" /> Regional Alerts</button>
        </div>
      </div>
    </div>
  );
};
export default SprayTracker;