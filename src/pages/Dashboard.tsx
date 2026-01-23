
import React, { useState, useEffect } from 'react';
import { 
  ChevronRight, 
  Zap, 
  Loader2,
  CloudSun,
  Droplets,
  Wind,
  Calendar,
  ScanEye,
  Rabbit,
  Syringe,
  Target,
  TrendingUp,
  Store,
  MapPin,
  Warehouse,
  MessageSquare,
  Activity,
  Stethoscope,
  Phone
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { getDistrictWeather } from '../services/gemini';

const districts = ["Srinagar", "Jammu", "Anantnag", "Baramulla", "Budgam", "Pulwama", "Kupwara", "Shopian", "Ganderbal", "Kulgam"];

const SeasonProgress = () => {
  const [progress, setProgress] = useState(68);
  return (
    <div className="bg-emerald-950/50 backdrop-blur-xl p-6 lg:p-8 rounded-[2.5rem] border border-white/10 shadow-inner">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Calendar className="w-5 h-5 text-emerald-400" />
          <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Seasonal Cycle</span>
        </div>
        <span className="text-[9px] font-bold text-white bg-emerald-600 px-3 py-1 rounded-full">April: Pink Bud Phase</span>
      </div>
      <div className="h-4 bg-white/10 rounded-full overflow-hidden border border-white/5 relative">
        <div 
          className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 animate-pulse transition-all duration-1000" 
          style={{ width: `${progress}%` }} 
        />
        <div className="absolute inset-0 flex items-center justify-center text-[8px] font-black uppercase text-white drop-shadow-md">
           {progress}% Progress
        </div>
      </div>
      <p className="text-[10px] text-emerald-100/50 mt-4 leading-relaxed">
        Critical window for <b>Fungal Prevention</b> and <b>Petal Fall</b> prep in Apple orchards.
      </p>
    </div>
  );
};

const HeritageWatermark = () => (
  <div className="absolute -top-10 -right-10 opacity-[0.05] pointer-events-none select-none rotate-12">
    <svg width="300" height="300" viewBox="0 0 100 100" fill="currentColor">
       <path d="M50 0 C55 20 70 25 85 15 C80 35 95 50 100 50 C80 50 65 65 85 85 C65 70 50 85 50 100 C50 85 35 70 15 85 C35 65 20 50 0 50 C20 50 35 35 15 15 C30 25 45 20 50 0" />
    </svg>
  </div>
);

const Dashboard: React.FC<{ isHighContrast?: boolean }> = ({ isHighContrast }) => {
  const [weatherData, setWeatherData] = useState<any>(null);
  const [selectedWeatherDistrict, setSelectedWeatherDistrict] = useState<string>('Srinagar');
  const [loadingWeather, setLoadingWeather] = useState(false);

  const loadWeather = async (district: string) => {
    setLoadingWeather(true);
    try {
      const data = await getDistrictWeather(district);
      setWeatherData(data);
    } catch (e) {
      setWeatherData({ forecast: "Weather data unavailable." });
    } finally {
      setLoadingWeather(false);
    }
  };

  useEffect(() => {
    loadWeather(selectedWeatherDistrict);
  }, [selectedWeatherDistrict]);

  return (
    <div className="space-y-8 lg:space-y-12 animate-in fade-in duration-700 pb-20">
      {/* Hero Section */}
      <div className="relative bg-emerald-900 rounded-[3.5rem] p-8 lg:p-20 text-white overflow-hidden shadow-2xl border border-white/10 group">
        <HeritageWatermark />
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 lg:space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/20">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-widest text-emerald-100">Farmer'sCorner Kashmir Hub</span>
            </div>
            <h2 className="text-4xl sm:text-6xl lg:text-8xl font-heading font-bold leading-[0.9] tracking-tighter">
              As-Salamu <br/>
              <span className="text-emerald-400">Alaykum.</span>
            </h2>
            <p className="text-lg lg:text-xl text-emerald-100/70 font-medium leading-relaxed max-w-lg mx-auto lg:mx-0">
              Empowering the valley's backbone with AI vision, livestock health, and precision market analytics.
            </p>
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-4">
              <Link 
                to="/fck-scanner" 
                className="bg-white text-emerald-900 px-8 lg:px-10 py-4 lg:py-5 rounded-[2.5rem] font-bold text-lg lg:text-xl shadow-[0_0_40px_rgba(255,255,255,0.2)] hover:bg-emerald-50 transition-all flex items-center gap-4 group ring-4 ring-emerald-500/20 active:scale-95"
              >
                <ScanEye className="w-6 h-6 lg:w-7 lg:h-7 text-emerald-600 animate-pulse" /> Launch FCK Scanner
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
          
          <div className="space-y-6">
             <SeasonProgress />
             <div className="grid grid-cols-2 gap-4">
                <Link to="/market" className="bg-white/10 backdrop-blur-xl p-6 lg:p-8 rounded-[2.5rem] lg:rounded-[3rem] border border-white/10 shadow-2xl space-y-2 lg:space-y-4 group hover:bg-white/20 transition-all text-left">
                   <p className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Premium Grade-A</p>
                   <p className="text-2xl lg:text-3xl font-black">₹1,250</p>
                   <p className="text-[8px] font-bold text-emerald-300 uppercase">Avg Mandi Price</p>
                </Link>
                <Link to="/weather" className="bg-white/10 backdrop-blur-xl p-6 lg:p-8 rounded-[2.5rem] lg:rounded-[3rem] border border-white/10 shadow-2xl space-y-2 lg:space-y-4 group hover:bg-white/20 transition-all text-left">
                   <p className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Valley AQI</p>
                   <p className="text-2xl lg:text-3xl font-black">42</p>
                   <p className="text-[8px] font-bold text-emerald-300 uppercase">Good Visibility</p>
                </Link>
             </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
           <div className="bg-emerald-900 p-8 lg:p-12 rounded-[3.5rem] border border-white/10 shadow-2xl relative overflow-hidden text-white group">
              <div className="relative z-10 flex flex-col md:flex-row justify-between gap-12">
                 <div className="space-y-8 flex-1">
                    <div className="flex items-center gap-4">
                       <div className="p-3 lg:p-4 bg-emerald-800 rounded-2xl lg:rounded-3xl text-emerald-400 shadow-inner">
                          <CloudSun className="w-6 h-6 lg:w-8 lg:h-8" />
                       </div>
                       <div>
                          <h3 className="text-xl lg:text-3xl font-bold">{selectedWeatherDistrict} Climate</h3>
                          <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Real-time Satellite Sync</p>
                       </div>
                    </div>

                    {loadingWeather ? (
                       <div className="flex items-center gap-4 text-emerald-300/60 py-10">
                          <Loader2 className="w-8 h-8 animate-spin" />
                          <span className="font-bold uppercase tracking-widest text-xs">Fetching Forecast...</span>
                       </div>
                    ) : (
                       <div className="flex flex-wrap items-end gap-x-8 gap-y-4">
                          <h3 className="text-5xl sm:text-7xl lg:text-9xl font-black tracking-tighter leading-none">{weatherData?.temperature || '14°C'}</h3>
                          <div className="pb-2 lg:pb-4">
                             <p className="text-xl lg:text-2xl font-bold text-emerald-100">{weatherData?.condition || 'Analyzing...'}</p>
                             <div className="flex gap-4 lg:gap-6 mt-2 lg:mt-4">
                                <span className="flex items-center gap-2 text-[10px] font-black uppercase text-emerald-400">
                                   <Droplets className="w-4 h-4" /> {weatherData?.humidity || '45%'}
                                </span>
                                <span className="flex items-center gap-2 text-[10px] font-black uppercase text-emerald-400">
                                   <Wind className="w-4 h-4" /> {weatherData?.windSpeed || '8kph'}
                                </span>
                             </div>
                          </div>
                       </div>
                    )}
                 </div>

                 <div className="w-full md:w-64 lg:w-72 space-y-4 lg:space-y-6">
                    <p className="text-[10px] font-black uppercase text-emerald-400 tracking-[0.3em] text-center">District Selection</p>
                    <div className="grid grid-cols-2 gap-2">
                       {districts.slice(0, 4).map(d => (
                          <button 
                            key={d} 
                            onClick={() => loadWeather(d)}
                            className={`px-3 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest border transition-all ${selectedWeatherDistrict === d ? 'bg-white text-emerald-900 border-white shadow-lg' : 'bg-emerald-800/50 text-emerald-100 border-white/5 hover:border-emerald-400'}`}
                          >
                             {d}
                          </button>
                       ))}
                    </div>
                 </div>
              </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Link to="/livestock" className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:border-emerald-200 transition-all group overflow-hidden relative text-left">
                 <div className="relative z-10 space-y-6">
                    <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform">
                       <Rabbit className="w-8 h-8" />
                    </div>
                    <div>
                       <h4 className="text-2xl font-bold text-slate-900">Livestock AI</h4>
                       <p className="text-sm text-slate-500 font-medium leading-relaxed mt-2">Identify animal health risks and vet protocols for J&K.</p>
                    </div>
                    <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs uppercase tracking-widest">
                       Vet Scan <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                 </div>
                 <div className="absolute -bottom-6 -right-6 text-emerald-50 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Rabbit className="w-32 h-32" />
                 </div>
              </Link>

              <Link to="/harvest" className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:border-emerald-200 transition-all group overflow-hidden relative text-left">
                 <div className="relative z-10 space-y-6">
                    <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                       <Target className="w-8 h-8" />
                    </div>
                    <div>
                       <h4 className="text-2xl font-bold text-slate-900">Yield Predictor</h4>
                       <p className="text-sm text-slate-500 font-medium leading-relaxed mt-2">AI-driven harvest forecasts based on orchard health and age.</p>
                    </div>
                    <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-widest">
                       Forecast Now <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                 </div>
                 <div className="absolute -bottom-6 -right-6 text-blue-50 opacity-10 group-hover:opacity-20 transition-opacity">
                    <TrendingUp className="w-32 h-32" />
                 </div>
              </Link>
           </div>
        </div>

        <div className="lg:col-span-4 space-y-8">
           <div className="bg-emerald-950 p-8 lg:p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden group">
              <div className="relative z-10 space-y-6">
                 <div className="flex items-center justify-between">
                    <div className="w-14 h-14 bg-emerald-800 rounded-2xl flex items-center justify-center shadow-inner">
                       <Syringe className="w-7 h-7 text-emerald-400" />
                    </div>
                 </div>
                 <div>
                    <h4 className="text-xl font-bold">Spray Tracker</h4>
                    <p className="text-[10px] font-black uppercase text-emerald-400 tracking-widest mt-1">Managing 12-Cycle Program</p>
                 </div>
                 <Link to="/spray-track" className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-emerald-500 transition-all text-sm">
                    Open Logs <ChevronRight className="w-4 h-4" />
                 </Link>
              </div>
           </div>

           <div className="bg-white p-8 lg:p-10 rounded-[3.5rem] border border-slate-100 shadow-sm space-y-6">
              <h4 className="text-lg font-bold flex items-center gap-3 text-slate-900">
                 <Zap className="w-5 h-5 text-emerald-600 fill-current" /> Fast Access
              </h4>
              <div className="grid grid-cols-1 gap-3">
                 {[
                    { label: 'Dealer Map', path: '/dealers', icon: MapPin },
                    { label: 'CA Storages', path: '/ca-storage', icon: Warehouse },
                    { label: 'Market Prices', path: '/market', icon: Store }
                 ].map(tool => (
                    <Link 
                      key={tool.path}
                      to={tool.path}
                      className="group flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-transparent hover:border-emerald-200 hover:bg-emerald-50 transition-all text-left"
                    >
                       <div className="flex items-center gap-4">
                          <div className={`p-2.5 rounded-xl bg-white text-slate-400 group-hover:scale-110 transition-transform shadow-sm`}>
                             <tool.icon className="w-5 h-5" />
                          </div>
                          <span className="font-bold text-slate-700 group-hover:text-emerald-900 transition-colors">{tool.label}</span>
                       </div>
                       <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all" />
                    </Link>
                 ))}
              </div>
           </div>

           <div className="bg-slate-900 p-8 lg:p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden text-center space-y-6">
              <div className="w-20 h-20 bg-emerald-800 rounded-full flex items-center justify-center mx-auto shadow-xl ring-4 ring-emerald-900/50">
                 <MessageSquare className="w-10 h-10 text-emerald-400" />
              </div>
              <div className="space-y-2">
                 <h4 className="text-xl font-bold">Need Advice?</h4>
                 <p className="text-sm text-slate-400 font-medium leading-relaxed">
                    Chat with <b>Towseef Ahmad</b>, lead SKUAST-K verified consultant.
                 </p>
                 <div className="flex items-center justify-center gap-2 text-emerald-400 font-bold mt-2">
                    <Phone className="w-4 h-4" /> 6006086915
                 </div>
              </div>
              <Link to="/expert" className="block w-full py-4 bg-white text-slate-900 rounded-2xl font-bold shadow-xl hover:bg-emerald-50 transition-all">
                 Ask Expert AI
              </Link>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
