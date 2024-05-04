import PropTypes from 'prop-types';
// @mui
import { Stack, Skeleton } from '@mui/material';

// ----------------------------------------------------------------------
SkeletonMap.propTypes = {
  height: PropTypes.number,
};

// ----------------------------------------------------------------------

export default function SkeletonMap({ height, ...other }) {
  return (
    <Stack spacing={8} {...other}>
      {[...Array(1)].map((_, index) => (
        <Skeleton
          key={index}
          variant="rectangular"
          sx={{ width: 1, height: height || 560, borderRadius: 2 }}
        />
      ))}
    </Stack>
  );
}
