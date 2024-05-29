import React from 'react'
import StatCard from './StatCard'
import { luckiestGuy } from '../ui/fonts'
import { getStats } from '../lib/data'
const PlayerStats = async ({ name, accountType }) => {
  const { stats, account, battlePass, stack } = await getStats(name, accountType)

  if (stack) {
    return <h1>No pudimos encontrar al usuario '{name}' 🥲🥲, verifica el nombre o la plataforma elegida</h1>
  }

  const handleMinutes = (time) => {
    const minutos = time % 60
    const horas = Math.floor(time / 60) % 24
    const dias = Math.floor(time / 60 / 24)

    return dias === 0 ? `${horas} horas ${minutos} minutos` : `${dias} dias ${horas} horas ${minutos} minutos`
  }

  const handleLocalDate = (fecha) => {
    const date = new Date(fecha)
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true,
      timeZone: 'America/Monterrey' // Cambia esto a tu zona horaria local
    }

    return date.toLocaleString('es-MX', options)
  }

  return (
    <div className='mt-4'>
      <div className='mt-2 mb-4'>

        <h2 className={`${luckiestGuy.className} text-center text-3xl`}>{account.name} </h2>
        <h2 className={`${luckiestGuy.className} text-center text-2xl`}>Temporada Actual: Nivel {battlePass.level}</h2>
      </div>
      <div className='flex w-full flex-col md:flex-row items-start justify-start flex-wrap self-start gap-4'>
        {stats.season.solo &&
          <StatCard
            wins={stats.season.solo?.wins}
            kills={stats.season.solo?.kills}
            topN={stats.season.solo?.top10}
            topNN={stats.season.solo?.top25}
            deaths={stats.season.solo?.deaths}
            kda={stats.season.solo?.kd}
            matches={stats.season.solo?.matches}
            winrate={stats.season.solo?.winRate}
            timePlayed={handleMinutes(stats.season.solo?.minutesPlayed)}
            updated={handleLocalDate(stats.season.solo?.lastModified)}
            modo='Solo'
          />}
        <StatCard
          wins={stats.season.duo?.wins}
          kills={stats.season.duo.kills}
          topN={stats.season.duo.top5}
          topNN={stats.season.duo.top12}
          deaths={stats.season.duo.deaths}
          kda={stats.season.duo.kd}
          matches={stats.season.duo.matches}
          winrate={stats.season.duo.winRate}
          timePlayed={handleMinutes(stats.season.duo.minutesPlayed)}
          updated={handleLocalDate(stats.season.duo.lastModified)}
          modo='Duo'
        />
        {stats.season.squad &&
          <StatCard
            wins={stats.season.squad?.wins ?? 0}
            kills={stats.season.squad?.kills}
            topN={stats.season.squad?.top3}
            topNN={stats.season.squad?.top6}
            deaths={stats.season.squad?.deaths}
            kda={stats.season.squad?.kd}
            matches={stats.season.squad?.matches}
            winrate={stats.season.squad?.winRate}
            timePlayed={handleMinutes(stats.season.squad?.minutesPlayed)}
            updated={handleLocalDate(stats.season.squad?.lastModified)}
            modo='Squad'
          />}
      </div>
      <h2 className={`${luckiestGuy.className} text-center text-5xl my-4`}>Todas las Temporadas</h2>
      <div className='flex w-full flex-col md:flex-row items-center justify-center flex-wrap gap-4'>
        <StatCard
          wins={stats.lifetime.solo.wins}
          kills={stats.lifetime.solo.kills}
          topN={stats.lifetime.solo.top10}
          topNN={stats.lifetime.solo.top25}
          deaths={stats.lifetime.solo.deaths}
          kda={stats.lifetime.solo.kd}
          matches={stats.lifetime.solo.matches}
          winrate={stats.lifetime.solo.winRate}
          timePlayed={handleMinutes(stats.lifetime.solo.minutesPlayed)}
          updated={handleLocalDate(stats.lifetime.solo.lastModified)}
          modo='Solo'
        />

        <StatCard
          wins={stats.lifetime.duo.wins}
          kills={stats.lifetime.duo.kills}
          topN={stats.lifetime.duo.top5}
          topNN={stats.lifetime.duo.top12}
          deaths={stats.lifetime.duo.deaths}
          kda={stats.lifetime.duo.kd}
          matches={stats.lifetime.duo.matches}
          winrate={stats.lifetime.duo.winRate}
          timePlayed={handleMinutes(stats.lifetime.duo.minutesPlayed)}
          updated={handleLocalDate(stats.lifetime.duo.lastModified)}
          modo='Duo'
        />
        <StatCard
          wins={stats.lifetime.trio?.placetop1 ?? 0}
          kills={stats.lifetime.trio?.kills ?? 0}
          topN={stats.lifetime.trio?.placetop3}
          topNN={stats.lifetime.trio?.placetop6}
          deaths=''
          kda={stats.lifetime.trio?.kd}
          matches={stats.lifetime.trio?.matchesplayed}
          winrate={stats.lifetime.trio?.winrate}
          timePlayed={handleMinutes(stats.lifetime.trio.minutesplayed)}
          updated='Desconocido'
          modo='Trio'
        />
        {stats.lifetime.squad &&
          <StatCard
            wins={stats.lifetime.squad?.wins ?? 0}
            kills={stats.lifetime.squad?.kills}
            topN={stats.lifetime.squad?.top3}
            topNN={stats.lifetime.squad?.top6}
            deaths={stats.lifetime.squad?.deaths}
            kda={stats.lifetime.squad?.kd}
            matches={stats.lifetime.squad?.matches}
            winrate={stats.lifetime.squad?.winRate}
            timePlayed={handleMinutes(stats.lifetime.squad?.minutesPlayed)}
            updated={handleLocalDate(stats.lifetime.squad?.lastModified)}
            modo='Squad'
          />}
      </div>
    </div>
  )
}

export default PlayerStats
