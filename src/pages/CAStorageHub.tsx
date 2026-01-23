
import React, { useState } from 'react';
import { Warehouse, MapPin, Phone, Snowflake, TrendingUp, Info, ChevronRight, Activity, Globe, Zap } from 'lucide-react';

const caStorages = [
  { name: 'Lassipora Cold Storage', location: 'Pulwama', capacity: '10,000 MT', status: 'Available', phone: '01933-222000', icon: '❄️' },
  { name: 'Sopore CA Hub', location: 'Baramulla', capacity: '5,000 MT', status: 'Limited', phone: '01954-222111', icon: '🍎' },
  { name: 'Ahmad Cold Store', location: 'Shopian', capacity: '2,500 MT', status: 'Full', phone: '9419012345', icon: '🏢' },
  { name: 'IGC Lassipora-2', location: 'Pulwama', capacity: '15,000 MT', status: 'Available', phone: '9018123456', icon: '🏭' },
  { name: 'Kashmir Fruit Storage', location: 'Rangreth, Srinagar', capacity: '4,000 MT', status: 'Available', phone: '0194-230000', icon: '📦' },
];

const CAStorageHub: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-20 no-scrollbar">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-emerald-900 text-white rounded-[2rem] flex items-center justify-center shadow-2xl ring-4 ring-emerald-100">
            <Warehouse className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-3xl font-heading font-bold text-slate-900">CA Storage Hub</h2>
            <p className="text-slate-500 font-medium">Controlled Atmosphere inventory and tracking.</p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-emerald-50 px-4 py-2 rounded-2xl border border-emerald-100 shadow-sm">
           <Snowflake className="w-4 h-4 text-emerald-600" />
           <span className="text-[10px] font-black text-emerald-700 uppercase tracking-widest">Live Inventory</span>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {caStorages.map((store, idx) => (
              <div key={idx} className="bg-white p-10 rounded-[3.5rem] border border-slate-100 shadow-sm hover:shadow-2xl transition-all group border-b-4 border-b-emerald-100">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-16 h-16 bg-emerald-50 text-3xl flex items-center justify-center rounded-2xl group-hover:scale-110 transition-transform">
                    {store.icon}
                  </div>
                  <span className={`text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full ${
                    store.status === 'Available' ? 'bg-emerald-100 text-emerald-700' : 
                    store.status === 'Limited' ? 'bg-emerald-50 text-emerald-500 border border-emerald-100' : 'bg-slate-100 text-slate-400'
                  }`}>
                    {store.status}
                  </span>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-slate-900">{store.name}</h3>
                  <div className="flex items-center gap-2 text-emerald-600 text-xs font-black uppercase tracking-widest">
                    <MapPin className="w-3.5 h-3.5" />
                    {store.location}
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-slate-50 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Capacity</p>
                    <p className="text-lg font-bold text-slate-900">{store.capacity}</p>
                  </div>
                  <a href={`tel:${store.phone}`} className="w-14 h-14 bg-emerald-900 text-white rounded-2xl shadow-xl flex items-center justify-center hover:bg-black transition-colors">
                    <Phone className="w-6 h-6" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-4 space-y-6">
          <div className="bg-emerald-950 rounded-[3.5rem] p-10 text-white space-y-8 relative overflow-hidden shadow-2xl">
            <h3 className="text-2xl font-bold flex items-center gap-3">
              <TrendingUp className="w-6 h-6 text-emerald-400" /> Storage Intel
            </h3>
            <p className="text-base text-emerald-100/70 font-medium leading-relaxed">
              CA stored apples typically fetch 40-60% higher market value during the off-season.
            </p>
            <div className="bg-white/5 border border-white/10 p-6 rounded-[2rem]">
              <div className="flex items-center gap-2 mb-3">
                <Activity className="w-4 h-4 text-emerald-400" />
                <span className="text-[10px] font-black uppercase tracking-widest">Pricing Trend</span>
              </div>
              <p className="text-xs font-bold text-slate-200">
                Lassipora rates: ₹0.80 - ₹1.20 per kg/month.
              </p>
            </div>
            <button className="w-full bg-emerald-600 text-white py-5 rounded-2xl font-bold text-sm flex items-center justify-center gap-3 shadow-xl">
              ROI Calculator <ChevronRight className="w-5 h-5" />
            </button>
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px]" />
          </div>

          <div className="bg-emerald-50 p-8 rounded-[3.5rem] border border-emerald-100 shadow-sm space-y-6">
             <div className="flex items-center gap-4">
               <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                  <Info className="w-6 h-6 text-emerald-600" />
               </div>
               <h4 className="font-bold text-emerald-900">Post-Harvest Tip</h4>
             </div>
             <p className="text-xs text-emerald-800 leading-relaxed font-medium">
               To maximize CA life, ensure your fruit is pre-cooled within 24 hours of picking. Only high-quality apples should be selected for long-term storage.
             </p>
             <button className="w-full py-4 bg-white border border-emerald-200 text-emerald-700 font-black uppercase text-[10px] tracking-widest hover:bg-emerald-100 transition-colors rounded-2xl flex items-center justify-center gap-2">
               Download Storage Guide <Globe className="w-4 h-4" />
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CAStorageHub;
