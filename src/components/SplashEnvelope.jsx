import React, { useState } from 'react';
import { Heart, MailOpen, Sparkles } from 'lucide-react';
import { FlowerDoodle, RibbonBow } from './DoodleSVGs';

export const SplashEnvelope = ({ isOpen, onOpen, data }) => {
  const [isOpening, setIsOpening] = useState(false);

  if (!isOpen) return null;

  const handleOpenClick = () => {
    setIsOpening(true);
    setTimeout(() => {
      onOpen();
    }, 700);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/65 backdrop-blur-md transition-opacity duration-700 ${
        isOpening ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Outer Card with Blue & White Vertical Stripes (Giống hình thứ 2) */}
      <div
        className={`relative w-full max-w-[400px] p-3.5 sm:p-4 bg-striped-blue rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-700 ${
          isOpening ? 'scale-110 -translate-y-8' : 'scale-100'
        }`}
      >
        {/* Scalloped teeth on top and bottom */}
        <div className="scallop-row-top" />

        {/* Inner Warm Cream/Yellow Card (Nền vàng nhạt nằm trên khung sọc) */}
        <div className="bg-[#FAF4EB] rounded-2xl p-5 sm:p-6 text-center relative border border-[#D5C2E8] shadow-inner overflow-hidden">
          
          {/* Decorative SVG Wavy Doodle Border (Giống nét uốn lượn hình thứ 2) */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
            viewBox="0 0 340 460"
            preserveAspectRatio="none"
          >
            <path
              d="M 16,16 
                 Q 36,12 56,16 Q 76,20 96,16 Q 116,12 136,16 Q 156,20 176,16 Q 196,12 216,16 Q 236,20 256,16 Q 276,12 296,16 Q 316,20 324,16
                 Q 328,36 324,56 Q 320,76 324,96 Q 328,116 324,136 Q 320,156 324,176 Q 328,196 324,216 Q 320,236 324,256 Q 328,276 324,296 Q 320,316 324,336 Q 328,356 324,376 Q 320,396 324,416 Q 328,436 324,444
                 Q 304,448 284,444 Q 264,440 244,444 Q 224,448 204,444 Q 184,440 164,444 Q 144,448 124,444 Q 104,440 84,444 Q 64,448 44,444 Q 24,440 16,444
                 Q 12,424 16,404 Q 20,384 16,364 Q 12,344 16,324 Q 20,304 16,284 Q 12,264 16,244 Q 20,224 16,204 Q 12,184 16,164 Q 20,144 16,124 Q 12,104 16,84 Q 20,64 16,44 Q 12,24 16,16 Z"
              fill="none"
              stroke="#8EB8E5"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.85"
            />
          </svg>

          {/* Decorative corner flowers */}
          <div className="absolute top-3 left-3 transform -rotate-12 z-10">
            <FlowerDoodle size={34} petalColor="#FEE387" centerColor="#FFF" />
          </div>
          <div className="absolute top-3 right-3 transform rotate-12 z-10">
            <FlowerDoodle size={36} petalColor="#F48FB1" centerColor="#FFF" />
          </div>

          {/* Vintage Seal Stamp */}
          <div className="relative z-10 w-16 h-16 sm:w-18 sm:h-18 mx-auto rounded-full bg-[#FAF0E6] border-2 border-dashed border-[#EE6C8D] flex items-center justify-center shadow-inner mb-3 mt-1">
            <Heart size={30} className="text-[#EE6C8D] fill-[#EE6C8D] animate-pulse" />
            <div className="absolute -top-3 -right-2">
              <RibbonBow size={36} color="#A6CEE3" />
            </div>
          </div>

          {/* Header Subtitle */}
          <div className="relative z-10">
            <span className="font-serif text-[#8F9F52] text-xs uppercase tracking-widest block mb-1 font-bold">
              LỄ VU QUY
            </span>

            {/* 1. Tên cô dâu chú rể nằm trên CÙNG MỘT DÒNG */}
            <h1 className="font-serif text-lg sm:text-xl md:text-2xl font-bold text-[#EE6C8D] tracking-wide whitespace-nowrap overflow-hidden text-ellipsis mb-2">
              {data.groom.shortName} & {data.bride.shortName}
            </h1>

            {/* 2. Ngày 26/12/2026 cho TO LÊN, BỎ chữ Thân Mời */}
            <div className="my-2.5 flex items-center justify-center gap-2 text-[#8B9B4B]">
              <span className="text-xs text-[#EE6C8D]">❦</span>
              <span className="font-serif text-lg sm:text-xl font-bold tracking-widest">
                26/12/2026
              </span>
              <span className="text-xs text-[#EE6C8D]">❦</span>
            </div>

            {/* Lời mời */}
            <p className="text-xs text-[#7A5B64] leading-relaxed max-w-[270px] mx-auto mb-5 italic">
              Trân trọng kính mời quý khách đến chung vui cùng gia đình chúng tôi trong ngày trọng đại!
            </p>

            {/* Nút bấm Mở thiệp */}
            <button
              onClick={handleOpenClick}
              className="relative inline-flex items-center justify-center gap-2 px-7 py-2.5 sm:py-3 rounded-full bg-[#9EB05B] hover:bg-[#8CA048] active:scale-95 text-white font-serif font-bold text-xs sm:text-sm tracking-widest uppercase shadow-md hover:shadow-lg transition-all duration-300 group"
            >
              <MailOpen size={15} className="transition-transform group-hover:-translate-y-0.5" />
              <span>MỞ THIỆP CƯỚI</span>
              <Sparkles size={13} className="text-[#FEE387] animate-spin-slow" />
            </button>

            {/* Bottom flower doodles */}
            <div className="flex justify-center gap-3.5 mt-4 opacity-75">
              <FlowerDoodle size={22} petalColor="#A6CEE3" centerColor="#FFF" />
              <FlowerDoodle size={22} petalColor="#FEE387" centerColor="#FFF" />
              <FlowerDoodle size={22} petalColor="#9EB05B" centerColor="#FFF" />
            </div>
          </div>
        </div>

        {/* Scalloped teeth on bottom */}
        <div className="scallop-row-bottom" />
      </div>
    </div>
  );
};
