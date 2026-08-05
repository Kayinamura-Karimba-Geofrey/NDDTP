import React, { useState } from 'react';
import { FiRadio } from 'react-icons/fi';


export type DefconLevel = 5 | 4 | 3 | 2 | 1;

interface DefconConfig {
  level: DefconLevel;
  name: string;
  color: string;
  bg: string;
  description: string;
}

const DEFCON_STATES: Record<DefconLevel, DefconConfig> = {
  5: { level: 5, name: 'DEFCON 5', color: 'text-emerald-400', bg: 'bg-emerald-950/80 border-emerald-800', description: 'PEACETIME READINESS - NORMAL OPERATIONS' },
  4: { level: 4, name: 'DEFCON 4', color: 'text-blue-400', bg: 'bg-blue-950/80 border-blue-800', description: 'INCREASED INTELLIGENCE WATCH & SECURITY' },
  3: { level: 3, name: 'DEFCON 3', color: 'text-yellow-400', bg: 'bg-yellow-950/80 border-yellow-800', description: 'AIR FORCE / NAVY READINESS INCREASED' },
  2: { level: 2, name: 'DEFCON 2', color: 'text-orange-400', bg: 'bg-orange-950/80 border-orange-800', description: 'ARMED FORCES READY TO DEPLOY IN 6 HOURS' },
  1: { level: 1, name: 'DEFCON 1', color: 'text-red-500 animate-pulse', bg: 'bg-red-950/90 border-red-700', description: 'MAXIMUM READINESS - IMMINENT ACTION' },
};

export const DefconTickerBar: React.FC = () => {
  const [currentLevel, setCurrentLevel] = useState<DefconLevel>(4);
  const activeDefcon = DEFCON_STATES[currentLevel];

  return (
    <div className={`flex items-center justify-between px-4 py-1.5 border-b text-xs font-mono transition-colors duration-500 ${activeDefcon.bg}`}>
      <div className="flex items-center gap-3 overflow-hidden">
        <div className="flex items-center gap-1.5 font-bold tracking-wider">
          <FiRadio className={`w-4 h-4 ${activeDefcon.color}`} />
          <span className={`px-2 py-0.5 rounded font-black border border-current ${activeDefcon.color}`}>

            {activeDefcon.name}
          </span>
        </div>
        <span className="text-slate-300 truncate hidden sm:inline">
          {activeDefcon.description}
        </span>
      </div>

      <div className="flex items-center gap-1">
        <span className="text-[10px] text-slate-400 mr-2 hidden md:inline">SET COMMAND LEVEL:</span>
        {([5, 4, 3, 2, 1] as DefconLevel[]).map((lvl) => (
          <button
            key={lvl}
            onClick={() => setCurrentLevel(lvl)}
            className={`px-2 py-0.5 text-[10px] font-bold rounded border transition ${
              currentLevel === lvl
                ? 'bg-slate-100 text-slate-900 border-white font-black scale-105'
                : 'bg-slate-900/60 text-slate-400 border-slate-700 hover:text-slate-200'
            }`}
          >
            L{lvl}
          </button>
        ))}
      </div>
    </div>
  );
};
