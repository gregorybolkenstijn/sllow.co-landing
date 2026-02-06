import '../styles/styles.app.css'
import { ContactForm } from '../components/ContactForm'
import { LogoSvg } from '../components/LogoSvg'

export function HomePage() {
  return (
    <div
      className='h-dvh flex items-center justify-center bg-cover bg-center bg-no-repeat'
      style={{ backgroundImage: 'url(/sllow-texture.webp)' }}
    >
      <div className='text-center space-y-64 w-full max-w-[32rem]'>
        <LogoSvg className='w-[18rem] h-auto mx-auto' />
        <ContactForm />
      </div>
    </div>
  )
}
