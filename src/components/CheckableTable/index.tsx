import styles from './styles.module.scss';
import React, { useMemo } from 'react';
import { useTable } from 'react-table';
import { COLUMNS } from '../TableFromScratch/columns';
import coverage_brasil from './../../../public/coverage_brasil.json';

export function CheckableTable (props) {

    // const columns = useMemo(() => COLUMNS, [])
    // const data = useMemo(() => coverage_brasil, [])
    
    // const tableInstance = useTable({ columns, data })

//     const { 
//         getTableProps, 
//         getTableBodyProps, 
//         headerGroups, 
//         rows, 
//         prepareRow
//     } = tableInstance

//     const columnOrder = () => {     
//     }
    
//     return (
//         <div>
//             <table {...getTableProps} className={styles.tableCoverage}>
//                 <thead> 
//                     {
//                         headerGroups.map(headerGroup => (
//                             <tr { ...headerGroups.getHeaderGroupProps() }>
//                                 {
//                                     headerGroup.headers.map( column => (
//                                         <th {...column.getHeaderProps()}>{column.render('Header')}</th>
//                                     ))
//                                 }
//                                 <th></th>
//                             </tr>

//                         ))
//                     }
//                 </thead>
//                 <tbody {...getTableBodyProps()}>
//                     {
//                         rows.map(row => {
//                             prepareRow(row)
//                             return(
//                                 <tr {...row.getRowProps()}>
//                                     {
//                                         row.cells.map((cell)=>{
//                                             return <td {...cell.getCellProps()}> {cell.render('Cell')} </td>
//                                         })
//                                     }
//                                     <td></td>
//                                 </tr>
//                             )
//                         })
//                     }
//                     <tr>
//                         <td></td>
//                     </tr>
//                 </tbody>
//             </table>
//         </div>
//     )
}