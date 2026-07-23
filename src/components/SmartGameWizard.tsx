import React, { useState } from 'react';
import { 
  Users, 
  Clock, 
  Sparkles, 
  X, 
  CheckCircle2, 
  Dices,
  Bot
} from 'lucide-react';
import { FilterState, GameCategory } from '../types';

interface SmartGameWizardProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyWizardFilter: (filters: Partial<FilterState>) => void;
  onAskAiWithFilter: (promptText: string, players: number, duration: number, age: number, mood: string) => void;
}

export const SmartGameWizard: React.FC<SmartGameWizardProps> = ({
  isOpen,
  onClose,
  onApplyWizardFilter,
  onAskAiWithFilter
}) => {
  const [players, setPlayers] = useState<number>(4);
  const [maxTime, setMaxTime] = useState<number>(60);
  const [minAge, setMinAge] = useState<number>(10);
  const [category, setCategory] = useState<GameCategory>('party');
  const [moodLabel, setMoodLabel] = useState<string>('دورهمی و خنده‌دار');

  if (!isOpen) return null;

  const handleQuickApply = () => {
    onApplyWizardFilter({
      playersCount: players,
      maxPlayTime: maxTime,
      minAge: minAge,
      category: category
    });
    onClose();
  };

  const handleAskAi = () => {
    const promptText = `برای جمع ${players} نفره، با حداکثر زمان ${maxTime} دقیقه، رده سنی بالای ${minAge} سال و سبک ${moodLabel}، بهترین بردگیم‌های آرشیو بازی‌تو چیست؟`;
    onAskAiWithFilter(promptText, players, maxTime, minAge, moodLabel);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* Glow Header */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-amber-500 via-violet-500 to-emerald-500" />
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 left-5 text-slate-400 hover:text-white p-2 rounded-xl bg-slate-800 hover:bg-slate-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-inner">
            <Dices className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-white">پیشنهاددهنده هوشمند: «چی بازی کنیم؟»</h2>
            <p className="text-xs text-slate-400">تنها در ۴ سوال ساده، بهترین بازی مناسب گروه‌تان را پیدا کنید!</p>
          </div>
        </div>

        <div className="space-y-6">
          
          {/* Question 1: Number of players */}
          <div>
            <label className="flex items-center gap-2 text-xs font-bold text-amber-400 mb-3">
              <Users className="w-4 h-4" />
              <span>۱. چند نفر قرار هست باهم بازی کنید؟ ({players} نفر)</span>
            </label>
            <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
              {[2, 3, 4, 5, 6, 8, 10].map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPlayers(p)}
                  className={`py-2.5 rounded-xl text-xs font-black transition-all ${
                    players === p
                      ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/30 scale-105'
                      : 'bg-slate-950 border border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  {p} نفر
                </button>
              ))}
            </div>
          </div>

          {/* Question 2: Playtime */}
          <div>
            <label className="flex items-center gap-2 text-xs font-bold text-emerald-400 mb-3">
              <Clock className="w-4 h-4" />
              <span>۲. چقدر فرصت دارید؟ (حداکثر {maxTime} دقیقه)</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { val: 25, label: 'سریع و کوتاه (زیر ۳۰ دقیقه)' },
                { val: 60, label: 'متوسط (۳۰ تا ۶۰ دقیقه)' },
                { val: 120, label: 'طولانی و سنگین (+۶۰ دقیقه)' }
              ].map((t) => (
                <button
                  key={t.val}
                  type="button"
                  onClick={() => setMaxTime(t.val)}
                  className={`py-3 px-2 rounded-xl text-xs font-bold transition-all ${
                    maxTime === t.val
                      ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/30'
                      : 'bg-slate-950 border border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Question 3: Category / Vibe */}
          <div>
            <label className="flex items-center gap-2 text-xs font-bold text-violet-400 mb-3">
              <Sparkles className="w-4 h-4" />
              <span>۳. چه حس و حال و سبکی دوست دارید؟</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {[
                { cat: 'party', label: '🎉 دورهمی و خنده‌دار' },
                { cat: 'strategy', label: '🧩 استراتژیک و فکری' },
                { cat: 'mystery', label: '🕵️ معمایی و نقش مخفی' },
                { cat: 'family', label: '👨‍👩‍👧‍👦 خانوادگی و سبک' },
                { cat: 'card', label: '🃏 کارتی و سریع' },
                { cat: 'two_player', label: '⚔️ دو نفره رقابتی' }
              ].map((item) => (
                <button
                  key={item.cat}
                  type="button"
                  onClick={() => {
                    setCategory(item.cat as GameCategory);
                    setMoodLabel(item.label);
                  }}
                  className={`py-2.5 px-3 rounded-xl text-xs font-bold text-right transition-all flex items-center justify-between ${
                    category === item.cat
                      ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/30'
                      : 'bg-slate-950 border border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <span>{item.label}</span>
                  {category === item.cat && <CheckCircle2 className="w-4 h-4 text-amber-300" />}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Action Buttons */}
        <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleQuickApply}
            className="flex-1 py-3.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs sm:text-sm shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <Dices className="w-4 h-4" />
            <span>مشاهده بازی‌های پیشنهادی در فروشگاه</span>
          </button>

          <button
            onClick={handleAskAi}
            className="py-3.5 px-5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm border border-violet-400/30 flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <Bot className="w-4 h-4 text-amber-300 animate-pulse" />
            <span>تحلیل و پیشنهاد هوش مصنوعی</span>
          </button>
        </div>

      </div>
    </div>
  );
};
