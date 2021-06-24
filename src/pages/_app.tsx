import '../styles/global.scss'
import styles from '../styles/app.module.scss';

// import { MapZone } from '../components/MapZone';
// import { ControlBar } from '../components/ControlBar';

import { Header } from "../components/Header";
import { BingMaps } from '../components/BingMaps';
import React, { useState, useEffect } from 'react'
import { FloatControl } from '../components/FloatControl';
import { FloatSubtitle } from '../components/FloatSubtitle';

function MyApp({ Component, pageProps }) {

  const [ localBoundary, setLocalBoundary ] = useState('');
  const [ visibleContourLayer, setVisibleContourLayer ] = useState(false);

  return (
    <div className={styles.wrapper}>

      <main>
        <Header />
        <Component {...pageProps} />
        {/* <MapZone localBoundary={localBoundary} visibleContourLayer={visibleContourLayer}/> */}
        <BingMaps localBoundary={localBoundary} visibleContourLayer={visibleContourLayer}/>
      </main>

      <div className={styles.floatPainel}>

        <FloatControl setLocalBoundary={setLocalBoundary}/>
        <FloatSubtitle></FloatSubtitle>

      </div>
      {/* <ControlBar setLocalBoundary={setLocalBoundary} setVisibleContourLayer={setVisibleContourLayer} /> */}

    </div>
  )
}

export default MyApp
