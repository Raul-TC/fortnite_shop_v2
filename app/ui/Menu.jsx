import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io'
import { TiMicrophone } from 'react-icons/ti'
import { TbLego } from 'react-icons/tb'
import { FaMusic } from 'react-icons/fa6'
import { AiFillSkin } from 'react-icons/ai'

function capitalize (str) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}
const Menu = ({ nameType, index, value, expandedItem, handleFilters, filters, handleExpandItem }) => {
  return (
    <ul className='bg-yellowForrnite cursor-pointer relative rounded-md' onClick={() => handleExpandItem(index)}>
      <div className='flex items-center justify-between '>

        <p className=' pl-6 pr-8 py-2  text-bg-header font-bold rounded-md overflow-hidden cursor-pointer'>{nameType === 'rarity' ? 'RAREZA' : nameType.toUpperCase()}: {filters[nameType]}</p>

        <IoIosArrowDown className={`text-bg-body mx-2 text-2xl absolute right-0 ${expandedItem === index ? 'opacity-100 hidden ' : 'opacity-0 block transition-opacity ease-out'} transition-opacity`} />
        <IoIosArrowUp className={`text-bg-body mx-2 text-2xl absolute right-0 ${expandedItem === index ? 'opacity-0 hidden' : 'opacity-100 block transition-opacity ease-out'} transition-opacity`} />
      </div>

      <div className={`flex flex-col w-full bg-[#1c1c1c] scroll-m-1 absolute z-30 py-2 ${expandedItem === index ? 'opacity-100 block transition-opacity ease-out' : 'opacity-0 hidden'} `}>

        {value.map((el, index) => {
          return (
            <i
              key={index} onClick={() => {
                handleFilters(prevTypes => ({ ...prevTypes, [nameType]: el.name }))
                handleExpandItem(!expandedItem)
              }}
              className='cursor-pointer flex gap-2 whitespace-nowrap overflow-hidden pl-4'
            >
              {el.colors?.Color1 && <span style={{ backgroundColor: `${el.colors?.Color1}` }} className='min-w-4 w-4 h-4 rounded-full block mx-2' />}
              {el?.name === 'Traje' && <span className='min-w-4 w-4 h-4 '><AiFillSkin /></span>}
              {el?.name === 'Música' && <span className='min-w-4 w-4 h-4 '><FaMusic /></span>}
              {el?.name === 'Pista de improvisación' && <span className='min-w-4 w-4 h-4 '><TiMicrophone /></span>}
              {el?.name === 'Kit de LEGO®' && <span className='min-w-4 w-4 h-4 '><TbLego /></span>}
              <span className='text-ellipsis'>{capitalize(el.name)}</span>
            </i>
          )
        })}
      </div>

    </ul>
  )
}

export default Menu
