import styles  from './styles.module.scss';

export function FloatSubtitle() {


    const collapseSubTitle = () => {
        if (document.getElementById("collapseCttSubtitled").style.display !="none"){
            document.getElementById("collapseCttSubtitled").style.display="none"; //.color="blue";
            document.getElementById("collapseSubtitle").style.transform= "rotate(270deg)";
        }else{
            document.getElementById("collapseCttSubtitled").style.display="block";
            document.getElementById("collapseSubtitle").style.transform= "rotate(0deg)";
        }
    }

    return(
        <div className={styles.ControlContainer}>

            <div className={styles.topCollapse} >

                <img src="./dds_chevron-up.svg" onClick={collapseSubTitle} id="collapseSubtitle"></img>
                <h3>Subtitle</h3>

            </div>
            <div id="collapseCttSubtitled">

                <div  className={styles.contentSubtitle} 
                style={{height: '5rem' , display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <p>Fill in the "where" field to start viewing</p>
                </div>
            </div>

        </div>
    )
}