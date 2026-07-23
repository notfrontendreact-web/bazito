import React, { useState } from 'react';
import { 
  Dices, 
  Search, 
  ShoppingBag, 
  Heart, 
  Bot, 
  Coffee, 
  BookOpen, 
  Sparkles,
  Menu,
  X,
  RefreshCw,
  Store
} from 'lucide-react';

interface NavbarProps {
  activeTab: 'shop' | 'rent' | 'cafes' | 'ai' | 'blog';
  setActiveTab: (tab: 'shop' | 'rent' | 'cafes' | 'ai' | 'blog') => void;
  cartCount: number;
  onOpenCart: () => void;
  wishlistCount: number;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  onOpenAi: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  cartCount,
  onOpenCart,
  wishlistCount,
  searchQuery,
  setSearchQuery,
  onOpenAi
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
      {/* Top Notification Bar */}
      <div className="bg-gradient-to-r from-violet-600 via-amber-500 to-emerald-500 py-1.5 px-4 text-center text-xs font-bold text-slate-950 flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 animate-spin" />
        <span>تخفیف ویژه ۱۵٪ جشنواره بازی‌تو با کد تخفیف <span className="bg-slate-950 text-amber-400 px-1.5 py-0.5 rounded font-mono">BAZITO100</span> | ارسال رایگان خریدهای بالای ۵۰۰ هزار تومان</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Right Section: Logo & Brand */}
          <div className="flex items-center gap-6">
            <button 
              onClick={() => setActiveTab('shop')} 
              className="flex items-center gap-3 text-right group focus:outline-none"
            >
              <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-amber-500 to-violet-600 p-0.5 shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <Dices className="w-6 h-6 text-amber-400 group-hover:rotate-12 transition-transform" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-2xl font-black tracking-tight text-white font-sans">بازی‌تو</span>
                  <span className="text-xs bg-amber-500/20 text-amber-400 px-1.5 py-0.5 rounded border border-amber-500/30 font-semibold">BaziTo</span>
                </div>
                <p className="text-[10px] text-slate-400 font-medium">مرجع خرید، اجاره و کافه بردگیم</p>
              </div>
            </button>

            {/* Desktop Nav Links */}
            <nav className="hidden lg:flex items-center gap-1 mr-4">
              <button
                onClick={() => setActiveTab('shop')}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all ${
                  activeTab === 'shop' 
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20' 
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Store className="w-4 h-4" />
                <span>فروشگاه بردگیم</span>
              </button>

              <button
                onClick={() => setActiveTab('rent')}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all ${
                  activeTab === 'rent' 
                    ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20' 
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                <RefreshCw className="w-4 h-4" />
                <span>اجاره بردگیم</span>
                <span className="text-[10px] bg-emerald-950 text-emerald-300 px-1.5 py-0.2 rounded-full border border-emerald-500/40">تحویل درب منزل</span>
              </button>

              <button
                onClick={() => setActiveTab('cafes')}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all ${
                  activeTab === 'cafes' 
                    ? 'bg-violet-500 text-white shadow-md shadow-violet-500/20' 
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Coffee className="w-4 h-4" />
                <span>کافه بازی‌ها</span>
              </button>

              <button
                onClick={() => setActiveTab('blog')}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all ${
                  activeTab === 'blog' 
                    ? 'bg-slate-800 text-amber-400 border border-slate-700' 
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>مجله و آموزش</span>
              </button>
            </nav>
          </div>

          {/* Center/Search Bar */}
          <div className="flex-1 max-w-md hidden md:block">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="جستجوی نام بازی، سبک، تعداد بازیکن (مثلا: کاتان، کودتا، ۲ نفره)..."
                className="w-full bg-slate-950 border border-slate-800 text-slate-100 placeholder-slate-500 text-xs rounded-xl pr-10 pl-4 py-2.5 focus:outline-none focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/60 transition-all"
              />
              <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-3" />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute left-3 top-3 text-slate-500 hover:text-slate-300"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Left Section: AI Assistant & Cart & Wishlist & Mobile Toggle */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* AI Assistant Button */}
            <button
              onClick={onOpenAi}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-violet-600/30 transition-all active:scale-95 border border-violet-400/30"
            >
              <Bot className="w-4 h-4 text-amber-300 animate-bounce" />
              <span className="hidden sm:inline">هوش مصنوعی بازی‌تو</span>
              <span className="sm:hidden">هوش مصنوعی</span>
            </button>

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700/80 transition-all active:scale-95"
              title="سبد خرید"
            >
              <ShoppingBag className="w-5 h-5 text-amber-400" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-amber-500 text-slate-950 text-[11px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-slate-900 shadow">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Wishlist Button */}
            <button
              className="relative p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700/80 transition-all active:scale-95 hidden sm:flex"
              title="علاقه‌مندی‌ها"
            >
              <Heart className="w-5 h-5 text-rose-400" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-rose-500 text-white text-[11px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-slate-900 shadow">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 lg:hidden"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Search Bar */}
        <div className="pb-3 md:hidden">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="جستجوی نام یا سبک بازی..."
              className="w-full bg-slate-950 border border-slate-800 text-slate-100 placeholder-slate-500 text-xs rounded-xl pr-10 pl-4 py-2 focus:outline-none focus:border-amber-500"
            />
            <Search className="w-4 h-4 text-slate-400 absolute right-3 top-2.5" />
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-900 border-b border-slate-800 px-4 pt-2 pb-6 space-y-2">
          <button
            onClick={() => { setActiveTab('shop'); setMobileMenuOpen(false); }}
            className={`w-full flex items-center gap-3 p-3 rounded-xl text-right text-sm font-bold ${
              activeTab === 'shop' ? 'bg-amber-500 text-slate-950' : 'text-slate-300 bg-slate-800/60'
            }`}
          >
            <Store className="w-5 h-5" />
            <span>فروشگاه و آرشیو کامل بردگیم</span>
          </button>

          <button
            onClick={() => { setActiveTab('rent'); setMobileMenuOpen(false); }}
            className={`w-full flex items-center gap-3 p-3 rounded-xl text-right text-sm font-bold ${
              activeTab === 'rent' ? 'bg-emerald-500 text-slate-950' : 'text-slate-300 bg-slate-800/60'
            }`}
          >
            <RefreshCw className="w-5 h-5" />
            <span>اجاره بردگیم (تحویل درب منزل)</span>
          </button>

          <button
            onClick={() => { setActiveTab('cafes'); setMobileMenuOpen(false); }}
            className={`w-full flex items-center gap-3 p-3 rounded-xl text-right text-sm font-bold ${
              activeTab === 'cafes' ? 'bg-violet-600 text-white' : 'text-slate-300 bg-slate-800/60'
            }`}
          >
            <Coffee className="w-5 h-5" />
            <span>رزرو آنلاین کافه بردگیم‌ها</span>
          </button>

          <button
            onClick={() => { setActiveTab('blog'); setMobileMenuOpen(false); }}
            className={`w-full flex items-center gap-3 p-3 rounded-xl text-right text-sm font-bold ${
              activeTab === 'blog' ? 'bg-slate-700 text-amber-400' : 'text-slate-300 bg-slate-800/60'
            }`}
          >
            <BookOpen className="w-5 h-5" />
            <span>مجله آموزشی و نقد و بررسی</span>
          </button>
        </div>
      )}
    </header>
  );
};
