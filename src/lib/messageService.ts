import { supabase } from '@/lib/supabase'

export const createMessageService = async ({
  name,
  email,
  message,
}: {
  name: string
  email: string
  message: string
}) => {
  let emailSent = false
  let dbSaved = false

  // 1. Send Email Notification via Next.js API Route (Resend)
  try {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, message }),
    })
    if (res.ok) emailSent = true
  } catch (notifyErr) {
    console.warn('Email notification fetch error:', notifyErr)
  }

  // 2. Insert into Supabase database (if online)
  try {
    const { error } = await supabase
      .from('messages')
      .insert([{ name, email, message }])

    if (!error) dbSaved = true
    else console.warn('Supabase DB message insert error:', error.message)
  } catch (dbErr) {
    console.warn('Supabase unreachable or paused:', dbErr)
  }

  // If at least one channel succeeded, consider submission a success!
  if (emailSent || dbSaved) {
    return true
  }

  throw new Error('Failed to deliver message. Please email directly.')
}
