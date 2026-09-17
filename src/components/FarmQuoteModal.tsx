import React, { useState } from 'react';
import {
  X,
  ShoppingBag,
  CheckCircle2,
  AlertCircle,
  Truck,
  ShieldCheck,
  Building2,
  Package,
  Sparkles
} from 'lucide-react';
import type { PoultryProduct, FarmQuoteOrder } from '../types.ts';

interface FarmQuoteModalProps {
  product: PoultryProduct | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmitOrder: (order: {
    clientName: string;
    clientEmail: string;
    farmOrCoopName: string;
    items: {
      productId: string;
      productName: string;
      quantity: number;
      unitPrice: number;
    }[];
    totalAmount: number;
    notes: string;
  }) => Promise<void>;
}

export const FarmQuoteModal: React.FC<FarmQuoteModalProps> = ({
  product,
  isOpen,
  onClose,
  onSubmitOrder,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [farmOrCoopName, setFarmOrCoopName] = useState('');
  const [flockSize, setFlockSize] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedOrder, setSubmittedOrder] = useState<any>(null);

  if (!isOpen || !product) return null;

  const totalAmount = (product.price * quantity).toFixed(2);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !clientEmail.trim()) return;

    setIsSubmitting(true);
    try {
      const orderPayload = {
        clientName: clientName.trim(),
        clientEmail: clientEmail.trim(),
        farmOrCoopName: farmOrCoopName.trim() || 'Homestead Flock',
        items: [
          {
            productId: product.id,
            productName: product.name,
            quantity,
            unitPrice: product.price
          }
        ],
        totalAmount: Number(totalAmount),
        notes: `Flock Size: ${flockSize || 'Not specified'}. Special notes: ${notes}`
      };

      await onSubmitOrder(orderPayload);
      setSubmittedOrder(orderPayload);
    } catch (err) {
      console.error('Failed to submit order/quote:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetAndClose = () => {
    setSubmittedOrder(null);
    setQuantity(1);
    setNotes('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl shadow-emerald-950/40">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 bg-slate-950/80 p-5">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400">
              <ShoppingBag className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Order / Wholesale Quote Request</h2>
              <p className="text-xs text-slate-400">Poultry Equipment & Cleaning Instruments</p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleResetAndClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-slate-200 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {submittedOrder ? (
          /* Confirmation View */
          <div className="p-6 text-center space-y-4">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 ring-8 ring-emerald-500/10">
              <CheckCircle2 className="h-8 w-8" />
            </div>

            <div>
              <h3 className="text-lg font-bold text-white">Order / Quote Successfully Logged!</h3>
              <p className="text-xs text-slate-300 mt-1 max-w-sm mx-auto">
                Thank you, <strong>{submittedOrder.clientName}</strong>. Our poultry equipment specialist has received your request for <strong>{quantity}x {product.name}</strong> (${totalAmount}).
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4 text-xs text-left space-y-2">
              <div className="flex justify-between text-slate-400">
                <span>Farm / Coop:</span>
                <span className="text-white font-medium">{submittedOrder.farmOrCoopName}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Confirmation Email:</span>
                <span className="text-white font-medium">{submittedOrder.clientEmail}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Total Amount:</span>
                <span className="text-emerald-400 font-bold">${totalAmount}</span>
              </div>
              <div className="pt-2 border-t border-slate-800 text-[11px] text-indigo-300 flex items-center gap-1.5">
                <Truck className="h-3.5 w-3.5" />
                <span>Our team will contact you with shipping dispatch details or volume discounts.</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleResetAndClose}
              className="w-full rounded-xl bg-indigo-600 py-2.5 text-xs font-semibold text-white hover:bg-indigo-500 transition-colors"
            >
              Done & Return to Store
            </button>
          </div>
        ) : (
          /* Order Form */
          <form onSubmit={handleSubmit} className="p-5 space-y-4">
            {/* Product Summary */}
            <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3 flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-white">{product.name}</h4>
                <span className="text-[11px] text-slate-400 capitalize">
                  {product.category.replace('_', ' ')} • ${product.price.toFixed(2)} each
                </span>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center gap-2">
                <label className="text-xs text-slate-400">Qty:</label>
                <input
                  type="number"
                  min="1"
                  max="500"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                  className="w-16 rounded-lg border border-slate-800 bg-slate-900 px-2 py-1 text-center text-xs font-bold text-white focus:border-indigo-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Total Price preview */}
            <div className="flex items-center justify-between px-1 text-xs">
              <span className="text-slate-400">Estimated Total:</span>
              <span className="font-mono text-base font-black text-emerald-400">${totalAmount}</span>
            </div>

            {/* Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Samuel Miller"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-white placeholder-slate-400 focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. samuel@farm.com"
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-white placeholder-slate-400 focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                  Farm / Coop / Business Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Oak Ridge Pastures"
                  value={farmOrCoopName}
                  onChange={(e) => setFarmOrCoopName(e.target.value)}
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-white placeholder-slate-400 focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                  Approx. Flock Size (Birds)
                </label>
                <input
                  type="text"
                  placeholder="e.g. 35 Laying Hens"
                  value={flockSize}
                  onChange={(e) => setFlockSize(e.target.value)}
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-white placeholder-slate-400 focus:border-indigo-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                Special Delivery Notes / Wholesale Inquiries
              </label>
              <textarea
                rows={2}
                placeholder="Mention any custom shipping, coop dimensions, or wholesale dealer requests..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-white placeholder-slate-400 focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-xl bg-emerald-600 py-2.5 text-xs font-semibold text-white hover:bg-emerald-500 transition-colors shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <ShoppingBag className="h-4 w-4" />
                <span>{isSubmitting ? 'Processing Order...' : `Submit Order / Quote Request ($${totalAmount})`}</span>
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
