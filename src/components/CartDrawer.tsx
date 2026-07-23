import React, { useState } from 'react';
import { 
  X, 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  RefreshCw, 
  Tag, 
  ArrowLeft, 
  CheckCircle, 
  ShieldCheck,
  Truck
} from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onUpdateRentalDays: (id: string, days: number) => void;
  onRemoveItem: (id: string) => void;
  onOpenCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onUpdateRentalDays,
  onRemoveItem,
  onOpenCheckout
}) => {
  const [discountCode, setDiscountCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(false);

  if (!isOpen) return null;

  let subtotal = 0;
  cartItems.forEach(item => {
    if (item.purchaseType === 'rent') {
      subtotal += (item.game.rentalPricePerDay * item.rentalDays * item.quantity);
    } else {
      subtotal += (item.game.priceToman * item.quantity);
    }
  });

  const discountAmount = appliedDiscount ? Math.round(subtotal * 0.15) : 0;
  const shippingFee = subtotal > 500000 || subtotal === 0 ? 0 : 35000;
  const finalTotal = subtotal - discountAmount + shippingFee;

  const handleApplyDiscount = () => {
    if (discountCode.trim().toUpperCase() === 'BAZITO100' || discountCode.trim().toUpperCase() === 'BAZITO') {
      setAppliedDiscount(true);
    } else {
      alert('کد تخفیف وارد شده معتبر نیست. از کد BAZITO100 استفاده کنید.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/80 backdrop-blur-sm">
      <div className="bg-slate-900 border-r border-slate-800 w-full max-w-md h-full flex flex-col shadow-2xl relative text-slate-100 animate-in slide-in-from-left duration-300">
        
        {/* Header */}
        <div className="bg-slate-950 p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-amber-400" />
            <h3 className="text-sm font-black text-white">سبد خرید و سفارش بازی‌تو ({cartItems.length})</h3>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3">
          {cartItems.length === 0 ? (
            <div className="text-center py-16 space-y-3 text-slate-400">
              <ShoppingBag className="w-12 h-12 stroke-1 mx-auto text-slate-600" />
              <p className="text-xs font-bold">سبد خرید شما فعلا خالی است!</p>
              <p className="text-[11px] text-slate-500">از آرشیو بردگیم‌ها دیدن کنید و بازی مورد علاقه‌تان را اضافه کنید.</p>
            </div>
          ) : (
            cartItems.map(item => {
              const itemTotal = item.purchaseType === 'rent'
                ? item.game.rentalPricePerDay * item.rentalDays * item.quantity
                : item.game.priceToman * item.quantity;

              return (
                <div key={item.id} className="bg-slate-950 border border-slate-800 p-3 rounded-2xl flex gap-3 relative group">
                  <img src={item.game.imageUrl} alt={item.game.titleFa} className="w-16 h-16 rounded-xl object-cover shrink-0" />
                  
                  <div className="flex-1 space-y-1">
                    <div className="flex items-start justify-between">
                      <h4 className="text-xs font-bold text-white">{item.game.titleFa}</h4>
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-slate-500 hover:text-rose-400 transition-colors p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                        item.purchaseType === 'rent' 
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' 
                          : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                      }`}>
                        {item.purchaseType === 'rent' ? `اجاره (${item.rentalDays} روزه)` : 'خرید نو'}
                      </span>
                    </div>

                    {/* Quantity controls */}
                    <div className="flex items-center justify-between pt-1">
                      <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-lg px-2 py-0.5 text-xs">
                        <button onClick={() => onUpdateQuantity(item.id, -1)} className="text-slate-400 hover:text-white"><Minus className="w-3 h-3" /></button>
                        <span className="font-bold text-white px-1">{item.quantity}</span>
                        <button onClick={() => onUpdateQuantity(item.id, 1)} className="text-slate-400 hover:text-white"><Plus className="w-3 h-3" /></button>
                      </div>

                      <span className="text-xs font-black text-amber-400">
                        {itemTotal.toLocaleString()} تومان
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer Invoice Summary */}
        {cartItems.length > 0 && (
          <div className="p-4 bg-slate-950 border-t border-slate-800 space-y-3">
            
            {/* Discount Code Input */}
            <div className="flex gap-2">
              <input
                type="text"
                value={discountCode}
                onChange={(e) => setDiscountCode(e.target.value)}
                placeholder="کد تخفیف (مثلا: BAZITO100)"
                className="flex-1 bg-slate-900 border border-slate-800 text-xs text-white rounded-xl px-3 py-2 focus:outline-none focus:border-amber-500 uppercase font-mono"
              />
              <button
                onClick={handleApplyDiscount}
                className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-amber-400 text-xs font-bold rounded-xl border border-slate-700"
              >
                اعمال
              </button>
            </div>

            {/* Calculations */}
            <div className="space-y-1.5 text-xs border-t border-slate-800/80 pt-2 text-slate-300">
              <div className="flex justify-between">
                <span className="text-slate-400">جمع کل کالاها:</span>
                <span>{subtotal.toLocaleString()} تومان</span>
              </div>

              {appliedDiscount && (
                <div className="flex justify-between text-emerald-400 font-bold">
                  <span>تخفیف جشنواره (۱۵٪):</span>
                  <span>- {discountAmount.toLocaleString()} تومان</span>
                </div>
              )}

              <div className="flex justify-between">
                <span className="text-slate-400">هزینه ارسال:</span>
                <span className={shippingFee === 0 ? 'text-emerald-400 font-bold' : ''}>
                  {shippingFee === 0 ? 'رایگان' : `${shippingFee.toLocaleString()} تومان`}
                </span>
              </div>

              <div className="flex justify-between text-sm font-black text-white pt-2 border-t border-slate-800">
                <span>مبلغ قابل پرداخت:</span>
                <span className="text-amber-400">{finalTotal.toLocaleString()} تومان</span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              onClick={onOpenCheckout}
              className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs sm:text-sm shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>تکمیل و ثبت نهایی سفارش</span>
            </button>

          </div>
        )}

      </div>
    </div>
  );
};
