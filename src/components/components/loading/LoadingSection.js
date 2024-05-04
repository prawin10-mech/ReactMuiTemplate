import React from 'react';

// @mui
import { Grid, Skeleton } from '@mui/material';

export default function LoadingSection() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={4}>
        <Skeleton sx={{ borderRadius: 2 }} variant="rectangular" width="100%" height={150} />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Skeleton sx={{ borderRadius: 2 }} variant="rectangular" width="100%" height={150} />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Skeleton sx={{ borderRadius: 2 }} variant="rectangular" width="100%" height={150} />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Skeleton sx={{ borderRadius: 2 }} variant="rectangular" width="100%" height={250} />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Skeleton sx={{ borderRadius: 2 }} variant="rectangular" width="100%" height={250} />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Skeleton sx={{ borderRadius: 2 }} variant="rectangular" width="100%" height={250} />
      </Grid>
    </Grid>
  );
}
