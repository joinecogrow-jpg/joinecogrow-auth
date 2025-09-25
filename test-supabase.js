import { supabase } from '@/lib/supabase';

async function testSupabase() {
  const { data, error } = await supabase
    .from('trees')
    .select('*')
    .limit(1);
  console.log(data, error);
}
testSupabase();
