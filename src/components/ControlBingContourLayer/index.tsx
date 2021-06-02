import { CheckboxSlider } from '../CheckboxSlider';
import styles from './styles.module.scss';
import { useState, useEffect } from 'react';

export function ControlBingContourLayer(props) {

    const [ valueCheck, setValueCheck ] = useState(false);

    useEffect( ()=>{ console.log("from ContourLayer component ", valueCheck) }, [valueCheck]);

    return (
        <div className={styles.controlItemSection}>
            <header>
                <p>Bingmaps with ContourLayer</p>
            </header>
            <main>
                {/* <span style={{'display':'inline-block'}}>
                    
                    <label className={styles.switch}>
                        <input type="checkbox" />
                        <span className={styles.slider }></span>
                    </label>
                </span> */}
                <CheckboxSlider setValueCheck={props.setVisibleContourLayer} />
            </main>

        </div>
    )
}