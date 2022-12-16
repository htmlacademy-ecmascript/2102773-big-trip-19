import dayjs from 'dayjs';
import preciseDiff from 'dayjs-precise-range';
import duration from 'dayjs/plugin/duration.js';
dayjs.extend(preciseDiff);
dayjs.extend(duration);

const DATE_FORMAT = 'MMM DD';
const TIME_FORMAT = 'HH:mm';
const DIFF_TIME_FORMAT = 'DD[D] HH[H] mm[M]';
const DATE_FORMAT_ADD = 'DD/MM/YY HH:mm';

function getRandomIntegerInclusive(min, max) {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  if (min < 0 || max < 0) {
    return NaN;
  }
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

const getRandomArrayElement = (elements) => elements[getRandomIntegerInclusive(0, elements.length - 1)];

function humanizePointDate(date) {
  return date ? dayjs(date).format(DATE_FORMAT) : '';
}

function humanizePointTime(time) {
  return time ? dayjs(time).format(TIME_FORMAT) : '';
}

function calculateTimeDifference(time1, time2) {
  const x = dayjs(time1, DIFF_TIME_FORMAT);
  const y = dayjs(time2, DIFF_TIME_FORMAT);
  const diff = dayjs.preciseDiff(x, y);
  return time1 && time2 ? diff : '';
}

function humanizePointAddDate(date) {
  return date ? dayjs(date).format(DATE_FORMAT_ADD) : '';
}

export {getRandomArrayElement, getRandomIntegerInclusive, humanizePointDate, humanizePointTime, calculateTimeDifference, humanizePointAddDate};
