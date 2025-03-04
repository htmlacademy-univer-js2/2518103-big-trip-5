import { getRandomElementArray, getRandomValue } from '../utils.js';
import { CITIES, DESCRIPTIONS } from '../consts.js';

const MIN_DESCRIPTION_COUNT = 1;
const MAX_DESCRIPTION_COUNT = 5;
const MIN_PHOTO_COUNT = 1;
const MAX_PHOTO_COUNT = 5;

const getRandomDestination = () => ({
  description: Array.from({ length: getRandomValue(MIN_DESCRIPTION_COUNT, MAX_DESCRIPTION_COUNT) }, () => getRandomElementArray(DESCRIPTIONS)).join(' '),
  city: getRandomElementArray(CITIES),
  pictures: Array.from({ length: getRandomValue(MIN_PHOTO_COUNT, MAX_PHOTO_COUNT) }, () => `https://loremflickr.com/248/152?random=${getRandomValue(1, 1000)}`),
});

export { getRandomDestination };
