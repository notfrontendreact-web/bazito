import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  User, 
  Phone, 
  MapPin, 
  Truck, 
  ShieldCheck, 
  ShoppingBag,
  Receipt
} from 'lucide-react';
import { CartItem } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onClearCart: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  onClearCart
}) => {
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [receipt, setReceipt] = useState<any>(null);

  if (!isOpen) return null;

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !phone || !address) return;

    setLoading(true);
    try {
      const res = await fetch('/api/orders/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cartItems,
          customerName,
          phone,
          address,
          discountCode: 'BAZITO100'
        })
      });
      const data = await res.json();
      if (data.success) {
        setReceipt(data);
        onClearCart();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative text-slate-100 my-6">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 left-5 text-slate-400 hover:text-white p-2 rounded-xl bg-slate-800 hover:bg-slate-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!receipt ? (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-black text-white">تکمیل اطلاعات ارسال سفارش</h3>
                <p className="text-xs text-slate-400">تحویل در سراسر ایران با ضمانت سلامت فیزیکی قطعات</p>
              </div>
            </div>

            <form onSubmit={handleSubmitOrder} className="space-y-4">
              
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">نام و نام خانوادگی تحویل‌گیرنده:</label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="مثلا: رضا امینی"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pr-10 pl-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                  />
                  <User className="w-4 h-4 text-slate-500 absolute right-3.5 top-3" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">شماره موبایل جهت هماهنگی پیک/پست:</label>
                <div className="relative">
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="09123456789"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pr-10 pl-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 dir-ltr text-right"
                  />
                  <Phone className="w-4 h-4 text-slate-500 absolute right-3.5 top-3" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">آدرس دقیق پستی و پلاک:</label>
                <div className="relative">
                  <textarea
                    required
                    rows={3}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="استان، شهر، خیابان، پلاک، واحد..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pr-10 pl-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 resize-none"
                  />
                  <MapPin className="w-4 h-4 text-slate-500 absolute right-3.5 top-3" />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-4 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs sm:text-sm shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                {loading ? 'در حال ثبت و صدور فاکتور...' : 'پرداخت در محل و ثبت سفارش'}
              </button>

            </form>
          </div>
        ) : (
          /* Receipt View */
          <div className="text-center space-y-4 py-4">
            <div className="w-16 h-16 rounded-3xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="text-xl font-black text-white">{receipt.message}</h3>

            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 text-right text-xs space-y-2.5 my-4">
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">کد پیگیری پستی سفارش:</span>
                <span className="font-mono font-bold text-amber-400">{receipt.orderCode}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">تحویل‌گیرنده:</span>
                <span className="font-bold text-white">{receipt.invoice.customerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">زمان تحویل تقریبی:</span>
                <span className="font-bold text-emerald-400">{receipt.invoice.estimatedDelivery}</span>
              </div>
              <div className="flex justify-between border-t border-slate-800 pt-2 text-sm">
                <span className="text-slate-400 font-bold">مبلغ نهایی فاکتور:</span>
                <span className="font-black text-amber-400">{receipt.invoice.totalToman.toLocaleString()} تومان</span>
              </div>
            </div>

            <p className="text-[11px] text-slate-400">
              پیامک تایید سفارش به همراه جزییات پیگیری پستی ارسال گردید. از خرید شما متشکریم!
            </p>

            <button
              onClick={onClose}
              className="w-full py-3 rounded-xl bg-amber-500 text-slate-950 font-black text-xs hover:bg-amber-400 transition-colors"
            >
              بازگشت به فروشگاه
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
