import { useForm, SubmitHandler } from 'react-hook-form'
import { useEffect, useRef, useState } from 'react'

import { Input } from './Input'
import { storeContact } from '../server-state/website-contact-form-2026'
import { clsx } from 'clsx'

type InputData = {
  name: string
  email: string
}

export function ContactForm() {
  const { register, handleSubmit } = useForm<InputData>()
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const formRef = useRef<HTMLFormElement>(null)
  const maxHeightRef = useRef<number>(0)

  useEffect(() => {
    const formElement = formRef.current

    if (!formElement) return

    const updateHeight = () => {
      const currentHeight = formElement.getBoundingClientRect().height

      if (currentHeight > maxHeightRef.current) {
        maxHeightRef.current = currentHeight
        const remHeight = currentHeight / 16
        formElement.style.height = `${remHeight}rem`
      }
    }

    const resizeObserver = new ResizeObserver(updateHeight)

    updateHeight()
    resizeObserver.observe(formElement)

    return () => {
      resizeObserver.disconnect()
    }
  }, [formStatus])

  const onSubmit: SubmitHandler<InputData> = async (data) => {
    setFormStatus('submitting')

    const result = await storeContact(data)

    if (!result.success) {
      setFormStatus('error')
      return
    }

    setFormStatus('success')
  }

  const isSubmitting = formStatus === 'submitting'

  return (
    <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className='block space-y-16'>
      {formStatus !== 'success' && (
        <>
          <p className='paragraph-sm'>Hello, please leave your email address to receive updates from us.</p>

          <div className='space-y-12'>
            <Input
              type='text'
              placeholder='Your name'
              required
              autoComplete='name'
              disabled={isSubmitting}
              {...register('name')}
            />

            <Input
              type='email'
              placeholder='Your email address'
              required
              autoComplete='email'
              disabled={isSubmitting}
              {...register('email')}
            />

            {formStatus === 'error' && (
              <p className='paragraph-sm text-red-950 text-center'>Something went wrong, please try again.</p>
            )}

            <button
              type='submit'
              disabled={isSubmitting}
              className={clsx(
                'cursor-pointer w-full paragraph-bold-sm text-center rounded-lg',
                'py-8 px-16 bg-warm-oat text-deep-brown hover:bg-warm-oat/80 focus:outline-none focus:bg-warm-oat/90 transition-colors disabled:opacity-70 disabled:cursor-not-allowed'
              )}
            >
              {isSubmitting ? 'Sending...' : 'Submit'}
            </button>
          </div>
        </>
      )}

      {formStatus === 'success' && (
        <p className='paragraph-sm text-center'>Thank you, you'll be one of the first to know when we launch.</p>
      )}
    </form>
  )
}
