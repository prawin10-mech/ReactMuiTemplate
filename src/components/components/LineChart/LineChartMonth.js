import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui
import { Card, CardHeader, Box } from '@mui/material';
// components
import { CustomSmallSelect } from '../custom-input';
import Chart, { useChart } from '../chart';

// ----------------------------------------------------------------------

LineChartMonth.propTypes = {
  chart: PropTypes.object,
  title: PropTypes.string,
  subheader: PropTypes.string,
  setSelectedMonth: PropTypes.func,
  setloading: PropTypes.func,
};

const monthData = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export default function LineChartMonth ({ title,setloading, subheader, setSelectedMonth, chart, ...other }) {
  const { colors, categories, series, options } = chart;
  const currentMonthIndex = new Date().getMonth();

// Match the current month index with monthData
const currentMonth = monthData[currentMonthIndex];

  // const weekNumbers = categories.map((value) => `Week ${value._id.week}`);

  const [seriesData, setSeriesData] = useState(currentMonth);

  const chartOptions = useChart({
    colors,
    xaxis: {
      categories,
    },
    ...options,
  });

  // const handleSelectChange = (event) => {
  //   setloading(true)
  //   const selectedValue = event.target.value;
  //   setSeriesData(selectedValue);
  //   setSelectedMonth(selectedValue);
  // };

  return (
    <Card {...other}>
      <CardHeader
        title={title}
        subheader={subheader}
        // action={
        //   <CustomSmallSelect
        //     value={seriesData}
        //     onChange={handleSelectChange}
        //   >
        //     {monthData.map((option, index) => (
        //       <option key={index} value={option}>
        //         {option}
        //       </option>
        //     ))}
        //   </CustomSmallSelect>
        // }
      />

      {series.map((item, index) => (
        <Box key={index} sx={{ mt: 3, mx: 3 }} dir="ltr">
          <Chart type="line" series={item.data} options={chartOptions} height={364} />
        </Box>
      ))}
    </Card>
  );
}
