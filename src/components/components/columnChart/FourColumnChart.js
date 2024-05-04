import PropTypes from 'prop-types';
import { useState } from 'react';

import { BookingReservationStats } from '../../sections/@dashboard/general/booking';

FourColumnChart.propTypes = {
  BarChart: PropTypes.object,
};

function FourColumnChart({ BarChart }) {
  const [seriesYear, setSeriesYear] = useState(new Date().getFullYear().toString());
  const {
    Heading,
    subHeading,

    BarChartTitleFirst,
    BarChartTitleSecond,
    BarChartTitleThird,
    BarChartTitleForth,

    BarChartFirstLineMonthWise,
    BarChartSecondLineMonthWise,
    BarChartThirdLineMonthWise,
    BarChartForthLineMonthWise,

    BarChartFirstLineWeekWise,
    BarChartSecondLineWeekWise,
    BarChartThirdLineWeekWise,
    BarChartForthLineWeekWise,

    BarChartFirstLineDailyWise,
    BarChartSecondLineDailyWise,
    BarChartThirdLineDailyWise,
    BarChartForthLineDailyWise,
  } = BarChart;

  return (
    <BookingReservationStats
      title={Heading}
      subheader={subHeading}
      seriesYear={seriesYear}
      setSeriesYear={setSeriesYear}
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
              {
                name: BarChartTitleThird,
                data:
                  BarChartThirdLineDailyWise &&
                  Object.keys(BarChartThirdLineDailyWise)?.map(
                    (month) => BarChartThirdLineDailyWise[month]
                  ),
              },
              {
                name: BarChartTitleForth,
                data:
                  BarChartForthLineDailyWise &&
                  Object.keys(BarChartForthLineDailyWise)?.map(
                    (month) => BarChartForthLineDailyWise[month]
                  ),
              },
            ],
          },

          {
            type: 'Month',
            data: [
              {
                name: BarChartTitleFirst,
                data: BarChartFirstLineMonthWise && BarChartFirstLineMonthWise[seriesYear],
              },
              {
                name: BarChartTitleSecond,
                data: BarChartSecondLineMonthWise && BarChartSecondLineMonthWise[seriesYear],
              },
              {
                name: BarChartTitleThird,
                data: BarChartThirdLineMonthWise && BarChartThirdLineMonthWise[seriesYear],
              },
              {
                name: BarChartTitleForth,
                data: BarChartForthLineMonthWise && BarChartForthLineMonthWise[seriesYear],
              },
            ],
          },
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
              {
                name: BarChartTitleThird,
                data:
                  BarChartThirdLineWeekWise &&
                  Object.keys(BarChartThirdLineWeekWise)
                    .slice(0, 12)
                    .map((month) => BarChartThirdLineWeekWise[month]),
              },
              {
                name: BarChartTitleForth,
                data:
                  BarChartForthLineWeekWise &&
                  Object.keys(BarChartForthLineWeekWise)
                    ?.slice(0, 12)
                    .map((month) => BarChartForthLineWeekWise[month]),
              },
            ],
          },
        ],
      }}
    />
  );
}

export default FourColumnChart;
