import React from 'react';
import PropTypes from 'prop-types';

// mui
import { Table, TableBody } from '@mui/material';
import {
  useTable,
  emptyRows,
  TableNoData,
  TableEmptyRows,
  TableHeadCustom,
  TableSkeleton,
} from './index';
import TableRow from './TableRow';

TableWithoutPagination.propTypes = {
  tableHeadLabels: PropTypes.array,
  tableData: PropTypes.array,
  tableDataLoading: PropTypes.bool,
  filterName: PropTypes.string,
  filterStatus: PropTypes.string,
  filterRole: PropTypes.string,
  isNotFound: PropTypes.bool,
  dense: PropTypes.bool,
};

export default function TableWithoutPagination({
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
          {tableData?.map((row) => (
            <TableRow
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
