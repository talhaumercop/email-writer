import SignInFormClient from '@/modules/auth/components/sign-in-form'
import Image from 'next/image'

const Page = () => {
  return (
    <>
      <Image src="/login.svg" alt='Login-Image' height={300} width={300} className='m-6 object-cover'/>
      <SignInFormClient/>
    </>
  )
}

export default Page