import '../styles/global.scss'
import styles from '../styles/app.module.scss';

import { Header } from "../components/Header";
import { MapZone } from '../components/MapZone';
import { ControlBar } from '../components/ControlBar';
import { useState, useEffect } from 'react'

function MyApp({ Component, pageProps }) {

  const [ localBoundary, setLocalBoundary ] = useState('');

  return (
    <div className={styles.wrapper}>
      <main>
        <Header />
        <Component {...pageProps} />
        <MapZone localBoundary={localBoundary}/>
      </main>
      <ControlBar setLocalBoundary={setLocalBoundary} />
    </div>
  )
}

export default MyApp
