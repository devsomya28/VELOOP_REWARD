import React, { useState } from 'react';
import { X, ShieldAlert, FileText, Scale } from 'lucide-react';

export const Footer: React.FC = () => {
  const [legalModal, setLegalModal] = useState<'terms' | 'privacy' | 'regulatory' | null>(null);

  return (
    <>
      <footer className="mt-12 border-t border-white/[0.06] bg-[#0F111E]/80 px-4 py-8 text-center text-xs text-slate-400 space-y-3">
        <div className="max-w-4xl mx-auto space-y-2.5">
          {/* Legal / Disclaimer Note */}
          <p className="text-[11px] leading-relaxed text-slate-400 max-w-2xl mx-auto">
            <strong className="text-slate-300">Demo / Placeholder Notice:</strong> Ranking, reward, and streak values are development placeholders for presentation purposes only and may change in the final product.
          </p>

          {/* Links */}
          <div className="flex items-center justify-center gap-4 text-[11px] text-slate-400 pt-1">
            <button
              type="button"
              onClick={() => setLegalModal('terms')}
              className="hover:text-slate-200 transition cursor-pointer underline-offset-4 hover:underline"
            >
              Terms of Service
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => setLegalModal('privacy')}
              className="hover:text-slate-200 transition cursor-pointer underline-offset-4 hover:underline"
            >
              Privacy Policy
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => setLegalModal('regulatory')}
              className="hover:text-slate-200 transition cursor-pointer underline-offset-4 hover:underline"
            >
              Regulatory Disclosures
            </button>
          </div>

          <p className="text-[11px] text-slate-500 pt-1 font-mono-numbers">
            © 2025 VELOOP Institutional Rewards Platform. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Accessible Legal Info Modal */}
      {legalModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg rounded-2xl glass-panel border border-white/10 p-5 shadow-2xl text-slate-100 space-y-3">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
              <div className="flex items-center gap-2">
                {legalModal === 'terms' && <FileText className="w-4 h-4 text-amber-400" />}
                {legalModal === 'privacy' && <ShieldAlert className="w-4 h-4 text-blue-400" />}
                {legalModal === 'regulatory' && <Scale className="w-4 h-4 text-purple-400" />}
                <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                  {legalModal === 'terms' && 'Terms of Service'}
                  {legalModal === 'privacy' && 'Privacy Policy'}
                  {legalModal === 'regulatory' && 'Regulatory Disclosures'}
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setLegalModal(null)}
                className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="text-xs text-slate-300 space-y-2 leading-relaxed max-h-[50vh] overflow-y-auto pr-1">
              {legalModal === 'terms' && (
                <>
                  <p>
                    VELOOP Rewards provides institutional rewards tracking and yield computation. By engaging with this demonstration platform, participants agree that all VEs, SVEs, and gems shown in this release are promotional demonstration units.
                  </p>
                  <p>
                    Accounts must comply with applicable AML/KYC institutional policies before participating in live settlement distributions.
                  </p>
                </>
              )}
              {legalModal === 'privacy' && (
                <>
                  <p>
                    VELOOP processes user activity logs, ad completion records, and streak verifications with end-to-end institutional grade encryption.
                  </p>
                  <p>
                    No personal or biometric data is shared with third-party advertising partners without explicit authorization.
                  </p>
                </>
              )}
              {legalModal === 'regulatory' && (
                <>
                  <p>
                    VELOOP Institutional Ecosystem operates in adherence with financial technology compliance guidelines. Tokens accrued during the testnet and demonstration phases do not constitute equity or registered securities.
                  </p>
                  <p>
                    Inquiries regarding regulatory status may be routed through our compliance desk at velooprewardsofficial@gmail.com.
                  </p>
                </>
              )}
            </div>

            <div className="pt-2 text-right">
              <button
                type="button"
                onClick={() => setLegalModal(null)}
                className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
