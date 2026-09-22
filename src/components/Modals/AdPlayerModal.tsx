import React, { useState, useEffect } from 'react';
import { X, Play, Pause, Volume2, VolumeX, CheckCircle, Sparkles, ShieldCheck } from 'lucide-react';
import { AVAILABLE_ADS } from '../../utils/mockData';

interface AdPlayerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRewardCredited: (amount: number) => void;
}

export const AdPlayerModal: React.FC<AdPlayerModalProps> = ({
  isOpen,
  onClose,
  onRewardCredited
}) => {
  const [currentAdIndex] = useState(0);
  const ad = AVAILABLE_ADS[currentAdIndex];

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(ad.durationSeconds);
  const [isCompleted, setIsCompleted] = useState(false);
  const [rewardClaimed, setRewardClaimed] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      // Reset state when closed
      setSecondsLeft(ad.durationSeconds);
      setIsCompleted(false);
      setRewardClaimed(false);
      setIsPlaying(true);
      return;
    }

    if (isCompleted || !isPlaying) return;

    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsCompleted(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isOpen, isPlaying, isCompleted, ad.durationSeconds]);

  if (!isOpen) return null;

  const progressPercent = ((ad.durationSeconds - secondsLeft) / ad.durationSeconds) * 100;

  const handleClaimAndClose = () => {
    if (!rewardClaimed) {
      setRewardClaimed(true);
      onRewardCredited(ad.rewardVes);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-xl flex flex-col rounded-2xl glass-panel border border-blue-500/30 shadow-2xl overflow-hidden text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top bar */}
        <div className="p-3.5 sm:p-4 border-b border-white/[0.08] flex items-center justify-between bg-slate-900/80">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            <span className="text-xs font-bold text-blue-300 uppercase tracking-wider">
              {ad.tag} · {ad.category}
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center border border-white/10 transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Video Player Canvas / Screen */}
        <div className="relative aspect-video bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 flex flex-col items-center justify-center overflow-hidden p-6 select-none">
          {/* Ambient Video Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.18)_0,transparent_70%)]" />

          {!isCompleted ? (
            <div className="text-center space-y-4 relative z-10">
              <div className="w-16 h-16 rounded-full bg-blue-600/30 border border-blue-400/50 flex items-center justify-center mx-auto shadow-lg shadow-blue-500/20">
                <Play className="w-7 h-7 text-blue-300 fill-blue-300 ml-0.5" />
              </div>

              <div>
                <span className="text-[10px] font-bold text-blue-400 tracking-wider uppercase block">
                  SPONSOR BRIEFING
                </span>
                <h4 className="text-base sm:text-lg font-bold text-white max-w-sm mx-auto">
                  {ad.title}
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  Provided by {ad.sponsor}
                </p>
              </div>

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/90 border border-blue-400/30 text-xs font-mono-numbers">
                <span className="text-slate-400">Time remaining:</span>
                <span className="text-blue-300 font-bold text-sm">
                  00:0{secondsLeft}s
                </span>
              </div>
            </div>
          ) : (
            /* Completed Screen */
            <div className="text-center space-y-3 relative z-10 animate-in zoom-in-95 duration-200">
              <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-400/50 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
                <CheckCircle className="w-8 h-8 text-emerald-400" />
              </div>

              <div className="space-y-1">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
                  Activity Complete
                </span>
                <h4 className="text-2xl font-black text-white shimmer-text-gold font-mono-numbers">
                  +{ad.rewardVes} VEs
                </h4>
                <div className="inline-block px-2.5 py-0.5 rounded bg-amber-400/10 border border-amber-400/30 text-[11px] font-bold text-amber-300">
                  DEMO REWARD
                </div>
              </div>

              <p className="text-xs text-slate-300 max-w-xs mx-auto">
                Tokens ready to be credited to your available institutional vault balance.
              </p>
            </div>
          )}

          {/* Player Progress Bar */}
          <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-slate-800">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Video Controls & Reward Status */}
        <div className="p-3.5 sm:p-4 bg-slate-950 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-white/[0.08]">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            {!isCompleted && (
              <button
                type="button"
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center justify-center border border-white/10 transition cursor-pointer"
                title={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
              </button>
            )}
            <button
              type="button"
              onClick={() => setIsMuted(!isMuted)}
              className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center justify-center border border-white/10 transition cursor-pointer"
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
            <div className="text-[11px] text-slate-400">
              <span className="font-semibold text-slate-200">HD Stream 1080p</span> · Instant Credit Enabled
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            {isCompleted ? (
              <button
                type="button"
                onClick={handleClaimAndClose}
                className="btn-sheen w-full sm:w-auto px-5 py-2 rounded-xl font-bold text-xs bg-gradient-to-r from-emerald-400 to-emerald-500 hover:from-emerald-300 hover:to-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/25 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Claim +{ad.rewardVes} VEs</span>
              </button>
            ) : (
              <div className="text-xs text-slate-400 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                <span>Verified View Tracking</span>
              </div>
            )}
          </div>
        </div>

        {/* Demo Disclaimer notice */}
        <div className="px-4 py-2 bg-slate-900/90 border-t border-white/[0.04] text-[10px] text-slate-500 text-center">
          <strong>Notice:</strong> This is a development demo ad simulation. Tokens are credited as simulated presentation rewards.
        </div>
      </div>
    </div>
  );
};
