import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@mui/material';

Status.propTypes = {
  status: PropTypes.string,
};
export default function Status({ status }) {
  return (
    // eslint-disable-next-line no-nested-ternary
    <Typography color={status === 'Pending' ? 'orange' : status === 'Active' ? 'green' : 'red'}>
      {status}
    </Typography>
  );
}
