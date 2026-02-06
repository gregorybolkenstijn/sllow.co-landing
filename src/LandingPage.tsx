import './styles/styles.app.css'
import { ContactForm } from './components/ContactForm'
import { LogoSvg } from './components/LogoSvg'

export function LandingPage() {
  return (
    <div className='h-dvh flex items-center justify-center'>
      <div className='text-center space-y-36 w-full max-w-[32rem]'>
        <LogoSvg className='w-[20rem] h-auto mx-auto' />
        <ContactForm />
      </div>
    </div>
  )
}
