import styles from './styles.module.scss';
import { useState, useEffect } from 'react'

export function ControlBingBoundaries (props){

    const [ local, setLocal ] = useState('');

    const handleChange = (e) => {
        setLocal(e.target.value);
        // setSearchInput(e.target.value);
    };

    function handleSubmit(event){
        props.setLocalBoundary(local)
        event.preventDefault();
    }

    return(
        <div className={styles.controlItemSection}>
            <header>
                <p>Bingmaps with Spatial Data Service (Boundary)</p>
            </header>
            <main>
                <span style={{'display':'inline-block'}}>

                    <form>
                        <input id='text' type="text" placeholder="search place, pin, city"
                            onChange={handleChange} 
                            >
                        </input>
                        <input type="submit" value="Search" onClick={handleSubmit}/>
                        {/* <input id='button' type="submit" value="Search" /> */}
                    </form>

                </span>
                {/* <p>{local}</p> */}
            </main>
        </div>
    )
}