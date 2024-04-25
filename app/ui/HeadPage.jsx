import React from 'react'
import Head from 'next/head'

const HeadPage = (darkTheme, { title = 'Tienda de hoy Fortnite' }) => {
  let lsTheme
  if (typeof window !== 'undefined') lsTheme = window.localStorage.getItem('theme')
  return (
    <Head>
      <title>{title}</title>
      <meta name='description' content='Fornite Shop Today' />
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <meta name='description' content='Aquí encontraras los items disponibles actualmente en la tienda de fortnite.' />
      <meta name='facebook:card' value='summary' />
      <meta property='og:title' content='Tienda de HOY Fortnite' />
      <meta property='og:type' content='article' />
      <meta property='og:description' content='Tienda Actualizada de la tienda de fortnite' />
      <meta name='theme-color' content={darkTheme === 'true' ? '#1c1c1c' : '#f2f2f2'} />
      <link rel='shortcut icon' href='https://cdn.marketing.on.epicgames.com/fortnite/webpack/../favicon.ico' type='image/x-icon' />
    </Head>
  )
}

export default HeadPage
