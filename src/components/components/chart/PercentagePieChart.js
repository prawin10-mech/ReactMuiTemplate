import PropTypes from 'prop-types';
// @mui
import { useTheme } from '@mui/material/styles';
import { Card, Stack, Divider } from '@mui/material';
// hooks
import useResponsive from '../../hooks/useResponsive';
// components
import Chart, { useChart } from './index';

// ----------------------------------------------------------------------

const CHART_SIZE = {
  width: 106,
  height: 106,
};

PercentagePieChart.propTypes = {
  percent: PropTypes.number,
  colors: PropTypes.array,
};

export default function PercentagePieChart({ percent, colors, ...other }) {
  const theme = useTheme();

  const isDesktop = useResponsive('up', 'sm');

  const options = useChart({
    chart: {
      sparkline: {
        enabled: true,
      },
    },
    grid: {
      padding: {
        top: -9,
        bottom: -9,
      },
    },
    legend: {
      show: false,
    },
    plotOptions: {
      radialBar: {
        hollow: { size: '64%' },
        track: { margin: 0 },
        dataLabels: {
          name: { show: false },
          value: {
            offsetY: 6,
            fontSize: theme.typography.subtitle2.fontSize,
          },
        },
      },
    },
    colors,
  });

  return (
    <Card {...other}>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        divider={
          <Divider
            orientation={isDesktop ? 'vertical' : 'horizontal'}
            flexItem
            sx={{ borderStyle: 'dashed' }}
          />
        }
      >
        <Chart type="radialBar" series={[percent]} options={options} {...CHART_SIZE} />
      </Stack>
    </Card>
  );
}
