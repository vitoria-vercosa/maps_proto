import cx from 'classnames';
import styles from './styles.module.scss';

import { useEffect, useState } from 'react';

export function Pagination(props) {

    const [ page, setPage ] = useState<number>(1);
    const [ sizePerPage, setSizePerPage ] = useState<number>(5);

    const handlePage = (e) => {
        setPage(+e.target.value)
    }

    const handleSizePage = (e) =>{
        setSizePerPage(+e.target.value)
    }

    useEffect(() => {
        props.changePage(page)
    }, [page])

    useEffect(() => {
        props.changeSizePerPage(sizePerPage)
    }, [sizePerPage])

    return (
        <div className={styles.pagination}>

            <button type="submit" className={styles.passPage} disabled={page==1 ? true : false}>
                <img src="./dds_chevron-up.svg" className={styles.btnPassPrevious}/> Previous
            </button>

            <div className={styles.paginationCenter}>
                <p>Page</p>
                <input type='number' min="1" step="1" className={styles.inputNumPage} defaultValue='1' onChange={handlePage}/>
                <p>of 2</p>
            </div>

            <div className={styles.sizePerPage}>
                <select id='sizePerPage' defaultValue={sizePerPage} onChange={handleSizePage}>
                    <option value='5'>5</option>
                    <option value='10'>10</option>
                    <option value='15'>15</option>
                    <option value='20'>20</option>
                </select>
                <p>Itens per page</p>
            </div>

            <button type="submit" className={cx(styles.passPage, styles.btnRight)}>
                Next
                <img src="./dds_chevron-up.svg" className={styles.btnPassNext} /> 
            </button>

        </div>
    )
}