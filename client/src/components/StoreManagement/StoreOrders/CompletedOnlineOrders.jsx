import React, { useMemo } from "react";
import { Zoom } from "@mui/material";

import { useOutletContext, Link } from "react-router-dom";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from "react-table";
import CompletedOnlineOrdersFilter from "./CompletedOnlineOrdersFilter";
import { CompletedOnlineOrderColumn } from "./CompletedOnlineOrderColumns";
import ArrowDropUpSharpIcon from "@mui/icons-material/ArrowDropUpSharp";
import ArrowDropDownSharpIcon from "@mui/icons-material/ArrowDropDownSharp";
import ArrowBackIosNewSharpIcon from "@mui/icons-material/ArrowBackIosNewSharp";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";

function CompletedOnlineOrders(props) {
  const { orders } = props;
  const columns = useMemo(() => CompletedOnlineOrderColumn, []);
  const data = useMemo(() => orders, []);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    state,
    setGlobalFilter,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    setPageSize,
  } = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const { globalFilter } = state;

  const { pageIndex, pageSize } = state;
  return (
    <div className="table-container">
      <div className="table-search">
        <h1>Online orders</h1>
        <CompletedOnlineOrdersFilter
          filter={globalFilter}
          setFilter={setGlobalFilter}
        />
      </div>
      <div>
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((header) => (
              <tr {...header.getHeaderGroupProps()}>
                {header.headers.map((col) => (
                  <th {...col.getHeaderProps(col.getSortByToggleProps())}>
                    {col.render("Header")}
                    <span className="sort-indicator">
                      {col.isSorted ? (
                        col.isSortedDesc ? (
                          <ArrowDropDownSharpIcon />
                        ) : (
                          <ArrowDropUpSharpIcon />
                        )
                      ) : (
                        ""
                      )}
                    </span>
                  </th>
                ))}
                <th className="action">Action</th>
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>
                        <p>{cell.render("Cell")}</p>
                      </td>
                    );
                  })}
                  <td>
                    <div>
                      <Link to={`./`}>
                        <button className="tertiary solid">View</button>
                      </Link>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className="pagination">
          <div id="new-input-group">
            <select
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
            >
              {[10, 25, 50].map((pageSize, index) => (
                <option key={index} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </select>
          </div>
          <div>
            <div
              className="pagination-arrow"
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
            >
              <ArrowBackIosNewSharpIcon />
            </div>
            <p>
              Page: {pageIndex + 1} of {pageOptions.length}
            </p>
            <div
              className="pagination-arrow"
              onClick={() => nextPage()}
              disabled={!canNextPage}
            >
              <ArrowForwardIosSharpIcon />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompletedOnlineOrders;
