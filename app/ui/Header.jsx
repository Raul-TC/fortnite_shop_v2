'use client'
import React from 'react'
import Logo from './Logo'
import HeadPage from './HeadPage'
import NavMenu from './NavMenu'
import useToggle from '../lib/useToggle'

const Header = () => {
  const [state, handleToggle] = useToggle()

  return (
    <>
      <HeadPage />
      <header className='fixed z-50 top-0 bg-bg-header flex items-center justify-between text-white border-background-black min-h-[80px] w-full'>
        <div className='w-[95%] max-w-[1440px] m-auto flex justify-between items-center h-full'>
          <Logo />
          {/* <div className='lg:block hidden'>
             <CountDown isShop date={false} />
          </div> */}
          <NavMenu state={state} handleToggle={handleToggle} />
        </div>
        {/* <div className='lg:hidden block'>
          <CountDown isShop date={false} />
        </div> */}
      </header>
    </>

  )
}

export default Header
