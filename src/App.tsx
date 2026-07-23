import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { SmartGameWizard } from './components/SmartGameWizard';
import { GameCard } from './components/GameCard';
import { GameDetailModal } from './components/GameDetailModal';
import { CafeSection } from './components/CafeSection';
import { CafeReservationModal } from './components/CafeReservationModal';
import { AiConciergeDrawer } from './components/AiConciergeDrawer';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { ArticlesSection } from './components/ArticlesSection';
import { Footer } from './components/Footer';

import { INITIAL_GAMES } from './data/games';
import { INITIAL_CAFES } from './data/cafes';
import { INITIAL_ARTICLES } from './data/articles';
import { 
  BoardGame, 
  GameCafe, 
  BlogArticle, 
  CartItem, 
  FilterState, 
  GameCategory, 
  PurchaseType 
} from './types';

import { 
  Filter, 
  Dices, 
  Sparkles, 
  Users, 
  Clock, 
  Store, 
  RefreshCw, 
  SlidersHorizontal,
  Bot,
  SearchX
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'shop' | 'rent' | 'cafes' | 'ai' | 'blog'>('shop');
  const [games, setGames] = useState<BoardGame[]>(INITIAL_GAMES);
  const [cafes, setCafes] = useState<GameCafe[]>(INITIAL_CAFES);
  const [articles, setArticles] = useState<BlogArticle[]>(INITIAL_ARTICLES);

  const [selectedGame, setSelectedGame] = useState<BoardGame | null>(null);
  const [selectedCafeForReservation, setSelectedCafeForReservation] = useState<GameCafe | null>(null);

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);

  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: '',
    category: 'all',
    playersCount: null,
    maxPlayTime: null,
    minAge: null,
    selectedMechanic: 'all',
    purchaseMode: 'all',
    sortBy: 'popular'
  });

  const [wizardOpen, setWizardOpen] = useState(false);
  const [aiDrawerOpen, setAiDrawerOpen] = useState(false);
  const [aiInitialPrompt, setAiInitialPrompt] = useState('');
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);

  // Sync Search query
  useEffect(() => {
    setFilters(prev => ({ ...prev, searchQuery }));
  }, [searchQuery]);

  // Handle Tab changes
  useEffect(() => {
    if (activeTab === 'rent') {
      setFilters(prev => ({ ...prev, purchaseMode: 'rent' }));
    } else if (activeTab === 'shop') {
      setFilters(prev => ({ ...prev, purchaseMode: 'all' }));
    } else if (activeTab === 'ai') {
      setAiDrawerOpen(true);
    }
  }, [activeTab]);

  // Cart operations
  const handleAddToCart = (game: BoardGame, type: PurchaseType, rentalDays: number = 3) => {
    const itemId = `${game.id}-${type}`;
    setCartItems(prev => {
      const existing = prev.find(item => item.id === itemId);
      if (existing) {
        return prev.map(item => item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item);
      } else {
        return [...prev, { id: itemId, game, quantity: 1, purchaseType: type, rentalDays }];
      }
    });
    setCartDrawerOpen(true);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : null;
      }
      return item;
    }).filter(Boolean) as CartItem[]);
  };

  const handleUpdateRentalDays = (id: string, days: number) => {
    setCartItems(prev => prev.map(item => item.id === id ? { ...item, rentalDays: days } : item));
  };

  const handleRemoveItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const handleToggleWishlist = (game: BoardGame) => {
    setWishlist(prev => 
      prev.includes(game.id) ? prev.filter(id => id !== game.id) : [...prev, game.id]
    );
  };

  // Filter logic
  const filteredGames = games.filter(g => {
    // Search query
    if (filters.searchQuery) {
      const q = filters.searchQuery.toLowerCase();
      const matchName = g.titleFa.toLowerCase().includes(q) || g.titleEn.toLowerCase().includes(q);
      const matchDesc = g.shortDescription.toLowerCase().includes(q);
      const matchMech = g.mechanics.some(m => m.toLowerCase().includes(q));
      if (!matchName && !matchDesc && !matchMech) return false;
    }

    // Category
    if (filters.category !== 'all' && g.category !== filters.category) return false;

    // Players
    if (filters.playersCount !== null) {
      if (filters.playersCount < g.minPlayers || filters.playersCount > g.maxPlayers) return false;
    }

    // Playtime
    if (filters.maxPlayTime !== null && g.playTimeMinutes > filters.maxPlayTime) return false;

    // Purchase mode
    if (filters.purchaseMode === 'rent' && g.rentalPricePerDay <= 0) return false;

    return true;
  }).sort((a, b) => {
    if (filters.sortBy === 'rating') return b.rating - a.rating;
    if (filters.sortBy === 'price_asc') return a.priceToman - b.priceToman;
    if (filters.sortBy === 'price_desc') return b.priceToman - a.priceToman;
    if (filters.sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
    return (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0);
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950 dir-rtl">
      
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cartCount={cartItems.reduce((acc, i) => acc + i.quantity, 0)}
        onOpenCart={() => setCartDrawerOpen(true)}
        wishlistCount={wishlist.length}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onOpenAi={() => {
          setAiInitialPrompt('');
          setAiDrawerOpen(true);
        }}
      />

      {/* Main Hero Banner */}
      <HeroBanner
        onOpenWizard={() => setWizardOpen(true)}
        onOpenAi={() => {
          setAiInitialPrompt('سلام! لطفاً بهترین بردگیم‌های پرفروش رو به من معرفی کن.');
          setAiDrawerOpen(true);
        }}
        onSelectCategory={(cat) => setFilters(prev => ({ ...prev, category: cat }))}
      />

      {/* Primary Catalog Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Section Header & Filters Bar */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 sm:p-6 space-y-4 shadow-xl">
          
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <Store className="w-5 h-5 text-amber-400" />
                <h2 className="text-xl font-black text-white">
                  {activeTab === 'rent' ? 'آرشیو بردگیم‌های قابل اجاره روزانه' : 'آرشیو جامع بازی‌های فکری'}
                </h2>
                <span className="bg-amber-500/20 text-amber-400 text-xs font-mono font-bold px-2 py-0.5 rounded-full border border-amber-500/30">
                  {filteredGames.length} بازی
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                از فیلترهای زیر یا پیشنهاددهنده هوشمند برای پیدا کردن بهترین گزینه استفاده کنید.
              </p>
            </div>

            {/* Smart Wizard Quick Launch */}
            <button
              onClick={() => setWizardOpen(true)}
              className="py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black flex items-center gap-2 shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
            >
              <Dices className="w-4 h-4 text-slate-950" />
              <span>فیلتر هوشمند چی بازی کنیم؟</span>
            </button>
          </div>

          {/* Categories Selector Strip */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 text-xs font-bold border-t border-slate-800/80 pt-4">
            <span className="text-slate-400 shrink-0">دسته‌بندی:</span>
            {[
              { id: 'all', label: 'همه بازی‌ها' },
              { id: 'strategy', label: '🧩 استراتژیک' },
              { id: 'party', label: '🎉 دورهمی' },
              { id: 'family', label: '👨‍👩‍👧‍👦 خانوادگی' },
              { id: 'card', label: '🃏 کارتی' },
              { id: 'two_player', label: '⚔️ دو نفره' },
              { id: 'mystery', label: '🕵️ معمایی' },
              { id: 'complex', label: '🧠 سنگین' }
            ].map(c => (
              <button
                key={c.id}
                onClick={() => setFilters(prev => ({ ...prev, category: c.id as GameCategory }))}
                className={`px-3.5 py-2 rounded-xl shrink-0 transition-all ${
                  filters.category === c.id
                    ? 'bg-amber-500 text-slate-950 shadow-md font-black'
                    : 'bg-slate-950 border border-slate-800 text-slate-300 hover:text-white'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          {/* Additional Quick Filter Selectors */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs pt-2">
            
            {/* Player Count Filter */}
            <div>
              <label className="block text-[11px] font-bold text-slate-400 mb-1">تعداد بازیکنان:</label>
              <select
                value={filters.playersCount || ''}
                onChange={(e) => setFilters(prev => ({ ...prev, playersCount: e.target.value ? Number(e.target.value) : null }))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-amber-500"
              >
                <option value="">همه تعداد نفرات</option>
                <option value="2">۲ نفر</option>
                <option value="3">۳ نفر</option>
                <option value="4">۴ نفر</option>
                <option value="6">۶ نفر و بالاتر</option>
              </select>
            </div>

            {/* Playtime Filter */}
            <div>
              <label className="block text-[11px] font-bold text-slate-400 mb-1">حداکثر زمان بازی:</label>
              <select
                value={filters.maxPlayTime || ''}
                onChange={(e) => setFilters(prev => ({ ...prev, maxPlayTime: e.target.value ? Number(e.target.value) : null }))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-amber-500"
              >
                <option value="">همه زمان‌ها</option>
                <option value="30">زیر ۳۰ دقیقه (سریع)</option>
                <option value="60">زیر ۶۰ دقیقه (متوسط)</option>
                <option value="120">تا ۱۲۰ دقیقه (طولانی)</option>
              </select>
            </div>

            {/* Sort Order */}
            <div>
              <label className="block text-[11px] font-bold text-slate-400 mb-1">مرتب‌سازی بر اساس:</label>
              <select
                value={filters.sortBy}
                onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value as any }))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-amber-500"
              >
                <option value="popular">محبوب‌ترین‌ها</option>
                <option value="rating">بالاترین امتیاز</option>
                <option value="newest">جدیدترین‌ها</option>
                <option value="price_asc">ارزان‌ترین</option>
                <option value="price_desc">گران‌ترین</option>
              </select>
            </div>

            {/* Reset Filters */}
            <div className="flex items-end">
              <button
                onClick={() => {
                  setFilters({
                    searchQuery: '',
                    category: 'all',
                    playersCount: null,
                    maxPlayTime: null,
                    minAge: null,
                    selectedMechanic: 'all',
                    purchaseMode: 'all',
                    sortBy: 'popular'
                  });
                  setSearchQuery('');
                }}
                className="w-full py-2 bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white rounded-xl text-xs font-bold transition-colors"
              >
                بازنشانی تمام فیلترها
              </button>
            </div>

          </div>

        </div>

        {/* Game Cards Grid */}
        {filteredGames.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredGames.map(game => (
              <GameCard
                key={game.id}
                game={game}
                onSelectGame={(g) => setSelectedGame(g)}
                onAddToCart={(g, type) => handleAddToCart(g, type)}
                onToggleWishlist={(g) => handleToggleWishlist(g)}
                isWishlisted={wishlist.includes(game.id)}
              />
            ))}
          </div>
        ) : (
          /* No games found state */
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-12 text-center space-y-4">
            <SearchX className="w-12 h-12 text-slate-600 mx-auto" />
            <h3 className="text-base font-bold text-white">هیچ بازی با فیلترهای انتخابی شما یافت نشد!</h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              می‌توانید فیلترها را تغییر دهید یا از «هوش مصنوعی بازی‌تو» برای جستجوی متنی کمک بگیرید.
            </p>
            <button
              onClick={() => {
                setAiInitialPrompt(`من دنبال بازی با این مشخصات هستم: ${filters.searchQuery || filters.category}`);
                setAiDrawerOpen(true);
              }}
              className="py-2.5 px-5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs inline-flex items-center gap-2"
            >
              <Bot className="w-4 h-4 text-amber-300" />
              <span>جستجو با هوش مصنوعی</span>
            </button>
          </div>
        )}

        {/* Boardgame Cafes Section */}
        <CafeSection
          cafes={cafes}
          onOpenReservationModal={(cafe) => setSelectedCafeForReservation(cafe)}
        />

        {/* Blog / Articles Section */}
        <ArticlesSection articles={articles} />

      </main>

      {/* Modals & Drawers */}
      <GameDetailModal
        game={selectedGame}
        onClose={() => setSelectedGame(null)}
        onAddToCart={(game, type, rentalDays) => handleAddToCart(game, type, rentalDays)}
        onAskAiAboutGame={(promptText) => {
          setAiInitialPrompt(promptText);
          setAiDrawerOpen(true);
        }}
      />

      <CafeReservationModal
        cafe={selectedCafeForReservation}
        onClose={() => setSelectedCafeForReservation(null)}
      />

      <SmartGameWizard
        isOpen={wizardOpen}
        onClose={() => setWizardOpen(false)}
        onApplyWizardFilter={(partialFilters) => {
          setFilters(prev => ({ ...prev, ...partialFilters }));
        }}
        onAskAiWithFilter={(promptText) => {
          setAiInitialPrompt(promptText);
          setAiDrawerOpen(true);
        }}
      />

      <AiConciergeDrawer
        isOpen={aiDrawerOpen}
        onClose={() => setAiDrawerOpen(false)}
        initialPrompt={aiInitialPrompt}
        onSelectGame={(game) => {
          setSelectedGame(game);
          setAiDrawerOpen(false);
        }}
      />

      <CartDrawer
        isOpen={cartDrawerOpen}
        onClose={() => setCartDrawerOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onUpdateRentalDays={handleUpdateRentalDays}
        onRemoveItem={handleRemoveItem}
        onOpenCheckout={() => {
          setCartDrawerOpen(false);
          setCheckoutModalOpen(true);
        }}
      />

      <CheckoutModal
        isOpen={checkoutModalOpen}
        onClose={() => setCheckoutModalOpen(false)}
        cartItems={cartItems}
        onClearCart={() => setCartItems([])}
      />

      {/* Footer */}
      <Footer />

    </div>
  );
}
