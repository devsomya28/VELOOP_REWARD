import React, { useState, useRef } from 'react';
import { Check, Sparkles, CheckCircle } from 'lucide-react';

interface DailyBonusBannerProps {
  onClaimDailyBonus: () => void;
  claimed: boolean;
}

export const DailyBonusBanner: React.FC<DailyBonusBannerProps> = ({
  onClaimDailyBonus,
  claimed
}) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isAnimating, setIsAnimating] = useState(false);
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

  const handleClaimClick = () => {
    if (claimed || isAnimating) return;
    setIsAnimating(true);
    // Chest rumble animation
    setTimeout(() => {
      setIsAnimating(false);
      onClaimDailyBonus();
    }, 800);
  };

  return (
    <section
      id="section-daily-bonus"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      aria-label="Daily Stash Bonus"
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: 'transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1)'
      }}
      className="banner-container relative w-full rounded-2xl md:rounded-3xl overflow-hidden glass-panel glass-panel-gold shadow-xl hover:shadow-[0_0_35px_-5px_rgba(245,158,11,0.3)] transition-all duration-300 min-h-[330px] max-h-[520px] md:min-h-[380px] md:max-h-[540px] lg:min-h-[420px] lg:max-h-[450px] flex flex-col justify-center"
    >
      {/* Sparkles */}
      <div className="sparkle-dot bg-amber-300 top-10 right-1/3" style={{ animationDelay: '0.3s' }} />
      <div className="sparkle-dot bg-yellow-400 bottom-14 left-1/4" style={{ animationDelay: '1.6s' }} />

      {/* Ambient Radial Warm Gold Glow */}
      <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-amber-500/15 rounded-full blur-3xl pointer-events-none float-subtle" />

      <div className="grid grid-cols-1 md:grid-cols-12 items-center p-4 sm:p-6 lg:p-8 gap-4 sm:gap-6 md:gap-8 relative z-10 w-full">
        {/* Left Content Column */}
        <div className="md:col-span-7 flex flex-col justify-between space-y-3 sm:space-y-4">
          {/* Label Tag */}
          <div>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[11px] font-bold tracking-wider uppercase bg-amber-400/10 text-amber-300 border border-amber-400/25">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              05 · RECURRING BONUS
            </span>
          </div>

          {/* Headline & Description */}
          <div className="space-y-1.5">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Your Daily Bonus <span className="shimmer-text-gold inline-block font-extrabold">Is Waiting.</span>
            </h2>
            <p className="text-xs sm:text-sm lg:text-base text-slate-300 leading-relaxed max-w-xl">
              Check in regularly and claim the available daily reward before the opportunity resets at midnight UTC.
            </p>
          </div>

          {/* Bonus Value Badge */}
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-lg bg-amber-500/15 border border-amber-400/40 text-amber-300 text-xs font-bold tracking-wide flex items-center gap-2 shadow-inner">
              <span className="w-2 h-2 rounded-full bg-amber-400 live-dot-ping" />
              TODAY'S BONUS: <span className="text-white font-mono-numbers drop-shadow">+25 GEMS</span> · Available Now
            </span>
          </div>

          {/* 7-Day Streak Calendar Progress Tracker */}
          <div className="p-3 sm:p-3.5 rounded-xl bg-slate-900/70 border border-white/10 space-y-2 max-w-md hover:border-amber-400/30 transition">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-300">7-Day Check-in Streak</span>
              <span className="text-[11px] font-bold text-amber-400 font-mono-numbers">
                {claimed ? '7 / 7 Days Completed' : '6 / 7 Days Active'}
              </span>
            </div>

            {/* Day Pills (1 through 6 completed, Day 7 pulsing or claimed) */}
            <div className="grid grid-cols-7 gap-1.5">
              {[1, 2, 3, 4, 5, 6].map(day => (
                <div
                  key={day}
                  className="flex flex-col items-center justify-center p-1.5 rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-300 text-[10px] font-bold hover:scale-105 transition-transform"
                >
                  <span>D{day}</span>
                  <Check className="w-3 h-3 text-amber-400 mt-0.5" strokeWidth={3} />
                </div>
              ))}

              {/* Day 7 Active / Claimed Milestone */}
              <div
                onClick={handleClaimClick}
                className={`flex flex-col items-center justify-center p-1.5 rounded-lg text-[10px] font-extrabold border transition cursor-pointer ${
                  claimed
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/50'
                    : 'pulse-milestone bg-gradient-to-b from-amber-400 to-amber-600 text-slate-950 border-amber-300 shadow-md hover:brightness-110 active:scale-95'
                }`}
              >
                <span>D7</span>
                {claimed ? (
                  <Check className="w-3 h-3 text-emerald-300 mt-0.5" strokeWidth={3} />
                ) : (
                  <span className="text-[9px] mt-0.5 uppercase tracking-tighter font-black">
                    Claim
                  </span>
                )}
              </div>
            </div>

            {/* Subtext Indicator */}
            <p className="text-[11px] text-slate-400 pt-0.5 flex items-center justify-between">
              <span>{claimed ? 'Full 7-Day Cycle Claimed' : '6 Days Completed'}</span>
              <span className="text-amber-400 font-medium">
                {claimed ? 'Next streak unlocks in 11h' : 'Final vault unlocks today!'}
              </span>
            </p>
          </div>

          {/* Action Button with Sheen & Claim Feedback */}
          <div className="pt-1.5">
            <button
              type="button"
              disabled={claimed || isAnimating}
              onClick={handleClaimClick}
              className={`btn-sheen inline-flex items-center justify-center gap-2 px-6 py-2.5 sm:py-3 rounded-xl font-bold text-sm shadow-lg active:scale-95 transition-all cursor-pointer disabled:cursor-not-allowed ${
                claimed
                  ? 'bg-emerald-600/30 text-emerald-300 border border-emerald-400/40 shadow-emerald-900/30'
                  : 'bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 shadow-amber-500/25'
              }`}
            >
              <span>
                {isAnimating ? 'Opening Vault...' : claimed ? 'BONUS CLAIMED' : 'Claim Bonus'}
              </span>
              {claimed ? (
                <CheckCircle className="w-4 h-4 text-emerald-300" />
              ) : (
                <Sparkles className="w-4 h-4 text-slate-950" />
              )}
            </button>
          </div>
        </div>

        {/* Right 3D Visual Column with Float & Shake Reaction */}
        <div className="md:col-span-5 flex justify-center items-center">
          <div
            className={`banner-3d-box relative w-full max-w-[240px] sm:max-w-[280px] lg:max-w-[310px] aspect-square rounded-2xl bg-gradient-to-br from-amber-500/15 via-[#1B1F38]/50 to-transparent p-2 border border-amber-500/20 shadow-2xl flex items-center justify-center overflow-hidden ${
              isAnimating ? 'chest-shake' : ''
            }`}
            style={{
              transform: `perspective(1000px) rotateX(${tilt.x * 1.3}deg) rotateY(${tilt.y * 1.3}deg)`
            }}
          >
            <img
              src="/assets/daily_chest.png"
              alt="Ornate gold filigree and obsidian VELOOP vault chest bursting with golden light, VE coins, and gems"
              className={`banner-3d-img ${isAnimating ? '' : 'float-slow'} w-full h-full object-contain filter drop-shadow-[0_15px_25px_rgba(0,0,0,0.6)] rounded-xl`}
              loading="lazy"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "https://lh3.googleusercontent.com/aida/AEtjO1X8Xfr73rakwte4DioaIwudaYa1ibwHjilVP_aPhZyNoaCif4MNdzudulP3ZA5hFXimMYueOpBgkorbdolzUxHgAD3txQzrsTiUPP5tBM5_5_OgNYE7P5ZXez90eE8NdYRSvQAm5WiH_Lg2W12R7brkdwwQ4GN0NsmiJhHZetWEIOh6Bwp5MDnSttpgOWQy-h16HLJIBa1kACvQftT2q2oIfnVvbCpIaojX5PGe_sysz3_M4G5RpwzgXnIg";
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
