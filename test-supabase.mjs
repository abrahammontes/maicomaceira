import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const envFile = fs.readFileSync('.env', 'utf8');
const env = Object.fromEntries(envFile.split('\n').filter(Boolean).map(line => line.split('=')));

const supabaseUrl = env.VITE_SUPABASE_URL.trim();
const supabaseAnonKey = env.VITE_SUPABASE_ANON_KEY.trim();

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing credentials in .env');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testConnection() {
  console.log('Testing connection to:', supabaseUrl);
  try {
    const { data, error } = await supabase.from('images').select('*').limit(1);
    if (error) {
      console.error('Supabase Error:', error);
    } else {
      console.log('Success! Data fetched:', data);
    }
  } catch (err) {
    console.error('Exception during fetch:', err);
  }
}

testConnection();
