import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

export default async function PrivatePage() {
  const supabase = await createClient()



  return (
    <div className='w-full h-screen flex justify-center items-center'>
    </div>
  )
}