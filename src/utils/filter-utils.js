import { FILTER_TYPES } from '../consts.js';
import { isFutureEvent, isPastEvent, isPresentEvent } from './point-utils.js';

const filter = {
  [FILTER_TYPES.EVERYTHING]: (points) => points,
  [FILTER_TYPES.FUTURE]: (points) => points.filter((point) => isFutureEvent(point.dateFrom)),
  [FILTER_TYPES.PRESENT]: (points) => points.filter((point) => isPresentEvent(point.dateFrom, point.dateTo)),
  [FILTER_TYPES.PAST]: (points) => points.filter((point) => isPastEvent(point.dateTo))
};

export { filter };
