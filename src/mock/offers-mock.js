import { getRandomElementArray, getRandomValue } from '../utils';
import { EVENT_TYPES, OFFERS } from '../consts';

const MIN_PRICE = 20;
const MAX_PRICE = 3000;

const getRandomOffers = () => ({
  'type': getRandomElementArray(EVENT_TYPES),
  'title': getRandomElementArray(OFFERS),
  'price': getRandomValue(MIN_PRICE, MAX_PRICE)
});

export { getRandomOffers };


