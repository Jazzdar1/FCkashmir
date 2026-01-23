
import React, { useState, useEffect, useRef } from 'react';
import { 
  Cloud, 
  CloudRain, 
  Sun, 
  Snowflake, 
  Wind, 
  Droplets, 
  Search, 
  X, 
  Loader2, 
  Thermometer, 
  MapPin,
  AlertTriangle,
  Zap,
  Info,
  ChevronDown,
  Navigation,
  CloudLightning,
  CloudFog,
  Eye,
  Sprout
} from 'lucide-react';
import { getDistrictWeather } from '../services/gemini';

const districts = [
  "Anantnag", "Bandipora", "Baramulla", "Budgam", "Doda", 
  "Ganderbal", "Jammu", "Kathua", "Kishtwar", "Kulgam", 
  "Kupwara", "Poonch", "Pulwama", "Rajouri", "Ramban", 
  "Reasi", "Samba", "Shopian", "Srinagar", "Udhampur"
];

// High-Fidelity Atmospheric Engine
const AtmosphericEngine: React.FC<{ condition: string }> = ({ condition }) => {
  const cond = condition.toLowerCase();
  const isRain = cond.includes('rain') || cond.includes('drizzle') || cond.includes('shower');
  const isSnow = cond.includes('snow') || cond.includes('sleet') || cond.includes('blizzard');
  const isCloudy = cond.includes('cloud') || cond.includes('overcast') || cond.includes('fog') || cond.includes('mist');
  const isLightning = cond.includes('thunder') || cond.includes('storm');

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[3rem] z-0">
      <div className={`absolute inset-0 transition-colors duration-1000 ${
        isLightning ? 'bg-slate-900/40' : 
        isSnow ? 'bg-blue-100/5' : 
        isRain ? 'bg-slate-800/30' : 
        'bg-transparent'
      }`} />

      {isRain && Array.from({ length: 50 }).map((_, i) => (
        <div 
          key={`rain-${i}`} 
          className="absolute bg-blue-300/30 w-[1px] h-16 animate-rainfall"
          style={{ 
            left: `${Math.random() * 100}%`, 
            top: `-${Math.random() * 20}%`,
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: `${0.3 + Math.random() * 0.4}s`
          }} 
        />
      ))}

      {isSnow && Array.from({ length: 40 }).map((_, i) => (
        <div 
          key={`snow-${i}`} 
          className="absolute bg-white/90 w-2 h-2 rounded-full animate-snowfall blur-[1px]"
          style={{ 
            left: `${Math.random() * 100}%`, 
            top: `-${Math.random() * 20}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${3 + Math.random() * 5}s`,
            opacity: 0.3 + Math.random() * 0.7
          }} 
        />
      ))}

      {isCloudy && (
        <>
          <div className="absolute top-1/3 -left-1/4 w-[150%] h-96 bg-white/5 blur-[120px] animate-fog-drift" />
          <div className="absolute top-2/3 -left-1/4 w-[150%] h-96 bg-slate-200/5 blur-[100px] animate-fog-drift-reverse" />
        </>
      )}

      {isLightning && <div className="absolute inset-0 bg-white/0 animate-lightning-flash" />}

      <style>{`
        @keyframes rainfall {
          0% { transform: translateY(0) rotate(12deg); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(1000px) rotate(12deg); opacity: 0; }
        }
        @keyframes snowfall {
          0% { transform: translateY(0) translateX(0) rotate(0deg); opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { transform: translateY(1000px) translateX(30px) rotate(360deg); opacity: 0; }
        }
        @keyframes fog-drift {
          0% { transform: translateX(-20%); }
          100% { transform: translateX(20%); }
        }
        @keyframes fog-drift-reverse {
          0% { transform: translateX(20%); }
          100% { transform: translateX(-20%); }
        }
        @keyframes lightning-flash {
          0%, 94%, 96%, 100% { background-color: rgba(255, 255, 255, 0); }
          95%, 98% { background-color: rgba(255, 255, 255, 0.4); }
        }
        .animate-rainfall { animation: rainfall linear infinite; }
        .animate-snowfall { animation: snowfall linear infinite; }
        .animate-fog-drift { animation: fog-drift 30s ease-in-out infinite alternate; }
        .animate-fog-drift-reverse { animation: fog-drift-reverse 35s ease-in-out infinite alternate; }
        .animate-lightning-flash { animation: lightning-flash 6s infinite; }
      `}</style>
    </div>
  );
};

const WeatherHub: React.FC = () => {
  const [selectedDistrict, setSelectedDistrict] = useState<string>("Srinagar");
  const [weatherData, setWeatherData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const fetchWeather = async (district: string) => {
    setLoading(true);
    setDropdownOpen(false);
    try {
      const data = await getDistrictWeather(district);
      setWeatherData(data);
    } catch (e) {
      console.error(e);
      setWeatherData({ forecast: "Unable to retrieve weather data." });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(selectedDistrict);
  }, [selectedDistrict]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredDistricts = districts.filter(d => 
    d.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-20 no-scrollbar">
      {/* Hero Header Card - Dark Emerald Background */}
      <div className="relative bg-emerald-900 rounded-[3.5rem] p-8 lg:p-16 text-white overflow-hidden shadow-2xl border border-white/10">
        <AtmosphericEngine condition={weatherData?.condition || 'clear'} />
        
        <div className="relative z-10 flex flex-col lg:flex-row justify-between gap-12">
          <div className="space-y-8 lg:space-y-10 max-w-2xl flex-1">
            {/* District Dropdown Selector */}
            <div className="relative" ref={dropdownRef}>
              <p className="text-[10px] font-black uppercase text-emerald-400 tracking-[0.4em] mb-4 ml-1">J&K District Command Center</p>
              <button 
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center justify-between w-full lg:w-96 bg-white/10 backdrop-blur-2xl border border-white/20 px-6 py-4 lg:px-8 lg:py-5 rounded-[2rem] hover:bg-white/20 transition-all text-left group shadow-xl"
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-emerald-50 rounded-xl">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xl lg:text-2xl font-bold tracking-tight">{selectedDistrict}</span>
                </div>
                <ChevronDown className={`w-6 h-6 text-emerald-400 transition-transform duration-300 ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {dropdownOpen && (
                <div className="absolute top-full left-0 right-0 lg:w-96 mt-4 bg-emerald-950/95 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] shadow-2xl z-50 p-6 animate-in zoom-in-95 duration-200">
                  <div className="relative mb-4">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-400/50" />
                    <input 
                      autoFocus
                      type="text" 
                      placeholder="Search 20 districts..." 
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm outline-none focus:border-emerald-500 transition-colors placeholder-emerald-400/30"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <div className="max-h-80 overflow-y-auto no-scrollbar grid grid-cols-1 gap-1">
                    {filteredDistricts.map(d => (
                      <button 
                        key={d}
                        onClick={() => setSelectedDistrict(d)}
                        className={`w-full text-left px-5 py-4 rounded-2xl text-sm font-bold transition-all flex items-center justify-between group ${
                          selectedDistrict === d ? 'bg-emerald-600 text-white shadow-lg' : 'text-emerald-100/60 hover:bg-white/10 hover:text-white'
                        }`}
                      >
                        {d}
                        {selectedDistrict === d && <div className="w-2 h-2 bg-white rounded-full animate-pulse" />}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {loading ? (
              <div className="flex flex-col gap-6 py-12">
                <div className="w-12 h-12 lg:w-16 lg:h-16 border-4 border-emerald-500/20 border-t-emerald-400 rounded-full animate-spin" />
                <h3 className="text-2xl lg:text-3xl font-bold">Synchronizing...</h3>
              </div>
            ) : (
              <div className="space-y-6 lg:space-y-8 animate-in slide-in-from-left-4 duration-500">
                <div className="flex flex-wrap items-end gap-x-10 gap-y-4">
                  <h3 className="text-7xl sm:text-8xl lg:text-9xl font-black tracking-tighter leading-none">{weatherData?.temperature || '--'}</h3>
                  <div className="pb-2 lg:pb-4">
                    <p className="text-2xl lg:text-3xl font-bold text-emerald-100">{weatherData?.condition || 'Analyzing...'}</p>
                    <div className="flex gap-4 lg:gap-6 mt-2 lg:mt-4">
                      <div className="flex items-center gap-2 text-[10px] lg:text-sm font-black uppercase tracking-widest text-emerald-400">
                        <Droplets className="w-4 h-4" /> {weatherData?.humidity || '--'}
                      </div>
                      <div className="flex items-center gap-2 text-[10px] lg:text-sm font-black uppercase tracking-widest text-emerald-400">
                        <Wind className="w-4 h-4" /> {weatherData?.windSpeed || '--'}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-emerald-800/40 backdrop-blur-xl border border-white/10 p-6 lg:p-10 rounded-[2.5rem] lg:rounded-[3rem] space-y-4 lg:space-y-6 shadow-inner">
                  <div className="flex items-center gap-3 text-emerald-400">
                    <Zap className="w-5 h-5 lg:w-6 lg:h-6 fill-current animate-pulse" />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em]">Agri-Weather Intel</span>
                  </div>
                  <p className="text-lg lg:text-xl font-medium leading-relaxed text-emerald-100/90">
                    {weatherData?.forecast || "Weather overview for the upcoming hours in J&K."}
                  </p>
                  <div className="pt-4 lg:pt-6 border-t border-white/10 flex items-start gap-4">
                    <div className="p-2.5 lg:p-3 bg-emerald-600 rounded-xl lg:rounded-2xl shrink-0">
                      <Sprout className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-[9px] font-black uppercase text-emerald-400 tracking-widest mb-1">Farmer's Guidance</p>
                      <p className="text-base lg:text-lg font-bold text-white leading-tight">{weatherData?.farmerTip || "Check soil drainage and monitor bloom stages."}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="hidden lg:flex flex-col justify-end">
             <div className="bg-emerald-950/50 backdrop-blur-2xl p-10 lg:p-12 rounded-[3.5rem] border border-white/10 space-y-8 lg:space-y-10 min-w-[360px] shadow-2xl">
                <div className="space-y-2">
                  <h4 className="text-2xl font-bold">موسم کی تفصیلات</h4>
                  <p className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest">Local Language Support</p>
                </div>
                <p className="text-2xl lg:text-3xl text-emerald-100 font-medium leading-loose text-right" dir="rtl">
                   {weatherData?.urduSummary || 'موسمی ڈیٹا لوڈ ہو رہا ہے...'}
                </p>
                <div className="pt-6 lg:pt-8 border-t border-white/10">
                   <div className="flex justify-between items-center text-xs lg:text-sm font-bold">
                     <span className="text-emerald-400">Station ID</span>
                     <span>JK-{selectedDistrict.slice(0, 3).toUpperCase()}</span>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* Weather Detail Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {[
          { label: 'Precipitation', value: weatherData?.precipitation || '0%', icon: CloudRain },
          { label: 'Visibility', value: 'Excellent', icon: Eye },
          { label: 'Soil Temp', value: '14°C', icon: Thermometer },
          { label: 'UV Index', value: 'Low', icon: Sun }
        ].map((card, idx) => (
          <div key={idx} className="bg-emerald-900 p-6 lg:p-10 rounded-[2.5rem] lg:rounded-[3rem] border border-white/10 shadow-xl group hover:bg-emerald-800 transition-all text-white border-b-4 border-b-white/5">
            <div className={`w-12 h-12 lg:w-14 lg:h-14 bg-white/10 text-emerald-400 rounded-xl lg:rounded-2xl flex items-center justify-center mb-6 lg:mb-8 group-hover:scale-110 transition-transform shadow-lg`}>
              <card.icon className="w-6 h-6 lg:w-7 lg:h-7" />
            </div>
            <p className="text-[9px] lg:text-[10px] font-black uppercase text-emerald-400 tracking-[0.2em] mb-1 lg:mb-2">{card.label}</p>
            <p className="text-xl lg:text-3xl font-bold tracking-tight">{card.value}</p>
          </div>
        ))}
      </div>

      {/* Regional Forecast Card */}
      <div className="bg-emerald-900 p-8 lg:p-12 rounded-[3.5rem] border border-white/10 shadow-2xl text-white">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 lg:mb-12 gap-4">
          <h3 className="text-2xl lg:text-3xl font-bold flex items-center gap-4">
             <Navigation className="w-6 h-6 lg:w-8 lg:h-8 text-emerald-400" /> J&K Regional Outlook
          </h3>
          <span className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.2em] px-4 py-2 lg:px-6 lg:py-2.5 bg-white/5 rounded-full border border-white/10 self-start sm:self-auto">Interactive Sat-View Hub</span>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6">
          {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map((day, i) => (
            <div key={day} className="bg-white/5 p-6 lg:p-8 rounded-[2.5rem] border border-white/5 text-center space-y-4 lg:space-y-6 hover:bg-white/10 transition-all hover:-translate-y-2 cursor-pointer shadow-lg">
               <p className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400">{day}</p>
               {i % 2 === 0 ? <Sun className="w-8 h-8 lg:w-10 lg:h-10 mx-auto text-amber-400 drop-shadow-lg" /> : <CloudRain className="w-8 h-8 lg:w-10 lg:h-10 mx-auto text-blue-400 drop-shadow-lg" />}
               <div>
                  <p className="text-2xl lg:text-3xl font-black">{12 + i}°C</p>
                  <p className="text-[9px] lg:text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">H: {15+i}° L: {6+i}°</p>
               </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeatherHub;
