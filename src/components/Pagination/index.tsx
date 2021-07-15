import cx from 'classnames';
import styles from './styles.module.scss';

import { useEffect, useState } from 'react';

export function Pagination(props) {

    const [ page, setPage ] = useState<number>(1);
    const [ sizePerPage, setSizePerPage ] = useState<number>(5);
    const [ numberPages, setNumberPage ] = useState<number>(1);

    const nextPage = () => {
        // if (page != numberPages){
        setPage(page+1);
        // console.log('after next, page = ',page)
        // props.changeRangeRecords(getRangeRecords());
    }
    const prevPage = () => {
        
        setPage(page-1);
    }
    const handlePage = (e) => {
        setPage(+e.target.value);
        props.changeRangeRecords(getRangeRecords());
    }

    const handleSizePage = (e) =>{
        setSizePerPage(+e.target.value)
    }
    const getRangeRecords = () => {
        var rangeMin:number, rangeMax:number;
        if(page != numberPages){
            rangeMin = sizePerPage*page - sizePerPage;
            rangeMax = sizePerPage*page;
        }else{
            rangeMin = sizePerPage*page - sizePerPage;
            rangeMax = props.totalRegisters;
        }

        console.log('range : ',rangeMin,rangeMax);

        return [rangeMin,rangeMax]

    }

    const calcNumbPages = () => {
        var nPages = 0;
        if(sizePerPage < props.totalRegisters){

            nPages = Math.floor( props.totalRegisters / sizePerPage );
            
            if(props.totalRegisters % sizePerPage > 0){
                nPages = nPages + 1;
            }// else if(props.totalRegisters % sizePerPage <= 0){}
        }else{
            nPages = 1;
        }
        return nPages;
    }

    useEffect(() => {
        
        setNumberPage(calcNumbPages);
        props.changeRangeRecords(getRangeRecords());

    }, [])

    useEffect(() => {
        props.changePage(page);
        props.changeRangeRecords(getRangeRecords());
    }, [page])

    useEffect(() => {

        setNumberPage(calcNumbPages);
        props.changeRangeRecords(getRangeRecords());
        props.changeSizePerPage(sizePerPage);
    }, [sizePerPage])

    return (
        <div className={styles.pagination}>

            <button type="submit" 
                className={styles.passPage} 
                onClick={prevPage}
                disabled={page==1 ? true : false}
            >
                <img src="./dds_chevron-up.svg" className={styles.btnPassPrevious}/>
            </button>

            <div className={styles.paginationCenter}>
                <p>Page</p>
                <input type='number' min="1" step="1" max={numberPages} className={styles.inputNumPage} defaultValue={page} onChange={handlePage}/>
                <p>of {numberPages}</p>
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

            <button type="submit" 
                className={cx(styles.passPage, styles.btnRight)} 
                onClick={nextPage} 
                disabled={page>=numberPages ? true : false}
            >
                <img src="./dds_chevron-up.svg" className={styles.btnPassNext} /> 
            </button>

        </div>
    )
}