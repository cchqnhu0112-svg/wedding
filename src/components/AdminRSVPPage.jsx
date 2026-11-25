import React, { useState, useEffect, useMemo } from 'react';
import {
  Users,
  CheckCircle2,
  XCircle,
  Bus,
  Car,
  Utensils,
  PartyPopper,
  RefreshCw,
  Download,
  Search,
  Phone,
  ArrowLeft,
  Loader2,
  CalendarClock
} from 'lucide-react';
import { fetchRSVPs } from '../lib/supabase';

export const AdminRSVPPage = ({ onBackToInvitation }) => {
  const [rsvps, setRsvps] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all'); // 'all' | 'yes' | 'no' | 'shuttle' | 'dinner' | 'wedding'

  const loadData = async () => {
    setIsLoading(true);
    setError('');
    try {
      const data = await fetchRSVPs();
      setRsvps(data);
    } catch (err) {
      console.error('Error fetching RSVPs:', err);
      setError('Không thể tải danh sách từ Supabase. Vui lòng thử lại.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Summary statistics
  const stats = useMemo(() => {
    const attending = rsvps.filter((r) => r.attendance === 'yes');
    const declined = rsvps.filter((r) => r.attendance === 'no');
    const totalGuests = attending.reduce((sum, r) => sum + (Number(r.guest_count) || 1), 0);

    const dinnerList = attending.filter((r) => Array.isArray(r.events) && r.events.includes('dinner'));
    const dinnerGuests = dinnerList.reduce((sum, r) => sum + (Number(r.guest_count) || 1), 0);

    const weddingList = attending.filter((r) => Array.isArray(r.events) && r.events.includes('wedding'));
    const weddingGuests = weddingList.reduce((sum, r) => sum + (Number(r.guest_count) || 1), 0);

    const shuttleList = attending.filter((r) => r.transport === 'shuttle');
    const shuttleGuests = shuttleList.reduce((sum, r) => sum + (Number(r.guest_count) || 1), 0);

    return {
      totalResponses: rsvps.length,
      attendingCount: attending.length,
      declinedCount: declined.length,
      totalGuests,
      dinnerCount: dinnerList.length,
      dinnerGuests,
      weddingCount: weddingList.length,
      weddingGuests,
      shuttleCount: shuttleList.length,
      shuttleGuests,
    };
  }, [rsvps]);

  // Filtered list
  const filteredRsvps = useMemo(() => {
    return rsvps.filter((item) => {
      // Search filter
      const q = searchTerm.trim().toLowerCase();
      const matchesSearch =
        !q ||
        (item.guest_name && item.guest_name.toLowerCase().includes(q)) ||
        (item.phone && item.phone.toLowerCase().includes(q));

      if (!matchesSearch) return false;

      // Category filter
      if (filterType === 'yes') return item.attendance === 'yes';
      if (filterType === 'no') return item.attendance === 'no';
      if (filterType === 'shuttle') return item.attendance === 'yes' && item.transport === 'shuttle';
      if (filterType === 'dinner') return item.attendance === 'yes' && Array.isArray(item.events) && item.events.includes('dinner');
      if (filterType === 'wedding') return item.attendance === 'yes' && Array.isArray(item.events) && item.events.includes('wedding');
      return true;
    });
  }, [rsvps, searchTerm, filterType]);

  const formatDateTime = (iso) => {
    if (!iso) return '';
    try {
      return new Intl.DateTimeFormat('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }).format(new Date(iso));
    } catch {
      return iso;
    }
  };

  // Export UTF-8 CSV for Excel
  const handleExportCSV = () => {
    const headers = [
      'STT',
      'Họ và tên',
      'Số điện thoại',
      'Trạng thái',
      'Số khách',
      'Bữa cơm thân mật (25/12)',
      'Tiệc cưới (26/12)',
      'Di chuyển',
      'Thời gian gửi',
    ];

    const rows = filteredRsvps.map((r, idx) => {
      const isYes = r.attendance === 'yes';
      const hasDinner = isYes && Array.isArray(r.events) && r.events.includes('dinner');
      const hasWedding = isYes && Array.isArray(r.events) && r.events.includes('wedding');
      const transportLabel = !isYes
        ? '-'
        : r.transport === 'shuttle'
        ? 'Xe đưa đón (BX Miền Đông cũ 08:00)'
        : 'Tự túc di chuyển';

      return [
        idx + 1,
        `"${(r.guest_name || '').replace(/"/g, '""')}"`,
        `"${(r.phone || '').replace(/"/g, '""')}"`,
        isYes ? 'Tham dự' : 'Không tham dự',
        isYes ? r.guest_count || 1 : 0,
        hasDinner ? 'Có' : 'Không',
        hasWedding ? 'Có' : 'Không',
        `"${transportLabel}"`,
        `"${formatDateTime(r.created_at)}"`,
      ].join(',');
    });

    const csvContent = '\uFEFF' + [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `danh-sach-rsvp-son-nhu-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-[#FAF5EB] text-[#444] py-6 px-3 sm:px-6">
      <div className="max-w-5xl mx-auto space-y-5">
        {/* Header Bar */}
        <div className="bg-white rounded-3xl p-5 border-2 border-[#EADBBD] shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#8B9B4B] font-semibold uppercase tracking-widest mb-1">
              <span>Quản lý khách mời • Lễ Vu Quy</span>
            </div>
            <h1 className="font-serif text-2xl font-bold text-[#EE6C8D]">
              Thanh Sơn & Quỳnh Như
            </h1>
            <p className="text-xs text-[#7A5B64] mt-0.5">
              Danh sách khách xác nhận tham dự (RSVP) cập nhật trực tiếp từ Supabase
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={onBackToInvitation}
              className="px-3.5 py-2 rounded-full bg-[#FAF5EB] hover:bg-[#F2EAD9] border border-[#D9CDB8] text-[#6B5A4B] text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <ArrowLeft size={14} />
              <span>Xem thiệp</span>
            </button>

            <button
              onClick={loadData}
              disabled={isLoading}
              className="px-3.5 py-2 rounded-full bg-white hover:bg-gray-50 border border-[#D9CDB8] text-[#6B5A4B] text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
            >
              <RefreshCw size={14} className={isLoading ? 'animate-spin' : ''} />
              <span>Làm mới</span>
            </button>

            <button
              onClick={handleExportCSV}
              disabled={filteredRsvps.length === 0}
              className="px-4 py-2 rounded-full bg-[#9EB05B] hover:bg-[#8CA048] text-white text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer disabled:opacity-50"
            >
              <Download size={14} />
              <span>Xuất Excel (.csv)</span>
            </button>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          <div className="bg-white rounded-2xl p-3.5 border border-[#EADBBD] shadow-2xs">
            <div className="flex items-center justify-between text-[#8A7968] text-[11px] font-medium mb-1">
              <span>Tổng phản hồi</span>
              <Users size={15} className="text-[#84ACCE]" />
            </div>
            <div className="text-2xl font-bold text-[#333]">{stats.totalResponses}</div>
            <div className="text-[11px] text-[#999] mt-0.5">
              {stats.declinedCount} vắng mặt
            </div>
          </div>

          <div className="bg-white rounded-2xl p-3.5 border border-[#EADBBD] shadow-2xs">
            <div className="flex items-center justify-between text-[#8A7968] text-[11px] font-medium mb-1">
              <span>Khách tham dự</span>
              <CheckCircle2 size={15} className="text-[#9EB05B]" />
            </div>
            <div className="text-2xl font-bold text-[#9EB05B]">{stats.totalGuests}</div>
            <div className="text-[11px] text-[#999] mt-0.5">
              {stats.attendingCount} lượt xác nhận
            </div>
          </div>

          <div className="bg-white rounded-2xl p-3.5 border border-[#EADBBD] shadow-2xs">
            <div className="flex items-center justify-between text-[#8A7968] text-[11px] font-medium mb-1">
              <span>Cơm thân mật (25/12)</span>
              <Utensils size={15} className="text-[#E5A824]" />
            </div>
            <div className="text-2xl font-bold text-[#E5A824]">{stats.dinnerGuests}</div>
            <div className="text-[11px] text-[#999] mt-0.5">
              {stats.dinnerCount} lượt đăng ký
            </div>
          </div>

          <div className="bg-white rounded-2xl p-3.5 border border-[#EADBBD] shadow-2xs">
            <div className="flex items-center justify-between text-[#8A7968] text-[11px] font-medium mb-1">
              <span>Tiệc cưới (26/12)</span>
              <PartyPopper size={15} className="text-[#EE6C8D]" />
            </div>
            <div className="text-2xl font-bold text-[#EE6C8D]">{stats.weddingGuests}</div>
            <div className="text-[11px] text-[#999] mt-0.5">
              {stats.weddingCount} lượt đăng ký
            </div>
          </div>

          <div className="bg-white rounded-2xl p-3.5 border border-[#EADBBD] shadow-2xs col-span-2 md:col-span-1">
            <div className="flex items-center justify-between text-[#8A7968] text-[11px] font-medium mb-1">
              <span>Đi xe đưa đón</span>
              <Bus size={15} className="text-[#84ACCE]" />
            </div>
            <div className="text-2xl font-bold text-[#84ACCE]">{stats.shuttleGuests}</div>
            <div className="text-[11px] text-[#999] mt-0.5">
              {stats.shuttleCount} lượt tại BX Miền Đông
            </div>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white rounded-2xl p-3.5 border border-[#EADBBD] shadow-2xs flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          <div className="relative flex-1">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A59483]" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Tìm theo tên hoặc số điện thoại..."
              className="w-full bg-[#FAF5EB]/70 border border-[#D9CDB8] focus:border-[#9EB05B] rounded-xl py-2 pl-9 pr-3 text-xs outline-none transition-colors"
            />
          </div>

          <div className="flex flex-wrap gap-1.5 text-[11px]">
            {[
              { id: 'all', label: 'Tất cả' },
              { id: 'yes', label: 'Tham dự' },
              { id: 'dinner', label: 'Cơm thân mật' },
              { id: 'wedding', label: 'Tiệc cưới' },
              { id: 'shuttle', label: 'Xe đưa đón' },
              { id: 'no', label: 'Vắng mặt' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilterType(tab.id)}
                className={`px-3 py-1.5 rounded-full font-medium transition-all cursor-pointer ${
                  filterType === tab.id
                    ? 'bg-[#EE6C8D] text-white shadow-2xs'
                    : 'bg-[#FAF5EB] text-[#6B5A4B] hover:bg-[#EFE6D5]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 rounded-2xl p-4 text-xs">
            {error}
          </div>
        )}

        {/* Table / List */}
        <div className="bg-white rounded-3xl border border-[#EADBBD] shadow-sm overflow-hidden">
          {isLoading ? (
            <div className="py-16 flex flex-col items-center justify-center text-xs text-[#8A7968] gap-2">
              <Loader2 size={24} className="animate-spin text-[#9EB05B]" />
              <span>Đang tải danh sách khách mời...</span>
            </div>
          ) : filteredRsvps.length === 0 ? (
            <div className="py-16 text-center text-xs text-[#8A7968]">
              Không tìm thấy dữ liệu xác nhận tham dự nào phù hợp.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-[#FAF5EB] border-b border-[#EADBBD] text-[#6B5A4B] font-semibold">
                    <th className="py-3 px-4">#</th>
                    <th className="py-3 px-4">Khách mời</th>
                    <th className="py-3 px-4">Số điện thoại</th>
                    <th className="py-3 px-4">Trạng thái</th>
                    <th className="py-3 px-4 text-center">Số khách</th>
                    <th className="py-3 px-4">Buổi tiệc tham dự</th>
                    <th className="py-3 px-4">Di chuyển</th>
                    <th className="py-3 px-4">Thời gian gửi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F3EBDC]">
                  {filteredRsvps.map((item, idx) => {
                    const isYes = item.attendance === 'yes';
                    const hasDinner = isYes && Array.isArray(item.events) && item.events.includes('dinner');
                    const hasWedding = isYes && Array.isArray(item.events) && item.events.includes('wedding');

                    return (
                      <tr key={item.id} className="hover:bg-[#FAF5EB]/40 transition-colors">
                        <td className="py-3 px-4 text-[#999]">{idx + 1}</td>
                        <td className="py-3 px-4 font-semibold text-[#333]">
                          {item.guest_name}
                        </td>
                        <td className="py-3 px-4">
                          {item.phone ? (
                            <a
                              href={`tel:${item.phone}`}
                              className="inline-flex items-center gap-1 text-[#84ACCE] hover:underline font-medium"
                            >
                              <Phone size={12} />
                              <span>{item.phone}</span>
                            </a>
                          ) : (
                            <span className="text-[#BBB]">—</span>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          {isYes ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#EAF2D5] text-[#6F8232] font-semibold text-[11px]">
                              <CheckCircle2 size={12} />
                              Tham dự
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-50 text-[#D64D72] font-semibold text-[11px]">
                              <XCircle size={12} />
                              Vắng mặt
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-center font-bold text-[#EE6C8D]">
                          {isYes ? item.guest_count || 1 : 0}
                        </td>
                        <td className="py-3 px-4">
                          {isYes ? (
                            <div className="flex flex-wrap gap-1">
                              {hasDinner && (
                                <span className="px-2 py-0.5 rounded-md bg-[#FFF4D6] text-[#9E700D] text-[11px] font-medium">
                                  🍲 Cơm thân mật (25/12)
                                </span>
                              )}
                              {hasWedding && (
                                <span className="px-2 py-0.5 rounded-md bg-[#FCE8EE] text-[#C43B64] text-[11px] font-medium">
                                  🎉 Tiệc cưới (26/12)
                                </span>
                              )}
                            </div>
                          ) : (
                            <span className="text-[#BBB]">—</span>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          {isYes ? (
                            item.transport === 'shuttle' ? (
                              <span className="inline-flex items-center gap-1 text-[#4B7DA3] font-medium bg-[#EAF4FA] px-2 py-0.5 rounded-md text-[11px]">
                                <Bus size={12} />
                                Xe đưa đón (08:00)
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-[#6B5A4B] text-[11px]">
                                <Car size={12} />
                                Tự túc
                              </span>
                            )
                          ) : (
                            <span className="text-[#BBB]">—</span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-[11px] text-[#8A7968] whitespace-nowrap">
                          <span className="inline-flex items-center gap-1">
                            <CalendarClock size={12} />
                            {formatDateTime(item.created_at)}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
