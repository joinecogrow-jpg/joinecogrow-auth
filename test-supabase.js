﻿import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

(async () => {
  const { data, error } = await supabase
    .from('trees')
    .select('*')
    .limit(1);

  if (error) console.error(error);
  else console.log('Connection successful: ', data);
})();
