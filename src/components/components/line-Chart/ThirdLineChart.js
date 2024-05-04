import PropTypes from 'prop-types';

import { BookingReservationStats } from '../../sections/@dashboard/general/booking';

ThirdLineChart.propTypes = {
  BarChart: PropTypes.object,
};

function ThirdLineChart({ BarChart }) {
  const {
    Heading,
    subHeading,
    BarChartTitleFirst,
    BarChartTitleSecond,
    BarChartTitleThird,

    BarChartFirstLineMonthWise,
    BarChartSecondLineMonthWise,
    BarChartThirdLineMonthWise,

    BarChartFirstLineWeekWise,
    BarChartSecondLineWeekWise,
    BarChartThirdLineWeekWise,

    BarChartFirstLineDailyWise,
    BarChartSecondLineDailyWise,
    BarChartThirdLineDailyWise,
  } = BarChart;

  return (
    <BookingReservationStats
      title={Heading}
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
        Daily: BarChartFirstLineDailyWise
          ? Object.keys(BarChartFirstLineDailyWise)
              .slice(0, 12)
              .map((date) => date)
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
            data: [
              {
                name: BarChartTitleFirst,
                data: Object.keys(BarChartFirstLineDailyWise)
                  .slice(0, 12)
                  .map((month) => BarChartFirstLineDailyWise[month]),
              },
              {
                name: BarChartTitleSecond,
                data: Object.keys(BarChartSecondLineDailyWise)
                  .slice(0, 12)
                  .map((month) => BarChartSecondLineDailyWise[month]),
              },
              {
                name: BarChartThirdLineDailyWise !== [] && BarChartTitleThird,
                data:
                  BarChartThirdLineDailyWise !== [] &&
                  Object.keys(BarChartThirdLineDailyWise)
                    ?.slice(0, 12)
                    .map((month) => BarChartThirdLineDailyWise[month]),
              },
            ],
          },
          {
            type: 'Week',
            data: [
              {
                name: BarChartTitleFirst,
                data: Object.keys(BarChartFirstLineWeekWise)
                  .slice(0, 12)
                  .map((month) => BarChartFirstLineWeekWise[month]),
              },
              {
                name: BarChartTitleSecond,
                data: Object.keys(BarChartSecondLineWeekWise)
                  .slice(0, 12)
                  .map((month) => BarChartSecondLineWeekWise[month]),
              },
              {
                name: BarChartThirdLineDailyWise !== [] && BarChartTitleThird,
                data:
                  BarChartThirdLineWeekWise !== [] &&
                  Object.keys(BarChartThirdLineWeekWise)
                    ?.slice(0, 12)
                    .map((month) => BarChartThirdLineWeekWise[month]),
              },
            ],
          },
          {
            type: 'Month',
            data: [
              {
                name: BarChartTitleFirst,
                data: Object.keys(BarChartFirstLineMonthWise).map(
                  (month) => BarChartFirstLineMonthWise[month]
                ),
              },
              {
                name: BarChartTitleSecond,
                data: Object.keys(BarChartSecondLineMonthWise).map(
                  (month) => BarChartSecondLineMonthWise[month]
                ),
              },
              {
                name: BarChartThirdLineDailyWise !== [] && BarChartTitleThird,
                data:
                  BarChartThirdLineMonthWise !== [] &&
                  Object.keys(BarChartThirdLineMonthWise)?.map(
                    (month) => BarChartThirdLineMonthWise[month]
                  ),
              },
            ],
          },
        ],
      }}
    />
  );
}

export default ThirdLineChart;
