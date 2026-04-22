import { createClient } from '@supabase/supabase-js';

let supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder';

// Fix URL if user forgot https://
if (supabaseUrl && !supabaseUrl.startsWith('http')) {
  supabaseUrl = `https://${supabaseUrl}`;
}

if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
  console.error('🚨 ATENCIÓN: Faltan las variables de entorno de Supabase.');
}

export let supabase;

try {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
} catch (e) {
  console.error('Failed to initialize Supabase client:', e);
  // Fallback so the app doesn't crash
  supabase = createClient('https://placeholder.supabase.co', 'placeholder');
}
