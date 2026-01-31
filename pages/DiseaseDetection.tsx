
import React, { useState, useRef, useEffect } from 'react';
import { 
  Camera, 
  Upload, 
  RefreshCw, 
  AlertCircle, 
  CheckCircle2, 
  Zap, 
  X, 
  Image as ImageIcon, 
  Scan, 
  Activity, 
  ShieldAlert, 
  Share2,
  MessageCircle as WhatsAppIcon,
  ChevronRight,
  Info
} from 'lucide-react';
import { analyzeCropDisease } from '../services/gemini';
import { DiseaseAnalysis } from '../types';

const DiseaseDetection: React.FC = () => {
  const [mode, setMode] = useState<'upload' | 'live'>('live');
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<DiseaseAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  useEffect(() => {
    if (mode === 'live') {
      startCamera();
    } else {
      stopCamera();
    }
    return () => stopCamera();
  }, [mode]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } }
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      setError("Unable to access camera. Please check permissions.");
      setMode('upload');
    }
  };

  const captureFrame = async () => {
    if (!videoRef.current || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const video = videoRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const base64 = canvas.toDataURL('image/jpeg', 0.8);
    setImage(base64);
    processImage(base64);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setImage(base64);
        processImage(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const processImage = async (imgBase64: string) => {
    setLoading(true);
    setError(null);
    setAnalysis(null);
    try {
      const result = await analyzeCropDisease(imgBase64.split(',')[1], 'en');
      setAnalysis(result);
    } catch (err) {
      setError("Diagnosis failed. Try a clearer image.");
    } finally {
      setLoading(false);
    }
  };

  const shareToExpert = () => {
    if (!analysis) return;
    const expertPhone = "6006086915";
    const text = `*PLANT SCAN REPORT*\nDisease: ${analysis.diseaseName}\nSeverity: ${analysis.severity}\n\n*Rec:* ${analysis.treatment[0]}`;
    window.open(`https://wa.me/91${expertPhone}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-20">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-heading font-bold text-slate-900">Plant Scan</h2>
          <p className="text-slate-500 font-medium">Identify pests and diseases instantly using AI vision.</p>
        </div>
        <div className="flex bg-white p-1 rounded-2xl border border-slate-100 shadow-sm self-start md:self-auto">
          <button onClick={() => setMode('live')} className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${mode === 'live' ? 'bg-emerald-900 text-white' : 'text-slate-400'}`}>Live</button>
          <button onClick={() => setMode('upload')} className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${mode === 'upload' ? 'bg-emerald-900 text-white' : 'text-slate-400'}`}>Upload</button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <div className="space-y-6">
          <div className="relative bg-slate-900 rounded-[3rem] overflow-hidden aspect-[4/3] shadow-2xl border-4 border-white ring-1 ring-slate-200">
            {mode === 'live' && !image && (
              <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
            )}
            {image && <img src={image} className="w-full h-full object-cover" />}
            {loading && (
              <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md flex flex-col items-center justify-center text-white">
                <RefreshCw className="w-12 h-12 animate-spin mb-4" />
                <span className="font-bold uppercase tracking-widest text-xs">AI Processing...</span>
              </div>
            )}
          </div>

          <div className="flex gap-4">
            {!image ? (
              <button onClick={captureFrame} className="flex-1 bg-emerald-600 text-white py-5 rounded-[2rem] font-bold flex items-center justify-center gap-3 shadow-xl hover:bg-emerald-500 transition-all active:scale-95">
                <Camera className="w-6 h-6" /> Take Photo
              </button>
            ) : (
              <button onClick={() => { setImage(null); setAnalysis(null); }} className="flex-1 bg-slate-900 text-white py-5 rounded-[2rem] font-bold flex items-center justify-center gap-3 shadow-xl">
                <RefreshCw className="w-6 h-6" /> Retake Photo
              </button>
            )}
            {mode === 'upload' && (
              <button onClick={() => fileInputRef.current?.click()} className="bg-white text-slate-900 border border-slate-200 px-8 rounded-[2rem] font-bold shadow-sm hover:bg-slate-50 transition-all">
                <Upload className="w-6 h-6" />
                <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
              </button>
            )}
          </div>
          <canvas ref={canvasRef} className="hidden" />
        </div>

        <div className="space-y-6">
          {error && (
            <div className="bg-rose-50 p-8 rounded-[2.5rem] border border-rose-100 text-rose-800 flex items-center gap-4">
              <AlertCircle className="w-8 h-8 shrink-0" />
              <p className="font-bold">{error}</p>
            </div>
          )}

          {analysis && (
            <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-xl space-y-8 animate-in zoom-in-95">
              <div className="flex justify-between items-start">
                <div>
                  <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${analysis.severity === 'High' ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'}`}>
                    {analysis.severity} Severity
                  </span>
                  <h3 className="text-3xl font-bold text-slate-900 mt-2">{analysis.diseaseName}</h3>
                </div>
                <button onClick={shareToExpert} className="p-4 bg-emerald-50 text-emerald-700 rounded-2xl hover:bg-emerald-100">
                  <WhatsAppIcon className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-6">
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                  <p className="text-sm font-medium text-slate-600 leading-relaxed italic">"{analysis.description}"</p>
                </div>

                <div className="space-y-4">
                  <h4 className="font-bold text-slate-900 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-emerald-600" /> Recommended Action
                  </h4>
                  <ul className="space-y-2">
                    {analysis.treatment.map((t, i) => (
                      <li key={i} className="flex gap-3 text-sm font-medium text-slate-700 bg-emerald-50 p-4 rounded-xl border border-emerald-100">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {!analysis && !loading && (
            <div className="bg-emerald-50 p-10 rounded-[3rem] border border-emerald-100 text-center space-y-4">
              <Scan className="w-12 h-12 text-emerald-600 mx-auto opacity-30" />
              <h4 className="font-bold text-emerald-900">Ready to Scan</h4>
              <p className="text-sm text-emerald-700 font-medium">Capture or upload a clear photo of the affected plant area to begin diagnosis.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DiseaseDetection;
