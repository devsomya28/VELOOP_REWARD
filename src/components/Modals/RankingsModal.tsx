import React, { useState } from 'react';
import { X, Trophy, Search, ChevronUp, ChevronDown, Minus, Award, Shield } from 'lucide-react';
import { INITIAL_LEADERBOARD_USERS } from '../../utils/mockData';

interface RankingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RankingsModal: React.FC<RankingsModalProps> = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'vip' | 'rewards'>('all');

  if (!isOpen) return null;

  const filteredUsers = INITIAL_LEADERBOARD_USERS.filter(u => {
    const matchesSearch = u.username.toLowerCase().includes(searchTerm.toLowerCase());
    if (activeTab === 'vip') {
      return matchesSearch && u.tier === 'VIP Institutional';
    }
    return matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl max-h-[90vh] flex flex-col rounded-2xl glass-panel border border-amber-500/30 shadow-2xl overflow-hidden text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-white/[0.08] flex items-center justify-between bg-slate-900/60">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-400/40 flex items-center justify-center">
              <Trophy className="w-4 h-4 text-amber-400" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-extrabold text-white tracking-tight">
                Global Competition Standings
              </h3>
              <p className="text-xs text-slate-400">
                Active Pool: 50,000 VEs · Ends in 3d 14h 22m
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center border border-white/10 transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Filter Controls & Search */}
        <div className="p-3 sm:p-4 border-b border-white/[0.06] bg-slate-900/40 flex flex-col sm:flex-row gap-2.5 items-center justify-between">
          <div className="flex items-center gap-1.5 p-1 rounded-lg bg-slate-950/80 border border-white/5 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1 rounded-md text-xs font-semibold transition cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-amber-400/20 text-amber-300 border border-amber-400/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              All Standings
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('vip')}
              className={`px-3 py-1 rounded-md text-xs font-semibold transition cursor-pointer ${
                activeTab === 'vip'
                  ? 'bg-amber-400/20 text-amber-300 border border-amber-400/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              VIP Tier Only
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('rewards')}
              className={`px-3 py-1 rounded-md text-xs font-semibold transition cursor-pointer ${
                activeTab === 'rewards'
                  ? 'bg-amber-400/20 text-amber-300 border border-amber-400/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Prize Structure
            </button>
          </div>

          <div className="relative w-full sm:w-60">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search institution..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-slate-950/60 border border-white/10 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-400/50"
            />
          </div>
        </div>

        {/* Content Body */}
        <div className="overflow-y-auto p-3 sm:p-4 space-y-2 flex-grow max-h-[50vh]">
          {activeTab === 'rewards' ? (
            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-slate-900/60 border border-amber-500/20 text-xs space-y-2">
                <div className="flex items-center gap-2 text-amber-300 font-bold">
                  <Award className="w-4 h-4 text-amber-400" />
                  <span>Pool Allocation Matrix (50,000 VEs Total)</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-center font-mono-numbers">
                  <div className="p-2 rounded-lg bg-black/40 border border-white/5">
                    <span className="text-[10px] text-slate-400 block font-sans">1st Place</span>
                    <span className="text-sm font-bold text-amber-400">20,000 VEs</span>
                    <span className="text-[9px] text-slate-500 block">40% of pool</span>
                  </div>
                  <div className="p-2 rounded-lg bg-black/40 border border-white/5">
                    <span className="text-[10px] text-slate-400 block font-sans">2nd Place</span>
                    <span className="text-sm font-bold text-slate-200">12,500 VEs</span>
                    <span className="text-[9px] text-slate-500 block">25% of pool</span>
                  </div>
                  <div className="p-2 rounded-lg bg-black/40 border border-white/5">
                    <span className="text-[10px] text-slate-400 block font-sans">3rd Place</span>
                    <span className="text-sm font-bold text-amber-500">7,500 VEs</span>
                    <span className="text-[9px] text-slate-500 block">15% of pool</span>
                  </div>
                  <div className="p-2 rounded-lg bg-black/40 border border-white/5">
                    <span className="text-[10px] text-slate-400 block font-sans">Ranks 4 - 10</span>
                    <span className="text-sm font-bold text-blue-300">10,000 VEs</span>
                    <span className="text-[9px] text-slate-500 block">Shared evenly</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-1.5">
              {filteredUsers.map((user) => {
                const isTop3 = user.rank <= 3;
                return (
                  <div
                    key={user.rank}
                    className={`flex items-center justify-between p-2.5 sm:p-3 rounded-xl border transition ${
                      isTop3
                        ? 'bg-amber-500/10 border-amber-500/30'
                        : 'bg-slate-900/40 border-white/5 hover:border-white/15'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`w-6 text-center text-xs font-bold font-mono-numbers ${
                          user.rank === 1
                            ? 'text-amber-400'
                            : user.rank === 2
                            ? 'text-slate-300'
                            : user.rank === 3
                            ? 'text-amber-600'
                            : 'text-slate-500'
                        }`}
                      >
                        #{user.rank}
                      </span>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs sm:text-sm font-bold text-white">
                            {user.username}
                          </span>
                          <span className="text-[9px] px-1.5 py-0.2 rounded bg-white/5 text-slate-400 border border-white/10 hidden sm:inline">
                            {user.tier}
                          </span>
                        </div>
                        <span className="text-[10px] text-slate-400 font-mono-numbers">
                          {user.xp.toLocaleString()} XP Points
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <span className="text-xs sm:text-sm font-extrabold text-white font-mono-numbers block">
                          {user.ves.toLocaleString()} <span className="text-[10px] text-amber-400 font-sans">VE</span>
                        </span>
                        <span className="text-[10px] text-emerald-400 font-semibold">
                          Est. {user.prizeReward}
                        </span>
                      </div>
                      <div className="w-4 text-center">
                        {user.change === 'up' && <ChevronUp className="w-4 h-4 text-emerald-400" />}
                        {user.change === 'down' && <ChevronDown className="w-4 h-4 text-rose-400" />}
                        {user.change === 'same' && <Minus className="w-3.5 h-3.5 text-slate-500" />}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Current User Snapshot Footer */}
        <div className="p-3 sm:p-4 border-t border-white/[0.08] bg-slate-950/80 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-amber-400" />
            <div>
              <span className="text-white font-bold">You: Apex Capital Desk</span>
              <span className="text-slate-400 block text-[10px]">Current Rank: #42 · 8,420 VEs (Top 5%)</span>
            </div>
          </div>
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
