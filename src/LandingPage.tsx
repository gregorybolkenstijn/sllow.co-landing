import './styles/styles.app.css'
import { ContactForm } from './components/ContactForm'
import { LogoSvg } from './components/LogoSvg'

export function LandingPage() {
  return (
    <div className='h-dvh flex items-center justify-center'>
      <div className='text-center space-y-24 w-full max-w-[32rem]'>
        <LogoSvg className='w-[24rem] h-auto mx-auto' />

        {/* <p className='paragraph'>Leave your email address and we'll let you know when we launch.</p>
        <ContactForm /> */}
      </div>
    </div>
  )
}
