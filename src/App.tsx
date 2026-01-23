
import React, { useState, useEffect, useMemo } from 'react';
import { HashRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Menu, 
  X, 
  CloudSun,
  Store,
  MessageCircle,
  Zap,
  BookOpen,
  Warehouse,
  MapPin,
  Sun,
  Moon,
  Key,
  ChevronRight,
  Rabbit,
  TrendingUp,
  Syringe,
  ScanEye,
  Settings,
  Leaf,
  CloudRain,
  Snowflake,
  Wind
} from 'lucide-react';
import Dashboard from './pages/Dashboard';
import ExpertChat from './pages/ExpertChat';
import KnowledgeHub from './pages/KnowledgeHub';
import Admin from './pages/Admin';
import WeatherHub from './pages/WeatherHub';
import FarmingCalendar from './pages/FarmingCalendar';
import SoilHealth from './pages/SoilHealth';
import ProfitCalculator from './pages/ProfitCalculator';
import SubsidyTracker from './pages/SubsidyTracker';
import MandiAnalytics from './pages/MandiAnalytics';
import DosageCalculator from './pages/DosageCalculator';
import SmartDiagnose from './pages/SmartDiagnose';
import CAStorageHub from './pages/CAStorageHub';
import DealerLocator from './pages/DealerLocator';
import GradingGuide from './pages/GradingGuide';
import MarketPrices from './pages/MarketPrices';
import DiseaseDetection from './pages/DiseaseDetection';
import LivestockAI from './pages/LivestockAI';
import SmartHarvest from './pages/SmartHarvest';
import SprayTracker from './pages/SprayTracker';
import LiveLens from './pages/LiveLens';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfUse from './pages/TermsOfUse';
import RotatingLogo from './components/RotatingLogo';
import Footer from './components/Footer';
import DigitalClock from './components/DigitalClock';
import { TopTicker } from './components/NewsTicker';
import { getDistrictWeather } from './services/gemini';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
};

type ThemeMode = 'standard' | 'green' | 'high-contrast';
type WeatherState = 'sunny' | 'rainy' | 'snowy' | 'foggy';

const WALLPAPERS = {
  sunny: [
    "https://images.unsplash.com/photo-1598305072044-67f085817ba6?q=80&w=1920",
    "https://images.unsplash.com/photo-1566833912232-45ecc8993881?q=80&w=1920"
  ],
  rainy: [
    "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?q=80&w=1920",
    "https://images.unsplash.com/photo-1587570441501-bc8499991be6?q=80&w=1920"
  ],
  snowy: [
    "https://images.unsplash.com/photo-1588636551800-410a56241285?q=80&w=1920",
    "https://images.unsplash.com/photo-1516253593875-bd7ba052fbc5?q=80&w=1920"
  ],
  foggy: [
    "https://images.unsplash.com/photo-1594411132227-2c5e53e41427?q=80&w=1920",
    "https://images.unsplash.com/photo-1621370535237-7798365287f3?q=80&w=1920"
  ]
};

const AtmosphericEngine: React.FC<{ weather: WeatherState }> = ({ weather }) => {
  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {weather === 'rainy' && Array.from({ length: 40 }).map((_, i) => (
        <div 
          key={`rain-${i}`} 
          className="absolute bg-blue-300/30 w-[1px] h-20 animate-rainfall"
          style={{ 
            left: `${Math.random() * 100}%`, 
            top: `-${Math.random() * 20}%`,
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: `${0.4 + Math.random() * 0.3}s`
          }} 
        />
      ))}

      {weather === 'snowy' && Array.from({ length: 50 }).map((_, i) => (
        <div 
          key={`snow-${i}`} 
          className="absolute bg-white/80 w-2 h-2 rounded-full animate-snowfall blur-[1px]"
          style={{ 
            left: `${Math.random() * 100}%`, 
            top: `-${Math.random() * 20}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${3 + Math.random() * 5}s`,
            opacity: 0.2 + Math.random() * 0.6
          }} 
        />
      ))}

      {weather === 'foggy' && (
        <>
          <div className="absolute top-0 left-0 w-[200%] h-full bg-white/5 blur-[120px] animate-fog-drift" />
          <div className="absolute bottom-0 right-0 w-[200%] h-full bg-slate-200/5 blur-[100px] animate-fog-drift-reverse" />
        </>
      )}

      {weather === 'sunny' && (
        <div className="absolute -top-20 -right-20 w-[600px] h-[600px] bg-amber-400/5 rounded-full blur-[150px] animate-sun-pulse" />
      )}

      <style>{`
        @keyframes rainfall { 0% { transform: translateY(0) rotate(10deg); opacity: 0; } 50% { opacity: 0.8; } 100% { transform: translateY(120vh) rotate(10deg); opacity: 0; } }
        @keyframes snowfall { 0% { transform: translateY(0) translateX(0) rotate(0deg); opacity: 0; } 20% { opacity: 1; } 100% { transform: translateY(110vh) translateX(40px) rotate(360deg); opacity: 0; } }
        @keyframes fog-drift { 0% { transform: translateX(-30%); } 100% { transform: translateX(10%); } }
        @keyframes fog-drift-reverse { 0% { transform: translateX(10%); } 100% { transform: translateX(-30%); } }
        @keyframes sun-pulse { 0%, 100% { transform: scale(1); opacity: 0.5; } 50% { transform: scale(1.1); opacity: 0.8; } }
        .animate-rainfall { animation: rainfall linear infinite; }
        .animate-snowfall { animation: snowfall linear infinite; }
        .animate-fog-drift { animation: fog-drift 40s ease-in-out infinite alternate; }
        .animate-fog-drift-reverse { animation: fog-drift-reverse 45s ease-in-out infinite alternate; }
        .animate-sun-pulse { animation: sun-pulse 10s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

const BackgroundSlider = ({ weather }: { weather: WeatherState }) => {
  const [index, setIndex] = useState(0);
  const wallpapers = WALLPAPERS[weather];

  useEffect(() => {
    setIndex(0);
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % wallpapers.length);
    }, 15000);
    return () => clearInterval(interval);
  }, [weather, wallpapers.length]);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {wallpapers.map((url, i) => (
        <div
          key={url}
          className={`absolute inset-0 transition-opacity duration-[4000ms] ease-in-out ${
            i === index ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
          }`}
          style={{
            backgroundImage: `url(${url})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.7) contrast(1.1)',
          }}
        />
      ))}
      <div className="absolute inset-0 bg-slate-900/40" />
    </div>
  );
};

const SidebarNavigation = ({ theme, setTheme }: { theme: ThemeMode, setTheme: (t: ThemeMode) => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isHighContrast = theme === 'high-contrast';
  const isGreenTheme = theme === 'green';

  const navItems = [
    { path: '/', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/fck-scanner', label: 'FCK Scanner', icon: ScanEye, isNew: true },
    { path: '/livestock', label: 'Livestock AI', icon: Rabbit },
    { path: '/harvest', label: 'Yield Predictor', icon: TrendingUp },
    { path: '/spray-track', label: 'Spray Tracker', icon: Syringe },
    { path: '/weather', label: 'Weather Hub', icon: CloudSun },
    { path: '/market', label: 'Market Prices', icon: Store },
    { path: '/expert', label: 'Ask Expert', icon: MessageCircle },
    { path: '/knowledge', label: 'Resources', icon: BookOpen },
    { path: '/dealers', label: 'Dealer Map', icon: MapPin },
  ];

  const cycleTheme = () => {
    const modes: ThemeMode[] = ['standard', 'green', 'high-contrast'];
    setTheme(modes[(modes.indexOf(theme) + 1) % modes.length]);
  };

  return (
    <>
      <div className={`lg:hidden fixed top-0 left-0 right-0 z-[120] p-4 flex items-center justify-between shadow-md ${
        isHighContrast ? 'bg-black text-yellow-400' : 'bg-emerald-900/90 backdrop-blur-md text-white'
      }`}>
        <div className="flex items-center gap-3">
          <RotatingLogo size="sm" />
          <div className="flex flex-col">
            <span className="font-heading font-bold text-sm tracking-tight leading-none">Farmer's Corner</span>
            <span className="text-[8px] font-bold uppercase tracking-widest text-emerald-400 mt-0.5">Kashmir Hub</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <DigitalClock compact />
          <button onClick={() => setIsOpen(!isOpen)} className="p-2 rounded-full bg-white/10">
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <nav className={`
        fixed inset-y-0 left-0 z-[110] w-72 transform transition-transform duration-300 ease-in-out
        lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        ${isHighContrast ? 'bg-black border-r border-yellow-400' : isGreenTheme ? 'bg-emerald-950/95 backdrop-blur-xl border-r border-emerald-800' : 'bg-white/95 backdrop-blur-xl border-r border-slate-200'}
      `}>
        <div className="h-full flex flex-col p-8 overflow-y-auto no-scrollbar pb-20 pt-10">
          <div className="flex flex-col gap-6 mb-10">
            <div className="flex items-center gap-4">
              <RotatingLogo />
              <div>
                <h1 className={`font-heading font-bold text-xl leading-none ${isHighContrast ? 'text-yellow-400' : isGreenTheme ? 'text-emerald-50' : 'text-slate-900'}`}>Farmer's Corner</h1>
                <p className={`text-[10px] font-bold uppercase tracking-widest mt-1 ${isHighContrast ? 'text-yellow-500' : isGreenTheme ? 'text-emerald-600' : 'text-slate-500'}`}>Kashmir Division</p>
              </div>
            </div>
            <div className="animate-in slide-in-from-left duration-700">
              <DigitalClock />
            </div>
          </div>

          <div className="flex-1 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center justify-between px-5 py-3.5 rounded-2xl transition-all duration-200 group ${
                    isActive 
                      ? (isHighContrast ? 'bg-yellow-400 text-black' : isGreenTheme ? 'bg-emerald-600 text-white shadow-xl' : 'bg-emerald-900 text-white shadow-xl') 
                      : (isHighContrast ? 'text-yellow-500 hover:bg-yellow-400/10' : isGreenTheme ? 'text-emerald-400 hover:bg-emerald-900/50' : 'text-slate-500 hover:bg-emerald-50')
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <Icon className={`w-5 h-5 transition-transform group-hover:scale-110`} />
                    <span className="font-semibold tracking-tight">{item.label}</span>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="mt-auto pt-8">
            <button onClick={cycleTheme} className={`w-full flex items-center justify-center gap-3 py-4 rounded-2xl font-bold text-xs uppercase tracking-widest transition-all ${isHighContrast ? 'bg-yellow-400 text-black' : isGreenTheme ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
              {theme === 'standard' ? <Sun className="w-4 h-4" /> : theme === 'green' ? <Leaf className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              Cycle Display
            </button>
          </div>
        </div>
      </nav>
      {isOpen && <div className="fixed inset-0 bg-slate-900/40 z-[105] lg:hidden backdrop-blur-sm" onClick={() => setIsOpen(false)} />}
    </>
  );
};

export default function App() {
  const [theme, setTheme] = useState<ThemeMode>((localStorage.getItem('fck_theme') as ThemeMode) || 'standard');
  const [weather, setWeather] = useState<WeatherState>('sunny');
  const [hasKey, setHasKey] = useState<boolean | null>(null);

  useEffect(() => {
    localStorage.setItem('fck_theme', theme);
  }, [theme]);

  useEffect(() => {
    const initWeather = async () => {
      try {
        const data = await getDistrictWeather('Srinagar');
        const cond = data.condition.toLowerCase();
        if (cond.includes('rain') || cond.includes('drizzle')) setWeather('rainy');
        else if (cond.includes('snow')) setWeather('snowy');
        else if (cond.includes('cloud') || cond.includes('overcast') || cond.includes('fog')) setWeather('foggy');
        else setWeather('sunny');
      } catch (e) {
        setWeather('sunny');
      }
    };
    initWeather();
    
    const checkKey = async () => {
      if (window.aistudio?.hasSelectedApiKey) setHasKey(await window.aistudio.hasSelectedApiKey());
      else setHasKey(true);
    };
    checkKey();
  }, []);

  const handleOpenKeySelector = async () => {
    if (window.aistudio?.openSelectKey) {
      await window.aistudio.openSelectKey();
      setHasKey(true);
    }
  };

  const isHighContrast = theme === 'high-contrast';
  const isGreenTheme = theme === 'green';

  if (hasKey === false) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 text-center">
        <BackgroundSlider weather={weather} />
        <div className="max-w-md w-full space-y-8 animate-in zoom-in-95 duration-700 relative z-10">
           <div className="w-24 h-24 bg-emerald-900/90 backdrop-blur-xl rounded-[2.5rem] flex items-center justify-center mx-auto shadow-2xl border border-emerald-500/30">
             <Key className="w-10 h-10 text-emerald-400" />
           </div>
           <h1 className="text-4xl font-heading font-bold text-white tracking-tight">Farmer's Corner Kashmir</h1>
           <button onClick={handleOpenKeySelector} className="w-full bg-emerald-600 text-white py-5 rounded-[2rem] font-bold text-lg shadow-xl flex items-center justify-center gap-3">
             Launch Hub <ChevronRight className="w-5 h-5" />
           </button>
        </div>
      </div>
    );
  }

  return (
    <HashRouter>
      <ScrollToTop />
      <div className={`min-h-screen flex flex-col lg:flex-row overflow-x-hidden relative transition-colors duration-500 ${isHighContrast ? 'bg-black text-yellow-400' : isGreenTheme ? 'bg-emerald-950/20 text-emerald-950' : 'bg-slate-100/10 text-slate-900'}`}>
        <BackgroundSlider weather={weather} />
        <AtmosphericEngine weather={weather} />

        <TopTicker />
        <SidebarNavigation theme={theme} setTheme={setTheme} />
        
        <div className="flex-1 flex flex-col lg:ml-72 relative z-20">
          <main className={`flex-1 p-4 lg:p-12 pb-48 pt-16 lg:pt-20 backdrop-blur-[2px] transition-all duration-1000 ${isHighContrast ? 'backdrop-blur-none' : isGreenTheme ? 'bg-emerald-50/70' : 'bg-white/70'}`}>
            <div className="max-w-7xl mx-auto">
              <Routes>
                <Route path="/" element={<Dashboard isHighContrast={isHighContrast} />} />
                <Route path="/fck-scanner" element={<SmartDiagnose />} />
                <Route path="/live-assist" element={<LiveLens />} />
                <Route path="/livestock" element={<LivestockAI />} />
                <Route path="/harvest" element={<SmartHarvest />} />
                <Route path="/spray-track" element={<SprayTracker />} />
                <Route path="/ca-storage" element={<CAStorageHub />} />
                <Route path="/dealers" element={<DealerLocator />} />
                <Route path="/grading" element={<GradingGuide />} />
                <Route path="/weather" element={<WeatherHub />} />
                <Route path="/calendar" element={<FarmingCalendar />} />
                <Route path="/soil" element={<SoilHealth />} />
                <Route path="/dosage" element={<DosageCalculator />} />
                <Route path="/mandi-stats" element={<MandiAnalytics />} />
                <Route path="/profit-calc" element={<ProfitCalculator />} />
                <Route path="/subsidies" element={<SubsidyTracker />} />
                <Route path="/disease" element={<DiseaseDetection />} />
                <Route path="/market" element={<MarketPrices />} />
                <Route path="/expert" element={<ExpertChat />} />
                <Route path="/knowledge" element={<KnowledgeHub />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/privacy" element={<PrivacyPolicy />} />
                <Route path="/terms" element={<TermsOfUse />} />
              </Routes>
            </div>
          </main>
          <Footer />
        </div>

        <style>{`
          ${isHighContrast ? `
            body, .bg-white, .bg-emerald-900, .bg-slate-900, .bg-slate-50, .bg-emerald-50, .bg-blue-50, .bg-rose-50, .bg-amber-50 { background-color: #000 !important; color: #fbbf24 !important; border-color: #fbbf24 !important; backdrop-filter: none !important; }
            .text-slate-900, .text-slate-700, .text-slate-600, .text-slate-500, .text-emerald-900, .text-emerald-700, .text-white { color: #fbbf24 !important; }
            button, a, input, select, textarea { border: 1px solid #fbbf24 !important; background-color: #000 !important; color: #fbbf24 !important; }
            svg { stroke: #fbbf24 !important; }
          ` : isGreenTheme ? `
            body { background-color: #064e3b !important; color: #ecfdf5 !important; }
            .bg-white { background-color: rgba(236, 253, 245, 0.9) !important; border-color: #a7f3d0 !important; backdrop-filter: blur(12px); }
            button:not(.bg-emerald-600) { background-color: #064e3b !important; color: white !important; }
          ` : `
            main { backdrop-filter: blur(4px); }
            .bg-white { background-color: rgba(255, 255, 255, 0.8) !important; backdrop-filter: blur(12px); border-color: rgba(0,0,0,0.05); }
          `}
        `}</style>
      </div>
    </HashRouter>
  );
}
