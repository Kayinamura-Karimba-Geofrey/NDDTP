import React, { useState } from 'react';
import { FiKey, FiAlertTriangle, FiCheckCircle, FiUserCheck, FiLock } from 'react-icons/fi';


interface DualAuthModalProps {
  actionTitle: string;
  onSuccess: () => void;
  onCancel: () => void;
}

export const TwoManRuleModal: React.FC<DualAuthModalProps> = ({ actionTitle, onSuccess, onCancel }) => {
  const [firstOfficer] = useState('Gen. J. Karamba (Primary Commander)');
  const [secondOfficer, setSecondOfficer] = useState('');
  const [pinCode, setPinCode] = useState('');
  const [error, setError] = useState('');

  const handleApprove = (e: React.FormEvent) => {
    e.preventDefault();
    if (!secondOfficer) {
      setError('Second Officer signature is required.');
      return;
    }
    if (secondOfficer === firstOfficer) {
      setError('VIOLATION: Two-Man Rule requires two DIFFERENT authorized officers.');
      return;
    }
    if (pinCode.length < 4) {
      setError('Valid Officer Security PIN required.');
      return;
    }

    onSuccess();
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50 font-mono">
      <div className="bg-slate-900 border-2 border-red-800 p-6 rounded-lg w-full max-w-md space-y-4 shadow-2xl text-slate-100">
        <div className="flex items-center gap-3 border-b border-red-800/60 pb-3">
          <FiKey className="w-7 h-7 text-red-500 animate-pulse" />
          <div>
            <h2 className="text-sm font-bold text-red-400">TWO-MAN RULE DUAL-AUTHORIZATION</h2>
            <p className="text-[10px] text-slate-400">MIL-STD SECURE HIGH-IMPACT COMMAND APPROVAL</p>
          </div>
        </div>

        <div className="bg-slate-950 p-3 rounded border border-slate-800 text-xs">
          <span className="text-slate-400">TARGET ACTION:</span>
          <p className="font-bold text-amber-400 mt-0.5">{actionTitle}</p>
        </div>

        <form onSubmit={handleApprove} className="space-y-3 text-xs">
          <div>
            <label className="text-slate-400 flex items-center gap-1.5 mb-1">
              <FiUserCheck className="w-3.5 h-3.5 text-blue-400" /> 1st Commanding Officer
            </label>
            <input
              type="text"
              disabled
              value={firstOfficer}
              className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-slate-300 font-bold"
            />
          </div>

          <div>
            <label className="text-slate-400 flex items-center gap-1.5 mb-1">
              <FiUserCheck className="w-3.5 h-3.5 text-emerald-400" /> 2nd Authorizing Officer ID
            </label>
            <input
              type="text"
              placeholder="Enter 2nd Officer Name / ID..."
              value={secondOfficer}
              onChange={(e) => { setSecondOfficer(e.target.value); setError(''); }}
              className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-white font-bold focus:border-red-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-slate-400 flex items-center gap-1.5 mb-1">
              <FiLock className="w-3.5 h-3.5 text-red-400" /> 2nd Officer Security PIN
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={pinCode}
              onChange={(e) => { setPinCode(e.target.value); setError(''); }}
              className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-white focus:border-red-500 focus:outline-none"
            />
          </div>

          {error && (
            <div className="p-2 bg-red-950/80 border border-red-800 text-red-400 rounded text-[11px] flex items-center gap-1.5">
              <FiAlertTriangle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="flex gap-2 pt-2">
            <button type="button" onClick={onCancel} className="flex-1 py-2 bg-slate-800 text-slate-300 rounded font-bold hover:bg-slate-700">ABORT</button>
            <button type="submit" className="flex-1 py-2 bg-red-700 hover:bg-red-600 text-white rounded font-bold flex items-center justify-center gap-1.5">
              <FiCheckCircle className="w-4 h-4" /> AUTHORIZE
            </button>
          </div>
        </form>
      </div>
    </div>

  );
};
