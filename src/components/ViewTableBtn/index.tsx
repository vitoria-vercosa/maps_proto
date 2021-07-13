import styles from './styles.module.scss';
import { useState } from 'react';
import cx from 'classnames';

export function ViewTableBtn () {

    let btnText = ["VIEW TABLE", "HIDE TABLE"];
    const [ viewTable , setViewTable ] = useState(false);
    const [ textViewTable , setTextViewTable ] = useState(btnText[0]);

    const setTableVisibility = () => {
        if(viewTable){
            document.getElementById("arrow").style.transform= "rotate(0deg)";
            setTextViewTable(btnText[0]);
            setViewTable(false);
        }else{
            document.getElementById("arrow").style.transform= "rotate(180deg)";
            setTextViewTable(btnText[1])
            setViewTable(true);
        }
    }

    return(
        <div className={cx( styles.viewTable, 'arrow' )} onClick={setTableVisibility}>
            <div id="arrow" className={styles.arrow}>
                <img src="./dds_chevron-up.svg" ></img>
            </div>
            <p>{textViewTable}</p>
        </div>
    )
}