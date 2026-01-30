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
          'text-16 text-deep-brown placeholder-warm-sand/70',
          'border-2 bg-cotton-light border-caramel focus:border-deep-brown',
          'outline-none'
        )}
      />
    </>
  )
}
