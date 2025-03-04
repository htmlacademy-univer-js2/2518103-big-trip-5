import { getRandomPoint } from '../mock/points-mock';

const POINT_NUMBER = 5;

export default class PointsModel {
  allPoints = Array.from({ length: POINT_NUMBER }, getRandomPoint);

  getPoints() {
    return this.allPoints;
  }
}
