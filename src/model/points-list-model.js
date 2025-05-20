import { POINTS } from '../mock/points-mock.js';
import { OFFERS } from '../mock/offers-mock.js';
import { DESTINATIONS } from '../mock/destinations-mock.js';

export default class PointsListModel {
  #points = [...POINTS];
  #offers = [...OFFERS];
  #destinations = [...DESTINATIONS];

  get points() {
    return this.#points;
  }

  get offers() {
    return this.#offers;
  }

  get destinations() {
    return this.#destinations;
  }
}
