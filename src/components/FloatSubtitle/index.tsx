import styles  from './styles.module.scss';

interface IpropsFloatSubtitle{
    setColors: any,
    changeOpacity: any
}

export function FloatSubtitle(props: IpropsFloatSubtitle) {


    const collapseSubTitle = () => {
        if (document.getElementById("collapseCttSubtitled").style.display !="none"){
            document.getElementById("collapseCttSubtitled").style.display="none"; //.color="blue";
            document.getElementById("collapseSubtitle").style.transform= "rotate(270deg)";
        }else{
            document.getElementById("collapseCttSubtitled").style.display="block";
            document.getElementById("collapseSubtitle").style.transform= "rotate(0deg)";
        }
    }
    
    const changeOpacity = ( e ) => {
        // console.log("opacity ",e.target.value/10)
        props.changeOpacity(e.target.value/10);
    }

    return(
        <div className={styles.ControlContainer}>

            <div className={styles.topCollapse} >

                <img src="./dds_chevron-up.svg" onClick={collapseSubTitle} id="collapseSubtitle"></img>
                <h3>Subtitle</h3>

            </div>
            <div id="collapseCttSubtitled">
                
                <label htmlFor="colorscale">ColorScales</label>

                <div  className={styles.contentSubtitle} 
                style={{height: '5rem' , display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    {/*<p>Fill in the "where" field to start viewing</p>*/}
                    
                    <div className={styles.radioGroup}>

                        <div className={styles.radioGroupLeft}>
                            <input type="radio" id="viridis" name="colorscale" value="viridis" onClick={(e) => setColors(e)}/>
                            <label htmlFor="viridis">Viridis</label><br/>
                            <input type="radio" id="magma" name="colorscale" value="magma" onClick={(e) => setColors(e)}/>
                            <label htmlFor="magma">Magma</label><br/>
                            <input type="radio" id="plasma" name="colorscale" value="plasma" onClick={(e) => setColors(e)}/>
                            <label htmlFor="plasma">Plasma</label><br/>
                            <input type="radio" id="inferno" name="colorscale" value="inferno" onClick={(e) => setColors(e)}/>
                            <label htmlFor="inferno">Inferno</label>
                        </div> 
                        <div className={styles.radioGroupRight}>
                            <input type="radio" id="cividis" name="colorscale" value="cividis" onClick={(e) => setColors(e)}/>
                            <label htmlFor="cividis">Cividis</label><br/>
                            <input type="radio" id="mako" name="colorscale" value="mako" onClick={(e) => setColors(e)}/>
                            <label htmlFor="mako">Mako</label><br/>
                            <input type="radio" id="rocket" name="colorscale" value="rocket" onClick={(e) => setColors(e)}/>
                            <label htmlFor="rocket">Rocket</label><br/>
                            <input type="radio" id="turbo" name="colorscale" value="turbo" onClick={(e) => setColors(e)}/>
                            <label htmlFor="turbo">Turbo</label>
                        </div>
                        
                    </div> 

                </div>
                
                <label htmlFor="slider">Opacity</label>
                <div  className={styles.contentSubtitle} >
                    <span>0.1</span>
                    <div className={styles.slidecontainer}>
                        <input type="range" min="1" max="9" className={styles.slider} id="myRange" name="slider" onChange={changeOpacity} defaultValue="5"/> 
                    </div>
                    <span>0.9</span>
                </div>
                
            </div>

        </div>
    )
}
