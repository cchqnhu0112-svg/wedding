import React, { useState, useEffect } from 'react';
import { Columns, Smartphone, Share2, Check, Mail } from 'lucide-react';
import { weddingData } from '../weddingData';

export const TopBar = ({
  viewMode,
  setViewMode,
  onReopenEnvelope
}) => {
  const [copied, setCopied] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Countdown to 26.12.2026 08:30:00
  useEffect(() => {
    const targetDate = new Date('2026-12-26T08:30:00').getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${weddingData.groom.shortName} & ${weddingData.bride.shortName} — Thiệp Cưới Online`,
        text: 'Trân trọng kính mời quý khách đến chung vui cùng gia đình chúng mình!',
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF5EB]/90 backdrop-blur-md border-b border-[#EADBBD] px-4 py-2.5 shadow-2xs transition-all">
      <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
        
        {/* Brand / Couple Logo */}
        <div className="flex items-center gap-2">
          <span className="font-serif text-[#EE6C8D] font-bold text-base tracking-wider">
            {weddingData.groom.shortName} & {weddingData.bride.shortName}
          </span>
          <span className="text-[#A59483] font-serif text-[11px] hidden sm:inline">
            | {weddingData.displayDate}
          </span>
        </div>

        {/* Live Countdown Badge */}
        <div className="hidden md:flex items-center gap-1.5 bg-white/70 px-3 py-1 rounded-full border border-[#E8DEC8] text-[#7A5B64] font-serif">
          <span className="text-[11px] text-[#8B9B4B] font-semibold">⏳ Đếm ngược:</span>
          <span className="font-bold text-[#EE6C8D]">{timeLeft.days}</span>
          <span className="text-[10px] text-[#999]">ngày</span>
          <span className="font-bold text-[#EE6C8D]">{timeLeft.hours}</span>
          <span className="text-[10px] text-[#999]">giờ</span>
          <span className="font-bold text-[#EE6C8D]">{timeLeft.minutes}</span>
          <span className="text-[10px] text-[#999]">phút</span>
          <span className="font-bold text-[#EE6C8D]">{timeLeft.seconds}</span>
          <span className="text-[10px] text-[#999]">giây</span>
        </div>

        {/* Control Buttons */}
        <div className="flex items-center gap-2">
          
          {/* Re-open envelope button */}
          <button
            onClick={onReopenEnvelope}
            className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/80 hover:bg-white text-[#7A5B64] border border-[#E8DEC8] transition-all text-[11px] font-medium"
            title="Mở lại phong bao thư"
          >
            <Mail size={13} className="text-[#EE6C8D]" />
            <span className="hidden sm:inline">Phong bao</span>
          </button>

          {/* View Mode Switcher */}
          <div className="flex items-center bg-white/80 rounded-full p-0.5 border border-[#E8DEC8]">
            <button
              onClick={() => setViewMode('dual')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-full transition-all text-[11px] font-medium ${
                viewMode === 'dual'
                  ? 'bg-[#9EB05B] text-white shadow-2xs'
                  : 'text-[#7A5B64] hover:text-black'
              }`}
              title="Xem 2 cột như ảnh mẫu"
            >
              <Columns size={13} />
              <span className="hidden sm:inline">Bản 2 cột</span>
            </button>

            <button
              onClick={() => setViewMode('mobile')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-full transition-all text-[11px] font-medium ${
                viewMode === 'mobile'
                  ? 'bg-[#9EB05B] text-white shadow-2xs'
                  : 'text-[#7A5B64] hover:text-black'
              }`}
              title="Xem dạng cuộn trên điện thoại"
            >
              <Smartphone size={13} />
              <span className="hidden sm:inline">Bản di động</span>
            </button>
          </div>

          {/* Share / Copy Link */}
          <button
            onClick={handleShare}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-white/80 hover:bg-white text-[#7A5B64] border border-[#E8DEC8] transition-colors shadow-2xs"
            title="Sao chép link thiệp cưới"
          >
            {copied ? (
              <>
                <Check size={13} className="text-green-600" />
                <span className="text-[11px] text-green-600 font-medium hidden sm:inline">
                  Đã sao chép!
                </span>
              </>
            ) : (
              <>
                <Share2 size={13} />
                <span className="text-[11px] hidden sm:inline">Chia sẻ</span>
              </>
            )}
          </button>
        </div>

      </div>
    </header>
  );
};
