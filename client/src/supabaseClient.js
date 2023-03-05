import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://qqfktkpxbhnruikwfzbp.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFxZmt0a3B4YmhucnVpa3dmemJwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzcxODE3NzcsImV4cCI6MTk5Mjc1Nzc3N30.AKbmKpXSNpEfhQbkNypsVHbo273wKUN4wsXY02VTbkA"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)