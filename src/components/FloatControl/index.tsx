import { Component, useState } from 'react';
import styles from './styles.module.scss';
import cx from 'classnames';
import React from 'react';

export function FloatControl(props) {

    const [ local, setLocal ] = useState('');
    const [ formsFlag, setFormsFlag ] = useState(true);

    const handleChange = (e) => {
        setLocal(e.target.value);
        // props.setLocalBoundary(e.target.value);
    };

    function handleSubmit(event){
        props.setLocalBoundary(local);
        event.preventDefault();

        if(document.getElementById('text')['value'] != ''){
            setFormsFlag(false);
        }else{
            setFormsFlag(true);
        }
    }

    const collapse = () => {
        if (document.getElementById("collapseExample").style.display !="none"){
            document.getElementById("collapseExample").style.display="none"; //.color="blue";
            document.getElementById("collapse").style.transform= "rotate(270deg)";
        }else{
            document.getElementById("collapseExample").style.display="block";
            document.getElementById("collapse").style.transform= "rotate(0deg)";
        }
    }
    const collapse2 = () => {
        if (document.getElementById("collapseContent2").style.display !="none"){
            document.getElementById("collapseContent2").style.display="none"; //.color="blue";
            document.getElementById("collapse2").style.transform= "rotate(270deg)";
        }else{
            document.getElementById("collapseContent2").style.display="block";
            document.getElementById("collapse2").style.transform= "rotate(0deg)";
        }
    }

    return (
        <div className={styles.ControlContainer}>

            <div className={styles.topCollapse} >

                <img src="./dds_chevron-up.svg" onClick={collapse} id="collapse"></img>
                <h3>Coverage Search</h3>
                <img src="./dds_alert-info-cir.svg" ></img>
                <img src="./dds_clock.svg" className={styles.alignRight}></img>
                <img src="./dds_arrange.svg"></img>

            </div>


            <div className={styles.contentControl} id="collapseExample">
                
                <div className={styles.littleBox}>
                    <span>Where</span> 
                    <form >
                    <input id="text"
                            type="text" 
                            className={styles.inputWhere} 
                            placeholder="Enter address, state or zipcode" 
                            onChange={handleChange}
                            // onKeyUp={keyPressed}
                    />
                    <input type="submit" value="Search" onClick={handleSubmit} className={styles.btnHidden}/>
                    </form>
                </div>
                    
                <form name="rest" id="rest" className="forms">
                    <div className={styles.littleBox}>
                        <span>Line of Business</span><br/>
                        <select disabled={formsFlag} defaultValue='select' >
                            <option value='select' disabled >Select LOB</option>
                        </select>
                    </div>

                    <div className={styles.littleBox}>
                        <span>Combined Service Type</span><br/>
                        <select disabled={formsFlag} defaultValue='select'>
                            <option disabled value='select'>Select Service Type</option>
                        </select>
                    </div>
                    <div className={styles.radioGroup}>
                        {/* <input type="radio" name="option" /> Best SLA Only  */}
                        {/* <input type="radio" name="option" /> Sales Coverage Only */}
                        <input type="checkbox" name="SLA" disabled={formsFlag}/> <a>Best SLA Only</a>
                        <input type="checkbox" name="SC" className={styles.sndCheckbox} disabled={formsFlag}/> <a>Sales Coverage Only</a>
                    </div>
                </form>
            </div>
            <br/>

            <div className={cx(styles.topCollapse, styles.sndTop)}>
                <img src="./dds_chevron-up.svg" onClick={collapse2} id="collapse2"/>
                <h3>Advanced Search</h3>
            </div>
            <div className={styles.contentControl} id="collapseContent2">
                <form className="forms">
                    <div className={styles.littleBox}>
                        <span>Service Level</span><br/>
                        <select disabled={formsFlag} defaultValue='select'>
                            <option className={styles.optionDisabled} disabled value='select'>Select Service Level</option>
                            <option>2 HOURS</option>
                            <option>4 HOURS</option>
                            <option>BEST EFFORT</option>
                            <option>REMOTE EFFORT</option>
                            <option>NEXT BUSINESS DAY</option>
                        </select>
                    </div>
                    <div className={styles.littleBox}>
                        <span>Period</span><br/>
                        <select disabled={formsFlag} defaultValue='select'>
                            <option className={styles.optionDisabled} disabled value='select'>Select Period</option>
                            <option>24 Hour a Day 7 Days per Week</option>
                            <option>12 Hour a Day 7 Days pre Week</option>
                            <option>11 Hour a Day 7 Days pre Week</option>
                            <option>12 Hour a Day 6 Days pre Week</option>
                            <option>8 Hour a Day 6 Days pre Week</option>
                        </select>
                    </div>
                    <div className={styles.littleBox}>
                        <span>Service Type</span><br/>
                        <select disabled={formsFlag} defaultValue='select'>
                            <option className={styles.optionDisabled} disabled value='select'>Select Service Type</option>
                            <option>INSTALL</option>
                            <option>DEPLOYMENT</option>
                            <option>LABOR</option>
                            <option>PARTS</option>
                            <option>LOGISTICS PARTS ONLY</option>
                        </select>
                    </div>
                    <div className={styles.littleBox}>
                        <span>Provider</span><br/>
                        <select disabled={formsFlag} defaultValue='select'>
                            <option className={styles.optionDisabled} disabled value='select'>Select Provider</option>
                            <option>UNY</option>
                            <option>VERS</option>
                            <option>CONN</option>
                            <option>IFOR</option>
                            <option>DLC</option>
                            <option>UPS</option>
                            <option>POINT</option>
                            <option>DELLBADGED</option>
                        </select>
                    </div>
                    <div className={styles.radioGroup}>
                        {/* <input type="radio" name="option" /> Best SLA Only  */}
                        {/* <input type="radio" name="option" /> Sales Coverage Only */}
                        <input type="checkbox" name="SLA" disabled={formsFlag}/> <a>Lower Level Coverage</a>
                        <input type="checkbox" name="SC" className={styles.sndCheckbox} disabled={formsFlag}/> <a>Detailed Results</a>
                    </div>
                </form>

            </div>

        </div>
    )
}
