-- =============================================
-- Bảng Sổ Lưu Bút (Guestbook) - Thiệp cưới Thanh Sơn & Quỳnh Như
-- Chạy script này trong Supabase Dashboard > SQL Editor
-- =============================================

-- 1. Tạo bảng
CREATE TABLE IF NOT EXISTS guestbook_wishes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  guest_name TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Tắt RLS (web public, không cần login)
ALTER TABLE guestbook_wishes DISABLE ROW LEVEL SECURITY;

-- 3. Cấp quyền cho anonymous users
GRANT SELECT, INSERT ON public.guestbook_wishes TO anon;

-- 4. Index theo ngày tạo
CREATE INDEX IF NOT EXISTS idx_guestbook_created_at ON guestbook_wishes (created_at DESC);
