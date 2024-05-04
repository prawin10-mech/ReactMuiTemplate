import PropTypes from 'prop-types';
import { BookingReservationStats } from '../../sections/@dashboard/general/booking';

SingleColumnChart.propTypes = {
  BarChart: PropTypes.object,
};

function SingleColumnChart({ BarChart }) {
  const {
    Heading,
    subHeading,
    BarChartTitleFirst,

    BarChartFirstLineMonthWise,

    BarChartFirstLineWeekWise,

    BarChartFirstLineDailyWise,
  } = BarChart;

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
            ],
          },
        ],
      }}
    />
  );
}

export default SingleColumnChart;
