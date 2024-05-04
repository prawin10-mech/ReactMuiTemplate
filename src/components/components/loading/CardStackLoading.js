import React from 'react';
import PropTypes from 'prop-types';
import { Card, Stack, Skeleton } from '@mui/material';

CardStackLoading.propTypes = {
  count: PropTypes.number,
};
export default function CardStackLoading({ count }) {
  return (
    <Stack spacing={3}>
      {[...Array(count)].map((card, index) => (
        <Card key={index}>
          <Skeleton variant="rectangular" animation="wave" width="100%" height={100} />
        </Card>
      ))}
    </Stack>
  );
}
