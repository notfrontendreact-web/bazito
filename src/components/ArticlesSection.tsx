import React from 'react';
import { BookOpen, Clock, ArrowLeft, Sparkles } from 'lucide-react';
import { BlogArticle } from '../types';

interface ArticlesSectionProps {
  articles: BlogArticle[];
  onSelectArticle?: (art: BlogArticle) => void;
}

export const ArticlesSection: React.FC<ArticlesSectionProps> = ({
  articles,
  onSelectArticle
}) => {
  return (
    <section className="py-12 bg-slate-900/60 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold mb-2">
              <BookOpen className="w-3.5 h-3.5" />
              <span>مجله آموزشی و نقد و بررسی بازی‌تو</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">آموزش قوانین، استراتژی‌ها و نقد تخصصی بردگیم‌ها</h2>
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.map(art => (
            <div
              key={art.id}
              onClick={() => onSelectArticle && onSelectArticle(art)}
              className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-amber-500/40 transition-all shadow-lg cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[16/9] bg-slate-950 overflow-hidden">
                  <img
                    src={art.imageUrl}
                    alt={art.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 right-3 bg-slate-950/80 backdrop-blur-md text-amber-300 text-[10px] font-bold px-2.5 py-1 rounded-md border border-amber-500/30">
                    {art.category}
                  </span>
                </div>

                <div className="p-4 space-y-2">
                  <div className="flex items-center gap-2 text-[11px] text-slate-400">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    <span>زمان مطالعه: {art.readTime}</span>
                    <span>•</span>
                    <span>{art.date}</span>
                  </div>

                  <h3 className="text-sm font-black text-white group-hover:text-amber-400 transition-colors line-clamp-2 leading-snug">
                    {art.title}
                  </h3>

                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {art.summary}
                  </p>
                </div>
              </div>

              <div className="p-4 pt-0 flex items-center justify-between text-xs font-bold text-amber-400">
                <span>ادامه مطلب و مطالعه</span>
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
