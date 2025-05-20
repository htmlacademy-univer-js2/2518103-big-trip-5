import { getRandomElementsOfArray, getRandomIntValue } from '../utils/common-utils.js';
import { getOffersByType } from '../utils/point-utils.js';

const OFFERS = [
  {
    type: 'taxi',
    offers: [
      {
        id: 'add-luggage',
        title: 'Add luggage',
        price: 2,
      },
      {
        id: 'comfort',
        title: 'comfort',
        price: 5,
      },
      {
        id: 'animal',
        title: 'Animal transfer',
        price: 4,
      },
      {
        id: 'smoking',
        title: 'Smoking',
        price: 2,
      },
      {
        id: 'baby-seat',
        title: 'Baby seat',
        price: 2,
      },
    ],
  },
  {
    type: 'ship',
    offers: [
      {
        id: 'add-breakfast',
        title: 'Add breakfast',
        price: 5,
      },
      {
        id: 'spa',
        title: 'SPA-procedures',
        price: 20,
      },
      {
        id: 'add-luggage',
        title: 'Add luggage',
        price: 3,
      },
      {
        id: 'view',
        title: 'Beautiful view',
        price: 20,
      },
      {
        id: 'wi-fi',
        title: 'Wi-fi',
        price: 4,
      },
    ],
  },
  {
    type: 'bus',
    offers: [
      {
        id: 'add-breakfast',
        title: 'Add breakfast',
        price: 5,
      },
      {
        id: 'window-place',
        title: 'Place near window',
        price: 20,
      },
      {
        id: 'add-luggage',
        title: 'Add luggage',
        price: 40,
      },
      {
        id: 'usb-port',
        title: 'USB-port',
        price: 20,
      },
      {
        id: 'choose-single-seat',
        title: 'Choose single seat',
        price: 80,
      },
    ],
  },
  {
    type: 'flight',
    offers: [
      {
        id: 'add-breakfast',
        title: 'Add breakfast',
        price: 15,
      },
      {
        id: 'add-luggage',
        title: 'Add luggage',
        price: 50,
      },
      {
        id: 'upgrade-to-business',
        title: 'Upgrade to a business class',
        price: 200,
      },
      {
        id: 'place-window',
        title: 'Place near window',
        price: 20,
      },
      {
        id: 'insurance',
        title: 'Get insurance',
        price: 20,
      },
    ],
  },
  {
    type: 'drive',
    offers: [],
  },
  {
    type: 'train',
    offers: [
      {
        id: 'add-breakfast',
        title: 'Add breakfast',
        price: 10,
      },
      {
        id: 'animal',
        title: 'Animal transfer',
        price: 4,
      },
      {
        id: 'add-luggage',
        title: 'Add luggage',
        price: 20,
      },
      {
        id: 'insurance',
        title: 'Get insurance',
        price: 20,
      },
      {
        id: 'choose-coupe',
        title: 'Choose coupe ticket',
        price: 60,
      },
    ],
  },
  {
    type: 'check-in',
    offers: [
      {
        id: 'add-breakfast',
        title: 'Add breakfast',
        price: 70,
      },
      {
        id: 'choose-floor',
        title: 'Choose floor',
        price: 20,
      },
      {
        id: 'add-bed',
        title: 'Add bed in room',
        price: 20,
      },
      {
        id: 'order-transfer',
        title: 'Order a transfer',
        price: 40,
      },
      {
        id: 'spa',
        title: 'SPA-procedures',
        price: 20,
      },
      {
        id: 'good-view',
        title: 'Good view',
        price: 100,
      },
    ],
  },
  {
    type: 'sightseeing',
    offers: [
      {
        id: 'take-guide',
        title: 'Take a guide',
        price: 10,
      },
      {
        id: 'skip-the-line',
        title: 'Skip the Line Access',
        price: 25,
      },
      {
        id: 'take-translater',
        title: 'Take a translater',
        price: 5,
      },
      {
        id: 'take-city-tour',
        title: 'Take a City tour',
        price: 150,
      },
      {
        id: 'photo-package',
        title: 'Professional Photo Package',
        price: 40,
      },
    ],
  },
  {
    type: 'restaurant',
    offers: [
      {
        id: 'priority-seating',
        title: 'Priority Seating',
        price: 10,
      },
      {
        id: 'window-seat',
        title: 'Window Seat Reservation',
        price: 5,

      },
      {
        id: 'romantic-setup',
        title: 'Romantic Table Setup',
        price: 20,
      },
      {
        id: 'special-diet-menu',
        title: 'Custom Diet Menu',
        price: 15,
      },
      {
        id: 'bottle-wine',
        title: 'Pre-selected Bottle of Wine',
        price: 30,
      }
    ],
  },
];

const OFFERS_MAX_NUMBER = 2;
const OFFERS_MIN_NUMBER = 0;

const getRandomOffersIDs = (eventType) => {
  const offerIDs = getOffersByType(eventType, OFFERS).map((offer) => offer.id);

  if (offerIDs.length < 2) {
    return offerIDs;
  }

  return getRandomElementsOfArray(offerIDs, getRandomIntValue(OFFERS_MIN_NUMBER, OFFERS_MAX_NUMBER));
};

export { getRandomOffersIDs, OFFERS };
