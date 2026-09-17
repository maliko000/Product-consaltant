import React, { useState } from 'react';
import {
  Ticket as TicketIcon,
  Search,
  X,
  AlertCircle,
  Clock,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  Building2
} from 'lucide-react';
import type { Ticket } from '../types.ts';

interface TicketTrackerModalProps {
  isOpen: boolean;
  onClose: () => void;
  tickets: Ticket[];
  onSelectTicket: (ticket: Ticket) => void;
}

export const TicketTrackerModal: React.FC<TicketTrackerModalProps> = ({
  isOpen,
  onClose,
  tickets,
  onSelectTicket,
}) => {
  const [searchId, setSearchId] = useState('');
  const [searchedTicket, setSearchedTicket] = useState<Ticket | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(true);
    const cleaned = searchId.trim().toUpperCase();
    const found = tickets.find(
      (t) => t.id.toUpperCase() === cleaned || t.id.toUpperCase().includes(cleaned)
    );
    setSearchedTicket(found || null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl shadow-indigo-950/50">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 bg-slate-950/80 p-5">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/20 text-indigo-400">
              <TicketIcon className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Consultation Ticket Tracker</h2>
              <p className="text-xs text-slate-400">Track real-time status of your escalated inquiry</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-slate-200 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Search Input */}
        <div className="p-5 space-y-4">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Enter Ticket ID (e.g. TICK-1024)..."
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                className="w-full rounded-xl border border-slate-800 bg-slate-950 py-2 pl-9 pr-3 text-xs text-white placeholder-slate-400 focus:border-indigo-500 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-500 transition-colors"
            >
              Lookup
            </button>
          </form>

          {/* Search Result */}
          {hasSearched && (
            <div>
              {searchedTicket ? (
                <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                      {searchedTicket.id}
                    </span>
                    <span className="rounded bg-emerald-500/10 px-2 py-0.5 text-xs font-semibold text-emerald-400 border border-emerald-500/30 capitalize">
                      {searchedTicket.status.replace('_', ' ')}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-white">
                    {searchedTicket.title}
                  </h3>

                  <p className="text-xs text-slate-300 line-clamp-2">
                    {searchedTicket.description}
                  </p>

                  <div className="rounded-lg bg-indigo-950/30 border border-indigo-500/20 p-2.5 text-xs text-indigo-200">
                    <strong>AI Diagnostic:</strong> {searchedTicket.aiAssessment.complexityReason}
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs">
                    <span className="text-slate-400">
                      Assigned: {searchedTicket.assignedConsultant || 'Under Review'}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        onSelectTicket(searchedTicket);
                      }}
                      className="flex items-center gap-1 font-semibold text-indigo-400 hover:text-indigo-300"
                    >
                      <span>View Full Record</span>
                      <ChevronRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="rounded-xl border border-slate-800 bg-slate-950/30 p-6 text-center text-xs text-slate-400">
                  <AlertCircle className="mx-auto h-6 w-6 text-amber-400 mb-1" />
                  <span>No ticket found matching "{searchId}". Please verify the Ticket ID.</span>
                </div>
              )}
            </div>
          )}

          {/* Quick List of Recent Tickets */}
          <div className="border-t border-slate-800 pt-4">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
              Recent Tickets in System ({tickets.slice(0, 3).length})
            </span>
            <div className="space-y-1.5">
              {tickets.slice(0, 3).map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => {
                    onClose();
                    onSelectTicket(t);
                  }}
                  className="flex w-full items-center justify-between rounded-lg border border-slate-800/80 bg-slate-950/40 px-3 py-2 text-left text-xs hover:border-slate-700 hover:bg-slate-800/50 transition-colors"
                >
                  <div className="flex items-center gap-2 truncate">
                    <span className="font-mono font-bold text-indigo-400">{t.id}</span>
                    <span className="truncate text-slate-300">{t.title}</span>
                  </div>
                  <span className="shrink-0 text-[10px] text-slate-400 capitalize">{t.status.replace('_', ' ')}</span>
                </button>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
