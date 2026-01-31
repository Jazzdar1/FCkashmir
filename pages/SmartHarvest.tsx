import React, { useState } from 'react';
import { TrendingUp, Target, Zap, Loader2, Sparkles } from 'lucide-react';
import { predictYield } from '../services/gemini';

const SmartHarvest: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [formData, setFormData] = useState({ landSize: 10, crop: 'Apple', age: 15, variety: 'Kashmiri Delicious', health: 'Good' });

  const handlePredict = async () => {
    setLoading(true);
    try {
      const res = await predictYield(formData);
      setResult(res);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-700 pb-20">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-emerald-900 text-white rounded-[2rem] flex items-center justify-center shadow-2xl ring-4 ring-emerald-100">
            <TrendingUp className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-3xl font-heading font-bold text-slate-900">Yield Predictor AI</h2>
            <p className="text-slate-500 font-medium">Estimated production and market value for J&K.</p>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-10 rounded-[3.5rem] border border-slate-100 shadow-sm space-y-8">
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest px-2">Crop Type</label>
              <select value={formData.crop} onChange={e => setFormData({...formData, crop: e.target.value})} className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-[2rem] font-bold text-slate-800 outline-none">
                <option>Apple</option><option>Saffron</option><option>Walnut</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest px-2">Land (Kanals)</label>
                <input type="number" value={formData.landSize} onChange={e => setFormData({...formData, landSize: Number(e.target.value)})} className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-[2rem] font-bold outline-none" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest px-2">Tree Age (Yrs)</label>
                <input type="number" value={formData.age} onChange={e => setFormData({...formData, age: Number(e.target.value)})} className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-[2rem] font-bold outline-none" />
              </div>
            </div>
            <button onClick={handlePredict} disabled={loading} className="w-full bg-emerald-900 text-white py-5 rounded-[2rem] font-bold shadow-xl flex items-center justify-center gap-3">
              {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Sparkles className="w-6 h-6" />} Predict Harvest
            </button>
          </div>
        </div>

        <div className="space-y-6">
          {result && (
            <div className="bg-emerald-950 rounded-[3.5rem] p-10 text-white space-y-8 relative overflow-hidden shadow-2xl">
              <div className="flex items-center justify-between relative z-10"><h3 className="text-2xl font-bold flex items-center gap-3"><Target className="w-6 h-6 text-emerald-400" /> Estimated Yield</h3><Zap className="w-6 h-6 text-emerald-500 fill-current" /></div>
              <div className="space-y-6 relative z-10">
                <div className="bg-white/5 border border-white/10 p-8 rounded-[2.5rem] text-center"><p className="text-4xl font-black text-white">{result.estimatedYield}</p><p className="text-emerald-400 font-bold uppercase text-[10px] mt-2">Predicted Box/Qty Count</p></div>
                <div className="bg-emerald-600 p-6 rounded-[2rem] text-center font-bold text-lg shadow-xl tracking-tight">Market Value: {result.marketValue}</div>
                <div className="bg-white/5 p-6 rounded-[2rem] border border-white/10 space-y-4">
                  <h5 className="font-bold text-emerald-400 uppercase text-[10px] tracking-widest">Risk Factors</h5>
                  <ul className="space-y-2 text-sm">{result.riskFactors.map((r: any, i: number) => <li key={i} className="flex gap-2"><span>•</span> {r}</li>)}</ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default SmartHarvest;