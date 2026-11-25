import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle2, Share2, X, Plus, Minus, Send, Phone, User, Bus, Car, Loader2 } from 'lucide-react';
import { submitRSVP, hasSubmittedRSVP } from '../lib/supabase';

export const RSVPModal = ({ isOpen, onClose, data }) => {
  const previousSubmission = hasSubmittedRSVP();
  const [guestName, setGuestName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [attendance, setAttendance] = useState('yes');
  const [events, setEvents] = useState(['dinner', 'wedding']);
  const [transport, setTransport] = useState('self');
  const [guestCount, setGuestCount] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  // Already submitted before → show friendly notice
  if (previousSubmission && !isSubmitted) {
    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      >
        <div
          className="bg-[#FAF5EB] rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border-2 border-[#EADBBD] relative transform transition-all animate-scale-up"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/80 hover:bg-white text-gray-500 flex items-center justify-center shadow transition-transform hover:scale-110"
          >
            <X size={16} />
          </button>
          <div className="p-6 text-center py-8">
            <div className="w-16 h-16 rounded-full bg-[#EAF2D5] text-[#9EB05B] flex items-center justify-center mx-auto mb-3 shadow-inner">
              <CheckCircle2 size={36} />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#9EB05B] mb-2">
              Bạn đã xác nhận rồi!
            </h3>
            <p className="text-xs text-[#7A5B64] mb-1">
              Xin chào <strong className="text-[#EE6C8D]">{previousSubmission.guestName}</strong>, bạn đã gửi xác nhận tham dự thành công.
            </p>
            <p className="text-[11px] text-[#999] italic">
              Hãy gửi lời chúc tại mục Sổ Lưu Bút bên dưới nhé! 💕
            </p>
            <button
              onClick={onClose}
              className="mt-5 bg-[#9EB05B] hover:bg-[#8CA048] text-white font-serif font-bold text-xs tracking-widest uppercase px-8 py-3 rounded-full shadow-md transition-all"
            >
              ĐÓNG
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!guestName.trim()) {
      setError('Vui lòng nhập họ và tên của bạn');
      return;
    }
    if (attendance === 'yes' && !phoneNumber.trim()) {
      setError('Vui lòng nhập số điện thoại để gia đình tiện liên hệ');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      await submitRSVP({
        guestName: guestName.trim(),
        phone: phoneNumber.trim(),
        attendance,
        events,
        guestCount,
        transport,
      });

      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#A6CEE3', '#FEE387', '#9EB05B', '#F48FB1']
      });

      setIsSubmitted(true);
    } catch (err) {
      console.error('Submit error:', err);
      setError('Gửi xác nhận chưa thành công. Vui lòng thử lại!');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setGuestName('');
    setPhoneNumber('');
    setAttendance('yes');
    setEvents(['dinner', 'wedding']);
    setTransport('self');
    setGuestCount(1);
    setError('');
    onClose();
  };

  // Event display text helper
  const getEventText = () => {
    const hasDinner = events.includes('dinner');
    const hasWedding = events.includes('wedding');
    if (hasDinner && hasWedding) return 'Cả 2 buổi (Bữa cơm thân mật 25/12 & Tiệc cưới 26/12)';
    if (hasDinner) return 'Bữa cơm thân mật (18:00 • 25/12/2026 tại Tư Gia)';
    if (hasWedding) return 'Tiệc cưới chính (11:00 • 26/12/2026 tại Love Garden)';
    return 'Chưa chọn buổi tiệc';
  };

  const getTransportText = () => {
    return transport === 'shuttle'
      ? 'Đi xe đưa đón của gia đình (Bến xe Miền Đông cũ lúc 08:00)'
      : 'Tự túc phương tiện di chuyển';
  };

  const shareText = encodeURIComponent(
    `💌 Xác nhận tham dự cưới Thanh Sơn & Quỳnh Như:\n` +
    `- Khách: ${guestName}\n` +
    (phoneNumber ? `- SĐT: ${phoneNumber}\n` : '') +
    `- Trạng thái: ${attendance === 'yes' ? `Sẽ đến (${guestCount} khách)` : 'Không thể đến'}\n` +
    (attendance === 'yes' ? `- Sự kiện: ${getEventText()}\n- Di chuyển: ${getTransportText()}` : '')
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
      onClick={handleReset}
    >
      <div
        className="bg-[#FAF5EB] rounded-3xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl border-2 border-[#EADBBD] relative transform transition-all animate-scale-up p-5 sm:p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleReset}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/80 hover:bg-white text-gray-500 flex items-center justify-center shadow transition-transform hover:scale-110"
        >
          <X size={16} />
        </button>

        {!isSubmitted ? (
          <div>
            {/* Header */}
            <div className="text-center mb-4">
              <span className="font-serif text-[#8B9B4B] text-xs uppercase tracking-widest font-semibold block mb-1">
                RSVP
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#EE6C8D]">
                Xác Nhận Tham Dự
              </h3>
              <p className="text-xs text-[#7A5B64] mt-1 italic">
                "Sự hiện diện của bạn là niềm vinh hạnh cho gia đình chúng mình. Xin xác nhận trước ngày{' '}
                <span className="font-bold not-italic text-[#B82D55] bg-[#FEE99A] px-1 py-0.5 rounded">
                  12.12.2026
                </span>{' '}
                để chúng mình chuẩn bị chu đáo nhất."
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
              {/* 1. Tên của bạn */}
              <div>
                <label className="block text-[#7A5B64] font-semibold mb-1 flex items-center gap-1.5">
                  <User size={13} className="text-[#8B9B4B]" />
                  <span>Tên của bạn *</span>
                </label>
                <input
                  type="text"
                  value={guestName}
                  onChange={(e) => {
                    setGuestName(e.target.value);
                    if (error) setError('');
                  }}
                  placeholder="Nhập họ và tên của bạn..."
                  className="w-full bg-white border border-[#D9CDB8] focus:border-[#9EB05B] rounded-xl py-2 px-3 outline-none text-[#444] transition-colors"
                />
              </div>

              {/* 2. Số điện thoại để tiện liên lạc */}
              <div>
                <label className="block text-[#7A5B64] font-semibold mb-1 flex items-center gap-1.5">
                  <Phone size={13} className="text-[#8B9B4B]" />
                  <span>Số điện thoại *</span>
                </label>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => {
                    setPhoneNumber(e.target.value);
                    if (error) setError('');
                  }}
                  placeholder="Nhập số điện thoại để tiện liên hệ..."
                  className="w-full bg-white border border-[#D9CDB8] focus:border-[#9EB05B] rounded-xl py-2 px-3 outline-none text-[#444] transition-colors"
                />
                {error && <span className="text-[11px] text-red-500 mt-1 block font-medium">{error}</span>}
              </div>

              {/* 3. Bạn sẽ đến chứ? */}
              <div>
                <label className="block text-[#7A5B64] font-semibold mb-1.5">
                  Bạn sẽ đến tham dự chứ?
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setAttendance('yes')}
                    className={`py-2 px-3 rounded-xl border text-center font-medium transition-all ${
                      attendance === 'yes'
                        ? 'bg-[#9EB05B] text-white border-[#9EB05B] shadow-xs'
                        : 'bg-white text-[#666] border-[#D9CDB8] hover:bg-gray-50'
                    }`}
                  >
                    Tôi sẽ đến
                  </button>

                  <button
                    type="button"
                    onClick={() => setAttendance('no')}
                    className={`py-2 px-3 rounded-xl border text-center font-medium transition-all ${
                      attendance === 'no'
                        ? 'bg-[#EE6C8D] text-white border-[#EE6C8D] shadow-xs'
                        : 'bg-white text-[#666] border-[#D9CDB8] hover:bg-gray-50'
                    }`}
                  >
                    Rất tiếc, không thể đến
                  </button>
                </div>
              </div>

              {/* Nếu tham dự: Hiển thị các mục chi tiết */}
              {attendance === 'yes' && (
                <>
                  {/* 4. Buổi tiệc bạn sẽ tham dự (ĐẨY BỮA CƠM THÂN MẬT LÊN TRƯỚC) */}
                  <div className="bg-white/80 rounded-xl p-3 border border-[#EADBBD] animate-fade-in space-y-2">
                    <div className="font-semibold text-[#444]">Buổi tiệc bạn sẽ tham dự:</div>
                    <div className="space-y-2 text-[11px]">
                      {/* Bữa cơm thân mật (Đẩy lên trước) */}
                      <label className="flex items-start gap-2.5 cursor-pointer text-[#444] hover:text-black">
                        <input
                          type="checkbox"
                          checked={events.includes('dinner')}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setEvents([...events, 'dinner']);
                            } else if (events.length > 1) {
                              setEvents(events.filter((ev) => ev !== 'dinner'));
                            }
                          }}
                          className="rounded text-[#9EB05B] w-4 h-4 accent-[#9EB05B] mt-0.5"
                        />
                        <div>
                          <span className="font-semibold text-[#333]">🍲 Bữa cơm thân mật</span>
                          <span className="block text-[10.5px] text-[#7A5B64]">18:00 • Thứ Sáu, ngày 25/12/2026 tại Tư Gia</span>
                        </div>
                      </label>

                      {/* Tiệc cưới chính */}
                      <label className="flex items-start gap-2.5 cursor-pointer text-[#444] hover:text-black">
                        <input
                          type="checkbox"
                          checked={events.includes('wedding')}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setEvents([...events, 'wedding']);
                            } else if (events.length > 1) {
                              setEvents(events.filter((ev) => ev !== 'wedding'));
                            }
                          }}
                          className="rounded text-[#9EB05B] w-4 h-4 accent-[#9EB05B] mt-0.5"
                        />
                        <div>
                          <span className="font-semibold text-[#333]">🎉 Tiệc cưới</span>
                          <span className="block text-[10.5px] text-[#7A5B64]">11:00 • Thứ Bảy, ngày 26/12/2026 tại Love Garden</span>
                        </div>
                      </label>
                    </div>
                  </div>

                  {/* 5. Số lượng khách tham dự */}
                  <div className="bg-white/80 rounded-xl p-3 border border-[#EADBBD] animate-fade-in">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-[#444]">Số lượng khách tham dự</div>
                        <div className="text-[10px] text-[#888]">(Bao gồm cả bạn)</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setGuestCount((c) => Math.max(1, c - 1))}
                          className="w-7 h-7 rounded-lg bg-gray-100 hover:bg-gray-200 text-[#444] flex items-center justify-center font-bold"
                        >
                          <Minus size={13} />
                        </button>
                        <span className="w-8 text-center font-bold text-sm text-[#EE6C8D]">
                          {guestCount}
                        </span>
                        <button
                          type="button"
                          onClick={() => setGuestCount((c) => c + 1)}
                          className="w-7 h-7 rounded-lg bg-gray-100 hover:bg-gray-200 text-[#444] flex items-center justify-center font-bold"
                        >
                          <Plus size={13} />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* 6. Phương thức di chuyển (Tự di chuyển hay đi xe chuẩn bị) */}
                  <div className="bg-white/80 rounded-xl p-3 border border-[#EADBBD] animate-fade-in space-y-2">
                    <div className="font-semibold text-[#444] flex items-center gap-1.5">
                      <Bus size={13} className="text-[#8B9B4B]" />
                      <span>Hình thức di chuyển của bạn:</span>
                    </div>
                    
                    <div className="space-y-2.5 text-[11px]">
                      {/* Tự di chuyển */}
                      <label className="flex items-start gap-2.5 cursor-pointer text-[#444] hover:text-black">
                        <input
                          type="radio"
                          name="transport"
                          value="self"
                          checked={transport === 'self'}
                          onChange={() => setTransport('self')}
                          className="text-[#9EB05B] w-4 h-4 accent-[#9EB05B] mt-0.5"
                        />
                        <div>
                          <span className="font-semibold text-[#333]">🚗 Tự túc di chuyển</span>
                          <span className="block text-[10.5px] text-[#7A5B64]">
                            Tôi sẽ tự túc phương tiện cá nhân đến chung vui cùng gia đình
                          </span>
                        </div>
                      </label>

                      {/* Đi xe đưa đón của gia đình */}
                      <label className="flex items-start gap-2.5 cursor-pointer text-[#444] hover:text-black">
                        <input
                          type="radio"
                          name="transport"
                          value="shuttle"
                          checked={transport === 'shuttle'}
                          onChange={() => setTransport('shuttle')}
                          className="text-[#9EB05B] w-4 h-4 accent-[#9EB05B] mt-0.5"
                        />
                        <div>
                          <span className="font-semibold text-[#333]">🚌 Đi xe đưa đón của gia đình</span>
                          <span className="block text-[10.5px] text-[#7A5B64] leading-relaxed mt-0.5 bg-[#FAF4EB] p-2 rounded-lg border border-[#EADBBD]">
                            📍 Gia đình có chuẩn bị xe đưa đón. Quý khách vui lòng có mặt tại <strong>Bến xe Miền Đông cũ (Q. Bình Thạnh) lúc 08:00 sáng</strong> để xe khởi hành đúng giờ.
                          </span>
                        </div>
                      </label>
                    </div>
                  </div>
                </>
              )}

              {/* Submit */}
              <div className="pt-2 text-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#9EB05B] hover:bg-[#8CA048] disabled:opacity-60 disabled:cursor-not-allowed text-white font-serif font-bold text-xs tracking-widest uppercase py-3 rounded-full shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={13} className="animate-spin" />
                      <span>ĐANG GỬI...</span>
                    </>
                  ) : (
                    <>
                      <Send size={13} />
                      <span>GỬI XÁC NHẬN</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* Confirmation Screen */
          <div className="text-center py-2 animate-scale-up">
            <div className="w-16 h-16 rounded-full bg-[#EAF2D5] text-[#9EB05B] flex items-center justify-center mx-auto mb-3 shadow-inner">
              <CheckCircle2 size={36} />
            </div>

            <h3 className="font-serif text-2xl font-bold text-[#EE6C8D] mb-1">
              Cảm Ơn Bạn Rất Nhiều!
            </h3>
            <p className="text-xs text-[#7A5B64] mb-4">
              {attendance === 'yes'
                ? `Thanh Sơn & Quỳnh Như rất vui mừng và háo hức chờ đón bạn (${guestCount} khách) cùng gia đình!`
                : 'Rất tiếc khi bạn không thể tham dự, nhưng cảm ơn bạn đã gửi lời chúc tốt lành đến hai chúng mình!'}
            </p>

            <div className="bg-white/80 rounded-2xl p-3.5 text-left border border-[#E8DEC8] text-xs space-y-2 mb-5">
              <div className="flex justify-between">
                <span className="text-[#888]">Khách mời:</span>
                <span className="font-semibold text-[#444]">{guestName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#888]">Số điện thoại:</span>
                <span className="font-semibold text-[#444]">{phoneNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#888]">Trạng thái:</span>
                <span className={`font-semibold ${attendance === 'yes' ? 'text-green-600' : 'text-[#EE6C8D]'}`}>
                  {attendance === 'yes' ? `Sẽ đến (${guestCount} người)` : 'Không thể đến'}
                </span>
              </div>
              {attendance === 'yes' && (
                <>
                  <div className="border-t border-gray-100 pt-1.5">
                    <span className="text-[#888] block mb-0.5">Buổi tiệc tham dự:</span>
                    <span className="font-medium text-[#444]">{getEventText()}</span>
                  </div>
                  <div className="border-t border-gray-100 pt-1.5">
                    <span className="text-[#888] block mb-0.5">Hình thức di chuyển:</span>
                    <span className="font-medium text-[#444]">{getTransportText()}</span>
                  </div>
                </>
              )}
            </div>

            <div className="space-y-2">
              <a
                href={`https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${shareText}`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 rounded-full bg-[#2AABEE] text-white font-medium text-xs flex items-center justify-center gap-1.5 hover:bg-[#2297D4] transition-colors shadow-xs"
              >
                <Share2 size={13} />
                <span>Gửi qua Tin Nhắn / Telegram</span>
              </a>

              <button
                onClick={handleReset}
                className="w-full py-2.5 rounded-full bg-[#9EB05B] text-white font-serif font-bold tracking-wider text-xs uppercase hover:bg-[#8CA048] transition-colors shadow-xs cursor-pointer"
              >
                ĐÓNG
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
