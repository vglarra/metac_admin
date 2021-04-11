import React, { useEffect } from "react";
import { useTable, useRowSelect, usePagination } from "react-table";
import CheckBox from "./CheckBox";
import { Button } from "react-bootstrap";
import "./table.css";

// From https://codesandbox.io/s/github/tannerlinsley/react-table/tree/master/examples/basic?from-embed=&file=/src/App.js:1554-2298
// Controlled table by parent: https://spectrum.chat/react-table/general/v7-how-get-selected-rows-outside-of-react-table~2deb9558-c484-4b97-9e1c-6be608f1f275
const useInstance = (instance) => {
  if (instance && instance.getInstanceCallback) {
    instance.getInstanceCallback(instance);
  }
};

export const GastoTable = ({ columns, data, setSelectedRows, clickNextPage, clickPreviousPage, getInstanceCallback }) => {

  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    state,
    prepareRow,
    selectedFlatRows,

  } = useTable(
    {
      columns,
      data,
      getInstanceCallback,  
    },
    usePagination,
    useRowSelect,
    (hooks) => {
      
    /*   hooks.visibleColumns.push((columns) => {
        return [
          {
            id: "selection",
            Header: ({ getToggleAllRowsSelectedProps }) => (
              <CheckBox {...getToggleAllRowsSelectedProps()} />
            ),
            Cell: ({ row }) => (
              <CheckBox {...row.getToggleRowSelectedProps()} />
            ),
          },
          ...columns,
        ];
      }), */ hooks.useInstance.push(useInstance);
    }
  );

  const { pageIndex } = state;

  useEffect(() => {
    setSelectedRows(selectedFlatRows.map(row => row.original));
  }, [setSelectedRows, selectedFlatRows]);

useEffect(() => {
if (clickNextPage){
  nextPage();
};

if (clickPreviousPage){
  previousPage();
};

}, [clickNextPage, clickPreviousPage,])


  // Render the UI for your table
  return (
    <div className="table-container" >
      <table className="scroll" {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      {/* <div className="pagination-div">
        <span>
          Pág.{" "}
          <strong>
            {pageIndex + 1} de {pageOptions.length}
          </strong>{" "}
        </span>
        <Button
          size="sm"
          variant="secondary"
          disabled={!canPreviousPage}
          onClick={() => previousPage()}
        >
          Pág. Anterior
        </Button>{" "}
        <Button
          size="sm"
          variant="secondary"
          disabled={!canNextPage}
          onClick={() => nextPage()}
        >
          Siguiente
        </Button>{" "}
      </div> */}

    </div>
  );
};
