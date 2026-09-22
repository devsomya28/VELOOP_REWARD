import React from 'react';
import { ShieldCheck, User, Sparkles, Gem } from 'lucide-react';

interface HeaderProps {
  vesBalance: number;
  gemsBalance: number;
  activeCategory: string;
  onSelectCategory: (cat: string) => void;
  onOpenProfile: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  vesBalance,
  gemsBalance,
  activeCategory,
  onSelectCategory,
  onOpenProfile
}) => {
  const categories = [
    { id: 'all', label: 'All Categories', sectionId: '' },
    { id: 'competitions', label: 'Competitions', sectionId: 'section-leaderboard' },
    { id: 'instant-media', label: 'Instant Media', sectionId: 'section-watch-ads' },
    { id: 'concierge', label: 'Concierge', sectionId: 'section-contact' },
    { id: 'community', label: 'Community', sectionId: 'section-follow' },
    { id: 'daily-stash', label: 'Daily Stash', sectionId: 'section-daily-bonus' }
  ];

  const handleCategoryClick = (cat: typeof categories[0]) => {
    onSelectCategory(cat.id);
    if (cat.sectionId) {
      const elem = document.getElementById(cat.sectionId);
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 glass-panel border-b border-white/[0.08] px-4 py-3 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
        {/* Brand Logo & Tagline */}
        <div 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/25 border border-amber-300/40 group-hover:rotate-6 transition-transform">
            <ShieldCheck className="w-5 h-5 text-slate-950 font-black" strokeWidth={2.5} />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-base font-extrabold tracking-tight text-white uppercase tracking-wider">
                Veloop
              </span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-400/15 text-amber-400 border border-amber-400/30 tracking-wide">
                PRO
              </span>
            </div>
            <span className="text-[11px] font-medium text-slate-400 hidden xs:inline">
              Institutional Yield &amp; Rewards
            </span>
          </div>
        </div>

        {/* Live Token Wallet Pill & Profile Trigger */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Gems counter */}
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-slate-900/80 border border-amber-400/20 shadow-inner">
            <Gem className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-xs font-bold text-white font-mono-numbers">
              {gemsBalance}
            </span>
            <span className="text-[10px] font-semibold text-slate-400 hidden sm:inline">
              GEMS
            </span>
          </div>

          {/* VEs balance pill */}
          <div 
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 border border-white/10 shadow-inner hover:border-amber-400/30 transition-colors"
            title="Available VEs balance"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 live-dot-ping" />
            <span className="text-xs text-slate-400 font-medium hidden sm:inline">
              Available:
            </span>
            <div className="flex items-center gap-1">
              <span className="text-xs font-bold text-white font-mono-numbers tracking-tight">
                {vesBalance.toLocaleString()}
              </span>
              <span className="text-[11px] font-semibold text-amber-400">
                VEs
              </span>
            </div>
          </div>

          {/* Profile / Account Modal Button */}
          <button
            type="button"
            onClick={onOpenProfile}
            aria-label="Account Settings"
            className="w-8 h-8 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center hover:bg-slate-700 hover:border-amber-400/40 hover:scale-105 active:scale-95 transition cursor-pointer"
          >
            <User className="w-4 h-4 text-slate-300" />
          </button>
        </div>
      </div>

      {/* Category Filter Bar */}
      <div className="max-w-6xl mx-auto pt-2.5 flex items-center gap-2 overflow-x-auto no-scrollbar text-xs font-medium border-t border-white/[0.04] mt-2.5">
        {categories.map(cat => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => handleCategoryClick(cat)}
              className={`px-3.5 py-1 rounded-full whitespace-nowrap transition-all cursor-pointer font-semibold ${
                isActive
                  ? 'bg-amber-400/20 text-amber-300 border border-amber-400/40 shadow-sm'
                  : 'bg-slate-800/60 hover:bg-slate-800 text-slate-300 border border-white/5 hover:border-white/20'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>
    </header>
  );
};
