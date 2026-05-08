'use server'
import { supabase } from '@/lib/supabaseClient'
import { revalidatePath } from 'next/cache'

export async function deleteReportAction(id) {
  const { error } = await supabase.from('reports').delete().eq('id', id)
  
  if (!error) {
    // Memberitahu Next.js untuk memperbarui data di halaman terkait
    revalidatePath('/user/dashboard') 
  }
}