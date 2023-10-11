import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://fhlzckkowuelginwijoa.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZobHpja2tvd3VlbGdpbndpam9hIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTY5MTk3NTUsImV4cCI6MjAxMjQ5NTc1NX0.Cx-78_mkbvO5MT4m6VmBR350e4Uoj1XapOoDv_W65Hc";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
