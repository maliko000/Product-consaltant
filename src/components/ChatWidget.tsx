import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import {
  Bot,
  User,
  Send,
  Sparkles,
  Ticket as TicketIcon,
  AlertCircle,
  HelpCircle,
  Building2,
  CheckCircle2,
  ChevronRight,
  ArrowRight,
  RefreshCw,
  Sliders,
  ShieldCheck,
  Maximize2,
  Minimize2,
  Clock,
  Package,
  Brush,
  Droplets
} from 'lucide-react';
import type { ChatMessage, Ticket, ConsultingFirmConfig, ProactiveQuery } from '../types.ts';

interface ClientContext {
  clientName: string;
  clientEmail: string;
  companyName: string;
  productDescription: string;
}

interface ChatWidgetProps {
  firmConfig: ConsultingFirmConfig;
  onTicketCreated: (ticket: Ticket) => void;
  onViewTicket: (ticket: Ticket) => void;
  clientContext: ClientContext;
  onUpdateClientContext: (context: Partial<ClientContext>) => void;
}

export const ChatWidget: React.FC<ChatWidgetProps> = ({
  firmConfig,
  onTicketCreated,
  onViewTicket,
  clientContext,
  onUpdateClientContext,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'bot',
      text: `### Welcome to **${firmConfig.firmName}**.
I am your Senior AI Poultry Equipment & Biosecurity Specialist. I provide real-time consultation on **chicken accessories (weatherproof gravity feeders, heated freeze-proof drinkers, rollaway nests, brooder plates)** and **coop cleaning instruments (ergonomic manure scrapers, pressure foamers, boot wash footbaths)**.

To recommend the optimal gear for your setup, **how many birds or laying hens are currently in your flock?**`,
      timestamp: new Date().toISOString(),
      proactiveProductQuery: {
        field: 'flockSize',
        question: 'How many chickens or poultry birds do you currently care for?',
        options: [
          '1 - 15 Backyard Hens',
          '16 - 50 Homestead Flock',
          '51 - 250 Free-Range Farm',
          '250+ Commercial Production'
        ]
      },
      suggestedActions: [
        'Recommended feeders for 25 hens',
        'How to sanitize coop after red mites?',
        'FrostGuard heated waterer specs',
        'Request bulk wholesale farm quote'
      ]
    }
  ]);

  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isContextDrawerOpen, setIsContextDrawerOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend?: string, forceEscalate: boolean = false) => {
    const text = textToSend || inputMessage.trim();
    if (!text || isLoading) return;

    const userMessageId = `user-${Date.now()}`;
    const newMsg: ChatMessage = {
      id: userMessageId,
      sender: 'user',
      text,
      timestamp: new Date().toISOString()
    };

    setMessages((prev) => [...prev, newMsg]);
    if (!textToSend) setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: messages.slice(-8),
          clientContext,
          forceEscalate
        })
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data = await response.json();

      if (data.ticketCreated) {
        onTicketCreated(data.ticketCreated);
      }

      if (data.extractedClientInfo) {
        onUpdateClientContext({
          clientName: data.extractedClientInfo.clientName || clientContext.clientName,
          clientEmail: data.extractedClientInfo.clientEmail || clientContext.clientEmail,
          companyName: data.extractedClientInfo.companyName || clientContext.companyName,
          productDescription:
            data.extractedClientInfo.flockSize ||
            data.extractedClientInfo.productDescription ||
            clientContext.productDescription
        });
      }

      const botMessageId = `bot-${Date.now()}`;
      const botMsg: ChatMessage = {
        id: botMessageId,
        sender: 'bot',
        text: data.reply,
        timestamp: new Date().toISOString(),
        proactiveProductQuery: data.proactiveProductQuery || undefined,
        ticketCreated: data.ticketCreated,
        isComplexIssueDetected: data.isComplexIssue,
        suggestedActions: data.suggestedActions
      };

      setMessages((prev) => [...prev, botMsg]);

    } catch (error) {
      console.error('Failed to send message:', error);
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          sender: 'bot',
          text: `I apologize, but our consultation engine encountered a connection delay. Please retry or click below to directly escalate an equipment ticket to Dr. Ethan Wright.`,
          timestamp: new Date().toISOString(),
          suggestedActions: ['Open Specialist Ticket', 'View Chicken Accessories', 'View Cleaning Instruments']
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectDiscoveryOption = (field: string, option: string) => {
    onUpdateClientContext({
      productDescription: `${field}: ${option}`
    });
    handleSendMessage(`Our flock profile is: ${option}`);
  };

  const handleManualEscalation = () => {
    const prompt = clientContext.productDescription
      ? `I would like to create a formal poultry equipment consultation ticket for our flock setup (${clientContext.productDescription}) to receive a customized installation or wholesale proposal.`
      : `I have a complex poultry equipment or coop sanitization requirement and need to open a formal ticket with Dr. Ethan Wright.`;
    handleSendMessage(prompt, true);
  };

  return (
    <div className={`relative flex flex-col overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/95 shadow-2xl shadow-emerald-950/30 backdrop-blur-md transition-all duration-300 ${
      isExpanded ? 'fixed inset-4 z-50 md:inset-8' : 'h-[640px] w-full'
    }`}>
      
      {/* Widget Header */}
      <div className="flex items-center justify-between border-b border-slate-800 bg-slate-950/80 px-4 py-3 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 text-white shadow-md shadow-emerald-600/30">
            <Bot className="h-5 w-5" />
            <span className="absolute -bottom-0.5 -right-0.5 flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500"></span>
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-white sm:text-base">
                {firmConfig.firmName}
              </h3>
              <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-400 ring-1 ring-inset ring-emerald-500/20">
                AI Specialist Online
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Chicken Accessories & Sanitization Assistant
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Client Details Drawer Trigger */}
          <button
            type="button"
            onClick={() => setIsContextDrawerOpen(!isContextDrawerOpen)}
            className={`flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs font-medium transition-colors ${
              clientContext.companyName || clientContext.productDescription
                ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300'
                : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:text-slate-200'
            }`}
            title="Configure Your Farm & Flock Details"
          >
            <Building2 className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">
              {clientContext.companyName || 'My Farm / Flock'}
            </span>
          </button>

          {/* Direct Ticket Creation */}
          <button
            type="button"
            onClick={handleManualEscalation}
            className="flex items-center gap-1.5 rounded-lg border border-amber-500/30 bg-amber-600/20 px-2.5 py-1 text-xs font-semibold text-amber-300 transition-colors hover:bg-amber-600/30 hover:text-white"
            title="Escalate issue to a formal poultry specialist ticket"
          >
            <TicketIcon className="h-3.5 w-3.5 text-amber-400" />
            <span className="hidden sm:inline">Escalate Ticket</span>
          </button>

          {/* Expand/Collapse */}
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-slate-200 transition-colors"
            title={isExpanded ? 'Collapse' : 'Expand full screen'}
          >
            {isExpanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Farm Profile Setup Drawer (Collapsible) */}
      {isContextDrawerOpen && (
        <div className="border-b border-slate-800 bg-slate-950/90 p-4 transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5" />
              Your Farm & Flock Profile
            </span>
            <button
              type="button"
              onClick={() => setIsContextDrawerOpen(false)}
              className="text-xs text-slate-400 hover:text-white"
            >
              Close
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <label className="text-slate-400 block mb-1">Your Name</label>
              <input
                type="text"
                placeholder="e.g. Samuel Miller"
                value={clientContext.clientName}
                onChange={(e) => onUpdateClientContext({ clientName: e.target.value })}
                className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-white placeholder-slate-400 focus:border-emerald-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-slate-400 block mb-1">Contact Email</label>
              <input
                type="email"
                placeholder="e.g. samuel@pastures.com"
                value={clientContext.clientEmail}
                onChange={(e) => onUpdateClientContext({ clientEmail: e.target.value })}
                className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-white placeholder-slate-400 focus:border-emerald-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-slate-400 block mb-1">Farm / Coop Name</label>
              <input
                type="text"
                placeholder="e.g. Green Pastures Homestead"
                value={clientContext.companyName}
                onChange={(e) => onUpdateClientContext({ companyName: e.target.value })}
                className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-white placeholder-slate-400 focus:border-emerald-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-slate-400 block mb-1">Flock Size & Coop Type</label>
              <input
                type="text"
                placeholder="e.g. 35 Laying Hens in Walk-in Coop"
                value={clientContext.productDescription}
                onChange={(e) => onUpdateClientContext({ productDescription: e.target.value })}
                className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-white placeholder-slate-400 focus:border-emerald-500 focus:outline-none"
              />
            </div>
          </div>
        </div>
      )}

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 sm:p-6">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            {/* Sender Label */}
            <div className="mb-1 flex items-center gap-1.5 text-[10px] text-slate-400">
              {msg.sender === 'user' ? (
                <>
                  <span>You (Poultry Keeper)</span>
                  <User className="h-3 w-3 text-emerald-400" />
                </>
              ) : (
                <>
                  <Bot className="h-3 w-3 text-emerald-400" />
                  <span>CluckCare Specialist AI</span>
                </>
              )}
            </div>

            {/* Bubble */}
            <div
              className={`relative max-w-[90%] sm:max-w-[85%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                  : 'border border-slate-800 bg-slate-950/80 text-slate-200 shadow-md'
              }`}
            >
              {msg.sender === 'user' ? (
                <div className="whitespace-pre-wrap">{msg.text}</div>
              ) : (
                <div className="prose prose-invert prose-xs sm:prose-sm max-w-none space-y-2">
                  <ReactMarkdown>{msg.text}</ReactMarkdown>
                </div>
              )}
            </div>

            {/* Proactive Discovery Question Chips ("You send me queries too about my product etc") */}
            {msg.proactiveProductQuery && (
              <div className="mt-3 w-full max-w-[90%] sm:max-w-[85%] rounded-xl border border-emerald-500/30 bg-emerald-950/30 p-3.5 text-xs text-slate-200">
                <div className="flex items-center gap-1.5 text-emerald-400 font-bold mb-2">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Equipment Discovery Query:</span>
                </div>
                <p className="text-slate-300 mb-2.5">{msg.proactiveProductQuery.question}</p>
                {msg.proactiveProductQuery.options && (
                  <div className="flex flex-wrap gap-1.5">
                    {msg.proactiveProductQuery.options.map((opt, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() =>
                          handleSelectDiscoveryOption(msg.proactiveProductQuery!.field, opt)
                        }
                        className="rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-2.5 py-1 text-[11px] font-medium text-emerald-300 hover:bg-emerald-500/25 hover:text-white transition-colors"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Automated Ticket Generated Card */}
            {msg.ticketCreated && (
              <div className="mt-3 w-full max-w-[90%] sm:max-w-[85%] overflow-hidden rounded-xl border border-amber-500/40 bg-slate-950 p-4 shadow-xl shadow-amber-950/20">
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-amber-500/20 text-amber-400">
                      <TicketIcon className="h-3.5 w-3.5" />
                    </span>
                    <span className="font-mono text-xs font-bold text-amber-400">
                      {msg.ticketCreated.id}
                    </span>
                  </div>
                  <span className="rounded bg-amber-500/10 px-2 py-0.5 text-[10px] font-bold text-amber-400 border border-amber-500/30 uppercase">
                    {msg.ticketCreated.priority} Priority
                  </span>
                </div>

                <h4 className="mt-2 text-xs font-bold text-white">
                  {msg.ticketCreated.title}
                </h4>

                <p className="mt-1 text-[11px] text-slate-400">
                  {msg.ticketCreated.aiAssessment.complexityReason}
                </p>

                <div className="mt-3 flex items-center justify-between border-t border-slate-800/80 pt-2 text-[11px]">
                  <span className="text-slate-400">
                    Assigned: {msg.ticketCreated.assignedConsultant || 'Dr. Ethan Wright'}
                  </span>
                  <button
                    type="button"
                    onClick={() => onViewTicket(msg.ticketCreated!)}
                    className="flex items-center gap-1 font-semibold text-emerald-400 hover:text-emerald-300"
                  >
                    <span>View Ticket Record</span>
                    <ChevronRight className="h-3 w-3" />
                  </button>
                </div>
              </div>
            )}

            {/* Quick Action Chips */}
            {msg.suggestedActions && msg.suggestedActions.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1.5 max-w-[90%] sm:max-w-[85%]">
                {msg.suggestedActions.map((action, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSendMessage(action)}
                    className="rounded-full border border-slate-800 bg-slate-950/60 px-3 py-1 text-[11px] text-slate-300 hover:border-emerald-500/40 hover:bg-slate-800 hover:text-white transition-colors"
                  >
                    {action}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex items-start gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400">
              <Bot className="h-4 w-4 animate-pulse" />
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-950/60 px-4 py-3 text-xs text-slate-400 flex items-center gap-2">
              <RefreshCw className="h-3.5 w-3.5 animate-spin text-emerald-400" />
              <span>Analyzing equipment specifications & biosecurity protocols...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Bar */}
      <div className="border-t border-slate-800 bg-slate-950/90 p-3 sm:p-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2"
        >
          <input
            id="chat-input-field"
            type="text"
            placeholder="Ask about gravity feeders, heated drinkers, roost scrapers, or boot baths..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            disabled={isLoading}
            className="flex-1 rounded-xl border border-slate-800 bg-slate-900 px-4 py-2.5 text-xs text-white placeholder-slate-400 focus:border-emerald-500 focus:outline-none disabled:opacity-50 sm:text-sm"
          />
          <button
            type="submit"
            disabled={!inputMessage.trim() || isLoading}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white hover:bg-emerald-500 disabled:opacity-40 transition-colors shadow-md shadow-emerald-600/25"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>

    </div>
  );
};
