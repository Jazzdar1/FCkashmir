
import React, { useState, useEffect } from 'react';
import { 
  Calculator, 
  TrendingUp, 
  Coins, 
  Landmark, 
  ArrowRight, 
  RefreshCw, 
  Info,
  DollarSign,
  PieChart,
  Target,
  Zap
} from 'lucide-react';

const ProfitCalculator: React.FC = () => {
  const [landSize, setLandSize] = useState<number>(10); // in Kanals
  const [cropType, setCropType] = useState('Apple');
  const [expectedPrice, setExpectedPrice] = useState<number>(1200);
  const [yieldPerKanal, setYieldPerKanal] = useState<number>(40); // in Boxes
  
  const [results, setResults] = useState<{
    revenue: number;
    costs: number;
    netProfit: number;
    roi: number;
  } | null>(null);

  const calculate = () => {
    const revenue = landSize * yieldPerKanal * expectedPrice;
    
    const costFactors: Record<string, number> = {
      'Apple': 450,
      'Saffron': 120,
      'Walnut': 300,
      'Cherry': 150
    };

    const costPerUnit = costFactors[cropType] || 200;
    const totalCosts = landSize * yieldPerKanal * costPerUnit;
    const netProfit = revenue - totalCosts;
    const roi = totalCosts > 0 ? (netProfit / totalCosts) * 100 : 0;

    setResults({
      revenue,
      costs: totalCosts,
      netProfit,
      roi
    });
  };

  useEffect(() => {
    calculate();
  }, [landSize, cropType, expectedPrice, yieldPerKanal]);

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-5 duration-700 pb-20">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-emerald-900 text-white rounded-[2rem] flex items-center justify-center shadow-2xl ring-4 ring-emerald-100">
            <Calculator className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-3xl font-heading font-bold text-slate-900">Profit Estimator Pro</h2>
            <p className="text-slate-500 font-medium">Financial planning for the harvest season.</p>
          </div>
        </div>
        <div className="bg-emerald-50 px-4 py-2 rounded-2xl border border-emerald-100 flex items-center gap-2">
           <Zap className="w-4 h-4 text-emerald-600" />
           <span className="text-[10px] font-black text-emerald-700 uppercase tracking-widest">Real-time Projections</span>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <div className="bg-white p-10 rounded-[3.5rem] border border-slate-100 shadow-sm space-y-8">
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest px-2">Crop Variety</label>
              <select 
                value={cropType}
                onChange={(e) => setCropType(e.target.value)}
                className="w-full px-6 py-5 bg-slate-50 border border-slate-200 rounded-[2rem] focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all font-bold text-slate-800"
              >
                <option>Apple</option>
                <option>Saffron</option>
                <option>Walnut</option>
                <option>Cherry</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest px-2">Land Size (Total Kanals)</label>
              <input 
                type="number" 
                value={landSize}
                onChange={(e) => setLandSize(Number(e.target.value))}
                className="w-full px-6 py-5 bg-slate-50 border border-slate-200 rounded-[2rem] focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all font-bold text-slate-800"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest px-2">Expected Price</label>
                <input 
                  type="number" 
                  value={expectedPrice}
                  onChange={(e) => setExpectedPrice(Number(e.target.value))}
                  className="w-full px-6 py-5 bg-slate-50 border border-slate-200 rounded-[2rem] focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all font-bold text-slate-800"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest px-2">Yield (per Kanal)</label>
                <input 
                  type="number" 
                  value={yieldPerKanal}
                  onChange={(e) => setYieldPerKanal(Number(e.target.value))}
                  className="w-full px-6 py-5 bg-slate-50 border border-slate-200 rounded-[2rem] focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all font-bold text-slate-800"
                />
              </div>
            </div>
          </div>

          <div className="bg-emerald-50 p-6 rounded-3xl border border-emerald-100 flex items-start gap-4">
            <Info className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
            <p className="text-xs text-emerald-800 font-medium leading-relaxed">
              Calculation is based on average input costs including labor, packaging, and Mandi commission in J&K.
            </p>
          </div>
        </div>

        {results && (
          <div className="space-y-6 animate-in zoom-in-95 duration-500">
            <div className="bg-emerald-950 rounded-[3.5rem] p-10 text-white space-y-8 relative overflow-hidden shadow-2xl">
              <div className="flex items-center justify-between relative z-10">
                <h3 className="text-2xl font-bold flex items-center gap-3">
                  <TrendingUp className="w-6 h-6 text-emerald-400" /> Season Forecast
                </h3>
              </div>

              <div className="space-y-6 relative z-10">
                <div className="bg-white/5 border border-white/10 p-8 rounded-[2.5rem]">
                  <p className="text-xs font-bold text-slate-400 uppercase mb-1">Estimated Total Revenue</p>
                  <p className="text-5xl font-black text-white tracking-tighter">₹{results.revenue.toLocaleString()}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/5 border border-white/10 p-6 rounded-[2.5rem]">
                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Expenditure</p>
                    <p className="text-xl font-black text-emerald-200">₹{results.costs.toLocaleString()}</p>
                  </div>
                  <div className="bg-emerald-600 border border-emerald-500 p-6 rounded-[2.5rem] shadow-xl">
                    <p className="text-[10px] font-bold text-emerald-100 uppercase mb-1">Net Margin</p>
                    <p className="text-xl font-black text-white">₹{results.netProfit.toLocaleString()}</p>
                  </div>
                </div>

                <div className="bg-white/10 border border-white/10 p-6 rounded-[2.5rem] flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-bold text-emerald-400 uppercase mb-1">Performance (ROI)</p>
                    <p className="text-3xl font-black text-white">{results.roi.toFixed(1)}%</p>
                  </div>
                  <Target className="w-12 h-12 text-emerald-400 opacity-20" />
                </div>
              </div>

              <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px]" />
            </div>

            <button 
              onClick={() => { setLandSize(10); setExpectedPrice(1200); }}
              className="w-full bg-slate-50 text-slate-400 py-5 rounded-[2rem] font-black uppercase text-[10px] tracking-[0.2em] border border-slate-100 flex items-center justify-center gap-2 hover:bg-slate-100 transition-colors"
            >
              <RefreshCw className="w-4 h-4" /> Reset Financial Plan
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfitCalculator;
