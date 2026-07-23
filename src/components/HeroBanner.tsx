import React from 'react';
import { 
  Sparkles, 
  Dices, 
  Bot, 
  RefreshCw, 
  ShieldCheck, 
  Truck, 
  Headphones, 
  Coffee 
} from 'lucide-react';

interface HeroBannerProps {
  onOpenWizard: () => void;
  onOpenAi: () => void;
  onSelectCategory: (cat: any) => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onOpenWizard,
  onOpenAi,
  onSelectCategory
}) => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 py-12 lg:py-16 border-b border-slate-800">
      
      {/* Background Glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Right Column: Hero Content */}
          <div className="lg:col-span-7 space-y-6 text-right">
            
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>بازی‌تو؛ دنیای تخصصی بردگیم و بازی‌های فکری مدرن</span>
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight">
              خرید، اجاره و آموزش <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500">
                برترین بردگیم‌های ایران و جهان
              </span>
            </h1>

            {/* Description */}
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl font-normal">
              در بازی‌تو می‌توانید آرشیو کامل بازی‌های استراتژیک، دورهمی، کارتی و خانوادگی را بخرید، قبل از خرید با هزینه مناسب برای شب‌های بازی اجاره کنید یا در کافه بردگیم‌های طرف قرارداد میز رزرو کنید!
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={onOpenWizard}
                className="flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm shadow-xl shadow-amber-500/20 hover:scale-[1.02] transition-all active:scale-95 cursor-pointer"
              >
                <Dices className="w-5 h-5 text-slate-950" />
                <span>پیشنهاددهنده هوشمند چی بازی کنیم؟</span>
              </button>

              <button
                onClick={onOpenAi}
                className="flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm border border-slate-700 hover:border-violet-500/50 shadow-lg hover:scale-[1.02] transition-all active:scale-95 cursor-pointer"
              >
                <Bot className="w-5 h-5 text-violet-400" />
                <span>دستیار هوش مصنوعی قوانین</span>
              </button>
            </div>

            {/* Quick Category Badges */}
            <div className="pt-4 border-t border-slate-800/80">
              <p className="text-xs font-bold text-slate-400 mb-2.5">دسته‌بندی‌های محبوب:</p>
              <div className="flex flex-wrap gap-2">
                <button 
                  onClick={() => onSelectCategory('strategy')}
                  className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 text-xs font-medium hover:border-amber-500/50 hover:text-amber-400 transition-colors"
                >
                  🧩 استراتژیک
                </button>
                <button 
                  onClick={() => onSelectCategory('party')}
                  className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 text-xs font-medium hover:border-amber-500/50 hover:text-amber-400 transition-colors"
                >
                  🎉 دورهمی و بلوف
                </button>
                <button 
                  onClick={() => onSelectCategory('family')}
                  className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 text-xs font-medium hover:border-amber-500/50 hover:text-amber-400 transition-colors"
                >
                  👨‍👩‍👧‍👦 خانوادگی
                </button>
                <button 
                  onClick={() => onSelectCategory('two_player')}
                  className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 text-xs font-medium hover:border-amber-500/50 hover:text-amber-400 transition-colors"
                >
                  ⚔️ دو نفره
                </button>
                <button 
                  onClick={() => onSelectCategory('mystery')}
                  className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 text-xs font-medium hover:border-amber-500/50 hover:text-amber-400 transition-colors"
                >
                  🕵️ معمایی و نقش مخفی
                </button>
              </div>
            </div>

          </div>

          {/* Left Column: Interactive Visual Showcase */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Featured Visual Box */}
              <div className="relative rounded-3xl bg-slate-900/80 border border-slate-800 p-4 shadow-2xl overflow-hidden group">
                <img
                  src="https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?auto=format&fit=crop&w=1000&q=80"
                  alt="Board Game Collection"
                  className="w-full h-72 sm:h-80 object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Floating Rental Badge */}
                <div className="absolute top-8 right-8 bg-slate-950/90 backdrop-blur-md border border-emerald-500/40 px-3.5 py-2 rounded-2xl flex items-center gap-2.5 shadow-xl">
                  <RefreshCw className="w-4 h-4 text-emerald-400 animate-spin" />
                  <div>
                    <p className="text-[10px] text-slate-400 font-medium">خدمت ویژه اجاره</p>
                    <p className="text-xs font-bold text-emerald-400">تحویل ۲۴ ساعته درب منزل</p>
                  </div>
                </div>

                {/* Floating Cafe Reservation Badge */}
                <div className="absolute bottom-8 left-8 bg-slate-950/90 backdrop-blur-md border border-violet-500/40 px-3.5 py-2 rounded-2xl flex items-center gap-2.5 shadow-xl">
                  <Coffee className="w-4 h-4 text-violet-400" />
                  <div>
                    <p className="text-[10px] text-slate-400 font-medium">رزرو آنلاین میز کافه</p>
                    <p className="text-xs font-bold text-violet-300">شعبه‌های تهران، اصفهان و شیراز</p>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Feature Icons Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 pt-8 border-t border-slate-800/80">
          
          <div className="flex items-center gap-3 bg-slate-900/60 border border-slate-800 p-3.5 rounded-2xl">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="text-right">
              <h4 className="text-xs font-bold text-white">ضمانت اصالت کالا</h4>
              <p className="text-[11px] text-slate-400">تضمین قطعات و کیفیت چاپ</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-slate-900/60 border border-slate-800 p-3.5 rounded-2xl">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div className="text-right">
              <h4 className="text-xs font-bold text-white">ارسال سریع سراسری</h4>
              <p className="text-[11px] text-slate-400">پست پیشتاز و پیک موتوری</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-slate-900/60 border border-slate-800 p-3.5 rounded-2xl">
            <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/30 flex items-center justify-center text-violet-400 shrink-0">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div className="text-right">
              <h4 className="text-xs font-bold text-white">سرویس اجاره بردگیم</h4>
              <p className="text-[11px] text-slate-400">تست بازی قبل از خرید کامل</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-slate-900/60 border border-slate-800 p-3.5 rounded-2xl">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0">
              <Headphones className="w-5 h-5" />
            </div>
            <div className="text-right">
              <h4 className="text-xs font-bold text-white">آموزش و مربی هوشمند</h4>
              <p className="text-[11px] text-slate-400">پاسخ به سوالات قوانین با AI</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
