import { getRandomElementOfArray, getRandomIntValue } from '../utils';
import { EVENT_TYPES, OFFERS } from '../consts.js';

const MIN_COST = 10;
const MAX_COST = 2000;

function getRandomOffer() {
  return {
    type: getRandomElementOfArray(EVENT_TYPES),
    title: getRandomElementOfArray(OFFERS),
    price: getRandomIntValue(MIN_COST, MAX_COST)
  };
}

export { getRandomOffer };
