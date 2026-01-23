
import React, { useEffect, useState } from 'react';

const TraditionalClock: React.FC<{ theme: 'light' | 'dark' }> = ({ theme }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const seconds = time.getSeconds();
  const minutes = time.getMinutes();
  const hours = time.getHours();

  const sRotate = seconds * 6;
  const mRotate = minutes * 6 + seconds * 0.1;
  const hRotate = (hours % 12) * 30 + minutes * 0.5;

  const isDark = theme === 'dark';

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className={`relative w-28 h-28 rounded-full border-4 shadow-2xl flex items-center justify-center transition-colors duration-700 ${
        isDark ? 'bg-[#2d1b0d] border-[#4a2c14]' : 'bg-[#fdfcf0] border-[#5d4037]'
      }`} style={{ 
        backgroundImage: isDark 
          ? 'radial-gradient(circle, #3e2723 0%, #1b110a 100%)' 
          : 'radial-gradient(circle, #fffde7 0%, #d7ccc8 100%)',
        boxShadow: 'inset 0 0 20px rgba(0,0,0,0.3), 0 10px 25px rgba(0,0,0,0.2)'
      }}>
        {/* Hour markers */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-2 rounded-full"
            style={{
              transform: `rotate(${i * 30}deg) translateY(-46px)`,
              backgroundColor: isDark ? '#d4af37' : '#5d4037',
              opacity: i % 3 === 0 ? 1 : 0.4
            }}
          />
        ))}

        {/* Center Nut */}
        <div className={`absolute w-3 h-3 rounded-full z-30 shadow-md ${isDark ? 'bg-amber-400' : 'bg-slate-800'}`} />

        {/* Hands */}
        <div 
          className={`absolute w-1 h-14 rounded-full origin-bottom z-10 transition-transform ${isDark ? 'bg-amber-200' : 'bg-slate-800'}`}
          style={{ transform: `translateY(-28px) rotate(${hRotate}deg)`, width: '3px', height: '32px' }}
        />
        <div 
          className={`absolute w-1 h-18 rounded-full origin-bottom z-10 transition-transform ${isDark ? 'bg-amber-100' : 'bg-slate-600'}`}
          style={{ transform: `translateY(-36px) rotate(${mRotate}deg)`, width: '2px', height: '42px' }}
        />
        <div 
          className="absolute w-0.5 h-20 bg-emerald-500 rounded-full origin-bottom z-20 transition-transform shadow-sm"
          style={{ transform: `translateY(-40px) rotate(${sRotate}deg)` }}
        />
      </div>
      <p className={`text-[9px] font-black uppercase tracking-[0.3em] mt-3 ${isDark ? 'text-amber-500/60' : 'text-slate-400'}`}>
        Standard Valley Time
      </p>
    </div>
  );
};

export default TraditionalClock;
