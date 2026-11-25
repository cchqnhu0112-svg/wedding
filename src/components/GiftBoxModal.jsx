import React, { useState } from 'react';
import { Gift, Copy, Check, Download, X, QrCode } from 'lucide-react';
import { DoodleBadge, FlowerDoodle } from './DoodleSVGs';

export const GiftBoxModal = ({ isOpen, onClose, groom, bride }) => {
  const [copiedField, setCopiedField] = useState(null);

  if (!isOpen) return null;

  const currentAccount = bride.account;

  const handleCopy = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleDownloadQR = (qrUrl, filename) => {
    const link = document.createElement('a');
    link.href = qrUrl;
    link.download = filename;
    link.target = '_blank';
    link.click();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-[#FAF5EB] rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border-2 border-[#EADBBD] relative transform transition-all animate-scale-up p-5 sm:p-6 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/80 hover:bg-white text-gray-500 flex items-center justify-center shadow transition-transform hover:scale-110"
        >
          <X size={16} />
        </button>

        {/* Gift Icon */}
        <div className="w-14 h-14 rounded-full bg-[#FAF0E6] border-2 border-dashed border-[#EE6C8D] text-[#EE6C8D] flex items-center justify-center mx-auto mb-2 shadow-inner">
          <Gift size={28} className="animate-bounce" />
        </div>

        {/* Title */}
        <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#EE6C8D] tracking-wide mb-1">
          HỘP QUÀ MỪNG
        </h3>
        <p className="text-xs text-[#7A5B64] mb-4">
          Sự chúc phúc và tình cảm của quý khách là món quà ý nghĩa nhất dành cho chúng mình!
        </p>

        {/* Bank & QR Card */}
        <div className="bg-white/90 rounded-2xl p-4 border border-[#EADBBD] shadow-sm mb-4">
          {/* QR Code Container */}
          <div className="w-48 h-48 mx-auto bg-white p-2 rounded-xl shadow-inner border border-gray-100 flex items-center justify-center mb-3">
            <img
              src={currentAccount.qrUrl}
              alt="Mã QR Mừng Cưới"
              className="w-full h-full object-contain"
            />
          </div>

          {/* Account Details */}
          <div className="space-y-1.5 text-xs text-left px-2">
            <div className="flex justify-between border-b border-gray-100 pb-1">
              <span className="text-[#888]">Ngân hàng:</span>
              <span className="font-bold text-[#333]">{currentAccount.bank}</span>
            </div>

            <div className="flex justify-between items-center border-b border-gray-100 pb-1">
              <span className="text-[#888]">Số tài khoản:</span>
              <div className="flex items-center gap-1.5">
                <span className="font-mono font-bold text-[#EE6C8D] text-sm">
                  {currentAccount.accountNumber}
                </span>
                <button
                  onClick={() => handleCopy(currentAccount.accountNumber, 'accountNumber')}
                  className="text-gray-400 hover:text-[#9EB05B] p-0.5"
                  title="Sao chép số tài khoản"
                >
                  {copiedField === 'accountNumber' ? (
                    <Check size={14} className="text-green-600" />
                  ) : (
                    <Copy size={14} />
                  )}
                </button>
              </div>
            </div>

            <div className="flex justify-between pt-0.5">
              <span className="text-[#888]">Chủ tài khoản:</span>
              <span className="font-semibold text-[#444]">{currentAccount.accountName}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => handleCopy(currentAccount.accountNumber, 'copyBtn')}
            className="flex-1 py-2.5 rounded-full bg-white border border-[#DACDB8] text-[#6B5A4B] font-medium text-xs flex items-center justify-center gap-1.5 hover:bg-[#FDF9F2] transition-colors shadow-xs"
          >
            {copiedField === 'copyBtn' ? (
              <>
                <Check size={14} className="text-green-600" />
                <span className="text-green-600 font-semibold">Đã sao chép STK</span>
              </>
            ) : (
              <>
                <Copy size={14} />
                <span>Sao chép STK</span>
              </>
            )}
          </button>

          <button
            onClick={() => handleDownloadQR(currentAccount.qrUrl, `QR-Mung-Cuoi-${currentAccount.bank}.png`)}
            className="flex-1 py-2.5 rounded-full bg-[#9EB05B] hover:bg-[#8CA048] text-white font-medium text-xs flex items-center justify-center gap-1.5 transition-colors shadow-xs"
          >
            <Download size={14} />
            <span>Lưu mã QR</span>
          </button>
        </div>
      </div>
    </div>
  );
};
