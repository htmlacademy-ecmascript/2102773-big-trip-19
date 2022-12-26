import { FilterType } from '../mock/const.js';
import { isPointPresent, isPointPast, isPointFuture } from './data.js';

const filter = {
  [FilterType.EVERYTHING]: (points) => points.filter((point) => point !== null),
  [FilterType.FUTURE]: (points) => points.filter((point) => isPointFuture(point.dateFrom)),
  [FilterType.PRESENT]: (points) => points.filter((point) => isPointPresent(point.dateFrom, point.dateTo)),
  [FilterType.PAST]: (points) => points.filter((point) => isPointPast(point.dateTo))
};

export {filter};

