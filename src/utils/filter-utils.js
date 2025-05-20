import { FILTER_TYPES } from '../consts.js';
import { isFutureEvent, isPastEvent, isPresentEvent } from './point-utils.js';

const filter = {
  [FILTER_TYPES.EVERYTHING]: (points) => points,
  [FILTER_TYPES.FUTURE]: (points) => points.filter((point) => isFutureEvent(point.startDatetime)),
  [FILTER_TYPES.PRESENT]: (points) => points.filter((point) => isPresentEvent(point.startDatetime, point.endDatetime)),
  [FILTER_TYPES.PAST]: (points) => points.filter((point) => isPastEvent(point.endDatetime))
};

export { filter };
