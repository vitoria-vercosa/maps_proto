import styles from './styles.module.scss';
import React, { useEffect } from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider } from 'react-bootstrap-table2-paginator';
import coverage_brasil from './../../../public/coverage_brasil.json';
// // import styled from "styled-components";
// import { useTable, usePagination } from "react-table";

// // import makeData from "./makeData";

// // Let's add a fetchData method to our Table component that will be used to fetch
// // new data when pagination state changes
// // We can also add a loading state to let our table know it's loading new data
export function CoverageTable(  ) {

    const columns = [{
        dataField: 'id',
        text: 'ID'
      }, {
        dataField: 'country',
        text: 'Country'
      }, {
        dataField: 'state',
        text: 'State'
      }, {
        dataField: 'city',
        text: 'City'
      }, {
        dataField: 'postcode',
        text: 'Postcode'
      }, {
        dataField: 'line_of_business',
        text: 'Line of Business'
      }, {
        dataField: 'service_type',
        text: 'Service Type'
      }, {
        dataField: 'service_level',
        text: 'Service Level'
      }, {
        dataField:'period',
        text:'Period'
      }, {
        dataField:'provider',
        text:'Provider'
      }, {
        dataField:'sales_avaliability',
        text: 'Sales Avaliability'
      }
    ];

    const sizePerPageRenderer = ({
        options,
        currSizePerPage,
        onSizePerPageChange
      }) => (
        <div className="btn-group" role="group">
          {
            options.map(option => (
              <button
                key={ option.text }
                type="button"
                onClick={ () => onSizePerPageChange(option.page) }
                className={ `btn ${currSizePerPage === `${option.page}` ? 'btn-secondary' : 'btn-warning'}` }
              >
                { option.text }
              </button>
            ))
          }
        </div>
      );

    const options = {
        custom: true,
        totalSize: coverage_brasil.length
    };

    const handleNextPage = ({ page, onPageChange, totalSize, sizePerPage }) => {
        if ( page + 1 < totalSize / sizePerPage )
            onPageChange(page + 1); 
    }

    const handlePrevPage = ( { page, onPageChange } ) => {
        if(page - 1 != 0)
            onPageChange(page - 1);
    }

    const handleSizePerPage = ({ page, onSizePerPageChange }, newSizePerPage ) => {
        onSizePerPageChange(newSizePerPage, page)
    }


    return (
        <div>
            <PaginationProvider pagination={ paginationFactory(options) }>
                {
                    ({
                        paginationProps,
                        paginationTableProps
                    }) => (
                        <div>
                            {console.log('paginationProps ',paginationProps)}
                            {console.log('paginationTableProps ',paginationTableProps)}

                             <BootstrapTable
                                keyField="id"
                                data={ coverage_brasil }
                                columns={ columns }
                                { ...paginationTableProps }
                                />

                            <div className="btn-group" role="group">
                                <button className="btn btn-success" onClick={ () => handlePrevPage(paginationProps) }>Previous</button>
                                <select>
                                    <option onClick={ ()=>handleSizePerPage(paginationProps, 5) }>5</option>
                                    <option onClick={ ()=>handleSizePerPage(paginationProps, 10) }>10</option>
                                    <option onClick={ ()=>handleSizePerPage(paginationProps, 12) }>12</option>
                                    <option onClick={ ()=>handleSizePerPage(paginationProps, 24) }>24</option>
                                    <option onClick={ ()=>handleSizePerPage(paginationProps, 48) }>48</option>
                                </select>
                                <button className="btn btn-primary" onClick={ () => handleNextPage(paginationProps) }>Next</button>
                                {/* <button className="btn btn-primary" >Next Page</button> */}
                                {/* <button className="btn btn-success" >Prev Page</button> */}
                            </div>
                        </div>

                    )
                }
            </PaginationProvider>
        </div>

    )

//     const {
//         getTableProps,
//         getTableBodyProps,
//         headerGroups,
//         prepareRow,
//         page,
//         canPreviousPage,
//         canNextPage,
//         pageOptions,
//         pageCount,
//         gotoPage,
//         nextPage,
//         previousPage,
//         setPageSize,
//         // Get the state from the instance
//         state: { pageIndex, pageSize }
//     } = useTable(
//         {
//             columns,
//             data,
//             initialState: { pageIndex: 0 }, // Pass our hoisted table state
//             manualPagination: true, // Tell the usePagination
//             // hook that we'll handle our own data fetching
//             // This means we'll also have to provide our own
//             // pageCount.
//             pageCount: controlledPageCount
//         },
//         usePagination
//     );

//   // Now we can get our table state from the hoisted table state tuple

//     // Listen for changes in pagination and use the state to fetch our new data
//     useEffect(() => {
//         console.log(pageIndex);
//         fetchData({ pageIndex, pageSize });
//     }, [fetchData, pageIndex, pageSize]);

//   // Render the UI for your table
//   return (
//     <>
//       {/* <pre>
//         <code>
//           {JSON.stringify(
//             {
//               pageIndex,
//               pageSize,
//               pageCount,
//               canNextPage,
//               canPreviousPage
//             },
//             null,
//             2
//           )}
//         </code>
//       </pre> */}
//       <table {...getTableProps()}>
//         <thead>
//           {headerGroups.map(headerGroup => (
//             <tr {...headerGroup.getHeaderGroupProps()}>
//               {headerGroup.headers.map(column => (
//                 <th {...column.getHeaderProps()}>{column.render("Header")}</th>
//               ))}
//             </tr>
//           ))}
//         </thead>
//         <tbody {...getTableBodyProps()}>
//           {page.map((row, i) => {
//             prepareRow(row);
//             return (
//               <tr {...row.getRowProps()}>
//                 {row.cells.map(cell => {
//                   return (
//                     <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
//                   );
//                 })}
//               </tr>
//             );
//           })}
//           <tr>
//             {loading ? (
//               // Use our custom loading state to show a loading indicator
//               <td>Loading...</td>
//             ) : (
//               <td>
//                 Showing {page.length} of ~{controlledPageCount * pageSize}{" "}
//                 results
//               </td>
//             )}
//           </tr>
//         </tbody>
//       </table>
//       {/* 
//         Pagination can be built however you'd like. 
//         This is just a very basic UI implementation:
//       */}
//       <div className="pagination">
//         <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
//           {"<<"}
//         </button>{" "}
//         <button onClick={() => previousPage()} disabled={!canPreviousPage}>
//           {"<"}
//         </button>{" "}
//         <button onClick={() => nextPage()} disabled={!canNextPage}>
//           {">"}
//         </button>{" "}
//         <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
//           {">>"}
//         </button>{" "}
//         <span>
//           Page{" "}
//           <strong>
//             {pageIndex + 1} of {pageOptions.length}
//           </strong>{" "}
//         </span>
//         <span>
//           | Go to page:{" "}
//           <input
//             type="number"
//             defaultValue={pageIndex + 1}
//             onChange={e => {
//               const page = e.target.value ? Number(e.target.value) - 1 : 0;
//               gotoPage(page);
//             }}
//             style={{ width: "100px" }}
//           />
//         </span>{" "}
//         <select
//           value={pageSize}
//           onChange={e => {
//             setPageSize(Number(e.target.value));
//           }}
//         >
//           {[10, 20, 30, 40, 50].map(pageSize => (
//             <option key={pageSize} value={pageSize}>
//               Show {pageSize}
//             </option>
//           ))}
//         </select>
//       </div>
//     </>
//   );
}