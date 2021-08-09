import '../styles/global.scss'
import styles from '../styles/app.module.scss';
import coverage_brasil from './../../public/coverage_brasil.json';

// import { MapZone } from '../components/MapZone';
// import { ControlBar } from '../components/ControlBar';

import { Header } from "../components/Header";
import { BingMaps } from '../components/BingMaps';
import React, { useState, useEffect } from 'react'
import { FloatControl } from '../components/FloatControl';
import { FloatSubtitle } from '../components/FloatSubtitle';
import { ViewTableBtn } from '../components/ViewTableBtn';
import { MockTable } from '../components/MockTable';
import { SearchTableDownload } from '../components/SearchTableDownload';
import TableCoverage from '../components/TableCoverage';
import { CoverageTable } from '../components/CoverageTable';
import { TableFromScratch } from '../components/TableFromScratch';

function MyApp({ Component, pageProps }) {

  const [ localBoundary, setLocalBoundary ] = useState('');
  const [ visibleContourLayer, setVisibleContourLayer ] = useState(false);
  const [ currentDataTable , setCurrentDataTable ] = useState(coverage_brasil);
  
  const [ colorScale , setColorScale ] = useState<string>("viridis");
  const [ opacityMap, setOpacityMap ] = useState<number>(0.5);


  const collapse = () => {
    if (document.getElementById("collapseTable").style.display !="none"){
        document.getElementById("collapseTable").style.display="none"; //.color="blue";
        // document.getElementById("collapse").style.transform= "rotate(270deg)";
    }else{
        document.getElementById("collapseTable").style.display="block";
        // document.getElementById("collapse").style.transform= "rotate(0deg)";
    }
  }

  return (
    <div className={styles.wrapper}>

      <main>
        <Header />
        <Component {...pageProps} />
        {/* <MapZone localBoundary={localBoundary} visibleContourLayer={visibleContourLayer}/> */}
        <BingMaps 
          localBoundary={localBoundary} 
          visibleContourLayer={visibleContourLayer}
          colorScale={colorScale} 
          opacity={opacityMap}
          />
        <div id="collapseTable" style={{display: "none"}}>
          <div className={styles.Table}>
            {/* <h1>
              Results(18)
            </h1> */}
              <SearchTableDownload></SearchTableDownload>

              {/* <CheckableTable></CheckableTable> */}
              {/* <MockTable></MockTable> */}
              {/* <TableCoverage headers={headers} data={items}></TableCoverage> */}
              {/* <CoverageTable></CoverageTable> */}
              <TableFromScratch data={currentDataTable} modifyData={setCurrentDataTable}></TableFromScratch>
          </div>
        </div>
      </main>

      <div className={styles.floatPainel}>

        <FloatControl setLocalBoundary={setLocalBoundary}/>
        <FloatSubtitle 
          setColors={setColorScale} 
          changeOpacity={setOpacityMap} 
          >
        </FloatSubtitle>

      </div>
      <div className={styles.floatViewTableBtn} onClick={collapse}>
        <a href="#collapseTable" style={{textDecoration:'none'}}><ViewTableBtn></ViewTableBtn></a>
      </div>
      {/* <ControlBar setLocalBoundary={setLocalBoundary} setVisibleContourLayer={setVisibleContourLayer} /> */}

    </div>
  )
}

export default MyApp
