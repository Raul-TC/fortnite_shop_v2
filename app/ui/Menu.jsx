import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io'
import { TiMicrophone } from 'react-icons/ti'
import { TbLego, TbPick, TbParachute } from 'react-icons/tb'
import { FaMusic } from 'react-icons/fa6'
import { AiFillSkin } from 'react-icons/ai'
import { BsBackpack } from 'react-icons/bs'
import { MdOutlinePets } from 'react-icons/md'
import { BiSolidSprayCan } from 'react-icons/bi'
import { LuFlower } from 'react-icons/lu'
import gesto from '../assets/gestoSVG.svg'
import envoltorio from '../assets/wrapper.svg'
import pantalla from '../assets/pantallaCarga.svg'
function capitalize (str) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}
const iconComponents = {
  Música: { icon: <FaMusic />, text: 'Música' },
  'Pista de improvisación': { icon: <TiMicrophone />, text: 'Pista de improvisación' },
  'Kit de LEGO®': { icon: <TbLego />, text: 'Kit de LEGO®' },
  Traje: { icon: <AiFillSkin />, text: 'Traje' },
  Mochila: { icon: <BsBackpack />, text: 'Mochila' },
  Pico: { icon: <TbPick />, text: 'Pico' },
  'Ala delta': { icon: <TbParachute />, text: 'Ala delta' },
  Mascota: { icon: <MdOutlinePets />, text: 'Mascota' },
  Grafiti: { icon: <BiSolidSprayCan />, text: 'Grafiti' },
  Decoración: { icon: <LuFlower />, text: 'Decoración' },
  Gesto: { icon: <img src={gesto.src} alt='' className='' />, text: 'Gesto' },
  Envoltorio: { icon: <img src={envoltorio.src} alt='' className='' />, text: 'Envoltorio' },
  'Pantalla de carga': { icon: <img src={pantalla.src} alt='' className='' />, text: 'Pantalla de carga' }
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
              className='cursor-pointer flex gap-2 whitespace-nowrap overflow-hidden items-center  pl-4'
            >
              {iconComponents[el.name]
                ? (
                  <>
                    <span className='min-w-4 w-4 h-4'>{iconComponents[el.name].icon}</span>
                    <span className='text-ellipsis  overflow-hidden'>{iconComponents[el.name].text}</span>
                  </>
                  )
                : (
                  <>
                    {el.colors?.Color1 && <span style={{ backgroundColor: `${el.colors?.Color1}` }} className='min-w-4 h-4 rounded-full block' />}
                    <span className={`${el.colors?.Color1 ? 'text-ellipsis overflow-hidden pr-1' : 'm-auto'}`}>{capitalize(el.name)}</span>
                  </>
                  )}
            </i>
          )
        })}
      </div>

    </ul>
  )
}

export default Menu
