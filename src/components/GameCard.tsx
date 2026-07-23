import React from 'react';
import { 
  Users, 
  Clock, 
  Star, 
  ShoppingBag, 
  RefreshCw, 
  Heart,
  Eye,
  CheckCircle,
  HelpCircle
} from 'lucide-react';
import { BoardGame } from '../types';

interface GameCardProps {
  game: BoardGame;
  onSelectGame: (game: BoardGame) => void;
  onAddToCart: (game: BoardGame, purchaseType: 'buy' | 'rent') => void;
  onToggleWishlist?: (game: BoardGame) => void;
  isWishlisted?: boolean;
}

export const GameCard: React.FC<GameCardProps> = ({
  game,
  onSelectGame,
  onAddToCart,
  onToggleWishlist,
  isWishlisted = false
}) => {
  return (
    <div className="group relative bg-slate-900 border border-slate-800 hover:border-amber-500/50 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-amber-500/10 transition-all duration-300 flex flex-col h-full">
      
      {/* Image Container */}
      <div className="relative aspect-[4/3] bg-slate-950 overflow-hidden cursor-pointer" onClick={() => onSelectGame(game)}>
        <img
          src={game.imageUrl}
          alt={game.titleFa}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Top Badges */}
        <div className="absolute top-2.5 right-2.5 flex flex-col gap-1.5 items-end">
          {game.isPopular && (
            <span className="bg-amber-500 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-lg shadow-md">
              محبوب‌ترین
            </span>
          )}
          {game.isNew && (
            <span className="bg-emerald-500 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-lg shadow-md">
              جدید
            </span>
          )}
          {game.discountPercent && game.discountPercent > 0 ? (
            <span className="bg-rose-600 text-white text-[10px] font-black px-2 py-0.5 rounded-lg shadow-md">
              %{game.discountPercent} تخفیف
            </span>
          ) : null}
        </div>

        {/* Category Label */}
        <div className="absolute bottom-2.5 right-2.5 bg-slate-950/80 backdrop-blur-md text-amber-300 text-[11px] font-bold px-2.5 py-1 rounded-lg border border-amber-500/30">
          {game.categoryLabelFa}
        </div>

        {/* Wishlist Button */}
        {onToggleWishlist && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleWishlist(game);
            }}
            className="absolute top-2.5 left-2.5 p-2 rounded-xl bg-slate-950/70 hover:bg-slate-900 text-slate-300 hover:text-rose-400 border border-slate-800 transition-colors"
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
          </button>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Title */}
          <div className="cursor-pointer" onClick={() => onSelectGame(game)}>
            <h3 className="text-sm font-black text-white hover:text-amber-400 transition-colors line-clamp-1">
              {game.titleFa}
            </h3>
            <p className="text-[11px] text-slate-400 font-mono line-clamp-1">
              {game.titleEn}
            </p>
          </div>

          {/* Quick Specs Badges */}
          <div className="grid grid-cols-3 gap-1.5 my-3 text-[11px] text-slate-300">
            <div className="flex items-center gap-1 bg-slate-950/60 px-2 py-1 rounded-lg border border-slate-800">
              <Users className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span className="truncate">{game.minPlayers}-{game.maxPlayers} نفر</span>
            </div>

            <div className="flex items-center gap-1 bg-slate-950/60 px-2 py-1 rounded-lg border border-slate-800">
              <Clock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span className="truncate">{game.playTimeMinutes} دقیقه</span>
            </div>

            <div className="flex items-center gap-1 bg-slate-950/60 px-2 py-1 rounded-lg border border-slate-800">
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400 shrink-0" />
              <span>{game.rating}</span>
            </div>
          </div>

          <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
            {game.shortDescription}
          </p>
        </div>

        {/* Pricing & CTA Actions */}
        <div className="pt-3 border-t border-slate-800 space-y-2">
          
          {/* Buy vs Rent prices */}
          <div className="flex items-center justify-between text-xs">
            <div>
              <p className="text-[10px] text-slate-400 font-medium">قیمت خرید:</p>
              <p className="text-sm font-black text-amber-400">
                {game.priceToman.toLocaleString()} <span className="text-[10px] font-normal text-slate-400">تومان</span>
              </p>
            </div>

            <div className="text-left border-r border-slate-800 pr-3">
              <p className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                <RefreshCw className="w-3 h-3 animate-spin" />
                اجاره روزانه:
              </p>
              <p className="text-xs font-bold text-emerald-300">
                {game.rentalPricePerDay.toLocaleString()} <span className="text-[10px] font-normal text-slate-400">تومان</span>
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              onClick={() => onAddToCart(game, 'buy')}
              className="py-2 px-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black flex items-center justify-center gap-1.5 shadow-md transition-all active:scale-95 cursor-pointer"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>خرید آنلاین</span>
            </button>

            <button
              onClick={() => onAddToCart(game, 'rent')}
              className="py-2 px-2 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center justify-center gap-1.5 transition-all active:scale-95 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>اجاره بازی</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
