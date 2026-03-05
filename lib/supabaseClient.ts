import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const isPlaceholder =
  !supabaseUrl ||
  !supabaseAnonKey ||
  supabaseUrl.includes('your-project-id') ||
  supabaseAnonKey.includes('your-anon-key');

export const isSupabaseConfigured = !isPlaceholder;

const url = isPlaceholder ? 'https://placeholder.supabase.co' : supabaseUrl;
const key = isPlaceholder ? 'placeholder-key' : supabaseAnonKey;

export const supabase: SupabaseClient = createClient(url, key);

