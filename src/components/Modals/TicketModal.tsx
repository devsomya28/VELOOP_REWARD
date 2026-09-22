import React, { useState } from 'react';
import { X, Send, Paperclip, CheckCircle2, FileText, AlertCircle } from 'lucide-react';

interface TicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowToast: (msg: string) => void;
}

export const TicketModal: React.FC<TicketModalProps> = ({
  isOpen,
  onClose,
  onShowToast
}) => {
  const [subject, setSubject] = useState('');
  const [category, setCategory] = useState('Reward Claim Inquiry');
  const [priority, setPriority] = useState('Normal');
  const [message, setMessage] = useState('');
  const [attachedFileName, setAttachedFileName] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !message.trim()) return;

    const randomId = `VR-${Math.floor(10000 + Math.random() * 90000)}`;
    setTicketId(randomId);
    setIsSubmitted(true);
    onShowToast(`Ticket ${randomId} submitted successfully!`);
  };

  const handleResetAndClose = () => {
    setIsSubmitted(false);
    setSubject('');
    setMessage('');
    setAttachedFileName(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg flex flex-col rounded-2xl glass-panel border border-cyan-500/30 shadow-2xl overflow-hidden text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 border-b border-white/[0.08] flex items-center justify-between bg-slate-900/80">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center">
              <FileText className="w-4 h-4 text-cyan-400" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-extrabold text-white">
                Submit Institutional Support Ticket
              </h3>
              <p className="text-[11px] text-slate-400">
                Direct dispatch to VELOOP tier-2 technical triage
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleResetAndClose}
            className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center border border-white/10 transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {isSubmitted ? (
          /* Confirmation State */
          <div className="p-6 text-center space-y-4 my-auto">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-400/50 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
              <CheckCircle2 className="w-8 h-8 text-emerald-400" />
            </div>
            <div className="space-y-1">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
                Ticket Created
              </span>
              <h4 className="text-xl font-black text-white font-mono">
                {ticketId}
              </h4>
              <p className="text-xs text-slate-300 max-w-sm mx-auto leading-relaxed pt-1">
                Your ticket has been logged with the VELOOP institutional triage team. Updates will be mirrored to <span className="font-mono text-cyan-300">velooprewardsofficial@gmail.com</span>.
              </p>
            </div>
            <div className="pt-3">
              <button
                type="button"
                onClick={handleResetAndClose}
                className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          /* Submission Form */
          <form onSubmit={handleSubmit} className="p-4 sm:p-5 space-y-3.5 flex-grow overflow-y-auto max-h-[70vh]">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Inquiry Subject *
              </label>
              <input
                type="text"
                required
                placeholder="Brief summary of your inquiry..."
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950/60 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400/50"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950/60 border border-white/10 text-xs text-white focus:outline-none focus:border-cyan-400/50"
                >
                  <option value="Reward Claim Inquiry">Reward Claim Inquiry</option>
                  <option value="Streak Discrepancy">Streak Discrepancy</option>
                  <option value="Institutional Verification">Institutional Verification</option>
                  <option value="API & Data Settlement">API &amp; Data Settlement</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Priority SLA
                </label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950/60 border border-white/10 text-xs text-white focus:outline-none focus:border-cyan-400/50"
                >
                  <option value="Normal">Normal (&lt; 2 hours)</option>
                  <option value="High">High (&lt; 30 mins)</option>
                  <option value="Urgent">Urgent Tier-1 (&lt; 5 mins)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Detailed Message *
              </label>
              <textarea
                required
                rows={4}
                placeholder="Describe the issue or assistance needed in detail..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950/60 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400/50 resize-none"
              />
            </div>

            {/* Simulated Attachment */}
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/60 border border-white/5 text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <Paperclip className="w-4 h-4 text-cyan-400" />
                <span className="text-[11px]">
                  {attachedFileName ? attachedFileName : 'Attach diagnostic logs or screenshot'}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setAttachedFileName('diag_session_report.json')}
                className="px-2.5 py-1 text-[10px] font-semibold rounded bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-white/10 cursor-pointer"
              >
                {attachedFileName ? 'Attached' : 'Browse'}
              </button>
            </div>

            {/* Submit Action */}
            <div className="pt-2 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={handleResetAndClose}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn-sheen px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-xs font-bold text-slate-950 flex items-center gap-1.5 shadow-lg shadow-cyan-500/20 active:scale-95 transition cursor-pointer"
              >
                <Send className="w-3.5 h-3.5 text-slate-950" />
                <span>Submit Ticket</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
