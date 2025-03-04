import dayjs from 'dayjs';

const getRandomElementArray = (items) => items[Math.floor(Math.random() * items.length)];

const getRandomValue = (min, max) => {
  const lowerBorder = Math.ceil(Math.min(min, max));
  const upperBorder = Math.floor(Math.max(min, max));
  return Math.floor(Math.random() * (upperBorder - lowerBorder + 1) + lowerBorder);
};

const getTwoRandomDates = () => {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - Math.floor(Math.random() * 365));

  startDate.setHours(Math.floor(Math.random() * 24));
  startDate.setMinutes(Math.floor(Math.random() * 60));
  startDate.setSeconds(0);

  const endDate = new Date(startDate);
  const daysDifference = Math.floor(Math.random() * 4);

  endDate.setDate(startDate.getDate() + daysDifference);

  endDate.setHours(Math.floor(Math.random() * 24));
  endDate.setMinutes(Math.floor(Math.random() * 60));

  return [startDate, endDate];
};

const getDateDifference = (date1, date2) => {
  const start = dayjs(date1);
  const end = dayjs(date2);
  let difference = Math.abs(end.diff(start, 'minute'));

  const days = Math.floor(difference / (24 * 60));
  difference -= days * 24 * 60;
  const hours = Math.floor(difference / 60);
  const minutes = difference % 60;

  if (days > 0) {
    return `${String(days).padStart(2, '0')}D ${String(hours).padStart(2, '0')}H ${String(minutes).padStart(2, '0')}M`;
  } else if (hours > 0) {
    return `${String(hours).padStart(2, '0')}H ${String(minutes).padStart(2, '0')}M`;
  } else {
    return `${String(minutes).padStart(2, '0')}M`;
  }
};

const getTime = (date) => dayjs(date).format('HH:mm');

const getMonthAndDate = (date) => dayjs(date).format('MMM DD');

const getFullDate = (date) => dayjs(date).format('DD/MM/YY HH:mm');

export { getRandomElementArray, getRandomValue, getTwoRandomDates, getDateDifference, getTime, getMonthAndDate, getFullDate };
