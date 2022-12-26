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

export {humanizePointDate, humanizePointTime, calculateTimeDifference, humanizePointAddDate, isPointPresent, isPointPast, isPointFuture};
