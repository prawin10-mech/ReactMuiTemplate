import PropTypes from 'prop-types';
// @mui
import { TableRow, TableCell } from '@mui/material';

// router- dom
import { useNavigate } from 'react-router-dom';

// components
import { UniqueCode } from '../../sections/@dashboard/general/app';
import { PATH_DASHBOARD } from '../../routes/paths';

// ----------------------------------------------------------------------

UserTableRow.propTypes = {
  row: PropTypes.object,
  headers: PropTypes.object,
  selected: PropTypes.bool,
  onEditRow: PropTypes.func,
  onPostPropertyRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
  onSelectRow: PropTypes.func,
  type: PropTypes.string,
};

export default function UserTableRow({
  row,
  headers,
  selected,
  onPostPropertyRow,
  onEditRow,
  onSelectRow,
  onDeleteRow,
  type,
}) {
  const navigate = useNavigate();

  const handleNavigate = () => {
    if (type === 'property') {
      navigate(PATH_DASHBOARD.properties.property_details, { state: row });
    }
  };

  return (
    <TableRow hover selected={selected}>
      {headers.map((header) => {
        if (header.id.split(' ')[1] === 'code') {
          return (
            <TableCell
              align="center"
              sx={{ cursor: header?.link ? 'pointer' : '' }}
              onClick={() => handleNavigate()}
            >
              <UniqueCode code={row[header.id.split(' ')[0]]} />
            </TableCell>
          );
        }

        if (header.id === 'country') {
          return <TableCell align="center">Dubai</TableCell>;
        }

        if (header.id.split(' ')[1] === 'address') {
          return <TableCell align="center">{row.address[header.id.split(' ')[0]]}</TableCell>;
        }

        if (header.id.split(' ')[1] === 'available') {
          return <TableCell align="center">{row.quantity - row.quantityTaken}</TableCell>;
        }
        return (
          <TableCell align="center" sx={{ cursor: header?.link ? 'pointer' : '' }}>
            {row[header.id]}
          </TableCell>
        );
      })}
    </TableRow>
  );
}
