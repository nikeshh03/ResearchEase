
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://gxhyjaaamzyiczyrccty.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd4aHlqYWFhbXp5aWN6eXJjY3R5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA4MjE5MjUsImV4cCI6MjA1NjM5NzkyNX0.8vwTQzb7AdaLkiwjluMX5YrRK_mVKOCYbY3mb1H-kxA";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY);
