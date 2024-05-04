import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui
import { Card, CardHeader, Box } from '@mui/material';
// components
import { CustomSmallSelect } from '../custom-input';
import Chart, { useChart } from '../chart';

// ----------------------------------------------------------------------

LineChartDateWise.propTypes = {
  chart: PropTypes.object,
  title: PropTypes.string,
  subheader: PropTypes.string,
  value: PropTypes.string,
  setSelectedMonth: PropTypes.func,
  onChange: PropTypes.func,
};

const monthData = ['Daily', 'Weekly', 'Monthly', 'Yearly'];

export default function LineChartDateWise({
  title,
  // setLoading,
  subheader,
  setSelectedMonth,
  chart,
  onChange,
  value,
  ...other
}) {
  const { colors, categories, series, options } = chart;
  const currentMonthIndex = new Date().getMonth();

  // Match the current month index with monthData
  const currentMonth = monthData[currentMonthIndex];

  const [seriesData, setSeriesData] = useState(currentMonth);

  const chartOptions = useChart({
    colors,
    xaxis: {
      categories,
    },
    ...options,
  });

  const handleSelectChange = (event) => {
    onChange(event);
    // setLoading(true);
    const selectedValue = event.target.value;
    setSeriesData(selectedValue);
    // setSelectedMonth(selectedValue);
  };

  return (
    <Card {...other}>
      <CardHeader
        title={title}
        subheader={subheader}
        action={
          <CustomSmallSelect value={value} onChange={handleSelectChange}>
            {monthData.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </CustomSmallSelect>
        }
      />

      {series.map((item, index) => (
        <Box key={index} sx={{ mt: 3, mx: 3 }} dir="ltr">
          <Chart type="line" series={item.data} options={chartOptions} height={300} />
        </Box>
      ))}
    </Card>
  );
}
