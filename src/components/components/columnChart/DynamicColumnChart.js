import PropTypes from 'prop-types';

import { BookingReservationStats } from '../../sections/@dashboard/general/booking';

DynamicColumnChart.propTypes = {
  BarChart: PropTypes.object,
};

function DynamicColumnChart({ BarChart }) {
  const {
    Heading,
    subHeading,

    BarChartFirstLineWeekWise,

    BarChartFirstLineDailyWise,

    BarchartDailyTitle,
    BarchartWeeklyTitle,
    BarchartMonthlyTitle,

    BarChartDailyDataObjects,
    BarChartWeeklyDataObjects,
    BarChartMonthlyDataObjects,
  } = BarChart;

  function generateChartData(titles, dataObjects) {
    return titles.map((title, index) => {
      const data = dataObjects[index];
      return {
        name: title,
        data: data ? Object.values(data) : [],
      };
    });
  }

  return (
    <BookingReservationStats
      title={Heading}
      subheader={subHeading}
      showDropDown
      categories={{
        Month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        Week: BarChartFirstLineWeekWise
          ? Object.keys(BarChartFirstLineWeekWise)
              .slice(0, 12)
              .map((date) => date)
              .reverse()
          : [
              'Week1',
              'Week2',
              'Week3',
              'Week4',
              'Week1',
              'Week2',
              'Week3',
              'Week4',
              'Week1',
              'Week2',
              'Week3',
              'Week4',
            ],
        Daily: BarChartFirstLineDailyWise
          ? Object.keys(BarChartFirstLineDailyWise).map((date) => date)
          : [
              'Day1',
              'Day2',
              'Day3',
              'Day4',
              'Day5',
              'Day6',
              'Day7',
              'Day8',
              'Day9',
              'Day10',
              'Day11',
              'Day12',
            ],
      }}
      chart={{
        series: [
          {
            type: 'Daily',
            data: generateChartData(BarchartDailyTitle, BarChartDailyDataObjects),
          },
          {
            type: 'Week',
            data: generateChartData(BarchartWeeklyTitle, BarChartWeeklyDataObjects),
          },
          {
            type: 'Month',
            data: generateChartData(BarchartMonthlyTitle, BarChartMonthlyDataObjects),
          },
          //   {
          //     type: 'Year',
          //     data: generateChartData(BarchartMonthlyTitle, BarChartMonthlyDataObjects) ,
          //   },
        ],
      }}
    />
  );
}

export default DynamicColumnChart;
