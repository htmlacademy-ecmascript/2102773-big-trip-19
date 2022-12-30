import dayjs from 'dayjs';
import preciseDiff from 'dayjs-precise-range';
import duration from 'dayjs/plugin/duration.js';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter.js';
dayjs.extend(preciseDiff);
dayjs.extend(duration);
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

const DATE_FORMAT = 'MMM DD';
const TIME_FORMAT = 'HH:mm';
const DATE_FORMAT_ADD = 'DD/MM/YY HH:mm';

const today = dayjs();

function humanizePointDate(date) {
  return date ? dayjs(date).format(DATE_FORMAT) : '';
}

function humanizePointTime(time) {
  return time ? dayjs(time).format(TIME_FORMAT) : '';
}

function calculateTimeDifference(time1, time2) {
  const x = dayjs(time1).format();
  const y = dayjs(time2).format();
  const diff = dayjs.preciseDiff(x, y);
  return time1 && time2 ? diff : '';
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

  if (pointA === null) {
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
  return weight ?? dayjs(pointB.dateFrom).diff(dayjs(pointA.dateFrom));
}

export {humanizePointDate, humanizePointTime, calculateTimeDifference, humanizePointAddDate, isPointPresent,
  isPointPast, isPointFuture, sortPointByPrice, sortPointByTime, sortPointByDate};
