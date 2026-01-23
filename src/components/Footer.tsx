
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Leaf, 
  Phone, 
  Mail, 
  Facebook, 
  Twitter, 
  Instagram, 
  MessageCircle, 
  ExternalLink,
  MapPin,
  ShieldCheck,
  Heart,
  ChevronRight,
  Landmark,
  Store,
  TrendingUp,
  Globe
} from 'lucide-react';
import RotatingLogo from './RotatingLogo';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const expertPhone = "6006086915";

  const partnerLinks = [
    { name: "SKUAST-K", url: "https://skuastkashmir.ac.in", icon: Landmark },
    { name: "JK Agri Dept", url: "https://diragrikashmir.nic.in", icon: Store },
    { name: "Mandi Board", url: "https://agrimarketing.jk.gov.in", icon: TrendingUp },
    { name: "Horticulture", url: "https://horticulture.jk.gov.in", icon: Globe }
  ];

  const openExternal = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <footer className="bg-slate-900 text-slate-300 pt-20 pb-10 border-t border-white/5 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-600"></div>
      <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-emerald-500/5 rounded-full blur-[100px]"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <RotatingLogo size="sm" />
              <div>
                <h3 className="text-xl font-heading font-bold text-white leading-none">Farmer's Corner</h3>
                <p className="text-[10px] text-emerald-400 font-black uppercase tracking-widest mt-1">Kashmir Division</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-slate-400">
              The ultimate digital bridge for the Kashmiri farmer. Bridging the gap between traditional wisdom and AI-powered modern agriculture.
            </p>
            <div className="flex gap-4">
              <a href="https://www.facebook.com/share/1HVJk4J8wA/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-white font-bold uppercase text-xs tracking-[0.2em] flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-500" /> Connect with Experts
            </h4>
            <div className="space-y-4">
              <div className="bg-white/5 p-4 rounded-2xl border border-white/5 group hover:bg-white/10 transition-colors">
                <p className="text-[10px] font-black text-emerald-400 uppercase mb-1">Chief Consultant</p>
                <p className="text-white font-bold">Towseef Ahmad</p>
                <div className="flex items-center gap-3 mt-3">
                  <a href={`tel:${expertPhone}`} className="flex-1 bg-emerald-600 text-white py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-2 hover:bg-emerald-500 transition-colors">
                    <Phone className="w-3 h-3" /> Call
                  </a>
                  <a href={`https://wa.me/91${expertPhone}`} className="flex-1 bg-white/10 text-white py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-2 hover:bg-white/20 transition-colors">
                    <MessageCircle className="w-3 h-3" /> WhatsApp
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-400">
                <MapPin className="w-4 h-4 text-emerald-600" />
                <span>Sopore Fruit Mandi, Baramulla</span>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-white font-bold uppercase text-xs tracking-[0.2em]">Quick Tools</h4>
            <ul className="grid grid-cols-1 gap-3">
              {[
                { label: 'Plant Scan', path: '/fck-scanner' },
                { label: 'Mandi Locator', path: '/market' },
                { label: 'Weather Hub', path: '/weather' },
                { label: 'Agri-Calendar', path: '/calendar' },
                { label: 'Resource Hub', path: '/knowledge' },
                { label: 'Ask AI Expert', path: '/expert' }
              ].map(link => (
                <li key={link.path}>
                  <Link to={link.path} className="text-sm hover:text-emerald-400 transition-colors flex items-center gap-2 group">
                    <ChevronRight className="w-3 h-3 text-slate-600 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-white font-bold uppercase text-xs tracking-[0.2em]">Verified Partners</h4>
            <div className="grid grid-cols-2 gap-3">
              {partnerLinks.map((partner, i) => (
                <button 
                  key={i} 
                  onClick={() => openExternal(partner.url)}
                  className="bg-white/5 p-3 rounded-xl text-center border border-white/5 hover:bg-emerald-900/40 hover:border-emerald-500 transition-all group"
                >
                  <partner.icon className="w-4 h-4 mx-auto mb-1 text-emerald-500 group-hover:scale-110 transition-transform" />
                  <p className="text-[10px] font-bold text-white">{partner.name}</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
            <span>© {currentYear} Farmer'sCorner Kashmir. All Rights Reserved.</span>
          </div>
          
          <div className="flex items-center gap-6 text-xs font-bold uppercase tracking-widest">
            <Link to="/privacy" className="hover:text-emerald-400 transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-emerald-400 transition-colors">Terms of Use</Link>
            <a href="#" className="flex items-center gap-1 text-emerald-500">
              Made with <Heart className="w-3 h-3 fill-emerald-500" /> for the Valley
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
