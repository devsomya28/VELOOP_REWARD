import React, { useState } from 'react';
import { X, Check, Users, MessageSquare, ExternalLink, Sparkles } from 'lucide-react';
import { SOCIAL_CHANNELS } from '../../utils/mockData';

interface ChannelsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowToast: (msg: string) => void;
}

export const ChannelsModal: React.FC<ChannelsModalProps> = ({
  isOpen,
  onClose,
  onShowToast
}) => {
  const [channels, setChannels] = useState(SOCIAL_CHANNELS);

  if (!isOpen) return null;

  const handleToggleChannel = (id: string, name: string, reward: number) => {
    setChannels((prev) =>
      prev.map((ch) => {
        if (ch.id === id) {
          const nextState = !ch.joined;
          onShowToast(
            nextState
              ? `Joined ${name}! +${reward} SVEs Credited (DEMO)`
              : `Left ${name}`
          );
          return { ...ch, joined: nextState };
        }
        return ch;
      })
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-xl flex flex-col rounded-2xl glass-panel border border-purple-500/30 shadow-2xl overflow-hidden text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-white/[0.08] flex items-center justify-between bg-slate-900/80">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-purple-500/20 border border-purple-400/40 flex items-center justify-center">
              <Users className="w-4 h-4 text-purple-400" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-white">
                Official VELOOP Channels &amp; Campaigns
              </h3>
              <p className="text-xs text-slate-400">
                Join verified institutional hubs to unlock community SVE rewards
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

        {/* Notice banner */}
        <div className="px-4 py-2 bg-purple-950/40 border-b border-purple-500/20 flex items-center gap-2 text-[11px] text-purple-200">
          <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
          <span>
            <strong>DEMO / PLACEHOLDER NOTICE:</strong> All channel follower counts and campaign reward figures (+500 SVEs) are simulated presentation artifacts.
          </span>
        </div>

        {/* Channels List */}
        <div className="p-4 space-y-2.5 flex-grow overflow-y-auto max-h-[55vh]">
          {channels.map((channel) => (
            <div
              key={channel.id}
              className="p-3.5 rounded-xl bg-slate-900/60 border border-white/5 hover:border-purple-500/30 transition flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-white">
                    {channel.name}
                  </span>
                  <span className="text-[10px] text-purple-300 font-mono">
                    {channel.handle}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed max-w-sm">
                  {channel.description}
                </p>
                <div className="flex items-center gap-3 pt-0.5 text-[10px] text-slate-500">
                  <span>{channel.membersCount}</span>
                  <span>·</span>
                  <span className="text-amber-400 font-semibold font-mono-numbers">
                    +{channel.rewardSves} SVEs (Demo)
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => handleToggleChannel(channel.id, channel.name, channel.rewardSves)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold border transition active:scale-95 cursor-pointer flex items-center gap-1.5 ${
                    channel.joined
                      ? 'bg-purple-500/20 text-purple-200 border-purple-500/40 hover:bg-purple-500/30'
                      : 'bg-purple-600 hover:bg-purple-500 text-white border-purple-500 shadow-md shadow-purple-600/30'
                  }`}
                >
                  {channel.joined ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-purple-300" />
                      <span>Joined</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Join &amp; Verify</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-3.5 sm:p-4 border-t border-white/[0.08] bg-slate-950 flex items-center justify-between text-xs">
          <span className="text-slate-400">
            Channels synced to institutional relay
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold transition cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
