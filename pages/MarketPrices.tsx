
import React, { useState } from 'react';
import { 
  Search, 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  MapPin, 
  ChevronRight,
  Globe,
  Navigation2,
  Loader2,
  ExternalLink,
  Store,
  Map as MapIcon,
  X,
  AlertCircle,
  BarChart3
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { findNearbyMandis } from '../services/gemini';

const priceHistory = [
  { name: 'Jan', price: 900 },
  { name: 'Feb', price: 950 },
  { name: 'Mar', price: 1100 },
  { name: 'Apr', price: 1050 },
  { name: 'May', price: 1200 },
  { name: 'Jun', price: 1350 }
];

const MarketPrices: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('All');
  const [loadingLocator, setLoadingLocator] = useState(false);
  const [nearbyResults, setNearbyResults] = useState<{ text: string; sources?: any[] } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const categories = ['All', 'Fruit', 'Spice', 'Nut', 'Vegetable'];

  const featuredMandis = [
    { name: 'Sopore Mandi', region: 'J&K (North)', status: 'Live', type: 'Apple Hub', icon: '🍎' },
    { name: 'Parimpora Mandi', region: 'J&K (Central)', status: 'Live', type: 'General', icon: '📦' },
    { name: 'Pampore Mandi', region: 'J&K (South)', status: 'Live', type: 'Saffron', icon: '🌸' },
    { name: 'Azadpur Mandi', region: 'Delhi (NCR)', status: 'Live', type: 'National Hub', icon: '🇮🇳' },
    { name: 'Vashi Mandi', region: 'Mumbai (MH)', status: 'Live', type: 'Export Hub', icon: '🚢' }
  ];

  const prices = [
    { crop: 'Apple (Premium)', price: 1250, unit: 'per box', mandi: 'Sopore', trend: 'up', change: '+₹45', category: 'Fruit', icon: '🍎' },
    { crop: 'Saffron (Mongra)', price: 340, unit: 'per g', mandi: 'Pampore', trend: 'up', change: '+₹15', category: 'Spice', icon: '🌸' },
    { crop: 'Walnut (Kashmiri)', price: 850, unit: 'per kg', mandi: 'Parimpora', trend: 'stable', change: '0', category: 'Nut', icon: '🥜' },
    { crop: 'Almond (Mamra)', price: 620, unit: 'per kg', mandi: 'Pulwama', trend: 'down', change: '-₹12', category: 'Nut', icon: '🌰' },
    { crop: 'Pear (Nakh)', price: 450, unit: 'per box', mandi: 'Sopore', trend: 'up', change: '+₹20', category: 'Fruit', icon: '🍐' }
  ];

  const handleLocateMandis = async () => {
    setLoadingLocator(true);
    setError(null);
    setNearbyResults(null);
    
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      setLoadingLocator(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const res = await findNearbyMandis(position.coords.latitude, position.coords.longitude);
          setNearbyResults(res);
        } catch (err) {
          setError("Failed to fetch nearby mandis using AI.");
        } finally {
          setLoadingLocator(false);
        }
      },
      (err) => {
        setError("Location access denied. Please enable GPS.");
        setLoadingLocator(false);
      }
    );
  };

  const filteredPrices = prices.filter(p => 
    (category === 'All' || p.category === category) &&
    (p.crop.toLowerCase().includes(searchTerm.toLowerCase()) || p.mandi.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-20 no-scrollbar">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <h2 className="text-3xl lg:text-4xl font-heading font-bold text-slate-900">Mandi Price Hub</h2>
          <p className="text-slate-500 font-medium">Real-time spot prices and live locator for Mandis across the valley.</p>
        </div>
        <div className="flex gap-2">
           <button 
            onClick={handleLocateMandis}
            disabled={loadingLocator}
            className="bg-emerald-900 text-white px-6 py-4 rounded-2xl font-bold flex items-center gap-2 shadow-xl hover:bg-emerald-800 transition-all active:scale-95 disabled:opacity-50"
          >
            {loadingLocator ? <Loader2 className="w-5 h-5 animate-spin" /> : <Navigation2 className="w-5 h-5" />}
            Mandi Near Me
          </button>
        </div>
      </header>

      {nearbyResults && (
        <div className="bg-emerald-900 p-8 rounded-[3.5rem] border border-white/10 shadow-2xl animate-in zoom-in-95 duration-500 text-white">
          <div className="flex justify-between items-start mb-6">
             <div className="flex items-center gap-3">
               <div className="p-3 bg-white/10 rounded-2xl text-emerald-400 shadow-lg">
                 <MapPin className="w-6 h-6" />
               </div>
               <div>
                 <h3 className="text-xl font-bold">Nearby Mandis Located</h3>
                 <p className="text-xs font-black text-emerald-400 uppercase tracking-widest">AI Geolocation Search</p>
               </div>
             </div>
             <button onClick={() => setNearbyResults(null)} className="p-2 hover:bg-white/10 rounded-full">
               <X className="w-5 h-5 text-emerald-400" />
             </button>
          </div>
          <div className="prose prose-invert max-w-none">
             <p className="text-emerald-100/80 leading-relaxed font-medium whitespace-pre-wrap">{nearbyResults.text}</p>
          </div>
          {nearbyResults.sources && nearbyResults.sources.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
               {nearbyResults.sources.map((source: any, i: number) => (
                 <a 
                   key={i} 
                   href={source.maps?.uri || source.web?.uri} 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="flex items-center gap-2 bg-white/10 border border-white/10 px-4 py-2 rounded-xl text-xs font-bold text-emerald-400 hover:bg-white/20 transition-colors"
                 >
                   <MapIcon className="w-3.5 h-3.5" />
                   {source.maps?.title || source.web?.title || 'View Map'}
                   <ExternalLink className="w-3 h-3" />
                 </a>
               ))}
            </div>
          )}
        </div>
      )}

      {error && (
        <div className="bg-emerald-900 border border-white/10 p-6 rounded-[2rem] text-emerald-400 flex items-center gap-3 animate-in slide-in-from-top-4">
          <AlertCircle className="w-5 h-5" />
          <p className="text-sm font-bold">{error}</p>
          <button onClick={handleLocateMandis} className="ml-auto text-xs font-black uppercase tracking-widest hover:underline">Retry</button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-emerald-900 p-10 rounded-[3.5rem] border border-white/10 shadow-2xl flex flex-col gap-6 text-white">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative flex-1 w-full group">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-emerald-400/50 w-5 h-5 group-focus-within:text-emerald-400 transition-colors" />
                <input 
                  type="text" 
                  placeholder="Search crop or mandi..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-14 pr-6 py-4.5 bg-emerald-800/50 border border-white/10 rounded-2xl outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all font-medium text-white placeholder-emerald-400/30"
                />
              </div>
              <div className="flex gap-2 overflow-x-auto no-scrollbar w-full md:w-auto">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className={`px-5 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                      category === cat 
                        ? 'bg-white text-emerald-900 shadow-lg' 
                        : 'bg-emerald-800/50 text-emerald-400 border border-white/10 hover:border-emerald-400'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-white/10 text-[10px] font-black text-emerald-400 uppercase tracking-widest">
                    <th className="px-6 py-4">Crop</th>
                    <th className="px-6 py-4">Mandi</th>
                    <th className="px-6 py-4">Price</th>
                    <th className="px-6 py-4">Trend</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredPrices.map((p, i) => (
                    <tr key={i} className="group hover:bg-emerald-800 transition-colors">
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{p.icon}</span>
                          <div>
                            <p className="font-bold text-white">{p.crop}</p>
                            <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">{p.category}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-sm font-bold text-emerald-100">{p.mandi}</span>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div>
                          <p className="font-black text-white">₹{p.price}</p>
                          <p className="text-[10px] font-bold text-emerald-400/60">{p.unit}</p>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className={`flex items-center gap-1 font-black text-xs ${
                          p.trend === 'up' ? 'text-emerald-400' : p.trend === 'down' ? 'text-rose-400' : 'text-emerald-200'
                        }`}>
                          {p.trend === 'up' ? <TrendingUp className="w-4 h-4" /> : p.trend === 'down' ? <TrendingDown className="w-4 h-4" /> : <Minus className="w-4 h-4" />}
                          {p.change !== '0' && p.change}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-6">
          <div className="bg-emerald-950 rounded-[3rem] p-8 text-white space-y-6 border border-white/10 shadow-2xl">
             <div className="flex items-center justify-between">
               <h3 className="text-xl font-bold flex items-center gap-3">
                 <Store className="w-5 h-5 text-emerald-400" /> Premium Mandis
               </h3>
               <Globe className="w-5 h-5 text-emerald-500/50" />
             </div>
             <div className="space-y-4">
               {featuredMandis.map((mandi, idx) => (
                 <div key={idx} className="bg-emerald-900/50 border border-white/5 p-4 rounded-2xl flex items-center justify-between group hover:bg-emerald-800 transition-colors cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-emerald-950 rounded-xl flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                        {mandi.icon}
                      </div>
                      <div>
                        <p className="font-bold text-sm leading-none">{mandi.name}</p>
                        <p className="text-[10px] font-bold text-emerald-500 uppercase mt-1">{mandi.region}</p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-emerald-600 group-hover:translate-x-1 transition-transform" />
                 </div>
               ))}
             </div>
          </div>

          <div className="bg-emerald-900 p-8 rounded-[3rem] border border-white/10 shadow-2xl text-white">
             <h4 className="text-lg font-bold mb-6 flex items-center gap-2">
               <TrendingUp className="w-5 h-5 text-emerald-400" /> Price Index
             </h4>
             <div className="h-48 w-full">
               <ResponsiveContainer width="100%" height="100%">
                 <AreaChart data={priceHistory}>
                   <defs>
                     <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                       <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                       <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                     </linearGradient>
                   </defs>
                   <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                   <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 700, fill: '#10b981'}} />
                   <Tooltip 
                     contentStyle={{borderRadius: '16px', border: 'none', backgroundColor: '#064e3b', color: '#fff'}}
                     itemStyle={{fontSize: '12px', fontWeight: 700, color: '#fff'}}
                   />
                   <Area type="monotone" dataKey="price" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorPrice)" />
                 </AreaChart>
               </ResponsiveContainer>
             </div>
             <p className="text-[10px] text-center text-emerald-400 font-bold uppercase tracking-widest mt-4">Apple Grade-A (₹/Box)</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketPrices;
