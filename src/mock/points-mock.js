import { EVENT_TYPES } from '../consts';
import { getRandomElementOfArray, getRandomIntValue, getTwoRandomDates } from '../utils';
import { getRandomDestination } from './destinations-mock.js';
import { getRandomOffer } from './offers-mock.js';

const MIN_COST = 2000;
const MAX_COST = 5000;
const OFFERS_MIN_COUNT = 1;
const OFFERS_MAX_COUNT = 5;

const getRandomPoint = () => {
  const twoDates = getTwoRandomDates();

  return {
    eventType: getRandomElementOfArray(EVENT_TYPES),
    destination: getRandomDestination(),
    startDatetime: twoDates[0],
    endDatetime: twoDates[1],
    price: getRandomIntValue(MIN_COST, MAX_COST),
    offers: Array.from({ length: getRandomIntValue(OFFERS_MIN_COUNT, OFFERS_MAX_COUNT) }, getRandomOffer),
    isFavorite: Boolean(getRandomIntValue(0, 1)),
  };
};

export { getRandomPoint };
