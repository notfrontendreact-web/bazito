import { GameCafe } from '../types';

export const INITIAL_CAFES: GameCafe[] = [
  {
    id: 'cafe-bazi-to-vanak',
    name: 'کافه بردگیم بازی‌تو (شعبه ونک)',
    city: 'تهران',
    neighborhood: 'ونک / ملاصدرا',
    address: 'تهران، میدان ونک، خیابان ملاصدرا، پلاک ۴۸، طبقه همکف',
    phone: '021-88776655',
    hourlyPriceToman: 45000,
    gamesCount: 450,
    rating: 4.9,
    imageUrl: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80',
    capacity: 60,
    features: ['مربی اختصاصی آموزگار', 'کافه و غذاهای گرم', 'تنوع ۴۵۰+ بردگیم', 'اتاق بازی VIP', 'اینترنت رایگان'],
    openingHours: 'همه روزه ۱۲:۰۰ الی ۲۳:۳۰'
  },
  {
    id: 'cafe-bazi-to-enghelab',
    name: 'خانه بردگیم بازی‌تو (شعبه انقلاب)',
    city: 'تهران',
    neighborhood: 'انقلاب / دانشگاه',
    address: 'تهران، خیابان انقلاب، بین فخررازی و دانشگاه، پلاک ۱۲۰',
    phone: '021-66443322',
    hourlyPriceToman: 35000,
    gamesCount: 380,
    rating: 4.8,
    imageUrl: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80',
    capacity: 80,
    features: ['فضای بزرگ دانشجویی', 'تخفیف گروه‌های بالای ۶ نفر', 'منوی کامل قهوه تخصصی', 'تورنمنت هفتگی کاتان'],
    openingHours: '۱۰:۰۰ الی ۲۳:۰۰'
  },
  {
    id: 'cafe-bazi-to-isfahan',
    name: 'کافه بردگیم زاینده‌رود بازی‌تو',
    city: 'اصفهان',
    neighborhood: 'چهارباغ عباسی',
    address: 'اصفهان، چهارباغ عباسی، مجتمع تجاری بهار، طبقه منفی ۱',
    phone: '031-32221100',
    hourlyPriceToman: 30000,
    gamesCount: 290,
    rating: 4.7,
    imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
    capacity: 50,
    features: ['محیط سنتی و مدرن', 'بازی‌های ۲ نفره و خانوادگی', 'آموزش سریع تمام بازی‌ها'],
    openingHours: '۱۵:۰۰ الی ۲۴:۰۰'
  },
  {
    id: 'cafe-bazi-to-shiraz',
    name: 'کلاب بردگیم بازی‌تو شیراز',
    city: 'شیراز',
    neighborhood: 'عفیف آباد',
    address: 'شیراز، خیابان عفیف آباد، روبروی کوچه ۱۸، مجتمع ستاره',
    phone: '071-36261010',
    hourlyPriceToman: 32000,
    gamesCount: 310,
    rating: 4.9,
    imageUrl: 'https://images.unsplash.com/photo-1525610553991-2bede1a236e2?auto=format&fit=crop&w=800&q=80',
    capacity: 45,
    features: ['فضای روباز و سرپوشیده', 'مافیا و نقش مخفی شبانه', 'نوشیدنی‌های ارگانیک'],
    openingHours: '۱۶:۰۰ الی ۰۱:۰۰ بامداد'
  }
];
