import React, { useState } from 'react';
import { X, MapPin, Copy, Check, ExternalLink, Church, Home } from 'lucide-react';
import { weddingData } from '../weddingData';

export const MapModal = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [activeLocation, setActiveLocation] = useState('reception'); // 'reception' | 'church'

  if (!isOpen) return null;

  const isReception = activeLocation === 'reception';
  const currentVenue = isReception ? weddingData.reception.venue : weddingData.ceremony.venue;
  const currentAddress = isReception ? weddingData.reception.address : weddingData.ceremony.address;
  const currentEmbed = isReception ? weddingData.reception.mapEmbedUrl : weddingData.ceremony.mapEmbedUrl;
  const currentDirections = isReception ? weddingData.reception.directionsUrl : weddingData.ceremony.directionsUrl;

  const handleCopy = () => {
    navigator.clipboard.writeText(`${currentVenue} - ${currentAddress}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-[#FAF5EB] rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border-2 border-[#EADBBD] relative transform transition-all animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-gray-600 flex items-center justify-center shadow transition-transform hover:scale-110"
        >
          <X size={18} />
        </button>

        {/* Modal Header */}
        <div className="p-5 pb-3 text-center border-b border-[#EEDBCA]">
          <span className="font-serif text-[#8B9B4B] text-xs uppercase tracking-widest font-semibold block mb-1">
            BẢN ĐỒ ĐỊA ĐIỂM
          </span>
          <h3 className="font-serif text-xl font-bold text-[#EE6C8D]">
            {currentVenue}
          </h3>
          <p className="text-xs text-[#7A5B64] mt-1 flex items-center justify-center gap-1">
            <MapPin size={13} className="text-[#EE6C8D]" />
            {currentAddress}
          </p>

          {/* Location Switch Tabs */}
          <div className="flex items-center justify-center gap-2 mt-3 bg-white/80 p-1 rounded-2xl border border-[#EADBBD] max-w-sm mx-auto">
            <button
              onClick={() => setActiveLocation('reception')}
              className={`flex-1 py-1.5 px-2.5 rounded-xl text-xs font-serif font-bold transition-all flex items-center justify-center gap-1.5 ${
                isReception
                  ? 'bg-[#7A2032] text-white shadow-2xs'
                  : 'text-[#7A5B64] hover:text-black'
              }`}
            >
              <span>Tiệc Cưới Love Garden</span>
            </button>

            <button
              onClick={() => setActiveLocation('church')}
              className={`flex-1 py-1.5 px-2.5 rounded-xl text-xs font-serif font-bold transition-all flex items-center justify-center gap-1.5 ${
                !isReception
                  ? 'bg-[#9EB05B] text-white shadow-2xs'
                  : 'text-[#7A5B64] hover:text-black'
              }`}
            >
              <Church size={13} />
              <span>Thánh Đường Phú Lâm</span>
            </button>
          </div>
        </div>

        {/* Map Embed Preview */}
        <div className="h-64 w-full bg-[#E8E2D5] relative overflow-hidden">
          <iframe
            title="Venue Map"
            src={currentEmbed}
            className="w-full h-full border-0"
            loading="lazy"
          />
        </div>

        {/* Actions Footer */}
        <div className="p-4 bg-[#F5EFE0] flex flex-wrap items-center justify-between gap-3 text-xs">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-[#DACDB8] text-[#6B5A4B] hover:bg-[#FDF9F2] transition-colors"
          >
            {copied ? (
              <>
                <Check size={14} className="text-green-600" />
                <span className="text-green-600 font-medium">Đã sao chép</span>
              </>
            ) : (
              <>
                <Copy size={14} />
                <span>Sao chép địa chỉ</span>
              </>
            )}
          </button>

          <a
            href={currentDirections}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#9EB05B] text-white font-medium hover:bg-[#8CA048] transition-colors shadow-xs"
          >
            <span>Mở Google Maps</span>
            <ExternalLink size={13} />
          </a>
        </div>
      </div>
    </div>
  );
};
