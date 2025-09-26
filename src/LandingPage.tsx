import './index.css'
import { ContactForm } from './components/ContactForm'

export function LandingPage() {
  return (
    <div className='bg-primary text-cream h-screen flex items-center justify-center font-serif'>
      <div className='text-center space-y-8 w-full max-w-[300px]'>
        <h1 className='text-6xl font-bold'>Sllow</h1>
        <ContactForm />
      </div>
    </div>
  )
}
