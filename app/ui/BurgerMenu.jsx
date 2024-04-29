'use client'
import useToggle from '../lib/useToggle'
import Link from 'next/link'
export default function BurgerMenu ({ categories }) {
  const [isOpen, toggleIsOpen] = useToggle()

  return (
    <div className='inline-block text-left fixed z-10'>
      <div>
        <button type='button' onClick={toggleIsOpen} className='inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500'>
          Menu
        </button>
      </div>

      {isOpen && (
        <div className='origin-top-left -mr-36 absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5'>
          <div className='py-1' role='menu' aria-orientation='vertical' aria-labelledby='options-menu'>

            {categories.map((sec, index) => {
              return <Link key={`${index}_${sec.section}`} href={`#${sec.section}`} className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900'>{sec.section}</Link>
            })}
          </div>
        </div>
      )}
    </div>
  )
}
