
import React, { useState, useEffect } from 'react';
import { 
  Lock, Mail, Key, ShieldCheck, Plus, Edit, Trash2, 
  X, Save, Store, BookOpen, AlertCircle, Users, Megaphone, 
  Search, ExternalLink, UserPlus, Phone, HelpCircle, FileText
} from 'lucide-react';

type AdminTab = 'broadcast' | 'knowledge' | 'mandi' | 'farmers';

const Admin: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<AdminTab>('broadcast');
  const [showResetNotice, setShowResetNotice] = useState(false);
  
  // Storage Integration
  const [broadcasts, setBroadcasts] = useState<any[]>(() => JSON.parse(localStorage.getItem('fck_broadcasts') || '[]'));
  const [knowledge, setKnowledge] = useState<any[]>(() => JSON.parse(localStorage.getItem('fck_knowledge_db') || '[]'));
  const [mandis, setMandis] = useState<any[]>(() => JSON.parse(localStorage.getItem('fck_mandi_db') || '[]'));
  const [farmers, setFarmers] = useState<any[]>(() => JSON.parse(localStorage.getItem('fck_farmers_db') || '[]'));
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);

  useEffect(() => {
    localStorage.setItem('fck_broadcasts', JSON.stringify(broadcasts));
    localStorage.setItem('fck_knowledge_db', JSON.stringify(knowledge));
    localStorage.setItem('fck_mandi_db', JSON.stringify(mandis));
    localStorage.setItem('fck_farmers_db', JSON.stringify(farmers));
  }, [broadcasts, knowledge, mandis, farmers]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === 'Admin@fck' && password === 'Fck@123#') {
      setIsLoggedIn(true);
      setError('');
    } else {
      setError('Verification failed. Invalid credentials.');
    }
  };

  const deleteItem = (id: string, type: AdminTab) => {
    if (!window.confirm("Confirm permanent removal?")) return;
    if (type === 'broadcast') setBroadcasts(prev => prev.filter(i => i.id !== id));
    if (type === 'knowledge') setKnowledge(prev => prev.filter(i => i.id !== id));
    if (type === 'mandi') setMandis(prev => prev.filter(i => i.id !== id));
    if (type === 'farmers') setFarmers(prev => prev.filter(i => i.id !== id));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const data: any = Object.fromEntries(formData.entries());
    const id = editingItem?.id || Date.now().toString();
    const newItem = { ...data, id, date: editingItem?.date || new Date().toLocaleDateString() };

    if (activeTab === 'broadcast') setBroadcasts(prev => editingItem ? prev.map(i => i.id === id ? newItem : i) : [newItem, ...prev]);
    else if (activeTab === 'knowledge') setKnowledge(prev => editingItem ? prev.map(i => i.id === id ? newItem : i) : [newItem, ...prev]);
    else if (activeTab === 'mandi') setMandis(prev => editingItem ? prev.map(i => i.id === id ? newItem : i) : [newItem, ...prev]);
    else if (activeTab === 'farmers') setFarmers(prev => editingItem ? prev.map(i => i.id === id ? newItem : i) : [newItem, ...prev]);

    setIsModalOpen(false);
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-6">
        <div className="bg-white w-full max-w-md rounded-[3.5rem] shadow-2xl border border-slate-100 p-12 space-y-8 animate-in zoom-in-95">
          <div className="text-center space-y-4">
            <div className="w-20 h-20 bg-emerald-900 rounded-3xl flex items-center justify-center mx-auto shadow-xl"><Lock className="w-10 h-10 text-white" /></div>
            <h2 className="text-3xl font-heading font-bold text-slate-900">Admin Control</h2>
          </div>
          
          {showResetNotice ? (
            <div className="bg-rose-50 p-8 rounded-[2.5rem] border-2 border-rose-100 space-y-6 animate-in slide-in-from-bottom-4">
              <div className="flex items-center gap-3 text-rose-800 font-bold"><AlertCircle className="w-6 h-6" /> Security Access Only</div>
              <p className="text-sm text-rose-700 leading-relaxed">System-level resets are authorized exclusively via the lead node:</p>
              <a href="mailto:darajazb@gmail.com" className="block text-center py-4 bg-white border border-rose-200 text-rose-900 font-black rounded-2xl hover:bg-rose-100 transition-all underline">darajazb@gmail.com</a>
              <button onClick={() => setShowResetNotice(false)} className="w-full text-xs font-black text-slate-400 uppercase tracking-widest">Back to Hub</button>
            </div>
          ) : (
            <form onSubmit={handleLogin} className="space-y-4">
              <input type="text" placeholder="Identifier" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 px-6 outline-none font-bold focus:border-emerald-500" />
              <input type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 px-6 outline-none font-bold focus:border-emerald-500" />
              {error && <p className="text-xs font-black text-rose-600 uppercase text-center">{error}</p>}
              <button className="w-full bg-emerald-950 text-white py-5 rounded-2xl font-bold shadow-xl hover:bg-black transition-all">Authorize Node</button>
              <button type="button" onClick={() => setShowResetNotice(true)} className="w-full text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] hover:text-emerald-700 transition-colors">Forgot Access Keys?</button>
            </form>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-20 max-w-7xl mx-auto">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div><h2 className="text-4xl font-heading font-bold text-slate-900 tracking-tighter">Station Command</h2><p className="text-emerald-700 font-black uppercase text-[10px] tracking-[0.3em]">Master Access: {email}</p></div>
        <div className="flex gap-4">
          <button onClick={() => {setEditingItem(null); setIsModalOpen(true);}} className="bg-emerald-600 text-white px-8 py-3.5 rounded-2xl font-bold shadow-xl hover:bg-emerald-700 transition-all flex items-center gap-2"><Plus className="w-5 h-5" /> Create New Record</button>
          <button onClick={() => setIsLoggedIn(false)} className="bg-rose-50 text-rose-600 px-6 py-3 rounded-2xl font-bold border border-rose-100 hover:bg-rose-100">Exit Admin</button>
        </div>
      </header>

      <div className="flex gap-2 overflow-x-auto no-scrollbar bg-white p-2 rounded-3xl border border-slate-100 shadow-sm">
        {[
          { id: 'broadcast', label: 'Broadcasts', icon: Megaphone },
          { id: 'knowledge', label: 'Manuals', icon: BookOpen },
          { id: 'mandi', label: 'Pricing', icon: Store },
          { id: 'farmers', label: 'Registry', icon: Users }
        ].map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id as AdminTab)} className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all border ${activeTab === tab.id ? 'bg-emerald-900 text-white border-emerald-900 shadow-xl' : 'bg-white text-slate-500 border-slate-100 hover:border-emerald-200'}`}><tab.icon className="w-4 h-4" /> {tab.label}</button>
        ))}
      </div>

      <div className="bg-white rounded-[3rem] border border-slate-100 shadow-sm min-h-[500px] overflow-hidden p-10">
        {activeTab === 'broadcast' && (
          <div className="space-y-4">{broadcasts.map(b => (
            <div key={b.id} className="flex items-center justify-between p-6 bg-slate-50 rounded-[2.5rem] border border-slate-100 group">
              <div className="flex items-center gap-6"><div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-700 font-bold">#</div><div><p className="font-bold text-slate-900">{b.message}</p><p className="text-[10px] font-black text-slate-400 uppercase">{b.type} • {b.region}</p></div></div>
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all"><button onClick={() => {setEditingItem(b); setIsModalOpen(true);}} className="p-3 text-emerald-600 bg-white border rounded-xl shadow-sm"><Edit className="w-4 h-4" /></button><button onClick={() => deleteItem(b.id, 'broadcast')} className="p-3 text-rose-600 bg-white border rounded-xl shadow-sm"><Trash2 className="w-4 h-4" /></button></div>
            </div>
          ))}</div>
        )}
        
        {activeTab === 'mandi' && (
          <div className="overflow-x-auto"><table className="w-full text-left"><thead><tr className="text-[10px] font-black uppercase text-slate-400 tracking-widest border-b pb-4"><th className="pb-4">Crop</th><th className="pb-4">Mandi</th><th className="pb-4">Price</th><th className="pb-4 text-right">Actions</th></tr></thead><tbody className="divide-y">
            {mandis.map(m => (
              <tr key={m.id} className="group hover:bg-slate-50 transition-all"><td className="py-5 font-bold">{m.crop}</td><td className="py-5 font-medium text-slate-500">{m.location}</td><td className="py-5 font-black text-emerald-700">₹{m.price}</td><td className="py-5 text-right flex justify-end gap-2"><button onClick={() => {setEditingItem(m); setIsModalOpen(true);}} className="p-2 text-emerald-600 hover:bg-white rounded-lg shadow-sm"><Edit className="w-4 h-4" /></button><button onClick={() => deleteItem(m.id, 'mandi')} className="p-2 text-rose-600 hover:bg-white rounded-lg shadow-sm"><Trash2 className="w-4 h-4" /></button></td></tr>
            ))}
          </tbody></table></div>
        )}

        {activeTab === 'farmers' && (
          <div className="overflow-x-auto"><table className="w-full text-left"><thead><tr className="text-[10px] font-black uppercase text-slate-400 tracking-widest border-b"><th className="pb-4">Farmer</th><th className="pb-4">Estate</th><th className="pb-4">Region</th><th className="pb-4 text-right">Actions</th></tr></thead><tbody className="divide-y">
            {farmers.map(f => (
              <tr key={f.id} className="group hover:bg-slate-50 transition-all"><td className="py-5"><p className="font-bold">{f.name}</p><p className="text-[10px] text-slate-400">{f.phone}</p></td><td className="py-5 font-medium text-slate-500">{f.orchard}</td><td className="py-5 font-black text-emerald-700 uppercase text-xs">{f.location}</td><td className="py-5 text-right flex justify-end gap-2"><button onClick={() => {setEditingItem(f); setIsModalOpen(true);}} className="p-2 text-emerald-600 hover:bg-white rounded-lg"><Edit className="w-4 h-4" /></button><button onClick={() => deleteItem(f.id, 'farmers')} className="p-2 text-rose-600 hover:bg-white rounded-lg"><Trash2 className="w-4 h-4" /></button></td></tr>
            ))}
          </tbody></table></div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-6 backdrop-blur-md bg-slate-900/40">
          <div className="bg-white w-full max-w-2xl rounded-[3.5rem] shadow-2xl p-12 space-y-8 animate-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center"><h3 className="text-2xl font-bold">Modify Node: {activeTab}</h3><button onClick={() => setIsModalOpen(false)} className="p-2"><X className="w-6 h-6 text-slate-400" /></button></div>
            <form onSubmit={handleSave} className="space-y-6">
              {activeTab === 'broadcast' && (<>
                <select name="type" defaultValue={editingItem?.type} className="w-full p-4 bg-slate-50 border rounded-2xl font-bold"><option value="Weather">Weather Alert</option><option value="Mandi">Price Alert</option><option value="Emergency">Emergency</option></select>
                <input name="region" defaultValue={editingItem?.region} placeholder="Target Region" className="w-full p-4 bg-slate-50 border rounded-2xl font-bold" required />
                <textarea name="message" defaultValue={editingItem?.message} placeholder="System message..." className="w-full h-32 p-4 bg-slate-50 border rounded-2xl font-medium" required />
              </>)}
              {activeTab === 'mandi' && (<div className="grid grid-cols-2 gap-4">
                <input name="crop" defaultValue={editingItem?.crop} placeholder="Crop" className="p-4 bg-slate-50 border rounded-2xl font-bold" required />
                <input name="location" defaultValue={editingItem?.location} placeholder="Market" className="p-4 bg-slate-50 border rounded-2xl font-bold" required />
                <input name="price" type="number" defaultValue={editingItem?.price} placeholder="Rate" className="p-4 bg-slate-50 border rounded-2xl font-bold" required />
                <input name="unit" defaultValue={editingItem?.unit} placeholder="Unit (e.g. box)" className="p-4 bg-slate-50 border rounded-2xl font-bold" required />
              </div>)}
              {activeTab === 'farmers' && (<div className="grid grid-cols-2 gap-4">
                <input name="name" defaultValue={editingItem?.name} placeholder="Farmer Name" className="p-4 bg-slate-50 border rounded-2xl font-bold" required />
                <input name="phone" defaultValue={editingItem?.phone} placeholder="Contact" className="p-4 bg-slate-50 border rounded-2xl font-bold" required />
                <input name="orchard" defaultValue={editingItem?.orchard} placeholder="Estate Name" className="p-4 bg-slate-50 border rounded-2xl font-bold" />
                <input name="location" defaultValue={editingItem?.location} placeholder="Region" className="p-4 bg-slate-50 border rounded-2xl font-bold" />
              </div>)}
              <button className="w-full bg-emerald-900 text-white py-5 rounded-[2rem] font-bold shadow-xl flex items-center justify-center gap-2 hover:bg-black"><Save className="w-5 h-5" /> Commit Database Entry</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
