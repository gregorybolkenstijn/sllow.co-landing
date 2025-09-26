import { useForm, SubmitHandler } from 'react-hook-form'
import { useState } from 'react'

import { Input } from './Input'
import { supabase } from '../lib/supabase'

type InputData = {
  name: string
  email: string
}

export function ContactForm() {
  const { register, handleSubmit } = useForm<InputData>()
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  const onSubmit: SubmitHandler<InputData> = async (data) => {
    setFormStatus('submitting')

    try {
      const { error } = await supabase.from('prelaunch').insert([
        {
          name: data.name,
          email: data.email,
          signed_up_date: new Date().toISOString(),
        },
      ])

      if (error) {
        setFormStatus('error')
        return
      }

      setFormStatus('success')
    } catch {
      setFormStatus('error')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
      {formStatus !== 'success' && (
        <>
          <p>Leave your email address and we'll let you know when we launch.</p>

          <Input type='text' placeholder='Your name' required autoComplete='name' {...register('name')} />

          <Input type='email' placeholder='Your email' required autoComplete='email' {...register('email')} />

          {formStatus === 'error' && (
            <p className='text-red-950 text-sm text-center'>Something went wrong, please try again.</p>
          )}

          <button
            type='submit'
            disabled={formStatus === 'submitting'}
            className='cursor-pointer w-full bg-cream text-primary font-bold py-3 px-6 rounded-lg hover:bg-cream/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
          >
            {formStatus === 'submitting' ? 'Submitting...' : 'Get notified'}
          </button>
        </>
      )}

      {formStatus === 'success' && <p>Thank you, you'll be one of the first to know when we launch.</p>}
    </form>
  )
}
