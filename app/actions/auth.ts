'use server';

import { cookies } from 'next/headers';
import { supabase } from '@/lib/supabase';
import { hashPassword, verifyPassword } from '@/lib/hash';

export async function registerUser(formData: any) {
  try {
    const { namaLengkap, username, kelas, absen, password, agreeTerms } = formData;

    if (!namaLengkap || !username || !kelas || !absen || !password) {
      return { success: false, error: 'Kabeh kolom kudu diisi!' };
    }

    if (!agreeTerms) {
      return { success: false, error: 'Sampeyan kudu setuju karo syarat & ketentuan!' };
    }

    // 1. Check if user already exists
    const { data: existingUser, error: checkError } = await supabase
      .from('users')
      .select('id')
      .eq('username', username.trim().toLowerCase())
      .maybeSingle();

    if (checkError) {
      console.error('Error checking user:', checkError);
      return { success: false, error: 'Ana kesalahan nalika mriksa username.' };
    }

    if (existingUser) {
      return { success: false, error: 'Username wis dianggo wong liya!' };
    }

    // 2. Hash password
    const hashedPassword = hashPassword(password);

    // 3. Insert user into Supabase 'users' table
    const { data: newUser, error: insertError } = await supabase
      .from('users')
      .insert([
        {
          nama_lengkap: namaLengkap.trim(),
          username: username.trim().toLowerCase(),
          kelas: kelas.trim(),
          nomor_absen: parseInt(absen, 10),
          kata_sandi: hashedPassword,
          setuju_syarat: agreeTerms,
        }
      ])
      .select('id, nama_lengkap, username, kelas, nomor_absen')
      .single();

    if (insertError) {
      console.error('Error inserting user:', insertError);
      return { success: false, error: 'Gagal ndhaptar pangguna anyar.' };
    }

    // 4. Set session cookie
    const cookieStore = await cookies();
    cookieStore.set('user_session', JSON.stringify(newUser), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/',
    });

    return { success: true, user: newUser };
  } catch (err: any) {
    console.error('Registration exception:', err);
    return { success: false, error: 'Ana kesalahan sistem.' };
  }
}

export async function loginUser(formData: any) {
  try {
    const { username, password } = formData;

    if (!username || !password) {
      return { success: false, error: 'Kabeh kolom kudu diisi!' };
    }

    // 1. Fetch user from Supabase
    const { data: user, error: fetchError } = await supabase
      .from('users')
      .select('id, nama_lengkap, username, kelas, nomor_absen, kata_sandi')
      .eq('username', username.trim().toLowerCase())
      .maybeSingle();

    if (fetchError) {
      console.error('Error fetching user:', fetchError);
      return { success: false, error: 'Ana kesalahan nalika mlebu.' };
    }

    if (!user) {
      return { success: false, error: 'Username utawa kata sandi salah!' };
    }

    // 2. Verify password
    const isPasswordCorrect = verifyPassword(password, user.kata_sandi);

    if (!isPasswordCorrect) {
      return { success: false, error: 'Username utawa kata sandi salah!' };
    }

    // 3. Prepare user data (excluding password)
    const sessionUser = {
      id: user.id,
      nama_lengkap: user.nama_lengkap,
      username: user.username,
      kelas: user.kelas,
      nomor_absen: user.nomor_absen,
    };

    // 4. Set session cookie
    const cookieStore = await cookies();
    cookieStore.set('user_session', JSON.stringify(sessionUser), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/',
    });

    return { success: true, user: sessionUser };
  } catch (err: any) {
    console.error('Login exception:', err);
    return { success: false, error: 'Ana kesalahan sistem.' };
  }
}

export async function logoutUser() {
  const cookieStore = await cookies();
  cookieStore.delete('user_session');
  return { success: true };
}

export async function getCurrentUser() {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get('user_session');
    if (!session || !session.value) {
      return null;
    }
    return JSON.parse(session.value);
  } catch {
    return null;
  }
}
