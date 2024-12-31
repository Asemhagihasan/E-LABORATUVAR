import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://cjgvfwvxrnuhzpstklih.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNqZ3Zmd3Z4cm51aHpwc3RrbGloIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMyNTE2MjksImV4cCI6MjA0ODgyNzYyOX0.ya3qmGhJ5fJ3VnFhfXGKrr50j20LX5FYLN8ikkrAf-s";
const serviceRole =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNqZ3Zmd3Z4cm51aHpwc3RrbGloIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczMzI1MTYyOSwiZXhwIjoyMDQ4ODI3NjI5fQ.ahwNpvGH8CTsKUBvtHLMa9oSCO5WnMd0_Iiyw5qiLnY";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

export const adminSupabase = createClient(supabaseUrl, serviceRole);
