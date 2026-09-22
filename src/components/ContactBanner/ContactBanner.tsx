import React, { useState, useRef } from 'react';
import { Mail, Check, MessageSquare, HelpCircle, FileText } from 'lucide-react';

interface ContactBannerProps {
  onOpenChat: () => void;
  onOpenHelpCenter: () => void;
  onOpenTicket: () => void;
  onShowToast: (msg: string) => void;
}

export const ContactBanner: React.FC<ContactBannerProps> = ({
  onOpenChat,
  onOpenHelpCenter,
  onOpenTicket,
  onShowToast
}) => {
  const [copied, setCopied] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const supportEmail = 'velooprewardsofficial@gmail.com';

  const handleCopy = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(supportEmail);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = supportEmail;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setCopied(true);
      onShowToast('Support email copied to clipboard!');
      setTimeout(() => setCopied(false), 2200);
    } catch {
      onShowToast(`Email: ${supportEmail}`);
    }
  };

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
      id="section-contact"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      aria-label="Concierge and Support Portal"
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: 'transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1)'
      }}
      className="banner-container relative w-full rounded-2xl md:rounded-3xl overflow-hidden glass-panel glass-panel-cyan shadow-xl hover:shadow-[0_0_35px_-5px_rgba(34,211,238,0.25)] transition-all duration-300 min-h-[330px] max-h-[520px] md:min-h-[380px] md:max-h-[540px] lg:min-h-[420px] lg:max-h-[450px] flex flex-col justify-center"
    >
      {/* Ambient Slate / Cyan Glow */}
      <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none float-subtle" />

      {/* 3-Zone Grid: Left = Info & CTA, Center = 3D Specialist, Right = Support Panel */}
      <div className="grid grid-cols-1 md:grid-cols-12 items-center p-4 sm:p-6 lg:p-7 gap-4 sm:gap-6 lg:gap-6 relative z-10 w-full">
        
        {/* LEFT COLUMN: Heading, Description & Contact Support Button */}
        <div className="md:col-span-12 lg:col-span-4 flex flex-col justify-between space-y-3">
          <div>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[11px] font-bold tracking-wider uppercase bg-slate-700/40 text-slate-300 border border-slate-600/30">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 live-dot-ping" />
              03 · CONCIERGE &amp; SUPPORT
            </span>
          </div>

          <div className="space-y-1.5">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
              Need Help? <span className="shimmer-text-cyan inline-block font-extrabold">We're Here.</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Have a question, concern, or assistance? Get in touch with the VELOOP Rewards team.
            </p>
          </div>

          <div className="pt-1">
            <button
              type="button"
              onClick={onOpenChat}
              className="btn-sheen inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:py-3 rounded-xl font-bold text-sm bg-slate-800 hover:bg-slate-700 text-white border border-cyan-400/40 shadow-lg shadow-cyan-950/40 active:scale-95 transition-all cursor-pointer"
            >
              <span>Contact Support</span>
              <MessageSquare className="w-4 h-4 text-cyan-400" />
            </button>
          </div>
        </div>

        {/* CENTER COLUMN: 3D Support Specialist Illustration */}
        <div className="md:col-span-6 lg:col-span-4 flex justify-center items-center">
          <div
            className="banner-3d-box relative w-full max-w-[210px] sm:max-w-[240px] lg:max-w-[270px] aspect-square rounded-2xl bg-gradient-to-br from-slate-700/20 via-[#1B1F38]/50 to-transparent p-2 border border-white/10 shadow-2xl flex items-center justify-center overflow-hidden"
            style={{
              transform: `perspective(1000px) rotateX(${tilt.x * 1.3}deg) rotateY(${tilt.y * 1.3}deg)`
            }}
          >
            <img
              src="/assets/contact_specialist.png"
              alt="Professional customer support specialist with headset at workstation"
              className="banner-3d-img float-slow w-full h-full object-contain filter drop-shadow-[0_15px_25px_rgba(0,0,0,0.6)] rounded-xl"
              loading="lazy"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "https://lh3.googleusercontent.com/aida/AEtjO1Wl6G4jN_ae-0fl09OFPTYU5HRJ72MoJUkX_9PS7MyANygFLA6-ZprgU_EjqeDH_TCv8LIAZhkiRdQvV-x94rY6TWI1jx3JxSPdYggRmr6T8d1oddwAQjRTIdt-siI-mMfwLn7LtDqhYp9zaU3phCo6OCOhEuiUJyloXGu6AzKelQKQU9tZ7i03M10w0885c5mZgsX1DZDgI1Bwn5jRSVLGr3OAHXMnC6tpEHmEiW5cIuGNO267dIyEv17Q";
              }}
            />
          </div>
        </div>

        {/* RIGHT COLUMN: Support Information Panel */}
        <div className="md:col-span-6 lg:col-span-4 flex flex-col justify-center">
          <div className="p-3.5 sm:p-4 rounded-xl bg-slate-900/80 border border-white/10 space-y-3 hover:border-cyan-400/30 transition shadow-inner">
            {/* Header info */}
            <div className="flex items-center justify-between text-xs border-b border-white/[0.06] pb-2">
              <span className="text-slate-200 font-semibold">We're here to help</span>
              <span className="inline-flex items-center gap-1.5 font-semibold text-emerald-400 text-[11px]">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 live-dot-ping" />
                Avg reply &lt; 3 mins
              </span>
            </div>

            {/* Email Us label & address with copy button */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Email Us
              </span>
              <div className="flex items-center justify-between gap-2 p-2 rounded-lg bg-black/40 border border-white/5 hover:border-white/15 transition">
                <div className="flex items-center gap-1.5 truncate">
                  <Mail className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span className="text-xs text-slate-200 font-mono truncate" title={supportEmail}>
                    {supportEmail}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleCopy}
                  className={`px-2.5 py-1 text-[11px] font-semibold rounded transition active:scale-95 shrink-0 cursor-pointer ${
                    copied
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/50'
                      : 'bg-slate-800 hover:bg-cyan-900/40 hover:text-cyan-300 text-slate-200 border border-white/10'
                  }`}
                >
                  {copied ? (
                    <span className="flex items-center gap-1">
                      <Check className="w-3 h-3" /> Copied!
                    </span>
                  ) : (
                    'Copy Email'
                  )}
                </button>
              </div>
            </div>

            {/* Links: Help Center & Submit Ticket */}
            <div className="flex items-center justify-between text-xs pt-1 border-t border-white/[0.06]">
              <button
                type="button"
                onClick={onOpenHelpCenter}
                className="text-cyan-400 hover:text-cyan-300 transition underline underline-offset-4 font-medium flex items-center gap-1 cursor-pointer"
              >
                <HelpCircle className="w-3 h-3" />
                Help Center
              </button>
              <span className="text-slate-600">|</span>
              <button
                type="button"
                onClick={onOpenTicket}
                className="text-slate-300 hover:text-white transition font-medium flex items-center gap-1 cursor-pointer"
              >
                <FileText className="w-3 h-3" />
                Submit Ticket
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
