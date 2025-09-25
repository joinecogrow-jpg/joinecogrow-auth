import { supabase } from '@/lib/supabase';

async function addBetaUsers() {
  const users = ['beta1@example.com', 'beta2@example.com', 'beta3@example.com'];
  for (const email of users) {
    await supabase.auth.signUp({ email, password: 'TestPass2025' });
    await supabase.from('users').insert({ email, username: email.split('@')[0], features_enabled: ['all'] });
  }
  console.log('Beta users added!');
}
addBetaUsers();
