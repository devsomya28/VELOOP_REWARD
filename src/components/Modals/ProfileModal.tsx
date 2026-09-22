import React from 'react';
import { X, ShieldCheck, Gem, Trophy, Award, Calendar, RotateCcw } from 'lucide-react';
import { UserStats } from '../../types';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  userStats: UserStats;
  onResetDemo: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  userStats,
  onResetDemo
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg flex flex-col rounded-2xl glass-panel border border-amber-500/30 shadow-2xl overflow-hidden text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-white/[0.08] flex items-center justify-between bg-slate-900/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center font-black text-slate-950 shadow-lg shadow-amber-500/20">
              AC
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm sm:text-base font-extrabold text-white">
                  Apex Capital Desk
                </h3>
                <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-amber-400/10 text-amber-300 border border-amber-400/30">
                  VIP TIER 1
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-mono">
                Entity LEI: #VEL-89241 · KYC Verified
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center border border-white/10 transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Balances Card */}
        <div className="p-4 sm:p-5 space-y-4">
          <div className="grid grid-cols-3 gap-2 sm:gap-3 text-center">
            <div className="p-3 rounded-xl bg-slate-900/70 border border-amber-400/30 shadow-inner">
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
                Primary VEs
              </span>
              <span className="text-base sm:text-lg font-black text-white font-mono-numbers block mt-0.5">
                {userStats.vesBalance.toLocaleString()}
              </span>
              <span className="text-[9px] text-amber-400 font-bold">Liquid Yield</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/70 border border-white/10 shadow-inner">
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
                Vault Gems
              </span>
              <span className="text-base sm:text-lg font-black text-white font-mono-numbers block mt-0.5">
                {userStats.gemsBalance}
              </span>
              <span className="text-[9px] text-sky-400 font-bold">Multiplier Assets</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/70 border border-purple-400/30 shadow-inner">
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
                Social SVEs
              </span>
              <span className="text-base sm:text-lg font-black text-white font-mono-numbers block mt-0.5">
                {userStats.svesBalance}
              </span>
              <span className="text-[9px] text-purple-300 font-bold">Promo Units</span>
            </div>
          </div>

          {/* Activity Statistics */}
          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-white/5 space-y-2 text-xs">
            <div className="flex items-center justify-between text-slate-300">
              <span className="flex items-center gap-1.5 text-slate-400">
                <Calendar className="w-3.5 h-3.5 text-amber-400" />
                Streak Status
              </span>
              <span className="font-semibold text-white">
                {userStats.streakClaimedToday ? 'Day 7 Claimed Today' : 'Day 6 / 7 Ready'}
              </span>
            </div>

            <div className="flex items-center justify-between text-slate-300">
              <span className="flex items-center gap-1.5 text-slate-400">
                <Trophy className="w-3.5 h-3.5 text-amber-400" />
                Competition Rank
              </span>
              <span className="font-semibold text-white">
                #42 Globally (Top 5%)
              </span>
            </div>

            <div className="flex items-center justify-between text-slate-300">
              <span className="flex items-center gap-1.5 text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Security Clearance
              </span>
              <span className="font-semibold text-emerald-400">
                Institutional Level 2 KYC
              </span>
            </div>
          </div>
        </div>

        {/* Footer with Reset Demo */}
        <div className="p-3.5 sm:p-4 border-t border-white/[0.08] bg-slate-950 flex items-center justify-between text-xs">
          <button
            type="button"
            onClick={onResetDemo}
            className="text-slate-400 hover:text-amber-400 transition flex items-center gap-1.5 cursor-pointer text-[11px]"
          >
            <RotateCcw className="w-3 h-3" />
            Reset Demo Session
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold transition cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
