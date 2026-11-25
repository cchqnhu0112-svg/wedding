import React from 'react';
import {
  FlowerDoodle,
  RibbonBow,
  SketchyArrow
} from './DoodleSVGs';
import { weddingData } from '../weddingData';
import { ScrollReveal } from './ScrollReveal';

export const LeftCard = ({
  onOpenMap,
  couplePhoto,
  onChangePhoto
}) => {
  return (
    <div className="wedding-column w-full max-w-[390px] mx-auto bg-[#FBF7EE] text-[#555] rounded-3xl shadow-2xl overflow-hidden border border-[#F0E6D2] flex flex-col p-4 md:p-5 relative transition-all duration-300">
      
      {/* ================= 1. HERO STRIPED CARD (SAVE THE DATE) ================= */}
      <div className="relative w-full rounded-3xl overflow-hidden shadow-xs mb-5">
        <div className="p-3.5 sm:p-4.5 bg-striped-blue rounded-3xl relative">
          <div className="scallop-row-top" />

          {/* Inner Card (Nền vàng nhạt trên khung sọc, giống hình số 02) */}
          <div className="bg-[#FAF4EB] rounded-2xl px-3 py-5 sm:px-4 sm:py-6 text-center relative border border-[#D5C2E8] shadow-inner overflow-hidden">
            
            {/* Hand-drawn Wavy Doodle Border */}
            <svg
              className="absolute inset-1.5 w-[calc(100%-12px)] h-[calc(100%-12px)] pointer-events-none overflow-visible"
              viewBox="0 0 320 440"
              preserveAspectRatio="none"
            >
              <path
                d="M 16,16 
                   Q 36,12 56,16 Q 76,20 96,16 Q 116,12 136,16 Q 156,20 176,16 Q 196,12 216,16 Q 236,20 256,16 Q 276,12 296,16 Q 306,20 304,16
                   Q 308,36 304,56 Q 300,76 304,96 Q 308,116 304,136 Q 300,156 304,176 Q 308,196 304,216 Q 300,236 304,256 Q 308,276 304,296 Q 300,316 304,336 Q 308,356 304,376 Q 300,396 304,424
                   Q 284,428 264,424 Q 244,420 224,424 Q 204,428 184,424 Q 164,420 144,424 Q 124,428 104,424 Q 84,420 64,424 Q 44,428 24,424 Q 16,420 16,424
                   Q 12,404 16,384 Q 20,364 16,344 Q 12,324 16,304 Q 20,284 16,264 Q 12,244 16,224 Q 20,204 16,184 Q 12,164 16,144 Q 20,124 16,104 Q 12,84 16,64 Q 20,44 16,24 Q 12,16 16,16 Z"
                fill="none"
                stroke="#8EB8E5"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.85"
              />
            </svg>

            <div className="relative z-10">
              <ScrollReveal variant="down" delay={100}>
                <span className="font-serif text-[#8F9F52] text-xs font-bold tracking-widest uppercase block mb-1">
                  SAVE THE DATE
                </span>

                <h1 className="font-serif text-[#EE6C8D] font-bold text-base sm:text-lg md:text-xl tracking-wider uppercase leading-tight mb-1">
                  TRÂN TRỌNG BÁO TIN
                </h1>

                {/* LỄ VU QUY CỦA CHÚNG MÌNH */}
                <p className="text-[#8F9F52] text-xs font-bold tracking-widest uppercase mb-3">
                  LỄ VU QUY CỦA CHÚNG MÌNH
                </p>
              </ScrollReveal>

              {/* Couple Row: Balanced layout with comfortable room inside frame */}
              <div className="relative w-full flex items-center justify-between px-1 sm:px-1.5 my-2 gap-1">
                {/* Groom */}
                <ScrollReveal variant="left" delay={250} className="flex-1 text-center pr-0.5 sm:pr-1.5 z-10 flex flex-col items-center justify-center min-w-0">
                  <span className="font-serif text-[#EE6C8D] font-bold text-[11px] sm:text-[13px] tracking-normal sm:tracking-wide whitespace-nowrap block">
                    {weddingData.groom.shortName}
                  </span>
                  <span className="font-serif text-[9px] sm:text-[10px] text-[#8F9F52] font-semibold mt-0.5 tracking-wider whitespace-nowrap block">
                    (Thứ nam)
                  </span>
                </ScrollReveal>

                {/* Center Couple Photo with pink heart shape background */}
                <ScrollReveal
                  variant="bounce"
                  delay={350}
                  className="relative mx-auto my-1 flex-shrink-0 group cursor-pointer"
                >
                  <div
                    onClick={onChangePhoto}
                    title="Nhấn để đổi ảnh cưới"
                  >
                    <div className="relative w-[88px] h-[130px] sm:w-[98px] sm:h-[146px] flex items-center justify-center p-1 transition-transform duration-300 group-hover:scale-[1.03]">
                      {/* Pink heart/card shape backdrop */}
                      <div className="absolute inset-0 bg-[#F6A5BD] rounded-2xl sm:rounded-3xl opacity-90 shadow-md transform -rotate-1" />

                      {/* Photo frame */}
                      <div className="relative w-full h-full rounded-xl sm:rounded-2xl overflow-hidden bg-[#FAECEF] border-2 border-white/80 shadow-inner">
                        <img
                          src={couplePhoto || "/couple.jpg"}
                          alt="Thanh Sơn & Quỳnh Như"
                          className="w-full h-full object-cover object-top filter contrast-[1.03]"
                          onError={(e) => {
                            e.target.src = "/original_design.jpg";
                          }}
                        />
                        {/* Hover overlay hint */}
                        <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white text-[10px] font-medium text-center p-1">
                          <span className="text-xs mb-0.5">📷</span>
                          <span>Đổi ảnh</span>
                        </div>
                      </div>

                      {/* White Ribbon Bow on top-left */}
                      <div className="absolute -top-2.5 -left-2.5 transform -rotate-12 drop-shadow-xs z-10 animate-swing">
                        <RibbonBow size={28} color="#FFFFFF" />
                      </div>
                    </div>
                  </div>
                </ScrollReveal>

                {/* Bride */}
                <ScrollReveal variant="right" delay={250} className="flex-1 text-center pl-0.5 sm:pl-1.5 z-10 flex flex-col items-center justify-center min-w-0">
                  <span className="font-serif text-[#EE6C8D] font-bold text-[11px] sm:text-[13px] tracking-normal sm:tracking-wide whitespace-nowrap block">
                    {weddingData.bride.shortName}
                  </span>
                  <span className="font-serif text-[9px] sm:text-[10px] text-[#8F9F52] font-semibold mt-0.5 tracking-wider whitespace-nowrap block">
                    (Út nữ)
                  </span>
                </ScrollReveal>
              </div>

              {/* Dưới chân tấm hình chèn thêm ngày 26.12.2026 */}
              <ScrollReveal variant="up" delay={450} className="mt-2 text-center">
                <span className="font-sans text-[#8B9B4B] font-bold text-sm sm:text-base tracking-widest block">
                  26.12.2026
                </span>
              </ScrollReveal>
            </div>
          </div>

          <div className="scallop-row-bottom" />
        </div>
      </div>

      {/* ================= 2. THÔNG TIN BUỔI LỄ (OUTLINE THEO YÊU CẦU + STYLE HÌNH SỐ 2) ================= */}
      <div className="relative w-full rounded-3xl overflow-hidden my-3 shadow-xs border border-[#EADBBD] bg-[#FAF5EA] p-4 sm:p-5 text-left transition-all">
        
        {/* Decorative Doodles from Image 2 */}
        {/* Pastel Yellow Flower on Top Right */}
        <div className="absolute -top-1.5 -right-1.5 transform rotate-12 pointer-events-none z-0 animate-swing">
          <FlowerDoodle size={44} petalColor="#FEE387" centerColor="#FFF" />
        </div>

        {/* Big Pink Flower on Lower Right (Dời xuống để không chạm vào chữ Thanh Sơn sau khi phóng to) */}
        <div className="absolute top-[56%] -right-3 transform rotate-12 pointer-events-none z-0 opacity-80 animate-swing-slow">
          <FlowerDoodle size={44} petalColor="#F48FB1" centerColor="#FFF" />
        </div>

        {/* Pastel Blue Flower on Bottom Left */}
        <div className="absolute bottom-2 -left-2 transform -rotate-15 pointer-events-none z-0 animate-swing">
          <FlowerDoodle size={36} petalColor="#A6CEE3" centerColor="#FFF" />
        </div>

        {/* Curved Pink Ribbon Wave on Lower Left */}
        <div className="absolute bottom-10 -left-1 w-2.5 h-16 bg-[#F48FB1]/75 rounded-full transform rotate-12 pointer-events-none z-0" />

        {/* 1. & 2. NHÀ GÁI & NHÀ TRAI (With Vertical Coral Accent Bar) */}
        <div className="relative z-10 border-l-2 border-[#EE6C8D] pl-3 sm:pl-3.5 space-y-3.5">
          {/* 1. NHÀ GÁI */}
          <ScrollReveal variant="left" delay={100}>
            <h4 className="font-serif text-[#EE6C8D] font-bold text-xs sm:text-[13px] uppercase tracking-widest mb-1">
              NHÀ GÁI
            </h4>
            <div className="space-y-0.5 text-xs font-semibold text-[#444]">
              <p>Ông: Gioan.B Cao Hoài Bảo</p>
              <p>Bà: Maria Trần Thị Vui</p>
            </div>
            <p className="text-[11px] text-[#8A7968] mt-1 leading-relaxed">
              2077/6 Phương Lâm, Phú Lâm, TP. Đồng Nai.
            </p>
          </ScrollReveal>

          {/* 2. NHÀ TRAI */}
          <ScrollReveal variant="right" delay={200}>
            <h4 className="font-serif text-[#8B9B4B] font-bold text-xs sm:text-[13px] uppercase tracking-widest mb-1">
              NHÀ TRAI
            </h4>
            <div className="space-y-0.5 text-xs font-semibold text-[#444]">
              <p>Ông: Phero Trần Văn Hòa</p>
              <p>Bà: Maria Trần Thị Thu</p>
            </div>
            <p className="text-[11px] text-[#8A7968] mt-1 leading-relaxed">
              3523 Phú Lâm 3, Phú Lâm, TP. Đồng Nai
            </p>
          </ScrollReveal>

          {/* 1. THÂN MỜI TỚI DỰ TIỆC CƯỚI CỦA CHÚNG MÌNH (Bỏ chữ THÂN MẬT đi) */}
          <ScrollReveal variant="up" delay={250} className="pt-0.5">
            <p className="font-serif text-xs font-bold tracking-wider text-[#EE6C8D] uppercase leading-relaxed">
              THÂN MỜI TỚI DỰ TIỆC CƯỚI CỦA CHÚNG MÌNH
            </p>
          </ScrollReveal>
        </div>

        {/* MIDDLE SECTION: Hand-Drawn Duo Flowers on Left & Zoomed Couple Names on Right */}
        <div className="relative z-10 my-5 sm:my-6 flex items-center justify-between gap-1.5 px-0.5">
          {/* Left: Cute Duo of Doodle Stem Flowers (Thêm 1 bông nữa cho đỡ trống) */}
          <ScrollReveal variant="left" delay={150} className="w-[85px] sm:w-[95px] flex-shrink-0 flex items-center justify-center">
            <svg viewBox="0 0 110 135" fill="none" className="w-full h-auto max-h-[125px] animate-swing-slow">
              {/* Stem of Flower 1 (taller) */}
              <path d="M 45 48 Q 42 85 36 128" stroke="#8B9B4B" strokeWidth="2.5" strokeLinecap="round" />
              {/* Leaves of Flower 1 */}
              <path d="M 42 70 Q 22 70 14 80 Q 32 85 40 76" fill="#A4B365" opacity="0.85" stroke="#8B9B4B" strokeWidth="1.5" />
              <path d="M 39 92 Q 18 98 12 110 Q 28 112 37 98" fill="#A4B365" opacity="0.85" stroke="#8B9B4B" strokeWidth="1.5" />
              
              {/* Flower 1 Petals (taller, soft pink) */}
              <circle cx="46" cy="28" r="13" fill="#F48FB1" opacity="0.92" stroke="#EE6C8D" strokeWidth="2" />
              <circle cx="32" cy="38" r="12" fill="#F48FB1" opacity="0.92" stroke="#EE6C8D" strokeWidth="2" />
              <circle cx="60" cy="38" r="12" fill="#F48FB1" opacity="0.92" stroke="#EE6C8D" strokeWidth="2" />
              <circle cx="46" cy="48" r="12" fill="#F48FB1" opacity="0.92" stroke="#EE6C8D" strokeWidth="2" />
              {/* Center 1 */}
              <circle cx="46" cy="38" r="8.5" fill="#FEE387" stroke="#EE6C8D" strokeWidth="1.5" />
              <path d="M 44 37 C 44 35 48 35 48 38 C 48 40 45 40 46 38" stroke="#EE6C8D" strokeWidth="1.2" strokeLinecap="round" />

              {/* Stem of Flower 2 (companion, slightly shorter, leaning gently to the right) */}
              <path d="M 78 68 Q 72 95 44 125" stroke="#8B9B4B" strokeWidth="2.2" strokeLinecap="round" />
              {/* Leaf of Flower 2 */}
              <path d="M 68 85 Q 86 86 94 96 Q 78 100 64 92" fill="#A4B365" opacity="0.85" stroke="#8B9B4B" strokeWidth="1.5" />

              {/* Flower 2 Petals (shorter, warm coral pastel) */}
              <circle cx="78" cy="52" r="11" fill="#F8A5B9" opacity="0.92" stroke="#EE6C8D" strokeWidth="1.8" />
              <circle cx="66" cy="61" r="10.5" fill="#F8A5B9" opacity="0.92" stroke="#EE6C8D" strokeWidth="1.8" />
              <circle cx="90" cy="61" r="10.5" fill="#F8A5B9" opacity="0.92" stroke="#EE6C8D" strokeWidth="1.8" />
              <circle cx="78" cy="70" r="10.5" fill="#F8A5B9" opacity="0.92" stroke="#EE6C8D" strokeWidth="1.8" />
              {/* Center 2 */}
              <circle cx="78" cy="61" r="7.5" fill="#FEE387" stroke="#EE6C8D" strokeWidth="1.4" />
              <path d="M 76 60 C 76 58 80 58 80 61 C 80 62 77 62 78 60" stroke="#EE6C8D" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
          </ScrollReveal>

          {/* Right: Couple Names (Zoom to hơn, giữ trên 1 dòng, Út Nữ & Thứ Nam) */}
          <ScrollReveal variant="right" delay={200} className="flex-1 flex flex-col items-end text-right pr-0.5 sm:pr-1.5 z-10">
            {/* Quỳnh Như on 1 single line - Zoomed Bigger */}
            <div className="flex flex-col items-end">
              <span className="font-serif text-2xl sm:text-[28px] md:text-3xl font-bold text-[#EE6C8D] whitespace-nowrap tracking-wide leading-tight">
                Quỳnh Như
              </span>
              <span className="font-serif text-xs sm:text-[13px] font-semibold text-[#8B9B4B] tracking-wider mt-0.5">
                (Út Nữ)
              </span>
            </div>

            {/* AND (Đổi thành màu vàng) */}
            <span className="font-serif text-xs font-bold tracking-widest text-[#E5A824] my-1 pr-0.5">
              AND
            </span>

            {/* Thanh Sơn on 1 single line - Zoomed Bigger */}
            <div className="flex flex-col items-end">
              <span className="font-serif text-2xl sm:text-[28px] md:text-3xl font-bold text-[#EE6C8D] whitespace-nowrap tracking-wide leading-tight">
                Thanh Sơn
              </span>
              <span className="font-serif text-xs sm:text-[13px] font-semibold text-[#8B9B4B] tracking-wider mt-0.5">
                (Thứ Nam)
              </span>
            </div>
          </ScrollReveal>
        </div>

        {/* 3. ĐƯỢC TỔ CHỨC VÀO LÚC (With Vertical Coral Accent Bar) */}
        <ScrollReveal variant="up" delay={150} className="relative z-10 border-l-2 border-[#EE6C8D] pl-3 sm:pl-3.5 space-y-2.5">
          {/* Time & Day - Số dùng font serif thanh lịch hài hòa với tổng thể */}
          <div>
            <span className="font-serif text-[#8B9B4B] font-bold text-xs uppercase tracking-widest block">
              ĐƯỢC TỔ CHỨC VÀO LÚC
            </span>
            <span className="font-serif text-[#EE6C8D] font-bold text-xs sm:text-sm tracking-wider mt-0.5 block">
              <span style={{ fontFamily: "'Playfair Display', 'Cormorant Garamond', Georgia, serif" }} className="font-semibold text-sm sm:text-base">11:00</span>, THỨ BẢY
            </span>
          </div>

          {/* Date Big Numbers: 26 | THÁNG 12 / 2026 - Font số thanh thoát, sang trọng, hài hòa với font chữ */}
          <div className="flex items-center gap-3 py-1">
            <span
              className="text-4xl sm:text-[46px] font-normal text-[#8B9B4B] tracking-tight leading-none"
              style={{ fontFamily: "'Playfair Display', 'Cormorant Garamond', Georgia, serif" }}
            >
              26
            </span>
            <div className="h-9 w-[1.5px] bg-[#EE6C8D]/50" />
            <div className="flex flex-col justify-center text-left leading-tight">
              <span className="font-serif text-xs sm:text-sm font-bold text-[#8B9B4B] tracking-widest">
                THÁNG <span style={{ fontFamily: "'Playfair Display', 'Cormorant Garamond', Georgia, serif" }} className="font-semibold">12</span>
              </span>
              <span
                style={{ fontFamily: "'Playfair Display', 'Cormorant Garamond', Georgia, serif" }}
                className="text-xs sm:text-sm font-normal text-[#8B9B4B] tracking-wider mt-0.5"
              >
                2026
              </span>
            </div>
          </div>

          {/* Venue: TRUNG TÂM TIỆC CƯỚI LOVE GARDEN */}
          <div className="pt-0.5">
            <span className="font-serif text-[#8B9B4B] font-bold text-xs uppercase tracking-widest block">
              TRUNG TÂM TIỆC CƯỚI
            </span>
            <h3 className="font-serif text-[#EE6C8D] font-bold text-base sm:text-lg uppercase tracking-wider mt-0.5">
              LOVE GARDEN
            </h3>
            {/* 3. Địa chỉ nhà hàng nằm trọn vẹn trên 1 hàng không bị cắt */}
            <p className="text-[10px] sm:text-[11px] text-[#555] font-sans font-medium whitespace-nowrap tracking-tight mt-1">
              36A, Tổ 09, Khu phố 06, Phường Tân Phú, TP. Đồng Nai
            </p>
          </div>

          {/* Sketchy Arrow pointing to button */}
          <div className="flex justify-start pl-3 -my-0.5">
            <SketchyArrow color="#8EB8E5" direction="down-right" />
          </div>

          {/* CHỈ ĐƯỜNG Button (Style like Image 2: Olive green rounded pill button mở trực tiếp Google Maps) */}
          <div className="pt-0.5">
            <a
              href={weddingData.reception.directionsUrl}
              target="_blank"
              rel="noreferrer"
              className="bg-[#9EB05B] hover:bg-[#8CA048] active:scale-95 text-white font-serif font-bold text-xs tracking-widest uppercase px-8 py-2.5 rounded-full shadow-md hover:shadow-lg transition-all inline-flex items-center justify-center gap-1.5 cursor-pointer animate-pulse-soft"
            >
              <span>📍</span>
              <span>CHỈ ĐƯỜNG</span>
            </a>
          </div>
        </ScrollReveal>
      </div>

      {/* ================= 3. THÂN MỜI DỰ BỮA CƠM THÂN MẬT ================= */}
      <ScrollReveal variant="up" delay={100} className="relative w-full rounded-3xl overflow-hidden my-3 shadow-xs border border-[#EADBBD] bg-[#FAF5EA] p-4 sm:p-5 text-left transition-all">
        {/* Decorative pastel flowers */}
        <div className="absolute -top-1.5 -right-1.5 transform rotate-12 pointer-events-none z-0 animate-swing">
          <FlowerDoodle size={38} petalColor="#FEE387" centerColor="#FFF" />
        </div>
        <div className="absolute bottom-2 -right-2 transform -rotate-12 pointer-events-none z-0 animate-swing-slow">
          <FlowerDoodle size={36} petalColor="#F48FB1" centerColor="#FFF" />
        </div>

        {/* Content with vertical accent bar */}
        <div className="relative z-10 border-l-2 border-[#8B9B4B] pl-3 sm:pl-3.5 space-y-2.5">
          {/* Badge / Title */}
          <div>
            <span className="font-serif text-[#8B9B4B] font-bold text-xs uppercase tracking-widest block">
              THÂN MỜI DỰ
            </span>
            <h3 className="font-serif text-[#EE6C8D] font-bold text-base sm:text-lg uppercase tracking-wider mt-0.5">
              BỮA CƠM THÂN MẬT
            </h3>
          </div>

          {/* Time & Day */}
          <div>
            <span className="font-serif text-[#EE6C8D] font-bold text-xs sm:text-sm tracking-wider block">
              VÀO LÚC <span style={{ fontFamily: "'Playfair Display', 'Cormorant Garamond', Georgia, serif" }} className="font-semibold text-sm sm:text-base">18:00</span>, THỨ SÁU
            </span>
          </div>

          {/* Date Big Numbers: 25 | THÁNG 12 / 2026 */}
          <div className="flex items-center gap-3 py-1">
            <span
              className="text-3xl sm:text-4xl font-normal text-[#8B9B4B] tracking-tight leading-none"
              style={{ fontFamily: "'Playfair Display', 'Cormorant Garamond', Georgia, serif" }}
            >
              25
            </span>
            <div className="h-8 w-[1.5px] bg-[#8B9B4B]/40" />
            <div className="flex flex-col justify-center text-left leading-tight">
              <span className="font-serif text-xs sm:text-sm font-bold text-[#8B9B4B] tracking-widest">
                THÁNG <span style={{ fontFamily: "'Playfair Display', 'Cormorant Garamond', Georgia, serif" }} className="font-semibold">12</span>
              </span>
              <span
                style={{ fontFamily: "'Playfair Display', 'Cormorant Garamond', Georgia, serif" }}
                className="text-xs sm:text-sm font-normal text-[#8B9B4B] tracking-wider mt-0.5"
              >
                2026
              </span>
            </div>
          </div>

          {/* Venue & Address */}
          <div className="pt-0.5">
            <span className="font-serif text-[#8B9B4B] font-bold text-xs uppercase tracking-widest block">
              ĐỊA ĐIỂM
            </span>
            <div className="font-serif text-sm sm:text-base font-bold text-[#444] uppercase tracking-wide mt-0.5">
              TƯ GIA
            </div>
            <p className="text-[10px] sm:text-[11px] text-[#555] font-sans font-medium whitespace-nowrap tracking-tight mt-1">
              2077/6, ấp Phương Lâm, xã Phú Lâm, TP. Đồng Nai
            </p>
          </div>

          {/* Directions Button for Tư Gia */}
          <div className="pt-1">
            <a
              href="https://maps.app.goo.gl/ertTyURTnw78qJ8LA"
              target="_blank"
              rel="noreferrer"
              className="bg-[#8B9B4B] hover:bg-[#78883E] active:scale-95 text-white font-serif font-bold text-xs tracking-widest uppercase px-6 py-2.5 rounded-full shadow-xs hover:shadow-md transition-all inline-flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>📍</span>
              <span>CHỈ ĐƯỜNG VỀ TƯ GIA</span>
            </a>
          </div>
        </div>
      </ScrollReveal>

    </div>
  );
};
