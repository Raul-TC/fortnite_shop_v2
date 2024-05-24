'use client'
import { useCountDown } from '../lib/useCountDown'
import { luckiestGuy } from './fonts'

const CountDown = ({ date, isShop }) => {
  const { days, hours, minutes, seconds } = useCountDown(isShop, date)
  const formatTime = (time) => time < 10 ? `0${time}` : `${time}`

  const TimeComponent = ({ time, label }) => (
    <div className='flex flex-col items-center flex-wrap'>
      <span className='text-xl text-center px-2 md:text-3xl lg:text-xl'>
        {formatTime(time)}
      </span>
      <span>{label}</span>
    </div>
  )
  return (
    <>
      <div className={`${luckiestGuy.className} ${!isShop ? 'flex-wrap ' : ''} flex flex-col items-center justify-between text-yellowForrnite w-full ${!isShop ? 'my-4' : ''}`}>

        <span className={`${isShop ? 'text-4xl' : ''} block text-left text-base○`}> {isShop ? 'Siguiente Tienda' : 'Quedan:'}</span>
        {hours === '0' && minutes === '0' && seconds === '0'
          ? (
            <>
              <h2 className='m-auto text-xl text-center px-2'>Crgando Contador⌛</h2>
            </>
            )
          : (
            <div className='flex justify-center items-center gap-4 w-full m-auto flex-wrap'>
              {!isShop && <TimeComponent time={days} label={days === 1 ? 'Día' : 'Días'} />}
              <TimeComponent time={hours} label={hours === 1 ? 'Hora' : 'Horas'} />
              <TimeComponent time={minutes} label={minutes === 1 ? 'Minuto' : 'Minutos'} />
              <TimeComponent time={seconds} label='Segundos' />
            </div>
            )}
      </div>
    </>
  )
}

export default CountDown
