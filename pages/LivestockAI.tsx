import React, { useState, useRef } from 'react';
import { Camera, Upload, RefreshCw, AlertCircle, Heart, Loader2, Volume2, Rabbit, Syringe } from 'lucide-react';
import { analyzeLivestockHealth } from '../services/gemini';

const LivestockAI: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [animal, setAnimal] = useState('Sheep');
  const [analysis, setAnalysis] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processImage = async (imgBase64: string) => {
    setLoading(true);
    setAnalysis(null);
    setError(null);
    try {
      const result = await analyzeLivestockHealth(imgBase64.split(',')[1], animal);
      setAnalysis(result);
    } catch (err) {
      setError("Analysis failed. Please try a clearer photo.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        processImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-20 no-scrollbar">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-heading font-bold text-slate-900">Livestock AI Hub</h2>
          <p className="text-slate-500 font-medium">Vet-AI support for Sheep, Goats, and Cattle in J&K.</p>
        </div>
        <div className="flex bg-white p-1 rounded-2xl border border-slate-100 shadow-sm">
          {['Sheep', 'Cattle', 'Goat'].map(t => (
            <button key={t} onClick={() => setAnimal(t)} className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${animal === t ? 'bg-emerald-900 text-white' : 'text-slate-400'}`}>{t}</button>
          ))}
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="relative bg-slate-900 rounded-[3rem] overflow-hidden aspect-square shadow-2xl flex items-center justify-center">
            {image ? <img src={image} className="w-full h-full object-cover" /> : (
              <div className="text-center p-12 cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                <Rabbit className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
                <p className="text-white font-bold">Upload Photo for Analysis</p>
              </div>
            )}
            {loading && <div className="absolute inset-0 bg-emerald-950/80 backdrop-blur-md flex flex-col items-center justify-center text-white"><Loader2 className="w-12 h-12 animate-spin mb-4" /><span className="font-bold">Analyzing Vital Signs...</span></div>}
          </div>
          <button onClick={() => fileInputRef.current?.click()} className="w-full bg-emerald-600 text-white py-5 rounded-[2rem] font-bold shadow-xl flex items-center justify-center gap-3"><Camera className="w-6 h-6" /> Scan Livestock</button>
          <input type="file" ref={fileInputRef} onChange={handleUpload} className="hidden" accept="image/*" />
        </div>

        <div className="space-y-6">
          {analysis && (
            <div className="bg-white p-10 rounded-[3.5rem] border border-slate-100 shadow-2xl animate-in zoom-in-95 space-y-8">
              <div className="flex justify-between items-start">
                <div>
                  <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase ${analysis.severity === 'High' ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'}`}>{analysis.severity} Risk</span>
                  <h3 className="text-4xl font-bold text-slate-900 mt-2">{analysis.condition}</h3>
                </div>
                <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600"><Heart className="w-8 h-8" /></div>
              </div>
              <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100"><p className="text-slate-700 font-medium leading-relaxed italic">"{analysis.advice}"</p></div>
              <div className="bg-emerald-950 p-8 rounded-[2.5rem] text-white space-y-4">
                 <h4 className="font-bold flex items-center gap-2"><Volume2 className="w-5 h-5 text-emerald-400" /> مقامی زبان میں خلاصہ</h4>
                 <p className="text-2xl font-medium leading-loose text-right" dir="rtl">{analysis.urduSummary}</p>
              </div>
            </div>
          )}
          {!analysis && !loading && (
            <div className="bg-emerald-50 p-12 rounded-[3.5rem] border border-emerald-100 text-center space-y-6">
              <Syringe className="w-16 h-16 text-emerald-600/30 mx-auto" />
              <h4 className="text-xl font-bold text-emerald-900">Veterinary Intelligence Active</h4>
              <p className="text-emerald-700 font-medium">Our AI is trained on Sheep/Cattle diseases common to the Himalayan region.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default LivestockAI;