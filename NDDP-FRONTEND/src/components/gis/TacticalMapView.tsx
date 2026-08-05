import React, { useState } from 'react';
import { Shield, MapPin, Compass, AlertTriangle, Eye, Activity } from 'lucide-react';

interface TacticalUnit {
  id: string;
  symbolCode: string; // MIL-STD-2525D code
  name: string;
  affiliation: 'FRIENDLY' | 'HOSTILE' | 'NEUTRAL' | 'UNKNOWN';
  type: 'ARMORED' | 'INFANTRY' | 'AIR_SUPPORT' | 'NAVAL' | 'HQ';
  clearance: 'UNCLASSIFIED' | 'SECRET' | 'TOP_SECRET';
  coordinates: { lat: number; lng: number };
  status: 'OPERATIONAL' | 'ENGAGED' | 'DISCONNECTED';
  speed: string;
  heading: number;
}

const DEMO_UNITS: TacticalUnit[] = [
  {
    id: 'U-101',
    symbolCode: 'SFGPUUCI----',
    name: '1st Battalion Armored Division (Alpha)',
    affiliation: 'FRIENDLY',
    type: 'ARMORED',
    clearance: 'TOP_SECRET',
    coordinates: { lat: -1.9441, lng: 30.0619 },
    status: 'OPERATIONAL',
    speed: '45 km/h',
    heading: 120,
  },
  {
    id: 'U-204',
    symbolCode: 'SFGPUCII----',
    name: 'Forward Recon Special Ops (Bravo)',
    affiliation: 'FRIENDLY',
    type: 'INFANTRY',
    clearance: 'SECRET',
    coordinates: { lat: -1.9510, lng: 30.0920 },
    status: 'ENGAGED',
    speed: '0 km/h',
    heading: 45,
  },
  {
    id: 'U-909',
    symbolCode: 'SHGPUCA----',
    name: 'Unidentified Aerial Threat (Track #89)',
    affiliation: 'HOSTILE',
    type: 'AIR_SUPPORT',
    clearance: 'TOP_SECRET',
    coordinates: { lat: -1.9300, lng: 30.1100 },
    status: 'OPERATIONAL',
    speed: '650 km/h',
    heading: 270,
  },
  {
    id: 'U-050',
    symbolCode: 'SNGPUCN----',
    name: 'NGO Humanitarian Convoy',
    affiliation: 'NEUTRAL',
    type: 'NAVAL',
    clearance: 'UNCLASSIFIED',
    coordinates: { lat: -1.9650, lng: 30.0400 },
    status: 'OPERATIONAL',
    speed: '30 km/h',
    heading: 180,
  },
];

export const TacticalMapView: React.FC = () => {
  const [selectedUnit, setSelectedUnit] = useState<TacticalUnit | null>(DEMO_UNITS[0]);
  const [filterAffiliation, setFilterAffiliation] = useState<string>('ALL');

  const getAffiliationColor = (aff: TacticalUnit['affiliation']) => {
    switch (aff) {
      case 'FRIENDLY': return '#3b82f6'; // Blue
      case 'HOSTILE': return '#ef4444'; // Red
      case 'NEUTRAL': return '#22c55e'; // Green
      default: return '#eab308'; // Yellow
    }
  };

  const filteredUnits = filterAffiliation === 'ALL'
    ? DEMO_UNITS
    : DEMO_UNITS.filter((u) => u.affiliation === filterAffiliation);

  return (
    <div className="flex flex-col h-[calc(100vh-5rem)] bg-slate-950 text-slate-100 font-mono rounded-lg overflow-hidden border border-slate-800">
      {/* Tactical Header */}
      <div className="flex items-center justify-between px-6 py-3 bg-slate-900 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <Shield className="w-6 h-6 text-blue-400" />
          <h1 className="text-lg font-bold tracking-wider text-blue-400">
            C4ISR MIL-STD-2525D COP (COMMON OPERATIONAL PICTURE)
          </h1>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <span className="flex items-center gap-1.5 px-3 py-1 bg-emerald-950/60 text-emerald-400 border border-emerald-800 rounded">
            <Activity className="w-3.5 h-3.5 animate-pulse" />
            GRID LINK: ONLINE
          </span>
          <span className="px-3 py-1 bg-amber-950/60 text-amber-400 border border-amber-800 rounded">
            CLEARANCE: TOP SECRET // NOFORN
          </span>
        </div>
      </div>

      {/* Main Map Container */}
      <div className="relative flex-1 flex overflow-hidden">
        {/* Simulated Radar Grid & Tactical Overlay */}
        <div className="relative flex-1 bg-slate-950 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] overflow-hidden flex items-center justify-center">
          {/* Tactical Crosshairs */}
          <div className="absolute inset-0 border border-slate-800/40 pointer-events-none flex items-center justify-center">
            <div className="w-full h-[1px] bg-emerald-500/10"></div>
            <div className="h-full w-[1px] bg-emerald-500/10 absolute"></div>
            <div className="w-96 h-96 rounded-full border border-emerald-500/20 absolute"></div>
            <div className="w-[600px] h-[600px] rounded-full border border-emerald-500/10 absolute"></div>
          </div>

          {/* Unit Markers on Grid */}
          <div className="relative w-full h-full p-12">
            {filteredUnits.map((unit) => {
              const color = getAffiliationColor(unit.affiliation);
              const isSelected = selectedUnit?.id === unit.id;

              return (
                <div
                  key={unit.id}
                  onClick={() => setSelectedUnit(unit)}
                  className={`absolute cursor-pointer transition-transform duration-300 hover:scale-110 flex flex-col items-center ${
                    isSelected ? 'z-30 scale-110' : 'z-10'
                  }`}
                  style={{
                    left: `${((unit.coordinates.lng - 30.0) * 1000) % 80 + 10}%`,
                    top: `${((unit.coordinates.lat + 2.0) * 1000) % 80 + 10}%`,
                  }}
                >
                  {/* MIL-STD Symbol Box */}
                  <div
                    className="w-10 h-10 border-2 flex items-center justify-center rounded font-bold text-xs shadow-lg relative bg-slate-900/90"
                    style={{ borderColor: color, color }}
                  >
                    {unit.type[0]}
                    {/* Direction Vector Arrow */}
                    <div
                      className="absolute -top-3 w-1.5 h-3 rounded-full"
                      style={{ backgroundColor: color, transform: `rotate(${unit.heading}deg)` }}
                    />
                  </div>

                  {/* Unit Label */}
                  <div className="mt-1 px-2 py-0.5 bg-slate-900/90 text-[10px] text-slate-300 rounded border border-slate-800 whitespace-nowrap shadow">
                    {unit.name}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Map Controls Floating Filter */}
          <div className="absolute top-4 left-4 bg-slate-900/90 border border-slate-800 p-3 rounded shadow-xl flex gap-2 text-xs">
            {['ALL', 'FRIENDLY', 'HOSTILE', 'NEUTRAL'].map((aff) => (
              <button
                key={aff}
                onClick={() => setFilterAffiliation(aff)}
                className={`px-3 py-1 rounded transition-colors ${
                  filterAffiliation === aff
                    ? 'bg-blue-600 text-white font-bold'
                    : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {aff}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Unit Telemetry Sidebar */}
        {selectedUnit && (
          <div className="w-80 bg-slate-900 border-l border-slate-800 p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                <span className="text-xs text-slate-400">TRACK ID: {selectedUnit.id}</span>
                <span
                  className="px-2 py-0.5 text-[10px] font-bold rounded"
                  style={{
                    backgroundColor: `${getAffiliationColor(selectedUnit.affiliation)}20`,
                    color: getAffiliationColor(selectedUnit.affiliation),
                  }}
                >
                  {selectedUnit.affiliation}
                </span>
              </div>

              <h2 className="text-sm font-bold text-white mb-2">{selectedUnit.name}</h2>
              <p className="text-xs text-slate-400 mb-4">MIL-STD Symbol: {selectedUnit.symbolCode}</p>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between py-1.5 border-b border-slate-800/60">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-blue-400" /> Coordinates
                  </span>
                  <span className="text-slate-200">
                    {selectedUnit.coordinates.lat.toFixed(4)}, {selectedUnit.coordinates.lng.toFixed(4)}
                  </span>
                </div>

                <div className="flex justify-between py-1.5 border-b border-slate-800/60">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5 text-blue-400" /> Heading / Speed
                  </span>
                  <span className="text-slate-200">
                    {selectedUnit.heading}° @ {selectedUnit.speed}
                  </span>
                </div>

                <div className="flex justify-between py-1.5 border-b border-slate-800/60">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5 text-amber-400" /> Clearance Level
                  </span>
                  <span className="text-amber-400 font-bold">{selectedUnit.clearance}</span>
                </div>

                <div className="flex justify-between py-1.5 border-b border-slate-800/60">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-emerald-400" /> Readiness Status
                  </span>
                  <span className="text-emerald-400 font-bold">{selectedUnit.status}</span>
                </div>
              </div>
            </div>

            <button className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded transition flex items-center justify-center gap-2">
              <Eye className="w-4 h-4" /> LOCK CAMERA & TRACK
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
