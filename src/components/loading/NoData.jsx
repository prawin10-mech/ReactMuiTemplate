import { Box, Grid, Typography } from '@mui/material';
import React from 'react';

export default function NoData() {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Box sx={{ border: '1px solid', padding: 2, borderRadius: 2, height: '100%' }}>
          <Typography textAlign="center">No data</Typography>{' '}
        </Box>
      </Grid>
    </Grid>
  );
}
