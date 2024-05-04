import { memo } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';

// ----------------------------------------------------------------------

function BedIllustration({ ...other }) {
  const theme = useTheme();

  const PRIMARY_LIGHT = theme.palette.primary.light;

  const PRIMARY_DARK = theme.palette.primary.dark;

  return (
    <Box display="flex" height="165px" width="130px" style={{ margin: '18px' }} {...other}>
      <svg width="100%" height="100%" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <path
          fill="url(#a)"
          d="M21.65,24.62h20.96c3.42,0,6.22,2.79,6.22,6.21v6.22H21.65V24.62L21.65,24.62z M7.36,79.56h5.93 c1.72,0,3.12-1.42,3.12-3.12v-9.35H4.23v9.35C4.23,78.15,5.64,79.56,7.36,79.56L7.36,79.56z M108.79,79.56h5.93 c1.72,0,3.12-1.42,3.12-3.12v-9.35h-12.18v9.35C105.67,78.15,107.08,79.56,108.79,79.56L108.79,79.56z M2.82,41.01h1.41V3.12 C4.23,1.4,5.64,0,7.35,0h5.93c1.72,0,3.12,1.4,3.12,3.12v37.89h89.26V23.14c0-1.72,1.4-3.12,3.12-3.12h5.93 c1.72,0,3.12,1.42,3.12,3.12v17.87h2.22c1.55,0,2.82,1.27,2.82,2.82v15.99c0,1.55-1.27,2.81-2.82,2.81H2.82 C1.27,62.63,0,61.36,0,59.82V43.83C0,42.28,1.27,41.01,2.82,41.01L2.82,41.01z"
        />

        <defs>
          <linearGradient
            id="a"
            x1="64.751"
            x2="64.751"
            y1="99.643"
            y2="186.617"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor={PRIMARY_LIGHT} />
            <stop offset="1" stopColor={PRIMARY_DARK} />
          </linearGradient>

          <linearGradient
            id="b"
            x1="95.286"
            x2="95.286"
            y1="280.421"
            y2="185.693"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor={PRIMARY_LIGHT} />
            <stop offset="1" stopColor={PRIMARY_DARK} />
          </linearGradient>
        </defs>
      </svg>
    </Box>
  );
}

export default memo(BedIllustration);
