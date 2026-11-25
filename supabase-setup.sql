-- =============================================
-- Bảng lưu xác nhận tham dự (RSVP) - Thiệp cưới Thanh Sơn & Quỳnh Như
-- Chạy script này trong Supabase Dashboard > SQL Editor
-- =============================================

-- 1. Tạo bảng
CREATE TABLE IF NOT EXISTS rsvp_responses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  guest_name TEXT NOT NULL,
  phone TEXT NOT NULL DEFAULT '',
  attendance TEXT NOT NULL CHECK (attendance IN ('yes', 'no')),
  events TEXT[] DEFAULT '{}',
  guest_count INTEGER DEFAULT 1,
  transport TEXT CHECK (transport IS NULL OR transport IN ('self', 'shuttle')),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Bật Row Level Security
ALTER TABLE rsvp_responses ENABLE ROW LEVEL SECURITY;

-- 3. Cho phép anonymous INSERT (khách mời submit form)
CREATE POLICY "Allow anonymous inserts"
  ON rsvp_responses
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- 4. Cho phép anonymous SELECT (để kiểm tra trùng lặp nếu cần)
CREATE POLICY "Allow anonymous reads"
  ON rsvp_responses
  FOR SELECT
  TO anon
  USING (true);

-- 5. Thêm index theo ngày tạo để sắp xếp nhanh
CREATE INDEX IF NOT EXISTS idx_rsvp_created_at ON rsvp_responses (created_at DESC);
