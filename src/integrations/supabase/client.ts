
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://tcknksaobbtpkysdsupn.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRja25rc2FvYmJ0cGt5c2RzdXBuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEyNjQ0NDUsImV4cCI6MjA1Njg0MDQ0NX0.NC4MWraTWLa2TWzuEnft2x0lKuogIH9ZJI87tqdriBY";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

// Helper function to type-cast Supabase queries for tables not in the generated types
export const typedSupabaseQuery = <T>(tableName: string) => {
  return supabase.from(tableName) as unknown as ReturnType<typeof supabase.from<T>>;
};
