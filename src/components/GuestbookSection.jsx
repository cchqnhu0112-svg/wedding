import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Send, Wand2, Heart, MessageCircleHeart, X, Loader2 } from 'lucide-react';
import { DoodleBadge, FlowerDoodle } from './DoodleSVGs';
import { fetchWishes, submitWish, hasSubmittedRSVP } from '../lib/supabase';

export const GuestbookSection = ({ suggestedWishes }) => {
  const [savedName, setSavedName] = useState(() => hasSubmittedRSVP()?.guestName || '');

  const [wishes, setWishes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [name, setName] = useState(savedName);
  const [message, setMessage] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [error, setError] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync guest name immediately when RSVP is submitted (without needing F5)
  useEffect(() => {
    const handleRsvpSubmitted = (e) => {
      const submittedName = e.detail?.guestName || hasSubmittedRSVP()?.guestName || '';
      if (submittedName) {
        setSavedName(submittedName);
        setName(submittedName);
      }
    };
    window.addEventListener('rsvp-submitted', handleRsvpSubmitted);
    return () => window.removeEventListener('rsvp-submitted', handleRsvpSubmitted);
  }, []);

  // Load real wishes from Supabase on mount
  useEffect(() => {
    const loadWishes = async () => {
      try {
        const data = await fetchWishes();
        const formatted = data.map((w) => ({
          id: w.id,
          name: w.guest_name,
          time: formatTime(w.created_at),
          content: w.message,
        }));
        setWishes(formatted);
      } catch (err) {
        console.error('Failed to load wishes:', err);
      } finally {
        setIsLoading(false);
      }
    };
    loadWishes();
  }, []);

  const formatTime = (isoDate) => {
    const now = new Date();
    const date = new Date(isoDate);
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    if (diffMins < 1) return 'Vừa xong';
    if (diffMins < 60) return `${diffMins} phút trước`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours} giờ trước`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays} ngày trước`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Vui lòng nhập tên của bạn');
      return;
    }
    if (!message.trim()) {
      setError('Vui lòng nhập lời chúc');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      await submitWish({
        guestName: name.trim(),
        message: message.trim(),
      });

      const newWish = {
        id: Date.now(),
        name: name.trim(),
        time: 'Vừa xong',
        content: message.trim()
      };

      setWishes([newWish, ...wishes]);
      setMessage('');
      setIsSent(true);

      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.8 },
          colors: ['#F48FB1', '#FEE387', '#A6CEE3']
        });
      } catch {}

      setTimeout(() => setIsSent(false), 3000);
    } catch (err) {
      console.error('Submit wish error:', err);
      setError('Gửi lời chúc chưa thành công. Vui lòng thử lại!');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSelectSuggestion = (text) => {
    setMessage(text);
    setShowSuggestions(false);
  };

  // Pastel avatar colors
  const avatarColors = ['#F48FB1', '#A6CEE3', '#FEE387', '#9EB05B', '#C4B0E8'];

  return (
    <div className="relative my-6 px-2">
      
      {/* Decorative flower */}
      <div className="absolute -top-3 left-2 transform -rotate-12">
        <FlowerDoodle size={36} petalColor="#FEE387" centerColor="#FFF" />
      </div>

      {/* Header Badge */}
      <div className="text-center mb-2">
        <DoodleBadge color="#9EB05B" textColor="#8B9B4B">
          SỔ LƯU BÚT
        </DoodleBadge>
      </div>

      <p className="text-[#EE6C8D] text-xs text-center leading-relaxed max-w-[280px] mx-auto mb-4 font-normal">
        Cảm ơn bạn đã gửi gắm những yêu thương và lời chúc tốt lành đến hai chúng mình!
      </p>

      {/* Wish submission form */}
      <div className="bg-[#FAF5EB]/95 rounded-2xl p-4 border border-[#EADBBD] shadow-sm max-w-[340px] mx-auto mb-5">
        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          <div>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (error) setError('');
              }}
              placeholder="Tên của bạn *"
              readOnly={!!savedName}
              className={`w-full bg-white/80 border border-[#D9CDB8] focus:border-[#9EB05B] rounded-xl py-2 px-3 outline-none text-[#444] transition-colors ${
                savedName ? 'bg-[#F2F8E8] text-[#8B9B4B] font-semibold cursor-default' : ''
              }`}
            />
          </div>

          <div className="relative">
            <textarea
              rows={3}
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                if (error) setError('');
              }}
              placeholder="Gửi lời chúc đến cô dâu & chú rể... *"
              className="w-full bg-white/80 border border-[#D9CDB8] focus:border-[#9EB05B] rounded-xl py-2 px-3 outline-none text-[#444] transition-colors resize-none"
            />

            {/* Magic Wand 🪄 Suggestion Button */}
            <button
              type="button"
              onClick={() => setShowSuggestions(true)}
              className="absolute right-2 bottom-2 text-[#8B9B4B] hover:text-[#EE6C8D] bg-[#F2EDE2] hover:bg-white px-2 py-1 rounded-lg text-[11px] font-medium flex items-center gap-1 transition-all shadow-xs"
              title="Gợi ý lời chúc hay"
            >
              <Wand2 size={12} />
              <span>Gợi ý</span>
            </button>
          </div>

          {error && <p className="text-red-500 text-[11px]">{error}</p>}
          {isSent && (
            <p className="text-green-600 text-[11px] font-medium flex items-center gap-1">
              <span>✓</span> Cảm ơn bạn! Lời chúc đã được đăng thành công.
            </p>
          )}

          <div className="text-center pt-1">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#9EB05B] hover:bg-[#8CA048] disabled:opacity-60 disabled:cursor-not-allowed text-white font-serif font-bold text-xs tracking-widest uppercase py-2.5 rounded-full shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-1.5"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={13} className="animate-spin" />
                  <span>ĐANG GỬI...</span>
                </>
              ) : (
                <>
                  <Send size={13} />
                  <span>GỬI LỜI CHÚC</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Suggested Wishes Modal / Popover */}
      {showSuggestions && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in"
          onClick={() => setShowSuggestions(false)}
        >
          <div
            className="bg-[#FAF5EB] rounded-2xl max-w-sm w-full p-5 border-2 border-[#EADBBD] shadow-2xl relative animate-scale-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#EEDBCA] mb-3">
              <span className="font-serif text-[#EE6C8D] font-bold text-sm flex items-center gap-1.5">
                <Wand2 size={15} className="text-[#8B9B4B]" />
                <span>✨ Lời chúc gợi ý cho bạn</span>
              </span>
              <button
                onClick={() => setShowSuggestions(false)}
                className="w-7 h-7 rounded-full bg-white/70 text-gray-500 hover:text-black flex items-center justify-center"
              >
                <X size={15} />
              </button>
            </div>

            <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
              {suggestedWishes.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => handleSelectSuggestion(item)}
                  className="bg-white/80 hover:bg-[#F2F8E8] border border-[#E0D5C1] rounded-xl p-2.5 text-xs text-[#555] cursor-pointer transition-colors text-left"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Wishes list */}
      <div className="space-y-2.5 max-h-80 overflow-y-auto pr-1 max-w-[340px] mx-auto">
        {isLoading ? (
          <div className="text-center py-6 text-xs text-[#A59483] flex items-center justify-center gap-2">
            <Loader2 size={14} className="animate-spin text-[#9EB05B]" />
            <span>Đang tải lời chúc...</span>
          </div>
        ) : wishes.length === 0 ? (
          <div className="bg-white/60 rounded-2xl p-4 border border-[#EADBBD] text-center text-xs text-[#8A7968] italic">
            Chưa có lời chúc nào. Hãy là người đầu tiên gửi lời chúc đến cô dâu chú rể nhé! 💕
          </div>
        ) : (
          wishes.map((item, index) => {
            const color = avatarColors[index % avatarColors.length];
            const initial = item.name ? item.name.trim().charAt(0).toUpperCase() : '♥';

            return (
              <div
                key={item.id}
                className="bg-white/70 rounded-2xl p-3 border border-[#EADBBD] shadow-2xs text-left text-xs transition-all hover:bg-white"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-6 h-6 rounded-full flex items-center justify-center font-bold text-white text-[10px] shadow-2xs"
                      style={{ backgroundColor: color }}
                    >
                      {initial}
                    </span>
                    <span className="font-semibold text-[#444] text-xs">
                      {item.name}
                    </span>
                  </div>
                  <span className="text-[10px] text-[#A59483]">{item.time}</span>
                </div>
                <p className="text-[#666] leading-relaxed pl-8 text-xs font-normal">
                  {item.content}
                </p>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
