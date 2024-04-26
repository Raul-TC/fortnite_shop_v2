import React from 'react'

const PlayerStats = ({ stats }) => {
  const { res: { data } } = stats
  console.log(data)
  return (
    <div>
      <h2>{data.account.name}</h2>
      <h2>Nivel de Pase de Batalla: {data.battlePass.level}</h2>
    </div>
  )
}

export default PlayerStats
