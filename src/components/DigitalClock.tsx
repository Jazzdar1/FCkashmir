
import React, { useEffect, useState } from 'react';

const DigitalClock: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour12: true,
      hour: '2-digit',
      minute: '2-digit',
      second: compact ? undefined : '2-digit'
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  if (compact) {
    return (
      <div className="flex flex-col items-end leading-none">
        <div className="text-sm font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300 drop-shadow-[0_0_5px_rgba(52,211,153,0.5)]">
          {formatTime(time)}
        </div>
        <span className="text-[8px] font-bold text-white/60 uppercase tracking-tighter mt-0.5">{formatDate(time)}</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 px-4 py-1.5 bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_0_15px_rgba(16,185,129,0.15)]">
      <div className="flex flex-col items-start leading-none shrink-0">
        <span className="text-[8px] font-black uppercase tracking-widest text-emerald-400/70">Valley</span>
        <span className="text-[10px] font-bold text-white whitespace-nowrap">{formatDate(time)}</span>
      </div>
      
      <div className="h-6 w-[1px] bg-white/10 rounded-full" />

      <div className="text-lg font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-400 animate-pulse drop-shadow-[0_0_8px_rgba(52,211,153,0.8)]">
        {formatTime(time)}
      </div>
    </div>
  );
};

export default DigitalClock;
