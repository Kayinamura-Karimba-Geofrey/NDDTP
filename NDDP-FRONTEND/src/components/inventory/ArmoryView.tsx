import React, { useState } from 'react';
import { Shield, Box, AlertOctagon, FileText, CheckCircle, RefreshCw, Search } from 'lucide-react';
import type { OrdnanceItem, ExpenditureLog } from '../../../../shared/inventory/armory.types';

const INITIAL_ARMORY: OrdnanceItem[] = [
  {
    id: 'ARM-001',
    serialNumber: 'WPN-AK47-88902',
    name: 'Standard Issue Assault Rifle 5.56mm',
    category: 'RIFLE',
    caliber: '5.56x45mm',
    vaultLocation: 'Vault 01 - Fort Kigali',
    unitAssigned: '1st Mechanized Infantry',
    readiness: 'FMC',
    quantityOnHand: 450,
    minThreshold: 100,
    lastInspectedAt: '2026-08-01T08:00:00Z',
  },
  {
    id: 'ARM-002',
    serialNumber: 'MUN-556-99012',
    name: '5.56x45mm NATO Ball Ammunition (Crate)',
    category: 'MUNITIONS',
    caliber: '5.56x45mm',
    vaultLocation: 'Ammono Bunker 04',
    unitAssigned: 'Armory Reserve',
    readiness: 'FMC',
    quantityOnHand: 120000,
    minThreshold: 25000,
    lastInspectedAt: '2026-08-04T14:30:00Z',
  },
  {
    id: 'ARM-003',
    serialNumber: 'ART-155-00412',
    name: '155mm Howitzer Heavy Shells',
    category: 'HEAVY_ARTILLERY',
    caliber: '155mm_ARTILLERY',
    vaultLocation: 'Heavy Ordnance Bunker B',
    unitAssigned: '3rd Artillery Regiment',
    readiness: 'PMC',
    quantityOnHand: 120,
    minThreshold: 200,
    lastInspectedAt: '2026-07-28T10:15:00Z',
  },
];

const INITIAL_EXPENDITURES: ExpenditureLog[] = [
  {
    id: 'EXP-901',
    ordnanceId: 'ARM-002',
    quantitySpent: 5000,
    operationName: 'Live Fire Tactical Exercise Alpha',
    authorizedBy: 'Col. J. Karamba',
    timestamp: '2026-08-04T16:00:00Z',
    notes: 'Training exercise expenditure authorized by Command.',
  },
];

export const ArmoryView: React.FC = () => {
  const [items, setItems] = useState<OrdnanceItem[]>(INITIAL_ARMORY);
  const [expenditures, setExpenditures] = useState<ExpenditureLog[]>(INITIAL_EXPENDITURES);
  const [searchTerm, setSearchTerm] = useState('');
  const [showLogModal, setShowLogModal] = useState(false);
  const [selectedOrdnanceId, setSelectedOrdnanceId] = useState(INITIAL_ARMORY[0].id);
  const [spendQty, setSpendQty] = useState(500);
  const [opName, setOpName] = useState('Routine Range Training');

  const filteredItems = items.filter(
    (i) => i.name.toLowerCase().includes(searchTerm.toLowerCase()) || i.serialNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLogExpenditure = (e: React.FormEvent) => {
    e.preventDefault();
    const item = items.find((i) => i.id === selectedOrdnanceId);
    if (!item || item.quantityOnHand < spendQty) {
      alert('Invalid expenditure quantity or insufficient stock.');
      return;
    }

    setItems((prev) =>
      prev.map((i) => (i.id === selectedOrdnanceId ? { ...i, quantityOnHand: i.quantityOnHand - spendQty } : i))
    );

    const newLog: ExpenditureLog = {
      id: `EXP-${Date.now()}`,
      ordnanceId: selectedOrdnanceId,
      quantitySpent: spendQty,
      operationName: opName,
      authorizedBy: 'Maj. G. Kayi (Current User)',
      timestamp: new Date().toISOString(),
    };

    setExpenditures([newLog, ...expenditures]);
    setShowLogModal(false);
  };

  return (
    <div className="p-6 space-y-6 bg-slate-950 text-slate-100 min-h-screen font-sans">
      {/* Header */}
      <div className="flex items-center justify-between bg-slate-900 border border-slate-800 p-4 rounded-lg">
        <div className="flex items-center gap-3">
          <Shield className="w-8 h-8 text-amber-500" />
          <div>
            <h1 className="text-xl font-bold tracking-wide text-white">DEFENSE ARMORY & ORDNANCE INVENTORY</h1>
            <p className="text-xs text-slate-400">Military Hardware, Munitions Vaults & Expenditure Logs</p>
          </div>
        </div>

        <button
          onClick={() => setShowLogModal(true)}
          className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs rounded transition flex items-center gap-2"
        >
          <FileText className="w-4 h-4" /> RECORD AMMO EXPENDITURE
        </button>
      </div>

      {/* Inventory Grid & Controls */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search serial number, weapon name, or caliber..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded pl-10 pr-4 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-lg overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
            <tr>
              <th className="p-3">SERIAL NUMBER</th>
              <th className="p-3">ORDNANCE NAME</th>
              <th className="p-3">CATEGORY</th>
              <th className="p-3">VAULT LOCATION</th>
              <th className="p-3">STOCK LEVEL</th>
              <th className="p-3">READINESS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {filteredItems.map((item) => {
              const isLow = item.quantityOnHand < item.minThreshold;
              return (
                <tr key={item.id} className="hover:bg-slate-800/50">
                  <td className="p-3 font-mono text-amber-400">{item.serialNumber}</td>
                  <td className="p-3 font-bold text-slate-100">{item.name}</td>
                  <td className="p-3 text-slate-300">{item.category}</td>
                  <td className="p-3 text-slate-400">{item.vaultLocation}</td>
                  <td className="p-3 font-bold">
                    <span className={isLow ? 'text-red-400 font-bold flex items-center gap-1' : 'text-emerald-400'}>
                      {item.quantityOnHand.toLocaleString()}{' '}
                      {isLow && <AlertOctagon className="w-3.5 h-3.5" />}
                    </span>
                  </td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950 text-emerald-400 border border-emerald-800">
                      {item.readiness}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Recent Expenditures */}
      <div className="bg-slate-900 border border-slate-800 rounded-lg p-4 space-y-3">
        <h2 className="text-sm font-bold text-white flex items-center gap-2">
          <RefreshCw className="w-4 h-4 text-amber-400" /> RECENT EXPENDITURE AUDIT LOGS
        </h2>
        <div className="space-y-2">
          {expenditures.map((log) => (
            <div key={log.id} className="flex items-center justify-between bg-slate-950 p-3 rounded border border-slate-800 text-xs">
              <div>
                <span className="font-bold text-amber-400">{log.operationName}</span>
                <span className="text-slate-400 ml-2">({log.quantitySpent} units spent)</span>
              </div>
              <div className="text-slate-500 text-[10px]">Authorized by: {log.authorizedBy}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Log Modal */}
      {showLogModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
          <form onSubmit={handleLogExpenditure} className="bg-slate-900 border border-slate-800 p-6 rounded-lg w-96 space-y-4">
            <h3 className="text-sm font-bold text-white">Record Munitions Expenditure</h3>
            <div>
              <label className="text-xs text-slate-400 block mb-1">Select Ordnance</label>
              <select
                value={selectedOrdnanceId}
                onChange={(e) => setSelectedOrdnanceId(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-xs text-white"
              >
                {items.map((i) => (
                  <option key={i.id} value={i.id}>{i.name} (Stock: {i.quantityOnHand})</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs text-slate-400 block mb-1">Quantity Spent</label>
              <input
                type="number"
                value={spendQty}
                onChange={(e) => setSpendQty(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-xs text-white"
              />
            </div>
            <div>
              <label className="text-xs text-slate-400 block mb-1">Operation / Exercise Name</label>
              <input
                type="text"
                value={opName}
                onChange={(e) => setOpName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-xs text-white"
              />
            </div>
            <div className="flex gap-2 pt-2">
              <button type="button" onClick={() => setShowLogModal(false)} className="flex-1 py-1.5 bg-slate-800 text-xs rounded text-slate-300">Cancel</button>
              <button type="submit" className="flex-1 py-1.5 bg-amber-600 text-xs rounded text-white font-bold">Record</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
