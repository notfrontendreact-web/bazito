import React, { useState } from 'react';
import { 
  X, 
  Calendar, 
  Clock, 
  Users, 
  Phone, 
  User, 
  Coffee, 
  CheckCircle2, 
  Sparkles,
  Receipt
} from 'lucide-react';
import { GameCafe } from '../types';

interface CafeReservationModalProps {
  cafe: GameCafe | null;
  onClose: () => void;
}

export const CafeReservationModal: React.FC<CafeReservationModalProps> = ({
  cafe,
  onClose
}) => {
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('۱۴۰۳/۰۵/۰۱');
  const [timeSlot, setTimeSlot] = useState('۱۸:۰۰ الی ۲۰:۰۰');
  const [guestsCount, setGuestsCount] = useState<number>(4);
  const [loading, setLoading] = useState(false);
  const [bookingReceipt, setBookingReceipt] = useState<any>(null);

  if (!cafe) return null;

  const handleSubmitReservation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !phone) return;

    setLoading(true);
    try {
      const res = await fetch('/api/cafes/reserve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cafeId: cafe.id,
          customerName,
          phone,
          date,
          timeSlot,
          guestsCount
        })
      });
      const data = await res.json();
      if (data.success) {
        setBookingReceipt(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative text-slate-100">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 left-5 text-slate-400 hover:text-white p-2 rounded-xl bg-slate-800 hover:bg-slate-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!bookingReceipt ? (
          <div>
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-violet-600/20 border border-violet-500/30 flex items-center justify-center text-violet-400">
                <Coffee className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-black text-white">فرم رزرو میز در {cafe.name}</h3>
                <p className="text-xs text-slate-400">{cafe.city} - ورودی {cafe.hourlyPriceToman.toLocaleString()} تومان/ساعت</p>
              </div>
            </div>

            <form onSubmit={handleSubmitReservation} className="space-y-4">
              
              {/* Name Input */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">نام و نام خانوادگی رزروکننده:</label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="مثلا: علی محمدی"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pr-10 pl-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-violet-500"
                  />
                  <User className="w-4 h-4 text-slate-500 absolute right-3.5 top-3" />
                </div>
              </div>

              {/* Phone Input */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">شماره موبایل جهت پیامک تایید:</label>
                <div className="relative">
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="09121234567"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pr-10 pl-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 dir-ltr text-right"
                  />
                  <Phone className="w-4 h-4 text-slate-500 absolute right-3.5 top-3" />
                </div>
              </div>

              {/* Guests Count */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">تعداد نفرات ({guestsCount} نفر):</label>
                <div className="flex items-center gap-2">
                  {[2, 4, 6, 8, 10].map(cnt => (
                    <button
                      key={cnt}
                      type="button"
                      onClick={() => setGuestsCount(cnt)}
                      className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                        guestsCount === cnt
                          ? 'bg-violet-600 text-white'
                          : 'bg-slate-950 border border-slate-800 text-slate-300'
                      }`}
                    >
                      {cnt} نفر
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Slot */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">سئانس زمانی رزرو:</label>
                <select
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-violet-500"
                >
                  <option value="۱۶:۰۰ الی ۱۸:۰۰">عصرگاه (۱۶:۰۰ الی ۱۸:۰۰)</option>
                  <option value="۱۸:۰۰ الی ۲۰:۰۰">شبگاه اول (۱۸:۰۰ الی ۲۰:۰۰)</option>
                  <option value="۲۰:۰۰ الی ۲۲:۰۰">شبگاه دوم (۲۰:۰۰ الی ۲۲:۰۰)</option>
                  <option value="۲۲:۰۰ الی ۲۴:۰۰">آخر شب (۲۲:۰۰ الی ۲۴:۰۰)</option>
                </select>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full mt-4 py-3.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-black text-xs sm:text-sm shadow-lg shadow-violet-600/30 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                {loading ? 'در حال ثبت رزرو...' : 'ثبت نهایی و دریافت رسید رزرو'}
              </button>

            </form>
          </div>
        ) : (
          /* Success Receipt View */
          <div className="text-center space-y-4 py-4">
            <div className="w-16 h-16 rounded-3xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="text-xl font-black text-white">{bookingReceipt.message}</h3>
            
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 text-right text-xs space-y-2.5 my-4">
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">کد رزرو اختصاصی:</span>
                <span className="font-mono font-bold text-amber-400">{bookingReceipt.reservationCode}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">نام کافه:</span>
                <span className="font-bold text-white">{bookingReceipt.details.cafeName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">رزروکننده:</span>
                <span className="font-bold text-white">{bookingReceipt.details.customerName} ({bookingReceipt.details.phone})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">زمان و نفرات:</span>
                <span className="font-bold text-emerald-400">{bookingReceipt.details.timeSlot} - {bookingReceipt.details.guestsCount} نفر</span>
              </div>
            </div>

            <p className="text-[11px] text-slate-400">
              پیامک تایید رزرو همراه با آدرس دقیق کافه به شماره موبایل‌تان ارسال گردید.
            </p>

            <button
              onClick={onClose}
              className="w-full py-3 rounded-xl bg-amber-500 text-slate-950 font-black text-xs hover:bg-amber-400 transition-colors"
            >
              متوجه شدم و بستن
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
