
import React, { useState, useEffect, useMemo } from 'react';
import { 
  Syringe, CheckCircle2, Clock, ShieldCheck, Droplets, Plus, Trash2, 
  History, Activity, X, MessageCircle, Share2, FileText, Filter, Calendar,
  AlertTriangle, Sprout, Leaf, Snowflake, Sun
} from 'lucide-react';

const SPRAY_PROTOCOL = [
  { id: 1, title: "Dormant Stage", timing: "Late Feb", chem: "HMO / TSO Oil", desc: "San Jose Scale & Mite Eggs", icon: Snowflake, activeMonth: 1 },
  { id: 2, title: "Green Tip", timing: "Mid March", chem: "Captan / Dodine", desc: "Primary Scab Infection", icon: Sprout, activeMonth: 2 },
  { id: 3, title: "Pink Bud", timing: "Early April", chem: "Mancozeb / Zineb", desc: "Pre-Bloom Scab Protection", icon: Leaf, activeMonth: 3 },
  { id: 4, title: "Petal Fall", timing: "Late April", chem: "Difenoconazole", desc: "Systemic Scab & Mildew", icon: Droplets, activeMonth: 3 },
  { id: 5, title: "Fruit Set", timing: "Mid May", chem: "Mancozeb + Boron", desc: "Pea Size Stage / Nutrients", icon: Activity, activeMonth: 4 },
  { id: 6, title: "Fruit Dev I", timing: "June", chem: "Chlorpyrifos + Urea", desc: "Walnut Size / Pests", icon: Sun, activeMonth: 5 },
  { id: 7, title: "Fruit Dev II", timing: "July", chem: "Propineb / Ziram", desc: "Cover Spray (Scab/Alt)", icon: Sun, activeMonth: 6 },
  { id: 8, title: "Pre-Harvest", timing: "August", chem: "Carbendazim", desc: "Storage Rot Prevention", icon: CheckCircle2, activeMonth: 7 }
];

const SprayTracker: React.FC = () => {
  const [logs, setLogs] = useState<any[]>(() => JSON.parse(localStorage.getItem('fck_pesticide_logs') || '[]'));
  const [showAddForm, setShowAddForm] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [currentStageId, setCurrentStageId] = useState(3); // Defaulting to Pink Bud for demo
  
  const [newLog, setNewLog] = useState<any>({
    date: new Date().toISOString().split('T')[0],
    type: 'Contact',
    chemicalName: '',
    brandName: '',
    stageId: '',
    tankSize: '200'
  });

  useEffect(() => {
    localStorage.setItem('fck_pesticide_logs', JSON.stringify(logs));
    // Simple month-based stage detection for demo
    const month = new Date().getMonth();
    const stage = SPRAY_PROTOCOL.find(s => s.activeMonth === month);
    if (stage) setCurrentStageId(stage.id);
  }, [logs]);

  const filteredLogs = useMemo(() => {
    return logs.filter(log => {
      if (!startDate && !endDate) return true;
      const logDate = new Date(log.date);
      const start = startDate ? new Date(startDate) : new Date('1970-01-01');
      const end = endDate ? new Date(endDate) : new Date('2099-12-31');
      return logDate >= start && logDate <= end;
    }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [logs, startDate, endDate]);

  const addLog = () => {
    if (!newLog.chemicalName || !newLog.date) return;
    const log = { id: Date.now().toString(), ...newLog };
    setLogs(prev => [log, ...prev]);
    setShowAddForm(false);
    setNewLog({ date: new Date().toISOString().split('T')[0], type: 'Contact', chemicalName: '', brandName: '', stageId: '', tankSize: '200' });
  };

  const deleteLog = (id: string) => {
    if (window.confirm("Delete record?")) setLogs(prev => prev.filter(l => l.id !== id));
  };

  const getStageStatus = (stageId: number) => {
    // Check if a log exists within a reasonable timeframe of this stage (mock logic)
    // In a real app, we'd match dates or explicit stage IDs
    const isLogged = logs.some(l => l.stageId === stageId.toString() || l.chemicalName.includes(SPRAY_PROTOCOL[stageId-1].chem.split(' ')[0]));
    if (isLogged) return 'completed';
    if (stageId < currentStageId) return 'missed';
    if (stageId === currentStageId) return 'active';
    return 'pending';
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-700 pb-20 no-scrollbar">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="w-20 h-20 bg-emerald-900 text-white rounded-[2.5rem] flex items-center justify-center shadow-2xl ring-8 ring-emerald-50"><Syringe className="w-10 h-10" /></div>
          <div><h2 className="text-4xl font-heading font-bold text-slate-900 tracking-tight">Spray Auditor</h2><p className="text-slate-500 font-medium">Precision logging for valley orchard protocols.</p></div>
        </div>
        <button onClick={() => setShowAddForm(!showAddForm)} className="bg-emerald-600 text-white px-8 py-4 rounded-2xl font-bold shadow-xl hover:bg-emerald-700 transition-all flex items-center gap-2 group"><Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" /> New Dose</button>
      </header>

      {/* 8-Stage Protocol Visualizer */}
      <div className="bg-emerald-950 rounded-[3rem] p-8 lg:p-12 text-white shadow-2xl overflow-hidden relative">
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-8">
             <h3 className="text-2xl font-bold flex items-center gap-3"><ShieldCheck className="w-6 h-6 text-emerald-400" /> SKUAST-K Apple Schedule 2024</h3>
             <span className="text-[10px] font-black uppercase tracking-widest bg-white/10 px-3 py-1 rounded-full border border-white/10">Official Timeline</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {SPRAY_PROTOCOL.map((stage) => {
              const status = getStageStatus(stage.id);
              const StatusIcon = stage.icon;
              return (
                <div key={stage.id} className={`p-5 rounded-[2rem] border transition-all relative overflow-hidden group ${
                  status === 'active' ? 'bg-emerald-600 border-emerald-500 shadow-xl scale-105 z-10' : 
                  status === 'completed' ? 'bg-emerald-900/50 border-emerald-800 opacity-70' : 
                  status === 'missed' ? 'bg-rose-900/20 border-rose-800/50' :
                  'bg-white/5 border-white/5'
                }`}>
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Stage {stage.id}</span>
                    {status === 'completed' && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                    {status === 'missed' && <AlertTriangle className="w-4 h-4 text-rose-400" />}
                    {status === 'active' && <span className="w-2 h-2 bg-white rounded-full animate-pulse" />}
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-lg leading-tight">{stage.title}</h4>
                    <p className={`text-xs font-medium ${status === 'active' ? 'text-emerald-100' : 'text-emerald-400'}`}>{stage.timing}</p>
                  </div>
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <p className="text-[10px] font-medium opacity-80 mb-1">{stage.chem}</p>
                    {status === 'active' && (
                      <button 
                        onClick={() => {
                          setNewLog(prev => ({ ...prev, chemicalName: stage.chem.split(' / ')[0], stageId: stage.id.toString() }));
                          setShowAddForm(true);
                        }}
                        className="w-full mt-2 bg-white text-emerald-800 py-2 rounded-xl text-xs font-bold hover:bg-emerald-50"
                      >
                        Log Now
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          {showAddForm && (
            <div className="bg-white p-10 rounded-[3.5rem] border-2 border-emerald-100 shadow-2xl space-y-6 animate-in slide-in-from-top-4">
              <div className="flex justify-between items-center"><h3 className="text-2xl font-bold text-slate-900">Add Log</h3><button onClick={() => setShowAddForm(false)} className="p-2"><X className="w-6 h-6 text-slate-400" /></button></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input type="date" value={newLog.date} onChange={e => setNewLog({...newLog, date: e.target.value})} className="p-4 bg-slate-50 border rounded-2xl font-bold" />
                <select value={newLog.stageId} onChange={e => setNewLog({...newLog, stageId: e.target.value})} className="p-4 bg-slate-50 border rounded-2xl font-bold">
                  <option value="">Select Protocol Stage (Optional)</option>
                  {SPRAY_PROTOCOL.map(s => <option key={s.id} value={s.id}>Stage {s.id}: {s.title}</option>)}
                </select>
                <input type="text" placeholder="Active Molecule" value={newLog.chemicalName} onChange={e => setNewLog({...newLog, chemicalName: e.target.value})} className="p-4 bg-slate-50 border rounded-2xl font-bold" />
                <input type="text" placeholder="Brand Name" value={newLog.brandName} onChange={e => setNewLog({...newLog, brandName: e.target.value})} className="p-4 bg-slate-50 border rounded-2xl font-bold" />
                <select value={newLog.type} onChange={e => setNewLog({...newLog, type: e.target.value})} className="p-4 bg-slate-50 border rounded-2xl font-bold"><option value="Contact">Contact (8d)</option><option value="Systemic">Systemic (10d)</option><option value="Combination">Combination (12d)</option></select>
              </div>
              <button onClick={addLog} className="w-full bg-emerald-600 text-white py-5 rounded-[2rem] font-bold shadow-xl hover:bg-emerald-700 transition-all">Commit Entry</button>
            </div>
          )}

          <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm flex flex-col md:flex-row items-center gap-6">
            <div className="flex items-center gap-4 flex-1">
              <div className="p-3 bg-emerald-50 rounded-2xl text-emerald-600"><Filter className="w-5 h-5" /></div>
              <div className="flex items-center gap-4">
                <div className="flex flex-col"><span className="text-[8px] font-black uppercase text-slate-400 tracking-widest ml-1">From</span><input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="bg-slate-50 border p-3 rounded-xl text-xs font-bold" /></div>
                <div className="flex flex-col"><span className="text-[8px] font-black uppercase text-slate-400 tracking-widest ml-1">To</span><input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} className="bg-slate-50 border p-3 rounded-xl text-xs font-bold" /></div>
              </div>
            </div>
            {(startDate || endDate) && <button onClick={() => {setStartDate(''); setEndDate('');}} className="text-xs font-black text-rose-500 uppercase tracking-widest underline">Clear</button>}
            <button className="bg-emerald-950 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-3"><Share2 className="w-5 h-5" /> Export PDF</button>
          </div>

          <div className="bg-white p-10 rounded-[3.5rem] border border-slate-100 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between mb-8 border-b pb-6">
              <div className="flex items-center gap-4"><FileText className="w-8 h-8 text-emerald-600" /><div><h3 className="text-2xl font-bold">Audit History</h3><p className="text-xs text-slate-400">Total {filteredLogs.length} entries matching filters.</p></div></div>
            </div>
            
            <div className="overflow-x-auto"><table className="w-full text-left"><thead><tr className="text-[10px] font-black uppercase text-slate-400 tracking-widest border-b"><th className="pb-4">Applied</th><th className="pb-4">Stage</th><th className="pb-4">Chemical</th><th className="pb-4">Type</th><th className="pb-4 text-right">Delete</th></tr></thead><tbody className="divide-y">
              {filteredLogs.map(log => {
                const stage = SPRAY_PROTOCOL.find(s => s.id.toString() === log.stageId);
                return (
                  <tr key={log.id} className="group hover:bg-slate-50 transition-all">
                    <td className="py-6 font-bold text-slate-900">{new Date(log.date).toLocaleDateString('en-GB', {day:'2-digit', month:'short'})}</td>
                    <td className="py-6"><span className={`text-[9px] font-black uppercase px-2 py-1 rounded-lg ${stage ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-400'}`}>{stage ? `Stage ${stage.id}` : 'Manual'}</span></td>
                    <td className="py-6 font-black text-slate-800">{log.chemicalName}<span className="block text-[10px] text-slate-400 font-medium uppercase tracking-widest">{log.brandName}</span></td>
                    <td className="py-6"><span className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-lg text-[9px] font-black">{log.type}</span></td>
                    <td className="py-6 text-right"><button onClick={() => deleteLog(log.id)} className="p-3 text-rose-300 hover:text-rose-600 opacity-0 group-hover:opacity-100 transition-all"><Trash2 className="w-5 h-5" /></button></td>
                  </tr>
                );
              })}
            </tbody></table></div>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-8">
          <div className="bg-emerald-50 p-10 rounded-[3.5rem] border border-emerald-100 space-y-8">
             <div className="flex items-center gap-4"><ShieldCheck className="w-10 h-10 text-emerald-600" /><h4 className="font-bold text-emerald-900 text-xl">Compliance</h4></div>
             <p className="text-sm text-emerald-800 leading-relaxed font-medium">Accurate audit logs are mandatory for European and Middle Eastern export quality certifications. Always record your active ingredient.</p>
             <div className="pt-8 border-t border-emerald-100 font-black text-[10px] text-emerald-700 uppercase tracking-[0.2em]">SKUAST-K 2024 Verified</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SprayTracker;
