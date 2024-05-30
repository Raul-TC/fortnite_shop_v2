'use client'
import DateComponent from './DateComponent'
import { useShowHistory } from '../lib/useShowHistory'
import { useFormatedDate } from '../lib/useFormatedDate'
const History = ({ shopHistory }) => {
  const { showHistory, reversedHistory, handleShowHistory } = useShowHistory(shopHistory)
  const { formatedDate, getDays } = useFormatedDate()

  return (
    <div className='w-full'>
      {shopHistory && shopHistory.length >= 1 && <h1 className='text-center font-bold text-2xl md:text-3xl mb-4'>Apariciones en Tienda ({shopHistory.length})</h1>}
      {
       !shopHistory
         ? null
         : shopHistory.length > 1
           ? (
             <>
               <div className={`flex flex-row w-full md:w-96 justify-center items-center flex-wrap m-auto text-center ${showHistory && reversedHistory.length >= 7 ? 'overflow-y-scroll h-48 scrollHistory' : ''} w-[260px]`}>
                 {shopHistory.length > 2
                   ? (
                     <>
                       <DateComponent fullDate={formatedDate(reversedHistory[0])} dayss={getDays(reversedHistory[0])} />
                       <DateComponent fullDate={formatedDate(reversedHistory[1])} dayss={getDays(reversedHistory[1])} />
                       <DateComponent fullDate={formatedDate(reversedHistory[2])} dayss={getDays(reversedHistory[2])} />
                       {
                        showHistory && reversedHistory.slice(3).map((el, index) => <DateComponent key={index} fullDate={formatedDate(el)} dayss={getDays(el)} />)
                       }
                     </>
                     )
                   : (
                     <>
                       <DateComponent fullDate={formatedDate(reversedHistory[0])} dayss={getDays(reversedHistory[0])} />
                       <DateComponent fullDate={formatedDate(reversedHistory[1])} dayss={getDays(reversedHistory[1])} />
                     </>
                     )}
               </div>
               {shopHistory?.length > 3 && <button className=' h-8 font-bold block mt-4 mb-4 rounded-md text-center m-auto md:text-2xl' onClick={handleShowHistory}>{showHistory ? 'Ocultar historial' : 'Ver todo el historial'}</button>}
             </>
             )
           : (
             <>
               {getDays(reversedHistory[0]) < 1 && <h2 className='font bold text-center md:text-2xl'>Nuevo en Fortnite</h2>}
               <DateComponent fullDate={formatedDate(reversedHistory[0])} dayss={getDays(reversedHistory[0])} length={shopHistory.length} />
             </>
             )
      }
    </div>
  )
}

export default History
