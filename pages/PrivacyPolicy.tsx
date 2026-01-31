
import React from 'react';
import { ShieldCheck, Lock, Eye, MapPin, Camera, Mic, Info, ArrowLeft } from 'lucide-react';
// Fix: Use a more robust import pattern for react-router-dom to handle environment-specific export issues
import * as ReactRouterDOM from 'react-router-dom';
const { Link } = ReactRouterDOM as any;

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-5 duration-700 pb-20">
      <header className="text-center space-y-4">
        <Link to="/" className="inline-flex items-center gap-2 text-emerald-600 font-bold text-xs uppercase tracking-widest hover:text-emerald-700 transition-colors mb-4">
          <ArrowLeft className="w-4 h-4" /> Back to Hub
        </Link>
        <div className="w-20 h-20 bg-emerald-900 text-white rounded-[2.5rem] flex items-center justify-center mx-auto shadow-2xl">
          <ShieldCheck className="w-10 h-10" />
        </div>
        <h2 className="text-4xl font-heading font-bold text-slate-900">Privacy Policy</h2>
        <p className="text-slate-500 font-medium">Protecting the data of the Valley's backbone.</p>
      </header>

      <div className="bg-white p-8 lg:p-12 rounded-[3.5rem] border border-slate-100 shadow-sm space-y-10 text-slate-700 leading-relaxed">
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-50 rounded-xl text-emerald-600">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Our Commitment</h3>
          </div>
          <p>
            At Farmer'sCorner Kashmir, we understand that your farm data is as precious as your harvest. We are committed to maintaining the trust of our farming community by being transparent about how we handle your information.
          </p>
        </section>

        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-xl text-blue-600">
              <Eye className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Data Collection & Usage</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 space-y-3">
              <Camera className="w-6 h-6 text-emerald-600" />
              <h4 className="font-bold text-slate-900">Crop & Animal Photos</h4>
              <p className="text-sm">Used exclusively for AI diagnosis of pests and diseases. Images are processed using Gemini AI and are not shared with third-party advertisers.</p>
            </div>
            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 space-y-3">
              <MapPin className="w-6 h-6 text-blue-600" />
              <h4 className="font-bold text-slate-900">Location Access</h4>
              <p className="text-sm">Used to provide hyper-localized weather forecasts and to help you find the nearest Mandi or certified pesticide dealer in J&K.</p>
            </div>
            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 space-y-3">
              <Mic className="w-6 h-6 text-rose-600" />
              <h4 className="font-bold text-slate-900">Voice Input</h4>
              <p className="text-sm">Accessed only when using the "Live Lens" or "Ask Expert" features to provide real-time translation and voice-assisted diagnostic reports.</p>
            </div>
            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 space-y-3">
              <Info className="w-6 h-6 text-amber-600" />
              <h4 className="font-bold text-slate-900">Market Search</h4>
              <p className="text-sm">We do not store your personal identity with market queries. Search data is anonymized to improve regional crop price analytics.</p>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="text-xl font-bold text-slate-900">Data Security</h3>
          <p>
            All data transmitted through Farmer'sCorner is encrypted. We follow strict security protocols to prevent unauthorized access. Diagnostic data is used specifically to improve the accuracy of agricultural models for Kashmiri crops like Saffron, Walnuts, and Apples.
          </p>
        </section>

        <section className="bg-emerald-900 p-8 rounded-[2.5rem] text-white space-y-4">
          <h3 className="text-xl font-bold">Contact Privacy Officer</h3>
          <p className="text-emerald-100/70 text-sm font-medium">
            If you have questions about how your farm data is handled, please contact our chief consultant Towseef Ahmad.
          </p>
          <div className="font-bold text-emerald-400">Email: privacy@fckashmir.in</div>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
