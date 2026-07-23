import React, { useState } from 'react';
import { 
  Coffee, 
  MapPin, 
  Phone, 
  Users, 
  Clock, 
  Star, 
  Sparkles, 
  Calendar,
  CheckCircle2,
  X
} from 'lucide-react';
import { GameCafe } from '../types';

interface CafeSectionProps {
  cafes: GameCafe[];
  onOpenReservationModal: (cafe: GameCafe) => void;
}

export const CafeSection: React.FC<CafeSectionProps> = ({
  cafes,
  onOpenReservationModal
}) => {
  const [selectedCity, setSelectedCity] = useState<string>('all');

  const filteredCafes = cafes.filter(c => 
    selectedCity === 'all' || c.city === selectedCity
  );

  return (
    <section className="py-12 bg-slate-950 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-400 text-xs font-bold mb-2">
              <Coffee className="w-3.5 h-3.5" />
              <span>کافه بردگیم‌ها و کلاب‌های بازی‌تو</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">رزرو آنلاین میز در کافه بازی‌های سراسر کشور</h2>
            <p className="text-xs text-slate-400 mt-1">از بازی همراه مربی، منوی قهوه عالی و محیط خلوت و هیجان‌انگیز لذت ببرید.</p>
          </div>

          {/* City Selector */}
          <div className="flex items-center gap-2 bg-slate-900 p-1.5 rounded-2xl border border-slate-800 text-xs font-bold">
            <span className="text-slate-400 px-2">شهر:</span>
            {['all', 'تهران', 'اصفهان', 'شیراز'].map(city => (
              <button
                key={city}
                onClick={() => setSelectedCity(city)}
                className={`px-3 py-1.5 rounded-xl transition-all ${
                  selectedCity === city
                    ? 'bg-violet-600 text-white shadow-md'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {city === 'all' ? 'همه شهرها' : city}
              </button>
            ))}
          </div>
        </div>

        {/* Cafes Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {filteredCafes.map(cafe => (
            <div key={cafe.id} className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden hover:border-violet-500/40 transition-all shadow-xl flex flex-col sm:flex-row">
              
              {/* Image */}
              <div className="sm:w-2/5 relative bg-slate-950">
                <img
                  src={cafe.imageUrl}
                  alt={cafe.name}
                  className="w-full h-48 sm:h-full object-cover"
                />
                <div className="absolute top-3 right-3 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-lg text-amber-400 text-xs font-bold flex items-center gap-1 border border-amber-500/30">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>{cafe.rating}</span>
                </div>
              </div>

              {/* Body */}
              <div className="sm:w-3/5 p-5 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-violet-400 bg-violet-500/10 px-2 py-0.5 rounded border border-violet-500/20">
                      {cafe.city} - {cafe.neighborhood}
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium">
                      ظرفیت: {cafe.capacity} نفر
                    </span>
                  </div>

                  <h3 className="text-base font-black text-white mt-1.5">{cafe.name}</h3>
                  <p className="text-xs text-slate-400 flex items-center gap-1 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                    <span className="line-clamp-1">{cafe.address}</span>
                  </p>

                  {/* Amenities */}
                  <div className="flex flex-wrap gap-1.5 my-3">
                    {cafe.features.map((f, i) => (
                      <span key={i} className="text-[10px] bg-slate-950 text-slate-300 px-2 py-0.5 rounded-lg border border-slate-800">
                        ✓ {f}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Price & Action */}
                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] text-slate-400">هزینه ورودی و بازی:</p>
                    <p className="text-sm font-black text-amber-400">
                      {cafe.hourlyPriceToman.toLocaleString()} <span className="text-[10px] font-normal text-slate-400">تومان/ساعت</span>
                    </p>
                  </div>

                  <button
                    onClick={() => onOpenReservationModal(cafe)}
                    className="py-2.5 px-4 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-violet-600/30 transition-all cursor-pointer"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>رزرو آنلاین میز</span>
                  </button>
                </div>

              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
