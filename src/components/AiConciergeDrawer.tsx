import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  Send, 
  X, 
  Sparkles, 
  User, 
  Dices, 
  HelpCircle,
  ShoppingBag,
  RefreshCw,
  Loader2
} from 'lucide-react';
import { BoardGame, ChatMessage } from '../types';

interface AiConciergeDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  initialPrompt?: string;
  onSelectGame: (game: BoardGame) => void;
}

export const AiConciergeDrawer: React.FC<AiConciergeDrawerProps> = ({
  isOpen,
  onClose,
  initialPrompt = '',
  onSelectGame
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'ai',
      text: 'سلام! من «هوش مصنوعی بازی‌تو» هستم 🎲🤖\nمی‌تونم بهت کمک کنم بهترین بردگیم رو انتخاب کنی، قوانین بازی‌ها رو دقیق یاد بگیری یا راهنمای بازی برای مهمونی امشبت بگیری. چطور می‌تونم راهنماییت کنم؟',
      timestamp: 'هم‌اکنون'
    }
  ]);
  const [inputPrompt, setInputPrompt] = useState(initialPrompt);
  const [loading, setLoading] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialPrompt && isOpen) {
      handleSendMessage(initialPrompt);
    }
  }, [initialPrompt, isOpen]);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  if (!isOpen) return null;

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputPrompt).trim();
    if (!query || loading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputPrompt('');
    setLoading(true);

    try {
      const res = await fetch('/api/gemini/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: query })
      });
      const data = await res.json();

      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: data.text || 'متاسفانه پاسخی دریافت نشد.',
        timestamp: new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' }),
        recommendedGames: data.recommendedGames
      };

      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'ai',
          text: 'خطا در ارتباط با سرور هوش مصنوعی. لطفاً دوباره تلاش کنید.',
          timestamp: 'هم‌اکنون'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-start bg-slate-950/80 backdrop-blur-sm">
      <div className="bg-slate-900 border-l border-slate-800 w-full max-w-lg h-full flex flex-col shadow-2xl relative animate-in slide-in-from-right duration-300">
        
        {/* Top Header */}
        <div className="bg-slate-950 p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-violet-600 to-indigo-600 flex items-center justify-center text-amber-300 shadow-md">
              <Bot className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h3 className="text-sm font-black text-white flex items-center gap-1.5">
                <span>هوش مصنوعی بازی‌تو</span>
                <span className="bg-emerald-500/20 text-emerald-400 text-[10px] px-1.5 py-0.2 rounded font-mono">Online</span>
              </h3>
              <p className="text-[10px] text-slate-400">راهنمای هوشمند قوانین و پیشنهاد بردگیم</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Suggestion Chips */}
        <div className="p-2.5 bg-slate-950/50 border-b border-slate-800/80 flex gap-2 overflow-x-auto text-[11px]">
          <button
            onClick={() => handleSendMessage('برای ۶ نفر در یک مهمانی ۱ ساعته چی بازی کنیم؟')}
            className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 shrink-0 border border-slate-700"
          >
            🎲 پیشنهاد مهمونی ۶ نفره
          </button>
          <button
            onClick={() => handleSendMessage('قوانین و راهنمای بازی کودتا (Coup) رو برام بگو')}
            className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-emerald-300 shrink-0 border border-slate-700"
          >
            📜 قانون بازی کودتا
          </button>
          <button
            onClick={() => handleSendMessage('بهترین بازی ۲ نفره فکری و استراتژیک چیست؟')}
            className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-violet-300 shrink-0 border border-slate-700"
          >
            ⚔️ بازی ۲ نفره فکری
          </button>
        </div>

        {/* Messages List */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
            >
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                msg.sender === 'user' ? 'bg-amber-500 text-slate-950' : 'bg-violet-600 text-white'
              }`}>
                {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div className={`max-w-[82%] space-y-2`}>
                <div className={`p-3.5 rounded-2xl text-xs leading-relaxed whitespace-pre-wrap ${
                  msg.sender === 'user'
                    ? 'bg-amber-500/20 text-amber-100 border border-amber-500/30 rounded-tr-none'
                    : 'bg-slate-800 text-slate-200 border border-slate-700/80 rounded-tl-none'
                }`}>
                  {msg.text}
                </div>

                {/* Recommended Games Cards inside Chat */}
                {msg.recommendedGames && msg.recommendedGames.length > 0 && (
                  <div className="space-y-2 pt-1">
                    <p className="text-[10px] font-bold text-amber-400">بازی‌های پیشنهادی هوش مصنوعی:</p>
                    <div className="grid grid-cols-1 gap-2">
                      {msg.recommendedGames.map(game => (
                        <div
                          key={game.id}
                          onClick={() => onSelectGame(game)}
                          className="bg-slate-950 border border-slate-800 p-2.5 rounded-xl flex items-center justify-between hover:border-amber-500/50 cursor-pointer transition-all"
                        >
                          <div className="flex items-center gap-2.5">
                            <img src={game.imageUrl} alt={game.titleFa} className="w-10 h-10 rounded-lg object-cover" />
                            <div>
                              <h4 className="text-xs font-bold text-white">{game.titleFa}</h4>
                              <p className="text-[10px] text-slate-400">{game.minPlayers}-{game.maxPlayers} نفر | {game.priceToman.toLocaleString()} تومان</p>
                            </div>
                          </div>
                          <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 px-2 py-1 rounded">مشاهده</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <span className="text-[9px] text-slate-500 block text-left font-mono">
                  {msg.timestamp}
                </span>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-3 text-xs text-violet-400 p-3 bg-slate-800/50 rounded-2xl border border-slate-800 w-fit">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>هوش مصنوعی بازی‌تو در حال تحلیل آرشیو بردگیم‌ها...</span>
            </div>
          )}

          <div ref={chatBottomRef} />
        </div>

        {/* Input Box */}
        <div className="p-3 bg-slate-950 border-t border-slate-800">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputPrompt}
              onChange={(e) => setInputPrompt(e.target.value)}
              placeholder="مثلا: برای ۴ نفر بازی استراتژیک چی داری؟"
              className="flex-1 bg-slate-900 border border-slate-800 text-xs text-white rounded-xl px-3.5 py-3 focus:outline-none focus:border-violet-500 placeholder-slate-500"
            />
            <button
              type="submit"
              disabled={loading || !inputPrompt.trim()}
              className="p-3 rounded-xl bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white shadow-lg shadow-violet-600/30 transition-all cursor-pointer"
            >
              <Send className="w-4 h-4 rotate-180" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};
