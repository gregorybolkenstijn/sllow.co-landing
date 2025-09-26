import { HTMLProps } from 'react'

type InputProps = Omit<HTMLProps<HTMLInputElement>, 'className'>

export const Input = (attributes: InputProps) => {
  return (
    <input
      {...attributes}
      className={
        'block w-full px-4 py-3 rounded-lg border-2 border-cream bg-transparent text-cream placeholder-cream/70 focus:outline-none focus:border-cream focus:ring-2 focus:ring-cream/20'
      }
    />
  )
}
