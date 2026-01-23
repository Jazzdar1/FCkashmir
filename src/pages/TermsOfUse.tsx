
import React from 'react';
import { Book, Scale, AlertTriangle, ShieldCheck, Landmark, Globe, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const TermsOfUse: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-5 duration-700 pb-20">
      <header className="text-center space-y-4">
        <Link to="/" className="inline-flex items-center gap-2 text-emerald-600 font-bold text-xs uppercase tracking-widest hover:text-emerald-700 transition-colors mb-4">
          <ArrowLeft className="w-4 h-4" /> Back to Hub
        </Link>
        <div className="w-20 h-20 bg-slate-900 text-white rounded-[2.5rem] flex items-center justify-center mx-auto shadow-2xl">
          <Book className="w-10 h-10 text-emerald-400" />
        </div>
        <h2 className="text-4xl font-heading font-bold text-slate-900">Terms of Use</h2>
        <p className="text-slate-500 font-medium">Standard guidelines for using FCK Hub services.</p>
      </header>

      <div className="bg-white p-8 lg:p-12 rounded-[3.5rem] border border-slate-100 shadow-sm space-y-10 text-slate-700 leading-relaxed">
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-slate-100 rounded-xl text-slate-600">
              <Scale className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Acceptance of Terms</h3>
          </div>
          <p>
            By accessing Farmer'sCorner Kashmir (FCK), you agree to comply with these terms. This platform is designed as an advisory tool for farmers in the Jammu & Kashmir region.
          </p>
        </section>

        <section className="bg-rose-50 p-8 rounded-[2.5rem] border border-rose-100 space-y-4">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-6 h-6 text-rose-600" />
            <h3 className="text-xl font-bold text-rose-900">AI Advisory Disclaimer</h3>
          </div>
          <p className="text-rose-800 text-sm font-medium leading-relaxed">
            The FCK Scanner and AI Expert (Towseef Ahmad AI) provide diagnostic results based on high-probability patterns. These results are for informational purposes only.
          </p>
          <ul className="space-y-2">
            <li className="flex gap-3 text-xs font-bold text-rose-700">
              <div className="w-1.5 h-1.5 bg-rose-500 rounded-full mt-1.5 shrink-0" />
              Not a replacement for physical inspection by SKUAST-K or Department of Agriculture officials.
            </li>
            <li className="flex gap-3 text-xs font-bold text-rose-700">
              <div className="w-1.5 h-1.5 bg-rose-500 rounded-full mt-1.5 shrink-0" />
              Chemical dosages calculated are estimates; always refer to the specific label on pesticide packaging.
            </li>
            <li className="flex gap-3 text-xs font-bold text-rose-700">
              <div className="w-1.5 h-1.5 bg-rose-500 rounded-full mt-1.5 shrink-0" />
              Farmer'sCorner is not liable for crop loss resulting from misdiagnosis or weather-related variances.
            </li>
          </ul>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-50 rounded-xl text-emerald-600">
              <Landmark className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Intellectual Property</h3>
          </div>
          <p>
            The educational materials provided in the Knowledge Hub, including spray calendars and nutrient manuals, remain the property of their respective creators (primarily SKUAST-K). These are distributed via FCK for public welfare under educational fair-use principles.
          </p>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-xl text-blue-600">
              <Globe className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Regional Compliance</h3>
          </div>
          <p>
            All pesticide and fertilizer dealers listed are verified based on publicly available records from the J&K Government. FCK is not responsible for the transaction quality or pricing policies of independent dealers.
          </p>
        </section>

        <div className="pt-10 border-t border-slate-100 flex items-center justify-between">
          <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Last Updated: April 2024</p>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span className="text-xs font-bold text-emerald-800">Verified Hub</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfUse;
