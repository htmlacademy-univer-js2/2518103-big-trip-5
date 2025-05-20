import { EVENT_TYPES } from '../consts.js';
import { getRandomElementOfArray, getRandomIntValue } from '../utils/common-utils.js';
import { getTwoRandomDates } from '../utils/point-utils.js';
import { getRandomDestination } from './destinations-mock.js';
import { getRandomOffersIDs } from './offers-mock.js';

const MIN_COST = 2000;
const MAX_COST = 5000;
const POINTS_MAX_COUNT = 5;

const getRandomPoint = () => {
  const twoDates = getTwoRandomDates();
  const eventType = getRandomElementOfArray(EVENT_TYPES);

  return {
    id: crypto.randomUUID(),
    eventType: eventType,
    destination: getRandomDestination(),
    startDatetime: twoDates[0],
    endDatetime: twoDates[1],
    price: getRandomIntValue(MIN_COST, MAX_COST),
    offers: getRandomOffersIDs(eventType),
    isFavorite: Boolean(getRandomIntValue(0, 1)),
  };
};

const POINTS = Array.from({ length: POINTS_MAX_COUNT }, getRandomPoint);

export { POINTS };
