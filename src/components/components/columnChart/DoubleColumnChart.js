import PropTypes from 'prop-types';

import { BookingReservationStats } from '../../sections/@dashboard/general/booking';

DoubleColumnChart.propTypes = {
  BarChart: PropTypes.object,
};

function DoubleColumnChart({ BarChart }) {
  const {
    showDropDown = true,
    Heading,
    subHeading,

    BarChartTitleFirst,
    BarChartTitleSecond,

    BarChartFirstLineMonthWise,
    BarChartSecondLineMonthWise,

    BarChartFirstLineWeekWise,
    BarChartSecondLineWeekWise,

    BarChartFirstLineDailyWise,
    BarChartSecondLineDailyWise,
    height,
  } = BarChart;

  return (
    <BookingReservationStats
      showDropDown={showDropDown}
      title={Heading}
      height={height}
      subheader={subHeading}
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
        Year: BarChartFirstLineDailyWise
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
            type: 'Week',
            data: [
              {
                name: BarChartTitleFirst,
                data:
                  BarChartFirstLineWeekWise &&
                  Object.keys(BarChartFirstLineWeekWise)
                    .slice(0, 12)
                    .map((month) => BarChartFirstLineWeekWise[month]),
              },
              {
                name: BarChartTitleSecond,
                data:
                  BarChartSecondLineWeekWise &&
                  Object.keys(BarChartSecondLineWeekWise)
                    .slice(0, 12)
                    .map((month) => BarChartSecondLineWeekWise[month]),
              },
            ],
          },
          {
            type: 'Month',
            data: [
              {
                name: BarChartTitleFirst,
                data:
                  BarChartFirstLineMonthWise &&
                  Object.keys(BarChartFirstLineMonthWise).map(
                    (month) => BarChartFirstLineMonthWise[month]
                  ),
              },
              {
                name: BarChartTitleSecond,
                data:
                  BarChartSecondLineMonthWise &&
                  Object.keys(BarChartSecondLineMonthWise).map(
                    (month) => BarChartSecondLineMonthWise[month]
                  ),
              },
            ],
          },
          {
            type: 'Year',
            data: [
              {
                name: BarChartTitleFirst,
                data:
                  BarChartFirstLineDailyWise &&
                  Object.keys(BarChartFirstLineDailyWise).map(
                    (month) => BarChartFirstLineDailyWise[month]
                  ),
              },
              {
                name: BarChartTitleSecond,
                data:
                  BarChartSecondLineDailyWise &&
                  Object.keys(BarChartSecondLineDailyWise).map(
                    (month) => BarChartSecondLineDailyWise[month]
                  ),
              },
            ],
          },
        ],
      }}
    />
  );
}

export default DoubleColumnChart;
