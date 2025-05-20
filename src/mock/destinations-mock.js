import { getRandomElementOfArray, getRandomIntValue } from '../utils/common-utils.js';
import { CITIES, DESCRIPTIONS } from '../consts.js';

const MIN_DESCRIPTION_NUMBER = 1;
const MAX_DESCRIPTION_NUMBER = 5;
const MIN_PHOTO_NUMBER = 1;
const MAX_PHOTO_NUMBER = 5;

const getDestinationByCity = (city) => ({
  id: crypto.randomUUID(),
  description: Array.from({ length: getRandomIntValue(MIN_DESCRIPTION_NUMBER, MAX_DESCRIPTION_NUMBER) }, () => getRandomElementOfArray(DESCRIPTIONS)).join(' '),
  city: city,
  pictures: Array.from({ length: getRandomIntValue(MIN_PHOTO_NUMBER, MAX_PHOTO_NUMBER) }, () => ({
    src: `https://loremflickr.com/248/152?random=${getRandomIntValue(1, 1000)}`,
    alt: `Picture of the ${city}`,
  })),
});

const DESTINATIONS = CITIES.map(getDestinationByCity);

const getRandomDestination = () => getRandomElementOfArray(DESTINATIONS).city;

export { getRandomDestination, DESTINATIONS };
