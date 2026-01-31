
import React from 'react';
import { Award, CheckCircle2, Star, Info, ChevronRight, Apple, ArrowRight, FlaskConical, Landmark, Store, ExternalLink, ShieldCheck } from 'lucide-react';

const gradingSteps = [
  {
    grade: "Grade A (Premium)",
    color: "emerald",
    desc: "International export quality. Perfectly uniform red blush (>80%) and symmetry.",
    imageUrl: "https://images.unsplash.com/photo-1579613832125-5d3455fe7924?q=80&w=800",
    fullDescription: "Reserved for the finest harvests. These apples represent the highest market value and are suitable for global exports and tier-1 domestic retail.",
    specs: [
      "Size: 75mm - 85mm diameter", 
      "Color: High uniform red (>80%)",
      "Texture: Extremely firm & crisp",
      "Shape: Perfect symmetrical conical",
      "Defects: Zero visible blemishes"
    ],
    market: "Export / Premium Retail",
    accentClass: "bg-emerald-900",
    lightClass: "bg-emerald-50",
    textClass: "text-emerald-900"
  },
  {
    grade: "Grade B (Select)",
    color: "emerald",
    desc: "Superior domestic quality. Good color and minimal superficial marks.",
    imageUrl: "https://images.unsplash.com/photo-1521949392261-2d7c54179e7e?q=80&w=800",
    fullDescription: "The backbone of regional Mandi sales. These apples possess excellent internal quality with minor aesthetic variations that do not compromise shelf life.",
    specs: [
      "Size: 65mm - 75mm diameter", 
      "Color: Balanced red (>60%)",
      "Texture: Standard firm",
      "Shape: Mostly symmetrical",
      "Defects: Max 5% surface healing"
    ],
    market: "Regional Terminal Mandis",
    accentClass: "bg-emerald-700",
    lightClass: "bg-emerald-50",
    textClass: "text-emerald-800"
  },
  {
    grade: "Grade C (Utility)",
    color: "emerald",
    desc: "Processing and local consumption. Irregular shapes or minor hail marks.",
    imageUrl: "https://images.unsplash.com/photo-1614949537985-e11559869680?q=80&w=800",
    fullDescription: "Ideal for the juice industry, preserves, or local discount markets. These apples may show weather-related stress but remain nutritious and flavorful.",
    specs: [
      "Size: Mixed / Under 65mm", 
      "Color: Mixed coloration",
      "Texture: Medium to soft",
      "Shape: Irregular shapes accepted",
      "Defects: Hail pits / Cosmetic marks"
    ],
    market: "Juice Plants / Local Sales",
    accentClass: "bg-emerald-600",
    lightClass: "bg-emerald-50",
    textClass: "text-emerald-700"
  }
];

const GradingGuide: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-20 no-scrollbar">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-emerald-900 text-white rounded-[2rem] flex items-center justify-center shadow-2xl ring-4 ring-emerald-100">
            <Award className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-3xl font-heading font-bold text-slate-900">Quality Grading Pro</h2>
            <p className="text-slate-500 font-medium">Standardized sorting protocols for the J&K apple industry.</p>
          </div>
        </div>
        <div className="bg-emerald-50 px-4 py-2 rounded-2xl border border-emerald-100 flex items-center gap-2">
           <ShieldCheck className="w-4 h-4 text-emerald-600" />
           <span className="text-[10px] font-black text-emerald-700 uppercase tracking-widest">Quality Assurance</span>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {gradingSteps.map((step, idx) => (
          <div key={idx} className="bg-white p-10 rounded-[3.5rem] border border-slate-100 shadow-sm hover:shadow-2xl transition-all group flex flex-col justify-between overflow-hidden relative">
            <div className="space-y-6">
              <div className="w-full h-56 -mx-10 -mt-10 mb-8 relative overflow-hidden rounded-t-[3rem] border-b border-emerald-50">
                <img src={step.imageUrl} alt={step.grade} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/60 to-transparent" />
                <div className="absolute bottom-6 left-6 px-4 py-2 bg-white/20 backdrop-blur-md rounded-2xl border border-white/30 text-white font-bold text-xs uppercase tracking-widest">
                  Visual Guide
                </div>
              </div>

              <div className="space-y-3">
                <h3 className={`text-2xl font-bold ${step.textClass}`}>{step.grade}</h3>
                <p className="text-slate-700 text-sm font-medium leading-relaxed italic">
                  "{step.desc}"
                </p>
              </div>

              <div className="bg-emerald-50 p-8 rounded-[2.5rem] border border-emerald-100 space-y-4">
                <h4 className="text-[10px] font-black uppercase text-emerald-800 tracking-widest flex items-center gap-2">
                  <Star className="w-3.5 h-3.5 fill-current" /> Specifications
                </h4>
                <ul className="space-y-3">
                  {step.specs.map((spec, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-emerald-900 font-bold">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full mt-1.5 shrink-0" />
                      {spec}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className={`mt-10 p-6 rounded-2xl ${step.accentClass} text-white flex justify-between items-center shadow-xl`}>
              <div>
                <p className="text-[8px] font-black uppercase opacity-60 tracking-widest">Market Targeting</p>
                <p className="text-xs font-bold">{step.market}</p>
              </div>
              <ArrowRight className="w-5 h-5" />
            </div>
          </div>
        ))}
      </div>

      <div className="bg-emerald-950 rounded-[3.5rem] p-12 lg:p-16 text-white relative overflow-hidden shadow-2xl mt-12">
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 bg-white/10 px-5 py-2.5 rounded-full border border-white/5">
              <Star className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-black uppercase tracking-widest text-emerald-400">Economics of Grading</span>
            </div>
            <h3 className="text-4xl lg:text-6xl font-heading font-bold leading-tight">
              Sort Well, <br/><span className="text-emerald-400">Sell High.</span>
            </h3>
            <p className="text-emerald-100/70 text-lg font-medium leading-relaxed max-w-lg">
              Mixing grades reduces the value of the entire box. Standardized grading can boost net seasonal profit by up to 25%.
            </p>
          </div>
          
          <div className="bg-white/5 backdrop-blur-md p-10 rounded-[3rem] border border-white/10 space-y-6">
            <h4 className="font-bold text-2xl">Mandi Best Practices</h4>
            <ul className="space-y-4">
              {[
                "Use high-quality liners and cardboard boxes.",
                "Mark grades clearly on the side of the box.",
                "Avoid using excessive padding that hides fruit.",
                "Consistent size across the box is mandatory."
              ].map((tip, i) => (
                <li key={i} className="flex items-start gap-4 text-sm font-medium text-emerald-100">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 shrink-0 shadow-[0_0_10px_rgba(52,211,153,0.5)]" />
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
      </div>
    </div>
  );
};

export default GradingGuide;
