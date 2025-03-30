import { getRandomPoint } from '../mock/points-mock.js';

const POINT_NUMBER = 5;

export default class PointsModel {
  #points = Array.from({ length: POINT_NUMBER }, getRandomPoint);

  get points() {
    return [...this.#points];
  }
}
