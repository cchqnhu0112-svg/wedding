import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

// ==================== RSVP ====================

const RSVP_STORAGE_KEY = 'wedding_rsvp_submitted';

/** Check if user already submitted RSVP */
export function hasSubmittedRSVP() {
  try {
    return JSON.parse(localStorage.getItem(RSVP_STORAGE_KEY));
  } catch {
    return null;
  }
}

/** Submit RSVP response to Supabase */
export async function submitRSVP({ guestName, phone, attendance, events, guestCount, transport }) {
  const { data, error } = await supabase
    .from('rsvp_responses')
    .insert([{
      guest_name: guestName,
      phone: phone,
      attendance: attendance,
      events: attendance === 'yes' ? events : [],
      guest_count: attendance === 'yes' ? guestCount : 0,
      transport: attendance === 'yes' ? transport : null,
    }])
    .select();

  if (error) throw error;

  // Save to localStorage to prevent duplicate submissions
  localStorage.setItem(RSVP_STORAGE_KEY, JSON.stringify({
    guestName,
    phone,
    attendance,
    submittedAt: new Date().toISOString(),
  }));

  // Notify components (e.g. GuestbookSection) immediately without requiring page reload
  window.dispatchEvent(new CustomEvent('rsvp-submitted', { detail: { guestName } }));

  return data;
}

/** Fetch all RSVP responses from Supabase */
export async function fetchRSVPs() {
  const { data, error } = await supabase
    .from('rsvp_responses')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

// ==================== GUESTBOOK ====================

/** Fetch all wishes from Supabase */
export async function fetchWishes() {
  const { data, error } = await supabase
    .from('guestbook_wishes')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(50);

  if (error) throw error;
  return data || [];
}

/** Submit a new wish to Supabase */
export async function submitWish({ guestName, message }) {
  const { data, error } = await supabase
    .from('guestbook_wishes')
    .insert([{
      guest_name: guestName,
      message: message,
    }])
    .select();

  if (error) throw error;
  return data;
}
