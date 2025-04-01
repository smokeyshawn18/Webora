import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
export const supabase = createClient(
  "https://iyvufpuhwxekjujrpkus.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml5dnVmcHVod3hla2p1anJwa3VzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMwOTE5NTgsImV4cCI6MjA1ODY2Nzk1OH0.KkKSVuDvzgB1mGvbpk6nNoPgirRR2Qo_GAdQ8tCut1o"
);
