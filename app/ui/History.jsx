'use client'
import DateComponent from './DateComponent'
import { useShowHistory } from '../lib/useShowHistory'
import { useFormatedDate } from '../lib/useFormatedDate'
const History = ({ item }) => {
  const { showHistory, reversedHistory, handleShowHistory } = useShowHistory(item)
  const { formatedDate, getDays } = useFormatedDate()

  return (
    <div className='w-full'>
      {item.shopHistory && item.shopHistory.length >= 1 && <h1 className='text-center font-bold text-2xl md:text-3xl'>Apariciones en Tienda ({item.shopHistory.length})</h1>}
      {
                !item.shopHistory
                  ? null
                  : item.shopHistory.length > 1
                    ? (
                      <>
                        <div className={`flex flex-row w-full md:w-96 justify-center items-center flex-wrap m-auto text-center ${showHistory && reversedHistory.length >= 7 ? 'overflow-y-scroll h-48 scrollHistory' : ''} w-[260px]`}>
                          {item.shopHistory.length > 2
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
                              </>)}
                        </div>
                        {item.shopHistory?.length > 3 && <button className=' h-8 font-bold block mt-4 mb-4 rounded-md text-center m-auto md:text-2xl' onClick={handleShowHistory}>{showHistory ? 'Ocultar historial' : 'Ver todo el historial'}</button>}
                      </>
                      )
                    : (
                      <>
                        <h2 className='font bold text-center md:text-2xl'>Nuevo en Fortnite</h2>
                        <DateComponent fullDate={formatedDate(reversedHistory[0])} dayss={getDays(reversedHistory[0])} length={item.shopHistory.length} />
                      </>
                      )
            }
    </div>
  )
}

export default History
