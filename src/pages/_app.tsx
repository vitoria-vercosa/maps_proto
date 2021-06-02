import '../styles/global.scss'
import styles from '../styles/app.module.scss';

import { Header } from "../components/Header";
import { MapZone } from '../components/MapZone';
import { ControlBar } from '../components/ControlBar';
import { useState, useEffect } from 'react'

function MyApp({ Component, pageProps }) {

  const [ localBoundary, setLocalBoundary ] = useState('');
  const [ visibleContourLayer, setVisibleContourLayer ] = useState(false);

  return (
    <div className={styles.wrapper}>
      <main>
        <Header />
        <Component {...pageProps} />
        <MapZone localBoundary={localBoundary} visibleContourLayer={visibleContourLayer}/>
      </main>
      <ControlBar setLocalBoundary={setLocalBoundary} setVisibleContourLayer={setVisibleContourLayer} />
    </div>
  )
}

export default MyApp
