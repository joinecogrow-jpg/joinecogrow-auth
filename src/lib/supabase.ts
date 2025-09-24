import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://qexiyflqdrzouoimrbzn.supabase.co', 
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFleGl5ZmxxZHJ6b3VvaW1yYnpuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg1NTcwMjUsImV4cCI6MjA3NDEzMzAyNX0.95hnXHdXNnI8WPaINUpCZLeCCfYijT4axJQToNbqvsw'
)
