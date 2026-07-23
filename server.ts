import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import { INITIAL_GAMES } from './src/data/games.js';
import { INITIAL_CAFES } from './src/data/cafes.js';

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

// === API ROUTES ===

// 1. Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'BaziTo BoardGame Platform' });
});

// 2. Games listing with filters & search
app.get('/api/games', (req, res) => {
  try {
    let result = [...INITIAL_GAMES];
    const {
      q,
      category,
      players,
      maxPlayTime,
      minAge,
      mechanic,
      mode,
      sortBy
    } = req.query;

    // Search query
    if (q && typeof q === 'string') {
      const queryLower = q.trim().toLowerCase();
      result = result.filter(g => 
        g.titleFa.toLowerCase().includes(queryLower) ||
        g.titleEn.toLowerCase().includes(queryLower) ||
        g.shortDescription.toLowerCase().includes(queryLower) ||
        g.mechanics.some(m => m.toLowerCase().includes(queryLower)) ||
        g.publisher.toLowerCase().includes(queryLower)
      );
    }

    // Category filter
    if (category && category !== 'all' && typeof category === 'string') {
      result = result.filter(g => g.category === category);
    }

    // Players count
    if (players && !isNaN(Number(players))) {
      const pCount = Number(players);
      result = result.filter(g => pCount >= g.minPlayers && pCount <= g.maxPlayers);
    }

    // Max play time
    if (maxPlayTime && !isNaN(Number(maxPlayTime))) {
      const maxTime = Number(maxPlayTime);
      result = result.filter(g => g.playTimeMinutes <= maxTime);
    }

    // Min Age suitability
    if (minAge && !isNaN(Number(minAge))) {
      const ageVal = Number(minAge);
      result = result.filter(g => g.minAge <= ageVal);
    }

    // Mechanic
    if (mechanic && typeof mechanic === 'string' && mechanic !== 'all') {
      result = result.filter(g => g.mechanics.includes(mechanic));
    }

    // Purchase mode
    if (mode === 'rent') {
      result = result.filter(g => g.rentalPricePerDay > 0);
    } else if (mode === 'buy') {
      result = result.filter(g => g.inStock);
    }

    // Sorting
    if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'price_asc') {
      result.sort((a, b) => a.priceToman - b.priceToman);
    } else if (sortBy === 'price_desc') {
      result.sort((a, b) => b.priceToman - a.priceToman);
    } else if (sortBy === 'newest') {
      result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    } else {
      // popular default
      result.sort((a, b) => (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0));
    }

    res.json({ success: true, count: result.length, games: result });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 3. Get game by ID
app.get('/api/games/:id', (req, res) => {
  const game = INITIAL_GAMES.find(g => g.id === req.params.id);
  if (!game) {
    return res.status(404).json({ success: false, message: 'بازی یافت نشد' });
  }
  const related = INITIAL_GAMES.filter(g => g.category === game.category && g.id !== game.id).slice(0, 3);
  res.json({ success: true, game, related });
});

// 4. Boardgame Cafes listing
app.get('/api/cafes', (req, res) => {
  const { city } = req.query;
  let cafes = [...INITIAL_CAFES];
  if (city && typeof city === 'string' && city !== 'all') {
    cafes = cafes.filter(c => c.city === city);
  }
  res.json({ success: true, cafes });
});

// 5. Reserve Cafe table
app.post('/api/cafes/reserve', (req, res) => {
  const { cafeId, customerName, phone, date, timeSlot, guestsCount } = req.body;
  if (!cafeId || !customerName || !phone || !date || !timeSlot) {
    return res.status(400).json({ success: false, message: 'لطفا تمام اطلاعات فرم رزرو را وارد کنید' });
  }

  const cafe = INITIAL_CAFES.find(c => c.id === cafeId);
  if (!cafe) {
    return res.status(404).json({ success: false, message: 'کافه مورد نظر یافت نشد' });
  }

  const reservationCode = 'BZ-RES-' + Math.floor(100000 + Math.random() * 900000);
  const estimatedCost = (cafe.hourlyPriceToman * (guestsCount || 2) * 2); // 2 hours estimate

  res.json({
    success: true,
    reservationCode,
    message: 'رزرو میز شما با موفقیت ثبت گردید!',
    details: {
      cafeName: cafe.name,
      customerName,
      phone,
      date,
      timeSlot,
      guestsCount,
      estimatedCostToman: estimatedCost,
      status: 'تایید اولیه (پرداخت در محل کافه)'
    }
  });
});

// 6. Checkout order/rental endpoint
app.post('/api/orders/checkout', (req, res) => {
  const { items, customerName, phone, address, discountCode } = req.body;
  if (!items || !items.length || !customerName || !phone) {
    return res.status(400).json({ success: false, message: 'اطلاعات سبد خرید و گیرنده ناقص است' });
  }

  let subtotal = 0;
  items.forEach((item: any) => {
    if (item.purchaseType === 'rent') {
      subtotal += (item.game.rentalPricePerDay * (item.rentalDays || 3) * item.quantity);
    } else {
      subtotal += (item.game.priceToman * item.quantity);
    }
  });

  let discount = 0;
  if (discountCode === 'BAZITO100' || discountCode === 'BAZITO') {
    discount = Math.round(subtotal * 0.15); // 15% discount
  }

  const shippingFee = subtotal > 500000 ? 0 : 35000;
  const totalAmount = subtotal - discount + shippingFee;
  const trackingNumber = 'BZ-ORD-' + Math.floor(100000 + Math.random() * 900000);

  res.json({
    success: true,
    orderCode: trackingNumber,
    message: 'سفارش شما با موفقیت ثبت شد!',
    invoice: {
      subtotalToman: subtotal,
      discountToman: discount,
      shippingFeeToman: shippingFee,
      totalToman: totalAmount,
      customerName,
      phone,
      address: address || 'تحویل در محل کافه ونک بازی‌تو',
      estimatedDelivery: '۲۴ الی ۴۸ ساعت کاری آینده'
    }
  });
});

// 7. Gemini AI Assistant endpoint
app.post('/api/gemini/recommend', async (req, res) => {
  try {
    const { prompt, playersCount, durationMinutes, ageGroup, mood, chatHistory } = req.body;

    const availableGamesListStr = INITIAL_GAMES.map(g => 
      `- ${g.titleFa} (${g.titleEn}): سبک ${g.categoryLabelFa}، مناسب ${g.minPlayers} تا ${g.maxPlayers} نفر، زمان ${g.playTimeMinutes} دقیقه، سن +${g.minAge}، قیمت خرید ${g.priceToman.toLocaleString()} تومان، اجاره ${g.rentalPricePerDay.toLocaleString()} تومان/روز. توضیحات: ${g.shortDescription}`
    ).join('\n');

    const systemInstruction = `شما "دستیار هوشمند بازی‌تو" (BaziTo AI Assistant) هستید؛ راهنما و کارشناس ارشد آرشیو بازی‌های فکری و بردگیم وب‌سایت bazi-to.com.
پاسخ‌های شما باید کاملاً به زبان فارسی، روان، صمیمی، حرفه‌ای و جذاب با ایموجی‌های مناسب باشد.

لیست بازی‌های موجود در آرشیو وب‌سایت بازی‌تو:
${availableGamesListStr}

وظایف شما:
۱. بر اساس تعداد بازیکنان، مدت زمان، رده سنی و ترجیحات کاربر، دقیقاً بازی‌های مرتبط از لیست بالا را پیشنهاد دهید و علتش را بگویید.
۲. اگر کاربر سوالی درباره قوانین بازی‌ها (مثل کاتان، کودتا، کدنامز، اسپلندور، آزول و...) دارد، به زبان ساده و گام به گام پاسخ دهید.
۳. قیمت خرید و اجاره روزانه بازی‌های پیشنهادی را به تومان ذکر کنید.
۴. لحن شما مشتاقانه و مانند یک مربی بردگیم در کافه بازی باشد!`;

    let fullUserContent = prompt || '';
    if (playersCount || durationMinutes || mood) {
      fullUserContent += `\n[اطلاعات فیلتر هوشمند: تعداد بازیکنان=${playersCount || 'مشخص نشده'}، حداکثر زمان=${durationMinutes || 'مشخص نشده'} دقیقه، رده سنی=${ageGroup || 'مشخص نشده'}، حس و حال=${mood || 'مشخص نشده'}]`;
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: fullUserContent,
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    });

    const aiText = response.text || 'متاسفانه در دریافت پاسخ مشکلی پیش آمد. لطفا دوباره تلاش کنید.';

    // Try to identify recommended games mentioned in text
    const recommendedGames = INITIAL_GAMES.filter(g => 
      aiText.includes(g.titleFa) || aiText.includes(g.titleEn) || aiText.includes(g.id)
    );

    res.json({
      success: true,
      text: aiText,
      recommendedGames
    });
  } catch (error: any) {
    console.error('Gemini API Error:', error);
    res.status(500).json({
      success: false,
      text: 'خطا در ارتباط با هوش مصنوعی بازی‌تو. لطفا اتصال اینترنت خود را بررسی کرده و مجددا امتحان کنید.'
    });
  }
});

// === VITE / SERVER INITIALIZATION ===
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🎮 BaziTo Full-Stack Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
