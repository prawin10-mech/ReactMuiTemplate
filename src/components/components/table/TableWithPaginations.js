import React from 'react';
import PropTypes from 'prop-types';

// mui
import { Table, TableBody } from '@mui/material';
import {
  useTable,
  getComparator,
  emptyRows,
  TableNoData,
  TableEmptyRows,
  TableHeadCustom,
  TableSkeleton,
} from './index';
import { filterUser } from '../../sections/@dashboard/accounts/filterUser';
import TableRow from './TableRow';

TableWithPagination.propTypes = {
  type: PropTypes.string,
  tableHeadLabels: PropTypes.array,
  tableData: PropTypes.array,
  tableDataLoading: PropTypes.bool,
  filterName: PropTypes.string,
  filterStatus: PropTypes.string,
  filterRole: PropTypes.string,
  isNotFound: PropTypes.bool,
  dense: PropTypes.bool,
};

export default function TableWithPagination({
  type,
  tableHeadLabels,
  tableData,
  tableDataLoading,
  filterName,
  filterStatus,
  filterRole,
  isNotFound,
  dense,
}) {
  const {
    page,
    order,
    orderBy,
    rowsPerPage,
    //
    selected,
    onSelectRow,
    onSelectAllRows,
    //
    onSort,
  } = useTable();
  const dataFiltered = filterUser({
    inputData: tableData,
    comparator: getComparator(order, orderBy),
    filterName,
    filterRole,
    filterStatus,
  });

  const denseHeight = dense ? 52 : 72;

  return (
    <Table size={dense ? 'small' : 'medium'} sx={{ minWidth: 800 }}>
      <TableHeadCustom
        order={order}
        orderBy={orderBy}
        headLabel={tableHeadLabels}
        rowCount={tableData?.length}
        numSelected={selected?.length}
        onSort={onSort}
        onSelectAllRows={(checked) =>
          onSelectAllRows(
            checked,
            tableData?.map((row) => row.id)
          )
        }
      />
      {tableDataLoading && !tableData.length ? (
        <>
          <TableSkeleton />
          <TableSkeleton />
        </>
      ) : (
        <TableBody>
          {dataFiltered?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
            <TableRow
              type={type}
              key={row.id}
              row={row}
              headers={tableHeadLabels}
              selected={selected.includes(row.id)}
              onSelectRow={() => onSelectRow(row.id)}
            />
          ))}

          <TableEmptyRows
            height={denseHeight}
            emptyRows={emptyRows(page, rowsPerPage, tableData?.length)}
          />

          <TableNoData isNotFound={isNotFound} />
        </TableBody>
      )}
    </Table>
  );
}
