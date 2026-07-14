'use server';

import { supabase } from '@/lib/supabase';
import { getCurrentUser } from './auth';

export async function submitScoreAndGetLeaderboard(poin: number, waktu: number) {
  try {
    const user = await getCurrentUser();
    if (!user) return { success: false, error: 'Pangguna durung mlebu (Not logged in)' };

    // 1. Insert into rank
    const { data: newRow, error: insertError } = await supabase
      .from('rank')
      .insert([{
        id_user: user.id,
        nama_user: user.nama_lengkap,
        kelas: user.kelas,
        poin: poin,
        waktu_penyelesaian: waktu
      }])
      .select('*')
      .single();

    if (insertError) {
      console.error('Error inserting rank:', insertError);
      return { success: false, error: 'Gagal nyimpen data peringkat' };
    }

    // 2. Fetch all ranks to determine positions
    const { data: allRanks, error: fetchError } = await supabase
      .from('rank')
      .select('*')
      .order('poin', { ascending: false })
      .order('waktu_penyelesaian', { ascending: true });

    if (fetchError || !allRanks) {
       console.error('Error fetching ranks:', fetchError);
       return { success: false, error: 'Gagal njupuk data ranking' };
    }

    // 3. Process ranks
    let currentRank = 1;
    let userRankItem = null;

    for (let i = 0; i < allRanks.length; i++) {
      allRanks[i].peringkat = currentRank;
      
      if (allRanks[i].id === newRow.id) {
         userRankItem = { ...allRanks[i] };
      }
      currentRank++;
    }

    // 4. Construct final array based on requirements
    // - Jika juara 4 ke bawah: tampilkan 3 teratas, lalu dibawahnya perolehan user.
    // - Jika juara 3 ke atas: tampilkan 4 (atau 3) teratas.
    let finalRanks = [];
    
    if (userRankItem) {
       if (userRankItem.peringkat <= 3) {
          // User in top 3. Show top 4
          finalRanks = allRanks.slice(0, 4);
       } else {
          // User rank > 3. Show top 3, then user's row
          finalRanks = allRanks.slice(0, 3);
          finalRanks.push(userRankItem);
       }
    } else {
       finalRanks = allRanks.slice(0, 4);
    }

    return { success: true, leaderboard: finalRanks, currentRunId: newRow.id };
  } catch (err) {
    console.error('Rank submit exception:', err);
    return { success: false, error: 'Ana kesalahan sistem.' };
  }
}
