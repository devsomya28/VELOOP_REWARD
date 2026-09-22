import React, { useState } from 'react';
import { X, Send, User, Bot, Mail, FileText, CheckCircle2 } from 'lucide-react';
import { SupportMessage } from '../../types';

interface SupportChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenTicket: () => void;
}

export const SupportChatModal: React.FC<SupportChatModalProps> = ({
  isOpen,
  onClose,
  onOpenTicket
}) => {
  const [messages, setMessages] = useState<SupportMessage[]>([
    {
      id: '1',
      sender: 'concierge',
      text: 'Welcome to VELOOP Concierge Support. How may we assist your institutional rewards account today?',
      timestamp: 'Just now'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  if (!isOpen) return null;

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMsg: SupportMessage = {
      id: String(Date.now()),
      sender: 'user',
      text: inputText.trim(),
      timestamp: 'Just now'
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    // Simulated automated intelligent concierge response
    setTimeout(() => {
      let botResponse = "Thank you for contacting VELOOP Support. Our institutional specialists have logged your inquiry and will follow up with account telemetries shortly. You may also submit a formal ticket for priority tracking.";
      const lower = userMsg.text.toLowerCase();
      if (lower.includes('streak') || lower.includes('daily')) {
        botResponse = "Regarding your 7-day streak: Cycles reset daily at 00:00 UTC. Day 7 unlocks the maximum vault chest bonus with rare gems and VE tokens.";
      } else if (lower.includes('reward') || lower.includes('ve') || lower.includes('token')) {
        botResponse = "VE tokens are credited instantaneously upon completion of verified ad playback or leaderboard settlement. Your current available balance is displayed live in the top navigation.";
      } else if (lower.includes('leaderboard') || lower.includes('rank')) {
        botResponse = "The current competition stage features a 50,000 VEs prize pool. Complete daily tasks and participate in media briefings to climb standings.";
      }

      setMessages((prev) => [
        ...prev,
        {
          id: String(Date.now() + 1),
          sender: 'concierge',
          text: botResponse,
          timestamp: 'Just now'
        }
      ]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg h-[540px] flex flex-col rounded-2xl glass-panel border border-cyan-500/30 shadow-2xl overflow-hidden text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 border-b border-white/[0.08] flex items-center justify-between bg-slate-900/80">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-9 h-9 rounded-xl bg-cyan-950 border border-cyan-400/40 flex items-center justify-center">
                <Bot className="w-5 h-5 text-cyan-400" />
              </div>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-slate-900" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-sm font-bold text-white">VELOOP Concierge</h3>
                <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  ONLINE
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Average reply time: &lt; 3 minutes
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center border border-white/10 transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Messages List */}
        <div className="flex-grow overflow-y-auto p-4 space-y-3 bg-slate-950/40">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-2.5 ${
                msg.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {msg.sender === 'concierge' && (
                <div className="w-6 h-6 rounded-md bg-cyan-900/40 border border-cyan-500/30 flex items-center justify-center shrink-0 mt-0.5">
                  <Bot className="w-3.5 h-3.5 text-cyan-300" />
                </div>
              )}
              <div
                className={`p-3 rounded-2xl max-w-[80%] text-xs leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-blue-600 text-white rounded-tr-none shadow-md'
                    : 'bg-slate-900/90 border border-white/10 text-slate-200 rounded-tl-none'
                }`}
              >
                <p>{msg.text}</p>
                <span className="block text-[9px] text-slate-400/80 mt-1 text-right">
                  {msg.timestamp}
                </span>
              </div>
              {msg.sender === 'user' && (
                <div className="w-6 h-6 rounded-md bg-blue-900/40 border border-blue-500/30 flex items-center justify-center shrink-0 mt-0.5">
                  <User className="w-3.5 h-3.5 text-blue-300" />
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-2 text-slate-400 text-xs italic">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span>Concierge is drafting response...</span>
            </div>
          )}
        </div>

        {/* Quick Suggestion Pills */}
        <div className="px-3 py-1.5 bg-slate-900/60 border-t border-white/[0.04] flex items-center gap-1.5 overflow-x-auto no-scrollbar text-[11px]">
          <button
            type="button"
            onClick={() => setInputText('How does the 7-day streak work?')}
            className="px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition whitespace-nowrap cursor-pointer"
          >
            Streak rules?
          </button>
          <button
            type="button"
            onClick={() => setInputText('When are leaderboard prizes distributed?')}
            className="px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition whitespace-nowrap cursor-pointer"
          >
            Prize payout?
          </button>
          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenTicket();
            }}
            className="px-2.5 py-1 rounded-full bg-cyan-950/60 text-cyan-300 border border-cyan-400/30 hover:bg-cyan-900/50 transition whitespace-nowrap flex items-center gap-1 cursor-pointer"
          >
            <FileText className="w-3 h-3" />
            Submit formal ticket
          </button>
        </div>

        {/* Input Footer */}
        <form onSubmit={handleSendMessage} className="p-3 bg-slate-950 border-t border-white/[0.08] flex items-center gap-2">
          <input
            type="text"
            placeholder="Type your question..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="flex-grow px-3.5 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400/50"
          />
          <button
            type="submit"
            disabled={!inputText.trim()}
            className="w-9 h-9 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-40 text-slate-950 font-bold flex items-center justify-center transition cursor-pointer"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
