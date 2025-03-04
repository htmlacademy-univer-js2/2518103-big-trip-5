import { EVENT_TYPES } from '../consts';
import { getRandomElementArray, getRandomValue, getTwoRandomDates } from '../utils';
import { getRandomDestination } from './destinations-mock';
import { getRandomOffers } from './offers-mock';

const MIN_PRICE = 2500;
const MAX_PRICE = 6000;
const OFFERS_MIN_COUNT = 1;
const OFFERS_MAX_COUNT = 3;


const getRandomPoint = () => {
  const twoDates = getTwoRandomDates();

  return {
    type: getRandomElementArray(EVENT_TYPES),
    destination: getRandomDestination(),
    dateFrom: twoDates[0],
    dateTo: twoDates[1],
    basePrice: getRandomValue(MIN_PRICE, MAX_PRICE),
    offers: Array.from({ length: getRandomValue(OFFERS_MIN_COUNT, OFFERS_MAX_COUNT) }, getRandomOffers),
    isFavorite: Boolean(getRandomValue(0, 1)),
  };
};

export { getRandomPoint };

