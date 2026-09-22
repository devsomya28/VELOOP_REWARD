import React, { useState } from 'react';
import { X, Search, ChevronDown, ChevronUp, HelpCircle, BookOpen } from 'lucide-react';
import { HELP_ARTICLES } from '../../utils/mockData';

interface HelpCenterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenTicket: () => void;
}

export const HelpCenterModal: React.FC<HelpCenterModalProps> = ({
  isOpen,
  onClose,
  onOpenTicket
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [openArticleId, setOpenArticleId] = useState<string | null>('faq-1');

  if (!isOpen) return null;

  const categories = ['All', 'Rewards', 'Streaks', 'Account & Security'];

  const filteredArticles = HELP_ARTICLES.filter((article) => {
    const matchesSearch =
      article.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = activeCategory === 'All' || article.category === activeCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl max-h-[85vh] flex flex-col rounded-2xl glass-panel border border-cyan-500/30 shadow-2xl overflow-hidden text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-white/[0.08] flex items-center justify-between bg-slate-900/80">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-cyan-400" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-extrabold text-white tracking-tight">
                VELOOP Knowledge Base &amp; FAQ
              </h3>
              <p className="text-xs text-slate-400">
                Official guides for rewards, streaks, and institutional operations
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

        {/* Search & Category Filter */}
        <div className="p-3 sm:p-4 border-b border-white/[0.06] bg-slate-950/60 space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search help topics (e.g. daily cap, streak reset, VEs)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400/50"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40'
                    : 'bg-slate-800/60 text-slate-400 hover:text-white border border-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Articles Accordion */}
        <div className="flex-grow overflow-y-auto p-4 space-y-2.5 max-h-[50vh]">
          {filteredArticles.length === 0 ? (
            <div className="text-center py-8 text-slate-400 text-xs">
              No matching articles found. You can submit a support ticket directly.
            </div>
          ) : (
            filteredArticles.map((article) => {
              const isOpenItem = openArticleId === article.id;
              return (
                <div
                  key={article.id}
                  className="rounded-xl bg-slate-900/60 border border-white/5 overflow-hidden transition"
                >
                  <button
                    type="button"
                    onClick={() => setOpenArticleId(isOpenItem ? null : article.id)}
                    className="w-full p-3.5 text-left flex items-center justify-between gap-3 hover:bg-slate-800/40 transition cursor-pointer"
                  >
                    <span className="text-xs font-semibold text-slate-100 flex items-center gap-2">
                      <HelpCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      {article.question}
                    </span>
                    {isOpenItem ? (
                      <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                    )}
                  </button>
                  {isOpenItem && (
                    <div className="px-4 pb-3.5 pt-1 text-xs text-slate-300 leading-relaxed border-t border-white/[0.04]">
                      {article.answer}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Footer with Submit Ticket prompt */}
        <div className="p-3.5 sm:p-4 border-t border-white/[0.08] bg-slate-950 flex flex-col sm:flex-row items-center justify-between gap-2.5 text-xs">
          <span className="text-slate-400">
            Still need assistance with an account inquiry?
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenTicket();
              }}
              className="px-3.5 py-1.5 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 hover:bg-cyan-500/30 font-semibold transition cursor-pointer"
            >
              Submit Ticket
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold transition cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
