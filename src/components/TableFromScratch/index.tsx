import cx from 'classnames';
import {COLUMNS} from './columns';
import styles from './styles.module.scss';
import React, { useState, useEffect } from 'react';
import coverage_brasil from './../../../public/coverage_brasil.json';
import { Pagination } from '../Pagination';

interface IrecordCoverage {
    id: string,
    key: string,
    country: string,
    state: string,
    city: string,
    postcode: string,
    line_of_business: string,
    service_type : string,
    service_level : string,
    period : string,
    provider : string,
    sales_avaliability: boolean 
}

interface IpropsTable {
    data: IrecordCoverage[]
}

export function TableFromScratch (props : IpropsTable) {

    const [ currentPage , setCurrentPage ] = useState<number>(1);
    const [ currentData, setCurrentData ] = useState<any[]>(props.data);
    const [ currentSizePage , setCurrentSizePage ] = useState<number>(5);
    const [ currentRangeRecords, setCurrentRangeRecords ] = useState<Array<number>>([0,5]);
    const [ orderTable, setOrderTable ] = useState<object>({'column':'contry', 'asc': true});

    useEffect(()=> {

        if(orderTable['asc'] == true){
            setCurrentData(
                currentData.sort(function (a, b) {
                    return (a[orderTable['column']] < b[orderTable['column']]) ? 1 : ((b[orderTable['column']] < a[orderTable['column']]) ? -1 : 0);
                })
            )
        }
        else{
            setCurrentData(
                currentData.sort(function (a, b) {
                    return (a[orderTable['column']] > b[orderTable['column']]) ? 1 : ((b[orderTable['column']] > a[orderTable['column']]) ? -1 : 0);
                })
            )
        }
        

    }, [currentData, orderTable]);

    // const data = coverage_brasil;

    const handleOrder = (column: string, asc: boolean) => {

        if(column != orderTable['column'] || asc!= orderTable['asc']){
            setOrderTable({'column': column, 'asc': asc})
        }

    }

    const buildHeadColumn = (headerObject) => {

        var orderedArrows = <div className={styles.iconsArrow}> <img src="./arrow-tri-solid-right.svg" className={styles.arrow} onClick={ () => handleOrder(headerObject['accessor'], true) }/><img src="./arrow-tri-solid-right.svg" className={cx(styles.arrowDown, styles.arrow)} onClick={ () => handleOrder(headerObject['accessor'], false) }/></div>;

        if(headerObject['visible'] == true){

            return(
                <th className={headerObject['ordered'] ? styles.ordered : ''}>
                    <div className={headerObject.ordered ? styles.arrowsOrder: styles.header}>
                        <p>{headerObject.Header}</p>
                        {headerObject.ordered ? orderedArrows : <></>}
                    </div>
                </th>
            )
        }

    }

    const buildRow = (rowObject) => {

        const row = Object.entries(rowObject).map((column) => {

            const objColumn = COLUMNS.filter(col => {
                return col.accessor == column[0]
            })

            if(objColumn[0]['visible'] == true){

                if(typeof column[1] == 'boolean'){

                    if(column[1] == true){
                        return (<td><img src='./dds_check.svg' className={styles.SA_icon}/>Yes</td>)
                    }else{
                        return (<td><img src='./refuse_icon.svg' className={styles.SA_icon}/>No</td>)
                    }
                }else{
                    return <td>{column[1]}</td>
                }
            }
        })

        return(
            <tr>{row}</tr>
        )

    }
    // const sortObjects = (data, column, asc) =>{

    //     if (asc == true){
    //         setCurrentData(
    //         //props.modifyData(
    //             data.sort(function (a, b) {
    //                 return (a[column] > b[column]) ? 1 : ((b[column] > a[column]) ? -1 : 0);
    //             })
    //         )
    //     }else{
    //         setCurrentData(
    //         //props.modifyData( 
    //             data.sort(function (a, b) {
    //                 return (a[column] < b[column]) ? 1 : ((b[column] < a[column]) ? -1 : 0);
    //             })
    //         )               
    //     }

    // }


    return (
        <div>
            <table className={styles.table}>
                <thead>

                    <tr>
                        { COLUMNS.map( buildHeadColumn ) }   
                    </tr>

                </thead>
                <tbody>
                    { 
                        // currentData.slice(0, currentSizePage).map( buildRow )       
                        currentData.slice(currentRangeRecords[0], currentRangeRecords[1]).map( buildRow )       
                    }
                </tbody>
            </table>

            <Pagination 
                totalRegisters={currentData.length}
                changePage={setCurrentPage} 
                changeSizePerPage={setCurrentSizePage} 
                changeRangeRecords={setCurrentRangeRecords}
            ></Pagination>

        </div>
    )
}