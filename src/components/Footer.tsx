import React from 'react';
import { 
  Dices, 
  Phone, 
  Mail, 
  MapPin, 
  ShieldCheck, 
  Award, 
  RefreshCw, 
  Heart 
} from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-300 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Col 1: Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-violet-600 p-0.5">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <Dices className="w-5 h-5 text-amber-400" />
                </div>
              </div>
              <span className="text-xl font-black text-white">بازی‌تو | BaziTo</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              پلتفرم مرجع تخصصی خرید، اجاره و آموزش بازی‌های فکری و بردگیم در ایران. هدف ما فرهنگ‌سازی بردگیم و ایجاد لحظات لذت‌بخش دورهمی برای تمام سنین است.
            </p>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-2 text-xs">
            <h4 className="font-bold text-white mb-3">دسترسی سریع</h4>
            <ul className="space-y-2 text-slate-400">
              <li className="hover:text-amber-400 cursor-pointer">فروشگاه بازی‌های فکری</li>
              <li className="hover:text-amber-400 cursor-pointer">سرویس اجاره آنلاین بردگیم</li>
              <li className="hover:text-amber-400 cursor-pointer">رزرو کافه بردگیم‌های تهران و شهرستان‌ها</li>
              <li className="hover:text-amber-400 cursor-pointer">دستیار هوشمند پاسخ به سوالات قوانین</li>
              <li className="hover:text-amber-400 cursor-pointer">مجله آموزشی و نقد تخصصی</li>
            </ul>
          </div>

          {/* Col 3: Categories */}
          <div className="space-y-2 text-xs">
            <h4 className="font-bold text-white mb-3">سبک‌های محبوب</h4>
            <ul className="space-y-2 text-slate-400">
              <li className="hover:text-amber-400 cursor-pointer">بازی‌های استراتژیک (Catan, Splendor)</li>
              <li className="hover:text-amber-400 cursor-pointer">بازی‌های دورهمی (Coup, Codenames)</li>
              <li className="hover:text-amber-400 cursor-pointer">بازی‌های معمایی و نقش مخفی (Salem, Secret Hitler)</li>
              <li className="hover:text-amber-400 cursor-pointer">بازی‌های ۲ نفره و خانوادگی (Azul, Ticket to Ride)</li>
            </ul>
          </div>

          {/* Col 4: Contact & Support */}
          <div className="space-y-2 text-xs">
            <h4 className="font-bold text-white mb-3">ارتباط با پشتیبانی بازی‌تو</h4>
            <div className="space-y-2 text-slate-400">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>تلفن پشتیبانی: ۰۲۱-۸۸۷۷۶۶۵۵</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span>ایمیل: support@bazi-to.com</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                <span>تهران، میدان ونک، خیابان ملاصدرا، پلاک ۴۸</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
          <p>© ۱۴۰۳ تمامی حقوق این وب‌سایت متعلق به پلتفرم «بازی‌تو» (bazi-to.com) می‌باشد.</p>
          <div className="flex items-center gap-1">
            <span>طراحی شده با</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
            <span>و ری اکت + نود جی اس</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
