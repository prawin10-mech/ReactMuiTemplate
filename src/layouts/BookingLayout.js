import PropTypes from 'prop-types';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container } from '@mui/material';
// components
import { useSettingsContext } from '../components/settings';
// sections
import {
  BookingDetails,
  BookingBookedRoom,
  BookingTotalIncomes,
  BookingWidgetSummary,
  BookingCheckInWidgets,
  BookingReservationStats,
} from '../sections/@dashboard/general/booking';
import { AppCurrentDownload } from '../sections/@dashboard/general/app';

// ----------------------------------------------------------------------

BookingLayout.propTypes = {
  totalBookings: PropTypes.array,
  bookings: PropTypes.array,
  title: PropTypes.string,
  todayBookings: PropTypes.array,
  monthlyBookings: PropTypes.array,
  cancelledBookings: PropTypes.array,
  activeBookings: PropTypes.array,
  weekData: PropTypes.object,
  extraData: PropTypes.array,

  BookedRoomLine1Title: PropTypes.string,
  BookedRoomLine2Title: PropTypes.string,
  BookedRoomLine3Title: PropTypes.string,
  BookedRoomLine1: PropTypes.array,
  BookedRoomLine2: PropTypes.array,
  BookedRoomLine3: PropTypes.array,
  isMembership: PropTypes.bool,

  BarChart: PropTypes.object,
  firstRowFirstColumn: PropTypes.object,
  firstRowSecondColumn: PropTypes.object,
  firstRowThirdColumn: PropTypes.object,
};

export default function BookingLayout({
  totalBookings,
  bookings,
  title,
  todayBookings,
  monthlyBookings,
  cancelledBookings,
  activeBookings,
  weekData,
  extraData,

  BookedRoomLine1Title,
  BookedRoomLine2Title,
  BookedRoomLine3Title,
  BookedRoomLine1,
  BookedRoomLine2,
  BookedRoomLine3,
  BarChart,
  firstRowFirstColumn,
  firstRowSecondColumn,
  firstRowThirdColumn,
  isMembership,
}) {
  const theme = useTheme();
  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Helmet>
        <title>{title} | CRM</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <FirstRowFirstBox bodyData={firstRowFirstColumn} />
          </Grid>

          <Grid item xs={12} md={4}>
            <FirstRowFirstBox bodyData={firstRowThirdColumn} />
          </Grid>

          <Grid item xs={12} md={4}>
            <FirstRowFirstBox bodyData={firstRowSecondColumn} />
          </Grid>

          <Grid item xs={12} md={8}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <BookingTotalIncomes
                  total={totalBookings.length}
                  percent={2.6}
                  chart={{
                    series: Object.keys(weekData).length
                      ? Object.keys(weekData)
                          .map((week) => weekData[week].length)
                          .reverse()
                      : [0, 0, 0, 0, 0, 0, 0],
                  }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <BookingBookedRoom
                  title="Booked Room"
                  BookedRoomLine1={BookedRoomLine1}
                  BookedRoomLine2={BookedRoomLine2}
                  BookedRoomLine3={BookedRoomLine3}
                  BookedRoomLine1Title={BookedRoomLine1Title}
                  BookedRoomLine2Title={BookedRoomLine2Title}
                  BookedRoomLine3Title={BookedRoomLine3Title}
                />
              </Grid>

              {title === 'Active' && (
                <Grid item xs={12} md={12}>
                  <BookingCheckInWidgets
                    chart={{
                      colors: [theme.palette.warning.main],
                      series: [
                        {
                          label: `Total ${title} Bookings`,
                          percent:
                            bookings && totalBookings
                              ? (bookings.length / totalBookings.length).toFixed(2) * 100
                              : 8,
                          total: bookings.length || 15,
                        },
                        {
                          label: 'Total Cancelled Bookings',
                          percent:
                            cancelledBookings && totalBookings
                              ? (cancelledBookings.length / totalBookings.length).toFixed(2) * 100
                              : 8,
                          total: cancelledBookings.length || 12,
                        },
                      ],
                    }}
                  />
                </Grid>
              )}

              {title === 'Pending' && (
                <Grid item xs={12} md={12}>
                  <BookingCheckInWidgets
                    chart={{
                      colors: [theme.palette.warning.main],
                      series: [
                        {
                          label: `Total ${title} Bookings`,
                          percent:
                            bookings && totalBookings
                              ? (bookings.length / totalBookings.length).toFixed(2) * 100
                              : 8,
                          total: bookings.length || 15,
                        },
                        {
                          label: 'Total Cancelled Bookings',
                          percent:
                            cancelledBookings && totalBookings
                              ? (cancelledBookings.length / totalBookings.length).toFixed(2) * 100
                              : 8,
                          total: cancelledBookings.length || 12,
                        },
                      ],
                    }}
                  />
                </Grid>
              )}

              {title === 'Cancelled' && (
                <Grid item xs={12} md={12}>
                  <BookingCheckInWidgets
                    chart={{
                      colors: [theme.palette.warning.main],
                      series: [
                        {
                          label: `Total ${title} Bookings by Tenants`,
                          percent:
                            bookings && totalBookings
                              ? (bookings.length / totalBookings.length).toFixed(2) * 100
                              : 8,
                          total: bookings.length || 15,
                        },
                        {
                          label: 'Total Cancelled Bookings by landlord ',
                          percent:
                            bookings && totalBookings
                              ? (extraData.length / totalBookings.length).toFixed(2) * 100
                              : 8,
                          total: extraData.length || 0,
                        },
                      ],
                    }}
                  />
                </Grid>
              )}
            </Grid>
          </Grid>

          {/* {title === 'Cancelled' && (
            <Grid item xs={12} md={4}>
              {totalBookings ? (
                <BookingRoomAvailable
                  title="All Bookings"
                  total={totalBookings.length}
                  chart={{
                    series: [
                      { label: 'Cancel by landlord', value: extraData ? extraData?.length : 10 },
                      {
                        label: 'Cancel by tenant',
                        value: bookings ? bookings?.length : 10,
                      },
                    ],
                  }}
                />
              ) : (
                <BookingRoomAvailable
                  title="All Bookings"
                  total={0}
                  chart={{
                    series: [
                      { label: 'Cancel by landlord', value: 56 },
                      {
                        label: 'Cancel by tenant',
                        value: 24,
                      },
                    ],
                  }}
                />
              )}
            </Grid>
          )} */}

          <Grid item xs={12} md={4}>
            <AppCurrentDownload
              title="All Bookings"
              height={400}
              chart={{
                colors: [
                  theme.palette.primary.main,
                  theme.palette.info.main,
                  theme.palette.info.dark,
                ],

                series: [
                  {
                    label: title,
                    value: bookings ? bookings.length : 56,
                  },
                  {
                    label: 'Remaining',
                    value: totalBookings ? totalBookings.length - bookings.length : 24,
                  },
                ],
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <MonthWiseBarChartForThree BarChart={BarChart} />
          </Grid>

          <Grid item xs={12}>
            <BookingDetails
              title={`${title} Booking Details`}
              tableData={bookings}
              tableLabels={[
                { id: 'Tenant Id', label: 'Tenant Id' },
                { id: 'Booked At', label: 'Booked At' },
                { id: 'checkIn', label: 'Check In' },
                { id: 'checkOut', label: 'Check Out' },
                { id: 'status', label: 'Status' },
                { id: 'phone', label: 'Phone' },
                { id: 'rentType', label: 'Rent Type' },
                { id: '' },
              ]}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

FirstRowFirstBox.propTypes = {
  bodyData: PropTypes.object,
};

export function FirstRowFirstBox({ bodyData }) {
  const { title, total, icon } = bodyData;
  const IconComponent = icon;
  return <BookingWidgetSummary title={title} total={total} icon={<IconComponent />} />;
}

MonthWiseBarChartForThree.propTypes = {
  BarChart: PropTypes.object,
};

export function MonthWiseBarChartForThree({ BarChart }) {
  const [seriesYear, setSeriesYear] = useState(new Date().getFullYear().toString());
  const { BarChartTitle, bookingsMonthlyData } = BarChart;

  const activeBookingsData = Object.keys(bookingsMonthlyData?.[parseInt(seriesYear, 10)] || {}).map(
    (m) => bookingsMonthlyData?.[parseInt(seriesYear, 10)][m].active
  );
  const pendingBookingsData = Object.keys(
    bookingsMonthlyData?.[parseInt(seriesYear, 10)] || {}
  ).map((m) => bookingsMonthlyData?.[parseInt(seriesYear, 10)][m].pending);

  const cancelledBookingsData = Object.keys(
    bookingsMonthlyData?.[parseInt(seriesYear, 10)] || {}
  ).map((m) => bookingsMonthlyData?.[parseInt(seriesYear, 10)][m].cancelled);

  return (
    <BookingReservationStats
      title={BarChartTitle}
      subheader=""
      seriesYear={seriesYear}
      setSeriesYear={setSeriesYear}
      showDropDown
      onlyYear
      categories={{
        Month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        Year: ['2024', '2023'],
      }}
      chart={{
        series: [
          {
            type: 'Month',
            data: [
              {
                name: 'Active',
                data: activeBookingsData,
              },
              {
                name: 'Pending',
                data: pendingBookingsData,
              },
              {
                name: 'Cancel',
                data: cancelledBookingsData,
              },
            ],
          },
        ],
      }}
    />
  );
}
