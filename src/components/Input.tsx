import { clsx } from 'clsx'
import { HTMLProps, useId } from 'react'

type InputProps = Omit<HTMLProps<HTMLInputElement>, 'className'>

export const Input = (attributes: InputProps) => {
  const id = attributes.id || useId()

  return (
    <>
      <label htmlFor={id} className='sr-only'>
        {attributes.placeholder}
      </label>

      <input
        {...attributes}
        id={id}
        className={clsx(
          'block w-full px-16 py-8 rounded-lg ',
          'paragraph-sm text-deep-brown placeholder-warm-oat',
          'border-2 bg-cotton-light border-warm-oat focus:border-deep-brown',
          'outline-none',
          'disabled:opacity-70 disabled:cursor-not-allowed'
        )}
      />
    </>
  )
}
