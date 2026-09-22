import React, { useState, useRef } from 'react';
import { ArrowRight, CheckCircle2, Award } from 'lucide-react';

interface FollowEarnBannerProps {
  onOpenChannels: () => void;
  isFollowing: boolean;
  onToggleFollow: () => void;
}

export const FollowEarnBanner: React.FC<FollowEarnBannerProps> = ({
  onOpenChannels,
  isFollowing,
  onToggleFollow
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
      id="section-follow"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      aria-label="Social Community Channels"
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: 'transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1)'
      }}
      className="banner-container relative w-full rounded-2xl md:rounded-3xl overflow-hidden glass-panel glass-panel-purple shadow-xl hover:shadow-[0_0_35px_-5px_rgba(139,92,246,0.3)] transition-all duration-300 min-h-[330px] max-h-[520px] md:min-h-[380px] md:max-h-[540px] lg:min-h-[420px] lg:max-h-[450px] flex flex-col justify-center"
    >
      {/* Sparkles */}
      <div className="sparkle-dot bg-purple-300 top-12 left-1/3" style={{ animationDelay: '0.8s' }} />
      <div className="sparkle-dot bg-fuchsia-400 bottom-12 right-1/4" style={{ animationDelay: '2.1s' }} />

      {/* Ambient Radial Violet Accent */}
      <div className="absolute -top-24 -left-24 w-80 h-80 bg-purple-600/15 rounded-full blur-3xl pointer-events-none float-subtle" />

      <div className="grid grid-cols-1 md:grid-cols-12 items-center p-4 sm:p-6 lg:p-8 gap-4 sm:gap-6 md:gap-8 relative z-10 w-full">
        {/* Left Content Column */}
        <div className="md:col-span-7 flex flex-col justify-between space-y-3 sm:space-y-4">
          {/* Label Tag */}
          <div>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[11px] font-bold tracking-wider uppercase bg-purple-500/10 text-purple-300 border border-purple-400/25">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
              04 · COMMUNITY CHANNELS
            </span>
          </div>

          {/* Headline & Description */}
          <div className="space-y-1.5">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Follow &amp; <span className="shimmer-text-purple inline-block font-extrabold">Earn.</span>
            </h2>
            <p className="text-xs sm:text-sm lg:text-base text-slate-300 leading-relaxed max-w-xl">
              Participate in eligible social campaigns and unlock rewards. Follow VELOOP Rewards on official channels to earn today.
            </p>
          </div>

          {/* Benefit Pill & Profile Card */}
          <div className="space-y-2.5 pt-0.5">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-purple-500/10 border border-purple-500/30 text-purple-200 text-xs font-semibold shadow-inner">
              <Award className="w-4 h-4 text-purple-400" />
              <span>
                Active Incentive: <strong className="text-white font-mono-numbers">+500 SVEs</strong>{' '}
                <span className="text-[10px] text-purple-300/80 font-normal uppercase tracking-wider">Demo Campaign</span>
              </span>
            </div>

            {/* Profile Summary Card with Interactive Button */}
            <div className="p-2.5 sm:p-3 rounded-xl bg-slate-900/60 border border-white/10 flex items-center justify-between gap-3 max-w-md hover:border-purple-500/40 transition">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-purple-900/50 border border-purple-500/30 flex items-center justify-center font-bold text-purple-300 text-sm shadow-inner">
                  VR
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-white">@velooprewards</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 fill-purple-400/20" />
                  </div>
                  <span className="text-[11px] text-slate-400 font-mono-numbers">
                    {isFollowing ? '24.6K Institutional Followers' : '24.5K Institutional Followers'}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={onToggleFollow}
                className={`px-3.5 py-1 rounded-full text-xs font-semibold border transition active:scale-95 cursor-pointer ${
                  isFollowing
                    ? 'bg-purple-500/20 text-purple-200 border-purple-500/40 hover:bg-purple-500/30'
                    : 'bg-purple-600 text-white border-purple-500 hover:bg-purple-500 shadow-md shadow-purple-600/30'
                }`}
              >
                {isFollowing ? 'Following' : 'Follow'}
              </button>
            </div>
          </div>

          {/* Action Button with Sheen */}
          <div className="pt-1.5">
            <button
              type="button"
              onClick={onOpenChannels}
              className="btn-sheen inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-lg shadow-purple-500/25 active:scale-95 transition-all cursor-pointer"
            >
              <span>Explore Our Channels</span>
              <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
            </button>
          </div>
        </div>

        {/* Right 3D Visual Column */}
        <div className="md:col-span-5 flex justify-center items-center">
          <div
            className="banner-3d-box relative w-full max-w-[240px] sm:max-w-[280px] lg:max-w-[310px] aspect-square rounded-2xl bg-gradient-to-br from-purple-600/10 via-[#1B1F38]/50 to-transparent p-2 border border-purple-500/20 shadow-2xl flex items-center justify-center overflow-hidden"
            style={{
              transform: `perspective(1000px) rotateX(${tilt.x * 1.3}deg) rotateY(${tilt.y * 1.3}deg)`
            }}
          >
            <img
              src="/assets/follow_phone.png"
              alt="Titanium smartphone with glowing dark-mode profile, open luminous purple gift box, and amethyst glass hearts"
              className="banner-3d-img float-reverse w-full h-full object-contain filter drop-shadow-[0_15px_25px_rgba(0,0,0,0.6)] rounded-xl"
              loading="lazy"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "https://lh3.googleusercontent.com/aida/AEtjO1WpwnFWrcdB5wOoPrCoNXVJz5LypWK2ICPHftbo2lXCsO7lqUCd9VgVkkqzKTwrgpqqBBoiMfs62adMdp7F7YAzQojRT-M6pJ89af8OLlexfkd8ZV3JikZxDrAnyVrIbH63Ocj62GN8xIl-Zre6ZANpZKxhVlaJUvKUYf4FQCQtXllasuX89sk9BAMcpQuOwci5r59r3-BnWdYLeHv-icklGKmxdr4QFVzfPBuzsmKkQRCpY6O7jS9wWLnG";
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
