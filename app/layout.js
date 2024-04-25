import Link from 'next/link'
import './globals.css'
import './hamburger.css'
import Header from './ui/Header'
import { montserrat } from './ui/fonts'

export default function RootLayout ({ children }) {
  return (
    <html lang='es'>
      <body className={`${montserrat.className} bg-bg-body text-white pb-[80px]`}>
        <Header />
        <div className='w-[95%] max-w-[1440px] m-auto  mt-[90px] md:min-h-[95vh]'>
          {children}
        </div>
        <footer className='w-full text-center fixed bottom-0 h-[40px] mt-[50px] bg-bg-header flex items-center justify-center z-[80] gap-1'>Made by  <Link href='https://github.com/Raul-TC' className='text-red-400'>Raul-TC 💖</Link> </footer>
      </body>
    </html>
  )
}
