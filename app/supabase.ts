// supabase.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://iuqvcloueyofouggzuqp.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml1cXZjbG91ZXlvZm91Z2d6dXFwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ1NTUxNDEsImV4cCI6MjA2MDEzMTE0MX0.Lf3AQMXtG-fTZKbnGFqdFmFuiR33Z2OdtP3_VHpf5rc';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
