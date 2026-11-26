import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Camera, Maximize2 } from 'lucide-react';
import { DoodleBadge, FlowerDoodle } from './DoodleSVGs';

export const GallerySection = ({ photos }) => {
  const [selectedIdx, setSelectedIdx] = useState(null);

  const openLightbox = (index) => setSelectedIdx(index);
  const closeLightbox = () => setSelectedIdx(null);

  const prevPhoto = () => {
    setSelectedIdx((prev) => (prev > 0 ? prev - 1 : photos.length - 1));
  };

  const nextPhoto = () => {
    setSelectedIdx((prev) => (prev < photos.length - 1 ? prev + 1 : 0));
  };

  const currentPhoto = selectedIdx !== null ? photos[selectedIdx] : null;

  return (
    <div className="relative my-6 px-2 text-center">
      
      {/* Decorative corner flower */}
      <div className="absolute -top-3 right-2 transform rotate-12">
        <FlowerDoodle size={38} petalColor="#F48FB1" centerColor="#FFF" />
      </div>

      {/* Header Badge */}
      <div className="relative z-10 mb-2">
        <DoodleBadge color="#9EB05B" textColor="#8B9B4B">
          ALBUM ẢNH CƯỚI
        </DoodleBadge>
      </div>

      <p className="text-[#EE6C8D] text-[10.5px] leading-relaxed max-w-[340px] mx-auto mb-4 font-normal text-left">
        Từ ghế nhà trường năm ấy đến lễ đường hôm nay là tròn 10 năm thanh xuân rực rỡ nhất của chúng mình. Cảm ơn tháng năm đã không làm phai nhòa đi những rung động đầu đời, mà còn tôi luyện tình yêu ấy thêm vững chãi, để hai đứa trẻ năm nào nay chính thức gọi nhau là gia đình. Mời bạn cùng ngắm nhìn những khoảnh khắc hạnh phúc của chúng mình nhé ♡
      </p>

      {/* Photo Grid */}
      <div className="grid grid-cols-2 gap-2.5 max-w-[340px] mx-auto">
        {photos.slice(0, 4).map((photo, index) => {
          const isLastPreview = index === 3;
          const remainingCount = photos.length - 4;
          const isThreePhotoHero = photos.length === 3 && index === 0;

          return (
            <div
              key={photo.id}
              onClick={() => openLightbox(index)}
              className={`relative rounded-2xl overflow-hidden cursor-pointer shadow-md group border-2 border-white transition-transform duration-300 hover:scale-[1.03] ${
                isThreePhotoHero ? 'col-span-2 aspect-[4/3]' : 'aspect-[4/5]'
              }`}
            >
              <img
                src={photo.thumb}
                alt={photo.caption}
                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />

              {/* Hover icon */}
              <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                <Maximize2 size={20} />
              </div>

              {/* +N overlay if > 4 photos */}
              {isLastPreview && remainingCount > 0 && (
                <div className="absolute inset-0 bg-[#35251E]/60 backdrop-blur-[2px] flex flex-col items-center justify-center text-white p-2">
                  <Camera size={22} className="mb-1 text-[#FEE387]" />
                  <span className="font-serif text-lg font-bold">
                    + {remainingCount + 1}
                  </span>
                  <span className="text-[10px] tracking-wider uppercase font-medium">
                    Xem tất cả
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Lightbox Modal */}
      {selectedIdx !== null && currentPhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-3 sm:p-6 animate-fade-in"
          onClick={closeLightbox}
        >
          <div
            className="relative max-w-4xl w-full flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar with counter & close */}
            <div className="w-full flex items-center justify-between text-white/90 text-sm py-2 px-3">
              <span className="font-serif tracking-widest text-[#FEE387]">
                {selectedIdx + 1} / {photos.length}
              </span>
              <button
                onClick={closeLightbox}
                className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center text-white transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Main Active Photo */}
            <div className="relative w-full max-w-[460px] aspect-[4/5] max-h-[68vh] flex items-center justify-center overflow-hidden rounded-2xl my-2 bg-black/40 mx-auto">
              <img
                src={currentPhoto.url}
                alt={currentPhoto.caption}
                className="w-full h-full object-cover rounded-xl shadow-2xl animate-scale-up"
              />

              {/* Left Arrow */}
              <button
                onClick={prevPhoto}
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition-transform hover:scale-110"
              >
                <ChevronLeft size={22} />
              </button>

              {/* Right Arrow */}
              <button
                onClick={nextPhoto}
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition-transform hover:scale-110"
              >
                <ChevronRight size={22} />
              </button>
            </div>

            {/* Caption */}
            <p className="text-white/80 font-serif text-sm tracking-wide text-center my-2 italic">
              {currentPhoto.caption}
            </p>

            {/* Thumbnail Navigation Strip */}
            <div className="w-full flex items-center justify-center gap-2 overflow-x-auto py-2 px-1 max-w-full">
              {photos.map((item, i) => (
                <button
                  key={item.id}
                  onClick={() => setSelectedIdx(i)}
                  className={`w-10 h-12 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all ${
                    selectedIdx === i
                      ? 'border-[#EE6C8D] scale-110 shadow-lg'
                      : 'border-white/30 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={item.thumb} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
