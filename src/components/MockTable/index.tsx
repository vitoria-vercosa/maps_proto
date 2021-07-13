import styles from './styles.module.scss';
import cx from 'classnames';

export function MockTable() {
    return (
        <div>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th className={styles.ordered}>
                            <div className={styles.arrowsOrder}>
                                <p>Country </p>
                                <div className={styles.iconsArrow}>
                                    <img src="./arrow-tri-solid-right.svg" className={styles.arrow}/>
                                    {/* <img src="./arrow-tri-solid-right.svg" className={cx(styles.arrowDown, styles.arrow)}/> */}
                                </div>
                            </div>
                        </th>
                        <th className={styles.ordered}>
                            <div className={styles.arrowsOrder}>
                                <p>State</p>
                                <div className={styles.iconsArrow}>
                                    <img src="./arrow-tri-solid-right.svg" className={styles.arrow}/>
                                    <img src="./arrow-tri-solid-right.svg" className={cx(styles.arrowDown, styles.arrow)}/>
                                </div>
                            </div>                            
                        </th>
                        <th className={styles.ordered}>
                            <div className={styles.arrowsOrder}>
                                <p>City</p>
                                <div className={styles.iconsArrow}>
                                    <img src="./arrow-tri-solid-right.svg" className={styles.arrow}/>
                                    <img src="./arrow-tri-solid-right.svg" className={cx(styles.arrowDown, styles.arrow)}/>
                                </div>
                            </div>                            
                        </th>
                        <th className={styles.ordered}>
                            <div className={styles.arrowsOrder}>
                                <p>Postcode</p>
                                <div className={styles.iconsArrow}>
                                    <img src="./arrow-tri-solid-right.svg" className={styles.arrow}/>
                                    <img src="./arrow-tri-solid-right.svg" className={cx(styles.arrowDown, styles.arrow)}/>
                                </div>
                            </div>                            
                        </th>
                        <th>Line of Business</th>
                        <th>Service Type</th>
                        <th>Service Level</th>
                        <th>Period</th>
                        <th>Provider</th>
                        <th>Sales Avaliability</th>
                    </tr>

                </thead>
                <tbody>
                    <tr>
                        <td>Brazil</td>
                        <td>Ceará</td>
                        <td>Fortaleza</td>
                        <td>61925-650</td>
                        <td>SV</td>
                        <td>LAB</td>
                        <td>4 HR</td>
                        <td>24 x 7</td>
                        <td>UNY</td>
                        <td><img src='./dds_check.svg' className={styles.SA_icon}/>Yes</td>
                    </tr>
                    <tr>
                        <td>Brazil</td>
                        <td>Ceará</td>
                        <td>Fortaleza</td>
                        <td>61854-578</td>
                        <td>SV</td>
                        <td>LAB</td>
                        <td>4 HR</td>
                        <td>24 x 7</td>
                        <td>UPS</td>
                        <td><img src='./refuse_icon.svg' className={styles.SA_icon}/>No</td>
                    </tr>
                    <tr>
                        <td>Brazil</td>
                        <td>Minas Gerais</td>
                        <td>Belo Horizonte</td>
                        <td>38402-237</td>
                        <td>SV</td>
                        <td>LAB</td>
                        <td>4 HR</td>
                        <td>24 x 7</td>
                        <td>UPS</td>
                        <td><img src='./dds_check.svg' className={styles.SA_icon}/>Yes</td>
                    </tr>
                    <tr>
                        <td>Brazil</td>
                        <td>Minas Gerais</td>
                        <td>Belo Horizonte</td>
                        <td>38402-237</td>
                        <td>SV</td>
                        <td>PAR</td>
                        <td>8 HR</td>
                        <td>24 x 7</td>
                        <td>UNY</td>
                        <td><img src='./dds_check.svg' className={styles.SA_icon}/>Yes</td>
                    </tr>
                    <tr>
                        <td>Brazil</td>
                        <td>São Paulo</td>
                        <td>Campinas</td>
                        <td>13010-071</td>
                        <td>SV</td>
                        <td>PAR</td>
                        <td>8 HR</td>
                        <td>24 x 7</td>
                        <td>QLX</td>
                        <td><img src='./dds_check.svg' className={styles.SA_icon}/>Yes</td>
                    </tr>
                    <tr>
                        <td>Brazil</td>
                        <td>São Paulo</td>
                        <td>Campinas</td>
                        <td>13010-072</td>
                        <td>SV</td>
                        <td>PAR</td>
                        <td>8 HR</td>
                        <td>24 x 7</td>
                        <td>QLX</td>
                        <td><img src='./refuse_icon.svg' className={styles.SA_icon}/>No</td>
                    </tr>
                    <tr>
                        <td>Brazil</td>
                        <td>São Paulo</td>
                        <td>Campinas</td>
                        <td>13010-170</td>
                        <td>SV</td>
                        <td>PAR</td>
                        <td>8 HR</td>
                        <td>24 x 7</td>
                        <td>QLX</td>
                        <td><img src='./refuse_icon.svg' className={styles.SA_icon}/>No</td>                    
                    </tr>
                    <tr>
                        <td>Brazil</td>
                        <td>São Paulo</td>
                        <td>Campinas</td>
                        <td>13056-070</td>
                        <td>SV</td>
                        <td>PAR</td>
                        <td>8 HR</td>
                        <td>24 x 7</td>
                        <td>UNY</td>
                        <td><img src='./refuse_icon.svg' className={styles.SA_icon}/>No</td>
                    </tr>
                    <tr>
                        <td>Brazil</td>
                        <td>São Paulo</td>
                        <td>Campinas</td>
                        <td>13047-070</td>
                        <td>SV</td>
                        <td>PAR</td>
                        <td>4 HR</td>
                        <td>24 x 7</td>
                        <td>UPS</td>
                        <td><img src='./dds_check.svg' className={styles.SA_icon}/>Yes</td>
                    </tr>

                </tbody>
            </table>

            <div className={styles.pagination}>

                <button type="submit" className={styles.passPage}>
                    <img src="./dds_chevron-up.svg" className={styles.passPrevious}/> Previous
                </button>

                <div className={styles.paginationCenter}>
                    <p>Page</p>
                    <input type='text' className={styles.inputNumPage} defaultValue='1'/>
                    <p>of 2</p>
                </div>

                <button type="submit" className={cx(styles.passPage, styles.btnRight)}>
                    Next
                    <img src="./dds_chevron-up.svg" className={styles.passNext} /> 
                </button>

            </div>
        </div>
    )
}