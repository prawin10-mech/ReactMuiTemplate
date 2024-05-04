import React from 'react';
import PropTypes from 'prop-types';
import { Card, Skeleton } from '@mui/material';

CardLoading.propTypes = {
  height: PropTypes.number,
};
export default function CardLoading({ height }) {
  return (
    <Card>
      <Skeleton variant="rectangle" height={height} />
    </Card>
  );
}
