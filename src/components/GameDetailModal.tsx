import React, { useState } from 'react';
import { 
  X, 
  Users, 
  Clock, 
  Star, 
  ShoppingBag, 
  RefreshCw, 
  FileText, 
  PlayCircle, 
  CheckCircle, 
  ShieldCheck,
  Tag,
  BookOpen
} from 'lucide-react';
import { BoardGame, PurchaseType } from '../types';

interface GameDetailModalProps {
  game: BoardGame | null;
  onClose: () => void;
  onAddToCart: (game: BoardGame, type: PurchaseType, rentalDays?: number) => void;
  onAskAiAboutGame: (gameName: string) => void;
}

export const GameDetailModal: React.FC<GameDetailModalProps> = ({
  game,
  onClose,
  onAddToCart,
  onAskAiAboutGame
}) => {
  const [purchaseType, setPurchaseType] = useState<PurchaseType>('buy');
  const [rentalDays, setRentalDays] = useState<number>(3);
  const [activeImage, setActiveImage] = useState<string>('');

  if (!game) return null;

  const currentImg = activeImage || game.imageUrl;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl relative my-8 text-slate-100">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 left-5 text-slate-400 hover:text-white p-2 rounded-xl bg-slate-800 hover:bg-slate-700 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Image & Gallery */}
          <div className="md:col-span-5 space-y-3">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-slate-950 border border-slate-800">
              <img
                src={currentImg}
                alt={game.titleFa}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Gallery Thumbnails */}
            {game.gallery && game.gallery.length > 0 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                <button
                  onClick={() => setActiveImage(game.imageUrl)}
                  className={`w-14 h-14 rounded-xl overflow-hidden border-2 transition-all ${
                    currentImg === game.imageUrl ? 'border-amber-500' : 'border-slate-800 opacity-60'
                  }`}
                >
                  <img src={game.imageUrl} alt="Thumb" className="w-full h-full object-cover" />
                </button>
                {game.gallery.map((imgUrl, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(imgUrl)}
                    className={`w-14 h-14 rounded-xl overflow-hidden border-2 transition-all ${
                      currentImg === imgUrl ? 'border-amber-500' : 'border-slate-800 opacity-60'
                    }`}
                  >
                    <img src={imgUrl} alt={`Gallery ${i}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* AI Rule Helper CTA */}
            <button
              onClick={() => {
                onAskAiAboutGame(`قوانین و آموزش بازی ${game.titleFa} رو برام کلا توضیح بده و راهنمایی کن.`);
                onClose();
              }}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white text-xs font-bold flex items-center justify-center gap-2 border border-violet-400/30 transition-all cursor-pointer"
            >
              <BookOpen className="w-4 h-4 text-amber-300" />
              <span>آموزش قوانین با هوش مصنوعی بازی‌تو</span>
            </button>
          </div>

          {/* Details & Purchase Box */}
          <div className="md:col-span-7 flex flex-col justify-between space-y-4">
            <div>
              {/* Category */}
              <div className="inline-block bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold px-3 py-1 rounded-lg mb-2">
                دسته‌بندی: {game.categoryLabelFa}
              </div>

              {/* Title */}
              <h2 className="text-2xl font-black text-white">{game.titleFa}</h2>
              <p className="text-xs text-slate-400 font-mono mb-3">{game.titleEn}</p>

              {/* Specs Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 py-3 px-3 bg-slate-950 rounded-2xl border border-slate-800 text-xs text-slate-300">
                <div className="text-center border-l border-slate-800 last:border-l-0">
                  <p className="text-[10px] text-slate-500 font-medium">تعداد بازیکن</p>
                  <p className="font-bold text-amber-400 mt-0.5">{game.minPlayers} الی {game.maxPlayers} نفر</p>
                </div>
                <div className="text-center border-l border-slate-800 last:border-l-0">
                  <p className="text-[10px] text-slate-500 font-medium">مدت بازی</p>
                  <p className="font-bold text-emerald-400 mt-0.5">{game.playTimeMinutes} دقیقه</p>
                </div>
                <div className="text-center border-l border-slate-800 last:border-l-0">
                  <p className="text-[10px] text-slate-500 font-medium">رده سنی</p>
                  <p className="font-bold text-sky-400 mt-0.5">+{game.minAge} سال</p>
                </div>
                <div className="text-center">
                  <p className="text-[10px] text-slate-500 font-medium">درجه سختی</p>
                  <p className="font-bold text-violet-400 mt-0.5">{game.difficulty} از ۵</p>
                </div>
              </div>

              {/* Mechanics Tags */}
              <div className="my-3">
                <p className="text-[11px] font-bold text-slate-400 mb-1.5">مکانیزم‌های اصلی بازی:</p>
                <div className="flex flex-wrap gap-1.5">
                  {game.mechanics.map((m, idx) => (
                    <span key={idx} className="bg-slate-800 text-slate-300 text-[10px] font-semibold px-2.5 py-1 rounded-lg border border-slate-700">
                      #{m}
                    </span>
                  ))}
                </div>
              </div>

              {/* Full Description */}
              <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/40 p-3 rounded-xl border border-slate-800/80 max-h-36 overflow-y-auto">
                {game.fullDescription}
              </p>
            </div>

            {/* Buy / Rent Options Box */}
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
              
              {/* Type Switcher */}
              <div className="grid grid-cols-2 gap-2 bg-slate-900 p-1 rounded-xl">
                <button
                  onClick={() => setPurchaseType('buy')}
                  className={`py-2 text-xs font-bold rounded-lg transition-all ${
                    purchaseType === 'buy'
                      ? 'bg-amber-500 text-slate-950 shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  🛒 خرید دائمی نو
                </button>

                <button
                  onClick={() => setPurchaseType('rent')}
                  className={`py-2 text-xs font-bold rounded-lg transition-all ${
                    purchaseType === 'rent'
                      ? 'bg-emerald-500 text-slate-950 shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  🔄 اجاره موقت
                </button>
              </div>

              {/* Rental Days Selector if Rent */}
              {purchaseType === 'rent' && (
                <div className="flex items-center justify-between text-xs bg-slate-900 p-2.5 rounded-xl border border-emerald-500/30">
                  <span className="text-slate-300 font-medium">مدت زمان اجاره (روز):</span>
                  <div className="flex items-center gap-2">
                    {[2, 3, 5, 7].map(days => (
                      <button
                        key={days}
                        onClick={() => setRentalDays(days)}
                        className={`w-8 h-8 rounded-lg font-bold text-xs transition-all ${
                          rentalDays === days
                            ? 'bg-emerald-500 text-slate-950'
                            : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                        }`}
                      >
                        {days}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Price Calculation & Add to Cart */}
              <div className="flex items-center justify-between pt-1">
                <div>
                  <p className="text-[10px] text-slate-400">مبلغ نهایی قابل پرداخت:</p>
                  <p className="text-lg font-black text-amber-400">
                    {purchaseType === 'buy'
                      ? game.priceToman.toLocaleString()
                      : (game.rentalPricePerDay * rentalDays).toLocaleString()}{' '}
                    <span className="text-xs font-normal text-slate-400">تومان</span>
                  </p>
                </div>

                <button
                  onClick={() => {
                    onAddToCart(game, purchaseType, rentalDays);
                    onClose();
                  }}
                  className="py-3 px-6 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black flex items-center gap-2 shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>افزودن به سبد خرید</span>
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
