import React, { useState } from 'react';
import {
  Sparkles,
  Search,
  Filter,
  Check,
  ChevronRight,
  HelpCircle,
  ShoppingBag,
  Sliders,
  ShieldCheck,
  Zap,
  Flame,
  Droplets,
  Package,
  Brush,
  Wrench,
  Calculator,
  Plus,
  ArrowRight,
  ExternalLink,
  MessageSquare
} from 'lucide-react';
import type { PoultryProduct, ProductCategory } from '../types.ts';

interface ProductCatalogSectionProps {
  products: PoultryProduct[];
  onSelectProductForChat: (productName: string, promptText: string) => void;
  onOpenOrderModal: (product: PoultryProduct) => void;
}

export const ProductCatalogSection: React.FC<ProductCatalogSectionProps> = ({
  products,
  onSelectProductForChat,
  onOpenOrderModal,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [flockCalculatorCount, setFlockCalculatorCount] = useState<number>(20);
  const [showCalculator, setShowCalculator] = useState(false);

  // Filter products
  const filteredProducts = products.filter((p) => {
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.specifications.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // Dynamic calculations based on flock size
  const feederPortsNeeded = Math.ceil(flockCalculatorCount / 4);
  const dailyWaterGallons = (flockCalculatorCount * 0.125).toFixed(1); // approx 1 pint (0.125 gal) per hen per day in warm weather
  const nestingBoxesNeeded = Math.ceil(flockCalculatorCount / 4);
  const weeklyCleaningLitres = (flockCalculatorCount * 0.05).toFixed(1);

  const getProductIcon = (iconType: PoultryProduct['iconType']) => {
    switch (iconType) {
      case 'feeder':
        return <Package className="h-5 w-5 text-amber-400" />;
      case 'waterer':
        return <Droplets className="h-5 w-5 text-cyan-400" />;
      case 'heater':
        return <Flame className="h-5 w-5 text-orange-400" />;
      case 'scraper':
      case 'brush':
      case 'rake':
        return <Brush className="h-5 w-5 text-emerald-400" />;
      case 'bootbath':
      case 'sprayer':
      case 'fogger':
        return <ShieldCheck className="h-5 w-5 text-indigo-400" />;
      default:
        return <Sparkles className="h-5 w-5 text-indigo-400" />;
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Interactive Flock Equipment & Sanitation Calculator Card */}
      <div className="overflow-hidden rounded-2xl border border-indigo-500/30 bg-gradient-to-br from-indigo-950/40 via-slate-900 to-slate-950 p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-indigo-500/20 px-3 py-1 text-xs font-semibold text-indigo-300">
              <Calculator className="h-3.5 w-3.5 text-indigo-400" />
              <span>Interactive Flock Sizing & Sanitation Calculator</span>
            </div>
            <h3 className="mt-2 text-lg font-bold text-white sm:text-xl">
              Calculate Equipment & Cleaning Supplies for Your Flock
            </h3>
            <p className="text-xs text-slate-300 max-w-xl mt-1">
              Adjust your bird count to see exact feeder capacities, freeze-proof drinking volume, nesting compartments, and required sanitizing instruments.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowCalculator(!showCalculator)}
            className="self-start md:self-auto rounded-xl border border-indigo-500/40 bg-indigo-600/30 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-600/50 transition-colors"
          >
            {showCalculator ? 'Hide Calculator' : 'Open Sizing Calculator'}
          </button>
        </div>

        {showCalculator && (
          <div className="mt-6 pt-6 border-t border-slate-800/80 space-y-6 animate-in fade-in duration-200">
            {/* Slider */}
            <div>
              <div className="flex items-center justify-between text-xs font-medium text-slate-300 mb-2">
                <span>Flock Size:</span>
                <span className="font-mono text-sm font-bold text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-lg border border-indigo-500/20">
                  {flockCalculatorCount} Birds / Hens
                </span>
              </div>
              <input
                type="range"
                min="4"
                max="500"
                step="2"
                value={flockCalculatorCount}
                onChange={(e) => setFlockCalculatorCount(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              />
              <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                <span>Backyard (4)</span>
                <span>Homestead (50)</span>
                <span>Pasture Farm (150)</span>
                <span>Commercial Barn (500)</span>
              </div>
            </div>

            {/* Calculated Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3">
                <span className="text-[11px] text-slate-400 block">Feeder Ports</span>
                <span className="text-lg font-bold text-amber-400">{feederPortsNeeded} Ports</span>
                <p className="text-[10px] text-slate-400 mt-0.5">
                  ~{Math.ceil(flockCalculatorCount / 10)}x AutoFeeder-Pro 25lb
                </p>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3">
                <span className="text-[11px] text-slate-400 block">Daily Water Need</span>
                <span className="text-lg font-bold text-cyan-400">{dailyWaterGallons} Gal / Day</span>
                <p className="text-[10px] text-slate-400 mt-0.5">
                  ~{Math.ceil(flockCalculatorCount / 20)}x FrostGuard 5-Gal
                </p>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3">
                <span className="text-[11px] text-slate-400 block">Nesting Boxes</span>
                <span className="text-lg font-bold text-orange-400">{nestingBoxesNeeded} Boxes</span>
                <p className="text-[10px] text-slate-400 mt-0.5">
                  ~{Math.ceil(nestingBoxesNeeded / 4)}x RollAway 4-Bay
                </p>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3">
                <span className="text-[11px] text-slate-400 block">Sanitizer Usage</span>
                <span className="text-lg font-bold text-emerald-400">{weeklyCleaningLitres} Gal / Wk</span>
                <p className="text-[10px] text-slate-400 mt-0.5">
                  Scraper + EcoCluck foam wash
                </p>
              </div>
            </div>

            {/* Action to consult chatbot */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
              <span className="text-xs text-slate-300">
                Want Dr. Ethan Wright to review this configuration for your coop climate?
              </span>
              <button
                type="button"
                onClick={() =>
                  onSelectProductForChat(
                    `Flock Size ${flockCalculatorCount} Consultation`,
                    `I have a flock of ${flockCalculatorCount} chickens. Can you recommend the exact chicken accessories (feeders, heated drinkers, nesting boxes) and cleaning instruments (scrapers, boot baths, sanitizers) I need?`
                  )
                }
                className="flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-500 transition-colors shadow-md shadow-indigo-600/30"
              >
                <MessageSquare className="h-3.5 w-3.5" />
                <span>Consult AI with this Profile</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Catalog Search & Category Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* Category Tabs */}
        <div className="flex flex-wrap gap-1.5 rounded-xl bg-slate-900/80 p-1 border border-slate-800">
          <button
            type="button"
            onClick={() => setSelectedCategory('all')}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
              selectedCategory === 'all'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            All Products ({products.length})
          </button>
          <button
            type="button"
            onClick={() => setSelectedCategory('chicken_accessories')}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
              selectedCategory === 'chicken_accessories'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Chicken Accessories ({products.filter((p) => p.category === 'chicken_accessories').length})
          </button>
          <button
            type="button"
            onClick={() => setSelectedCategory('cleaning_instruments')}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
              selectedCategory === 'cleaning_instruments'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Cleaning Instruments ({products.filter((p) => p.category === 'cleaning_instruments').length})
          </button>
          <button
            type="button"
            onClick={() => setSelectedCategory('bundle_kits')}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
              selectedCategory === 'bundle_kits'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Starter Packs & Bundles ({products.filter((p) => p.category === 'bundle_kits').length})
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative min-w-[240px]">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search gear, scrapers, drinkers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-slate-800 bg-slate-900 py-2 pl-9 pr-3 text-xs text-white placeholder-slate-400 focus:border-indigo-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="group flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900/60 p-5 transition-all hover:border-indigo-500/50 hover:bg-slate-900/90 shadow-lg"
          >
            <div>
              {/* Card Header: Category & Badge */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-800/80 border border-slate-700/60">
                    {getProductIcon(product.iconType)}
                  </div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    {product.category === 'chicken_accessories'
                      ? 'Chicken Accessory'
                      : product.category === 'cleaning_instruments'
                      ? 'Cleaning Instrument'
                      : 'Bundle Kit'}
                  </span>
                </div>

                {product.badge && (
                  <span className="rounded-full bg-indigo-500/10 px-2.5 py-0.5 text-[10px] font-bold text-indigo-300 border border-indigo-500/20">
                    {product.badge}
                  </span>
                )}
              </div>

              {/* Title & Price */}
              <div className="mt-4 flex items-start justify-between gap-2">
                <h4 className="text-base font-bold text-white group-hover:text-indigo-200 transition-colors">
                  {product.name}
                </h4>
                <div className="shrink-0 text-right">
                  <span className="text-base font-black text-emerald-400">
                    ${product.price.toFixed(2)}
                  </span>
                  <span className="block text-[10px] text-slate-400">
                    {product.stock} in stock
                  </span>
                </div>
              </div>

              <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                {product.description}
              </p>

              {/* Key Specifications */}
              <div className="mt-3 space-y-1 rounded-xl bg-slate-950/60 p-3 text-[11px] text-slate-300 border border-slate-800/80">
                <span className="font-semibold text-slate-400 block mb-1">
                  Key Specifications:
                </span>
                {product.specifications.map((spec, idx) => (
                  <div key={idx} className="flex items-start gap-1.5">
                    <Check className="h-3 w-3 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{spec}</span>
                  </div>
                ))}
                <div className="pt-1.5 border-t border-slate-800 text-[10px] text-indigo-300 font-medium">
                  Flock Compatibility: {product.recommendedFlockSize}
                </div>
              </div>
            </div>

            {/* Actions: Ask AI & Order / Quote */}
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center gap-2">
              <button
                type="button"
                onClick={() =>
                  onSelectProductForChat(
                    product.name,
                    `I am inquiring about the ${product.name} ($${product.price.toFixed(2)}). How does this compare with other options and will it work for my coop?`
                  )
                }
                className="flex-1 flex items-center justify-center gap-1.5 rounded-xl border border-indigo-500/30 bg-indigo-500/10 px-3 py-2 text-xs font-semibold text-indigo-300 hover:bg-indigo-500/20 transition-colors"
              >
                <MessageSquare className="h-3.5 w-3.5" />
                <span>Ask AI Advisor</span>
              </button>

              <button
                type="button"
                onClick={() => onOpenOrderModal(product)}
                className="flex items-center justify-center gap-1 rounded-xl bg-emerald-600 px-3 py-2 text-xs font-semibold text-white hover:bg-emerald-500 transition-colors shadow-md shadow-emerald-600/20"
              >
                <ShoppingBag className="h-3.5 w-3.5" />
                <span>Order / Quote</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-8 text-center text-xs text-slate-400">
          No poultry accessories or cleaning instruments found matching "{searchQuery}".
        </div>
      )}
    </div>
  );
};
