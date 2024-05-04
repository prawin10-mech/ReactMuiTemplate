/* eslint-disable prefer-template */
/* eslint-disable no-nested-ternary */
import moment from 'moment';

import { _cityIdCodes } from '../_mock/arrays/_idCode';

export const todayRegistered = (users) => {
  const todayDate = new Date().toISOString().slice(0, 10);
  const today = users?.filter(
    (user) => new Date(user.createdAt).toISOString().slice(0, 10) === todayDate
  );
  return today;
};

export const yesterdayRegistered = (users) => {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  const yesterdayDate = yesterday.toISOString().slice(0, 10);
  const yesterdayUsers = users?.filter(
    (user) => new Date(user.createdAt).toISOString().slice(0, 10) === yesterdayDate
  );
  return yesterdayUsers;
};

export const percentageChange = (today, yesterday) => {
  const yesterdayValue = +yesterday;
  if (yesterdayValue === 0) {
    return 0;
  }

  const percentage = (+today - yesterdayValue) / yesterdayValue;
  return +(percentage * 100).toFixed(2);
};

const getLastWeekDates = () => {
  const today = moment();
  const lastWeekStart = today.clone().subtract(1, 'week');
  const lastWeekDates = [];

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < 7; i++) {
    const date = lastWeekStart.clone().add(i, 'days');
    lastWeekDates.push(date.format('DD-MM-YYYY'));
  }

  return lastWeekDates;
};

const dataObject = () => {
  const array = getLastWeekDates();
  const obj = {};

  array.forEach((date) => {
    obj[date] = 0;
  });

  return obj;
};
export const weekData = (data) => {
  const dataArray = dataObject();

  data.forEach((user) => {
    const dt = moment(user.createdAt).format('DD-MM-YYYY');
    if (dt in dataArray) {
      // eslint-disable-next-line no-plusplus
      dataArray[dt]++;
    }
  });
  return Object.values(dataArray);
};

function addLeadingZeroes(number, desiredLength) {
  const numberString = String(number);
  const zeroesToAdd = Math.max(0, desiredLength - numberString.length);
  const leadingZeroes = '0'.repeat(zeroesToAdd);
  return leadingZeroes + numberString;
}

const generateId = (city, index, id) => {
  const symbol = city || 'DXB';
  const number = addLeadingZeroes(index, 7);
  const generatedId = `${symbol}#${id}${number}`;
  return generatedId;
};

export const addIdCode = (users, id, roommates) => {
  users.forEach((user, index) => {
    const userType = user.type;
    const userTypeCode =
      userType === 'landlord'
        ? 'LA'
        : userType === 'maintainer'
        ? 'MA'
        : roommates && roommates.data.some((roommate) => roommate.id === user.id)
        ? 'RO'
        : 'TE';

    user.idCode = generateId('DXB', index + 1, id || userTypeCode);
  });

  return users;
};

export const addPropertyIdCode = (properties) => {
  const updatedProperties = properties.map((property, index) => {
    const city = property?.ad?.address?.city?.toLowerCase();
    const cityId = _cityIdCodes.find((item) => item?.name?.toLowerCase() === city).symbol;
    const propertyId = generateId((!!cityId && cityId) || 'DXB', index + 1, 'PR');

    property.propertyId = propertyId;

    return property;
  });

  console.log(updatedProperties);

  return updatedProperties.reverse();
};
