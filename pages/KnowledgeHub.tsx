
import React, { useState, useMemo, useEffect } from 'react';
import { 
  Search, 
  Book, 
  Sprout, 
  ShieldAlert, 
  ChevronRight, 
  Globe, 
  Calculator, 
  Leaf, 
  Landmark, 
  Info, 
  CalendarDays, 
  X, 
  CheckCircle2, 
  ShieldCheck, 
  Microscope,
  AlertCircle,
  FlaskConical,
  Stethoscope,
  BookOpen,
  Image as LucideImage,
  Bookmark,
  BookmarkCheck,
  Download,
  AlertTriangle,
  Zap,
  FlaskRound,
  // Added missing Sparkles icon
  Sparkles
} from 'lucide-react';
// Fix: Use a more robust import pattern for react-router-dom to handle environment-specific export issues
import * as ReactRouterDOM from 'react-router-dom';
const { useLocation } = ReactRouterDOM as any;

const categories = [
  { id: 'all', label: 'All Resources', icon: Globe, color: 'emerald' },
  { id: 'tools', label: 'Compatibility Tool', icon: FlaskRound, color: 'emerald' },
  { id: 'pests', label: 'Diseases', icon: ShieldAlert, color: 'rose' },
  { id: 'varieties', label: 'Crops', icon: Sprout, color: 'emerald' },
  { id: 'guides', label: 'Agri-Manuals', icon: Book, color: 'amber' }
];

const chemicalData: Record<string, string[]> = {
  'HMO / Dormant Oil': ['Captan (DANGER)', 'Sulphur (DANGER)', 'Mancozeb (SAFE)', 'Propineb (SAFE)'],
  'Captan': ['HMO Oil (DANGER)', 'Dodine (SAFE)', 'Myclobutanil (SAFE)'],
  'Mancozeb': ['HMO Oil (SAFE)', 'Difenoconazole (SAFE)', 'Bordeaux Mixture (DANGER)'],
  'Hexaconazole': ['Mancozeb (SAFE)', 'Ziram (SAFE)', 'Calcium Sprays (CHECK LABEL)']
};

const KnowledgeHub: React.FC = () => {
  const [activeCat, setActiveCat] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedChem, setSelectedChem] = useState<string | null>(null);

  const CompatibilityTool = () => (
    <div className="bg-white p-10 rounded-[4rem] border-2 border-emerald-100 shadow-2xl space-y-8 animate-in slide-in-from-bottom-10 duration-700">
      <div className="flex items-center gap-5">
        <div className="w-16 h-16 bg-emerald-900 text-white rounded-[2rem] flex items-center justify-center shadow-xl">
          <FlaskRound className="w-8 h-8" />
        </div>
        <div>
          <h3 className="text-3xl font-heading font-bold text-slate-900 tracking-tight">Mixing Compatibility</h3>
          <p className="text-slate-500 font-medium">Identify safe pesticide combinations for the J&K spray schedule.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        <div className="space-y-6">
          <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-4">Select Primary Chemical</label>
          <div className="grid grid-cols-1 gap-3">
            {Object.keys(chemicalData).map(chem => (
              <button 
                key={chem} 
                onClick={() => setSelectedChem(chem)}
                className={`w-full text-left p-6 rounded-[2rem] border-2 transition-all font-bold text-lg ${
                  selectedChem === chem ? 'bg-emerald-900 text-white border-emerald-900 shadow-2xl scale-[1.02]' : 'bg-slate-50 text-slate-600 border-slate-100 hover:border-emerald-200'
                }`}
              >
                {chem}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          {selectedChem ? (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
              <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-4">Interaction with {selectedChem}</h4>
              <div className="grid grid-cols-1 gap-3">
                {chemicalData[selectedChem].map((interaction, i) => (
                  <div key={i} className={`p-6 rounded-[2rem] border flex items-center justify-between group transition-all ${
                    interaction.includes('DANGER') ? 'bg-rose-50 border-rose-100 text-rose-800' : 'bg-emerald-50 border-emerald-100 text-emerald-800'
                  }`}>
                    <span className="font-bold text-lg">{interaction.split(' (')[0]}</span>
                    <span className={`text-[10px] font-black uppercase px-3 py-1 rounded-full ${
                      interaction.includes('DANGER') ? 'bg-rose-600 text-white' : 'bg-emerald-600 text-white'
                    }`}>
                      {interaction.includes('DANGER') ? 'DANGER' : 'SAFE'}
                    </span>
                  </div>
                ))}
              </div>
              <div className="p-6 bg-amber-50 rounded-[2rem] border border-amber-100 flex items-start gap-4">
                <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
                <p className="text-xs text-amber-900 font-medium leading-relaxed italic">
                  "Important: Mixing HMO Oil with Captan or Sulphur causes severe phytotoxicity (leaf burn) in apple trees. Always wait at least 15 days between these sprays."
                </p>
              </div>
            </div>
          ) : (
            <div className="py-24 text-center space-y-6 bg-slate-50 rounded-[3rem] border border-dashed border-slate-200">
               <Zap className="w-16 h-16 text-slate-200 mx-auto" />
               <p className="text-slate-400 font-bold uppercase text-xs tracking-widest">Select a molecule to view its safety profile</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-5 duration-700 pb-20 no-scrollbar relative">
      <header className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-4xl font-heading font-bold text-slate-900 mb-2 tracking-tight">Agri-Resource Hub</h2>
            <p className="text-slate-500 font-medium">Localized guidelines and safety tools for the Kashmiri farmer.</p>
          </div>
          <div className="flex items-center gap-2 bg-emerald-950 text-white px-6 py-3 rounded-2xl shadow-xl border border-emerald-800">
             <ShieldCheck className="w-4 h-4 text-emerald-400" />
             <span className="text-xs font-black uppercase tracking-widest">SKUAST-K 2024 Verified</span>
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-4 no-scrollbar scroll-smooth">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCat(cat.id)}
              className={`px-8 py-4 rounded-full font-black text-sm whitespace-nowrap transition-all flex items-center gap-3 border shadow-sm ${
                activeCat === cat.id 
                  ? 'bg-emerald-900 text-white border-emerald-900 shadow-emerald-200 shadow-2xl scale-105' 
                  : 'bg-white text-slate-500 border-slate-100 hover:border-emerald-200 hover:text-emerald-700'
              }`}
            >
              <cat.icon className="w-4 h-4" />
              {cat.label}
            </button>
          ))}
        </div>
      </header>

      {activeCat === 'tools' && <CompatibilityTool />}

      {activeCat !== 'tools' && (
        <div className="py-20 text-center space-y-4 opacity-50">
           <BookOpen className="w-16 h-16 mx-auto text-slate-200" />
           <p className="text-slate-400 font-bold uppercase text-xs tracking-widest italic">Digital repository loading for {activeCat}...</p>
        </div>
      )}

      {/* Enhanced Knowledge Banner */}
      <div className="bg-slate-900 rounded-[4rem] p-12 lg:p-20 text-white relative overflow-hidden shadow-2xl mt-12 border border-white/5">
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-3 bg-emerald-500/10 px-5 py-2.5 rounded-full border border-emerald-500/20">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-black uppercase tracking-[0.2em] text-emerald-400">Valley Intelligence</span>
            </div>
            <h3 className="text-4xl lg:text-6xl font-heading font-bold leading-[0.9] tracking-tighter">
              Science for <br/><span className="text-emerald-400">Every Orchard.</span>
            </h3>
            <p className="text-emerald-100/70 text-lg lg:text-xl font-medium leading-relaxed max-w-xl">
              Access the complete SKUAST-K 2024 Horticulture Manual and Spray Schedule directly. Knowledge is the best pesticide.
            </p>
            <button className="bg-white text-slate-900 px-10 py-5 rounded-[2rem] font-bold text-lg flex items-center gap-4 hover:bg-emerald-50 transition-all shadow-2xl group active:scale-95">
              <Download className="w-6 h-6 text-emerald-600 group-hover:animate-bounce" /> Get Full Manual (PDF)
            </button>
          </div>
          <div className="grid grid-cols-2 gap-6 opacity-30 lg:opacity-100">
             <div className="bg-white/5 backdrop-blur-xl p-8 rounded-[3rem] border border-white/10 text-center space-y-4 group hover:bg-white/10 transition-all">
               <CalendarDays className="w-10 h-10 mx-auto text-emerald-400 group-hover:scale-110 transition-transform" />
               <p className="text-[10px] font-black uppercase tracking-[0.2em]">Sonth Spray Cycle</p>
             </div>
             <div className="bg-white/5 backdrop-blur-xl p-8 rounded-[3rem] border border-white/10 text-center space-y-4 group hover:bg-white/10 transition-all">
               <Calculator className="w-10 h-10 mx-auto text-blue-400 group-hover:scale-110 transition-transform" />
               <p className="text-[10px] font-black uppercase tracking-[0.2em]">Mixing Tables</p>
             </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-emerald-500/5 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
      </div>
    </div>
  );
};

export default KnowledgeHub;
