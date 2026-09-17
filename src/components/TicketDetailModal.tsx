import React, { useState } from 'react';
import {
  X,
  Ticket as TicketIcon,
  AlertCircle,
  Clock,
  User,
  Building2,
  CheckCircle2,
  FileText,
  ShieldCheck,
  Send,
  Sparkles,
  ArrowUpRight,
  Printer
} from 'lucide-react';
import type { Ticket, TicketPriority, TicketStatus } from '../types.ts';

interface TicketDetailModalProps {
  ticket: Ticket | null;
  onClose: () => void;
  onUpdateStatus?: (id: string, status: TicketStatus) => void;
  onAddNote?: (id: string, text: string, author: string) => void;
  isConsultantView?: boolean;
}

export const TicketDetailModal: React.FC<TicketDetailModalProps> = ({
  ticket,
  onClose,
  onUpdateStatus,
  onAddNote,
  isConsultantView = false,
}) => {
  const [newNote, setNewNote] = useState('');
  const [authorName, setAuthorName] = useState('Marcus Sterling');

  if (!ticket) return null;

  const getPriorityColor = (priority: TicketPriority) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-500/10 text-red-400 border-red-500/30 ring-red-500/20';
      case 'high':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30 ring-amber-500/20';
      case 'medium':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/30 ring-blue-500/20';
      default:
        return 'bg-slate-500/10 text-slate-400 border-slate-500/30 ring-slate-500/20';
    }
  };

  const getStatusBadge = (status: TicketStatus) => {
    switch (status) {
      case 'open':
        return <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-400 border border-emerald-500/30">Open - Triage Queued</span>;
      case 'in_progress':
        return <span className="rounded-full bg-indigo-500/10 px-2.5 py-0.5 text-xs font-semibold text-indigo-400 border border-indigo-500/30">In Progress (Active Advisory)</span>;
      case 'under_review':
        return <span className="rounded-full bg-amber-500/10 px-2.5 py-0.5 text-xs font-semibold text-amber-400 border border-amber-500/30">Under Partner Review</span>;
      case 'resolved':
        return <span className="rounded-full bg-slate-500/10 px-2.5 py-0.5 text-xs font-semibold text-slate-300 border border-slate-500/30">Resolved</span>;
    }
  };

  const handleAddNoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim() || !onAddNote) return;
    onAddNote(ticket.id, newNote.trim(), authorName);
    setNewNote('');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm">
      <div className="relative flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl shadow-indigo-950/50">
        
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-800 bg-slate-950/60 p-5">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-xs font-bold text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded-md">
                {ticket.id}
              </span>
              <span className={`text-xs font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md border ${getPriorityColor(ticket.priority)}`}>
                {ticket.priority} Priority
              </span>
              <span className="text-xs font-medium text-slate-400 bg-slate-800/80 px-2.5 py-0.5 rounded-md">
                {ticket.category}
              </span>
              {getStatusBadge(ticket.status)}
            </div>
            <h2 className="text-lg font-bold text-white sm:text-xl">
              {ticket.title}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-slate-200 transition-colors"
              title="Print / Save Ticket PDF"
            >
              <Printer className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-slate-200 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 space-y-6 overflow-y-auto p-5 sm:p-6">
          
          {/* Metadata Grid */}
          <div className="grid grid-cols-1 gap-3 rounded-xl border border-slate-800/80 bg-slate-950/40 p-4 sm:grid-cols-3">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Client / Contact</span>
              <div className="mt-1 flex items-center gap-1.5 text-sm font-medium text-slate-200">
                <User className="h-3.5 w-3.5 text-indigo-400" />
                <span>{ticket.clientName}</span>
              </div>
              <span className="text-xs text-slate-400 block">{ticket.clientEmail}</span>
            </div>

            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Organization</span>
              <div className="mt-1 flex items-center gap-1.5 text-sm font-medium text-slate-200">
                <Building2 className="h-3.5 w-3.5 text-cyan-400" />
                <span>{ticket.companyName || 'Not specified'}</span>
              </div>
              <span className="text-xs text-slate-400 block">Created: {new Date(ticket.createdAt).toLocaleDateString()}</span>
            </div>

            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Assigned Specialist</span>
              <div className="mt-1 flex items-center gap-1.5 text-sm font-medium text-slate-200">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                <span>{ticket.assignedConsultant || 'Unassigned'}</span>
              </div>
              <span className="text-xs text-slate-400 block">Est: {ticket.aiAssessment.estimatedHours}</span>
            </div>
          </div>

          {/* Issue Description */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
              Client Challenge Description
            </h3>
            <div className="rounded-xl border border-slate-800 bg-slate-950/50 p-4 text-sm text-slate-300 leading-relaxed">
              {ticket.description}
            </div>
          </div>

          {/* AI Automated Diagnostic Assessment */}
          <div className="rounded-xl border border-indigo-500/20 bg-indigo-950/20 p-4 sm:p-5">
            <div className="flex items-center gap-2 text-indigo-300 font-semibold text-sm mb-3">
              <Sparkles className="h-4 w-4 text-indigo-400" />
              <span>AI Automated Diagnostic Assessment & Scoping</span>
            </div>

            <div className="space-y-3 text-sm">
              <div>
                <span className="text-xs font-medium text-slate-400">Complexity Rationale:</span>
                <p className="text-slate-200 mt-0.5">{ticket.aiAssessment.complexityReason}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="rounded-lg bg-slate-900/60 p-2.5 border border-slate-800/80">
                  <span className="text-xs text-slate-400 block">Suggested Practice Expertise</span>
                  <span className="text-sm font-medium text-indigo-200">{ticket.aiAssessment.suggestedExpertise}</span>
                </div>
                <div className="rounded-lg bg-slate-900/60 p-2.5 border border-slate-800/80">
                  <span className="text-xs text-slate-400 block">Estimated Scoping Window</span>
                  <span className="text-sm font-medium text-amber-200">{ticket.aiAssessment.estimatedHours}</span>
                </div>
              </div>

              {ticket.aiAssessment.keyQuestions && ticket.aiAssessment.keyQuestions.length > 0 && (
                <div className="pt-2">
                  <span className="text-xs font-medium text-slate-400 block mb-1.5">Key Scoping Discovery Questions to Verify:</span>
                  <ul className="space-y-1 text-xs text-slate-300 list-disc list-inside">
                    {ticket.aiAssessment.keyQuestions.map((q, idx) => (
                      <li key={idx} className="text-slate-300">{q}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Consultant Notes & Action Feed */}
          {isConsultantView && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Consultant Advisory Notes ({ticket.consultantNotes?.length || 0})
                </h3>

                {onUpdateStatus && (
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400">Update Status:</span>
                    <select
                      value={ticket.status}
                      onChange={(e) => onUpdateStatus(ticket.id, e.target.value as TicketStatus)}
                      className="rounded-lg border border-slate-700 bg-slate-800 px-2 py-1 text-xs font-medium text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    >
                      <option value="open">Open - Triage</option>
                      <option value="in_progress">In Progress</option>
                      <option value="under_review">Under Review</option>
                      <option value="resolved">Resolved</option>
                    </select>
                  </div>
                )}
              </div>

              {/* Notes List */}
              <div className="space-y-2">
                {ticket.consultantNotes && ticket.consultantNotes.length > 0 ? (
                  ticket.consultantNotes.map((note) => (
                    <div key={note.id} className="rounded-lg border border-slate-800 bg-slate-950/40 p-3 text-xs">
                      <div className="flex items-center justify-between text-slate-400 mb-1">
                        <span className="font-semibold text-slate-300">{note.author}</span>
                        <span>{new Date(note.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                      <p className="text-slate-200">{note.text}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-slate-400 italic">No consultant notes logged yet.</p>
                )}
              </div>

              {/* Add Note Form */}
              {onAddNote && (
                <form onSubmit={handleAddNoteSubmit} className="mt-2 flex gap-2">
                  <input
                    type="text"
                    placeholder="Add internal partner note or audit recommendation..."
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    className="flex-1 rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-white placeholder-slate-400 focus:border-indigo-500 focus:outline-none"
                  />
                  <button
                    type="submit"
                    disabled={!newNote.trim()}
                    className="rounded-lg bg-indigo-600 px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-indigo-500 disabled:opacity-50"
                  >
                    Add Note
                  </button>
                </form>
              )}
            </div>
          )}

          {/* Conversation Audit Log */}
          {ticket.conversationLog && ticket.conversationLog.length > 0 && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Original Conversation Snapshot
              </h3>
              <div className="space-y-2 rounded-xl border border-slate-800 bg-slate-950/30 p-3 text-xs max-h-48 overflow-y-auto">
                {ticket.conversationLog.map((log) => (
                  <div key={log.id} className="flex flex-col gap-0.5">
                    <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
                      <span className="font-semibold capitalize text-slate-300">{log.sender}:</span>
                      <span>{new Date(log.timestamp).toLocaleTimeString()}</span>
                    </div>
                    <p className="text-slate-300 pl-2 border-l border-slate-800">{log.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-slate-800 bg-slate-950/70 p-4">
          <span className="text-xs text-slate-400">
            Automated Ticketing System • Ticket ID: {ticket.id}
          </span>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg bg-slate-800 px-4 py-1.5 text-xs font-semibold text-slate-200 hover:bg-slate-700 transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
