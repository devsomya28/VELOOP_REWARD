import React, { useState, useRef } from 'react';
import { Trophy, TrendingUp, ArrowRight } from 'lucide-react';

interface LeaderboardBannerProps {
  onOpenRankings: () => void;
}

export const LeaderboardBanner: React.FC<LeaderboardBannerProps> = ({ onOpenRankings }) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const percentX = (e.clientX - centerX) / (rect.width / 2);
    const percentY = (e.clientY - centerY) / (rect.height / 2);
    setTilt({
      x: -percentY * 5,
      y: percentX * 5
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <section
      id="section-leaderboard"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      aria-label="Leaderboard Stage Active"
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: 'transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1)'
      }}
      className="banner-container relative w-full rounded-2xl md:rounded-3xl overflow-hidden glass-panel glass-panel-gold shadow-xl hover:shadow-[0_0_35px_-5px_rgba(245,158,11,0.3)] transition-all duration-300 min-h-[330px] max-h-[520px] md:min-h-[380px] md:max-h-[540px] lg:min-h-[420px] lg:max-h-[450px] flex flex-col justify-center"
    >
      {/* Ambient Sparkles */}
      <div className="sparkle-dot bg-amber-300 top-6 left-1/4" style={{ animationDelay: '0.2s' }} />
      <div className="sparkle-dot bg-amber-400 top-1/2 left-10" style={{ animationDelay: '1.1s' }} />
      <div className="sparkle-dot bg-amber-200 bottom-8 right-1/3" style={{ animationDelay: '2.3s' }} />

      {/* Ambient Radial Accent Glow */}
      <div className="absolute -top-24 -left-24 w-80 h-80 bg-amber-500/15 rounded-full blur-3xl pointer-events-none float-subtle" />

      <div className="grid grid-cols-1 md:grid-cols-12 items-center p-4 sm:p-6 lg:p-8 gap-4 sm:gap-6 md:gap-8 relative z-10 w-full">
        {/* Left Content Column */}
        <div className="md:col-span-7 flex flex-col justify-between space-y-3 sm:space-y-4">
          {/* Label Tag */}
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[11px] font-bold tracking-wider uppercase bg-amber-400/10 text-amber-300 border border-amber-400/25 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              01 · COMPETITION STAGE ACTIVE
            </span>
          </div>

          {/* Headline & Description with Dynamic Floating Shimmer */}
          <div className="space-y-1.5">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Rank Higher. <span className="shimmer-text-gold inline-block font-extrabold">Earn More.</span>
            </h2>
            <p className="text-xs sm:text-sm lg:text-base text-slate-300 leading-relaxed max-w-xl">
              Complete activities, earn rewards, gain XP, and compete with other users to climb the global leaderboard.
            </p>
          </div>

          {/* Metric Row & Mini Podium Strip */}
          <div className="space-y-2.5 pt-0.5">
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs font-semibold shadow-inner">
                <Trophy className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                <span>Pool: <strong className="font-bold text-white font-mono-numbers">50,000 VEs</strong> in prizes</span>
              </div>
              <span className="text-xs text-slate-400 flex items-center gap-1.5 font-medium bg-slate-900/40 px-2.5 py-1 rounded-md border border-white/5">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-400 live-dot-ping" />
                Live Standings Refreshed
              </span>
            </div>

            {/* Mini Top 3 Podium Cards */}
            <div className="grid grid-cols-3 gap-2 pt-0.5 max-w-md">
              <div 
                onClick={onOpenRankings}
                className="p-2 rounded-lg bg-slate-900/60 border border-amber-500/30 text-center hover:-translate-y-0.5 hover:border-amber-400/60 transition-all cursor-pointer shadow-sm"
              >
                <span className="block text-[10px] font-bold text-amber-400">#01 User A</span>
                <span className="block text-xs font-extrabold text-white font-mono-numbers mt-0.5">
                  12,450 <span className="text-[9px] text-slate-400">VE</span>
                </span>
              </div>
              <div 
                onClick={onOpenRankings}
                className="p-2 rounded-lg bg-slate-900/60 border border-white/10 text-center hover:-translate-y-0.5 hover:border-white/30 transition-all cursor-pointer shadow-sm"
              >
                <span className="block text-[10px] font-bold text-slate-300">#02 User B</span>
                <span className="block text-xs font-extrabold text-white font-mono-numbers mt-0.5">
                  11,820 <span className="text-[9px] text-slate-400">VE</span>
                </span>
              </div>
              <div 
                onClick={onOpenRankings}
                className="p-2 rounded-lg bg-slate-900/60 border border-white/10 text-center hover:-translate-y-0.5 hover:border-white/30 transition-all cursor-pointer shadow-sm"
              >
                <span className="block text-[10px] font-bold text-slate-400">#03 User C</span>
                <span className="block text-xs font-extrabold text-white font-mono-numbers mt-0.5">
                  10,970 <span className="text-[9px] text-slate-400">VE</span>
                </span>
              </div>
            </div>
          </div>

          {/* Action Button with dynamic sheen */}
          <div className="pt-1.5">
            <button
              type="button"
              onClick={onOpenRankings}
              className="btn-sheen inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 shadow-lg shadow-amber-500/25 active:scale-95 transition-all cursor-pointer"
            >
              <span>Check Rankings</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
            </button>
          </div>
        </div>

        {/* Right 3D Visual Column */}
        <div className="md:col-span-5 flex justify-center items-center">
          <div 
            className="banner-3d-box relative w-full max-w-[240px] sm:max-w-[280px] lg:max-w-[310px] aspect-square rounded-2xl bg-gradient-to-br from-amber-500/10 via-[#1B1F38]/50 to-transparent p-2 border border-amber-500/20 shadow-2xl flex items-center justify-center overflow-hidden"
            style={{
              transform: `perspective(1000px) rotateX(${tilt.x * 1.3}deg) rotateY(${tilt.y * 1.3}deg)`
            }}
          >
            <img
              src="/assets/leaderboard_trophy.png"
              alt="Ultra-luxurious 24k gold VELOOP trophy on illuminated pedestal with golden chart bars and floating VE coins"
              className="banner-3d-img float-slow w-full h-full object-contain filter drop-shadow-[0_15px_25px_rgba(0,0,0,0.6)] rounded-xl"
              loading="lazy"
              onError={(e) => {
                // Fail-safe fallback if local asset has issue
                (e.target as HTMLImageElement).src = "https://lh3.googleusercontent.com/aida/AEtjO1U9F0OpGcKnV_OZQJdPgfKZcey4vuSWsjsRyJlJbD_CCWXpancE11J9J7uKhjkIPz21pgui4NRwftX97s6sAIoyoJvmIIcbz4yGDyvy-igKuB_QcQQ9yp6WJcVwRZ2J2FdRZ_kaPA3w8PAmduSYnMqsgo2PjbbmObT_oLCp8a3cwiBf8tp46DnTyB7dw9t0awTNFFEdXuummF5Jj3RoLZt7YKYr65a_PUx-WG7vMe5rmVJF8CRc268cRMmM";
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
