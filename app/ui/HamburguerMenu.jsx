import React from 'react'
import useToggle from '../lib/useToggle'

const HamburguerMenu = ({state, handleToggle}) => {
      return (
   <button className={`hamburger hamburger--spring ${state ? 'is-active' : ''} md:hidden`} type="button" onClick={handleToggle}>
  <span className="hamburger-box">
    <span className="hamburger-inner"></span>
  </span>
</button>
  )
}

export default HamburguerMenu