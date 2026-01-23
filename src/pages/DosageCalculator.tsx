
import React, { useState, useEffect } from 'react';
import { 
  Droplets, 
  FlaskConical, 
  Info, 
  RefreshCw, 
  AlertCircle,
  Bug,
  ChevronRight,
  ShieldCheck,
  Zap,
  Target
} from 'lucide-react';

const chemicalTemplates = [
  { id: 'scab', name: 'Apple Scab Solution', chem: 'Difenoconazole', ratio: 0.3, unit: 'ml/L' },
  { id: 'mites', name: 'Mite Control Spray', chem: 'Abamectin', ratio: 0.5, unit: 'ml/L' },
  { id: 'oil', name: 'Winter Oil (TSO)', chem: 'HMO Oil', ratio: 20, unit: 'ml/L' },
  { id: 'npk', name: 'Liquid Fertilizer', chem: 'NPK 19:19:19', ratio: 5, unit: 'g/L' },
];

const DosageCalculator: React.FC = () => {
  const [tankSize, setTankSize] = useState<number>(200); // in Liters
  const [selectedChem, setSelectedChem] = useState(chemicalTemplates[0]);
  const [result, setResult] = useState<number>(0);

  useEffect(() => {
    setResult(tankSize * selectedChem.ratio);
  }, [tankSize, selectedChem]);

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-5 duration-700 pb-20">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-emerald-900 text-white rounded-[2rem] flex items-center justify-center shadow-2xl ring-4 ring-emerald-100">
            <Droplets className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-3xl font-heading font-bold text-slate-900">Dosage Pro Calculator</h2>
            <p className="text-slate-500 font-medium">Precision chemical mixing for the valley's orchards.</p>
          </div>
        </div>
        <div className="bg-emerald-50 px-4 py-2 rounded-2xl border border-emerald-100 flex items-center gap-2">
           <FlaskConical className="w-4 h-4 text-emerald-600" />
           <span className="text-[10px] font-black text-emerald-700 uppercase tracking-widest">Scientific Protocol</span>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <div className="bg-white p-10 rounded-[3.5rem] border border-slate-100 shadow-sm space-y-8">
          <div className="space-y-6">
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest px-2">Spray Target</label>
              <div className="grid grid-cols-1 gap-3">
                {chemicalTemplates.map((template) => (
                  <button
                    key={template.id}
                    onClick={() => setSelectedChem(template)}
                    className={`text-left px-6 py-5 rounded-[2rem] text-sm font-bold transition-all border ${
                      selectedChem.id === template.id 
                        ? 'bg-emerald-900 text-white border-emerald-900 shadow-lg' 
                        : 'bg-slate-50 text-slate-600 border-slate-100 hover:border-emerald-200'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div className="space-y-0.5">
                        <p className="text-sm font-bold">{template.name}</p>
                        <p className={`text-[10px] font-medium ${selectedChem.id === template.id ? 'text-emerald-300' : 'text-slate-400'}`}>{template.chem}</p>
                      </div>
                      <span className={`text-[10px] font-black uppercase ${selectedChem.id === template.id ? 'text-emerald-100' : 'text-emerald-600'}`}>{template.ratio} {template.unit}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest px-2">Tank Volume (Liters)</label>
              <div className="grid grid-cols-3 gap-3 mb-4">
                {[100, 200, 500].map(size => (
                  <button
                    key={size}
                    onClick={() => setTankSize(size)}
                    className={`py-4 rounded-2xl font-bold text-xs transition-all border ${
                      tankSize === size ? 'bg-emerald-100 text-emerald-700 border-emerald-500' : 'bg-slate-50 text-slate-500 border-slate-100'
                    }`}
                  >
                    {size}L Tank
                  </button>
                ))}
              </div>
              <input 
                type="number" 
                value={tankSize}
                onChange={(e) => setTankSize(Number(e.target.value))}
                className="w-full px-6 py-5 bg-slate-50 border border-slate-200 rounded-[2rem] focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all font-bold text-slate-800"
                placeholder="Custom Volume..."
              />
            </div>
          </div>

          <div className="bg-amber-50 p-6 rounded-3xl border border-amber-100 flex items-start gap-4">
            <AlertCircle className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
            <p className="text-xs text-amber-900 font-medium leading-relaxed">
              Always use PPE and consult SKUAST-K guidelines. This tool provides calculation assistance based on standard dilutions.
            </p>
          </div>
        </div>

        <div className="space-y-6 animate-in zoom-in-95 duration-500">
          <div className="bg-emerald-950 rounded-[3.5rem] p-10 text-white space-y-8 relative overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between relative z-10">
              <h3 className="text-2xl font-bold flex items-center gap-3">
                <Target className="w-6 h-6 text-emerald-400" /> Mixing Result
              </h3>
              <Zap className="w-6 h-6 text-emerald-500 fill-current" />
            </div>

            <div className="space-y-6 relative z-10">
              <div className="bg-white/5 border border-white/10 p-10 rounded-[2.5rem] text-center">
                <p className="text-[10px] font-black text-emerald-300 uppercase tracking-widest mb-2">Total Amount to Add</p>
                <p className="text-6xl font-black text-white tracking-tighter">
                  {result < 1000 ? `${result}` : `${(result/1000).toFixed(2)}`}
                  <span className="text-2xl ml-2 font-bold uppercase tracking-widest text-emerald-400">
                    {result < 1000 ? selectedChem.unit.split('/')[0] : selectedChem.unit === 'ml/L' ? 'Liters' : 'Kg'}
                  </span>
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 border border-white/10 p-6 rounded-[2.5rem]">
                  <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Water Volume</p>
                  <p className="text-xl font-black text-white">{tankSize} Liters</p>
                </div>
                <div className="bg-white/10 border border-white/10 p-6 rounded-[2.5rem]">
                  <p className="text-[10px] font-bold text-emerald-400 uppercase mb-1">Concentration</p>
                  <p className="text-xl font-black text-white">{selectedChem.ratio} {selectedChem.unit}</p>
                </div>
              </div>
            </div>

            <FlaskConical className="absolute -bottom-10 -right-10 w-64 h-64 text-white/5 pointer-events-none" />
          </div>

          <button 
            onClick={() => { setTankSize(200); setSelectedChem(chemicalTemplates[0]); }}
            className="w-full bg-slate-50 text-slate-400 py-5 rounded-[2rem] font-black uppercase text-[10px] tracking-[0.2em] border border-slate-100 flex items-center justify-center gap-2 hover:bg-slate-100 transition-colors"
          >
            <RefreshCw className="w-4 h-4" /> Reset Calculator
          </button>
        </div>
      </div>
    </div>
  );
};

export default DosageCalculator;
