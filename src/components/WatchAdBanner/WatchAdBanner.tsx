import React, { useState, useRef } from 'react';
import { DollarSign, Zap, Play } from 'lucide-react';

interface WatchAdBannerProps {
  onOpenAdPlayer: () => void;
  isWatchingAd: boolean;
}

export const WatchAdBanner: React.FC<WatchAdBannerProps> = ({
  onOpenAdPlayer,
  isWatchingAd
}) => {
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
      id="section-watch-ads"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      aria-label="On-Demand Ad Rewards"
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: 'transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1)'
      }}
      className="banner-container relative w-full rounded-2xl md:rounded-3xl overflow-hidden glass-panel glass-panel-blue shadow-xl hover:shadow-[0_0_35px_-5px_rgba(59,130,246,0.3)] transition-all duration-300 min-h-[330px] max-h-[520px] md:min-h-[380px] md:max-h-[540px] lg:min-h-[420px] lg:max-h-[450px] flex flex-col justify-center"
    >
      {/* Ambient Sparkles */}
      <div className="sparkle-dot bg-cyan-300 top-8 right-1/4" style={{ animationDelay: '0.5s' }} />
      <div className="sparkle-dot bg-blue-400 bottom-10 left-1/3" style={{ animationDelay: '1.8s' }} />

      {/* Ambient Radial Sapphire Accent */}
      <div className="absolute -top-24 -right-24 w-80 h-80 bg-blue-500/15 rounded-full blur-3xl pointer-events-none float-subtle" />

      <div className="grid grid-cols-1 md:grid-cols-12 items-center p-4 sm:p-6 lg:p-8 gap-4 sm:gap-6 md:gap-8 relative z-10 w-full">
        {/* Left Content Column */}
        <div className="md:col-span-7 flex flex-col justify-between space-y-3 sm:space-y-4">
          {/* Label Tag */}
          <div>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[11px] font-bold tracking-wider uppercase bg-blue-500/10 text-blue-300 border border-blue-400/25">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
              02 · ON-DEMAND REWARDS
            </span>
          </div>

          {/* Headline & Description */}
          <div className="space-y-1.5">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Watch Ads. <span className="shimmer-text-blue inline-block font-extrabold">Earn VEs.</span>
            </h2>
            <p className="text-xs sm:text-sm lg:text-base text-slate-300 leading-relaxed max-w-xl">
              Watch eligible advertisements and earn VEs for completing ad activities seamlessly in high-definition video playback.
            </p>
          </div>

          {/* Feature Pills & Journey Step Flow */}
          <div className="space-y-2.5 pt-0.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-1 rounded-md bg-blue-500/10 border border-blue-400/30 text-blue-200 text-xs font-semibold flex items-center gap-1.5">
                <DollarSign className="w-3.5 h-3.5 text-blue-400" />
                No Daily Cap
              </span>
              <span className="px-2.5 py-1 rounded-md bg-blue-500/10 border border-blue-400/30 text-blue-200 text-xs font-semibold flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-sky-400 animate-pulse" />
                Instant Credits
              </span>
            </div>

            {/* Steps & Payout Box */}
            <div className="p-2.5 sm:p-3 rounded-xl bg-slate-900/70 border border-white/10 flex flex-wrap sm:flex-nowrap items-center justify-between gap-3 max-w-md hover:border-blue-500/40 transition">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-300">
                <span className="text-blue-400">WATCH</span>
                <span className="text-slate-600 animate-pulse">→</span>
                <span className="text-blue-300">COMPLETE</span>
                <span className="text-slate-600 animate-pulse">→</span>
                <span className="text-emerald-400 font-extrabold drop-shadow">EARN</span>
              </div>
              <div className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-blue-950/90 text-blue-300 border border-blue-600/60 shadow-inner">
                +120 VEs / Ad
              </div>
            </div>
          </div>

          {/* Action Button with Sheen */}
          <div className="pt-1.5">
            <button
              type="button"
              disabled={isWatchingAd}
              onClick={onOpenAdPlayer}
              className="btn-sheen inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-400 hover:to-indigo-500 text-white shadow-lg shadow-blue-500/30 active:scale-95 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>{isWatchingAd ? 'Playing Ad...' : 'Watch & Earn'}</span>
              <Play className="w-4 h-4 fill-white" />
            </button>
          </div>
        </div>

        {/* Right 3D Visual Column */}
        <div className="md:col-span-5 flex justify-center items-center">
          <div
            className="banner-3d-box relative w-full max-w-[240px] sm:max-w-[280px] lg:max-w-[310px] aspect-square rounded-2xl bg-gradient-to-br from-blue-500/10 via-[#1B1F38]/50 to-transparent p-2 border border-blue-500/20 shadow-2xl flex items-center justify-center overflow-hidden"
            style={{
              transform: `perspective(1000px) rotateX(${tilt.x * 1.3}deg) rotateY(${tilt.y * 1.3}deg)`
            }}
          >
            <img
              src="/assets/watch_ads_player.png"
              alt="Holographic glass video player displaying glowing electric blue play icon with navy leather VE crypto wallet"
              className="banner-3d-img float-reverse w-full h-full object-contain filter drop-shadow-[0_15px_25px_rgba(0,0,0,0.6)] rounded-xl"
              loading="lazy"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "https://lh3.googleusercontent.com/aida/AEtjO1XMBtc_STd4HKBeF8ivFq4Uu9iwRRqOZYnNFWXZahRIuYnwn1HC9PhUuee7bh4TIPuPx45zbkBprm3h-XAnc1Zqs6lUP5iPtcZ8AR1QpAmk9_hMicea8HriHUArTGWtYvxj_Gc04UHTF1YEq4kdbWWrxXeIxzqWX1K44cwoBTJu4Hyaa9utWwgvORrl8ItA0FinXEgbLwRtcMTSx6Tmg0rpltzG2lHN6QP0Cv8yAg60nnOMoM8YkMgoeEl4";
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
