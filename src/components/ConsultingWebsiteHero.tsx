import React from 'react';
import {
  Sparkles,
  ArrowRight,
  Droplets,
  Package,
  Brush,
  Flame,
  ShieldCheck,
  Wrench,
  Ticket as TicketIcon,
  CheckCircle2,
  Box,
  Truck
} from 'lucide-react';
import type { ConsultingFirmConfig } from '../types.ts';

interface ConsultingWebsiteHeroProps {
  firmConfig: ConsultingFirmConfig;
  onSelectPrompt: (prompt: string) => void;
  onOpenTracker: () => void;
  activeTicketCount: number;
}

export const ConsultingWebsiteHero: React.FC<ConsultingWebsiteHeroProps> = ({
  firmConfig,
  onSelectPrompt,
  onOpenTracker,
  activeTicketCount,
}) => {
  return (
    <div className="space-y-8">
      
      {/* Hero Presentation */}
      <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-900/95 via-slate-950 to-slate-950 p-6 sm:p-8 shadow-2xl">
        <div className="absolute right-0 top-0 -mt-10 -mr-10 h-80 w-80 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none"></div>
        <div className="absolute left-1/4 bottom-0 -mb-10 h-60 w-60 rounded-full bg-amber-500/10 blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-300 backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
            <span>Real-Time Poultry Consultation & Automated Farm Ticketing</span>
          </div>

          <h1 className="text-2xl font-black tracking-tight text-white sm:text-4xl sm:leading-tight">
            Premium Chicken Accessories & High-Grade Coop Cleaning Instruments
          </h1>

          <p className="text-sm text-slate-300 sm:text-base leading-relaxed">
            Get instant expert equipment sizing for your flock. From weatherproof rat-proof feeders and sub-zero heated nipple waterers, to ergonomic stainless manure scrapers and biosecurity disinfection stations. Complex commercial setups, bulk wholesale orders, and disease outbreaks automatically generate escalated tickets for our poultry specialists.
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 border-t border-slate-800/80">
            <div>
              <span className="text-xl font-black text-white">45,000+</span>
              <p className="text-[11px] text-slate-400">Flock birds equipped & sanitized</p>
            </div>
            <div>
              <span className="text-xl font-black text-emerald-400">&lt; 15 min</span>
              <p className="text-[11px] text-slate-400">Commercial ticket triage response</p>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <span className="text-xl font-black text-amber-400">100% Bio-Safe</span>
              <p className="text-[11px] text-slate-400">Avian-friendly sanitization instruments</p>
            </div>
          </div>
        </div>
      </div>

      {/* Real Inquiries / Instant Consultation Starters */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-1">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Instant Advisory Scenarios
            </span>
            <h2 className="text-lg font-bold text-white sm:text-xl">
              Select an Equipment or Sanitization Challenge to Consult AI
            </h2>
          </div>
          <span className="text-xs text-slate-400">
            Click any card to load the scenario directly into the live consultation chat
          </span>
        </div>

        <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
          
          {/* Card 1: Sub-Zero Water Freezing */}
          <div
            onClick={() =>
              onSelectPrompt(
                'My chicken drinkers constantly freeze solid at -10°F in winter. Which heated waterer or nipple drinker prevents freezing without creating a fire hazard?'
              )
            }
            className="group cursor-pointer rounded-2xl border border-slate-800 bg-slate-900/60 p-4 transition-all hover:-translate-y-1 hover:border-cyan-500/50 hover:bg-slate-900/90 shadow-lg"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400 group-hover:bg-cyan-500 group-hover:text-white transition-colors">
              <Droplets className="h-4 w-4" />
            </div>
            <h3 className="mt-2.5 text-sm font-bold text-white group-hover:text-cyan-200">
              Sub-Zero Winter Heated Drinkers
            </h3>
            <p className="mt-1 text-xs text-slate-400 leading-relaxed">
              Thermostatically regulated 120V freeze-proof nipple waterers for harsh winter climates.
            </p>
            <div className="mt-3 flex items-center gap-1 text-[11px] font-semibold text-cyan-400">
              <span>Consult Winter Drinker Options</span>
              <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 2: Feed Waste & Rat Infestation */}
          <div
            onClick={() =>
              onSelectPrompt(
                'Wild birds and rats are raiding our coop feeder and the hens fling feed all over the floor. How does the AutoFeeder-Pro gravity feeder stop feed waste?'
              )
            }
            className="group cursor-pointer rounded-2xl border border-slate-800 bg-slate-900/60 p-4 transition-all hover:-translate-y-1 hover:border-amber-500/50 hover:bg-slate-900/90 shadow-lg"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400 group-hover:bg-amber-500 group-hover:text-white transition-colors">
              <Package className="h-4 w-4" />
            </div>
            <h3 className="mt-2.5 text-sm font-bold text-white group-hover:text-amber-200">
              Rat-Proof & Anti-Spill Gravity Feeders
            </h3>
            <p className="mt-1 text-xs text-slate-400 leading-relaxed">
              Baffled weatherproof feeder ports that prevent beak-flicking waste and rodent access.
            </p>
            <div className="mt-3 flex items-center gap-1 text-[11px] font-semibold text-amber-400">
              <span>Test Feeder Consultation</span>
              <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 3: Caked Roost Manure & Cleaning Tools */}
          <div
            onClick={() =>
              onSelectPrompt(
                'Dried chicken droppings are stubbornly caked onto our wooden roost bars and dropping boards. What ergonomic scraper blade and cleaning instruments will clean this without gouging the wood?'
              )
            }
            className="group cursor-pointer rounded-2xl border border-slate-800 bg-slate-900/60 p-4 transition-all hover:-translate-y-1 hover:border-emerald-500/50 hover:bg-slate-900/90 shadow-lg"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
              <Brush className="h-4 w-4" />
            </div>
            <h3 className="mt-2.5 text-sm font-bold text-white group-hover:text-emerald-200">
              Heavy-Duty Coop Manure Scrapers
            </h3>
            <p className="mt-1 text-xs text-slate-400 leading-relaxed">
              45-degree angled stainless steel roost blades and wire scrubbers with telescoping handles.
            </p>
            <div className="mt-3 flex items-center gap-1 text-[11px] font-semibold text-emerald-400">
              <span>Test Scraper Recommendations</span>
              <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 4: Biosecurity & Mite Outbreak Sanitization */}
          <div
            onClick={() =>
              onSelectPrompt(
                'We suspect a northern fowl mite infestation in our coop cracks. What is the proper sanitization protocol using boot wash stations, foamers, and mist foggers?'
              )
            }
            className="group cursor-pointer rounded-2xl border border-slate-800 bg-slate-900/60 p-4 transition-all hover:-translate-y-1 hover:border-indigo-500/50 hover:bg-slate-900/90 shadow-lg"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-colors">
              <ShieldCheck className="h-4 w-4" />
            </div>
            <h3 className="mt-2.5 text-sm font-bold text-white group-hover:text-indigo-200">
              Coop Biosecurity & Disinfection
            </h3>
            <p className="mt-1 text-xs text-slate-400 leading-relaxed">
              Boot dip footbaths, chemical foamers, and ultra-low volume cold mist foggers for pathogen control.
            </p>
            <div className="mt-3 flex items-center gap-1 text-[11px] font-semibold text-indigo-400">
              <span>Test Biosecurity Protocol</span>
              <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 5: Safe Brooder Heating */}
          <div
            onClick={() =>
              onSelectPrompt(
                'We are raising 20 new baby chicks. Are radiant brooder heating plates safer than traditional red heat lamps, and what height should I set them?'
              )
            }
            className="group cursor-pointer rounded-2xl border border-slate-800 bg-slate-900/60 p-4 transition-all hover:-translate-y-1 hover:border-orange-500/50 hover:bg-slate-900/90 shadow-lg"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-500/10 text-orange-400 group-hover:bg-orange-500 group-hover:text-white transition-colors">
              <Flame className="h-4 w-4" />
            </div>
            <h3 className="mt-2.5 text-sm font-bold text-white group-hover:text-orange-200">
              Chick Brooder Radiant Heating
            </h3>
            <p className="mt-1 text-xs text-slate-400 leading-relaxed">
              22W fire-safe brooder heating plates mimicking maternal hen warmth without barn fire hazards.
            </p>
            <div className="mt-3 flex items-center gap-1 text-[11px] font-semibold text-orange-400">
              <span>Test Brooder Consultation</span>
              <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 6: Bulk Wholesale & Commercial Farm Pipeline */}
          <div
            onClick={() =>
              onSelectPrompt(
                'I manage a 500-bird pastured poultry farm and need a wholesale bulk quote for 15x AutoFeeders, an engineered low-pressure PVC watering pipeline, and commercial cleaning scrapers.'
              )
            }
            className="group cursor-pointer rounded-2xl border border-slate-800 bg-gradient-to-br from-amber-950/30 to-slate-900/60 p-4 transition-all hover:-translate-y-1 hover:border-amber-500/50 hover:bg-slate-900/90 shadow-lg"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/20 text-amber-300 group-hover:bg-amber-600 group-hover:text-white transition-colors">
              <TicketIcon className="h-4 w-4" />
            </div>
            <h3 className="mt-2.5 text-sm font-bold text-white group-hover:text-amber-200">
              Commercial Farm Pipeline & Bulk Ticket
            </h3>
            <p className="mt-1 text-xs text-slate-400 leading-relaxed">
              Large flock installations and bulk dealer orders trigger instant priority ticketing to our Senior Poultry Director.
            </p>
            <div className="mt-3 flex items-center gap-1 text-[11px] font-semibold text-amber-400">
              <span>Trigger Auto-Ticket Demo</span>
              <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};
