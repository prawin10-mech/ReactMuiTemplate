import PropTypes from 'prop-types';

FourLineChart.propTypes = {
  BarChart: PropTypes.object,
};

function FourLineChart({ BarChart }) {
  return <div>a</div>;
  // <AppAreaInstalled
  //   title="Users Monthly Registrations"
  //   chart={{
  //     colors: [
  //       theme.palette.error.main,
  //       theme.palette.warning.main,
  //       theme.palette.primary.main,
  //       theme.palette.secondary.main,
  //       theme.palette.primary.dark,
  //     ],
  //     categories: [
  //       'Jan',
  //       'Feb',
  //       'Mar',
  //       'Apr',
  //       'May',
  //       'Jun',
  //       'Jul',
  //       'Aug',
  //       'Sep',
  //       'Oct',
  //       'Nov',
  //       'Dec',
  //     ],
  //     series: !isLoading
  //       ? graphData
  //       : [
  //           {
  //             year: '2023',
  //             data: [
  //               {
  //                 name: 'Landlords',
  //                 data:
  //                   LandlordMonthWiseData &&
  //                   Object.keys(LandlordMonthWiseData).map(
  //                     (month) => LandlordMonthWiseData[month]
  //                   ),
  //               },

  //               {
  //                 name: 'Roommates',
  //                 data:
  //                   roommateMonthWiseData &&
  //                   Object.keys(roommateMonthWiseData).map(
  //                     (month) => roommateMonthWiseData[month]
  //                   ),
  //               },
  //               {
  //                 name: 'Tenants',
  //                 data:
  //                   tenantsMonthWiseData &&
  //                   Object.keys(tenantsMonthWiseData).map((month) => tenantsMonthWiseData[month]),
  //               },
  //               {
  //                 name: 'Maintenance',
  //                 data:
  //                   maintainersMonthWiseData &&
  //                   Object.keys(maintainersMonthWiseData).map(
  //                     (month) => maintainersMonthWiseData[month]
  //                   ),
  //               },
  //             ],
  //           },
  //         ],
  //   }}
  // />
}

export default FourLineChart;
