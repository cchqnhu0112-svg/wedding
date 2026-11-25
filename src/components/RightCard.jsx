import React from 'react';
import {
  DoodleBadge,
  FlowerDoodle,
  SketchyArrow,
  WavyDivider,
  RibbonBow
} from './DoodleSVGs';
import { GallerySection } from './GallerySection';
import { GuestbookSection } from './GuestbookSection';
import { weddingData } from '../weddingData';
import { Gift, CalendarCheck, Clock } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

export const RightCard = ({ onOpenRSVP, onOpenGiftBox }) => {
  return (
    <div className="wedding-column w-full max-w-[390px] mx-auto bg-[#FBF7EE] text-[#555] rounded-3xl shadow-2xl overflow-hidden border border-[#F0E6D2] flex flex-col p-4 md:p-5 relative transition-all duration-300">
      
      {/* ================= 1. TIMING & TIMELINE ("ВО СКОЛЬКО?") ================= */}
      <div className="relative text-center my-3 px-2">
        {/* Pastel blue ribbon stream */}
        <div className="absolute -top-3 -left-3 w-16 h-28 border-t-8 border-l-8 border-[#A6CEE3] rounded-tl-full opacity-80 pointer-events-none -rotate-12" />

        {/* Pink ribbon loop */}
        <div className="absolute top-12 left-1 w-8 h-8 rounded-full border-2 border-[#F48FB1] opacity-75 pointer-events-none -rotate-45" />

        {/* Pastel blue flower doodle on right (như hình số 2) */}
        <div className="absolute top-1 right-1 transform rotate-12 pointer-events-none animate-swing">
          <FlowerDoodle size={44} petalColor="#A6CEE3" centerColor="#FFF" />
        </div>

        {/* Curved pink ribbon wave on right (như hình số 2) */}
        <div className="absolute top-20 -right-1 w-3.5 h-28 bg-[#F48FB1]/75 rounded-full transform -rotate-12 pointer-events-none" />

        {/* Header Badge */}
        <ScrollReveal variant="down" delay={100} className="relative z-10 mb-5">
          <DoodleBadge color="#9EB05B" textColor="#8B9B4B">
            LỊCH TRÌNH LỄ VU QUY
          </DoodleBadge>
        </ScrollReveal>

        {/* (Đã bỏ ô nội dung hôn lễ thánh đường theo yêu cầu) */}

        {/* Timeline Items - Bố cục nội dung giữ nguyên, font số đồng bộ với font chữ */}
        <div className="space-y-4 relative z-10 text-left max-w-[310px] mx-auto pl-2 border-l-2 border-dashed border-[#A6CEE3] my-4">
          {weddingData.timeline.map((item, idx) => (
            <ScrollReveal
              key={idx}
              variant={idx % 2 === 0 ? 'left' : 'right'}
              delay={idx * 110}
              className="relative pl-4 group"
            >
              {/* Dot icon */}
              <div className="absolute -left-[21px] top-1 w-3.5 h-3.5 rounded-full bg-[#A6CEE3] border-2 border-white shadow-xs group-hover:scale-125 transition-transform" />
              <div className="flex items-baseline gap-2">
                {/* Font số đồng bộ hoàn toàn với font chữ */}
                <span className="font-sans font-bold text-sm tracking-wide text-[#84ACCE]">
                  {item.time}
                </span>
                <span className="font-sans font-bold text-xs text-[#333]">
                  {item.label}
                </span>
              </div>
              {item.line1 && item.line2 ? (
                <div className="text-[11px] text-[#6B5A4B] leading-relaxed mt-0.5 font-sans">
                  <p>{item.line1}</p>
                  <p className="whitespace-nowrap">{item.line2}</p>
                </div>
              ) : (
                <p className="text-[11px] text-[#6B5A4B] leading-relaxed mt-0.5 font-sans">
                  {item.desc}
                </p>
              )}
            </ScrollReveal>
          ))}
        </div>

        {/* Flowing Yellow Banner ribbon */}
        <div className="w-full h-3.5 bg-[#FEE99A]/60 rounded-full my-4 transform -rotate-1" />
      </div>

      {/* ================= 2. XÁC NHẬN THAM DỰ (RSVP CTA) ================= */}
      <ScrollReveal variant="up" delay={100} className="relative text-center my-3 px-2">
        <div className="relative z-10 mb-2">
          <DoodleBadge color="#9EB05B" textColor="#8B9B4B">
            XÁC NHẬN THAM DỰ
          </DoodleBadge>
        </div>

        <p className="text-[#EE6C8D] text-[11.5px] sm:text-xs leading-relaxed max-w-[340px] mx-auto mb-3 font-normal">
          Để chuẩn bị đón tiếp quý khách một cách chu đáo nhất,
          <br />
          xin vui lòng xác nhận tham dự trước ngày{' '}
          <span className="font-bold text-[#B82D55] bg-[#FEE99A] px-1.5 py-0.5 rounded shadow-2xs inline-block">
            12.12.2026
          </span>.
        </p>

        <button
          onClick={onOpenRSVP}
          className="bg-[#9EB05B] hover:bg-[#8CA048] text-white font-serif font-bold text-xs tracking-widest uppercase px-8 py-3 rounded-full shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 mx-auto active:scale-95 animate-pulse-soft"
        >
          <CalendarCheck size={15} />
          <span>XÁC NHẬN THAM DỰ (RSVP)</span>
        </button>
      </ScrollReveal>

      {/* ================= 3. ALBUM ẢNH CƯỚI ================= */}
      <ScrollReveal variant="up" delay={100}>
        <GallerySection photos={weddingData.gallery} />
      </ScrollReveal>

      {/* ================= 4. HỘP QUÀ MỪNG (GIFT BOX CTA) ================= */}
      <ScrollReveal variant="bounce" delay={100} className="relative text-center my-4 px-2">
        {/* Soft green flower on right */}
        <div className="absolute -top-1 right-2 transform rotate-15 animate-swing">
          <FlowerDoodle size={42} petalColor="#A5B868" centerColor="#FFF" />
        </div>

        {/* Small pink flower on left */}
        <div className="absolute top-8 left-1 transform -rotate-12 animate-swing-slow">
          <FlowerDoodle size={28} petalColor="#F48FB1" centerColor="#FFF" />
        </div>

        <div className="relative z-10 mb-0">
          <DoodleBadge color="#9EB05B" textColor="#8B9B4B">
            HỘP QUÀ MỪNG
          </DoodleBadge>
        </div>

        <div className="flex justify-end pr-8 -my-2">
          <SketchyArrow color="#EE6C8D" direction="curve-left" />
        </div>

        <p className="text-[#EE6C8D] text-[10.5px] leading-relaxed px-3 font-normal max-w-[340px] mx-auto mb-3">
          Những lời chúc phúc và tấm lòng yêu thương của quý khách là món quà ý nghĩa nhất, chắp cánh cho hành trình hạnh phúc phía trước của chúng mình.
        </p>

        <button
          onClick={onOpenGiftBox}
          className="inline-flex items-center gap-2 px-7 py-2.5 rounded-full bg-[#FAF0E6] hover:bg-[#FCE6EE] text-[#EE6C8D] border-2 border-[#EE6C8D] font-serif font-bold text-xs tracking-wider uppercase transition-all shadow-xs hover:shadow-md"
        >
          <Gift size={15} />
          <span>Mở hộp mừng cưới</span>
        </button>

        <div className="w-4/5 mx-auto h-2.5 bg-[#FDE596]/50 rounded-full mt-4 transform rotate-1" />
      </ScrollReveal>

      {/* ================= 5. SỔ LƯU BÚT ================= */}
      <ScrollReveal variant="up" delay={100}>
        <GuestbookSection
          initialWishes={weddingData.initialWishes}
          suggestedWishes={weddingData.suggestedWishes}
        />
      </ScrollReveal>

      {/* ================= 6. LIÊN HỆ ĐIỀU PHỐI VIÊN ================= */}
      <ScrollReveal variant="up" delay={100} className="relative text-center my-4 px-2">
        {/* Yellow flower on left */}
        <div className="absolute top-2 left-2 transform -rotate-12 animate-swing">
          <FlowerDoodle size={36} petalColor="#FEE387" centerColor="#FFF" />
        </div>

        <div className="relative z-10 mb-2">
          <DoodleBadge color="#9EB05B" textColor="#8B9B4B">
            CÓ CÂU HỎI?
          </DoodleBadge>
        </div>

        <p className="text-[#EE6C8D] text-[10.5px] sm:text-[11.5px] leading-relaxed mb-1 font-normal whitespace-nowrap tracking-tight">
          Mọi thắc mắc về lễ cưới và tiệc mừng, xin vui lòng liên hệ:
        </p>

        <a
          href="tel:0812947494"
          className="font-sans text-[#84ACCE] hover:text-[#6B96B8] text-lg sm:text-xl font-bold tracking-wider inline-block mb-0.5 transition-colors"
        >
          0812.947.494
        </a>

        <div className="text-[#8B9B4B] text-xs">
          <div className="font-semibold">Cô dâu Quỳnh Như</div>
        </div>

        <div className="my-2">
          <WavyDivider color="#9FD4EE" />
        </div>
      </ScrollReveal>

      {/* ================= 7. CLOSING ("С НЕТЕРПЕНИЕМ ЖДЕМ ВАС!") ================= */}
      <ScrollReveal variant="bounce" delay={100} className="relative text-center my-3 mb-5 px-2">
        <DoodleBadge
          color="#9EB05B"
          textColor="#EE6C8D"
          className="py-1 px-6 sm:px-7 max-w-full"
          textClassName="whitespace-nowrap text-[9.5px] sm:text-[10px] tracking-wider font-bold"
        >
          RẤT MONG ĐƯỢC ĐÓN TIẾP BẠN!
        </DoodleBadge>
        <p className="text-[10px] sm:text-[11px] text-[#8A7968] italic mt-1 whitespace-nowrap tracking-tight">
          Sự hiện diện của quý khách là niềm vinh hạnh của gia đình chúng mình!
        </p>
      </ScrollReveal>

    </div>
  );
};
