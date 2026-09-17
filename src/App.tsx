import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar.tsx';
import { ChatWidget } from './components/ChatWidget.tsx';
import { ConsultingWebsiteHero } from './components/ConsultingWebsiteHero.tsx';
import { ProductCatalogSection } from './components/ProductCatalogSection.tsx';
import { FarmQuoteModal } from './components/FarmQuoteModal.tsx';
import { ConsultantHub } from './components/ConsultantHub.tsx';
import { TicketDetailModal } from './components/TicketDetailModal.tsx';
import { TicketTrackerModal } from './components/TicketTrackerModal.tsx';
import type {
  Ticket,
  ClientInquiryLead,
  ConsultingFirmConfig,
  TicketStatus,
  PoultryProduct,
  FarmQuoteOrder
} from './types.ts';
import { Ticket as TicketIcon, CheckCircle2, Sparkles, X, ShoppingBag } from 'lucide-react';
import { INITIAL_PRODUCTS } from './data/products.ts';

export default function App() {
  const [activeTab, setActiveTab] = useState<'client' | 'consultant'>('client');
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [inquiries, setInquiries] = useState<ClientInquiryLead[]>([]);
  const [products, setProducts] = useState<PoultryProduct[]>(INITIAL_PRODUCTS);
  const [orders, setOrders] = useState<FarmQuoteOrder[]>([]);

  const [firmConfig, setFirmConfig] = useState<ConsultingFirmConfig>({
    firmName: 'CluckCare & BioSanitation Systems',
    tagline: 'Premium Chicken Accessories & High-Grade Farm Cleaning Instruments',
    leadConsultant: 'Dr. Ethan Wright, DVM (Poultry Equipment & Biosecurity Director)',
    contactEmail: 'orders@cluckcaresanitation.com',
    services: [],
    qualifyingQuestions: [],
    autoTicketingTriggers: []
  });

  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [isTrackerOpen, setIsTrackerOpen] = useState(false);
  const [selectedProductForOrder, setSelectedProductForOrder] = useState<PoultryProduct | null>(null);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  const [toastNotification, setToastNotification] = useState<{
    id: string;
    title: string;
    message: string;
    ticket?: Ticket;
  } | null>(null);

  const [clientContext, setClientContext] = useState({
    clientName: 'Samuel Miller',
    clientEmail: 's.miller@greenpastures.com',
    companyName: 'Green Pastures Homestead',
    productDescription: '35 Pasture-raised laying hens in mobile coops'
  });

  // Fetch initial data from server
  const refreshAllData = async () => {
    try {
      const [ticketsRes, inqRes, configRes, productsRes, ordersRes] = await Promise.all([
        fetch('/api/tickets'),
        fetch('/api/inquiries'),
        fetch('/api/config'),
        fetch('/api/products'),
        fetch('/api/orders')
      ]);

      if (ticketsRes.ok) {
        const data = await ticketsRes.json();
        setTickets(data);
      }
      if (inqRes.ok) {
        const data = await inqRes.json();
        setInquiries(data);
      }
      if (configRes.ok) {
        const data = await configRes.json();
        setFirmConfig(data);
      }
      if (productsRes.ok) {
        const data = await productsRes.json();
        setProducts(data);
      }
      if (ordersRes.ok) {
        const data = await ordersRes.json();
        setOrders(data);
      }
    } catch (err) {
      console.error('Failed to load initial data:', err);
    }
  };

  useEffect(() => {
    refreshAllData();
  }, []);

  const handleTicketCreated = (newTicket: Ticket) => {
    setTickets((prev) => {
      const exists = prev.some((t) => t.id === newTicket.id);
      if (exists) return prev;
      return [newTicket, ...prev];
    });

    setToastNotification({
      id: `toast-${Date.now()}`,
      title: `Automated Ticket Generated (${newTicket.id})`,
      message: `Priority: ${newTicket.priority.toUpperCase()} • ${newTicket.title}`,
      ticket: newTicket
    });

    setTimeout(() => {
      setToastNotification((curr) => (curr?.id === `toast-${Date.now()}` ? null : curr));
    }, 9000);
  };

  const handleUpdateTicketStatus = async (id: string, status: TicketStatus) => {
    try {
      const res = await fetch(`/api/tickets/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        const updated = await res.json();
        setTickets((prev) => prev.map((t) => (t.id === id ? updated : t)));
        if (selectedTicket?.id === id) {
          setSelectedTicket(updated);
        }
      }
    } catch (err) {
      console.error('Failed to update ticket status:', err);
    }
  };

  const handleAddTicketNote = async (id: string, text: string, author: string) => {
    try {
      const res = await fetch(`/api/tickets/${id}/notes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, author })
      });
      if (res.ok) {
        const note = await res.json();
        setTickets((prev) =>
          prev.map((t) => {
            if (t.id === id) {
              return {
                ...t,
                consultantNotes: [...(t.consultantNotes || []), note]
              };
            }
            return t;
          })
        );
        if (selectedTicket?.id === id) {
          setSelectedTicket((prev) =>
            prev
              ? {
                  ...prev,
                  consultantNotes: [...(prev.consultantNotes || []), note]
                }
              : null
          );
        }
      }
    } catch (err) {
      console.error('Failed to add ticket note:', err);
    }
  };

  const handleUpdateInquiryStatus = async (id: string, status: ClientInquiryLead['status']) => {
    try {
      const res = await fetch(`/api/inquiries/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        const updated = await res.json();
        setInquiries((prev) => prev.map((i) => (i.id === id ? updated : i)));
      }
    } catch (err) {
      console.error('Failed to update inquiry status:', err);
    }
  };

  const handleUpdateFirmConfig = async (newConfig: Partial<ConsultingFirmConfig>) => {
    try {
      const res = await fetch('/api/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newConfig)
      });
      if (res.ok) {
        const data = await res.json();
        setFirmConfig(data.config);
      }
    } catch (err) {
      console.error('Failed to update firm config:', err);
    }
  };

  // Product Inventory Management Handlers
  const handleUpdateProductStock = async (id: string, newStock: number) => {
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stock: newStock })
      });
      if (res.ok) {
        const updated = await res.json();
        setProducts((prev) => prev.map((p) => (p.id === id ? updated : p)));
      }
    } catch (err) {
      console.error('Failed to update product stock:', err);
    }
  };

  const handleAddNewProduct = async (newProduct: Partial<PoultryProduct>) => {
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct)
      });
      if (res.ok) {
        const created = await res.json();
        setProducts((prev) => [created, ...prev]);
      }
    } catch (err) {
      console.error('Failed to add new product:', err);
    }
  };

  // Orders Management Handlers
  const handleSubmitOrder = async (orderData: any) => {
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });
      if (res.ok) {
        const created = await res.json();
        setOrders((prev) => [created, ...prev]);

        setToastNotification({
          id: `order-${Date.now()}`,
          title: `New Order Logged (${created.id})`,
          message: `${orderData.items[0]?.quantity || 1}x ${orderData.items[0]?.productName} • $${orderData.totalAmount}`
        });
      }
    } catch (err) {
      console.error('Failed to submit order:', err);
    }
  };

  const handleUpdateOrderStatus = (id: string, status: FarmQuoteOrder['status']) => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
  };

  // Connect catalog & hero clicks to chat
  const handleSelectPromptFromHero = (prompt: string) => {
    setActiveTab('client');
    setTimeout(() => {
      const input = document.getElementById('chat-input-field') as HTMLInputElement | null;
      if (input) {
        input.value = prompt;
        input.focus();
        input.dispatchEvent(new Event('input', { bubbles: true }));
      }
    }, 150);
  };

  const handleSelectProductForChat = (productName: string, promptText: string) => {
    setActiveTab('client');
    setTimeout(() => {
      const input = document.getElementById('chat-input-field') as HTMLInputElement | null;
      if (input) {
        input.value = promptText;
        input.focus();
        input.dispatchEvent(new Event('input', { bubbles: true }));
      }
    }, 150);
  };

  const handleOpenOrderModal = (product: PoultryProduct) => {
    setSelectedProductForOrder(product);
    setIsOrderModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-emerald-500/30 selection:text-emerald-200">
      
      {/* Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        firmConfig={firmConfig}
        ticketCount={tickets.filter((t) => t.status === 'open').length}
        inquiryCount={inquiries.filter((i) => i.status === 'new').length}
        onOpenTracker={() => setIsTrackerOpen(true)}
      />

      {/* Main Content Area */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {activeTab === 'client' ? (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
            
            {/* Left Column: Website Context, Hero & Product Catalog */}
            <div className="lg:col-span-7 space-y-10">
              {/* Hero Banner & Starter Inquiries */}
              <ConsultingWebsiteHero
                firmConfig={firmConfig}
                onSelectPrompt={handleSelectPromptFromHero}
                onOpenTracker={() => setIsTrackerOpen(true)}
                activeTicketCount={tickets.length}
              />

              {/* Real Chicken Accessories & Cleaning Instruments Catalog */}
              <section className="space-y-4 pt-4 border-t border-slate-800/80">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                    Product Catalog & Live Inventory
                  </span>
                  <h2 className="text-xl font-bold text-white sm:text-2xl">
                    Chicken Accessories & Sanitization Instruments
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-300 mt-1">
                    Explore field-tested poultry equipment. Inquire about any item via the real-time AI specialist on the right, or submit direct wholesale orders.
                  </p>
                </div>

                <ProductCatalogSection
                  products={products}
                  onSelectProductForChat={handleSelectProductForChat}
                  onOpenOrderModal={handleOpenOrderModal}
                />
              </section>
            </div>

            {/* Right Column: Embedded Real-Time AI Poultry & Cleaning Chatbot */}
            <div className="lg:col-span-5 sticky top-24">
              <div className="mb-2 flex items-center justify-between px-1">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5" />
                  Live Poultry & Sanitization Chatbot
                </span>
                <span className="text-[11px] text-slate-400">
                  Real-Time AI Consultation & Auto-Ticketing
                </span>
              </div>

              <ChatWidget
                firmConfig={firmConfig}
                onTicketCreated={handleTicketCreated}
                onViewTicket={(ticket) => setSelectedTicket(ticket)}
                clientContext={clientContext}
                onUpdateClientContext={(ctx) =>
                  setClientContext((prev) => ({ ...prev, ...ctx }))
                }
              />
            </div>

          </div>
        ) : (
          /* Consultant Operations Hub View */
          <ConsultantHub
            tickets={tickets}
            inquiries={inquiries}
            products={products}
            orders={orders}
            firmConfig={firmConfig}
            onUpdateTicketStatus={handleUpdateTicketStatus}
            onSelectTicket={(ticket) => setSelectedTicket(ticket)}
            onUpdateInquiryStatus={handleUpdateInquiryStatus}
            onUpdateFirmConfig={handleUpdateFirmConfig}
            onUpdateProductStock={handleUpdateProductStock}
            onAddNewProduct={handleAddNewProduct}
            onUpdateOrderStatus={handleUpdateOrderStatus}
            onRefreshData={refreshAllData}
          />
        )}
      </main>

      {/* Ticket Detail Modal */}
      <TicketDetailModal
        ticket={selectedTicket}
        onClose={() => setSelectedTicket(null)}
        onUpdateStatus={handleUpdateTicketStatus}
        onAddNote={handleAddTicketNote}
        isConsultantView={activeTab === 'consultant'}
      />

      {/* Ticket Lookup / Tracker Modal */}
      <TicketTrackerModal
        isOpen={isTrackerOpen}
        onClose={() => setIsTrackerOpen(false)}
        tickets={tickets}
        onSelectTicket={(ticket) => setSelectedTicket(ticket)}
      />

      {/* Farm Quote / Order Modal */}
      <FarmQuoteModal
        product={selectedProductForOrder}
        isOpen={isOrderModalOpen}
        onClose={() => {
          setIsOrderModalOpen(false);
          setSelectedProductForOrder(null);
        }}
        onSubmitOrder={handleSubmitOrder}
      />

      {/* Global Toast Alert for Automated Ticket or Order Generation */}
      {toastNotification && (
        <div className="fixed bottom-6 right-6 z-50 flex max-w-md items-start gap-3 rounded-2xl border border-amber-500/40 bg-slate-900/95 p-4 shadow-2xl shadow-amber-950/40 backdrop-blur-md animate-in slide-in-from-bottom-5">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-500/20 text-amber-400">
            {toastNotification.ticket ? <TicketIcon className="h-5 w-5" /> : <ShoppingBag className="h-5 w-5" />}
          </div>

          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-white">
                {toastNotification.title}
              </h4>
              <button
                type="button"
                onClick={() => setToastNotification(null)}
                className="text-slate-400 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <p className="mt-0.5 text-xs text-slate-300">
              {toastNotification.message}
            </p>
            {toastNotification.ticket && (
              <button
                type="button"
                onClick={() => {
                  setSelectedTicket(toastNotification.ticket!);
                  setToastNotification(null);
                }}
                className="mt-2 text-xs font-semibold text-amber-400 hover:text-amber-300 underline underline-offset-2"
              >
                Inspect Ticket & Specialist Diagnostics &rarr;
              </button>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="mt-16 border-t border-slate-800/80 bg-slate-950 py-8 text-center text-xs text-slate-400">
        <div className="mx-auto max-w-7xl px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span>&copy; {new Date().getFullYear()} {firmConfig.firmName}. All rights reserved.</span>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setIsTrackerOpen(true)}
              className="hover:text-slate-300 transition-colors"
            >
              Ticket Tracker
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => setActiveTab(activeTab === 'client' ? 'consultant' : 'client')}
              className="hover:text-slate-300 transition-colors"
            >
              Switch to {activeTab === 'client' ? 'Farm Operations Hub' : 'Poultry Store & Chatbot'}
            </button>
          </div>
        </div>
      </footer>

    </div>
  );
}
