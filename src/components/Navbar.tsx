import React from 'react';
import { Bot, Ticket, Inbox, ShieldCheck, Sparkles, Building2, Package, Brush } from 'lucide-react';
import type { ConsultingFirmConfig } from '../types.ts';

interface NavbarProps {
  activeTab: 'client' | 'consultant';
  setActiveTab: (tab: 'client' | 'consultant') => void;
  firmConfig: ConsultingFirmConfig;
  ticketCount: number;
  inquiryCount: number;
  onOpenTracker: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  firmConfig,
  ticketCount,
  inquiryCount,
  onOpenTracker
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-950/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Brand & Firm Identity */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-emerald-600 via-teal-500 to-amber-400 text-white shadow-lg shadow-emerald-500/25">
            <Package className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold tracking-tight text-white sm:text-lg">
                {firmConfig.firmName}
              </span>
              <span className="hidden rounded-full bg-emerald-500/10 px-2 py-0.5 text-xs font-semibold text-emerald-400 ring-1 ring-inset ring-emerald-500/20 sm:inline-block">
                Poultry & Sanitation Suite
              </span>
            </div>
            <p className="hidden text-xs text-slate-400 md:block">
              {firmConfig.tagline}
            </p>
          </div>
        </div>

        {/* View Switcher & Actions */}
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="flex rounded-xl bg-slate-900/90 p-1 ring-1 ring-slate-800">
            <button
              type="button"
              id="nav-client-portal-btn"
              onClick={() => setActiveTab('client')}
              className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-medium transition-all sm:text-sm ${
                activeTab === 'client'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Bot className="h-4 w-4" />
              <span>Poultry Gear & AI Advisor</span>
            </button>

            <button
              type="button"
              id="nav-consultant-hub-btn"
              onClick={() => setActiveTab('consultant')}
              className={`relative flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-medium transition-all sm:text-sm ${
                activeTab === 'consultant'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Inbox className="h-4 w-4" />
              <span>Operations Hub</span>
              {(ticketCount > 0 || inquiryCount > 0) && (
                <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-amber-500/20 px-1.5 text-[10px] font-bold text-amber-400 ring-1 ring-amber-500/30">
                  {ticketCount + inquiryCount}
                </span>
              )}
            </button>
          </div>

          <button
            type="button"
            id="nav-track-ticket-btn"
            onClick={onOpenTracker}
            className="flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900/60 px-2.5 py-1.5 text-xs font-medium text-slate-300 transition-colors hover:border-slate-700 hover:bg-slate-800 hover:text-white"
            title="Track Farm Ticket by ID"
          >
            <Ticket className="h-3.5 w-3.5 text-emerald-400" />
            <span className="hidden md:inline">Ticket Tracker</span>
          </button>
        </div>

      </div>
    </header>
  );
};
