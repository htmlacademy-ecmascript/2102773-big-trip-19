import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration.js';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter.js';

dayjs.extend(duration);
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

const DATE_FORMAT = 'MMM DD';
const TIME_FORMAT = 'HH:mm';
const DATE_FORMAT_ADD = 'DD/MM/YY HH:mm';
const DIFF_FORMAT_MINUTES = 'mm[M]';
const DIFF_FORMAT_HOURS = 'HH[H] mm[M]';
const DIFF_FORMAT_DAYS = 'DD[D] HH[H] mm[M]';

const today = dayjs();

function humanizePointDate(date) {
  return date ? dayjs(date).format(DATE_FORMAT) : '';
}

function humanizePointTime(time) {
  return time ? dayjs(time).format(TIME_FORMAT) : '';
}

function calculateTimeDifference(timeTo, timeFrom) {
  const diff = dayjs(timeTo).diff(dayjs(timeFrom));

  if (diff <= 60 * 60 * 1000) {
    const diffTime = dayjs.duration(diff).format(DIFF_FORMAT_MINUTES);
    return timeTo && timeFrom && timeTo > timeFrom ? diffTime : '';
  }
  if (diff > 60 * 60 * 1000 && diff < 24 * 60 * 60 * 1000) {
    const diffTime = dayjs.duration(diff).format(DIFF_FORMAT_HOURS);
    return timeTo && timeFrom && timeTo > timeFrom ? diffTime : '';
  }
  if (diff >= 24 * 60 * 60 * 1000) {
    const diffTime = dayjs.duration(diff).format(DIFF_FORMAT_DAYS);
    return timeTo && timeFrom && timeTo > timeFrom ? diffTime : '';
  }
}

function humanizePointAddDate(date) {
  return date ? dayjs(date).format(DATE_FORMAT_ADD) : '';
}

function isPointPresent(dateFrom, dateTo) {
  return dateFrom && dateTo && dayjs(dateFrom).isSameOrBefore(today) && dayjs(dateTo).isSameOrAfter(today);
}

function isPointPast(dateTo) {
  return dateTo && dayjs(dateTo).isBefore(today);
}

function isPointFuture(dateFrom) {
  return dateFrom && dayjs(dateFrom).isAfter(today);
}

function getWeightForNullDate(pointA, pointB) {
  if (pointA === null && pointB === null) {
    return 0;
  }

  if (pointA === null) {
    return 1;
  }

  if (pointB === null) {
    return -1;
  }

  return null;
}

function sortPointByPrice(pointA, pointB) {
  const weight = getWeightForNullDate(pointA.basePrice, pointB.basePrice);
  return weight ?? pointB.basePrice - pointA.basePrice;
}

function sortPointByTime(pointA, pointB) {
  const weight = getWeightForNullDate(pointA, pointB);
  const timeB = dayjs(pointB.dateTo).diff(dayjs(pointB.dateFrom));
  const timeA = dayjs(pointA.dateTo).diff(dayjs(pointA.dateFrom));

  return weight ?? dayjs(timeB).diff(dayjs(timeA));
}

function sortPointByDate(pointA, pointB) {
  const weight = getWeightForNullDate(pointA.dateFrom, pointB.dateFrom);
  return weight ?? dayjs(pointA.dateFrom).diff(dayjs(pointB.dateFrom));
}

export {humanizePointDate, humanizePointTime, calculateTimeDifference, humanizePointAddDate, isPointPresent,
  isPointPast, isPointFuture, sortPointByPrice, sortPointByTime, sortPointByDate};
