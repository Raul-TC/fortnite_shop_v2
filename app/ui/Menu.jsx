import React from 'react'
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io'
function capitalize (str) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}
const Menu = ({ handleClick, nameType, index, value, expandedItem, setFilters, filters, setExpandedItem }) => {
  console.log(filters[nameType])
  return (
    <ul className='bg-yellowForrnite cursor-pointer relative rounded-md' onClick={() => handleClick(index)}>
      <div className='flex items-center justify-between '>

        <p className=' pl-6 pr-8 py-2  text-bg-header font-bold rounded-md overflow-hidden cursor-pointer'>{nameType === 'rarity' ? 'RAREZA' : nameType.toUpperCase()}: {filters[nameType]}</p>

        <IoIosArrowDown className={`text-bg-body mx-2 text-2xl absolute right-0 ${expandedItem === index ? 'opacity-100 hidden ' : 'opacity-0 block transition-opacity ease-out'} transition-opacity`} />
        <IoIosArrowUp className={`text-bg-body mx-2 text-2xl absolute right-0 ${expandedItem === index ? 'opacity-0 hidden' : 'opacity-100 block transition-opacity ease-out'} transition-opacity`} />
      </div>

      <div className={`flex flex-col w-full bg-[#1c1c1c] scroll-m-1 absolute z-30 py-2 ${expandedItem === index ? 'opacity-100 block transition-opacity ease-out' : 'opacity-0 hidden'} `}>

        {value.map((el, index) => {
          // console.log(el.colors?.Color1)
          return (
            <i
              key={index} onClick={() => {
                setFilters(prevTypes => ({ ...prevTypes, [nameType]: el.name }))
                setExpandedItem(!expandedItem)
                // setFilters(prevFilters => ({ ...prevFilters, series: !prevFilters.series }))
                // setTypes(prevTypes => ({ ...prevTypes, series: el.name }))
              }}
              className='cursor-pointer whitespace-nowrap text-ellipsis overflow-hidden flex'
            >
              <span style={{ backgroundColor: `${el.colors?.Color1}` }} className='mx-2 w-4 h-4 rounded-full block' />
              <span>{capitalize(el.name)}</span>
            </i>
          )
        })}
      </div>

    </ul>
  )
}

export default Menu
