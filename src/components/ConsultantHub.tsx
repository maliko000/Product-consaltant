import React, { useState } from 'react';
import {
  Ticket as TicketIcon,
  Inbox,
  Sparkles,
  Search,
  Filter,
  AlertCircle,
  Clock,
  User,
  Building2,
  CheckCircle2,
  Sliders,
  Layers,
  ArrowUpRight,
  TrendingUp,
  FileText,
  ShieldCheck,
  Plus,
  ChevronRight,
  RefreshCw,
  HelpCircle,
  ExternalLink,
  Package,
  Brush,
  ShoppingBag,
  DollarSign,
  Truck
} from 'lucide-react';
import type {
  Ticket,
  ClientInquiryLead,
  ConsultingFirmConfig,
  TicketStatus,
  TicketPriority,
  PoultryProduct,
  FarmQuoteOrder
} from '../types.ts';

interface ConsultantHubProps {
  tickets: Ticket[];
  inquiries: ClientInquiryLead[];
  products: PoultryProduct[];
  orders: FarmQuoteOrder[];
  firmConfig: ConsultingFirmConfig;
  onUpdateTicketStatus: (id: string, status: TicketStatus) => void;
  onSelectTicket: (ticket: Ticket) => void;
  onUpdateInquiryStatus: (id: string, status: ClientInquiryLead['status']) => void;
  onUpdateFirmConfig: (newConfig: Partial<ConsultingFirmConfig>) => void;
  onUpdateProductStock: (id: string, newStock: number) => void;
  onAddNewProduct: (newProduct: Partial<PoultryProduct>) => void;
  onUpdateOrderStatus: (id: string, status: FarmQuoteOrder['status']) => void;
  onRefreshData: () => void;
}

export const ConsultantHub: React.FC<ConsultantHubProps> = ({
  tickets,
  inquiries,
  products,
  orders,
  firmConfig,
  onUpdateTicketStatus,
  onSelectTicket,
  onUpdateInquiryStatus,
  onUpdateFirmConfig,
  onUpdateProductStock,
  onAddNewProduct,
  onUpdateOrderStatus,
  onRefreshData
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'tickets' | 'inquiries' | 'products' | 'orders' | 'settings'>('tickets');
  const [ticketSearch, setTicketSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [inquirySearch, setInquirySearch] = useState('');
  const [productCategoryFilter, setProductCategoryFilter] = useState<string>('all');

  // New Product Modal State
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [newProdName, setNewProdName] = useState('');
  const [newProdCategory, setNewProdCategory] = useState<'chicken_accessories' | 'cleaning_instruments'>('chicken_accessories');
  const [newProdPrice, setNewProdPrice] = useState('39.99');
  const [newProdStock, setNewProdStock] = useState('25');
  const [newProdDesc, setNewProdDesc] = useState('');
  const [newProdFlock, setNewProdFlock] = useState('10 - 30 birds');

  // Filtered tickets
  const filteredTickets = tickets.filter(t => {
    const matchesSearch =
      t.title.toLowerCase().includes(ticketSearch.toLowerCase()) ||
      t.id.toLowerCase().includes(ticketSearch.toLowerCase()) ||
      t.clientName.toLowerCase().includes(ticketSearch.toLowerCase()) ||
      t.companyName.toLowerCase().includes(ticketSearch.toLowerCase()) ||
      t.category.toLowerCase().includes(ticketSearch.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || t.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || t.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  // Filtered inquiries
  const filteredInquiries = inquiries.filter(i => {
    return (
      i.clientName.toLowerCase().includes(inquirySearch.toLowerCase()) ||
      i.companyName.toLowerCase().includes(inquirySearch.toLowerCase()) ||
      i.productDescription.toLowerCase().includes(inquirySearch.toLowerCase()) ||
      i.primaryChallenge.toLowerCase().includes(inquirySearch.toLowerCase())
    );
  });

  // Filtered products
  const filteredProducts = products.filter(p => {
    return productCategoryFilter === 'all' || p.category === productCategoryFilter;
  });

  const handleCreateProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdName.trim()) return;

    onAddNewProduct({
      name: newProdName.trim(),
      category: newProdCategory,
      price: Number(newProdPrice) || 29.99,
      stock: Number(newProdStock) || 10,
      description: newProdDesc.trim() || 'Quality farm-tested poultry equipment.',
      specifications: ['Commercial grade materials', 'Built for harsh outdoor coop conditions'],
      recommendedFlockSize: newProdFlock,
      badge: 'New Addition',
      iconType: newProdCategory === 'chicken_accessories' ? 'feeder' : 'scraper'
    });

    setNewProdName('');
    setNewProdDesc('');
    setShowAddProductModal(false);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner & Tab Navigation */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 backdrop-blur-sm shadow-xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400"></span>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                Operations & Management Hub
              </span>
            </div>
            <h1 className="mt-1 text-2xl font-black tracking-tight text-white sm:text-3xl">
              {firmConfig.firmName} Management Portal
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-slate-400">
              Review escalated farm tickets, inspect client inquiries ("queries sent to me"), adjust chicken accessories & cleaning instruments stock, and fulfill customer orders.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onRefreshData}
              className="flex items-center gap-1.5 rounded-xl border border-slate-800 bg-slate-800/60 px-3 py-2 text-xs font-medium text-slate-300 hover:border-slate-700 hover:text-white transition-colors"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              <span>Refresh Feed</span>
            </button>
          </div>
        </div>

        {/* Sub-Tabs */}
        <div className="mt-6 flex flex-wrap gap-2 border-t border-slate-800/80 pt-4">
          <button
            type="button"
            onClick={() => setActiveSubTab('tickets')}
            className={`flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-bold uppercase tracking-wider transition-all sm:text-sm ${
              activeSubTab === 'tickets'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
                : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
            }`}
          >
            <TicketIcon className="h-4 w-4" />
            <span>Farm Tickets ({tickets.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveSubTab('inquiries')}
            className={`flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-bold uppercase tracking-wider transition-all sm:text-sm ${
              activeSubTab === 'inquiries'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
                : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
            }`}
          >
            <Inbox className="h-4 w-4" />
            <span>Queries Sent To Me ({inquiries.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveSubTab('products')}
            className={`flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-bold uppercase tracking-wider transition-all sm:text-sm ${
              activeSubTab === 'products'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
                : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
            }`}
          >
            <Package className="h-4 w-4" />
            <span>Product Inventory ({products.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveSubTab('orders')}
            className={`flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-bold uppercase tracking-wider transition-all sm:text-sm ${
              activeSubTab === 'orders'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
                : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
            }`}
          >
            <ShoppingBag className="h-4 w-4" />
            <span>Customer Quotes & Orders ({orders.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveSubTab('settings')}
            className={`flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-bold uppercase tracking-wider transition-all sm:text-sm ${
              activeSubTab === 'settings'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
                : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
            }`}
          >
            <Sliders className="h-4 w-4" />
            <span>System & AI Rules</span>
          </button>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* SUB-TAB 1: AUTOMATED TICKETS                                  */}
      {/* ------------------------------------------------------------- */}
      {activeSubTab === 'tickets' && (
        <div className="space-y-6">
          {/* Metrics Overview Cards */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
              <span className="text-xs text-slate-400">Total Farm Tickets</span>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-2xl font-black text-white">{tickets.length}</span>
              </div>
            </div>

            <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-4">
              <span className="text-xs text-amber-400">Open & In Progress</span>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-2xl font-black text-amber-400">
                  {tickets.filter(t => t.status === 'open' || t.status === 'in_progress').length}
                </span>
              </div>
            </div>

            <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-4">
              <span className="text-xs text-red-400">Urgent Biosecurity / Wholesale</span>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-2xl font-black text-red-400">
                  {tickets.filter(t => t.priority === 'urgent' || t.priority === 'high').length}
                </span>
              </div>
            </div>

            <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-4">
              <span className="text-xs text-emerald-400">Resolved Engagements</span>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-2xl font-black text-emerald-400">
                  {tickets.filter(t => t.status === 'resolved').length}
                </span>
              </div>
            </div>
          </div>

          {/* Search & Filters */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 rounded-xl border border-slate-800 bg-slate-900/60 p-3">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search ticket title, farm, ID..."
                value={ticketSearch}
                onChange={(e) => setTicketSearch(e.target.value)}
                className="w-full rounded-xl border border-slate-800 bg-slate-950 py-2 pl-9 pr-3 text-xs text-white placeholder-slate-400 focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-slate-300 focus:border-emerald-500 focus:outline-none"
              >
                <option value="all">All Statuses</option>
                <option value="open">Open</option>
                <option value="in_progress">In Progress</option>
                <option value="under_review">Under Review</option>
                <option value="resolved">Resolved</option>
              </select>

              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-slate-300 focus:border-emerald-500 focus:outline-none"
              >
                <option value="all">All Priorities</option>
                <option value="urgent">Urgent</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
          </div>

          {/* Tickets List */}
          <div className="space-y-3">
            {filteredTickets.map((ticket) => (
              <div
                key={ticket.id}
                onClick={() => onSelectTicket(ticket)}
                className="group cursor-pointer rounded-2xl border border-slate-800 bg-slate-900/60 p-5 transition-all hover:border-emerald-500/50 hover:bg-slate-900/90 shadow-md"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                      {ticket.id}
                    </span>
                    <span className="text-xs font-semibold text-slate-400">
                      {ticket.category}
                    </span>
                    <span className="text-slate-600">•</span>
                    <span className="text-xs text-slate-400">
                      {ticket.companyName} ({ticket.clientName})
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                        ticket.priority === 'urgent'
                          ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                          : ticket.priority === 'high'
                          ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                          : 'bg-slate-800 text-slate-300'
                      }`}
                    >
                      {ticket.priority}
                    </span>
                    <span className="rounded bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-400 border border-emerald-500/30 capitalize">
                      {ticket.status.replace('_', ' ')}
                    </span>
                  </div>
                </div>

                <h3 className="mt-2 text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">
                  {ticket.title}
                </h3>

                <p className="mt-1 text-xs text-slate-300 line-clamp-2">
                  {ticket.description}
                </p>

                <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-slate-800/80 pt-3 text-xs text-slate-400">
                  <div className="flex items-center gap-4">
                    <span>
                      Assigned Specialist: <strong className="text-white">{ticket.assignedConsultant || 'Unassigned'}</strong>
                    </span>
                    <span>
                      Est: <strong className="text-slate-300">{ticket.aiAssessment.estimatedHours}</strong>
                    </span>
                  </div>

                  <div className="flex items-center gap-1 font-semibold text-emerald-400 group-hover:translate-x-1 transition-transform">
                    <span>Manage Record</span>
                    <ChevronRight className="h-3.5 w-3.5" />
                  </div>
                </div>
              </div>
            ))}

            {filteredTickets.length === 0 && (
              <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-8 text-center text-xs text-slate-400">
                No tickets found matching your filter criteria.
              </div>
            )}
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* SUB-TAB 2: QUERIES SENT TO ME (CLIENT INQUIRIES & LEADS)      */}
      {/* ------------------------------------------------------------- */}
      {activeSubTab === 'inquiries' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h2 className="text-base font-bold text-white">Queries & Farm Inquiries Sent to Me</h2>
              <p className="text-xs text-slate-400">
                Live leads captured by the AI Consultation Chatbot's proactive product discovery queries.
              </p>
            </div>

            <div className="relative min-w-[240px]">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search farm, client name, flock..."
                value={inquirySearch}
                onChange={(e) => setInquirySearch(e.target.value)}
                className="w-full rounded-xl border border-slate-800 bg-slate-900 py-2 pl-9 pr-3 text-xs text-white placeholder-slate-400 focus:border-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {filteredInquiries.map((inq) => (
              <div
                key={inq.id}
                className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 space-y-3 shadow-md"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div>
                    <h3 className="text-sm font-bold text-white">
                      {inq.clientName} • <span className="text-emerald-400">{inq.companyName}</span>
                    </h3>
                    <p className="text-xs text-slate-400">{inq.clientEmail}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="rounded bg-indigo-500/10 px-2.5 py-0.5 text-[10px] font-semibold text-indigo-400 border border-indigo-500/20 capitalize">
                      {inq.status.replace('_', ' ')}
                    </span>
                    <select
                      value={inq.status}
                      onChange={(e) => onUpdateInquiryStatus(inq.id, e.target.value as any)}
                      className="rounded-lg border border-slate-800 bg-slate-950 px-2.5 py-1 text-xs text-slate-300 focus:border-emerald-500 focus:outline-none"
                    >
                      <option value="new">Mark as New</option>
                      <option value="contacted">Mark Contacted</option>
                      <option value="ticket_created">Ticket Created</option>
                      <option value="converted">Converted</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                  <div className="rounded-xl bg-slate-950/60 p-2.5 border border-slate-800/80">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Flock / Setup</span>
                    <p className="text-slate-200 mt-0.5">{inq.flockSize || inq.productDescription || 'Not specified'}</p>
                  </div>

                  <div className="rounded-xl bg-slate-950/60 p-2.5 border border-slate-800/80">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Coop Structure</span>
                    <p className="text-slate-200 mt-0.5">{inq.coopType || 'Standard coop'}</p>
                  </div>

                  <div className="rounded-xl bg-slate-950/60 p-2.5 border border-slate-800/80">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Cleaning / Pain Point</span>
                    <p className="text-slate-200 mt-0.5">{inq.cleaningRoutine || inq.primaryChallenge}</p>
                  </div>
                </div>

                {inq.lastBotQuerySent && (
                  <div className="rounded-xl bg-emerald-950/30 border border-emerald-500/20 p-2.5 text-xs text-emerald-200">
                    <strong>Last Proactive Query Sent by Bot:</strong> "{inq.lastBotQuerySent}"
                  </div>
                )}
              </div>
            ))}

            {filteredInquiries.length === 0 && (
              <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-8 text-center text-xs text-slate-400">
                No customer inquiries logged yet.
              </div>
            )}
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* SUB-TAB 3: PRODUCT INVENTORY & STOCK MANAGEMENT               */}
      {/* ------------------------------------------------------------- */}
      {activeSubTab === 'products' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h2 className="text-base font-bold text-white">Chicken Accessories & Cleaning Instruments Inventory</h2>
              <p className="text-xs text-slate-400">
                Manage stock counts, prices, and categories. The AI Chatbot uses these real items for recommendations.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <select
                value={productCategoryFilter}
                onChange={(e) => setProductCategoryFilter(e.target.value)}
                className="rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-slate-300 focus:border-emerald-500 focus:outline-none"
              >
                <option value="all">All Categories</option>
                <option value="chicken_accessories">Chicken Accessories</option>
                <option value="cleaning_instruments">Cleaning Instruments</option>
                <option value="bundle_kits">Bundle Kits</option>
              </select>

              <button
                type="button"
                onClick={() => setShowAddProductModal(true)}
                className="flex items-center gap-1.5 rounded-xl bg-emerald-600 px-3 py-2 text-xs font-semibold text-white hover:bg-emerald-500 transition-colors shadow-md shadow-emerald-600/30"
              >
                <Plus className="h-4 w-4" />
                <span>Add Item</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((p) => (
              <div
                key={p.id}
                className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 space-y-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      {p.category.replace('_', ' ')}
                    </span>
                    <h3 className="text-sm font-bold text-white">{p.name}</h3>
                  </div>
                  <span className="text-sm font-black text-emerald-400">${p.price.toFixed(2)}</span>
                </div>

                <p className="text-xs text-slate-300 line-clamp-2">{p.description}</p>

                <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs">
                  <span className="text-slate-400">
                    Stock: <strong className="text-white">{p.stock} units</strong>
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => onUpdateProductStock(p.id, Math.max(0, p.stock - 1))}
                      className="rounded bg-slate-800 px-2 py-0.5 text-xs text-slate-300 hover:bg-slate-700"
                    >
                      -1
                    </button>
                    <button
                      type="button"
                      onClick={() => onUpdateProductStock(p.id, p.stock + 5)}
                      className="rounded bg-slate-800 px-2 py-0.5 text-xs text-slate-300 hover:bg-slate-700"
                    >
                      +5
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Add Product Modal */}
          {showAddProductModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm">
              <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl space-y-4">
                <h3 className="text-base font-bold text-white">Add New Equipment or Instrument</h3>
                <form onSubmit={handleCreateProductSubmit} className="space-y-3 text-xs">
                  <div>
                    <label className="text-slate-300 block mb-1">Product Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sub-Zero Automatic Waterer 10-Gal"
                      value={newProdName}
                      onChange={(e) => setNewProdName(e.target.value)}
                      className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-white"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-slate-300 block mb-1">Category</label>
                      <select
                        value={newProdCategory}
                        onChange={(e) => setNewProdCategory(e.target.value as any)}
                        className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-white"
                      >
                        <option value="chicken_accessories">Chicken Accessory</option>
                        <option value="cleaning_instruments">Cleaning Instrument</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-slate-300 block mb-1">Price ($)</label>
                      <input
                        type="number"
                        step="0.01"
                        value={newProdPrice}
                        onChange={(e) => setNewProdPrice(e.target.value)}
                        className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-slate-300 block mb-1">Initial Stock</label>
                      <input
                        type="number"
                        value={newProdStock}
                        onChange={(e) => setNewProdStock(e.target.value)}
                        className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-white"
                      />
                    </div>
                    <div>
                      <label className="text-slate-300 block mb-1">Flock Sizing</label>
                      <input
                        type="text"
                        value={newProdFlock}
                        onChange={(e) => setNewProdFlock(e.target.value)}
                        className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-slate-300 block mb-1">Description</label>
                    <textarea
                      rows={2}
                      value={newProdDesc}
                      onChange={(e) => setNewProdDesc(e.target.value)}
                      className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-white"
                      placeholder="Brief features and specifications..."
                    />
                  </div>

                  <div className="flex gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowAddProductModal(false)}
                      className="flex-1 rounded-xl border border-slate-800 py-2 font-semibold text-slate-400 hover:text-white"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 rounded-xl bg-emerald-600 py-2 font-semibold text-white hover:bg-emerald-500"
                    >
                      Add Product
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* SUB-TAB 4: CUSTOMER QUOTES & ORDERS                           */}
      {/* ------------------------------------------------------------- */}
      {activeSubTab === 'orders' && (
        <div className="space-y-4">
          <div>
            <h2 className="text-base font-bold text-white">Customer Orders & Wholesale Quotes</h2>
            <p className="text-xs text-slate-400">
              Orders placed by customers from the Chicken Accessories & Cleaning Instruments catalog.
            </p>
          </div>

          <div className="space-y-3">
            {orders.map((ord) => (
              <div
                key={ord.id}
                className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 space-y-3 shadow-md"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      {ord.id}
                    </span>
                    <h3 className="text-sm font-bold text-white">
                      {ord.farmOrCoopName} ({ord.clientName})
                    </h3>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-sm font-black text-emerald-400">${ord.totalAmount.toFixed(2)}</span>
                    <select
                      value={ord.status}
                      onChange={(e) => onUpdateOrderStatus(ord.id, e.target.value as any)}
                      className="rounded-lg border border-slate-800 bg-slate-950 px-2.5 py-1 text-xs text-slate-300 focus:border-emerald-500 focus:outline-none"
                    >
                      <option value="pending_quote">Pending Quote</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="fulfilled">Fulfilled / Dispatched</option>
                    </select>
                  </div>
                </div>

                {/* Items List */}
                <div className="rounded-xl bg-slate-950/60 p-3 text-xs space-y-1.5 border border-slate-800/80">
                  <span className="font-bold text-slate-400 block mb-1">Ordered Items:</span>
                  {ord.items.map((it, idx) => (
                    <div key={idx} className="flex justify-between text-slate-300">
                      <span>{it.quantity}x {it.productName}</span>
                      <span className="font-mono text-slate-400">${(it.quantity * it.unitPrice).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span>Contact: {ord.clientEmail}</span>
                  <span>{ord.notes}</span>
                </div>
              </div>
            ))}

            {orders.length === 0 && (
              <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-8 text-center text-xs text-slate-400">
                No orders or quotes received yet.
              </div>
            )}
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* SUB-TAB 5: SYSTEM & AI RULES CONFIG                           */}
      {/* ------------------------------------------------------------- */}
      {activeSubTab === 'settings' && (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-6">
          <div>
            <h2 className="text-base font-bold text-white">Poultry Practice & Automated Rules Settings</h2>
            <p className="text-xs text-slate-400">
              Configure business details, lead specialist, proactive inquiry questions, and auto-ticketing triggers.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="text-slate-300 font-semibold block mb-1">Business Name</label>
              <input
                type="text"
                value={firmConfig.firmName}
                onChange={(e) => onUpdateFirmConfig({ firmName: e.target.value })}
                className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-white"
              />
            </div>

            <div>
              <label className="text-slate-300 font-semibold block mb-1">Lead Poultry Specialist</label>
              <input
                type="text"
                value={firmConfig.leadConsultant}
                onChange={(e) => onUpdateFirmConfig({ leadConsultant: e.target.value })}
                className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-white"
              />
            </div>

            <div>
              <label className="text-slate-300 font-semibold block mb-1">Contact Email</label>
              <input
                type="email"
                value={firmConfig.contactEmail}
                onChange={(e) => onUpdateFirmConfig({ contactEmail: e.target.value })}
                className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-white"
              />
            </div>

            <div>
              <label className="text-slate-300 font-semibold block mb-1">Store / Business Tagline</label>
              <input
                type="text"
                value={firmConfig.tagline}
                onChange={(e) => onUpdateFirmConfig({ tagline: e.target.value })}
                className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-white"
              />
            </div>
          </div>

          <div>
            <label className="text-slate-300 font-semibold text-xs block mb-2">
              Auto-Ticketing Triggers (Keywords that trigger automatic ticket generation)
            </label>
            <div className="flex flex-wrap gap-1.5">
              {firmConfig.autoTicketingTriggers.map((trig, idx) => (
                <span
                  key={idx}
                  className="rounded-lg border border-amber-500/30 bg-amber-500/10 px-2.5 py-1 text-xs text-amber-300 font-mono"
                >
                  {trig}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
