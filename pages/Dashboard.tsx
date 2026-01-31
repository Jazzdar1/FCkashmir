
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
  Phone,
  AlertCircle,
  MessageCircle,
  Megaphone,
  BellRing,
  ShieldCheck,
  Stethoscope,
  ArrowUpRight,
  CheckCircle2,
  Mic
} from 'lucide-react';
// Fix: Use a more robust import pattern for react-router-dom to handle environment-specific export issues
import * as ReactRouterDOM from 'react-router-dom';
const { Link, useNavigate } = ReactRouterDOM as any;
import { getDistrictWeather } from '../services/gemini';

const districts = ["Srinagar", "Jammu", "Anantnag", "Baramulla", "Budgam", "Pulwama", "Kupwara", "Shopian", "Ganderbal", "Kulgam"];

const Dashboard: React.FC<{ isHighContrast?: boolean }> = ({ isHighContrast }) => {
  const [weatherData, setWeatherData] = useState<any>(null);
  const [selectedWeatherDistrict, setSelectedWeatherDistrict] = useState<string>('Srinagar');
  const [loadingWeather, setLoadingWeather] = useState(false);
  const [missingDays, setMissingDays] = useState<number | null>(null);
  const [broadcasts, setBroadcasts] = useState<any[]>([]);
  const [isListening, setIsListening] = useState(false);
  const navigate = useNavigate();

  const farmerProfile = JSON.parse(localStorage.getItem('fck_farmer_profile') || 'null');

  useEffect(() => {
    // Load Admin Broadcasts
    const saved = localStorage.getItem('fck_broadcasts');
    if (saved) setBroadcasts(JSON.parse(saved));

    // Calculate missing sprays based on logs
    const logs = JSON.parse(localStorage.getItem('fck_pesticide_logs') || '[]');
    if (logs.length > 0) {
      const last = logs[0];
      const gap = last.type === 'Contact' ? 8 : last.type === 'Systemic' ? 10 : 12;
      const nextDate = new Date(last.date);
      nextDate.setDate(nextDate.getDate() + gap);
      const diff = Math.ceil((new Date().getTime() - nextDate.getTime()) / (1000 * 60 * 60 * 24));
      if (diff > 0) setMissingDays(diff);
    }
  }, []);

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

  const toggleVoiceCommand = () => {
    if (isListening) {
      setIsListening(false);
      return;
    }

    setIsListening(true);
    // Simple Web Speech API Implementation for Command Navigation
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-US';
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript.toLowerCase();
        console.log("Voice Command:", transcript);
        
        if (transcript.includes('market') || transcript.includes('price') || transcript.includes('mandi')) {
          navigate('/market');
        } else if (transcript.includes('weather') || transcript.includes('rain')) {
          navigate('/weather');
        } else if (transcript.includes('scan') || transcript.includes('disease') || transcript.includes('photo')) {
          navigate('/fck-scanner');
        } else if (transcript.includes('spray') || transcript.includes('tracker')) {
          navigate('/spray-track');
        } else if (transcript.includes('expert') || transcript.includes('chat')) {
          navigate('/expert');
        }
        setIsListening(false);
      };

      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);
      recognition.start();
    } else {
      alert("Voice control not supported in this browser.");
      setIsListening(false);
    }
  };

  return (
    <div className="space-y-8 lg:space-y-12 animate-in fade-in duration-700 pb-20 no-scrollbar relative">
      
      {/* Voice Command Button */}
      <button 
        onClick={toggleVoiceCommand}
        className={`fixed bottom-24 right-6 z-50 w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-all ${
          isListening ? 'bg-rose-600 animate-pulse ring-4 ring-rose-300' : 'bg-emerald-900 hover:bg-emerald-800'
        }`}
      >
        <Mic className="w-8 h-8 text-white" />
      </button>

      {/* Official Admin Broadcast HUD */}
      {broadcasts.length > 0 && (
        <div className="bg-emerald-950 rounded-[2.5rem] p-8 text-white relative overflow-hidden border border-emerald-800 shadow-2xl animate-in slide-in-from-top-10 ring-4 ring-emerald-500/10">
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-inner ${
                broadcasts[0].type === 'Weather' ? 'bg-blue-600 text-white' : 
                broadcasts[0].type === 'Mandi' ? 'bg-amber-600 text-white' : 'bg-emerald-800 text-emerald-400'
              }`}>
                {broadcasts[0].type === 'Weather' ? <CloudSun className="w-8 h-8 animate-pulse" /> : 
                 broadcasts[0].type === 'Mandi' ? <TrendingUp className="w-8 h-8" /> : <BellRing className="w-8 h-8 animate-pulse" />}
              </div>
              <div>
                <div className="flex items-center gap-2">
                   <span className="bg-emerald-800 text-emerald-400 text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full border border-emerald-700">Official {broadcasts[0].type} Alert</span>
                   {broadcasts[0].priority === 'High' && <span className="text-rose-400 font-black uppercase text-[8px] animate-pulse">Critical</span>}
                </div>
                <h3 className="text-xl lg:text-2xl font-bold font-heading mt-2 leading-tight">{broadcasts[0].message}</h3>
                <p className="text-emerald-100/50 text-[10px] font-bold uppercase tracking-widest mt-1">Region: {broadcasts[0].region} • Issued: {broadcasts[0].date}</p>
              </div>
            </div>
            <div className="flex gap-3 w-full md:w-auto">
               <Link to="/knowledge" className="flex-1 text-center bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-3.5 rounded-xl font-bold shadow-xl transition-all flex items-center justify-center gap-2 whitespace-nowrap">
                 Details <ChevronRight className="w-4 h-4" />
               </Link>
            </div>
          </div>
          <Megaphone className="absolute -bottom-10 -right-10 w-48 h-48 text-white opacity-5 pointer-events-none" />
        </div>
      )}

      {/* Missing Spray Alarm */}
      {missingDays && (
        <div className="bg-rose-600 rounded-[3rem] p-8 text-white flex flex-col md:flex-row items-center justify-between gap-10 shadow-[0_20px_50px_rgba(225,29,72,0.3)] border-2 border-rose-400/30">
           <div className="flex items-center gap-8">
              <div className="w-20 h-20 bg-white/10 rounded-[2rem] flex items-center justify-center backdrop-blur-md border border-white/20 shadow-2xl">
                <AlertCircle className="w-12 h-12 text-white" />
              </div>
              <div>
                <h3 className="text-2xl lg:text-3xl font-black font-heading tracking-tight">Urgent: Spray Missed</h3>
                <p className="text-rose-100 text-base font-bold uppercase tracking-widest mt-2">Protocol Window: {missingDays} Days Overdue</p>
              </div>
           </div>
           <Link to="/spray-track" className="bg-white text-rose-600 px-10 py-4 rounded-2xl font-black text-lg shadow-2xl active:scale-95 transition-all">FIX LOGS NOW</Link>
        </div>
      )}

      {/* Hero Welcome with Farmer Data */}
      <div className="relative bg-emerald-900 rounded-[4rem] p-10 lg:p-24 text-white overflow-hidden shadow-2xl border border-white/10 group">
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 lg:space-y-10 text-center lg:text-left">
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/20">
              <div className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-widest text-emerald-100">Farmer'sCorner Kashmir Cloud Hub</span>
            </div>
            <h2 className="text-5xl sm:text-7xl lg:text-9xl font-heading font-bold leading-[0.8] tracking-tighter">
              As-Salamu <br/>
              <span className="text-emerald-400 drop-shadow-xl">{farmerProfile ? farmerProfile.name : 'Alaykum.'}</span>
            </h2>
            <p className="text-xl lg:text-2xl text-emerald-100/70 font-medium leading-relaxed max-w-xl mx-auto lg:mx-0">
               {farmerProfile ? `Welcome back to ${farmerProfile.orchardName}. Your Sonth (Spring) cycle is ${missingDays ? 'interrupted' : 'on track'}.` : 'The ultimate digital command center for the Kashmiri orchardist.'}
            </p>
            <div className="flex flex-wrap justify-center lg:justify-start gap-5 pt-5">
              <Link 
                to="/fck-scanner" 
                className="bg-white text-emerald-900 px-10 lg:px-12 py-5 lg:py-6 rounded-[2.5rem] font-black text-xl shadow-[0_0_50px_rgba(255,255,255,0.2)] hover:bg-emerald-50 transition-all flex items-center gap-5 group ring-8 ring-emerald-500/10 active:scale-95"
              >
                <ScanEye className="w-8 h-8 text-emerald-600 animate-pulse" /> Launch Scanner Pro
              </Link>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
             <Link to="/market" className="bg-white/10 backdrop-blur-xl p-10 rounded-[3.5rem] border border-white/10 shadow-2xl space-y-4 hover:bg-white/20 transition-all">
                <div className="flex justify-between items-start">
                  <p className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Market Arbitrage</p>
                  <ArrowUpRight className="w-4 h-4 text-emerald-400" />
                </div>
                <p className="text-3xl font-black text-white">₹1,250</p>
                <p className="text-[10px] font-bold text-emerald-300 uppercase leading-relaxed">Sopore rate is currently 8% higher than Parimpora</p>
             </Link>
             <div className="bg-white/10 backdrop-blur-xl p-10 rounded-[3.5rem] border border-white/10 shadow-2xl space-y-4">
                <p className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Valley Visibility</p>
                <p className="text-3xl font-black">Clear Sky</p>
                <p className="text-[10px] font-bold text-emerald-300 uppercase leading-relaxed">Perfect window for Contact Sprays (Mancozeb)</p>
             </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-emerald-500/5 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 space-y-10">
           <div className="bg-emerald-900 p-10 lg:p-14 rounded-[4rem] border border-white/10 shadow-2xl text-white relative overflow-hidden">
              <div className="flex flex-col md:flex-row justify-between gap-12 relative z-10">
                 <div className="space-y-10 flex-1">
                    <div className="flex items-center gap-5">
                       <div className="p-5 bg-emerald-800 rounded-[2rem] text-emerald-400 shadow-inner">
                          <CloudSun className="w-10 h-10" />
                       </div>
                       <div>
                          <h3 className="text-4xl font-bold tracking-tight">{selectedWeatherDistrict} Climate</h3>
                          <p className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.3em]">Real-time Satellite Sync</p>
                       </div>
                    </div>
                    <div className="flex flex-wrap items-end gap-x-12 gap-y-6">
                       <h3 className="text-8xl sm:text-9xl lg:text-[10rem] font-black tracking-tighter leading-none">{weatherData?.temperature || '14°C'}</h3>
                       <div className="pb-8">
                          <p className="text-3xl lg:text-4xl font-bold text-emerald-100">{weatherData?.condition || 'Fair'}</p>
                          <div className="flex gap-8 mt-6">
                             <span className="flex items-center gap-3 text-xs lg:text-base font-black uppercase tracking-widest text-emerald-400">
                                <Droplets className="w-5 h-5" /> {weatherData?.humidity || '45%'}
                             </span>
                             <span className="flex items-center gap-3 text-xs lg:text-base font-black uppercase tracking-widest text-emerald-400">
                                <Wind className="w-5 h-5" /> {weatherData?.windSpeed || '8kph'}
                             </span>
                          </div>
                       </div>
                    </div>
                 </div>
                 <div className="w-full md:w-72 space-y-5">
                    <p className="text-[10px] font-black uppercase text-emerald-400 tracking-[0.4em] text-center">District Selection</p>
                    <div className="grid grid-cols-2 gap-3">
                       {districts.slice(0, 4).map(d => (
                          <button key={d} onClick={() => setSelectedWeatherDistrict(d)} className={`px-4 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest border-2 transition-all ${selectedWeatherDistrict === d ? 'bg-white text-emerald-900 border-white shadow-2xl scale-105' : 'bg-emerald-800/50 text-emerald-100 border-white/5 hover:border-emerald-400'}`}>
                             {d}
                          </button>
                       ))}
                    </div>
                 </div>
              </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Link to="/livestock" className="bg-white p-12 rounded-[4rem] border border-slate-100 shadow-sm hover:shadow-2xl transition-all group overflow-hidden relative text-left">
                 <div className="relative z-10 space-y-8">
                    <div className="w-20 h-20 bg-emerald-50 rounded-[2rem] flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform shadow-inner">
                       <Rabbit className="w-10 h-10" />
                    </div>
                    <div>
                       <h4 className="text-3xl font-bold text-slate-900 tracking-tight">Livestock AI</h4>
                       <p className="text-base text-slate-500 font-medium leading-relaxed mt-3">Advanced veterinary intelligence for the valley's cattle and sheep flocks.</p>
                    </div>
                 </div>
                 <Rabbit className="absolute -bottom-10 -right-10 w-48 h-48 text-emerald-50 opacity-10 group-hover:opacity-20 transition-opacity" />
              </Link>
              <Link to="/harvest" className="bg-white p-12 rounded-[4rem] border border-slate-100 shadow-sm hover:shadow-2xl transition-all group overflow-hidden relative text-left">
                 <div className="relative z-10 space-y-8">
                    <div className="w-20 h-20 bg-blue-50 rounded-[2rem] flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform shadow-inner">
                       <Target className="w-10 h-10" />
                    </div>
                    <div>
                       <h4 className="text-3xl font-bold text-slate-900 tracking-tight">Yield Predictor</h4>
                       <p className="text-base text-slate-500 font-medium leading-relaxed mt-3">Harvest revenue projection based on soil quality, land size, and age.</p>
                    </div>
                 </div>
                 <Target className="absolute -bottom-10 -right-10 w-48 h-48 text-blue-50 opacity-10 group-hover:opacity-20 transition-opacity" />
              </Link>
           </div>
        </div>

        <div className="lg:col-span-4 space-y-10">
           <div className="bg-white p-10 lg:p-12 rounded-[3.5rem] border border-slate-100 shadow-sm space-y-8">
              <div className="flex items-center justify-between">
                <h4 className="text-xl font-bold flex items-center gap-4 text-slate-900">
                   <Phone className="w-6 h-6 text-emerald-600" /> Regional Support
                </h4>
                <ShieldCheck className="w-6 h-6 text-emerald-500/20" />
              </div>
              <div className="space-y-5">
                 <div className="bg-slate-50 p-6 rounded-[2.5rem] border border-transparent hover:border-emerald-100 transition-all group">
                    <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-1">Chief Consultant (SKUAST-K)</p>
                    <p className="text-lg font-bold text-slate-800">Towseef Ahmad</p>
                    <div className="flex items-center gap-4 mt-4">
                       <a href="tel:6006086915" className="flex-1 bg-white border border-slate-200 text-slate-700 py-3 rounded-xl text-xs font-bold text-center hover:bg-emerald-600 hover:text-white transition-all">Call</a>
                       <a href="https://wa.me/916006086915" className="flex-1 bg-emerald-600 text-white py-3 rounded-xl text-xs font-bold text-center hover:bg-emerald-700 transition-all flex items-center justify-center gap-2">
                          <MessageCircle className="w-3 h-3" /> WhatsApp
                       </a>
                    </div>
                 </div>
                 <div className="bg-slate-50 p-6 rounded-[2.5rem] border border-transparent hover:border-blue-100 transition-all group">
                    <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-1">Horticulture Helpdesk</p>
                    <p className="text-lg font-bold text-slate-800">District Office</p>
                    <a href="tel:01942461271" className="text-sm font-bold text-blue-700 flex items-center gap-2 mt-2 hover:underline">
                      <Activity className="w-4 h-4" /> 0194-2461271
                    </a>
                 </div>
              </div>
           </div>

           {/* 8-Stage Tracker Widget */}
           <div className="bg-emerald-950 p-10 lg:p-12 rounded-[4rem] text-white shadow-2xl relative overflow-hidden group border border-emerald-800">
              <div className="relative z-10 space-y-6">
                 <div className="flex items-center justify-between">
                    <div className="w-14 h-14 bg-emerald-800 rounded-[1.5rem] flex items-center justify-center shadow-2xl group-hover:rotate-12 transition-transform">
                       <Syringe className="w-6 h-6 text-emerald-400" />
                    </div>
                    <span className="text-[10px] font-black uppercase bg-emerald-900 border border-emerald-800 px-3 py-1 rounded-full text-emerald-400">8-Stage Protocol</span>
                 </div>
                 
                 <div>
                    <h4 className="text-2xl font-bold tracking-tight">Stage 3: Pink Bud</h4>
                    <p className="text-[10px] font-black uppercase text-emerald-400 tracking-[0.2em] mt-2">Recommended: Mancozeb / Zineb</p>
                    <p className="text-sm text-emerald-200/60 font-medium mt-3 leading-relaxed">Critical pre-bloom fungicide application to prevent early scab infection.</p>
                 </div>

                 <Link to="/spray-track" className="w-full py-5 bg-emerald-600 text-white rounded-[2rem] font-bold flex items-center justify-center gap-3 hover:bg-emerald-50 transition-all text-sm shadow-xl active:scale-[0.98]">
                    Open Protocol Tracker <ChevronRight className="w-4 h-4" />
                 </Link>
              </div>
              <Activity className="absolute -bottom-10 -right-10 w-48 h-48 text-white opacity-5 pointer-events-none" />
           </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
