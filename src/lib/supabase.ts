import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://qexiyflqdrzouoimrbzn.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

console.log('✅ Supabase connected to JoinEcoGrow')

