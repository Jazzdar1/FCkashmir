
import React, { useState, useEffect, useMemo } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
const { HashRouter, Routes, Route, Link, useLocation } = ReactRouterDOM as any;
import { 
  LayoutDashboard, Menu, X, CloudSun, Store, MessageCircle, Zap, BookOpen, 
  Warehouse, MapPin, Sun, Moon, Key, ChevronRight, Rabbit, TrendingUp, 
  Syringe, ScanEye, Settings, Leaf, User, Bell, Landmark, Award, 
  FlaskConical, BarChart3, Microscope, ShieldCheck, Clock, Users
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
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfUse from './pages/TermsOfUse';
import FarmerLogin from './pages/FarmerLogin';
import CommunityForum from './pages/CommunityForum';
import RotatingLogo from './components/RotatingLogo';
import Footer from './components/Footer';
import DigitalClock from './components/DigitalClock';
import { TopTicker } from './components/NewsTicker';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};

type ThemeMode = 'standard' | 'green' | 'high-contrast';
type WeatherState = 'sunny' | 'rainy' | 'snowy' | 'foggy';

const WALLPAPERS = {
  sunny: ["https://images.unsplash.com/photo-1598305072044-67f085817ba6?q=80&w=1920"],
  rainy: ["https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?q=80&w=1920"],
  snowy: ["https://images.unsplash.com/photo-1588636551800-410a56241285?q=80&w=1920"],
  foggy: ["https://images.unsplash.com/photo-1594411132227-2c5e53e41427?q=80&w=1920"]
};

export default function App() {
  const [theme, setTheme] = useState<ThemeMode>((localStorage.getItem('fck_theme') as ThemeMode) || 'standard');
  const [weather, setWeather] = useState<WeatherState>('sunny');
  const [hasKey, setHasKey] = useState<boolean | null>(null);

  useEffect(() => {
    const checkKey = async () => {
      if (window.aistudio?.hasSelectedApiKey) setHasKey(await window.aistudio.hasSelectedApiKey());
      else setHasKey(true);
    };
    checkKey();
    localStorage.setItem('fck_theme', theme);
  }, [theme]);

  const handleOpenKeySelector = async () => {
    if (window.aistudio?.openSelectKey) { await window.aistudio.openSelectKey(); setHasKey(true); }
  };

  const isHighContrast = theme === 'high-contrast';
  const isGreenTheme = theme === 'green';

  if (hasKey === false) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 text-center">
        <div className="max-w-md w-full space-y-8 animate-in zoom-in-95">
           <div className="w-24 h-24 bg-emerald-900 rounded-[2.5rem] flex items-center justify-center mx-auto shadow-2xl border border-emerald-500/30">
             <Key className="w-10 h-10 text-emerald-400" />
           </div>
           <h1 className="text-4xl font-heading font-bold text-white">Farmer's Corner Kashmir</h1>
           <button onClick={handleOpenKeySelector} className="w-full bg-emerald-600 text-white py-5 rounded-[2rem] font-bold text-lg shadow-xl flex items-center justify-center gap-3">
             Launch Station <ChevronRight className="w-5 h-5" />
           </button>
        </div>
      </div>
    );
  }

  return (
    <HashRouter>
      <ScrollToTop />
      <div className={`min-h-screen flex flex-col lg:flex-row relative transition-colors duration-500 ${isHighContrast ? 'bg-black text-yellow-400' : isGreenTheme ? 'bg-emerald-950 text-emerald-950' : 'bg-slate-100 text-slate-900'}`}>
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${WALLPAPERS[weather][0]})`, filter: 'brightness(0.4)' }} />
        </div>

        <TopTicker />
        <SidebarNavigation theme={theme} setTheme={setTheme} />
        
        <div className="flex-1 flex flex-col lg:ml-72 relative z-20">
          <main className={`flex-1 p-4 lg:p-12 pb-48 pt-16 lg:pt-20 backdrop-blur-[2px] transition-all duration-1000 ${isHighContrast ? 'bg-black' : isGreenTheme ? 'bg-emerald-50/70' : 'bg-white/70'}`}>
            <div className="max-w-7xl mx-auto">
              <Routes>
                <Route path="/" element={<Dashboard isHighContrast={isHighContrast} />} />
                <Route path="/farmer-portal" element={<FarmerLogin />} />
                <Route path="/fck-scanner" element={<SmartDiagnose />} />
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
                <Route path="/market" element={<MarketPrices />} />
                <Route path="/expert" element={<ExpertChat />} />
                <Route path="/knowledge" element={<KnowledgeHub />} />
                <Route path="/forum" element={<CommunityForum />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/privacy" element={<PrivacyPolicy />} />
                <Route path="/terms" element={<TermsOfUse />} />
              </Routes>
            </div>
          </main>
          <Footer />
        </div>
      </div>
    </HashRouter>
  );
}

const SidebarNavigation = ({ theme, setTheme }: { theme: ThemeMode, setTheme: (t: ThemeMode) => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isHighContrast = theme === 'high-contrast';
  const isGreenTheme = theme === 'green';

  const navGroups = [
    {
      title: "Core Services",
      items: [
        { path: '/', label: 'Dashboard', icon: LayoutDashboard },
        { path: '/farmer-portal', label: 'Farmer Portal', icon: User },
        { path: '/expert', label: 'Ask Expert AI', icon: MessageCircle },
        { path: '/weather', label: 'Weather Hub', icon: CloudSun },
      ]
    },
    {
      title: "Orchard Tools",
      items: [
        { path: '/fck-scanner', label: 'FCK Scanner Pro', icon: ScanEye },
        { path: '/spray-track', label: 'Spray Auditor', icon: Syringe },
        { path: '/soil', label: 'Soil Health', icon: Microscope },
        { path: '/dosage', label: 'Dosage Calc', icon: FlaskConical },
        { path: '/harvest', label: 'Yield Predictor', icon: TrendingUp },
      ]
    },
    {
      title: "Community",
      items: [
        { path: '/forum', label: 'Kisan Baithak', icon: Users },
        { path: '/market', label: 'Mandi Prices', icon: Store },
        { path: '/mandi-stats', label: 'Mandi Analytics', icon: BarChart3 },
      ]
    },
    {
      title: "Resources",
      items: [
        { path: '/calendar', label: 'Agri-Calendar', icon: Settings },
        { path: '/grading', label: 'Grading Guide', icon: Award },
        { path: '/knowledge', label: 'Knowledge Base', icon: BookOpen },
        { path: '/admin', label: 'Admin Station', icon: Key },
      ]
    }
  ];

  return (
    <>
      <div className={`lg:hidden fixed top-0 left-0 right-0 z-[120] p-4 flex items-center justify-between ${isHighContrast ? 'bg-black border-b border-yellow-400 text-yellow-400' : 'bg-emerald-900 text-white'}`}>
        <div className="flex items-center gap-3"><RotatingLogo size="sm" /><span className="font-bold">FCK Kashmir</span></div>
        <button onClick={() => setIsOpen(!isOpen)} className="p-2"><Menu className="w-6 h-6" /></button>
      </div>

      <nav className={`fixed inset-y-0 left-0 z-[110] w-72 transform transition-transform duration-300 lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'} ${isHighContrast ? 'bg-black border-r border-yellow-400' : isGreenTheme ? 'bg-emerald-950' : 'bg-white'} border-r overflow-y-auto no-scrollbar`}>
        <div className="h-full flex flex-col p-6">
          <div className="flex items-center gap-4 mb-8"><RotatingLogo /><div><h1 className={`font-heading font-bold text-lg ${isHighContrast ? 'text-yellow-400' : 'text-slate-900'}`}>Farmer's Corner</h1><p className="text-[9px] uppercase font-black text-emerald-600">Digital Valley Hub</p></div></div>
          
          <div className="mb-8"><DigitalClock /></div>

          <div className="flex-1 space-y-8">
            {navGroups.map((group, i) => (
              <div key={i} className="space-y-2">
                <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest px-4">{group.title}</p>
                <div className="space-y-1">
                  {group.items.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path;
                    return (
                      <Link key={item.path} to={item.path} onClick={() => setIsOpen(false)} className={`flex items-center gap-4 px-4 py-2.5 rounded-xl transition-all ${isActive ? 'bg-emerald-900 text-white shadow-lg' : 'text-slate-500 hover:bg-emerald-50'}`}>
                        <Icon className="w-4.5 h-4.5" /><span className="font-semibold text-sm">{item.label}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 pt-6 border-t border-slate-100">
            <button onClick={() => setTheme(theme === 'standard' ? 'green' : theme === 'green' ? 'high-contrast' : 'standard')} className="w-full flex items-center justify-center gap-3 py-3 rounded-xl font-bold text-[10px] uppercase tracking-widest bg-slate-50 text-slate-500 border border-slate-100">
              <Settings className="w-4 h-4" /> Cycle Theme
            </button>
          </div>
        </div>
      </nav>
      {isOpen && <div className="fixed inset-0 bg-slate-900/40 z-[105] lg:hidden" onClick={() => setIsOpen(false)} />}
    </>
  );
};
